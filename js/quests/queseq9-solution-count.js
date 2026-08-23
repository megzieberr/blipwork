/* ============================================================
   EQUATIONS & INEQUALITIES · Q9 — Two, one or no solution?
   ------------------------------------------------------------
   HER ROUND, from the two handwritten pages she photographed on
   2026-08-23 ("equations with rational exponents") — the ones her
   Grade 11 learner keeps confusing herself over. METHODS-algebra.md
   A14 carries the same box.

   TEACH FIRST, then drill. The first two questions carry `reveal`
   teaching frames (js/questions.js mountReveal — the input stays
   hidden until the last frame is up):
     Q1's frames — the reciprocal move, then her three "Important
       Notes" rules with her own examples and her 🙂 / 🙁;
     Q2's frames — her four worked examples, in her layout.
   Questions 3-10 are the drill she asked for: "about 10 questions
   where they just have to pick between two solutions (= + or −
   answer), one solution, and no solution."

   THE ONE TABLE THE WHOLE ROUND RESTS ON — `solutionCount()` below
   is the only place it is written down, and verify-eq.html sweeps
   every (p, q, sign) combination against its own independent copy.
   For x^(p/q) = c, with p/q already in lowest terms and c ≠ 0:

       c > 0 · p EVEN  →  TWO solutions (a ± answer)
       c > 0 · p odd   →  ONE solution
       c < 0 · p EVEN  →  NO solution   (an even power is never ⊖)
       c < 0 · p odd, q EVEN → NO solution  (an even root is never ⊖)
       c < 0 · p odd, q odd  →  ONE (negative) solution

   Which is exactly her three rules, in her words: even numerator →
   ± answer · only odd numbers → a negative answer is fine · an even
   number in the numerator OR the denominator → a negative answer
   cannot happen.

   WHY q ≠ 1. The exponents are always genuine fractions (q ∈ {2,3,5,7}),
   because "x² = 9" is the plain power equation eq1/eq2 already drill —
   this round is about the FRACTION, which is what she was teaching.

   OPTION ORDER IS FIXED, deliberately: the same three buttons in the
   same order every single time, so the three-way split itself is what
   gets learnt. That is why the drill items are built by mc3() here
   instead of _shared.js's mc(), which shuffles.
   ============================================================ */
import { pick, randInt, C } from "./_eq.js";

const CON = "eqSolutionCount";

/* ---------- the three fixed options, in her order ---------- */
export const OPT_TWO = "Two solutions (a ± answer)";
export const OPT_ONE = "One solution";
export const OPT_NONE = "No solution";
const TRIO = [OPT_TWO, OPT_ONE, OPT_NONE];
const LABEL = { two: OPT_TWO, one: OPT_ONE, none: OPT_NONE };

/* ============================================================
   THE PURE CLASSIFICATION. p, q positive integers, gcd(p, q) = 1,
   `neg` = is the right-hand side negative. Returns "two"|"one"|"none".
   No randomness, no DOM, no formatting — so the harness can sweep it.
   ============================================================ */
export function solutionCount(p, q, neg) {
  if (!neg) return p % 2 === 0 ? "two" : "one";   // positive: even top → ±, odd top → one
  if (p % 2 === 0) return "none";                 // an even POWER is never negative
  if (q % 2 === 0) return "none";                 // an even ROOT is never negative
  return "one";                                   // only odd numbers → a negative is fine
}

/* ---------- display helpers ---------- */
/* her stacked fraction, safe inside a <sup> (js/ui.js fracHtml leaves a
   ready-made .sfrac alone — the same escape hatch js/exam/eqn-k-method.js
   uses for 2x^(3/4)) */
const sf = (n, d) => `<span class="sfrac"><span class="sf-n">${n}</span><span class="sf-d">${d}</span></span>`;
const xpow = (p, q) => `x<sup>${sf(p, q)}</sup>`;
/* the right-hand side: a small integer, or a simple fraction */
const rhs = (c) => (c.d ? `${c.neg ? "−" : ""}${sf(c.n, c.d)}` : C(c.neg ? -c.n : c.n));
const eqn = (p, q, c) => `${xpow(p, q)} = ${rhs(c)}`;
/* a root sign. n = 2 loses its index, exactly as she writes it ("√16",
   "√x²"); every other index is shown. */
const root = (n, inside) => `${n === 2 ? "" : `<sup>${n}</sup>`}√(${inside})`;
/* a big number with her thousands SPACES ("−4 782 969"), non-breaking so
   the groups never split across a line on the phone */
