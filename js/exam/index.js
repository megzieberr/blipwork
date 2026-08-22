/* ============================================================
   EXAM FOCUS — the registry: per-chapter arrays of seeded questions
   (EXAM-FOCUS-PLAN.md, session 0 infrastructure build, 2026-08-21;
   overnight run #1's 15 non-Euclidean modules registered day-session
   2026-08-22 — see OVERNIGHT-1-REPORT.md's "day-session work list").
   ------------------------------------------------------------
   Every array starts EMPTY — content is seeded topic by topic in later
   build sessions. One key per js/config.js CHAPTERS[].id. Euclidean
   geometry has NO key here YET — NOT because it's excluded (that was
   never Megan's ruling — see EXAM-FOCUS-PLAN.md's "Corrections" section,
   2026-08-21 late night: Euclidean exam questions belong in Exam Focus,
   as an exam-focus-only chapter, her 2026-08-22 morning ruling). Its two
   composed modules wait in js/exam/_pending-engine-port/ on the Circle
   Quest engine.js port (build order step 3) — a separate day session's
   job, kept out of this one so it lands clean.

   The HARNESS-ONLY stub (js/exam/_harness-stub.js) is deliberately NOT
   imported or registered here — it must stay unreachable through normal
   navigation even once a chapter's real questions land. Only
   verify-exam.html imports it, driving js/exam-play.js directly with it.

   Nothing in this file is gated by js/config.js's EXAM_CHAPTERS — that
   flag controls NAVIGATION (whether a chapter's exam-focus screens are
   reachable from the hub), not which questions exist. A chapter could in
   principle be seeded here before its flag flips on; the flag is what
   makes it learner-visible (same relationship DICE_CHAPTERS has with
   js/quests/dice-pools.js).
   ============================================================ */
import { validateQuestion } from "./_schema.js";
import { eqnNatureOfRootsQuestions } from "./eqn-nature-of-roots.js";
import { eqnNatureOfRootsTopUpQuestions } from "./eqn-nature-of-roots-2.js";
import { eqnKMethodQuestions } from "./eqn-k-method.js";
import { eqnFractionsAndRestrictionsQuestions } from "./eqn-fractions-and-restrictions.js";
import { eqnInequalitiesQuestions } from "./eqn-inequalities.js";
import { eqnInequalitiesTopUpQuestions } from "./eqn-inequalities-2.js";
import { expFirstStepAndMethodQuestions } from "./exp-first-step-and-method.js";
import { expConjugatesAndRationalisingQuestions } from "./exp-conjugates-and-rationalising.js";
import { expNoSolutionAndStrategyQuestions } from "./exp-no-solution-and-strategy.js";
import { funcHyperbolaAndExponentialQuestions } from "./func-hyperbola-and-exponential.js";
import { funcGraphsTogetherQuestions } from "./func-graphs-together.js";
import { funcLineAndParabolaQuestions } from "./func-line-and-parabola.js";
import { funcHyperbolaAndExponentialT2Questions } from "./func-hyperbola-and-exponential-2.js";
import { trigReductionAndRatiosQuestions } from "./trig-reduction-and-ratios.js";
import { trigGeneralSolutionsQuestions } from "./trig-general-solutions.js";
import { trigMixedProblemsQuestions } from "./trig-mixed-problems.js";

/* PILOT TOPIC (session D, 2026-08-21) + overnight run #1's 15 modules
   (composed 2026-08-21 night, registered 2026-08-22 day session): eqn
   goes from 4 questions (nature-of-roots only) to 9 across 4 topics;
   exp, func and trig go from empty to their first seeded questions. The
   two Euclidean modules stay unregistered — see this file's header.
   Every other chapter (stats, finance, prob, meas, tgraph, analytical,
   pat) stays an empty array until its own seeding session lands. */
const REGISTRY = {
  stats: [], finance: [], prob: [], meas: [],
  tgraph: [], analytical: [], pat: [],
  exp: [
    ...expFirstStepAndMethodQuestions,
    ...expConjugatesAndRationalisingQuestions,
    ...expNoSolutionAndStrategyQuestions,
  ],
  func: [
    ...funcHyperbolaAndExponentialQuestions,
    ...funcGraphsTogetherQuestions,
    ...funcLineAndParabolaQuestions,
    ...funcHyperbolaAndExponentialT2Questions,
  ],
  trig: [
    ...trigReductionAndRatiosQuestions,
    ...trigGeneralSolutionsQuestions,
    ...trigMixedProblemsQuestions,
  ],
  eqn: [
    ...eqnKMethodQuestions,
    ...eqnFractionsAndRestrictionsQuestions,
    ...eqnInequalitiesQuestions,
    ...eqnInequalitiesTopUpQuestions,
    ...eqnNatureOfRootsQuestions,
    ...eqnNatureOfRootsTopUpQuestions,
  ],
};

/* Every question every future seeding session adds MUST pass
   validateQuestion() — checked once here, at import time, so a broken
   seed fails loudly (a thrown error, in dev) rather than shipping a
   silently-invalid question. Empty today: nothing to check yet. */
Object.entries(REGISTRY).forEach(([chapterId, questions]) => {
  questions.forEach(q => {
    const { ok, issues } = validateQuestion(q);
    if (!ok) throw new Error(`js/exam/index.js: question "${q && q.id}" in chapter "${chapterId}" failed validation:\n${issues.join("\n")}`);
    if (q.chapter !== chapterId) throw new Error(`js/exam/index.js: question "${q.id}" is registered under "${chapterId}" but declares chapter "${q.chapter}"`);
  });
});

export function examQuestionsForChapter(chapterId) {
  return REGISTRY[chapterId] || [];
}

export function examQuestionById(id) {
  for (const arr of Object.values(REGISTRY)) {
    const q = arr.find(q => q.id === id);
    if (q) return q;
  }
  return null;
}

function titleCaseSlug(slug) {
  return String(slug || "").replace(/[-_]+/g, " ").replace(/\b\w/g, c => c.toUpperCase());
}

/* Topic list for a chapter, derived from whatever's actually registered
   — id + a title-cased fallback label. Real, hand-written topic labels
   are a seeding-session concern (nothing here blocks a future session
   from carrying a nicer label alongside the slug if that turns out to
   be worth the extra field); until then the slug reads fine title-cased
   ("angle-of-inclination" -> "Angle Of Inclination"). */
export function examTopicsForChapter(chapterId) {
  const qs = examQuestionsForChapter(chapterId);
  const seen = new Map();
  qs.forEach(q => { if (!seen.has(q.topic)) seen.set(q.topic, { id: q.topic, label: titleCaseSlug(q.topic) }); });
  return [...seen.values()];
}

export function examQuestionsForTopic(chapterId, topicId) {
  return examQuestionsForChapter(chapterId).filter(q => q.topic === topicId);
}
