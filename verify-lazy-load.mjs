/* ============================================================
   THE DRIFT CHECK: do the lazy loaders and the registries still
   describe the same app? (fix day Build 6, 2026-09-06)
   ------------------------------------------------------------
   Build 6 gave the app a second way to reach its content: the registries
   (js/quests/index.js, js/quests/dice-pools.js, js/exam/index.js) that
   every verify page and every tool imports synchronously, and the loaders
   (js/quests/load.js, js/exam/load.js) the app itself uses, which fetch
   one chapter's worth at a time. Two lists mean two lists can drift, and
   the way that shows up is the worst kind: a brand-new quest that plays
   fine in every harness and reads "Coming soon" on a learner's phone.

   So: this file proves they cannot. For every quest, every dice pool and
   every exam chapter it checks that

     · the loader knows exactly the ids the registry registers, no more
       and no fewer;
     · what the loader fetches is the SAME OBJECT the registry holds (so a
       wrong path or a wrong export name in the map is caught, not just a
       wrong id);
     · js/quests/load.js's sync QUEST_META flags still match the real defs.

   The exam half runs COLD on purpose: js/exam/load.js is exercised before
   js/exam/index.js is imported, so the dynamic import and the validation
   pass are the real ones and not a cache hit off the registry's seed.

   usage:  node verify-lazy-load.mjs
   Exit code 0 = green. Any failure prints and exits 1.
   ============================================================ */

let pass = 0;
const fails = [];
const tick = (ok, label) => { if (ok) pass++; else fails.push(label); };

/* ---- 1. EXAM, COLD (before the registry is imported anywhere) ---- */
const examLoad = await import("./js/exam/load.js");
const examChapterIds = [
  ...Object.keys(examLoad.EXAM_CHAPTER_MODULES),
  ...examLoad.EMPTY_EXAM_CHAPTERS,
];
const coldExam = {};
for (const id of examChapterIds) {
  try {
    coldExam[id] = await examLoad.loadExamChapter(id);
    tick(Array.isArray(coldExam[id]), `exam loader: "${id}" loads cold and answers an array`);
  } catch (e) {
    tick(false, `exam loader: "${id}" failed to load cold: ${e && e.message}`);
  }
}

/* ---- 2. EXAM, against the registry ---- */
const examIndex = await import("./js/exam/index.js");
const registryChapters = ["stats", "finance", "prob", "meas", "analytical", "pat",
  "tgraph", "algx", "exp", "func", "trig", "gtrig", "euclid", "eqn"];
/* the registry has no "list your chapters" export (it never needed one),
   so the list above is the check: it is compared BOTH ways against the
   loader's two lists, and every id is proved to answer a real array. */
const loaderSet = new Set(examChapterIds);
const registrySet = new Set(registryChapters);
tick(loaderSet.size === registrySet.size && [...loaderSet].every(id => registrySet.has(id)),
  `exam chapters: loader lists ${[...loaderSet].sort().join(",")} and the registry lists ${[...registrySet].sort().join(",")}`);
for (const id of registryChapters) {
  const fromRegistry = examIndex.examQuestionsForChapter(id);
  /* A seeded chapter must hand back the SAME array (that is what proves
     the path and the export name in EXAM_CHAPTER_MODULES). A chapter with
     nothing seeded yet is a literal [] on both sides, so there is no
     shared object to compare: both being empty is the whole claim. */
  const ok = examLoad.EXAM_CHAPTER_MODULES[id]
    ? coldExam[id] === fromRegistry
    : (coldExam[id].length === 0 && fromRegistry.length === 0);
  tick(ok, `exam "${id}": the loader's cards ARE the registry's cards (${(fromRegistry || []).length} cards)`);
}

/* The two async twins must answer exactly what the registry's two
   helpers answer, for every skill of every chapter: same cards, same
   order, same resume pick. */
let twinCards = 0, twinFirst = 0, twinTotal = 0;
for (const id of registryChapters) {
  for (const sk of examIndex.examTopicsForChapter(id)) {
    twinTotal++;
    const wantList = examIndex.examQuestionsForTopic(id, sk.id);
    const gotList = await examLoad.loadExamQuestionsForTopic(id, sk.id);
    if (gotList.length === wantList.length && gotList.every((c, i) => c === wantList[i])) twinCards++;
    else fails.push(`loadExamQuestionsForTopic("${id}", "${sk.id}") differs from the registry's`);

    const progress = {};
    const wantFirst = examIndex.examFirstCardForSkill(id, sk.id, progress);
    const gotFirst = await examLoad.loadExamFirstCardForSkill(id, sk.id, progress);
    if (gotFirst === wantFirst) twinFirst++;
    else fails.push(`loadExamFirstCardForSkill("${id}", "${sk.id}") differs from the registry's`);
  }
}
tick(twinCards === twinTotal, `loadExamQuestionsForTopic matches the registry on all ${twinTotal} skill tiles (${twinCards} matched)`);
tick(twinFirst === twinTotal, `loadExamFirstCardForSkill matches the registry on all ${twinTotal} skill tiles (${twinFirst} matched)`);

