/* ============================================================
   EXAM FOCUS — the registry: per-chapter arrays of SKILL CARDS
   (EXAM-FOCUS-PLAN.md, session 0 infrastructure build, 2026-08-21;
   overnight run #1's 15 non-Euclidean modules registered day-session
   2026-08-22; cut into SKILL CARDS the same evening —
   EXAM-SKILLS-BRIEF.md stage 1).
   ------------------------------------------------------------
   One key per chapter id: the eleven js/config.js CHAPTERS entries,
   plus every js/config.js EXAM_ONLY_CHAPTERS entry. A chapter with no
   content yet is an empty array.

   WHAT CHANGED ON 2026-08-22 (evening): the arrays hold CARDS, not the
   21 seeded questions. She played the tab and it felt "too sudden" — a
   whole five-part practice-paper question with no title saying what
   skill was being practised — so a question is now cut along its skills
   into short cards, and the tab runs chapter -> skill tiles -> one card
   at a time. The cutting lives in js/exam/cards-<chapter>.js; this file
   only joins the six lists up. A CARD IS A QUESTION as far as every
   other file is concerned.

   EUCLIDEAN IS REGISTERED (2026-08-22). Its two composed modules moved
   out of js/exam/_pending-engine-port/ the day the Circle Quest engine
   port landed (js/exam/circle-engine.js, EXAM-FOCUS-PLAN.md build order
   step 3), and its chapter is the first EXAM-FOCUS-ONLY one — her
   ruling that morning: Euclidean gets its own chapter inside Blipwork,
   visible in the 📝 Exam Focus tab and nowhere else, because Circle
   Quest still owns every circle-geo drill round. "euclid" is therefore
   a perfectly ordinary key here; what makes it exam-only lives in
   js/config.js (a separate list from CHAPTERS) and js/screens.js.

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
import { skillsForChapter, skillLabel } from "./skills.js";
import { eqnCards } from "./cards-eqn.js";
import { expCards } from "./cards-exp.js";
import { funcCards } from "./cards-func.js";
import { gtrigCards } from "./cards-gtrig.js";
import { trigCards } from "./cards-trig.js";
import { euclidCards } from "./cards-euclid.js";

/* SKILL CARDS (EXAM-SKILLS-BRIEF.md, stage 1, 2026-08-22). The registry
   no longer holds the 21 seeded QUESTIONS directly — it holds the ~54
   CARDS cut from them by js/exam/cards-<chapter>.js. The 21 source
   modules are untouched and are now imported ONLY by those files; they
   remain the content source of truth (and remain what
   verify-exam-modules.mjs recomputes against, module by module).

   Nothing else changed shape. A card IS a question: same fields, same
   validator, same server RPC, same player. `topic` carries the SKILL id
   instead of the old content slug, which is what turns
   examTopicsForChapter into the tile list and examQuestionsForTopic into
   "the cards of this skill, in her order".

   Every other chapter (stats, finance, prob, meas, tgraph, analytical,
   pat) stays an empty array until its own seeding session lands. */
const REGISTRY = {
  stats: [], finance: [], prob: [], meas: [],
  tgraph: [], analytical: [], pat: [],
  exp: expCards,
  func: funcCards,
  /* 2D TRIGONOMETRY — PAUSED (her ruling, 2026-08-22): one card, and
     nothing new built for it. */
  trig: trigCards,
  /* GENERAL TRIG (js/config.js CHAPTERS, rounds gt1-gt13). Four cards
     across four skills; two more skills are listed in js/exam/skills.js
     with no cards yet and render as "coming soon". */
  gtrig: gtrigCards,
  /* EXAM-FOCUS-ONLY chapter (js/config.js EXAM_ONLY_CHAPTERS) - it owns
     no drill quests at all, so it appears in the Exam Focus tab and
     nowhere else in the app. One skill, one long continuous round. */
  euclid: euclidCards,
  eqn: eqnCards,
};

/* Every question every future seeding session adds MUST pass
   validateQuestion() — checked once here, at import time, so a broken
   seed fails loudly (a thrown error, in dev) rather than shipping a
   silently-invalid question. Cards are checked here exactly like
   the questions they were cut from. */
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

/* The SKILL TILE list for a chapter (EXAM-SKILLS-BRIEF.md, 2026-08-22).
   It now comes from js/exam/skills.js — her agreed order, her labels —
   rather than being derived from whatever happens to be registered.
   That is the whole point: a skill with NO cards yet still has to
   appear, rendered muted and untappable ("coming soon"), so the learner
   can see what is coming. A chapter with no skills at all returns [],
   exactly as the derived version did for an unseeded chapter. */
export function examTopicsForChapter(chapterId) {
  return skillsForChapter(chapterId).map(s => ({ id: s.id, label: s.label }));
}

/* The label for one skill, for the player's heading. Re-exported here
   so a screen only ever has to import from one place. */
export { skillLabel };

/* Where "tap a tile" lands: the first card of this skill the learner
   has NOT finished yet, so a returning learner carries on instead of
   replaying. Falls back to the first card (everything done — she can
   still go round again), and to null when the skill has no cards.
   `progress` is the map js/api.js examState() returns, keyed by card id:
   { partsOpened, completed, completedAt }. */
export function examFirstCardForSkill(chapterId, skillId, progress) {
  const cards = examQuestionsForTopic(chapterId, skillId);
  if (!cards.length) return null;
  const p = progress || {};
  return cards.find(c => !(p[c.id] && p[c.id].completed)) || cards[0];
}

export function examQuestionsForTopic(chapterId, topicId) {
  return examQuestionsForChapter(chapterId).filter(q => q.topic === topicId);
}
