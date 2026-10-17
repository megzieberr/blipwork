/* ============================================================
   GENERAL TRIG · gt13 — UNDEFINED VALUES
   ------------------------------------------------------------
   METHODS-trig.md Part M (p62–p63). Her heading is two words:
   "UNDEFINED VALUES ↳ denominator = 0", and her routine is four
   moves: list every denominator, set each = 0, solve each as a
   general solution, then read the interval off the list.

   This round drills the FIRST two, which is where her kids lose it:
     ① which expressions are the denominators (a multi-pick — one
        answer made of several taps, so nothing is marked until
        Submit is pressed)
     ② what each one has to be equated to
     ③ and what that then tells you about the ratio
   Her note on p62 is built in: `tan x` is NOT listed separately —
   its own `cos x` covers it — so a tan in the equation puts cos x
   on the list and nothing else.

   DECOYS: every wrong option in the list is an expression that can
   NEVER be zero (1, 2, 2 + sin x, 1 + cos²x …). That is deliberate
   and it is what the harness checks: a decoy that CAN hit zero would
   be a second right answer wearing a wrong answer's coat. The brief
   suggested "sin x where it is not a denominator" as a decoy; sin x
   crosses zero, so it would break that rule and it is not used.
   ============================================================ */
import { pick, randInt, shuffled, calcStep, mcMultiStep, tfrac } from "./_gtrig.js";
import { sinD, cosD, tanD } from "../triglib.js";
import { L as afL } from "../lang.js";

const CON = "gtrigUndefined";
const LETTERS = [afL("x", "x"), afL("θ", "θ")];

const H_PICK = afL("Look at the BOTTOM of every fraction — those are the only things that can break. A tan does not get its own line: tan is sin over cos, so its cos is already on the list.", "Kyk na die ONDERKANT van elke breuk: dit is die enigste dinge wat kan breek. tan kry nie sy eie reël nie: tan is sin oor cos, dus is sy cos reeds op die lys.");
const H_ZERO = afL("A fraction dies when its bottom is nothing at all.", "'n Breuk gaan dood as sy onderkant glad niks is nie.");
const H_FACT = afL("Solve it like any other equation — get the ratio on its own, and then it is an ordinary general solution.", "Los dit op soos enige ander vergelyking: kry die verhouding alleen, en dan is dit 'n gewone algemene oplossing.");
const ROUTINE = afL("List every denominator, set each one = 0, solve each as a general solution, then read the interval off the list.", "Lys elke noemer, stel elkeen = 0, los elkeen op as 'n algemene oplossing, en lees dan die interval van die lys af.");

/* ---- the never-zero decoy bank. Every one of these has |value| ≥ 1
   for every x, so none of them is secretly a second right answer. ---- */
const NEVER_ZERO = L => [
  { label: "1", f: () => 1 },
  { label: "2", f: () => 2 },
  { label: afL(`2 + sin ${L}`, `2 + sin ${L}`), f: t => 2 + sinD(t) },
  { label: afL(`2 − cos ${L}`, `2 − cos ${L}`), f: t => 2 - cosD(t) },
  { label: afL(`1 + cos²${L}`, `1 + cos²${L}`), f: t => 1 + cosD(t) ** 2 },
  { label: afL(`sin²${L} + cos²${L}`, `sin²${L} + cos²${L}`), f: () => 1 },
];

/* ---- the facts step 3 can ask about, one per denominator shape ---- */
const FACTS = {
  "1+sin": L => ({ q: afL(`1 + sin ${L} = 0 gives…`, `1 + sin ${L} = 0 gee…`), correct: afL(`sin ${L} = −1`, `sin ${L} = −1`) }),
  "1-sin": L => ({ q: afL(`1 − sin ${L} = 0 gives…`, `1 − sin ${L} = 0 gee…`), correct: afL(`sin ${L} = 1`, `sin ${L} = 1`) }),
  "1+cos": L => ({ q: afL(`1 + cos ${L} = 0 gives…`, `1 + cos ${L} = 0 gee…`), correct: afL(`cos ${L} = −1`, `cos ${L} = −1`) }),
  "1-cos": L => ({ q: afL(`1 − cos ${L} = 0 gives…`, `1 − cos ${L} = 0 gee…`), correct: afL(`cos ${L} = 1`, `cos ${L} = 1`) }),
  "sin2": L => ({ q: afL(`sin²${L} = 0 gives…`, `sin²${L} = 0 gee…`), correct: afL(`sin ${L} = 0`, `sin ${L} = 0`) }),
};
const FACT_DECOY_POOL = L => [afL(`sin ${L} = −1`, `sin ${L} = −1`), afL(`sin ${L} = 1`, `sin ${L} = 1`), afL(`sin ${L} = 0`, `sin ${L} = 0`), afL(`cos ${L} = −1`, `cos ${L} = −1`), afL(`cos ${L} = 1`, `cos ${L} = 1`), afL(`cos ${L} = 0`, `cos ${L} = 0`)];

