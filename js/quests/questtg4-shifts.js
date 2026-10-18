/* ============================================================
   TRIG GRAPHS QUEST 4 · Horizontal & vertical shifts
   The p and q parameters: which way and how far, the "opposite
   direction" rule, factoring b out first, and the fact that a
   shift never changes the period.
   ============================================================ */
import { mc } from "./_shared.js";
import { trigGraph, twoTrigGraph, pick3 } from "./_tgraph.js";
import { eqStr, rangeStr, intervalStr, amplitudeOf, nstr, pick } from "../tgraphlib.js";
import { L } from "../lang.js";

const ACC = "#5b54e0";

const SKILLS = {
  /* horizontal shift: which way & how far */
  hShiftDir: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos")]);
    const mag = pick([30, 40, 45, 60]);
    const p = pick([mag, -mag]);
    const cv = { fn, a: 1, b: 1, p, q: 0 };
    const dir = p > 0 ? L("right", "regs") : L("left", "links");
    return mc("trigShifts", L(`${eqStr(cv)}<br>Describe the shift from y = ${fn} x.`, `${eqStr(cv)}<br>Beskryf die skuif vanaf y = ${fn} x.`),
      L(`${mag}° to the ${dir}`, `${mag}° na ${dir}`),
      [L(`${mag}° to the ${p > 0 ? "left" : "right"}`, `${mag}° na ${p > 0 ? "links" : "regs"}`), L(`${mag} units up`, `${mag} eenhede op`), L(`${mag} units down`, `${mag} eenhede af`)],
      { graph: trigGraph(cv, { accent: ACC }).spec,
        hint: L("The bracket is (x − p). The graph moves the OPPOSITE way to the sign: (x − 30°) → right, (x + 30°) → left.", "Die hakie is (x − p). Die grafiek skuif TEENOORGESTELD aan die teken: (x − 30°) → regs, (x + 30°) → links."),
        answerLabel: L(`${eqStr(cv)} shifts y = ${fn} x ${mag}° to the ${dir}.`, `${eqStr(cv)} skuif y = ${fn} x ${mag}° na ${dir}.`) });
  },

  /* which equation shifts left */
  whichShiftsLeft: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos")]);
    const mag = pick([30, 45, 60]);
    const left = { fn, a: 1, b: 1, p: -mag, q: 0 };    // (x + mag) → left
    const right = { fn, a: 1, b: 1, p: mag, q: 0 };
    return mc("trigShifts", L(`Which equation shifts y = ${fn} x <b>${mag}° to the left</b>?`, `Watter vergelyking skuif y = ${fn} x <b>${mag}° na links</b>?`),
      eqStr(left), [eqStr(right), L(`y = ${fn} x + ${mag}`, `y = ${fn} x + ${mag}`), L(`y = ${fn} x − ${mag}`, `y = ${fn} x − ${mag}`)],
      { hint: L("Left means the bracket reads (x + …). A vertical shift (+ outside the function) does not move it sideways.", "Links beteken die hakie lees (x + …). 'n Vertikale skuif (+ buite die funksie) beweeg dit nie links of regs nie."),
        answerLabel: L(`${eqStr(left)} shifts ${mag}° left.`, `${eqStr(left)} skuif ${mag}° na links.`) });
  },

  /* the 90° twin-shift between sine and cosine */
  sinCosTwin: () => {
    const toCos = pick([true, false]);
    const from = toCos ? L("sin", "sin") : L("cos", "cos"), to = toCos ? L("cos", "cos") : L("sin", "sin");
    const dir = toCos ? L("left", "links") : L("right", "regs");
    const f = { fn: L("sin", "sin"), a: 1, b: 1, p: 0, q: 0 }, g = { fn: L("cos", "cos"), a: 1, b: 1, p: 0, q: 0 };
    const graph = twoTrigGraph(f, g, {
      accent: ACC, win: { xmin: 0, xmax: 360, ymin: -1.6, ymax: 1.6 },
      labelA: "f", labelAtA: 90, labelB: "g", labelAtB: 360,
    }).spec;
    return mc("trigParents",
      L(`f = sin x and g = cos x are drawn. How must y = ${from} x be shifted to give y = ${to} x?`, `f = sin x en g = cos x is geteken. Hoe moet y = ${from} x skuif om y = ${to} x te gee?`),
      L(`90° to the ${dir}`, `90° na ${dir}`),
      [L(`90° to the ${toCos ? "right" : "left"}`, `90° na ${toCos ? "regs" : "links"}`), L(`180° to the ${dir}`, `180° na ${dir}`), L("1 unit up", "1 eenheid op")],
      { graph,
        hint: L("Cosine peaks at 0°, sine only at 90° — cosine is 90° 'ahead'. Slide the peaks onto each other.", "Die cos-grafiek se piek is by 0°, die sin-grafiek s'n eers by 90°: cos is 90° 'voor'. Skuif die pieke op mekaar."),
        answerLabel: toCos ? L("cos x = sin(x + 90°): shift sin x 90° left.", "cos x = sin(x + 90°): skuif sin x 90° na links.") : L("sin x = cos(x − 90°): shift cos x 90° right.", "sin x = cos(x − 90°): skuif cos x 90° na regs."),
        solution: [
          { s: toCos ? L("sin x peaks at 90°; cos x peaks at 0°", "sin x se piek is by 90°; cos x se piek is by 0°") : L("cos x peaks at 0°; sin x peaks at 90°", "cos x se piek is by 0°; sin x se piek is by 90°") },
          { s: toCos ? L("every feature must move 90° left: cos x = sin(x + 90°)", "elke kenmerk moet 90° na links skuif: cos x = sin(x + 90°)") : L("every feature must move 90° right: sin x = cos(x − 90°)", "elke kenmerk moet 90° na regs skuif: sin x = cos(x − 90°)") },
        ] });
  },

  /* factor b out first */
  factorB: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos")]);
    const b = pick([2, 3]);
    const shift = pick([20, 30, 40]);
    const inner = b * shift;
    return mc("trigShifts",
      L(`Rewrite y = ${fn}(${b}x − ${inner}°) as y = ${fn} b(x − p). What is the <b>real</b> horizontal shift?`, `Herskryf y = ${fn}(${b}x − ${inner}°) as y = ${fn} b(x − p). Wat is die <b>werklike</b> horisontale skuif?`),
      L(`${shift}° to the right`, `${shift}° na regs`),
      [L(`${inner}° to the right`, `${inner}° na regs`), L(`${shift}° to the left`, `${shift}° na links`), L(`${inner}° to the left`, `${inner}° na links`)],
      { graph: trigGraph({ fn, a: 1, b, p: shift, q: 0 }, { accent: ACC }).spec,
        hint: L(`Factor b out: ${fn}(${b}x − ${inner}°) = ${fn} ${b}(x − ${shift}°). The shift is ${shift}°, not ${inner}°.`, `Haal b as faktor uit: ${fn}(${b}x − ${inner}°) = ${fn} ${b}(x − ${shift}°). Die skuif is ${shift}°, nie ${inner}° nie.`),
        answerLabel: L(`${fn} ${b}(x − ${shift}°): shift ${shift}° right.`, `${fn} ${b}(x − ${shift}°): skuif ${shift}° na regs.`) });
  },

  /* vertical shift direction */
  vShiftDir: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos"), L("tan", "tan")]);
    const q = pick([2, 3, -2, -3]);
    const cv = { fn, a: 1, b: 1, p: 0, q };
    const dir = q > 0 ? L("up", "op") : L("down", "af");
    return mc("trigShifts", L(`${eqStr(cv)}<br>How is it shifted from y = ${fn} x?`, `${eqStr(cv)}<br>Hoe is dit vanaf y = ${fn} x geskuif?`),
      L(`${Math.abs(q)} units ${dir}`, `${Math.abs(q)} eenhede ${dir}`),
      [L(`${Math.abs(q)} units ${q > 0 ? "down" : "up"}`, `${Math.abs(q)} eenhede ${q > 0 ? "af" : "op"}`), L(`${Math.abs(q)}° to the right`, `${Math.abs(q)}° na regs`), L(`${Math.abs(q)}° to the left`, `${Math.abs(q)}° na links`)],
      { graph: trigGraph(cv, { accent: ACC, midline: true }).spec,
        hint: L("q is added outside the function, so it slides the graph vertically (+ up, − down).", "q word buite die funksie bygetel, dus skuif dit die grafiek vertikaal (+ op, − af)."),
        answerLabel: L(`q = ${nstr(q)} shifts it ${Math.abs(q)} units ${dir}.`, `q = ${nstr(q)} skuif dit ${Math.abs(q)} eenhede ${dir}.`) });
  },

  /* a shift changes the range */
  shiftRange: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos")]);
    const a = pick([2, 3]);
    const q = pick([1, 2, -1, -2]);
    const cv = { fn, a, b: 1, p: 0, q };
    const A = amplitudeOf(cv);
    return mc("trigRange",
      L(`Start with y = ${a}${fn} x, then shift it ${Math.abs(q)} ${q > 0 ? "up" : "down"}. What is the new <b>range</b>?`, `Begin met y = ${a}${fn} x en skuif dit dan ${Math.abs(q)} ${q > 0 ? "op" : "af"}. Wat is die nuwe <b>waardeversameling</b>?`),
      rangeStr(cv), pick3(rangeStr(cv), [intervalStr(-A, A), intervalStr(q - 2 * A, q + 2 * A), intervalStr(q - 1, q + 1), L("y ∈ ℝ", "y ∈ ℝ")]),
      { graph: trigGraph(cv, { accent: ACC, midline: true }).spec,
        hint: L(`Amplitude stays ${A}; the midline moves to y = ${nstr(q)}. Range = [${nstr(q - A)} ; ${nstr(q + A)}].`, `Die amplitude bly ${A}; die middelste lyn skuif na y = ${nstr(q)}. Waardeversameling = [${nstr(q - A)} ; ${nstr(q + A)}].`),
        answerLabel: L(`New range: ${rangeStr(cv)}.`, `Nuwe waardeversameling: ${rangeStr(cv)}.`) });
  },

  /* a shift does not change the period (yes/no) */
  shiftPeriodYesNo: () => {
    return {
      type: "yesno", concept: "trigShifts",
      prompt: L("Does shifting a graph left, right, up or down change its <b>period</b>?", "As jy 'n grafiek links, regs, op of af skuif, verander sy <b>periode</b>?"),
      yes: false,
      hint: L("Only b changes the period. Shifting just slides the same wave to a new place.", "Net b verander die periode. 'n Skuif beweeg net dieselfde golf na 'n nuwe plek."),
      answerLabel: L("No — shifts move the graph but the period (set by b) stays the same.", "Nee: skuiwe beweeg die grafiek, maar die periode (bepaal deur b) bly dieselfde."),
      solution: [{ s: L("Period = 360° ÷ b (180° ÷ b for tan). Shifts change p and q, not b, so the period is unchanged.", "Periode = 360° ÷ b (180° ÷ b vir tan). Skuiwe verander p en q, nie b nie, dus bly die periode onveranderd.") }],
    };
  },
};

export const questTg4 = {
  id: "tg4",
  skills: [
    { id: "hShiftDir", concept: "trigShifts", gen: SKILLS.hShiftDir },
    { id: "whichShiftsLeft", concept: "trigShifts", gen: SKILLS.whichShiftsLeft },
    { id: "sinCosTwin", concept: "trigParents", gen: SKILLS.sinCosTwin },
    { id: "factorB", concept: "trigShifts", gen: SKILLS.factorB },
    { id: "vShiftDir", concept: "trigShifts", gen: SKILLS.vShiftDir },
    { id: "shiftRange", concept: "trigRange", gen: SKILLS.shiftRange },
    { id: "shiftPeriodYesNo", concept: "trigShifts", gen: SKILLS.shiftPeriodYesNo },
  ],
};
