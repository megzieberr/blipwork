/* ============================================================
   TRIG GRAPHS QUEST 3 · ★ Period, amplitude & range   ★★ DIAGRAM
   The headline round: from an equation AND straight off a
   to-scale graph, find the period, the amplitude and the range
   — including tan (period 180°, no amplitude, range ℝ) and the
   effect of a vertical shift on the range.
   ============================================================ */
import { mc } from "./_shared.js";
import { trigGraph, ampRangeGraph, periodGraph, pick3 } from "./_tgraph.js";
import {
  eqStr, periodOf, amplitudeOf, rangeOf, rangeStr, ampStr, intervalStr,
  cyclesIn, degLabel, nstr, pick, randInt,
} from "../tgraphlib.js";

const ACC = "#6366f1";

/* clean random curves for this round (integer amplitudes so max/min read cleanly) */
const randSC = (opts = {}) => ({ fn: opts.fn || pick(["sin", "cos"]), a: opts.a ?? pick([1, 2, 3, -2, -3]), b: opts.b ?? pick([1, 2, 3]), p: 0, q: opts.q ?? pick([0, 0, 1, -1, 2]) });
const randTanC = () => ({ fn: "tan", a: pick([1, 2, -1, -2]), b: pick([1, 2, 3]), p: 0, q: pick([0, 0, 1, -1]) });

