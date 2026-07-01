/* ============================================================
   EXPONENTS & SURDS · Q2 — Spot the trap (laws)
   ------------------------------------------------------------
   Is this step legal? The classic exponent mistakes: the base
   that shouldn't change, x⁰, negative-exponent ≠ negative,
   the exponent on the whole bracket, (x+y)² ≠ x²+y².
   ============================================================ */
import { mc, ynQ, pick } from "./_exp.js";

const CON = "expTraps";

/* yes/no trap bank — `yes` = "is the statement correct?" */
const YN = [
  { q: "Is this correct?<br><b>2³ · 2² = 4⁵</b>", yes: false, ans: "No — the base stays 2. It is 2³·2² = 2⁵ = 32." },
  { q: "Is this correct?<br><b>5⁶ ÷ 5⁴ = 5²</b>", yes: true, ans: "Yes — same base, so subtract the exponents: 6 − 4 = 2." },
  { q: "Is this correct?<br><b>x⁰ = 0</b>", yes: false, ans: "No — anything non-zero to the power 0 is 1, not 0." },
  { q: "Is this correct?<br><b>3x⁰ = 3</b> &nbsp;(x ≠ 0)", yes: true, ans: "Yes — only x is to the power 0 (= 1), so 3·1 = 3." },
  { q: "Is this correct?<br><b>(3x³)² = 3x⁶</b>", yes: false, ans: "No — the 3 is squared too: (3x³)² = 9x⁶." },
  { q: "Is this correct?<br><b>x⁻² = −x²</b>", yes: false, ans: "No — a negative exponent means a reciprocal: x⁻² = 1/x² (a positive value)." },
  { q: "Is this correct?<br><b>(x + y)² = x² + y²</b>", yes: false, ans: "No — you can’t split a power over a sum. (x+y)² = x² + 2xy + y²." },
  { q: "Is this correct?<br><b>xᵃ · yᵇ = (xy)ᵃ⁺ᵇ</b>", yes: false, ans: "No — different bases can’t be combined. The laws need the SAME base." },
  { q: "Is this correct?<br><b>(2x)³ = 8x³</b>", yes: true, ans: "Yes — every base in the bracket gets the power: 2³ = 8 and x³." },
  { q: "Is this correct?<br><b>2⁻³ = 1/8</b>", yes: true, ans: "Yes — 2⁻³ = 1/2³ = 1/8. The value is positive." },
];

/* mc — name the actual mistake */
const FIX = [
  { q: "What is wrong with <b>2³ · 2² = 4⁵</b>?", correct: "The base should stay 2 (answer 2⁵), not become 4", wrongs: ["The exponents should be multiplied", "The exponents should be subtracted", "Nothing — it is correct"], ans: "Add the exponents but KEEP the base: 2³·2² = 2⁵." },
  { q: "What is wrong with <b>(3x²)³ = 3x⁶</b>?", correct: "The 3 must also be cubed → 27x⁶", wrongs: ["The exponents should be added", "x should be x⁵", "Nothing — it is correct"], ans: "The power hits everything in the bracket: (3x²)³ = 3³x⁶ = 27x⁶." },
  { q: "What is wrong with <b>x⁻³ = −x³</b>?", correct: "A negative exponent gives a reciprocal: 1/x³", wrongs: ["It should be −1/x³", "It should be x³", "Nothing — it is correct"], ans: "x⁻³ = 1/x³ — positive, not negative." },
  { q: "What is wrong with <b>a⁵ · b³ = (ab)⁸</b>?", correct: "Different bases — they can’t be combined", wrongs: ["The exponents should be multiplied", "It should be (ab)¹⁵", "Nothing — it is correct"], ans: "The product rule needs the SAME base; a and b stay separate." },
];

const SKILLS = {
  trap1: () => { const it = pick(YN); return ynQ(CON, it.q, it.yes, { hint: "Watch the base, the bracket, and the sign of the exponent.", answerLabel: it.ans }); },
  trap2: () => { const it = pick(YN); return ynQ(CON, it.q, it.yes, { hint: "Does a law actually apply here? Same base? Whole bracket?", answerLabel: it.ans }); },
  trap3: () => { const it = pick(YN); return ynQ(CON, it.q, it.yes, { hint: "x⁰ = 1, a negative exponent flips, and you can’t split (x+y)ⁿ.", answerLabel: it.ans }); },
  fixIt1: () => { const it = pick(FIX); return mc(CON, it.q, it.correct, it.wrongs, { hint: "Find the single broken rule.", answerLabel: it.ans }); },
  fixIt2: () => { const it = pick(FIX); return mc(CON, it.q, it.correct, it.wrongs, { hint: "Find the single broken rule.", answerLabel: it.ans }); },
  trap4: () => { const it = pick(YN); return ynQ(CON, it.q, it.yes, { hint: "Check it against the laws one piece at a time.", answerLabel: it.ans }); },
};

export const questEs2 = {
  id: "es2",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
