/* ============================================================
   EXPONENTS & SURDS · Q3 — First step & which method
   ------------------------------------------------------------
   What to do FIRST (prime factors), one-term simplify vs the
   "divorce" (factorise) when there's a + or −, and the rule
   for when you may cancel.
   ============================================================ */
import { mc, ynQ, pick } from "./_exp.js";

const CON = "simplifySteps";

const SKILLS = {
  /* the universal first step */
  firstStep: () => {
    const bases = pick(["8, 9 and 27", "16 and 32", "4ⁿ and 72ⁿ", "25 and 125"]);
    return mc(CON,
      `An expression mixes bases like <b>${bases}</b>. What is the <b>first</b> step to simplify it?`,
      "Rewrite every base as a product of prime factors",
      ["Add the exponents straight away", "Multiply all the bases together", "Cancel the common terms first"],
      { hint: "You can only use the laws once every base is written as the same prime base.",
        answerLabel: "Rewrite each base as prime factors (8 = 2³, 9 = 3², 27 = 3³ …) so the bases match." });
  },

  /* one-term (× / ÷ only) → add/subtract exponents */
  oneTerm: () => mc(CON,
    "An expression is one big fraction of powers — everything is <b>multiplied or divided</b>, with NO + or − between terms. What do you do?",
    "Multiply the brackets out, then add/subtract the exponents of the same base",
    ["Take out a common factor first", "Use difference of squares", "Let k = the base and make a quadratic"],
    { hint: "No + or − means it’s a single term — just the laws on the exponents.",
      answerLabel: "With only × and ÷ you apply the laws directly: multiply out, then add/subtract exponents." }),

  /* + or − present → must factorise */
  plusMinus: () => mc(CON,
    "There is a <b>+ or − between the terms</b> (e.g. 3ˣ⁺² − 3ˣ). Can you just add the exponents?",
    "No — you must factorise (take out a common factor) first",
    ["Yes — add the exponents as usual", "Yes — subtract the exponents", "No — you must cancel a term from the top and bottom"],
    { hint: "The laws (add/subtract exponents) only work across × and ÷, never across + and −.",
      answerLabel: "A + or − blocks the laws. Split the powers and factorise — usually take out a common factor." }),

  /* like powers add like terms */
  likeTerms: () => {
    const items = [
      { q: "Simplify <b>2ˣ + 2ˣ</b>.", correct: "2·2ˣ", wrongs: ["2²ˣ", "4ˣ", "2ˣ²"], ans: "Adding two of the same thing: 2ˣ + 2ˣ = 2·2ˣ (just like x + x = 2x)." },
      { q: "Simplify <b>5·3ˣ − 3ˣ</b>.", correct: "4·3ˣ", wrongs: ["5·3ˣ", "2·3ˣ", "5"], ans: "They’re like terms in 3ˣ: 5·3ˣ − 1·3ˣ = 4·3ˣ." },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs, { hint: "Treat the matching power as a “like term”, exactly like x + x = 2x.", answerLabel: it.ans });
  },

  /* the cancelling rule */
  cancel: () => ynQ(CON,
    "You may cancel a power from the top and bottom only when it is a factor of the <b>whole</b> top and <b>whole</b> bottom (caged in brackets). True or false?",
    true,
    { hint: "You can never cancel a single term out of a sum like (3ˣ + 1).",
      answerLabel: "True — cancel only common FACTORS of the whole line, never one term out of a sum." }),

  /* the k-method for huge exponents */
  kMethod: () => {
    const items = [
      { q: "Simplify <b>(5²⁰⁰⁷ + 5²⁰¹⁰) / (5²⁰⁰⁸ + 5²⁰⁰⁹)</b>. The exponents are huge but close together. Which method?",
        correct: "The k-method: let k = 2008, rewrite each exponent as k−1, k, k+1 …, then factor out 5ᵏ",
        wrongs: ["Type it straight into the calculator", "Cancel 5²⁰⁰⁷ against 5²⁰⁰⁸", "Equate the exponents"],
        ans: "Let k = 2008: the exponents become k−1, k+2, k and k+1. Divorce each power, take out 5ᵏ top and bottom, and it cancels — the calculator can’t hold numbers this big, and you may never cancel single terms across a +." },
      { q: "Simplify <b>(3¹⁰⁰ + 3¹⁰²) / 3¹⁰¹</b>. The exponents are huge but close together. Which method?",
        correct: "The k-method: let k = 101, rewrite each exponent as k−1, k, k+1 …, then factor out 3ᵏ",
        wrongs: ["Type it straight into the calculator", "Cancel 3¹⁰⁰ against 3¹⁰¹", "Equate the exponents"],
        ans: "Let k = 101: (3ᵏ⁻¹ + 3ᵏ⁺¹)/3ᵏ = 3ᵏ(3⁻¹ + 3)/3ᵏ = ⅓ + 3 = 10/3. Factor out the k-power; never cancel one term out of a sum." },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs,
      { hint: "The exponents differ by tiny amounts — call the middle one k and write the rest relative to it.", answerLabel: it.ans });
  },

  /* order the steps */
  order: () => {
    const correct = "① prime factors  ②  multiply out / add exponents  ③ simplify";
    return mc(CON,
      "Put the simplifying steps in the right <b>order</b> (for a one-term expression):",
      correct,
      ["① simplify  ②  prime factors  ③ multiply out",
       "① multiply out  ②  prime factors  ③ add exponents",
       "① add exponents  ②  prime factors  ③ simplify"],
      { hint: "You can’t apply the laws until the bases are prime; simplifying comes last.",
        answerLabel: "Prime-factorise first, then use the laws on the exponents, then tidy up." });
  },
};

export const questEs3 = {
  id: "es3",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
