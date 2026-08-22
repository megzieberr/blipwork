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
     All three are "slide a line across the graph" questions, so each
     one needs the graph it slides across. */
  makeCard({
    skill: "nature-of-roots", from: src("func.lp.q1"), parts: ["e"],
    intro: { en: PARABOLA },
  }),
  makeCard({
    skill: "nature-of-roots", from: src("func.hyp.t2q3"), parts: ["e"],
    intro: { en: HYP_T2 },
  }),
  makeCard({
    skill: "nature-of-roots", from: src("func.gt.t1q5"), parts: ["c"],
    // the maximum 16 and the y-intercept 7 are the two facts this part
    // has to FETCH (its own memo says so, and it is why the part is
    // starred) — so the intro stops at the equation.
    intro: { en: "f is the parabola &nbsp;f(x) = −x² + 6x + 7." },
  }),
  /* SIBLINGS (session 2b) — the three above are a happy parabola, a
     hyperbola and a "two positive roots" tail. These three add the
     SAD parabola read the other way round, the two-sided k answer
     built from a line that turns rather than slides, and the tangent
     case with Δ then read backwards into cuts / touches / misses. */
  makeCard({ skill: "nature-of-roots", from: src("func.sib.nor.q1"), parts: ["a", "b"] }),
  makeCard({ skill: "nature-of-roots", from: src("func.sib.nor.q2"), parts: ["a", "b"] }),
  makeCard({ skill: "nature-of-roots", from: src("func.sib.nor.q3"), parts: ["a", "b"] }),

  /* ---- 8. Distances --------------------------------------------
     (a) carries the whole stem — both graphs, A, C and the segment PQ —
     and (b) is about that same PQ, so they stay together and no intro
     is needed. */
  makeCard({ skill: "distances", from: src("func.gt.t1q5"), parts: ["a", "b"] }),
  /* SIBLINGS (session 2b) — this was the thinnest tile in the chapter,
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
];