/* ---- 3. QUESTS ---- */
const questIndex = await import("./js/quests/index.js");
const questLoad = await import("./js/quests/load.js");
const registryIds = Object.keys(questIndex.QUEST_DEFS);
const loaderIds = Object.keys(questLoad.QUEST_MODULES);

const missingFromLoader = registryIds.filter(id => !loaderIds.includes(id));
const extraInLoader = loaderIds.filter(id => !registryIds.includes(id));
tick(!missingFromLoader.length, `every registered quest is in the loader (missing: ${missingFromLoader.join(", ") || "none"})`);
tick(!extraInLoader.length, `every loader quest is registered (extra: ${extraInLoader.join(", ") || "none"})`);
tick(registryIds.length === loaderIds.length, `both lists hold ${registryIds.length} quests (loader has ${loaderIds.length})`);

let sameDef = 0, metaOk = 0;
for (const id of registryIds) {
  const want = questIndex.questDef(id);
  let got = null;
  try { got = await questLoad.loadQuest(id); }
  catch (e) { fails.push(`loadQuest("${id}") threw: ${e && e.message}`); continue; }
  if (got === want) sameDef++;
  else fails.push(`loadQuest("${id}") did not resolve to the registry's def (module path or export name wrong in js/quests/load.js)`);

  const meta = questLoad.questMeta(id) || {};
  if (!!meta.xpOnce === !!(want && want.xpOnce)) metaOk++;
  else fails.push(`QUEST_META["${id}"].xpOnce is ${!!meta.xpOnce} but the def says ${!!(want && want.xpOnce)}`);
}
tick(sameDef === registryIds.length, `all ${registryIds.length} quests resolve through the loader to the same def object (${sameDef} matched)`);
tick(metaOk === registryIds.length, `all ${registryIds.length} QUEST_META xpOnce flags match their def (${metaOk} matched)`);
tick(registryIds.every(id => questLoad.questRegistered(id)) && !questLoad.questRegistered("no-such-quest"),
  "questRegistered() says yes to every registered id and no to an unknown one");

/* ---- 4. DICE POOLS ---- */
const dicePools = await import("./js/quests/dice-pools.js");
const diceIds = Object.keys(questLoad.DICE_POOL_MODULES);
let samePool = 0;
for (const id of diceIds) {
  const want = dicePools.dicePool(id);
  let got = null;
  try { got = await questLoad.loadDicePool(id); }
  catch (e) { fails.push(`loadDicePool("${id}") threw: ${e && e.message}`); continue; }
  if (got === want && !!want) samePool++;
  else fails.push(`loadDicePool("${id}") did not resolve to the registry's pool`);
}
tick(samePool === diceIds.length, `all ${diceIds.length} dice pools resolve through the loader to the same pool object (${samePool} matched)`);
tick(diceIds.every(id => questLoad.hasDicePool(id)) && !questLoad.hasDicePool("no-such-chapter"),
  "hasDicePool() says yes to every wired chapter and no to an unknown one");
tick((await questLoad.loadDicePool("no-such-chapter")) === null,
  "loadDicePool() answers null for a chapter with no pool, the way dicePool() does");

/* ---- 5. loadChapterQuests covers a chapter's whole map ---- */
const { CHAPTERS } = await import("./js/config.js");
for (const ch of CHAPTERS) {
  const want = (ch.quests || []).map(q => q.id).filter(id => questLoad.questRegistered(id));
  const got = await questLoad.loadChapterQuests(ch.id);
  const gotIds = Object.keys(got);
  tick(want.length === gotIds.length && want.every(id => got[id] === questIndex.questDef(id)),
    `loadChapterQuests("${ch.id}") loads its ${want.length} registered quests (got ${gotIds.length})`);
}

/* ---- report ---- */
console.log(`\nverify-lazy-load: ${pass}/${pass + fails.length} checks passed`);
if (fails.length) {
  console.log("\nFAIL:");
  fails.forEach(f => console.log("  ✗ " + f));
  process.exit(1);
}
console.log("ALL GOOD: the loaders and the registries describe the same app.");
