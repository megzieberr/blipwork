/* ============================================================
   EXAM FOCUS — SKILL CARDS · Euclidean Geometry
   (EXAM-SKILLS-BRIEF.md, stage 1, 2026-08-22; RE-CUT 2026-08-23 for the
   Exam Focus build day — EXAM-BUILD-DAY.md.)
   ------------------------------------------------------------
   WHAT CHANGED ON 2026-08-23. Yesterday this chapter had ONE tile,
   `circle-geometry`, holding both seeded questions whole. That tile is
   gone: the chapter is being built out to all four bookwork proofs plus
   about ten riders, which is far too much for a single tile, so
   js/exam/skills.js now lists five —

     bookwork-proofs · chords-and-angles · cyclic-quads · tangents · level-4

   — and the two existing questions are re-cut onto them. THIS FILE IS A
   PLACEHOLDER. The Euclidean content sessions (wave 1 G1, wave 3 G2)
   rebuild this chapter around her ruling 4 (pen-and-paper, one sketch
   per card, 4–6 parts on THAT sketch, mixed value/reason asks, SAG short
   reasons verbatim). Everything here only has to stay VALID and keep the
   skill wall green until they land.

   THE CUT, and why each part went where:

     euclid.circ.t2q4 (a)     → bookwork-proofs
       The ∠-at-centre = 2 × ∠-at-circumference proof — one of her four
       bookwork proofs, and its own complete question. It is the source
       question's FIRST part, so its prompt still carries the whole stem
       and the card needs no intro.

     euclid.circ.t2q4 (b1,b2) → chords-and-angles
       A different figure entirely (specQ4b — chord PQ, OM ⊥ PQ, OM
       produced to T), so it was never really part of the same question.
       (b1) restates every given in its own prompt — "OM = 9 mm and
       PQ = 24 mm" and all — so this card ALSO needs no intro; adding one
       would print the same sentence twice on the same screen. (b2)'s
       "Hence" is safe: (b1) is on the card with it.

     euclid.tan.t2q5 (a,b,c)  → tangents
       Two tangents from one point, the cyclic quad they make, and the
       angle at the centre in terms of x — levels 1, 2 and 3. The source
       question's first part, so again no intro.

     euclid.tan.t2q5 (d)      → level-4
       The starred part, on its own, WITH an intro carrying the figure's
       setup plus (b)'s and (c)'s results, which its prompt leans on and
       no longer states. That is exactly what `intro` is for.

   Diagrams ride along untouched: js/exam/_cards.js's cutDiagram narrows
   each card's diagram block to the parts it actually holds, so every
   figure is still the same spec measured by the same engine.
   ============================================================ */
import { makeCard } from "./_cards.js";
import { euclidCircleTheoremsQuestions } from "./euclid-circle-theorems.js";
import { euclidTangentsAndCyclicQuadsQuestions } from "./euclid-tangents-and-cyclic-quads.js";

const SOURCES = [...euclidCircleTheoremsQuestions, ...euclidTangentsAndCyclicQuadsQuestions];
const src = id => {
  const q = SOURCES.find(qq => qq.id === id);
  if (!q) throw new Error(`cards-euclid.js: no seeded question "${id}"`);
  return q;
};

export const euclidCards = [
  makeCard({ skill: "bookwork-proofs",   from: src("euclid.circ.t2q4"), parts: ["a"] }),
  makeCard({ skill: "chords-and-angles", from: src("euclid.circ.t2q4"), parts: ["b1", "b2"] }),
  makeCard({ skill: "tangents",          from: src("euclid.tan.t2q5"),  parts: ["a", "b", "c"] }),
  makeCard({
    skill: "level-4", from: src("euclid.tan.t2q5"), parts: ["d"],
    /* Everything (d) leans on and no longer says for itself: the figure's
       setup, then the two results (b) and (c) handed it. Written out
       rather than referenced, so the card reads complete on its own. */
    intro: {
      en: "O is the centre of the circle. TA and TB are tangents to the circle at A and B. C is a point on the major arc AB, and CA and CB are chords. &nbsp;∠ATB = x.<br><br>Earlier parts of this question established that <b>OATB is a cyclic quadrilateral</b> (both tangents meet their radii at 90°), and that <b>∠AOB = 180° − x</b>.",
    },
  }),
];
