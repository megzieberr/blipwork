/* ============================================================
   TRIG GRAPHS QUEST 2 · What a, b and q do
   The effect of each parameter in y = a·sin b(x − p) + q:
   the sign & size of a, the squash of b, the slide of q.
   ============================================================ */
import { mc } from "./_shared.js";
import { trigGraph, pick3 } from "./_tgraph.js";
import { eqStr, pick, randInt } from "../tgraphlib.js";

const ACC = "#818cf8";

const SKILLS = {
  /* sign of a → reflection */
  signOfA: () => {
    const fn = pick(["sin", "cos"]);
    const a = pick([-2, -3, -1]);
    const cv = { fn, a, b: 1, p: 0, q: 0 };
    return mc("trigParams", `${eqStr(cv)}<br>What does the <b>negative</b> in front do?`,
      "Reflects the graph in the x-axis (flips it upside-down)",
      ["Shifts the graph downwards", "Makes the period shorter", "Halves the amplitude"],
      { graph: trigGraph(cv, { accent: ACC }).spec, layout: "grid2",
        hint: "A negative a only flips the graph over the x-axis; it does not move it or change the period.",
        answerLabel: "A negative a reflects the graph in the x-axis." });
  },

  /* size of a → amplitude */
  sizeOfA: () => {
    const fn = pick(["sin", "cos"]);
    const a = pick([2, 3, 4]);
    const cv = { fn, a, b: 1, p: 0, q: 0 };
    return mc("trigParams", `Compared with y = ${fn} x, the graph ${eqStr(cv)} is…`,
      `${a} times as tall (amplitude ${a})`,
      [`${a} times as wide`, `shifted up ${a} units`, "reflected in the x-axis"],
      { graph: trigGraph(cv, { accent: ACC }).spec, layout: "grid2",
        hint: "a stretches the graph vertically — it sets the amplitude (the height to a peak).",
        answerLabel: `a = ${a} stretches the height: amplitude ${a}.` });
  },

  /* b → period / cycles */
  effectOfB: () => {
    const fn = pick(["sin", "cos"]);
    const b = pick([2, 3]);
    const cv = { fn, a: 1, b, p: 0, q: 0 };
    return mc("trigParams", `${eqStr(cv)}<br>What does the <b>${b}</b> do?`,
      `Squashes it sideways → ${b} cycles in 360° (shorter period)`,
      ["Stretches it wider (longer period)", `Shifts it ${b} units up`, `Makes it ${b} times as tall`],
      { graph: trigGraph(cv, { accent: ACC }).spec, layout: "grid2",
        hint: "b changes the period: period = 360° ÷ b. A bigger b means more cycles squeezed into 360°.",
        answerLabel: `b = ${b} → ${b} cycles in 360° (period ${360 / b}°).` });
  },

  /* q → vertical shift */
  effectOfQ: () => {
    const fn = pick(["sin", "cos"]);
    const q = pick([-3, -2, 2, 3]);
    const cv = { fn, a: 1, b: 1, p: 0, q };
    const dir = q > 0 ? "up" : "down";
    return mc("trigParams", `How is ${eqStr(cv)} different from y = ${fn} x?`,
      `Shifted ${Math.abs(q)} units ${dir}`,
      [`Shifted ${Math.abs(q)} units ${q > 0 ? "down" : "up"}`, `Shifted ${Math.abs(q)}° to the right`, "Reflected in the x-axis"],
      { graph: trigGraph(cv, { accent: ACC, midline: true }).spec, layout: "grid2",
        hint: "q slides the whole graph vertically. q > 0 up, q < 0 down. The midline becomes y = q.",
        answerLabel: `q = ${q} shifts the graph ${Math.abs(q)} units ${dir}.` });
  },

  /* read the midline */
  findMidline: () => {
    const fn = pick(["sin", "cos"]);
    const a = pick([1, 2]);
    const q = pick([-2, -1, 1, 2, 3]);
    const cv = { fn, a, b: 1, p: 0, q };
    const yl = (v) => `y = ${String(v).replace("-", "−")}`;
    return mc("trigParams", `${eqStr(cv)}<br>What is the equation of the <b>midline</b>?`,
      yl(q), pick3(yl(q), [yl(a), "y = 0", yl(q + a), yl(-q), yl(q - a)]),
      { graph: trigGraph(cv, { accent: ACC, midline: true }).spec,
        hint: "The midline runs through the middle of the wave at y = q (the dashed line).",
        answerLabel: `Midline: y = ${String(q).replace("-", "−")}.` });
  },

  /* reflection yes/no */
  reflectYesNo: () => {
    const fn = pick(["sin", "cos"]);
    const flipped = pick([true, false]);
    const cv = { fn, a: flipped ? -1 : 1, b: 1, p: 0, q: 0 };
    return {
      type: "yesno", concept: "trigParams",
      prompt: `Is ${eqStr(cv)} the graph of y = ${fn} x reflected in the x-axis?`,
      graph: trigGraph(cv, { accent: ACC }).spec,
      yes: flipped,
      hint: "A reflection in the x-axis flips the graph upside-down — that happens when a is negative.",
      answerLabel: flipped ? `Yes — a = −1 flips y = ${fn} x in the x-axis.` : `No — a = 1, so it is just y = ${fn} x (not flipped).`,
      solution: [{ s: flipped ? "a is negative, so the graph is reflected in the x-axis." : "a is positive, so the graph is the normal way up." }],
    };
  },
};

export const questTg2 = {
  id: "tg2",
  skills: [
    { id: "signOfA", concept: "trigParams", gen: SKILLS.signOfA },
    { id: "sizeOfA", concept: "trigParams", gen: SKILLS.sizeOfA },
    { id: "effectOfB", concept: "trigParams", gen: SKILLS.effectOfB },
    { id: "effectOfQ", concept: "trigParams", gen: SKILLS.effectOfQ },
    { id: "findMidline", concept: "trigParams", gen: SKILLS.findMidline },
    { id: "reflectYesNo", concept: "trigParams", gen: SKILLS.reflectYesNo },
  ],
};
