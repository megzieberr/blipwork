/* ============================================================
   GENERAL TRIG — shared helpers for the chapter (id `gtrig`)
   ------------------------------------------------------------
   Added stage 2 (2026-08-22), rounds gt1–gt3 (discovery). Every
   drawing helper here is COMPUTED (cos/sin, or the engines the rest
   of the app already trusts) — nothing is a hand-drawn picture
   pretending to be to scale. The vocabulary and the colours are
   METHODS-trig.md's, not a textbook's:
     • ①yellow ②blue ③green ④pink — the p05 wheel/graph colours
       (Part B, flag F16 — this code is ONLY for p05's story; p23's
       green/blue/orange TIP-Chip colours are a different code and
       belong to round 6, not built yet).
     • Oats Are Healthy — the O/A/H table, built in HER order.
     • All Strippers Take Cash — the four words, anticlockwise from ①.
   Re-exports the plain question-authoring helpers so a quest file
   only ever imports from one place; explicitly does NOT re-export
   the EXP rose-red shade ramp (that belongs to Exponents & Surds).
   ============================================================ */
import { mc } from "./_shared.js";
import { ynQ, poolMC, poolYN } from "./_exp.js";
import { pick, shuffled, randInt } from "../ui.js";
import { rotatePts } from "../triglib.js";

export { mc, ynQ, poolMC, poolYN, pick, shuffled, randInt };

/* her p05 quadrant colours — ①②③④ — load-bearing for round 2's story */
export const QCOLOR = { 1: "#eab308", 2: "#3b82f6", 3: "#22c55e", 4: "#ec4899" };
const CIRC = { 1: "①", 2: "②", 3: "③", 4: "④" };

/* ------------------------------------------------------------
   crossSvg(ticks) — the plain tick cross as a static illustration
   (a non-interactive twin of tapcross.js's drawing — this one is
   for a reveal-frame CARD, never for input).
   ------------------------------------------------------------ */
export function crossSvg(ticks = []) {
  const VB = 220, MID = 110, ARM = 96;
  const BOX = { 1: { x: MID, y: MID - ARM }, 2: { x: MID - ARM, y: MID - ARM }, 3: { x: MID - ARM, y: MID }, 4: { x: MID, y: MID } };
  let out = `<svg class="sg gtrig-cross" viewBox="0 0 ${VB} ${VB}" role="img" preserveAspectRatio="xMidYMid meet">`;
  out += `<line x1="${MID - ARM - 8}" y1="${MID}" x2="${MID + ARM + 8}" y2="${MID}" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/>`;
  out += `<line x1="${MID}" y1="${MID - ARM - 8}" x2="${MID}" y2="${MID + ARM + 8}" stroke="var(--ink)" stroke-width="2" stroke-linecap="round"/>`;
  [1, 2, 3, 4].forEach(q => {
    if (!ticks.includes(q)) return;
    const b = BOX[q];
    out += `<text x="${b.x + ARM / 2}" y="${b.y + ARM / 2}" text-anchor="middle" dominant-baseline="middle" style="font-family:var(--font-display);font-weight:700;font-size:34px;fill:var(--accent)">✓</text>`;
  });
  out += `</svg>`;
  return out;
}

/* ------------------------------------------------------------
   astcWheelSvg() — the bow-tie diagram: two triangles meeting at
   the origin, ①②③④ circled in HER colours, degree marks at the
   four axis tips (Part B1). The four WORDS are not baked in here —
   round 2 reveals them as its own frame, right after this one.
   ------------------------------------------------------------ */
export function astcWheelSvg() {
  const VB = 240, MID = 120, ARM = 100;
  const Q = {
    1: { x: MID, y: MID - ARM, w: ARM, h: ARM },
    2: { x: MID - ARM, y: MID - ARM, w: ARM, h: ARM },
    3: { x: MID - ARM, y: MID, w: ARM, h: ARM },
    4: { x: MID, y: MID, w: ARM, h: ARM },
  };
  let out = `<svg class="sg gtrig-wheel" viewBox="0 0 ${VB} ${VB}" role="img" preserveAspectRatio="xMidYMid meet">`;
  [1, 2, 3, 4].forEach(q => {
    const b = Q[q];
    out += `<rect x="${b.x}" y="${b.y}" width="${b.w}" height="${b.h}" fill="${QCOLOR[q]}" opacity="0.16"/>`;
  });
  const top = { x: MID, y: MID - ARM }, bot = { x: MID, y: MID + ARM }, left = { x: MID - ARM, y: MID }, right = { x: MID + ARM, y: MID };
  out += `<path d="M ${top.x} ${top.y} L ${left.x} ${left.y} L ${right.x} ${right.y} Z" fill="none" stroke="var(--ink)" stroke-width="2" opacity=".55"/>`;
  out += `<path d="M ${bot.x} ${bot.y} L ${left.x} ${left.y} L ${right.x} ${right.y} Z" fill="none" stroke="var(--ink)" stroke-width="2" opacity=".55"/>`;
  out += `<line x1="${MID - ARM - 8}" y1="${MID}" x2="${MID + ARM + 8}" y2="${MID}" stroke="var(--ink)" stroke-width="2"/>`;
  out += `<line x1="${MID}" y1="${MID - ARM - 8}" x2="${MID}" y2="${MID + ARM + 8}" stroke="var(--ink)" stroke-width="2"/>`;
  const lab = (x, y, s, anchor) => `<text x="${x}" y="${y}" text-anchor="${anchor}" style="font-family:var(--font-num);font-size:12px;fill:var(--faint)">${s}</text>`;
  out += lab(MID, 14, "90°", "middle");
  // axis-end labels sit just BELOW the axis line (foreman review fix: they were on it)
  out += lab(4, MID + 16, "180°", "start");
  out += lab(MID, VB - 6, "270°", "middle");
  out += lab(VB - 4, MID + 16, "0°/360°", "end");
  [1, 2, 3, 4].forEach(q => {
    const b = Q[q];
    out += `<text x="${b.x + b.w / 2}" y="${b.y + b.h / 2}" text-anchor="middle" dominant-baseline="middle" style="font-size:30px;font-weight:700;fill:${QCOLOR[q]}">${CIRC[q]}</text>`;
  });
  out += `</svg>`;
  return out;
}

