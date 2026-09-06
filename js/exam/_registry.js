/* ============================================================
   EXAM FOCUS: the three pure list rules, in one place
   (fix day Build 6, 2026-09-06)
   ------------------------------------------------------------
   These three rules used to live inside js/exam/index.js, which imports
   every chapter's cards at the top of the file. Build 6 gave the app a
   lazy door onto the same content (js/exam/load.js), and BOTH doors have
   to answer identically, so the rules moved here and each file imports
   them. Nothing about them changed; the comments are the originals.

   Deliberately dependency-free: it takes cards and a validator as
   arguments and imports nothing, so the lazy loader can pull it without
   dragging js/exam/_schema.js (and the four diagram engines behind it)
   into a screen that has not asked for them.
   ============================================================ */

/* A CARD'S LEVEL = the level of its hardest part (2026-08-23,
   EXAM-BUILD-DAY.md). A card is worked whole, so what a learner actually
   meets is the hardest thing in it — a card with parts at levels 1, 1 and
   3 is a level-3 card. Exported because verify-exam.html's level-wall
   check (Part 13) and the sort below must agree on one definition.
   A card with no parts (impossible past validateQuestion, but this is
   also called from a harness) reads as level 1. */
export function cardLevel(card) {
  const parts = (card && card.parts) || [];
  return parts.reduce((max, p) => Math.max(max, (p && p.level) || 1), 1);
}

/* THE CARDS OF ONE SKILL TILE, EASIEST FIRST (her ruling 10,
   2026-08-23: "Cards inside a tile run easiest first, Level 1 → 3").

   A STABLE sort by cardLevel ascending: cards of equal level keep the
   order their cards-<chapter>.js file lists them in, so a session's own
   ordering inside a level band is still respected — the sort only ever
   moves a harder card BELOW an easier one. (Array.prototype.sort is
   required to be stable in every engine this app runs on, but the index
   tiebreak below makes that guarantee explicit rather than assumed.)

   This is also the order "Another one!" walks (js/exam-play.js reads the
   same function for its sibling list) and the order firstCardForSkill
   resumes into — so a returning learner carries on through a tile from
   easy to hard, not in file order. */
export function cardsForTopic(chapterCards, topicId) {
  return (chapterCards || [])
    .filter(q => q.topic === topicId)
    .map((q, i) => ({ q, i }))
    .sort((a, b) => (cardLevel(a.q) - cardLevel(b.q)) || (a.i - b.i))
    .map(x => x.q);
}

/* Where "tap a tile" lands: the first card of this skill the learner
   has NOT finished yet, so a returning learner carries on instead of
   replaying. Falls back to the first card (everything done — she can
   still go round again), and to null when the skill has no cards.
   `progress` is the map js/api.js examState() returns, keyed by card id:
   { partsOpened, completed, completedAt }. */
export function firstCardForSkill(chapterCards, skillId, progress) {
  const cards = cardsForTopic(chapterCards, skillId);
  if (!cards.length) return null;
  const p = progress || {};
  return cards.find(c => !(p[c.id] && p[c.id].completed)) || cards[0];
}

/* Every question every future seeding session adds MUST pass
   validateQuestion() — checked once at import time, so a broken seed
   fails loudly (a thrown error, in dev) rather than shipping a silently
   invalid question. Cards are checked exactly like the questions they
   were cut from. The validator is passed in rather than imported, so
   this file stays free of js/exam/_schema.js. */
export function validateChapterCards(chapterId, cards, validateQuestion) {
  (cards || []).forEach(q => {
    const { ok, issues } = validateQuestion(q);
    if (!ok) throw new Error(`js/exam: question "${q && q.id}" in chapter "${chapterId}" failed validation:\n${issues.join("\n")}`);
    if (q.chapter !== chapterId) throw new Error(`js/exam: question "${q.id}" is registered under "${chapterId}" but declares chapter "${q.chapter}"`);
  });
}
