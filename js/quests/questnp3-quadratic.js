/* ============================================================
   NUMBER PATTERNS · Q3 — Quadratic patterns
   ------------------------------------------------------------
   Constant SECOND difference. Build the pyramid, then work from the
   bottom up with the three relationships:
       2a = second difference
       3a + b = T₂ − T₁
       a + b + c = T₁
   to get Tₙ = an² + bn + c.
   ============================================================ */
import { mc } from "./_shared.js";
import { pyramid, calcQ, PAT } from "./_patterns.js";
import {
  randQuad, quadStr, secondDiffs, quadTn, list, C, pick, randInt,
} from "../patternlib.js";

const ACC = PAT[2];
const full = (seq) => pyramid(seq, { showFirst: true, showSecond: true, accent: ACC });

const SKILLS = {
  /* read the constant second difference */
  secondDiff: () => {
    const { seq } = randQuad();
    const sd = secondDiffs(seq)[0];
    return calcQ("patQuadratic",
      `What is the constant second difference of <b>${list(seq)}</b>?`,
      sd,
      { graph: pyramid(seq, { showFirst: true, showSecond: true, blankSecond: true, accent: ACC }),
        hint: "Take the differences of the first differences (bottom row of the pyramid).",
        answerLabel: `The second difference is ${C(sd)}.` });
  },

  /* a = (second difference) ÷ 2 */
  findA: () => {
    const { a, seq } = randQuad();
    return calcQ("patQuadratic",
      `For <b>${list(seq)}</b>, use 2a = second difference to find <b>a</b>.`,
      a,
      { graph: full(seq),
        hint: "Read the second difference off the pyramid, then halve it.",
        answerLabel: `2a = ${C(2 * a)}, so a = ${C(a)}.` });
  },

  /* b from 3a + b = T₂ − T₁ */
  findB: () => {
    const { a, b, seq } = randQuad();
    return calcQ("patQuadratic",
      `For <b>${list(seq)}</b>, with a = ${C(a)}, use 3a + b = T₂ − T₁ to find <b>b</b>.`,
      b,
      { graph: full(seq),
        hint: `3a + b = T₂ − T₁. So b = (T₂ − T₁) − 3a = ${C(seq[1] - seq[0])} − 3(${C(a)}).`,
        answerLabel: `b = ${C(seq[1] - seq[0])} − ${C(3 * a)} = ${C(b)}.` });
  },

  /* c from a + b + c = T₁ */
  findC: () => {
    const { a, b, c, seq } = randQuad();
    return calcQ("patQuadratic",
      `For <b>${list(seq)}</b>, with a = ${C(a)} and b = ${C(b)}, use a + b + c = T₁ to find <b>c</b>.`,
      c,
      { graph: full(seq),
        hint: `a + b + c = T₁. So c = T₁ − a − b = ${C(seq[0])} − (${C(a)}) − (${C(b)}).`,
        answerLabel: `c = ${C(seq[0])} − ${C(a)} − ${C(b)} = ${C(c)}.` });
  },

  /* choose the general term */
  generalTerm: () => {
    const { a, b, c, seq } = randQuad();
    const correct = quadStr(a, b, c);
    const wrongs = [quadStr(a, -b, c), quadStr(2 * a, b, c), quadStr(a, b + a, c)]
      .filter((s) => s !== correct);
    return mc("patQuadratic",
      `Find the general term Tₙ of <b>${list(seq)}</b>.`,
      correct, wrongs,
      { layout: "grid2", graph: full(seq),
        hint: "Find a, then b, then c with the three relationships, and write an² + bn + c.",
        answerLabel: `Tₙ = ${correct}.` });
  },

  /* substitute into a given formula */
  fromFormula: () => {
    const a = pick([1, 2, -1, -2, 3]);
    const b = randInt(-5, 5), c = randInt(-4, 6);
    const n = pick([5, 6, 7, 8, 10]);
    return calcQ("patQuadratic",
      `A pattern has Tₙ = <b>${quadStr(a, b, c)}</b>. Find T${C(n)}.`,
      quadTn(a, b, c)(n),
      { hint: `Substitute n = ${C(n)} (square it first): a(${C(n)})² + b(${C(n)}) + c.`,
        answerLabel: `T${C(n)} = ${C(quadTn(a, b, c)(n))}.` });
  },
};

export const questNp3 = {
  id: "np3",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "patQuadratic", gen })),
};
