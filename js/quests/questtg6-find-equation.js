/* ============================================================
   TRIG GRAPHS QUEST 6 · Find the equation   ★★ DIAGRAM
   Read a to-scale graph and recover a, b and q — then pick the
   full equation. (No horizontal shift here: p = 0.)
   ============================================================ */
import { mc } from "./_shared.js";
import { trigGraph, ampRangeGraph, periodGraph, pick3 } from "./_tgraph.js";
import { eqStr, periodOf, amplitudeOf, FN_NAME, nstr, pick } from "../tgraphlib.js";

const ACC = "#4338ca";

const SKILLS = {
  /* sine or cosine? */
  whichBase: () => {
    const fn = pick(["sin", "cos"]);
    const cv = { fn, a: 1, b: 1, p: 0, q: 0 };
    return mc("findTrigEquation", "Is this the graph of sine, cosine or tangent?",
      FN_NAME[fn], [FN_NAME[fn === "sin" ? "cos" : "sin"], "tangent"],
      { graph: trigGraph(cv, { accent: ACC }).spec,
        hint: "Cosine starts at a peak (at 0°); sine starts at 0 and rises; tangent has asymptotes.",
        answerLabel: `This is a ${FN_NAME[fn]} graph.` });
  },

  /* read a (with its sign) */
  findA: () => {
    const fn = pick(["sin", "cos"]);
    const a = pick([2, 3, -2, -3]);
    const cv = { fn, a, b: 1, p: 0, q: pick([0, 1, -1]) };
    return mc("findTrigEquation", `The graph shows y = a·${fn} x + q.<br>Read the value of <b>a</b> (watch the sign).`,
      nstr(a), pick3(nstr(a), [nstr(-a), nstr(2 * a), nstr(Math.abs(a)), nstr(a + (a > 0 ? 1 : -1))]),
      { graph: ampRangeGraph(cv, { accent: ACC }).spec,
        hint: "a = (y max − y min) ÷ 2, made negative if the graph is flipped (starts the wrong way up).",
        answerLabel: `a = ${nstr(a)}.` });
  },

  /* read q (the midline) */
  findQ: () => {
    const fn = pick(["sin", "cos"]);
    const q = pick([1, 2, -1, -2]);
    const cv = { fn, a: pick([2, 3]), b: 1, p: 0, q };
    return mc("findTrigEquation", `The graph shows y = a·${fn} x + q.<br>Read the value of <b>q</b> (the vertical shift).`,
      nstr(q), pick3(nstr(q), ["0", nstr(-q), nstr(q + 1), nstr(q - 1), nstr(amplitudeOf(cv))]),
      { graph: trigGraph(cv, { accent: ACC, midline: true }).spec,
        hint: "q = (y max + y min) ÷ 2 — the height of the midline (the dashed line).",
        answerLabel: `q = ${nstr(q)} (the midline).` });
  },

  /* read b (from the period) */
  findB: () => {
    const fn = pick(["sin", "cos"]);
    const b = pick([2, 3]);
    const cv = { fn, a: pick([1, 2]), b, p: 0, q: 0 };
    return mc("findTrigEquation", `The graph shows y = a·${fn} bx.<br>Read the value of <b>b</b> (use the marked cycle to find the period first).`,
      nstr(b), pick3(nstr(b), [nstr(periodOf(cv)), nstr(b + 1), nstr(b - 1), nstr(2 * b)]),
      { graph: periodGraph(cv, { accent: ACC }).spec,
        hint: "First read the period, then b = 360° ÷ period.",
        answerLabel: `Period ${periodOf(cv)}° → b = 360° ÷ ${periodOf(cv)}° = ${b}.` });
  },

  /* pick the full equation */
  findEquationFull: () => {
    const fn = pick(["sin", "cos"]);
    const a = pick([2, -2, 3]);
    const b = pick([1, 2]);
    const q = pick([0, 1, -1]);
    const cv = { fn, a, b, p: 0, q };
    const otherB = b === 1 ? 2 : 1;
    const decoys = [
      eqStr({ ...cv, a: -a }),
      eqStr({ ...cv, b: otherB }),
      eqStr({ ...cv, q: q + 1 }),
      eqStr({ ...cv, fn: fn === "sin" ? "cos" : "sin" }),
    ];
    return mc("findTrigEquation", "Which equation matches the graph?",
      eqStr(cv), pick3(eqStr(cv), decoys),
      { graph: ampRangeGraph(cv, { accent: ACC }).spec, layout: "grid2",
        hint: "Find a (height + sign), q (midline) and b (from the period), then read off sin vs cos.",
        answerLabel: `Equation: ${eqStr(cv)}.` });
  },

  /* read b for a tan graph */
  findTanB: () => {
    const b = pick([2, 3]);
    const cv = { fn: "tan", a: pick([1, 2]), b, p: 0, q: 0 };
    return mc("findTrigEquation", `The graph shows y = a·tan bx.<br>Read the value of <b>b</b> (use the spacing of the asymptotes).`,
      nstr(b), pick3(nstr(b), [nstr(periodOf(cv)), nstr(b + 1), nstr(b - 1), nstr(2 * b)]),
      { graph: trigGraph(cv, { accent: ACC }).spec,
        hint: "Tangent's asymptotes are one period apart. Period = 180° ÷ b, so b = 180° ÷ period.",
        answerLabel: `Period ${periodOf(cv)}° → b = 180° ÷ ${periodOf(cv)}° = ${b}.` });
  },
};

export const questTg6 = {
  id: "tg6",
  skills: [
    { id: "whichBase", concept: "findTrigEquation", gen: SKILLS.whichBase },
    { id: "findA", concept: "findTrigEquation", gen: SKILLS.findA },
    { id: "findQ", concept: "findTrigEquation", gen: SKILLS.findQ },
    { id: "findB", concept: "findTrigEquation", gen: SKILLS.findB },
    { id: "findEquationFull", concept: "findTrigEquation", gen: SKILLS.findEquationFull },
    { id: "findTanB", concept: "findTrigEquation", gen: SKILLS.findTanB },
  ],
};
