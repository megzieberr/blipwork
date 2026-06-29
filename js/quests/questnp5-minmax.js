/* ============================================================
   NUMBER PATTERNS · Q5 — Minimum & maximum
   ------------------------------------------------------------
   A quadratic pattern lies on a parabola, so it has a turning
   point — the smallest or largest term. The sign of a decides
   which: a > 0 → minimum, a < 0 → maximum. The extreme term is
   at n = −b/(2a); its value is Tₙ at that n.
   ============================================================ */
import { mc } from "./_shared.js";
import { calcQ, termParabola, PAT, toSub } from "./_patterns.js";
import { randQuadExtreme, quadStr, extremeKind, C } from "../patternlib.js";

const ACC = PAT[4];

const SKILLS = {
  /* minimum or maximum? (from the sign of a) */
  minOrMax: () => {
    const { a, b, c, kind } = randQuadExtreme();
    return mc("patMinMax",
      `The pattern Tₙ = <b>${quadStr(a, b, c)}</b> has a turning point. Is it a minimum or a maximum?`,
      kind === "minimum" ? "a minimum" : "a maximum",
      [kind === "minimum" ? "a maximum" : "a minimum", "neither — it keeps rising", "both"],
      { hint: "a > 0 → ‘happy’ parabola → minimum.  a < 0 → ‘sad’ parabola → maximum.",
        answerLabel: `a = ${C(a)} ${a > 0 ? "> 0 → minimum" : "< 0 → maximum"}.` });
  },

  /* which term is the extreme (n = −b/2a) */
  whichTerm: () => {
    const { a, b, c, k } = randQuadExtreme();
    return calcQ("patMinMax",
      `For Tₙ = <b>${quadStr(a, b, c)}</b>, which term n is the turning point? Use n = −b ÷ (2a).`,
      k,
      { allowNeg: false,
        hint: `n = −b ÷ (2a) = −(${C(b)}) ÷ (2 × ${C(a)}).`,
        answerLabel: `n = ${C(-b)} ÷ ${C(2 * a)} = ${C(k)} — the ${C(k)}th term.` });
  },

  /* the extreme value (substitute n = k) */
  extremeValue: () => {
    const { a, b, c, k, value, kind } = randQuadExtreme();
    return calcQ("patMinMax",
      `The pattern Tₙ = <b>${quadStr(a, b, c)}</b> turns at n = ${C(k)}. What is its ${kind} value?`,
      value,
      { hint: `Substitute n = ${C(k)} into the formula.`,
        answerLabel: `T${toSub(k)} = ${C(value)} — the ${kind} value.` });
  },

  /* read the extreme term-number off the graph */
  readWhichTerm: () => {
    const { a, b, c, k, value, seq } = randQuadExtreme();
    return calcQ("patMinMax",
      `The graph shows the terms of a pattern. At which term number n is the turning point?`,
      k,
      { allowNeg: false,
        graph: termParabola(a, b, c, k, value, seq.length, ACC),
        graphCap: "Tₙ plotted against n",
        hint: "Read the n-value (along the bottom) directly under the turning point.",
        answerLabel: `The turning point is at n = ${C(k)}.` });
  },

  /* read the extreme value off the graph */
  readValue: () => {
    const { a, b, c, k, value, seq } = randQuadExtreme();
    return calcQ("patMinMax",
      `The graph shows the terms of a pattern. What is the value of the turning point?`,
      value,
      { graph: termParabola(a, b, c, k, value, seq.length, ACC),
        graphCap: "Tₙ plotted against n",
        hint: "Read the Tₙ-value (up the side) at the turning point.",
        answerLabel: `The turning point value is ${C(value)}.` });
  },

  /* the sign condition */
  signMC: () => {
    return mc("patMinMax",
      "A number pattern has a <b>minimum</b> term when…",
      "a > 0 (the coefficient of n² is positive)",
      ["a < 0 (the coefficient of n² is negative)", "b > 0", "c > 0"],
      { hint: "Same rule as a parabola: a positive ‘opens up’, so the turning point is the lowest point.",
        answerLabel: "When a > 0 (positive n² coefficient) the turning point is a minimum." });
  },
};

export const questNp5 = {
  id: "np5",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "patMinMax", gen })),
};
