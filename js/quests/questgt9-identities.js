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
import { L as afL } from "../lang.js";

const CON = "gtrigIdentities";
const LETTERS = [afL("θ", "θ"), afL("x", "x"), afL("α", "α"), afL("A", "A")];
const FN = { sin: sinD, cos: cosD, tan: tanD };
const CHECK_AT = [23, 37];        // two independent angles — one could coincide, two do not

const H_LEFT = afL("The pro-tip: <b>when in doubt, go LEFT</b>. You work the left-hand side, top to bottom, until it turns into the right-hand side.", "Die pro-wenk: <b>as jy twyfel, gaan LINKS</b>. Jy werk met die linkerkant, van bo na onder, totdat dit die regterkant word.");
const H_LCD = afL("Two fractions added together always want one bottom. The LCD takes every different factor of the denominators, each to its highest power; when the bottoms share nothing, that is just the denominators multiplied together — nothing cancelled first.", "Twee breuke wat jy optel, wil altyd een noemer hê. Die KGV neem elke verskillende faktor van die noemers, elkeen tot sy hoogste mag; as die noemers niks deel nie, is dit net die noemers met mekaar vermenigvuldig: niks word eers gekanselleer nie.");
const H_MASK = afL("The masked identities are just sin²θ + cos²θ = 1 rearranged: sin²θ = 1 − cos²θ and cos²θ = 1 − sin²θ.", "Die gemaskerde identiteite is net sin²θ + cos²θ = 1, herrangskik: sin²θ = 1 − cos²θ en cos²θ = 1 − sin²θ.");
const H_PROD = afL("A bracket squared is a product waiting to be multiplied out — (a + b)² = a² + 2ab + b².", "'n Hakie in die kwadraat is 'n produk wat wag om uitvermenigvuldig te word: (a + b)² = a² + 2ab + b².");
const H_KFC = afL("Dividing by a fraction is multiplying by it upside down.", "Om deur 'n breuk te deel, is om met hom onderstebo te vermenigvuldig.");

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
    prompt: afL(`Prove that ${it.h(L)}.<br>Which side do you start from?`, `Bewys dat ${it.h(L)}.<br>Van watter kant begin jy?`),
    options: shuffled([
      { label: afL("the LHS", "die LKS"), correct: true },
      { label: afL("the RHS", "die RKS"), correct: false },
      { label: afL("both sides, meeting in the middle", "albei kante, en ontmoet in die middel"), correct: false },
      { label: afL("whichever one is shorter", "die een wat korter is"), correct: false },
    ]),
    hint: H_LEFT,
    answerLabel: afL("the LHS — when in doubt, go LEFT. You work it top to bottom until it becomes the RHS, and you close with = RHS.", "die LKS: as jy twyfel, gaan LINKS. Jy werk dit van bo na onder totdat dit die RKS word, en jy sluit af met = RKS."),
    solution: [{ s: afL("Start on the LHS", "Begin by die LKS"), r: afL("when in doubt, go LEFT.", "as jy twyfel, gaan LINKS.") }],
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
        kind: "mc", prompt: afL("What is the next move?", "Wat is die volgende stap?"),
        options: shuffled([
          { label: afL("find the LCD", "vind die KGV"), correct: true },
          { label: afL("cross-multiply", "kruisvermenigvuldig"), correct: false },
          { label: afL("square both sides", "kwadreer albei kante"), correct: false },
          { label: afL("use a masked identity", "gebruik 'n gemaskerde identiteit"), correct: false },
        ]),
        hint: H_LCD,
      },
      {
        kind: "mc", prompt: afL("So the LCD is…", "Dus is die KGV…"),
        options: optionsByFn(correct, [
          ex(`(1 + ${f} ${L})`, t => 1 + u(t)),
          ex(`(1 − ${f} ${L})`, t => 1 - u(t)),
          ex(`2(1 + ${f} ${L})(1 − ${f} ${L})`, t => 2 * (1 + u(t)) * (1 - u(t))),
        ]),
        hint: H_LCD,
      },
    ],
    hint: H_LCD,
    answerLabel: afL(`LCD = (1 + ${f} ${L})(1 − ${f} ${L}) — the two different bottoms multiplied together. It tidies to 1 − ${f}²${L}, and a masked identity finishes the job.`, `KGV = (1 + ${f} ${L})(1 − ${f} ${L}): die twee verskillende noemers met mekaar vermenigvuldig. Dit word netjies 1 − ${f}²${L}, en 'n gemaskerde identiteit maak die werk klaar.`),
    solution: [
      { s: afL("Two fractions added → find the LCD", "Twee breuke opgetel → vind die KGV"), r: afL("the fractions move — one bottom for both.", "die breukstap: een noemer vir albei.") },
      { s: afL(`LCD = (1 + ${f} ${L})(1 − ${f} ${L})`, `KGV = (1 + ${f} ${L})(1 − ${f} ${L})`), r: afL("every different denominator, multiplied.", "elke verskillende noemer, vermenigvuldig.") },
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
        kind: "mc", prompt: afL("Which part do we work with first?", "Met watter deel werk ons eerste?"),
        options: optionsByFn(correct, [
          ex(`${f} ${L} + ${f}²${L}`, t => FN[f](t) + FN[f](t) ** 2),
          ex(`${f}²${L}`, t => FN[f](t) ** 2),
          ex(`${g} ${L}`, t => FN[g](t)),
        ]),
        hint: H_MASK,
      },
      { kind: "calc", prompt: afL("And that part comes to…", "En daardie deel word…"), expected: 1, dp: 0, unit: "", allowNeg: true, hint: H_MASK },
    ],
    hint: H_MASK,
    answerLabel: afL(`${f}²${L} + ${g}²${L} = 1, so the top becomes ${f} ${L} + 1.`, `${f}²${L} + ${g}²${L} = 1, dus word die teller ${f} ${L} + 1.`),
    solution: [
      { s: afL(`Spot ${f}²${L} + ${g}²${L}`, `Herken ${f}²${L} + ${g}²${L}`), r: afL("the identity, sitting inside a longer top.", "die identiteit, versteek in 'n langer teller.") },
      { s: "= 1", r: afL("sin²θ + cos²θ = 1.", "sin²θ + cos²θ = 1.") },
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
    prompt: afL(`Which masked identity is ${sh.given}?`, `Watter gemaskerde identiteit is ${sh.given}?`),
    options: optionsByFn(sh.correct, sh.decoys),
    hint: H_MASK,
    answerLabel: afL(`${sh.given} = ${sh.correct.h} — straight off sin²θ + cos²θ = 1, rearranged.`, `${sh.given} = ${sh.correct.h}: reguit uit sin²θ + cos²θ = 1, herrangskik.`),
    solution: [{ s: `${sh.given} = ${sh.correct.h}`, r: afL("a masked identity.", "'n gemaskerde identiteit.") }],
  };
}