/* ---- the pool of equations (p62–p63 shapes, fresh) ---- */
const D = {
  "1+sin": L => ({ key: "1+sin", label: `1 + sin ${L}`, f: t => 1 + sinD(t) }),
  "1-sin": L => ({ key: "1-sin", label: `1 − sin ${L}`, f: t => 1 - sinD(t) }),
  "1+cos": L => ({ key: "1+cos", label: `1 + cos ${L}`, f: t => 1 + cosD(t) }),
  "1-cos": L => ({ key: "1-cos", label: `1 − cos ${L}`, f: t => 1 - cosD(t) }),
  cos: L => ({ key: "cos", label: `cos ${L}`, f: t => cosD(t) }),
  sin: L => ({ key: "sin", label: `sin ${L}`, f: t => sinD(t) }),
  sin2: L => ({ key: "sin2", label: `sin²${L}`, f: t => sinD(t) ** 2 }),
};

const SHAPES = [
  L => ({
    html: `tan ${L} + ${tfrac(`cos ${L}`, `1 + sin ${L}`)} = ${tfrac("1", `cos ${L}`)}`,
    dens: [D["1+sin"](L), D.cos(L)],
    note: afL(`the tan does not get its own line — tan ${L} is sin ${L} over cos ${L}, so its cos ${L} is already on the list.`, `die tan kry nie sy eie reël nie: tan ${L} is sin ${L} oor cos ${L}, dus is sy cos ${L} reeds op die lys.`),
  }),
  L => ({
    html: `${tfrac("1", `1 − sin ${L}`)} − ${tfrac("1", `1 + sin ${L}`)} = ${tfrac(`2 tan ${L}`, `cos ${L}`)}`,
    dens: [D["1-sin"](L), D["1+sin"](L), D.cos(L)],
    note: afL("three denominators, three conditions — and they collapse into one family, because the zeros sit 180° apart.", "drie noemers, drie voorwaardes, en hulle smelt saam tot een familie, want die nulle lê 180° uitmekaar."),
  }),
  L => ({
    html: `${tfrac(`sin ${L}`, `1 − cos ${L}`)} = ${tfrac(`1 + cos ${L}`, `sin ${L}`)}`,
    dens: [D["1-cos"](L), D.sin(L)],
    note: afL("both sides count — a denominator on the right breaks the identity just as thoroughly as one on the left.", "albei kante tel: 'n noemer aan die regterkant breek die identiteit net so deeglik as een aan die linkerkant."),
  }),
  L => ({
    html: `${tfrac(`cos ${L}`, `sin ${L}`)} + ${tfrac("1", `1 − sin ${L}`)} = 3`,
    dens: [D.sin(L), D["1-sin"](L)],
    note: afL(`the cos ${L} on top of the first fraction is a numerator — numerators are allowed to be zero.`, `die cos ${L} bo-op die eerste breuk is 'n teller: tellers mag nul wees.`),
  }),
  L => ({
    html: `${tfrac(`cos ${L}`, `1 + sin ${L}`)} + ${tfrac("1", `cos ${L}`)} = 2`,
    dens: [D["1+sin"](L), D.cos(L)],
    note: afL("two fractions, two bottoms, two conditions.", "twee breuke, twee onderkante, twee voorwaardes."),
  }),
  L => ({
    html: `${tfrac("1", `1 + cos ${L}`)} + ${tfrac("1", `1 − cos ${L}`)} = ${tfrac("2", `sin²${L}`)}`,
    dens: [D["1+cos"](L), D["1-cos"](L), D.sin2(L)],
    note: afL(`sin²${L} counts too — a square is zero exactly where the thing inside it is.`, `sin²${L} tel ook: 'n kwadraat is nul presies waar die ding binne-in nul is.`),
  }),
];

