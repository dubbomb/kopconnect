import { NextResponse } from "next/server";
import type { Fixture } from "@/lib/types";
import { verifiedFixtures } from "@/lib/verified-data";

export const revalidate = 900;

async function fetchFootballData(): Promise<Fixture[]> {
  const key = process.env.FOOTBALL_DATA_API_KEY;
  if (!key) return [];
  const teamId = process.env.FOOTBALL_DATA_TEAM_ID || "64";
  const from = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString().slice(0, 10);
  const to = new Date(Date.now() + 1000 * 60 * 60 * 24 * 300).toISOString().slice(0, 10);
  const response = await fetch(`https://api.football-data.org/v4/teams/${teamId}/matches?dateFrom=${from}&dateTo=${to}`, {
    headers: { "X-Auth-Token": key },
    next: { revalidate: 900 }
  });
  if (!response.ok) return [];
  const data = await response.json();
  return (data.matches || []).map((match: any) => ({
    id: String(match.id),
    home: match.homeTeam?.name || "TBC",
    away: match.awayTeam?.name || "TBC",
    kickoffUtc: match.utcDate,
    competition: match.competition?.name || "Fixture",
    venue: match.venue || undefined,
    status: match.status,
    homeScore: match.score?.fullTime?.home ?? null,
    awayScore: match.score?.fullTime?.away ?? null
  } satisfies Fixture));
}

export async function GET() {
  let fixtures: Fixture[] = [];
  try { fixtures = await fetchFootballData(); } catch { fixtures = []; }
  if (!fixtures.length) fixtures = verifiedFixtures;
  fixtures.sort((a, b) => Date.parse(a.kickoffUtc) - Date.parse(b.kickoffUtc));
  return NextResponse.json({
    fixtures,
    refreshedAt: new Date().toISOString(),
    mode: process.env.FOOTBALL_DATA_API_KEY ? "live" : "verified-fallback"
  }, {
    headers: { "Cache-Control": "public, s-maxage=900, stale-while-revalidate=1800" }
  });
}
