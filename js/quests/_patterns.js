/* ============================================================
   Shared Number-Patterns helpers — build the difference pyramid
   spec, the min/max term-parabola spec (reusing the to-scale
   function-graph engine), and terse question-object builders.
   Everything a diagram asserts is provable by an engine verify().
   ============================================================ */
import { C, quadTn } from "../patternlib.js";

/* the seven slate shades (matches PAT_SHADES in config) */
export const PAT = ["#94a3b8", "#8493a8", "#73849b", "#64748b", "#556074", "#475569", "#334155"];

/* a difference-pyramid graph spec */
export function pyramid(terms, { showFirst = false, showSecond = false, blankFirst = false, blankSecond = false, accent = PAT[3], termLabels, tap } = {}) {
  return { type: "pattern", terms, termLabels, showFirst, showSecond, blankFirst, blankSecond, accent, tap };
}

/* a parabola of the pattern's terms (Tₙ vs n) with the turning point marked,
   built for the to-scale function-graph engine. k = extreme term number,
   value = its value, len = how many terms to span. */
export function termParabola(a, b, c, k, value, len, accent = PAT[3]) {
  const f = quadTn(a, b, c);
  const ys = [value];
  for (let n = 1; n <= len; n++) ys.push(f(n));
  let ymin = Math.floor(Math.min(...ys)) - 1, ymax = Math.ceil(Math.max(...ys)) + 1;
  // keep the x-axis in frame with ≥1 unit of margin: the axis is the reference
  // the learner counts grid squares from, and an axis on the very edge clips
  // the engine's "x"/"O" labels out of the viewBox.
  ymin = Math.min(ymin, -1); ymax = Math.max(ymax, 1);
  while (ymax - ymin < 8) { ymin -= 1; ymax += 1; }
  return {
    type: "function", accent, grid: true,
    win: { xmin: 0, xmax: len + 1, ymin, ymax },
    curves: [{ kind: "parabola", a, b, c, tone: "a", label: "Tₙ" }],
    points: [{ x: k, y: value, label: `T${toSub(k)}`, on: 0, dashTo: "both" }],
  };
}
const SUBS = "₀₁₂₃₄₅₆₇₈₉";
const toSub = (n) => String(n).split("").map((d) => SUBS[+d] || d).join("");
export { toSub };

/* ordinal: 1st, 2nd, 3rd, 4th … 11th/12th/13th */
export const ord = (n) => {
  const t = n % 100;
  const suf = t >= 11 && t <= 13 ? "th" : { 1: "st", 2: "nd", 3: "rd" }[n % 10] || "th";
  return `${C(n)}${suf}`;
};
/* a value wrapped in parentheses when negative, so worked strings never
   show a double sign like "5 − −3" */
export const P = (v) => (v < 0 ? `(${C(v)})` : C(v));

/* ---- terse question-object builders ---- */
export function calcQ(concept, prompt, expected, opts = {}) {
  return {
    type: "calc", concept, prompt, expected,
    dp: opts.dp ?? 0, unit: opts.unit || "", allowNeg: opts.allowNeg ?? true,
    hint: opts.hint, answerLabel: opts.answerLabel,
    solution: opts.solution || (opts.answerLabel ? [{ s: opts.answerLabel }] : undefined),
    graph: opts.graph, graphCap: opts.graphCap,
  };
}
export function tapQ(concept, prompt, graph, tap, opts = {}) {
  graph.tap = tap;
  return {
    type: "tap", concept, prompt, graph, tap, tapHint: opts.tapHint,
    hint: opts.hint, answerLabel: opts.answerLabel,
    solution: opts.solution || (opts.answerLabel ? [{ s: opts.answerLabel }] : undefined),
  };
}
export function yesnoQ(concept, prompt, yes, opts = {}) {
  return {
    type: "yesno", concept, prompt, yes, graph: opts.graph, graphCap: opts.graphCap,
    hint: opts.hint, answerLabel: opts.answerLabel,
    solution: opts.solution || (opts.answerLabel ? [{ s: opts.answerLabel }] : undefined),
  };
}

export { C };
