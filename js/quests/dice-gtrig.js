/* ============================================================
   DICE — General Trig pool (gt1–gt13). Session GT-BUILD, wave 3,
   2026-08-24. Built to js/quests/dice-stats.js's recipe
   (sessions/DICE-COMMON.md) with the classification and every
   guard note taken from sessions/DICE-AUDIT-gtrig.md, which is
   the law for this file.
   ------------------------------------------------------------
   WHAT THIS FILE DOES AND DOES NOT DO

   It does ONE thing: it lists which of the chapter's 93 skills the
   dice may deal, and hands each one's own `gen()` straight through.
   Every guard the audit calls CARE already lives INSIDE that gen():

     · gt5   nonQuadrantalAngle()  — reroll loop; the ranges are
             chosen so reduce() emits exactly the number of turns
             the tokenpad answer expects (widen one and the chain
             length changes under you)
     · gt8   overlapPick()         — 400-try loop keeping only a
             (ratio-sign, interval) pair overlapping in exactly one
             quadrant, with a hardcoded fallback so it can never
             return undefined
     · gt8   PRIM_TRIPLES          — lowest terms only, so nobody is
             marked wrong for reducing 20/25 to 4/5
     · gt8   SMALL_TRIPLES (r ≤ 13) and the "fourth form only when
             r === 5" rule in substitute
     · gt8/9/10  byValue() / optionsByFn() — decoys filtered (and in
             gt9's case THROWN on) by numeric value, not by string
     · gt9   checked()             — every claimed identity re-proved
             at 23° and 37° before the question is handed over
     · gt10  the hand-curated angle bank {35, 40, 50, 55} — below 35°
             or above 55° the adj and hyp midpoints come within a
             fingertip of each other at 375 px, and 45° would collapse
             sin = cos
     · gt11  trinomialQuad()       — 400-try loop (integer factors,
             gcd 1, distinct roots, a root inside [−1;1]) plus the F11
             regex that THROWS on 2cos²θ − cosθ + 1 = 0
     · gt12  alsoAccept: [[quadrants[0]]] on tanItem — her "the second
             one is a waste of time!" ruling; drop it and a correct
             short-cut answer marks wrong
     · gt12  boundaryCase() / refAngle() — the ref ∠ takes the SIZE
             only (her "don't type − into the calculator" ruling IS
             the question), and the dp/tol pairing is load-bearing
     · gt13  NEVER_ZERO            — decoys that can never be zero, so
             no decoy is a second right answer in a wrong answer's coat

   NOTHING here reimplements any of it, and no quest module, engine or
   triglib.js function was touched by this session. Reusing gen()
   verbatim is what carries all of the above for free.

   ------------------------------------------------------------
   ENTRIES — 67. The arithmetic, checked against DICE-AUDIT-gtrig §5:

     93 audited skills
     −19 duplicate-generator slots collapsed (§5's family table)
     =74 collapsed entries
     − 7 gt1, out by her ruling (audit §6 option C)
     =67
     (gt6.chip3 and gt3.quadrantal were held out pending her at the
      2026-08-24 build; she ruled the same day — both IN, see notes
      2 and 3 below.)

   Per round, as this file actually builds it:
     gt2 7 · gt3 6 · gt4 7 · gt5 6 · gt6 7 · gt7 1 · gt8 4
     gt9 8 · gt10 6 · gt11 7 · gt12 5 · gt13 3        =  67

   ------------------------------------------------------------
   OUT OF THE POOL, and exactly why

   1. gt1 — ALL SEVEN SKILLS (her ruling, audit §6 option C).
      gt1's own header calls it "seven beats, her order"; that
      argument only lands in sequence, and the dice deals standalone.
      gt2 and gt3 stay in because they are reference material the
      drill rounds already assume a learner can recall (the wheel,
      the O-A-H table). Reversible: delete "gt1" from DROPPED and add
      questGt1 to QUESTS.
      Dropping gt1 also removes both of its CARE items — tapSide's
      near-isosceles midpoint separation and whatItMeans' mixed
      mc-or-yesno kind — so neither needs handling here.

   2. gt6.chip3 — IN, her ruling 2026-08-24 (was pending, audit §9
      Q4). The decoy "[fn A°]² = fn²A°" stays AS WRITTEN: "keep it,
      they lose marks if they don't show the reduction" — the
      wrongness is skipping the reduction step, and that is the
      teaching point. Do not reword it.

   3. gt3.quadrantal — IN, her ruling 2026-08-24 (was pending, audit
      §9 Q3). sin/cos of a quadrantal angle can only be −1, 0 or 1,
      so the question always has exactly 3 options. "Fine as a
      drill" — the permanent 1-in-3 is accepted, not an oversight.

   4. reduceThenRead() in questgt10-super-special.js — NEVER. She cut
      it on 2026-08-22 ("remove the rounds that ask the question like
      this without the sketch"). It is not in that file's SKILLS at
      all, so it cannot reach this pool by accident; recorded here so
      nobody re-adds it without her saying so.

   ------------------------------------------------------------
   KINDS — kind === skillId throughout. The nineteen collapsed slots
   are the ONLY grouping, and each is a literal duplicate generator,
   not a judgement call (DICE-AUDIT-gtrig §5's family table):

     gt3.pickValue1  ← pickValue1, pickValue2   (both call pickValueQ)
     gt5.pos1        ← pos1, pos2               (both are positivePool)
     gt7.item1       ← item1 … item7            (all randomReduceVarQ)
     gt8.chain1      ← chain1 … chain4          (all chainItem)
     gt10.readRatio  ← readRatio, readRatio2    (same function object)
     gt11.mixedA     ← mixedA, mixedB           (both `mixed`)
     gt12.dec1       ← dec1, dec2               (both decimalItem("plain");
                                                 dec3 is decimalItem("bracket")
                                                 and stays its own entry)
     gt12.bound1     ← bound1, bound2           (both boundaryItem)
     gt12.cofn1      ← cofn1, cofn2             (both coFnItem)
     gt13.item1/2/3  ← item1 … item6            (six slots, six shapes,
                                                 two disjoint pairings —
                                                 slot(0,4)+slot(1,5)+slot(2,3)
                                                 already covers all six
                                                 shapes exactly once)

   MIXED KIND, DOCUMENTED (not split — the foreman's call):
     gt6.chip2Pool emits `mc` on some rolls and `yesno` on others,
     decided by the roll. Every other kind in this pool is one
     mechanic; this one is two. Both render fine (js/questions.js is
     shared byte-for-byte with static play) — what bends is the
     coverage-bucket contract, which is why it is written down rather
     than hidden. Its generator was NOT modified.

   ------------------------------------------------------------
   roundLength = 5 — the FOREMAN'S CALL, not the house median.

   The house recipe says "median skills-per-quest", which for gtrig
   is 7 (six 6/7/8 values either side: 6,7,7,7,7,7,7,7,7,7,8,8,8).
   But a gtrig question is not one interaction. A gt8 chain is a
   double-tick (two tick passes plus the overlap tap), three number-
   pad entries and two multiple choices — EIGHT interactions for one
   question's XP (audit §7). At 7 questions a gtrig dice round runs
   40–50 taps where a Statistics one runs 7–8. 5 keeps the round
   comparable in length across chapters.

   THE HOUSE-MEDIAN ALTERNATIVE IS 7, and it is a one-character
   change on the `roundLength` line below if she prefers it.
   Coverage: ⌈67/5⌉ = 14 rounds to meet every kind (⌈67/7⌉ = 10 at 7).

   ------------------------------------------------------------
   THE METHOD RULE — POOL-SIDE (DICE-AUDIT-gtrig §1.3, the foreman's
   call; no shared file is touched).

   js/play.js appends the "📖 Show me the method" link the moment a
   question mounts — before step 1 is answered. On a `steps` chain the
   `solution` array IS the chain, answer by answer, so that link would
   hand the learner every remaining answer. It is a spoiler button one
   level deeper than the one the method rule was written to prevent.

   So: q.method is attached ONLY to entries that are not `steps` AND
   whose solution contains real working. The `steps` entries lose the
   always-available link; the wrong-answer panel still shows the full
   solution at the end, exactly as it does in static play — nothing is
   taken away from a learner who gets it wrong.

   The alternative (gate the link in js/play.js until
   root.dataset.step === String(q.steps.length)) is a shared-file
   change and stays with the foreman. When it lands, delete the
   `q.type !== "steps"` clause in withMethod() below and the 48 chains
   get their link back.
   ============================================================ */
