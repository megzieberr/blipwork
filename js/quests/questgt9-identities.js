/* ============================================================
   GENERAL TRIG · gt9 — Identities: the NEXT STEP
   ------------------------------------------------------------
   METHODS-trig.md Part I (p32–p35). Her ruling for this round: NO
   full proofs. The learner only ever names the next move and the
   thing it produces — which part do we work with, what do we do
   with it, what does it come to. Everything else (writing the whole
   LHS chain down to = RHS) belongs on paper, not on a phone.

   Her four moves, one item each: multiply out products (p32),
   KFC-style division (p33), a co-function inside an identity (p33),
   and the LCD — plain (p34) and with a 1 that needs a denominator
   (p35). Plus "when in doubt, go LEFT" (p32) and the masked
   identities (p06/p24/p32).

   EVERY claimed equality in this file is CHECKED NUMERICALLY before
   it can reach a learner: `checked()` evaluates both sides at two
   independent angles and throws if they disagree, so a typo in an
   option label fails loudly here instead of quietly teaching the
   wrong move. The harness re-runs the same check on thousands of
   generated items through q._dbg.equalities.
   ============================================================ */
import { pick, shuffled } from "./_gtrig.js";
import { sinD, cosD, tanD } from "../triglib.js";

const CON = "gtrigIdentities";
const LETTERS = ["θ", "x", "α", "A"];
const FN = { sin: sinD, cos: cosD, tan: tanD };
const CHECK_AT = [23, 37];        // two independent angles — one could coincide, two do not

const H_LEFT = "The pro-tip: <b>when in doubt, go LEFT</b>. You work the left-hand side, top to bottom, until it turns into the right-hand side.";
const H_LCD = "Two fractions added together always want one bottom. The LCD is every different denominator multiplied together — nothing cancelled first.";
const H_MASK = "The masked identities are just sin²θ + cos²θ = 1 rearranged: sin²θ = 1 − cos²θ and cos²θ = 1 − sin²θ.";
const H_PROD = "A bracket squared is a product waiting to be multiplied out — (a + b)² = a² + 2ab + b².";
const H_KFC = "Dividing by a fraction is multiplying by it upside down.";

/* ------------------------------------------------------------
   checked(list) — every {a, b, label} must agree at both test
   angles, or the generator throws. Returns the list so it can be
   handed straight to q._dbg for the harness to re-run.
   ------------------------------------------------------------ */
function checked(list) {
  list.forEach(e => CHECK_AT.forEach(t => {
    if (Math.abs(e.a(t) - e.b(t)) > 1e-9) throw new Error(`gt9: "${e.label}" is not true at ${t}° (${e.a(t)} vs ${e.b(t)})`);
  }));
  return list;
}

/* mc options where every DECOY is proved to be a different function
   from the correct one (checked at both angles) — the by-value rule
   for expressions rather than numbers. */
function optionsByFn(correct, decoys) {
  const out = [{ label: correct.h, correct: true }];
  const seen = new Set([correct.h]);
  decoys.forEach(d => {
    if (seen.has(d.h)) return;
    const differs = CHECK_AT.some(t => Math.abs(d.v(t) - correct.v(t)) > 1e-9);
    if (!differs) throw new Error(`gt9: decoy "${d.h}" is numerically equal to the answer "${correct.h}"`);
    seen.add(d.h);
    out.push({ label: d.h, correct: false });
  });
  return shuffled(out);
}

/* an expression: how it is written, and what it is worth at θ */
const ex = (h, v) => ({ h, v });
/* the sin/cos pair, swapped or not — this is the whole "sibling"
   mechanism for the items where the maths is symmetric */
const roles = () => (pick([true, false]) ? { f: "sin", g: "cos" } : { f: "cos", g: "sin" });

/* ------------------------------------------------------------
   1 · WHICH SIDE DO YOU START FROM?  (p32 pro-tip)
   ------------------------------------------------------------ */
