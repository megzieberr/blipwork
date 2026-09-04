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
import { rotatePts, sinD, cosD, tanD } from "../triglib.js";

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
export function astcWheelSvg(opts = {}) { return bowTieSvg({ signs: true, words: true, ...opts }); }

/* ------------------------------------------------------------
   bowTieSvg() — HER BOW TIE, redrawn 2026-08-22 evening to match her
   sketches exactly ("that's why it's called a bow tie"): two triangles
   meeting at the ORIGIN — the diagonals run corner to corner through O,
   the VERTICAL edges sit at the outer left/right with the right-angle
   marks, the quadrant numbers ①②③④ sit SMALL next to the centre, and
   the A / S / T / C letters (or the full words with the three signs,
   round 2) sit out in the four corners. 90° top, 180° left, 270°
   bottom, 0°/360° right.
     opts.signs  — list sin/cos/tan with their sign under each word
     opts.words  — All / Strippers / Take / Cash instead of A S T C
     opts.blankNames — the four corners hold a "?" instead of a word or
       a letter, so the wheel can be shown to a learner who is being
       ASKED what belongs in a corner (2026-09-04, build-report F1: a
       recall card must not print its own answer above the options).
   ------------------------------------------------------------ */
const ASTC_LETTER = { 1: "A", 2: "S", 3: "T", 4: "C" };
const ASTC_WORD = { 1: "All", 2: "Strippers", 3: "Take", 4: "Cash" };
export function bowTieSvg(opts = {}) {
  const W = 360, H = opts.signs ? 300 : 240, MX = W / 2, MY = H / 2;
  const HX = 88, HY = opts.signs ? 108 : 90;        // the bow tie's half-width / half-height
  const ink = "var(--ink)";
  let o = `<svg class="sg gtrig-bowtie" viewBox="0 0 ${W} ${H}" role="img" preserveAspectRatio="xMidYMid meet">`;
  // axes with arrowheads
  o += `<line x1="14" y1="${MY}" x2="${W - 14}" y2="${MY}" stroke="${ink}" stroke-width="1.6"/>`;
  o += `<line x1="${MX}" y1="14" x2="${MX}" y2="${H - 14}" stroke="${ink}" stroke-width="1.6"/>`;
  // the two triangles: verticals at the outer edges, diagonals through O
  o += `<path d="M ${MX - HX} ${MY - HY} L ${MX - HX} ${MY + HY} M ${MX + HX} ${MY - HY} L ${MX + HX} ${MY + HY}" stroke="${ink}" stroke-width="2.2" fill="none"/>`;
  o += `<path d="M ${MX - HX} ${MY - HY} L ${MX + HX} ${MY + HY} M ${MX - HX} ${MY + HY} L ${MX + HX} ${MY - HY}" stroke="${ink}" stroke-width="2.2" fill="none"/>`;
  // right-angle marks where the verticals cross the x-axis
  const m = 9;
  o += `<path d="M ${MX - HX} ${MY - m} L ${MX - HX + m} ${MY - m} L ${MX - HX + m} ${MY + m} L ${MX - HX} ${MY + m}" stroke="${ink}" stroke-width="1.4" fill="none"/>`;
  o += `<path d="M ${MX + HX} ${MY - m} L ${MX + HX - m} ${MY - m} L ${MX + HX - m} ${MY + m} L ${MX + HX} ${MY + m}" stroke="${ink}" stroke-width="1.4" fill="none"/>`;
  const lab = (x, y, t, anchor = "middle", size = 12, fill = "var(--faint)", extra = "") =>
    `<text x="${x}" y="${y}" text-anchor="${anchor}" dominant-baseline="middle" style="font-family:var(--font-num);font-size:${size}px;fill:${fill};${extra}">${t}</text>`;
  o += lab(MX, 10, "90°") + lab(MX, H - 8, "270°") + lab(6, MY - 11, "180°", "start") + lab(W - 6, MY - 11, "0°/360°", "end");
  // the small quadrant numbers hugging the centre
  const Q = { 1: [MX + 22, MY - 18], 2: [MX - 22, MY - 18], 3: [MX - 22, MY + 18], 4: [MX + 22, MY + 18] };
  [1, 2, 3, 4].forEach(q => { o += lab(Q[q][0], Q[q][1], CIRC[q], "middle", 22, QCOLOR[q], "font-weight:700"); });
  // corners: A S T C (or the words + signs)
  // letters sit just outside the tie (her sketch), words+signs use the full corner
  const CX = opts.signs ? { 1: W - 10, 2: 10, 3: 10, 4: W - 10 } : { 1: MX + HX + 30, 2: MX - HX - 30, 3: MX - HX - 30, 4: MX + HX + 30 };
  const CA = { 1: "end", 2: "start", 3: "start", 4: "end" };
  const CY = { 1: MY - HY + 10, 2: MY - HY + 10, 3: MY + HY - 44, 4: MY + HY - 44 };
  [1, 2, 3, 4].forEach(q => {
    const word = opts.blankNames ? "?" : opts.words ? ASTC_WORD[q] : ASTC_LETTER[q];
    const first = word[0], rest = word.slice(1);
    o += `<text x="${CX[q]}" y="${opts.signs ? (q <= 2 ? 24 : H - 64) : CY[q] + (q <= 2 ? 0 : 34)}" text-anchor="${CA[q]}" dominant-baseline="middle"`
      + ` style="font-family:var(--font-display);font-weight:700;font-size:${opts.words ? 17 : 22}px;fill:${QCOLOR[q]}">${first}<tspan style="fill:var(--ink);font-weight:600">${rest}</tspan></text>`;
    if (opts.signs) {
      const sg = f => (ASTC_SIGN[q][f] > 0 ? "+" : "−");
      const y0 = q <= 2 ? 44 : H - 46;
      ["sin", "cos", "tan"].forEach((f, i) => { o += lab(CX[q], y0 + i * 16, `• ${f} θ ${sg(f)}`, CA[q], 12.5, "var(--ink)"); });
    }
  });
  return o + `</svg>`;
}
const ASTC_SIGN = { 1: { sin: 1, cos: 1, tan: 1 }, 2: { sin: 1, cos: -1, tan: -1 }, 3: { sin: -1, cos: -1, tan: 1 }, 4: { sin: -1, cos: 1, tan: -1 } };

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

