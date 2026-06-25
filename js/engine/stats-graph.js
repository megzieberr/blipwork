/* ============================================================
   STATS GRAPH ENGINE  (shared rendering core)
   ------------------------------------------------------------
   The stats equivalent of Circle Quest's diagram engine. Every
   graph is drawn from real data through ONE linear scale, so a
   pixel position always means exactly one data value. Read-offs
   (median off an ogive, a value off a box plot) are COMPUTED by
   the engine from the data — never hand-typed — so a question's
   answer can never disagree with its own picture.

   Each chart type exposes three functions:
     computeX(spec) -> geometry: concrete pixel coords for every
                       feature, plus the scales (the single source
                       of truth; render and verify both use it).
     renderX(spec)  -> an SVG string built from the geometry.
     verifyX(spec)  -> independently re-derives each declared value
                       back out of the geometry and checks it lands
                       where the data says. "Graphs cannot lie."

   Dispatchers renderGraph(spec) / verifyGraph(spec) switch on
   spec.type ("box" | "ogive" | "hist" | "numline").

   Colours come from CSS: elements carry classes (.sg-*), the
   per-quest accent is a CSS var --accent set on the <svg>. So the
   engine is theme-agnostic; styles.css (or verify.html) paints it.
   ============================================================ */

/* ---------- number helpers ---------- */

/* round to 1 decimal for SVG coords (keeps files small + stable) */
const N = v => Math.round(v * 10) / 10;

/* SA convention: comma decimal separator. dp = decimal places (auto if null). */
export function fmt(v, dp = null) {
  if (v == null || Number.isNaN(v)) return "";
  let s = (dp == null) ? String(Math.round(v * 1000) / 1000) : v.toFixed(dp);
  return s.replace(".", ",");
}

/* a linear scale value<->pixel. p0..p1 may run either direction (y is flipped). */
function makeScale(d0, d1, p0, p1) {
  const span = (d1 - d0) || 1;
  return {
    d0, d1, p0, p1,
    toPx: v => p0 + (v - d0) / span * (p1 - p0),
    toVal: px => d0 + (px - p0) / (p1 - p0) * span,
  };
}

/* a "nice" step (1/2/5 × 10^k) for ~target gridlines across a range */
function niceStep(range, target = 5) {
  const raw = Math.abs(range) / target || 1;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const norm = raw / mag;
  const step = (norm < 1.5 ? 1 : norm < 3 ? 2 : norm < 7 ? 5 : 10) * mag;
  return step;
}

/* round an [min,max] outward to a nice step */
function niceAxis(min, max, target = 5) {
  const step = niceStep(max - min, target);
  return { min: Math.floor(min / step) * step, max: Math.ceil(max / step) * step, step };
}

/* ---------- tiny SVG builders ---------- */
function line(x1, y1, x2, y2, cls, style = "") {
  return `<line class="${cls}" x1="${N(x1)}" y1="${N(y1)}" x2="${N(x2)}" y2="${N(y2)}"${style ? ` style="${style}"` : ""}/>`;
}
function text(x, y, str, cls, anchor = "middle") {
  return `<text class="${cls}" x="${N(x)}" y="${N(y)}" text-anchor="${anchor}">${str}</text>`;
}
function svgWrap(W, H, accent, inner, cls = "") {
  // only pin --accent when a spec asks for one; otherwise inherit it from the
  // surrounding screen (so a quest's graphs take the quest's colour via CSS).
  const style = accent ? ` style="--accent:${accent}"` : "";
  return `<svg class="sg ${cls}" viewBox="0 0 ${W} ${H}" role="img" preserveAspectRatio="xMidYMid meet"${style}>${inner}</svg>`;
}

/* draw an axis (horizontal) with ticks + labels from a scale */
function axisX(sx, axis, yBase, opts = {}) {
  let out = line(sx.toPx(axis.min), yBase, sx.toPx(axis.max), yBase, "sg-axis");
  const dp = opts.dp ?? 0;
  const skip = opts.skipNear || [];          // px positions whose tick number to hide (a read-off value sits there)
  for (let v = axis.min; v <= axis.max + 1e-9; v += axis.step) {
    const x = sx.toPx(v);
    out += line(x, yBase, x, yBase + 4, "sg-axis");
    if (!skip.some(px => Math.abs(px - x) < 9)) out += text(x, yBase + 15, fmt(v, dp), "sg-lab");
  }
  if (opts.title) out += text((sx.toPx(axis.min) + sx.toPx(axis.max)) / 2, yBase + 30, opts.title, "sg-title");
  return out;
}

