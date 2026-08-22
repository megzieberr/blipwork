/* ============================================================
   GENERAL TRIG · gt5 — Reductions: numerical values
   ------------------------------------------------------------
   METHODS-trig.md Part E (p07–p09, p13). Her four-step chain:
   quadrant → reduction formula → sign → ratio (stays/changes).
   Positive, negative and co-function angles are mixed from question
   1. An angle past a full turn gets ONE extra first step — "rotate
   first" — because her rotation rule (F10, the −90 threshold) is a
   SEPARATE decision from the reduction itself.

   `buildChain()` is the one function behind five of the seven
   skills: triglib's reduce() already decides, from the angle alone,
   whether a rotation step is needed (r.turns.length) — so "positive
   pool", "negative pool (near −90)" and "negative pool (needs a
   rotation)" and "rotation pool" are all just buildChain() called
   with a different angle RANGE, never different code. The two
   co-function skills are their own small builder because they run
   off triglib's cofunction(), not reduce() (a co-function SWAPS the
   ratio; a plain reduction never does).
   ============================================================ */
import {
  pick, randInt, mcStep, calcStep, tokenStep, quadStep, quadAngle, nonQuadrantalAngle, argDeg } from "./_gtrig.js";
import { reduce, cofunction, fmtDeg } from "../triglib.js";

const CON = "gtrigReduce";
const SH1 = "determine the quadrant.";
const SH2 = "reduction formula — which wheel arm?";
const SH3 = "+ or − sign: All Strippers Take Cash.";
const SH4 = "does it stay, or is it a co-function that converts?";
const SHR = "angles past a full turn — how many 360°s, in ONE chip, before you reduce?";
const CIRC = ["①", "②", "③", "④"];
const ALLFN = ["sin", "cos", "tan"];

/* the mc options for the "stay / change" step — always exactly one
   correct label plus the two others, worded her way */
function ratioOptions(fn, fn2) {
  if (fn2 === fn) {
    const others = ALLFN.filter(f => f !== fn);
    return { correct: `stays ${fn}`, wrongs: others.map(f => `changes to ${f}`) };
  }
  const third = ALLFN.find(f => f !== fn && f !== fn2);
  return { correct: `changes to ${fn2}`, wrongs: [`stays ${fn}`, `changes to ${third}`] };
}

/* her 0.1 house habit — the split written in a small note ABOVE the
   angle, then the reduced line below (e.g. "180+30" over "sin 210°"
   over "= −sin 30°"). A rotated angle gets a SECOND small note first
   showing the turn(s), her "[−360]" convention. */
function answerLabelFor(fn, angle, r) {
  const rotNote = r.turns.length
    ? `<span style="display:block;font-size:11px;color:var(--muted)">[${r.turns.join(" ")}] → ${fn}${argDeg(r.rotated)}</span>` : "";
  const split = r.form === "θ" ? "" : r.form === "−θ" ? `−${r.ref}` : `${r.form}${r.ref}`;
  return `${rotNote}<span style="display:block;font-size:11px;color:var(--muted)">${split}</span>${fn}${argDeg(angle)}<br>= ${r.sign < 0 ? "−" : ""}${r.fn2} ${r.ref}°`;
}

/* the shared chain builder — quadrant → formula → sign → ratio,
   with an optional rotation step first (reduce() decides that). */
function buildChain(fn, angle) {
  const r = reduce(fn, angle);
  const steps = [];
  const solution = [];
  if (r.turns.length) {
    steps.push(tokenStep("Rotate first — what do you add or subtract?", r.turns[0], [], SHR, "θ"));
    solution.push({ s: `Rotate: [${r.turns.join(" ")}]`, r: `${fn}${argDeg(angle)} → ${fn}${argDeg(r.rotated)}.` });
  }
  steps.push(quadStep("Which quadrant is it in now?", r.quadrant, SH1));
  steps.push(tokenStep("Type the reduction formula.", r.form, [r.form + "θ"], SH2));
  steps.push(mcStep("What's the sign?", r.sign > 0 ? "+" : "−", [r.sign > 0 ? "−" : "+"], SH3));
  const ro = ratioOptions(fn, r.fn2);
  steps.push(mcStep("Does the ratio stay, or does it change?", ro.correct, ro.wrongs, SH4));
  solution.push({ s: `Quadrant: ${CIRC[r.quadrant - 1]}`, r: "read it off the wheel." });
  solution.push({ s: `Formula: ${r.form}`, r: "the wheel arm this angle lands on." });
  solution.push({ s: `Sign: ${r.sign < 0 ? "−" : "+"}`, r: "All Strippers Take Cash." });
  solution.push({ s: `Ratio: stays ${fn}`, r: "reductions never swap the ratio — that's a co-function's job." });
  return {
    type: "steps", concept: CON,
    _dbg: { fn, angle },   // harness-only: lets verify-gtrig.html recompute fn(angle) independently
    prompt: `${fn}${argDeg(angle)} = ?`,
    steps,
    hint: SH2,
    answerLabel: answerLabelFor(fn, angle, r),
    solution,
  };
}

