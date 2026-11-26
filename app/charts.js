// America by the Numbers — hand-drawn SVG charts. No libraries, no network.
// Every chart is built from plain data arrays and returns an SVG string.

export function fmt(value, format) {
  if (value === null || value === undefined) return '—';
  if (value === 0) return '0';
  switch (format) {
    case 'usd':
      if (value >= 1000000) return '$' + (value / 1000000).toFixed(1) + 'M';
      if (value >= 1000) return '$' + Math.round(value).toLocaleString('en-US');
      return '$' + value;
    case 'tn':
      return '$' + value.toFixed(value < 10 ? 2 : 1) + 'T';
    case 'bn':
      return '$' + Math.round(value).toLocaleString('en-US') + 'B';
    case 'm':
      return value.toFixed(1) + 'M';
    case 'pct':
      return value.toFixed(1) + '%';
    default:
      return Number.isInteger(value) ? value.toLocaleString('en-US') : value.toFixed(1);
  }
}

// The bare number for big-value headings, where the unit is printed
// separately in a <small>. fmt() above appends the unit itself, which
// would double it ("$29.7T trillion $").
export function fmtNum(value, format) {
  if (value === null || value === undefined) return '—';
  switch (format) {
    case 'usd':
      if (value >= 1000) return Math.round(value).toLocaleString('en-US');
      return value.toFixed(2);
    case 'tn':
      return value.toFixed(value < 10 ? 2 : 1);
    case 'bn':
      return Math.round(value).toLocaleString('en-US');
    case 'm':
      return value.toFixed(1);
    case 'pct':
      return value.toFixed(1);
    default:
      return Number.isInteger(value) ? value.toLocaleString('en-US') : value.toFixed(1);
  }
}

function niceMax(values) {
  const max = Math.max(...values);
  if (max <= 0) return 1;
  const pow = Math.pow(10, Math.floor(Math.log10(max)));
  const norm = max / pow;
  const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 2.5 ? 2.5 : norm <= 5 ? 5 : 10;
  return step * pow;
}

function niceMin(values) {
  const min = Math.min(...values);
  if (min >= 0) return 0;
  const pow = Math.pow(10, Math.floor(Math.log10(Math.abs(min))));
  const norm = Math.abs(min) / pow;
  const step = norm <= 1 ? 1 : norm <= 2 ? 2 : norm <= 5 ? 5 : 10;
  return -step * pow;
}

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Line chart with area fill, dots and year labels. series: numbers,
// years: matching labels, color: stroke color.
export function lineChart(series, years, color, opts = {}) {
  const w = opts.width || 560;
  const h = opts.height || 200;
  const padL = 46;
  const padR = 10;
  const padT = 12;
  const padB = 24;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const max = niceMax(series);
  const min = niceMin(series);
  const span = max - min || 1;
  const x = (i) => padL + (i / (series.length - 1)) * iw;
  const y = (v) => padT + (1 - (v - min) / span) * ih;
  const points = series.map((v, i) => [x(i), y(v)]);
  const line = points.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  const area = line + ' L' + x(series.length - 1).toFixed(1) + ',' + (padT + ih) + ' L' + x(0).toFixed(1) + ',' + (padT + ih) + ' Z';
  const grid = [0.25, 0.5, 0.75].map((f) => {
    const gy = padT + ih * f;
    return `<line x1="${padL}" y1="${gy}" x2="${w - padR}" y2="${gy}" class="grid"/>`;
  }).join('');
  const labels = years.filter((_, i) => i % 2 === 0 || i === years.length - 1).map((yr, k, arr) => {
    const i = years.indexOf(yr);
    return `<text x="${x(i)}" y="${h - 6}" class="axis" text-anchor="middle">${yr}</text>`;
  }).join('');
  const dots = points.filter((_, i) => i === 0 || i === points.length - 1 || i % 3 === 0)
    .map(([px, py]) => `<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="3" fill="${color}"/>`).join('');
  const last = series[series.length - 1];
  const first = series[0];
  const delta = last - first;
  const deltaText = (delta >= 0 ? '+' : '') + fmt(Math.abs(delta), opts.format || 'num');
  return `<svg viewBox="0 0 ${w} ${h}" class="chart" role="img" aria-label="Trend chart">
    <text x="${padL}" y="${padT + 2}" class="axis" text-anchor="start">${fmt(max, opts.format || 'num')}</text>
    <text x="${padL}" y="${padT + ih}" class="axis" text-anchor="start">${fmt(min, opts.format || 'num')}</text>
    ${grid}
    <path d="${area}" fill="${color}" fill-opacity="0.12"/>
    <path d="${line}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round"/>
    ${dots}
    ${labels}
    <text x="${w - padR}" y="${padT + 2}" class="axis delta" text-anchor="end">10-yr ${deltaText}</text>
  </svg>`;
}

