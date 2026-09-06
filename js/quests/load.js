/* ============================================================
   LAZY QUEST LOADER: the same registry as js/quests/index.js,
   but one module at a time (fix day Build 6, 2026-09-06).
   ------------------------------------------------------------
   WHY. js/quests/index.js imports all 93 quest modules at the top of
   the file, so opening the login screen pulled every quest in the app
   (and, through them, every maths library and diagram engine they use)
   before a learner had typed a password. The registry itself has to
   stay exactly as it is: 19 verify pages, tools/sweep.py, the shoot
   tools and verify-exam*.mjs all import it synchronously and expect
   every def to be there. So the app got a SECOND door instead:

     · QUEST_MODULES   id : [module path, export name]   the same list
                       js/quests/index.js imports, written out flat.
     · loadQuest(id)   a cached promise of that one def.
     · loadChapterQuests(chapterId)   that chapter's set, warmed in
                       one go when the chapter screen opens.
     · QUEST_META      the handful of def flags a SCREEN reads while it
                       is still drawing, so the chapter map and the
                       results screen never have to import a quest.

   ADDING A QUEST: put it in js/quests/index.js (as always) AND in
   QUEST_MODULES below, then run the drift check,
   `node verify-lazy-load.mjs`, which fails loudly if the two
   lists disagree, or if a QUEST_META flag no longer matches the real
   def. That check is the whole reason this file is safe to keep beside
   the registry rather than derived from it.

   FAILURE. A dynamic import can fail (flaky phone connection, a stale
   service-worker cache). loadQuest rejects and DROPS its cache entry, and
   the fetch itself goes through js/lazy.js, which is what makes tapping
   the card again a REAL second attempt rather than the browser replaying
   the failure it remembers. Meanwhile the caller shows the app's existing
   "Can't reach the server — try again." message and the learner stays on
   a working screen.
   ============================================================ */
import { chapterById } from "../config.js";
import { lazyImport } from "../lazy.js";

/* id : [module path, export name], the same 93 lines js/quests/index.js
   imports, in the same order. Keep the two in step (the drift check
   proves it). */
