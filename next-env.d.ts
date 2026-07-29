"use client";

import { useEffect, useMemo, useState } from "react";
import type { Fixture, Story, TransferTarget } from "@/lib/types";

type CompletedDeal = { player: string; detail: string; url: string };

type Props = {
  initialStories: Story[];
  initialFixtures: Fixture[];
  transferTargets: TransferTarget[];
  completedDeals: CompletedDeal[];
};

const filters = ["All", "Transfer", "Official", "Injury", "Fixture", "Contract"];

function formatTime(iso: string) {
  return new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(new Date(iso));
}

function formatDate(iso: string) {
  return new Intl.DateTimeFormat(undefined, { weekday: "short", day: "numeric", month: "short" }).format(new Date(iso));
}

function relativeTime(iso: string) {
  const diffMinutes = Math.round((Date.parse(iso) - Date.now()) / 60000);
  const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });
  if (Math.abs(diffMinutes) < 60) return rtf.format(diffMinutes, "minute");
  const hours = Math.round(diffMinutes / 60);
  if (Math.abs(hours) < 24) return rtf.format(hours, "hour");
  return rtf.format(Math.round(hours / 24), "day");
}

function countdown(iso: string) {
  const diff = Date.parse(iso) - Date.now();
  if (diff <= 0) return "Under way or completed";
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  return days ? `${days}d ${hours}h` : `${hours}h ${mins}m`;
}

function ReliabilityBadge({ value }: { value: Story["reliability"] }) {
  return <span className={`badge badge-${value.toLowerCase().replace(" ", "-")}`}>{value}</span>;
}

function TransferCard({ target }: { target: TransferTarget }) {
  return <article className="transfer-card">
    <div className="transfer-topline">
      <div>
        <div className="section-kicker">Active incoming</div>
        <h2>{target.player}</h2>
        <p>{target.position} · {target.fromClub}</p>
      </div>
      <span className="reported-pill">Reported stage</span>
    </div>
    <div className="status-label">{target.reportedStatus}</div>
    <div className="stage-grid" aria-label={`Transfer progress for ${target.player}`}>
      {target.stages.map((stage, index) => <div className={`stage ${stage.complete ? "done" : "pending"}`} key={stage.key}>
        <div className="stage-track"><span /></div>
        <div className="stage-number">{stage.complete ? "✓" : index + 1}</div>
        <span>{stage.label}</span>
      </div>)}
    </div>
    <div className="transfer-foot">
      <p>{target.note}</p>
      <a href={target.sourceUrl} target="_blank" rel="noreferrer">{target.sourceLabel} ↗</a>
    </div>
  </article>;
}

function StoryCard({ story }: { story: Story }) {
  return <article className="story-card">
    <div className="story-meta">
      <ReliabilityBadge value={story.reliability} />
      <span>{story.journalist}</span>
      <span className="muted">· {story.publication}</span>
      {story.sourceCount && story.sourceCount > 1 ? <span className="merged-pill">{story.sourceCount} reports merged</span> : null}
    </div>
    <h3>{story.title}</h3>
    <p>{story.summary}</p>
    <div className="story-footer">
      <div className="tag-row">{story.tags.slice(0, 3).map((tag) => <span key={tag}>{tag}</span>)}</div>
      <a href={story.url} target="_blank" rel="noreferrer">Read original ↗</a>
    </div>
  </article>;
}

function FixtureCard({ fixture, featured = false }: { fixture: Fixture; featured?: boolean }) {
  const isLiverpoolHome = fixture.home.toLowerCase().includes("liverpool");
  const opponent = isLiverpoolHome ? fixture.away : fixture.home;
  return <a className={`fixture-card ${featured ? "featured" : ""}`} href={fixture.sourceUrl || "#"} target={fixture.sourceUrl ? "_blank" : undefined} rel="noreferrer">
    <div className="fixture-top"><span>{fixture.competition}</span><span>{fixture.status === "SCHEDULED" ? relativeTime(fixture.kickoffUtc) : fixture.status}</span></div>
    <div className="fixture-teams"><strong>{isLiverpoolHome ? "Liverpool" : opponent}</strong><span>vs</span><strong>{isLiverpoolHome ? opponent : "Liverpool"}</strong></div>
    <div className="fixture-time">{formatDate(fixture.kickoffUtc)} · {formatTime(fixture.kickoffUtc)}</div>
    {fixture.venue ? <div className="fixture-venue">{fixture.venue}</div> : null}
    {featured ? <div className="countdown">Kick-off in {countdown(fixture.kickoffUtc)}</div> : null}
  </a>;
}

