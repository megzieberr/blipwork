/* ============================================================
   EXAM FOCUS — SKILL CARDS · Exponents & Surds
   (EXAM-SKILLS-BRIEF.md, stage 1, 2026-08-22 — her agreed grouping
   table, implemented exactly, in her order.
   EXTENDED 2026-08-23, SESSION B of the Exam Focus build day:
   EXAM-BUILD-DAY.md's tile map + sessions/B-exp.md.)
   ------------------------------------------------------------
   WHAT CHANGED ON 2026-08-23

   1. SEVEN tiles instead of four, in EXAM-BUILD-DAY.md's tile-map
      order: rational-exponents-numeric · exponent-expressions ·
      exponential-equations · surds · rationalise · surd-proofs ·
      level-4. Two of them are brand new chapters of work
      (rational-exponents-numeric and surd-proofs), and the last one
      is the Level 4 ★ tile every chapter now ends with.
   2. THIRTY-ONE new cards, cut from seven new sibling modules, so
      every normal tile holds six and the Level 4 tile holds seven.
   3. THE ★ MOVE (her ruling 5): exp.nss.q1(d) — 4ˣ − 3·2ˣ − 4 = 0 —
      is a LEVEL 4 part and used to sit on the exponential-equations
      tile. It moves to level-4, unchanged. That is what let "exp"
      come off verify-exam.html Part 13's L4_MOVE_PENDING list, so
      the level wall is now enforced for this chapter: no ★ part may
      appear on any normal exp tile again.
      It carries NO intro. Its own prompt already says "No calculator"
      and its hint already names the k-method, so parts (a)–(c) of the
      question it came from left it nothing to carry — and an intro
      that repeated the prompt would break the "never say a thing
      twice" rule the intro exists to serve.

   The three original seeded questions (exp.fsm.t1q1, exp.cr.q1,
   exp.nss.q1) are untouched: every one of their twelve cards is still
   here, on the same tile, with the single documented exception above.

   Cards are listed EASIEST FIRST inside each tile (her ruling 10).
   js/exam/index.js sorts by card level anyway, but the file should
   read the way the tile plays.

   The "<em>Answer the WHOLE of this question without a calculator.</em>"
   and "<em>No calculator.</em>" lines are kept exactly as printed. They
   are real exam instruction, not stem scaffolding.
   ============================================================ */
import { makeCard } from "./_cards.js";
import { expFirstStepAndMethodQuestions } from "./exp-first-step-and-method.js";
import { expConjugatesAndRationalisingQuestions } from "./exp-conjugates-and-rationalising.js";
import { expNoSolutionAndStrategyQuestions } from "./exp-no-solution-and-strategy.js";
/* --- SESSION B, 2026-08-23: the seven sibling / Level 4 modules --- */
import { expRationalExponentsNumericSiblingQuestions } from "./exp-siblings-rational-exponents-numeric.js";
import { expExponentExpressionsSiblingQuestions } from "./exp-siblings-exponent-expressions.js";
import { expExponentialEquationsSiblingQuestions } from "./exp-siblings-exponential-equations.js";
import { expSurdsSiblingQuestions } from "./exp-siblings-surds.js";
import { expRationaliseSiblingQuestions } from "./exp-siblings-rationalise.js";
import { expSurdProofsSiblingQuestions } from "./exp-siblings-surd-proofs.js";
import { expLevel4Questions } from "./exp-level4.js";

const SOURCES = [
  ...expFirstStepAndMethodQuestions,
  ...expConjugatesAndRationalisingQuestions,
  ...expNoSolutionAndStrategyQuestions,
  ...expRationalExponentsNumericSiblingQuestions,
  ...expExponentExpressionsSiblingQuestions,
  ...expExponentialEquationsSiblingQuestions,
  ...expSurdsSiblingQuestions,
  ...expRationaliseSiblingQuestions,
  ...expSurdProofsSiblingQuestions,
  ...expLevel4Questions,
];
const src = id => {
  const q = SOURCES.find(qq => qq.id === id);
  if (!q) throw new Error(`cards-exp.js: no seeded question "${id}"`);
  return q;
};

