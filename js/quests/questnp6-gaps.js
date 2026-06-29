/* ============================================================
   NUMBER PATTERNS · Q6 — Gaps between consecutive terms
   ------------------------------------------------------------
   The first differences of a QUADRATIC pattern form their own
   ARITHMETIC pattern: first term = T₂ − T₁, common difference =
   the constant second difference. So "the gap between two terms"
   becomes a term of that linear gap-pattern.
       gap between Tₖ and Tₖ₊₁ = the kth term of the gap-pattern
   ============================================================ */
import { mc } from "./_shared.js";
import { pyramid, calcQ, PAT } from "./_patterns.js";
import { randQuad, secondDiffs, firstDiffs, list, C, pick, randInt } from "../patternlib.js";

const ACC = PAT[5];
const gapAt = (g1, sd, k) => g1 + (k - 1) * sd;     // kth term of the linear gap-pattern

const SKILLS = {
  /* the gap far along the pattern (must use the linear gap-rule, not extend the pyramid) */
  gapAtK: () => {
    const { seq } = randQuad();
    const g1 = firstDiffs(seq)[0], sd = secondDiffs(seq)[0];
    const k = pick([10, 12, 15, 18, 20]);
    return calcQ("patConsecDiff",
      `For the quadratic pattern <b>${list(seq)} ; …</b>, find the gap between T${C(k)} and T${C(k + 1)}.`,
      gapAt(g1, sd, k),
      { graph: pyramid(seq, { showFirst: true, showSecond: true, accent: ACC }),
        hint: `The gaps form a linear pattern: first gap = ${C(g1)}, growing by ${C(sd)} each time. Gap between Tₖ and Tₖ₊₁ = ${C(g1)} + (k − 1)(${C(sd)}).`,
        answerLabel: `Gap = ${C(g1)} + (${C(k)} − 1)(${C(sd)}) = ${C(gapAt(g1, sd, k))}.` });
  },

  /* reverse: between which two terms is the gap equal to a given value? */
  whichGap: () => {
    const { seq } = randQuad();
    const g1 = firstDiffs(seq)[0], sd = secondDiffs(seq)[0];
    const n = pick([6, 7, 8, 9, 10, 11]);
    const value = gapAt(g1, sd, n);
    return calcQ("patConsecDiff",
      `For <b>${list(seq)} ; …</b>, the gap between two consecutive terms is ${C(value)}. Between Tₙ and Tₙ₊₁ — find n.`,
      n,
      { allowNeg: false,
        hint: `Set the gap-formula equal: ${C(g1)} + (n − 1)(${C(sd)}) = ${C(value)}, then solve for n.`,
        answerLabel: `n = ${C(n)} (the gap between T${C(n)} and T${C(n + 1)}).` });
  },

  /* what kind of pattern do the gaps form? */
  gapsAreLinear: () => {
    const { seq } = randQuad();
    return mc("patConsecDiff",
      "The first differences (gaps) of a quadratic pattern form what kind of pattern?",
      "an arithmetic (linear) pattern",
      ["another quadratic pattern", "a geometric pattern", "a constant pattern"],
      { graph: pyramid(seq, { showFirst: true, showSecond: true, accent: ACC }),
        hint: "Look at the first-difference row: it goes up (or down) by the same amount each time.",
        answerLabel: "Arithmetic — the gaps change by the constant second difference each time." });
  },

  /* the common difference of the gaps = the second difference */
  gapCommonDiff: () => {
    const { seq } = randQuad();
    const sd = secondDiffs(seq)[0];
    return calcQ("patConsecDiff",
      `By how much does each gap change in <b>${list(seq)}</b>? (the common difference of the gap-pattern)`,
      sd,
      { graph: pyramid(seq, { showFirst: true, showSecond: true, accent: ACC }),
        hint: "That is exactly the constant second difference.",
        answerLabel: `The gaps change by ${C(sd)} each time (the second difference).` });
  },

  /* the indexing rule */
  indexRule: () => {
    const k = randInt(3, 7);
    return mc("patConsecDiff",
      `The gap between T${C(k)} and T${C(k + 1)} is which term of the gap-pattern?`,
      `the ${C(k)}th term`,
      [`the ${C(k + 1)}th term`, `the ${C(k - 1)}th term`, "the 1st term"],
      { hint: "The gap between Tₖ and Tₖ₊₁ is the kth gap.",
        answerLabel: `The gap between T${C(k)} and T${C(k + 1)} is the ${C(k)}th term of the gap-pattern.` });
  },
};

export const questNp6 = {
  id: "np6",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "patConsecDiff", gen })),
};
