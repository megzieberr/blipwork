/* ============================================================
   EXPONENTS & SURDS · Q7 — Rational-exponent equations
   ------------------------------------------------------------
   Solving x^(p/q) = k: raise both sides to the reciprocal, and
   decide whether the answer is ± (two), a single (possibly
   negative) value, or no real solution.
   ============================================================ */
import { mc, ynQ, pick } from "./_exp.js";

const CON = "ratExpEq";

const A = "x = ± (two answers)";
const B = "exactly one real answer (no ±)";
const C = "no real solution";
const D = "only x = 0";

/* each item: equation, correct category, why */
const POOL = [
  { e: "x^(2/3) = 4", cat: A, why: "Numerator 2 is even and the right side is positive → x = ±8 (two answers)." },
  { e: "x^(2/3) = 9", cat: A, why: "Even numerator, positive right side → x = ±27 (two answers)." },
  { e: "x^(2/5) = 16", cat: A, why: "Even numerator, positive right side → ± two answers." },
  { e: "x^(3/5) = −2", cat: B, why: "Top and bottom both odd → a single real answer, and here it is negative." },
  { e: "x^(1/3) = −2", cat: B, why: "Odd top and odd bottom → one real (negative) answer: x = −8." },
  { e: "x^(3/7) = −5", cat: B, why: "All odd → one real, negative answer." },
  { e: "x^(3/2) = 8", cat: B, why: "Odd numerator (3) → one answer: raise to 2/3 → x = 4. The even denominator only means x can’t be negative — it does NOT give ±." },
  { e: "x^(3/5) = 2", cat: B, why: "Top and bottom both odd → exactly one real answer: x = 2^(5/3) (positive, because the right side is positive)." },
  { e: "x^(1/2) = −5", cat: C, why: "Even root (denominator 2) of a negative → non-real → no solution." },
  { e: "x^(3/4) = −8", cat: C, why: "Even root (denominator 4) of a negative → no real solution." },
  { e: "x^(2/5) = −4", cat: C, why: "Even power (numerator 2) can’t equal a negative → no real solution." },
];

const SKILLS = {
  classify1: () => { const it = pick(POOL); return mc(CON, `Solve <b>${it.e}</b>. What does the solution look like?`, it.cat, [A, B, C, D].filter((x) => x !== it.cat), { hint: "Even numerator + positive → ±. All odd → one (can be negative). Even root/power of a negative → none.", answerLabel: it.why }); },
  classify2: () => { const it = pick(POOL); return mc(CON, `Solve <b>${it.e}</b>. What does the solution look like?`, it.cat, [A, B, C, D].filter((x) => x !== it.cat), { hint: "Look at whether the top and bottom of the exponent are odd or even, and the sign of the right side.", answerLabel: it.why }); },
  classify3: () => { const it = pick(POOL); return mc(CON, `Solve <b>${it.e}</b>. What does the solution look like?`, it.cat, [A, B, C, D].filter((x) => x !== it.cat), { hint: "An even root of a negative is non-real; an even power is never negative.", answerLabel: it.why }); },

  /* the method step */
  reciprocalStep: () => {
    const items = [
      { q: "To solve <b>x^(2/3) = 4</b>, raise both sides to the power:", correct: "3/2", wrongs: ["2/3", "−2/3", "3"], ans: "Use the reciprocal of 2/3, which is 3/2; then (2/3)·(3/2) = 1 and x is on its own." },
      { q: "To solve <b>x^(3/4) = 8</b>, raise both sides to the power:", correct: "4/3", wrongs: ["3/4", "−3/4", "4"], ans: "Use the reciprocal 4/3 so the exponents cancel to 1." },
      { q: "To solve <b>x^(2/5) = 9</b>, raise both sides to the power:", correct: "5/2", wrongs: ["2/5", "−5/2", "5"], ans: "Reciprocal of 2/5 is 5/2." },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs, { hint: "Multiply the exponent by its reciprocal so it becomes 1.", answerLabel: it.ans });
  },

  /* why the reciprocal */
  whyReciprocal: () => mc(CON,
    "Why do we raise both sides to the <b>reciprocal</b> of the exponent?",
    "So the exponents multiply to 1 and x is left on its own",
    ["To make the right side a whole number", "To change x into a surd", "To remove the negative sign"],
    { hint: "(p/q) × (q/p) = ?", answerLabel: "(p/q)·(q/p) = 1, so x¹ = x is isolated." }),

  /* the no-solution rule */
  noSolutionRule: () => ynQ(CON,
    "An <b>even root</b> of a <b>negative</b> number (like x^(1/2) = −4) gives a non-real result, so there is no real solution. True or false?",
    true,
    { hint: "Can the square root of a negative be a real number?", answerLabel: "True — an even root of a negative is non-real, so the equation has no real solution." }),
};

export const questEs7 = {
  id: "es7",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
