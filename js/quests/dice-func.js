/* ============================================================
   DICE — Functions pool (fn1–fn7). Session FN, 2026-08-23/24
   overnight (wave 2). REPLACES the foreman's stub at chapterId
   "func" in js/quests/dice-pools.js. Built to js/quests/
   dice-stats.js's recipe (DICE-COMMON.md), with the NEW method
   rule and this chapter's graph-honesty law.
   ------------------------------------------------------------
   DICE-AUDIT.md §7 did the classification: every Functions skill
   is CLEAN or CARE, none STATIC. (The audit's headline count is
   38; the chapter actually ships 40 — §7's tables miss
   fn3.expRange and fn5.compareBoundary. Both were read, both
   roll, both are in the pool. Reported to the foreman.)

   CARE here never means "a fixed worked-number example": it means
   a figure-bearing gen() that already carries its own curated
   window / nice-number / collision guard. Those guards all live
   INSIDE the quest module's own gen():

     · _func.js's nz()          — a ≠ 0 on every rolled line/hyperbola
     · randParabola()           — roots forced ≥ 2 apart, so the hump
                                  is never a sliver
     · _func.js's winFor()      — an integer window that always
                                  encloses every feature AND the origin,
                                  with padding and a minimum span
     · _func.js's labelX()      — scans for an x where the curve name
                                  sits comfortably inside the window,
                                  so the engine never silently drops it
     · fn2.lineIntercepts       — while-loop: a ≠ 0, q ≠ 0, a real
                                  x-intercept (intercepts off the origin)
     · fn2.tpFormRead           — while-loop: p ≠ 0, q ≠ 0, p ≠ q, so
                                  the three sign-trap decoys stay distinct
     · fn2.axisOfSymmetry       — hand-built decoy conditional for the
                                  tp.x = 0 and tp.x = −0,5 edge cases
     · fn3.hypAsymptotes /
       fn3.hypDomainRange /
       fn4.readAsymptotes       — while-loop: p ≠ q, so the swapped
                                  decoy can never be the answer
     · fn3.expGrowthDecay       — while-loop: a > 0, or "growth
                                  (increasing)" would be a false label
     · fn4.readYIntercept       — while-loop: a non-zero y-intercept
                                  that is actually MARKED on the sketch
     · fn4.readXIntercept       — while-loop: an integer, non-zero
                                  x-intercept (a fair read-off)
     · fn4.readTP               — while-loop: integer TP coordinates,
                                  so the read-off lands on a gridline
     · fn5.rootsParabola()      — do-while: two distinct roots ≥ 1 apart
     · fn6.applyReflect         — while-loop: |TP.x| and |TP.y| ≥ 0,4,
                                  so all four reflected options differ
     · fn7.intersectionRead /
       fn7.fAboveG              — while-loops: never the origin,
                                  a1 ≠ a2, neither gradient 0
     · fn7.avgGradient          — for(;;) retry: every feature y-value
                                  ≤ 12, so the sketch stays readable
     · fn7.maxLength            — closed-form construction (the line is
                                  built to pass above the vertex), so a
                                  real positive gap always exists

   This pool REIMPLEMENTS NONE OF IT. It reuses each skill's own
   gen() verbatim, so every guard rides along for free — which is
   also why no rolled window ever needed tightening: the curated-
   safe families the static skills already use ARE the pool.

   NOTHING WAS PARAMETRISED. The wave-2 CARE-parametrising rule
   targets hand-authored fixed worked-number examples; Functions
   has none (0 STATIC in the audit, and every skill already draws
   its numbers fresh). No quest module was edited by this session.

   ------------------------------------------------------------
   ENTRIES — 40 of the chapter's 40 skills. NO EXCLUSIONS.
   Every skill rolls (or is a fixed-recall list-pick), nothing is
   hardcoded prose, and the chapter uses only `mc` (38) and `calc`
   (2) — list-pick and number pad, so the INPUT LAW holds
   everywhere. No free-text input exists in this chapter.

   ------------------------------------------------------------
   KINDS — 40 kinds for 40 skills. NO GROUPING.
   Four near-miss pairs were looked at properly and DELIBERATELY
   left ungrouped (DICE-COMMON: "when unsure, don't group"):
     · fn2.turningPoint vs fn4.readTP — same answer shape, but
       different mechanic and different concept card
       ("parabolaShape" vs "readGraph"): fn2 works the TP out from
       the equation, fn4 reads it off a graph whose labels have been
       stripped. Grouping would drop one card from first-pass
       coverage.
     · fn3.hypAsymptotes vs fn4.readAsymptotes — same again
       ("hyperbolaGraph" vs "readGraph"), and fn4's version also
       covers the exponential's single asymptote.
     · fn2.lineIntercepts vs fn4.readXIntercept / readYIntercept —
       "linearGraph" vs "readGraph": solve-it vs read-it-off.
     · fn5.fPositive vs fn5.fNegative — same concept and the same
       rootsParabola() numbers family, but they are the two
       OPPOSITE readings (outside vs between the roots) and the
       whole teaching point is that a learner who can do one still
       flips the other. Both should be dealt.
   The domain/range family (fn2.parabolaRange, fn3.hypDomainRange,
   fn3.expRange, fn4.readRange) shares a concept card but is four
   different families of graph — separate kinds.

   ------------------------------------------------------------
   roundLength = 6 — the median skills-per-quest of the chapter.
   Skills per quest: fn1 4, fn2 7, fn3 6, fn4 5, fn5 6, fn6 7,
   fn7 5 → sorted 4, 5, 5, 6, 6, 7, 7 → the 4th of seven values →
   median = 6. Full coverage of 40 kinds therefore needs
   ⌈40/6⌉ = 7 rounds.
   ============================================================ */
