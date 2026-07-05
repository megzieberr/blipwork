/* ============================================================
   EXPONENTS & SURDS · Q6 — Conjugates & rationalising
   ------------------------------------------------------------
   What the conjugate is, why it works (difference of squares),
   how to rationalise one- and two-term denominators, and the
   a + b√c form.
   ============================================================ */
import { mc, ynQ, pick } from "./_exp.js";

const CONJ = "conjugates";
const RAT = "rationalise";

const SKILLS = {
  /* what is the conjugate */
  findConjugate: () => {
    const items = [
      { q: "What is the <b>conjugate</b> of √3 + 1?", correct: "√3 − 1", wrongs: ["√3 + 1", "−√3 − 1", "2"], ans: "Flip the middle sign: the conjugate of √3 + 1 is √3 − 1. (The 2 is the conjugate PRODUCT (√3+1)(√3−1), not the conjugate itself.)" },
      { q: "What is the <b>conjugate</b> of √5 − √2?", correct: "√5 + √2", wrongs: ["√2 − √5", "√5 − √2", "3"], ans: "Flip the middle sign: √5 − √2 → √5 + √2. (3 is the conjugate PRODUCT (√5)² − (√2)², not the conjugate.)" },
      { q: "What is the <b>conjugate</b> of 2 + √7?", correct: "2 − √7", wrongs: ["−2 − √7", "2 + √7", "−3"], ans: "Same two terms, opposite middle sign: 2 − √7. (−3 is the conjugate PRODUCT 2² − (√7)², not the conjugate.)" },
    ];
    const it = pick(items);
    return mc(CONJ, it.q, it.correct, it.wrongs, { hint: "Keep both terms exactly the same; just change the + to − (or − to +).", answerLabel: it.ans });
  },

  /* why use the conjugate */
  whyConjugate: () => mc(CONJ,
    "Why do we multiply by the conjugate when rationalising a two-term denominator?",
    "The denominator becomes a difference of squares, so the surd disappears",
    ["It makes the numerator a perfect square", "It cancels the whole fraction", "It changes the value to a whole number"],
    { hint: "(√a + b)(√a − b) = (√a)² − b² — what happens to the root?",
      answerLabel: "(√a + b)(√a − b) = a − b², a difference of squares with NO surd left on the bottom." }),

  /* conjugate product */
  conjugateProduct: () => {
    const items = [
      { q: "Simplify <b>(√2 + 1)(√2 − 1)</b>.", correct: "1", wrongs: ["√2", "3", "2√2"], ans: "Difference of squares: (√2)² − 1² = 2 − 1 = 1." },
      { q: "Simplify <b>(√5 + √2)(√5 − √2)</b>.", correct: "3", wrongs: ["√7", "7", "√3"], ans: "(√5)² − (√2)² = 5 − 2 = 3." },
      { q: "Simplify <b>(√x + 3)(√x − 3)</b>.", correct: "x − 9", wrongs: ["x + 9", "√x − 9", "x − 3"], ans: "(√x)² − 3² = x − 9." },
    ];
    const it = pick(items);
    return mc(CONJ, it.q, it.correct, it.wrongs, { hint: "(first)² − (second)² — the cross terms cancel.", answerLabel: it.ans });
  },

  /* rationalise single term */
  rationaliseSingle: () => {
    const items = [
      { q: "To rationalise <b>1/√3</b>, multiply top and bottom by:", correct: "√3 / √3", wrongs: ["√3 / 1", "3 / 3", "1 / √3"], ans: "Multiply by √3/√3 (= 1): 1/√3 × √3/√3 = √3/3." },
      { q: "To rationalise <b>2/√5</b>, multiply top and bottom by:", correct: "√5 / √5", wrongs: ["5 / 5", "2 / √5", "√5 / 2"], ans: "Multiply by √5/√5: 2/√5 × √5/√5 = 2√5/5." },
    ];
    const it = pick(items);
    return mc(RAT, it.q, it.correct, it.wrongs, { hint: "Multiply by the surd over itself — that’s multiplying by 1.", answerLabel: it.ans });
  },

  /* rationalise two terms */
  rationaliseTwo: () => {
    const items = [
      { q: "To rationalise <b>2/(1 + √3)</b>, multiply top and bottom by:", correct: "(1 − √3)/(1 − √3)", wrongs: ["(1 + √3)/(1 + √3)", "√3/√3", "(1 − √3)/(1 + √3)"], ans: "Multiply by the conjugate over itself: (1 − √3)/(1 − √3). It must be the SAME thing top and bottom (×1), or the value changes." },
      { q: "To rationalise <b>5/(√2 − 3)</b>, multiply top and bottom by:", correct: "(√2 + 3)/(√2 + 3)", wrongs: ["(√2 − 3)/(√2 − 3)", "√2/√2", "(3 − √2)/(3 − √2)"], ans: "Use the conjugate of √2 − 3, which is √2 + 3." },
    ];
    const it = pick(items);
    return mc(RAT, it.q, it.correct, it.wrongs, { hint: "Two terms on the bottom → use the conjugate (flip the middle sign) over itself.", answerLabel: it.ans });
  },

  /* multiplying by denom/denom = ×1 */
  equalsOne: () => ynQ(RAT,
    "Multiplying the numerator and denominator by the <b>same</b> surd changes the <b>value</b> of the fraction. True or false?",
    false,
    { hint: "Anything over itself is 1.", answerLabel: "False — it’s the same as multiplying by 1, so the value is unchanged; only the form changes." }),

  /* a + b√c form */
  abForm: () => {
    const items = [
      { q: "A rationalised answer is <b>3 − √3</b>. Written as a + b√c, what are a and b?", correct: "a = 3, b = −1", wrongs: ["a = 3, b = 1", "a = −3, b = 1", "a = 3, b = −3"], ans: "3 − √3 = 3 + (−1)√3, so a = 3 and b = −1." },
      { q: "A rationalised answer is <b>√5 − 1</b>. Written as a + b√c, what are a and b?", correct: "a = −1, b = 1", wrongs: ["a = 1, b = −1", "a = −1, b = −1", "a = 1, b = 1"], ans: "√5 − 1 = −1 + 1·√5, so a = −1 and b = 1." },
    ];
    const it = pick(items);
    return mc(RAT, it.q, it.correct, it.wrongs, { hint: "a is the plain (rational) part; b is the number in front of the surd — keep its sign.", answerLabel: it.ans });
  },
};

export const questEs6 = {
  id: "es6",
  skills: [
    { id: "findConjugate", concept: CONJ, gen: SKILLS.findConjugate },
    { id: "whyConjugate", concept: CONJ, gen: SKILLS.whyConjugate },
    { id: "conjugateProduct", concept: CONJ, gen: SKILLS.conjugateProduct },
    { id: "rationaliseSingle", concept: RAT, gen: SKILLS.rationaliseSingle },
    { id: "rationaliseTwo", concept: RAT, gen: SKILLS.rationaliseTwo },
    { id: "equalsOne", concept: RAT, gen: SKILLS.equalsOne },
    { id: "abForm", concept: RAT, gen: SKILLS.abForm },
  ],
};
