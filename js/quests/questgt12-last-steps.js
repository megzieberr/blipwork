/* ============================================================
   GENERAL TRIG · gt12 — GENERAL SOLUTION: the last steps
   ------------------------------------------------------------
   METHODS-trig.md Part L (p45–p68). The whole routine turns on two
   decisions, and this round drills only those two:
     ① which quadrants get a tick   ② what the reference angle is
   The cross is her cross — a vertical line and a horizontal line,
   tapped in the corners (p47), never a 1–4 list.

   Three of her rulings are built in:
   • THE REF ∠ COMES FROM THE POSITIVE VALUE (p44 ①, "don't type −
     into calculator"). The sign has already done its work choosing
     the quadrants; the size of the number is all that is left.
   • TAN GETS ONE LINE ("waste of time!", p47). The full answer for
     tan x = 3 is ticks in ① and ③, and her one-line convention —
     ticking only the first of the pair — is accepted too, through
     the step's alsoAccept.
   • THE BOUNDARY VALUES RUN THE SAME MACHINE (D8). sin θ = −1 is
     ref ∠ = 90° in ③, not "270° read off the graph".
   And the co-function items answer with her "no reference angle"
   button: two different angles, so there is no ref ∠ to find and
   the chain ends at step 1 (p44 ⑥, L3).
   ============================================================ */
import {
  pick, randInt, shuffled, calcStep, fracLabel, negNum,
  T, TRaw, F, eqHtml, eqPlain,
} from "./_gtrig.js";
import { refAngle, solutionQuadrants, boundaryCase } from "../triglib.js";

const CON = "gtrigLastSteps";
const LETTERS = ["θ", "x", "α", "A"];
const CIRC = ["①", "②", "③", "④"];

const H_CROSS = "Sign first: All Strippers Take Cash says which two quadrants a positive or negative value lives in. Tick those on the cross.";
const H_REF = "Don't type − into the calculator — the ref ∠ comes from the SIZE of the number. The sign already chose the quadrants for you.";
const H_TAN = "tan repeats every 180°, so one line is enough — the second one is a waste of time! Ticking both is right too; ticking only the first is the short cut.";
const H_NOREF = "Two DIFFERENT angles, so there is nothing to take an inverse of. Make both sides the same function and match the brackets — no reference angle here at all.";

/* her cross, multi-select, with the "no reference angle" button always
   on screen — that button is what makes the co-function items a real
   decision rather than a give-away */
function crossStep(prompt, correct, hint, alsoAccept) {
  return { kind: "tapcross", single: false, noRef: true, prompt, correct, alsoAccept, hint };
}
const ticksText = qs => qs.map(q => CIRC[q - 1]).join(" and ");

/* ------------------------------------------------------------
   1–3 · sin / cos with a real value: a 2-decimal number or one of
   her simple fractions
   ------------------------------------------------------------ */
function decimalItem(shape) {
  return function () {
    const f = pick(["sin", "cos"]);
    const L = pick(LETTERS);
    const useFrac = pick([true, false]);
    const sign = pick([1, -1]);
    let value, valueText;
    if (useFrac) {
      const den = pick([2, 3, 4, 5]);
      const num = randInt(1, den - 1);
      value = sign * num / den;
      valueText = fracLabel(sign * num, den);
    } else {
      const mag = randInt(15, 95) / 100;
      value = sign * mag;
      valueText = negNum(value);
    }
    const quadrants = solutionQuadrants(f, sign);
    const ref = refAngle(f, value);

    /* a plain θ, or the whole bracket treated as the unknown (p49) */
    const bracket = shape === "bracket" ? randInt(2, 12) * 5 : 0;
    const eq = { lhs: [T(1, F(f, 1, -bracket))], rhs: [TRaw(valueText, value)] };

    return {
      type: "steps", concept: CON,
      _dbg: { fn: f, value, quadrants, ref, noref: false, plain: eqPlain(eq, L) },
      prompt: eqHtml(eq, L),
      steps: [
        crossStep("Tick the quadrants on the cross.", quadrants, H_CROSS),
        calcStep("ref. ∠ = ?", ref, H_REF, { dp: 2 }),
      ],
      hint: H_CROSS,
      answerLabel: `✓ in ${ticksText(quadrants)} · ref. ∠ = ${negNum(Math.round(ref * 100) / 100)}°`
        + `<br><span class="muted small">${f} is ${sign > 0 ? "+" : "−"} in ${ticksText(quadrants)}; the ref ∠ comes from ${negNum(Math.abs(value))}, never from the minus.</span>`,
      solution: [
        { s: `${f} ${bracket ? `(${L} − ${bracket}°)` : L} = ${valueText} → ${ticksText(quadrants)}`, r: "All Strippers Take Cash." },
        { s: `ref. ∠ = ${negNum(Math.round(ref * 100) / 100)}°`, r: "taken from the size of the number, never from the minus." },
      ],
    };
  };
}

/* ------------------------------------------------------------
   4 · tan — her ONE-LINE ruling (p47, p48, p66, p68)
   ------------------------------------------------------------ */
