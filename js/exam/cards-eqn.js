/* ============================================================
   EXAM FOCUS — SKILL CARDS · Equations & Inequalities
   (EXAM-SKILLS-BRIEF.md, stage 1, 2026-08-22 — her agreed grouping
   table, implemented exactly, in her order.)
   ------------------------------------------------------------
   The first eighteen cards were cut from the nine seeded eqn questions
   across seven skills. Nothing here writes maths: every part is carried
   over untouched from its source module (js/exam/eqn-*.js), which stays
   the content source of truth. The only hand-written text in this file
   is the `intro` on the two cards that genuinely need one — see each
   one's own note.

   BUILD DAY, 2026-08-23 (EXAM-BUILD-DAY.md). The chapter's tile map
   grew: SESSION C2 added the three NEW tiles quadratic-solving,
   surd-equations and simultaneous (six fresh cards each) and opened the
   chapter's `level-4` tile with six more, all at the foot of this file;
   SESSION C1 fills the seven original tiles to six cards each and moves
   the chapter's existing ★ parts onto the level-4 tile. Both sessions
   APPEND — nobody reorders anybody else's lines. Every question those
   sessions composed is card-sized already, so it goes through makeCard
   whole and keeps its own id.
   ============================================================ */
import { makeCard } from "./_cards.js";
import { eqnNatureOfRootsQuestions } from "./eqn-nature-of-roots.js";
import { eqnNatureOfRootsTopUpQuestions } from "./eqn-nature-of-roots-2.js";
import { eqnKMethodQuestions } from "./eqn-k-method.js";
import { eqnFractionsAndRestrictionsQuestions } from "./eqn-fractions-and-restrictions.js";
import { eqnInequalitiesQuestions } from "./eqn-inequalities.js";
import { eqnInequalitiesTopUpQuestions } from "./eqn-inequalities-2.js";
/* SESSION C2 (2026-08-23, the Exam Focus build day) — the three NEW
   Equations & Inequalities tiles from EXAM-BUILD-DAY.md's map, six
   fresh cards each, plus the chapter's new Level 4 ★ tile. Composed
   skill-first like the Functions siblings, so every question already
   carries its tile id as its `topic` and each is one whole card. */
import { eqnQuadraticSolvingSiblingQuestions } from "./eqn-siblings-quadratic-solving.js";
import { eqnSurdEquationsSiblingQuestions } from "./eqn-siblings-surd-equations.js";
import { eqnSimultaneousSiblingQuestions } from "./eqn-siblings-simultaneous.js";
import { eqnLevel4Questions } from "./eqn-level4.js";
/* SESSION C1 (2026-08-23, the Exam Focus build day) — the seven
   ORIGINAL Equations & Inequalities tiles, each filled to six cards.
   Composed skill-first, so every question already carries its tile id
   as its `topic` and each is one whole card. */
import { eqnNatureChainSiblingQuestions } from "./eqn-siblings-nature-chain.js";
import { eqnKEqualRootsSiblingQuestions } from "./eqn-siblings-k-equal-roots.js";
import { eqnKForNatureSiblingQuestions } from "./eqn-siblings-k-for-nature.js";
import { eqnDeltaInPSiblingQuestions } from "./eqn-siblings-delta-in-p.js";
import { eqnInequalitiesSiblingQuestions } from "./eqn-siblings-inequalities.js";
import { eqnFractionEquationsSiblingQuestions } from "./eqn-siblings-fraction-equations.js";
import { eqnRationalExponentsKSiblingQuestions } from "./eqn-siblings-rational-exponents-k.js";
/* SESSION H (2026-08-23, her afternoon extension to the build day) —
   ONE new tile, solution-count "Two, one or no solution?", six fresh
   cards, built alongside the new eq9 drill round that teaches it. */
import { eqnSolutionCountSiblingQuestions, eqnSolutionCountIntros } from "./eqn-siblings-solution-count.js";