const TO_PROVE = [
  { h: L => `(sin ${L} + cos ${L})² = 1 + 2 sin ${L} cos ${L}`, a: t => Math.pow(sinD(t) + cosD(t), 2), b: t => 1 + 2 * sinD(t) * cosD(t) },
  { h: L => `1/tan ${L} = cos ${L}/sin ${L}`, a: t => 1 / tanD(t), b: t => cosD(t) / sinD(t) },
  { h: L => `1/cos²${L} − 1 = tan²${L}`, a: t => 1 / (cosD(t) * cosD(t)) - 1, b: t => tanD(t) * tanD(t) },
  { h: L => `tan ${L} · cos ${L} = sin ${L}`, a: t => tanD(t) * cosD(t), b: t => sinD(t) },
];
function whichSide() {
  const L = pick(LETTERS);
  const it = pick(TO_PROVE);
  const equalities = checked([{ a: it.a, b: it.b, label: it.h(L) }]);
  return {
    type: "mc", concept: CON,
    _dbg: { equalities },
    prompt: `Prove that ${it.h(L)}.<br>Which side do you start from?`,
    options: shuffled([
      { label: "the LHS", correct: true },
      { label: "the RHS", correct: false },
      { label: "both sides, meeting in the middle", correct: false },
      { label: "whichever one is shorter", correct: false },
    ]),
    hint: H_LEFT,
    answerLabel: "the LHS — when in doubt, go LEFT. You work it top to bottom until it becomes the RHS, and you close with = RHS.",
    solution: [{ s: "Start on the LHS", r: "when in doubt, go LEFT." }],
  };
}

/* ------------------------------------------------------------
   2 · THE LCD  (p34 eg.4)
   ------------------------------------------------------------ */
function lcdItem() {
  const L = pick(LETTERS);
  const { f } = roles();
  const u = t => FN[f](t);
  const lhs = `1/(1 + ${f} ${L}) + 1/(1 − ${f} ${L})`;
  const equalities = checked([
    { a: t => 1 / (1 + u(t)) + 1 / (1 - u(t)), b: t => 2 / (1 - u(t) * u(t)), label: `${lhs} = 2/(1 − ${f}²${L})` },
  ]);
  const correct = ex(`(1 + ${f} ${L})(1 − ${f} ${L})`, t => (1 + u(t)) * (1 - u(t)));
  return {
    type: "steps", concept: CON,
    _dbg: { equalities },
    prompt: `${lhs} = …`,
    steps: [
      {
        kind: "mc", prompt: "What is the next move?",
        options: shuffled([
          { label: "find the LCD", correct: true },
          { label: "cross-multiply", correct: false },
          { label: "square both sides", correct: false },
          { label: "use a masked identity", correct: false },
        ]),
        hint: H_LCD,
      },
      {
        kind: "mc", prompt: "So the LCD is…",
        options: optionsByFn(correct, [
          ex(`(1 + ${f} ${L})`, t => 1 + u(t)),
          ex(`(1 − ${f} ${L})`, t => 1 - u(t)),
          ex(`2(1 + ${f} ${L})(1 − ${f} ${L})`, t => 2 * (1 + u(t)) * (1 - u(t))),
        ]),
        hint: H_LCD,
      },
    ],
    hint: H_LCD,
    answerLabel: `LCD = (1 + ${f} ${L})(1 − ${f} ${L}) — the two different bottoms multiplied together. It tidies to 1 − ${f}²${L}, and a masked identity finishes the job.`,
    solution: [
      { s: "Two fractions added → find the LCD", r: "the fractions move — one bottom for both." },
      { s: `LCD = (1 + ${f} ${L})(1 − ${f} ${L})`, r: "every different denominator, multiplied." },
    ],
  };
}

/* ------------------------------------------------------------
   3 · WHICH PART FIRST — the masked identity hiding in a longer
   expression (p35 eg.6's middle line)
   ------------------------------------------------------------ */
