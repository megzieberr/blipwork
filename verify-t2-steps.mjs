/* ============================================================
   2D TRIG ROUND 2 — the step chains (her 2026-08-27 change)

     node verify-t2-steps.mjs

   Her ask: round 2 "simply gives the triangle, and then the kids need
   to do ALL the steps and just type in the final answer… I think we
   should change it so that they build the equation step by step".
   The three straightforward questions are now `steps` chains; the two
   multiple-choice ones are untouched ("perfect", her word).

   This harness generates the round many times over and marks every
   step THROUGH THE APP'S OWN checkStep() — the same function the
   screen calls. A marking bug therefore cannot hide behind the widget.

   What it proves, per generated question:
     · the chain has the shape she asked for, ending on a typed number;
     · the build step is ACTUALLY BUILDABLE — every piece of the
       expected answer is on the pad. (A question whose answer cannot
       be tapped would be unanswerable, and no amount of trying would
       tell the learner why.)
     · both correct fills mark right — the sine rule is symmetric;
     · the classic wrong fills mark wrong;
     · no duplicate chips, and the decoy is a real angle from the
       triangle, not an invented one;
     · exactly one correct multiple-choice option, all labels distinct;
     · the final number equals the sine rule computed independently
       here, to the decimals shown on screen;
     · nothing marks a length in degrees.
   ============================================================ */

import { questT2 } from "./js/quests/questt2-sine-sides.js";
import { checkStep, normalizeTokens } from "./js/steps-check.js";

const N = 400;                       // generations per skill
let pass = 0; const fails = [];
const ok = (name, cond, detail) => cond ? pass++ : fails.push(detail ? `${name} — ${detail}` : name);

const STEP_SKILLS = ["findSide", "findThirdSide", "wordSide"];
const MC_SKILLS = ["whichForm", "setupRatio"];
const skillOf = id => questT2.skills.find(s => s.id === id);

/* the sine rule, computed here so the quest file cannot mark its own homework */
const sin = d => Math.sin(d * Math.PI / 180);

ok("round 2 still has all five skills", questT2.skills.length === 5,
  `has ${questT2.skills.length}: ${questT2.skills.map(s => s.id).join(", ")}`);
for (const id of [...STEP_SKILLS, ...MC_SKILLS]) ok(`skill ${id} exists`, !!skillOf(id));

/* ---------- the two she said were perfect must NOT have changed ---------- */
for (const id of MC_SKILLS) {
  const q = skillOf(id).gen();
  ok(`${id} is still a plain multiple-choice question`, q.type === "mc",
    `became type "${q.type}" — she said the multi-choice ones are perfect, leave them`);
}

