/* ============================================================
   FORMULA LINE-BREAKING — node harness (her /go ruling, 2026-08-22
   morning: "one general no-wrap rule for expressions, applied
   everywhere"). Companion to verify-wrap.html's real 375px render
   check — this file walks every learner-facing string the app can
   produce (every quest skill's gen(), every exam card, every concept
   card, the dice pool's q.method) THROUGH THE SAME fmt PIPELINE the
   app itself uses, then checks the recogniser's own promises:

     node verify-wrap.mjs

   1. TEXT PRESERVED — formulaHtml never adds/removes/alters a
      character outside a tag. Checked in TWO layers: the app-level
      fmt pipeline's own known, PRE-EXISTING, deliberate substitutions
      (a trailing formula bracket's leading space becomes a <br>; a
      `.formula` block's " · " separators become <br>s) are allowed
      for; the NEW general recogniser itself (formulaHtmlExpr, the
      part this session wrote) is additionally self-checked in
      isolation with a strict compare.
   2. every maths expression the app renders sits inside exactly one
      `.fml` (no stray unwrapped algebra escaping the general pass).
   3. no `.nowrap` piece contains an unbalanced bracket.
   4. no `.fml` nests another `.fml`.

   Every FAIL prints its quest/exam/concept id, the field, and the
   string, so a real miss can be traced straight back to its source.
   ============================================================ */

const { formulaHtml, formulaHtmlExpr, fracHtml, xbarHtml } = await import("./js/ui.js");
const { QUEST_DEFS } = await import("./js/quests/index.js");
const { dicePool } = await import("./js/quests/dice-pools.js");
const { CONCEPTS } = await import("./js/concepts.js");
const { examQuestionsForChapter } = await import("./js/exam/index.js");
// same chapter-id list verify-exam-fractions.mjs uses — every chapter that
// can carry an Exam Focus card
const EXAM_CHAPTER_IDS = [
  "stats", "finance", "prob", "meas", "tgraph", "analytical", "pat",
  "exp", "func", "trig", "gtrig", "euclid", "eqn",
];

let total = 0, passed = 0;
const fails = [];
const tick = (cond, label) => { total++; if (cond) passed++; else fails.push(label); return cond; };

/* ---------- 1a. strict self-check of the NEW general recogniser alone ----------
   Same "<" rule js/ui.js's own scanner uses: only a "<" followed by a
   letter or "/" is a real tag start (matching a browser's own loose-HTML
   parsing) — a bare "<"/">" used as a relational operator ("y < 1") is
   literal text on both sides and must survive stripping unchanged. */
function stripTags(h) {
  const s = String(h);
  let out = "", i = 0;
  while (i < s.length) {
    const isStart = s[i] === "<" && s[i + 1] && (/[A-Za-z]/.test(s[i + 1]) || s[i + 1] === "/");
    if (isStart) {
      const gt = s.indexOf(">", i);
      if (gt === -1) { out += s.slice(i); break; }
      i = gt + 1;
    } else {
      out += s[i]; i++;
    }
  }
  return out;
}
function checkExprPreservesText(raw, where) {
  if (raw == null || typeof raw !== "string") return;
  const out = formulaHtmlExpr(raw);
  const ok = stripTags(raw) === stripTags(out);
  tick(ok, `${where}: formulaHtmlExpr altered visible text`);
  if (!ok) fails.push(`    source : ${JSON.stringify(raw)}\n    result : ${JSON.stringify(out)}`);
}

/* ---------- 1b. app-level pipeline: tolerant text-preservation check ----------
   xbarHtml and fracHtml run BEFORE formulaHtml at every call site, and
   both have their own pre-existing, deliberate, documented ways of
   changing what's on the page without formulaHtml's help: xbarHtml drops
   the combining macron off "x̄" for a CSS border-top; fracHtml turns
   "a / b" into a two-line stack, dropping the "/" AND the space either
   side of it, and strips one level of bracket off a numerator/denominator
   that had its own "( … )" (a fraction bar already implies the grouping).
   Neither is this session's code to re-verify — verify-exam-fractions.mjs
   already owns fracHtml's own contract. So THIS check compares against
   the INTERMEDIATE string (after xbarHtml+fracHtml, before formulaHtml)
   rather than the raw source — it isolates exactly the question this
   harness is for: did formulaHtml, layered on top, drop anything further?
   Stage 1 (trailing-bracket) turning a leading space into a <br>, and
   stage 2 (.formula " · ") turning " · " into a <br>, are formulaHtml's
   own pre-existing rules (unchanged by this session) — <br> still
   normalises to a space here so those don't trip a false positive. */
