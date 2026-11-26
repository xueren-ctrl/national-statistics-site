// America by the Numbers — logic tests. Run: node --test test/site.test.mjs
// Checks the dataset is self-consistent, the charts render, and the views
// produce the pages they promise. No browser needed.

import test from 'node:test';
import assert from 'node:assert/strict';
import { META, HEADLINE, YEARS, TOPICS, STATES, NATIONAL, AGE_GROUPS, SECTORS, ENERGY_MIX, SPENDING, findTopic, findState, allIndicators, searchAll } from '../app/data.js';
import { fmt, lineChart, barChart, donut, hbars, sparkline } from '../app/charts.js';
import { homeView, topicView, statesView, stateView, compareView, searchView, sourcesView } from '../app/views.js';

test('meta counts match the data', () => {
  assert.equal(TOPICS.length, META.topics);
  assert.equal(STATES.length, META.states);
  assert.equal(allIndicators().length, META.indicators);
});

test('every headline indicator has a 10-year spark series', () => {
  for (const h of HEADLINE) {
    assert.equal(h.spark.length, 10, h.id);
    assert.equal(h.spark[h.spark.length - 1], h.value, h.id + ' latest matches');
  }
});

test('every topic indicator has a 10-year series ending at its value', () => {
  for (const t of TOPICS) {
    assert.equal(t.indicators.length, 8, t.slug);
    for (const ind of t.indicators) {
      assert.equal(ind.series.length, 10, ind.id);
      assert.equal(ind.series[ind.series.length - 1], ind.value, ind.id + ' latest matches');
      assert.ok(ind.note.length > 20, ind.id + ' has a note');
      assert.ok(ind.source.length > 2, ind.id + ' has a source');
    }
  }
});

test('years are 2015-2024 in order', () => {
  assert.deepEqual(YEARS, [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024]);
});

test('state figures are sane', () => {
  const codes = new Set();
  let popSum = 0;
  for (const s of STATES) {
    assert.ok(!codes.has(s.code), 'duplicate code ' + s.code);
    codes.add(s.code);
    assert.ok(s.pop > 0.1 && s.pop < 45, s.code + ' pop');
    assert.ok(s.gdp > 20 && s.gdp < 5000, s.code + ' gdp');
    assert.ok(s.income > 40000 && s.income < 130000, s.code + ' income');
    assert.ok(s.unemp > 1 && s.unemp < 8, s.code + ' unemp');
    assert.ok(s.life > 70 && s.life < 85, s.code + ' life');
    popSum += s.pop;
  }
  // State populations sum to roughly the national total.
  assert.ok(Math.abs(popSum - NATIONAL.pop) < 8, 'state pops sum to ' + popSum.toFixed(1));
});

test('state lookups work', () => {
  assert.equal(findState('ca').name, 'California');
  assert.equal(findState('TX').name, 'Texas');
  assert.equal(findState('DC').name, 'District of Columbia');
  assert.equal(findState('ZZ'), undefined);
  assert.equal(findTopic('economy').name, 'Economy');
  assert.equal(findTopic('nope'), undefined);
});

test('shares sum to about 100', () => {
  const age = AGE_GROUPS.reduce((a, g) => a + g.value, 0);
  assert.ok(Math.abs(age - 100) < 0.5, 'age groups ' + age);
  const mix = ENERGY_MIX.reduce((a, g) => a + g.value, 0);
  assert.ok(Math.abs(mix - 100) < 0.5, 'energy mix ' + mix);
});

test('spending adds up near the 2024 total', () => {
  const total = SPENDING.reduce((a, s) => a + s.value, 0);
  assert.ok(total > 6000 && total < 7000, 'spending total ' + total);
});

test('formatting covers every format used', () => {
  assert.equal(fmt(340.1, 'm'), '340.1M');
  assert.equal(fmt(29.7, 'tn'), '$29.7T');
  assert.equal(fmt(1211, 'bn'), '$1,211B');
  assert.equal(fmt(81500, 'usd'), '$81,500');
  assert.equal(fmt(4.0, 'pct'), '4.0%');
  assert.equal(fmt(78.6, 'num'), '78.6');
  assert.equal(fmt(null, 'num'), '—');
});

test('charts return svg with the data in it', () => {
  const line = lineChart([1, 2, 3, 4], [2021, 2022, 2023, 2024], '#2563eb', { format: 'num' });
  assert.match(line, /<svg/);
  assert.match(line, /2021/);
  assert.match(line, /2024/);
  const bars = barChart([10, 20, 30], ['A', 'B', 'C'], '#059669');
  assert.match(bars, /<rect/);
  assert.match(bars, />C</);
  const d = donut([{ label: 'X', value: 60, color: '#111' }, { label: 'Y', value: 40, color: '#222' }], { center: '100' });
  assert.match(d, /60.0%/);
  assert.match(d, /40.0%/);
  const hb = hbars([{ label: 'A', value: 5, max: 10 }], 'num');
  assert.match(hb, /hbar-fill/);
  const sp = sparkline([1, 3, 2, 5], '#2563eb');
  assert.match(sp, /<path/);
});

test('home view has every section', () => {
  const html = homeView();
  assert.match(html, /America by/);
  for (const h of HEADLINE) assert.ok(html.includes(h.name), h.name);
  for (const t of TOPICS) assert.ok(html.includes(t.name.replace(/&/g, '&amp;')), t.name);
  assert.match(html, /Largest states/);
  assert.match(html, /California/);
});

test('topic view renders each topic with all its indicators', () => {
  for (const t of TOPICS) {
    const html = topicView(t.slug);
    assert.ok(html.includes(t.name.replace(/&/g, '&amp;')), t.slug);
    for (const ind of t.indicators) assert.ok(html.includes(ind.name), ind.id);
    assert.match(html, /<svg/);
  }
  assert.match(topicView('nope'), /not found/);
});

test('states view sorts and filters', () => {
  const byPop = statesView('pop', '');
  assert.ok(byPop.indexOf('California') < byPop.indexOf('Texas'), 'pop order');
  const byIncome = statesView('income', '');
  assert.ok(byIncome.indexOf('District of Columbia') < byIncome.indexOf('Mississippi'), 'income order');
  const filtered = statesView('pop', 'texas');
  assert.ok(filtered.includes('Texas'), 'finds Texas');
  assert.ok(!filtered.includes('California'), 'excludes California');
  const none = statesView('pop', 'zzz');
  assert.match(none, /No states match/);
});

test('state view shows the state and its ranks', () => {
  const html = stateView('CA');
  assert.match(html, /California/);
  assert.match(html, /#1 largest/);
  assert.match(html, /hbar-fill/);
  assert.match(stateView('ZZ'), /not found/);
});

test('compare view highlights a winner per row', () => {
  const html = compareView('CA', 'TX');
  assert.match(html, /California/);
  assert.match(html, /Texas/);
  assert.match(html, /class="win"/);
});

test('search finds topics, indicators and states', () => {
  const r = searchAll('unemployment');
  assert.ok(r.indicators.length >= 1, 'indicator hit');
  const s = searchAll('texas');
  assert.equal(s.states.length, 1);
  assert.equal(s.states[0].code, 'TX');
  const t = searchAll('health');
  assert.ok(t.topics.length >= 1, 'topic hit');
  assert.deepEqual(searchAll(''), { topics: [], indicators: [], states: [] });
  const html = searchView('debt');
  assert.match(html, /Search results/);
  assert.match(html, /debt/i);
});

test('sources view lists every source', () => {
  const html = sourcesView();
  for (const s of META.sources) assert.ok(html.includes(s), s);
  assert.match(html, /Methodology/);
});