const SOURCES = [
  ...eqnNatureOfRootsQuestions,
  ...eqnNatureOfRootsTopUpQuestions,
  ...eqnKMethodQuestions,
  ...eqnFractionsAndRestrictionsQuestions,
  ...eqnInequalitiesQuestions,
  ...eqnInequalitiesTopUpQuestions,
  /* SESSION C2's four modules (2026-08-23) — 24 more questions. */
  ...eqnQuadraticSolvingSiblingQuestions,
  ...eqnSurdEquationsSiblingQuestions,
  ...eqnSimultaneousSiblingQuestions,
  ...eqnLevel4Questions,
  /* SESSION C1's seven modules (2026-08-23) — 27 more questions. */
  ...eqnNatureChainSiblingQuestions,
  ...eqnKEqualRootsSiblingQuestions,
  ...eqnKForNatureSiblingQuestions,
  ...eqnDeltaInPSiblingQuestions,
  ...eqnInequalitiesSiblingQuestions,
  ...eqnFractionEquationsSiblingQuestions,
  ...eqnRationalExponentsKSiblingQuestions,
  /* SESSION H's one module (2026-08-23) — 6 more questions. */
  ...eqnSolutionCountSiblingQuestions,
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
  /* SESSION C1's four (2026-08-23): the Δ = 0 reading the tile never
     had, an equation that must be cleared of a FRACTION first, a
     disguised quadratic hiding inside two brackets, and SURD
     coefficients landing on Δ < 0. Each states its own equation in its
     first part, so none of them needs an intro. */
  makeCard({ skill: "nature-chain", from: src("eqn.sib.nc.q1"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "nature-chain", from: src("eqn.sib.nc.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "nature-chain", from: src("eqn.sib.nc.q3"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "nature-chain", from: src("eqn.sib.nc.q4"), parts: ["a", "b"] }),

  /* ---- 2. Find k for equal roots -------------------------------- */
  // nor.q2(d) restates its own equation ("x(x − 4) = k …") — no intro.
  makeCard({ skill: "k-equal-roots", from: src("eqn.nor.q2"), parts: ["d"] }),
  // nor.q3(a) likewise ("2x² − 4x + k = 0") — no intro.
  makeCard({ skill: "k-equal-roots", from: src("eqn.nor.q3"), parts: ["a"] }),
  /* eqn.fr.q1(d) used to be the third card here. It is level 4, so it
     now lives on the level-4 tile at the foot of this file, with the
     same intro it always carried (her ruling 5, SESSION C1). */
  /* SESSION C1's four (2026-08-23): the easy way in that ends on the
     equal ROOT, k in two coefficients at once (so Δ = 0 is a quadratic
     in k and there are two answers), the tangency question where the
     words "equal roots" never appear, and k inside b, where the answer
     carries a ±. */
  makeCard({ skill: "k-equal-roots", from: src("eqn.sib.ker.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "k-equal-roots", from: src("eqn.sib.ker.q2"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "k-equal-roots", from: src("eqn.sib.ker.q3"), parts: ["a", "b"] }),
  makeCard({ skill: "k-equal-roots", from: src("eqn.sib.ker.q4"), parts: ["a"] }),

  /* ---- 3. Values of k for a given nature ------------------------
     nor.q3 (b) and (c) both talk about "the equation" and both work
     from the Δ that part (a) — a k-equal-roots card now — produced. The
     intro hands both back, so the card reads as a complete question.
     Its (d) was level 4 and moved to the level-4 tile (SESSION C1). */
  makeCard({
    skill: "k-for-nature", from: src("eqn.nor.q3"), parts: ["b", "c"],
    intro: { en: "Given: &nbsp;2x² − 4x + k = 0, &nbsp;where k is a real number. Its discriminant is &nbsp;Δ = 16 − 8k." },
  }),
  /* SESSION C1's five (2026-08-23): "real" with one sign flip,
     "non-real" with a fraction boundary, then the two cards where Δ is
     QUADRATIC in k — one answering inside the bowl and one outside —
     and the natural-number listing. Each states its own equation. */
  makeCard({ skill: "k-for-nature", from: src("eqn.sib.kfn.q1"), parts: ["a"] }),
  makeCard({ skill: "k-for-nature", from: src("eqn.sib.kfn.q2"), parts: ["a"] }),
  makeCard({ skill: "k-for-nature", from: src("eqn.sib.kfn.q3"), parts: ["a", "b"] }),
  makeCard({ skill: "k-for-nature", from: src("eqn.sib.kfn.q4"), parts: ["a", "b"] }),
  makeCard({ skill: "k-for-nature", from: src("eqn.sib.kfn.q5"), parts: ["a", "b"] }),

  /* ---- 4. Δ in terms of p → prove real for all p ----------------
     nor.q4 keeps only (a), "write Δ in terms of p": its (b)(c)(d) chain
     ends in a ★ and moved WHOLE to the level-4 tile, because (b) and
     (c) are the parts (d) leans on. nor.q5 keeps (a)(b)(c) and loses
     its ★ (d); eqn.ineq.t1q3(b) was a one-part ★ card and moved too.
     Both remaining cards state their own equation in their first part,
     so neither needs an intro. */
  makeCard({ skill: "delta-in-p", from: src("eqn.nor.q4"), parts: ["a"] }),
  makeCard({ skill: "delta-in-p", from: src("eqn.nor.q5"), parts: ["a", "b", "c"] }),
  /* SESSION C1's four (2026-08-23): Δ in terms of p and nothing else,
     the one where every p CANCELS, the complete-the-square-on-Δ proof
     rebuilt at level 3 (the tile lost that method in the ★ move), and
     a perfect-square Δ that really does reach zero. */
  makeCard({ skill: "delta-in-p", from: src("eqn.sib.dip.q1"), parts: ["a"] }),
  makeCard({ skill: "delta-in-p", from: src("eqn.sib.dip.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "delta-in-p", from: src("eqn.sib.dip.q3"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "delta-in-p", from: src("eqn.sib.dip.q4"), parts: ["a", "b"] }),

  /* ---- 5. Inequalities -----------------------------------------
     Four one-part cards: every one of these is a self-contained "solve
     for x". Nothing depends on anything, so nothing is grouped and no
     intro is needed. eqn.ineq.q2(d) — "given the solution, find b and
     c" — is level 4 and moved to the level-4 tile (SESSION C1). */
  makeCard({ skill: "inequalities", from: src("eqn.ineq.t1q3"), parts: ["a"] }),
  makeCard({ skill: "inequalities", from: src("eqn.ineq.q2"), parts: ["a"] }),
  makeCard({ skill: "inequalities", from: src("eqn.ineq.q2"), parts: ["b"] }),
  makeCard({ skill: "inequalities", from: src("eqn.ineq.q2"), parts: ["c"] }),
  /* SESSION C1's two (2026-08-23): the plainest factorised inequality
     there is (the tile had no level-1 way in at all), and a RATIONAL
     inequality — her Test 6 Q1 shape — where the denominator can change
     sign and so may never be multiplied out. */
  makeCard({ skill: "inequalities", from: src("eqn.sib.ineq.q1"), parts: ["a"] }),
  makeCard({ skill: "inequalities", from: src("eqn.sib.ineq.q2"), parts: ["a", "b"] }),

  /* ---- 6. Fraction equations with restrictions ------------------
     fr.q1 (a)(b)(c) is a chain — the limits, the solve, then "hence"
     off the solve — so it stays whole. (a) states the equation. */
  makeCard({ skill: "fraction-equations", from: src("eqn.fr.q1"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "fraction-equations", from: src("eqn.km.t1q2"), parts: ["b"] }),
  /* SESSION C1's four (2026-08-23): a bare x under the line clearing to
     a linear equation, the NEGATIVE TWIN (2 − x vs x − 2), the one
     whose only root is a forbidden value (so there is NO solution), and
     one fraction each side where the x² terms cancel. */
  makeCard({ skill: "fraction-equations", from: src("eqn.sib.fe.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "fraction-equations", from: src("eqn.sib.fe.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "fraction-equations", from: src("eqn.sib.fe.q3"), parts: ["a", "b"] }),
  makeCard({ skill: "fraction-equations", from: src("eqn.sib.fe.q4"), parts: ["a", "b"] }),

  /* ---- 7. Rational exponents & k-method ------------------------- */
  makeCard({ skill: "rational-exponents-k", from: src("eqn.km.t1q2"), parts: ["a"] }),
  makeCard({ skill: "rational-exponents-k", from: src("eqn.km.t1q2"), parts: ["c"] }),
  /* SESSION C1's four (2026-08-23): her own contrast pair (an odd root
     may be negative, an even root may not), a negative rational
     exponent and the same move on a bracket, a repeated bracket with
     FOUR roots, and the k-method on an exponential. */
  makeCard({ skill: "rational-exponents-k", from: src("eqn.sib.rek.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "rational-exponents-k", from: src("eqn.sib.rek.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "rational-exponents-k", from: src("eqn.sib.rek.q3"), parts: ["a", "b"] }),
  makeCard({ skill: "rational-exponents-k", from: src("eqn.sib.rek.q4"), parts: ["a"] }),

  /* ---- 7b. Two, one or no solution? (NEW tile, SESSION H) --------
     Her own two handwritten pages on equations with rational exponents,
     the ones her Grade 11 learner kept confusing herself over: even
     numerator → ±, only odd numbers → a negative answer is fine, an even
     number anywhere with a negative → no solution. Six fresh cards, all
     composed card-sized, so each goes through makeCard whole and keeps
     its own id. q2 and q6 carry an `intro`, because their instruction
     (q2) and their given pair (q6) belong to every part on the card;
     the other four state their own equation in their only prompt. The
     drill round that reteaches them is eq9, built the same session. */
  makeCard({ skill: "solution-count", from: src("eqn.sib.sc.q1"), parts: ["a"] }),
  makeCard({ skill: "solution-count", from: src("eqn.sib.sc.q2"), parts: ["a", "b", "c"], intro: eqnSolutionCountIntros["eqn.sib.sc.q2"] }),
  makeCard({ skill: "solution-count", from: src("eqn.sib.sc.q3"), parts: ["a"] }),
  makeCard({ skill: "solution-count", from: src("eqn.sib.sc.q4"), parts: ["a"] }),
  makeCard({ skill: "solution-count", from: src("eqn.sib.sc.q5"), parts: ["a"] }),
  makeCard({ skill: "solution-count", from: src("eqn.sib.sc.q6"), parts: ["a", "b"], intro: eqnSolutionCountIntros["eqn.sib.sc.q6"] }),

  /* ================================================================
     SESSION C2 (2026-08-23, the Exam Focus build day). Three tiles
     that did not exist before — quadratic-solving, surd-equations and
     simultaneous — six fresh cards each, then the chapter's Level 4 ★
     tile. Each of the 24 source questions was composed CARD-SIZED, so
     every one goes through makeCard whole and keeps its own id; none
     of them needs an `intro`, because each one's first part states its
     own setup.
     ================================================================ */

  /* ---- 8. Solve quadratic equations (NEW tile) ------------------
     The routing table's x² row, drilled: common factor and trinomial,
     the bracket that is not equal to zero, the formula to 2 decimals
     (and the Δ < 0 words), completing the square with a = 1 and
     a ≠ 1, a zero product wearing an exponential disguise, and the
     number-system item. */
  makeCard({ skill: "quadratic-solving", from: src("eqn.sib.qs.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "quadratic-solving", from: src("eqn.sib.qs.q2"), parts: ["a"] }),
  makeCard({ skill: "quadratic-solving", from: src("eqn.sib.qs.q3"), parts: ["a", "b"] }),
  makeCard({ skill: "quadratic-solving", from: src("eqn.sib.qs.q4"), parts: ["a", "b"] }),
  makeCard({ skill: "quadratic-solving", from: src("eqn.sib.qs.q5"), parts: ["a"] }),
  makeCard({ skill: "quadratic-solving", from: src("eqn.sib.qs.q6"), parts: ["a", "b"] }),

  /* ---- 9. Surd equations (check the false root) (NEW tile) ------
     GR11-IEB-PAPER-BANK.md archetype 2 — in every surveyed paper,
     4–5 marks. One false root, then both roots surviving, then none,
     then the one that must be isolated first, then a quadratic in √x
     (her k-method leading, isolate-and-square under OR), then a
     restriction stated up front. */
  makeCard({ skill: "surd-equations", from: src("eqn.sib.se.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "surd-equations", from: src("eqn.sib.se.q2"), parts: ["a"] }),
  makeCard({ skill: "surd-equations", from: src("eqn.sib.se.q3"), parts: ["a"] }),
  makeCard({ skill: "surd-equations", from: src("eqn.sib.se.q4"), parts: ["a"] }),
  makeCard({ skill: "surd-equations", from: src("eqn.sib.se.q5"), parts: ["a"] }),
  makeCard({ skill: "surd-equations", from: src("eqn.sib.se.q6"), parts: ["a", "b"] }),

  /* ---- 10. Simultaneous equations (NEW tile) --------------------
     Her B6 substitution method only: from the linear equation every
     time. Line + parabola, the product form, a circle and a line, the
     same idea dressed as a functions sentence (the one card here with
     a sketch), a quadratic in two variables, and one with fractions. */
  makeCard({ skill: "simultaneous", from: src("eqn.sib.sim.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "simultaneous", from: src("eqn.sib.sim.q2"), parts: ["a"] }),
  makeCard({ skill: "simultaneous", from: src("eqn.sib.sim.q3"), parts: ["a"] }),
  makeCard({ skill: "simultaneous", from: src("eqn.sib.sim.q4"), parts: ["a"] }),
  makeCard({ skill: "simultaneous", from: src("eqn.sib.sim.q5"), parts: ["a"] }),
  makeCard({ skill: "simultaneous", from: src("eqn.sib.sim.q6"), parts: ["a"] }),

  /* ---- level-4 ---------------------------------------------------
     "Level 4 ★ — the brave round" (her ruling 5, EXAM-BUILD-DAY.md):
     levels 1–3 live on the normal tiles, and the chapter's ★ questions
     are gathered here so a learner drilling basics never meets one by
     accident.

     SESSION C2's six fresh cards come first. SESSION C1 APPENDS THE
     MOVED ★ PARTS BELOW THIS BLOCK — the level-4 parts that were
     written inside normal cards before this tile existed. Append only;
     do not reorder what is already here. (js/exam/index.js sorts a
     tile's cards easiest-first anyway, and every card on this tile is
     level 4, so file order is what the learner walks.) */
  makeCard({ skill: "level-4", from: src("eqn.l4.q1"), parts: ["a"] }),
  makeCard({ skill: "level-4", from: src("eqn.l4.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "level-4", from: src("eqn.l4.q3"), parts: ["a"] }),
  makeCard({ skill: "level-4", from: src("eqn.l4.q4"), parts: ["a", "b"] }),
  makeCard({ skill: "level-4", from: src("eqn.l4.q5"), parts: ["a", "b"] }),
  makeCard({ skill: "level-4", from: src("eqn.l4.q6"), parts: ["a", "b"] }),

  /* ---- THE MOVED ★ PARTS (SESSION C1, 2026-08-23) ---------------
     Six cards that were written before this tile existed, each one a
     level-4 part sitting inside a normal tile's card. Her ruling 5
     moves every one of them here. The SOURCE MODULES ARE UNTOUCHED —
     only the cut changed — so each card carries an `intro` wherever its
     parts used to lean on a part that is no longer beside them.

       eqn.nor.q3(d)   was on k-for-nature, inside eqn.nor.q3.bcd
       eqn.nor.q4(b–d) was on delta-in-p, inside eqn.nor.q4.abcd
                       — (b) and (c) come with it, because (c) opens
                         "Hence prove…" off (b) and (d) opens "Hence, or
                         otherwise…" off (c); all three are level 3 or 4
       eqn.nor.q5(d)   was on delta-in-p, inside eqn.nor.q5.abcd
       eqn.fr.q1(d)    was on k-equal-roots (kept its original intro)
       eqn.ineq.t1q3(b) was on delta-in-p, already a one-part card
       eqn.ineq.q2(d)  was on inequalities, already a one-part card  */

  /* nor.q3(d) states its own equation, but its memo starts "from (b),
     k must be an integer less than 2" — so the intro carries the Δ and
     the range (b) produced, and nothing else. */
  makeCard({
    skill: "level-4", from: src("eqn.nor.q3"), parts: ["d"],
    intro: { en: "Given: &nbsp;2x² − 4x + k = 0, &nbsp;where k is a real number. Its discriminant is &nbsp;Δ = 16 − 8k, &nbsp;and the roots are real and unequal when &nbsp;k &lt; 2." },
  }),
  /* nor.q4(b) opens "By completing the square on your answer to (a)…",
     and (a) is now a delta-in-p card. The intro hands that answer back. */
  makeCard({
    skill: "level-4", from: src("eqn.nor.q4"), parts: ["b", "c", "d"],
    intro: { en: "Given: &nbsp;x² + px + (p − 2) = 0, &nbsp;where p is a real number. Its discriminant is &nbsp;Δ = p² − 4p + 8." },
  }),
  /* nor.q5(d) names "the one value of m found in (b)", and (b) is now
     on a delta-in-p card. The intro carries the perfect-square Δ and
     that value. */
  makeCard({
    skill: "level-4", from: src("eqn.nor.q5"), parts: ["d"],
    intro: { en: "Given: &nbsp;x² + (2m − 1)x − (4m + 2) = 0, &nbsp;where m is a real number. Its discriminant simplifies to &nbsp;Δ = 4m² + 12m + 9 = (2m + 3)², &nbsp;and in (b) that gave equal roots at &nbsp;m = −3/2." },
  }),
  /* fr.q1(d) keeps the intro it carried on the k-equal-roots tile: its
     memo checks the equal root against the LIMITS, which were found in
     part (a) and are not on this card. */
  makeCard({
    skill: "level-4", from: src("eqn.fr.q1"), parts: ["d"],
    intro: { en: "In this equation &nbsp;x² − x − 2 = (x − 2)(x + 1), &nbsp;so the limits are &nbsp;x ≠ 2 &nbsp;and&nbsp; x ≠ −1." },
  }),
  /* Both of these already stated their own "Given:" line when they were
     one-part cards on their old tiles, so neither needs an intro. */
  makeCard({ skill: "level-4", from: src("eqn.ineq.t1q3"), parts: ["b"] }),
  makeCard({ skill: "level-4", from: src("eqn.ineq.q2"), parts: ["d"] }),
];
