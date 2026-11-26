// America by the Numbers — page renderers. Each returns an HTML string;
// main.js mounts it and wires up the controls.

import { META, HEADLINE, YEARS, TOPICS, STATES, NATIONAL, AGE_GROUPS, SECTORS, ENERGY_MIX, SPENDING, findTopic, findState, searchAll } from './data.js';
import { fmt, fmtNum, lineChart, barChart, donut, hbars, sparkline } from './charts.js';

const TOPIC_COLORS = ['#2563eb', '#059669', '#d97706', '#7c3aed', '#dc2626', '#0891b2', '#16a34a', '#475569'];

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function kpiCard(h, i) {
  const up = h.change >= 0;
  const arrow = up ? '▲' : '▼';
  const good = (h.id === 'unemployment' || h.id === 'inflation' || h.id === 'debt') ? !up : up;
  return `<a class="kpi" href="#/topic/${h.id === 'population' ? 'people' : h.id === 'gdp' || h.id === 'gdp-per-capita' ? 'economy' : h.id === 'unemployment' || h.id === 'income' ? 'work' : h.id === 'life-expectancy' ? 'health' : h.id === 'inflation' ? 'economy' : 'government'}">
    <span class="kpi-name">${esc(h.name)}</span>
    <span class="kpi-value">${fmtNum(h.value, h.format)} <small>${esc(h.unit)}</small></span>
    <span class="kpi-foot">${sparkline(h.spark, TOPIC_COLORS[i % 8])}<span class="kpi-change ${good ? 'good' : 'bad'}">${arrow} ${Math.abs(h.change)}${h.changeUnit} <em>vs 2023</em></span></span>
    <span class="kpi-src">${esc(h.source)} · ${h.year}</span>
  </a>`;
}

export function homeView() {
  const cards = HEADLINE.map((h, i) => kpiCard(h, i)).join('');
  const topics = TOPICS.map((t, i) => `<a class="topic-card" href="#/topic/${t.slug}" style="--tc:${t.color}">
    <span class="topic-icon">${t.icon}</span>
    <span class="topic-name">${esc(t.name)}</span>
    <span class="topic-count">${t.indicators.length} indicators</span>
    <span class="topic-intro">${esc(t.intro.slice(0, 90))}…</span>
  </a>`).join('');
  const topStates = [...STATES].sort((a, b) => b.pop - a.pop).slice(0, 8);
  const stateRows = topStates.map((s, i) => `<tr><td>${i + 1}</td><td><a href="#/state/${s.code}">${esc(s.name)}</a></td><td>${s.pop.toFixed(1)}M</td><td>$${s.gdp.toLocaleString('en-US')}B</td><td>$${s.income.toLocaleString('en-US')}</td></tr>`).join('');
  return `<section class="hero">
    <p class="eyebrow">The United States · 2015–2024 · ${META.indicators} indicators · ${META.states} states</p>
    <h1>America by<br>the Numbers</h1>
    <p class="lede">Every number that matters about the United States — population, economy, work, schools, health, homes, energy and the national debt — in one place, charted over a decade and open for anyone to explore.</p>
    <div class="hero-actions">
      <a class="btn primary" href="#/states">Explore the 50 states</a>
      <a class="btn" href="#/topic/economy">Start with the economy</a>
    </div>
  </section>
  <section class="section">
    <h2>The nation at a glance <span class="h2-sub">2024, latest available</span></h2>
    <div class="kpi-grid">${cards}</div>
  </section>
  <section class="section">
    <h2>Browse by topic</h2>
    <div class="topic-grid">${topics}</div>
  </section>
  <section class="section duo">
    <div class="panel">
      <h3>Who Americans are</h3>
      <p class="panel-sub">Population by age group, 2024</p>
      ${donut(AGE_GROUPS.map((g, i) => ({ label: g.label + ' years', value: g.value, color: ['#2563eb', '#60a5fa', '#f59e0b', '#f97316', '#dc2626'][i] })), { center: '340M', centerSub: 'people' })}
      <p class="panel-note">The 65+ group has grown every year of the decade, from 14.9% to 17.9%.</p>
    </div>
    <div class="panel">
      <h3>How America makes electricity</h3>
      <p class="panel-sub">Generation mix, 2024</p>
      ${donut(ENERGY_MIX.map((g, i) => ({ label: g.label, value: g.value, color: ['#475569', '#78350f', '#7c3aed', '#38bdf8', '#2563eb', '#f59e0b', '#94a3b8'][i] })), { center: '22.8%', centerSub: 'renewables' })}
      <p class="panel-note">Wind and solar now generate more electricity than coal.</p>
    </div>
  </section>
  <section class="section">
    <h2>Largest states <a class="h2-link" href="#/states">See all 51 →</a></h2>
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>#</th><th>State</th><th>Population</th><th>GDP</th><th>Median income</th></tr></thead>
      <tbody>${stateRows}</tbody>
    </table></div>
  </section>
  <section class="section note-strip">
    <p><strong>About the numbers.</strong> Every figure is a rounded public statistic, labelled with its year and source. Figures are estimates compiled from the Census Bureau, BEA, BLS, CDC and other federal releases. <a href="#/sources">Read the methodology →</a></p>
  </section>`;
}

