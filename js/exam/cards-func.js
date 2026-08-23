/* ============================================================
   EXAM FOCUS — SKILL CARDS · Functions
   (EXAM-SKILLS-BRIEF.md, stage 1, 2026-08-22 — her agreed grouping
   table, implemented exactly, in her order.)
   ------------------------------------------------------------
   Eight skills, forty-eight cards — seventeen cut from the four seeded
   func questions, thirty-one composed as siblings (see below).
   This is the chapter the whole skill-cards idea came from:
   one hyperbola carrying five unrelated read-offs is exactly the "too
   sudden" question she played, and split by skill those five read-offs
   become five short rounds.

   IT IS ALSO THE CHAPTER THAT NEEDS INTROS. A parabola question's part
   (c) says "Write down the range of f" and nothing else — away from its
   stem that is not a question at all. So every card here whose first
   part no longer carries its own setup gets a hand-written `intro`,
   built from the source stem plus whatever earlier part the memo
   actually leans on (the turning point, the asymptotes, the
   x-intercept). Cards whose first part DOES state the setup get none —
   nothing is said twice.

   ONE PART APPEARS TWICE ON PURPOSE: func.hyp.t2q3 part (c) is both the
   shift card on its own AND the first half of the inequalities card,
   where (d) cannot be asked without h. The two cards have different
   ids, so the server records progress against them separately — her
   deliberate call, recorded in the brief.

   SIBLING CARDS (SESSIONS 2a AND 2b, 2026-08-22). Every one of the
   eight tiles here had only one, two or three cards, because a tile
   only ever got whatever happened to fall out of the four seeded
   practice-paper questions — so "Another one!" ran dry after a tap or
   two. Thirty-one fresh questions, composed from her own Gr11 Functions
   notes (graph-quest\reference\GR11-FUNCTIONS-NOTES-DIGEST.md), bring
   ALL EIGHT tiles to SIX cards each: session 2a did find-equation ·
   asymptotes-domain-range · intercepts-turning-point · axis-of-symmetry,
   session 2b did shift · inequalities · nature-of-roots · distances.
   They live in js/exam/func-siblings-<skill>.js, one file per skill.

   Each sibling question is a WHOLE card on its own (its first part
   carries its own stem, so none of them needs an `intro`), and each is
   appended AFTER the existing cards of its skill, easy → hard — her
   order: what she already had first, then the new ones building up.
   `examQuestionsForTopic` filters this array by topic and keeps its
   order, so position within a skill's block is what decides the run.

   THE BUILD DAY (2026-08-23, EXAM-BUILD-DAY.md) took the chapter from
   eight tiles to thirteen. Session D1 added sketch · intersection ·
   average-gradient; session D2 added reflections and the chapter's
   Level 4 ★ tile, and carried out HER ★ MOVE — every level-4 part that
   used to sit inside a normal card is now cut onto the Level 4 tile
   instead, with the tiles that lost a card topped up back to six. The
   two sections at the foot of this file carry the notes.
   ============================================================ */
import { makeCard } from "./_cards.js";
import { funcHyperbolaAndExponentialQuestions } from "./func-hyperbola-and-exponential.js";
import { funcHyperbolaAndExponentialT2Questions } from "./func-hyperbola-and-exponential-2.js";
import { funcGraphsTogetherQuestions } from "./func-graphs-together.js";
import { funcLineAndParabolaQuestions } from "./func-line-and-parabola.js";
import { funcFindEquationSiblingQuestions } from "./func-siblings-find-equation.js";
import { funcAsymptotesDomainRangeSiblingQuestions } from "./func-siblings-asymptotes-domain-range.js";
import { funcInterceptsTurningPointSiblingQuestions } from "./func-siblings-intercepts-turning-point.js";
import { funcAxisOfSymmetrySiblingQuestions } from "./func-siblings-axis-of-symmetry.js";
import { funcShiftSiblingQuestions } from "./func-siblings-shift.js";
import { funcInequalitiesSiblingQuestions } from "./func-siblings-inequalities.js";
import { funcNatureOfRootsSiblingQuestions } from "./func-siblings-nature-of-roots.js";
import { funcDistancesSiblingQuestions } from "./func-siblings-distances.js";
/* SESSION D1 (2026-08-23, the Exam Focus build day) — three of the four
   NEW Functions tiles from EXAM-BUILD-DAY.md's map, six fresh cards
   each: sketch · intersection · average-gradient. */
