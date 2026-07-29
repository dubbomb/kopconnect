export type Reliability = "Official" | "Tier 1" | "Tier 2" | "Reported";

export type Story = {
  id: string;
  title: string;
  summary: string;
  url: string;
  publishedAt: string;
  journalist: string;
  publication: string;
  reliability: Reliability;
  category: "Transfer" | "Official" | "Injury" | "Fixture" | "Contract" | "News";
  tags: string[];
  sourceCount?: number;
};

export type Fixture = {
  id: string;
  home: string;
  away: string;
  kickoffUtc: string;
  competition: string;
  venue?: string;
  status: "SCHEDULED" | "LIVE" | "FINISHED" | "POSTPONED";
  homeScore?: number | null;
  awayScore?: number | null;
  sourceUrl?: string;
};

export type TransferStage = {
  key: string;
  label: string;
  complete: boolean;
};

export type TransferTarget = {
  player: string;
  fromClub: string;
  position: string;
  reportedStatus: string;
  lastVerifiedAt: string;
  sourceLabel: string;
  sourceUrl: string;
  note: string;
  stages: TransferStage[];
};
