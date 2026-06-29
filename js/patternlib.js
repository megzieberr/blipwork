/* ============================================================
   NUMBER-PATTERNS MATHS  (Chapter 3)
   ------------------------------------------------------------
   Everything computed — differences, classification, the general
   term of an arithmetic / quadratic / geometric pattern, the
   turning-point (min/max), the consecutive-gap linear pattern,
   and clean integer GENERATORS so every quest's numbers are
   fresh but always work out neatly. No answer is ever hand-typed.

   SA conventions: decimal COMMA, real minus (−), superscripts.
   ============================================================ */
import { fmtComma } from "./check.js";
import { randInt, pick, shuffled } from "./ui.js";

const MINUS = "−";                                   // U+2212, not a hyphen
export const C = (v) => fmtComma(v).replace(/^-/, MINUS);   // SA real minus for negatives
export const list = (a) => a.map((x) => C(x)).join("  ;  ");
const EPS = 1e-9;

/* ---- differences ---- */
export function firstDiffs(t) { const d = []; for (let i = 1; i < t.length; i++) d.push(t[i] - t[i - 1]); return d; }
export function secondDiffs(t) { return firstDiffs(firstDiffs(t)); }
const allEqual = (a) => a.length > 0 && a.every((x) => Math.abs(x - a[0]) < EPS);

/* ---- classify a sequence ---- */
export function classify(t) {
  const fd = firstDiffs(t);
  if (allEqual(fd)) return Math.abs(fd[0]) < EPS ? "constant" : "arithmetic";
  const sd = secondDiffs(t);
  if (allEqual(sd)) return "quadratic";
  if (t.every((x) => Math.abs(x) > EPS)) {
    const r = t[1] / t[0];
    if (t.slice(1).every((x, i) => Math.abs(x / t[i] - r) < 1e-6)) return "geometric";
  }
  return "other";
}
export const classifyName = {
  arithmetic: "arithmetic (linear)", quadratic: "quadratic", geometric: "geometric",
  constant: "constant", other: "none of these",
};

/* ---- arithmetic ---- */
export const arithSeq = (a1, d, len) => Array.from({ length: len }, (_, i) => a1 + i * d);
export const arithTn = (a1, d) => (n) => a1 + (n - 1) * d;          // a + (n−1)d
export const arithAC = (a1, d) => ({ a: d, c: a1 - d });            // Tn = an + c  (c = T0)
export const whichTermArith = (a1, d, value) => (value - a1) / d + 1;

/* ---- quadratic ---- */
/* solve a, b, c from a quadratic sequence (uses the three relationships). */
export function quadSolve(t) {
  const a = secondDiffs(t)[0] / 2;                 // 2a = second difference
  const b = (t[1] - t[0]) - 3 * a;                 // 3a + b = T2 − T1
  const c = t[0] - a - b;                          // a + b + c = T1
  return { a, b, c };
}
export const quadTn = (a, b, c) => (n) => a * n * n + b * n + c;
export const quadSeq = (a, b, c, len) => Array.from({ length: len }, (_, i) => { const n = i + 1; return a * n * n + b * n + c; });

/* ---- min / max (turning point of the pattern's parabola) ---- */
export const turningN = (a, b) => -b / (2 * a);
export const extremeKind = (a) => (a > 0 ? "minimum" : "maximum");
/* the EXTREME term is at the natural number n nearest the turning point */
export const extremeTermN = (a, b) => Math.max(1, Math.round(turningN(a, b)));

/* ---- geometric ---- */
export const geoSeq = (a1, r, len) => Array.from({ length: len }, (_, i) => a1 * Math.pow(r, i));
export const geoTn = (a1, r) => (n) => a1 * Math.pow(r, n - 1);
export const geoRatio = (t) => t[1] / t[0];

/* ============================================================
   FORMATTING — general-term strings (HTML; used as innerHTML)
   ============================================================ */