import { questGt2 } from "./questgt2-cartesian.js";
import { questGt3 } from "./questgt3-special.js";
import { questGt4 } from "./questgt4-cofunctions.js";
import { questGt5 } from "./questgt5-reductions-numbers.js";
import { questGt6 } from "./questgt6-tip-chips.js";
import { questGt7 } from "./questgt7-reductions-variables.js";
import { questGt8 } from "./questgt8-special-sums.js";
import { questGt9 } from "./questgt9-identities.js";
import { questGt10 } from "./questgt10-super-special.js";
import { questGt11 } from "./questgt11-six-types.js";
import { questGt12 } from "./questgt12-last-steps.js";
import { questGt13 } from "./questgt13-undefined.js";

/* questGt1 is deliberately NOT imported — see OUT OF THE POOL §1. */
const QUESTS = [questGt2, questGt3, questGt4, questGt5, questGt6, questGt7,
                questGt8, questGt9, questGt10, questGt11, questGt12, questGt13];

/* Which skill of each round the dice may deal, in her round order.
   A skill id that is NOT here is either a collapsed duplicate (its
   representative is listed) or an exclusion — both are spelled out in
   DROPPED below, so the two lists together always account for all 93
   audited skills. The harness asserts that. */
const KEEP = {
  gt2:  ["wheelWord", "bandSign", "tapSign", "oneSign", "whySign", "onlyOne", "backwards"],
  gt3:  ["triangles", "oahRead", "pickValue1", "quadrantal", "reciprocals", "masked"],
  gt4:  ["coNumMinus", "coNumPlus", "coVarMinus", "coVarPlus", "coNeg", "twoLabelTriangle", "coMixedFull"],
  gt5:  ["pos1", "negNear", "negFar", "coFnPlus", "coFnMinus", "rotationPool"],
  gt6:  ["threeBoxes", "chip1", "chip2Pool", "chip3", "chip4trap", "chip5Pool", "butWhy"],
  gt7:  ["item1"],
  gt8:  ["bowTieCard", "chain1", "substitute", "pointVariant"],
  gt9:  ["whichSide", "lcdItem", "whichPartFirst", "maskedPick",
         "productsItem", "kfcItem", "coFnIdentity", "oneNeedsDenominator"],
  gt10: ["flamingoCard", "shortcutCos", "shortcutSin", "shortcutTan", "shortcutCosInv", "readRatio"],
  gt11: ["type1", "type2", "type3", "type4", "type5", "type6", "mixedA"],
  gt12: ["dec1", "dec3", "tanItem", "bound1", "cofn1"],
  gt13: ["item1", "item2", "item3"],
};