const big = (v) => C(v).replace(/(\d)(?=(\d{3})+$)/g, "$1 ");

/* ---------- the (p, q) pool: lowest terms, q a real denominator ---------- */
const PAIRS = [];
const gcd = (a, b) => (b ? gcd(b, a % b) : a);
for (const q of [2, 3, 5, 7]) for (const p of [1, 2, 3, 4, 5]) if (gcd(p, q) === 1) PAIRS.push([p, q]);

/* every pair that produces a given outcome for a given sign */
const pairsFor = (kind, neg) => PAIRS.filter(([p, q]) => solutionCount(p, q, neg) === kind);

/* ---------- right-hand sides ---------- */
const INTS = [2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 16, 25, 27, 32, 64];
const FRACS = [[1, 2], [3, 2], [1, 4], [3, 4], [2, 3], [5, 3], [1, 8], [4, 9], [9, 16], [8, 27]];
function randC(neg) {
  if (randInt(1, 4) === 1) { const [n, d] = pick(FRACS); return { n, d, neg }; }
  return { n: pick(INTS), neg };
}

/* ---------- her rule, in her words, for the answer line ---------- */
function why(p, q, neg, kind) {
  if (kind === "two") {
    return `The numerator is <b>${p}</b> — an <b>even numerator → ± answer</b>. The right-hand side is positive, so both a plus and a minus value work: <b>two solutions</b>.`;
  }
  if (kind === "one" && !neg) {
    return `The numerator is <b>${p}</b>, an <b>odd</b> number, so there is no ±. Raise both sides to the reciprocal ${p === 1 ? q : sf(q, p)} and you get <b>one solution</b>.`;
  }
  if (kind === "one" && neg) {
    return `<b>Only odd numbers</b> in the numerator and the denominator (${p} and ${q}), so a <b>negative answer is fine</b> 🙂 — an odd root of a negative number really is negative. <b>One solution</b>.`;
  }
  if (p % 2 === 0) {
    return `The numerator is <b>${p}</b>, an <b>even number</b>, and the right-hand side is negative. An <b>even numerator cannot be ⊖</b> 🙁 — ${root(p, `x<sup>${p}</sup>`)} can never come out negative. <b>No solution</b>.`;
  }
  return `The denominator is <b>${q}</b>, an <b>even number</b>, and the right-hand side is negative. An <b>even denominator cannot ONLY be ⊖</b> 🙁 — ${root(q, "x")} is never negative. <b>No solution</b>.`;
}

const HINTS = [
  "Look at the <b>top</b> and the <b>bottom</b> of the exponent — odd or even? — and then at the sign on the right.",
  "Even numerator → ± answer. Only odd numbers → a negative answer is fine. An even number anywhere, with a negative on the right → it cannot happen.",
  "You never have to solve it. The three rules only ask two things: is the top number even, or the bottom one — and is the right-hand side negative?",
  "An even <i>power</i> is never negative, and an even <i>root</i> is never negative. Everything else is allowed.",
];

/* ---------- the fixed-order three-option builder ---------- */
function mc3(prompt, kind, opts) {
  return {
    type: "mc", concept: CON, prompt,
    options: TRIO.map((label) => ({ label, correct: label === LABEL[kind] })),
    hint: opts.hint || pick(HINTS),
    answerLabel: opts.answerLabel,
    solution: [{ s: LABEL[kind] }],
    meta: opts.meta,
  };
}

/* one classification item, with the outcome FORCED (so a round of ten
   always shows all three answers at least twice — her ask) or free */
function classify(force, promptFn) {
  const neg = force ? force.neg : randInt(0, 1) === 1;
  const kind = force ? force.kind : null;
  const pool = kind ? pairsFor(kind, neg) : PAIRS;
  const [p, q] = pick(pool);
  const c = randC(neg);
  const k = solutionCount(p, q, neg);
  const e = eqn(p, q, c);
  return mc3(
    (promptFn || ((s) => `How many solutions does <b>${s}</b> have?`))(e),
    k,
    { answerLabel: `${e} — ${why(p, q, neg, k)}`, meta: { p, q, neg, kind: k, three: true } },
  );
}

/* ============================================================
   THE SOLVE FOLLOW-UP (four values, fixed order).
   Built so the answer is always exact: with a ∈ {2,3},
       |c| = aᵖ  and  A = a^q,
   so |x| = |c|^(q/p) = A exactly. The four options are always
   x = ±A · x = A · x = −A · No solution, and WHICH one is right is
   decided by the very same table.
   ============================================================ */
