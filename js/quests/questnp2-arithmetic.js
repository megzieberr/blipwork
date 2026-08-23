/* ============================================================
   NUMBER PATTERNS · Q2 — Arithmetic (linear) patterns
   ------------------------------------------------------------
   Constant first difference. General term Tₙ = an + c (a = the
   common difference, c = T₀). Find a term, and find which term has
   a given value.
   ============================================================ */
import { mc } from "./_shared.js";
import { pyramid, calcQ, PAT, P, ord } from "./_patterns.js";
import {
  randArith, arithSeq, arithTn, whichTermArith, linStr, list, C, pick, randInt,
} from "../patternlib.js";

const ACC = PAT[1];

const SKILLS = {
  /* common difference */
  commonDiff: () => {
    const { seq, d } = randArith();
    return calcQ("patArithmetic",
      `Find the common difference of <b>${list(seq)}</b>.`,
      d,
      { graph: pyramid(seq, { showFirst: true, blankFirst: true, accent: ACC }),
        hint: "d = any term minus the term before it.",
        answerLabel: `d = ${C(seq[1])} − ${P(seq[0])} = ${C(d)}.` });
  },

  /* next term */
  nextTerm: () => {
    const { seq, d } = randArith();
    return calcQ("patArithmetic",
      `What is the next term of <b>${list(seq)}</b>?`,
      seq[seq.length - 1] + d,
      { hint: `Add the common difference (${C(d)}) to the last term.`,
        answerLabel: `${C(seq[seq.length - 1])} + ${P(d)} = ${C(seq[seq.length - 1] + d)}.` });
  },

  /* choose the general term Tₙ = an + c */
  generalTerm: () => {
    const { a1, d, seq, a, c } = randArith();
    const correct = linStr(a, c);
    // distinct decoys: used T₁ instead of T₀ for c; wrong sign on a; off-by-one on c
    const wrongs = [linStr(a, a1), linStr(-a, c), linStr(a, c - d)]
      .filter((s) => s !== correct);
    return mc("patArithTerm",
      `Find the general term Tₙ of <b>${list(seq)}</b>.`,
      correct, wrongs,
      { layout: "grid2", graph: pyramid(seq, { showFirst: true, accent: ACC }),
        hint: "Tₙ = an + c: a is the constant difference (so start with that many n), and c = T₀ — step BACK one difference from T₁.",
        answerLabel: `a = ${C(d)} and c = T₀ = ${C(a1)} − ${P(d)} = ${C(c)}, so Tₙ = ${correct}.` });
  },

  /* a specific term from the formula */
  nthTerm: () => {
    const { a1, d, seq } = randArith();
    const n = pick([10, 12, 15, 20, 25]);
    return calcQ("patArithTerm",
      `For the pattern <b>${list(seq)}</b>, find T${C(n)}.`,
      arithTn(a1, d)(n),
      { graph: pyramid(seq, { showFirst: true, accent: ACC }),
        hint: `First build Tₙ = an + c: a = the difference (${C(d)}), c = T₀ = ${C(a1)} − ${P(d)} = ${C(a1 - d)}. Then put n = ${C(n)} in.`,
        answerLabel: `Tₙ = ${linStr(d, a1 - d)}, so T${C(n)} = ${linStr(d, a1 - d).replace("n", `(${C(n)})`)} = ${C(arithTn(a1, d)(n))}.` });
  },

  /* evaluate a given formula */
  fromFormula: () => {
    const a = pick([2, 3, 4, 5, -2, -3]);
    const c = randInt(-5, 6);
    const n = pick([6, 7, 8, 9, 11, 12]);
    return calcQ("patArithTerm",
      `A pattern has Tₙ = <b>${linStr(a, c)}</b>. Find T${C(n)}.`,
      a * n + c,
      { hint: `Substitute n = ${C(n)} into the formula.`,
        answerLabel: `T${C(n)} = ${linStr(a, c).replace("n", `(${C(n)})`)} = ${C(a * n + c)}.` });
  },

  /* which term has a given value? */
  whichTerm: () => {
    const { a1, d } = randArith();
    const n = pick([8, 9, 10, 11, 12, 14]);
    const value = arithTn(a1, d)(n);
    const seq = arithSeq(a1, d, 4);
    return calcQ("patArithTerm",
      `In <b>${list(seq)} ; …</b>, which term is equal to ${C(value)}? (Find n.)`,
      whichTermArith(a1, d, value),
      { allowNeg: false,
        hint: `Build Tₙ = an + c first (a = ${C(d)}, c = T₀ = ${C(a1 - d)}), then set it equal to ${C(value)} and solve for n.`,
        answerLabel: `${C(value)} = ${linStr(d, a1 - d)}  →  n = ${C(n)} (the ${ord(n)} term).` });
  },

  /* what does c mean in Tₙ = an + c? */
  meaningOfC: () => {
    return mc("patArithTerm",
      "In the form Tₙ = an + c, what does <b>c</b> equal?",
      "T₀ — the term that would sit before T₁",
      ["the first term T₁", "the common difference", "the last term"],
      { hint: "Put n = 0 into an + c. You get c — the ‘zero-th’ term, one step before T₁.",
        answerLabel: "c = T₀ (and a is the common difference)." });
  },
};

export const questNp2 = {
  id: "np2",
  skills: [
    { id: "commonDiff", concept: "patArithmetic", gen: SKILLS.commonDiff },
    { id: "nextTerm", concept: "patArithmetic", gen: SKILLS.nextTerm },
    { id: "generalTerm", concept: "patArithTerm", gen: SKILLS.generalTerm },
    { id: "nthTerm", concept: "patArithTerm", gen: SKILLS.nthTerm },
    { id: "fromFormula", concept: "patArithTerm", gen: SKILLS.fromFormula },
    { id: "whichTerm", concept: "patArithTerm", gen: SKILLS.whichTerm },
    { id: "meaningOfC", concept: "patArithTerm", gen: SKILLS.meaningOfC },
  ],
};
