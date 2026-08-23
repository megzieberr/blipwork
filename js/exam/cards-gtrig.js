/* ============================================================
   EXAM FOCUS — SKILL CARDS · General Trig
   (EXAM-SKILLS-BRIEF.md, stage 1, 2026-08-22 — her agreed grouping
   table, implemented exactly, in her order.)
   ------------------------------------------------------------
   The T2 no-calculator trig block splits cleanly into three: a
   co-function, a ratio-from-a-sketch, and a reduction — three genuinely
   different skills that happened to share a question number. The
   general solution keeps its two parts together ((b) is a "hence" off
   (a)).

   WHAT CHANGED ON 2026-08-23 (the Exam Focus build day — SESSION F1,
   sessions/F1-gtrig-part1.md). The chapter had FOUR cards across nine
   tiles, so five tiles rendered muted and "coming soon" and the two
   that were tappable ran dry after one tap. Session F1 fills the first
   four tiles of the tile map with twenty-two fresh sibling cards:

     co-functions        1 → 6   (js/exam/gtrig-siblings-co-functions.js)
     special-angles      0 → 6   (…-special-angles.js)      NEW TILE
     special-sums        1 → 6   (…-special-sums.js)
     super-special-sums  0 → 6   (…-super-special-sums.js)  NEW TILE

   Each sibling question is a WHOLE card on its own — its first part
   carries its own stem — so none of them takes an `intro`, and each is
   appended AFTER the existing card of its tile, easy → hard.
   `examQuestionsForTopic` sorts by card level before rendering, so a
   tile always runs level 1 → 3 whatever order this list is in; the
   order below is written level-first anyway, so the file reads the way
   the tile plays.

   AND SESSION F2, the same day (sessions/F2-gtrig-part2.md), fills the
   other five tiles with twenty-eight more sibling cards:

     reduction             1 → 6   (js/exam/gtrig-siblings-reduction.js)
     identities            0 → 6   (…-identities.js)             NEW TILE
     identities-undefined  0 → 6   (…-identities-undefined.js)   NEW TILE
     general-solution      1 → 6   (…-general-solution.js)
     level-4               0 → 6   (js/exam/gtrig-level4.js)     NEW TILE

   So the chapter now runs 4 → 54 cards across all nine tiles, and none
   of them renders "coming soon" any more.

   The "<em>Answer this ENTIRE question WITHOUT using a calculator…</em>"
   and "<em>No calculator.</em>" lines stay exactly as printed — real
   exam instruction, kept.
   ============================================================ */
import { makeCard } from "./_cards.js";
import { trigReductionAndRatiosQuestions } from "./trig-reduction-and-ratios.js";
import { trigGeneralSolutionsQuestions } from "./trig-general-solutions.js";
/* SESSION F1's four modules (2026-08-23) — one per tile, composed
   skill-first, so each question's `topic` is already the skill id. */
import { gtrigCoFunctionsSiblingQuestions } from "./gtrig-siblings-co-functions.js";
import { gtrigSpecialAnglesSiblingQuestions } from "./gtrig-siblings-special-angles.js";
import { gtrigSpecialSumsSiblingQuestions } from "./gtrig-siblings-special-sums.js";
import { gtrigSuperSpecialSumsSiblingQuestions } from "./gtrig-siblings-super-special-sums.js";
/* SESSION F2's five modules (2026-08-23) — the other five tiles, also
   composed skill-first, so each question's `topic` is already the skill
   id and every question is one whole card. */
import { gtrigReductionSiblingQuestions } from "./gtrig-siblings-reduction.js";
import { gtrigIdentitiesSiblingQuestions } from "./gtrig-siblings-identities.js";
import { gtrigIdentitiesUndefinedSiblingQuestions } from "./gtrig-siblings-identities-undefined.js";
import { gtrigGeneralSolutionSiblingQuestions } from "./gtrig-siblings-general-solution.js";
import { gtrigLevel4Questions } from "./gtrig-level4.js";

