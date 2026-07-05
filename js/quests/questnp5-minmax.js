/* ============================================================
   NUMBER PATTERNS · Q5 — Minimum & maximum
   ------------------------------------------------------------
   A quadratic pattern lies on a parabola, so it has a turning
   point — the smallest or largest term. The sign of a decides
   which: a > 0 → minimum, a < 0 → maximum. The extreme term is
   at n = −b/(2a); its value is Tₙ at that n.
   ============================================================ */
import { mc } from "./_shared.js";
import { calcQ, termParabola, PAT, toSub, ord, P } from "./_patterns.js";
import { randQuadExtreme, quadStr, quadTn, extremeKind, C, pick, randInt } from "../patternlib.js";

const ACC = PAT[4];

/* for the graph READ-OFF skills: a small, countable parabola — |a| = 1, the
   turning term early, and the turning value a small integer, so the learner
   can count grid squares from the axes to answer. */
function readableExtreme() {
  const a = pick([1, -1]);
  const k = randInt(2, 4);                       // turning term number
  const b = -2 * a * k;
  const value = pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
  const c = value + a * k * k;                   // forces Tₖ = value
  return { a, b, c, k, value, len: k + 3 };
}

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
        answerLabel: `n = ${C(-b)} ÷ ${P(2 * a)} = ${C(k)} — the ${ord(k)} term.` });
  },

  /* the turning point is NOT a whole number → nearest whole term */
  nearestTerm: () => {
    const a = pick([2, -2]);                     // |a| = 2 + odd b → n turns at k ± 0,25 (never a tie)
    const k = randInt(2, 5);                     // the nearest whole term
    const nStar = k + pick([0.25, -0.25]);
    const b = -2 * a * nStar;                    // integer because a = ±2
    const c = randInt(-4, 8);
    const kind = extremeKind(a);
    return calcQ("patMinMax",
      `For Tₙ = <b>${quadStr(a, b, c)}</b>, which term n has the ${kind} value? (n must be a whole number.)`,
      k,
      { allowNeg: false,
        hint: "Work out n = −b ÷ (2a). It is NOT a whole number — a term number must be, so take the nearest whole n.",
        answerLabel: `n = ${C(-b)} ÷ ${P(2 * a)} = ${C(nStar)} — not a whole number, so the ${kind} term is the nearest: n = ${C(k)}.`,
        solution: [
          { s: `n = −b ÷ (2a) = ${C(-b)} ÷ ${P(2 * a)} = ${C(nStar)}` },
          { s: `A term number must be a natural number → nearest whole n = ${C(k)}`, r: `T${toSub(k)} = ${C(quadTn(a, b, c)(k))} is the ${kind} term` },
        ] });
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
    const { a, b, c, k, value, len } = readableExtreme();
    return calcQ("patMinMax",
      `The graph shows the terms of a pattern. At which term number n is the turning point?`,
      k,
      { allowNeg: false,
        graph: termParabola(a, b, c, k, value, len, ACC),
        graphCap: "Tₙ plotted against n · each grid block is 1",
        hint: "Follow the dashed line from the turning point down to the horizontal axis and count the blocks from 0.",
        answerLabel: `The turning point is at n = ${C(k)}.` });
  },

  /* read the extreme value off the graph */
  readValue: () => {
    const { a, b, c, k, value, len } = readableExtreme();
    return calcQ("patMinMax",
      `The graph shows the terms of a pattern. What is the value of the turning point?`,
      value,
      { graph: termParabola(a, b, c, k, value, len, ACC),
        graphCap: "Tₙ plotted against n · each grid block is 1",
        hint: "Count the grid blocks from the horizontal axis (each block is 1) up or down to the turning point.",
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
