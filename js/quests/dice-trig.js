/* ============================================================
   DICE — 2D Trigonometry pool (t1–t7). Built 2026-08-23, session T
   of the three-chapter dice build. REPLACES the foreman's stub at
   chapterId "trig" in js/quests/dice-pools.js.
   ------------------------------------------------------------
   This is the DRILL chapter "2D Trigonometry" (config.js id "trig",
   quests t1–t7) — NOT "gtrig" (General Trig), and nothing to do with
   Exam Focus, where 2D Trig stays deliberately hidden.

   DICE-AUDIT.md §5 already did the thinking: 36 skills — 30 CLEAN,
   6 CARE, 0 STATIC. Every CARE guard lives INSIDE the quest module's
   own gen():
     • t1.biggestAngle   — do…while forces a strictly-longest side, so
                           "the biggest angle" can never be a tie
     • t3.findAngle      — do…while requires b < a−3 (unique acute θ)
                           AND θ ≥ 24° (wedge wide enough for its label)
     • t3.ambiguousCount — up to 200 engineered tries to actually hit
                           the wanted 0 / 1 / 2-triangle outcome
     • t3.ambiguousBoth  — do…while forces exactly the 2-triangle case
     • t5.obtuseAngle    — bounded randInt engineers c² > a² + b²
     • t7.shortestDistance — near-isosceles constraint keeps the foot of
                           the perpendicular inside the triangle, plus
                           segStartClear()'s dash nudge off the angle label
   So this pool REUSES each skill.gen() VERBATIM — every guard rides
   along for free and no trig maths is reimplemented here. The only
   wrapper is withMethod() below, which attaches q.method and adds no
   randomness of its own (js/dice.js calls gen() under a seeded rng;
   resume depends on that staying pure).

   ENTRIES: all 36 skills. NO EXCLUSIONS — every 2D Trig skill rolls
   honestly (0 STATIC in the audit), every input is mc / tap / calc /
   yesno / steps (INPUT LAW clean: no free text anywhere — a steps
   chain's own steps are mc / calc / tokenpad), and every diagram is
   drawn to scale by placeTri + triangle-graph.js, which
   verify-dice-trig.html re-checks with verifyTriangle on every
   rolled figure.

   ⚠️ STEPS ARRIVED AFTER THIS POOL WAS BUILT. Round 2's three
   calculations became step chains on 2026-08-27, and the audit day
   2026-08-30 widened chains to t3–t7 — but withMethod() below kept
   attaching q.method to them, and js/play.js renders the 📖 method
   link AT MOUNT, before step 1. On a steps chain the method IS the
   remaining answers, so the link handed the whole chain over. Fixed
   the same way dice-gtrig.js always had it: methodEligible() refuses
   steps chains. When the banked play.js gate lands (render the link
   only once root.dataset.step === steps.length), delete that clause
   here AND in dice-gtrig.js and the chains get their link back.

   KINDS: kind === skillId for all 36 — NO GROUPING. The three pairs
   that look like near-duplicates were each checked and left separate:
     • t2.whichForm vs t3.whichForm — same mechanic, but opposite
       content (sides on top for a SIDE vs sines on top for an ANGLE)
       and different concepts (sineRuleSide / sineRuleAngle). Grouping
       them would let a learner meet "the sine-rule form" once and
       never see the other half of the pair.
     • t1.cosineTrigger vs t4.includedAngle — both about the included
       angle, but one asks WHICH RULE and the other asks WHICH ANGLE.
     • t6.triArea vs t6.triAreaWord — same numbers family, but one is
       read off a to-scale diagram and the other out of words; reading
       the figure is the skill being drilled in the first.
   When unsure, don't group (DICE-COMMON) — so nothing is grouped.

   roundLength = 5. Skills per quest: t1 6, t2 5, t3 6, t4 4, t5 4,
   t6 6, t7 5 → sorted 4, 4, 5, 5, 6, 6, 6 → median (4th of 7) = 5.
   With 36 kinds that is ceil(36/5) = 8 coverage-first rounds before
   dealing goes fully random.
   ============================================================ */
import { questT1 } from "./questt1-choose.js";
import { questT2 } from "./questt2-sine-sides.js";
import { questT3 } from "./questt3-sine-angles.js";
import { questT4 } from "./questt4-cosine-sides.js";
import { questT5 } from "./questt5-cosine-angles.js";
import { questT6 } from "./questt6-area.js";
import { questT7 } from "./questt7-mixed.js";

const QUESTS = [questT1, questT2, questT3, questT4, questT5, questT6, questT7];

/* ---------- the method rule (DICE-COMMON, 2026-08-23) ----------
   q.method feeds the always-available "📖 Show me the method" link.
   Most of this chapter's calc skills carry REAL worked steps already
   (sine/cosine substitution lines, "keep R unrounded", "supplementary
   pair" …) — those become the method. But _shared.js's mc() gives every
   multiple-choice question a DEFAULT solution of [{ s: <the answer> }],
   and a method link that reveals only the answer is a spoiler button,
   not a method. So a solution only counts as real working when:
     • it has 2+ steps, OR
     • any step carries a reason (s.r), OR
     • its single step's text is not just the answer — i.e. it differs
       from q.answerLabel AND from the correct option's label.
   Otherwise q.method is left undefined and js/play.js simply omits the
   link. No new teaching text is written here; nothing is rewritten. */
const strip = s => String(s == null ? "" : s).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

export function hasRealWorking(q) {
  const sol = q && q.solution;
  if (!Array.isArray(sol) || !sol.length) return false;
  if (sol.length >= 2) return true;
  if (sol.some(s => s && s.r)) return true;
  const only = strip(sol[0] && sol[0].s);
  if (!only) return false;
  if (q.answerLabel != null && only === strip(q.answerLabel)) return false;
  const correct = Array.isArray(q.options) ? q.options.find(o => o.correct) : null;
  if (correct && only === strip(correct.label)) return false;
  return true;
}

/* Exactly the markup js/questions.js already renders for the wrong-
   answer worked-solution panel (.fb-answer / .sol / .sol-step, already
   styled) — the vetted strings from the quest module, surfaced earlier. */
function methodHtml(q) {
  let html = "";
  if (q.answerLabel != null) html += `<div class="fb-answer"><b>Answer:</b> ${q.answerLabel}</div>`;
  html += `<div class="sol">` + q.solution.map(s =>
    `<div class="sol-step"><span class="s">${s.s}</span>${s.r ? `<span class="r">${s.r}</span>` : ""}</div>`).join("") + `</div>`;
  return html;
}

/* Is this question allowed an always-available method link?
   `steps` chains are not — their solution IS the remaining answers, and
   js/play.js renders the link before step 1 (see the header ⚠️).
   Exported so the harness can assert the rule instead of restating it. */
export function methodEligible(q) {
  return !!q && q.type !== "steps" && hasRealWorking(q);
}

/* Wrap a skill's gen so it stays a PURE zero-arg function — no
   randomness of its own, so genAt()/withSeed() determinism (and hence
   resume) is untouched — and just attaches q.method where the question
   already carries real working. */
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
      kind: skillId,                       // no grouping — see the header
      concept: skill.concept || null,      // every one already has a card in js/concepts.js
      gen: withMethod(skill.gen),
    });
  });
});

export const pool = {
  chapterId: "trig",
  roundLength: 5,
  entries,
};