/* ============================================================
   1 · BOX-AND-WHISKER
   spec: { type:"box", five:{min,q1,med,q3,max}, axis?:{min,max,step},
           outliers?:[v,...], title?, showValues?:bool, w?, h? }
   ============================================================ */
export function computeBox(spec) {
  const W = spec.w || 360, H = spec.h || 150;
  const L = 22, R = 22, top = 30, bottom = 30;
  const f = spec.five;
  const allVals = [f.min, f.q1, f.med, f.q3, f.max, ...(spec.outliers || [])];
  const dMin = Math.min(...allVals), dMax = Math.max(...allVals);
  const axis = spec.axis || niceAxis(dMin - (dMax - dMin) * 0.08, dMax + (dMax - dMin) * 0.08, 5);
  const sx = makeScale(axis.min, axis.max, L, W - R);
  const cy = (top + (H - bottom)) / 2;
  const bh = 16, cap = 10;
  return {
    type: "box", W, H, axis, sx, cy, bh, cap, yBase: H - bottom, five: f,
    outliers: (spec.outliers || []).map(v => ({ v, x: sx.toPx(v) })),
    px: {
      min: sx.toPx(f.min), q1: sx.toPx(f.q1), med: sx.toPx(f.med),
      q3: sx.toPx(f.q3), max: sx.toPx(f.max),
    },
  };
}

export function renderBox(spec) {
  const g = computeBox(spec);
  const { px, cy, bh, cap } = g;
  let out = axisX(g.sx, g.axis, g.yBase, { title: spec.title });

  // whiskers + caps
  out += line(px.min, cy, px.q1, cy, "sg-whisk");
  out += line(px.q3, cy, px.max, cy, "sg-whisk");
  out += line(px.min, cy - cap, px.min, cy + cap, "sg-whisk");
  out += line(px.max, cy - cap, px.max, cy + cap, "sg-whisk");

  // box + median
  out += `<rect class="sg-box" x="${N(px.q1)}" y="${N(cy - bh)}" width="${N(px.q3 - px.q1)}" height="${N(bh * 2)}" rx="3"/>`;
  out += line(px.med, cy - bh, px.med, cy + bh, "sg-med");

  // outliers (dots beyond the whiskers)
  g.outliers.forEach(o => { out += `<circle class="sg-outlier" cx="${N(o.x)}" cy="${N(cy)}" r="3"/>`; });

  // optional value labels above each marker
  if (spec.showValues !== false) {
    const lab = (x, v) => text(x, cy - bh - 7, fmt(v, spec.dp ?? null), "sg-val");
    out += lab(px.min, g.five.min) + lab(px.q1, g.five.q1) + lab(px.med, g.five.med) + lab(px.q3, g.five.q3) + lab(px.max, g.five.max);
  }
  return svgWrap(g.W, g.H, spec.accent, out, "sg-box-chart");
}

export function verifyBox(spec, tol = 0.5) {
  const g = computeBox(spec);
  const f = g.five, r = [];
  // 1) data sanity: five-number summary must be ordered
  const ordered = f.min <= f.q1 && f.q1 <= f.med && f.med <= f.q3 && f.q3 <= f.max;
  r.push({ label: "five-number summary ordered (min≤Q1≤med≤Q3≤max)", ok: ordered });
  // 2) every feature sits inside the drawn axis (not clipped)
  const inRange = [f.min, f.q1, f.med, f.q3, f.max].every(v => v >= g.axis.min - 1e-9 && v <= g.axis.max + 1e-9);
  r.push({ label: "all values fall within the drawn axis", ok: inRange });
  // 3) INDEPENDENT re-read: invert the scale on each drawn pixel, must recover the value
  for (const k of ["min", "q1", "med", "q3", "max"]) {
    const back = g.sx.toVal(g.px[k]);
    r.push({ label: `${k} drawn at value ${fmt(f[k])} → reads back ${fmt(back)}`, ok: Math.abs(back - f[k]) <= tol });
  }
  // 4) pixels strictly increase left→right (catches a flipped/broken scale)
  const monotonic = g.px.min <= g.px.q1 && g.px.q1 <= g.px.med && g.px.med <= g.px.q3 && g.px.q3 <= g.px.max;
  r.push({ label: "pixel order matches value order", ok: monotonic });
  return r;
}

