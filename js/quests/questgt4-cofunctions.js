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
import { L } from "../lang.js";

const CON = "gtrigCofunction";
const H1 = L("90 − θ is friendly — quadrant A, everything positive. 90 + θ has crossed into S: only sine stays positive.", "90 − θ is vriendelik: kwadrant A, alles positief. 90 + θ het oorgesteek na S: net sin bly positief.");
const H2 = L("Co-functions CONVERT between sin and cos.", "Ko-funksies SKAKEL OM tussen sin en cos.");
const H3 = L("The angle left over after the 90°.", "Die hoek wat oorbly ná die 90°.");

// (the "as a cosine" wording was dropped at foreman review — it gave away step 2)

/* ---- item 1 — numeric 90− ---- */
function coNumMinus() {
  const angle = randInt(2, 16) * 5;                 // 10..80
  const fn = pick([L("sin", "sin"), L("cos", "cos")]);
  const cf = cofunction(fn, "90−");                 // { sign:1, fn2 }
  const value = 90 - angle;
  return {
    type: "steps", concept: CON,
    _dbg: { fn, angle, theta: value },   // harness-only: lets verify-gtrig.html recompute fn(angle) independently
    prompt: L(`Write ${fn} ${angle}° as a co-function (using 90° − θ).`, `Skryf ${fn} ${angle}° as 'n ko-funksie (met 90° − θ).`),
    steps: [
      mcStep(L("What's the sign?", "Wat is die teken?"), "+", ["−"], H1),
      mcStep(L(`${fn} becomes…`, `${fn} word…`), cf.fn2, [fn], H2),
      calcStep(L("Type the value.", "Tik die waarde in."), value, H3),
    ],
    hint: H1,
    answerLabel: L(`${fn} ${angle}° = ${cf.fn2} ${value}° — 90° − θ is quadrant A, everything positive.`, `${fn} ${angle}° = ${cf.fn2} ${value}°: 90° − θ is kwadrant A, alles positief.`),
    solution: [
      { s: L("Sign: +", "Teken: +"), r: L("90° − θ is quadrant A — everything positive.", "90° − θ is kwadrant A: alles positief.") },
      { s: L(`Ratio: ${fn} → ${cf.fn2}`, `Verhouding: ${fn} → ${cf.fn2}`), r: L("co-functions convert sin ↔ cos.", "ko-funksies skakel sin ↔ cos om.") },
      { s: L(`Value: ${value}°`, `Waarde: ${value}°`), r: `90° − ${angle}° = ${value}°.` },
    ],
  };
}

/* ---- item 2 — numeric 90+, THE TRAP (fn forced to cos) ---- */
function coNumPlus() {
  const theta = randInt(2, 16) * 5;                 // 10..80
  const angle = 90 + theta;                         // 100..170
  const fn = L("cos", "cos");
  const cf = cofunction(fn, "90+");                 // { sign:-1, fn2:"sin" }
  return {
    type: "steps", concept: CON,
    _dbg: { fn, angle, theta },
    prompt: L(`Write cos ${angle}° as a co-function (use 90° + θ).`, `Skryf cos ${angle}° as 'n ko-funksie (gebruik 90° + θ).`),
    steps: [
      mcStep(L("What's the sign?", "Wat is die teken?"), "−", ["+"], H1),
      mcStep(L("cos becomes…", "cos word…"), L("sin", "sin"), [L("cos", "cos")], H2),
      calcStep(L("Type the value.", "Tik die waarde in."), theta, H3),
    ],
    hint: L("cos(90° + θ) is THE TRAP: 90° + θ has crossed into S, and cosine is not sine, so it's negative.", "cos(90° + θ) is DIE SLAGGAT: 90° + θ het oorgesteek na S, en cos is nie sin nie, dus is dit negatief."),
    answerLabel: L(`cos ${angle}° = −sin ${theta}° — 90° + θ is quadrant S, cosine isn't sine, so it picks up the minus. (Contrast: sin ${angle}° = +cos ${theta}°.)`, `cos ${angle}° = −sin ${theta}°: 90° + θ is kwadrant S, cos is nie sin nie, dus kry dit die minus. (Vergelyk: sin ${angle}° = +cos ${theta}°.)`),
    solution: [
      { s: L("Sign: −", "Teken: −"), r: L("90° + θ is quadrant S — only sine stays positive, and cosine is not sine.", "90° + θ is kwadrant S: net sin bly positief, en cos is nie sin nie.") },
      { s: L("Ratio: cos → sin", "Verhouding: cos → sin"), r: L("co-functions convert sin ↔ cos.", "ko-funksies skakel sin ↔ cos om.") },
      { s: L(`Value: ${theta}°`, `Waarde: ${theta}°`), r: `${angle}° − 90° = ${theta}°.` },
    ],
  };
}

