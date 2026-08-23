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

   STILL WAITING ON SESSION F2 (sessions/F2-gtrig-part2.md): reduction,
   identities, identities-undefined, general-solution and the level-4
   tile. `identities`, `identities-undefined` and `level-4` therefore
   still render muted and untappable — her ruling: the learner should
   see what is coming, not a hole, which is why examTopicsForChapter
   reads js/exam/skills.js rather than deriving tiles from whatever
   happens to be registered here.

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

const SOURCES = [
  ...trigReductionAndRatiosQuestions,
  ...trigGeneralSolutionsQuestions,
  ...gtrigCoFunctionsSiblingQuestions,
  ...gtrigSpecialAnglesSiblingQuestions,
  ...gtrigSpecialSumsSiblingQuestions,
  ...gtrigSuperSpecialSumsSiblingQuestions,
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

  /* ---- 6. General solution -------------------------------------
     (b) is a "hence" straight off (a)'s general solution, so the two
     stay on one card and (a) states the equation. */
  makeCard({ skill: "general-solution", from: src("trig.gs.t2q2"), parts: ["a", "b"] }),

  /* ---- Identities · Identities: undefined values · Level 4 ★ -----
     No cards yet — SESSION F2 fills these, together with the tops-up
     for reduction and general-solution above. The tiles come from
     js/exam/skills.js, not from this list, so they render muted and
     untappable until then. */
];
