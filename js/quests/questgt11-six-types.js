/* ============================================================
   GENERAL TRIG · gt11 — GENERAL SOLUTION: the six types
   ------------------------------------------------------------
   METHODS-trig.md Part K (p44, worked p45–p61, classified p64). One
   equation, one pick out of six. The six options carry the NUMBER
   and the NAME exactly as she writes them on p44, and they are in a
   FIXED order every single time — this is a list to learn, not a
   shuffle, and a learner who has read it once should find ⑤ in the
   same place tomorrow.

     ① function alone · ② same angles · ③ common factor ·
     ④ grouping · ⑤ trinomial · ⑥ co-functions

   The hint gives HER cue for the right type; the answer adds the
   second wording she used on p64 when she was classifying rather
   than teaching ("divide by cos (tanθ)", "trinomial with a masked
   identity", "make both cos").

   What is NOT generated, ever:
   • flag F11 — `2cos²θ − cosθ + 1 = 0`. It has Δ < 0, so it is a
     shape illustration on her page, not a solvable question. Every
     trinomial here is built FROM two integer factors, so an
     irreducible one cannot appear; the harness asserts it anyway.
   • flag F6 — no interval restriction is ever attached, so the
     `tan 2θ = −4, 2θ ∈ (−180°;360°)` ambiguity cannot arise.
   • flag F8's wrong bracket line — this round never prints a
     factorisation at all; it only names the type.

   The trinomials are built from (mK + n)(pK + q) with whole-number
   m, n, p, q, and are kept only if at least one root lands in
   [−1 ; 1] — otherwise the "equation" would be two dead branches and
   `∴ no solution` twice, which teaches nothing about the type.
   ============================================================ */
import { pick, randInt, shuffled, T, F, F2, eqHtml, eqPlain } from "./_gtrig.js";

const CON = "gtrigSixTypes";
const LETTERS = ["θ", "x", "α", "A"];

/* p44, word for word — with her one spelling slip corrected (F2:
   "seperately" → separately), which is the standing ruling for
   anything a learner reads. */
const TYPES = [
  { n: 1, mark: "①", name: "function alone", cue: "isolate the function, then ref ∠ and quadrants — and don't type − into the calculator.", alt: null },
  { n: 2, mark: "②", name: "same angles", cue: "same angle on both sides — divide away with cos θ and it turns into a tan.", alt: "divide by cos (tan θ)" },
  { n: 3, mark: "③", name: "common factor", cue: "take the common factor out, then each bracket separately = 0 — and take 0 as +.", alt: null },
  { n: 4, mark: "④", name: "grouping", cue: "four terms — group them in pairs, and the brackets left over must come out the same.", alt: null },
  { n: 5, mark: "⑤", name: "trinomial", cue: "three terms, one function squared and one not — K-method, and a masked identity if the middle term differs.", alt: "trinomial (K-method) · trinomial with a masked identity" },
  { n: 6, mark: "⑥", name: "co-functions", cue: "sin and cos with different ∠s — make both the same function. No ref. ∠ here.", alt: "make both cos" },
];
const OPTION_LABELS = TYPES.map(t => `${t.mark} ${t.name}`);

/* the six options, ALWAYS in this order */
function sixOptions(n) {
  return OPTION_LABELS.map((label, i) => ({ label, correct: i + 1 === n }));
}

const other = f => (f === "sin" ? "cos" : "sin");

/* ============================================================
   ① function alone (p45–p46, p48–p50)
   ============================================================ */
const shapes1 = [
  () => { const a = randInt(2, 5), b = randInt(1, a - 1), f = pick(["sin", "cos"]); return { lhs: [T(a, F(f)), T(-b)], rhs: [] }; },
  () => { const c = randInt(2, 6); return { lhs: [T(1, F("tan")), T(-c)], rhs: [] }; },
  () => { const d = randInt(2, 12) * 5, v = randInt(3, 9) / 10; return { lhs: [T(1, F("sin", 1, -d))], rhs: [T(-v)] }; },
  () => { const c = randInt(2, 5), b = randInt(1, c - 1); return { lhs: [T(c, F("cos")), T(b)], rhs: [] }; },
];

