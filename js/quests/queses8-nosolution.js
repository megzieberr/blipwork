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
        answerLabel: `${upw(b, "x")} = ${upw(b, n)} → equate the exponents → x = ${n}.`,
        solution: [
          { s: `Write ${v} as a power of the same base: ${v} = ${upw(b, n)}`, r: "prime factors first" },
          { s: `Now it reads ${upw(b, "x")} = ${upw(b, n)} — the guns are equal, so they shoot each other` },
          { s: `The helmets fall to the ground: x = ${n}`, r: "same bases → equate the exponents" },
        ] });
  },

  /* positive base can't be negative.  Decoys are the same three the
     fixed items used: the exponent you get if you ignore the minus, its
     negative, and one more. */
  positiveBase: () => {
    const b = randInt(2, 6), n = randInt(2, 4), v = Math.pow(b, n);
    return mc(EXPQ, `Solve <b>${upw(b, "x")} = −${v}</b>.`, "No solution",
      [`x = ${n}`, `x = −${n}`, `x = ${n + 1}`],
      { hint: "What values can a positive base raised to a power take? Can it ever be negative?",
        answerLabel: `No solution — a positive base (${upw(b, "x")}) is always positive, so it can never equal −${v}.`,
        solution: [
          { s: `Look at the left side on its own: ${b} is a positive base` },
          { s: `A positive base gives a positive answer for EVERY x — a big x makes it huge, a negative x makes it a small fraction, but it never turns negative` },
          { s: `${upw(b, "x")} ≠ −${v} ∴ no solution`, r: "her word for this one: no solution — not undefined, not non-real" },
        ] });
  },

  /* method for multi-term exponential */
  whichMethod: () => {
    const items = [
      { e: "2ˣ⁺¹ + 2ˣ = 192", correct: "Common factor (take out 2ˣ)", wrongs: ["Difference of squares", "Equate the exponents directly", "Square both sides"], ans: "Both terms contain 2ˣ → 2ˣ(2 + 1) = 192.",
        sol: [{ s: "There is a + between the terms, so no law fires yet — it has to be factorised" },
              { s: "Divorce the first power: 2ˣ⁺¹ = 2ˣ·2¹", r: "split x^(a+b) into xᵃ·xᵇ" },
              { s: "Both terms now carry 2ˣ, so take it out: 2ˣ(2 + 1) = 192", r: "common factor — always the base with the variable exponent" }] },
      { e: "3²ˣ + 6·3ˣ − 27 = 0", correct: "Let k = 3ˣ (trinomial)", wrongs: ["Common factor of 27", "Equate the exponents directly", "Square both sides"], ans: "Three terms in 3ˣ → let k = 3ˣ → k² + 6k − 27 = 0.",
        sol: [{ s: "Count the terms: three of them, and 3²ˣ is the square of 3ˣ" },
              { s: "That is the K², K, constant shape — so let K = 3ˣ" },
              { s: "It becomes K² + 6K − 27 = 0, an ordinary trinomial", r: "factorise it, then always substitute back to x" }] },
      { e: "2²ˣ⁺² − 5·2ˣ + 1 = 0", correct: "Let k = 2ˣ (trinomial)", wrongs: ["Common factor of 1", "Equate the exponents directly", "Difference of squares"], ans: "Rewrite as 4·2²ˣ − 5·2ˣ + 1; let k = 2ˣ → 4k² − 5k + 1 = 0.",
        sol: [{ s: "Divorce the + 2 out of the exponent first: 2²ˣ⁺² = 2²ˣ·2² = 4·2²ˣ" },
              { s: "The three terms are now 4·2²ˣ − 5·2ˣ + 1, and 2²ˣ is the square of 2ˣ" },
              { s: "let K = 2ˣ → 4K² − 5K + 1 = 0", r: "a trinomial in K, then substitute back" }] },
    ];
    const it = pick(items);
    return mc(EXPQ, `Which method solves <b>${it.e}</b>?`, it.correct, it.wrongs,
      { hint: "A + or − between terms means factorise: common factor (shared power) or trinomial (let k = baseˣ).", answerLabel: it.ans, solution: it.sol });
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
        answerLabel: `False — ${upw(b, "x")} is always positive, so k = −${s} is rejected. Only ${upw(b, "x")} = ${r} gives a solution.`,
        solution: [
          { s: `Substitute back — stopping at k loses the mark. The two branches read ${upw(b, "x")} = ${r} and ${upw(b, "x")} = −${s}` },
          { s: `${b} is a positive base, so ${upw(b, "x")} can never come out negative`, r: `${upw(b, "x")} ≠ −${s} ∴ no solution on that branch` },
          { s: `∴ false — only ${upw(b, "x")} = ${r} survives` },
        ] });
  },

  /* surd: isolate first → no solution */
  surdIsolate: () => {
    const c = randInt(1, 9), d = randInt(2, 9);
    return mc(SURDQ,
      `Solve <b>√(x − ${c}) + ${d} = 0</b>. What happens?`,
      `Isolate the root → √(x − ${c}) = −${d} → no solution (a root can’t be negative)`,
      [`Square both sides to get x − ${c} = ${d * d}, so x = ${c + d * d}`, `x = ${c}`, `x = ${sgn(c - d * d)}`],
      { hint: "Get the root alone first, then look at the sign on the other side.",
        answerLabel: `√(x − ${c}) = −${d} is impossible (a square root is never negative) → no solution.`,
        solution: [
          { s: `Isolate the root first — always: √(x − ${c}) = −${d}` },
          { s: "Now look at the sign BEFORE squaring anything: a square-root sign never gives a negative answer" },
          { s: "∴ no solution", r: "square first and you get a false answer that the test then has to throw out" },
        ] });
  },

  /* always test */
  alwaysTest: () => mc(SURDQ,
    "After squaring both sides of a surd equation, what must you <b>always</b> do?",
    "Test every answer in the original equation and reject the extraneous ones",
    ["Square the answers again", "Add the two answers together", "Take the square root of the answers"],
    { hint: "Squaring can introduce answers that don’t actually fit the original.",
      answerLabel: "Always substitute back into the original — squaring can create extraneous (false) answers.",
      solution: [
        { s: "Squaring hides signs: 3 ≠ −3, but 3² = (−3)²", r: "so a squared equation can pick up answers the original never had" },
        { s: "Put each answer back into the ORIGINAL equation and work out both sides" },
        { s: "Join them with = if it checks, and mark the failing one N.A. with a struck ≠", r: "her words: ALWAYS test both answers!! — it is a marked step, not an optional check" },
      ] }),

  /* domain of √x */
  surdDomain: () => mc(SURDQ,
    "For what values of x is <b>√x</b> a real number?",
    "x ≥ 0",
    ["x &gt; 0 only", "x ≤ 0", "all real x"],
    { hint: "You can take the square root of 0 and of positives, but not of negatives.",
      answerLabel: "√x is real for x ≥ 0 (including 0); a negative inside an even root is non-real.",
      solution: [
        { s: "√x asks for the number that squares back to x" },
        { s: "Squaring any real number gives 0 or a positive, so a negative x has no real root", r: "non-real" },
        { s: "x = 0 works, because √0 = 0", r: "∴ x ≥ 0, with the 0 included — not x > 0" },
      ] }),
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
