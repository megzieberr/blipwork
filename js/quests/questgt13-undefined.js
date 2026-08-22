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

const CON = "gtrigUndefined";
const LETTERS = ["x", "θ"];

const H_PICK = "Look at the BOTTOM of every fraction — those are the only things that can break. A tan does not get its own line: tan is sin over cos, so its cos is already on the list.";
const H_ZERO = "A fraction dies when its bottom is nothing at all.";
const H_FACT = "Solve it like any other equation — get the ratio on its own, and then it is an ordinary general solution.";
const ROUTINE = "List every denominator, set each one = 0, solve each as a general solution, then read the interval off the list.";

/* ---- the never-zero decoy bank. Every one of these has |value| ≥ 1
   for every x, so none of them is secretly a second right answer. ---- */
const NEVER_ZERO = L => [
  { label: "1", f: () => 1 },
  { label: "2", f: () => 2 },
  { label: `2 + sin ${L}`, f: t => 2 + sinD(t) },
  { label: `2 − cos ${L}`, f: t => 2 - cosD(t) },
  { label: `1 + cos²${L}`, f: t => 1 + cosD(t) ** 2 },
  { label: `sin²${L} + cos²${L}`, f: () => 1 },
];

/* ---- the facts step 3 can ask about, one per denominator shape ---- */
const FACTS = {
  "1+sin": L => ({ q: `1 + sin ${L} = 0 gives…`, correct: `sin ${L} = −1` }),
  "1-sin": L => ({ q: `1 − sin ${L} = 0 gives…`, correct: `sin ${L} = 1` }),
  "1+cos": L => ({ q: `1 + cos ${L} = 0 gives…`, correct: `cos ${L} = −1` }),
  "1-cos": L => ({ q: `1 − cos ${L} = 0 gives…`, correct: `cos ${L} = 1` }),
  "sin2": L => ({ q: `sin²${L} = 0 gives…`, correct: `sin ${L} = 0` }),
};
const FACT_DECOY_POOL = L => [`sin ${L} = −1`, `sin ${L} = 1`, `sin ${L} = 0`, `cos ${L} = −1`, `cos ${L} = 1`, `cos ${L} = 0`];

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
    note: `the tan does not get its own line — tan ${L} is sin ${L} over cos ${L}, so its cos ${L} is already on the list.`,
  }),
  L => ({
    html: `${tfrac("1", `1 − sin ${L}`)} − ${tfrac("1", `1 + sin ${L}`)} = ${tfrac(`2 tan ${L}`, `cos ${L}`)}`,
    dens: [D["1-sin"](L), D["1+sin"](L), D.cos(L)],
    note: "three denominators, three conditions — and they collapse into one family, because the zeros sit 180° apart.",
  }),
  L => ({
    html: `${tfrac(`sin ${L}`, `1 − cos ${L}`)} = ${tfrac(`1 + cos ${L}`, `sin ${L}`)}`,
    dens: [D["1-cos"](L), D.sin(L)],
    note: "both sides count — a denominator on the right breaks the identity just as thoroughly as one on the left.",
  }),
  L => ({
    html: `${tfrac(`cos ${L}`, `sin ${L}`)} + ${tfrac("1", `1 − sin ${L}`)} = 3`,
    dens: [D.sin(L), D["1-sin"](L)],
    note: `the cos ${L} on top of the first fraction is a numerator — numerators are allowed to be zero.`,
  }),
  L => ({
    html: `${tfrac(`cos ${L}`, `1 + sin ${L}`)} + ${tfrac("1", `cos ${L}`)} = 2`,
    dens: [D["1+sin"](L), D.cos(L)],
    note: "two fractions, two bottoms, two conditions.",
  }),
  L => ({
    html: `${tfrac("1", `1 + cos ${L}`)} + ${tfrac("1", `1 − cos ${L}`)} = ${tfrac("2", `sin²${L}`)}`,
    dens: [D["1+cos"](L), D["1-cos"](L), D.sin2(L)],
    note: `sin²${L} counts too — a square is zero exactly where the thing inside it is.`,
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
  const fact = (FACTS[factDen.key] || (() => ({ q: `${factDen.label} = 0 gives…`, correct: `${factDen.label} = 0` })))(L);
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
    prompt: `For which values of ${L} is this undefined?<br><span class="q-eq">${shape.html}</span>`,
    steps: [
      mcMultiStep("Which expressions must we look at? Tap every one, then Submit.", labels, correctIdx, H_PICK),
      calcStep("And each of those must be equated to…", 0, H_ZERO, { unit: "", allowNeg: true }),
      { kind: "mc", prompt: fact.q, options: factOptions, hint: H_FACT },
    ],
    hint: H_PICK,
    answerLabel: `Denominators: ${shape.dens.map(d => d.label).join(", ")} — each one of them = 0.`
      + `<br><span class="muted small">${ROUTINE} <br>${shape.note}</span>`,
    solution: [
      { s: `Denominators: ${shape.dens.map(d => d.label).join(", ")}`, r: "undefined ↳ denominator = 0." },
      { s: shape.dens.map(d => `${d.label} = 0`).join("  or  "), r: "set each one to zero." },
      { s: `${fact.correct}`, r: "then solve each as an ordinary general solution." },
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
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
