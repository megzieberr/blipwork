/* ============================================================
   EQUATIONS & INEQUALITIES · Q2 — Special cases & exponent brackets
   ------------------------------------------------------------
   No b term (± both sides / difference of squares), no c term
   (common factor — and why you may NOT divide by x), x² = negative
   → no real solution, and factor-form equations with exponents:
   same base, 2ˣ = −4 has no solution, and where x^(2/3) = 16
   gets its ± from.
   ============================================================ */
import { mc, ynQ, pick, randInt, C, pw, frac } from "./_eq.js";

const SPEC = "eqSpecialCases";
const EXPB = "eqExpBrackets";

const SKILLS = {
  /* x² = a negative number */
  noRealSol: () => {
    const k = randInt(2, 9);
    const items = [
      { q: `You reach <b>x² = −${C(k)}</b>. What can you conclude?`, correct: "There is no real solution — a square is never negative", wrongs: [`x = −√${C(k)}`, `x = ±√${C(k)}`, `x = ${C(k)} or x = −${C(k)}`], ans: `x² is 0 or positive for every real x, so x² = −${C(k)} can never be true. Write: no real solution.` },
      { q: `Solve <b>x² + ${C(k)} = 0</b>.`, correct: "No real solution", wrongs: [`x = ±√${C(k)}`, `x = −${C(k)}`, "x = 0"], ans: `Take the ${C(k)} across: x² = −${C(k)}. A square can't be negative → no real solution.` },
    ];
    const it = pick(items);
    return mc(SPEC, it.q, it.correct, it.wrongs,
      { hint: "Ask: can a square ever be negative?", answerLabel: it.ans });
  },

  /* no b term — difference of squares / √ both sides with ± */
  noB: () => {
    const k = randInt(2, 7);
    const items = [
      { q: `<b>x² − ${C(k * k)} = 0</b> has no middle (b) term. Which methods work?`, correct: "Difference of squares, OR square-root both sides keeping ±", wrongs: ["Only the quadratic formula", "Take out the common factor x", "Complete the square — nothing else works"], ans: `(x + ${C(k)})(x − ${C(k)}) = 0, or square-root both sides: x = ±${C(k)}. Both give the same two answers.` },
      { q: `Solve <b>x² = ${C(k * k)}</b>.`, correct: `x = ±${C(k)}`, wrongs: [`x = ${C(k)} only`, `x = −${C(k)} only`, `x = ${C(k * k)} or x = −${C(k * k)}`], ans: `Square-rooting BOTH sides of an equation gives both signs: x = ±${C(k)}, because (${C(k)})² and (−${C(k)})² both equal ${C(k * k)}.` },
    ];
    const it = pick(items);
    return mc(SPEC, it.q, it.correct, it.wrongs,
      { hint: "No b term → difference of squares, or √ both sides and keep the ±.", answerLabel: it.ans });
  },

  /* the ± is not optional */
  plusMinus: () => {
    const k = pick([5, 6, 7, 8, 9]);
    const items = [
      ynQ(SPEC,
        `A learner solves x² = ${C(k * k)} and writes only <b>x = ${C(k)}</b>. Is that full marks?`,
        false,
        { hint: `Does (−${C(k)})² also equal ${C(k * k)}?`,
          answerLabel: `No — (−${C(k)})² = ${C(k * k)} too. When you square-root both sides of an EQUATION you must keep both signs: x = ±${C(k)}.` }),
      ynQ(SPEC,
        "When you square-root both sides of an equation, you must write ± on the answer. True?",
        true,
        { hint: "Two different numbers can have the same square.",
          answerLabel: "True — both the positive and the negative value square to the same thing, so both are solutions." }),
    ];
    return pick(items);
  },

  /* no c term — common factor */
  noC: () => {
    const k = randInt(2, 9);
    const items = [
      { q: `<b>x² + ${C(k)}x = 0</b> has no constant (c) term. What is the method?`, correct: `Take out the common factor: x(x + ${C(k)}) = 0`, wrongs: ["Divide both sides by x first", "Difference of squares", "It cannot be factorised — use the formula"], ans: `Common factor: x(x + ${C(k)}) = 0, so x = 0 or x = −${C(k)}. Two answers — don't lose one!` },
      { q: `Solve <b>x² = ${C(k)}x</b>.`, correct: `x = 0 or x = ${C(k)}`, wrongs: [`x = ${C(k)} only`, `x = 0 only`, `x = ±${C(k)}`], ans: `Everything to one side: x² − ${C(k)}x = 0 → x(x − ${C(k)}) = 0 → x = 0 or x = ${C(k)}.` },
    ];
    const it = pick(items);
    return mc(SPEC, it.q, it.correct, it.wrongs,
      { hint: "No c term → common factor. The factor x gives the answer x = 0.", answerLabel: it.ans });
  },

  /* why dividing by x is illegal */
  dontDivideByX: () => {
    const k = randInt(2, 9);
    const items = [
      ynQ(SPEC,
        `To solve <b>x² = ${C(k)}x</b>, may you divide both sides by x to get x = ${C(k)}?`,
        false,
        { hint: "What if x itself is 0?",
          answerLabel: `No — dividing by x throws the x = 0 answer away (and you can't divide by 0). Factorise instead: x(x − ${C(k)}) = 0 → x = 0 or x = ${C(k)}.` }),
      { q: `A learner divides <b>x² = ${C(k)}x</b> by x and gets x = ${C(k)}. What went missing?`, correct: "The solution x = 0", wrongs: ["Nothing — it's correct", `The solution x = −${C(k)}`, "The ± sign"], ans: `x = 0 also satisfies x² = ${C(k)}x (both sides 0). Dividing by x silently deleted it. Common factor keeps both.` },
    ];
    const it = pick(items);
    return it.type ? it : mc(SPEC, it.q, it.correct, it.wrongs,
      { hint: "Dividing by the variable deletes a solution.", answerLabel: it.ans });
  },

  /* exponential factor: make the bases the same */
  expSameBase: () => {
    const items = [
      { q: `One bracket gives <b>${pw("3", "x")} = √27</b>. What is the correct first move?`, correct: `Write √27 as a power of 3: ${pw("3", "x")} = ${pw("3", "3/2")}`, wrongs: ["Square both sides", "Take logs", `Divide both sides by 3`], ans: `√27 = √(3³) = ${pw("3", "3/2")}. Same base on both sides → equate the exponents: x = ${frac(3, 2)}.` },
      { q: `One bracket gives <b>${pw("3", "x")} = 1</b>. What is x?`, correct: "x = 0, because 3⁰ = 1", wrongs: ["x = 1", "No solution", "x = ⅓"], ans: `Write 1 as a power of 3: 1 = 3⁰. Same base → x = 0.` },
      { q: `One bracket gives <b>${pw("2", "x")} = 16</b>. What is the correct move?`, correct: `Write 16 as ${pw("2", "4")}, then equate exponents: x = 4`, wrongs: ["Divide both sides by 2 four times and count", "Square-root both sides", "x = 8, because 16 ÷ 2 = 8"], ans: `16 = 2⁴, so ${pw("2", "x")} = ${pw("2", "4")} → x = 4. Same base, then the bases fall away.` },
    ];
    const it = pick(items);
    return mc(EXPB, it.q, it.correct, it.wrongs,
      { hint: "Make the bases the SAME (prime factors / powers), then equate the exponents.", answerLabel: it.ans });
  },

  /* a positive base can never give a negative */
  expNoSol: () => {
    const base = pick([2, 3, 5]), k = pick([4, 8, 9, 25]);
    const items = [
      { q: `One bracket gives <b>${pw(String(base), "x")} = −${C(k)}</b>. What can you conclude?`, correct: "No solution — a power with a positive base is never negative", wrongs: [`x = −${C(Math.round(Math.log(k) / Math.log(base)))}`, "x = 0", `x = ±${C(k)}`], ans: `${base} to ANY power stays positive (it never even reaches 0), so ${pw(String(base), "x")} = −${C(k)} is impossible. Write: no solution.` },
      ynQ(EXPB,
        `<b>${pw(String(base), "x")} = −${C(k)}</b>. Does this bracket give a solution?`,
        false,
        { hint: `Can ${base}^x ever be negative?`,
          answerLabel: `No — a positive base to any real power is always positive. This bracket contributes NO solution (the workbook writes it with ≠ and "no solution").` }),
    ];
    const it = pick(items);
    return it.type ? it : mc(EXPB, it.q, it.correct, it.wrongs,
      { hint: "Positive base → the power is always positive.", answerLabel: it.ans });
  },

  /* where the ± in x^(2/3) = 16 comes from */
  ratExpPM: () => {
    const items = [
      { q: `<b>${pw("x", "2/3")} = 16</b> has the answers x = ±64. WHERE does the ± come from?`, correct: "The exponent ⅔ contains an EVEN power: (∛x)² = 16, so ∛x = ±4, so x = ±64", wrongs: ["Every rational-exponent equation gets a ±", "From square-rooting the 16 at the start", "It doesn't — only +64 is correct"], ans: "Read x^(2/3) as (∛x)². Undoing the SQUARE gives ∛x = ±4, and cubing keeps both signs: x = ±64. The even power on top hides the sign." },
      { q: `To undo the exponent in <b>${pw("x", "2/3")} = 16</b>, you raise both sides to which power?`, correct: `The reciprocal, ${frac(3, 2)}`, wrongs: [`${frac(2, 3)} again`, "3", "2"], ans: `Raise to the reciprocal ${frac(3, 2)}: (x^(2/3))^(3/2) = x. But remember the even power on top means the final answer is ±64, not just +64.` },
      ynQ(EXPB,
        `<b>${pw("x", "3/5")} = 8</b>. The top of the exponent (3) is ODD. Does this equation get a ± answer?`,
        false,
        { hint: "The ± appears only when an EVEN power hides the sign.",
          answerLabel: "No — an odd power keeps the sign, so there is exactly ONE answer. The ± only appears when the numerator is even (like 2/3)." }),
    ];
    const it = pick(items);
    return it.type ? it : mc(EXPB, it.q, it.correct, it.wrongs,
      { hint: "x^(2/3) = (∛x)². Undoing an even power → ±.", answerLabel: it.ans });
  },

  /* count the real solutions of a factor-form equation */
  countSolutions: () => {
    const items = [
      { q: `How many REAL solutions does <b>(x² − 5)(${pw("2", "x")} − 16) = 0</b> have?`, correct: "3: x = ±√5 and x = 4", wrongs: ["2: x = √5 and x = 4", "4: x = ±√5 and x = ±4", "1: x = 4 only"], ans: "x² = 5 gives TWO answers (x = ±√5); 2ˣ = 16 = 2⁴ gives x = 4. Three in total." },
      { q: `How many REAL solutions does <b>(${pw("3", "x")} − 1)(${pw("2", "x")} + 4) = 0</b> have?`, correct: "1: x = 0 only", wrongs: ["2: x = 0 and x = −2", "0: neither bracket can be 0", "2: x = ±1"], ans: "3ˣ = 1 = 3⁰ gives x = 0. But 2ˣ = −4 is impossible (positive base) → no solution from that bracket. One answer." },
      { q: `How many REAL solutions does <b>(x² + 9)(x − 2) = 0</b> have?`, correct: "1: x = 2 only", wrongs: ["3: x = ±3 and x = 2", "2: x = −9 and x = 2", "0: no solutions"], ans: "x² = −9 has NO real solution (a square can't be negative); x = 2 works. One answer." },
    ];
    const it = pick(items);
    return mc(EXPB, it.q, it.correct, it.wrongs,
      { hint: "Set each bracket = 0 on its own — then check which brackets actually CAN be 0.", answerLabel: it.ans });
  },
};

export const questEq2 = {
  id: "eq2",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({
    id,
    concept: ["expSameBase", "expNoSol", "ratExpPM", "countSolutions"].includes(id) ? EXPB : SPEC,
    gen,
  })),
};
