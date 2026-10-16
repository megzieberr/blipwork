#!/usr/bin/env node
/* ============================================================
   af_check.mjs: is every maths string twinned, and is each Afrikaans twin
   safe to ship? (AFRIKAANS-PLAN.md pipeline step 4; QUEUE.md row S3,
   2026-10-17). Reads the FILES, never the tables: the file is the record.

     node tools/af_check.mjs [--unit <row> [--dir <tabledir>]] [--all] [--strict] [--json]
                             [--verbose] [--as <repo path>] <file> [<file> ...]

   Items are exactly what tools/af_extract.mjs finds (its parser and item
   walker, imported). A twin is the second argument of L(en, af) / afL(en,
   af) (L from js/lang.js), an exam `af:` beside `en:`, or, read-only for
   js/funfun/ files, Fun Functions' B(en, af).

     <file> ...      every item must have a twin (missing = ERROR)
     --unit <row>    the files listed in briefs/af/<row>.en.json (missing = ERROR;
                     --dir reads the table from elsewhere, like af_inject).
                     The night routine runs this after inject; it must exit 0.
     --all           every content file (contentFiles() below; not js/funfun/):
                     the ship-time DEBT REPORT. Missing twins are counted per
                     file (lines only with --verbose); other findings are listed.
                     Exits 0 (a report never blocks a ship) unless --strict.
     --strict        WARNs count as errors (printed as ERROR); with --all: exit 1
                     on any ERROR other than missing.
     --json          also writes the report to tools/_out/af_check.json
     --as <path>     one file only: check it as if it sat at <path> (exam /
                     funfun / hub mode and import resolution follow <path>);
                     for test copies in tools/_out/.
   Exit: 0 clean, 1 any ERROR (see --all), 2 usage / unreadable file.

   Findings print as  ERROR|WARN <rule> <key> <file:line> [detail] <snippet>
   grouped per file, a counts line per file, a totals line at the end.
   The rules (tools/AF-TOOLS.md has the same list):
     missing        an item with no twin                           ERROR (debt in --all)
     placeholders   template ${...} sequence differs (quoted text
                    inside a placeholder may be translated; the code
                    around it must be identical); af template does not
                    parse; a plain string with ${                   ERROR
     tags           HTML tags, entities, ✓ / ✓ca / ✗ ticks differ   ERROR
     english-leak   an English word from STOP_WORDS in the af side  WARN
                    (ERROR when af == en byte for byte, en has 3+
                    words and the item is not data: an untranslated copy)
     wording:<id>   her rulings, the RULES table below              ERROR / WARN
     length         visible af/en > 1.6 with en >= 12 chars         WARN (360 px)
     must-equal     an item also used as data whose af differs      ERROR
     numbers        digit runs differ (decimal comma/point and
                    thousands spaces normalised)                    WARN
   and two housekeeping ones: af-conflict (same English, different af in
   two places: WARN), af-not-literal (a twin that is not a literal, so it
   cannot be checked: WARN). A file that does not parse is ERROR parse.
   ============================================================ */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import * as acorn from "acorn";
import * as walk from "acorn-walk";
import {
  REPO, TOOLS, extractFile, isLit, isStr, rawOf, propOf, repoRel, resolveFile,
  isFunfunFile, dataUse, wordCount,
} from "./af_extract.mjs";

/* ---------------- STOP_WORDS (rule english-leak) ----------------
   English words that are NOT also Afrikaans words. Lower case, 3+ letters.
   NEVER add a word that is also Afrikaans (is, in, was, so, of, my, as,
   die, en, dit, term, formule, data, plus, minus, volume, water, hand,
   arm, pen ...). Left out of the S3 starting list on that ground: area,
   top, here, tap (all real Afrikaans words). */
