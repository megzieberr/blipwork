/* ============================================================
   2D TRIG t3–t7 — the audit-day step chains (2026-08-30)

     node verify-trig-steps.mjs

   Round 2's rebuild ("build the equation step by step each time",
   2026-08-27, harnessed by verify-t2-steps.mjs) was widened to the
   whole chapter this audit day, on her ask: the sine-rule work was
   "too intense too quick — split those intense questions up in
   smaller questions so the kids actually build the questions, not
   try to do everything in their head."

   Same posture as verify-t2-steps.mjs: generate every converted
   skill many times over and mark every step THROUGH THE APP'S OWN
   checkStep(), so a marking bug cannot hide behind the widget.

   Per generated chain it proves:
     · the chain shape (right kinds, ends on a typed number);
     · every step carries a prompt and a hint;
     · every build (tokenpad) step is ACTUALLY BUILDABLE — every
       piece of the expected fill is a chip on the pad — with no
       duplicate chips, its symmetric fills accepted, wrong fills
       and the empty submit rejected;
     · every mc step has exactly one correct, distinct labels, and
       marks by index correctly;
     · every calc step accepts its own value AND the value rounded
       to the shown decimals, and rejects an off-by-one;
     · a negative expected value only ever appears with allowNeg;
     · the chain's last number IS the question's headline answer;
     · the maths hangs together (sin/cos of the found angle matches
       the found ratio, √x² = x, parts sum to totals, supplementary
       pairs add to 180°);
     · no chain carries q.method (play.js renders that link before
       step 1 — on a chain it hands the answers over).
   ============================================================ */

import { questT3 } from "./js/quests/questt3-sine-angles.js";
import { questT4 } from "./js/quests/questt4-cosine-sides.js";
import { questT5 } from "./js/quests/questt5-cosine-angles.js";
import { questT6 } from "./js/quests/questt6-area.js";
import { questT7 } from "./js/quests/questt7-mixed.js";
import { checkStep, normalizeTokens } from "./js/steps-check.js";

const N = 300;                        // generations per skill
let pass = 0; const fails = [];
const ok = (name, cond, detail) => cond ? pass++ : fails.push(detail ? `${name} — ${detail}` : name);

const sinD = d => Math.sin(d * Math.PI / 180);
const cosD = d => Math.cos(d * Math.PI / 180);
const RULES = ["Sine rule", "Cosine rule", "Area rule"];

/* the converted skills, with each chain's expected kind sequence
   (null = variant-dependent, checked generically) and a relation
   check that re-derives the maths from the steps themselves */
const CONVERTED = [
  { quest: questT3, id: "findAngle", kinds: ["tokenpad", "mc", "calc", "calc"],
    rel: (s, last) => Math.abs(sinD(last.expected) - s[2].expected) <= 2e-3 && last.expected < 90 },
  { quest: questT3, id: "ambiguousBoth", kinds: ["tokenpad", "mc", "calc", "calc"],
    rel: (s, last) => Math.abs(s[2].expected + s[3].expected - 180) <= 1e-9 && last.expected > 90 },
  { quest: questT4, id: "findSide", kinds: ["tokenpad", "calc", "calc"],
    rel: (s, last) => Math.abs(Math.sqrt(s[1].expected) - last.expected) <= 1e-9 },
  { quest: questT4, id: "wordSide", kinds: ["tokenpad", "calc", "calc"],
    rel: (s, last) => Math.abs(Math.sqrt(s[1].expected) - last.expected) <= 1e-9 },
  { quest: questT5, id: "findAngle", kinds: ["tokenpad", "calc", "calc"],
    rel: (s, last) => Math.abs(cosD(last.expected) - s[1].expected) <= 2e-3 },
  { quest: questT5, id: "obtuseAngle", kinds: ["tokenpad", "calc", "calc"],
    rel: (s, last) => Math.abs(cosD(last.expected) - s[1].expected) <= 2e-3
      && last.expected > 90 && s[1].expected < 0 && s[1].allowNeg === true },
  { quest: questT6, id: "triArea", kinds: ["tokenpad", "calc"] },
  { quest: questT6, id: "triAreaWord", kinds: ["tokenpad", "calc"] },
  { quest: questT6, id: "regularPolygon", kinds: ["calc", "calc", "calc", "calc"],
    rel: s => [5, 6, 8].includes(Math.round(360 / s[0].expected))
      && Math.abs(Math.round(360 / s[0].expected) * s[2].expected - s[3].expected) <= 1e-6 },
  { quest: questT6, id: "houseArea", kinds: ["calc", "calc", "calc", "calc"],
    rel: s => Math.abs(s[1].expected + s[2].expected - s[3].expected) <= 1e-9 },
  { quest: questT7, id: "solveUnknown", kinds: null,   // 3 variants — generic checks + the opener rule below
    rel: s => s[0].kind !== "mc" || RULES.includes(s[0].options.find(o => o.correct).label) },
  { quest: questT7, id: "shortestDistance", kinds: ["calc", "calc", "calc"],
    rel: s => Math.abs(2 * s[0].expected / s[1].expected - s[2].expected) <= 1e-9 },
  { quest: questT7, id: "areaFromSSS", kinds: ["tokenpad", "calc", "calc"],
    rel: s => s[1].expected > 0 && s[1].expected < 180 && s[1].unit === "°" },
  { quest: questT7, id: "contextCosine", kinds: ["mc", "tokenpad", "calc"] },
];