const SKILLS = {
  /* compute the period from the equation */
  periodCalc: () => {
    const fn = pick(["sin", "cos", "tan"]);
    const b = fn === "tan" ? pick([1, 2, 3]) : pick([1, 2, 3, 0.5]);
    const cv = { fn, a: fn === "tan" ? pick([1, 2]) : pick([1, 2, 3]), b, p: 0, q: pick([0, 0, 1, -1]) };
    const base = fn === "tan" ? 180 : 360;
    return {
      type: "calc", concept: "trigPeriod",
      prompt: `${eqStr(cv)}<br>What is the <b>period</b>?`,
      graph: trigGraph(cv, { accent: ACC }).spec,
      expected: periodOf(cv), dp: 0, unit: "°", allowNeg: false,
      hint: `Period = ${base}° ÷ b. ${fn === "tan" ? "Tangent uses 180°." : "Sine and cosine use 360°."}`,
      answerLabel: `Period = ${base}° ÷ ${nstr(b)} = ${periodOf(cv)}°.`,
      solution: [{ s: `period = ${base}° ÷ ${nstr(b)}`, r: `= ${periodOf(cv)}°` }],
    };
  },

  /* amplitude from the equation (includes the "undefined" trap for tan) */
  amplitudeMC: () => {
    const cv = pick([randSC, randSC, randTanC])();
    const graph = trigGraph(cv, { accent: ACC }).spec;
    if (cv.fn === "tan") {
      return mc("trigAmplitude", `${eqStr(cv)}<br>What is the <b>amplitude</b>?`,
        "undefined", pick3("undefined", [nstr(Math.abs(cv.a)), "1", degLabel(periodOf(cv)), nstr(2 * Math.abs(cv.a))]),
        { graph, hint: "Tangent has no maximum or minimum, so it has no amplitude.",
          answerLabel: "Amplitude: undefined (tan has no max/min)." });
    }
    const A = amplitudeOf(cv);
    return mc("trigAmplitude", `${eqStr(cv)}<br>What is the <b>amplitude</b>?`,
      ampStr(cv), pick3(ampStr(cv), [nstr(2 * A), nstr(Math.abs(cv.b)), nstr(A + Math.abs(cv.q || 0)), nstr(A + 1), nstr(A + 2), "1", "undefined"]),
      { graph, hint: "Amplitude = |a| (always positive). The sign of a only flips the graph.",
        answerLabel: `Amplitude = ${ampStr(cv)}.` });
  },

  /* range from the equation */
  rangeMC: () => {
    const cv = pick([randSC, randSC, randTanC])();
    const graph = trigGraph(cv, { accent: ACC, midline: true }).spec;
    if (cv.fn === "tan") {
      const aT = Math.abs(cv.a), qT = cv.q || 0, half = 90 / Math.abs(cv.b);
      return mc("trigRange", `${eqStr(cv)}<br>What is the <b>range</b>?`,
        "y ∈ ℝ", pick3("y ∈ ℝ", [intervalStr(qT - aT, qT + aT), "y ∈ [−1 ; 1]", "undefined", `y ∈ (−${half}° ; ${half}°)`]),
        { graph, hint: "Tangent reaches every real y-value.", answerLabel: "Range: y ∈ ℝ." });
    }
    const A = amplitudeOf(cv), q = cv.q || 0;
    return mc("trigRange", `${eqStr(cv)}<br>What is the <b>range</b>?`,
      rangeStr(cv), pick3(rangeStr(cv), [intervalStr(-A, A), intervalStr(q - 2 * A, q + 2 * A), intervalStr(q, q + A), "y ∈ ℝ"]),
      { graph, hint: "Range = [q − amplitude ; q + amplitude]. Start at the midline, go one amplitude each way.",
        answerLabel: `Range: ${rangeStr(cv)}.` });
  },

  /* range with a vertical shift (drills q affecting the range) */
  rangeShift: () => {
    const cv = randSC({ q: pick([2, 3, -2, -3, 1, -1]) });
    const A = amplitudeOf(cv), q = cv.q;
    return mc("trigRange", `${eqStr(cv)}<br>What is the <b>range</b>?`,
      rangeStr(cv), pick3(rangeStr(cv), [intervalStr(-A, A), intervalStr(q - 2 * A, q + 2 * A), intervalStr(q, q + A), intervalStr(q - 1, q + 1)]),
      { graph: trigGraph(cv, { accent: ACC, midline: true }).spec,
        hint: `Midline is y = ${nstr(q)}. Range = [${nstr(q)} − ${A} ; ${nstr(q)} + ${A}].`,
        answerLabel: `Range: ${rangeStr(cv)} (midline ${nstr(q)}, amplitude ${A}).` });
  },

  /* how many cycles in [0°; 360°] */
  cyclesCalc: () => {
    const cv = randSC({ b: pick([1, 2, 3]), q: pick([0, 1, -1]) });
    return {
      type: "calc", concept: "trigCycles",
      prompt: `${eqStr(cv)}<br>How many complete <b>cycles</b> does this graph make for x ∈ [0° ; 360°]?`,
      graph: trigGraph(cv, { accent: ACC, win: { xmin: 0, xmax: 360, ymin: Math.min(-amplitudeOf(cv) + (cv.q || 0) - 1, -1), ymax: Math.max(amplitudeOf(cv) + (cv.q || 0) + 1, 1) } }).spec,
      expected: cyclesIn(cv, 0, 360), dp: 0,
      hint: "Number of cycles = interval length ÷ period = 360° ÷ period.",
      answerLabel: `360° ÷ ${periodOf(cv)}° = ${cyclesIn(cv, 0, 360)} cycles.`,
      solution: [{ s: `cycles = 360° ÷ period = 360° ÷ ${periodOf(cv)}°`, r: `= ${cyclesIn(cv, 0, 360)}` }],
    };
  },

  /* ★ read the period off a to-scale graph (one cycle is marked) */
  readPeriod: () => {
    const cv = randSC({ b: pick([1, 2, 3]), q: pick([0, 0, 1, -1]) });
    const P = periodOf(cv);
    return mc("trigPeriod", "Read the <b>period</b> off the graph. The arrow marks one full cycle.",
      degLabel(P), pick3(degLabel(P), [degLabel(P / 2), degLabel(2 * P), "360°", "180°", degLabel(P + 90)]),
      { graph: periodGraph(cv, { accent: ACC }).spec,
        hint: "The period is the width of one complete wave (peak to the next peak).",
        answerLabel: `Period = ${P}°.` });
  },

  /* ★ read the amplitude off a to-scale graph (peak & trough marked) */
  readAmplitude: () => {
    const cv = randSC({ a: pick([1, 2, 3]), b: pick([1, 2]), q: pick([0, 1, -1, 2]) });
    const A = amplitudeOf(cv), q = cv.q || 0;
    return mc("trigAmplitude", "Read the <b>amplitude</b> off the graph (use the marked peak and trough).",
      nstr(A), pick3(nstr(A), [nstr(2 * A), nstr(q + A), nstr(Math.abs(q)), nstr(A + 1), nstr(2 * A + 1), nstr(2 * A + 2)]),
      { graph: ampRangeGraph(cv, { accent: ACC }).spec,
        hint: "Amplitude = (y max − y min) ÷ 2. Read y max and y min off the y-axis (the dashed guides).",
        answerLabel: `Amplitude = (${nstr(q + A)} − (${nstr(q - A)})) ÷ 2 = ${A}.` });
  },

  /* ★ read the range off a to-scale graph */
  readRange: () => {
    const cv = randSC({ a: pick([1, 2, 3]), b: pick([1, 2]), q: pick([0, 1, -1, 2]) });
    const A = amplitudeOf(cv), q = cv.q || 0;
    return mc("trigRange", "Read the <b>range</b> off the graph (the marked peak and trough).",
      rangeStr(cv), pick3(rangeStr(cv), [intervalStr(-A, A), intervalStr(q - A - 1, q + A + 1), intervalStr(q - 2 * A, q + 2 * A), intervalStr(q, q + A), "y ∈ ℝ"]),
      { graph: ampRangeGraph(cv, { accent: ACC }).spec,
        hint: "Range = from the lowest y-value (trough) up to the highest (peak).",
        answerLabel: `Range: ${rangeStr(cv)}.` });
  },

  /* tan has no amplitude (yes/no reinforcement) */
  tanNoAmp: () => {
    const cv = randTanC();
    return {
      type: "yesno", concept: "trigAmplitude",
      prompt: `Does ${eqStr(cv)} have an amplitude?`,
      graph: trigGraph(cv, { accent: ACC }).spec, yes: false,
      hint: "Amplitude needs a highest and lowest point. Tangent has neither.",
      answerLabel: "No — tangent has no maximum or minimum, so its amplitude is undefined.",
      solution: [{ s: "tan climbs without bound between its asymptotes, so there is no peak or trough — no amplitude." }],
    };
  },
};

export const questTg3 = {
  id: "tg3",
  skills: [
    { id: "periodCalc", concept: "trigPeriod", gen: SKILLS.periodCalc },
    { id: "amplitudeMC", concept: "trigAmplitude", gen: SKILLS.amplitudeMC },
    { id: "rangeMC", concept: "trigRange", gen: SKILLS.rangeMC },
    { id: "rangeShift", concept: "trigRange", gen: SKILLS.rangeShift },
    { id: "cyclesCalc", concept: "trigCycles", gen: SKILLS.cyclesCalc },
    { id: "readPeriod", concept: "trigPeriod", gen: SKILLS.readPeriod },
    { id: "readAmplitude", concept: "trigAmplitude", gen: SKILLS.readAmplitude },
    { id: "readRange", concept: "trigRange", gen: SKILLS.readRange },
    { id: "tanNoAmp", concept: "trigAmplitude", gen: SKILLS.tanNoAmp },
  ],
};
