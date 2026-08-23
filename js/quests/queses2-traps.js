/* ============================================================
   EXPONENTS & SURDS · Q2 — Spot the trap (laws)
   ------------------------------------------------------------
   Is this step legal? The classic exponent mistakes: the base
   that shouldn't change, x⁰, negative-exponent ≠ negative,
   the exponent on the whole bracket, (x+y)² ≠ x²+y².

   PARAMETRISED 2026-08-23 (dice wave 2 — sessions/DICE-COMMON.md's
   CARE rule). DICE-AUDIT §11 classified all six skills CARE: the ten
   yes/no traps and the four "fix it" mistakes were fixed worked
   numbers. Every bank item is now a TEMPLATE that rolls its own
   numbers and computes its own answer text — but the TRAP TYPES are
   untouched: the same ten misconceptions in the same order, the same
   four broken steps, the same wording, the same hints. No new trap
   was invented and no decoy family was widened: in this quest the
   wrong options ARE the teaching content.
   Static play is unaffected — gen() still just calls pick()/randInt(),
   which route through js/rng.js (Math.random outside a dice round).
   ============================================================ */
import { mc, ynQ, pick, randInt, usup, upw } from "./_exp.js";

const CON = "expTraps";

const LETTERS = ["x", "a", "m", "p"];
/* base pairs for the two-letter traps. `a`/`b` are kept out of the pairs
   that carry SYMBOLIC exponents (xᵃ · yᵇ), so a base can never collide
   with an exponent letter. */
const PAIRS = [["x", "y"], ["a", "b"], ["p", "q"], ["m", "n"]];
const PAIRS_NOAB = [["x", "y"], ["p", "q"], ["m", "n"]];

/* ---- yes/no trap bank — ten templates, one per misconception.
   Each returns { q, yes, ans }: exactly the shape the fixed items had.
   `yes` = "is the statement correct?" ---- */
const YN = [
  /* 1 · the base must NOT change (add the exponents, keep the base) */
  () => {
    let b, p, q;
    do { b = pick([2, 3, 5]); p = randInt(2, 4); q = randInt(2, 4); } while (Math.pow(b, p + q) > 20000);
    return {
      q: `Is this correct?<br><b>${upw(b, p)} · ${upw(b, q)} = ${upw(b * b, p + q)}</b>`,
      yes: false,
      ans: `No — the base stays ${b}. It is ${upw(b, p)}·${upw(b, q)} = ${upw(b, p + q)} = ${Math.pow(b, p + q)}.`,
    };
  },
  /* 2 · quotient rule, correctly applied (a TRUE one) */
  () => {
    const b = pick([2, 3, 5, 7]);
    const p = randInt(4, 9), q = randInt(2, p - 2);      // p − q ≥ 2, so the answer never reads "b¹"
    return {
      q: `Is this correct?<br><b>${upw(b, p)} ÷ ${upw(b, q)} = ${upw(b, p - q)}</b>`,
      yes: true,
      ans: `Yes — same base, so subtract the exponents: ${p} − ${q} = ${p - q}.`,
    };
  },
  /* 3 · x⁰ is 1, not 0 */
  () => {
    const v = pick(LETTERS);
    return {
      q: `Is this correct?<br><b>${upw(v, 0)} = 0</b>`,
      yes: false,
      ans: "No — anything non-zero to the power 0 is 1, not 0.",
    };
  },
  /* 4 · only the letter carries the zero exponent (a TRUE one) */
  () => {
    const v = pick(LETTERS), c = randInt(2, 9);
    return {
      q: `Is this correct?<br><b>${c}${upw(v, 0)} = ${c}</b> &nbsp;(${v} ≠ 0)`,
      yes: true,
      ans: `Yes — only ${v} is to the power 0 (= 1), so ${c}·1 = ${c}.`,
    };
  },
  /* 5 · the coefficient inside the bracket gets the power too.
     The OUTER power stays 2 so "is squared too" stays literally true. */
  () => {
    const v = pick(LETTERS), c = randInt(2, 9), m = randInt(2, 5);
    return {
      q: `Is this correct?<br><b>(${c}${upw(v, m)})² = ${c}${upw(v, 2 * m)}</b>`,
      yes: false,
      ans: `No — the ${c} is squared too: (${c}${upw(v, m)})² = ${c * c}${upw(v, 2 * m)}.`,
    };
  },
  /* 6 · a negative exponent is a reciprocal, not a minus */
  () => {
    const v = pick(LETTERS), n = randInt(2, 5);
    return {
      q: `Is this correct?<br><b>${upw(v, `-${n}`)} = −${upw(v, n)}</b>`,
      yes: false,
      ans: `No — a negative exponent means a reciprocal: ${upw(v, `-${n}`)} = 1/${upw(v, n)} (a positive value).`,
    };
  },
  /* 7 · you cannot split a power over a sum. Power stays 2 — the
     answer line is the vetted (x+y)² = x² + 2xy + y² expansion. */
  () => {
    const [u, w] = pick(PAIRS);
    return {
      q: `Is this correct?<br><b>(${u} + ${w})² = ${upw(u, 2)} + ${upw(w, 2)}</b>`,
      yes: false,
      ans: `No — you can’t split a power over a sum. (${u}+${w})² = ${upw(u, 2)} + 2${u}${w} + ${upw(w, 2)}.`,
    };
  },
  /* 8 · different bases can't be combined (fully symbolic) */
  () => {
    const [u, w] = pick(PAIRS_NOAB);
    return {
      q: `Is this correct?<br><b>${upw(u, "a")} · ${upw(w, "b")} = (${u}${w})${usup("a+b")}</b>`,
      yes: false,
      ans: "No — different bases can’t be combined. The laws need the SAME base.",
    };
  },
  /* 9 · every base in the bracket gets the power (a TRUE one) */
  () => {
    let c, n;
    do { c = randInt(2, 5); n = randInt(2, 4); } while (Math.pow(c, n) > 625);
    const v = pick(LETTERS);
    return {
      q: `Is this correct?<br><b>(${c}${v})${usup(n)} = ${Math.pow(c, n)}${upw(v, n)}</b>`,
      yes: true,
      ans: `Yes — every base in the bracket gets the power: ${upw(c, n)} = ${Math.pow(c, n)} and ${upw(v, n)}.`,
    };
  },
  /* 10 · a negative exponent gives a POSITIVE value (a TRUE one) */
  () => {
    let b, n;
    do { b = randInt(2, 5); n = randInt(2, 4); } while (Math.pow(b, n) > 625);
    return {
      q: `Is this correct?<br><b>${upw(b, `-${n}`)} = 1/${Math.pow(b, n)}</b>`,
      yes: true,
      ans: `Yes — ${upw(b, `-${n}`)} = 1/${upw(b, n)} = 1/${Math.pow(b, n)}. The value is positive.`,
    };
  },
];

