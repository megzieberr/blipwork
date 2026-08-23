/* ============================================================
   DICE — Number Patterns pool (np1–np7). Session P, 2026-08-23.
   REPLACES the foreman's scaffold stub at chapterId "pat" in
   js/quests/dice-pools.js. Built to js/quests/dice-stats.js's
   recipe (DICE-COMMON.md), with the NEW method rule.
   ------------------------------------------------------------
   DICE-AUDIT.md §10 already did the thinking: 44 skills across
   np1–np7 — 34 CLEAN, 10 CARE, 0 STATIC. Every CARE guard already
   lives INSIDE the quest module's own gen():

     · randGeo({ integerR: true })  — whole-number ratio
       (np1.classifyGeo, np1.ratioOf, np7.ratio, np7.nextTerm)
     · a1 ≥ 2 forced in np7.generalTerm — with a1 = 1 the merged
       "(a·r)ⁿ⁻¹" decoy would BE the correct answer
     · k bounded per r in np7.nthTerm — keeps the power readable
     · the multi-filter decoy dedup in np3.generalTerm — when b = 0
       the sign-of-b decoy collapses into the correct answer
     · readableExtreme() in np5.readWhichTerm / np5.readValue —
       |a| = 1 and a small turning value, so the graph read-off is
       countable on the grid
     · the n* = k ± 0,25 construction in np5.nearestTerm — a
       deliberately non-integer turning point that can never tie

   This pool REIMPLEMENTS NONE OF IT. It reuses each skill's own
   gen() verbatim, so every guard rides along for free.

   ------------------------------------------------------------
   ENTRIES — 44 of the chapter's 44 skills. NO EXCLUSIONS: every
   Number Patterns skill rolls fresh numbers or is a fixed-recall
   list-pick, none is hardcoded prose, and the chapter uses only
   mc / calc / tap / yesno — all four are list-pick, number pad or
   sketch-click, so the INPUT LAW holds everywhere (DICE-AUDIT §1
   found no free-text input in this chapter, and none was added).

   ------------------------------------------------------------
   KINDS — 44 kinds for 44 skills. NO GROUPING.
   Two same-named pairs were looked at properly and DELIBERATELY
   left ungrouped (DICE-COMMON: "when unsure, don't group"):
     · np1.commonDiff vs np2.commonDiff — same mechanic (calc off an
       arithmetic pyramid) but DIFFERENT concept ids ("patClassify"
       vs "patArithmetic"), so they open different "I'm lost" cards;
       grouping would silently drop one card from first-pass
       coverage. np1 asks it as a spot-the-pattern read; np2 asks it
       as the first step of building Tₙ.
     · np1.ratioOf vs np7.ratio — same again: "patClassify" vs
       "patGeometric", classification read vs geometric-formula step.
   The genuinely different same-named skills the brief names stay
   separate for the obvious reason — they are different maths:
     · np2.commonDiff (first difference of an arithmetic pattern) vs
       np6.gapCommonDiff (the SECOND difference of a quadratic one,
       read as the common difference of the gap-pattern);
     · np2.generalTerm (an + c) vs np3.generalTerm (an² + bn + c) vs
       np7.generalTerm (a·rⁿ⁻¹);
     · np2.nextTerm (add d) vs np7.nextTerm (multiply by r);
     · np2.nthTerm / np7.nthTerm, np2.fromFormula / np3.fromFormula,
       np2.whichTerm / np5.whichTerm — arithmetic vs quadratic vs
       geometric each time.

   ------------------------------------------------------------
   roundLength = 7. Skills per quest: np1 7, np2 7, np3 6, np4 5,
   np5 7, np6 5, np7 7 → sorted 5, 5, 6, 7, 7, 7, 7 → the 4th of
   seven values → median = 7. (Same as Statistics, coincidentally.)
   Full coverage of 44 kinds therefore needs ⌈44/7⌉ = 7 rounds.
   ============================================================ */
import { questNp1 } from "./questnp1-spot.js";
import { questNp2 } from "./questnp2-arithmetic.js";
import { questNp3 } from "./questnp3-quadratic.js";
import { questNp4 } from "./questnp4-missing.js";
import { questNp5 } from "./questnp5-minmax.js";
import { questNp6 } from "./questnp6-gaps.js";
import { questNp7 } from "./questnp7-geometric.js";

const QUESTS = [questNp1, questNp2, questNp3, questNp4, questNp5, questNp6, questNp7];

/* ------------------------------------------------------------
   THE METHOD RULE (DICE-COMMON.md, 2026-08-23 — this differs from
   dice-stats.js and is the one place this pool is NOT a copy).

   q.method feeds the always-available "📖 Show me the method" link.
   In Statistics every question carried real worked steps. In Number
   Patterns almost none do: _patterns.js's calcQ/tapQ/yesnoQ and
   _shared.js's mc() all default `solution` to a single step whose
   text IS the answer ([{ s: answerLabel }] / [{ s: correct }]). A
   "method" link that reveals only the answer is a spoiler button,
   not a method — so it is NOT attached there.

   A solution counts as REAL WORKING when any of these hold:
     · it has 2+ steps, OR
     · any step carries a reason (`r`), OR
     · its single step's text is neither the answerLabel nor the
       correct option's label.
   Otherwise q.method is left undefined and js/play.js simply omits
   the link (it already tolerates absence).

   NO NEW METHOD TEXT IS WRITTEN HERE. The skills that ship without
   one are a separate content batch for Megan to decide on.
   ------------------------------------------------------------ */
export function hasRealWorking(q) {
  const sol = q && q.solution;
  if (!Array.isArray(sol) || !sol.length) return false;
  if (sol.length >= 2) return true;                                  // 2+ steps = working
  if (sol.some(s => s && s.r != null && String(s.r).trim() !== "")) return true;   // a reason = working
  const only = String((sol[0] && sol[0].s) ?? "").trim();
  if (!only) return false;
  const ans = q.answerLabel == null ? null : String(q.answerLabel).trim();
  const correct = Array.isArray(q.options) ? (q.options.find(o => o.correct) || {}).label : null;
  const co = correct == null ? null : String(correct).trim();
  return only !== ans && only !== co;                                // not just the answer
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
   is attach q.method when (and only when) the question's own solution
   already contains real working. */
function withMethod(gen) {
  return () => {
    const q = gen();
    if (q.method == null && hasRealWorking(q)) q.method = methodHtml(q);
    return q;
  };
}

const entries = [];
QUESTS.forEach(quest => {
  quest.skills.forEach(skill => {
    const skillId = `${quest.id}.${skill.id}`;
    entries.push({
      skillId,
      kind: skillId,                       // no grouping — see the header
      concept: skill.concept || null,      // every one already has a card in js/concepts.js
      gen: withMethod(skill.gen),
    });
  });
});

export const pool = {
  chapterId: "pat",
  roundLength: 7,
  entries,
};