/* ------------------------------------------------------------
   5 · MULTIPLY OUT PRODUCTS  (p32 eg.1)
   ------------------------------------------------------------ */
function productsItem() {
  const L = pick(LETTERS);
  const sign = pick([1, -1]);
  const op = sign > 0 ? "+" : "−";
  const lhs = afL(`(sin ${L} ${op} cos ${L})²`, `(sin ${L} ${op} cos ${L})²`);
  const lv = t => Math.pow(sinD(t) + sign * cosD(t), 2);
  const correct = ex(afL(`1 ${op} 2 sin ${L} cos ${L}`, `1 ${op} 2 sin ${L} cos ${L}`), t => 1 + sign * 2 * sinD(t) * cosD(t));
  const equalities = checked([{ a: lv, b: correct.v, label: `${lhs} = ${correct.h}` }]);
  return {
    type: "steps", concept: CON,
    _dbg: { equalities },
    prompt: `${lhs} = …`,
    steps: [
      {
        kind: "mc", prompt: afL("What is the next move?", "Wat is die volgende stap?"),
        options: shuffled([
          { label: afL("multiply out (products)", "vermenigvuldig uit (produkte)"), correct: true },
          { label: afL("find the LCD", "vind die KGV"), correct: false },
          { label: afL(`divide every term by cos ${L}`, `deel elke term deur cos ${L}`), correct: false },
          { label: afL("take a common factor out", "haal 'n gemene faktor uit"), correct: false },
        ]),
        hint: H_PROD,
      },
      {
        kind: "mc", prompt: afL("And it comes to…", "En dit word…"),
        options: optionsByFn(correct, [
          ex(afL(`1 ${sign > 0 ? "−" : "+"} 2 sin ${L} cos ${L}`, `1 ${sign > 0 ? "−" : "+"} 2 sin ${L} cos ${L}`), t => 1 - sign * 2 * sinD(t) * cosD(t)),
          ex(afL(`sin²${L} ${op} cos²${L}`, `sin²${L} ${op} cos²${L}`), t => sinD(t) ** 2 + sign * cosD(t) ** 2),
          ex(afL(`1 ${op} sin ${L} cos ${L}`, `1 ${op} sin ${L} cos ${L}`), t => 1 + sign * sinD(t) * cosD(t)),
        ]),
        hint: H_PROD,
      },
    ],
    hint: H_PROD,
    answerLabel: afL(`${lhs} = sin²${L} ${op} 2 sin ${L} cos ${L} + cos²${L} = ${correct.h} — the two squares collapse to 1, the middle term is the one that survives.`, `${lhs} = sin²${L} ${op} 2 sin ${L} cos ${L} + cos²${L} = ${correct.h}: die twee kwadrate word saam 1, die middelste term is die een wat oorbly.`),
    solution: [
      { s: afL("A bracket squared → multiply out", "'n Hakie in die kwadraat → vermenigvuldig uit"), r: afL("the products move.", "die produkstap.") },
      { s: afL(`= sin²${L} ${op} 2 sin ${L} cos ${L} + cos²${L}`, `= sin²${L} ${op} 2 sin ${L} cos ${L} + cos²${L}`), r: afL("(a + b)² = a² + 2ab + b².", "(a + b)² = a² + 2ab + b².") },
      { s: `= ${correct.h}`, r: afL("sin²θ + cos²θ = 1.", "sin²θ + cos²θ = 1.") },
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
    answerLabel: afL(`${lhs} = 1 × ${correct.h} = ${correct.h} — flip the bottom fraction and multiply.`, `${lhs} = 1 × ${correct.h} = ${correct.h}: draai die onderste breuk om en vermenigvuldig.`),
    solution: [{ s: `= 1 × ${g} ${L}/${f} ${L}`, r: afL("dividing by a fraction = multiplying by its flip.", "deel deur 'n breuk = vermenigvuldig met sy omgekeerde.") }],
  };
}

/* ------------------------------------------------------------
   7 · A CO-FUNCTION INSIDE AN IDENTITY  (p33 eg.3)
   ------------------------------------------------------------ */
function coFnIdentity() {
  const L = pick(LETTERS);
  const flip = pick([false, true]);
  const lhs = flip ? afL(`1/tan(90° − ${L})`, `1/tan(90° − ${L})`) : afL(`tan(90° − ${L})`, `tan(90° − ${L})`);
  const lv = flip ? (t => 1 / tanD(90 - t)) : (t => tanD(90 - t));
  const correct = flip
    ? ex(afL(`sin ${L}/cos ${L}`, `sin ${L}/cos ${L}`), t => sinD(t) / cosD(t))
    : ex(afL(`cos ${L}/sin ${L}`, `cos ${L}/sin ${L}`), t => cosD(t) / sinD(t));
  const equalities = checked([{ a: lv, b: correct.v, label: `${lhs} = ${correct.h}` }]);
  return {
    type: "mc", concept: CON,
    _dbg: { equalities },
    prompt: `${lhs} = ?`,
    options: optionsByFn(correct, [
      flip ? ex(afL(`cos ${L}/sin ${L}`, `cos ${L}/sin ${L}`), t => cosD(t) / sinD(t)) : ex(afL(`sin ${L}/cos ${L}`, `sin ${L}/cos ${L}`), t => sinD(t) / cosD(t)),
      ex(`−${correct.h}`, t => -correct.v(t)),
      flip ? ex(afL(`1/tan ${L}`, `1/tan ${L}`), t => 1 / tanD(t)) : ex(afL(`tan ${L}`, `tan ${L}`), t => tanD(t)),
    ]),
    hint: afL("Write the tan out as sin over cos FIRST, then reduce the two co-functions separately: sin(90° − θ) = cos θ and cos(90° − θ) = sin θ.", "Skryf die tan EERS as sin oor cos, reduseer dan die twee ko-funksies apart: sin(90° − θ) = cos θ en cos(90° − θ) = sin θ."),
    answerLabel: afL(`${lhs} = ${correct.h}${flip ? " = tan " + L : " = 1/tan " + L} — split the tan into sin over cos, reduce each one, and it turns itself over.`, `${lhs} = ${correct.h}${flip ? " = tan " + L : " = 1/tan " + L}: verdeel die tan in sin oor cos, reduseer elkeen, en dit draai self om.`),
    solution: [
      { s: afL(`tan(90° − ${L}) = sin(90° − ${L})/cos(90° − ${L})`, `tan(90° − ${L}) = sin(90° − ${L})/cos(90° − ${L})`), r: afL("tan θ = sin θ / cos θ.", "tan θ = sin θ / cos θ.") },
      { s: afL(`= cos ${L}/sin ${L}`, `= cos ${L}/sin ${L}`), r: afL("the two co-functions, one each.", "die twee ko-funksies, een elk.") },
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
        kind: "mc", prompt: afL("What is the first move?", "Wat is die eerste stap?"),
        options: shuffled([
          { label: afL(`write the 1 as 1/1, then take the LCD ${g}²${L}`, `skryf die 1 as 1/1, neem dan die KGV ${g}²${L}`), correct: true },
          { label: afL("multiply out", "vermenigvuldig uit"), correct: false },
          { label: afL("use a masked identity on the 1", "gebruik 'n gemaskerde identiteit op die 1"), correct: false },
          { label: afL("cross-multiply", "kruisvermenigvuldig"), correct: false },
        ]),
        hint: afL("A 1 with nothing under it cannot join a fraction. Give it a denominator of 1 first, then it can be brought to the same bottom as everything else.", "'n 1 met niks onder hom kan nie by 'n breuk aansluit nie. Gee dit eers 'n noemer van 1, dan kan dit dieselfde noemer as alles anders kry."),
      },
      {
        kind: "mc", prompt: afL("Which leaves…", "Dan bly oor…"),
        options: optionsByFn(correct, [
          ex(`${g}²${L}/${f}²${L}`, t => FN[g](t) ** 2 / FN[f](t) ** 2),
          ex(`−${f}²${L}/${g}²${L}`, t => -(FN[f](t) ** 2) / FN[g](t) ** 2),
          ex(`1/${g}²${L}`, t => 1 / FN[g](t) ** 2),
        ]),
        hint: H_MASK,
      },
    ],
    hint: afL("Give the 1 a denominator, take the LCD, then a masked identity finishes the top.", "Gee die 1 'n noemer, neem die KGV, dan maak 'n gemaskerde identiteit die teller klaar."),
    answerLabel: afL(`${lhs} = (1 − ${g}²${L})/${g}²${L} = ${correct.h}${f === "sin" ? " = tan²" + L : ""} — the 1 gets a bottom, the LCD does the joining, the masked identity does the tidying.`, `${lhs} = (1 − ${g}²${L})/${g}²${L} = ${correct.h}${f === "sin" ? " = tan²" + L : ""}: die 1 kry 'n noemer, die KGV voeg saam, die gemaskerde identiteit ruim op.`),
    solution: [
      { s: `= 1/${g}²${L} − 1/1`, r: afL("the 1 gets a denominator.", "die 1 kry 'n noemer.") },
      { s: `= (1 − ${g}²${L})/${g}²${L}`, r: afL(`LCD = ${g}²${L}.`, `KGV = ${g}²${L}.`) },
      { s: `= ${correct.h}`, r: afL("a masked identity on the top.", "'n gemaskerde identiteit op die teller.") },
    ],
  };
}

const SKILLS = {
  whichSide, lcdItem, whichPartFirst, maskedPick,
  productsItem, kfcItem, coFnIdentity, oneNeedsDenominator,
};

export const questGt9 = {
  id: "gt9",
  stackFractions: true,
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