function whichPartFirst() {
  const L = pick(LETTERS);
  const { f, g } = roles();
  const lhs = `(${f} ${L} + ${f}²${L} + ${g}²${L}) / ${g} ${L}`;
  const equalities = checked([
    { a: t => FN[f](t) * FN[f](t) + FN[g](t) * FN[g](t), b: () => 1, label: `${f}²${L} + ${g}²${L} = 1` },
  ]);
  const correct = ex(`${f}²${L} + ${g}²${L}`, t => FN[f](t) ** 2 + FN[g](t) ** 2);
  return {
    type: "steps", concept: CON,
    _dbg: { equalities },
    prompt: `${lhs} = …`,
    steps: [
      {
        kind: "mc", prompt: "Which part do we work with first?",
        options: optionsByFn(correct, [
          ex(`${f} ${L} + ${f}²${L}`, t => FN[f](t) + FN[f](t) ** 2),
          ex(`${f}²${L}`, t => FN[f](t) ** 2),
          ex(`${g} ${L}`, t => FN[g](t)),
        ]),
        hint: H_MASK,
      },
      { kind: "calc", prompt: "And that part comes to…", expected: 1, dp: 0, unit: "", allowNeg: true, hint: H_MASK },
    ],
    hint: H_MASK,
    answerLabel: `${f}²${L} + ${g}²${L} = 1, so the top becomes ${f} ${L} + 1.`,
    solution: [
      { s: `Spot ${f}²${L} + ${g}²${L}`, r: "the identity, sitting inside a longer top." },
      { s: "= 1", r: "sin²θ + cos²θ = 1." },
    ],
  };
}

/* ------------------------------------------------------------
   4 · MASKED IDENTITY PICK  (p06 / p24 / p32)
   ------------------------------------------------------------ */
function maskedPick() {
  const L = pick(LETTERS);
  const { f, g } = roles();
  const F2 = t => FN[f](t) ** 2, G2 = t => FN[g](t) ** 2;
  const shapes = [
    {
      given: `1 − ${f}²${L}`, gv: t => 1 - F2(t),
      correct: ex(`${g}²${L}`, G2),
      decoys: [ex(`${f}²${L}`, F2), ex(`−${g}²${L}`, t => -G2(t)), ex(`1 + ${f}²${L}`, t => 1 + F2(t))],
    },
    {
      given: `${f}²${L} − 1`, gv: t => F2(t) - 1,
      correct: ex(`−${g}²${L}`, t => -G2(t)),
      decoys: [ex(`${g}²${L}`, G2), ex(`−${f}²${L}`, t => -F2(t)), ex(`1 − ${f}²${L}`, t => 1 - F2(t))],
    },
  ];
  const sh = pick(shapes);
  const equalities = checked([{ a: sh.gv, b: sh.correct.v, label: `${sh.given} = ${sh.correct.h}` }]);
  return {
    type: "mc", concept: CON,
    _dbg: { equalities },
    prompt: `Which masked identity is ${sh.given}?`,
    options: optionsByFn(sh.correct, sh.decoys),
    hint: H_MASK,
    answerLabel: `${sh.given} = ${sh.correct.h} — straight off sin²θ + cos²θ = 1, rearranged.`,
    solution: [{ s: `${sh.given} = ${sh.correct.h}`, r: "a masked identity." }],
  };
}

/* ------------------------------------------------------------
   5 · MULTIPLY OUT PRODUCTS  (p32 eg.1)
   ------------------------------------------------------------ */
