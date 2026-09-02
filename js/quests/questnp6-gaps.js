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
import { pyramid, calcQ, PAT, ord, P } from "./_patterns.js";
import { randQuad, secondDiffs, firstDiffs, linStr, list, C, pick, randInt } from "../patternlib.js";

const ACC = PAT[5];
const gapAt = (g1, sd, k) => g1 + (k - 1) * sd;     // kth term of the linear gap-pattern
/* The gap-pattern written HER way — Grade 11 uses Tₙ = an + c only (a = the
   constant difference, c = T₀ = T₁ − a), never a + (n−1)d. For the gaps that
   means a = the second difference and c = gap₀ = (first gap) − (second
   difference). Same number as gapAt above, reached the way she teaches it. */
const gapC0 = (g1, sd) => g1 - sd;
const gapForm = (g1, sd) => linStr(sd, gapC0(g1, sd));

const SKILLS = {
  /* the gap far along the pattern (must use the linear gap-rule, not extend the pyramid) */
  gapAtK: () => {
    const { seq } = randQuad();
    const g1 = firstDiffs(seq)[0], sd = secondDiffs(seq)[0];
    const k = pick([10, 12, 15, 18, 20]);
    return calcQ("patConsecDiff",
      `For the quadratic pattern <b>${list(seq)} ; …</b>, find the gap between T${C(k)} and T${C(k + 1)}, that is T${C(k + 1)} − T${C(k)}.`,
      gapAt(g1, sd, k),
      { graph: pyramid(seq, { showFirst: true, showSecond: true, accent: ACC }),
        hint: `The gaps form a linear pattern: first gap = ${C(g1)}, changing by ${C(sd)} each time. Gap between Tₖ and Tₖ₊₁ = ${C(g1)} + (k − 1)(${C(sd)}).`,
        answerLabel: `Gap = ${C(g1)} + (${C(k)} − 1)(${C(sd)}) = ${C(gapAt(g1, sd, k))}.`,
        solution: [
          { s: `The gaps are ${list(firstDiffs(seq))} — an arithmetic pattern`, r: `they change by ${C(sd)} each time` },
          { s: `a = ${C(sd)} and c = gap₀ = ${C(g1)} − ${P(sd)} = ${C(gapC0(g1, sd))}  →  gapₙ = ${gapForm(g1, sd)}`, r: "Tₙ = an + c" },
          { s: `Gap ${C(k)} = ${gapForm(g1, sd).replace("n", `(${C(k)})`)} = ${C(gapAt(g1, sd, k))}`, r: `the gap between T${C(k)} and T${C(k + 1)}` },
        ] });
  },

  /* reverse: between which two terms is the gap equal to a given value? */
  whichGap: () => {
    const { seq } = randQuad();
    const g1 = firstDiffs(seq)[0], sd = secondDiffs(seq)[0];
    const n = pick([6, 7, 8, 9, 10, 11]);
    const value = gapAt(g1, sd, n);
    return calcQ("patConsecDiff",
      `For <b>${list(seq)} ; …</b>, the gap Tₙ₊₁ − Tₙ between two consecutive terms is ${C(value)}. Find n.`,
      n,
      { allowNeg: false,
        hint: `Set the gap-formula equal: ${C(g1)} + (n − 1)(${C(sd)}) = ${C(value)}, then solve for n.`,
        answerLabel: `n = ${C(n)} (the gap between T${C(n)} and T${C(n + 1)}).`,
        solution: [
          { s: `The gaps are arithmetic: a = ${C(sd)}, c = gap₀ = ${C(g1)} − ${P(sd)} = ${C(gapC0(g1, sd))}`, r: "Tₙ = an + c" },
          { s: `gapₙ = ${gapForm(g1, sd)}, so set ${gapForm(g1, sd)} = ${C(value)}` },
          { s: `${C(sd)}n = ${C(value - gapC0(g1, sd))}  →  n = ${C(n)}`, r: `the gap between T${C(n)} and T${C(n + 1)}` },
        ] });
  },

  /* what kind of pattern do the gaps form? */
  gapsAreLinear: () => {
    const { seq } = randQuad();
    const fd = firstDiffs(seq), sd = secondDiffs(seq)[0];
    return mc("patConsecDiff",
      "The first differences (gaps) of a quadratic pattern form what kind of pattern?",
      "an arithmetic (linear) pattern",
      ["another quadratic pattern", "a geometric pattern", "a constant pattern"],
      { graph: pyramid(seq, { showFirst: true, accent: ACC }),
        hint: "Look at the gaps (first-difference row): do they change by the same amount each time?",
        answerLabel: "Arithmetic — the gaps change by the constant second difference each time.",
        solution: [
          { s: `The gaps of ${list(seq)} are ${list(fd)}`, r: "first differences" },
          { s: `Each gap changes by ${C(sd)}`, r: "a constant difference → arithmetic (linear)" },
        ] });
  },

  /* the common difference of the gaps = the second difference */
  gapCommonDiff: () => {
    const { seq } = randQuad();
    const fd = firstDiffs(seq), sd = secondDiffs(seq)[0];
    return calcQ("patConsecDiff",
      `By how much does each gap change in <b>${list(seq)}</b>? (the common difference of the gap-pattern)`,
      sd,
      { graph: pyramid(seq, { showFirst: true, showSecond: true, blankSecond: true, accent: ACC }),
        hint: "That is exactly the constant second difference.",
        answerLabel: `The gaps change by ${C(sd)} each time (the second difference).`,
        solution: [
          { s: `The gaps are ${list(fd)}`, r: "first differences" },
          { s: `${C(fd[1])} − ${P(fd[0])} = ${C(sd)}`, r: "that is the constant second difference" },
        ] });
  },

  /* the indexing rule */
  indexRule: () => {
    const k = randInt(3, 7);
    return mc("patConsecDiff",
      `The gap between T${C(k)} and T${C(k + 1)} is which term of the gap-pattern?`,
      `the ${ord(k)} term`,
      [`the ${ord(k + 1)} term`, `the ${ord(k - 1)} term`, "the 1st term"],
      { hint: "The gap between Tₖ and Tₖ₊₁ is the kth gap.",
        answerLabel: `The gap between T${C(k)} and T${C(k + 1)} is the ${ord(k)} term of the gap-pattern.`,
        solution: [
          { s: `Gap 1 sits between T₁ and T₂, gap 2 between T₂ and T₃, and so on`, r: "a gap takes the number of the term on its LEFT" },
          { s: `So the gap between T${C(k)} and T${C(k + 1)} is gap ${C(k)} — the ${ord(k)} term` },
        ] });
  },
};

export const questNp6 = {
  id: "np6",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "patConsecDiff", gen })),
};