export const expCards = [
  /* ---- 1. Rational & negative exponents (no calculator) — NEW tile -- */
  makeCard({ skill: "rational-exponents-numeric", from: src("exp.sib.ren.q1"), parts: ["a"] }),
  makeCard({ skill: "rational-exponents-numeric", from: src("exp.sib.ren.q2"), parts: ["a"] }),
  makeCard({ skill: "rational-exponents-numeric", from: src("exp.sib.ren.q3"), parts: ["a"] }),
  makeCard({ skill: "rational-exponents-numeric", from: src("exp.sib.ren.q4"), parts: ["a"] }),
  makeCard({ skill: "rational-exponents-numeric", from: src("exp.sib.ren.q5"), parts: ["a"] }),
  makeCard({ skill: "rational-exponents-numeric", from: src("exp.sib.ren.q6"), parts: ["a"] }),

  /* ---- 2. Simplify exponent expressions ------------------------ */
  makeCard({ skill: "exponent-expressions", from: src("exp.sib.expr.q1"), parts: ["a"] }),
  makeCard({ skill: "exponent-expressions", from: src("exp.sib.expr.q2"), parts: ["a"] }),
  makeCard({ skill: "exponent-expressions", from: src("exp.sib.expr.q3"), parts: ["a"] }),
  makeCard({ skill: "exponent-expressions", from: src("exp.fsm.t1q1"), parts: ["c"] }),
  makeCard({ skill: "exponent-expressions", from: src("exp.fsm.t1q1"), parts: ["d"] }),
  makeCard({ skill: "exponent-expressions", from: src("exp.sib.expr.q4"), parts: ["a"] }),

  /* ---- 3. Exponential equations -------------------------------- */
  makeCard({ skill: "exponential-equations", from: src("exp.nss.q1"), parts: ["a"] }),
  makeCard({ skill: "exponential-equations", from: src("exp.sib.eqns.q1"), parts: ["a"] }),
  makeCard({ skill: "exponential-equations", from: src("exp.nss.q1"), parts: ["b"] }),
  makeCard({ skill: "exponential-equations", from: src("exp.sib.eqns.q2"), parts: ["a"] }),
  makeCard({ skill: "exponential-equations", from: src("exp.nss.q1"), parts: ["c"] }),
  makeCard({ skill: "exponential-equations", from: src("exp.sib.eqns.q3"), parts: ["a"] }),
  /* exp.nss.q1(d) used to be here — it is level 4, so it now lives on
     the level-4 tile at the bottom of this file (her ruling 5). */

  /* ---- 4. Working with surds ----------------------------------- */
  makeCard({ skill: "surds", from: src("exp.fsm.t1q1"), parts: ["a"] }),
  makeCard({ skill: "surds", from: src("exp.cr.q1"), parts: ["b"] }),
  makeCard({ skill: "surds", from: src("exp.cr.q1"), parts: ["a"] }),
  makeCard({ skill: "surds", from: src("exp.cr.q1"), parts: ["c"] }),
  makeCard({ skill: "surds", from: src("exp.sib.srd.q2"), parts: ["a"] }),
  makeCard({ skill: "surds", from: src("exp.sib.srd.q1"), parts: ["a"] }),

  /* ---- 5. Rationalise the denominator -------------------------- */
  makeCard({ skill: "rationalise", from: src("exp.sib.rat.q1"), parts: ["a"] }),
  makeCard({ skill: "rationalise", from: src("exp.fsm.t1q1"), parts: ["b"] }),
  makeCard({ skill: "rationalise", from: src("exp.sib.rat.q2"), parts: ["a"] }),
  makeCard({ skill: "rationalise", from: src("exp.sib.rat.q3"), parts: ["a"] }),
  makeCard({ skill: "rationalise", from: src("exp.cr.q1"), parts: ["d"] }),
  makeCard({ skill: "rationalise", from: src("exp.sib.rat.q4"), parts: ["a"] }),

  /* ---- 6. Surd “show that” & number tricks — NEW tile ----------- */
  makeCard({ skill: "surd-proofs", from: src("exp.sib.sp.q1"), parts: ["a"] }),
  makeCard({ skill: "surd-proofs", from: src("exp.sib.sp.q4"), parts: ["a"] }),
  makeCard({ skill: "surd-proofs", from: src("exp.sib.sp.q5"), parts: ["a"] }),
  makeCard({ skill: "surd-proofs", from: src("exp.sib.sp.q6"), parts: ["a", "b"] }),
  makeCard({ skill: "surd-proofs", from: src("exp.sib.sp.q2"), parts: ["a"] }),
  makeCard({ skill: "surd-proofs", from: src("exp.sib.sp.q3"), parts: ["a"] }),

  /* ---- 7. Level 4 ★ — the brave round — NEW tile ---------------- */
  /* The moved ★ card first: it is the gentlest of the seven, and it is
     the one a learner arriving from the exponential-equations tile has
     the most context for. No intro — see this file's header. */
  makeCard({ skill: "level-4", from: src("exp.nss.q1"), parts: ["d"] }),
  makeCard({ skill: "level-4", from: src("exp.l4.q4"), parts: ["a"] }),
  makeCard({ skill: "level-4", from: src("exp.l4.q5"), parts: ["a", "b"] }),
  makeCard({ skill: "level-4", from: src("exp.l4.q1"), parts: ["a"] }),
  makeCard({ skill: "level-4", from: src("exp.l4.q6"), parts: ["a", "b"] }),
  /* q2's three parts all read ONE expression, and part (a) states it —
     so the card needs no intro (verify-exam.html Part 12 rule 6: a card
     whose first part carries the stem must not repeat it). */
  makeCard({ skill: "level-4", from: src("exp.l4.q2"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "level-4", from: src("exp.l4.q3"), parts: ["a"] }),
];