/* ============================================================
   STAGE 3 (2026-08-22) — rounds gt4–gt7 (co-functions, reductions
   ×2, TIP Chips). Everything below is shared by those four quest
   files so none of them has to reinvent the `steps` chain building
   blocks or the co-function/reduction maths.
   ============================================================ */
const FNMAP = { sin: sinD, cos: cosD, tan: tanD };

/* ------------------------------------------------------------
   symbolicReduce(fn, form) — round 7's engine. `form` is one of the
   11 wheel forms (both wheels — Part D2/E3/E4 — plus the co-function
   arms), written with a bare θ: "180−θ" "180+θ" "360−θ" "−θ" "θ−360"
   "θ−180" "−180−θ" "−360−θ" "90−θ" "90+θ" "θ−90".

   Deliberately NOT a hand-typed lookup table. It evaluates
   fn(form(θ)) at two independent test angles (20° and 37° — chosen
   because neither is a multiple of any angle that appears in a
   form, so nothing coincidentally cancels) and asks "which of
   ±sin(θ), ±cos(θ), ±tan(θ) equals that, AT BOTH ANGLES?". Exactly
   one candidate should survive both checks — that pair IS the
   identity. Throwing on 0 or >1 matches means a typo in a form
   string fails LOUD instead of silently shipping a wrong answer.
   Returns { sign, fn2, label } — label is the learner-facing answer
   written with a bare θ (callers substitute their own letter). */
const REDUCE_FORMS = {
  "180−θ": t => 180 - t,
  "180+θ": t => 180 + t,
  "360−θ": t => 360 - t,
  "−θ": t => -t,
  "θ−360": t => t - 360,
  "θ−180": t => t - 180,
  "−180−θ": t => -180 - t,
  "−360−θ": t => -360 - t,
  "90−θ": t => 90 - t,
  "90+θ": t => 90 + t,
  "θ−90": t => t - 90,
};
export function symbolicReduce(fn, form) {
  const formFn = REDUCE_FORMS[form];
  if (!formFn) throw new Error(`symbolicReduce: unknown form "${form}"`);
  const applyFn = FNMAP[fn];
  if (!applyFn) throw new Error(`symbolicReduce: unknown fn "${fn}"`);
  const thetas = [20, 37];
  const targets = thetas.map(t => applyFn(formFn(t)));
  const candidates = [];
  for (const fn2 of ["sin", "cos", "tan"]) {
    for (const sign of [1, -1]) {
      const ok = thetas.every((t, i) => Math.abs(sign * FNMAP[fn2](t) - targets[i]) < 1e-9);
      if (ok) candidates.push({ sign, fn2 });
    }
  }
  if (candidates.length !== 1)
    throw new Error(`symbolicReduce(${fn}, ${form}): ${candidates.length} matches (expected exactly 1)`);
  const { sign, fn2 } = candidates[0];
  return { sign, fn2, label: `${sign < 0 ? "−" : ""}${fn2} θ` };
}