export function topicView(slug) {
  const t = findTopic(slug);
  if (!t) return `<section class="section"><h2>Topic not found</h2><p><a href="#/">Back home</a></p></section>`;
  const cards = t.indicators.map((ind) => `<article class="ind-card" id="ind-${ind.id}">
    <header><h3>${esc(ind.name)}</h3><span class="ind-value">${fmtNum(ind.value, ind.format)} <small>${esc(ind.unit)}</small></span></header>
    <p class="ind-src">${esc(ind.source)} · ${ind.year}</p>
    ${lineChart(ind.series, YEARS, t.color, { format: ind.format })}
    <p class="ind-note">${esc(ind.note)}</p>
  </article>`).join('');
  const extra = slug === 'people'
    ? `<article class="ind-card"><header><h3>Population by age group</h3><span class="ind-value">17.9% <small>aged 65+</small></span></header><p class="ind-src">Census Bureau · 2024</p>${donut(AGE_GROUPS.map((g, i) => ({ label: g.label + ' years', value: g.value, color: ['#2563eb', '#60a5fa', '#f59e0b', '#f97316', '#dc2626'][i] })), { center: '340M', centerSub: 'people' })}<p class="ind-note">The age pyramid is top-heavy: the 65+ group is the fastest-growing of all.</p></article>`
    : slug === 'economy'
    ? `<article class="ind-card"><header><h3>GDP by sector</h3><span class="ind-value">79.5% <small>services</small></span></header><p class="ind-src">BEA · 2024</p>${donut(SECTORS.map((g, i) => ({ label: g.label, value: g.value, color: ['#059669', '#2563eb', '#f59e0b', '#94a3b8'][i] })), { center: '$29.7T', centerSub: 'GDP' })}<p class="ind-note">Services dominate; manufacturing is about a tenth of output.</p></article>`
    : slug === 'energy'
    ? `<article class="ind-card"><header><h3>Electricity generation mix</h3><span class="ind-value">22.8% <small>renewables</small></span></header><p class="ind-src">EIA · 2024</p>${donut(ENERGY_MIX.map((g, i) => ({ label: g.label, value: g.value, color: ['#475569', '#78350f', '#7c3aed', '#38bdf8', '#2563eb', '#f59e0b', '#94a3b8'][i] })), { center: '22.8%', centerSub: 'renewables' })}<p class="ind-note">Natural gas is still the largest single source, at 43%.</p></article>`
    : slug === 'government'
    ? `<article class="ind-card"><header><h3>Where federal money goes</h3><span class="ind-value">$6.75T <small>spent in 2024</small></span></header><p class="ind-src">CBO · 2024</p>${barChart(SPENDING.slice(0, 6).map((s) => s.value), SPENDING.slice(0, 6).map((s) => s.label.split(' ')[0]), '#475569', { format: 'bn', height: 200 })}<p class="ind-note">Health and Social Security together are nearly half of all spending.</p></article>`
    : '';
  return `<section class="topic-hero" style="--tc:${t.color}">
    <p class="eyebrow"><a href="#/">Home</a> / ${esc(t.name)}</p>
    <h1>${t.icon} ${esc(t.name)}</h1>
    <p class="lede">${esc(t.intro)}</p>
  </section>
  <section class="section"><div class="ind-grid">${cards}${extra}</div></section>`;
}

