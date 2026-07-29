import { XMLParser } from "fast-xml-parser";
import type { Reliability, Story } from "./types";
import { verifiedStories } from "./verified-data";

const tierOneNames = [
  "david ornstein", "paul joyce", "james pearce", "lewis steele",
  "fabrizio romano", "ben jacobs", "david lynch", "melissa reddy", "loïc tanzi", "loic tanzi"
];

const approvedDomains = new Set([
  "liverpoolfc.com", "www.liverpoolfc.com", "bbc.co.uk", "www.bbc.co.uk",
  "theguardian.com", "www.theguardian.com", "independent.co.uk", "www.independent.co.uk",
  "skysports.com", "www.skysports.com", "talksport.com", "www.talksport.com",
  "lequipe.fr", "www.lequipe.fr"
]);

function stripHtml(input = "") {
  return input.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function truncate(input: string, max = 260) {
  const clean = stripHtml(input);
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).replace(/\s+\S*$/, "")}…`;
}

function publicationFromUrl(url: string) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    const map: Record<string, string> = {
      "liverpoolfc.com": "Liverpool FC",
      "bbc.co.uk": "BBC Sport",
      "theguardian.com": "The Guardian",
      "independent.co.uk": "The Independent",
      "skysports.com": "Sky Sports",
      "talksport.com": "talkSPORT",
      "lequipe.fr": "L’Équipe"
    };
    return map[host] || host;
  } catch {
    return "Unknown source";
  }
}

function reliabilityFor(url: string, author: string): Reliability {
  const lowerAuthor = author.toLowerCase();
  if (url.includes("liverpoolfc.com")) return "Official";
  if (tierOneNames.some((name) => lowerAuthor.includes(name))) return "Tier 1";
  return "Tier 2";
}

function categoryFor(text: string): Story["category"] {
  const lower = text.toLowerCase();
  if (/transfer|signing|bid|deal|talks|target|fee|medical/.test(lower)) return "Transfer";
  if (/injur|fitness|ruled out|availability/.test(lower)) return "Injury";
  if (/fixture|match|kick-off|kickoff|pre-season|premier league/.test(lower)) return "Fixture";
  if (/contract|new terms|extension/.test(lower)) return "Contract";
  if (/official|announc|complete signing/.test(lower)) return "Official";
  return "News";
}

function storyId(url: string, title: string) {
  return Buffer.from(`${url}|${title}`).toString("base64url").slice(0, 30);
}

function normaliseHeadline(title: string) {
  return title.toLowerCase()
    .replace(/[^a-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter((word) => word.length > 3 && !["liverpool", "reds", "transfer", "news", "latest"].includes(word))
    .sort()
    .join(" ");
}

function mergeDuplicates(stories: Story[]) {
  const groups = new Map<string, Story[]>();
  for (const story of stories) {
    const key = normaliseHeadline(story.title).split(" ").slice(0, 8).join(" ") || story.title;
    groups.set(key, [...(groups.get(key) || []), story]);
  }
  return [...groups.values()].map((group) => {
    group.sort((a, b) => {
      const rank = { Official: 4, "Tier 1": 3, "Tier 2": 2, Reported: 1 };
      return rank[b.reliability] - rank[a.reliability] || Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
    });
    return { ...group[0], sourceCount: group.length };
  });
}

async function fetchNewsApi(): Promise<Story[]> {
  const key = process.env.NEWS_API_KEY;
  if (!key) return [];
  const domains = "liverpoolfc.com,bbc.co.uk,theguardian.com,independent.co.uk,skysports.com,talksport.com";
  const query = encodeURIComponent('"Liverpool" AND (transfer OR signing OR contract OR injury OR fixture OR match)');
  const response = await fetch(`https://newsapi.org/v2/everything?q=${query}&domains=${domains}&language=en&sortBy=publishedAt&pageSize=50&apiKey=${key}`, { next: { revalidate: 180 } });
  if (!response.ok) return [];
  const data = await response.json();
  return (data.articles || []).flatMap((article: any) => {
    if (!article.url || !article.title) return [];
    const host = new URL(article.url).hostname;
    if (!approvedDomains.has(host)) return [];
    const author = article.author || article.source?.name || "Publisher desk";
    const text = `${article.title} ${article.description || ""}`;
    if (!/liverpool|anfield|reds|iraola/i.test(text)) return [];
    return [{
      id: storyId(article.url, article.title),
      title: stripHtml(article.title),
      summary: truncate(article.description || "Open the original report for full details."),
      url: article.url,
      publishedAt: article.publishedAt || new Date().toISOString(),
      journalist: stripHtml(author),
      publication: article.source?.name || publicationFromUrl(article.url),
      reliability: reliabilityFor(article.url, author),
      category: categoryFor(text),
      tags: [categoryFor(text)]
    } satisfies Story];
  });
}

