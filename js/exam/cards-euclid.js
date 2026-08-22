/* ============================================================
   EXAM FOCUS — SKILL CARDS · Euclidean Geometry
   (EXAM-SKILLS-BRIEF.md, stage 1, 2026-08-22.)
   ------------------------------------------------------------
   Her ruling, verbatim in the brief: "Euclidean stays ONE long
   continuous round (both questions whole, in order)." So this chapter
   gets ONE skill — circle-geometry — holding two cards, each of which
   is its whole source question with every part in its original order.
   Nothing is split, nothing is regrouped, and neither card needs an
   intro because each question's first part carries its own figure
   description.

   Both cards carry their diagrams straight through: every part of both
   questions is present, so js/exam/_cards.js's per-part narrowing keeps
   the whole diagram block intact (spec + all part entries), and
   verify-exam.html Part 11 and verify-exam-modules.mjs section 9 go on
   measuring exactly the same figures they always did.
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
  makeCard({ skill: "circle-geometry", from: src("euclid.circ.t2q4"), parts: ["a", "b1", "b2"] }),
  makeCard({ skill: "circle-geometry", from: src("euclid.tan.t2q5"), parts: ["a", "b", "c", "d"] }),
];