export const STOP_WORDS = new Set([
  "the", "and", "you", "your", "this", "that", "these", "those", "with", "from", "into", "for",
  "than", "then", "which", "what", "where", "when", "why", "how", "each", "every", "both", "only",
  "also", "again", "there", "because", "same", "first", "second", "third", "next", "previous",
  "before", "after", "between", "answer", "calculate", "determine", "solve", "show", "write",
  "give", "find", "hence", "read", "check", "look", "work", "drag", "choose", "pick", "fill",
  "difference", "pattern", "value", "graph", "number", "line", "point", "points", "side", "angle",
  "equation", "root", "roots", "square", "triangle", "circle", "length", "height", "width",
  "interest", "rate", "year", "years", "month", "months", "day", "days", "has", "have", "does",
  "not", "are", "were", "will", "would", "should", "could", "more", "less", "left", "right",
  "bottom", "many", "much", "down", "about", "without", "through", "always", "never", "still",
  "just",
  /* added in S3 (plain English, not Afrikaans) */
  "they", "them", "their", "its", "our", "can", "cannot", "must", "need", "use", "using", "make",
  "get", "means", "yes", "true", "false",
]);

/* ---------------- RULES (rule wording:<id>): her wording rulings ----------------
   Extend this table (row G2), never the code below it.
     re    tested on the af side; `on`: "prose" = tags and entities masked,
           "raw" = tags kept; ${...} code is never tested; `inner: true` also
           tests the quoted strings inside the af side's ${...}.
     skip  (text, index, match, ctx) => true leaves that match alone.
     pair  (en, af) => { at, detail } | null, for rules that compare sides
           (en / af = { prose, all } texts; `at` indexes af.prose). */
