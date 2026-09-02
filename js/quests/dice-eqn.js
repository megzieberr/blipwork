/* ============================================================
   DICE — Equations & Inequalities pool (eq1–eq9). Built 2026-08-23
   overnight, session EQ of the wave-2 dice build. REPLACES the
   foreman's stub at chapterId "eqn" in js/quests/dice-pools.js.
   ------------------------------------------------------------
   DICE-AUDIT.md §12 did the thinking for eq1–eq8: 68 skills —
   48 CLEAN, 12 CARE, 8 STATIC. This is a THEORY chapter (its own
   _eq.js header says so: "mc + yesno curated pools, no problem-
   crunching"), so unlike Statistics/Trig a real slice of it is
   hand-authored worked-example prose. That slice stays out.

   This pool REUSES each skill.gen() VERBATIM — no maths is
   reimplemented here, so every CARE guard inside a gen() rides
   along for free:
     • eq1.bracketsZero   p ≠ q, or "x = −p or x = q" would duplicate
                          the correct answer set
     • eq1.threeFactors   b ≠ a, so the fraction b/a stays a REAL
                          fraction
     • eq1.rootsToFactors gcd(n, d) = 1 and n < d (lowest terms), and
                          the swapped decoy drops the "1x"
     • eq2.expSameBase    b^(k−1) ≠ k, or the "divide once and count"
                          decoy would BE the answer (2ˣ = 4)
     • eq4.rejectNA       other ≠ m, so the rejected and surviving
                          answers are different numbers
     • eq5.completeC      decoys are b², b/2 and b²/2 — b²/2 is always
                          distinct from (b/2)², unlike 2b at b = 8
     • eq5.whenRule       gcd(a, b) = 1 (real fraction) and a | c
     • eq6.signsIn        b ≥ 2, so "1x" is never printed
     • eq6.sumProduct     n ≥ 3, which keeps all four option values
                          distinct
     • eq6.rounding       r is never a perfect square, so the roots
                          really are irrational
     • eq7.flipApply      gcd(a, b) = 1, so the fraction −b/a arrives
                          already simplified
     • eq7.readInside /
       eq7.readOutside    randRoots() gives r1 < r2 with a gap of
                          2–5, so the shaded bowl is readable and its
                          two critical points never coincide
     • eq8.classify       the perfect-square branch is built as k²;
                          the non-square branch re-rolls until √Δ is
                          irrational
     • eq8.whereUndefined m ≠ n, so "undefined at −m" and "non-real
                          below −n" can never be the same answer
     • eq9 solutionCount() the one place her table is written down —
                          every item's key is DERIVED from it, and
                          verify-eq.html sweeps it against an
                          independent copy of her handwritten box

   ------------------------------------------------------------
   CARE PARAMETRISING (wave-2 rule, done IN PLACE in the quest
   modules before this pool was built — see each skill's own
   comment). Eleven of the twelve CARE skills were hand-written
   worked numbers with a simple enough pattern to roll; all eleven
   now roll, wording/mechanic/teaching point unchanged:
     eq1.rootsToFactors · eq2.expSameBase · eq2.ratExpPM ·
     eq4.clearFractions · eq5.whenRule · eq5.pqRule ·
     eq6.rounding · eq6.simulSubject · eq6.simulFinish ·
     eq8.classify · eq8.rejectParam
   The twelfth, eq7.flipApply, was already fully parametric — the
   audit filed it CARE for its gcd guard, not for fixed numbers —
   so it needed no change.

   ------------------------------------------------------------
   EXCLUSIONS — 10 skills are NOT in this pool.

   (a) The 8 STATIC skills from DICE-AUDIT §12. Every item in each
       of these pools is a full worked-method walkthrough tied to
       ONE specific equation; a fresh roll would mean re-deriving
       and re-authoring the whole walkthrough, not swapping a
       number. DICE-COMMON: "do not try to roll hand-authored
       worked-example banks."
         eq1.firstStep     3 worded scenarios, each with its own
                           reasoning (x² + 3x = 10 · standard form ·
                           10 + 3y − y² = 0)
         eq2.countSolutions 3 multi-bracket worked examples, each
                           counting the real solutions of a
                           different mixed factor equation
         eq3.hiddenRepeat  the "a repeat hides behind a common
                           factor" trick, taught on −2y² + 4y
         eq5.solveSteps    4 items that are ONE STEP EACH of a
                           single walkthrough (−x² + 10x − 22 = 0),
                           in stages — rolling one step would break
                           the chain the other three depend on
         eq7.compound      3 items that all explain ONE compound
                           inequality (−5 ≤ 1 − 3x < 10) from
                           different angles
         eq7.expandFirst   3 items that all explain ONE example,
                           (x + 1)(x + 2) ≤ 20
         eq8.threeTypes    3 full exam-question STEMS used to teach
                           question-type recognition; the stems are
                           the content
         eq8.proveTrick    3 distinct worked proofs (Δ = (p − 2)² + 4
                           · Δ = 169m² · complete the square on Δ)

   (b) eq9's two TEACH-FIRST skills (this session's own mini-audit —
       eq9 is newer than DICE-AUDIT; the full classification is
       below).
         eq9.theRules        5 reveal frames (her reciprocal move +
                             her three "Important Notes" rules), then
                             a forced two-solution question
         eq9.workedExamples  4 reveal frames (her four worked
                             examples), then a forced no-solution
                             question
       Both are excluded for the SAME reason, and it is not that
       they cannot roll — their questions roll perfectly. It is
       that they are teach-first frames: a 4–5 frame lesson dropped
       into the middle of a randomly dealt practice round is the
       wrong shape, and js/play.js's "Try a similar one" would
       replay the whole lesson on every wrong answer. Nothing is
       lost by leaving them out: strip the frames and their
       questions are literally classify({kind:"two", neg:false}) and
       classify({kind:"none", neg:true}) — i.e. eq9.evenTop and
       eq9.evenWithNegative, both of which ARE in the pool.

   ------------------------------------------------------------
   eq9 MINI-AUDIT ("Two, one or no solution?", built 2026-08-23
   from her two handwritten pages — newer than DICE-AUDIT §12, so
   classified here by §1's method).

   The round has no fixed prose bank at all. Every item is built by
   one of two generators — classify() and solveItem() — over a
   rolled (p, q) pair, a rolled right-hand side and a rolled sign,
   and the KEY is derived by solutionCount(), the single place her
   table lives. Nothing is hand-typed beside a number, so nothing
   here is STATIC in the DICE-AUDIT sense.

     | Skill            | Kind | Class | Reason                     |
     |------------------|------|-------|----------------------------|
     | theRules         | mc   | CARE  | rolls cleanly, but carries
     |                  |      |       | 5 teach-first reveal frames
     |                  |      |       | → EXCLUDED (see (b) above)  |
     | workedExamples   | mc   | CARE  | same, 4 frames → EXCLUDED   |
     | oddTopPositive   | mc   | CLEAN | forced kind "one", positive |
     | evenTop          | mc   | CLEAN | forced kind "two"           |
     | allOddNegative   | mc   | CLEAN | forced kind "one", negative |
     | evenWithNegative | mc   | CLEAN | forced kind "none"          |
     | mixedA           | mc   | CLEAN | free (p, q, sign)           |
     | mixedB           | mc   | CLEAN | free — identical generator
     |                  |      |       | to mixedA (see KINDS)       |
     | solvePositive    | mc   | CLEAN | solveItem(false): |c| = aᵖ
     |                  |      |       | and A = a^q, so |x| = A is
     |                  |      |       | EXACT for every roll        |
     | solveNegative    | mc   | CLEAN | solveItem(true), same guard |

   Verdict: 8 CLEAN in, 2 CARE excluded for their teach-first
   frames. The eight that are in deal fine standalone — a
   classification item is a complete question on its own (that is
   what the fixed three-button order is FOR), and a solve item
   carries its own worked lines in the answer panel. Input law
   clean: all mc.

   ------------------------------------------------------------
   KINDS. kind === skillId for 67 of the 68 entries. ONE grouping,
   and it is the only true near-duplicate in the chapter:
     eq9.mixedA + eq9.mixedB → kind "eq9.mixed"
   They are not merely similar, they are the SAME function —
   both are `classify(null)`, same concept, same mechanic, same
   numbers family, byte-identical source. Slots 7 and 9 of her
   static round are deliberately two free draws; as coverage
   buckets they are one thing. Everything else was checked and
   left separate (DICE-COMMON: when unsure, don't group):
     • eq7.readInside vs eq7.readOutside — same randRoots() family
       and the same bowl, but opposite regions, and inside-vs-
       outside IS the teaching split. Grouping them would let a
       learner meet one and never the other.
     • eq3.whatIsK vs eq3.afterSub — same repBracket() numbers,
       but "what is k" and "what does the equation become" are two
       consecutive steps of the method, not one skill.
     • eq5.completeC vs eq5.signInside — same rolled (b, half),
       different question (which constant vs which sign).
     • eq9.solvePositive vs eq9.solveNegative — same solveItem(),
       but the sign is the whole point: "no solution" only lives on
       the negative side.
     • eq4.whyRestrict vs eq8.whereUndefined — both about
       denominators, but different concepts (eqRestrictions vs
       eqKnowDiff) and different questions.

   ------------------------------------------------------------
   roundLength = 8 — the median skills-per-quest across the nine
   quests, counting only the skills this pool includes:
     eq1 6 · eq2 8 · eq3 6 · eq4 8 · eq5 7 · eq6 8 · eq7 10 ·
     eq8 7 · eq9 8
     sorted: 6, 6, 7, 7, 8, 8, 8, 8, 10 → median (5th of 9) = 8
   With 67 kinds that is ceil(67/8) = 9 coverage-first rounds
   before dealing goes fully random.

   ------------------------------------------------------------
   METHOD (DICE-COMMON's rule, 2026-08-23). q.method feeds the
   always-available "📖 Show me the method" link, and it is
   attached ONLY where the question's solution is real working:
   2+ steps, OR a step with a reason, OR a single step whose text
   is not just the answer.

   COVERAGE (2026-09-02 worked-methods batch, session S3): 68 of
   68 — the whole pool. Until that batch this chapter attached it
   NOWHERE, because every eq question is a list-pick built by
   _shared.js's mc() or _eq.js's ynQ(), whose default solution is
   [{ s: <the correct label> }] / [{ s: <the answerLabel> }] — a
   link that reveals the answer and nothing else. The batch wrote
   real working INSIDE each gen(), built from the same rolled
   values as the question, following METHODS-algebra.md (her TIP
   Chips checklist, the LCD + limits line, "CP must be =", the
   B11 Δ table wordings, guns/helmets, N.A. vs no solution vs
   undefined vs non-real).

   NO METHOD TEXT IS WRITTEN IN THIS FILE — it only surfaces what
   each quest module's own gen() already built. The 10 EXCLUDED
   skills above are untouched: they never reach the dice deal.
   ============================================================ */