/* the untouched skills must have stayed untouched */
const UNTOUCHED = [
  [questT3, "obtusePartner", "calc"], [questT3, "whichForm", "mc"], [questT3, "ambiguousWhen", "mc"],
  [questT3, "ambiguousCount", "mc"],
  [questT4, "includedAngle", "mc"], [questT4, "whichFormula", "mc"],
  [questT5, "rearrange", "mc"], [questT5, "oppositeSubtracted", "mc"],
  [questT6, "areaFormula", "mc"], [questT6, "needIncluded", "yesno"],
  [questT7, "strategy", "mc"],
];
for (const [quest, id, type] of UNTOUCHED) {
  const sk = quest.skills.find(s => s.id === id);
  ok(`${quest.id}.${id} exists`, !!sk);
  if (sk) {
    const q = sk.gen();
    ok(`${quest.id}.${id} is still type "${type}"`, q.type === type, `became "${q.type}"`);
  }
}

for (const spec of CONVERTED) {
  const sk = spec.quest.skills.find(s => s.id === spec.id);
  const skid = `${spec.quest.id}.${spec.id}`;
  ok(`${skid} exists`, !!sk);
  if (!sk) continue;
  let broke = false;

  for (let n = 0; n < N && !broke; n++) {
    const q = sk.gen();
    const tag = `${skid}#${n}`;
    const bad = msg => { fails.push(`${tag} ${msg}`); broke = true; };

    if (q.type !== "steps") { bad(`is type "${q.type}", not "steps"`); break; }
    const steps = q.steps || [];
    if (steps.length < 2) { bad(`has only ${steps.length} steps`); break; }
    if (q.method) { bad("carries a method link — play.js renders it before step 1"); break; }

    // kind sequence (fixed-shape chains) / generic floor (variant chains)
    const kinds = steps.map(s => s.kind);
    if (spec.kinds && kinds.join(",") !== spec.kinds.join(",")) { bad(`kinds are [${kinds}], wanted [${spec.kinds}]`); break; }
    if (kinds[kinds.length - 1] !== "calc") { bad(`does not end on a typed number: [${kinds}]`); break; }

    for (const [i, st] of steps.entries()) {
      if (!st.prompt) { bad(`step ${i} has no prompt`); break; }
      if (!st.hint) { bad(`step ${i} has no hint — a retry would show nothing`); break; }

      if (st.kind === "tokenpad") {
        const slots = (st.frame || []).filter(f => f === "☐").length;
        if (!slots) { bad(`step ${i} build frame has no boxes`); break; }
        const need = String(st.expected).split(" ").filter(Boolean);   // U+2009 — the pad's own separator
        if (need.length !== slots) { bad(`step ${i} expects ${need.length} pieces for ${slots} boxes`); break; }
        const keysNorm = (st.keys || []).map(normalizeTokens);
        const missing = need.filter(t => !keysNorm.includes(normalizeTokens(t)));
        if (missing.length) { bad(`step ${i} answer cannot be built — no chip for ${missing.join(", ")} (chips: ${(st.keys || []).join(" | ")})`); break; }
        if (new Set(keysNorm).size !== keysNorm.length) { bad(`step ${i} shows a duplicate chip: ${st.keys.join(" | ")}`); break; }
        if (!checkStep(st, st.expected)) { bad(`step ${i} rejects its own expected fill`); break; }
        for (const alt of st.alsoAccept || []) {
          if (!checkStep(st, alt)) { bad(`step ${i} rejects an accepted symmetric fill "${alt}"`); break; }
        }
        if (checkStep(st, "")) { bad(`step ${i} accepts an empty submit`); break; }
        // a shape-wrong fill must mark wrong: every slot filled with the same first chip
        const flood = Array(slots).fill(need[0]).join(" ");
        const accepted = [st.expected, ...(st.alsoAccept || [])].map(normalizeTokens);
        if (!accepted.includes(normalizeTokens(flood)) && checkStep(st, flood)) {
          bad(`step ${i} ACCEPTS the flood fill "${flood}"`); break;
        }
      } else if (st.kind === "mc") {
        const rights = st.options.filter(o => o.correct);
        if (rights.length !== 1) { bad(`step ${i} has ${rights.length} correct options`); break; }
        if (st.options.length < 3) { bad(`step ${i} offers only ${st.options.length} options`); break; }
        if (new Set(st.options.map(o => o.label)).size !== st.options.length) {
          bad(`step ${i} has two identical options: ${st.options.map(o => o.label).join(" | ")}`); break;
        }
        const ci = st.options.findIndex(o => o.correct);
        if (!checkStep(st, ci)) { bad(`step ${i} rejects its own correct option`); break; }
        for (let k = 0; k < st.options.length; k++) {
          if (k !== ci && checkStep(st, k)) { bad(`step ${i} accepts wrong option ${k}`); break; }
        }
      } else if (st.kind === "calc") {
        if (!Number.isFinite(st.expected)) { bad(`step ${i} expected is not finite`); break; }
        if (!Number.isInteger(st.dp) || st.dp < 0) { bad(`step ${i} dp is "${st.dp}"`); break; }
        if (st.expected < 0 && !st.allowNeg) { bad(`step ${i} expects ${st.expected} without allowNeg`); break; }
        if (!checkStep(st, st.expected)) { bad(`step ${i} rejects its own answer`); break; }
        const shown = Number(st.expected.toFixed(st.dp));
        if (!checkStep(st, shown)) { bad(`step ${i} rejects the rounded answer ${shown}`); break; }
        if (checkStep(st, shown + 1)) { bad(`step ${i} accepts ${shown + 1}`); break; }
      } else {
        bad(`step ${i} has unknown kind "${st.kind}"`); break;
      }
    }
    if (broke) break;

    // the chain's last number IS the question's headline answer
    const last = steps[steps.length - 1];
    if (typeof q.expected === "number" && Math.abs(q.expected - last.expected) > 1e-9) {
      bad(`chain ends on ${last.expected} but the question says ${q.expected}`); break;
    }
    // the worked solution stays for the end-of-question panel
    if (!Array.isArray(q.solution) || !q.solution.length) { bad("lost its worked solution"); break; }

    if (spec.rel && !spec.rel(steps, last, q)) { bad("relation check failed — the steps don't hang together"); break; }
  }

  if (!broke) { pass += 1; }          // the N-generation sweep itself
}

const total = pass + fails.length;
if (fails.length) {
  console.error(`\n✗ ${fails.length} of ${total} checks FAILED\n`);
  for (const f of fails.slice(0, 25)) console.error("   · " + f);
  if (fails.length > 25) console.error(`   … and ${fails.length - 25} more`);
  console.error("");
  process.exit(1);
}
console.log(`\n✓ ${pass}/${total} checks pass · ${N * CONVERTED.length} generated chains, every step marked through the app's own checkStep()\n`);