/* ============================================================
   ② same angles (p51–p52) — the whole point is that both functions
   carry the SAME angle, so dividing by cos turns it into one tan
   ============================================================ */
const shapes2 = [
  () => ({ lhs: [T(1, F("sin")), T(-1, F("cos"))], rhs: [] }),
  () => { const a = randInt(2, 5), b = randInt(2, 5); return { lhs: [T(a, F("sin")), T(-b, F("cos"))], rhs: [] }; },
  () => { const a = randInt(2, 5), b = randInt(2, 5), d = randInt(2, 14) * 5; return { lhs: [T(a, F("cos", -1, d)), T(-b, F("sin", -1, d))], rhs: [] }; },
  () => ({ lhs: [T(1, F2("sin"))], rhs: [T(1, F2("cos"))] }),
];

/* ============================================================
   ③ common factor (p53) — two terms sharing a factor
   ============================================================ */
const shapes3 = [
  () => { const f = pick(["sin", "cos"]); return { lhs: [T(1, F(f)), T(-1, F(f), F(other(f)))], rhs: [] }; },
  () => { const f = pick(["sin", "cos"]), a = randInt(2, 3); return { lhs: [T(1, F2(f))], rhs: [T(a, F(f), F(other(f)))] }; },
  () => { const f = pick(["sin", "cos"]), a = randInt(2, 4); return { lhs: [T(a, F(f), F(other(f))), T(-1, F(f))], rhs: [] }; },
];

/* ============================================================
   ④ grouping (p54–p55) — four terms, and the leftover brackets have
   to match. Built FROM the two brackets, so they always do.
   ============================================================ */
const shapes4 = [
  () => { const m = randInt(2, 4), f = pick(["sin", "cos"]), g = other(f); return { lhs: [T(1, F(f)), T(1, F(f), F(g)), T(m, F(g)), T(m)], rhs: [] }; },
  () => {
    // (p·sin + q)(r·cos + s) = pr sc + ps s + qr c + qs, written the way p55 writes it
    const p = randInt(2, 3), r = randInt(2, 3), q = randInt(1, 3), s = -randInt(2, 4);
    return { lhs: [T(p * r, F("sin"), F("cos")), T(q * r, F("cos"))], rhs: [T(-p * s, F("sin")), T(-q * s)] };
  },
];

/* ============================================================
   ⑤ trinomial (p56–p59, p64) — a quadratic in one ratio, factorised
   over the integers, with at least one root a real sine/cosine can
   actually take
   ============================================================ */
const gcd3 = (a, b, c) => { const g = (x, y) => (y ? g(y, x % y) : x); return g(g(Math.abs(a), Math.abs(b)), Math.abs(c)); };
function trinomialQuad() {
  for (let i = 0; i < 400; i++) {
    const m = randInt(1, 3), p = randInt(1, 3);
    const n = randInt(-4, 4), q = randInt(-4, 4);
    if (n === 0 || q === 0) continue;
    const A = m * p, B = m * q + n * p, C = n * q;
    if (B === 0) continue;                                   // would leave only two terms
    if (gcd3(A, B, C) > 1) continue;                         // she would divide that out first
    if (Math.abs(A) > 4 || Math.abs(B) > 9 || Math.abs(C) > 9) continue;
    const r1 = -n / m, r2 = -q / p;
    if (Math.abs(r1 - r2) < 1e-9) continue;                  // two identical branches read as one
    if (![r1, r2].some(r => Math.abs(r) <= 1)) continue;     // otherwise: no solution, twice
    return { A, B, C };
  }
  return { A: 2, B: 5, C: -3 };                              // her p56 eg.1
}
const shapes5 = [
  () => { const { A, B, C } = trinomialQuad(), f = pick(["sin", "cos"]); return { lhs: [T(A, F2(f)), T(B, F(f)), T(C)], rhs: [] }; },
  () => {
    // masked: the SQUARED function is the other one — a cos² next to a sin
    for (let i = 0; i < 60; i++) {
      const { A, B, C } = trinomialQuad();
      const b = -B, c = -A - C;
      if (b === 0 || c === 0) continue;
      const f = pick(["sin", "cos"]);
      return { lhs: [T(A, F2(other(f))), T(b, F(f)), T(c)], rhs: [] };
    }
    return { lhs: [T(2, F2("cos")), T(7, F("sin")), T(-5)], rhs: [] };     // her p58 eg.3
  },
  () => { const f = pick(["sin", "cos"]), s = pick([1, -1]); return { lhs: [T(1), T(s, F(f))], rhs: [T(1, F2(other(f)))] }; },
  () => {
    // p64 (1)'s shape: the constant first, the square in the middle
    for (let i = 0; i < 60; i++) {
      const { A, B, C } = trinomialQuad();
      const c = C + A;
      if (c <= 0) continue;                    // her p64 shape opens on a POSITIVE constant
      const f = pick(["sin", "cos"]);
      return { lhs: [T(c), T(-A, F2(other(f))), T(B, F(f))], rhs: [] };
    }
    return { lhs: [T(4), T(-2, F2("cos")), T(5, F("sin"))], rhs: [] };     // her p64 (1)
  },
];

