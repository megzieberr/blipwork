/* ============================================================
   TRIG GRAPHS QUEST 1 · The three parent graphs   ★ DIAGRAM
   Recognise sin, cos and tan by shape, and know each one's
   period, amplitude, range and key features.
   ============================================================ */
import { mc } from "./_shared.js";
import { trigGraph } from "./_tgraph.js";
import { periodOf, amplitudeOf, FN_NAME, pick } from "../tgraphlib.js";
import { L } from "../lang.js";

const ACC = "#a5b4fc";
const parent = (fn) => ({ fn, a: 1, b: 1, p: 0, q: 0 });

const SKILLS = {
  /* which graph is this? */
  whichShape: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos"), L("tan", "tan")]);
    const spec = trigGraph(parent(fn), { accent: ACC }).spec;
    return mc("trigParents", L("Which graph is shown?", "Watter grafiek word gewys?"),
      L(`y = ${fn} x`, `y = ${fn} x`), [L("sin", "sin"), L("cos", "cos"), L("tan", "tan")].filter((f) => f !== fn).map((f) => L(`y = ${f} x`, `y = ${f} x`)),
      { graph: spec,
        hint: L("Cosine starts at its peak (at 0°); sine starts at 0 and rises; tangent has vertical asymptotes.", "Die cos-grafiek begin by sy piek (by 0°); die sin-grafiek begin by 0 en styg; die tan-grafiek het vertikale asimptote."),
        answerLabel: L(`This is y = ${fn} x.`, `Dit is y = ${fn} x.`) });
  },

  /* parent period */
  parentPeriod: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos"), L("tan", "tan")]);
    const P = periodOf(parent(fn));
    return mc("trigPeriod", L(`What is the period of y = ${fn} x?`, `Wat is die periode van y = ${fn} x?`),
      `${P}°`, ["90°", "180°", "360°", "720°"].filter((s) => s !== `${P}°`),
      { graph: trigGraph(parent(fn), { accent: ACC }).spec,
        hint: L("The period is one full cycle. Sine & cosine repeat every 360°; tangent every 180°.", "Die periode is een volle siklus. Die sin- en cos-grafieke herhaal elke 360°; die tan-grafiek elke 180°."),
        answerLabel: L(`Period of y = ${fn} x is ${P}°.`, `Die periode van y = ${fn} x is ${P}°.`) });
  },

  /* parent range */
  parentRange: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos"), L("tan", "tan")]);
    const correct = fn === L("tan", "tan") ? L("y ∈ ℝ", "y ∈ ℝ") : L("y ∈ [−1 ; 1]", "y ∈ [−1 ; 1]");
    return mc("trigRange", L(`What is the range of y = ${fn} x?`, `Wat is die waardeversameling van y = ${fn} x?`),
      correct, [L("y ∈ ℝ", "y ∈ ℝ"), L("y ∈ [−1 ; 1]", "y ∈ [−1 ; 1]"), L("y ∈ [0 ; 1]", "y ∈ [0 ; 1]"), L("y ∈ [−1 ; 0]", "y ∈ [−1 ; 0]")].filter((s) => s !== correct),
      { graph: trigGraph(parent(fn), { accent: ACC }).spec,
        hint: L("Sine & cosine stay between −1 and 1. Tangent reaches every real value.", "Die sin- en cos-grafieke bly tussen −1 en 1. Die tan-grafiek bereik elke reële waarde."),
        answerLabel: L(`Range of y = ${fn} x is ${correct}.`, `Die waardeversameling van y = ${fn} x is ${correct}.`) });
  },

  /* parent amplitude */
  parentAmplitude: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos"), L("tan", "tan")]);
    const A = amplitudeOf(parent(fn));
    const correct = A == null ? L("undefined", "onbepaald") : "1";
    return mc("trigAmplitude", L(`What is the amplitude of y = ${fn} x?`, `Wat is die amplitude van y = ${fn} x?`),
      correct, ["1", L("undefined", "onbepaald"), "2", "360°"].filter((s) => s !== correct),
      { graph: trigGraph(parent(fn), { accent: ACC }).spec,
        hint: L("Amplitude is the height from the middle to a peak. Tangent has no peak, so it is undefined.", "Amplitude is die hoogte van die middel tot 'n piek. Die tan-grafiek het geen piek nie, dus is dit onbepaald."),
        answerLabel: A == null ? L("Tangent has no amplitude (undefined).", "Die tan-grafiek het geen amplitude nie (onbepaald).") : L(`Amplitude of y = ${fn} x is 1.`, `Die amplitude van y = ${fn} x is 1.`) });
  },

  /* tan asymptotes */
  tanAsymptotes: () => {
    return mc("tanGraph", L("Where are the asymptotes of y = tan x for x ∈ [0° ; 360°]?", "Waar is die asimptote van y = tan x vir x ∈ [0° ; 360°]?"),
      L("90° and 270°", "90° en 270°"), [L("0° and 180°", "0° en 180°"), L("180° and 360°", "180° en 360°"), L("45° and 135°", "45° en 135°")],
      { graph: trigGraph(parent(L("tan", "tan")), { accent: ACC }).spec,
        hint: L("tan x = sin x ÷ cos x. The graph is undefined where cos x = 0.", "tan x = sin x ÷ cos x. Die grafiek is onbepaald waar cos x = 0."),
        answerLabel: L("Asymptotes at 90° and 270° (where cos x = 0).", "Asimptote by 90° en 270° (waar cos x = 0).") });
  },

  /* tap the peak of a parent sin/cos graph */
  tapPeak: () => {
    const fn = pick([L("sin", "sin"), L("cos", "cos")]);
    const cv = parent(fn);
    const win = { xmin: 0, xmax: 360, ymin: -1.6, ymax: 1.6 };
    // peak, trough and a zero, each genuinely on the curve
    const peakX = fn === L("sin", "sin") ? 90 : 360;
    const troughX = fn === L("sin", "sin") ? 270 : 180;
    const zeroX = fn === L("sin", "sin") ? 180 : 90;
    const spec = {
      type: "trigg", accent: ACC, grid: true, win, curves: [{ ...cv }],
      points: [
        { x: peakX, y: 1, on: 0, id: "peak" },
        { x: troughX, y: -1, on: 0, id: "trough" },
        { x: zeroX, y: 0, on: 0, id: "zero" },
      ],
      tap: { targets: ["peak", "trough", "zero"], correctId: "peak" },
    };
    return {
      type: "tap", concept: "trigParents", graph: spec, tap: spec.tap,
      prompt: L(`Tap the <b>maximum</b> (peak) of y = ${fn} x.`, `Klik op die <b>maksimum</b> (piek) van y = ${fn} x.`),
      tapHint: L("The peak is the highest point — where the graph reaches +1.", "Die piek is die hoogste punt, waar die grafiek +1 bereik."),
      answerLabel: L(`The peak of y = ${fn} x is at (${peakX}° ; 1).`, `Die piek van y = ${fn} x is by (${peakX}° ; 1).`),
      solution: [{ s: L(`y = ${fn} x reaches its maximum of 1 at x = ${peakX}°.`, `y = ${fn} x bereik sy maksimum van 1 by x = ${peakX}°.`) }],
    };
  },
};

export const questTg1 = {
  id: "tg1",
  skills: [
    { id: "whichShape", concept: "trigParents", gen: SKILLS.whichShape },
    { id: "parentPeriod", concept: "trigPeriod", gen: SKILLS.parentPeriod },
    { id: "parentRange", concept: "trigRange", gen: SKILLS.parentRange },
    { id: "parentAmplitude", concept: "trigAmplitude", gen: SKILLS.parentAmplitude },
    { id: "tanAsymptotes", concept: "tanGraph", gen: SKILLS.tanAsymptotes },
    { id: "tapPeak", concept: "trigParents", gen: SKILLS.tapPeak },
  ],
};