/* ============================================================
   2 · OGIVE (cumulative frequency curve)
   spec: { type:"ogive", classes:[{lower,upper,freq}],
           readCum?:[level,...], readVal?:[x,...], title?, w?, h? }
   Cumulative totals + anchor are computed here, so they cannot be
   mis-authored. Points plot at (upper boundary ; cumulative freq);
   the curve anchors at (lower boundary of first class ; 0).
   ============================================================ */
function ogivePoints(classes) {
  // value-space points: anchor then one per class
  const pts = [{ x: classes[0].lower, y: 0 }];
  let cum = 0;
  classes.forEach(c => { cum += c.freq; pts.push({ x: c.upper, y: cum }); });
  return { pts, n: cum };
}
/* Monotone cubic (Fritsch–Carlson) tangents — a smooth, S-shaped curve
   that NEVER overshoots, so the drawn line stays within the data and any
   read-off taken off it is truthful. This is how a learner draws an ogive. */
function monoSlopes(pts) {
  const n = pts.length, d = [], m = new Array(n);
  for (let i = 0; i < n - 1; i++) d[i] = (pts[i + 1].y - pts[i].y) / ((pts[i + 1].x - pts[i].x) || 1);
  m[0] = d[0]; m[n - 1] = d[n - 2];
  for (let i = 1; i < n - 1; i++) m[i] = (d[i - 1] * d[i] <= 0) ? 0 : (d[i - 1] + d[i]) / 2;
  for (let i = 0; i < n - 1; i++) {                       // clamp tangents so the curve can't overshoot
    if (d[i] === 0) { m[i] = 0; m[i + 1] = 0; continue; }
    const a = m[i] / d[i], b = m[i + 1] / d[i], s = a * a + b * b;
    if (s > 9) { const t = 3 / Math.sqrt(s); m[i] = t * a * d[i]; m[i + 1] = t * b * d[i]; }
  }
  return m;
}
/* the smooth curve's cumulative frequency at a given x (value) */
function curveY(pts, m, x) {
  if (x <= pts[0].x) return pts[0].y;
  for (let i = 1; i < pts.length; i++) {
    if (x <= pts[i].x + 1e-9) {
      const a = pts[i - 1], b = pts[i], h = (b.x - a.x) || 1, t = (x - a.x) / h;
      const h00 = 2*t*t*t - 3*t*t + 1, h10 = t*t*t - 2*t*t + t, h01 = -2*t*t*t + 3*t*t, h11 = t*t*t - t*t;
      return h00 * a.y + h10 * h * m[i - 1] + h01 * b.y + h11 * h * m[i];
    }
  }
  return pts[pts.length - 1].y;
}
/* invert the smooth curve: the x where cumulative frequency reaches cf
   (monotone, so a bisection on the spanning segment is exact) */
function curveXatCum(pts, m, cf) {
  if (cf <= pts[0].y) return pts[0].x;
  for (let i = 1; i < pts.length; i++) {
    if (cf <= pts[i].y + 1e-9) {
      let lo = pts[i - 1].x, hi = pts[i].x;
      for (let k = 0; k < 40; k++) { const mid = (lo + hi) / 2; if (curveY(pts, m, mid) < cf) lo = mid; else hi = mid; }
      return (lo + hi) / 2;
    }
  }
  return pts[pts.length - 1].x;
}

