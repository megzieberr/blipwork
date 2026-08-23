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

/* unicode superscript digits — the chapter writes small powers inline
   ("16 = 2⁴", "1 = 3⁰") rather than as <sup>, so a rolled power needs
   the same glyphs. Only 0-9 ever reach this. */
const SUPD = ["⁰", "¹", "²", "³", "⁴", "⁵", "⁶", "⁷", "⁸", "⁹"];
const supDigits = (n) => String(n).split("").map((d) => SUPD[Number(d)]).join("");
/* "…divide by 2 four times…" — the count is spelled out, her wording */
const TIMES = { 2: "twice", 3: "three times", 4: "four times" };

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

  /* exponential factor: make the bases the same
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE). The three
     hand-written items were 3ˣ = √27 · 3ˣ = 1 · 2ˣ = 16 — three fixed
     shapes with an obvious pattern. Same wording, same three shapes, the
     base (and the power) rolled. Guards: √(b³) is honest for every base
     used, so the ³⁄₂ answer is always right; and the "divide once" decoy
     value b^(k−1) is forced to differ from the real answer k, which would
     otherwise collide at 2ˣ = 4 (4 ÷ 2 = 2 = x). */
  expSameBase: () => {
    const shape = randInt(1, 3);
    if (shape === 1) {
      const base = pick([2, 3, 5]), cube = base ** 3;
      return mc(EXPB,
        `One bracket gives <b>${pw(String(base), "x")} = √${C(cube)}</b>. What is the correct first move?`,
        `Write √${C(cube)} as a power of ${C(base)}: ${pw(String(base), "x")} = ${pw(String(base), "3/2")}`,
        ["Square both sides", "Take logs", `Divide both sides by ${C(base)}`],
        { hint: "Make the bases the SAME (prime factors / powers), then equate the exponents.",
          answerLabel: `√${C(cube)} = √(${C(base)}³) = ${pw(String(base), "3/2")}. Same base on both sides → equate the exponents: x = ${frac(3, 2)}.` });
    }
    if (shape === 2) {
      const base = pick([2, 3, 5, 7]);
      return mc(EXPB,
        `One bracket gives <b>${pw(String(base), "x")} = 1</b>. What is x?`,
        `x = 0, because ${C(base)}⁰ = 1`,
        ["x = 1", "No solution", `x = ${frac(1, base)}`],
        { hint: "Make the bases the SAME (prime factors / powers), then equate the exponents.",
          answerLabel: `Write 1 as a power of ${C(base)}: 1 = ${C(base)}⁰. Same base → x = 0.` });
    }
    const base = pick([2, 3, 5]);
    let k = randInt(2, 4);
    while (base ** (k - 1) === k) k = randInt(2, 4);   // the "÷ once" decoy must not BE the answer
    const v = base ** k, half = v / base;
    return mc(EXPB,
      `One bracket gives <b>${pw(String(base), "x")} = ${C(v)}</b>. What is the correct move?`,
      `Write ${C(v)} as ${pw(String(base), String(k))}, then equate exponents: x = ${C(k)}`,
      /* the count is a WORD, as she wrote it ("…by 2 four times…") — two
         numerals in a row read as one number ("by 3 3 times") on the phone */
      [`Divide both sides by ${C(base)} ${TIMES[k]} and count`, "Square-root both sides", `x = ${C(half)}, because ${C(v)} ÷ ${C(base)} = ${C(half)}`],
      { hint: "Make the bases the SAME (prime factors / powers), then equate the exponents.",
        answerLabel: `${C(v)} = ${C(base)}${supDigits(k)}, so ${pw(String(base), "x")} = ${pw(String(base), String(k))} → x = ${C(k)}. Same base, then the bases fall away.` });
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

  /* where the ± in x^(2/3) = 16 comes from
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE: "core
     explanation tied to one fixed worked example — parametrisable with
     real effort"). The exponent STAYS ²⁄₃ for the first two items — the
     whole teaching point is reading x^(2/3) as (∛x)², and swapping the
     denominator would need a root glyph the chapter doesn't have — but
     the worked number rolls: with a ∈ {2,3,4,5}, the right-hand side is
     a² and the answer is ±a³, which is exact for every a (the original
     was a = 4: 16 and ±64). The third item's odd numerator rolls freely,
     since its whole point is that an odd top never gets a ±. */
  ratExpPM: () => {
    const shape = randInt(1, 3);
    if (shape === 3) {
      const [p, q] = pick([[3, 5], [5, 7], [3, 7], [5, 3], [1, 3]]);
      const k = pick([4, 8, 9, 27, 32]);
      return ynQ(EXPB,
        `<b>${pw("x", `${p}/${q}`)} = ${C(k)}</b>. The top of the exponent (${C(p)}) is ODD. Does this equation get a ± answer?`,
        false,
        { hint: "The ± appears only when an EVEN power hides the sign.",
          answerLabel: "No — an odd power keeps the sign, so there is exactly ONE answer. The ± only appears when the numerator is even (like 2/3)." });
    }
    const a = pick([2, 3, 4, 5]), rhs = a * a, ans = a * a * a;
    if (shape === 1) {
      return mc(EXPB,
        `<b>${pw("x", "2/3")} = ${C(rhs)}</b> has the answers x = ±${C(ans)}. WHERE does the ± come from?`,
        `The exponent ⅔ contains an EVEN power: (∛x)² = ${C(rhs)}, so ∛x = ±${C(a)}, so x = ±${C(ans)}`,
        ["Every rational-exponent equation gets a ±", `From square-rooting the ${C(rhs)} at the start`, `It doesn't — only +${C(ans)} is correct`],
        { hint: "x^(2/3) = (∛x)². Undoing an even power → ±.",
          answerLabel: `Read x^(2/3) as (∛x)². Undoing the SQUARE gives ∛x = ±${C(a)}, and cubing keeps both signs: x = ±${C(ans)}. The even power on top hides the sign.` });
    }
    return mc(EXPB,
      `To undo the exponent in <b>${pw("x", "2/3")} = ${C(rhs)}</b>, you raise both sides to which power?`,
      `The reciprocal, ${frac(3, 2)}`,
      [`${frac(2, 3)} again`, "3", "2"],
      { hint: "x^(2/3) = (∛x)². Undoing an even power → ±.",
        answerLabel: `Raise to the reciprocal ${frac(3, 2)}: (x^(2/3))^(3/2) = x. But remember the even power on top means the final answer is ±${C(ans)}, not just +${C(ans)}.` });
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
