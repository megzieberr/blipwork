/* ============================================================
   TRIG GRAPHS QUEST 5 · The tangent graph   ★ DIAGRAM
   Asymptotes (cos = 0), x-intercepts (sin = 0), period 180°,
   range ℝ, and finding a from two ±45° reference points.
   ============================================================ */
import { mc } from "./_shared.js";
import { trigGraph, pick3 } from "./_tgraph.js";
import { eqStr, periodOf, intervalStr, degLabel, nstr, pick } from "../tgraphlib.js";

const ACC = "#4f46e5";
const tanCv = (o = {}) => ({ fn: "tan", a: o.a ?? pick([1, 2, 3, -1, -2]), b: o.b ?? pick([1, 2, 3]), p: 0, q: o.q ?? pick([0, 0, 1, -1]) });

const SKILLS = {
  /* period of a tan graph */
  tanPeriodCalc: () => {
    const cv = tanCv();
    return {
      type: "calc", concept: "tanGraph",
      prompt: `${eqStr(cv)}<br>What is the <b>period</b>?`,
      graph: trigGraph(cv, { accent: ACC }).spec,
      expected: periodOf(cv), dp: 0, unit: "°", allowNeg: false,
      hint: "Tangent's period = 180° ÷ b.",
      answerLabel: `Period = 180° ÷ ${nstr(cv.b)} = ${periodOf(cv)}°.`,
      solution: [{ s: `period = 180° ÷ ${nstr(cv.b)}`, r: `= ${periodOf(cv)}°` }],
    };
  },

  /* where the asymptotes come from */
  tanAsymWhere: () => {
    return mc("tanGraph", "y = tan x is undefined (has a vertical asymptote) wherever…",
      "cos x = 0", ["sin x = 0", "tan x = 0", "x = 0"],
      { graph: trigGraph({ fn: "tan", a: 1, b: 1, p: 0, q: 0 }, { accent: ACC }).spec,
        hint: "tan x = sin x ÷ cos x. A fraction is undefined when its denominator is 0.",
        answerLabel: "Asymptotes occur where cos x = 0 (at 90°, 270°, …)." });
  },

  /* x-intercepts of tan */
  tanXintercept: () => {
    return mc("tanGraph", "What are the x-intercepts of y = tan x for x ∈ [0° ; 360°]?",
      "0°, 180° and 360°", ["90° and 270°", "45° and 135°", "only at 0°"],
      { graph: trigGraph({ fn: "tan", a: 1, b: 1, p: 0, q: 0 }, { accent: ACC }).spec,
        hint: "tan x = 0 where the numerator sin x = 0.",
        answerLabel: "x-intercepts where sin x = 0: 0°, 180°, 360°." });
  },

  /* range of tan */
  tanRange: () => {
    const cv = tanCv();
    return mc("trigRange", `${eqStr(cv)}<br>What is the <b>range</b>?`,
      "y ∈ ℝ", pick3("y ∈ ℝ", [intervalStr(-Math.abs(cv.a), Math.abs(cv.a)), intervalStr((cv.q || 0) - 1, (cv.q || 0) + 1), "y ∈ [−1 ; 1]", "undefined"]),
      { graph: trigGraph(cv, { accent: ACC }).spec,
        hint: "Tangent climbs without bound between its asymptotes, so it reaches every real value.",
        answerLabel: "Range: y ∈ ℝ (any a, b, p, q)." });
  },

  /* find a from ±45° references */
  tanAValue: () => {
    const a = pick([1, 2, 3]);
    const m = pick([0, 1, -1]);          // midline
    const hi = m + a, lo = m - a;
    return {
      type: "calc", concept: "tanAValue",
      prompt: `A tan graph crosses its midline at an inflection point. 45° to the <b>right</b> it sits at y = ${nstr(hi)}; 45° to the <b>left</b> it sits at y = ${nstr(lo)}. Find <b>a</b>.`,
      expected: a, dp: 0, allowNeg: true,
      hint: "a = (the value 45° right − the value 45° left) ÷ 2.",
      answerLabel: `a = (${nstr(hi)} − (${nstr(lo)})) ÷ 2 = ${a}.`,
      solution: [{ s: `a = ("y at +45°" − "y at −45°") ÷ 2 = (${nstr(hi)} − (${nstr(lo)})) ÷ 2`, r: `= ${a}` }],
    };
  },

  /* steepness yes/no */
  tanSteeperYesNo: () => {
    return {
      type: "yesno", concept: "tanAValue",
      prompt: "For a tan graph, does a <b>larger</b> value of a make the branches steeper?",
      yes: true,
      hint: "Tangent has no amplitude, but a still stretches it vertically — that makes each branch steeper.",
      answerLabel: "Yes — a bigger a makes a tan graph steeper (it has no amplitude, but a sets the steepness).",
      solution: [{ s: "a stretches tan vertically: larger a → steeper branches; smaller a → flatter." }],
    };
  },
};

export const questTg5 = {
  id: "tg5",
  skills: [
    { id: "tanPeriodCalc", concept: "tanGraph", gen: SKILLS.tanPeriodCalc },
    { id: "tanAsymWhere", concept: "tanGraph", gen: SKILLS.tanAsymWhere },
    { id: "tanXintercept", concept: "tanGraph", gen: SKILLS.tanXintercept },
    { id: "tanRange", concept: "trigRange", gen: SKILLS.tanRange },
    { id: "tanAValue", concept: "tanAValue", gen: SKILLS.tanAValue },
    { id: "tanSteeperYesNo", concept: "tanAValue", gen: SKILLS.tanSteeperYesNo },
  ],
};