import { questEq1 } from "./queseq1-zeroproduct.js";
import { questEq2 } from "./queseq2-special.js";
import { questEq3 } from "./queseq3-kmethod.js";
import { questEq4 } from "./queseq4-fractions.js";
import { questEq5 } from "./queseq5-square.js";
import { questEq6 } from "./queseq6-formula.js";
import { questEq7 } from "./queseq7-inequalities.js";
import { questEq8 } from "./queseq8-nature.js";
import { questEq9 } from "./queseq9-solution-count.js";

const QUESTS = [questEq1, questEq2, questEq3, questEq4, questEq5, questEq6, questEq7, questEq8, questEq9];

/* skillIds left OUT of the pool, with the reason in the header above.
   Exported so verify-dice-eqn.html can pin the list by name — a later
   edit cannot quietly add a worked-example bank to the dice deal. */
export const EXCLUDED = {
  "eq1.firstStep": "STATIC — 3 worded scenarios, each with its own reasoning",
  "eq2.countSolutions": "STATIC — 3 multi-bracket worked examples",
  "eq3.hiddenRepeat": "STATIC — the hidden-repeat trick taught on one example",
  "eq5.solveSteps": "STATIC — 4 items that are one step each of ONE walkthrough",
  "eq7.compound": "STATIC — 3 angles on ONE compound inequality",
  "eq7.expandFirst": "STATIC — 3 angles on ONE example, (x+1)(x+2) ≤ 20",
  "eq8.threeTypes": "STATIC — 3 exam-question stems; the stems are the content",
  "eq8.proveTrick": "STATIC — 3 distinct worked proofs",
  "eq9.theRules": "TEACH-FIRST — 5 reveal frames; its question is eq9.evenTop, which is in",
  "eq9.workedExamples": "TEACH-FIRST — 4 reveal frames; its question is eq9.evenWithNegative, which is in",
};