export function computeOgive(spec) {
  const W = spec.w || 360, H = spec.h || 210;
  const L = 34, R = 14, top = 12, bottom = 30;
  const { pts, n } = ogivePoints(spec.classes);
  const m = monoSlopes(pts);
  const xLo = pts[0].x, xHi = pts[pts.length - 1].x;
  const xAxis0 = spec.axis || niceAxis(xLo, xHi, 6);
  // keep the true data x-range even if niceAxis widened it (anchor must be exact)
  const ax = { min: Math.min(xAxis0.min, xLo), max: Math.max(xAxis0.max, xHi), step: xAxis0.step };
  const yAxis = niceAxis(0, n, 5); yAxis.min = 0;
  const sx = makeScale(ax.min, ax.max, L, W - R);
  const sy = makeScale(yAxis.min, yAxis.max, H - bottom, top);

  const pxPts = pts.map(p => ({ ...p, px: sx.toPx(p.x), py: sy.toPx(p.y) }));

  // the smooth ogive as cubic Béziers built from the monotone tangents
  let dPath = `M ${N(pxPts[0].px)} ${N(pxPts[0].py)}`;
  for (let i = 1; i < pts.length; i++) {
    const h = (pts[i].x - pts[i - 1].x) || 1;
    const c1x = sx.toPx(pts[i - 1].x + h / 3), c1y = sy.toPx(pts[i - 1].y + m[i - 1] * h / 3);
    const c2x = sx.toPx(pts[i].x - h / 3), c2y = sy.toPx(pts[i].y - m[i] * h / 3);
    dPath += ` C ${N(c1x)} ${N(c1y)} ${N(c2x)} ${N(c2y)} ${N(pxPts[i].px)} ${N(pxPts[i].py)}`;
  }

  // read-offs computed ON the smooth curve, so the dashed lines and stated answer can't lie
  const readCum = (spec.readCum || []).map(level => {
    const lv = Math.max(0, Math.min(level, n));
    const x = curveXatCum(pts, m, lv);
    return { level: lv, x, px: sx.toPx(x), py: sy.toPx(lv) };
  });
  const readVal = (spec.readVal || []).map(x => {
    const cum = curveY(pts, m, x);
    return { x, cum, px: sx.toPx(x), py: sy.toPx(cum) };
  });

  return { type: "ogive", W, H, sx, sy, m, xAxis: ax, yAxis, pts, pxPts, n, dPath, readCum, readVal, yBase: H - bottom };
}

export function renderOgive(spec) {
  const g = computeOgive(spec);
  let out = "";

  // y gridlines + labels
  for (let v = 0; v <= g.yAxis.max + 1e-9; v += g.yAxis.step) {
    const y = g.sy.toPx(v);
    out += line(g.sx.toPx(g.xAxis.min), y, g.sx.toPx(g.xAxis.max), y, "sg-grid");
    out += text(g.sx.toPx(g.xAxis.min) - 6, y + 3, fmt(v, 0), "sg-lab", "end");
  }
  // x axis — hide any tick number sitting under a read-off (the read-off value goes there instead)
  const readXpx = [...g.readCum, ...g.readVal].map(rd => rd.px);
  out += axisX(g.sx, g.xAxis, g.yBase, { title: spec.title, skipNear: readXpx });

  // read-off lines to the COMPUTED point on the smooth curve; the value is labelled BELOW the axis
  const readLine = (rd, showVal) => {
    let s = line(g.sx.toPx(g.xAxis.min), rd.py, rd.px, rd.py, "sg-read");   // horizontal from the y-axis
    s += line(rd.px, rd.py, rd.px, g.yBase, "sg-read");                      // vertical down to the x-axis
    s += `<circle class="sg-read-dot" cx="${N(rd.px)}" cy="${N(rd.py)}" r="3.2"/>`;
    if (showVal) s += text(rd.px, g.yBase + 15, fmt(rd.x, spec.dp ?? 0), "sg-read-lab");
    return s;
  };
  g.readCum.forEach(rd => out += readLine(rd, true));
  g.readVal.forEach(rd => out += readLine(rd, false));

  // the smooth ogive + plotted points
  out += `<path class="sg-line" d="${g.dPath}" fill="none"/>`;
  g.pxPts.slice(1).forEach(p => out += `<circle class="sg-pt" cx="${N(p.px)}" cy="${N(p.py)}" r="2.6"/>`);

  return svgWrap(g.W, g.H, spec.accent, out, "sg-ogive-chart");
}

