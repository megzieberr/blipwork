/* ============================================================
   EXAM FOCUS — STACKED FRACTIONS: the no-bare-slashes harness
   (EXAM-SKILLS-BRIEF.md, stage 1, 2026-08-22, item 4 — her side-quest
   ask: "proper stacked fractions everywhere in Exam Focus, no slashes".)

     node verify-exam-fractions.mjs

   ------------------------------------------------------------
   WHY A HARNESS AND NOT JUST A LOOK. fracHtml (js/ui.js) is applied at
   RENDER time by js/exam-play.js, and it only catches the `a/b` shapes
   its regex knows: an atom is a bracketed group (ONE level of nesting)
   optionally led by √, or a short token. Anything outside that — a
   numerator carrying HTML tags, a square-bracket group, a two-level
   nest — is quietly left as a slash on the page. Nothing shouts; the
   fraction simply renders flat. So this file walks every learner-facing
   string on every card, runs the real fracHtml over it, strips the HTML
   the way a reader's eye does, and reports every "/" still standing.

   WHAT COUNTS AS A BARE SLASH: a "/" that survives fracHtml and is NOT
   inside an HTML tag (so the "/" in "</span>" is fine) and NOT part of
   a date or a URL. Everything else is a flat fraction a learner would
   see, and this harness fails on it.

   HOW A REPORTED SLASH GETS FIXED — in the SOURCE question file
   (js/exam/*.js), never here, and fractions only:
     · reshape the expression into something fracHtml handles — usually
       just bracketing the numerator, e.g. 6(√5 + √2) / 3 becomes
       (6(√5 + √2))/3 and stacks; or
     · write the stacked span straight into the string. A pre-built
       <span class="sfrac">…</span> is left completely alone by fracHtml,
       so it is the escape hatch for anything with tags inside it
       (3<sup>x+1</sup> over 3<sup>x</sup>, an exponent like x^(3/4)).

   Run alongside `node verify-exam-modules.mjs` and verify-exam.html.
   ============================================================ */

const { fracHtml } = await import("./js/ui.js");
const { examQuestionsForChapter } = await import("./js/exam/index.js");

const CHAPTERS = [
  "stats", "finance", "prob", "meas", "tgraph", "analytical", "pat",
  "exp", "func", "trig", "gtrig", "euclid", "eqn",
];

let total = 0, passed = 0;
const fails = [];
const tick = (cond, label) => { total++; if (cond) passed++; else fails.push(label); return cond; };

/* What a reader actually sees: tags gone, entities that matter turned
   back into their characters, dates and URLs taken out of the running
   (a "/" in either is not a fraction). */
function visibleText(html) {
  return String(html)
    .replace(/<[^>]*>/g, " ")                 // every HTML tag, opening or closing
    .replace(/https?:\/\/\S+/gi, " ")         // URLs
    .replace(/\b\d{4}-\d{2}-\d{2}\b/g, " ")   // ISO dates
    .replace(/\b\d{1,2}\/\d{1,2}\/\d{2,4}\b/g, " ") // slash dates
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&");
}

/* Every learner-facing string on one card, labelled so a failure names
   the exact field. Both language sides: `en` is required, `af` is
   optional (js/exam/_schema.js's header) but is checked when present. */
function stringsOf(card) {
  const out = [];
  const pair = (where, p) => {
    if (!p) return;
    ["en", "af"].forEach(lang => { if (typeof p[lang] === "string") out.push([`${where}.${lang}`, p[lang]]); });
  };
  pair("intro", card.intro);
  (card.parts || []).forEach(part => {
    pair(`(${part.id}).prompt`, part.prompt);
    pair(`(${part.id}).hint`, part.hint);
    pair(`(${part.id}).esplain`, part.esplain);
    (part.memo || []).forEach((b, i) => pair(`(${part.id}).memo[${i}]`, b.text));
  });
  return out;
}

