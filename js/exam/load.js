/* ============================================================
   LAZY EXAM LOADER: one chapter's cards at a time
   (fix day Build 6, 2026-09-06)
   ------------------------------------------------------------
   WHY. js/exam/index.js imports every chapter's cards-<chapter>.js at
   the top of the file, and those pull the 21 source question modules
   behind them: 2.18 MB reachable before a learner had even logged in,
   for a tab most of them open once a term. The registry cannot change:
   verify-exam.html, verify-gtrig.html, verify-wrap.html and
   verify-exam*.mjs all import it synchronously and expect every card to
   be there, so the app got a second door instead.

     · loadExamChapter(id)                one chapter's cards, cached.
     · loadExamQuestionsForTopic(...)     the async twin of
     · loadExamFirstCardForSkill(...)     index.js's two helpers.
     · peekExamChapter(id) / peekExamQuestionsForTopic(...)
                                          sync reads for a screen that
                                          only wants what is already in.

   Both doors answer identically because the rules live in ONE place
   (js/exam/_registry.js) and both import them from there.

   THE SEED. js/exam/index.js calls seedExamChapter() for every chapter
   it registers. So any page that imports the registry (every verify
   page, every node harness) finds this cache already warm and takes the
   sync path, while the app, which never imports the registry, takes the
   lazy one. One behaviour, two entry points, no duplicated content.

   FAILURE. A failed import rejects and drops its cache entry, and the
   fetch goes through js/lazy.js so a second tap is a REAL second attempt
   (a browser remembers a failed module URL and will not re-fetch it). The
   screen shows the app's existing "Can't reach the server — try again."
   message and stays usable.
   ============================================================ */
import { cardsForTopic, firstCardForSkill, validateChapterCards } from "./_registry.js";
import { lazyImport } from "../lazy.js";

/* chapter id : [module path, export name]. The same eight cards-*.js
   files js/exam/index.js imports. A chapter that is registered with an
   empty array there (stats, finance, prob, meas, analytical, pat) is
   listed in EMPTY_CHAPTERS below instead: it has no module to fetch. */
export const EXAM_CHAPTER_MODULES = {
  tgraph: ["./cards-tgraph.js", "tgraphCards"],
  algx: ["./cards-algx.js", "algxCards"],
  exp: ["./cards-exp.js", "expCards"],
  func: ["./cards-func.js", "funcCards"],
  trig: ["./cards-trig.js", "trigCards"],
  gtrig: ["./cards-gtrig.js", "gtrigCards"],
  euclid: ["./cards-euclid.js", "euclidCards"],
  eqn: ["./cards-eqn.js", "eqnCards"],
};

/* Registered, but with nothing seeded yet: an empty array, not a
   missing chapter. Kept in step with js/exam/index.js's REGISTRY by the
   drift check (node verify-lazy-load.mjs). */
export const EMPTY_EXAM_CHAPTERS = ["stats", "finance", "prob", "meas", "analytical", "pat"];

const cards = new Map();     // chapterId -> the card array, once it is in
const inflight = new Map();  // chapterId -> the promise while it is coming

/** Seed the cache from an already-imported registry. Called by
 *  js/exam/index.js so a harness that imports it never fetches twice
 *  (and never re-validates: the registry has already done that). */
export function seedExamChapter(chapterId, chapterCards) {
  if (!cards.has(chapterId)) cards.set(chapterId, chapterCards || []);
}

/** The cards already in memory for a chapter, or null when it has not
 *  been loaded yet. Sync: for a screen that can paint straight away when
 *  the cache is warm and wait only when it is cold. */
export function peekExamChapter(chapterId) {
  return cards.has(chapterId) ? cards.get(chapterId) : null;
}

/** cardsForTopic on the cache, or null when the chapter is not in yet. */
export function peekExamQuestionsForTopic(chapterId, topicId) {
  const all = peekExamChapter(chapterId);
  return all ? cardsForTopic(all, topicId) : null;
}

/**
 * One chapter's cards. Fetched once, validated exactly the way the
 * registry validates them, then remembered.
 * @param {string} chapterId
 * @returns {Promise<Array>}  [] for a chapter with nothing seeded yet
 */
export function loadExamChapter(chapterId) {
  if (cards.has(chapterId)) return Promise.resolve(cards.get(chapterId));
  const hit = inflight.get(chapterId);
  if (hit) return hit;

  const entry = EXAM_CHAPTER_MODULES[chapterId];
  if (!entry) {
    // an empty or unknown chapter: the same [] the registry answers with
    cards.set(chapterId, []);
    return Promise.resolve([]);
  }
  const [path, exportName] = entry;
  /* _schema.js is fetched alongside the cards rather than imported at the
     top of this file: it drags four diagram engines behind it, and a
     learner who never opens Exam Focus should never pay for them. */
  const p = Promise.all([
    lazyImport(new URL(path, import.meta.url).href),
    lazyImport(new URL("./_schema.js", import.meta.url).href),
  ])
    .then(([mod, schema]) => {
      const list = mod[exportName];
      if (!Array.isArray(list)) throw new Error(`loadExamChapter: ${path} has no array export "${exportName}"`);
      validateChapterCards(chapterId, list, schema.validateQuestion);
      cards.set(chapterId, list);
      inflight.delete(chapterId);
      return list;
    })
    .catch(err => {
      inflight.delete(chapterId);     // a retry must be a real second attempt
      throw err;
    });
  inflight.set(chapterId, p);
  return p;
}

/** The async twin of js/exam/index.js's examQuestionsForTopic. */
export function loadExamQuestionsForTopic(chapterId, topicId) {
  return loadExamChapter(chapterId).then(all => cardsForTopic(all, topicId));
}

/** The async twin of js/exam/index.js's examFirstCardForSkill. */
export function loadExamFirstCardForSkill(chapterId, skillId, progress) {
  return loadExamChapter(chapterId).then(all => firstCardForSkill(all, skillId, progress));
}