function productsItem() {
  const L = pick(LETTERS);
  const sign = pick([1, -1]);
  const op = sign > 0 ? "+" : "−";
  const lhs = `(sin ${L} ${op} cos ${L})²`;
  const lv = t => Math.pow(sinD(t) + sign * cosD(t), 2);
  const correct = ex(`1 ${op} 2 sin ${L} cos ${L}`, t => 1 + sign * 2 * sinD(t) * cosD(t));
  const equalities = checked([{ a: lv, b: correct.v, label: `${lhs} = ${correct.h}` }]);
  return {
    type: "steps", concept: CON,
    _dbg: { equalities },
    prompt: `${lhs} = …`,
    steps: [
      {
        kind: "mc", prompt: "What is the next move?",
        options: shuffled([
          { label: "multiply out (products)", correct: true },
          { label: "find the LCD", correct: false },
          { label: `divide every term by cos ${L}`, correct: false },
          { label: "take a common factor out", correct: false },
        ]),
        hint: H_PROD,
      },
      {
        kind: "mc", prompt: "And it comes to…",
        options: optionsByFn(correct, [
          ex(`1 ${sign > 0 ? "−" : "+"} 2 sin ${L} cos ${L}`, t => 1 - sign * 2 * sinD(t) * cosD(t)),
          ex(`sin²${L} ${op} cos²${L}`, t => sinD(t) ** 2 + sign * cosD(t) ** 2),
          ex(`1 ${op} sin ${L} cos ${L}`, t => 1 + sign * sinD(t) * cosD(t)),
        ]),
        hint: H_PROD,
      },
    ],
    hint: H_PROD,
    answerLabel: `${lhs} = sin²${L} ${op} 2 sin ${L} cos ${L} + cos²${L} = ${correct.h} — the two squares collapse to 1, the middle term is the one that survives.`,
    solution: [
      { s: "A bracket squared → multiply out", r: "the products move." },
      { s: `= sin²${L} ${op} 2 sin ${L} cos ${L} + cos²${L}`, r: "(a + b)² = a² + 2ab + b²." },
      { s: `= ${correct.h}`, r: "sin²θ + cos²θ = 1." },
    ],
  };
}

/* ------------------------------------------------------------
   6 · KFC DIVISION  (p33 eg.2)
   ------------------------------------------------------------ */
function kfcItem() {
  const L = pick(LETTERS);
  const { f, g } = roles();
  const lhs = `1 ÷ (${f} ${L}/${g} ${L})`;
  const lv = t => 1 / (FN[f](t) / FN[g](t));
  const correct = ex(`${g} ${L}/${f} ${L}`, t => FN[g](t) / FN[f](t));
  const equalities = checked([{ a: lv, b: correct.v, label: `${lhs} = ${correct.h}` }]);
  return {
    type: "mc", concept: CON,
    _dbg: { equalities },
    prompt: `${lhs} = ?`,
    options: optionsByFn(correct, [
      ex(`${f} ${L}/${g} ${L}`, t => FN[f](t) / FN[g](t)),
      ex(`${f} ${L} · ${g} ${L}`, t => FN[f](t) * FN[g](t)),
      ex(`1/(${f} ${L} · ${g} ${L})`, t => 1 / (FN[f](t) * FN[g](t))),
    ]),
    hint: H_KFC,
    answerLabel: `${lhs} = 1 × ${correct.h} = ${correct.h} — flip the bottom fraction and multiply.`,
    solution: [{ s: `= 1 × ${g} ${L}/${f} ${L}`, r: "dividing by a fraction = multiplying by its flip." }],
  };
}

/* ------------------------------------------------------------
   7 · A CO-FUNCTION INSIDE AN IDENTITY  (p33 eg.3)
   ------------------------------------------------------------ */
