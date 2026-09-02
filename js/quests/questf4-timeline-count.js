/* ============================================================
   FINANCE QUEST 4 · Timelines — counting moves   ★
   Reading a financial timeline: how MANY periods an amount must
   move, and in which DIRECTION (forward = ×, backward = ÷). Every
   question shows a to-scale timeline from the timeline engine.
   ============================================================ */
import { mc } from "./_shared.js";
import { randInt, pick } from "../ui.js";
import { rand } from "../finlib.js";

const COUNT = "timelineCount";
const MOVE = "timelineMove";

/* a quick timeline spec builder */
const tl = (n, nodes, arc) => ({ type: "timeline", n, nodes, ...(arc ? { arc } : {}) });
const money = () => pick([1000, 2000, 5000, 8000, 12000]);

const SKILLS = {
  countForward: () => {
    const n = randInt(4, 6);
    return {
      type: "calc", concept: COUNT, dp: 0,
      prompt: `The money sits at <b>T0</b> and is moved forward to <b>T${n}</b>. How many periods is that?`,
      graph: tl(n, [{ t: 0, role: "P" }, { t: n, role: "A" }], { from: 0, to: n }),
      expected: n,
      hint: "Count the gaps between the dots, not the dots themselves.",
      answerLabel: `${n} periods`,
      solution: [{ s: `From T0 to T${n} is ${n} equal jumps.` }],
    };
  },

  countBetween: () => {
    const a = randInt(1, 2), b = a + randInt(2, 3);
    return {
      type: "calc", concept: COUNT, dp: 0,
      prompt: `How many periods are there from <b>T${a}</b> to <b>T${b}</b>?`,
      graph: tl(b, [{ t: a, role: "P" }, { t: b, role: "A" }], { from: a, to: b }),
      expected: b - a,
      hint: `Count the jumps from T${a} up to T${b}.`,
      answerLabel: `${b} − ${a} = ${b - a} periods`,
      solution: [
        { s: `Count the JUMPS between the dots, not the dots themselves`, r: `T${a} up to T${b}` },
        { s: `${b} − ${a} = ${b - a} periods` },
      ],
    };
  },

  countBackward: () => {
    const a = randInt(0, 1), b = a + randInt(2, 4);
    return {
      type: "calc", concept: COUNT, dp: 0,
      prompt: `An amount at <b>T${b}</b> is moved <b>back</b> to <b>T${a}</b>. How many periods does it move?`,
      graph: tl(b, [{ t: b, role: "A" }, { t: a, role: "P" }], { from: b, to: a, dir: "back" }),
      expected: b - a,
      hint: "Direction does not change the count — still count the gaps.",
      answerLabel: `${b - a} periods (backward)`,
      solution: [
        { s: `Count the jumps between T${a} and T${b}: ${b} − ${a} = ${b - a}` },
        { s: `Going backward does not change the COUNT — it is still ${b - a} periods`, r: "direction changes the sign of the exponent, not the count" },
      ],
    };
  },

  directionForward: () => {
    const a = randInt(0, 1), b = a + randInt(2, 3);
    return mc(MOVE,
      `To move the money from <b>T${a}</b> to <b>T${b}</b>, do you…`,
      "multiply by (1 + i)",
      ["divide by (1 + i)", "subtract i each time", "leave it unchanged"],
      { graph: tl(b, [{ t: a, role: "P" }, { t: b, label: "?", role: "A" }]),
        hint: "Moving to a LATER date means the money grows — multiply.",
        answerLabel: "Later date → multiply by (1 + i)",
        solution: [
          { s: `T${b} is LATER than T${a}`, r: "the money has had more time to grow" },
          { s: `Forward → multiply by (1 + i)`, r: `${b - a} periods, so × (1 + i)^${b - a}` },
        ] });
  },

  directionBackward: () => {
    const a = randInt(0, 1), b = a + randInt(2, 3);
    return mc(MOVE,
      `To move the money from <b>T${b}</b> back to <b>T${a}</b>, do you…`,
      "divide by (1 + i)",
      ["multiply by (1 + i)", "add i each time", "leave it unchanged"],
      { graph: tl(b, [{ t: b, role: "A" }, { t: a, label: "?", role: "P" }]),
        hint: "Moving to an EARLIER date means undoing growth — divide.",
        answerLabel: "Earlier date → divide by (1 + i)",
        solution: [
          { s: `T${a} is EARLIER than T${b}`, r: "you are undoing growth, not adding it" },
          { s: `Backward → divide by (1 + i)`, r: `${b - a} periods, so × (1 + i)^(−${b - a})` },
        ] });
  },

  tapTarget: () => {
    const k = randInt(2, 4), P = money();
    return {
      type: "tap", concept: COUNT,
      prompt: `R${rand(P, 0).slice(1)} is invested at T0. Tap the point that is <b>${k} periods</b> after the start.`,
      graph: tl(5, [{ t: 0, amount: P, dp: 0 }], null),
      tap: { correctId: k, targets: [0, 1, 2, 3, 4, 5] },
      tapHint: "Count the jumps from T0.",
      hint: `${k} periods after T0 is T${k}.`,
      answerLabel: `T${k}`,
      solution: [
        { s: `Start at T0 and count ${k} jumps to the right`, r: "T0 is the start, not the first jump" },
        { s: `T0 → ${Array.from({ length: k }, (_, j) => `T${j + 1}`).join(" → ")}`, r: `${k} periods after T0 is T${k}` },
      ],
    };
  },

  directionWord: () => mc(MOVE,
    "Moving an amount to an <b>earlier</b> date means you are moving it…",
    "backward — divide by (1 + i)",
    ["forward — multiply by (1 + i)", "backward — multiply by (1 + i)", "forward — divide by (1 + i)"],
    { hint: "Earlier = backward = divide.", answerLabel: "Earlier → backward → divide" }),
};

export const questF4 = {
  id: "f4",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: id.startsWith("direction") ? MOVE : COUNT, gen })),
};
