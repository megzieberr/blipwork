/* ============================================================
   Shared Trig-Graphs quest helpers — turn a chosen equation into
   a to-scale spec for the trig-graph engine, choose a sensible
   degree window, and mark the features a question asks the learner
   to read (a peak/trough for amplitude & range, a one-period span
   for the period). Rule kept everywhere: a marked POINT always
   names the curve it sits on (point.on = curve index) so verify()
   can prove the label is honest.
   ============================================================ */
import { makeTrig, periodOf, amplitudeOf, rangeOf } from "../tgraphlib.js";

/* a default degree window: sin/cos start at 0 and show ≥1 full period
   (more cycles for short periods); tan is centred so its asymptotes
   sit symmetrically, matching the workbook. */
export function defaultWin(cv) {
  const P = periodOf(cv);
  if (cv.fn === "tan") {
    let span = Math.min(Math.max(2 * P, 180), 360);
    const q = cv.q || 0;
    return { xmin: -span / 2, xmax: span / 2, ymin: Math.min(q - 3, -1), ymax: Math.max(q + 3, 1) };
  }
  const span = P <= 180 ? 360 : P;
  const A = amplitudeOf(cv), q = cv.q || 0;
  let ymax = Math.ceil(q + A + 1), ymin = Math.floor(q - A - 1);
  if (ymin > 0) ymin = -1; if (ymax < 0) ymax = 1;
  return { xmin: 0, xmax: span, ymin, ymax };
}

/* the x of the FIRST peak (≥ 0) and a trough of a sin/cos curve, computed
   exactly from the equation (so a peak that lands on a window edge — e.g.
   cosine peaking at x = 0 — is still found). The y-values are q ± a. */
export function peakTroughX(cv) {
  const b = Math.abs(cv.b == null ? 1 : cv.b), p = cv.p || 0, P = periodOf(cv);
  const aPos = (cv.a == null ? 1 : cv.a) >= 0;
  // inner angle (deg) where a·fn is at its MAX, then its MIN
  const maxAng = cv.fn === "cos" ? (aPos ? 0 : 180) : (aPos ? 90 : 270);
  const minAng = cv.fn === "cos" ? (aPos ? 180 : 0) : (aPos ? 270 : 90);
  const firstAt = (ang) => { let x = ((ang / b + p) % P + P) % P; return x; };  // first occurrence in [0;P)
  return { peakX: firstAt(maxAng), troughX: firstAt(minAng), period: P };
}

/* ---- a plain to-scale graph of one curve ---- */
export function trigGraph(cv, opts = {}) {
  const win = opts.win || defaultWin(cv);
  const spec = {
    type: "trigg", accent: opts.accent, grid: opts.grid !== false, win,
    curves: [{ ...cv, tone: opts.tone, label: opts.label, labelAt: opts.labelAt }],
    showAsym: true,
  };
  if (opts.midline && (cv.q || 0) !== 0) spec.midline = { y: cv.q };
  return { spec, win };
}

/* ---- amplitude / range read-off: mark a peak and a trough, drop dashed
   guides to the y-axis so the learner reads y-max and y-min off it ---- */
export function ampRangeGraph(cv, opts = {}) {
  const win = opts.win || defaultWin(cv);
  const A = amplitudeOf(cv), q = cv.q || 0;
  const { peakX, troughX } = peakTroughX(cv);
  const spec = {
    type: "trigg", accent: opts.accent, grid: true, win, showAsym: true,
    curves: [{ ...cv }],
    points: [
      { x: peakX, y: q + A, on: 0, dashTo: "y" },
      { x: troughX, y: q - A, on: 0, dashTo: "y" },
    ],
  };
  return { spec, win, ymax: q + A, ymin: q - A, amp: A };
}

/* ---- period read-off: show two consecutive peaks and a one-period span
   arrow between them ---- */
export function periodGraph(cv, opts = {}) {
  const A = amplitudeOf(cv), q = cv.q || 0;
  const { peakX, period: P } = peakTroughX(cv);
  const peak1 = peakX, peak2 = peakX + P;
  const win = { xmin: 0, xmax: Math.ceil((peak2 + P * 0.35) / 30) * 30,
    ymax: Math.ceil(q + A + 1), ymin: Math.min(Math.floor(q - A - 1), -1) };
  if (win.ymax < 1) win.ymax = 1;
  const spec = {
    type: "trigg", accent: opts.accent, grid: true, win, showAsym: true, curves: [{ ...cv }],
    hmeasure: { x0: peak1, x1: peak2, y: q + A, label: opts.showValue ? `${P}°` : "?" },
    points: [{ x: peak1, y: q + A, on: 0 }, { x: peak2, y: q + A, on: 0 }],
  };
  return { spec, win, period: P };
}

/* ---- two curves on one set of axes (compare / find-equation / mixed) ---- */
export function twoTrigGraph(cvA, cvB, opts = {}) {
  const win = opts.win || mergeWin(cvA, cvB);
  const curves = [
    { ...cvA, tone: "a", label: opts.labelA, labelAt: opts.labelAtA },
    { ...cvB, tone: "b", label: opts.labelB, labelAt: opts.labelAtB },
  ];
  const spec = { type: "trigg", accent: opts.accent, grid: true, win, showAsym: true, curves, points: opts.points || [] };
  return { spec, win };
}

/* first 3 distinct decoy labels ≠ correct (caps an MC at 4 options) */
export function pick3(correct, cands) {
  const seen = new Set([String(correct)]), out = [];
  for (const c of cands) {
    if (c == null) continue;
    const s = String(c);
    if (!seen.has(s)) { seen.add(s); out.push(s); }
    if (out.length >= 3) break;
  }
  return out;
}

function mergeWin(a, b) {
  const wa = defaultWin(a), wb = defaultWin(b);
  return {
    xmin: Math.min(wa.xmin, wb.xmin), xmax: Math.max(wa.xmax, wb.xmax),
    ymin: Math.min(wa.ymin, wb.ymin), ymax: Math.max(wa.ymax, wb.ymax),
  };
}