export function statesView(sortKey = 'pop', query = '') {
  const rows = [...STATES]
    .filter((s) => !query || s.name.toLowerCase().includes(query.toLowerCase()))
    .sort((a, b) => (typeof a[sortKey] === 'string' ? a[sortKey].localeCompare(b[sortKey]) : b[sortKey] - a[sortKey]));
  const body = rows.map((s, i) => `<tr>
    <td>${i + 1}</td>
    <td><a href="#/state/${s.code}"><strong>${esc(s.name)}</strong></a></td>
    <td>${s.pop.toFixed(2)}M</td>
    <td>$${s.gdp.toLocaleString('en-US')}B</td>
    <td>$${s.income.toLocaleString('en-US')}</td>
    <td>${s.unemp.toFixed(1)}%</td>
    <td>${s.life.toFixed(1)} yrs</td>
  </tr>`).join('');
  const sortBtn = (key, label) => `<button class="sort-btn ${sortKey === key ? 'active' : ''}" data-sort="${key}">${label}</button>`;
  return `<section class="section">
    <p class="eyebrow"><a href="#/">Home</a> / States</p>
    <h1>All 50 states + DC</h1>
    <p class="lede">Every state, ranked. Click a column to re-sort, or search for a state. Figures are 2024 estimates, rounded.</p>
    <div class="controls">
      <input id="state-search" type="search" placeholder="Search a state…" value="${esc(query)}" aria-label="Search states">
      <div class="sort-group">${sortBtn('pop', 'Population')}${sortBtn('gdp', 'GDP')}${sortBtn('income', 'Income')}${sortBtn('unemp', 'Unemployment')}${sortBtn('life', 'Life expectancy')}</div>
    </div>
    <p class="result-count">${rows.length} of 51 shown</p>
    <div class="table-wrap"><table class="data-table">
      <thead><tr><th>#</th><th>State</th><th>Population</th><th>GDP</th><th>Median income</th><th>Unemployment</th><th>Life expectancy</th></tr></thead>
      <tbody>${body || '<tr><td colspan="7">No states match that search.</td></tr>'}</tbody>
    </table></div>
    <p class="panel-note">Sources: Census Bureau (population), BEA (GDP), Census ACS (income), BLS (unemployment), CDC (life expectancy).</p>
    <p><a class="btn" href="#/compare">Compare two states →</a></p>
  </section>`;
}

