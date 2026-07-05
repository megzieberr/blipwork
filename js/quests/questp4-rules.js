/* ============================================================
   PROBABILITY QUEST 4 · The probability rules
   Addition rule, complement rule, mutually exclusive vs inclusive,
   exhaustive. Probabilities are built from counts over a total so
   every decimal answer is exact.
   ============================================================ */
import { mc } from "./_shared.js";
import { pick, randInt } from "../ui.js";
import { dec } from "../problib.js";

const RULE = "addRule";
const MUT = "mutual";

/* a two-event probability scenario from counts over a total T (exact decimals).
   excl=true forces no overlap (mutually exclusive). */
function probs(excl = false) {
  for (let t = 0; t < 80; t++) {
    const T = pick([10, 20]);
    const i = excl ? 0 : randInt(1, 4);
    const onlyA = randInt(1, 5), onlyB = randInt(1, 5);
    if (onlyA + i + onlyB <= T - 1) {
      const a = onlyA + i, b = onlyB + i;
      return { T, i, onlyA, onlyB, a, b,
        pA: a / T, pB: b / T, pAB: i / T, pUnion: (onlyA + i + onlyB) / T };
    }
  }
  return { T: 20, i: 2, onlyA: 4, onlyB: 5, a: 6, b: 7, pA: 6 / 20, pB: 7 / 20, pAB: 2 / 20, pUnion: 11 / 20 };
}

