/* ============================================================
   TRIG GRAPHS QUEST 5 · The tangent graph   ★ DIAGRAM
   Asymptotes (cos = 0), x-intercepts (sin = 0), period 180°,
   range ℝ, and finding a from two ±45° reference points.
   ============================================================ */
import { mc } from "./_shared.js";
import { trigGraph, pick3 } from "./_tgraph.js";
import { eqStr, periodOf, intervalStr, degLabel, nstr, pick } from "../tgraphlib.js";
import { L } from "../lang.js";

const ACC = "#4f46e5";
const tanCv = (o = {}) => ({ fn: "tan", a: o.a ?? pick([1, 2, 3, -1, -2]), b: o.b ?? pick([1, 2, 3]), p: 0, q: o.q ?? pick([0, 0, 1, -1]) });

const SKILLS = {
  /* period of a tan graph */
  tanPeriodCalc: () => {
    const cv = tanCv();
    return {
      type: "calc", concept: "tanGraph",
      prompt: L(`${eqStr(cv)}<br>What is the <b>period</b>?`, `${eqStr(cv)}<br>Wat is die <b>periode</b>?`),
      graph: trigGraph(cv, { accent: ACC }).spec,
      expected: periodOf(cv), dp: 0, unit: "°", allowNeg: false,
      hint: L("Tangent's period = 180° ÷ b.", "Die tan-grafiek se periode = 180° ÷ b."),
      answerLabel: L(`Period = 180° ÷ ${nstr(cv.b)} = ${periodOf(cv)}°.`, `Periode = 180° ÷ ${nstr(cv.b)} = ${periodOf(cv)}°.`),
      solution: [{ s: L(`period = 180° ÷ ${nstr(cv.b)}`, `periode = 180° ÷ ${nstr(cv.b)}`), r: `= ${periodOf(cv)}°` }],
    };
  },

  /* where the asymptotes come from */
  tanAsymWhere: () => {
    return mc("tanGraph", L("y = tan x is undefined (has a vertical asymptote) wherever…", "y = tan x is onbepaald (het 'n vertikale asimptoot) oral waar…"),
      L("cos x = 0", "cos x = 0"), [L("sin x = 0", "sin x = 0"), L("tan x = 0", "tan x = 0"), L("x = 0", "x = 0")],
      { graph: trigGraph({ fn: "tan", a: 1, b: 1, p: 0, q: 0 }, { accent: ACC }).spec,
        hint: L("tan x = sin x ÷ cos x. A fraction is undefined when its denominator is 0.", "tan x = sin x ÷ cos x. 'n Breuk is onbepaald as sy noemer 0 is."),
        answerLabel: L("Asymptotes occur where cos x = 0 (at 90°, 270°, …).", "Asimptote kom voor waar cos x = 0 (by 90°, 270°, …).") });
  },

  /* x-intercepts of tan */
  tanXintercept: () => {
    return mc("tanGraph", L("What are the x-intercepts of y = tan x for x ∈ [0° ; 360°]?", "Wat is die x-afsnitte van y = tan x vir x ∈ [0° ; 360°]?"),
      L("0°, 180° and 360°", "0°, 180° en 360°"), [L("90° and 270°", "90° en 270°"), L("45° and 135°", "45° en 135°"), L("only at 0°", "net by 0°")],
      { graph: trigGraph({ fn: "tan", a: 1, b: 1, p: 0, q: 0 }, { accent: ACC }).spec,
        hint: L("tan x = 0 where the numerator sin x = 0.", "tan x = 0 waar die teller sin x = 0."),
        answerLabel: L("x-intercepts where sin x = 0: 0°, 180°, 360°.", "x-afsnitte waar sin x = 0: 0°, 180°, 360°.") });
  },

  /* range of tan */
  tanRange: () => {
    const cv = tanCv();
    const aT = Math.abs(cv.a), qT = cv.q || 0, half = 90 / Math.abs(cv.b);
    return mc("trigRange", L(`${eqStr(cv)}<br>What is the <b>range</b>?`, `${eqStr(cv)}<br>Wat is die <b>waardeversameling</b>?`),
      L("y ∈ ℝ", "y ∈ ℝ"), pick3(L("y ∈ ℝ", "y ∈ ℝ"), [intervalStr(qT - aT, qT + aT), L("y ∈ [−1 ; 1]", "y ∈ [−1 ; 1]"), L("undefined", "onbepaald"), L(`y ∈ (−${half}° ; ${half}°)`, `y ∈ (−${half}° ; ${half}°)`)]),
      { graph: trigGraph(cv, { accent: ACC }).spec,
        hint: L("Tangent climbs without bound between its asymptotes, so it reaches every real value.", "Die tan-grafiek styg onbeperk tussen sy asimptote, dus bereik dit elke reële waarde."),
        answerLabel: L("Range: y ∈ ℝ (any a, b, p, q).", "Waardeversameling: y ∈ ℝ (enige a, b, p, q).") });
  },

  /* find a from ±45° references */
  tanAValue: () => {
    const a = pick([1, 2, 3]);
    const m = pick([0, 1, -1]);          // midline
    const hi = m + a, lo = m - a;
    return {
      type: "calc", concept: "tanAValue",
      prompt: L(`A tan graph crosses its midline at an inflection point. 45° to the <b>right</b> it sits at y = ${nstr(hi)}; 45° to the <b>left</b> it sits at y = ${nstr(lo)}. Find <b>a</b>.`, `Die tan-grafiek sny sy middellyn by 'n buigpunt. 45° na <b>regs</b> is dit by y = ${nstr(hi)}; 45° na <b>links</b> is dit by y = ${nstr(lo)}. Vind <b>a</b>.`),
      expected: a, dp: 0, allowNeg: true,
      hint: L("a = (the value 45° right − the value 45° left) ÷ 2.", "a = (die waarde 45° regs − die waarde 45° links) ÷ 2."),
      answerLabel: L(`a = (${nstr(hi)} − (${nstr(lo)})) ÷ 2 = ${a}.`, `a = (${nstr(hi)} − (${nstr(lo)})) ÷ 2 = ${a}.`),
      solution: [{ s: L(`a = ("y at +45°" − "y at −45°") ÷ 2 = (${nstr(hi)} − (${nstr(lo)})) ÷ 2`, `a = ("y by +45°" − "y by −45°") ÷ 2 = (${nstr(hi)} − (${nstr(lo)})) ÷ 2`), r: `= ${a}` }],
    };
  },

  /* steepness yes/no */
  tanSteeperYesNo: () => {
    return {
      type: "yesno", concept: "tanAValue",
      prompt: L("For a tan graph, does a <b>larger size</b> of a make the branches steeper?", "Maak 'n a met 'n <b>groter grootte</b> die takke van 'n tan-grafiek steiler?"),
      yes: true,
      hint: L("Tangent has no amplitude, but a still stretches it vertically — that makes each branch steeper.", "Die tan-grafiek het geen amplitude nie, maar a rek dit steeds vertikaal: dit maak elke tak steiler."),
      answerLabel: L("Yes — a bigger a makes a tan graph steeper (it has no amplitude, but a sets the steepness).", "Ja: 'n groter a maak 'n tan-grafiek steiler (dit het geen amplitude nie, maar a bepaal die steilheid)."),
      solution: [{ s: L("a stretches tan vertically: larger a → steeper branches; smaller a → flatter.", "a rek tan vertikaal: groter a → steiler takke; kleiner a → platter.") }],
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