export function stateView(code) {
  const s = findState(code);
  if (!s) return `<section class="section"><h2>State not found</h2><p><a href="#/states">Back to all states</a></p></section>`;
  const gdpPerCapita = Math.round((s.gdp * 1000) / s.pop);
  const natGdpPerCapita = Math.round((NATIONAL.gdp * 1000) / NATIONAL.pop);
  const rows = [
    { label: 'Population', value: s.pop, max: 39.4, color: '#2563eb' },
    { label: 'GDP', value: s.gdp, max: 4245, color: '#059669' },
    { label: 'Median income', value: s.income, max: 108000, color: '#d97706' },
    { label: 'Unemployment', value: s.unemp, max: 5.7, color: '#dc2626' },
    { label: 'Life expectancy', value: s.life, max: 81.9, color: '#7c3aed' },
  ];
  const rankPop = [...STATES].sort((a, b) => b.pop - a.pop).findIndex((x) => x.code === s.code) + 1;
  const rankGdp = [...STATES].sort((a, b) => b.gdp - a.gdp).findIndex((x) => x.code === s.code) + 1;
  return `<section class="section">
    <p class="eyebrow"><a href="#/">Home</a> / <a href="#/states">States</a> / ${esc(s.name)}</p>
    <h1>${esc(s.name)} <span class="h2-sub">${s.code}</span></h1>
    <p class="lede">${esc(s.name)} is the #${rankPop} largest state by population and #${rankGdp} by GDP. Its GDP per person is $${gdpPerCapita.toLocaleString('en-US')}, against a national $${natGdpPerCapita.toLocaleString('en-US')}.</p>
    <div class="kpi-grid">
      <div class="kpi static"><span class="kpi-name">Population</span><span class="kpi-value">${s.pop.toFixed(2)}M</span><span class="kpi-src">Census Bureau · 2024</span></div>
      <div class="kpi static"><span class="kpi-name">GDP</span><span class="kpi-value">$${s.gdp.toLocaleString('en-US')}B</span><span class="kpi-src">BEA · 2024</span></div>
      <div class="kpi static"><span class="kpi-name">Median income</span><span class="kpi-value">$${s.income.toLocaleString('en-US')}</span><span class="kpi-src">Census ACS · 2023</span></div>
      <div class="kpi static"><span class="kpi-name">Unemployment</span><span class="kpi-value">${s.unemp.toFixed(1)}%</span><span class="kpi-src">BLS · 2024</span></div>
      <div class="kpi static"><span class="kpi-name">Life expectancy</span><span class="kpi-value">${s.life.toFixed(1)} yrs</span><span class="kpi-src">CDC · 2023</span></div>
    </div>
    <div class="panel">
      <h3>${esc(s.name)} against the biggest in the country</h3>
      <p class="panel-sub">Bars are scaled to the largest state in each measure</p>
      ${hbars([
        { label: 'Population (M)', value: s.pop, max: 39.4, color: '#2563eb' },
        { label: 'GDP ($B)', value: s.gdp, max: 4245, color: '#059669' },
        { label: 'Median income ($)', value: s.income, max: 108000, color: '#d97706' },
        { label: 'Life expectancy (yrs)', value: s.life, max: 81.9, color: '#7c3aed' },
      ], 'num')}
      <p class="panel-note">National averages: population 340.1M · GDP $29.7T · median income $81,500 · unemployment 4.0% · life expectancy 78.6 years.</p>
    </div>
    <p><a class="btn" href="#/compare">Compare ${esc(s.name)} with another state →</a> <a class="btn" href="#/states">← All states</a></p>
  </section>`;
}

export function compareView(a = 'CA', b = 'TX') {
  const sa = findState(a) || findState('CA');
  const sb = findState(b) || findState('TX');
  const opt = (sel) => STATES.map((s) => `<option value="${s.code}" ${s.code === sel ? 'selected' : ''}>${esc(s.name)}</option>`).join('');
  const rows = [
    { label: 'Population', key: 'pop', fmt: (v) => v.toFixed(2) + 'M' },
    { label: 'GDP', key: 'gdp', fmt: (v) => '$' + v.toLocaleString('en-US') + 'B' },
    { label: 'Median income', key: 'income', fmt: (v) => '$' + v.toLocaleString('en-US') },
    { label: 'Unemployment', key: 'unemp', fmt: (v) => v.toFixed(1) + '%' },
    { label: 'Life expectancy', key: 'life', fmt: (v) => v.toFixed(1) + ' yrs' },
  ];
  const body = rows.map((r) => {
    const va = sa[r.key];
    const vb = sb[r.key];
    const winA = r.key === 'unemp' ? va < vb : va > vb;
    return `<tr><td>${r.label}</td><td class="${winA ? 'win' : ''}">${r.fmt(va)}</td><td class="${!winA ? 'win' : ''}">${r.fmt(vb)}</td></tr>`;
  }).join('');
  return `<section class="section">
    <p class="eyebrow"><a href="#/">Home</a> / Compare</p>
    <h1>Compare two states</h1>
    <p class="lede">Pick any two states and see them head to head. The better figure in each row is highlighted.</p>
    <div class="controls">
      <label>State A <select id="cmp-a">${opt(sa.code)}</select></label>
      <label>State B <select id="cmp-b">${opt(sb.code)}</select></label>
    </div>
    <div class="table-wrap"><table class="data-table compare">
      <thead><tr><th>Measure</th><th><a href="#/state/${sa.code}">${esc(sa.name)}</a></th><th><a href="#/state/${sb.code}">${esc(sb.name)}</a></th></tr></thead>
      <tbody>${body}</tbody>
    </table></div>
    <p class="panel-note">Lower unemployment wins; for every other measure, higher wins. Figures are 2024 estimates, rounded.</p>
  </section>`;
}

