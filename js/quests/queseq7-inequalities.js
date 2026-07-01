/* ============================================================
   EQUATIONS & INEQUALITIES · Q7 — Inequalities: flip & the bowl
   ------------------------------------------------------------
   Linear: switch the sign when ×/÷ by a negative, compound
   inequalities, open vs filled circles. Quadratic: the set-up
   rules, CP from = 0, and reading the answer off a TO-SCALE
   shaded parabola — inside the bowl vs to the left/right —
   plus the (4 − x) hidden-negative and (x − 3)² special cases.
   ============================================================ */
import {
  mc, ynQ, pick, randInt, C, frac,
  randRoots, factorStr, bowlGraph, ineqBetween, ineqOutside,
} from "./_eq.js";

const LIN = "eqLinIneq";
const QUA = "eqQuadIneq";

const SKILLS = {
  /* when does the sign switch? */
  flipWhen: () => {
    const items = [
      { q: "When solving an inequality, WHEN must you switch the direction of the sign?", correct: "When you multiply or divide both sides by a NEGATIVE number", wrongs: ["Whenever you move a term across", "When you add a negative number to both sides", "Every time there is a fraction"], ans: "Only × or ÷ by a negative flips the sign. Adding/subtracting anything, or ×/÷ by a positive, leaves the sign alone." },
      { q: "You divide both sides of <b>6x &lt; 18</b> by 6. Does the sign flip?", correct: "No — dividing by a POSITIVE number never flips the sign", wrongs: ["Yes — dividing always flips", "Yes — 18 is bigger than 6", "Only if x is negative"], ans: "6 is positive, so nothing flips: x < 3. The flip is reserved for × or ÷ by a NEGATIVE." },
      ynQ(LIN,
        "Subtracting 9x from both sides of an inequality flips the sign. True?",
        false,
        { hint: "Adding or subtracting never flips.",
          answerLabel: "False — moving terms across (adding/subtracting) never flips the sign. Only MULTIPLYING or DIVIDING by a negative does." }),
    ];
    const it = pick(items);
    return it.type ? it : mc(LIN, it.q, it.correct, it.wrongs,
      { hint: "× or ÷ with a negative = switch direction.", answerLabel: it.ans });
  },

  /* apply the flip — fresh numbers */
  flipApply: () => {
    const gcd = (x, y) => (y ? gcd(y, x % y) : x);
    let a = randInt(2, 6), bb = randInt(1, 9);
    while (gcd(a, bb) !== 1) bb = randInt(1, 9);        // the fraction −b/a arrives already simplified
    const prompt = `Solve for x: <b>−${C(a)}x &lt; ${C(bb)}</b>`;
    const correct = `x > −${frac(bb, a)}`;
    const wrongs = [
      `x &lt; −${frac(bb, a)}`,
      `x > ${frac(bb, a)}`,
      `x &lt; ${frac(bb, a)}`,
    ];
    return mc(LIN, prompt, correct, wrongs,
      { hint: "Divide both sides by the NEGATIVE coefficient — and switch the sign as you do.",
        answerLabel: `Divide by −${C(a)} and flip: x > −${frac(bb, a)}.` });
  },

  /* compound inequality */
  compound: () => {
    const items = [
      { q: "Solve <b>−5 ≤ 1 − 3x &lt; 10</b>. After subtracting 1 from ALL THREE parts you divide by −3. What happens?", correct: "BOTH inequality signs flip: 2 ≥ x > −3", wrongs: ["Only the left sign flips", "Nothing flips — division is by 3", "The middle and right swap places"], ans: "Dividing all three parts by −3 flips BOTH signs: −6 ≤ −3x < 9 becomes 2 ≥ x > −3, i.e. −3 < x ≤ 2." },
      { q: "You end a compound inequality with <b>2 ≥ x > −3</b>. How should the final answer be written?", correct: "−3 &lt; x ≤ 2 (natural left-to-right order)", wrongs: ["2 ≥ x > −3 is already the final form", "x ≤ 2 or x > −3", "−3 > x ≥ 2"], ans: "Rewrite in natural number-line order, small to large: −3 < x ≤ 2." },
      ynQ(LIN,
        "In a compound inequality like −5 ≤ 1 − 3x < 10, every operation must be done to ALL THREE parts. True?",
        true,
        { hint: "It's a sandwich — all three layers move together.",
          answerLabel: "True — subtract the 1 from all three parts, divide all three by −3 (flipping both signs)." }),
    ];
    const it = pick(items);
    return it.type ? it : mc(LIN, it.q, it.correct, it.wrongs,
      { hint: "All three parts together; ÷ by negative flips BOTH signs; finish in natural order.", answerLabel: it.ans });
  },

  /* number line circles */
  circles: () => {
    const items = [
      { q: "On a number line, what does an OPEN circle at an endpoint mean?", correct: "The endpoint is NOT included (&lt; or >)", wrongs: ["The endpoint is included (≤ or ≥)", "The answer is undefined there", "The graph continues forever"], ans: "Open circle = not included (strict < or >). Filled circle = included (≤ or ≥)." },
      { q: "Which endpoints does <b>−3 &lt; x ≤ 2</b> put on the number line?", correct: "Open circle at −3, filled circle at 2", wrongs: ["Filled circle at −3, open circle at 2", "Open circles at both", "Filled circles at both"], ans: "< at −3 → open (not included); ≤ at 2 → filled (included)." },
    ];
    const it = pick(items);
    return mc(LIN, it.q, it.correct, it.wrongs,
      { hint: "Strict sign → open circle. 'Or equal' sign → filled circle.", answerLabel: it.ans });
  },

  /* quadratic inequality set-up */
  setup: () => {
    const items = [
      { q: "Setting up a QUADRATIC inequality before sketching the bowl — which list is right?", correct: "Everything to the left (0 on the right); no negative in front of x²; CP from = 0", wrongs: ["Everything to the right; negative x² is fine; CP from < 0", "Divide by x first; then factorise; CP from = 0", "Sketch first, factorise afterwards"], ans: "The routine: 0 on the right → kill any negative in front of x² (divide by −1 and FLIP) → factorise → CP: each factor = 0 → sketch/calculator." },
      { q: "Where do the critical points (CP) of a quadratic inequality come from?", correct: "Setting each factor equal to 0 — an EQUATION, even though the question is an inequality", wrongs: ["Setting each factor &lt; 0", "The turning point of the parabola", "The y-intercept"], ans: "CP come from factor = 0. The inequality only decides WHICH region between/outside the CPs you keep." },
      ynQ(QUA,
        "There is a negative in front of x². You divide every term by −1 — does the inequality sign flip?",
        true,
        { hint: "÷ by a negative…",
          answerLabel: "Yes — dividing by −1 flips the sign: −x² + 3x − 2 ≥ 0 becomes x² − 3x + 2 ≤ 0." }),
    ];
    const it = pick(items);
    return it.type ? it : mc(QUA, it.q, it.correct, it.wrongs,
      { hint: "Left side, positive x², CP = 0, then sketch.", answerLabel: it.ans });
  },

  /* ★ read the answer off the sketch — INSIDE the bowl */
  readInside: () => {
    const [r1, r2] = randRoots();
    const strict = pick([true, false]);
    const sign = strict ? "&lt;" : "≤";
    const correct = strict ? ineqBetween(r1, r2) : `${C(r1)} ≤ x ≤ ${C(r2)}`;
    const wrongs = [
      strict ? ineqOutside(r1, r2) : `x ≤ ${C(r1)} or x ≥ ${C(r2)}`,
      strict ? `${C(r1)} ≤ x ≤ ${C(r2)}` : ineqBetween(r1, r2),
      strict ? `x &lt; ${C(r2)} only` : `x ≤ ${C(r2)} only`,
    ];
    return mc(QUA,
      `<b>${factorStr(r1, r2)} ${sign} 0</b>. The sketch shades the solution. Read it off.`,
      correct, wrongs,
      { hint: `The expression must be ${strict ? "NEGATIVE" : "negative or 0"} — the bowl dips below the axis BETWEEN its critical points.`,
        answerLabel: `Below the axis = inside the bowl: ${correct}${strict ? "" : " (≤ keeps the critical points in)"}.`,
        graph: bowlGraph(r1, r2, "inside") });
  },

  /* ★ read the answer off the sketch — OUTSIDE (left/right) */
  readOutside: () => {
    const [r1, r2] = randRoots();
    const strict = pick([true, false]);
    const sign = strict ? ">" : "≥";
    const correct = strict ? ineqOutside(r1, r2) : `x ≤ ${C(r1)} or x ≥ ${C(r2)}`;
    const wrongs = [
      strict ? ineqBetween(r1, r2) : `${C(r1)} ≤ x ≤ ${C(r2)}`,
      `x ${strict ? "&lt;" : "≤"} ${C(r1)} AND x ${strict ? ">" : "≥"} ${C(r2)}`,
      strict ? `x > ${C(r2)} only` : `x ≥ ${C(r2)} only`,
    ];
    return mc(QUA,
      `<b>${factorStr(r1, r2)} ${sign} 0</b>. The sketch shades the solution. Read it off.`,
      correct, wrongs,
      { hint: "Positive = ABOVE the axis — the two arms to the left and right of the bowl. Two pieces need the word OR.",
        answerLabel: `Above the axis = outside the CPs: ${correct}. Two separate pieces MUST be joined with "or" — no x can be in both at once, so "and" is impossible.`,
        graph: bowlGraph(r1, r2, "outside") });
  },

  /* "or", never "and" */
  orNotAnd: () => {
    const items = [
      ynQ(QUA,
        "A two-piece answer may be written “x ≤ 0 <b>and</b> x ≥ 6”. True?",
        false,
        { hint: "Can one x be in both pieces at the same time?",
          answerLabel: "False — no number is ≤ 0 AND ≥ 6 at once. Two separate pieces are joined with OR: x ≤ 0 or x ≥ 6." }),
      { q: "Why must a two-piece solution use <b>or</b> instead of <b>and</b>?", correct: "No single x can satisfy both pieces at once — each x lives in ONE piece", wrongs: ["'And' is just slang for 'or' here", "Because the pieces overlap", "It's tradition with no reason"], ans: "'And' means both at the same time — impossible for x ≤ 0 and x ≥ 6. Each solution sits in one piece OR the other." },
    ];
    const it = pick(items);
    return it.type ? it : mc(QUA, it.q, it.correct, it.wrongs,
      { hint: "Two pieces → OR.", answerLabel: it.ans });
  },

  /* the (4 − x) hidden negative */
  hiddenNeg: () => {
    const r = randInt(2, 5), s = r + randInt(1, 4);
    const items = [
      { q: `<b>(x − ${C(r)})(${C(s)} − x) ≥ 0</b>. What is hiding in the second bracket?`, correct: `A negative x² — rewrite (${C(s)} − x) as −(x − ${C(s)}), so the inequality FLIPS to (x − ${C(r)})(x − ${C(s)}) ≤ 0`, wrongs: ["Nothing — factorised form is ready for CPs as is", `The bracket just means x = ${C(s)} is a CP, sign unchanged`, "A fraction that must be cleared first"], ans: `(${C(s)} − x) expanded gives −x². Take out the −1 (and flip!): (x − ${C(r)})(x − ${C(s)}) ≤ 0, giving ${C(r)} ≤ x ≤ ${C(s)}.` },
      ynQ(QUA,
        `A bracket like (${C(s)} − x) can be used directly for the bowl sketch without any adjustment. True?`,
        false,
        { hint: "Multiply the brackets out in pencil — what is the coefficient of x²?",
          answerLabel: `False — (${C(s)} − x) hides a NEGATIVE x², and the bowl method needs a positive one. Take −1 out of that bracket and flip the inequality sign.` }),
    ];
    const it = pick(items);
    return it.type ? it : mc(QUA, it.q, it.correct, it.wrongs,
      { hint: "(a − x) hides −x². Take out −1 and flip.", answerLabel: it.ans });
  },

  /* fractions inside an inequality — the square denominator & the restriction */
  fracIneq: () => {
    const m = randInt(2, 5);
    const items = [
      { q: `Why may <b>(${C(m * m)} − x²)/x² ≥ 0</b> be read straight off the NUMERATOR (${C(m * m)} − x² ≥ 0)?`, correct: "x² is positive for every x ≠ 0, so the fraction's sign IS the numerator's sign", wrongs: ["The denominator always cancels the numerator", "Fractions in inequalities may always be ignored", "Because the numerator is bigger"], ans: `A square denominator is positive for every non-zero x, so dividing by it never changes the sign. Solve ${C(m * m)} − x² ≥ 0 — but CARRY x ≠ 0 into the final answer.` },
      { q: "An inequality has x in a DENOMINATOR. What must ride along into the final answer?", correct: "The restriction (e.g. x ≠ 0) — even if the rest of the interval includes it", wrongs: ["Nothing — restrictions are only for equations", "A ± sign", "The LCD"], ans: "A denominator's restriction belongs to the original inequality, so the final answer must exclude it: e.g. −3 ≤ x ≤ 3 with x ≠ 0." },
      ynQ(QUA,
        "A factor that appears in BOTH the numerator and the denominator simplifies away (it equals 1 for any non-zero value). True?",
        true,
        { hint: "Anything non-zero over itself is 1.",
          answerLabel: "True — e.g. (x³ − 2x² − 3x)/x simplifies to x² − 2x − 3 for x ≠ 0. Simplify first, keep the restriction." }),
    ];
    const it = pick(items);
    return it.type ? it : mc(QUA, it.q, it.correct, it.wrongs,
      { hint: "A square denominator can't change the sign; a denominator's restriction always survives.", answerLabel: it.ans });
  },

  /* the repeated factor / perfect square special case */
  perfectSquareIneq: () => {
    const r = randInt(1, 6) * pick([1, -1]);
    const br = r >= 0 ? `(x − ${C(r)})` : `(x + ${C(-r)})`;
    const prompt = `Solve <b>${br}² > 0</b>.`;
    const correct = `x ∈ ℝ, x ≠ ${C(r)}`;
    const wrongs = [
      `x > ${C(r)}`,
      "No solution — a square can't be positive",
      `x ∈ ℝ (every x works, including ${C(r)})`,
    ];
    return mc(QUA, prompt, correct, wrongs,
      { hint: "A square is 0 or positive. Where is it exactly 0?",
        answerLabel: `${br}² is positive EVERYWHERE except at its one critical point x = ${C(r)}, where it is 0 (and 0 > 0 is false). So x ∈ ℝ, x ≠ ${C(r)}. Compare: two DIFFERENT brackets would give two CPs and an outside answer.` });
  },
};

export const questEq7 = {
  id: "eq7",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id,
    concept: ["flipWhen", "flipApply", "compound", "circles"].includes(id) ? LIN : QUA,
    gen,
  })),
};