/* leading term, e.g. 2n², −n², n² */
function lead(coef, sym) {
  const sgn = coef < 0 ? MINUS : "";
  const mag = Math.abs(coef);
  const num = sym && mag === 1 ? "" : C(mag);
  return `${sgn}${num}${sym}`;
}
/* a following term with its own +/−, e.g. " + 3n", " − 5", "" when zero */
function tail(coef, sym) {
  if (Math.abs(coef) < EPS) return "";
  const op = coef < 0 ? ` ${MINUS} ` : " + ";
  const mag = Math.abs(coef);
  const num = sym && mag === 1 ? "" : C(mag);
  return `${op}${num}${sym}`;
}

/* Tₙ = an² + bn + c */
export function quadStr(a, b, c, v = "n") { return `${lead(a, v + "²")}${tail(b, v)}${tail(c, "")}`; }
/* Tₙ = an + c  (the simplified arithmetic general term) */
export function linStr(a, c, v = "n") { return `${lead(a, v)}${tail(c, "")}`; }

/* a ratio as a tidy label: integers plain, simple unit ratios as a glyph */
const FRAC_GLYPH = { 0.5: "½", [1 / 3]: "⅓", 0.25: "¼", [2 / 3]: "⅔", 0.2: "⅕" };
export function ratioLabel(r) {
  if (Number.isInteger(r)) return C(r);
  for (const [val, gly] of Object.entries(FRAC_GLYPH)) if (Math.abs(r - Number(val)) < 1e-6) return gly;
  return C(r);
}
/* Tₙ = a · r^(n−1)  (r shown as a fraction when it is one) */
export function geoStr(a1, r, v = "n") {
  const base = Number.isInteger(r) ? C(r) : `(${ratioLabel(r)})`;
  const lead1 = a1 === 1 ? "" : `${C(a1)} · `;
  return `${lead1}${base}<sup>${v} ${MINUS} 1</sup>`;
}

/* ============================================================
   GENERATORS — clean, fresh integer patterns
   ============================================================ */
/* arithmetic: small constant difference, 5 terms */
export function randArith({ len = 5 } = {}) {
  const d = pick([2, 3, 4, 5, 6, -2, -3, -4, -5]);
  const a1 = randInt(-6, 14);
  return { a1, d, seq: arithSeq(a1, d, len), ...arithAC(a1, d) };
}
/* quadratic: integer a, b, c giving whole-number terms; non-trivial (a ≠ 0) */
export function randQuad({ len = 5, aChoices = [1, 2, -1, -2, 3, -3] } = {}) {
  const a = pick(aChoices);
  const b = randInt(-6, 6);
  const c = randInt(-6, 8);
  return { a, b, c, seq: quadSeq(a, b, c, len) };
}
/* quadratic with the turning point at a clean natural term number k (for min/max) */
export function randQuadExtreme({ len } = {}) {
  const a = pick([1, -1, 2, -2]);
  const k = randInt(2, 6);                 // term number of the extreme
  const b = -2 * a * k;                     // forces −b/2a = k
  const c = randInt(-4, 10);
  const L = len || (k + 3);                 // show a few terms past the turn
  return { a, b, c, k, seq: quadSeq(a, b, c, L), kind: extremeKind(a), value: quadTn(a, b, c)(k) };
}
/* geometric. integerR keeps every term a whole number (for "find a term");
   otherwise a tidy unit-ratio pattern that still starts on whole numbers. */
export function randGeo({ len = 5, integerR = true } = {}) {
  if (integerR) {
    const r = pick([2, 3, 2, 4, 5]);
    const a1 = pick([1, 2, 3, 4, 5, 6]);
    return { a1, r, seq: geoSeq(a1, r, len) };
  }
  const opt = pick([{ r: 0.5, a1: pick([16, 32, 48, 64]) }, { r: 1 / 3, a1: pick([81, 162]) }]);
  return { a1: opt.a1, r: opt.r, seq: geoSeq(opt.a1, opt.r, len) };
}

/* small helpers shared by quests */
export { randInt, pick, shuffled };
export const near = (v, ...deltas) => deltas.map((d) => v + d);   // quick decoy values