const SKILLS = {
  addUnion: () => {
    const s = probs();
    return {
      type: "calc", concept: RULE, dp: 2,
      prompt: `Given P(A) = <b>${dec(s.pA)}</b>, P(B) = <b>${dec(s.pB)}</b> and P(A ∩ B) = <b>${dec(s.pAB)}</b>, find <b>P(A ∪ B)</b>.`,
      expected: s.pUnion,
      hint: "P(A ∪ B) = P(A) + P(B) − P(A ∩ B). Subtract the overlap once.",
      answerLabel: `${dec(s.pA)} + ${dec(s.pB)} − ${dec(s.pAB)} = ${dec(s.pUnion, 2)}`,
      solution: [{ s: `P(A ∪ B) = P(A) + P(B) − P(A ∩ B)` }, { s: `= ${dec(s.pA)} + ${dec(s.pB)} − ${dec(s.pAB)} = ${dec(s.pUnion, 2)}` }],
    };
  },

  addFindInter: () => {
    const s = probs();
    return {
      type: "calc", concept: RULE, dp: 2,
      prompt: `Given P(A) = <b>${dec(s.pA)}</b>, P(B) = <b>${dec(s.pB)}</b> and P(A ∪ B) = <b>${dec(s.pUnion)}</b>, find <b>P(A ∩ B)</b>.`,
      expected: s.pAB,
      hint: "Rearrange the addition rule: P(A ∩ B) = P(A) + P(B) − P(A ∪ B).",
      answerLabel: `${dec(s.pA)} + ${dec(s.pB)} − ${dec(s.pUnion)} = ${dec(s.pAB, 2)}`,
      solution: [{ s: `P(A ∩ B) = P(A) + P(B) − P(A ∪ B)` }, { s: `= ${dec(s.pA)} + ${dec(s.pB)} − ${dec(s.pUnion)} = ${dec(s.pAB, 2)}` }],
    };
  },

  complement: () => {
    const s = probs();
    return {
      type: "calc", concept: MUT, dp: 2,
      prompt: `Event B is the complement of A. If P(A) = <b>${dec(s.pA)}</b>, find <b>P(B)</b>.`,
      expected: 1 - s.pA,
      hint: "Complements add to 1: P(B) = 1 − P(A).",
      answerLabel: `1 − ${dec(s.pA)} = ${dec(1 - s.pA, 2)}`,
      solution: [{ s: `P(A) + P(A′) = 1 → P(B) = 1 − ${dec(s.pA)} = ${dec(1 - s.pA, 2)}` }],
    };
  },

  mutExUnion: () => {
    const s = probs(true);                 // no overlap
    return {
      type: "calc", concept: MUT, dp: 2,
      prompt: `A and B are <b>mutually exclusive</b>. If P(A) = <b>${dec(s.pA)}</b> and P(B) = <b>${dec(s.pB)}</b>, find <b>P(A ∪ B)</b>.`,
      expected: s.pUnion,
      hint: "Mutually exclusive → P(A ∩ B) = 0, so P(A ∪ B) = P(A) + P(B).",
      answerLabel: `${dec(s.pA)} + ${dec(s.pB)} = ${dec(s.pUnion, 2)}`,
      solution: [{ s: `No overlap → P(A ∪ B) = P(A) + P(B) = ${dec(s.pA)} + ${dec(s.pB)} = ${dec(s.pUnion, 2)}` }],
    };
  },

  classifyByOverlap: () => {
    const excl = pick([true, false]);
    const s = probs(excl);
    return mc(MUT,
      `Two events have P(A ∩ B) = <b>${dec(s.pAB)}</b>. Are they mutually exclusive or mutually inclusive?`,
      excl ? "mutually exclusive" : "mutually inclusive",
      excl ? ["mutually inclusive", "independent", "complementary"] : ["mutually exclusive", "complementary", "exhaustive"],
      { hint: "Overlap of 0 → exclusive (can't happen together). Overlap ≠ 0 → inclusive.",
        answerLabel: excl ? "P(A ∩ B) = 0 → mutually exclusive." : "P(A ∩ B) ≠ 0 → mutually inclusive." });
  },

  exclusiveFromVenn: () => {
    const excl = pick([true, false]);
    const onlyA = randInt(2, 6), onlyB = randInt(2, 6), inter = excl ? 0 : randInt(1, 4), outside = randInt(1, 3);
    const graph = { type: "venn", mode: "two", A: "A", B: "B", s: `n(S) = ${onlyA + inter + onlyB + outside}`,
      regions: { onlyA: String(onlyA), inter: String(inter), onlyB: String(onlyB), outside: String(outside) } };
    return {
      type: "yesno", concept: MUT,
      prompt: `The Venn diagram shows the counts in each region. Are A and B <b>mutually exclusive</b>?`,
      graph,
      yes: excl,
      hint: "Mutually exclusive means the overlap (A ∩ B) is empty — a 0 in the middle.",
      answerLabel: excl ? "The overlap is 0, so yes — mutually exclusive." : "The overlap is not 0, so no — they can happen together.",
      solution: [{ s: excl ? `n(A ∩ B) = 0 → A and B cannot happen together → mutually exclusive.` : `n(A ∩ B) = ${inter} ≠ 0 → A and B can happen together → NOT mutually exclusive.` }],
    };
  },

  exhaustiveDef: () => mc(MUT,
    "Two events are <b>exhaustive</b> when…",
    "together they cover the whole sample space (nothing is left outside)",
    ["they can never happen together", "P(A) × P(B) = P(A ∩ B)", "they have exactly the same outcomes"],
    { hint: "“Exhaustive” = nothing left over outside the events.",
      answerLabel: "Exhaustive events leave no outcome outside — together they fill S." }),

  whichFormula: () => mc(RULE,
    "Which is the correct <b>addition rule</b> for any two events?",
    "P(A ∪ B) = P(A) + P(B) − P(A ∩ B)",
    ["P(A ∪ B) = P(A) + P(B) + P(A ∩ B)", "P(A ∪ B) = P(A) × P(B)", "P(A ∪ B) = P(A) + P(B)"],
    { hint: "You must remove the overlap once so it isn't counted twice.",
      answerLabel: "P(A ∪ B) = P(A) + P(B) − P(A ∩ B). The last option only works when there's no overlap." }),
};

export const questP4 = {
  id: "p4",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: (id === "addUnion" || id === "addFindInter" || id === "whichFormula") ? RULE : MUT, gen })),
};