const PROSE_NUM_REF = /(?:Vraag|vraag|Question|question|Opdrag|opdrag|Stap|stap|Vr\.|V|Q)\s*$/;
export const RULES = [
  { id: "frase", sev: "ERROR", re: /(?<!\p{L})frases?(?!\p{L})/giu, on: "prose", inner: true,
    why: 'no "frase" (her ruling)' },
  { id: "em-dash", sev: "ERROR", re: /\u2014/g, on: "prose", inner: true,
    why: "no em-dashes: a comma or a colon instead" },
  { id: "en-dash", sev: "ERROR", re: /(?:^|\s)\u2013(?=\s|$)/g, on: "prose", inner: true,
    why: "an en-dash used as a dash ( – ): a comma or a colon instead (3–5 ranges are fine)" },
  { id: "decimal-point", sev: "ERROR", re: /\d\.\d/g, on: "prose", inner: false,
    why: "decimal comma in Afrikaans (0,5 not 0.5)",
    /* question numbers (Vraag 3.1, 1.2.3) are not decimals */
    skip: (text, i) => {
      let a = i; while (a > 0 && /[\d.]/.test(text[a - 1])) a--;
      let b = i; while (b < text.length && /[\d.]/.test(text[b])) b++;
      const tok = text.slice(a, b).replace(/\.$/, "");
      return (tok.match(/\./g) || []).length >= 2 || PROSE_NUM_REF.test(text.slice(Math.max(0, a - 10), a));
    } },
  { id: "trig-name", sev: "ERROR", re: /(?<!\p{L})(?:kot|kosek|sek)(?!\p{L})/giu, on: "prose", inner: true,
    why: "trig names stay English: cot, cosec, sec",
    /* "30 sek" is seconds, not secant */
    skip: (text, i, m) => /^sek$/i.test(m) && /\d\s*$/.test(text.slice(0, i)) },
  { id: "weerkaatsing", sev: "ERROR", re: /weerkaats/giu, on: "prose", inner: true,
    why: 'apps say "refleksie" (papers say weerkaatsing)' },
  { id: "inverse-trig", sev: "ERROR", on: "raw", inner: true,
    re: /(?:sin|cos|tan)\s*(?:\u207b\u00b9|\^\s*\(?\s*[-\u2212]\s*1|<sup>\s*[-\u2212]\s*1\s*<\/sup>)/gi,
    why: "SHIFT tan, never tan⁻¹" },
  { id: "unsure-marker", sev: "ERROR", re: /\?\?[^?\s][^?]*?\?\?/g, on: "prose", inner: true,
    why: "a translator's ??term?? marker is still in the text" },
  { id: "formal-u", sev: "WARN", re: /(?<![\p{L}\p{N}])[uU](?![\p{L}\p{N}'’])/gu, on: "prose", inner: true,
    why: 'she writes "jy", not the formal "u"',
    /* u as a variable: the English has it too, or maths sits beside it */
    skip: (text, i, m, ctx) => /(?<![\p{L}\p{N}])u(?![\p{L}\p{N}])/u.test(ctx.en.all) ||
      /^\s*[=+\-−*/²³^)<>≤≥,;]/.test(text.slice(i + 1)) || /[=+\-−*/(]\s*$/.test(text.slice(0, i)) },
  { id: "real-minus", sev: "WARN", why: "real minus (−, U+2212) where the English has one",
    pair: (en, af) => {
      const enNeg = new Set([...en.prose.matchAll(/\u2212\s?(\d+)/g)].map((m) => m[1]));
      const hits = [...af.prose.matchAll(/(?<![\p{L}\p{N}])-(\d+)/gu)].filter((m) => enNeg.has(m[1]));
      return hits.length ? { at: hits[0].index, detail: hits.map((m) => m[0]).join(" ") } : null;
    } },
  { id: "intervalle", sev: "WARN", why: 'number-line pieces are "intervalle"',
    pair: (en, af) => /interval/i.test(en.all) && !/interval/i.test(af.all) ? { at: 0, detail: "en says interval" } : null },
  { id: "trek-not-sleep", sev: "WARN", why: 'she says "trek", not "sleep"',
    pair: (en, af) => {
      if (!/(?<!\p{L})drag/iu.test(en.all)) return null;
      const m = /sleep/iu.exec(af.prose);
      return m ? { at: m.index, detail: "sleep" } : null;
    } },
];

/* ---------------- the content files (--all) ----------------
   Every file a translation row can name: hub tiles + concepts, the libs
   with learner prose, every hub round / helper / dice file, every exam
   file. js/funfun/ is not Blipwork's debt (GENERATED, already bilingual);
   js/lang.js, js/exam/lang.js (UI chrome), js/exam/_harness-stub.js (never
   registered, verify-exam only) and the quest/exam loaders are
   not content. */
const NOT_CONTENT = new Set(["js/lang.js", "js/exam/lang.js", "js/exam/_harness-stub.js", "js/quests/index.js", "js/quests/load.js",
  "js/exam/index.js", "js/exam/load.js"]);
export function contentFiles() {
  const out = [];
  const add = (rel) => { if (!NOT_CONTENT.has(rel) && fs.existsSync(path.join(REPO, rel))) out.push(path.join(REPO, rel)); };
  const dir = (rel, test = (f) => f.endsWith(".js")) => {
    const d = path.join(REPO, rel);
    if (fs.existsSync(d)) fs.readdirSync(d).filter(test).sort().forEach((f) => add(`${rel}/${f}`));
  };
  add("js/config.js");
  add("js/concepts.js");
  dir("js/concepts");
  dir("js", (f) => /lib\.js$/.test(f));
  dir("js/quests");
  dir("js/exam");
  return out;
}

/* ---------------- text views ---------------- */
const PH = "\ue000";                                   // a ${...} placeholder in a cooked text
const TAG_NAMES = "a|abbr|b|big|blockquote|br|button|code|del|div|em|font|h[1-6]|hr|i|img|ins|kbd|label|li|mark|" +
  "ol|p|pre|q|s|small|span|strike|strong|sub|sup|svg|table|tbody|td|th|thead|tr|tt|u|ul|wbr|math|mi|mn|mo|mrow|msup|msub|mfrac|msqrt";
const TAG_RE = new RegExp(`</?(?:${TAG_NAMES})(?=[\\s/>])[^<>]*>`, "gi");
const ENTITY_RE = /&(?:[a-zA-Z][a-zA-Z0-9]*|#[0-9]+|#x[0-9a-fA-F]+);/g;
const TICK_RE = /✓ca|✓|✗/g;
const mask = (s, re) => s.replace(re, (m) => " ".repeat(m.length));      // positions kept
const proseOf = (s) => mask(mask(s, TAG_RE), ENTITY_RE);

/* the placeholder's source with every quoted string / template text blanked */
function blankQuotes(text, e) {
  const cuts = [];
  walk.full(e, (n) => {
    if (n.type === "Literal" && typeof n.value === "string") cuts.push([n.start, n.end, '""']);
    else if (n.type === "TemplateElement") cuts.push([n.start, n.end, ""]);
  });
  cuts.sort((a, b) => b[0] - a[0]);
  let src = text.slice(e.start, e.end);
  for (const [s, en, t] of cuts) src = src.slice(0, s - e.start) + t + src.slice(en - e.start);
  return src.replace(/\r\n/g, "\n");
}
/* { kind, raw, outer (cooked, ${...} = PH), inner (quoted strings inside ${...}), phs } */
function viewOf(text, node) {
  const raw = rawOf(text, node);
  if (isStr(node)) return { node, kind: "string", raw, outer: node.value, inner: [], phs: [] };
  const parts = [];
  node.quasis.forEach((q, i) => { parts.push(q.value.cooked ?? q.value.raw); if (i < node.expressions.length) parts.push(PH); });
  const inner = [];
  for (const e of node.expressions) {
    walk.full(e, (n) => {
      if (n.type === "Literal" && typeof n.value === "string") inner.push(n.value);
      else if (n.type === "TemplateElement") inner.push(n.value.cooked ?? n.value.raw);
    });
  }
  return { node, kind: "template", raw, outer: parts.join(""), inner: inner.filter((s) => /\p{L}/u.test(s)), phs: node.expressions.map((e) => blankQuotes(text, e)) };
}
const visible = (v) => proseOf(v.outer).split(PH).join(" ").replace(/\s+/g, " ").trim();
const cpLen = (s) => Array.from(s).length;
function parsesAsTemplate(raw) {
  try {
    const n = acorn.parseExpressionAt("`" + raw + "`", 0, { ecmaVersion: "latest" });
    return n.type === "TemplateLiteral" && n.end === raw.length + 2;
  } catch { return false; }
}
function snippet(text, at = 0) {
  const s = Math.max(0, at - 30);
  let out = text.slice(s, s + 86);
  const cut = s + 86 < text.length;
  out = (s > 0 ? "…" : "") + out.split(PH).join("${…}") + (cut ? "…" : "");
  out = out.replace(/\r?\n/g, "⏎").replace(/\s{2,}/g, " ");
  return out.length > 90 ? out.slice(0, 89) + "…" : out;
}
const numbersOf = (s) => {
  let t = proseOf(s).split(PH).join(" ");
  t = t.replace(/(\d)[ \u00a0\u2009\u202f](?=\d{3}(?!\d))/g, "$1").replace(/(\d)[.,](?=\d)/g, "$1.");
  return (t.match(/\d+(?:\.\d+)*/g) || []).sort();
};

/* ---------------- one twin pair: rules 2 to 8 ---------------- */
function checkPair(en, af, item, push) {
  const enText = { prose: proseOf(en.outer), all: [en.outer, ...en.inner].join(" ") };
  const afText = { prose: proseOf(af.outer), all: [af.outer, ...af.inner].join(" ") };

  /* 2. placeholders */
  if (en.kind === "template" || af.kind === "template") {
    const a = en.phs, b = af.phs;
    if (a.length !== b.length) push("ERROR", "placeholders", `en has ${a.length} \${...}, af has ${b.length}`, af.outer, af.outer.indexOf(PH));
    else {
      const i = a.findIndex((x, k) => x !== b[k]);
      if (i >= 0) push("ERROR", "placeholders", `\${${b[i].slice(0, 30)}} should be \${${a[i].slice(0, 30)}}`, af.outer, af.outer.split(PH, i + 1).join(PH).length);
    }
    if (af.kind === "template" && !parsesAsTemplate(af.raw)) push("ERROR", "placeholders", "af template does not parse", af.raw, 0);
  }
  if (af.kind === "string" && af.raw.includes("${")) push("ERROR", "placeholders", "a plain string with ${ (shows literally)", af.raw, af.raw.indexOf("${"));

  /* 3. tags, entities, ticks */
  for (const [what, re] of [["tags", TAG_RE], ["entities", ENTITY_RE], ["ticks", TICK_RE]]) {
    const x = en.outer.match(re) || [], y = af.outer.match(re) || [];
    if (x.join("\u0001") !== y.join("\u0001")) {
      const i = x.findIndex((t, k) => t !== y[k]);
      const at = i >= 0 && i < y.length ? af.outer.indexOf(y[i]) : 0;
      push("ERROR", "tags", `${what}: en ${x.join("") || "none"} | af ${y.join("") || "none"}`.slice(0, 80), af.outer, Math.max(0, at));
    }
  }

  /* 4. english-leak */
  const words = [];
  let first = -1;
  for (const m of afText.prose.matchAll(/\p{L}+/gu)) {
    const w = m[0];
    if (w.length < 3 || !/^[A-Za-z]+$/.test(w) || w === w.toUpperCase()) continue;
    if (STOP_WORDS.has(w.toLowerCase())) { if (first < 0) first = m.index; if (!words.includes(w.toLowerCase())) words.push(w.toLowerCase()); }
  }
  if (words.length) {
    const copy = af.raw === en.raw && wordCount(en.node) >= 3 && !item.data;
    push(copy ? "ERROR" : "WARN", "english-leak", (copy ? "untranslated copy: " : "") + words.join(", "), af.outer, first);
  }

  /* 5. wording */
  const ctx = { en: enText, af: afText, item };
  for (const r of RULES) {
    if (r.pair) {
      const hit = r.pair(enText, afText);
      if (hit) push(r.sev, `wording:${r.id}`, hit.detail, af.outer, hit.at);
      continue;
    }
    const texts = [r.on === "raw" ? af.outer : afText.prose, ...(r.inner ? af.inner.map((s) => r.on === "raw" ? s : proseOf(s)) : [])];
    let n = 0, at = -1, where = null;
    for (const t of texts) {
      for (const m of t.matchAll(r.re)) {
        const i = m.index + (m[0].length - m[0].trimStart().length);
        if (r.skip && r.skip(t, i, m[0].trim(), ctx)) continue;
        if (n++ === 0) { at = i; where = t; }
      }
    }
    if (n) push(r.sev, `wording:${r.id}`, n > 1 ? `×${n}` : "", where, at);
  }

  /* 6. length */
  const ve = visible(en), va = visible(af);
  if (cpLen(ve) >= 12 && cpLen(va) / cpLen(ve) > 1.6) push("WARN", "length", `af/en ${(cpLen(va) / cpLen(ve)).toFixed(2)} (${cpLen(va)}/${cpLen(ve)})`, af.outer, 0);

  /* 7. data: must equal */
  if (item.data && af.raw !== en.raw) push("ERROR", "must-equal", "also used as data: keep the af equal to the English", af.outer, 0);

  /* 8. numbers */
  const ne = numbersOf(en.outer), na = numbersOf(af.outer);
  if (ne.join(" ") !== na.join(" ")) {
    const left = [...ne], extra = [];
    for (const x of na) { const k = left.indexOf(x); if (k >= 0) left.splice(k, 1); else extra.push(x); }
    push("WARN", "numbers", `en only: ${left.join(" ") || "-"} | af only: ${extra.join(" ") || "-"}`.slice(0, 80), af.outer, 0);
  }
}

/* ---------------- one file ---------------- */
function afNodeOf(s) {
  if (s.cls === "L0") { const a = s.parent.arguments[1]; return a ? (isLit(a) ? a : "nonlit") : null; }
  if (s.cls === "pairEn") { const p = propOf(s.grand, "af"); return p ? (isLit(p.value) ? p.value : "nonlit") : null; }
  return null;
}
export function checkFile(abs, opts = {}) {
  const where = opts.as || abs;
  const rel = repoRel(abs), stem = path.basename(where).replace(/\.m?js$/, "");
  const res = { file: rel, as: opts.as ? repoRel(opts.as) : undefined, items: 0, twins: 0, missing: 0, errors: 0, warns: 0, findings: [] };
  let r;
  try { r = extractFile(abs, { as: opts.as, funfun: isFunfunFile(where) }); }
  catch (e) {
    res.findings.push({ sev: "ERROR", rule: "parse", key: "-", line: e.loc ? e.loc.line : 0, detail: e.message.slice(0, 80), snippet: "" });
    res.errors++;
    return res;
  }
  const text = r.A.text;
  res.items = r.items.length;
  r.items.forEach((it, idx) => {
    const key = `${stem}#${idx + 1}`;
    const item = { key, data: it._sites.some((s) => s.data || (s.cls === "L0" && dataUse(s.parent, s.grand))) };
    const add = (sev, rule, line, detail, snip) => res.findings.push({ sev, rule, key, line, detail, snippet: snip });
    const afs = it._sites.map((s) => ({ s, af: afNodeOf(s) }));
    const without = afs.filter((x) => !x.af);
    if (without.length) {
      res.missing++;
      add("ERROR", "missing", without[0].s.line, without.length < afs.length ? `${without.length} of ${afs.length} places` : "", snippet(viewOf(text, without[0].s.node).outer));
      if (without.length === afs.length) return;
    } else res.twins++;
    const groups = new Map();
    for (const { s, af } of afs) {
      if (!af) continue;
      if (af === "nonlit") { add("WARN", "af-not-literal", s.line, "the twin is not a literal; not checked", snippet(viewOf(text, s.node).outer)); continue; }
      const raw = rawOf(text, af);
      if (!groups.has(raw)) groups.set(raw, { s, af });
    }
    if (groups.size > 1) {
      const [, b] = [...groups.values()];
      add("WARN", "af-conflict", b.af.loc.start.line, `${groups.size} different af texts for one English`, snippet(viewOf(text, b.af).outer));
    }
    for (const { s, af } of groups.values()) {
      const en = viewOf(text, s.node), afv = viewOf(text, af);
      checkPair(en, afv, item, (sev, rule, detail, from, at) => add(sev, rule, af.loc.start.line, detail, snippet(from, Math.max(0, at))));
    }
  });
  res.findings.sort((a, b) => a.line - b.line);
  return res;
}

/* ---------------- the CLI ---------------- */
function parseArgs(argv) {
  const o = { unit: null, dir: path.join(REPO, "briefs", "af"), all: false, strict: false, json: false, verbose: false, as: null, files: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--unit") o.unit = argv[++i];
    else if (a === "--dir") o.dir = path.resolve(argv[++i]);
    else if (a === "--all") o.all = true;
    else if (a === "--strict") o.strict = true;
    else if (a === "--json") o.json = true;
    else if (a === "--verbose") o.verbose = true;
    else if (a === "--as") o.as = argv[++i];
    else if (a.startsWith("--")) { console.error(`af_check: unknown option ${a}`); process.exit(2); }
    else o.files.push(a);
  }
  return o;
}
const USAGE = "usage: node tools/af_check.mjs [--unit <row> [--dir <tabledir>]] [--all] [--strict] [--json] [--verbose] [--as <repo path>] <file> [<file> ...]";

function main() {
  const o = parseArgs(process.argv.slice(2));
  /* missing is an ERROR for unit files and named files; debt in the --all sweep */
  const strictMissing = new Set();
  let files = [];
  if (o.unit) {
    const p = path.join(o.dir, `${o.unit}.en.json`);
    if (!fs.existsSync(p)) { console.error(`af_check: no table ${repoRel(p)} (run af_extract --unit ${o.unit} first)`); process.exit(2); }
    for (const f of JSON.parse(fs.readFileSync(p, "utf8")).files) { const a = path.join(REPO, f); files.push(a); strictMissing.add(a); }
  }
  for (const f of o.files) {
    const a = resolveFile(f);
    if (!a) { console.error(`af_check: no such file: ${f}`); process.exit(2); }
    files.push(a); strictMissing.add(a);
  }
  if (o.all) files.push(...contentFiles());
  files = [...new Set(files)];
  if (!files.length) { console.error(USAGE); process.exit(2); }
  let asAbs = null;
  if (o.as) {
    if (files.length !== 1 || o.all || o.unit) { console.error("af_check: --as takes exactly one file"); process.exit(2); }
    asAbs = path.resolve(REPO, o.as);
  }

  const results = [];
  const tot = { files: 0, items: 0, twins: 0, missing: 0, errors: 0, warns: 0 };
  for (const abs of files) {
    const res = checkFile(abs, { as: asAbs });
    const debt = !strictMissing.has(abs);
    res.debt = debt;
    for (const f of res.findings) {
      if (f.rule === "missing") { f.sev = debt ? "DEBT" : "ERROR"; continue; }
      if (o.strict && f.sev === "WARN") { f.sev = "ERROR"; f.strict = true; }
    }
    res.errors = res.findings.filter((f) => f.sev === "ERROR").length;
    res.warns = res.findings.filter((f) => f.sev === "WARN").length;
    results.push(res);
    tot.files++; for (const k of ["items", "twins", "missing", "errors", "warns"]) tot[k] += res[k];

    const shown = res.findings.filter((f) => f.sev !== "DEBT" || o.verbose);
    if (o.all && !res.items && !res.findings.length) continue;
    console.log(res.file + (res.as ? `  (checked as ${res.as})` : "") + (isFunfunFile(asAbs || abs) ? "  (Fun Functions, read-only: B(en, af) pairs)" : ""));
    for (const f of shown) {
      const sev = f.sev === "DEBT" ? "DEBT " : f.sev === "WARN" ? "WARN " : "ERROR";
      console.log(`  ${sev} ${f.rule} ${f.key} ${res.file}:${f.line}${f.detail ? ` [${f.detail}]` : ""} ${f.snippet}`);
    }
    console.log(`  items ${res.items} / twins ${res.twins} / missing ${res.missing}${debt && res.missing ? " (debt)" : ""} / errors ${res.errors} / warns ${res.warns}`);
  }
  const errs = tot.errors;
  const report = o.all && !o.strict;
  const code = report ? 0 : errs ? 1 : 0;
  console.log(`af_check: ${tot.files} file${tot.files === 1 ? "" : "s"} · items ${tot.items} / twins ${tot.twins} / missing ${tot.missing} / errors ${tot.errors} / warns ${tot.warns}` +
    (report ? " · debt report: exit 0" : code ? " · RED: exit 1" : " · clean: exit 0"));
  if (o.json) {
    const out = path.join(TOOLS, "_out", "af_check.json");
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, JSON.stringify({ generated: new Date().toISOString(), argv: process.argv.slice(2), totals: tot, exit: code, files: results }, null, 2) + "\n", "utf8");
    console.log(`af_check: wrote ${repoRel(out)}`);
  }
  process.exit(code);
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) main();
