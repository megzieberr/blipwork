/* ============================================================
   TRIG GRAPHS QUEST 6 · Find the equation   ★★ DIAGRAM
   Read a to-scale graph and recover a, b and q — then pick the
   full equation. (No horizontal shift here: p = 0.)
   ============================================================ */
import { mc } from "./_shared.js";
import { trigGraph, ampRangeGraph, periodGraph, pick3 } from "./_tgraph.js";
import { eqStr, periodOf, amplitudeOf, FN_NAME, nstr, pick } from "../tgraphlib.js";
import { L } from "../lang.js";

const ACC = "#4338ca";

const SKILLS = {
  /* sine or cosine? */
  whichBase: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos")]);
    const cv = { fn, a: 1, b: 1, p: 0, q: 0 };
    return mc("findTrigEquation", L("Is this the graph of sine, cosine or tangent?", "Is dit 'n sin-, cos- of tan-grafiek?"),
      FN_NAME[fn], [FN_NAME[fn === L("sin", "sin") ? L("cos", "cos") : L("sin", "sin")], L("tangent", "tan")],
      { graph: trigGraph(cv, { accent: ACC }).spec,
        hint: L("Cosine starts at a peak (at 0°); sine starts at 0 and rises; tangent has asymptotes.", "Die cos-grafiek begin by 'n piek (by 0°); die sin-grafiek begin by 0 en styg; die tan-grafiek het asimptote."),
        answerLabel: L(`This is a ${FN_NAME[fn]} graph.`, `Dit is 'n ${FN_NAME[fn]}-grafiek.`) });
  },

  /* read a (with its sign) */
  findA: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos")]);
    const a = pick([2, 3, -2, -3]);
    const cv = { fn, a, b: 1, p: 0, q: pick([0, 1, -1]) };
    return mc("findTrigEquation", L(`The graph shows y = a·${fn} x + q.<br>Read the value of <b>a</b> (watch the sign).`, `Die grafiek wys y = a·${fn} x + q.<br>Lees die waarde van <b>a</b> af (let op die teken).`),
      nstr(a), pick3(nstr(a), [nstr(-a), nstr(2 * a), nstr(Math.abs(a)), nstr(a + (a > 0 ? 1 : -1))]),
      { graph: ampRangeGraph(cv, { accent: ACC }).spec,
        hint: L("a = (y max − y min) ÷ 2, made negative if the graph is flipped (starts the wrong way up).", "a = (y maks − y min) ÷ 2, negatief as die grafiek omgedraai is (dit begin onderstebo)."),
        answerLabel: L(`a = ${nstr(a)}.`, `a = ${nstr(a)}.`) });
  },

  /* read q (the midline) */
  findQ: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos")]);
    const q = pick([1, 2, -1, -2]);
    const cv = { fn, a: pick([2, 3]), b: 1, p: 0, q };
    return mc("findTrigEquation", L(`The graph shows y = a·${fn} x + q.<br>Read the value of <b>q</b> (the vertical shift).`, `Die grafiek wys y = a·${fn} x + q.<br>Lees die waarde van <b>q</b> af (die vertikale skuif).`),
      nstr(q), pick3(nstr(q), ["0", nstr(-q), nstr(q + 1), nstr(q - 1), nstr(amplitudeOf(cv))]),
      { graph: trigGraph(cv, { accent: ACC, midline: true }).spec,
        hint: L("q = (y max + y min) ÷ 2 — the height of the midline (the dashed line).", "q = (y maks + y min) ÷ 2: die hoogte van die middellyn (die stippellyn)."),
        answerLabel: L(`q = ${nstr(q)} (the midline).`, `q = ${nstr(q)} (die middellyn).`) });
  },

  /* read b (from the period) */
  findB: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos")]);
    const b = pick([2, 3]);
    const cv = { fn, a: pick([1, 2]), b, p: 0, q: 0 };
    return mc("findTrigEquation", L(`The graph shows y = a·${fn} bx.<br>Read the value of <b>b</b> (use the marked cycle to find the period first).`, `Die grafiek wys y = a·${fn} bx.<br>Lees die waarde van <b>b</b> af (kry eers die periode uit die gemerkte siklus).`),
      nstr(b), pick3(nstr(b), [nstr(periodOf(cv)), nstr(b + 1), nstr(b - 1), nstr(2 * b)]),
      { graph: periodGraph(cv, { accent: ACC }).spec,
        hint: L("First read the period, then b = 360° ÷ period.", "Lees eers die periode af, dan b = 360° ÷ periode."),
        answerLabel: L(`Period ${periodOf(cv)}° → b = 360° ÷ ${periodOf(cv)}° = ${b}.`, `Periode ${periodOf(cv)}° → b = 360° ÷ ${periodOf(cv)}° = ${b}.`) });
  },

  /* pick the full equation */
  findEquationFull: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos")]);
    const a = pick([2, -2, 3]);
    const b = pick([1, 2]);
    const q = pick([0, 1, -1]);
    const cv = { fn, a, b, p: 0, q };
    const otherB = b === 1 ? 2 : 1;
    const decoys = [
      eqStr({ ...cv, a: -a }),
      eqStr({ ...cv, b: otherB }),
      eqStr({ ...cv, q: q + 1 }),
      eqStr({ ...cv, fn: fn === L("sin", "sin") ? L("cos", "cos") : L("sin", "sin") }),
    ];
    return mc("findTrigEquation", L("Which equation matches the graph?", "Watter vergelyking pas by die grafiek?"),
      eqStr(cv), pick3(eqStr(cv), decoys),
      { graph: ampRangeGraph(cv, { accent: ACC }).spec, layout: "grid2",
        hint: L("Find a (height + sign), q (midline) and b (from the period), then read off sin vs cos.", "Kry a (hoogte + teken), q (middellyn) en b (uit die periode), en lees dan af of dit sin of cos is."),
        answerLabel: L(`Equation: ${eqStr(cv)}.`, `Vergelyking: ${eqStr(cv)}.`) });
  },

  /* read b for a tan graph */
  findTanB: () => {
    const b = pick([2, 3]);
    const cv = { fn: "tan", a: pick([1, 2]), b, p: 0, q: 0 };
    return mc("findTrigEquation", L(`The graph shows y = a·tan bx.<br>Read the value of <b>b</b> (use the spacing of the asymptotes).`, `Die grafiek wys y = a·tan bx.<br>Lees die waarde van <b>b</b> af (gebruik die afstand tussen die asimptote).`),
      nstr(b), pick3(nstr(b), [nstr(periodOf(cv)), nstr(b + 1), nstr(b - 1), nstr(2 * b)]),
      { graph: trigGraph(cv, { accent: ACC }).spec,
        hint: L("Tangent's asymptotes are one period apart. Period = 180° ÷ b, so b = 180° ÷ period.", "Die tan-grafiek se asimptote is een periode uitmekaar. Periode = 180° ÷ b, dus b = 180° ÷ periode."),
        answerLabel: L(`Period ${periodOf(cv)}° → b = 180° ÷ ${periodOf(cv)}° = ${b}.`, `Periode ${periodOf(cv)}° → b = 180° ÷ ${periodOf(cv)}° = ${b}.`) });
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