import { funcSketchSiblingQuestions } from "./func-siblings-sketch.js";
import { funcIntersectionSiblingQuestions } from "./func-siblings-intersection.js";
import { funcAverageGradientSiblingQuestions } from "./func-siblings-average-gradient.js";
/* SESSION D2 (2026-08-23, the same build day) — the FOURTH new tile
   (reflections), the chapter's Level 4 ★ tile, and the four top-up
   cards the ★ move made necessary. See the "★ MOVE" note further
   down, at the level-4 section itself. */
import { funcReflectionsSiblingQuestions } from "./func-siblings-reflections.js";
import { funcLevel4Questions } from "./func-level4.js";
import { funcTopUpSiblingQuestions } from "./func-siblings-topup.js";

const SOURCES = [
  ...funcHyperbolaAndExponentialQuestions,
  ...funcHyperbolaAndExponentialT2Questions,
  ...funcGraphsTogetherQuestions,
  ...funcLineAndParabolaQuestions,
  ...funcFindEquationSiblingQuestions,
  ...funcAsymptotesDomainRangeSiblingQuestions,
  ...funcInterceptsTurningPointSiblingQuestions,
  ...funcAxisOfSymmetrySiblingQuestions,
  ...funcShiftSiblingQuestions,
  ...funcInequalitiesSiblingQuestions,
  ...funcNatureOfRootsSiblingQuestions,
  ...funcDistancesSiblingQuestions,
  ...funcSketchSiblingQuestions,
  ...funcIntersectionSiblingQuestions,
  ...funcAverageGradientSiblingQuestions,
  ...funcReflectionsSiblingQuestions,
  ...funcLevel4Questions,
  ...funcTopUpSiblingQuestions,
];
const src = id => {
  const q = SOURCES.find(qq => qq.id === id);
  if (!q) throw new Error(`cards-func.js: no seeded question "${id}"`);
  return q;
};

/* The three graphs the split parts keep referring back to, written out
   once each so the intros below cannot drift apart from one another.
   Every number here is read straight off the source question's own
   memo — the parabola's equation and turning point from func.lp.q1
   (a) and (b), the hyperbola's equation from func.hyp.t1q4(a) and its
   x-intercept from (c), and the T2 hyperbola from its own stem. */
const PARABOLA = "f is the parabola &nbsp;f(x) = 2x² − 6x − 8, &nbsp;with turning point TP(1,5 ; −12,5).";
const HYP_T1 = "h is the hyperbola &nbsp;h(x) = 6/(x + 2) + 1. &nbsp;Its asymptotes are x = −2 and y = 1.";
const HYP_T2 = "f is the hyperbola &nbsp;f(x) = 4/(x + 1) + 2.";

