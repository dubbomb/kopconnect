import { NextResponse } from "next/server";
import { getAggregatedStories } from "@/lib/news-aggregator";

export const revalidate = 180;

export async function GET() {
  const stories = await getAggregatedStories();
  return NextResponse.json({
    stories,
    refreshedAt: new Date().toISOString(),
    mode: process.env.NEWS_API_KEY || process.env.GUARDIAN_API_KEY || process.env.CUSTOM_RSS_FEEDS ? "live" : "verified-fallback"
  }, {
    headers: { "Cache-Control": "public, s-maxage=180, stale-while-revalidate=300" }
  });
}
