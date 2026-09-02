/* ============================================================
   DICE — Finance pool (f1–f7). Session F build, 2026-08-23.
   REPLACES the foreman's stub at chapterId "finance" in
   js/quests/dice-pools.js.
   ------------------------------------------------------------
   Built to js/quests/dice-stats.js's recipe (sessions/DICE-COMMON.md):
   every entry REUSES the quest module's own skill.gen() verbatim, so
   the vetted maths, the decoy backstop comments ("when yrs = k the
   first two collide"), the mcNum/mc de-duplication and the timeline
   specs all ride along unchanged. No maths is reimplemented here.

   DICE-AUDIT.md §3: Finance is 51 skills — 50 CLEAN, 1 CARE, 0 STATIC.
   The one CARE skill, f5.anyPoint, was entirely hardcoded ("R1 000 at
   T0 is worth R2 100,34 at T5", always yes:true); this session
   generalised it IN PLACE in questf5-timeline-build.js (rolled P /
   rate / T / k, an honestly-computed `yes`, and a one-in-three false
   case built on a real misconception). It therefore rolls, and is in
   the pool.

   EXCLUSIONS: none. All 51 skills are in the pool.
     · Every skill's input is mc / calc / yesno / tap — the INPUT LAW
       (no free text) holds across the whole chapter.
     · No skill's question text is hardcoded any more (anyPoint was
       the last one).
   Pure-recall skills (fixed wording, only the option order rolls) are
   kept: they are exactly as re-playable as they are in static rounds,
   and they are what a learner meets first in the chapter. They are
   listed in PURE_RECALL below so the harnesses can exempt them from
   the "different salt ⇒ different question" check.

   KINDS (coverage buckets — DICE-PLAN's "deal one of each kind first,
   then fully random"). kind = skillId except for TWO groupings, each a
   true near-duplicate (same mechanic, same computed answer, same decoy
   construction):
     1. f5.rateChangeSegment → kind "f3.exponent"
        Both ask "years × times-per-year = ?" as an mcNum with the SAME
        decoy list [yrs, k, yrs+k, e+1, e*2]; f5's only extra is the
        sentence "One segment:" and a rate that plays no part in the
        answer.
     2. f3.monthlyRate → kind "f3.ratePerPeriod"
        monthlyRate IS ratePerPeriod's k = 12 case: same concept
        ("compounding"), same mcNum on annual ÷ k, and at k = 12 the two
        decoy lists are the same three values in a different order.
   Everything else stays its own kind. Near-misses deliberately NOT
   grouped (different answers or a different question experience, and
   DICE-COMMON says don't group when unsure): countForward/countBetween/
   countBackward (same subtraction, but forward-from-start vs
   between-two-points vs backward, each with its own arc), direction-
   Forward/directionBackward/directionWord (multiply vs divide, and the
   word version carries no timeline), exponentForward/exponentBackward
   (opposite signs), f1.whichSimple vs f6.hpType (the same fact asked in
   opposite directions, different concepts).
     → 51 skills, 49 kinds.

   roundLength = 7. Skills per quest: f1 8, f2 8, f3 6, f4 7, f5 7,
   f6 7, f7 8 → sorted 6, 7, 7, 7, 8, 8, 8 → median = 7 (the middle of
   seven values), matching DICE-F-finance.md and Statistics' own 7.

   METHOD (sessions/DICE-COMMON.md's NEW rule — differs from
   dice-stats.js): most Finance questions carry only the builders'
   DEFAULT solution, `[{ s: <the answer> }]` from _shared.js's mc().
   A "📖 Show me the method" link over that text is a spoiler button,
   not a method — so q.method is attached ONLY where the solution holds
   real working (≥ 2 steps, or a step with a reason, or a single step
   whose text is not just the answer). No teaching text is written HERE;
   this file only surfaces what the quest module's own gen() already
   built, and the skills without working simply have no link (js/play.js
   already omits it).

   COVERAGE (2026-09-02 worked-methods batch, session S2): 22 of 51.
   That batch wrote real `solution` arrays INSIDE the quest gens for 14
   more skills — f3.fullSetup, f3.monthlyRate, f4.countBetween,
   f4.countBackward, f4.directionForward, f4.directionBackward,
   f4.tapTarget, f5.exponentForward, f5.exponentBackward, f5.expression,
   f5.rateChangeBrackets, f5.rateChangeSegment, f6.percentOwed,
   f7.whichGrowsMore — each following FINANCE-METHOD.md's ONE-equation
   rule (build the whole equation, never solve in stages, never round an
   intermediate). They join the 8 that already had working: f1.pctToFrac,
   f3.ratePerPeriod, f3.exponent, f4.countForward, f5.anyPoint,
   f5.rateChangeExpr, f6.depositAmount, f6.amountOwed.

   The remaining 29 stay method-less ON PURPOSE: 27 are pure-recall
   definition questions whose bare answer IS the whole working (all of
   f1 bar pctToFrac, all of f2, f3.timesPerYear, f3.whyDivide,
   f4.directionWord, f6.depositInterest, f6.interestOnWhat, f6.hpType,
   and f7's six theory MCs) — a "method" there could only restate the
   answer, which is the spoiler button this rule exists to prevent. The
   other two are f6.hpTotal and f7.effCalc, `steps` chains that
   methodEligible() below correctly refuses.
   ============================================================ */