/* ---- items 1–2 — positive pool: Q2/Q3/Q4, never quadrantal ---- */
function positivePool() {
  const quad = pick([2, 3, 4]);
  return buildChain(pick(ALLFN), quadAngle(quad));
}

/* ---- item 3 — negative pool, ONE SIDE of −90 (a C-angle, no rotation — F10) ---- */
function negNear() {
  return buildChain(pick(ALLFN), -nonQuadrantalAngle(5, 85));    // (−90°, 0°)
}

/* ---- item 4 — negative pool, THE OTHER SIDE of −90 (needs a rotation) ---- */
function negFar() {
  return buildChain(pick(ALLFN), -nonQuadrantalAngle(91, 449));  // −450°…−91°, one turn only
}

/* ---- item 7 — rotation pool: either direction, always exactly one turn ---- */
function rotationPool() {
  const positive = pick([true, false]);
  const angle = positive ? nonQuadrantalAngle(365, 715) : -nonQuadrantalAngle(91, 449);
  return buildChain(pick(ALLFN), angle);
}

/* ---- items 5–6 — co-function pool: quadrant → formula → sign → ratio,
   but off cofunction() (the ratio SWAPS) rather than reduce() ---- */
function coFnItem(which) {
  const fn = pick(["sin", "cos"]);
  let angle, theta, quadrant, form;
  if (which === "90+") { theta = randInt(2, 16) * 5; angle = 90 + theta; quadrant = 2; form = "90+"; }   // 100..170
  else { angle = randInt(2, 16) * 5; theta = 90 - angle; quadrant = 1; form = "90−"; }                   // 10..80
  const cf = cofunction(fn, form);
  const third = ALLFN.find(f => f !== fn && f !== cf.fn2);
  const steps = [
    quadStep("Which quadrant is it in?", quadrant, SH1),
    tokenStep("Type the reduction formula.", form, [form + "θ"], SH2),
    mcStep("What's the sign?", cf.sign > 0 ? "+" : "−", [cf.sign > 0 ? "−" : "+"], SH3),
    mcStep("Does the ratio stay, or does it change?", `changes to ${cf.fn2}`, [`stays ${fn}`, `changes to ${third}`], SH4),
  ];
  const split = `${form}${theta}`;
  return {
    type: "steps", concept: CON,
    _dbg: { fn, angle, theta },   // harness-only: theta present ⇒ "co-function" identity, not a plain reduction
    prompt: `Reduce ${fn} ${angle}° using a co-function (90° ± θ).`,
    steps,
    hint: SH4,
    answerLabel: `<span style="display:block;font-size:11px;color:var(--muted)">${split}</span>${fn} ${angle}°<br>= ${cf.sign < 0 ? "−" : ""}${cf.fn2} ${theta}°.`,
    solution: [
      { s: `Quadrant: ${CIRC[quadrant - 1]}`, r: which === "90−" ? "90° − θ is A." : "90° + θ is S." },
      { s: `Formula: ${form}`, r: "the co-function arm." },
      { s: `Sign: ${cf.sign < 0 ? "−" : "+"}`, r: which === "90−" ? "quadrant A — everything positive." : "quadrant S — only sine stays positive." },
      { s: `Ratio: ${fn} → ${cf.fn2}`, r: "co-functions convert sin ↔ cos." },
    ],
  };
}
const coFnPlus = () => coFnItem("90+");
const coFnMinus = () => coFnItem("90−");

/* order matters — 7 questions: 2 positive, 2 negative (one each side
   of −90), 2 co-function, 1 rotation, exactly as her round design says */
const SKILLS = {
  pos1: positivePool, pos2: positivePool,
  negNear, negFar,
  coFnPlus, coFnMinus,
  rotationPool,
};

export const questGt5 = {
  id: "gt5",
  skills: Object.entries(SKILLS).map(([id, gen]) => ({ id, concept: CON, gen })),
};