/* ---------- 1. every card, every string: no bare slash left ---------- */
console.log("== 1. bare slashes after fracHtml ==");
let cards = 0, strings = 0;
const offenders = [];
CHAPTERS.forEach(chapterId => {
  examQuestionsForChapter(chapterId).forEach(card => {
    cards++;
    stringsOf(card).forEach(([where, raw]) => {
      strings++;
      const rendered = fracHtml(raw);
      const seen = visibleText(rendered);
      // a "/" between two ordinary WORDS (yes/no, Functions/Equations) is
      // prose and stays a slash by design (fracIsProse in js/ui.js, whole-app
      // sweep 2026-08-23) — only a slash with a non-word on either side counts
      const ok = !seen.replace(/[A-Za-z]{2,}\/[A-Za-z]{2,}/g, "WORDPAIR").includes("/");
      tick(ok, `${card.id} ${where}: a bare "/" survives fracHtml`);
      if (!ok) offenders.push({ id: card.id, where, raw, seen });
    });
  });
});
console.log(`  swept ${cards} cards, ${strings} learner-facing strings`);
if (offenders.length) {
  offenders.forEach(o => {
    console.log(`\n  BARE SLASH — ${o.id} ${o.where}`);
    console.log(`    source  : ${o.raw}`);
    console.log(`    as read : ${o.seen.replace(/\s+/g, " ").trim()}`);
  });
} else {
  console.log("  no bare slashes anywhere — OK");
}

/* ---------- 2. the stacked spans fracHtml produced are well formed ----
   A fraction that stacks but comes out with a missing half is worse
   than a slash, because it looks deliberate. Every .sfrac must carry
   exactly one .sf-n and one .sf-d, and the span count must balance. */
console.log("\n== 2. stacked-fraction shape ==");
let stacked = 0, shapeBad = 0;
CHAPTERS.forEach(chapterId => {
  examQuestionsForChapter(chapterId).forEach(card => {
    stringsOf(card).forEach(([where, raw]) => {
      const rendered = fracHtml(raw);
      const opens = (rendered.match(/<span class="sfrac">/g) || []).length;
      if (!opens) return;
      stacked += opens;
      const ns = (rendered.match(/<span class="sf-n">/g) || []).length;
      const ds = (rendered.match(/<span class="sf-d">/g) || []).length;
      const closes = (rendered.match(/<\/span>/g) || []).length;
      const openAll = (rendered.match(/<span\b/g) || []).length;
      const ok = ns === opens && ds === opens && closes === openAll;
      if (!ok) shapeBad++;
      tick(ok, `${card.id} ${where}: malformed stacked fraction (sfrac=${opens}, sf-n=${ns}, sf-d=${ds}, <span>=${openAll}, </span>=${closes})`);
    });
  });
});
console.log(`  ${stacked} stacked fraction(s) built across the bank — ${shapeBad ? `${shapeBad} malformed` : "all well formed"}`);

/* ---------- 3. the harness can still see a slash ----------------------
   A no-bare-slashes report is only worth having if the detector would
   actually catch one. Two deliberately-broken strings, one that
   fracHtml cannot stack and one hiding inside a tag. */
console.log("\n== 3. detector sanity ==");
{
  const cannotStack = "[ cos(180° − x) · sin(90° + x) ] / cos²(90° + x)";
  tick(visibleText(fracHtml(cannotStack)).includes("/"), "sanity: a genuinely unstackable slash IS reported");
  console.log(`  unstackable sample still shows a slash: ${visibleText(fracHtml(cannotStack)).includes("/")}`);

  const tagOnly = '<span class="sfrac"><span class="sf-n">3</span><span class="sf-d">4</span></span>';
  tick(!visibleText(fracHtml(tagOnly)).includes("/"), "sanity: the closing-tag slashes in a pre-built .sfrac are NOT reported");
  tick(fracHtml(tagOnly) === tagOnly, "sanity: fracHtml leaves a pre-built .sfrac completely alone");
  console.log(`  pre-built .sfrac passes through untouched: ${fracHtml(tagOnly) === tagOnly}`);
}

/* ---------- verdict ---------- */
const ok = passed === total;
console.log(`\n===== ${passed}/${total} checks passed =====`);
if (!ok) {
  console.log("\nFAILS:");
  fails.forEach(f => console.log(`  ${f}`));
  process.exitCode = 1;
}