export function searchView(q) {
  const res = searchAll(q);
  const indRows = res.indicators.map((i) => `<a class="search-row" href="#/topic/${i.topicSlug}"><span class="search-kind">Indicator</span><span class="search-name">${esc(i.name)}</span><span class="search-meta">${esc(i.topic)} · ${fmtNum(i.value, i.format)} ${esc(i.unit)}</span></a>`).join('');
  const stateRows = res.states.map((s) => `<a class="search-row" href="#/state/${s.code}"><span class="search-kind">State</span><span class="search-name">${esc(s.name)}</span><span class="search-meta">${s.pop.toFixed(1)}M people · $${s.gdp.toLocaleString('en-US')}B GDP</span></a>`).join('');
  const topicRows = res.topics.map((t) => `<a class="search-row" href="#/topic/${t.slug}"><span class="search-kind">Topic</span><span class="search-name">${esc(t.name)}</span><span class="search-meta">${t.indicators.length} indicators</span></a>`).join('');
  const total = res.indicators.length + res.states.length + res.topics.length;
  return `<section class="section">
    <p class="eyebrow"><a href="#/">Home</a> / Search</p>
    <h1>Search results for “${esc(q)}”</h1>
    <p class="lede">${total} result${total === 1 ? '' : 's'} across ${META.indicators} indicators, ${META.states} states and ${META.topics} topics.</p>
    <div class="search-results">${topicRows}${indRows}${stateRows || ''}</div>
    ${total === 0 ? '<p>Nothing matched. Try “unemployment”, “Texas” or “debt”.</p>' : ''}
  </section>`;
}

export function sourcesView() {
  const list = META.sources.map((s) => `<li>${esc(s)}</li>`).join('');
  return `<section class="section">
    <p class="eyebrow"><a href="#/">Home</a> / Methodology</p>
    <h1>Methodology &amp; sources</h1>
    <p class="lede">How the numbers on this site were put together, and what they are — and are not.</p>
    <div class="panel">
      <h3>What this site is</h3>
      <p>America by the Numbers is a single-page statistics site covering the United States from 2015 to 2024. It holds ${META.indicators} indicators across ${META.topics} topics, plus comparable figures for all ${META.states} states and the District of Columbia. Everything runs offline in your browser: no accounts, no tracking, no network calls.</p>
      <h3>Where the numbers come from</h3>
      <ul class="source-list">${list}</ul>
      <h3>How to read them</h3>
      <ul class="source-list">
        <li>All figures are rounded estimates compiled from the public releases above. Where releases disagree on a year, the most recent vintage is used.</li>
        <li>Money figures are nominal dollars unless a note says otherwise. GDP per person divides nominal GDP by the Census population estimate.</li>
        <li>State GDP and income figures are 2024 estimates rounded to the nearest $5 billion and $1,000 respectively; small states carry the widest rounding.</li>
        <li>Series run 2015–2024. A few 2024 values are early estimates and may be revised in the next release cycle.</li>
        <li>Unemployment is the annual average of the monthly rate. The poverty rate uses the official Census measure.</li>
      </ul>
      <h3>What it is not</h3>
      <p>This is a demonstration dataset built from public statistics, not a live feed from any agency. Do not cite it in place of the original releases — every indicator names its source so you can check the original.</p>
      <p class="panel-note">Last updated ${esc(META.updated)} · Coverage ${esc(META.coverage)}</p>
    </div>
  </section>`;
}

export function notFoundView() {
  return `<section class="section"><h1>Page not found</h1><p class="lede">That page does not exist on this site.</p><p><a class="btn primary" href="#/">Back home</a></p></section>`;
}