/* the one grouping (see KINDS above) */
const KIND_OF = {
  "eq9.mixedA": "eq9.mixed",
  "eq9.mixedB": "eq9.mixed",
};

/* ---------- the method rule, exported so the harness can re-run it
   independently of this file's wrapper ---------- */
const strip = (s) => String(s == null ? "" : s).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();

export function hasRealWorking(q) {
  const sol = q && q.solution;
  if (!Array.isArray(sol) || !sol.length) return false;
  if (sol.length >= 2) return true;
  if (sol.some((s) => s && s.r)) return true;
  const only = strip(sol[0] && sol[0].s);
  if (!only) return false;
  if (q.answerLabel != null && only === strip(q.answerLabel)) return false;
  const correct = Array.isArray(q.options) ? q.options.find((o) => o.correct) : null;
  if (correct && only === strip(correct.label)) return false;
  return true;
}

/* Exactly the markup js/questions.js already renders for the wrong-answer
   worked-solution panel (.fb-answer / .sol / .sol-step, already styled) —
   the vetted strings from the quest module, surfaced earlier. Kept even
   though no eq skill currently qualifies, so the rule stays enforced by
   code rather than by this file happening not to call it. */
function methodHtml(q) {
  let html = "";
  if (q.answerLabel != null) html += `<div class="fb-answer"><b>Answer:</b> ${q.answerLabel}</div>`;
  html += `<div class="sol">` + q.solution.map((s) =>
    `<div class="sol-step"><span class="s">${s.s}</span>${s.r ? `<span class="r">${s.r}</span>` : ""}</div>`).join("") + `</div>`;
  return html;
}

/* Wrap a skill's gen so it stays a PURE zero-arg function — no randomness
   of its own, so genAt()/withSeed() determinism (and hence resume) is
   untouched — and just attaches q.method where the question already
   carries real working. */
function withMethod(gen) {
  return () => {
    const q = gen();
    if (q.method == null && hasRealWorking(q)) q.method = methodHtml(q);
    return q;
  };
}

const entries = [];
QUESTS.forEach((quest) => {
  quest.skills.forEach((skill) => {
    const skillId = `${quest.id}.${skill.id}`;
    if (EXCLUDED[skillId]) return;
    entries.push({
      skillId,
      kind: KIND_OF[skillId] || skillId,
      concept: skill.concept || null,     // every one already has a card in js/concepts.js
      gen: withMethod(skill.gen),
    });
  });
});

export const pool = {
  chapterId: "eqn",
  roundLength: 8,
  entries,
};
