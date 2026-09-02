/* ============================================================
   EXPONENTS & SURDS · Q1 — The exponent laws
   ------------------------------------------------------------
   Name the law, say what happens to the exponents, and the
   zero / negative / fractional / power-of-bracket rules.
   THEORY only — recognising rules, not computing values.
   ============================================================ */
import { mc, ynQ, pick, shuffled } from "./_exp.js";

const CON = "expLaws";

const SKILLS = {
  /* multiply / divide / power-of-power → what do you DO to the exponents? */
  whatToDo: () => {
    const items = [
      { op: "<b>multiply</b> powers with the same base (xᵃ · xᵇ)", correct: "Add the exponents", wrongs: ["Subtract the exponents", "Multiply the exponents", "Multiply the bases"], ans: "Multiplying with the same base → ADD the exponents: xᵃ·xᵇ = xᵃ⁺ᵇ.",
        sol: [{ s: "Write a small case out in full: x³ · x² = (x·x·x)(x·x)" },
              { s: "That is five x's multiplied together, so it is x⁵ — and 3 + 2 = 5", r: "you are just counting x's" },
              { s: "∴ xᵃ · xᵇ = xᵃ⁺ᵇ", r: "her name for it: the product rule" }] },
      { op: "<b>divide</b> powers with the same base (xᵃ ÷ xᵇ)", correct: "Subtract the exponents", wrongs: ["Add the exponents", "Divide the exponents", "Divide the bases"], ans: "Dividing with the same base → SUBTRACT the exponents: xᵃ÷xᵇ = xᵃ⁻ᵇ.",
        sol: [{ s: "Write a small case out in full: x⁵ ÷ x² = (x·x·x·x·x)/(x·x)" },
              { s: "Two x's cancel top and bottom, leaving x³ — and 5 − 2 = 3", r: "dividing takes x's away" },
              { s: "∴ xᵃ ÷ xᵇ = xᵃ⁻ᵇ", r: "the quotient rule" }] },
      { op: "take a <b>power of a power</b>, (xᵃ)ᵇ", correct: "Multiply the exponents", wrongs: ["Add the exponents", "Subtract the exponents", "Add the bases"], ans: "Power of a power → MULTIPLY the exponents: (xᵃ)ᵇ = xᵃᵇ.",
        sol: [{ s: "The outside power says how many copies: (x³)² = x³ · x³" },
              { s: "Now the product rule adds them: 3 + 3 = 6, which is 3 × 2", r: "b lots of a" },
              { s: "∴ (xᵃ)ᵇ = xᵃᵇ", r: "power of a power" }] },
    ];
    const it = pick(items);
    return mc(CON, `When you ${it.op}, what do you do?`, it.correct, it.wrongs,
      { hint: "Multiply → add · divide → subtract · power of a power → multiply.", answerLabel: it.ans, solution: it.sol });
  },

  /* name the law from its statement */
  nameLaw: () => {
    const items = [
      { law: "xᵃ · xᵇ = xᵃ⁺ᵇ", correct: "Product rule", wrongs: ["Quotient rule", "Power of a power", "Zero exponent"] },
      { law: "xᵃ ÷ xᵇ = xᵃ⁻ᵇ", correct: "Quotient rule", wrongs: ["Product rule", "Power of a power", "Power of a product"] },
      { law: "(xᵃ)ᵇ = xᵃᵇ", correct: "Power of a power", wrongs: ["Product rule", "Quotient rule", "Zero exponent"] },
      { law: "(xy)ᵃ = xᵃyᵃ", correct: "Power of a product", wrongs: ["Power of a power", "Product rule", "Power of a quotient"] },
    ];
    const it = pick(items);
    return mc(CON, `Which law is this?<br><b>${it.law}</b>`, it.correct, it.wrongs,
      { hint: "Look at the operation between the bases (× or ÷) versus a bracket raised to a power.",
        answerLabel: `${it.law} is the <b>${it.correct.toLowerCase()}</b>.` });
  },

  /* zero exponent */
  zero: () => {
    const items = [
      { q: "What is <b>x⁰</b> &nbsp;(x ≠ 0)?", correct: "1", wrongs: ["0", "x", "undefined"], ans: "Anything non-zero to the zero power is 1.",
        sol: [{ s: "xᵃ ÷ xᵃ = 1", r: "anything divided by itself" },
              { s: "But the quotient rule says the same thing is xᵃ⁻ᵃ = x⁰" },
              { s: "Two names for one answer, so x⁰ = 1", r: "her words: anything to the zero is always one" }] },
      { q: "Simplify <b>7x⁰</b> &nbsp;(x ≠ 0).", correct: "7", wrongs: ["0", "7x", "1"], ans: "Only x is raised to the 0, so x⁰ = 1 and 7·1 = 7.",
        sol: [{ s: "Check what the 0 is actually sitting on: there is no bracket, so it sits on the x alone" },
              { s: "x⁰ = 1, so 7x⁰ = 7(1)" },
              { s: "= 7", r: "the 7 was never touched" }] },
      { q: "What is <b>(5ab)⁰</b> &nbsp;(a, b ≠ 0)?", correct: "1", wrongs: ["0", "5ab", "5"], ans: "The WHOLE bracket is to the power 0, so the answer is 1.",
        sol: [{ s: "This time there IS a bracket, so the 0 sits on everything inside it" },
              { s: "5ab is one lump, and any non-zero lump to the power 0 is 1" },
              { s: "∴ (5ab)⁰ = 1", r: "compare 7x⁰ = 7, where only the x carried the 0" }] },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs, { hint: "Zero exponent → 1. Watch what the exponent is actually sitting on.", answerLabel: it.ans, solution: it.sol });
  },

  /* negative exponent meaning */
  negative: () => {
    const items = [
      { q: "What does a <b>negative exponent</b> mean: x⁻ᵃ = ?", correct: "1/xᵃ", wrongs: ["−xᵃ", "−1/xᵃ", "xᵃ"], ans: "A negative exponent means reciprocal: x⁻ᵃ = 1/xᵃ. It does NOT make the answer negative.",
        sol: [{ s: "Depressed exponents: flip the fraction and change the sign of the exponent" },
              { s: "x⁻ᵃ is really x⁻ᵃ/1, so flipping sends it under the line: 1/xᵃ" },
              { s: "The minus was used up in the flip", r: "x⁻ᵃ is 1/xᵃ, never −xᵃ" }] },
      { q: "Rewrite with a positive exponent: <b>1/x⁻ᵃ</b>", correct: "xᵃ", wrongs: ["1/xᵃ", "−xᵃ", "x⁻ᵃ"], ans: "Flip it across the line and change the sign: 1/x⁻ᵃ = xᵃ.",
        sol: [{ s: "The power is already under the line, carrying a minus" },
              { s: "Same move, other direction: flip it up over the line and change the sign" },
              { s: "∴ 1/x⁻ᵃ = xᵃ", r: "depressed exponents work both ways" }] },
      { q: "Is <b>3⁻²</b> positive or negative?", correct: "Positive (it equals 1/9)", wrongs: ["Negative (it equals −9)", "Negative (it equals −1/9)", "Zero"], ans: "3⁻² = 1/3² = 1/9 — a negative exponent gives a positive value.",
        sol: [{ s: "3⁻² = 1/3²", r: "flip the fraction, change the sign of the exponent" },
              { s: "= 1/9" },
              { s: "1/9 is a positive number", r: "a negative EXPONENT never makes the answer negative — that is the whole trap" }] },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs, { hint: "Negative exponent = “flip the fraction”, not “make it negative”.", answerLabel: it.ans, solution: it.sol });
  },

  /* fractional exponent ↔ surd */
  fractional: () => {
    const items = [
      { q: "What does <b>x<sup>½</sup></b> mean?", correct: "√x", wrongs: ["½x", "x ÷ 2", "2x"], ans: "A power of ½ is the square root: x^½ = √x.",
        sol: [{ s: "Her conversion box: ⁿ√(xᵃ) = x^(a/n)", r: "inside √ = top of the fraction, outside √ = bottom" },
              { s: "In x^½ the top is 1 and the bottom is 2, so the root index is 2" },
              { s: "√ IS ²√, so x^½ = √x", r: "the exponent is a root, not “half of x”" }] },
      { q: "Write <b>ⁿ√(xᵃ)</b> with a fractional exponent.", correct: "x^(a/n)", wrongs: ["x^(n/a)", "xᵃⁿ", "x^(a−n)"], ans: "The inside power a goes on TOP, the root index n on the BOTTOM: ⁿ√(xᵃ) = x^(a/n).",
        sol: [{ s: "Her hook: inside √ = top of the fraction; outside √ = bottom of the fraction" },
              { s: "The a is INSIDE the root, so it goes on top; the n is written OUTSIDE, so it goes underneath" },
              { s: "∴ ⁿ√(xᵃ) = x^(a/n)" }] },
      { q: "In x^(a/n), which number is the <b>root</b> (the index of the surd)?", correct: "n (the denominator)", wrongs: ["a (the numerator)", "a + n", "a × n"], ans: "Denominator = the root; numerator = the inside power.",
        sol: [{ s: "Her hook: inside √ = top of the fraction; outside √ = bottom of the fraction" },
              { s: "The root index is the little number written outside the root sign, so it lands on the bottom" },
              { s: "∴ n is the root, and a on top is the power inside", r: "check it on x^½ = √x: the 2 underneath is the square root" }] },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs, { hint: "Bottom of the fraction = the root; top = the power inside.", answerLabel: it.ans, solution: it.sol });
  },

  /* power of a quotient / flipped fraction */
  flip: () => {
    const items = [
      { q: "Apply the exponent: <b>(x/y)ᵃ = ?</b>", correct: "xᵃ / yᵃ", wrongs: ["xᵃ / y", "x / yᵃ", "(xy)ᵃ"], ans: "Each part of the fraction gets the exponent: (x/y)ᵃ = xᵃ/yᵃ.",
        sol: [{ s: "(x/y)ᵃ means the whole fraction multiplied by itself a times" },
              { s: "All the x's collect on top and all the y's underneath" },
              { s: "∴ xᵃ/yᵃ", r: "power of a quotient — each base gets the exponent" }] },
      { q: "Simplify the negative exponent: <b>(x/y)⁻ᵃ = ?</b>", correct: "(y/x)ᵃ", wrongs: ["(x/y)ᵃ", "−(x/y)ᵃ", "(y/x)⁻ᵃ"], ans: "Flip the fraction and drop the sign: (x/y)⁻ᵃ = (y/x)ᵃ.",
        sol: [{ s: "Flipped fractions: a negative power turns the fraction upside down" },
              { s: "So (x/y)⁻ᵃ = (y/x)ᵃ", r: "flip the fraction AND change the sign of the exponent" },
              { s: "The minus is used up by the flip — it never stays out in front" }] },
      { q: "Apply the exponent: <b>(xy)ᵃ = ?</b>", correct: "xᵃ yᵃ", wrongs: ["x yᵃ", "(x + y)ᵃ", "xᵃ + yᵃ"], ans: "Each base gets the exponent: (xy)ᵃ = xᵃyᵃ.",
        sol: [{ s: "(xy)ᵃ means xy multiplied by itself a times" },
              { s: "Multiplying can be reshuffled, so gather all the x's together and all the y's together" },
              { s: "∴ xᵃyᵃ", r: "power of a product — this only works because it is × inside, never +" }] },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs, { hint: "Each base in the bracket gets the power. A negative power flips a fraction over.", answerLabel: it.ans, solution: it.sol });
  },

  /* the same-base gate */
  sameBase: () => ynQ(CON,
    "Before you can add or subtract exponents, the <b>bases must be the same</b>. True or false?",
    true,
    { hint: "xᵃ·xᵇ = xᵃ⁺ᵇ only works when the base x is shared.",
      answerLabel: "True — the laws only apply when the bases match. xᵃ·yᵇ (different bases) can’t be combined.",
      solution: [
        { s: "x³ · x² works because you are counting x's: (x·x·x)(x·x) = x⁵" },
        { s: "With different bases there is nothing to count together — 2³ · 3² is just 8 × 9 = 72, and no law reaches it" },
        { s: "∴ true", r: "the header on her laws page: these rules only apply when the bases are the same" },
      ] }),
};

export const questEs1 = {
  id: "es1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
