/* ============================================================
   DICE — Statistics pool (DICE-PLAN.md pilot chapter, session 1
   build, 2026-08-21). REPLACES js/quests/dice-stub.js at chapterId
   "stats" in js/quests/dice-pools.js.
   ------------------------------------------------------------
   DICE-AUDIT.md §2 already did the hard thinking: all 58 Statistics
   skills (q1–q8) are CLEAN or CARE, 0 STATIC — every one already
   rolls fresh numbers, computes its answer from statlib/the stats
   graph engine, and (the 9 CARE skills) already carries its own
   collision-avoidance guard (do…while loops, uniqueMax, margin
   buffers, the 60-try `within` retry, …) inside the quest module's
   own gen(). This pool does NOT reimplement any of that maths —
   it REUSES quest01–quest08's exported skill.gen() functions
   verbatim, which means every CARE guard rides along for free.

   Per entry:
     skillId = "<quest id>.<skill id>" (e.g. "q2.mean") — unique,
       stable, stored in the save.
     kind    = same as skillId. NO GROUPING: the audit found no true
       near-duplicate skills in this chapter (58 kinds for 58 skills;
       even same-named skills across quests — e.g. "total" in both q2
       and q5 — are different concepts: reverse mean-to-sum vs grouped
       frequency total — so they stay separate kinds via the quest-id
       prefix).
     concept = the skill's existing concept id (unchanged — every one
       already has a card in js/concepts.js, so "I'm lost" works with
       zero new content).
     gen     = the skill's own gen(), wrapped ONLY to surface q.method
       (see methodHtml below) — the maths itself is untouched.

   roundLength = 7 — the median skills-per-quest across q1–q8
   (6, 6, 7, 7, 7, 7, 8, 10 → median of the middle two = 7), per
   DICE-PLAN's "same length as a static round" assumption. Matches
   DICE-AUDIT's own "~7" estimate.
   ============================================================ */
import { quest01 } from "./quest01-calculator.js";
import { quest02 } from "./quest02-centre-spread.js";
import { quest03 } from "./quest03-quartiles.js";
import { quest04 } from "./quest04-skewness.js";
import { quest05 } from "./quest05-grouped.js";
import { quest06 } from "./quest06-ogives.js";
import { quest07 } from "./quest07-stddev.js";
import { quest08 } from "./quest08-mixed.js";

const QUESTS = [quest01, quest02, quest03, quest04, quest05, quest06, quest07, quest08];

/* Build q.method from the question's OWN q.solution/q.answerLabel —
   the exact same markup questions.js already renders for the wrong-
   answer worked-solution panel (.fb-answer / .sol / .sol-step classes,
   already styled). No new teaching text is written here: every string
   used already exists in the vetted quest module, just surfaced
   earlier (DICE-PLAN's always-available "Show me the method" link,
   vs. static play's on-wrong-answer-only reveal). */
function methodHtml(q) {
  if (!Array.isArray(q.solution) || !q.solution.length) return null;
  let html = "";
  if (q.answerLabel != null) html += `<div class="fb-answer"><b>Answer:</b> ${q.answerLabel}</div>`;
  html += `<div class="sol">` + q.solution.map(s =>
    `<div class="sol-step"><span class="s">${s.s}</span>${s.r ? `<span class="r">${s.r}</span>` : ""}</div>`).join("") + `</div>`;
  return html;
}

/* Wrap a skill's gen so it stays a pure zero-arg function (dice.js's
   genAt/withSeed call it under a seeded rng — nothing here adds its
   own randomness, so determinism is untouched) and just attaches
   q.method when the question didn't already set one. */
function withMethod(gen) {
  return () => {
    const q = gen();
    if (q.method == null) {
      const m = methodHtml(q);
      if (m) q.method = m;
    }
    return q;
  };
}

const entries = [];
QUESTS.forEach(quest => {
  quest.skills.forEach(skill => {
    const skillId = `${quest.id}.${skill.id}`;
    entries.push({
      skillId,
      kind: skillId,
      concept: skill.concept || null,
      gen: withMethod(skill.gen),
    });
  });
});

export const pool = {
  chapterId: "stats",
  roundLength: 7,
  entries,
};
