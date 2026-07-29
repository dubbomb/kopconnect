:root {
  color-scheme: light;
  --red: #c8102e;
  --red-dark: #9f0c24;
  --bg: #f5f6f8;
  --card: #ffffff;
  --soft: #f0f2f5;
  --text: #111827;
  --muted: #667085;
  --line: #e1e5ea;
  --green: #0d7a4f;
  --blue: #2563eb;
  --gold: #a66a00;
  --shadow: 0 10px 28px rgba(16, 24, 40, .07);
}

:root[data-theme="dark"] {
  color-scheme: dark;
  --bg: #090d13;
  --card: #111821;
  --soft: #161f2a;
  --text: #f7f8fa;
  --muted: #9aa4b2;
  --line: #27313e;
  --shadow: 0 12px 32px rgba(0, 0, 0, .28);
}

* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body { margin: 0; background: var(--bg); color: var(--text); font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
a { color: inherit; text-decoration: none; }
button, input { font: inherit; }
button { color: inherit; }

.site-header { position: sticky; top: 0; z-index: 50; height: 68px; border-bottom: 1px solid var(--line); background: color-mix(in srgb, var(--bg) 90%, transparent); backdrop-filter: blur(18px); }
.header-inner { width: min(1180px, calc(100% - 32px)); height: 100%; margin: auto; display: flex; align-items: center; gap: 28px; }
.brand { min-width: max-content; display: flex; flex-direction: column; line-height: 1.05; }
.brand strong { font-size: 18px; letter-spacing: -.025em; }
.brand span { margin-top: 5px; display: flex; align-items: center; gap: 6px; color: var(--muted); font-size: 10px; font-weight: 800; letter-spacing: .16em; text-transform: uppercase; }
.brand i, .refresh-status i { width: 7px; height: 7px; border-radius: 50%; background: var(--red); box-shadow: 0 0 0 5px color-mix(in srgb, var(--red) 15%, transparent); }
nav { display: flex; gap: 3px; }
nav a { padding: 9px 11px; border-radius: 9px; color: var(--muted); font-size: 13px; font-weight: 750; }
nav a:hover { background: var(--soft); color: var(--text); }
.theme-button { margin-left: auto; width: 38px; height: 38px; border: 1px solid var(--line); border-radius: 11px; background: var(--card); cursor: pointer; font-size: 17px; }

.shell { width: min(1180px, calc(100% - 32px)); margin: auto; padding: 30px 0 80px; }
.compact-intro { display: flex; align-items: end; justify-content: space-between; gap: 24px; padding-bottom: 24px; border-bottom: 1px solid var(--line); }
.section-kicker { color: var(--red); font-size: 10px; font-weight: 900; letter-spacing: .17em; text-transform: uppercase; }
.compact-intro h1 { margin: 6px 0 0; font-size: clamp(28px, 4vw, 44px); line-height: 1.05; letter-spacing: -.04em; }
.refresh-status { display: flex; align-items: center; gap: 8px; color: var(--muted); font-size: 12px; font-weight: 700; white-space: nowrap; }

.section-block { scroll-margin-top: 92px; margin-top: 28px; }
.section-heading { margin-bottom: 15px; display: flex; align-items: end; justify-content: space-between; gap: 20px; }
.section-heading h2 { margin: 5px 0 0; font-size: 23px; line-height: 1.18; letter-spacing: -.025em; }
.accuracy-note, .reported-pill { border: 1px solid var(--line); border-radius: 999px; background: var(--card); color: var(--muted); padding: 7px 11px; font-size: 10px; font-weight: 850; text-transform: uppercase; letter-spacing: .09em; }

.transfer-list { display: grid; gap: 14px; }
.transfer-card { border: 1px solid var(--line); border-radius: 20px; background: var(--card); padding: 22px; box-shadow: var(--shadow); }
.transfer-topline { display: flex; justify-content: space-between; align-items: start; gap: 20px; }
.transfer-topline h2 { margin: 5px 0 2px; font-size: 27px; letter-spacing: -.035em; }
.transfer-topline p { margin: 0; color: var(--muted); font-size: 13px; }
.status-label { margin-top: 18px; padding: 13px 15px; border-left: 3px solid var(--red); border-radius: 0 10px 10px 0; background: var(--soft); font-size: 14px; font-weight: 800; }
.stage-grid { margin-top: 21px; display: grid; grid-template-columns: repeat(8, 1fr); gap: 7px; }
.stage { position: relative; min-width: 0; }
.stage-track { height: 8px; overflow: hidden; border-radius: 99px; background: var(--soft); }
.stage-track span { display: block; height: 100%; width: 0; background: var(--red); }
.stage.done .stage-track span { width: 100%; }
.stage-number { width: 24px; height: 24px; margin: 9px 0 6px; display: grid; place-items: center; border-radius: 50%; border: 1px solid var(--line); background: var(--card); font-size: 10px; font-weight: 900; }
.stage.done .stage-number { border-color: var(--red); background: var(--red); color: white; }
.stage > span { display: block; color: var(--muted); font-size: 10px; line-height: 1.25; font-weight: 750; }
.stage.done > span { color: var(--text); }
.transfer-foot { margin-top: 20px; padding-top: 16px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; align-items: center; gap: 18px; }
.transfer-foot p { margin: 0; max-width: 720px; color: var(--muted); font-size: 12px; line-height: 1.55; }
.transfer-foot a { color: var(--red); font-size: 12px; font-weight: 850; white-space: nowrap; }
.completed-strip { margin-top: 12px; padding: 14px 16px; display: flex; flex-wrap: wrap; align-items: center; gap: 10px; border: 1px solid var(--line); border-radius: 15px; background: var(--card); }
.completed-strip > strong { margin-right: 4px; font-size: 12px; }
.completed-strip a { display: flex; align-items: center; gap: 7px; padding: 8px 10px; border-radius: 10px; background: var(--soft); font-size: 12px; font-weight: 800; }
.completed-strip a span { color: var(--green); }
.completed-strip a small { color: var(--muted); font-weight: 600; }

.content-grid { display: grid; grid-template-columns: minmax(0, 1fr) 335px; gap: 30px; align-items: start; }
.news-heading { align-items: center; }
.search-box { min-width: 260px; display: flex; align-items: center; gap: 8px; padding: 10px 12px; border: 1px solid var(--line); border-radius: 12px; background: var(--card); }
.search-box span { color: var(--muted); }
.search-box input { width: 100%; min-width: 0; border: 0; outline: 0; background: transparent; color: var(--text); font-size: 13px; }
.filter-row { display: flex; gap: 7px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none; }
.filter-row::-webkit-scrollbar { display: none; }
.filter-row button { padding: 8px 12px; border: 1px solid var(--line); border-radius: 999px; background: var(--card); color: var(--muted); cursor: pointer; font-size: 11px; font-weight: 800; white-space: nowrap; }
.filter-row button.active { border-color: var(--red); background: var(--red); color: white; }
.new-updates { position: sticky; top: 80px; z-index: 15; margin: 15px auto 0; display: block; padding: 10px 16px; border: 0; border-radius: 999px; background: var(--red); color: white; cursor: pointer; box-shadow: 0 10px 24px rgba(200, 16, 46, .2); font-size: 12px; font-weight: 900; }
.timeline { margin-top: 17px; }
.timeline-row { position: relative; display: grid; grid-template-columns: 64px 12px minmax(0, 1fr); gap: 12px; padding-bottom: 18px; }
.timeline-row:not(:last-child)::after { content: ""; position: absolute; left: 81px; top: 24px; bottom: -2px; width: 1px; background: var(--line); }
.timeline-time { padding-top: 15px; text-align: right; }
.timeline-time span { display: block; font-size: 12px; font-weight: 900; }
.timeline-time small { display: block; margin-top: 3px; color: var(--muted); font-size: 9px; font-weight: 700; }
.timeline-dot { z-index: 1; width: 10px; height: 10px; margin-top: 19px; border: 2px solid var(--red); border-radius: 50%; background: var(--bg); }
.story-card { border: 1px solid var(--line); border-radius: 17px; background: var(--card); padding: 19px; box-shadow: var(--shadow); }
.story-meta { display: flex; align-items: center; gap: 7px; flex-wrap: wrap; font-size: 11px; font-weight: 800; }
.muted { color: var(--muted); }
.badge { padding: 5px 8px; border-radius: 999px; font-size: 9px; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; }
.badge-official { background: #fff3c4; color: #805000; }
.badge-tier-1 { background: #d9f5e8; color: #08613d; }
.badge-tier-2 { background: #dceaff; color: #174ea6; }
.badge-reported { background: var(--soft); color: var(--muted); }
.merged-pill { margin-left: auto; color: var(--muted); font-size: 9px; }
.story-card h3 { margin: 13px 0 0; font-size: 20px; line-height: 1.2; letter-spacing: -.025em; }
.story-card > p { margin: 9px 0 0; color: var(--muted); font-size: 13px; line-height: 1.65; }
.story-footer { margin-top: 15px; display: flex; align-items: center; justify-content: space-between; gap: 14px; }
.tag-row { display: flex; flex-wrap: wrap; gap: 6px; }
.tag-row span { padding: 5px 8px; border-radius: 8px; background: var(--soft); color: var(--muted); font-size: 9px; font-weight: 800; }
.story-footer a { color: var(--red); font-size: 11px; font-weight: 900; white-space: nowrap; }
.empty-state { border: 1px dashed var(--line); border-radius: 16px; padding: 40px; text-align: center; color: var(--muted); }

.fixtures-section { position: sticky; top: 92px; }
.timezone-note { margin: -6px 0 13px; color: var(--muted); font-size: 11px; }
.fixtures-list { display: grid; gap: 10px; }
.fixture-card { display: block; border: 1px solid var(--line); border-radius: 15px; background: var(--card); padding: 14px; transition: transform .18s ease, border-color .18s ease; }
.fixture-card:hover { transform: translateY(-2px); border-color: color-mix(in srgb, var(--red) 45%, var(--line)); }
.fixture-card.featured { border-top: 3px solid var(--red); box-shadow: var(--shadow); }
.fixture-top { display: flex; justify-content: space-between; gap: 10px; color: var(--muted); font-size: 9px; font-weight: 850; text-transform: uppercase; letter-spacing: .08em; }
.fixture-teams { margin-top: 12px; display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 7px; font-size: 13px; }
.fixture-teams strong:last-child { text-align: right; }
.fixture-teams span { color: var(--muted); font-size: 10px; }
.fixture-time { margin-top: 10px; font-size: 12px; font-weight: 900; }
.fixture-venue { margin-top: 3px; color: var(--muted); font-size: 10px; }
.countdown { margin-top: 12px; padding: 8px 10px; border-radius: 9px; background: var(--soft); color: var(--red); font-size: 11px; font-weight: 900; }

footer { width: min(1180px, calc(100% - 32px)); margin: 0 auto 28px; padding-top: 20px; border-top: 1px solid var(--line); display: flex; justify-content: space-between; gap: 20px; color: var(--muted); font-size: 10px; }
footer strong { color: var(--text); }

@media (max-width: 900px) {
  .content-grid { grid-template-columns: 1fr; }
  .fixtures-section { position: static; }
  .stage-grid { grid-template-columns: repeat(4, 1fr); row-gap: 18px; }
  nav { display: none; }
}

@media (max-width: 640px) {
  .header-inner, .shell, footer { width: min(100% - 22px, 1180px); }
  .shell { padding-top: 22px; }
  .compact-intro { align-items: start; flex-direction: column; gap: 12px; }
  .compact-intro h1 { font-size: 31px; }
  .section-heading, .news-heading, .transfer-topline, .transfer-foot { align-items: start; flex-direction: column; }
  .search-box { width: 100%; min-width: 0; }
  .transfer-card { padding: 17px; }
  .stage-grid { grid-template-columns: repeat(2, 1fr); }
  .timeline-row { grid-template-columns: 44px 10px minmax(0, 1fr); gap: 8px; }
  .timeline-row:not(:last-child)::after { left: 57px; }
  .timeline-time span { font-size: 10px; }
  .timeline-time small { font-size: 8px; }
  .story-card { padding: 15px; }
  .story-card h3 { font-size: 17px; }
  .story-footer { align-items: start; flex-direction: column; }
  .completed-strip { align-items: stretch; flex-direction: column; }
  .completed-strip a { justify-content: flex-start; }
  footer { flex-direction: column; }
}
