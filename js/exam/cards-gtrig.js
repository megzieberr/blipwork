/* ============================================================
   EXAM FOCUS — SKILL CARDS · General Trig
   (EXAM-SKILLS-BRIEF.md, stage 1, 2026-08-22 — her agreed grouping
   table, implemented exactly, in her order.)
   ------------------------------------------------------------
   Six skills, four cards. The T2 no-calculator trig block splits
   cleanly into three: a co-function, a ratio-from-a-sketch, and a
   reduction — three genuinely different skills that happened to share
   a question number. The general solution keeps its two parts together
   ((b) is a "hence" off (a)).

   TWO SKILLS HAVE NO CARDS YET — identities and super-special-sums.
   They still appear on the chapter screen (js/exam/skills.js lists
   them), rendered muted and untappable, so the learner can see what is
   coming. That is her ruling, and it is why examTopicsForChapter reads
   the skill list rather than deriving topics from whatever happens to
   be registered.

   The "<em>Answer this ENTIRE question WITHOUT using a calculator…</em>"
   and "<em>No calculator.</em>" lines stay exactly as printed — real
   exam instruction, kept.
   ============================================================ */
import { makeCard } from "./_cards.js";
import { trigReductionAndRatiosQuestions } from "./trig-reduction-and-ratios.js";
import { trigGeneralSolutionsQuestions } from "./trig-general-solutions.js";

const SOURCES = [...trigReductionAndRatiosQuestions, ...trigGeneralSolutionsQuestions];
const src = id => {
  const q = SOURCES.find(qq => qq.id === id);
  if (!q) throw new Error(`cards-gtrig.js: no seeded question "${id}"`);
  return q;
};

export const gtrigCards = [
  /* ---- 1. Co-functions ----------------------------------------- */
  makeCard({ skill: "co-functions", from: src("trig.rr.t2q1"), parts: ["a"] }),

  /* ---- 2. Special Sums -----------------------------------------
     "5 sin β + 3 = 0 and tan β > 0" is the whole given — self-contained,
     no intro. */
  makeCard({ skill: "special-sums", from: src("trig.rr.t2q1"), parts: ["b"] }),

  /* ---- 3. Reduction -------------------------------------------- */
  makeCard({ skill: "reduction", from: src("trig.rr.t2q1"), parts: ["c"] }),

  /* ---- 4. General solution -------------------------------------
     (b) is a "hence" straight off (a)'s general solution, so the two
     stay on one card and (a) states the equation. */
  makeCard({ skill: "general-solution", from: src("trig.gs.t2q2"), parts: ["a", "b"] }),

  /* ---- 5. Identities · 6. Super Special Sums --------------------
     No cards yet (her grouping table says so in as many words). The
     tiles come from js/exam/skills.js, not from this list. */
];
