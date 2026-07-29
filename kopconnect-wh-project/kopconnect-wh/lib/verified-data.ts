import type { Fixture, Story, TransferTarget } from "./types";

export const verifiedStories: Story[] = [
  {
    id: "tommy-pilling-zemplin",
    title: "Tommy Pilling completes permanent move to MFK Zemplin Michalovce",
    summary: "Liverpool confirmed the 21-year-old midfielder has left the club permanently, subject to international clearance.",
    url: "https://www.liverpoolfc.com/news/tommy-pilling-makes-permanent-move-mfk-zemplin-michalovce-0",
    publishedAt: "2026-07-29T07:32:00.000Z",
    journalist: "Chris Shaw",
    publication: "Liverpool FC",
    reliability: "Official",
    category: "Official",
    tags: ["Departure", "Academy", "Official"]
  },
  {
    id: "barcola-agreement-principle",
    title: "Barcola gives agreement in principle as Liverpool and PSG discuss deal",
    summary: "L’Équipe reports that Bradley Barcola has spoken with Andoni Iraola and is open to joining Liverpool. The clubs remain apart on valuation and no fee has been agreed.",
    url: "https://www.lequipe.fr/Football/Actualites/Mercato-bradley-barcola-a-parle-a-andoni-iraola-et-a-donne-son-accord-de-principe-a-liverpool/1707577",
    publishedAt: "2026-07-28T12:57:00.000Z",
    journalist: "Loïc Tanzi",
    publication: "L’Équipe",
    reliability: "Tier 1",
    category: "Transfer",
    tags: ["Bradley Barcola", "PSG", "Club talks"]
  },
  {
    id: "barcola-independent-live",
    title: "Liverpool still face major valuation gap in Barcola talks",
    summary: "The Independent’s live transfer coverage says Barcola wants the move, but Liverpool remain a considerable distance from PSG’s reported valuation.",
    url: "https://www.independent.co.uk/sport/football/transfer-news-live-barcola-vinicius-jr-arsenal-man-utd-liverpool-chelsea-b3023501.html",
    publishedAt: "2026-07-29T07:11:00.000Z",
    journalist: "Jamie Braidwood and Will Castle",
    publication: "The Independent",
    reliability: "Tier 2",
    category: "Transfer",
    tags: ["Bradley Barcola", "Valuation", "Negotiations"]
  },
  {
    id: "wrexham-preview-podcast",
    title: "Liverpool publish pre-season podcast ahead of Wrexham friendly",
    summary: "The official tour podcast includes interviews with Andoni Iraola, Milos Kerkez and Ryan Gravenberch before the match at Yankee Stadium.",
    url: "https://www.liverpoolfc.com/news/pre-season-tour-podcast-interviews-previews-and-liverpool-v-wrexham",
    publishedAt: "2026-07-28T18:39:00.000Z",
    journalist: "Liverpool FC",
    publication: "Liverpool FC",
    reliability: "Official",
    category: "Fixture",
    tags: ["Wrexham", "Pre-season", "Official"]
  },
  {
    id: "kerkez-iraola-interview",
    title: "Kerkez says Iraola is the perfect fit for Liverpool",
    summary: "Milos Kerkez has backed the new head coach’s intensity and tactical approach after previously working with him at Bournemouth.",
    url: "https://www.theguardian.com/football/2026/jul/28/milos-kerkez-andoni-iraola-liverpool",
    publishedAt: "2026-07-28T11:00:02.000Z",
    journalist: "Andy Hunter",
    publication: "The Guardian",
    reliability: "Tier 2",
    category: "News",
    tags: ["Milos Kerkez", "Andoni Iraola", "Interview"]
  },
  {
    id: "gomez-defensive-concern",
    title: "Liverpool’s defensive depth under scrutiny after Gomez injury",
    summary: "Liverpool’s centre-back options are being assessed after Joe Gomez was forced off during the pre-season win over Sunderland.",
    url: "https://www.theguardian.com/football/2026/jul/26/liverpool-start-iraola-era-in-style-to-beat-sunderland-but-gomez-injury-puts-spotlight-on-defence",
    publishedAt: "2026-07-25T23:49:24.000Z",
    journalist: "Andy Hunter",
    publication: "The Guardian",
    reliability: "Tier 2",
    category: "Injury",
    tags: ["Joe Gomez", "Injury", "Centre-back"]
  },
  {
    id: "szoboszlai-contract",
    title: "Liverpool nearing new Szoboszlai contract agreement",
    summary: "Liverpool are reported to be close to agreeing improved terms with Dominik Szoboszlai after months of discussions.",
    url: "https://www.independent.co.uk/sport/football/liverpool-dominik-szoboszlai-contract-andoni-iraola-b3016163.html",
    publishedAt: "2026-07-16T12:36:00.000Z",
    journalist: "Richard Jolly",
    publication: "The Independent",
    reliability: "Tier 2",
    category: "Contract",
    tags: ["Dominik Szoboszlai", "Contract"]
  },
  {
    id: "jacquet-complete",
    title: "Liverpool complete signing of Jérémy Jacquet",
    summary: "The defender joined from Stade Rennais on a long-term contract, subject to international clearance.",
    url: "https://www.liverpoolfc.com/news/liverpool-complete-signing-jeremy-jacquet",
    publishedAt: "2026-07-01T09:02:00.000Z",
    journalist: "Chris Shaw",
    publication: "Liverpool FC",
    reliability: "Official",
    category: "Official",
    tags: ["Jérémy Jacquet", "Signing", "Official"]
  },
  {
    id: "munoz-agreement",
    title: "Liverpool agree deal to sign Víctor Muñoz",
    summary: "Liverpool announced an agreement with Osasuna for the Spain forward after he completed a medical and signed a long-term contract.",
    url: "https://www.liverpoolfc.com/news/liverpool-agree-deal-sign-spain-forward-victor-munoz",
    publishedAt: "2026-06-18T10:00:00.000Z",
    journalist: "James Carroll",
    publication: "Liverpool FC",
    reliability: "Official",
    category: "Official",
    tags: ["Víctor Muñoz", "Signing", "Official"]
  }
];