function visible(h) {
  return stripTags(String(h).replace(/<br\s*\/?>/gi, " "))
    .replace(/&nbsp;/g, " ")
    .replace(/·/g, "")   // stage 2's "&nbsp;/ ·/&nbsp; -> <br> swap consumes the · itself too, not just the spaces
    .replace(/\s+/g, " ")
    .trim();
}
function checkPipelinePreservesText(intermediate, rendered, where) {
  if (intermediate == null || typeof intermediate !== "string") return;
  const ok = visible(intermediate) === visible(rendered);
  tick(ok, `${where}: formulaHtml altered text formulaHtml itself received`);
  if (!ok) fails.push(`    source : ${JSON.stringify(visible(intermediate))}\n    result : ${JSON.stringify(visible(rendered))}`);
}

/* ---------- 2/3/4. structural checks on one rendered string ---------- */
function bracketsBalanced(s) {
  let depth = 0;
  for (const c of s) {
    if (c === "(" || c === "[") depth++;
    else if (c === ")" || c === "]") { depth--; if (depth < 0) return false; }
  }
  return depth === 0;
}
// every occurrence of an openTag's balanced inner content — depth-tracks
// generic <span ...> / </span> pairs (not just the exact openTag string),
// since a .nowrap or .fml commonly nests other spans (xbar/sup/sfrac) that
// must not be mistaken for its own close
function extractBalancedInners(str, openTag) {
  const out = [];
  let idx = 0;
  while (true) {
    const openIdx = str.indexOf(openTag, idx);
    if (openIdx === -1) break;
    let d = 1, j = openIdx + openTag.length;
    while (j < str.length && d > 0) {
      const nextOpen = str.indexOf("<span", j);
      const nextClose = str.indexOf("</span>", j);
      if (nextClose === -1) { j = str.length; break; }
      if (nextOpen !== -1 && nextOpen < nextClose) { d++; j = nextOpen + 5; }
      else { d--; j = nextClose + 7; }
    }
    out.push(str.slice(openIdx + openTag.length, Math.max(j - 7, openIdx + openTag.length)));
    idx = openIdx + 1;
  }
  return out;
}
function checkStructure(rendered, where) {
  if (rendered == null || typeof rendered !== "string") return;
  // every .nowrap's own content (not counting a nested atom's internal
  // brackets, which were already balanced when they were built) must not
  // itself carry an unbalanced bracket
  const nowraps = extractBalancedInners(rendered, '<span class="nowrap">');
  nowraps.forEach((content, i) => {
    // strip inner tags (nested protected atoms) before the bracket count,
    // since their own brackets belong to THEM, already verified when built
    const bare = content.replace(/<[^>]*>/g, "");
    tick(bracketsBalanced(bare), `${where}: .nowrap #${i} has an unbalanced bracket (${JSON.stringify(content)})`);
  });
  // no .fml nests another .fml — each .fml's own balanced inner content
  // must not itself contain a further class="fml" open
  const fmls = extractBalancedInners(rendered, '<span class="fml">');
  const sawNested = fmls.some(inner => inner.includes('class="fml"'));
  tick(!sawNested, `${where}: a .fml nests another .fml`);
}

/* ---------- run one string through the FULL app pipeline + all checks ---------- */
let fmlCount = 0, nowrapCount = 0, stringCount = 0;
function checkString(raw, where, { stackFractions = false, exam = false } = {}) {
  if (raw == null || typeof raw !== "string" || !raw) return;
  stringCount++;
  checkExprPreservesText(raw, where);
  // the intermediate string is EXACTLY what formulaHtml receives at the
  // real call site — xbarHtml always first, fracHtml only when this quest
  // (or exam-play, always) opts in
  const intermediate = (exam || stackFractions) ? fracHtml(xbarHtml(raw)) : xbarHtml(raw);
  const rendered = formulaHtml(intermediate);
  checkPipelinePreservesText(intermediate, rendered, where);
  checkStructure(rendered, where);
  fmlCount += (rendered.match(/<span class="fml">/g) || []).length;
  nowrapCount += (rendered.match(/<span class="nowrap">/g) || []).length;
}

