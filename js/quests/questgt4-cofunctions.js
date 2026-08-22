/* ============================================================
   GENERAL TRIG · gt4 — Co-functions (the FIRST drill round)
   ------------------------------------------------------------
   METHODS-trig.md Part D (p17–p22). Steps chain: sign (+/−) → sin
   or cos → the value (numeric items only; a variable item drops the
   value step — D6, her design). Mixed numbers and variables from
   question 1. Every sign/ratio comes from triglib's cofunction() —
   nothing here is a hand-typed +/−.

   THE TRAP — cos(90° + θ) = −sinθ (D3) — is the single most-named
   idea in her whole digest. Build note: items 2 and 4 are BOTH
   pinned to fn = "cos" on purpose (not left to a random pick), so
   every single play of this round drills the trap at least twice,
   exactly as the brief's "≥ 2 of the 7 must be 90+ forms with cos"
   asks for — a coin-flip pick could not guarantee that on every
   playthrough. The sin-90+ contrast (sin(90+θ) = +cosθ) still shows
   up, in the hint/answer text for both items rather than as an
   alternate draw, so the trap is what gets repeated.
   ============================================================ */
import { pick, randInt, mcStep, calcStep, argDeg } from "./_gtrig.js";
import { cofunction, fmtDeg } from "../triglib.js";

const CON = "gtrigCofunction";
const H1 = "90 − θ is friendly — quadrant A, everything positive. 90 + θ has crossed into S: only sine stays positive.";
const H2 = "Co-functions CONVERT between sin and cos.";
const H3 = "The angle left over after the 90°.";

// (the "as a cosine" wording was dropped at foreman review — it gave away step 2)

/* ---- item 1 — numeric 90− ---- */
function coNumMinus() {
  const angle = randInt(2, 16) * 5;                 // 10..80
  const fn = pick(["sin", "cos"]);
  const cf = cofunction(fn, "90−");                 // { sign:1, fn2 }
  const value = 90 - angle;
  return {
    type: "steps", concept: CON,
    _dbg: { fn, angle, theta: value },   // harness-only: lets verify-gtrig.html recompute fn(angle) independently
    prompt: `Write ${fn} ${angle}° as a co-function (using 90° − θ).`,
    steps: [
      mcStep("What's the sign?", "+", ["−"], H1),
      mcStep(`${fn} becomes…`, cf.fn2, [fn], H2),
      calcStep("Type the value.", value, H3),
    ],
    hint: H1,
    answerLabel: `${fn} ${angle}° = ${cf.fn2} ${value}° — 90° − θ is quadrant A, everything positive.`,
    solution: [
      { s: "Sign: +", r: "90° − θ is quadrant A — everything positive." },
      { s: `Ratio: ${fn} → ${cf.fn2}`, r: "co-functions convert sin ↔ cos." },
      { s: `Value: ${value}°`, r: `90° − ${angle}° = ${value}°.` },
    ],
  };
}

/* ---- item 2 — numeric 90+, THE TRAP (fn forced to cos) ---- */
function coNumPlus() {
  const theta = randInt(2, 16) * 5;                 // 10..80
  const angle = 90 + theta;                         // 100..170
  const fn = "cos";
  const cf = cofunction(fn, "90+");                 // { sign:-1, fn2:"sin" }
  return {
    type: "steps", concept: CON,
    _dbg: { fn, angle, theta },
    prompt: `Write cos ${angle}° as a co-function (use 90° + θ).`,
    steps: [
      mcStep("What's the sign?", "−", ["+"], H1),
      mcStep("cos becomes…", "sin", ["cos"], H2),
      calcStep("Type the value.", theta, H3),
    ],
    hint: "cos(90° + θ) is THE TRAP: 90° + θ has crossed into S, and cosine is not sine, so it's negative.",
    answerLabel: `cos ${angle}° = −sin ${theta}° — 90° + θ is quadrant S, cosine isn't sine, so it picks up the minus. (Contrast: sin ${angle}° = +cos ${theta}°.)`,
    solution: [
      { s: "Sign: −", r: "90° + θ is quadrant S — only sine stays positive, and cosine is not sine." },
      { s: "Ratio: cos → sin", r: "co-functions convert sin ↔ cos." },
      { s: `Value: ${theta}°`, r: `${angle}° − 90° = ${theta}°.` },
    ],
  };
}

/* ---- item 3 — variable 90− (2 steps, no value pad) ---- */
function coVarMinus() {
  const letter = pick(["θ", "x"]);
  const fn = pick(["sin", "cos"]);
  const cf = cofunction(fn, "90−");
  const STAND_IN = 23;                              // her stand-in θ for a variable item's numeric check
  return {
    type: "steps", concept: CON,
    _dbg: { fn, angle: 90 - STAND_IN, theta: STAND_IN },
    prompt: `${fn}(90° − ${letter}) = ?`,
    steps: [
      mcStep("What's the sign?", "+", ["−"], H1),
      mcStep(`${fn} becomes…`, cf.fn2, [fn], H2),
    ],
    hint: H1,
    answerLabel: `${fn}(90° − ${letter}) = ${cf.fn2} ${letter} — 90° − ${letter} is quadrant A, everything positive.`,
    solution: [
      { s: "Sign: +", r: "90° − θ is quadrant A." },
      { s: `Ratio: ${fn} → ${cf.fn2}`, r: "co-functions convert sin ↔ cos." },
    ],
  };
}