/* ------------------------------------------------------------
   oahTable(stage) — the O-A-H table, built in HER order (Part C3):
     0 empty grid · 1 +O/A/H rows · 2 +30/45/60 columns ·
     3 +row O · 4 +row A · 5 +row H (every value shown)
   Values are her digest's, unrationalised (flag F12).
   ------------------------------------------------------------ */
const OAH = { O: { 30: "1", 45: "1", 60: "√3" }, A: { 30: "√3", 45: "1", 60: "1" }, H: { 30: "2", 45: "√2", 60: "2" } };
const OAH_STAGE = { O: 3, A: 4, H: 5 };
export function oahTable(stage = 5) {
  const rows = ["O", "A", "H"], cols = [30, 45, 60];
  const showRowHead = stage >= 1, showColHead = stage >= 2;
  let html = `<table class="q-table gtrig-oah"><tr><th></th>`;
  cols.forEach(c => { html += `<th>${showColHead ? c + "°" : ""}</th>`; });
  html += `</tr>`;
  rows.forEach(r => {
    html += `<tr><th>${showRowHead ? r : ""}</th>`;
    cols.forEach(c => { html += `<td>${stage >= OAH_STAGE[r] ? OAH[r][c] : ""}</td>`; });
    html += `</tr>`;
  });
  html += `</table>`;
  return html;
}
/* the raw table, for skills that need to READ a cell (not just draw it) */
export const OAH_TABLE = OAH;

/* ------------------------------------------------------------
   circleFrame(deg, r) — "where do these ratios originate from"
   (Part A4/round-1 discovery beat): a point on a circle, COMPUTED
   from cos/sin so it's to scale by construction, with x/y drop
   lines and r labelled on the radius.
   ------------------------------------------------------------ */
export function circleFrame(deg, r = 80) {
  const VB = 240, cx = 120, cy = 120;
  const rad = (deg * Math.PI) / 180;
  const px = cx + r * Math.cos(rad), py = cy - r * Math.sin(rad);
  let out = `<svg class="sg gtrig-circle" viewBox="0 0 ${VB} ${VB}" role="img" preserveAspectRatio="xMidYMid meet">`;
  out += `<line x1="10" y1="${cy}" x2="${VB - 10}" y2="${cy}" stroke="var(--ink)" stroke-width="1.4" opacity=".6"/>`;
  out += `<line x1="${cx}" y1="${VB - 10}" x2="${cx}" y2="10" stroke="var(--ink)" stroke-width="1.4" opacity=".6"/>`;
  out += `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="var(--faint)" stroke-width="1.4"/>`;
  out += `<line x1="${cx}" y1="${cy}" x2="${px.toFixed(2)}" y2="${py.toFixed(2)}" stroke="var(--accent)" stroke-width="2"/>`;
  out += `<line x1="${px.toFixed(2)}" y1="${py.toFixed(2)}" x2="${px.toFixed(2)}" y2="${cy}" stroke="var(--warn)" stroke-width="1.4" stroke-dasharray="3 3"/>`;
  out += `<line x1="${px.toFixed(2)}" y1="${py.toFixed(2)}" x2="${cx}" y2="${py.toFixed(2)}" stroke="var(--good)" stroke-width="1.4" stroke-dasharray="3 3"/>`;
  out += `<circle cx="${px.toFixed(2)}" cy="${py.toFixed(2)}" r="4" fill="var(--accent)"/>`;
  const mx = (cx + px) / 2, my = (cy + py) / 2;
  out += `<text x="${mx.toFixed(1)}" y="${(my - 6).toFixed(1)}" text-anchor="middle" style="font-family:var(--font-num);font-size:12px;fill:var(--accent)">r</text>`;
  out += `<text x="${px.toFixed(1)}" y="${(cy + 14).toFixed(1)}" text-anchor="middle" style="font-family:var(--font-num);font-size:11px;fill:var(--warn)">x</text>`;
  out += `<text x="${(cx - 12).toFixed(1)}" y="${py.toFixed(1)}" text-anchor="end" style="font-family:var(--font-num);font-size:11px;fill:var(--good)">y</text>`;
  const arcR = 22, ax = cx + arcR, ay = cy;
  const bx = cx + arcR * Math.cos(rad), by = cy - arcR * Math.sin(rad);
  const big = deg > 180 ? 1 : 0;
  out += `<path d="M ${ax} ${ay} A ${arcR} ${arcR} 0 ${big} 0 ${bx.toFixed(2)} ${by.toFixed(2)}" fill="none" stroke="var(--faint)" stroke-width="1.2"/>`;
  out += `<text x="${(cx + arcR + 10).toFixed(1)}" y="${(cy - 6).toFixed(1)}" style="font-family:var(--font-num);font-size:11px;fill:var(--faint)">θ=${deg}°</text>`;
  out += `</svg>`;
  return out;
}