// Vertical bar chart. values: numbers, labels: category labels.
export function barChart(values, labels, color, opts = {}) {
  const w = opts.width || 560;
  const h = opts.height || 220;
  const padL = 46;
  const padR = 10;
  const padT = 12;
  const padB = 24;
  const iw = w - padL - padR;
  const ih = h - padT - padB;
  const max = niceMax(values);
  const slot = iw / values.length;
  const bw = Math.min(42, slot * 0.62);
  const bars = values.map((v, i) => {
    const bh = (v / max) * ih;
    const bx = padL + i * slot + (slot - bw) / 2;
    const by = padT + ih - bh;
    return `<rect x="${bx.toFixed(1)}" y="${by.toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="3" fill="${color}" fill-opacity="${i === values.length - 1 ? 1 : 0.55}"/><text x="${(bx + bw / 2).toFixed(1)}" y="${(by - 5).toFixed(1)}" class="axis" text-anchor="middle">${fmt(v, opts.format || 'num')}</text><text x="${(bx + bw / 2).toFixed(1)}" y="${h - 6}" class="axis" text-anchor="middle">${esc(labels[i])}</text>`;
  }).join('');
  return `<svg viewBox="0 0 ${w} ${h}" class="chart" role="img" aria-label="Bar chart">
    <text x="${padL}" y="${padT + 2}" class="axis" text-anchor="start">${fmt(max, opts.format || 'num')}</text>
    <line x1="${padL}" y1="${padT + ih}" x2="${w - padR}" y2="${padT + ih}" class="axis-line"/>
    ${bars}
  </svg>`;
}

// Donut chart. parts: [{label, value, color}]. Shows legend beside it.
export function donut(parts, opts = {}) {
  const size = opts.size || 190;
  const cx = size / 2;
  const cy = size / 2;
  const r = size / 2 - 14;
  const thick = opts.thick || 26;
  const total = parts.reduce((a, p) => a + p.value, 0);
  let angle = -Math.PI / 2;
  const arcs = parts.map((p) => {
    const frac = p.value / total;
    const a0 = angle;
    const a1 = angle + frac * Math.PI * 2;
    angle = a1;
    const large = frac > 0.5 ? 1 : 0;
    const x0 = cx + r * Math.cos(a0);
    const y0 = cy + r * Math.sin(a0);
    const x1 = cx + r * Math.cos(a1);
    const y1 = cy + r * Math.sin(a1);
    return `<path d="M ${x0.toFixed(1)} ${y0.toFixed(1)} A ${r} ${r} 0 ${large} 1 ${x1.toFixed(1)} ${y1.toFixed(1)}" fill="none" stroke="${p.color}" stroke-width="${thick}" stroke-linecap="butt"/>`;
  }).join('');
  const legend = parts.map((p) => `<div class="legend-row"><span class="swatch" style="background:${p.color}"></span><span class="legend-label">${esc(p.label)}</span><span class="legend-value">${p.value.toFixed(1)}%</span></div>`).join('');
  return `<div class="donut-wrap">
    <svg viewBox="0 0 ${size} ${size}" class="donut" role="img" aria-label="Share chart">
      ${arcs}
      <text x="${cx}" y="${cy - 2}" class="donut-big" text-anchor="middle">${esc(opts.center || '')}</text>
      <text x="${cx}" y="${cy + 16}" class="donut-small" text-anchor="middle">${esc(opts.centerSub || '')}</text>
    </svg>
    <div class="legend">${legend}</div>
  </div>`;
}

// Horizontal comparison bars: rows [{label, value, max, color}].
export function hbars(rows, format, opts = {}) {
  const max = Math.max(...rows.map((r) => r.max || r.value));
  const body = rows.map((r) => {
    const pct = Math.max(2, (r.value / max) * 100);
    return `<div class="hbar-row">
      <span class="hbar-label">${esc(r.label)}</span>
      <span class="hbar-track"><span class="hbar-fill" style="width:${pct.toFixed(1)}%;background:${r.color || '#2563eb'}"></span></span>
      <span class="hbar-value">${fmt(r.value, format)}</span>
    </div>`;
  }).join('');
  return `<div class="hbars">${body}</div>`;
}

// Tiny sparkline for KPI cards. series: numbers.
export function sparkline(series, color, w = 120, h = 36) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const span = max - min || 1;
  const pts = series.map((v, i) => [
    (i / (series.length - 1)) * (w - 4) + 2,
    h - 4 - ((v - min) / span) * (h - 8),
  ]);
  const d = pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0].toFixed(1) + ',' + p[1].toFixed(1)).join(' ');
  return `<svg viewBox="0 0 ${w} ${h}" class="spark" aria-hidden="true"><path d="${d}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round"/></svg>`;
}