function undefinedQ(shapeIdxs) {
  const L = pick(LETTERS);
  const shape = SHAPES[pick(shapeIdxs)](L);

  /* the option list: every denominator plus three that can never be
     zero, in one shuffled list */
  const decoys = shuffled(NEVER_ZERO(L)).slice(0, 3);
  const all = shuffled([...shape.dens.map(d => ({ ...d, isDen: true })), ...decoys.map(d => ({ ...d, isDen: false }))]);
  const labels = all.map(o => o.label);
  const correctIdx = all.map((o, i) => (o.isDen ? i : -1)).filter(i => i >= 0);

  /* step 3 asks about a denominator that actually has something to
     say — `cos x = 0` and `sin x = 0` are already the answer, so the
     question goes to a 1 ± ratio (or the squared one) when there is one */
  const factDen = shape.dens.find(d => FACTS[d.key]) || shape.dens[0];
  const fact = (FACTS[factDen.key] || (() => ({ q: afL(`${factDen.label} = 0 gives…`, `${factDen.label} = 0 gee…`), correct: `${factDen.label} = 0` })))(L);
  const factDecoys = FACT_DECOY_POOL(L).filter(s => s !== fact.correct);
  const factOptions = shuffled([
    { label: fact.correct, correct: true },
    ...shuffled(factDecoys).slice(0, 3).map(s => ({ label: s, correct: false })),
  ]);

  return {
    type: "steps", concept: CON,
    _dbg: {
      labels, correctIdx,
      fns: all.map(o => o.f),
      denKeys: shape.dens.map(d => d.key),
    },
    prompt: afL(`For which values of ${L} is this undefined?<br><span class="q-eq">${shape.html}</span>`, `Vir watter waardes van ${L} is dit onbepaald?<br><span class="q-eq">${shape.html}</span>`),
    steps: [
      mcMultiStep(afL("Which expressions must we look at? Tap every one, then Submit.", "Na watter uitdrukkings moet ons kyk? Klik op elkeen, dan op Submit."), labels, correctIdx, H_PICK),
      calcStep(afL("And each of those must be equated to…", "En elkeen daarvan moet gelykgestel word aan…"), 0, H_ZERO, { unit: "", allowNeg: true }),
      { kind: "mc", prompt: fact.q, options: factOptions, hint: H_FACT },
    ],
    hint: H_PICK,
    answerLabel: afL(`Denominators: ${shape.dens.map(d => d.label).join(", ")} — each one of them = 0.`, `Noemers: ${shape.dens.map(d => d.label).join(", ")}, elkeen daarvan = 0.`)
      + `<br><span class="muted small">${ROUTINE} <br>${shape.note}</span>`,
    solution: [
      { s: afL(`Denominators: ${shape.dens.map(d => d.label).join(", ")}`, `Noemers: ${shape.dens.map(d => d.label).join(", ")}`), r: afL("undefined ↳ denominator = 0.", "onbepaald ↳ noemer = 0.") },
      { s: shape.dens.map(d => `${d.label} = 0`).join(afL("  or  ", "  of  ")), r: afL("set each one to zero.", "stel elkeen gelyk aan nul.") },
      { s: `${fact.correct}`, r: afL("then solve each as an ordinary general solution.", "los dan elkeen op as 'n gewone algemene oplossing.") },
    ],
  };
}

/* six slots; each draws from a PAIR of shapes so a "try a similar one"
   is genuinely similar without ever being the identical equation twice */
const slot = (a, b) => () => undefinedQ([a, b]);
const SKILLS = {
  item1: slot(0, 4), item2: slot(1, 5), item3: slot(2, 3),
  item4: slot(3, 0), item5: slot(4, 1), item6: slot(5, 2),
};

export const questGt13 = {
  id: "gt13",
  stackFractions: true,
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