export function KopConnect({ initialStories, initialFixtures, transferTargets, completedDeals }: Props) {
  const [stories, setStories] = useState(initialStories);
  const [fixtures, setFixtures] = useState(initialFixtures);
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");
  const [pendingCount, setPendingCount] = useState(0);
  const [pendingStories, setPendingStories] = useState<Story[]>([]);
  const [lastRefresh, setLastRefresh] = useState(new Date().toISOString());
  const [dark, setDark] = useState(false);
  const [, setTick] = useState(0);

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  useEffect(() => {
    const timer = window.setInterval(() => setTick((x) => x + 1), 60000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    async function refresh() {
      try {
        const [newsResponse, fixtureResponse] = await Promise.all([fetch("/api/news", { cache: "no-store" }), fetch("/api/fixtures", { cache: "no-store" })]);
        const newsData = await newsResponse.json();
        const fixtureData = await fixtureResponse.json();
        const currentIds = new Set(stories.map((story) => story.id));
        const incoming = (newsData.stories as Story[]).filter((story) => !currentIds.has(story.id));
        if (incoming.length) {
          setPendingStories(incoming);
          setPendingCount(incoming.length);
        }
        setFixtures(fixtureData.fixtures || initialFixtures);
        setLastRefresh(newsData.refreshedAt || new Date().toISOString());
      } catch {
        setLastRefresh(new Date().toISOString());
      }
    }
    refresh();
    const timer = window.setInterval(refresh, 180000);
    return () => window.clearInterval(timer);
  }, []); // intentional initial snapshot comparison

  const filteredStories = useMemo(() => {
    const q = query.trim().toLowerCase();
    return stories.filter((story) => {
      if (filter !== "All" && story.category !== filter) return false;
      if (!q) return true;
      return [story.title, story.summary, story.journalist, story.publication, ...story.tags].join(" ").toLowerCase().includes(q);
    });
  }, [stories, filter, query]);

  const upcomingFixtures = fixtures.filter((fixture) => Date.parse(fixture.kickoffUtc) > Date.now() - 7200000).slice(0, 6);

  function revealUpdates() {
    setStories([...pendingStories, ...stories].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt)));
    setPendingStories([]);
    setPendingCount(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return <>
    <header className="site-header">
      <div className="header-inner">
        <a className="brand" href="#top" aria-label="KopConnect.WH home">
          <strong>KopConnect.WH</strong>
          <span><i /> Live Newsroom</span>
        </a>
        <nav aria-label="Main navigation">
          <a href="#news">News</a>
          <a href="#transfers">Transfers</a>
          <a href="#fixtures">Fixtures</a>
        </nav>
        <button className="theme-button" onClick={() => setDark(!dark)} aria-label="Toggle colour theme">{dark ? "☀" : "☾"}</button>
      </div>
    </header>

    <main id="top" className="shell">
      <section className="compact-intro">
        <div>
          <div className="section-kicker">Liverpool FC transfer coverage</div>
          <h1>Live news, deal stages and fixtures.</h1>
        </div>
        <div className="refresh-status"><i /> Checked {relativeTime(lastRefresh)}</div>
      </section>

      <section id="transfers" className="section-block">
        <div className="section-heading">
          <div><div className="section-kicker">Transfer tracker</div><h2>Deals Liverpool are actively reported to be working on</h2></div>
          <span className="accuracy-note">No percentage guesses</span>
        </div>
        <div className="transfer-list">{transferTargets.map((target) => <TransferCard key={target.player} target={target} />)}</div>
        <div className="completed-strip">
          <strong>Completed this summer</strong>
          {completedDeals.map((deal) => <a href={deal.url} target="_blank" rel="noreferrer" key={deal.player}><span>✓</span>{deal.player}<small>{deal.detail}</small></a>)}
        </div>
      </section>

      <div className="content-grid">
        <section id="news" className="section-block news-section">
          <div className="section-heading news-heading">
            <div><div className="section-kicker">Latest Liverpool updates</div><h2>Live timeline</h2></div>
            <label className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search player or journalist" /></label>
          </div>
          <div className="filter-row">{filters.map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div>
          {pendingCount > 0 ? <button className="new-updates" onClick={revealUpdates}>{pendingCount} new update{pendingCount === 1 ? "" : "s"}</button> : null}
          <div className="timeline">
            {filteredStories.map((story) => <div className="timeline-row" key={story.id}>
              <div className="timeline-time"><span>{formatTime(story.publishedAt)}</span><small>{formatDate(story.publishedAt)}</small></div>
              <div className="timeline-dot" />
              <StoryCard story={story} />
            </div>)}
            {!filteredStories.length ? <div className="empty-state">No updates match that search.</div> : null}
          </div>
        </section>

        <aside id="fixtures" className="section-block fixtures-section">
          <div className="section-heading"><div><div className="section-kicker">Fixtures</div><h2>Next Liverpool matches</h2></div></div>
          <p className="timezone-note">Times automatically use your device timezone.</p>
          <div className="fixtures-list">
            {upcomingFixtures.map((fixture, index) => <FixtureCard fixture={fixture} featured={index === 0} key={fixture.id} />)}
          </div>
        </aside>
      </div>
    </main>

    <footer>
      <strong>KopConnect.WH</strong>
      <span>Independent personal project. Short summaries only; all reporting belongs to the original publishers.</span>
    </footer>
  </>;
}