export function verifyOgive(spec, tol = 0.6) {
  const g = computeOgive(spec), r = [];
  // 1) cumulative frequencies are non-decreasing and end at n
  let mono = true; for (let i = 1; i < g.pts.length; i++) if (g.pts[i].y < g.pts[i - 1].y - 1e-9) mono = false;
  r.push({ label: "cumulative frequency never decreases", ok: mono });
  r.push({ label: `final cumulative frequency equals n (=${g.n})`, ok: Math.abs(g.pts[g.pts.length - 1].y - g.n) < 1e-9 });
  // 2) anchored at (lower boundary of first class ; 0)
  const a = g.pts[0];
  r.push({ label: `curve anchored at (${fmt(a.x)} ; 0)`, ok: a.y === 0 && Math.abs(g.sy.toPx(0) - g.yBase) < 0.5 });
  // 3) each plotted point reads back to (upper boundary ; cumulative freq)
  let cum = 0;
  spec.classes.forEach((c, i) => {
    cum += c.freq;
    const p = g.pxPts[i + 1];
    const bx = g.sx.toVal(p.px), by = g.sy.toVal(p.py);
    r.push({ label: `point ${i + 1} plotted at (${fmt(c.upper)} ; ${fmt(cum)}) → reads (${fmt(bx)} ; ${fmt(by)})`, ok: Math.abs(bx - c.upper) <= tol && Math.abs(by - cum) <= tol });
  });
  // 4) every read-off dot lies ON the smooth curve (curve's y at that x equals the dot's level)
  g.readCum.forEach((rd, i) => {
    const yc = curveY(g.pts, g.m, rd.x);
    r.push({ label: `read-off ${i + 1}: cum ${fmt(rd.level)} off the curve → ${fmt(rd.x)} marks`, ok: Math.abs(yc - rd.level) <= tol });
  });
  g.readVal.forEach((rd, i) => {
    const yc = curveY(g.pts, g.m, rd.x);
    r.push({ label: `read-off at ${fmt(rd.x)} → cum ${fmt(rd.cum)} lies on the curve`, ok: Math.abs(yc - rd.cum) <= tol });
  });
  return r;
}

/* derive the true read-off answers for the question layer (so answers are
   never hand-typed): the value at a cumulative level, or vice versa — both
   taken off the same smooth curve the learner sees. */
export function ogiveAnswerAtCum(spec, level) { const { pts, n } = ogivePoints(spec.classes); const m = monoSlopes(pts); return curveXatCum(pts, m, Math.max(0, Math.min(level, n))); }
export function ogiveAnswerAtVal(spec, x) { const { pts } = ogivePoints(spec.classes); const m = monoSlopes(pts); return curveY(pts, m, x); }

/* ============================================================
   3 · HISTOGRAM
   spec: { type:"hist", classes:[{lower,upper,freq}], title?, w?, h? }
   ============================================================ */
export function computeHist(spec) {
  const W = spec.w || 360, H = spec.h || 200;
  const L = 30, R = 14, top = 14, bottom = 30;
  const cls = spec.classes;
  const xLo = cls[0].lower, xHi = cls[cls.length - 1].upper;
  const maxF = Math.max(...cls.map(c => c.freq));
  const yAxis = niceAxis(0, maxF, 5); yAxis.min = 0;
  const xStep = niceStep(xHi - xLo, cls.length);
  const xAxis = { min: xLo, max: xHi, step: cls.every(c => c.upper - c.lower === cls[0].upper - cls[0].lower) ? (cls[0].upper - cls[0].lower) : xStep };
  const sx = makeScale(xAxis.min, xAxis.max, L, W - R);
  const sy = makeScale(yAxis.min, yAxis.max, H - bottom, top);
  const bars = cls.map(c => ({
    lower: c.lower, upper: c.upper, freq: c.freq,
    x: sx.toPx(c.lower), w: sx.toPx(c.upper) - sx.toPx(c.lower),
    yTop: sy.toPx(c.freq), h: sy.toPx(0) - sy.toPx(c.freq),
  }));
  return { type: "hist", W, H, sx, sy, xAxis, yAxis, bars, yBase: H - bottom };
}