export const funcCards = [
  /* ---- 1. Find the equation ------------------------------------
     Both of these ARE the stem-carrying part, so both read complete on
     their own and neither gets an intro. */
  makeCard({ skill: "find-equation", from: src("func.lp.q1"), parts: ["a"] }),
  makeCard({ skill: "find-equation", from: src("func.hyp.t1q4"), parts: ["a"] }),
  /* SIBLINGS (session 2a) — the routes the two above do not cover:
     parabola from its TURNING POINT, hyperbola from its two SYMMETRY
     LINES, the exponential (both halves), and last the three-point
     simultaneous-equations parabola, the only level 3 on this tile.
     Each carries its own stem, so none takes an intro. */
  makeCard({ skill: "find-equation", from: src("func.sib.fe.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "find-equation", from: src("func.sib.fe.q2"), parts: ["a"] }),
  makeCard({ skill: "find-equation", from: src("func.sib.fe.q3"), parts: ["a", "b"] }),
  makeCard({ skill: "find-equation", from: src("func.sib.fe.q4"), parts: ["a"] }),

  /* ---- 2. Asymptotes, domain & range --------------------------- */
  // t2q3(a) states its own equation in the prompt — no intro.
  makeCard({ skill: "asymptotes-domain-range", from: src("func.hyp.t2q3"), parts: ["a"] }),
  makeCard({
    skill: "asymptotes-domain-range", from: src("func.hyp.t1q4"), parts: ["b"],
    intro: { en: HYP_T1 },
  }),
  /* "Write down the range of f" leans on BOTH the sign of a and the
     turning y-value, and the turning point was (b)'s job — a different
     card now. Both go in the intro. */
  makeCard({
    skill: "asymptotes-domain-range", from: src("func.lp.q1"), parts: ["c"],
    intro: { en: PARABOLA },
  }),
  /* SIBLINGS (session 2a) — a NEGATIVE-a hyperbola (plus what a shift
     does to its asymptotes), then the exponentials: all four
     sign/base combos across the two cards, with the restricted-domain
     range in the middle of the first one. */
  makeCard({ skill: "asymptotes-domain-range", from: src("func.sib.adr.q1"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "asymptotes-domain-range", from: src("func.sib.adr.q2"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "asymptotes-domain-range", from: src("func.sib.adr.q3"), parts: ["a", "b"] }),
  /* RE-HOMED BY THE ★ MOVE (session D2, 2026-08-23). func.gt.t1q5 used
     to sit on Distances as an (a)+(b) pair: (a) "determine the range of
     f", which carries the whole stem, and (b) the starred maximum
     length of PQ. (b) has gone to the Level 4 tile, and (a) on its own
     is a RANGE question, not a distance one — so it belongs here rather
     than left alone on a tile it does not match. It carries its own
     stem, so it takes no intro. */
  makeCard({ skill: "asymptotes-domain-range", from: src("func.gt.t1q5"), parts: ["a"] }),

  /* ---- 3. Intercepts & turning point --------------------------- */
  makeCard({
    skill: "intercepts-turning-point", from: src("func.lp.q1"), parts: ["b"],
    // the turning point is what this card ASKS for, so the intro stops
    // at the equation — it must not hand the answer over.
    intro: { en: "f is the parabola &nbsp;f(x) = 2x² − 6x − 8." },
  }),
  makeCard({
    skill: "intercepts-turning-point", from: src("func.hyp.t1q4"), parts: ["c"],
    // B is the answer here, so the intro says only where B lives.
    intro: { en: "h is the hyperbola &nbsp;h(x) = 6/(x + 2) + 1. &nbsp;B is the point where h cuts the x-axis." },
  }),
  /* SIBLINGS (session 2a) — the standard-form route first, then the
     parabola that has NO x-intercepts (the √ of a negative worked out
     on the page), then completing the square with a ≠ 1, and last the
     exponential pair where one graph crosses and one cannot. */
  makeCard({ skill: "intercepts-turning-point", from: src("func.sib.itp.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "intercepts-turning-point", from: src("func.sib.itp.q2"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "intercepts-turning-point", from: src("func.sib.itp.q3"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "intercepts-turning-point", from: src("func.sib.itp.q4"), parts: ["a", "b"] }),

  /* ---- 4. Axis of symmetry -------------------------------------
     Both axes pass through the point where the asymptotes cross, so
     both intros must carry the asymptotes. */
  makeCard({
    skill: "axis-of-symmetry", from: src("func.hyp.t2q3"), parts: ["b"],
    intro: { en: "f is the hyperbola &nbsp;f(x) = 4/(x + 1) + 2. &nbsp;Its asymptotes are x = −1 and y = 2." },
  }),
  makeCard({
    skill: "axis-of-symmetry", from: src("func.hyp.t1q4"), parts: ["d"],
    intro: { en: HYP_T1 },
  }),
  /* SIBLINGS (session 2a) — the parabola side first (turning-point
     form, then standard form with the vertical-shift-changes-nothing
     trap), then back to the hyperbola for BOTH symmetry lines, and
     last what a shift does to both of them at once. */
  makeCard({ skill: "axis-of-symmetry", from: src("func.sib.aos.q1"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "axis-of-symmetry", from: src("func.sib.aos.q2"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "axis-of-symmetry", from: src("func.sib.aos.q3"), parts: ["a", "b"] }),
  makeCard({ skill: "axis-of-symmetry", from: src("func.sib.aos.q4"), parts: ["a", "b"] }),

  /* ---- 5. Shift the graph --------------------------------------
     A shift is written off the turning-point form, so the parabola card
     needs its turning point; the hyperbola card needs only f itself. */
  makeCard({
    skill: "shift", from: src("func.lp.q1"), parts: ["d"],
    intro: { en: PARABOLA },
  }),
  makeCard({
    skill: "shift", from: src("func.hyp.t2q3"), parts: ["c"],
    intro: { en: HYP_T2 },
  }),
  /* SIBLINGS (session 2b) — the two cards above both hand the shift
     over in WORDS. These four give it in FUNCTION NOTATION, which is
     how her pp19–24 teach it: the parabola first, then the hyperbola
     read through its asymptotes, then the exponential, and last the
     question backwards — two graphs given, describe the move. Each
     carries its own stem, so none takes an intro. */
  makeCard({ skill: "shift", from: src("func.sib.sh.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "shift", from: src("func.sib.sh.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "shift", from: src("func.sib.sh.q3"), parts: ["a", "b"] }),
  makeCard({ skill: "shift", from: src("func.sib.sh.q4"), parts: ["a", "b"] }),

  /* ---- 6. Inequalities ----------------------------------------- */
  makeCard({
    skill: "inequalities", from: src("func.hyp.t1q4"), parts: ["e"],
    // the paint method cuts the line at the asymptote AND the
    // x-intercept, so this one intro carries B as well.
    intro: { en: "h is the hyperbola &nbsp;h(x) = 6/(x + 2) + 1. &nbsp;Its asymptotes are x = −2 and y = 1, and h cuts the x-axis at B(−8 ; 0)." },
  }),
  makeCard({
    // (d) asks about h, and h only exists once (c) has built it — so
    // the two travel together, exactly as she ruled.
    skill: "inequalities", from: src("func.hyp.t2q3"), parts: ["c", "d"],
    intro: { en: HYP_T2 },
  }),
  /* SIBLINGS (session 2b) — both cards above are one hyperbola against
     a number. These four widen the tile to the rest of her pp46–51
     meaning table: the plain pair off a parabola, then the product and
     the quotient on one picture, then a hyperbola with the ≥ at an
     asymptote followed by her x·f(x) quadrant-sign variant, and last f
     against g with a cut line through every intersection. Her PAINT
     method throughout — never a sign table. */
  makeCard({ skill: "inequalities", from: src("func.sib.ineq.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "inequalities", from: src("func.sib.ineq.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "inequalities", from: src("func.sib.ineq.q3"), parts: ["a", "b"] }),
  makeCard({ skill: "inequalities", from: src("func.sib.ineq.q4"), parts: ["a", "b"] }),

  /* ---- 7. Nature of roots --------------------------------------
     THE ★ MOVE EMPTIED THE TOP OF THIS TILE (session D2, 2026-08-23,
     her ruling 5). The three cards that used to open it — func.lp.q1(e),
     func.hyp.t2q3(e) and func.gt.t1q5(c) — were each made ENTIRELY of a
     level-4 part, so all three moved wholesale to the Level 4 ★ tile at
     the foot of this file, intros and all. That left three cards here,
     so session D2 composed three fresh level-≤3 ones
     (js/exam/func-siblings-topup.js) to take the tile back to six.

     SIBLINGS (session 2b) — the SAD parabola read the other way round,
     the two-sided k answer built from a line that turns rather than
     slides, and the tangent case with Δ then read backwards into
     cuts / touches / misses. */
  makeCard({ skill: "nature-of-roots", from: src("func.sib.nor.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "nature-of-roots", from: src("func.sib.nor.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "nature-of-roots", from: src("func.sib.nor.q3"), parts: ["a", "b"] }),
  /* TOP-UPS (session D2) — the most basic version of the skill, which
     the tile never had (read the nature straight off a sketch, then the
     one k that gives equal roots); a horizontal line against an
     EXPONENTIAL, which never turns, so the count is one-or-none rather
     than two-or-none; and the version where the GRAPH slides instead of
     the line, with the sign flip that catches everyone. */
  makeCard({ skill: "nature-of-roots", from: src("func.sib.nor.q4"), parts: ["a", "b"] }),
  makeCard({ skill: "nature-of-roots", from: src("func.sib.nor.q5"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "nature-of-roots", from: src("func.sib.nor.q6"), parts: ["a", "b"] }),

  /* ---- 8. Distances --------------------------------------------
     THE ★ MOVE SPLIT THIS TILE'S FIRST CARD (session D2, 2026-08-23).
     func.gt.t1q5 used to sit here as an (a)+(b) pair; (b), the starred
     maximum length of PQ, is now on the Level 4 tile, and (a) — a RANGE
     question — moved up to Asymptotes, domain & range where it belongs.
     func.sib.dist.q6 below is the fresh level-≤3 card that takes this
     tile back to six.

     SIBLINGS (session 2b) — this was the thinnest tile in the chapter,
     with that single card on it. Five more take it to six, walking her
     pp40–45 in order: the three distances between two points, the
     vertical segment at a given x, the MAXIMUM length via the
     difference parabola, the MINIMUM length between two graphs that
     never meet, and last her p10 hyperbola "TP" points and the gap
     between the branches. No derivatives anywhere. */
  makeCard({ skill: "distances", from: src("func.sib.dist.q1"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "distances", from: src("func.sib.dist.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "distances", from: src("func.sib.dist.q3"), parts: ["a", "b"] }),
  makeCard({ skill: "distances", from: src("func.sib.dist.q4"), parts: ["a", "b"] }),
  makeCard({ skill: "distances", from: src("func.sib.dist.q5"), parts: ["a", "b"] }),
  /* TOP-UP (session D2) — the HORIZONTAL chord: the gap between the two
     x-intercepts, then the gap between the two points at a given
     height. The one distance shape the five cards above never ask for. */
  makeCard({ skill: "distances", from: src("func.sib.dist.q6"), parts: ["a", "b"] }),

  /* ---- 9. Sketch the graph (NEW TILE, session D1, 2026-08-23) ----
     Six cards, all fresh: the question side is a blank set of axes with
     a light grid — the exam's own answer grid — because here the SKETCH
     is the answer. Easiest first, which is also her teaching order:
     turning-point form (read it off), then standard form (work for it),
     then the exponential, then the hyperbola, then two graphs on one
     page, and last the bank's rough sketch from sign conditions with no
     numbers at all. Each carries its own stem, so none takes an intro. */
  makeCard({ skill: "sketch", from: src("func.sib.sk.q1"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "sketch", from: src("func.sib.sk.q2"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "sketch", from: src("func.sib.sk.q3"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "sketch", from: src("func.sib.sk.q4"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "sketch", from: src("func.sib.sk.q5"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "sketch", from: src("func.sib.sk.q6"), parts: ["a", "b"] }),

  /* ---- 10. Intersections (NEW TILE, session D1, 2026-08-23) ------
     Her original tile drawing had "[Intersection]" on it and it was
     never built. Six cards: a line cutting a parabola ("show that",
     then "hence"), a parabola and an exponential sharing an x-intercept
     with one constant missing, a horizontal line y = k, reading the
     crossings off a grid and then proving them, a line cutting a
     HYPERBOLA, and last the "hence, or otherwise, solve f(x) > g(x)"
     follow-on that runs her cut-line-and-paint method off the
     intersections it has just found. */
  makeCard({ skill: "intersection", from: src("func.sib.int.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "intersection", from: src("func.sib.int.q2"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "intersection", from: src("func.sib.int.q3"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "intersection", from: src("func.sib.int.q4"), parts: ["a", "b"] }),
  makeCard({ skill: "intersection", from: src("func.sib.int.q5"), parts: ["a", "b"] }),
  makeCard({ skill: "intersection", from: src("func.sib.int.q6"), parts: ["a", "b"] }),

  /* ---- 11. Average gradient (NEW TILE, session D1, 2026-08-23) ---
     Her p59, and a SAG Term 2 item that had nothing in the app to drill
     it. Six cards walking outwards from the plain parabola: the
     hyperbola where the answer is negative, the y-intercept-to-turning-
     point pair that has to be found first, an exponential measured over
     two different stretches (what "taking off" means in numbers), the
     algebraic x = 1 to x = 1 + h version, and last the question
     backwards — the gradient is given, find the far point. No
     derivatives anywhere. */
  makeCard({ skill: "average-gradient", from: src("func.sib.ag.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "average-gradient", from: src("func.sib.ag.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "average-gradient", from: src("func.sib.ag.q3"), parts: ["a", "b"] }),
  makeCard({ skill: "average-gradient", from: src("func.sib.ag.q4"), parts: ["a", "b"] }),
  makeCard({ skill: "average-gradient", from: src("func.sib.ag.q5"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "average-gradient", from: src("func.sib.ag.q6"), parts: ["a", "b"] }),

  /* ---- 12. Reflections (NEW TILE, session D2, 2026-08-23) --------
     The fourth of EXAM-BUILD-DAY.md's new Functions tiles, and the one
     the bank asks for by name ("reflect-about-own-asymptote
     transformations"). Six fresh cards, easiest first, which here also
     runs family by family: the parabola in each axis, then the
     exponential in the y-axis, then the hyperbola about its OWN
     horizontal asymptote, then the exponential in the x-axis with the
     range work and the double reflection, and last the question
     backwards — two graphs given, describe the move. Each carries its
     own stem, so none takes an intro. */
  makeCard({ skill: "reflections", from: src("func.sib.ref.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "reflections", from: src("func.sib.ref.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "reflections", from: src("func.sib.ref.q3"), parts: ["a", "b"] }),
  makeCard({ skill: "reflections", from: src("func.sib.ref.q4"), parts: ["a", "b"] }),
  makeCard({ skill: "reflections", from: src("func.sib.ref.q5"), parts: ["a", "b", "c"] }),
  makeCard({ skill: "reflections", from: src("func.sib.ref.q6"), parts: ["a", "b"] }),

  /* ---- 13. Level 4 ★ — the brave round (session D2, 2026-08-23) ---
     Her ruling 5 (EXAM-BUILD-DAY.md): "Levels 1–3 on the normal tiles;
     every chapter gets a last tile Level 4 ★ holding mixed Level-4
     questions for that chapter. The low achievers must never meet a ★
     while drilling basics."

     THE ★ MOVE. Four cards below are NOT new: they are the four level-4
     parts that used to sit inside normal Functions cards, cut onto this
     tile instead. Their SOURCE modules are untouched — only the tile
     they are cut onto changed, and (for the one that lost its
     stem-carrying partner) the `intro` they carry:

       func.lp.q1(e)     was nature-of-roots  · same intro, PARABOLA
       func.gt.t1q5(c)   was nature-of-roots  · same intro
       func.hyp.t2q3(e)  was nature-of-roots  · same intro, HYP_T2
       func.gt.t1q5(b)   was distances, paired with (a) · NEW intro,
                         because (a) carried the stem and (a) is now a
                         card of its own on Asymptotes, domain & range

     The other six are fresh (js/exam/func-level4.js). Every card here
     is a level-4 card, so the level sort inside the tile leaves this
     order alone: it ramps from the two shortest sliding-line questions
     up to the two-graph fetches. */
  makeCard({
    skill: "level-4", from: src("func.lp.q1"), parts: ["e"],
    intro: { en: PARABOLA },
  }),
  makeCard({
    skill: "level-4", from: src("func.gt.t1q5"), parts: ["c"],
    // the maximum 16 and the y-intercept 7 are the two facts this part
    // has to FETCH (its own memo says so, and it is why the part is
    // starred) — so the intro stops at the equation.
    intro: { en: "f is the parabola &nbsp;f(x) = −x² + 6x + 7." },
  }),
  makeCard({ skill: "level-4", from: src("func.l4.q3"), parts: ["a", "b"] }),
  makeCard({
    // (b) used to travel with (a), which carried the whole stem. On its
    // own it needs all of it: both equations, A, C, and what PQ is.
    skill: "level-4", from: src("func.gt.t1q5"), parts: ["b"],
    intro: { en: "f is the parabola &nbsp;f(x) = −x² + 6x + 7&nbsp; and g is the line &nbsp;g(x) = 2x + 2. &nbsp;The two graphs cut each other at A(−1 ; 0) and at C, and A is also the x-intercept of both graphs. PQ is a line segment drawn parallel to the y-axis, with P on f and Q on g, and with PQ lying between A and C." },
  }),
  makeCard({ skill: "level-4", from: src("func.l4.q2"), parts: ["a"] }),
  makeCard({ skill: "level-4", from: src("func.l4.q1"), parts: ["a", "b"] }),
  makeCard({
    skill: "level-4", from: src("func.hyp.t2q3"), parts: ["e"],
    intro: { en: HYP_T2 },
  }),
  makeCard({ skill: "level-4", from: src("func.l4.q4"), parts: ["a", "b"] }),
  makeCard({ skill: "level-4", from: src("func.l4.q5"), parts: ["a"] }),
  makeCard({ skill: "level-4", from: src("func.l4.q6"), parts: ["a", "b"] }),
];