/* ---- mc — name the actual mistake. Four templates, the same four
   broken steps as before; the decoys stay the same three misreadings. ---- */
const FIX = [
  /* 1 · the base was changed */
  () => {
    let b, p, q;
    do { b = pick([2, 3, 5]); p = randInt(2, 4); q = randInt(2, 4); } while (Math.pow(b, p + q) > 20000);
    return {
      q: `What is wrong with <b>${upw(b, p)} · ${upw(b, q)} = ${upw(b * b, p + q)}</b>?`,
      correct: `The base should stay ${b} (answer ${upw(b, p + q)}), not become ${b * b}`,
      wrongs: ["The exponents should be multiplied", "The exponents should be subtracted", "Nothing — it is correct"],
      ans: `Add the exponents but KEEP the base: ${upw(b, p)}·${upw(b, q)} = ${upw(b, p + q)}.`,
    };
  },
  /* 2 · the coefficient was left un-powered. The OUTER power stays 3 so
     "must also be cubed" stays literally true; the second decoy is the
     add-instead-of-multiply exponent, computed from the same roll. */
  () => {
    const v = pick(LETTERS), c = randInt(2, 5), m = randInt(2, 4);
    return {
      q: `What is wrong with <b>(${c}${upw(v, m)})³ = ${c}${upw(v, 3 * m)}</b>?`,
      correct: `The ${c} must also be cubed → ${c * c * c}${upw(v, 3 * m)}`,
      wrongs: ["The exponents should be added", `${v} should be ${upw(v, m + 3)}`, "Nothing — it is correct"],
      ans: `The power hits everything in the bracket: (${c}${upw(v, m)})³ = ${upw(c, 3)}${upw(v, 3 * m)} = ${c * c * c}${upw(v, 3 * m)}.`,
    };
  },
  /* 3 · negative exponent read as a minus sign */
  () => {
    const v = pick(LETTERS), n = randInt(2, 5);
    return {
      q: `What is wrong with <b>${upw(v, `-${n}`)} = −${upw(v, n)}</b>?`,
      correct: `A negative exponent gives a reciprocal: 1/${upw(v, n)}`,
      wrongs: [`It should be −1/${upw(v, n)}`, `It should be ${upw(v, n)}`, "Nothing — it is correct"],
      ans: `${upw(v, `-${n}`)} = 1/${upw(v, n)} — positive, not negative.`,
    };
  },
  /* 4 · different bases combined. Guard p·q ≠ p+q so the "multiplied
     the exponents" decoy can never equal the shown (wrong) answer. */
  () => {
    const [u, w] = pick(PAIRS);
    let p, q;
    do { p = randInt(2, 6); q = randInt(2, 6); } while (p * q === p + q);
    return {
      q: `What is wrong with <b>${upw(u, p)} · ${upw(w, q)} = (${u}${w})${usup(p + q)}</b>?`,
      correct: "Different bases — they can’t be combined",
      wrongs: ["The exponents should be multiplied", `It should be (${u}${w})${usup(p * q)}`, "Nothing — it is correct"],
      ans: `The product rule needs the SAME base; ${u} and ${w} stay separate.`,
    };
  },
];

const SKILLS = {
  trap1: () => { const it = pick(YN)(); return ynQ(CON, it.q, it.yes, { hint: "Watch the base, the bracket, and the sign of the exponent.", answerLabel: it.ans }); },
  trap2: () => { const it = pick(YN)(); return ynQ(CON, it.q, it.yes, { hint: "Does a law actually apply here? Same base? Whole bracket?", answerLabel: it.ans }); },
  trap3: () => { const it = pick(YN)(); return ynQ(CON, it.q, it.yes, { hint: "x⁰ = 1, a negative exponent flips, and you can’t split (x+y)ⁿ.", answerLabel: it.ans }); },
  fixIt1: () => { const it = pick(FIX)(); return mc(CON, it.q, it.correct, it.wrongs, { hint: "Find the single broken rule.", answerLabel: it.ans }); },
  fixIt2: () => { const it = pick(FIX)(); return mc(CON, it.q, it.correct, it.wrongs, { hint: "Find the single broken rule.", answerLabel: it.ans }); },
  trap4: () => { const it = pick(YN)(); return ynQ(CON, it.q, it.yes, { hint: "Check it against the laws one piece at a time.", answerLabel: it.ans }); },
};

export const questEs2 = {
  id: "es2",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
