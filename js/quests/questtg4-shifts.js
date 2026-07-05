/* ============================================================
   TRIG GRAPHS QUEST 4 · Horizontal & vertical shifts
   The p and q parameters: which way and how far, the "opposite
   direction" rule, factoring b out first, and the fact that a
   shift never changes the period.
   ============================================================ */
import { mc } from "./_shared.js";
import { trigGraph, twoTrigGraph, pick3 } from "./_tgraph.js";
import { eqStr, rangeStr, intervalStr, amplitudeOf, nstr, pick } from "../tgraphlib.js";

const ACC = "#5b54e0";

const SKILLS = {
  /* horizontal shift: which way & how far */
  hShiftDir: () => {
    const fn = pick(["sin", "cos"]);
    const mag = pick([30, 40, 45, 60]);
    const p = pick([mag, -mag]);
    const cv = { fn, a: 1, b: 1, p, q: 0 };
    const dir = p > 0 ? "right" : "left";
    return mc("trigShifts", `${eqStr(cv)}<br>Describe the shift from y = ${fn} x.`,
      `${mag}° to the ${dir}`,
      [`${mag}° to the ${p > 0 ? "left" : "right"}`, `${mag} units up`, `${mag} units down`],
      { graph: trigGraph(cv, { accent: ACC }).spec,
        hint: "The bracket is (x − p). The graph moves the OPPOSITE way to the sign: (x − 30°) → right, (x + 30°) → left.",
        answerLabel: `${eqStr(cv)} shifts y = ${fn} x ${mag}° to the ${dir}.` });
  },

  /* which equation shifts left */
  whichShiftsLeft: () => {
    const fn = pick(["sin", "cos"]);
    const mag = pick([30, 45, 60]);
    const left = { fn, a: 1, b: 1, p: -mag, q: 0 };    // (x + mag) → left
    const right = { fn, a: 1, b: 1, p: mag, q: 0 };
    return mc("trigShifts", `Which equation shifts y = ${fn} x <b>${mag}° to the left</b>?`,
      eqStr(left), [eqStr(right), `y = ${fn} x + ${mag}`, `y = ${fn} x − ${mag}`],
      { hint: "Left means the bracket reads (x + …). A vertical (+ outside the function) does not move it sideways.",
        answerLabel: `${eqStr(left)} shifts ${mag}° left.` });
  },

  /* the 90° twin-shift between sine and cosine */
  sinCosTwin: () => {
    const toCos = pick([true, false]);
    const from = toCos ? "sin" : "cos", to = toCos ? "cos" : "sin";
    const dir = toCos ? "left" : "right";
    const f = { fn: "sin", a: 1, b: 1, p: 0, q: 0 }, g = { fn: "cos", a: 1, b: 1, p: 0, q: 0 };
    const graph = twoTrigGraph(f, g, {
      accent: ACC, win: { xmin: 0, xmax: 360, ymin: -1.6, ymax: 1.6 },
      labelA: "f", labelAtA: 90, labelB: "g", labelAtB: 360,
    }).spec;
    return mc("trigParents",
      `f = sin x and g = cos x are drawn. How must y = ${from} x be shifted to give y = ${to} x?`,
      `90° to the ${dir}`,
      [`90° to the ${toCos ? "right" : "left"}`, `180° to the ${dir}`, "1 unit up"],
      { graph,
        hint: "Cosine peaks at 0°, sine only at 90° — cosine is 90° 'ahead'. Slide the peaks onto each other.",
        answerLabel: toCos ? "cos x = sin(x + 90°): shift sin x 90° left." : "sin x = cos(x − 90°): shift cos x 90° right.",
        solution: [
          { s: toCos ? "sin x peaks at 90°; cos x peaks at 0°" : "cos x peaks at 0°; sin x peaks at 90°" },
          { s: toCos ? "every feature must move 90° left: cos x = sin(x + 90°)" : "every feature must move 90° right: sin x = cos(x − 90°)" },
        ] });
  },

  /* factor b out first */
  factorB: () => {
    const fn = pick(["sin", "cos"]);
    const b = pick([2, 3]);
    const shift = pick([20, 30, 40]);
    const inner = b * shift;
    return mc("trigShifts",
      `Rewrite y = ${fn}(${b}x − ${inner}°) as y = ${fn} b(x − p). What is the <b>real</b> horizontal shift?`,
      `${shift}° to the right`,
      [`${inner}° to the right`, `${shift}° to the left`, `${inner}° to the left`],
      { graph: trigGraph({ fn, a: 1, b, p: shift, q: 0 }, { accent: ACC }).spec,
        hint: `Factor b out: ${fn}(${b}x − ${inner}°) = ${fn} ${b}(x − ${shift}°). The shift is ${shift}°, not ${inner}°.`,
        answerLabel: `${fn} ${b}(x − ${shift}°): shift ${shift}° right.` });
  },

  /* vertical shift direction */
  vShiftDir: () => {
    const fn = pick(["sin", "cos", "tan"]);
    const q = pick([2, 3, -2, -3]);
    const cv = { fn, a: 1, b: 1, p: 0, q };
    const dir = q > 0 ? "up" : "down";
    return mc("trigShifts", `${eqStr(cv)}<br>How is it shifted from y = ${fn} x?`,
      `${Math.abs(q)} units ${dir}`,
      [`${Math.abs(q)} units ${q > 0 ? "down" : "up"}`, `${Math.abs(q)}° to the right`, `${Math.abs(q)}° to the left`],
      { graph: trigGraph(cv, { accent: ACC, midline: true }).spec,
        hint: "q is added outside the function, so it slides the graph vertically (+ up, − down).",
        answerLabel: `q = ${nstr(q)} shifts it ${Math.abs(q)} units ${dir}.` });
  },

  /* a shift changes the range */
  shiftRange: () => {
    const fn = pick(["sin", "cos"]);
    const a = pick([2, 3]);
    const q = pick([1, 2, -1, -2]);
    const cv = { fn, a, b: 1, p: 0, q };
    const A = amplitudeOf(cv);
    return mc("trigRange",
      `Start with y = ${a}${fn} x, then shift it ${Math.abs(q)} ${q > 0 ? "up" : "down"}. What is the new <b>range</b>?`,
      rangeStr(cv), pick3(rangeStr(cv), [intervalStr(-A, A), intervalStr(q - 2 * A, q + 2 * A), intervalStr(q - 1, q + 1), "y ∈ ℝ"]),
      { graph: trigGraph(cv, { accent: ACC, midline: true }).spec,
        hint: `Amplitude stays ${A}; the midline moves to y = ${nstr(q)}. Range = [${nstr(q - A)} ; ${nstr(q + A)}].`,
        answerLabel: `New range: ${rangeStr(cv)}.` });
  },

  /* a shift does not change the period (yes/no) */
  shiftPeriodYesNo: () => {
    return {
      type: "yesno", concept: "trigShifts",
      prompt: "Does shifting a graph left, right, up or down change its <b>period</b>?",
      yes: false,
      hint: "Only b changes the period. Shifting just slides the same wave to a new place.",
      answerLabel: "No — shifts move the graph but the period (set by b) stays the same.",
      solution: [{ s: "Period = 360° ÷ b. Shifts change p and q, not b, so the period is unchanged." }],
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
