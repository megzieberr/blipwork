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
      { op: "<b>multiply</b> powers with the same base (xᵃ · xᵇ)", correct: "Add the exponents", wrongs: ["Subtract the exponents", "Multiply the exponents", "Multiply the bases"], ans: "Multiplying with the same base → ADD the exponents: xᵃ·xᵇ = xᵃ⁺ᵇ." },
      { op: "<b>divide</b> powers with the same base (xᵃ ÷ xᵇ)", correct: "Subtract the exponents", wrongs: ["Add the exponents", "Divide the exponents", "Divide the bases"], ans: "Dividing with the same base → SUBTRACT the exponents: xᵃ÷xᵇ = xᵃ⁻ᵇ." },
      { op: "take a <b>power of a power</b>, (xᵃ)ᵇ", correct: "Multiply the exponents", wrongs: ["Add the exponents", "Subtract the exponents", "Add the bases"], ans: "Power of a power → MULTIPLY the exponents: (xᵃ)ᵇ = xᵃᵇ." },
    ];
    const it = pick(items);
    return mc(CON, `When you ${it.op}, what do you do?`, it.correct, it.wrongs,
      { hint: "Multiply → add · divide → subtract · power of a power → multiply.", answerLabel: it.ans });
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
      { q: "What is <b>x⁰</b> &nbsp;(x ≠ 0)?", correct: "1", wrongs: ["0", "x", "undefined"], ans: "Anything non-zero to the zero power is 1." },
      { q: "Simplify <b>7x⁰</b> &nbsp;(x ≠ 0).", correct: "7", wrongs: ["0", "7x", "1"], ans: "Only x is raised to the 0, so x⁰ = 1 and 7·1 = 7." },
      { q: "What is <b>(5ab)⁰</b>?", correct: "1", wrongs: ["0", "5ab", "5"], ans: "The WHOLE bracket is to the power 0, so the answer is 1." },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs, { hint: "Zero exponent → 1. Watch what the exponent is actually sitting on.", answerLabel: it.ans });
  },

  /* negative exponent meaning */
  negative: () => {
    const items = [
      { q: "What does a <b>negative exponent</b> mean: x⁻ᵃ = ?", correct: "1/xᵃ", wrongs: ["−xᵃ", "−1/xᵃ", "xᵃ"], ans: "A negative exponent means reciprocal: x⁻ᵃ = 1/xᵃ. It does NOT make the answer negative." },
      { q: "Rewrite with a positive exponent: <b>1/x⁻ᵃ</b>", correct: "xᵃ", wrongs: ["1/xᵃ", "−xᵃ", "x⁻ᵃ"], ans: "Flip it across the line and change the sign: 1/x⁻ᵃ = xᵃ." },
      { q: "Is <b>3⁻²</b> positive or negative?", correct: "Positive (it equals 1/9)", wrongs: ["Negative (it equals −9)", "Negative (it equals −1/9)", "Zero"], ans: "3⁻² = 1/3² = 1/9 — a negative exponent gives a positive value." },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs, { hint: "Negative exponent = “flip the fraction”, not “make it negative”.", answerLabel: it.ans });
  },

  /* fractional exponent ↔ surd */
  fractional: () => {
    const items = [
      { q: "What does <b>x<sup>½</sup></b> mean?", correct: "√x", wrongs: ["½x", "x ÷ 2", "2x"], ans: "A power of ½ is the square root: x^½ = √x." },
      { q: "Write <b>ⁿ√(xᵃ)</b> with a fractional exponent.", correct: "x^(a/n)", wrongs: ["x^(n/a)", "xᵃⁿ", "x^(a−n)"], ans: "The inside power a goes on TOP, the root index n on the BOTTOM: ⁿ√(xᵃ) = x^(a/n)." },
      { q: "In x^(a/n), which number is the <b>root</b> (the index of the surd)?", correct: "n (the denominator)", wrongs: ["a (the numerator)", "a + n", "a × n"], ans: "Denominator = the root; numerator = the inside power." },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs, { hint: "Bottom of the fraction = the root; top = the power inside.", answerLabel: it.ans });
  },

  /* power of a quotient / flipped fraction */
  flip: () => {
    const items = [
      { q: "Apply the exponent: <b>(x/y)ᵃ = ?</b>", correct: "xᵃ / yᵃ", wrongs: ["xᵃ / y", "x / yᵃ", "(xy)ᵃ"], ans: "Each part of the fraction gets the exponent: (x/y)ᵃ = xᵃ/yᵃ." },
      { q: "Simplify the negative exponent: <b>(x/y)⁻ᵃ = ?</b>", correct: "(y/x)ᵃ", wrongs: ["(x/y)ᵃ", "−(x/y)ᵃ", "(y/x)⁻ᵃ"], ans: "Flip the fraction and drop the sign: (x/y)⁻ᵃ = (y/x)ᵃ." },
      { q: "Apply the exponent: <b>(xy)ᵃ = ?</b>", correct: "xᵃ yᵃ", wrongs: ["x yᵃ", "(x + y)ᵃ", "xᵃ + yᵃ"], ans: "Each base gets the exponent: (xy)ᵃ = xᵃyᵃ." },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs, { hint: "Each base in the bracket gets the power. A negative power flips a fraction over.", answerLabel: it.ans });
  },

  /* the same-base gate */
  sameBase: () => ynQ(CON,
    "Before you can add or subtract exponents, the <b>bases must be the same</b>. True or false?",
    true,
    { hint: "xᵃ·xᵇ = xᵃ⁺ᵇ only works when the base x is shared.",
      answerLabel: "True — the laws only apply when the bases match. xᵃ·yᵇ (different bases) can’t be combined." }),
};

export const questEs1 = {
  id: "es1",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
