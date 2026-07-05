/* ============================================================
   EXPONENTS & SURDS · Q5 — Surd laws & traps
   ------------------------------------------------------------
   Same-root × and ÷, the BIG NO-NO (√a + √b ≠ √(a+b)), like
   surds, the inside/outside fraction rule, and the sign rules
   (non-real even roots, ± two answers).
   ============================================================ */
import { mc, ynQ, pick } from "./_exp.js";

const LAW = "surdLaws";
const SIGN = "surdSigns";

const SKILLS = {
  /* multiply / divide same root */
  multiplyDivide: () => {
    const items = [
      { q: "Simplify <b>√a · √b</b> (same root; a, b ≥ 0).", correct: "√(ab)", wrongs: ["√(a+b)", "ab", "√a + √b"], ans: "Same root: multiply the insides — √a·√b = √(ab)." },
      { q: "Simplify <b>√a ÷ √b</b> (same root; a ≥ 0, b &gt; 0).", correct: "√(a/b)", wrongs: ["√(a−b)", "a/b", "√a − √b"], ans: "Same root: divide the insides — √a ÷ √b = √(a/b)." },
    ];
    const it = pick(items);
    return mc(LAW, it.q, it.correct, it.wrongs, { hint: "Same root → you may combine the insides under one root for × and ÷.", answerLabel: it.ans });
  },

  /* the BIG NO-NO */
  bigNoNo: () => ynQ(LAW,
    "Is this correct?<br><b>√a + √b = √(a + b)</b>",
    false,
    { hint: "Try numbers: √9 + √16 = 3 + 4 = 7, but √25 = 5.",
      answerLabel: "No — the BIG NO-NO. You can never add the insides of two surds. √a + √b stays as it is." }),

  /* like surds add */
  likeSurds: () => {
    const items = [
      { q: "Simplify <b>5√x − 2√x</b>.", correct: "3√x", wrongs: ["3√(2x)", "7√x", "3x"], ans: "Like surds add like terms: 5√x − 2√x = 3√x." },
      { q: "Simplify <b>√x + √x</b>.", correct: "2√x", wrongs: ["√(2x)", "2x", "√x²"], ans: "Two of the same surd: √x + √x = 2√x (just like x + x = 2x)." },
      { q: "Simplify <b>4·³√3 + 2·³√3</b>.", correct: "6·³√3", wrongs: ["6·³√6", "8·³√3", "6·⁶√3"], ans: "Same surd (³√3), so add the coefficients: 4 + 2 = 6 → 6·³√3." },
    ];
    const it = pick(items);
    return mc(LAW, it.q, it.correct, it.wrongs, { hint: "Only surds with the SAME root and SAME inside can be added — combine the numbers in front.", answerLabel: it.ans });
  },

  /* inside power → top, root → bottom */
  insideOutside: () => {
    const items = [
      { q: "Where does the <b>inside power</b> go when you write ⁿ√(xᵃ) = x^(?/?)?", correct: "On the top (numerator)", wrongs: ["On the bottom (denominator)", "It disappears", "It stays inside"], ans: "Inside power → top; root index → bottom: ⁿ√(xᵃ) = x^(a/n)." },
      { q: "Simplify <b>√(x⁴)</b>.", correct: "x²", wrongs: ["x⁴", "x⁸", "x"], ans: "√(x⁴) = x^(4/2) = x²." },
      { q: "Simplify <b>³√(y⁶)</b>.", correct: "y²", wrongs: ["y³", "y⁶", "y⁹"], ans: "³√(y⁶) = y^(6/3) = y²." },
    ];
    const it = pick(items);
    return mc(LAW, it.q, it.correct, it.wrongs, { hint: "Inside the root → on top of the fraction; the root index → on the bottom.", answerLabel: it.ans });
  },

  /* sign / non-real */
  signRules: () => {
    const items = [
      { q: "A <b>negative</b> number is raised to an <b>even</b> power (e.g. (−5)²). The result is:", correct: "Positive", wrongs: ["Negative", "Zero", "Non-real"], ans: "An even power of a negative is positive: (−5)² = 25." },
      { q: "A <b>negative</b> number is raised to an <b>odd</b> power (e.g. (−5)³). The result is:", correct: "Negative", wrongs: ["Positive", "Zero", "Non-real"], ans: "An odd power of a negative is negative: (−5)³ = −125." },
      { q: "What kind of value is <b>√(−4)</b> (an even root of a negative)?", correct: "Non-real", wrongs: ["Positive", "Negative", "Zero"], ans: "An even root of a negative number is non-real." },
      { q: "What is <b>³√(−8)</b> (an odd root of a negative)?", correct: "−2 (real and negative)", wrongs: ["Non-real", "+2", "±2"], ans: "An odd root of a negative is real and negative: ³√(−8) = −2." },
    ];
    const it = pick(items);
    return mc(SIGN, it.q, it.correct, it.wrongs, { hint: "Even power/root behaves differently from odd; even root of a negative is non-real.", answerLabel: it.ans });
  },

  /* two answers from an even root of a positive (in an equation) */
  twoAnswers: () => {
    const items = [
      { q: "Solve <b>x² = 9</b>.", correct: "x = ±3", wrongs: ["x = 3 only", "x = −3 only", "x = ±√3"], ans: "Taking the square root of both sides gives x = ±3 (two answers)." },
      { q: "Solve <b>x² = 25</b>.", correct: "x = ±5", wrongs: ["x = 5 only", "x = ±√5", "no real solution"], ans: "x = ±5 — an even root of a positive gives two answers." },
    ];
    const it = pick(items);
    return mc(SIGN, it.q, it.correct, it.wrongs, { hint: "When you square-root both sides of an equation, remember the ± (both signs work).", answerLabel: it.ans });
  },
};

export const questEs5 = {
  id: "es5",
  skills: [
    { id: "multiplyDivide", concept: LAW, gen: SKILLS.multiplyDivide },
    { id: "bigNoNo", concept: LAW, gen: SKILLS.bigNoNo },
    { id: "likeSurds", concept: LAW, gen: SKILLS.likeSurds },
    { id: "insideOutside", concept: LAW, gen: SKILLS.insideOutside },
    { id: "signRules", concept: SIGN, gen: SKILLS.signRules },
    { id: "twoAnswers", concept: SIGN, gen: SKILLS.twoAnswers },
  ],
};