/* ---- item 3 — variable 90− (2 steps, no value pad) ---- */
function coVarMinus() {
  const letter = pick([L("θ", "θ"), L("x", "x")]);
  const fn = pick([L("sin", "sin"), L("cos", "cos")]);
  const cf = cofunction(fn, "90−");
  const STAND_IN = 23;                              // her stand-in θ for a variable item's numeric check
  return {
    type: "steps", concept: CON,
    _dbg: { fn, angle: 90 - STAND_IN, theta: STAND_IN },
    prompt: `${fn}(90° − ${letter}) = ?`,
    steps: [
      mcStep(L("What's the sign?", "Wat is die teken?"), "+", ["−"], H1),
      mcStep(L(`${fn} becomes…`, `${fn} word…`), cf.fn2, [fn], H2),
    ],
    hint: H1,
    answerLabel: L(`${fn}(90° − ${letter}) = ${cf.fn2} ${letter} — 90° − ${letter} is quadrant A, everything positive.`, `${fn}(90° − ${letter}) = ${cf.fn2} ${letter}: 90° − ${letter} is kwadrant A, alles positief.`),
    solution: [
      { s: L("Sign: +", "Teken: +"), r: L("90° − θ is quadrant A.", "90° − θ is kwadrant A.") },
      { s: L(`Ratio: ${fn} → ${cf.fn2}`, `Verhouding: ${fn} → ${cf.fn2}`), r: L("co-functions convert sin ↔ cos.", "ko-funksies skakel sin ↔ cos om.") },
    ],
  };
}

/* ---- item 4 — variable 90+, THE TRAP (fn forced to cos) ---- */
function coVarPlus() {
  const letter = pick([L("θ", "θ"), L("x", "x")]);
  const fn = L("cos", "cos");
  const cf = cofunction(fn, "90+");
  const STAND_IN = 23;
  return {
    type: "steps", concept: CON,
    _dbg: { fn, angle: 90 + STAND_IN, theta: STAND_IN },
    prompt: L(`cos(90° + ${letter}) = ?`, `cos(90° + ${letter}) = ?`),
    steps: [
      mcStep(L("What's the sign?", "Wat is die teken?"), "−", ["+"], H1),
      mcStep(L("cos becomes…", "cos word…"), L("sin", "sin"), [L("cos", "cos")], H2),
    ],
    hint: L("cos(90° + θ) = −sin θ — the single most useful trap in this chapter. 90 + θ crosses into S: only sine stays positive.", "cos(90° + θ) = −sin θ: die nuttigste slaggat in hierdie hoofstuk. 90 + θ steek oor na S: net sin bly positief."),
    answerLabel: L(`cos(90° + ${letter}) = −sin ${letter} — THE TRAP: 90° + ${letter} is quadrant S, cosine isn't sine. (Contrast: sin(90° + ${letter}) = +cos ${letter}.)`, `cos(90° + ${letter}) = −sin ${letter}, DIE SLAGGAT: 90° + ${letter} is kwadrant S, cos is nie sin nie. (Vergelyk: sin(90° + ${letter}) = +cos ${letter}.)`),
    solution: [
      { s: L("Sign: −", "Teken: −"), r: L("90° + θ is quadrant S.", "90° + θ is kwadrant S.") },
      { s: L("Ratio: cos → sin", "Verhouding: cos → sin"), r: L("co-functions convert sin ↔ cos.", "ko-funksies skakel sin ↔ cos om.") },
    ],
  };
}

/* ---- item 5 — negative co-functions (D4, "but why?" derivation) ---- */
function coNeg() {
  const letter = pick([L("θ", "θ"), L("x", "x")]);
  const fn = pick([L("sin", "sin"), L("cos", "cos")]);
  const cf = cofunction(fn, "θ−90");
  const STAND_IN = 23;
  return {
    type: "steps", concept: CON,
    _dbg: { fn, angle: STAND_IN - 90, theta: STAND_IN },
    prompt: `${fn}(${letter} − 90°) = ?`,
    steps: [
      mcStep(L("What's the sign?", "Wat is die teken?"), cf.sign < 0 ? "−" : "+", cf.sign < 0 ? ["+"] : ["−"], H1),
      mcStep(L(`${fn} becomes…`, `${fn} word…`), cf.fn2, [fn], H2),
    ],
    hint: L("let K = 90° − θ — then θ − 90° = −K sits in quadrant IV, where cos survives and sin flips.", "stel K = 90° − θ: dan lê θ − 90° = −K in kwadrant IV, waar cos oorleef en sin omdraai."),
    answerLabel: `${fn}(${letter} − 90°) = ${cf.sign < 0 ? "−" : ""}${cf.fn2} ${letter}.`,
    solution: [
      { s: L(`Sign: ${cf.sign < 0 ? "−" : "+"}`, `Teken: ${cf.sign < 0 ? "−" : "+"}`), r: L("let K = 90° − θ; θ − 90° = −K sits in quadrant IV.", "stel K = 90° − θ; θ − 90° = −K lê in kwadrant IV.") },
      { s: L(`Ratio: ${fn} → ${cf.fn2}`, `Verhouding: ${fn} → ${cf.fn2}`), r: L("co-functions convert sin ↔ cos.", "ko-funksies skakel sin ↔ cos om.") },
    ],
  };
}

