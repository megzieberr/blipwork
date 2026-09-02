/* ============================================================
   DICE — Exponents & Surds pool (es1–es8). Session ES build,
   2026-08-23/24 overnight (wave 2). REPLACES the foreman's stub at
   chapterId "exp" in js/quests/dice-pools.js.
   ------------------------------------------------------------
   Built to js/quests/dice-stats.js's recipe (sessions/DICE-COMMON.md):
   every entry REUSES the quest module's own skill.gen() VERBATIM, so
   the vetted wording, the curated banks and every guard ride along
   unchanged. No maths is reimplemented here — the only wrapper is
   withMethod() below, and it adds no randomness of its own (js/dice.js
   calls gen() under a seeded rng; resume depends on that staying pure).

   DICE-AUDIT.md §11: 52 skills — 24 CLEAN, 19 CARE, 9 STATIC. This is
   a THEORY chapter: no diagram engine, every question is mc or yesno,
   so there is no graph honesty to check and nothing that could take
   free text (INPUT LAW clean across all 52).

   ---------- the 19 CARE skills: PARAMETRISED IN PLACE ----------
   Per DICE-COMMON's wave-2 rule, the CARE skills were parametrised in
   the chapter's own quest modules rather than left as fixed worked
   numbers — the work the audit predicted would roughly double the pool
   (24 → 43). Every one kept its wording, its mechanic and its decoy
   FAMILIES; only the numbers roll, and every answer/decoy is recomputed
   from that roll. Nothing was invented: in es2 and es5 especially, the
   wrong options ARE the teaching content, so the same ten yes/no traps
   and the same four broken steps are all that is ever shown.
     queses2-traps.js   trap1 · trap2 · trap3 · trap4 · fixIt1 · fixIt2
     queses5-surds.js   likeSurds · insideOutside · twoAnswers
     queses6-conjugates.js  findConjugate · conjugateProduct ·
                            rationaliseSingle · rationaliseTwo · abForm
     queses7-ratexp.js  reciprocalStep
     queses8-nosolution.js  sameBase · positiveBase · rejectK · surdIsolate
   No CARE skill had to be abandoned: none of them lost its teaching
   point when rolled, so none is excluded on those grounds.

   ---------- EXCLUSIONS: the 9 STATIC skills ----------
   Left OUT of the pool. Each samples a hand-authored bank where an item
   is a whole worked example tied to its own numbers AND its own
   multi-line explanation — re-rolling those is "write a new worked
   example", which DICE-COMMON explicitly forbids this session from
   attempting. They stay exactly as they are in static play.
     es3.kMethod      — 2 full k-method walkthroughs on huge exponents
                        (5²⁰⁰⁷/5²⁰¹⁰); the numbers ARE the lesson.
     es4.classify1    ┐ all three sample the shared 12-item factorising-
     es4.classify2    │ type gallery — every item a distinct authored
     es4.classify3    ┘ expression with its own "why".
     es4.substitution — 5-item pool, each a specific expression+k pairing
                        (including the √x and ⁴√x cases).
     es7.classify1    ┐ all three sample the shared 11-item rational-
     es7.classify2    │ exponent gallery; each equation carries its own
     es7.classify3    ┘ odd/even reasoning line.
     es8.whichMethod  — 3-item bank, each a worked expression needing its
                        own method-identification explanation.

   ---------- POOL SIZE ----------
   52 audited skills − 9 STATIC = 43 entries.

   ---------- KINDS (coverage buckets) ----------
   kind = skillId everywhere EXCEPT two groupings, each a TRUE near-
   duplicate (same concept, same mechanic, same bank — DICE-COMMON's
   test) and each one the audit itself flagged as a repeat risk:
     1. es2.trap1 / trap2 / trap3 / trap4  →  kind "es2.trap"
        Identical generators: same concept (expTraps), same ynQ builder,
        same ten-item trap bank. Only the hint sentence differs. Four
        coverage buckets for one mechanic would tell the dealer a
        learner still had three "new kinds" to meet after seeing it.
     2. es2.fixIt1 / fixIt2  →  kind "es2.fixIt"
        Identical generators AND identical hints — the same four-item
        "name the mistake" bank.
   Everything else stays its own kind. Deliberately NOT grouped (same
   family, different teaching point — DICE-COMMON: when unsure, don't):
     · es1.sameBase (the same-base GATE, yesno) vs es8.sameBase (the
       same-base PLAN for solving, mc) — different concepts entirely.
     · es5.likeSurds vs es3.likeTerms — like terms in surds vs in powers.
     · es6.rationaliseSingle vs es6.rationaliseTwo — one-term vs two-term
       denominators are the two halves of the skill.
     · es5.twoAnswers vs es7-family ± reasoning — one solves, one classifies.
   → 43 skills, 39 kinds.

   ---------- roundLength = 6 ----------
   Median skills-per-quest across the quests as INCLUDED (STATIC skills
   removed): es1 7, es2 6, es3 6 (7−1), es4 2 (6−4), es5 6, es6 7,
   es7 3 (6−3), es8 6 (7−1) → sorted 2, 3, 6, 6, 6, 6, 7, 7 → eight
   values, median = (4th + 5th)/2 = (6 + 6)/2 = 6.
   With 39 kinds that is ceil(39/6) = 7 coverage-first rounds before
   dealing goes fully random.

   ---------- METHOD (DICE-COMMON's method rule) ----------
   q.method feeds the always-available "📖 Show me the method" link.

   COVERAGE (2026-09-02 worked-methods batch, session S3): 42 of 43.
   Before that batch every question carried only the builders' DEFAULT
   solution — _shared.js's mc() sets solution = [{ s: <the correct
   option label> }] and _exp.js's ynQ() sets it to [{ s: answerLabel }]
   — so hasRealWorking() rejected all 43 and the link was a spoiler
   button waiting to happen. The batch wrote real working INSIDE each
   gen(), following METHODS-algebra.md Part A: her law NAMES (product
   rule, depressed exponents, flipped fractions), divorce and "caged",
   tickets out, KFC, the BIG NO-NO, guns and helmets, and "ALWAYS test
   both answers!!".

   ONE stays method-less ON PURPOSE — es1.nameLaw, which asks for the
   NAME of a law it has already printed in full. The only "working"
   possible there is her name for it, which is the answer, so a link
   would be the spoiler button this rule exists to prevent. Its
   teaching lives in the hint and the "I'm lost" card.

   NO METHOD TEXT IS WRITTEN IN THIS FILE — it only surfaces what each
   quest module's own gen() already built.
   ============================================================ */