/* ------------------------------------------------------------
   special45Spec() / special30Spec() — the two special triangles,
   REAL coordinates, her exact layout (Part C2): bottom-left angle
   first, right angle bottom-right, top angle last. Fed straight
   into the existing triangle-graph engine (renderTriangle /
   verifyTriangle), so these are as accuracy-checked as any 2D-trig
   diagram in the app.
   ------------------------------------------------------------ */
export function special45Spec() {
  return {
    type: "triangle", w: 260, h: 200, hideNames: true,
    pts: { L: { x: 0, y: 0 }, R: { x: 1, y: 0 }, T: { x: 1, y: 1 } },
    poly: ["L", "R", "T"],
    angles: [{ at: "L", label: "45°" }, { at: "R", right: true }, { at: "T", label: "45°" }],
    sides: [{ from: "L", to: "R", label: "1" }, { from: "R", to: "T", label: "1" }, { from: "T", to: "L", label: "√2" }],
  };
}
export function special30Spec() {
  return {
    type: "triangle", w: 260, h: 200, hideNames: true,
    pts: { L: { x: 0, y: 0 }, R: { x: 1, y: 0 }, T: { x: 1, y: Math.sqrt(3) } },
    poly: ["L", "R", "T"],
    angles: [{ at: "L", label: "60°" }, { at: "R", right: true }, { at: "T", label: "30°" }],
    sides: [{ from: "L", to: "R", label: "1" }, { from: "R", to: "T", label: "√3" }, { from: "T", to: "L", label: "2" }],
  };
}

/* ------------------------------------------------------------
   rightTriangleThetaSpec() — a FRESH random right triangle each
   call (round-1 beat 3: "tap the side opposite/adjacent/the
   hypotenuse"). θ sits at vertex T; the right angle at R. NO
   numeric labels (the brief's rule — the learner reads O/A/H off
   the SHAPE, not off numbers). A random rotation makes "which
   corner is θ" genuinely vary sibling to sibling.
     ids.opp = the side that does NOT touch T  ("KR")
     ids.adj = the leg that DOES touch T        ("RT")
     ids.hyp = the side that does NOT touch R    ("TK")
   ------------------------------------------------------------ */
export function rightTriangleThetaSpec() {
  const a = randInt(3, 8), b = randInt(3, 8);
  const pts = rotatePts({ R: { x: 0, y: 0 }, T: { x: a, y: 0 }, K: { x: 0, y: b } }, randInt(0, 359));
  const spec = {
    type: "triangle", w: 280, h: 220,
    pts, poly: ["R", "T", "K"],
    angles: [{ at: "R", right: true }, { at: "T", label: "θ" }],
    tap: { correctId: null },   // set by the caller; truthy here only to flag the SVG as tappable
  };
  return { spec, ids: { adj: "RT", opp: "KR", hyp: "TK" } };
}

/* ------------------------------------------------------------
   qbandsSpec(fn) — the round-2 "three graphs, colour-blocked"
   picture: window 0°–360°, all four 90° bands in her p05 colours,
   ONE curve. No sign is written anywhere on the picture — the
   learner reads it off the shading, exactly like her page.
   ------------------------------------------------------------ */
export function qbandsSpec(fn) {
  return {
    type: "trigg", w: 420, h: 220,
    win: { xmin: 0, xmax: 360, ymin: -1.4, ymax: 1.4 },
    xstep: 90, grid: true,
    bands: [
      { x0: 0, x1: 90, fill: QCOLOR[1] }, { x0: 90, x1: 180, fill: QCOLOR[2] },
      { x0: 180, x1: 270, fill: QCOLOR[3] }, { x0: 270, x1: 360, fill: QCOLOR[4] },
    ],
    curves: [{ fn, a: 1, b: 1, p: 0, q: 0, tone: "a" }],
  };
}
/* the band a quadrant owns, as an x-window (matches astcSign's ①②③④) */
export const BAND = { 1: [0, 90], 2: [90, 180], 3: [180, 270], 4: [270, 360] };