/* applyForm(form, theta) — the numeric angle a wheel form produces at
   a given θ (e.g. applyForm("180−θ", 20) === 160). Exported alongside
   symbolicReduce so a caller (a quest file's _dbg, or the harness) can
   compute "what angle did this form actually mean here" without its
   own copy of the 11-entry table. */
export function applyForm(form, theta) {
  const f = REDUCE_FORMS[form];
  if (!f) throw new Error(`applyForm: unknown form "${form}"`);
  return f(theta);
}

/* ------------------------------------------------------------
   `steps` chain builders — small, dumb factories so gt4/gt5/gt7
   don't each hand-roll the same { kind, prompt, options/expected }
   shape. Every one returns a plain step object per stage 1's spec
   (design/gtrig-briefs/stage1-plumbing.md section A).
   ------------------------------------------------------------ */
export function mcStep(prompt, correct, wrongs, hint, opts = {}) {
  const seen = new Set([String(correct)]);
  const options = [{ label: String(correct), correct: true }];
  wrongs.forEach(w => { const l = String(w); if (!seen.has(l)) { seen.add(l); options.push({ label: l, correct: false }); } });
  return { kind: "mc", prompt, options: shuffled(options), hint, layout: opts.layout };
}
export function calcStep(prompt, expected, hint, opts = {}) {
  return { kind: "calc", prompt, expected, dp: opts.dp ?? 0, tol: opts.tol, unit: opts.unit ?? "°", allowNeg: !!opts.allowNeg, hint };
}
export function tokenStep(prompt, expected, alsoAccept, hint, sym = "θ") {
  return { kind: "tokenpad", prompt, expected, alsoAccept, sym, hint };
}
export function quadStep(prompt, correct, hint, opts = {}) {
  return { kind: "tapcross", single: true, prompt, correct: Array.isArray(correct) ? correct : [correct], alsoAccept: opts.alsoAccept, noRef: !!opts.noRef, hint };
}

/* a fresh multiple-of-5 angle strictly INSIDE quadrant q (never the
   quadrantal boundary — gt5's positive pool and gt6's chip③ pool
   both need "a real angle that actually lives in this quadrant") */
const QRANGE = { 1: [5, 85], 2: [95, 175], 3: [185, 265], 4: [275, 355] };
export function quadAngle(quad) {
  const [lo, hi] = QRANGE[quad];
  return lo + 5 * randInt(0, (hi - lo) / 5);
}

/* a multiple-of-5 angle in [lo,hi] that never lands exactly on a
   quadrantal boundary (0/90/180/270/360…) — used wherever a reduction
   chain needs a "real" answer, not the degenerate quadrantal case. */
export function nonQuadrantalAngle(lo, hi) {
  let a, guard = 0;
  do { a = lo + 5 * randInt(0, (hi - lo) / 5); guard++; } while (a % 90 === 0 && guard < 100);
  return a;
}

/* argDeg(angle) — an angle as it sits after a ratio name: positive "30°",
   negative "(−30°)" with brackets, her notation (p13: sin(−30)). Foreman
   review fix 2026-08-22: "sin −15°" read wrongly as a subtraction. */
import { fmtDeg as _fmtDeg } from "../triglib.js";
export function argDeg(angle) { return angle < 0 ? `(${_fmtDeg(angle)})` : ` ${_fmtDeg(angle)}`; }   // includes the leading space for positives: use as `${fn}${argDeg(a)}`

/* ============================================================
   STAGE 4 (2026-08-22) — rounds gt8–gt13 (special sums, identities,
   super special sums, the six types, last steps, undefined values).
   Everything below is shared by those six quest files.
   ============================================================ */
import { fmtComma } from "../check.js";

/* a real minus in front of a magnitude, never a hyphen (house rule) */
export const negNum = v => (v < 0 ? "−" : "") + fmtComma(Math.abs(v));

/* a signed fraction as she writes it on the sketch: the minus lives in
   FRONT of the whole fraction, never on the denominator. */
