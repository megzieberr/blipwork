/* ============================================================
   EXAM FOCUS — SKILL CARDS · Algebraic Expressions (algx)
   (EXAM-BUILD-DAY.md, 2026-08-23 — her ruling 2: "Algebraic expressions
   (Gr10 revision) gets its own exam-only chapter — that is where the
   30%-learners will earn their marks.")
   ------------------------------------------------------------
   FILLED BY WAVE 1, SESSION A. Session 0 (plumbing) created this file
   empty so that the chapter, its six tiles and its whole navigation
   path existed and were green before any content landed; this is that
   content — 37 cards across the six tiles.

     expand                     6 cards ·  27 marks
     factorise-basics           6 cards ·  29 marks
     factorise-advanced         6 cards ·  29 marks
     fractions-multiply-divide  6 cards ·  28 marks
     fractions-add-subtract     6 cards ·  29 marks
     level-4                    7 cards ·  38 marks

   HOW THESE ARE BUILT. Like the Functions sibling cards, and unlike
   the 21 practice-paper questions: each SOURCE question in
   js/exam/algx-*.js is a whole card on its own — its first part
   carries its own stem, so not one of them needs an `intro` — and
   makeCard() (js/exam/_cards.js) simply cuts it whole, which is what
   gives every card the `source` block the harness checks for.

   (An earlier version of this header said algx cards would be composed
   directly as card objects with no source. Session A's brief and
   sessions/CONTENT-COMMON.md both say otherwise — one module per tile
   exporting QUESTION objects, cut by makeCard here — so that is what
   was done, and it keeps algx identical in shape to every other
   chapter in this folder.)

     · ids: `algx.sib.<abbr>.qN` on the five normal tiles, `algx.l4.qN`
       on the Level 4 one, so a card id reads `algx.sib.ex.q2.ab`;
     · lostQuest: algx owns no drill rounds (js/config.js
       EXAM_ONLY_CHAPTERS), so every question carries the documented
       placeholder and js/exam-play.js renders no "I'm lost" button;
     · levels: 1–3 on the five normal tiles, and every Level 4 card
       carries at least one ★ part with nothing below level 3 —
       her ruling 5, checked by verify-exam.html Part 13;
     · cards are listed here easiest-first, which is also the order
       js/exam/index.js's level sort produces, so the file reads the
       way the tile plays.

   Every entry is validated at import by js/exam/index.js, so a broken
   card fails loudly the moment it is registered.
   ============================================================ */
import { makeCard } from "./_cards.js";
import { algxExpandSiblingQuestions } from "./algx-siblings-expand.js";
import { algxFactoriseBasicsSiblingQuestions } from "./algx-siblings-factorise-basics.js";
import { algxFactoriseAdvancedSiblingQuestions } from "./algx-siblings-factorise-advanced.js";
import { algxFractionsMultiplyDivideSiblingQuestions } from "./algx-siblings-fractions-multiply-divide.js";
import { algxFractionsAddSubtractSiblingQuestions } from "./algx-siblings-fractions-add-subtract.js";
import { algxLevel4Questions } from "./algx-level4.js";

const SOURCES = [
  ...algxExpandSiblingQuestions,
  ...algxFactoriseBasicsSiblingQuestions,
  ...algxFactoriseAdvancedSiblingQuestions,
  ...algxFractionsMultiplyDivideSiblingQuestions,
  ...algxFractionsAddSubtractSiblingQuestions,
  ...algxLevel4Questions,
];
const src = id => {
  const q = SOURCES.find(qq => qq.id === id);
  if (!q) throw new Error(`cards-algx.js: no seeded question "${id}"`);
  return q;
};

/* Every algx question is one whole card, so the cut is always "all of
   its parts, in order" — this keeps the six tables below readable. */
const whole = (skill, id) => makeCard({ skill, from: src(id), parts: src(id).parts.map(p => p.id) });