async function fetchGuardian(): Promise<Story[]> {
  const key = process.env.GUARDIAN_API_KEY;
  if (!key) return [];
  const response = await fetch(`https://content.guardianapis.com/search?q=Liverpool&section=football&order-by=newest&show-fields=trailText,byline&api-key=${key}`, { next: { revalidate: 180 } });
  if (!response.ok) return [];
  const data = await response.json();
  return (data.response?.results || []).map((item: any) => {
    const author = item.fields?.byline || "Guardian sport";
    const text = `${item.webTitle} ${item.fields?.trailText || ""}`;
    return {
      id: storyId(item.webUrl, item.webTitle),
      title: stripHtml(item.webTitle),
      summary: truncate(item.fields?.trailText || "Open the original report for full details."),
      url: item.webUrl,
      publishedAt: item.webPublicationDate,
      journalist: stripHtml(author),
      publication: "The Guardian",
      reliability: reliabilityFor(item.webUrl, author),
      category: categoryFor(text),
      tags: [categoryFor(text)]
    } satisfies Story;
  });
}

async function fetchRss(): Promise<Story[]> {
  const feeds = (process.env.CUSTOM_RSS_FEEDS || "").split(",").map((x) => x.trim()).filter(Boolean);
  if (!feeds.length) return [];
  const parser = new XMLParser({ ignoreAttributes: false });
  const results = await Promise.all(feeds.map(async (feedUrl) => {
    try {
      const response = await fetch(feedUrl, { next: { revalidate: 180 } });
      if (!response.ok) return [];
      const xml = await response.text();
      const parsed = parser.parse(xml);
      const items = parsed?.rss?.channel?.item || parsed?.feed?.entry || [];
      return (Array.isArray(items) ? items : [items]).flatMap((item: any) => {
        const url = item.link?.["@_href"] || item.link || item.guid || "";
        const title = stripHtml(item.title || "");
        if (!url || !title || !/liverpool|anfield|reds|iraola/i.test(`${title} ${item.description || item.summary || ""}`)) return [];
        const host = new URL(url).hostname;
        if (!approvedDomains.has(host)) return [];
        const author = stripHtml(item.author?.name || item.author || item["dc:creator"] || "Publisher desk");
        const text = `${title} ${item.description || item.summary || ""}`;
        return [{
          id: storyId(url, title),
          title,
          summary: truncate(item.description || item.summary || "Open the original report for full details."),
          url,
          publishedAt: item.pubDate || item.updated || item.published || new Date().toISOString(),
          journalist: author,
          publication: publicationFromUrl(url),
          reliability: reliabilityFor(url, author),
          category: categoryFor(text),
          tags: [categoryFor(text)]
        } satisfies Story];
      });
    } catch {
      return [];
    }
  }));
  return results.flat();
}

export async function getAggregatedStories() {
  const [newsApi, guardian, rss] = await Promise.allSettled([fetchNewsApi(), fetchGuardian(), fetchRss()]);
  const live = [newsApi, guardian, rss].flatMap((result) => result.status === "fulfilled" ? result.value : []);
  const combined = [...live, ...verifiedStories];
  return mergeDuplicates(combined)
    .filter((story) => Date.now() - Date.parse(story.publishedAt) < 1000 * 60 * 60 * 24 * 120)
    .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    .slice(0, 60);
}