export function fracLabel(num, den) {
  const sign = (num < 0) !== (den < 0) ? "−" : "";
  return `${sign}${Math.abs(num)}/${Math.abs(den)}`;
}
/* …and its VALUE, so a decoy can be filtered by value rather than by
   string (CLAUDE.md gotcha 4) */
export const fracValue = (num, den) => num / den;

/* a stacked fraction, the same `efrac` idiom Exponents & Equations
   already use — round 13's equations are mostly fractions, and a
   flat "cos x/(1 + sin x)" makes the learner parse brackets instead
   of spotting denominators */
export const tfrac = (n, d) => `<span class="sfrac"><span class="sf-n">${n}</span><span class="sf-d">${d}</span></span>`;   // stacked (her ruling: no slashes, no slanted fractions)

/* ------------------------------------------------------------
   PYTHAGOREAN TRIPLES for round 8 — 3-4-5, 5-12-13, 8-15-17,
   7-24-25 and every multiple whose biggest side is still ≤ 30, so
   EVERY side (r included) is a whole number the number pad can type.
   [x-leg, y-leg, radius]
   ------------------------------------------------------------ */
export const TRIPLES = (() => {
  const prim = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]];
  const out = [];
  prim.forEach(([a, b, c]) => { for (let k = 1; k * c <= 30; k++) out.push([a * k, b * k, c * k]); });
  return out;
})();
/* The PRIMITIVE four. Round 8 hands the learner a ratio and expects one
   particular triangle back, so the fraction has to be in lowest terms —
   `sin θ = 20/25` would be answered just as correctly with y = 4, r = 5,
   and the learner would be marked wrong for reducing. Her own worked
   examples are all lowest-terms (tan θ = 4/3 → sides 3 and 4), so the
   ratio-given items draw from here and the multiples above are kept for
   anything that does NOT hand over a fraction. */
export const PRIM_TRIPLES = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25]];
/* the small-radius primitives, for the "substitute into an expression"
   item where a coefficient of r² has to stay a number she would write */
export const SMALL_TRIPLES = PRIM_TRIPLES.filter(t => t[2] <= 13);

/* the signs (x, y) carry in each quadrant — her bow tie, as numbers */
export const QSIGN = { 1: [1, 1], 2: [-1, 1], 3: [-1, -1], 4: [1, -1] };

/* the intervals round 8 gives alongside a ratio. Each one ticks TWO
   quadrants (her second tick colour); the overlap with the ratio's own
   two quadrants is the single answer — that overlap IS the round. */
export const INTERVALS = [
  { text: "0° < θ < 180°", quadrants: [1, 2] },
  { text: "90° < θ < 270°", quadrants: [2, 3] },
  { text: "180° < θ < 360°", quadrants: [3, 4] },
  { text: "−90° < θ < 90°", quadrants: [1, 4] },
];

/* ------------------------------------------------------------
   mcMultiStep — the toggle-several-then-Submit step (gt13).
   `options` is a list of labels in the order they should appear;
   `correct` is the list of INDICES that must all be on.
   ------------------------------------------------------------ */
export function mcMultiStep(prompt, options, correct, hint, opts = {}) {
  return {
    kind: "mcmulti", prompt, options: options.map(o => ({ label: String(o) })),
    correct: correct.slice().sort((a, b) => a - b), hint, layout: opts.layout,
  };
}

/* ------------------------------------------------------------
   tapSideStep — tap one side of the sketch already on screen (gt10).
   `placeLabel` writes the value onto that side once it is tapped,
   which is her p36 ③ "re-draw with it filled in".
   ------------------------------------------------------------ */
export function tapSideStep(prompt, correct, hint, opts = {}) {
  return {
    kind: "tapside", prompt, correct, hint,
    targets: opts.targets || ["opp", "adj", "hyp"],
    tapHint: opts.tapHint || "Tap that side on the sketch.",
    placeLabel: opts.placeLabel,
  };
}

/* ============================================================
   EQUATION MODEL (round 11, reused by 12 and 13)
   ------------------------------------------------------------
   Round 11 asks "which of the six types is this?", so the SHAPE of
   the equation is the whole question — and the harness has to be able
   to re-derive that shape without trusting the generator's own type
   tag. Both the learner's HTML and the harness's plain ASCII string
   are built from ONE structure here, so the picture and the thing the
   classifier reads can never drift apart.

     TERM   { c, f:[factor…] }   c = coefficient; no factors = a constant
     FACTOR { n:"sin"|"cos"|"tan", p:1|2, a:{ k, d } }
                                 angle = k × (the letter) + d degrees;
                                 k = 0 means a bare number, e.g. cos 57°
   ============================================================ */