const SOURCES = [
  ...trigReductionAndRatiosQuestions,
  ...trigGeneralSolutionsQuestions,
  ...gtrigCoFunctionsSiblingQuestions,
  ...gtrigSpecialAnglesSiblingQuestions,
  ...gtrigSpecialSumsSiblingQuestions,
  ...gtrigSuperSpecialSumsSiblingQuestions,
  ...gtrigReductionSiblingQuestions,
  ...gtrigIdentitiesSiblingQuestions,
  ...gtrigIdentitiesUndefinedSiblingQuestions,
  ...gtrigGeneralSolutionSiblingQuestions,
  ...gtrigLevel4Questions,
];
const src = id => {
  const q = SOURCES.find(qq => qq.id === id);
  if (!q) throw new Error(`cards-gtrig.js: no seeded question "${id}"`);
  return q;
};

export const gtrigCards = [
  /* ---- 1. Co-functions ----------------------------------------- */
  makeCard({ skill: "co-functions", from: src("trig.rr.t2q1"), parts: ["a"] }),
  /* SIBLINGS (SESSION F1) — the trap and its neighbour, the co-function
     inside an expression that cancels, the "in terms of p" chain a paper
     opens with, the negative co-functions built her let-K way, and the
     two-step reduce-then-convert item. Each carries its own stem, so
     none takes an intro. */
  makeCard({ skill: "co-functions", from: src("gtrig.sib.cf.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "co-functions", from: src("gtrig.sib.cf.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "co-functions", from: src("gtrig.sib.cf.q3"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "co-functions", from: src("gtrig.sib.cf.q4"), parts: ["a", "b"] }),
  makeCard({ skill: "co-functions", from: src("gtrig.sib.cf.q5"), parts: ["a", "b"] }),

  /* ---- 2. Special angles (no calculator) — NEW TILE, SESSION F1 ---
     Six cards, none of them carrying a figure: drawing the two
     triangles is the skill (METHODS-trig.md C2), and a printed triangle
     would do the recall for the learner. */
  makeCard({ skill: "special-angles", from: src("gtrig.sib.sa.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "special-angles", from: src("gtrig.sib.sa.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "special-angles", from: src("gtrig.sib.sa.q3"), parts: ["a", "b"] }),
  makeCard({ skill: "special-angles", from: src("gtrig.sib.sa.q4"), parts: ["a", "b"] }),
  makeCard({ skill: "special-angles", from: src("gtrig.sib.sa.q5"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "special-angles", from: src("gtrig.sib.sa.q6"), parts: ["a", "b"] }),

  /* ---- 3. Special Sums -----------------------------------------
     "5 sin β + 3 = 0 and tan β > 0" is the whole given — self-contained,
     no intro. */
  makeCard({ skill: "special-sums", from: src("trig.rr.t2q1"), parts: ["b"] }),
  /* SIBLINGS (SESSION F1) — her five numbered steps, five times over.
     EVERY card is structured (a) "draw a sketch and find the third
     side" with NO figure, then (b)/(c) the evaluations WITH the fully
     labelled quadtri figure beside them: picking the quadrant is the
     skill, so the question side never shows the triangle. */
  makeCard({ skill: "special-sums", from: src("gtrig.sib.ss.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "special-sums", from: src("gtrig.sib.ss.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "special-sums", from: src("gtrig.sib.ss.q3"), parts: ["a", "b"] }),
  makeCard({ skill: "special-sums", from: src("gtrig.sib.ss.q4"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "special-sums", from: src("gtrig.sib.ss.q5"), parts: ["a", "b", "c"] }),

  /* ---- 4. Super Special Sums — NEW TILE, SESSION F1 --------------
     The flamingo: stand the letter on a 1, draw the triangle once, then
     read every answer off it. Same (a)/(b) split as Special Sums — (a)
     draws nothing, the evaluations carry the labelled triangle. */
  makeCard({ skill: "super-special-sums", from: src("gtrig.sib.sss.q1"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "super-special-sums", from: src("gtrig.sib.sss.q2"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "super-special-sums", from: src("gtrig.sib.sss.q3"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "super-special-sums", from: src("gtrig.sib.sss.q4"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "super-special-sums", from: src("gtrig.sib.sss.q5"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "super-special-sums", from: src("gtrig.sib.sss.q6"), parts: ["a", "b", "c"] }),

  /* ---- 5. Reduction -------------------------------------------- */
  makeCard({ skill: "reduction", from: src("trig.rr.t2q1"), parts: ["c"] }),
  /* SIBLINGS (SESSION F2) — the two straight rotations the tile has to
     OPEN on, the pair that decides most marks (an expression landing on
     −tan x, and a square that needs block brackets), the six-factor
     monster the SAG's own paper prints, a double negative rotation with
     a numeric surd beside it, and the everything-cancels-to-1 shape. */
  makeCard({ skill: "reduction", from: src("gtrig.sib.red.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "reduction", from: src("gtrig.sib.red.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "reduction", from: src("gtrig.sib.red.q3"), parts: ["a"] }),
  makeCard({ skill: "reduction", from: src("gtrig.sib.red.q4"), parts: ["a", "b"] }),
  makeCard({ skill: "reduction", from: src("gtrig.sib.red.q5"), parts: ["a", "b"] }),

  /* ---- 6. Identities: prove — NEW TILE, SESSION F2 ---------------
     Her four moves (LCD · masked identity · factorise · tan into sin
     over cos), worked LHS-only every time, with the "never
     cross-multiply an identity" trap riding on every card. q6 is the
     prove-it-then-use-it pair: the same expression evaluated at 300°
     with no calculator, which is only quick off the proved side. */
  makeCard({ skill: "identities", from: src("gtrig.sib.id.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "identities", from: src("gtrig.sib.id.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "identities", from: src("gtrig.sib.id.q3"), parts: ["a", "b"] }),
  makeCard({ skill: "identities", from: src("gtrig.sib.id.q4"), parts: ["a"] }),
  makeCard({ skill: "identities", from: src("gtrig.sib.id.q5"), parts: ["a"] }),
  makeCard({ skill: "identities", from: src("gtrig.sib.id.q6"), parts: ["a", "b"] }),

  /* ---- 7. Identities: undefined values — NEW TILE, SESSION F2 ----
     Her one routine (list every denominator, set each to zero, solve
     each, union the lists) six times over, including the two versions
     that need one extra line: "where is it ZERO" and "where is it
     REAL". */
  makeCard({ skill: "identities-undefined", from: src("gtrig.sib.iu.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "identities-undefined", from: src("gtrig.sib.iu.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "identities-undefined", from: src("gtrig.sib.iu.q3"), parts: ["a", "b"] }),
  makeCard({ skill: "identities-undefined", from: src("gtrig.sib.iu.q4"), parts: ["a", "b"] }),
  makeCard({ skill: "identities-undefined", from: src("gtrig.sib.iu.q5"), parts: ["a", "b"] }),
  makeCard({ skill: "identities-undefined", from: src("gtrig.sib.iu.q6"), parts: ["a", "b"] }),

  /* ---- 8. General solution -------------------------------------
     (b) is a "hence" straight off (a)'s general solution, so the two
     stay on one card and (a) states the equation. */
  makeCard({ skill: "general-solution", from: src("trig.gs.t2q2"), parts: ["a", "b"] }),
  /* SIBLINGS (SESSION F2) — ONE CARD PER TYPE, and the type is named in
     the memo's first line (METHODS-trig.md K1): ① function alone,
     ② same angles twice over, ⑤ trinomial with a masked identity and a
     dead branch, ⑥ co-functions, and ① again with a compound angle
     inside. The existing card above is her plain type ⑤. */
  makeCard({ skill: "general-solution", from: src("gtrig.sib.gs.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "general-solution", from: src("gtrig.sib.gs.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "general-solution", from: src("gtrig.sib.gs.q3"), parts: ["a"] }),
  makeCard({ skill: "general-solution", from: src("gtrig.sib.gs.q4"), parts: ["a", "b"] }),
  makeCard({ skill: "general-solution", from: src("gtrig.sib.gs.q5"), parts: ["a"] }),

  /* ---- 9. Level 4 ★ — the brave round — NEW TILE, SESSION F2 -----
     The bank's ⭐ trig items, freshly composed: the range-of-a-ratio
     inequality, the reverse-engineered general solution, the product
     trick, the nine-mark identity, the reduce-then-solve-then-check
     chain, and the two-condition "real" question. Every card carries at
     least one ★ part and nothing below level 3. */
  makeCard({ skill: "level-4", from: src("gtrig.l4.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "level-4", from: src("gtrig.l4.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "level-4", from: src("gtrig.l4.q3"), parts: ["a"] }),
  makeCard({ skill: "level-4", from: src("gtrig.l4.q4"), parts: ["a", "b"] }),
  makeCard({ skill: "level-4", from: src("gtrig.l4.q5"), parts: ["a", "b"] }),
  makeCard({ skill: "level-4", from: src("gtrig.l4.q6"), parts: ["a", "b"] }),
];
