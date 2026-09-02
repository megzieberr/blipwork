/* ============================================================
   EXPONENTS & SURDS · Q6 — Conjugates & rationalising
   ------------------------------------------------------------
   What the conjugate is, why it works (difference of squares),
   how to rationalise one- and two-term denominators, and the
   a + b√c form.

   PARAMETRISED 2026-08-23 (dice wave 2 — DICE-COMMON's CARE rule).
   DICE-AUDIT §11 marked five of the seven skills CARE (findConjugate,
   conjugateProduct, rationaliseSingle, rationaliseTwo, abForm): each
   was 2–3 concrete surds with a clearly parametrisable pattern. Each
   is now a small set of SHAPES — the same shapes the fixed items had
   (√a ± b, √a ± √b, b ± √a, a two-term denominator either way round)
   — with rolled numbers and honestly recomputed answers and decoys.
   Every surd draws from NONSQ (non-square radicands), so a rolled
   root never quietly becomes an integer. whyConjugate / equalsOne
   were CLEAN and are untouched.
   ============================================================ */
import { mc, ynQ, pick, randInt, NONSQ, gcd, sgn } from "./_exp.js";

const CONJ = "conjugates";
const RAT = "rationalise";
const VARS = ["x", "y", "a", "m"];

const SKILLS = {
  /* what is the conjugate — three shapes, one per fixed item that was
     here before. The third decoy is always the conjugate PRODUCT (the
     misconception the vetted answer text calls out by name). */
  findConjugate: () => {
    const shapes = [
      /* √a + b  →  √a − b   (product a − b², never 0: a is non-square) */
      () => {
        const a = pick(NONSQ), b = randInt(1, 5), p = a - b * b;
        return {
          q: `What is the <b>conjugate</b> of √${a} + ${b}?`, correct: `√${a} − ${b}`,
          wrongs: [`√${a} + ${b}`, `−√${a} − ${b}`, sgn(p)],
          ans: `Flip the middle sign: the conjugate of √${a} + ${b} is √${a} − ${b}. (The ${sgn(p)} is the conjugate PRODUCT (√${a}+${b})(√${a}−${b}), not the conjugate itself.)`,
          sol: [
            { s: `The conjugate keeps BOTH terms exactly as they are — only the middle sign flips` },
            { s: `√${a} + ${b} → √${a} − ${b}` },
            { s: `Multiplying the two together is what kills the surd: (√${a})² − ${b}² = ${sgn(p)}`, r: `${sgn(p)} is the PRODUCT, not the conjugate` },
          ],
        };
      },
      /* √a − √b  →  √a + √b   (product a − b; a ≠ b keeps it non-zero) */
      () => {
        let a, b;
        do { a = pick(NONSQ); b = pick(NONSQ); } while (a === b);
        const p = a - b;
        return {
          q: `What is the <b>conjugate</b> of √${a} − √${b}?`, correct: `√${a} + √${b}`,
          wrongs: [`√${b} − √${a}`, `√${a} − √${b}`, sgn(p)],
          ans: `Flip the middle sign: √${a} − √${b} → √${a} + √${b}. (${sgn(p)} is the conjugate PRODUCT (√${a})² − (√${b})², not the conjugate.)`,
          sol: [
            { s: `Both terms stay where they are — the order does not change and neither term gains a minus` },
            { s: `Only the middle sign flips: √${a} − √${b} → √${a} + √${b}` },
            { s: `Their product is (√${a})² − (√${b})² = ${a} − ${b} = ${sgn(p)}`, r: "that is the point of the conjugate — both roots die" },
          ],
        };
      },
      /* b + √a  →  b − √a   (product b² − a) */
      () => {
        const a = pick(NONSQ), b = randInt(1, 5), p = b * b - a;
        return {
          q: `What is the <b>conjugate</b> of ${b} + √${a}?`, correct: `${b} − √${a}`,
          wrongs: [`−${b} − √${a}`, `${b} + √${a}`, sgn(p)],
          ans: `Same two terms, opposite middle sign: ${b} − √${a}. (${sgn(p)} is the conjugate PRODUCT ${b}² − (√${a})², not the conjugate.)`,
          sol: [
            { s: `The conjugate keeps both terms and only flips the middle sign` },
            { s: `${b} + √${a} → ${b} − √${a}`, r: `the minus goes in the MIDDLE, not in front of the ${b}` },
            { s: `Their product is ${b}² − (√${a})² = ${sgn(p)}`, r: "no surd left — which is why we use it" },
          ],
        };
      },
    ];
    const it = pick(shapes)();
    return mc(CONJ, it.q, it.correct, it.wrongs, { hint: "Keep both terms exactly the same; just change the + to − (or − to +).", answerLabel: it.ans, solution: it.sol });
  },

  /* why use the conjugate */
  whyConjugate: () => mc(CONJ,
    "Why do we multiply by the conjugate when rationalising a two-term denominator?",
    "The denominator becomes a difference of squares, so the surd disappears",
    ["It makes the numerator a perfect square", "It cancels the whole fraction", "It changes the value to a whole number"],
    { hint: "(√a + b)(√a − b) = (√a)² − b² — what happens to the root?",
      answerLabel: "(√a + b)(√a − b) = a − b², a difference of squares with NO surd left on the bottom.",
      solution: [
        { s: "Multiply the two brackets out: (√a + b)(√a − b) = a − b√a + b√a − b²" },
        { s: "The two middle terms are opposites, so they cancel", r: "that only happens because the signs are opposite" },
        { s: "What is left is a − b² — a plain number with no root in it", r: "so the denominator is rationalised" },
      ] }),

  /* conjugate product — the same three shapes, decoys recomputed:
     dropped the second square, ADDED instead of subtracted, kept the
     cross terms / left the root on. */
  conjugateProduct: () => {
    const shapes = [
      /* (√a + b)(√a − b) = a − b²  (guard a − b² ≥ 1: a positive answer,
         and it can never collide with the a + b² decoy) */
      () => {
        let a, b;
        do { a = pick(NONSQ); b = randInt(1, 3); } while (a - b * b < 1);
        return {
          q: `Simplify <b>(√${a} + ${b})(√${a} − ${b})</b>.`, correct: `${a - b * b}`,
          wrongs: [`√${a}`, `${a + b * b}`, `2√${a}`],
          ans: `Difference of squares: (√${a})² − ${b}² = ${a} − ${b * b} = ${a - b * b}.`,
          sol: [
            { s: `Same two terms with opposite middle signs, so the cross terms cancel`, r: "diff in □'s" },
            { s: `(√${a})² − ${b}² = ${a} − ${b * b}` },
            { s: `= ${a - b * b}`, r: "squaring a root undoes it, so no surd survives" },
          ],
        };
      },
      /* (√a + √b)(√a − √b) = a − b  (guard a > b) */
      () => {
        let a, b;
        do { a = pick(NONSQ); b = pick(NONSQ); } while (a - b < 1);
        return {
          q: `Simplify <b>(√${a} + √${b})(√${a} − √${b})</b>.`, correct: `${a - b}`,
          wrongs: [`√${a + b}`, `${a + b}`, `√${a - b}`],
          ans: `(√${a})² − (√${b})² = ${a} − ${b} = ${a - b}.`,
          sol: [
            { s: `Opposite middle signs, so the two cross terms cancel`, r: "diff in □'s" },
            { s: `(√${a})² − (√${b})² = ${a} − ${b}` },
            { s: `= ${a - b}`, r: "both roots are squared away — the answer is a plain number" },
          ],
        };
      },
      /* (√v + c)(√v − c) = v − c²  (c ≥ 2 so c² ≠ c) */
      () => {
        const v = pick(VARS), c = randInt(2, 6);
        return {
          q: `Simplify <b>(√${v} + ${c})(√${v} − ${c})</b>.`, correct: `${v} − ${c * c}`,
          wrongs: [`${v} + ${c * c}`, `√${v} − ${c * c}`, `${v} − ${c}`],
          ans: `(√${v})² − ${c}² = ${v} − ${c * c}.`,
          sol: [
            { s: `Opposite middle signs, so the cross terms cancel`, r: "diff in □'s" },
            { s: `(√${v})² − ${c}² = ${v} − ${c * c}` },
            { s: `The √${v} squared gives just ${v}`, r: `and ${c}² = ${c * c}` },
          ],
        };
      },
    ];
    const it = pick(shapes)();
    return mc(CONJ, it.q, it.correct, it.wrongs, { hint: "(first)² − (second)² — the cross terms cancel.", answerLabel: it.ans, solution: it.sol });
  },

  /* rationalise single term.  gcd(c, a) = 1 keeps the worked answer
     c√a/a in lowest terms (her "simplify once, at the end" habit);
     c ≠ a keeps every option label distinct. */
  rationaliseSingle: () => {
    let c, a;
    do { c = randInt(1, 6); a = pick(NONSQ); } while (gcd(c, a) !== 1 || c === a);
    return mc(RAT, `To rationalise <b>${c}/√${a}</b>, multiply top and bottom by:`,
      `√${a} / √${a}`, [`${a} / ${a}`, `${c} / √${a}`, `√${a} / ${c}`],
      { hint: "Multiply by the surd over itself — that’s multiplying by 1.",
        answerLabel: `Multiply by √${a}/√${a} (= 1): ${c}/√${a} × √${a}/√${a} = ${c === 1 ? "" : c}√${a}/${a}.`,
        solution: [
          { s: `The bottom is a single surd, √${a}, so multiply top and bottom by that same surd` },
          { s: `√${a}/√${a} is just 1, so the VALUE does not change — only the form does` },
          { s: `${c}/√${a} × √${a}/√${a} = ${c === 1 ? "" : c}√${a}/${a}`, r: `√${a} × √${a} = ${a}, so the bottom is rational` },
        ] });
  },

  /* rationalise two terms — both orders of the denominator, same three
     decoys: no flip at all, the single surd, and a top/bottom mismatch. */
  rationaliseTwo: () => {
    const shapes = [
      () => {
        const c = randInt(2, 7), p = randInt(1, 5), a = pick(NONSQ);
        return {
          q: `To rationalise <b>${c}/(${p} + √${a})</b>, multiply top and bottom by:`,
          correct: `(${p} − √${a})/(${p} − √${a})`,
          wrongs: [`(${p} + √${a})/(${p} + √${a})`, `√${a}/√${a}`, `(${p} − √${a})/(${p} + √${a})`],
          ans: `Multiply by the conjugate over itself: (${p} − √${a})/(${p} − √${a}). It must be the SAME thing top and bottom (×1), or the value changes.`,
          sol: [
            { s: `The bottom has TWO terms, so a single surd will not clear it — use the conjugate` },
            { s: `Conjugate of ${p} + √${a} is ${p} − √${a}`, r: "flip the middle sign only" },
            { s: `Put it top AND bottom: (${p} − √${a})/(${p} − √${a}) = 1`, r: `the bottom becomes ${p}² − ${a}, with no surd` },
          ],
        };
      },
      () => {
        const c = randInt(2, 7), p = randInt(1, 5), a = pick(NONSQ);
        return {
          q: `To rationalise <b>${c}/(√${a} − ${p})</b>, multiply top and bottom by:`,
          correct: `(√${a} + ${p})/(√${a} + ${p})`,
          wrongs: [`(√${a} − ${p})/(√${a} − ${p})`, `√${a}/√${a}`, `(${p} − √${a})/(${p} − √${a})`],
          ans: `Use the conjugate of √${a} − ${p}, which is √${a} + ${p}.`,
          sol: [
            { s: `Two terms on the bottom, so the conjugate is the tool` },
            { s: `Conjugate of √${a} − ${p} is √${a} + ${p}`, r: "same terms, middle sign flipped" },
            { s: `Multiply top AND bottom by it, so you are multiplying by 1`, r: `the bottom becomes ${a} − ${p * p}, with no surd` },
          ],
        };
      },
    ];
    const it = pick(shapes)();
    return mc(RAT, it.q, it.correct, it.wrongs, { hint: "Two terms on the bottom → use the conjugate (flip the middle sign) over itself.", answerLabel: it.ans, solution: it.sol });
  },

  /* multiplying by denom/denom = ×1 */
  equalsOne: () => ynQ(RAT,
    "Multiplying the numerator and denominator by the <b>same</b> surd changes the <b>value</b> of the fraction. True or false?",
    false,
    { hint: "Anything over itself is 1.", answerLabel: "False — it’s the same as multiplying by 1, so the value is unchanged; only the form changes.",
      solution: [
        { s: "Anything over itself equals 1 — √7/√7 = 1, just like 5/5 = 1" },
        { s: "Multiplying by 1 cannot change what a number is worth" },
        { s: "∴ false — only the FORM changes, which is exactly why rationalising is allowed" },
      ] }),

  /* a + b√c form.  m = the rational part, n = the surd's coefficient.
     Guards: m ≠ 0 (else the flipped-a decoy collides) and |n| ≠ r (else
     the "b is the radicand" decoy collides). When the rational part is
     negative and the surd positive the expression is written surd-first
     (√5 − 1), exactly like the second fixed item. */
  abForm: () => {
    let m, n, r;
    do { m = randInt(-5, 5); n = pick([-2, -1, 1, 2]); r = pick(NONSQ); } while (m === 0 || Math.abs(n) === r);
    const coef = Math.abs(n) === 1 ? "" : String(Math.abs(n));
    const expr = (m < 0 && n > 0)
      ? `${coef}√${r} − ${Math.abs(m)}`
      : `${sgn(m)} ${n < 0 ? "−" : "+"} ${coef}√${r}`;
    const lab = (A, B) => `a = ${sgn(A)}, b = ${sgn(B)}`;
    const bTerm = n < 0 ? `(${sgn(n)})` : `${n}`;
    return mc(RAT, `A rationalised answer is <b>${expr}</b>. Written as a + b√c, what are a and b?`,
      lab(m, n), [lab(m, -n), lab(-m, -n), lab(m, Math.sign(n) * r)],
      { hint: "a is the plain (rational) part; b is the number in front of the surd — keep its sign.",
        answerLabel: `${expr} = ${sgn(m)} + ${bTerm}·√${r}, so a = ${sgn(m)} and b = ${sgn(n)}.`,
        solution: [
          { s: `Line the answer up with the pattern a + b√c: ${expr} = ${sgn(m)} + ${bTerm}·√${r}` },
          { s: `a is the plain part with no root on it, so a = ${sgn(m)}` },
          { s: `b is the number sitting in front of the root, sign and all, so b = ${sgn(n)}`, r: `c is ${r}, the number INSIDE the root` },
        ] });
  },
};

export const questEs6 = {
  id: "es6",
  skills: [
    { id: "findConjugate", concept: CONJ, gen: SKILLS.findConjugate },
    { id: "whyConjugate", concept: CONJ, gen: SKILLS.whyConjugate },
    { id: "conjugateProduct", concept: CONJ, gen: SKILLS.conjugateProduct },
    { id: "rationaliseSingle", concept: RAT, gen: SKILLS.rationaliseSingle },
    { id: "rationaliseTwo", concept: RAT, gen: SKILLS.rationaliseTwo },
    { id: "equalsOne", concept: RAT, gen: SKILLS.equalsOne },
    { id: "abForm", concept: RAT, gen: SKILLS.abForm },
  ],
};
