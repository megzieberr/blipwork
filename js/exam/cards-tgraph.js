/* ============================================================
   EXAM FOCUS — SKILL CARDS · Trig Graphs (tgraph)
   (EXAM-BUILD-DAY.md, 2026-08-23 — Trig Graphs joins Exam Focus.
   Session 0 created this file empty and registered it; SESSION E
   fills it.)
   ------------------------------------------------------------
   THIRTY-SIX CARDS, six on each of the chapter's six tiles:

     period-amplitude-range      her ruling 8 — equations only, no
                                 sketch on the question side; three
                                 equations per card
     read-parameters             a sketch is given, a / b / p / q come
                                 back out of it
     sketch                      blank degree axes on the question
                                 side, the finished graph on the reveal
     intersections-inequalities  two curves, the other crossing, the
                                 inequalities, the product of signs
     shift-reflect               a move described in words, or read
                                 backwards off two graphs
     level-4                     the brave round (every card carries a
                                 ★ part; nothing below level 3)

   HOW THE CUT WORKS HERE. tgraph has no practice-paper questions
   behind it — unlike euclid/eqn/exp/func, nothing was composed as a
   long paper question first. Every question in the six modules below
   was written CARD-SIZED from the start, one card per question, so
   each `makeCard` line simply takes all of that question's parts and
   keeps its own id. (Session 0's header for this file guessed the
   cards would be plain objects with no `source`; they go through
   makeCard instead, because verify-exam.html Part 12 requires every
   registered card to carry a source it can check back against, and
   this way the coverage check counts these 36 like every other card.)

   lostQuest points at the real Blipwork round that teaches each skill
   (js/config.js CHAPTERS → tgraph → tg1…tg7), so "I'm lost" reteaches
   rather than hints — tg3 for period/amplitude/range, tg6 for reading
   parameters off a graph, tg2/tg4/tg5 for sketching and transforming,
   tg7 for two graphs together.

   Every entry is validated at import by js/exam/index.js, so a broken
   card fails loudly the moment it is registered.
   ============================================================ */
import { makeCard } from "./_cards.js";
import { tgraphPeriodAmplitudeRangeQuestions } from "./tgraph-siblings-period-amplitude-range.js";
import { tgraphReadParametersQuestions } from "./tgraph-siblings-read-parameters.js";
import { tgraphSketchQuestions } from "./tgraph-siblings-sketch.js";
import { tgraphIntersectionsInequalitiesQuestions } from "./tgraph-siblings-intersections-inequalities.js";
import { tgraphShiftReflectQuestions } from "./tgraph-siblings-shift-reflect.js";
import { tgraphLevel4Questions } from "./tgraph-level4.js";

const SOURCES = [
  ...tgraphPeriodAmplitudeRangeQuestions,
  ...tgraphReadParametersQuestions,
  ...tgraphSketchQuestions,
  ...tgraphIntersectionsInequalitiesQuestions,
  ...tgraphShiftReflectQuestions,
  ...tgraphLevel4Questions,
];
const src = id => {
  const q = SOURCES.find(qq => qq.id === id);
  if (!q) throw new Error(`cards-tgraph.js: no seeded question "${id}"`);
  return q;
};

/* One card per question: every part, in order, and the question's own
   id kept rather than makeCard's default "<id>.<partids>" suffix — the
   id scheme EXAM-BUILD-DAY.md fixed for this chapter is
   tgraph.sib.<abbr>.qN and tgraph.l4.qN.

   NO `intro` anywhere in this chapter, and that is deliberate: because
   each question was composed card-sized, its GIVEN information lives in
   part (a)'s own prompt, exactly as the Functions sibling cards do
   (js/exam/func-siblings-shift.js). An intro on top of that would say
   the same thing twice — which is what verify-exam.html Part 12's
   "no card repeats a stem its own first part already states" check
   exists to catch. */
const whole = (skill, id) => {
  const from = src(id);
  return makeCard({ id, skill, from, parts: from.parts.map(p => p.id) });
};

export const tgraphCards = [
  /* ---- 1. Period, amplitude & range (equations only) ------------
     Her ruling 8. Three fresh equations per card; the tangent parts
     are worth 2 (period and range) and say why there is no amplitude. */
  whole("period-amplitude-range", "tgraph.sib.par.q1"),
  whole("period-amplitude-range", "tgraph.sib.par.q2"),
  whole("period-amplitude-range", "tgraph.sib.par.q3"),
  whole("period-amplitude-range", "tgraph.sib.par.q4"),
  whole("period-amplitude-range", "tgraph.sib.par.q5"),
  whole("period-amplitude-range", "tgraph.sib.par.q6"),

  /* ---- 2. Read a, b, p, q off the graph -------------------------- */
  whole("read-parameters", "tgraph.sib.rp.q1"),
  whole("read-parameters", "tgraph.sib.rp.q2"),
  whole("read-parameters", "tgraph.sib.rp.q3"),
  whole("read-parameters", "tgraph.sib.rp.q4"),
  whole("read-parameters", "tgraph.sib.rp.q5"),
  whole("read-parameters", "tgraph.sib.rp.q6"),

  /* ---- 3. Sketch the graph -------------------------------------- */
  whole("sketch", "tgraph.sib.sk.q1"),
  whole("sketch", "tgraph.sib.sk.q2"),
  whole("sketch", "tgraph.sib.sk.q3"),
  whole("sketch", "tgraph.sib.sk.q4"),
  whole("sketch", "tgraph.sib.sk.q5"),
  whole("sketch", "tgraph.sib.sk.q6"),

  /* ---- 4. Intersections & inequalities --------------------------- */
  whole("intersections-inequalities", "tgraph.sib.ii.q1"),
  whole("intersections-inequalities", "tgraph.sib.ii.q2"),
  whole("intersections-inequalities", "tgraph.sib.ii.q3"),
  whole("intersections-inequalities", "tgraph.sib.ii.q4"),
  whole("intersections-inequalities", "tgraph.sib.ii.q5"),
  whole("intersections-inequalities", "tgraph.sib.ii.q6"),

  /* ---- 5. Shift & reflect ---------------------------------------- */
  whole("shift-reflect", "tgraph.sib.sr.q1"),
  whole("shift-reflect", "tgraph.sib.sr.q2"),
  whole("shift-reflect", "tgraph.sib.sr.q3"),
  whole("shift-reflect", "tgraph.sib.sr.q4"),
  whole("shift-reflect", "tgraph.sib.sr.q5"),
  whole("shift-reflect", "tgraph.sib.sr.q6"),

  /* ---- 6. Level 4 ★ — the brave round ---------------------------- */
  whole("level-4", "tgraph.l4.q1"),
  whole("level-4", "tgraph.l4.q2"),
  whole("level-4", "tgraph.l4.q3"),
  whole("level-4", "tgraph.l4.q4"),
  whole("level-4", "tgraph.l4.q5"),
  whole("level-4", "tgraph.l4.q6"),
];