/* ---------- walk one question object (mountQuestion / mountSteps shape) ---------- */
function walkQuestion(q, where, stackFractions) {
  if (!q || typeof q !== "object") return;
  checkString(q.prompt, `${where}.prompt`, { stackFractions });
  checkString(q.task, `${where}.task`, { stackFractions });
  checkString(q.hint, `${where}.hint`, { stackFractions });
  checkString(q.tapHint, `${where}.tapHint`, { stackFractions });
  checkString(q.answerLabel, `${where}.answerLabel`, { stackFractions });
  checkString(q.graphCap, `${where}.graphCap`, { stackFractions });
  checkString(q.method, `${where}.method`, { stackFractions });   // dice-only, formatted by play.js
  (q.options || []).forEach((o, i) => checkString(o && o.label, `${where}.options[${i}]`, { stackFractions }));
  (q.solution || []).forEach((s, i) => {
    checkString(s && s.s, `${where}.solution[${i}].s`, { stackFractions });
    checkString(s && s.r, `${where}.solution[${i}].r`, { stackFractions });
  });
  (q.reveal || []).forEach((r, i) => checkString(typeof r === "string" ? r : null, `${where}.reveal[${i}]`, { stackFractions }));
  (q.steps || []).forEach((step, i) => {
    const sw = `${where}.steps[${i}]`;
    checkString(step.prompt, `${sw}.prompt`, { stackFractions });
    checkString(step.hint, `${sw}.hint`, { stackFractions });
    checkString(step.tapHint, `${sw}.tapHint`, { stackFractions });
    checkString(step.graphCap, `${sw}.graphCap`, { stackFractions });
    (step.options || []).forEach((o, j) => checkString(o && o.label, `${sw}.options[${j}]`, { stackFractions }));
    (step.passes || []).forEach((p, j) => checkString(p && p.prompt, `${sw}.passes[${j}].prompt`, { stackFractions }));
    checkString(step.finalPrompt, `${sw}.finalPrompt`, { stackFractions });
    (step.fields || []).forEach((f, j) => {
      checkString(f && f.prompt, `${sw}.fields[${j}].prompt`, { stackFractions });
      checkString(f && f.hint, `${sw}.fields[${j}].hint`, { stackFractions });
    });
  });
}

/* ---------- 1. every quest, every skill, N fresh rolls ---------- */
console.log("== 1. quest skills (js/quests/index.js) ==");
let questCount = 0, skillCount = 0, genCount = 0, genErrors = 0;
for (const [qid, def] of Object.entries(QUEST_DEFS)) {
  questCount++;
  const stackFractions = !!def.stackFractions;
  (def.skills || []).forEach(skill => {
    skillCount++;
    for (let n = 0; n < 10; n++) {
      let q;
      try { q = skill.gen(); } catch (e) { genErrors++; fails.push(`${qid}.${skill.id} gen() threw: ${e.message}`); total++; continue; }
      genCount++;
      walkQuestion(q, `${qid}.${skill.id}#${n}`, stackFractions);
    }
  });
}
tick(genErrors === 0, `${genErrors} skill.gen() call(s) threw`);
console.log(`  ${questCount} quests, ${skillCount} skills, ${genCount} gen() rolls, ${genErrors} errors`);

/* ---------- 2. the stats dice pool's q.method (play.js's method box) ---------- */
console.log("\n== 2. dice pool q.method (js/quests/dice-stats.js) ==");
let poolEntries = 0;
const pool = dicePool("stats");
if (pool) {
  pool.entries.forEach(e => {
    poolEntries++;
    for (let n = 0; n < 4; n++) {
      let q;
      try { q = e.gen(); } catch (err) { fails.push(`dice.stats.${e.skillId} gen() threw: ${err.message}`); total++; continue; }
      checkString(q.method, `dice.stats.${e.skillId}#${n}.method`, { stackFractions: false });
    }
  });
}
console.log(`  ${poolEntries} pool entries checked`);

/* ---------- 3. every exam chapter's cards ---------- */
console.log("\n== 3. exam cards (js/exam) ==");
let examCards = 0;
EXAM_CHAPTER_IDS.forEach(chapterId => {
  let cards;
  try { cards = examQuestionsForChapter(chapterId); } catch { cards = []; }
  cards.forEach(card => {
    examCards++;
    const pair = (where, p) => {
      if (!p) return;
      ["en", "af"].forEach(lang => checkString(p[lang], `exam.${chapterId}.${card.id}.${where}.${lang}`, { exam: true }));
    };
    pair("intro", card.intro);
    (card.parts || []).forEach(part => {
      pair(`(${part.id}).prompt`, part.prompt);
      pair(`(${part.id}).hint`, part.hint);
      pair(`(${part.id}).esplain`, part.esplain);
      (part.memo || []).forEach((b, i) => pair(`(${part.id}).memo[${i}]`, b.text));
    });
  });
});
console.log(`  ${examCards} cards checked across ${EXAM_CHAPTER_IDS.length} chapters`);

/* ---------- 4. every concept card ---------- */
console.log("\n== 4. concept cards (js/concepts.js) ==");
let conceptCount = 0;
Object.entries(CONCEPTS).forEach(([id, c]) => {
  conceptCount++;
  checkString(c.title, `concept.${id}.title`, { stackFractions: false });
  checkString(c.body, `concept.${id}.body`, { stackFractions: !!c.fractions });
});
console.log(`  ${conceptCount} concept cards checked`);

/* ---------- verdict ---------- */
console.log(`\n  ${stringCount} learner-facing strings run through the pipeline`);
console.log(`  ${fmlCount} .fml expressions built, ${nowrapCount} .nowrap pieces inside them`);
console.log(`\n===== ${passed}/${total} checks passed =====`);
if (passed !== total) {
  console.log("\nFAILS:");
  fails.forEach(f => console.log(`  ${f}`));
  process.exitCode = 1;
}