export const QUEST_MODULES = {
  q1: ["./quest01-calculator.js", "quest01"],
  q2: ["./quest02-centre-spread.js", "quest02"],
  q3: ["./quest03-quartiles.js", "quest03"],
  q4: ["./quest04-skewness.js", "quest04"],
  q5: ["./quest05-grouped.js", "quest05"],
  q6: ["./quest06-ogives.js", "quest06"],
  q7: ["./quest07-stddev.js", "quest07"],
  q8: ["./quest08-mixed.js", "quest08"],
  f1: ["./questf1-words.js", "questF1"],
  f2: ["./questf2-types.js", "questF2"],
  f3: ["./questf3-compounding.js", "questF3"],
  f4: ["./questf4-timeline-count.js", "questF4"],
  f5: ["./questf5-timeline-build.js", "questF5"],
  f6: ["./questf6-deposits.js", "questF6"],
  f7: ["./questf7-eff-nom.js", "questF7"],
  p1: ["./questp1-basics.js", "questP1"],
  p2: ["./questp2-venn-regions.js", "questP2"],
  p3: ["./questp3-venn-prob.js", "questP3"],
  p4: ["./questp4-rules.js", "questP4"],
  p5: ["./questp5-independence.js", "questP5"],
  p6: ["./questp6-trees.js", "questP6"],
  p7: ["./questp7-replacement.js", "questP7"],
  t1: ["./questt1-choose.js", "questT1"],
  t2: ["./questt2-sine-sides.js", "questT2"],
  t3: ["./questt3-sine-angles.js", "questT3"],
  t4: ["./questt4-cosine-sides.js", "questT4"],
  t5: ["./questt5-cosine-angles.js", "questT5"],
  t6: ["./questt6-area.js", "questT6"],
  t7: ["./questt7-mixed.js", "questT7"],
  m1: ["./questm1-name-formula.js", "questM1"],
  m2: ["./questm2-heights.js", "questM2"],
  m3: ["./questm3-open.js", "questM3"],
  m4: ["./questm4-composite.js", "questM4"],
  m5: ["./questm5-mixed.js", "questM5"],
  m6: ["./questm6-height.js", "questM6"],
  fn1: ["./questfn1-families.js", "questFn1"],
  fn2: ["./questfn2-line-parabola.js", "questFn2"],
  fn3: ["./questfn3-hyperbola-exp.js", "questFn3"],
  fn4: ["./questfn4-read-graph.js", "questFn4"],
  fn5: ["./questfn5-inequalities.js", "questFn5"],
  fn6: ["./questfn6-transformations.js", "questFn6"],
  fn7: ["./questfn7-together.js", "questFn7"],
  tg1: ["./questtg1-parents.js", "questTg1"],
  tg2: ["./questtg2-params.js", "questTg2"],
  tg3: ["./questtg3-period-amp-range.js", "questTg3"],
  tg4: ["./questtg4-shifts.js", "questTg4"],
  tg5: ["./questtg5-tan.js", "questTg5"],
  tg6: ["./questtg6-find-equation.js", "questTg6"],
  tg7: ["./questtg7-mixed.js", "questTg7"],
  ag1: ["./questag1-formulas.js", "questAg1"],
  ag2: ["./questag2-gradient.js", "questAg2"],
  ag3: ["./questag3-parallel-perp.js", "questAg3"],
  ag4: ["./questag4-inclination.js", "questAg4"],
  ag5: ["./questag5-perp-bisector.js", "questAg5"],
  ag6: ["./questag6-triangle-area.js", "questAg6"],
  ag7: ["./questag7-mixed.js", "questAg7"],
  np1: ["./questnp1-spot.js", "questNp1"],
  np2: ["./questnp2-arithmetic.js", "questNp2"],
  np3: ["./questnp3-quadratic.js", "questNp3"],
  np4: ["./questnp4-missing.js", "questNp4"],
  np5: ["./questnp5-minmax.js", "questNp5"],
  np6: ["./questnp6-gaps.js", "questNp6"],
  np7: ["./questnp7-geometric.js", "questNp7"],
  es1: ["./queses1-laws.js", "questEs1"],
  es2: ["./queses2-traps.js", "questEs2"],
  es3: ["./queses3-method.js", "questEs3"],
  es4: ["./queses4-divorce.js", "questEs4"],
  es5: ["./queses5-surds.js", "questEs5"],
  es6: ["./queses6-conjugates.js", "questEs6"],
  es7: ["./queses7-ratexp.js", "questEs7"],
  es8: ["./queses8-nosolution.js", "questEs8"],
  eq1: ["./queseq1-zeroproduct.js", "questEq1"],
  eq2: ["./queseq2-special.js", "questEq2"],
  eq3: ["./queseq3-kmethod.js", "questEq3"],
  eq4: ["./queseq4-fractions.js", "questEq4"],
  eq5: ["./queseq5-square.js", "questEq5"],
  eq6: ["./queseq6-formula.js", "questEq6"],
  eq7: ["./queseq7-inequalities.js", "questEq7"],
  eq8: ["./queseq8-nature.js", "questEq8"],
  eq9: ["./queseq9-solution-count.js", "questEq9"],
  gt1: ["./questgt1-intro.js", "questGt1"],
  gt2: ["./questgt2-cartesian.js", "questGt2"],
  gt3: ["./questgt3-special.js", "questGt3"],
  gt4: ["./questgt4-cofunctions.js", "questGt4"],
  gt5: ["./questgt5-reductions-numbers.js", "questGt5"],
  gt6: ["./questgt6-tip-chips.js", "questGt6"],
  gt7: ["./questgt7-reductions-variables.js", "questGt7"],
  gt8: ["./questgt8-special-sums.js", "questGt8"],
  gt9: ["./questgt9-identities.js", "questGt9"],
  gt10: ["./questgt10-super-special.js", "questGt10"],
  gt11: ["./questgt11-six-types.js", "questGt11"],
  gt12: ["./questgt12-last-steps.js", "questGt12"],
  gt13: ["./questgt13-undefined.js", "questGt13"],
};

/* ---------------- the sync flags ----------------
   EXACTLY the def fields a screen reads while it is drawing, and nothing
   else. Today that is one field:

     xpOnce   js/screens.js's results card: a discovery round pays its XP
              the first time only, so a replay of one says something
              different (js/play.js owns the actual rule).

   "Is this quest registered at all?" is the other sync question the
   chapter map and the homework card ask, and membership of QUEST_MODULES
   answers it, no flag needed.

   Only ids whose def sets a flag are listed below; every other id reads
   the default. NOTHING ELSE FROM A DEF BELONGS HERE: a screen that needs
   more than a flag (the results screen's "Play again", which hands the
   whole def to the player) awaits loadQuest instead. As of 2026-09-06 no
   quest sets xpOnce: the three General Trig discovery rounds dropped it on
   2026-08-22 when their questions started rotating. The drift check
   compares this list against every real def, so the day one comes back
   with it, the check says so. */