import { questEs1 } from "./queses1-laws.js";
import { questEs2 } from "./queses2-traps.js";
import { questEs3 } from "./queses3-method.js";
import { questEs4 } from "./queses4-divorce.js";
import { questEs5 } from "./queses5-surds.js";
import { questEs6 } from "./queses6-conjugates.js";
import { questEs7 } from "./queses7-ratexp.js";
import { questEs8 } from "./queses8-nosolution.js";

const QUESTS = [questEs1, questEs2, questEs3, questEs4, questEs5, questEs6, questEs7, questEs8];

/* the 9 hand-authored worked-example skills — see the header */
export const EXCLUDED = new Set([
  "es3.kMethod",
  "es4.classify1", "es4.classify2", "es4.classify3", "es4.substitution",
  "es7.classify1", "es7.classify2", "es7.classify3",
  "es8.whichMethod",
]);

/* the two true-near-duplicate groupings — see the header */
const KIND_OF = {
  "es2.trap1": "es2.trap", "es2.trap2": "es2.trap", "es2.trap3": "es2.trap", "es2.trap4": "es2.trap",
  "es2.fixIt1": "es2.fixIt", "es2.fixIt2": "es2.fixIt",
};

/* Skills whose QUESTION CONTENT is fixed — pure rule-recall, no numbers
   and no bank to sample. Their option order still re-shuffles on a
   retry (mc), but a yesno one is genuinely byte-identical every roll.
   Listed so verify-dice-exp.html can exempt them from the
   "salt 1 must differ from salt 0" check (DICE-COMMON) — and, for the
   six yesno ones, ASSERT that they are identical, which is what makes
   the classification honest rather than a convenient escape hatch. */
export const PURE_RECALL = new Set([
  "es1.sameBase",                                       // yesno
  "es3.oneTerm", "es3.plusMinus", "es3.cancel", "es3.order",   // cancel = yesno
  "es4.restriction",                                    // yesno
  "es5.bigNoNo",                                        // yesno
  "es6.whyConjugate", "es6.equalsOne",                  // equalsOne = yesno
  "es7.whyReciprocal", "es7.noSolutionRule",            // noSolutionRule = yesno
  "es8.alwaysTest", "es8.surdDomain",
]);
/* the subset that cannot vary AT ALL (no options to re-shuffle) */
export const FIXED_YESNO = new Set([
  "es1.sameBase", "es3.cancel", "es4.restriction",
  "es5.bigNoNo", "es6.equalsOne", "es7.noSolutionRule",
]);

/* ---------- the method rule (sessions/DICE-COMMON.md) ----------
   A solution counts as real working only when it has 2+ steps, or a
   step carries a reason (s.r), or its single step's text is not just
   the answer (differs from q.answerLabel AND from the correct option's
   label). Anything else would make the method link a spoiler. */
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
   styled) — vetted strings from the quest module, surfaced earlier. */
function methodHtml(q) {
  let html = "";
  if (q.answerLabel != null) html += `<div class="fb-answer"><b>Answer:</b> ${q.answerLabel}</div>`;
  html += `<div class="sol">` + q.solution.map(s =>
    `<div class="sol-step"><span class="s">${s.s}</span>${s.r ? `<span class="r">${s.r}</span>` : ""}</div>`).join("") + `</div>`;
  return html;
}

/* Wrap a skill's gen so it stays a PURE zero-arg function — no
   randomness of its own, so genAt()/withSeed() determinism (and hence
   resume) is untouched — and attach q.method only where the question
   already carries real working. In this chapter that is nowhere; the
   wrapper stays so the rule is enforced by code, not by a comment. */
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
    if (EXCLUDED.has(skillId)) return;
    entries.push({
      skillId,
      kind: KIND_OF[skillId] || skillId,
      concept: skill.concept || null,   // every one already has a card in js/concepts.js
      gen: withMethod(skill.gen),
    });
  });
});

export const pool = {
  chapterId: "exp",
  roundLength: 6,
  entries,
};
