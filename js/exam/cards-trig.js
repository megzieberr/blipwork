/* ============================================================
   EXAM FOCUS — SKILL CARDS · 2D Trig  (PAUSED)
   (EXAM-SKILLS-BRIEF.md, stage 1, 2026-08-22.)
   ------------------------------------------------------------
   Her ruling: 2D Trig is PAUSED — it keeps its one card and NOTHING
   new gets built for it. So this file has exactly one entry, and one
   skill, and should stay that way until she says otherwise.

   The cosine rule and the area rule travel together here because they
   have to: (b) works out the area of △ABC using the AB that (a) found.
   (a) carries the whole figure in words, so no intro.
   ============================================================ */
import { makeCard } from "./_cards.js";
import { trigMixedProblemsQuestions } from "./trig-mixed-problems.js";

const SOURCES = [...trigMixedProblemsQuestions];
const src = id => {
  const q = SOURCES.find(qq => qq.id === id);
  if (!q) throw new Error(`cards-trig.js: no seeded question "${id}"`);
  return q;
};

export const trigCards = [
  makeCard({ skill: "cosine-rule-area", from: src("trig.mix.t2q6"), parts: ["a", "b"] }),
];