export const transferTargets: TransferTarget[] = [
  {
    player: "Bradley Barcola",
    fromClub: "Paris Saint-Germain",
    position: "LW / RW",
    reportedStatus: "Agreement in principle with player; club valuation gap remains",
    lastVerifiedAt: "2026-07-29T07:11:00.000Z",
    sourceLabel: "L’Équipe / The Independent",
    sourceUrl: "https://www.lequipe.fr/Football/Actualites/Mercato-bradley-barcola-a-parle-a-andoni-iraola-et-a-donne-son-accord-de-principe-a-liverpool/1707577",
    note: "This is reported, not an official Liverpool announcement. No transfer fee has been agreed.",
    stages: [
      { key: "interest", label: "Interest", complete: true },
      { key: "contact", label: "Player contact", complete: true },
      { key: "agreement", label: "Player agreement", complete: true },
      { key: "club-talks", label: "Club talks", complete: true },
      { key: "bid", label: "Bid accepted", complete: false },
      { key: "medical", label: "Medical", complete: false },
      { key: "signed", label: "Contract signed", complete: false },
      { key: "official", label: "Official", complete: false }
    ]
  }
];

export const completedDeals = [
  {
    player: "Víctor Muñoz",
    detail: "Agreement announced",
    url: "https://www.liverpoolfc.com/news/liverpool-agree-deal-sign-spain-forward-victor-munoz"
  },
  {
    player: "Jérémy Jacquet",
    detail: "Signing completed",
    url: "https://www.liverpoolfc.com/news/liverpool-complete-signing-jeremy-jacquet"
  }
];

export const verifiedFixtures: Fixture[] = [
  {
    id: "wrexham-preseason",
    home: "Liverpool",
    away: "Wrexham",
    kickoffUtc: "2026-07-29T23:30:00.000Z",
    competition: "Pre-season",
    venue: "Yankee Stadium, New York",
    status: "SCHEDULED",
    sourceUrl: "https://www.liverpoolfc.com/news/watch-live-liverpool-v-wrexham-new-york"
  },
  {
    id: "leeds-preseason",
    home: "Liverpool",
    away: "Leeds United",
    kickoffUtc: "2026-08-02T20:00:00.000Z",
    competition: "Pre-season",
    venue: "Soldier Field, Chicago",
    status: "SCHEDULED",
    sourceUrl: "https://www.liverpoolfc.com/news/watch-every-liverpool-pre-season-game-live-all-red-video"
  },
  {
    id: "monaco-preseason",
    home: "Liverpool",
    away: "AS Monaco",
    kickoffUtc: "2026-08-09T13:30:00.000Z",
    competition: "Pre-season",
    venue: "Anfield",
    status: "SCHEDULED",
    sourceUrl: "https://www.liverpoolfc.com/news/liverpool-face-monaco-and-como-1907-pre-season-fixtures-anfield"
  },
  {
    id: "como-preseason",
    home: "Liverpool",
    away: "Como 1907",
    kickoffUtc: "2026-08-16T17:00:00.000Z",
    competition: "Pre-season",
    venue: "Anfield",
    status: "SCHEDULED",
    sourceUrl: "https://www.liverpoolfc.com/news/liverpool-face-monaco-and-como-1907-pre-season-fixtures-anfield"
  },
  {
    id: "newcastle-pl",
    home: "Newcastle United",
    away: "Liverpool",
    kickoffUtc: "2026-08-23T15:30:00.000Z",
    competition: "Premier League",
    venue: "St James' Park",
    status: "SCHEDULED",
    sourceUrl: "https://www.liverpoolfc.com/news/revealed-liverpools-2026-27-premier-league-fixture-list"
  },
  {
    id: "forest-pl",
    home: "Liverpool",
    away: "Nottingham Forest",
    kickoffUtc: "2026-08-29T14:00:00.000Z",
    competition: "Premier League",
    venue: "Anfield",
    status: "SCHEDULED",
    sourceUrl: "https://www.liverpoolfc.com/news/revealed-liverpools-2026-27-premier-league-fixture-list"
  }
];
