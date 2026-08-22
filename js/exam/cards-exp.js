/* ============================================================
   EXAM FOCUS — SKILL CARDS · Exponents & Surds
   (EXAM-SKILLS-BRIEF.md, stage 1, 2026-08-22 — her agreed grouping
   table, implemented exactly, in her order.)
   ------------------------------------------------------------
   Four skills, twelve cards, cut from the three seeded exp questions.
   Every part of these three questions is a stand-alone "simplify" or
   "solve for x", so almost everything here is a one-part card and NOT
   ONE of them needs an intro — each prompt already carries its own
   expression in full.

   The "<em>Answer the WHOLE of this question without a calculator.</em>"
   and "<em>No calculator.</em>" lines are kept exactly as printed. They
   are real exam instruction, not stem scaffolding, and the brief says
   so in as many words.
   ============================================================ */
import { makeCard } from "./_cards.js";
import { expFirstStepAndMethodQuestions } from "./exp-first-step-and-method.js";
import { expConjugatesAndRationalisingQuestions } from "./exp-conjugates-and-rationalising.js";
import { expNoSolutionAndStrategyQuestions } from "./exp-no-solution-and-strategy.js";

const SOURCES = [
  ...expFirstStepAndMethodQuestions,
  ...expConjugatesAndRationalisingQuestions,
  ...expNoSolutionAndStrategyQuestions,
];
const src = id => {
  const q = SOURCES.find(qq => qq.id === id);
  if (!q) throw new Error(`cards-exp.js: no seeded question "${id}"`);
  return q;
};

export const expCards = [
  /* ---- 1. Working with surds ----------------------------------- */
  makeCard({ skill: "surds", from: src("exp.fsm.t1q1"), parts: ["a"] }),
  makeCard({ skill: "surds", from: src("exp.cr.q1"), parts: ["a"] }),
  makeCard({ skill: "surds", from: src("exp.cr.q1"), parts: ["b"] }),
  makeCard({ skill: "surds", from: src("exp.cr.q1"), parts: ["c"] }),

  /* ---- 2. Rationalise the denominator -------------------------- */
  makeCard({ skill: "rationalise", from: src("exp.fsm.t1q1"), parts: ["b"] }),
  makeCard({ skill: "rationalise", from: src("exp.cr.q1"), parts: ["d"] }),

  /* ---- 3. Simplify exponent expressions ------------------------ */
  makeCard({ skill: "exponent-expressions", from: src("exp.fsm.t1q1"), parts: ["c"] }),
  makeCard({ skill: "exponent-expressions", from: src("exp.fsm.t1q1"), parts: ["d"] }),

  /* ---- 4. Exponential equations -------------------------------- */
  makeCard({ skill: "exponential-equations", from: src("exp.nss.q1"), parts: ["a"] }),
  makeCard({ skill: "exponential-equations", from: src("exp.nss.q1"), parts: ["b"] }),
  makeCard({ skill: "exponential-equations", from: src("exp.nss.q1"), parts: ["c"] }),
  makeCard({ skill: "exponential-equations", from: src("exp.nss.q1"), parts: ["d"] }),
];
