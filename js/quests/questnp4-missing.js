/* ============================================================
   NUMBER PATTERNS · Q4 — Find a missing term
   ------------------------------------------------------------
   In a quadratic pattern the SECOND difference is constant. That
   single fact lets you fill in an unknown term: write the first
   differences, set the two second differences equal, and solve.
   ============================================================ */
import { mc } from "./_shared.js";
import { pyramid, calcQ, yesnoQ, PAT } from "./_patterns.js";
import { randQuad, secondDiffs, quadSeq, list, C, pick, randInt } from "../patternlib.js";

const ACC = PAT[3];

/* a quadratic sequence with ONE interior term hidden (shown as x) */
function withHidden(len) {
  const { a, b, c } = randQuad({ len });
  const seq = quadSeq(a, b, c, len);
  const hide = randInt(1, len - 2);             // interior index (keep both ends visible)
  const terms = seq.map((v, i) => (i === hide ? null : v));
  const labels = seq.map((v, i) => (i === hide ? "x" : null));
  return { seq, terms, labels, hide, answer: seq[hide] };
}

const SKILLS = {
  /* find the missing term — 4 terms */
  missing4: () => {
    const { seq, terms, labels, hide, answer } = withHidden(4);
    return calcQ("patQuadUnknown",
      `This is a <b>quadratic</b> pattern. Find the missing term <b>x</b>.`,
      answer,
      { graph: pyramid(terms, { termLabels: labels, accent: ACC }),
        graphCap: "second difference is constant",
        hint: "Write the first differences (some contain x), then set the two second differences EQUAL and solve for x.",
        answerLabel: `Keeping the second difference constant gives x = ${C(answer)} (full pattern: ${list(seq)}).` });
  },

  /* find the missing term — 5 terms */
  missing5: () => {
    const { seq, terms, labels, hide, answer } = withHidden(5);
    return calcQ("patQuadUnknown",
      `This is a <b>quadratic</b> pattern. Find the missing term <b>x</b>.`,
      answer,
      { graph: pyramid(terms, { termLabels: labels, accent: ACC }),
        graphCap: "second difference is constant",
        hint: "Form the first differences around x, then make the two second differences equal.",
        answerLabel: `x = ${C(answer)}  (full pattern: ${list(seq)}).` });
  },

  /* forward use: given T₁, T₂ and the constant second difference, find T₃ */
  forwardFromSecond: () => {
    const a = pick([1, 2, -1, 2, 3]);
    const sd = 2 * a;
    const b = randInt(-4, 4), c = randInt(-3, 6);
    const seq = quadSeq(a, b, c, 4);
    const t1 = seq[0], t2 = seq[1];
    return calcQ("patQuadUnknown",
      `A quadratic pattern starts T₁ = ${C(t1)}, T₂ = ${C(t2)}, and its constant second difference is ${C(sd)}. Find T₃.`,
      seq[2],
      { hint: `Next first difference = (T₂ − T₁) + second difference = ${C(t2 - t1)} + ${C(sd)}. Add that to T₂.`,
        answerLabel: `T₃ = ${C(t2)} + (${C(t2 - t1)} + ${C(sd)}) = ${C(seq[2])}.` });
  },

  /* which difference do you keep constant? */
  methodMC: () => {
    return mc("patQuadUnknown",
      "To find a missing term in a quadratic pattern, which value do you keep constant?",
      "the second difference",
      ["the first difference", "the ratio between terms", "the term values"],
      { hint: "Quadratic ⇒ the SECOND difference is the same throughout.",
        answerLabel: "Keep the second difference constant." });
  },

  /* is the second difference always constant? */
  constYesno: () => {
    return yesnoQ("patQuadUnknown",
      "In a quadratic number pattern, are the second differences always equal to each other?",
      true,
      { hint: "That constant second difference is exactly what makes a pattern quadratic.",
        answerLabel: "Yes — a constant second difference is the defining feature." });
  },
};

export const questNp4 = {
  id: "np4",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: "patQuadUnknown", gen })),
};