const SOLVE = [];
for (const a of [2, 3]) for (const [p, q] of PAIRS) {
  if (q === 7) continue;                       // a⁷ is not a Grade-11-sized number
  const A = a ** q, cAbs = a ** p;
  if (A > 32 || cAbs > 32) continue;           // keep both sides small enough to read
  if (cAbs ** q > 1e7) continue;               // …and her "raise both sides" line too
  SOLVE.push({ a, p, q, A, cAbs });
}

/* her layout, generically: (q-th root of x^p)^q = c^q → p-th root of x^p
   = p-th root of c^q → x = … — exactly the four lines on her page 2. */
function solveWorking(p, q, cAbs, neg, A, kind) {
  const c = neg ? -cAbs : cAbs;
  const cq = neg && q % 2 === 1 ? -(cAbs ** q) : cAbs ** q;   // (−c)^q keeps its sign for odd q
  const val = kind === "two" ? `±${C(A)}` : kind === "one" && neg ? C(-A) : C(A);

  /* AN EVEN DENOMINATOR with a negative right-hand side is her example 4,
     and it is the one case where you must NOT raise both sides: squaring
     would hide the minus and hand you a number that does not work. You
     read the root and stop. ²√x¹ = −3 ✗ */
  if (kind === "none" && q % 2 === 0) {
    return `${root(q, `x<sup>${p}</sup>`)} = ${C(c)} &nbsp;✗ &nbsp;— an even root is <b>never</b> negative, so nothing works.`;
  }

  /* p = 1: there is no p-th root left to take once both sides are raised,
     so it is two lines and no more. */
  if (p === 1) {
    const line = `${root(q, "x<sup>1</sup>")} = ${C(c)}`;
    return `${line} &nbsp;→&nbsp; <b>x = ${val}</b>`;
  }

  const line1 = `(${root(q, `x<sup>${p}</sup>`)})<sup>${q}</sup> = (${C(c)})<sup>${q}</sup>`;
  const line2 = `${root(p, `x<sup>${p}</sup>`)} = ${root(p, big(cq))}`;
  if (kind === "none") return `${line1} &nbsp;→&nbsp; ${line2} &nbsp;— <b>cannot happen</b>.`;
  return `${line1} &nbsp;→&nbsp; ${line2} &nbsp;→&nbsp; <b>x = ${val}</b>`;
}

function solveItem(neg) {
  /* every pair is fair game — the table decides which of the four
     options is the right one, which is the whole point of the item */
  const it = pick(SOLVE);
  const kind = solutionCount(it.p, it.q, neg);
  const c = { n: it.cAbs, neg };
  const e = eqn(it.p, it.q, c);
  const A = it.A;
  const options = [
    { label: `x = ±${C(A)}`, correct: kind === "two" },
    { label: `x = ${C(A)}`, correct: kind === "one" && !neg },
    { label: `x = ${C(-A)}`, correct: kind === "one" && neg },
    { label: OPT_NONE, correct: kind === "none" },
  ];
  return {
    type: "mc", concept: CON,
    prompt: `Two, one or none — and then finish it off.<br>Solve for x: &nbsp;<b>${e}</b>`,
    options,
    hint: "Decide two / one / none FIRST, then multiply the exponent by its reciprocal — whatever you do to the left, do to the right.",
    answerLabel: `${why(it.p, it.q, neg, kind)}<br>${solveWorking(it.p, it.q, it.cAbs, neg, A, kind)}`,
    solution: [{ s: options.find((o) => o.correct).label }],
    meta: { p: it.p, q: it.q, neg, kind, A, four: true },
  };
}

/* ============================================================
   HER TEACHING FRAMES — page 1's boxes, then page 2's four
   worked examples, in her layout and her words.
   ============================================================ */
const box = (body, tone) =>
  `<div style="border:1.5px solid ${tone};border-radius:12px;padding:10px 12px;line-height:1.7">${body}</div>`;

