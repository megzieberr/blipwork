/* ============================================================
   EQUATIONS & INEQUALITIES · Q1 — Standard form & brackets = 0
   ------------------------------------------------------------
   Everything to one side so it equals 0, the zero-product rule
   (set each bracket = 0, do NOT multiply out), roots ↔ factors
   with opposite signs, and the calculator's EQN mode.
   THEORY only — choosing the move, not crunching numbers.
   ============================================================ */
import { mc, ynQ, pick, randInt, C, frac } from "./_eq.js";

const FORM = "eqStdForm";
const ZERO = "eqZeroProduct";

/* "(x − 3)" / "(x + 5)" from a root, opposite sign */
const factorOf = (r) => (r > 0 ? `(x − ${C(r)})` : `(x + ${C(-r)})`);

const SKILLS = {
  /* the first step for almost every quadratic */
  firstStep: () => {
    const items = [
      { q: "You must solve <b>x² + 3x = 10</b>. What is the FIRST step?", correct: "Take everything to one side so the other side is 0", wrongs: ["Divide both sides by x", "Square-root both sides", "Substitute x = 0 to check"], ans: "Almost every quadratic starts the same way: rearrange into standard form ax² + bx + c = 0, THEN factorise." },
      { q: "What is the <b>standard form</b> of a quadratic equation?", correct: "ax² + bx + c = 0", wrongs: ["ax² + bx = c", "ax + b = 0", "a(x − p)² + q = 0"], ans: "Standard form is ax² + bx + c = 0 — everything on one side, 0 on the other." },
      { q: "Solve <b>10 + 3y − y² = 0</b>. What tidy-up makes it easiest to factorise?", correct: "Rearrange to y² − 3y − 10 = 0 (positive square term first)", wrongs: ["Leave it as it is and factorise", "Divide everything by y", "Move the 10 to the right first"], ans: "Rewrite with the square term positive and in front: y² − 3y − 10 = 0, which factorises to (y − 5)(y + 2) = 0." },
    ];
    const it = pick(items);
    return mc(FORM, it.q, it.correct, it.wrongs,
      { hint: "Standard form first: everything to ONE side, 0 on the other.", answerLabel: it.ans });
  },

  /* the calculator EQN routine — including the workbook's own option trap */
  eqnMode: () => {
    const items = [
      { q: "On the calculator: <b>MODE → 5: EQN</b>. Which option solves a QUADRATIC (ax² + bx + c = 0)?", correct: "3: aX² + bX + c = 0", wrongs: ["4: aX³ + bX² + cX + d = 0", "1: anX + bnY = cn", "2: anX + bnY + cnZ = dn"], ans: "Option 3 is the quadratic. Option 4 is the CUBIC — a common mis-pick. (Even the workbook wrote it wrong once!)",
        sol: [{ s: "Match the shape on the screen to the shape of your equation" },
              { s: "A quadratic's highest power is x², so you want the line that shows aX² + bX + c" },
              { s: "That is option 3", r: "option 4 shows aX³ — that is a CUBIC, and it will ask you for a fourth coefficient d" }] },
      { q: "In EQN mode you type in the coefficients a, b and c. How must you type them?", correct: "Each with its own sign", wrongs: ["Always positive — signs don't matter", "Only a gets a sign", "As fractions only"], ans: "Every coefficient goes in WITH its sign: for x² − 2x − 1 = 0 that's a = 1, b = −2, c = −1.",
        sol: [{ s: "Standard form is ax² + bx + c = 0, with PLUS signs written between the terms" },
              { s: "So in x² − 2x − 1 = 0 the b term is + (−2)x and the c term is + (−1)" },
              { s: "Type a = 1, b = −2, c = −1", r: "drop a minus and the calculator solves a different equation" }] },
      { q: "After entering a, b and c in EQN mode, what does the calculator show?", correct: "The two roots, X₁ and X₂", wrongs: ["The factors, e.g. (2x − 1)(x + 3)", "The turning point", "Only whether solutions exist"], ans: "The calculator gives the ROOTS as numbers (X₁ and X₂) — turning them back into factors is your job.",
        sol: [{ s: "EQN mode solves the equation, so what comes back are the x-values that make it 0" },
              { s: "They appear as X₁ and X₂ — two numbers, not brackets" },
              { s: "To get factors you do the next bit yourself: opposite signs in the brackets, and any denominator multiplies the x" }] },
    ];
    const it = pick(items);
    return mc(FORM, it.q, it.correct, it.wrongs,
      { hint: "MODE → 5: EQN → 3: aX² + bX + c = 0 → type a, b, c with their signs.", answerLabel: it.ans, solution: it.sol });
  },

  /* roots → factors (opposite sign; denominator multiplies the x)
     PARAMETRISED 2026-08-23 (dice wave 2, DICE-AUDIT §12 CARE). The four
     hand-written items were x = ½ · x = −3 · x = −⅔ · x = 4 — two shapes
     (whole-number root, fraction root) with a simple enough pattern to
     roll. Wording, mechanic and teaching point are unchanged; only the
     root is rolled now. Guards: the fraction is always in lowest terms
     (gcd = 1) and a real fraction (n < d), so the "denominator multiplies
     the x" point always has something to bite on; the swapped-numbers
     decoy drops the "1x" when n = 1, exactly as the ½ item did. */
  rootsToFactors: () => {
    const whole = pick([true, false]);
    const s = pick([1, -1]);
    const opp = s > 0 ? "−" : "+";          // the bracket carries the OPPOSITE sign
    const same = s > 0 ? "+" : "−";
    if (whole) {
      const r = randInt(2, 9) * s;
      const k = Math.abs(r);
      return mc(FORM,
        `The calculator gives a root <b>x = ${C(r)}</b>. Which factor does it come from?`,
        `(x ${opp} ${C(k)})`,
        [`(x ${same} ${C(k)})`, `(${C(k)}x ${opp} 1)`, `(${C(k)}x ${same} 1)`],
        { hint: "Put the OPPOSITE sign in the bracket. For a fraction root, the denominator multiplies the x.",
          answerLabel: `Opposite sign of the root: x = ${C(r)} comes from (x ${opp} ${C(k)}).`,
          solution: [
            { s: `A root is an x-value that makes its bracket equal 0, so start there: x = ${C(r)}` },
            { s: `Take everything to one side: x ${opp} ${C(k)} = 0` },
            { s: `That line IS the bracket: (x ${opp} ${C(k)})`, r: "the bracket always carries the OPPOSITE sign to the root" },
          ] });
    }
    const gcd = (x, y) => (y ? gcd(y, x % y) : x);
    const d = pick([2, 3, 4, 5]);
    let n = randInt(1, d - 1);
    while (gcd(n, d) !== 1) n = randInt(1, d - 1);   // lowest terms: the root really is a fraction
    const rootStr = `${s < 0 ? "−" : ""}${frac(n, d)}`;
    /* n = 1 would print "1x" — the original ½ item wrote "(x − 2)" there */
    const swapped = n === 1 ? `(x ${opp} ${C(d)})` : `(${C(n)}x ${opp} ${C(d)})`;
    return mc(FORM,
      `The calculator gives a root <b>x = ${rootStr}</b>. Which factor does it come from?`,
      `(${C(d)}x ${opp} ${C(n)})`,
      [`(${C(d)}x ${same} ${C(n)})`, swapped, `(x ${opp} ${frac(n, d)})`],
      { hint: "Put the OPPOSITE sign in the bracket. For a fraction root, the denominator multiplies the x.",
        answerLabel: `Denominator ${C(d)} multiplies the x; numerator ${C(n)} crosses over with the opposite sign: (${C(d)}x ${opp} ${C(n)}).`,
        solution: [
          { s: `Start from the root: x = ${rootStr}` },
          { s: `Multiply the denominator to the x: ${C(d)}x = ${s < 0 ? "−" : ""}${C(n)}`, r: "her calculator trick: multiply denom to x" },
          { s: `Take the numerator over the =: ${C(d)}x ${opp} ${C(n)} = 0`, r: `so the factor is (${C(d)}x ${opp} ${C(n)})` },
        ] });
  },

  /* the zero-product rule itself */
  whyRule: () => {
    const items = [
      { q: "Why may you set each bracket of <b>(x − 5)(x − 2) = 0</b> equal to 0 on its own?", correct: "A product is 0 only when at least one factor is 0", wrongs: ["Because both brackets must equal 0 at the same time", "Because the brackets are equal to each other", "Because 0 divided by anything is 0"], ans: "That's the zero-product rule: if A·B = 0 then A = 0 or B = 0 — nothing else can multiply to give 0.",
        sol: [{ s: "Think about what makes a product come out as 0" },
              { s: "Two numbers multiply to 0 only if at least one of them IS 0 — no other pair can do it" },
              { s: "So A·B = 0 forces A = 0 or B = 0, and each bracket may be solved on its own", r: "“or”, not “and” — they need not both be 0" }] },
      { q: "The equation is already factorised: <b>(x − 5)(x − 2) = 0</b>. What should you do?", correct: "Set each bracket equal to 0 separately and solve", wrongs: ["Multiply the brackets out first", "Divide both sides by (x − 5)", "Add the brackets together"], ans: "Don't undo the gift! It's already factorised — set x − 5 = 0 or x − 2 = 0. (Dividing by (x − 5) throws the x = 5 answer away.)",
        sol: [{ s: "Factorised and equal to 0 is exactly the form the zero-product rule needs — the hard work is already done" },
              { s: "So split it: x − 5 = 0 or x − 2 = 0, giving x = 5 or x = 2" },
              { s: "Multiplying out would put you back at the start, and dividing by (x − 5) would delete the x = 5 answer", r: "never divide a factor away" }] },
    ];
    const it = pick(items);
    return mc(ZERO, it.q, it.correct, it.wrongs,
      { hint: "Brackets = 0 → each bracket = 0 on its own. Don't multiply out; don't divide a factor away.", answerLabel: it.ans, solution: it.sol });
  },

  /* read the solutions straight off the brackets — fresh numbers */
  bracketsZero: () => {
    const p = randInt(1, 8);
    let q = randInt(1, 8); if (q === p) q = p + 1;   // p ≠ q, else "x = −p or x = q" duplicates the correct answer set
    const prompt = `Solve: <b>(x − ${C(p)})(x + ${C(q)}) = 0</b>`;
    const correct = `x = ${C(p)} or x = ${C(-q)}`;
    const wrongs = [
      `x = ${C(-p)} or x = ${C(q)}`,
      `x = ${C(p)} or x = ${C(q)}`,
      `x = ${C(-p)} or x = ${C(-q)}`,
    ];
    return mc(ZERO, prompt, correct, wrongs,
      { hint: "Each bracket = 0 → the answer has the OPPOSITE sign of the number in the bracket.",
        answerLabel: `x − ${C(p)} = 0 gives x = ${C(p)}; x + ${C(q)} = 0 gives x = ${C(-q)}.`,
        solution: [
          { s: `The product is already 0, so set each bracket to 0 on its own`, r: "zero-product rule" },
          { s: `x − ${C(p)} = 0  →  x = ${C(p)}` },
          { s: `x + ${C(q)} = 0  →  x = ${C(-q)}`, r: "the answer flips the sign that is inside the bracket" },
        ] });
  },

  /* three factors → three solutions (don't drop the lonely x) */
  threeFactors: () => {
    const a = pick([2, 3]), c = randInt(2, 5);
    let bb = pick([1, 3, 5, 7]); if (bb === a) bb = 5;   // keep the fraction b/a a REAL fraction
    const prompt = `Solve: <b>x(${C(a)}x − ${C(bb)})(−x + ${C(c)}) = 0</b>`;
    const correct = `x = 0, x = ${frac(bb, a)} or x = ${C(c)}`;
    const wrongs = [
      `x = ${frac(bb, a)} or x = ${C(c)} (only two answers)`,
      `x = 0, x = ${frac(bb, a)} or x = ${C(-c)}`,
      `x = 0, x = ${C(-bb)} or x = ${C(c)}`,
    ];
    return mc(ZERO, prompt, correct, wrongs,
      { hint: "THREE factors → up to three answers. The lonely x in front is a factor too: x = 0.",
        answerLabel: `x = 0; ${C(a)}x = ${C(bb)} gives x = ${frac(bb, a)}; −x = ${C(-c)} gives x = ${C(c)}.`,
        solution: [
          { s: "Count the factors before you start: the lonely x, then two brackets — three of them", r: "so expect up to three answers" },
          { s: `The lonely x is a factor too: x = 0` },
          { s: `${C(a)}x − ${C(bb)} = 0  →  ${C(a)}x = ${C(bb)}  →  x = ${frac(bb, a)}` },
          { s: `−x + ${C(c)} = 0  →  x = ${C(c)}`, r: "watch the negative x — dividing by −1 flips the sign" },
        ] });
  },

  /* the "= 6" trap — the rule ONLY works against 0 */
  onlyAgainstZero: () => {
    const k = pick([6, 8, 10, 12]);
    const items = [
      ynQ(ZERO,
        `<b>(x − 3)(x + 2) = ${C(k)}</b>. May you write x − 3 = ${C(k)} or x + 2 = ${C(k)}?`,
        false,
        { hint: `Does the zero-product rule work against ${C(k)}?`,
          answerLabel: `No! Brackets may only be split up when the product is 0. Here you must first multiply out and bring the ${C(k)} across, so it equals 0.`,
          solution: [
            { s: `The zero-product rule needs a product of 0, and this one equals ${C(k)}` },
            { s: `Many pairs multiply to ${C(k)}, so knowing the product tells you nothing about either bracket` },
            { s: `Multiply out first, bring the ${C(k)} across so the right side is 0, THEN factorise again`, r: "standard form before the rule" },
          ] }),
      ynQ(ZERO,
        "The zero-product rule works for a product equal to ANY number, not just 0. True?",
        false,
        { hint: "2 × 3 = 6, but so is 1 × 6 and 12 × ½ …",
          answerLabel: "False — lots of pairs multiply to 6, so the factors tell you nothing. Only 0 forces a factor to BE 0.",
          solution: [
            { s: "Try it on 6: 2 × 3 = 6, and so does 1 × 6, and so does 12 × ½" },
            { s: "Endlessly many pairs give 6, so neither factor is pinned down to anything" },
            { s: "0 is the only product that forces a factor to BE 0", r: "∴ false — the rule works against 0 and nothing else" },
          ] }),
    ];
    return pick(items);
  },
};

export const questEq1 = {
  id: "eq1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: id === "whyRule" || id === "bracketsZero" || id === "threeFactors" || id === "onlyAgainstZero" ? ZERO : FORM, gen })),
};