function coFnIdentity() {
  const L = pick(LETTERS);
  const flip = pick([false, true]);
  const lhs = flip ? `1/tan(90° − ${L})` : `tan(90° − ${L})`;
  const lv = flip ? (t => 1 / tanD(90 - t)) : (t => tanD(90 - t));
  const correct = flip
    ? ex(`sin ${L}/cos ${L}`, t => sinD(t) / cosD(t))
    : ex(`cos ${L}/sin ${L}`, t => cosD(t) / sinD(t));
  const equalities = checked([{ a: lv, b: correct.v, label: `${lhs} = ${correct.h}` }]);
  return {
    type: "mc", concept: CON,
    _dbg: { equalities },
    prompt: `${lhs} = ?`,
    options: optionsByFn(correct, [
      flip ? ex(`cos ${L}/sin ${L}`, t => cosD(t) / sinD(t)) : ex(`sin ${L}/cos ${L}`, t => sinD(t) / cosD(t)),
      ex(`−${correct.h}`, t => -correct.v(t)),
      flip ? ex(`1/tan ${L}`, t => 1 / tanD(t)) : ex(`tan ${L}`, t => tanD(t)),
    ]),
    hint: "Write the tan out as sin over cos FIRST, then reduce the two co-functions separately: sin(90° − θ) = cos θ and cos(90° − θ) = sin θ.",
    answerLabel: `${lhs} = ${correct.h}${flip ? " = tan " + L : " = 1/tan " + L} — split the tan into sin over cos, reduce each one, and it turns itself over.`,
    solution: [
      { s: `tan(90° − ${L}) = sin(90° − ${L})/cos(90° − ${L})`, r: "tan θ = sin θ / cos θ." },
      { s: `= cos ${L}/sin ${L}`, r: "the two co-functions, one each." },
    ],
  };
}

/* ------------------------------------------------------------
   8 · THE 1 THAT NEEDS A DENOMINATOR  (p35 eg.5)
   ------------------------------------------------------------ */
function oneNeedsDenominator() {
  const L = pick(LETTERS);
  const { f, g } = roles();
  const lhs = `1/${g}²${L} − 1`;
  const lv = t => 1 / FN[g](t) ** 2 - 1;
  const correct = ex(`${f}²${L}/${g}²${L}`, t => FN[f](t) ** 2 / FN[g](t) ** 2);
  const equalities = checked([{ a: lv, b: correct.v, label: `${lhs} = ${correct.h}` }]);
  return {
    type: "steps", concept: CON,
    _dbg: { equalities },
    prompt: `${lhs} = …`,
    steps: [
      {
        kind: "mc", prompt: "What is the first move?",
        options: shuffled([
          { label: `write the 1 as 1/1, then take the LCD ${g}²${L}`, correct: true },
          { label: "multiply out", correct: false },
          { label: "use a masked identity on the 1", correct: false },
          { label: "cross-multiply", correct: false },
        ]),
        hint: "A 1 with nothing under it cannot join a fraction. Give it a denominator of 1 first, then it can be brought to the same bottom as everything else.",
      },
      {
        kind: "mc", prompt: "Which leaves…",
        options: optionsByFn(correct, [
          ex(`${g}²${L}/${f}²${L}`, t => FN[g](t) ** 2 / FN[f](t) ** 2),
          ex(`−${f}²${L}/${g}²${L}`, t => -(FN[f](t) ** 2) / FN[g](t) ** 2),
          ex(`1/${g}²${L}`, t => 1 / FN[g](t) ** 2),
        ]),
        hint: H_MASK,
      },
    ],
    hint: "Give the 1 a denominator, take the LCD, then a masked identity finishes the top.",
    answerLabel: `${lhs} = (1 − ${g}²${L})/${g}²${L} = ${correct.h}${f === "sin" ? " = tan²" + L : ""} — the 1 gets a bottom, the LCD does the joining, the masked identity does the tidying.`,
    solution: [
      { s: `= 1/${g}²${L} − 1/1`, r: "the 1 gets a denominator." },
      { s: `= (1 − ${g}²${L})/${g}²${L}`, r: `LCD = ${g}²${L}.` },
      { s: `= ${correct.h}`, r: "a masked identity on the top." },
    ],
  };
}

const SKILLS = {
  whichSide, lcdItem, whichPartFirst, maskedPick,
  productsItem, kfcItem, coFnIdentity, oneNeedsDenominator,
};

export const questGt9 = {
  id: "gt9",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
