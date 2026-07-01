/* ============================================================
   EXPONENTS & SURDS · Q4 — Which "divorce" (factorising type)?
   ------------------------------------------------------------
   Given an exponential expression with a + or − in it, decide:
   common factor / difference of squares / trinomial / grouping,
   plus the "let k = baseˣ" substitution and the baseˣ > 0
   restriction.
   ============================================================ */
import { mc, ynQ, pick } from "./_exp.js";

const CON = "divorceTypes";
const TYPES = ["Common factor", "Difference of squares", "Trinomial", "Grouping"];
const wrongsFor = (t) => TYPES.filter((x) => x !== t);

/* each item: an expression and its true factorising type */
const POOL = [
  { e: "3ˣ⁺² − 3ˣ", t: "Common factor", why: "Two terms that both contain 3ˣ → take out the common factor 3ˣ." },
  { e: "2ˣ⁺¹ + 2ˣ", t: "Common factor", why: "Both terms contain 2ˣ → take out 2ˣ: 2ˣ(2 + 1)." },
  { e: "5ˣ⁺¹ − 5ˣ⁻¹", t: "Common factor", why: "Both contain a power of 5 → take out the smallest, 5ˣ⁻¹." },
  { e: "7·2ˣ + 2ˣ⁺¹", t: "Common factor", why: "Both terms contain 2ˣ → factor it out." },

  { e: "2²ˣ − 9", t: "Difference of squares", why: "Two terms, a subtraction, both squares: (2ˣ)² − 3². Let k = 2ˣ → k² − 9." },
  { e: "9ˣ − 16", t: "Difference of squares", why: "9ˣ = (3ˣ)² and 16 = 4², a subtraction of two squares. Let k = 3ˣ → k² − 16." },
  { e: "25 − 4ˣ", t: "Difference of squares", why: "5² − (2ˣ)², a difference of two squares. Let k = 2ˣ → 25 − k²." },

  { e: "3²ˣ − 3ˣ − 6", t: "Trinomial", why: "Three terms with (3ˣ)², 3ˣ and a constant. Let k = 3ˣ → k² − k − 6." },
  { e: "2²ˣ − 5·2ˣ + 4", t: "Trinomial", why: "Three terms in 2ˣ. Let k = 2ˣ → k² − 5k + 4." },
  { e: "9ˣ + 3ˣ − 12", t: "Trinomial", why: "9ˣ = (3ˣ)², so it’s k² + k − 12 with k = 3ˣ." },

  { e: "a·2ˣ + a + 2ˣ + 1", t: "Grouping", why: "Four terms in two pairs: a(2ˣ+1) + (2ˣ+1) = (a+1)(2ˣ+1)." },
  { e: "x·3ˣ + 3ˣ + 2x + 2", t: "Grouping", why: "Four terms: 3ˣ(x+1) + 2(x+1) = (3ˣ+2)(x+1)." },
  { e: "p·5ˣ − 5ˣ + p − 1", t: "Grouping", why: "Four terms: 5ˣ(p−1) + (p−1) = (5ˣ+1)(p−1)." },
];

const SKILLS = {
  classify1: () => { const it = pick(POOL); return mc(CON, `Which factorising method fits?<br><b>${it.e}</b>`, it.t, wrongsFor(it.t), { hint: "Count the terms; look for a common power, two squares, three terms, or two pairs.", answerLabel: it.why }); },
  classify2: () => { const it = pick(POOL); return mc(CON, `Which factorising method fits?<br><b>${it.e}</b>`, it.t, wrongsFor(it.t), { hint: "2 squares & a minus = difference of squares · 3 terms = trinomial · shared power = common factor · 4 terms = grouping.", answerLabel: it.why }); },
  classify3: () => { const it = pick(POOL); return mc(CON, `Which factorising method fits?<br><b>${it.e}</b>`, it.t, wrongsFor(it.t), { hint: "Remember 4ˣ = (2ˣ)² and 9ˣ = (3ˣ)² — that often reveals a square.", answerLabel: it.why }); },

  /* the substitution */
  substitution: () => {
    const items = [
      { e: "2²ˣ − 5·2ˣ + 4", k: "Let k = 2ˣ", wrongs: ["Let k = 2²ˣ", "Let k = x", "Let k = 4"], ans: "Let k = 2ˣ; then 2²ˣ = k², giving k² − 5k + 4." },
      { e: "9ˣ + 3ˣ − 12", k: "Let k = 3ˣ", wrongs: ["Let k = 9ˣ", "Let k = 9", "Let k = x"], ans: "9ˣ = (3ˣ)², so let k = 3ˣ → k² + k − 12." },
      { e: "3²ˣ − 3ˣ − 6", k: "Let k = 3ˣ", wrongs: ["Let k = 3²ˣ", "Let k = 6", "Let k = x"], ans: "Let k = 3ˣ; 3²ˣ = k², giving k² − k − 6." },
    ];
    const it = pick(items);
    return mc(CON, `Which substitution turns <b>${it.e}</b> into an ordinary quadratic?`, it.k, it.wrongs, { hint: "Let k be the SINGLE power (baseˣ); then base²ˣ becomes k².", answerLabel: it.ans });
  },

  /* the restriction after factorising */
  restriction: () => ynQ(CON,
    "After a trinomial gives roots like <b>k = 4</b> or <b>k = −9</b> (with k = 3ˣ), you keep <b>both</b> roots. True or false?",
    false,
    { hint: "Can 3ˣ ever be a negative number?", answerLabel: "False — 3ˣ is always positive, so k = −9 is rejected; only k = 4 (3ˣ = 4) gives a solution." }),

  /* number of terms → method */
  byShape: () => {
    const items = [
      { q: "An expression has <b>three terms</b> (a squared power, a single power and a constant). Which method?", correct: "Trinomial", wrongs: ["Difference of squares", "Common factor", "Grouping"], ans: "Three terms in one power → trinomial (let k = baseˣ)." },
      { q: "An expression has <b>two terms</b>, a subtraction, and both are perfect squares. Which method?", correct: "Difference of squares", wrongs: ["Trinomial", "Common factor", "Grouping"], ans: "Two squares with a minus → difference of squares." },
      { q: "An expression has <b>four terms</b> that split into two matching pairs. Which method?", correct: "Grouping", wrongs: ["Trinomial", "Difference of squares", "Common factor"], ans: "Four terms in two pairs → grouping." },
    ];
    const it = pick(items);
    return mc(CON, it.q, it.correct, it.wrongs, { hint: "The number of terms and their shape pick the method.", answerLabel: it.ans });
  },
};

export const questEs4 = {
  id: "es4",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
