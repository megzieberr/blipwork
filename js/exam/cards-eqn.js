/* ============================================================
   EXAM FOCUS — SKILL CARDS · Equations & Inequalities
   (EXAM-SKILLS-BRIEF.md, stage 1, 2026-08-22 — her agreed grouping
   table, implemented exactly, in her order.)
   ------------------------------------------------------------
   Seven skills, eighteen cards, cut from the nine seeded eqn questions.
   Nothing here writes maths: every part is carried over untouched from
   its source module (js/exam/eqn-*.js), which stays the content source
   of truth. The only hand-written text in this file is the `intro` on
   the two cards that genuinely need one — see each one's own note.
   ============================================================ */
import { makeCard } from "./_cards.js";
import { eqnNatureOfRootsQuestions } from "./eqn-nature-of-roots.js";
import { eqnNatureOfRootsTopUpQuestions } from "./eqn-nature-of-roots-2.js";
import { eqnKMethodQuestions } from "./eqn-k-method.js";
import { eqnFractionsAndRestrictionsQuestions } from "./eqn-fractions-and-restrictions.js";
import { eqnInequalitiesQuestions } from "./eqn-inequalities.js";
import { eqnInequalitiesTopUpQuestions } from "./eqn-inequalities-2.js";

const SOURCES = [
  ...eqnNatureOfRootsQuestions,
  ...eqnNatureOfRootsTopUpQuestions,
  ...eqnKMethodQuestions,
  ...eqnFractionsAndRestrictionsQuestions,
  ...eqnInequalitiesQuestions,
  ...eqnInequalitiesTopUpQuestions,
];
const src = id => {
  const q = SOURCES.find(qq => qq.id === id);
  if (!q) throw new Error(`cards-eqn.js: no seeded question "${id}"`);
  return q;
};

export const eqnCards = [
  /* ---- 1. Standard form → Δ → nature of roots -------------------
     Both cards keep the whole chain together: (a) puts the equation in
     standard form, (b) works Δ out of it, (c) reads the nature off Δ.
     Every part leans on the one before it, so nothing splits and
     neither card needs an intro — (a) states its own equation. */
  makeCard({ skill: "nature-chain", from: src("eqn.nor.q1"), parts: ["a", "b", "c", "d"] }),
  makeCard({ skill: "nature-chain", from: src("eqn.nor.q2"), parts: ["a", "b", "c"] }),

  /* ---- 2. Find k for equal roots -------------------------------- */
  // nor.q2(d) restates its own equation ("x(x − 4) = k …") — no intro.
  makeCard({ skill: "k-equal-roots", from: src("eqn.nor.q2"), parts: ["d"] }),
  // nor.q3(a) likewise ("2x² − 4x + k = 0") — no intro.
  makeCard({ skill: "k-equal-roots", from: src("eqn.nor.q3"), parts: ["a"] }),
  /* fr.q1(d) states its own equation too, but its memo checks the equal
     root against the LIMITS, and those were found back in (a) — which
     is not on this card. So the intro carries the factorisation and the
     two forbidden values, and nothing else. */
  makeCard({
    skill: "k-equal-roots", from: src("eqn.fr.q1"), parts: ["d"],
    intro: { en: "In this equation &nbsp;x² − x − 2 = (x − 2)(x + 1), &nbsp;so the limits are &nbsp;x ≠ 2 &nbsp;and&nbsp; x ≠ −1." },
  }),

  /* ---- 3. Values of k for a given nature ------------------------
     nor.q3 (b), (c) and (d) all talk about "the equation" and all work
     from the Δ that part (a) — a k-equal-roots card now — produced. The
     intro hands both back, so the card reads as a complete question. */
  makeCard({
    skill: "k-for-nature", from: src("eqn.nor.q3"), parts: ["b", "c", "d"],
    intro: { en: "Given: &nbsp;2x² − 4x + k = 0, &nbsp;where k is a real number. Its discriminant is &nbsp;Δ = 16 − 8k." },
  }),

  /* ---- 4. Δ in terms of p → prove real for all p ----------------
     All three cards state their own equation in their first part, so
     none of them needs an intro. */
  makeCard({ skill: "delta-in-p", from: src("eqn.nor.q4"), parts: ["a", "b", "c", "d"] }),
  makeCard({ skill: "delta-in-p", from: src("eqn.nor.q5"), parts: ["a", "b", "c", "d"] }),
  makeCard({ skill: "delta-in-p", from: src("eqn.ineq.t1q3"), parts: ["b"] }),

  /* ---- 5. Inequalities -----------------------------------------
     Five one-part cards: every one of these is a self-contained "solve
     for x" (or, for q2(d), a self-contained "given the solution, find
     b and c"). Nothing depends on anything, so nothing is grouped and
     no intro is needed anywhere. */
  makeCard({ skill: "inequalities", from: src("eqn.ineq.t1q3"), parts: ["a"] }),
  makeCard({ skill: "inequalities", from: src("eqn.ineq.q2"), parts: ["a"] }),
  makeCard({ skill: "inequalities", from: src("eqn.ineq.q2"), parts: ["b"] }),
  makeCard({ skill: "inequalities", from: src("eqn.ineq.q2"), parts: ["c"] }),
  makeCard({ skill: "inequalities", from: src("eqn.ineq.q2"), parts: ["d"] }),

  /* ---- 6. Fraction equations with restrictions ------------------
     fr.q1 (a)(b)(c) is a chain — the limits, the solve, then "hence"
     off the solve — so it stays whole. (a) states the equation. */
  makeCard({ skill: "fraction-equations", from: src("eqn.fr.q1"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "fraction-equations", from: src("eqn.km.t1q2"), parts: ["b"] }),

  /* ---- 7. Rational exponents & k-method ------------------------- */
  makeCard({ skill: "rational-exponents-k", from: src("eqn.km.t1q2"), parts: ["a"] }),
  makeCard({ skill: "rational-exponents-k", from: src("eqn.km.t1q2"), parts: ["c"] }),
];