/* ---- item 6 — the two-labelling triangle (D1) ---- */
function triSpec() {
  return {
    type: "triangle", w: 260, h: 200, hideNames: true,
    pts: { A: { x: 0, y: 0 }, B: { x: 1, y: 0 }, C: { x: 0, y: Math.sqrt(3) } },
    poly: ["B", "A", "C"],
    angles: [{ at: "A", right: true }, { at: "B", label: L("θ", "θ") }, { at: "C", label: "90° − θ" }],
    sides: [{ from: "A", to: "B", label: "1" }, { from: "A", to: "C", label: "√3" }, { from: "B", to: "C", label: "2" }],
  };
}
const TWO_LABEL_ITEMS = [
  { given: L("sin θ = √3/2", "sin θ = √3/2"), ask: L("cos(90° − θ)", "cos(90° − θ)"), correct: "√3/2", wrongs: ["1/2", "√3", "2"] },
  { given: L("cos θ = 1/2", "cos θ = 1/2"), ask: L("sin(90° − θ)", "sin(90° − θ)"), correct: "1/2", wrongs: ["√3/2", "√3", "2"] },
];
function twoLabelTriangle() {
  const it = pick(TWO_LABEL_ITEMS);
  const seen = new Set([it.correct]);
  const options = [{ label: it.correct, correct: true }];
  it.wrongs.forEach(w => { if (!seen.has(w)) { seen.add(w); options.push({ label: w, correct: false }); } });
  return {
    type: "mc", concept: CON,
    prompt: L(`${it.given}. So ${it.ask} = ?`, `${it.given}. Wat is ${it.ask} dan?`),
    options,
    graph: triSpec(),
    hint: L("The two acute angles of a right triangle share the SAME sides — they just call them different names.", "Die twee skerp hoeke van 'n reghoekige driehoek deel DIESELFDE sye: hulle gee net ander name daarvoor."),
    answerLabel: L(`${it.ask} = ${it.correct} — same triangle, same sides, just relabelled.`, `${it.ask} = ${it.correct}: dieselfde driehoek, dieselfde sye, net anders benoem.`),
    solution: [{ s: `${it.ask} = ${it.correct}`, r: L("the shared-sides argument.", "die argument van die gedeelde sye.") }],
  };
}

/* ---- item 7 — mixed numeric, full 3-step chain, any co-function form ---- */
function coMixedFull() {
  const form = pick(["90−", "90+", "θ−90"]);
  const theta = randInt(2, 16) * 5;                 // 10..80
  const fn = pick([L("sin", "sin"), L("cos", "cos")]);
  const angle = form === "90−" ? 90 - theta : form === "90+" ? 90 + theta : theta - 90;
  const cf = cofunction(fn, form);
  return {
    type: "steps", concept: CON,
    _dbg: { fn, angle, theta },
    prompt: L(`Write ${fn}${argDeg(angle)} as a co-function.`, `Skryf ${fn}${argDeg(angle)} as 'n ko-funksie.`),
    steps: [
      mcStep(L("What's the sign?", "Wat is die teken?"), cf.sign < 0 ? "−" : "+", cf.sign < 0 ? ["+"] : ["−"], H1),
      mcStep(L(`${fn} becomes…`, `${fn} word…`), cf.fn2, [fn], H2),
      calcStep(L("Type the value.", "Tik die waarde in."), theta, H3),
    ],
    hint: H1,
    answerLabel: `${fn}${argDeg(angle)} = ${cf.sign < 0 ? "−" : ""}${cf.fn2} ${theta}°.`,
    solution: [
      { s: L(`Sign: ${cf.sign < 0 ? "−" : "+"}`, `Teken: ${cf.sign < 0 ? "−" : "+"}`), r: L(`${fn}${argDeg(angle)} is a co-function form.`, `${fn}${argDeg(angle)} is 'n ko-funksievorm.`) },
      { s: L(`Ratio: ${fn} → ${cf.fn2}`, `Verhouding: ${fn} → ${cf.fn2}`), r: L("co-functions convert sin ↔ cos.", "ko-funksies skakel sin ↔ cos om.") },
      { s: L(`Value: ${theta}°`, `Waarde: ${theta}°`), r: L("the angle left over after the 90°.", "die hoek wat oorbly ná die 90°.") },
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
