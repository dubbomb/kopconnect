# KopConnect.WH — Live Newsroom

A streamlined, deployment-ready Liverpool FC transfer newsroom.

## What it does

- Aggregates real Liverpool stories from approved APIs and RSS feeds.
- Keeps short summaries and always links to the original publisher.
- Merges similar headlines instead of posting duplicate cards.
- Shows source reliability labels without invented accuracy percentages.
- Displays a manually verified, segmented transfer-stage tracker.
- Fetches fixtures from football-data.org and converts UTC kick-off times to the visitor's device timezone.
- Falls back to a curated set of verified stories and official fixtures when API keys are not configured.
- Refreshes news every three minutes and fixtures every fifteen minutes.

## Run locally

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000`.

## Deploy to Vercel

1. Push this folder to GitHub.
2. Import it in Vercel.
3. Add the environment variables from `.env.example`.
4. Deploy.

The site works immediately using the verified fallback dataset. Add `NEWS_API_KEY`, `GUARDIAN_API_KEY`, approved `CUSTOM_RSS_FEEDS`, and `FOOTBALL_DATA_API_KEY` for continuously updated public data.

## Editorial rules

- Do not scrape sites that prohibit it.
- Use official APIs or publisher-provided RSS feeds.
- Store only metadata, a short original summary, and the source URL.
- Never present a reported stage as an official club announcement.
- The transfer tracker is deliberately manual because automatic stage inference can misrepresent negotiations.

## Updating the transfer tracker

Edit `lib/verified-data.ts`. Only mark a stage complete when the linked source clearly supports it. Keep the note explicit when the status is reported rather than official.

## Current verified seed

The included fallback was checked on 29 July 2026 and includes:

- Bradley Barcola: agreement in principle reported; club valuation gap remains.
- Víctor Muñoz: agreement announced by Liverpool.
- Jérémy Jacquet: signing completed by Liverpool.
- Liverpool's next official pre-season and Premier League fixtures.