/* Every audited skill that is NOT dealt, with its one-word reason.
   "dup" = a literal duplicate generator collapsed into the listed
   representative; "ruling" / "pending" = a real exclusion. Exported so
   verify-dice-gtrig.html can prove the two lists are exhaustive. */
export const DROPPED = {
  gt1: [
    ["theWord",           "ruling",  "gt1 out of the pool — audit §6 option C"],
    ["rightTriangleOnly", "ruling",  "gt1 out of the pool — audit §6 option C"],
    ["tapSide",           "ruling",  "gt1 out of the pool — audit §6 option C"],
    ["sohcahtoa",         "ruling",  "gt1 out of the pool — audit §6 option C"],
    ["whereFrom",         "ruling",  "gt1 out of the pool — audit §6 option C"],
    ["whatItMeans",       "ruling",  "gt1 out of the pool — audit §6 option C"],
    ["ratioAlone",        "ruling",  "gt1 out of the pool — audit §6 option C"],
  ],
  gt3: [
    ["pickValue2",  "dup",     "same pickValueQ() as gt3.pickValue1"],
  ],
  gt5:  [["pos2", "dup", "same positivePool as gt5.pos1"]],
  gt7:  [["item2", "dup", "randomReduceVarQ ×7 → gt7.item1"],
         ["item3", "dup", "randomReduceVarQ ×7 → gt7.item1"],
         ["item4", "dup", "randomReduceVarQ ×7 → gt7.item1"],
         ["item5", "dup", "randomReduceVarQ ×7 → gt7.item1"],
         ["item6", "dup", "randomReduceVarQ ×7 → gt7.item1"],
         ["item7", "dup", "randomReduceVarQ ×7 → gt7.item1"]],
  gt8:  [["chain2", "dup", "chainItem ×4 → gt8.chain1"],
         ["chain3", "dup", "chainItem ×4 → gt8.chain1"],
         ["chain4", "dup", "chainItem ×4 → gt8.chain1"]],
  gt10: [["readRatio2", "dup", "the same function object as gt10.readRatio"]],
  gt11: [["mixedB", "dup", "the same `mixed` generator as gt11.mixedA"]],
  gt12: [["dec2",  "dup", "decimalItem(\"plain\") ×2 → gt12.dec1"],
         ["bound2", "dup", "boundaryItem ×2 → gt12.bound1"],
         ["cofn2",  "dup", "coFnItem ×2 → gt12.cofn1"]],
  gt13: [["item4", "dup", "slot(3,0) — shapes 3 and 0 already covered by item3 and item1"],
         ["item5", "dup", "slot(4,1) — shapes 4 and 1 already covered by item1 and item2"],
         ["item6", "dup", "slot(5,2) — shapes 5 and 2 already covered by item2 and item3"]],
};

