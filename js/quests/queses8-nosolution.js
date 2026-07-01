/* ============================================================
   EXPONENTS & SURDS · Q8 — No-solution & equation strategy
   ------------------------------------------------------------
   Exponential equations (same-base, common-factor, trinomial,
   "positive base ≠ negative") and surd equations (isolate,
   square, ALWAYS test) — and every place a "no solution" hides.
   ============================================================ */
import { mc, ynQ, pick } from "./_exp.js";

const EXPQ = "expEqStrategy";
const SURDQ = "surdEq";

const SKILLS = {
  /* same-base strategy */
  sameBase: () => mc(EXPQ,
    "To solve <b>5ˣ = 25</b>, what is the plan?",
    "Write both sides with the same base, then equate the exponents",
    ["Take the square root of both sides", "Divide both sides by x", "Subtract 25 from both sides"],
    { hint: "Make the “guns” (bases) the same; once they match, the bases fall away and the exponents are equal.",
      answerLabel: "5ˣ = 5² → equate the exponents → x = 2." }),

  /* positive base can't be negative */
  positiveBase: () => {
    const items = [
      { q: "Solve <b>3ˣ = −9</b>.", ans: "No solution — a positive base (3ˣ) is always positive, so it can never equal −9." },
      { q: "Solve <b>2ˣ = −8</b>.", ans: "No solution — 2ˣ is always positive, so it can never equal −8." },
    ];
    const it = pick(items);
    return mc(EXPQ, it.q, "No solution", ["x = 2", "x = −2", "x = 3"],
      { hint: "What values can a positive base raised to a power take? Can it ever be negative?", answerLabel: it.ans });
  },

  /* method for multi-term exponential */
  whichMethod: () => {
    const items = [
      { e: "2ˣ⁺¹ + 2ˣ = 192", correct: "Common factor (take out 2ˣ)", wrongs: ["Difference of squares", "Equate the exponents directly", "Square both sides"], ans: "Both terms contain 2ˣ → 2ˣ(2 + 1) = 192." },
      { e: "3²ˣ + 6·3ˣ − 27 = 0", correct: "Let k = 3ˣ (trinomial)", wrongs: ["Common factor of 27", "Equate the exponents directly", "Square both sides"], ans: "Three terms in 3ˣ → let k = 3ˣ → k² + 6k − 27 = 0." },
      { e: "2²ˣ⁺² − 5·2ˣ + 1 = 0", correct: "Let k = 2ˣ (trinomial)", wrongs: ["Common factor of 1", "Equate the exponents directly", "Difference of squares"], ans: "Rewrite as 4·2²ˣ − 5·2ˣ + 1; let k = 2ˣ → 4k² − 5k + 1 = 0." },
    ];
    const it = pick(items);
    return mc(EXPQ, `Which method solves <b>${it.e}</b>?`, it.correct, it.wrongs,
      { hint: "A + or − between terms means factorise: common factor (shared power) or trinomial (let k = baseˣ).", answerLabel: it.ans });
  },

  /* reject a negative k */
  rejectK: () => ynQ(EXPQ,
    "Solving a trinomial gives <b>k = 5</b> or <b>k = −4</b>, where k = 2ˣ. Both give a value of x. True or false?",
    false,
    { hint: "Can 2ˣ equal a negative number?", answerLabel: "False — 2ˣ is always positive, so k = −4 is rejected. Only 2ˣ = 5 gives a solution." }),

  /* surd: isolate first → no solution */
  surdIsolate: () => mc(SURDQ,
    "Solve <b>√(x − 1) + 3 = 0</b>. What happens?",
    "Isolate the root → √(x − 1) = −3 → no solution (a root can’t be negative)",
    ["Square both sides to get x − 1 = 9, so x = 10", "x = 1", "x = −8"],
    { hint: "Get the root alone first, then look at the sign on the other side.",
      answerLabel: "√(x − 1) = −3 is impossible (a square root is never negative) → no solution." }),

  /* always test */
  alwaysTest: () => mc(SURDQ,
    "After squaring both sides of a surd equation, what must you <b>always</b> do?",
    "Test every answer in the original equation and reject the extraneous ones",
    ["Square the answers again", "Add the two answers together", "Take the square root of the answers"],
    { hint: "Squaring can introduce answers that don’t actually fit the original.",
      answerLabel: "Always substitute back into the original — squaring can create extraneous (false) answers." }),

  /* domain of √x */
  surdDomain: () => mc(SURDQ,
    "For what values of x is <b>√x</b> a real number?",
    "x ≥ 0",
    ["x &gt; 0 only", "x ≤ 0", "all real x"],
    { hint: "You can take the square root of 0 and of positives, but not of negatives.",
      answerLabel: "√x is real for x ≥ 0 (including 0); a negative inside an even root is non-real." }),
};

export const questEs8 = {
  id: "es8",
  skills: [
    { id: "sameBase", concept: EXPQ, gen: SKILLS.sameBase },
    { id: "positiveBase", concept: EXPQ, gen: SKILLS.positiveBase },
    { id: "whichMethod", concept: EXPQ, gen: SKILLS.whichMethod },
    { id: "rejectK", concept: EXPQ, gen: SKILLS.rejectK },
    { id: "surdIsolate", concept: SURDQ, gen: SKILLS.surdIsolate },
    { id: "alwaysTest", concept: SURDQ, gen: SKILLS.alwaysTest },
    { id: "surdDomain", concept: SURDQ, gen: SKILLS.surdDomain },
  ],
};