import { questF1 } from "./questf1-words.js";
import { questF2 } from "./questf2-types.js";
import { questF3 } from "./questf3-compounding.js";
import { questF4 } from "./questf4-timeline-count.js";
import { questF5 } from "./questf5-timeline-build.js";
import { questF6 } from "./questf6-deposits.js";
import { questF7 } from "./questf7-eff-nom.js";

const QUESTS = [questF1, questF2, questF3, questF4, questF5, questF6, questF7];

/* skillId → the kind it is bucketed under (see KINDS above). Absent =
   its own skillId. */
const KIND_OF = {
  "f5.rateChangeSegment": "f3.exponent",
  "f3.monthlyRate": "f3.ratePerPeriod",
};

/* Skills with NO rolled numbers — the question text is the same every
   time and only the option order varies (mc()'s shuffled()). Exported
   so verify-dice-finance.html can exempt them from the "salt 1 differs
   from salt 0" check, which they cannot honestly pass. */
export const PURE_RECALL = new Set([
  "f1.symP", "f1.symA", "f1.whichSimple", "f1.whichCompoundScenario",
  "f1.pickCompoundFormula", "f1.whatN", "f1.inflationType",
  "f2.simpleBase", "f2.compoundBase", "f2.growsFaster", "f2.reducingWhich",
  "f2.linearWhich", "f2.reducingGraph", "f2.linearGraph", "f2.depMeaning",
  "f3.whyDivide",
  "f4.directionWord",
  "f6.depositInterest", "f6.interestOnWhat", "f6.hpType",
  "f7.effectiveAnnual", "f7.nominalFreq", "f7.bothCompound",
  "f7.conversionFormula", "f7.nMeaning", "f7.whyConvert",
]);

/* Does this question's solution hold REAL working, or is it just the
   answer restated? (DICE-COMMON's method rule.) */
export function hasRealWorking(q) {
  const sol = q && q.solution;
  if (!Array.isArray(sol) || !sol.length) return false;
  if (sol.length >= 2) return true;                       // more than one line = working
  if (sol.some(s => s && s.r)) return true;               // a reason attached = working
  const step = String(sol[0] && sol[0].s != null ? sol[0].s : "").trim();
  if (!step) return false;
  if (q.answerLabel != null && step === String(q.answerLabel).trim()) return false;
  const correct = Array.isArray(q.options) ? q.options.find(o => o.correct) : null;
  if (correct && step === String(correct.label).trim()) return false;
  return true;                                            // says more than the answer alone
}

/* Build q.method from the question's OWN q.solution/q.answerLabel —
   the same markup questions.js renders in the wrong-answer worked-
   solution panel (.fb-answer / .sol / .sol-step, already styled). No
   new teaching text: every string used already exists in the vetted
   quest module, just surfaced earlier.

   (Session F shipped this with a `display:block` + "— " workaround for
   the method panel's flex scatter; the foreman fixed the real cause in
   js/play.js the same day — each step is now prettified on its own —
   so the markup here is back to the plain dice-stats.js shape, identical
   across all four pools.) */
function methodHtml(q) {
  let html = "";
  if (q.answerLabel != null) html += `<div class="fb-answer"><b>Answer:</b> ${q.answerLabel}</div>`;
  html += `<div class="sol">` + q.solution.map(s =>
    `<div class="sol-step"><span class="s">${s.s}</span>${s.r ? `<span class="r">${s.r}</span>` : ""}</div>`).join("") + `</div>`;
  return html;
}

/* Is this question allowed an always-available method link? `steps`
   chains are not — their solution IS the remaining answers, and
   js/play.js renders the 📖 link at mount, before step 1 (2026-08-30
   audit-day live-bug fix, first made in dice-trig.js — see that file's
   header for the full story). Exported so the harness can assert the
   rule instead of restating it. */
export function methodEligible(q) {
  return !!q && q.type !== "steps" && hasRealWorking(q);
}

/* Wrap a skill's gen so it stays a PURE zero-arg function (js/dice.js's
   genAt/withSeed call it under a seeded rng, and resume depends on that
   determinism — nothing here adds randomness of its own) and only
   attaches q.method where real working exists AND the question is
   method-eligible (not a steps chain). */
function withMethod(gen) {
  return () => {
    const q = gen();
    if (q.method == null && methodEligible(q)) q.method = methodHtml(q);
    return q;
  };
}

const entries = [];
QUESTS.forEach(quest => {
  quest.skills.forEach(skill => {
    const skillId = `${quest.id}.${skill.id}`;
    entries.push({
      skillId,
      kind: KIND_OF[skillId] || skillId,
      concept: skill.concept || null,
      gen: withMethod(skill.gen),
    });
  });
});

export const pool = {
  chapterId: "finance",
  roundLength: 7,
  entries,
};