const META_FLAGS = {
  /* e.g. gt1: { xpOnce: true }, */
};

export const QUEST_META = Object.fromEntries(
  Object.keys(QUEST_MODULES).map(id => [id, { xpOnce: !!(META_FLAGS[id] && META_FLAGS[id].xpOnce) }])
);

/** The sync flags for one quest, or null when the id is not registered.
 *  Mirrors questDef()'s "unknown id answers null" contract. */
export function questMeta(id) { return QUEST_META[id] || null; }

/** Is this quest in the registry? The sync half of `!!questDef(id)`. */
export function questRegistered(id) {
  return Object.prototype.hasOwnProperty.call(QUEST_MODULES, id);
}

/* ---------------- the loader ---------------- */
const cache = new Map();

/**
 * The playable def for one quest, fetched once and remembered.
 * @param {string} id  a QUEST_MODULES key
 * @returns {Promise<object>}  rejects on an unknown id or a failed fetch
 */
export function loadQuest(id) {
  const hit = cache.get(id);
  if (hit) return hit;
  const entry = QUEST_MODULES[id];
  if (!entry) return Promise.reject(new Error(`loadQuest: no quest "${id}"`));
  const [path, exportName] = entry;
  const p = lazyImport(new URL(path, import.meta.url).href).then(mod => {
    const def = mod[exportName];
    if (!def) throw new Error(`loadQuest: ${path} has no export "${exportName}"`);
    return def;
  }).catch(err => {
    cache.delete(id);              // a retry must be a real second attempt
    throw err;
  });
  cache.set(id, p);
  return p;
}

/** Already loaded and sitting in the cache? (sync, for a screen that can
 *  use the def straight away rather than waiting a frame for it) */
export function questLoaded(id) { return cache.has(id); }

/**
 * Warm every quest of one chapter, so tapping a card is instant.
 * Resolves to a map of id to def, skipping ids that failed: this is a
 * prefetch, and a screen must never break because one of them was slow.
 * @param {string} chapterId  a js/config.js CHAPTERS id
 */
export function loadChapterQuests(chapterId) {
  const ch = chapterById(chapterId);
  const ids = ((ch && ch.quests) || []).map(q => q.id).filter(questRegistered);
  return Promise.all(ids.map(id => loadQuest(id).then(def => [id, def], () => null)))
    .then(pairs => Object.fromEntries(pairs.filter(Boolean)));
}

/* ============================================================
   DICE POOLS: the same treatment for js/quests/dice-pools.js, which
   imported all eight chapter pools up front. A pool is a big recipe
   list, and a learner only ever opens one chapter's.
   ============================================================ */
export const DICE_POOL_MODULES = {
  stats: ["./dice-stats.js", "pool"],
  finance: ["./dice-finance.js", "pool"],
  pat: ["./dice-patterns.js", "pool"],     // config.js's id for Number Patterns
  trig: ["./dice-trig.js", "pool"],
  eqn: ["./dice-eqn.js", "pool"],
  exp: ["./dice-exp.js", "pool"],
  func: ["./dice-func.js", "pool"],
  gtrig: ["./dice-gtrig.js", "pool"],
};

/** Does this chapter have a dice pool wired? The sync half of
 *  `!!dicePool(id)`, which is all the chapter screen needs to decide
 *  whether to draw the 🎲 card. */
export function hasDicePool(chapterId) {
  return Object.prototype.hasOwnProperty.call(DICE_POOL_MODULES, chapterId);
}

const dice = new Map();

/**
 * One chapter's dice pool, fetched once and remembered.
 * @param {string} chapterId
 * @returns {Promise<object|null>}  null for a chapter with no pool (the
 *   same answer dicePool() gives), rejects when the fetch itself fails.
 */
export function loadDicePool(chapterId) {
  const hit = dice.get(chapterId);
  if (hit) return hit;
  const entry = DICE_POOL_MODULES[chapterId];
  if (!entry) return Promise.resolve(null);
  const [path, exportName] = entry;
  const p = lazyImport(new URL(path, import.meta.url).href).then(mod => mod[exportName] || null).catch(err => {
    dice.delete(chapterId);
    throw err;
  });
  dice.set(chapterId, p);
  return p;
}