const RULE_FRAMES = [
  box(`<b>Equations with rational exponents</b><br>
    Multiply with the <b>reciprocal</b> of the exponent &mdash; switch numerator and denominator.<br>
    ${sf(3, 4)} × ${sf(4, 3)} = 1 &nbsp;<span style="opacity:.75">(cancels out)</span>`, "#34d399"),
  box(`<b>${xpow(2, 3)} = 4</b><br>
    (${root(3, "x²")})³ = (4)³<br>
    √(x²) = √64<br>
    x = <b>±8</b><br>
    <span style="opacity:.75">x<sup>even</sup> = ± answer.</span>`, "#34d399"),
  box(`👀 <b>IMPORTANT NOTES</b><br>
    <span style="color:#3aa0ff"><b>even numerator</b></span> &nbsp;⟶&nbsp; <b>± answer</b><br>
    ${xpow(2, 3)} = 2 &nbsp;/&nbsp; ${xpow(4, 7)} = 5`, "#3aa0ff"),
  box(`<span style="color:#f43f7f"><b>only odd numbers</b></span> in num. <b>and</b> denom. &nbsp;⟶&nbsp; ✓ negative answer 🙂<br>
    ${xpow(1, 3)} = −2 &nbsp;/&nbsp; ${xpow(5, 7)} = −9`, "#f43f7f"),
  box(`<span style="color:#22d3ee"><b>even number</b></span> in num. <b>or</b> denom. &nbsp;⟶&nbsp; ✗ negative answer <b>(no solution)</b> 🙁<br>
    ${xpow(1, 2)} = −3 &nbsp;/&nbsp; ${xpow(4, 3)} = −4`, "#22d3ee"),
];

const WORKED_FRAMES = [
  box(`<b>1)</b> &nbsp;${xpow(2, 3)} = 2 &nbsp;&nbsp;<span style="opacity:.75">even in numerator = ± answer</span><br>
    (${root(3, "x²")})³ = (2)³<br>
    √(x²) = √8<br>
    x = <b>±2√2</b>`, "#3aa0ff"),
  box(`<b>2)</b> &nbsp;${xpow(5, 7)} = −9 &nbsp;&nbsp;<span style="opacity:.75">odd numbers can be ⊖</span><br>
    (${root(7, "x⁵")})⁷ = (−9)⁷<br>
    ${root(5, "x⁵")} = ${root(5, "−4 782 969")}<br>
    x = <b>−21,67</b>`, "#f43f7f"),
  box(`<b>3)</b> &nbsp;${xpow(4, 3)} = −4 &nbsp;&nbsp;<span style="opacity:.75">even numerator cannot be ⊖</span><br>
    (${root(3, "x⁴")})³ = (−4)³<br>
    ${root(4, "x⁴")} = ${root(4, "−64")}<br>
    ↑ <b>cannot happen</b>`, "#22d3ee"),
  box(`<b>4)</b> &nbsp;${xpow(1, 2)} = −3 &nbsp;&nbsp;<span style="opacity:.75">even denominator cannot ONLY be ⊖</span><br>
    <sup>2</sup>√(x¹) = −3 &nbsp;✗`, "#22d3ee"),
];

const reveal = (q, frames) => { q.reveal = frames; q.revealMode = "replace"; return q; };

/* ============================================================
   THE TEN. Slots 1-6 force the outcome, so every round shows each
   of the three answers at least twice; 7 and 9 are free; 8 and 10
   are the solve follow-ups (her "at most 2 of 10").
   ============================================================ */
const SKILLS = {
  /* 1 — teach the reciprocal move and her three rules, then ask */
  theRules: () => reveal(
    classify({ kind: "two", neg: false },
      (e) => `Read the rules first, then answer this:<br>how many solutions does <b>${e}</b> have?`),
    RULE_FRAMES),

  /* 2 — her four worked examples, then a no-solution one */
  workedExamples: () => reveal(
    classify({ kind: "none", neg: true },
      (e) => `Same four rules, a fresh equation. How many solutions does <b>${e}</b> have?`),
    WORKED_FRAMES),

  /* 3 — one solution, positive side (odd numerator) */
  oddTopPositive: () => classify({ kind: "one", neg: false }),

  /* 4 — two solutions (even numerator, positive side) */
  evenTop: () => classify({ kind: "two", neg: false }),

  /* 5 — one solution, negative side (only odd numbers) */
  allOddNegative: () => classify({ kind: "one", neg: true }),

  /* 6 — no solution (an even number somewhere, negative side) */
  evenWithNegative: () => classify({ kind: "none", neg: true }),

  /* 7 — free */
  mixedA: () => classify(null),

  /* 8 — solve it, positive right-hand side */
  solvePositive: () => solveItem(false),

  /* 9 — free */
  mixedB: () => classify(null),

  /* 10 — solve it, negative right-hand side */
  solveNegative: () => solveItem(true),
};

export const questEq9 = {
  id: "eq9",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};

/* re-exported so verify-eq.html can build its own pools without
   duplicating the generator's private constants */
export const __test = { PAIRS, SOLVE, TRIO, LABEL };