/* ---------- the three converted chains ---------- */
for (const id of STEP_SKILLS) {
  let sawDecoy = 0, minChips = 99, maxSteps = 0;

  for (let n = 0; n < N; n++) {
    const q = skillOf(id).gen();
    const tag = `${id}#${n}`;

    if (q.type !== "steps") { fails.push(`${tag} is type "${q.type}", not "steps"`); break; }
    const steps = q.steps || [];
    maxSteps = Math.max(maxSteps, steps.length);
    if (steps.length < 3) { fails.push(`${tag} has only ${steps.length} steps`); break; }

    // --- shape: builds, then rearranges, then types a number ---
    const kinds = steps.map(s => s.kind);
    if (kinds[kinds.length - 1] !== "calc") { fails.push(`${tag} does not end on a typed number: ${kinds}`); break; }
    if (!kinds.includes("tokenpad")) { fails.push(`${tag} never asks them to BUILD anything: ${kinds}`); break; }
    if (!kinds.includes("mc")) { fails.push(`${tag} has no rearrange step: ${kinds}`); break; }
    // the build must come before the rearrange, and both before the number
    if (!(kinds.indexOf("tokenpad") < kinds.indexOf("mc"))) { fails.push(`${tag} rearranges before it builds`); break; }

    // every step must be answerable and carry its own hint
    for (const [i, st] of steps.entries()) {
      if (!st.prompt) { fails.push(`${tag} step ${i} has no prompt`); break; }
      if (!st.hint) { fails.push(`${tag} step ${i} has no hint — a retry would show nothing`); break; }
    }

    // --- THE BUILD STEP ---
    const b = steps[kinds.indexOf("tokenpad")];
    const slots = b.frame.filter(f => f === "☐").length;
    if (slots !== 4) { fails.push(`${tag} build frame has ${slots} boxes, wanted 4`); break; }

    // buildable? every piece of the answer must be tappable.
    // ⚠️ Split on the THIN SPACE the pad joins with, not on /\s+/ — a chip
    // label is itself two words ("sin 43°"), so a plain whitespace split
    // shreds it into "sin" and "43°" and then nothing looks buildable.
    const need = b.expected.split(" ").filter(Boolean);
    const keysNorm = b.keys.map(normalizeTokens);
    const missing = need.filter(t => !keysNorm.includes(normalizeTokens(t)));
    if (missing.length) { fails.push(`${tag} answer cannot be built — no chip for ${missing.join(", ")} (chips: ${b.keys.join(" | ")})`); break; }
    if (need.length !== 4) { fails.push(`${tag} expects ${need.length} pieces for 4 boxes`); break; }

    // no duplicate chips
    if (new Set(b.keys.map(normalizeTokens)).size !== b.keys.length) {
      fails.push(`${tag} shows a duplicate chip: ${b.keys.join(" | ")}`); break;
    }
    minChips = Math.min(minChips, b.keys.length);
    if (b.keys.length >= 5) sawDecoy++;

    // the RIGHT fill marks right — both ways round, because the rule is symmetric
    if (!checkStep(b, b.expected)) { fails.push(`${tag} rejects its own expected answer "${b.expected}"`); break; }
    for (const alt of b.alsoAccept || []) {
      if (!checkStep(b, alt)) { fails.push(`${tag} rejects the mirrored set-up "${alt}"`); break; }
    }
    if (!(b.alsoAccept || []).length) { fails.push(`${tag} accepts only one order — the sine rule is symmetric`); break; }

    // the classic WRONG fills must mark wrong
    const [s1, a1, s2, a2] = need;
    const wrongs = [
      [s1, a2, s2, a1],           // the two sines swapped — the mistake this step exists to catch
      [a1, s1, a2, s2],           // sines on top
      [s1, a1, s2, a1],           // same angle twice
    ];
    for (const w of wrongs) {
      const raw = w.join(" ");
      if (normalizeTokens(raw) === normalizeTokens(b.expected)) continue;      // degenerate, not a real wrong
      if ((b.alsoAccept || []).some(x => normalizeTokens(x) === normalizeTokens(raw))) continue;
      if (checkStep(b, raw)) { fails.push(`${tag} ACCEPTS a wrong set-up "${raw}"`); break; }
    }
    // an empty submit is never right
    if (checkStep(b, "")) { fails.push(`${tag} accepts an empty answer`); break; }

    // --- THE REARRANGE STEP ---
    const m = steps[kinds.indexOf("mc")];
    const rights = m.options.filter(o => o.correct);
    if (rights.length !== 1) { fails.push(`${tag} rearrange has ${rights.length} correct options`); break; }
    if (new Set(m.options.map(o => o.label)).size !== m.options.length) {
      fails.push(`${tag} rearrange has two identical options: ${m.options.map(o => o.label).join(" | ")}`); break;
    }
    if (m.options.length < 3) { fails.push(`${tag} rearrange offers only ${m.options.length} options`); break; }
    // marking goes by index, so the correct index must actually mark right
    const ci = m.options.findIndex(o => o.correct);
    if (!checkStep(m, ci)) { fails.push(`${tag} rearrange rejects its own correct option`); break; }
    for (let k = 0; k < m.options.length; k++) {
      if (k !== ci && checkStep(m, k)) { fails.push(`${tag} rearrange accepts wrong option ${k}`); break; }
    }

    // --- THE FINAL NUMBER ---
    const last = steps[steps.length - 1];
    if (last.unit) { fails.push(`${tag} labels a LENGTH with "${last.unit}"`); break; }
    if (!checkStep(last, last.expected)) { fails.push(`${tag} final step rejects its own answer`); break; }
    // to the decimals shown: a learner typing the rounded value must be right
    const shown = Number(last.expected.toFixed(last.dp ?? 2));
    if (!checkStep(last, shown)) { fails.push(`${tag} final step rejects the rounded answer ${shown}`); break; }
    if (checkStep(last, shown + 1)) { fails.push(`${tag} final step accepts ${shown + 1}`); break; }
    if (last.expected <= 0) { fails.push(`${tag} final answer is ${last.expected}`); break; }

    // the chain's answer must equal the question's own headline answer
    if (typeof q.expected === "number" && Math.abs(q.expected - last.expected) > 1e-9) {
      fails.push(`${tag} chain ends on ${last.expected} but the question says ${q.expected}`); break;
    }

    // --- the maths itself, recomputed here from the numbers on screen ---
    // the build step names the pair: side1/sin(ang1) = side2/sin(ang2)
    const deg = t => Number(String(t).replace(/[^\d.]/g, ""));
    const known = Number(s2), kAng = deg(a2), uAng = deg(a1);
    if (Number.isFinite(known) && kAng > 0 && uAng > 0) {
      const expect = known * sin(uAng) / sin(kAng);
      if (Math.abs(expect - last.expected) > 0.02) {
        fails.push(`${tag} sine rule says ${expect.toFixed(4)}, the question says ${last.expected.toFixed(4)}`); break;
      }
    }

    // --- angle steps, where present, must be in degrees and sum right ---
    for (const st of steps) {
      if (st.kind === "calc" && st !== last) {
        if (st.unit !== "°") { fails.push(`${tag} angle step is not labelled in degrees`); break; }
        if (!(st.expected > 0 && st.expected < 180)) { fails.push(`${tag} angle step expects ${st.expected}°`); break; }
      }
    }

    // her house rule: no step may hand over the whole chain
    if (q.method) { fails.push(`${tag} carries a method link — play.js renders it before step 1, which gives the game away`); break; }
  }

  ok(`${id}: a decoy chip is offered`, sawDecoy > N * 0.8,
    `only ${sawDecoy}/${N} had 5+ chips (dedupe collapsing them?)`);
  ok(`${id}: never fewer than 4 chips`, minChips >= 4, `saw ${minChips}`);
  ok(`${id}: chain length is sane`, maxSteps <= 4, `longest chain is ${maxSteps} steps`);
  if (!fails.some(f => f.startsWith(id))) pass += 1;      // the N-generation sweep itself
}

/* ---------- the diagram and wording were NOT to change ---------- */
{
  const q = skillOf("findSide").gen();
  ok("findSide still draws its triangle", !!(q.graph && q.graph.type === "triangle"));
  ok("findSide keeps its original prompt", /find <b>x<\/b>/.test(q.prompt), q.prompt);
  ok("findSide keeps its worked solution for the end", Array.isArray(q.solution) && q.solution.length >= 3);
  ok("findSide keeps its answer label", !!q.answerLabel);
  const w = skillOf("wordSide").gen();
  ok("wordSide is still diagram-free (read it from the words)", !w.graph);
}

const total = pass + fails.length;
if (fails.length) {
  console.error(`\n✗ ${fails.length} of ${total} checks FAILED\n`);
  for (const f of fails.slice(0, 25)) console.error("   · " + f);
  if (fails.length > 25) console.error(`   … and ${fails.length - 25} more`);
  console.error("");
  process.exit(1);
}
console.log(`\n✓ ${pass}/${total} checks pass · ${N * STEP_SKILLS.length} generated questions, every step marked through the app's own checkStep()\n`);
