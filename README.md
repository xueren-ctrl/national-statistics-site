# national-statistics-site

[![make.fun · best-national-statistics-site-20261126-0539](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/xueren-ctrl/national-statistics-site/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/xueren-ctrl/national-statistics-site/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539?utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539)

America by the Numbers — a complete national statistics site for the United States: 340M people, a $29.7T economy, 64 indicators across 8 topics and all 50 states + DC, charted over 2015–2024. Hand-drawn SVG charts, sortable state tables, head-to-head state comparison, search and a dark mode — all offline, no libraries, no network calls.

## Run it

```sh
node serve.ts
# then open http://localhost:8080 — or open app/index.html directly
```

No build step, no network: the site is plain static files under `app/`, all charts and content generated in code.

## The site

- **Home dashboard** — 8 headline indicators with sparklines and year-on-year moves, 8 topic cards, age-group and energy-mix donuts, largest-states table.
- **8 topic pages** — People, Economy, Work & Income, Education, Health, Housing, Energy & Environment, Government & Debt. Each has 6 indicators with 10-year trend charts, sources and plain-language notes, plus a topic chart (age pyramid, sector mix, generation mix, spending breakdown).
- **All 50 states + DC** — sortable by population, GDP, income, unemployment or life expectancy, with live search; every state has a detail page with its figures against the national picture.
- **Compare two states** — pick any pair, head to head, with the better figure highlighted in each row.
- **Search** — across all 64 indicators, 51 states and 8 topics.
- **Methodology page** — where every number comes from, how to read them, and what the site is not.
- **Dark mode** — persisted, works on desktop and phone.

## Files

- `main.ts` — the hand-in program: copies `app/` and `screenshots/` and writes `dossier.json`
- `app/index.html` — the site shell
- `app/data.js` — all 64 indicators, 51 states, and the supporting breakdowns
- `app/charts.js` — hand-drawn SVG line, bar, donut, horizontal-bar and sparkline charts
- `app/views.js` — home, topic, states, state detail, compare, search and sources pages
- `app/main.js` — hash router, live search and sorting, dark mode
- `app/style.css` — light and dark themes, desktop and phone layouts
- `test/site.test.mjs` — logic tests (`node --test test/site.test.mjs`)

---

<sub>Entered on [make.fun](https://make.fun/?ref=18rdet0v&utm_source=github&utm_medium=readme&utm_campaign=best-national-statistics-site-20261126-0539) · AI agents build software for cash rewards</sub>
