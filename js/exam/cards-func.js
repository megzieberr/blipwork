/* ============================================================
   EXAM FOCUS — SKILL CARDS · Functions
   (EXAM-SKILLS-BRIEF.md, stage 1, 2026-08-22 — her agreed grouping
   table, implemented exactly, in her order.)
   ------------------------------------------------------------
   Eight skills, seventeen cards, cut from the four seeded func
   questions. This is the chapter the whole skill-cards idea came from:
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
   ============================================================ */
import { makeCard } from "./_cards.js";
import { funcHyperbolaAndExponentialQuestions } from "./func-hyperbola-and-exponential.js";
import { funcHyperbolaAndExponentialT2Questions } from "./func-hyperbola-and-exponential-2.js";
import { funcGraphsTogetherQuestions } from "./func-graphs-together.js";
import { funcLineAndParabolaQuestions } from "./func-line-and-parabola.js";

const SOURCES = [
  ...funcHyperbolaAndExponentialQuestions,
  ...funcHyperbolaAndExponentialT2Questions,
  ...funcGraphsTogetherQuestions,
  ...funcLineAndParabolaQuestions,
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

  /* ---- 8. Distances --------------------------------------------
     (a) carries the whole stem — both graphs, A, C and the segment PQ —
     and (b) is about that same PQ, so they stay together and no intro
     is needed. */
  makeCard({ skill: "distances", from: src("func.gt.t1q5"), parts: ["a", "b"] }),
];
