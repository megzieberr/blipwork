/* ============================================================
   TRIG GRAPHS QUEST 1 · The three parent graphs   ★ DIAGRAM
   Recognise sin, cos and tan by shape, and know each one's
   period, amplitude, range and key features.
   ============================================================ */
import { mc } from "./_shared.js";
import { trigGraph } from "./_tgraph.js";
import { periodOf, amplitudeOf, FN_NAME, pick } from "../tgraphlib.js";

const ACC = "#a5b4fc";
const parent = (fn) => ({ fn, a: 1, b: 1, p: 0, q: 0 });

const SKILLS = {
  /* which graph is this? */
  whichShape: () => {
    const fn = pick(["sin", "cos", "tan"]);
    const spec = trigGraph(parent(fn), { accent: ACC }).spec;
    return mc("trigParents", "Which graph is shown?",
      `y = ${fn} x`, ["sin", "cos", "tan"].filter((f) => f !== fn).map((f) => `y = ${f} x`),
      { graph: spec,
        hint: "Cosine starts at its peak (at 0°); sine starts at 0 and rises; tangent has vertical asymptotes.",
        answerLabel: `This is y = ${fn} x.` });
  },

  /* parent period */
  parentPeriod: () => {
    const fn = pick(["sin", "cos", "tan"]);
    const P = periodOf(parent(fn));
    return mc("trigPeriod", `What is the period of y = ${fn} x?`,
      `${P}°`, ["90°", "180°", "360°", "720°"].filter((s) => s !== `${P}°`),
      { graph: trigGraph(parent(fn), { accent: ACC }).spec,
        hint: "The period is one full cycle. Sine & cosine repeat every 360°; tangent every 180°.",
        answerLabel: `Period of y = ${fn} x is ${P}°.` });
  },

  /* parent range */
  parentRange: () => {
    const fn = pick(["sin", "cos", "tan"]);
    const correct = fn === "tan" ? "y ∈ ℝ" : "y ∈ [−1 ; 1]";
    return mc("trigRange", `What is the range of y = ${fn} x?`,
      correct, ["y ∈ ℝ", "y ∈ [−1 ; 1]", "y ∈ [0 ; 1]", "y ∈ [−1 ; 0]"].filter((s) => s !== correct),
      { graph: trigGraph(parent(fn), { accent: ACC }).spec,
        hint: "Sine & cosine stay between −1 and 1. Tangent reaches every real value.",
        answerLabel: `Range of y = ${fn} x is ${correct}.` });
  },

  /* parent amplitude */
  parentAmplitude: () => {
    const fn = pick(["sin", "cos", "tan"]);
    const A = amplitudeOf(parent(fn));
    const correct = A == null ? "undefined" : "1";
    return mc("trigAmplitude", `What is the amplitude of y = ${fn} x?`,
      correct, ["1", "undefined", "2", "360°"].filter((s) => s !== correct),
      { graph: trigGraph(parent(fn), { accent: ACC }).spec,
        hint: "Amplitude is the height from the middle to a peak. Tangent has no peak, so it is undefined.",
        answerLabel: A == null ? "Tangent has no amplitude (undefined)." : `Amplitude of y = ${fn} x is 1.` });
  },

  /* tan asymptotes */
  tanAsymptotes: () => {
    return mc("tanGraph", "Where are the asymptotes of y = tan x for x ∈ [0° ; 360°]?",
      "90° and 270°", ["0° and 180°", "180° and 360°", "45° and 135°"],
      { graph: trigGraph(parent("tan"), { accent: ACC }).spec,
        hint: "tan x = sin x ÷ cos x. The graph is undefined where cos x = 0.",
        answerLabel: "Asymptotes at 90° and 270° (where cos x = 0)." });
  },

  /* tap the peak of a parent sin/cos graph */
  tapPeak: () => {
    const fn = pick(["sin", "cos"]);
    const cv = parent(fn);
    const win = { xmin: 0, xmax: 360, ymin: -1.6, ymax: 1.6 };
    // peak, trough and a zero, each genuinely on the curve
    const peakX = fn === "sin" ? 90 : 360;
    const troughX = fn === "sin" ? 270 : 180;
    const zeroX = fn === "sin" ? 180 : 90;
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
      prompt: `Tap the <b>maximum</b> (peak) of y = ${fn} x.`,
      tapHint: "The peak is the highest point — where the graph reaches +1.",
      answerLabel: `The peak of y = ${fn} x is at (${peakX}° ; 1).`,
      solution: [{ s: `y = ${fn} x reaches its maximum of 1 at x = ${peakX}°.` }],
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