/* ============================================================
   ⑥ co-functions (p60–p61) — sin and cos with DIFFERENT angles
   ============================================================ */
const shapes6 = [
  () => { const k = randInt(2, 4), d = randInt(7, 15) * 5; return { lhs: [T(1, F("sin", k))], rhs: [T(1, F("cos", 0, d))] }; },
  () => { const k = randInt(2, 4), d = randInt(1, 5) * 5; return { lhs: [T(1, F("cos", k, d))], rhs: [T(1, F("sin"))] }; },
  () => { const d = randInt(5, 12) * 5, k = randInt(2, 3); return { lhs: [T(1, F("sin", 1, -d))], rhs: [T(1, F("cos", k))] }; },
  () => { const d = randInt(2, 6) * 5, k = randInt(2, 4); return { lhs: [T(1, F("cos", 1, d))], rhs: [T(1, F("sin", k))] }; },
];

const SHAPES = { 1: shapes1, 2: shapes2, 3: shapes3, 4: shapes4, 5: shapes5, 6: shapes6 };

/* the one snippet on p44 that must never become a question (F11) */
const F11 = /2cos\^2\([a-zA-Zθαx]+\)-cos\([a-zA-Zθαx]+\)\+1=0/;

function typeQuestion(n) {
  const L = pick(LETTERS);
  const eq = pick(SHAPES[n])();
  const plain = eqPlain(eq, L);
  if (F11.test(plain)) throw new Error(`gt11: generated the F11 snippet (${plain}) — that equation has no real solution`);
  if (n === 6) {
    const angs = [...eq.lhs, ...eq.rhs].flatMap(t => t.f.map(f => `${f.a.k}:${f.a.d}`));
    if (new Set(angs).size < 2) throw new Error(`gt11: a type ⑥ needs two different angles, got ${plain}`);
  }
  const ty = TYPES[n - 1];
  return {
    type: "mc", concept: CON,
    _dbg: { type: n, plain, letter: L },
    prompt: `${eqHtml(eq, L)}<br><span class="muted small">Which of the six types is this?</span>`,
    options: sixOptions(n),
    hint: ty.cue,
    answerLabel: `${ty.mark} ${ty.name} — ${ty.cue}${ty.alt ? ` <span class="muted">(also written as: ${ty.alt})</span>` : ""}`,
    solution: [
      { s: `${eqHtml(eq, L)} → type ${ty.mark}`, r: ty.name },
      { s: ty.cue, r: "the cue for this type." },
    ],
  };
}

const forType = n => () => typeQuestion(n);
/* the two extra slots draw any of the six, so no play of the round is
   ever the same six in the same order */
const mixed = () => typeQuestion(randInt(1, 6));

const SKILLS = {
  type1: forType(1), type2: forType(2), type3: forType(3),
  type4: forType(4), type5: forType(5), type6: forType(6),
  mixedA: mixed, mixedB: mixed,
};

export const questGt11 = {
  id: "gt11",
  stackFractions: true,
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