export function renderHist(spec) {
  const g = computeHist(spec);
  let out = "";
  for (let v = 0; v <= g.yAxis.max + 1e-9; v += g.yAxis.step) {
    const y = g.sy.toPx(v);
    out += line(g.sx.toPx(g.xAxis.min), y, g.sx.toPx(g.xAxis.max), y, "sg-grid");
    out += text(g.sx.toPx(g.xAxis.min) - 6, y + 3, fmt(v, 0), "sg-lab", "end");
  }
  g.bars.forEach(b => {
    out += `<rect class="sg-bar" x="${N(b.x)}" y="${N(b.yTop)}" width="${N(b.w)}" height="${N(b.h)}"/>`;
  });
  out += axisX(g.sx, g.xAxis, g.yBase, { title: spec.title });
  return svgWrap(g.W, g.H, spec.accent, out, "sg-hist-chart");
}

export function verifyHist(spec, tol = 0.6) {
  const g = computeHist(spec), r = [];
  r.push({ label: "all frequencies fall within the drawn axis", ok: g.bars.every(b => b.freq <= g.yAxis.max + 1e-9 && b.freq >= 0) });
  g.bars.forEach((b, i) => {
    const backF = g.sy.toVal(b.yTop);          // bar-top pixel → frequency
    const backLo = g.sx.toVal(b.x), backHi = g.sx.toVal(b.x + b.w);
    const ok = Math.abs(backF - b.freq) <= tol && Math.abs(backLo - b.lower) <= tol && Math.abs(backHi - b.upper) <= tol;
    r.push({ label: `bar ${i + 1} [${fmt(b.lower)};${fmt(b.upper)}) height ${fmt(b.freq)} → reads ${fmt(backF)}`, ok });
  });
  return r;
}

/* ============================================================
   4 · NUMBER LINE  (for tap-to-read questions)
   spec: { type:"numline", min, max, step, marks?:[{value,label?,id?}],
           title?, w?, h? }
   ============================================================ */
export function computeNumline(spec) {
  const W = spec.w || 360, H = spec.h || 80;
  const L = 22, R = 22, cy = 34;
  const axis = { min: spec.min, max: spec.max, step: spec.step || niceStep(spec.max - spec.min, 6) };
  const sx = makeScale(axis.min, axis.max, L, W - R);
  const marks = (spec.marks || []).map(m => ({ ...m, x: sx.toPx(m.value) }));
  return { type: "numline", W, H, sx, axis, cy, marks };
}

export function renderNumline(spec) {
  const g = computeNumline(spec);
  let out = axisX(g.sx, g.axis, g.cy, { title: spec.title });
  g.marks.forEach(m => {
    out += `<circle class="sg-pt" cx="${N(m.x)}" cy="${N(g.cy)}" r="4"/>`;
    if (m.label) out += text(m.x, g.cy - 10, m.label, "sg-val");
  });
  return svgWrap(g.W, g.H, spec.accent, out, "sg-numline-chart");
}

export function verifyNumline(spec, tol = 0.5) {
  const g = computeNumline(spec), r = [];
  g.marks.forEach((m, i) => {
    const back = g.sx.toVal(m.x);
    r.push({ label: `mark ${i + 1} at value ${fmt(m.value)} → reads ${fmt(back)}`, ok: Math.abs(back - m.value) <= tol && m.value >= g.axis.min - 1e-9 && m.value <= g.axis.max + 1e-9 });
  });
  return r;
}

/* ============================================================
   DISPATCHERS
   ============================================================ */
export function renderGraph(spec) {
  switch (spec.type) {
    case "box": return renderBox(spec);
    case "ogive": return renderOgive(spec);
    case "hist": return renderHist(spec);
    case "numline": return renderNumline(spec);
    default: return `<svg class="sg" viewBox="0 0 360 80"><text class="sg-lab" x="180" y="44" text-anchor="middle">unknown graph type: ${spec.type}</text></svg>`;
  }
}
export function verifyGraph(spec) {
  switch (spec.type) {
    case "box": return verifyBox(spec);
    case "ogive": return verifyOgive(spec);
    case "hist": return verifyHist(spec);
    case "numline": return verifyNumline(spec);
    default: return [{ label: `unknown graph type: ${spec.type}`, ok: false }];
  }
}