/* ---- item 4 — variable 90+, THE TRAP (fn forced to cos) ---- */
function coVarPlus() {
  const letter = pick(["θ", "x"]);
  const fn = "cos";
  const cf = cofunction(fn, "90+");
  const STAND_IN = 23;
  return {
    type: "steps", concept: CON,
    _dbg: { fn, angle: 90 + STAND_IN, theta: STAND_IN },
    prompt: `cos(90° + ${letter}) = ?`,
    steps: [
      mcStep("What's the sign?", "−", ["+"], H1),
      mcStep("cos becomes…", "sin", ["cos"], H2),
    ],
    hint: "cos(90° + θ) = −sin θ — the single most useful trap in this chapter. 90 + θ crosses into S: only sine stays positive.",
    answerLabel: `cos(90° + ${letter}) = −sin ${letter} — THE TRAP: 90° + ${letter} is quadrant S, cosine isn't sine. (Contrast: sin(90° + ${letter}) = +cos ${letter}.)`,
    solution: [
      { s: "Sign: −", r: "90° + θ is quadrant S." },
      { s: "Ratio: cos → sin", r: "co-functions convert sin ↔ cos." },
    ],
  };
}

/* ---- item 5 — negative co-functions (D4, "but why?" derivation) ---- */
function coNeg() {
  const letter = pick(["θ", "x"]);
  const fn = pick(["sin", "cos"]);
  const cf = cofunction(fn, "θ−90");
  const STAND_IN = 23;
  return {
    type: "steps", concept: CON,
    _dbg: { fn, angle: STAND_IN - 90, theta: STAND_IN },
    prompt: `${fn}(${letter} − 90°) = ?`,
    steps: [
      mcStep("What's the sign?", cf.sign < 0 ? "−" : "+", cf.sign < 0 ? ["+"] : ["−"], H1),
      mcStep(`${fn} becomes…`, cf.fn2, [fn], H2),
    ],
    hint: "let K = 90° − θ — then θ − 90° = −K sits in quadrant IV, where cos survives and sin flips.",
    answerLabel: `${fn}(${letter} − 90°) = ${cf.sign < 0 ? "−" : ""}${cf.fn2} ${letter}.`,
    solution: [
      { s: `Sign: ${cf.sign < 0 ? "−" : "+"}`, r: "let K = 90° − θ; θ − 90° = −K sits in quadrant IV." },
      { s: `Ratio: ${fn} → ${cf.fn2}`, r: "co-functions convert sin ↔ cos." },
    ],
  };
}

/* ---- item 6 — the two-labelling triangle (D1) ---- */
function triSpec() {
  return {
    type: "triangle", w: 260, h: 200, hideNames: true,
    pts: { A: { x: 0, y: 0 }, B: { x: 1, y: 0 }, C: { x: 0, y: Math.sqrt(3) } },
    poly: ["B", "A", "C"],
    angles: [{ at: "A", right: true }, { at: "B", label: "θ" }, { at: "C", label: "90° − θ" }],
    sides: [{ from: "A", to: "B", label: "1" }, { from: "A", to: "C", label: "√3" }, { from: "B", to: "C", label: "2" }],
  };
}
const TWO_LABEL_ITEMS = [
  { given: "sin θ = √3/2", ask: "cos(90° − θ)", correct: "√3/2", wrongs: ["1/2", "√3", "2"] },
  { given: "cos θ = 1/2", ask: "sin(90° − θ)", correct: "1/2", wrongs: ["√3/2", "√3", "2"] },
];
function twoLabelTriangle() {
  const it = pick(TWO_LABEL_ITEMS);
  const seen = new Set([it.correct]);
  const options = [{ label: it.correct, correct: true }];
  it.wrongs.forEach(w => { if (!seen.has(w)) { seen.add(w); options.push({ label: w, correct: false }); } });
  return {
    type: "mc", concept: CON,
    prompt: `${it.given}. So ${it.ask} = ?`,
    options,
    graph: triSpec(),
    hint: "The two acute angles of a right triangle share the SAME sides — they just call them different names.",
    answerLabel: `${it.ask} = ${it.correct} — same triangle, same sides, just relabelled.`,
    solution: [{ s: `${it.ask} = ${it.correct}`, r: "the shared-sides argument (D1)." }],
  };
}

/* ---- item 7 — mixed numeric, full 3-step chain, any co-function form ---- */
function coMixedFull() {
  const form = pick(["90−", "90+", "θ−90"]);
  const theta = randInt(2, 16) * 5;                 // 10..80
  const fn = pick(["sin", "cos"]);
  const angle = form === "90−" ? 90 - theta : form === "90+" ? 90 + theta : theta - 90;
  const cf = cofunction(fn, form);
  return {
    type: "steps", concept: CON,
    _dbg: { fn, angle, theta },
    prompt: `Write ${fn}${argDeg(angle)} as a co-function.`,
    steps: [
      mcStep("What's the sign?", cf.sign < 0 ? "−" : "+", cf.sign < 0 ? ["+"] : ["−"], H1),
      mcStep(`${fn} becomes…`, cf.fn2, [fn], H2),
      calcStep("Type the value.", theta, H3),
    ],
    hint: H1,
    answerLabel: `${fn}${argDeg(angle)} = ${cf.sign < 0 ? "−" : ""}${cf.fn2} ${theta}°.`,
    solution: [
      { s: `Sign: ${cf.sign < 0 ? "−" : "+"}`, r: `${fn}${argDeg(angle)} is a co-function form.` },
      { s: `Ratio: ${fn} → ${cf.fn2}`, r: "co-functions convert sin ↔ cos." },
      { s: `Value: ${theta}°`, r: "the angle left over after the 90°." },
    ],
  };
}

const SKILLS = {
  coNumMinus, coNumPlus, coVarMinus, coVarPlus, coNeg, twoLabelTriangle, coMixedFull,
};

export const questGt4 = {
  id: "gt4",
  stackFractions: true,
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