import { questFn1 } from "./questfn1-families.js";
import { questFn2 } from "./questfn2-line-parabola.js";
import { questFn3 } from "./questfn3-hyperbola-exp.js";
import { questFn4 } from "./questfn4-read-graph.js";
import { questFn5 } from "./questfn5-inequalities.js";
import { questFn6 } from "./questfn6-transformations.js";
import { questFn7 } from "./questfn7-together.js";

const QUESTS = [questFn1, questFn2, questFn3, questFn4, questFn5, questFn6, questFn7];

/* ------------------------------------------------------------
   THE METHOD RULE (DICE-COMMON.md, 2026-08-23 — this differs from
   dice-stats.js, and it bites hard in this chapter).

   q.method feeds the always-available "📖 Show me the method" link.
   In Statistics every question carried real worked steps. In
   Functions only two do: _shared.js's mc() defaults `solution` to
   a single step whose text IS the correct option's label, so 38 of
   the 40 skills would otherwise get a "method" link that reveals
   nothing but the answer — a spoiler button, not a method.

   A solution counts as REAL WORKING when any of these hold:
     · it has 2+ steps, OR
     · any step carries a reason (`r`), OR
     · its single step's text is neither the answerLabel nor the
       correct option's label.
   Otherwise q.method is left undefined and js/play.js simply omits
   the link (it already tolerates absence).

   The two that qualified from the start are both in fn7, and both
   already follow HER method (GR11-FUNCTIONS-NOTES-DIGEST.md):
     · fn7.avgGradient — m = Δy/Δx, substituting each x into f
       first (her notes p59);
     · fn7.maxLength — AB = top − bottom → a new (sad) parabola →
       x = −b/(2a) → substitute back (her notes p40–45; the Gr11
       route, NOT the Grade-12 derivative the source pages use).

   COVERAGE (2026-09-02 worked-methods batch, session S3): 39 of
   40 skills now show the link. That batch wrote the missing 38
   INSIDE each gen(), from her digest: happy/sad, taking off /
   landing, a>0 decreasing per branch, p flips and q never does,
   and the CUT-LINES-THEN-PAINT inequality method that replaced
   the TEKENTABEL — never interval notation, always x first.

   The 40th is fn7.maxLength, a `steps` chain: methodEligible()
   refuses it because js/play.js renders the 📖 link at mount,
   BEFORE step 1, so on a chain the link hands over the remaining
   answers. That refusal is correct, not a gap.

   NO METHOD TEXT IS WRITTEN IN THIS FILE — it only surfaces what
   each quest module's own gen() already built.
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

/* Is this question allowed an always-available method link?
   `steps` chains are not — their solution IS the remaining answers, and
   js/play.js renders the 📖 link at MOUNT, before step 1 (fn7.maxLength
   joined the chain-carrying skills on this audit day, alongside all of
   m6's calc skills). Exported so the harness can assert the rule instead
   of restating it — the same split js/quests/dice-trig.js already made. */
export function methodEligible(q) {
  return !!q && q.type !== "steps" && hasRealWorking(q);
}

/* Wrap a skill's gen so it stays a PURE zero-arg function — js/dice.js's
   genAt()/withSeed() call it under a seeded rng and resume depends on that
   determinism, so nothing here may add randomness of its own. All it does
   is attach q.method when (and only when) the question's own solution
   already contains real working AND it is not a steps chain. */
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
      concept: skill.concept || null,      // all 15 concepts already have cards in js/concepts.js
      gen: withMethod(skill.gen),
    });
  });
});

export const pool = {
  chapterId: "func",
  roundLength: 6,
  entries,
};