function tanItem() {
  const L = pick(LETTERS);
  const sign = pick([1, -1]);
  const mag = pick([true, false]) ? randInt(2, 6) : randInt(15, 95) / 10;
  const value = sign * mag;
  const quadrants = solutionQuadrants("tan", sign);
  const ref = refAngle("tan", value);
  const eq = { lhs: [T(1, F("tan"))], rhs: [T(value)] };
  return {
    type: "steps", concept: CON,
    _dbg: { fn: "tan", value, quadrants, ref, noref: false, plain: eqPlain(eq, L) },
    prompt: eqHtml(eq, L),
    steps: [
      crossStep("Tick the quadrants on the cross.", quadrants, H_TAN, [[quadrants[0]]]),
      calcStep("ref. ∠ = ?", ref, H_REF, { dp: 2 }),
    ],
    hint: H_TAN,
    answerLabel: `✓ in ${ticksText(quadrants)} — and ${CIRC[quadrants[0] - 1]} on its own is accepted, because tan repeats every 180° and the second line is a waste of time! · ref. ∠ = ${negNum(Math.round(ref * 100) / 100)}°`,
    solution: [
      { s: `tan ${L} = ${negNum(value)} → ${ticksText(quadrants)}`, r: "All Strippers Take Cash." },
      { s: `${L} = ref. ∠ + K.180°`, r: "ONE line — tan repeats every 180°." },
      { s: `ref. ∠ = ${negNum(Math.round(ref * 100) / 100)}°`, r: "from the size of the number." },
    ],
  };
}

/* ------------------------------------------------------------
   5–6 · the boundary values (D8) — same machine, not read off a graph
   ------------------------------------------------------------ */
const BOUNDARIES = [
  { fn: "cos", value: 0 }, { fn: "sin", value: -1 }, { fn: "cos", value: -1 },
  { fn: "sin", value: 0 }, { fn: "sin", value: 1 }, { fn: "cos", value: 1 },
];
function boundaryItem() {
  const L = pick(LETTERS);
  const b = pick(BOUNDARIES);
  const bc = boundaryCase(b.fn, b.value);
  const eq = { lhs: [T(1, F(b.fn))], rhs: [T(b.value)] };
  return {
    type: "steps", concept: CON,
    _dbg: { fn: b.fn, value: b.value, quadrants: bc.quadrants, ref: bc.ref, noref: false, boundary: true, plain: eqPlain(eq, L) },
    prompt: eqHtml(eq, L),
    steps: [
      crossStep("Tick the quadrants on the cross.", bc.quadrants, "A boundary value still gets a cross and a ref ∠ — the same machine, so it stays reliable. Which quadrants does the axis it lands on touch?"),
      calcStep("ref. ∠ = ?", bc.ref, "0° or 90°. The ref ∠ of a boundary value is one of those two, and it comes out of the size of the value the same way as any other.", { dp: 2 }),
    ],
    hint: "Run the routine even here rather than reading the answer off a graph — that is what keeps it reliable.",
    answerLabel: `✓ in ${ticksText(bc.quadrants)} · ref. ∠ = ${bc.ref}°`
      + `<br><span class="muted small">Run the routine here too — never read these off a graph.</span>`,
    solution: [
      { s: `${b.fn} ${L} = ${negNum(b.value)} → ${ticksText(bc.quadrants)}`, r: "the same routine as any other value, not read off a graph." },
      { s: `ref. ∠ = ${bc.ref}°`, r: "the boundary reference angle." },
    ],
  };
}

/* ------------------------------------------------------------
   7–8 · CO-FUNCTIONS — no reference angle at all (p44 ⑥, L3)
   The chain is step 1 only: pressing "no reference angle" IS the
   whole answer.
   ------------------------------------------------------------ */
const COFN_SHAPES = [
  () => { const d = randInt(10, 17) * 5, k = randInt(2, 3); return { lhs: [T(1, F("sin", 1, d))], rhs: [T(1, F("sin", k))] }; },
  () => { const k = randInt(2, 4), d = randInt(1, 5) * 5; return { lhs: [T(1, F("cos", k, d))], rhs: [T(1, F("sin"))] }; },
  () => { const d = randInt(5, 12) * 5, k = randInt(2, 3); return { lhs: [T(1, F("sin", 1, -d))], rhs: [T(1, F("cos", k))] }; },
  () => { const k = randInt(2, 4), d = randInt(7, 15) * 5; return { lhs: [T(1, F("sin", k))], rhs: [T(1, F("cos", 0, d))] }; },
];
function coFnItem() {
  const L = pick(LETTERS);
  const eq = pick(COFN_SHAPES)();
  const angs = [...eq.lhs, ...eq.rhs].flatMap(t => t.f.map(f => `${f.a.k}:${f.a.d}`));
  if (new Set(angs).size < 2) throw new Error("gt12: a no-reference-angle item needs two different angles");
  return {
    type: "steps", concept: CON,
    _dbg: { noref: true, plain: eqPlain(eq, L) },
    prompt: eqHtml(eq, L),
    steps: [
      crossStep("Tick the quadrants on the cross.", "noref", H_NOREF),
    ],
    hint: H_NOREF,
    answerLabel: "No reference angle. The two angles are different, so you make both sides the same function and match the brackets — there is no inverse to take.",
    solution: [
      { s: "Different ∠s on the two sides", r: "that makes it a co-function question — type ⑥." },
      { s: "no ref. ∠", r: "make both the same function, then match the brackets." },
    ],
  };
}

const SKILLS = {
  dec1: decimalItem("plain"), dec2: decimalItem("plain"), dec3: decimalItem("bracket"),
  tanItem,
  bound1: boundaryItem, bound2: boundaryItem,
  cofn1: coFnItem, cofn2: coFnItem,
};

export const questGt12 = {
  id: "gt12",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