export const T = (c, ...f) => ({ c, f });
/* a term written EXACTLY as given (a fraction like 1/2, which fmtComma
   would otherwise turn into 0,5) while still carrying its real value */
export const TRaw = (text, value) => ({ c: value, raw: text, f: [] });
export const F = (n, k = 1, d = 0, p = 1) => ({ n, p, a: { k, d } });
export const F2 = (n, k = 1, d = 0) => F(n, k, d, 2);

function angHtml(a, L) {
  const kAbs = Math.abs(a.k);
  const v = kAbs === 1 ? L : `${kAbs}${L}`;
  if (a.k === 0) return `${fmtComma(a.d)}°`;
  if (a.d === 0) return a.k < 0 ? `−${v}` : v;
  if (a.k < 0) return `${fmtComma(a.d)}° − ${v}`;
  return `${v} ${a.d < 0 ? "−" : "+"} ${fmtComma(Math.abs(a.d))}°`;
}
function angPlain(a, L) {
  const kAbs = Math.abs(a.k);
  const v = kAbs === 1 ? L : `${kAbs}${L}`;
  if (a.k === 0) return String(a.d);
  if (a.d === 0) return (a.k < 0 ? "-" : "") + v;
  if (a.k < 0) return `${a.d}-${v}`;
  return `${v}${a.d < 0 ? "-" : "+"}${Math.abs(a.d)}`;
}
/* her notation: a bare or numeric angle needs no brackets (sin θ,
   cos 57°); anything compound does (sin(2θ), cos(x + 20°)). */
function facHtml(f, L) {
  const nm = f.n + (f.p === 2 ? "²" : "");
  const plainLetter = f.a.k === 1 && f.a.d === 0;
  const bareNumber = f.a.k === 0;
  // she writes sin²θ closed up, and sin θ / cos 57° with one space
  if (plainLetter) return f.p === 2 ? `${nm}${L}` : `${nm} ${L}`;
  if (bareNumber) return `${nm} ${angHtml(f.a, L)}`;
  return `${nm}(${angHtml(f.a, L)})`;
}
function facPlain(f, L) { return `${f.n}${f.p === 2 ? "^2" : ""}(${angPlain(f.a, L)})`; }

function termHtml(t, L, first) {
  if (t.raw != null) return (first ? "" : " + ") + t.raw;
  const mag = Math.abs(t.c);
  const body = t.f.length
    ? (mag === 1 ? "" : `${fmtComma(mag)} `) + t.f.map(f => facHtml(f, L)).join(" ")
    : fmtComma(mag);
  const lead = first ? (t.c < 0 ? "−" : "") : (t.c < 0 ? " − " : " + ");
  return lead + body;
}
function termPlain(t, L, first) {
  if (t.raw != null) return (t.c < 0 ? "-" : first ? "" : "+") + String(Math.abs(t.c));
  const mag = Math.abs(t.c);
  const body = t.f.length
    ? (mag === 1 ? "" : String(mag)) + t.f.map(f => facPlain(f, L)).join("")
    : String(mag);
  const lead = first ? (t.c < 0 ? "-" : "") : (t.c < 0 ? "-" : "+");
  return lead + body;
}
const sideHtml = (ts, L) => (ts.length ? ts.map((t, i) => termHtml(t, L, i === 0)).join("") : "0");
const sidePlain = (ts, L) => (ts.length ? ts.map((t, i) => termPlain(t, L, i === 0)).join("") : "0");

/* the equation a learner sees — real minus, decimal comma, her brackets */
export function eqHtml(eq, L) { return `${sideHtml(eq.lhs, L)} = ${sideHtml(eq.rhs, L)}`; }
/* the same equation as flat ASCII, for the harness's own parser */
export function eqPlain(eq, L) { return `${sidePlain(eq.lhs, L)}=${sidePlain(eq.rhs, L)}`; }

/* the numeric value of one side at a given θ (degrees) — lets a
   generator check "is this equation even satisfiable / did I build the
   shape I meant" without a second copy of the algebra */
const FNV = { sin: sinD, cos: cosD, tan: tanD };
export function sideValue(terms, L, theta) {
  return terms.reduce((sum, t) => {
    let v = t.c;
    t.f.forEach(f => { const ang = f.a.k * theta + f.a.d; v *= Math.pow(FNV[f.n](ang), f.p); });
    return sum + v;
  }, 0);
}
