/* ============================================================
   EXPONENTS & SURDS · Q8 — No-solution & equation strategy
   ------------------------------------------------------------
   Exponential equations (same-base, common-factor, trinomial,
   "positive base ≠ negative") and surd equations (isolate,
   square, ALWAYS test) — and every place a "no solution" hides.

   PARAMETRISED 2026-08-23 (dice wave 2 — DICE-COMMON's CARE rule).
   DICE-AUDIT §11 marked four skills CARE (sameBase, positiveBase,
   rejectK, surdIsolate): each was ONE fixed worked example on a very
   simple pattern. All four now roll their numbers and recompute both
   the answer text and the decoys. The wording, the mechanic and the
   misconception behind every wrong option are unchanged — e.g.
   surdIsolate's decoys are still "squared it anyway", "the root's own
   zero point" and "subtracted instead". whichMethod stays STATIC (a
   hand-authored 3-item worked-expression bank), and alwaysTest /
   surdDomain were CLEAN pure recall — all three are untouched.
   ============================================================ */
import { mc, ynQ, pick, randInt, upw, sgn } from "./_exp.js";

const EXPQ = "expEqStrategy";
const SURDQ = "surdEq";

const SKILLS = {
  /* same-base strategy */
  sameBase: () => {
    const b = randInt(2, 6), n = randInt(2, 4), v = Math.pow(b, n);
    return mc(EXPQ,
      `To solve <b>${upw(b, "x")} = ${v}</b>, what is the plan?`,
      "Write both sides with the same base, then equate the exponents",
      ["Take the square root of both sides", "Divide both sides by x", `Subtract ${v} from both sides`],
      { hint: "Make the “guns” (bases) the same; once they match, the bases fall away and the exponents are equal.",
        answerLabel: `${upw(b, "x")} = ${upw(b, n)} → equate the exponents → x = ${n}.` });
  },

  /* positive base can't be negative.  Decoys are the same three the
     fixed items used: the exponent you get if you ignore the minus, its
     negative, and one more. */
  positiveBase: () => {
    const b = randInt(2, 6), n = randInt(2, 4), v = Math.pow(b, n);
    return mc(EXPQ, `Solve <b>${upw(b, "x")} = −${v}</b>.`, "No solution",
      [`x = ${n}`, `x = −${n}`, `x = ${n + 1}`],
      { hint: "What values can a positive base raised to a power take? Can it ever be negative?",
        answerLabel: `No solution — a positive base (${upw(b, "x")}) is always positive, so it can never equal −${v}.` });
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
  rejectK: () => {
    const b = randInt(2, 5);
    let r, s;
    do { r = randInt(2, 9); s = randInt(2, 9); } while (r === s);
    return ynQ(EXPQ,
      `Solving a trinomial gives <b>k = ${r}</b> or <b>k = −${s}</b>, where k = ${upw(b, "x")}. Both give a value of x. True or false?`,
      false,
      { hint: `Can ${upw(b, "x")} equal a negative number?`,
        answerLabel: `False — ${upw(b, "x")} is always positive, so k = −${s} is rejected. Only ${upw(b, "x")} = ${r} gives a solution.` });
  },

  /* surd: isolate first → no solution */
  surdIsolate: () => {
    const c = randInt(1, 9), d = randInt(2, 9);
    return mc(SURDQ,
      `Solve <b>√(x − ${c}) + ${d} = 0</b>. What happens?`,
      `Isolate the root → √(x − ${c}) = −${d} → no solution (a root can’t be negative)`,
      [`Square both sides to get x − ${c} = ${d * d}, so x = ${c + d * d}`, `x = ${c}`, `x = ${sgn(c - d * d)}`],
      { hint: "Get the root alone first, then look at the sign on the other side.",
        answerLabel: `√(x − ${c}) = −${d} is impossible (a square root is never negative) → no solution.` });
  },

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