/* Salt-variance exemptions (audit §1.5, measured over 200 seeded rolls):
   these two are pure recall with ONE fixed true/false, so salt 1 can
   never differ from salt 0. gt1.rightTriangleOnly is the third one the
   audit names — it left with gt1. Exported for the harness. */
export const PURE_RECALL = ["gt6.butWhy", "gt6.threeBoxes"];

/* ------------------------------------------------------------
   THE METHOD RULE (sessions/DICE-COMMON.md, 2026-08-23) — the same
   test the wave-2 pools use, plus this chapter's `steps` clause.
   ------------------------------------------------------------ */
export function hasRealWorking(q) {
  const sol = q && q.solution;
  if (!Array.isArray(sol) || !sol.length) return false;
  if (sol.length >= 2) return true;                                              // 2+ steps = working
  if (sol.some(s => s && s.r != null && String(s.r).trim() !== "")) return true; // a reason = working
  const only = String((sol[0] && sol[0].s) ?? "").trim();
  if (!only) return false;
  const ans = q.answerLabel == null ? null : String(q.answerLabel).trim();
  const correct = Array.isArray(q.options) ? (q.options.find(o => o.correct) || {}).label : null;
  const co = correct == null ? null : String(correct).trim();
  return only !== ans && only !== co;                                            // not just the answer
}

/* Is this question allowed an always-available method link?
   `steps` chains are not — their solution IS the remaining answers.
   Exported so the harness can assert the rule instead of restating it. */
export function methodEligible(q) {
  return !!q && q.type !== "steps" && hasRealWorking(q);
}

/* The same markup js/questions.js already renders for the wrong-answer
   worked-solution panel (.fb-answer / .sol / .sol-step — already styled).
   Every string comes from the vetted quest module; nothing new is authored. */
export function methodHtml(q) {
  let html = "";
  if (q.answerLabel != null) html += `<div class="fb-answer"><b>Answer:</b> ${q.answerLabel}</div>`;
  html += `<div class="sol">` + q.solution.map(s =>
    `<div class="sol-step"><span class="s">${s.s}</span>${s.r ? `<span class="r">${s.r}</span>` : ""}</div>`).join("") + `</div>`;
  return html;
}

/* Wrap a skill's gen so it stays a PURE zero-arg function — js/dice.js's
   genAt()/withSeed() call it under a seeded rng and resume depends on that
   determinism, so nothing here may add randomness of its own. All it does
   is attach q.method when (and only when) the rule above allows it. */
function withMethod(gen) {
  return () => {
    const q = gen();
    if (q.method == null && methodEligible(q)) q.method = methodHtml(q);
    return q;
  };
}

const entries = [];
QUESTS.forEach(quest => {
  const keep = KEEP[quest.id] || [];
  keep.forEach(id => {
    const skill = (quest.skills || []).find(s => s.id === id);
    if (!skill) return;                       // a renamed skill drops out rather than crashing the app; the harness fails loudly
    const skillId = `${quest.id}.${skill.id}`;
    entries.push({
      skillId,
      kind: skillId,                          // kind === skillId; the only grouping is the collapse above
      concept: skill.concept || null,         // all twelve gtrig concepts have cards in js/concepts.js
      gen: withMethod(skill.gen),
    });
  });
});

export const pool = {
  chapterId: "gtrig",
  roundLength: 5,        // foreman's call — the house median is 7; see the header
  entries,
};