export const algxCards = [
  /* ---- 1. Expand & simplify ------------------------------------
     binomial × trinomial · squares (one with a fraction term) ·
     difference of two squares in one line · a minus in front ·
     simplify-then-evaluate · surds inside a product. */
  whole("expand", "algx.sib.ex.q1"),
  whole("expand", "algx.sib.ex.q3"),
  whole("expand", "algx.sib.ex.q2"),
  whole("expand", "algx.sib.ex.q4"),
  whole("expand", "algx.sib.ex.q5"),
  whole("expand", "algx.sib.ex.q6"),

  /* ---- 2. Factorise: common factor, squares, trinomials ---------
     common factor (one negative) · difference of two squares ·
     a common BRACKET with the reversed twin · trinomials a = 1 ·
     difference of two squares with bracketed terms · trinomials a ≠ 1. */
  whole("factorise-basics", "algx.sib.fb.q1"),
  whole("factorise-basics", "algx.sib.fb.q2"),
  whole("factorise-basics", "algx.sib.fb.q3"),
  whole("factorise-basics", "algx.sib.fb.q4"),
  whole("factorise-basics", "algx.sib.fb.q5"),
  whole("factorise-basics", "algx.sib.fb.q6"),

  /* ---- 3. Factorise: grouping & cubes ---------------------------
     grouping in pairs · cubes · grouping with a −1 · cubes in
     disguise · trinomials in disguise (her `let K = …`) ·
     a "factorise completely" chain. */
  whole("factorise-advanced", "algx.sib.fa.q1"),
  whole("factorise-advanced", "algx.sib.fa.q2"),
  whole("factorise-advanced", "algx.sib.fa.q3"),
  whole("factorise-advanced", "algx.sib.fa.q4"),
  whole("factorise-advanced", "algx.sib.fa.q6"),
  whole("factorise-advanced", "algx.sib.fa.q5"),

  /* ---- 4. Algebraic fractions: × and ÷ --------------------------
     Every card asks for the restrictions FIRST and the simplification
     second — her marking cue (METHODS-algebra.md B2/C): the `limits`
     line is written before anything is cancelled. */
  whole("fractions-multiply-divide", "algx.sib.fmd.q1"),
  whole("fractions-multiply-divide", "algx.sib.fmd.q2"),
  whole("fractions-multiply-divide", "algx.sib.fmd.q3"),
  whole("fractions-multiply-divide", "algx.sib.fmd.q4"),
  whole("fractions-multiply-divide", "algx.sib.fmd.q5"),
  whole("fractions-multiply-divide", "algx.sib.fmd.q6"),

  /* ---- 5. Algebraic fractions: + and − --------------------------
     monomial denominators · number denominators and powers of x ·
     binomial denominators (one factorised first) · a whole number in
     the mix · the negative twin · three terms. */
  whole("fractions-add-subtract", "algx.sib.fas.q1"),
  whole("fractions-add-subtract", "algx.sib.fas.q2"),
  whole("fractions-add-subtract", "algx.sib.fas.q3"),
  whole("fractions-add-subtract", "algx.sib.fas.q4"),
  whole("fractions-add-subtract", "algx.sib.fas.q5"),
  whole("fractions-add-subtract", "algx.sib.fas.q6"),

  /* ---- 6. Level 4 ★ — the brave round ---------------------------
     show-that then solve · a fraction that evaluates a huge number ·
     the disguised-cube chain · a real-world wrapper asked backwards ·
     simplify-then-solve · undefined versus equal to zero · a grouped
     difference of two squares that needs two ideas at once. */
  whole("level-4", "algx.l4.q1"),
  whole("level-4", "algx.l4.q2"),
  whole("level-4", "algx.l4.q3"),
  whole("level-4", "algx.l4.q4"),
  whole("level-4", "algx.l4.q5"),
  whole("level-4", "algx.l4.q6"),
  whole("level-4", "algx.l4.q7"),
];
