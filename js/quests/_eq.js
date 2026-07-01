/* ============================================================
   Shared Equations & Inequalities helpers.
   ------------------------------------------------------------
   THEORY chapter like Exponents & Surds — mc + yesno curated
   pools, no problem-crunching. The only diagrams are little
   parabola sketches for "inside the bowl / to the left-right"
   and the three Δ pictures, built as specs for the EXISTING
   function-graph engine (no new engine).

   Formatting note: prompts and option labels are rendered with
   innerHTML (see ui.el), so <sup>, √, ·, ≤, Δ etc. all work.
   ============================================================ */
import { mc } from "./_shared.js";
import { pick, shuffled, randInt } from "../ui.js";
import {
  parabolaFromRoots, parabolaFromTP, paraTP, neg,
  C as CF, ineqBetween as IB, ineqOutside as IO,
} from "../funclib.js";
import { winFor } from "./_func.js";

/* SA style everywhere in this chapter: decimal comma AND a real minus (−),
   also inside strings built by funclib (whose own C keeps the ASCII hyphen). */
export const C = (v) => neg(CF(v));
export const ineqBetween = (a, b) => neg(IB(a, b));
export const ineqOutside = (a, b) => neg(IO(a, b));

/* eight emerald shades, light → deep (Equations & Inequalities quests 1 → 8) —
   matches EQN_SHADES in config.js */
export const EQ = [
  "#6ee7b7", "#34d399", "#10b981", "#0ca678",
  "#059669", "#047857", "#065f46", "#064e3b",
];

/* ---- tiny formatting helpers (HTML; safe inside prompts & options) ---- */
export const sup = (s) => `<sup>${s}</sup>`;
export const pw = (b, e) => `${b}<sup>${e}</sup>`;            // power:  x²  →  pw("x","2")
export const frac = (n, d) => `<span class="efrac"><sup>${n}</sup>⁄<sub>${d}</sub></span>`;
export const b = (s) => `<b>${s}</b>`;

export { mc, pick, shuffled, randInt };

/* yes/no trap builder — render reads {type:"yesno", yes, prompt, ...}.
   `yes` is whether the STATEMENT is correct, not whether the maths is "yes". */
export function ynQ(concept, prompt, yes, opts = {}) {
  return {
    type: "yesno", concept, prompt, yes,
    hint: opts.hint, answerLabel: opts.answerLabel, graph: opts.graph,
    solution: opts.solution || (opts.answerLabel ? [{ s: opts.answerLabel }] : undefined),
  };
}

/* Build a multiple-choice question from a curated pool item.
   item = { q, correct, wrongs, hint, ans }  →  mc(...) */
export function poolMC(concept, poolItem) {
  return mc(concept, poolItem.q, poolItem.correct, poolItem.wrongs,
    { hint: poolItem.hint, answerLabel: poolItem.ans, layout: poolItem.layout });
}

/* Build a yes/no question from a curated pool item.
   item = { q, yes, hint, ans } */
export function poolYN(concept, poolItem) {
  return ynQ(concept, poolItem.q, poolItem.yes, { hint: poolItem.hint, answerLabel: poolItem.ans });
}

/* ============================================================
   Little parabola sketches (function-graph engine specs).
   The bowl is ALWAYS drawn with a = 1 — the method itself says
   "no negative in front of x² before you sketch".
   ============================================================ */

/* random pair of distinct small integer roots, r1 < r2 */
export function randRoots() {
  const r1 = randInt(-5, 2);
  const r2 = r1 + randInt(2, 5);
  return [r1, r2];
}

/* the factorised left-hand side "(x − r1)(x + r2)" as display HTML */
export function factorStr(r1, r2) {
  const f = (r) => (r === 0 ? "x" : r > 0 ? `(x − ${C(r)})` : `(x + ${C(-r)})`);
  return `${f(r1)}${f(r2)}`;
}

/* a happy (a = 1) parabola through the two CPs, with the solution region
   shaded: mode "inside" shades between the roots (expression < 0),
   mode "outside" shades left of r1 and right of r2 (expression > 0). */
export function bowlGraph(r1, r2, mode) {
  const cv = parabolaFromRoots(1, r1, r2);
  const tp = paraTP(cv);
  const win = winFor([{ x: r1, y: 0 }, { x: r2, y: 0 }, tp], { pad: 2, minY: 6 });
  const shades = mode === "inside"
    ? [{ x0: r1, x1: r2 }]
    : [{ x0: win.xmin, x1: r1 }, { x0: r2, x1: win.xmax }];
  return {
    type: "function", grid: true, win,
    curves: [cv],
    shades,
    points: [
      { x: r1, y: 0, on: 0, label: `${C(r1)}`, place: "above" },
      { x: r2, y: 0, on: 0, label: `${C(r2)}`, place: "above" },
    ],
  };
}

/* the three Δ pictures — how the parabola meets the x-axis:
   "two"   → cuts twice   (Δ > 0)
   "touch" → touches once (Δ = 0)
   "none"  → floats clear (Δ < 0)
   Always a happy bowl so the three cases differ ONLY in the axis. */
export function deltaGraph(kind) {
  let cv, feats;
  if (kind === "two") {
    const [r1, r2] = randRoots();
    cv = parabolaFromRoots(1, r1, r2);
    feats = [{ x: r1, y: 0 }, { x: r2, y: 0 }, paraTP(cv)];
  } else if (kind === "touch") {
    const r = randInt(-3, 3);
    cv = parabolaFromTP(1, r, 0);
    feats = [{ x: r, y: 0 }, { x: r - 2, y: 4 }, { x: r + 2, y: 4 }];
  } else {
    const h = randInt(-3, 3), k = randInt(1, 3);
    cv = parabolaFromTP(1, h, k);
    feats = [{ x: h, y: k }, { x: h - 2, y: k + 4 }, { x: h + 2, y: k + 4 }];
  }
  const win = winFor(feats, { pad: 2, minY: 6 });
  return { type: "function", grid: true, win, curves: [cv], points: [] };
}
