#!/usr/bin/env node
/* ============================================================
   af_glossary_apply.mjs: when Megan retires a word, replace it in every
   Afrikaans side already done, so early chapters never fall behind her
   later rulings (AFRIKAANS-PLAN.md pipeline step 6; QUEUE.md row S3,
   2026-10-17).

     node tools/af_glossary_apply.mjs [--glossary <path>] [--write] [--as <repo path>] [--all | <file> ...]

   Reads AF-GLOSSARY.md (repo root; row S5 writes it) in this shape:

     # AF-GLOSSARY.md — Blipwork Afrikaans terms (her word is law; one line per term)
     ## Terms
     | English | Afrikaans | Note | Retired |
     |---|---|---|---|
     | reflection | refleksie | apps say refleksie; papers say weerkaatsing | weerkaatsing |
     | interval | interval, intervalle | number-line pieces | stuk; deel |
     ## Rules
     - ...

   Columns are found by their header names (English, Afrikaans, Retired),
   so their order may change. For every Terms row with a non-empty Retired
   cell (old forms separated by `;`), each WHOLE-WORD, case-insensitive
   occurrence of an old form in an AFRIKAANS SIDE becomes the FIRST form in
   the Afrikaans cell (text before the first `,`), with a leading capital
   kept when the match had one. Afrikaans sides are:
     - the second argument of L(...) / afL(...) (L from js/lang.js),
     - exam `af:` values (js/exam/*.js),
     - the values of briefs/af/*.af.json (so a re-inject never brings the
       old word back).
   Inside a template only the literal text and the quoted strings in its
   ${...} are touched (never code, never a comparison string, never an
   HTML tag). Never an English side, never js/funfun/ (GENERATED), never
   js/lang.js.

   DRY by default: prints `file:line old → new`, per-file counts, per-term
   totals. --write applies: edits run from the end of each file backwards,
   CRLF/LF and a BOM are kept, every literal and the whole file are
   re-parsed before saving (af_inject's rules). No AF-GLOSSARY.md: prints
   "no AF-GLOSSARY.md yet" and exits 0. --all = every content file
   (af_check's contentFiles()) plus every briefs/af/*.af.json. --as: one
   file only, read as if it sat at <repo path> (for test copies).
   After --write, run af_check on the touched files (it prints the command).
   ============================================================ */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import * as acorn from "acorn";
import * as walk from "acorn-walk";
import { REPO, LANG_JS, readSource, parse, analyse, isLit, isStr, repoRel, resolveFile, isFunfunFile, dataUse } from "./af_extract.mjs";
import { contentFiles } from "./af_check.mjs";

const AF_DIR = path.join(REPO, "briefs", "af");

/* ---------------- the glossary ---------------- */
const cleanForm = (s) => s.trim().replace(/^[*_`"'“”‘’]+|[*_`"'“”‘’]+$/g, "").trim();
function cells(line) {
  const t = line.trim().replace(/^\|/, "").replace(/\|$/, "").replace(/\\\|/g, "\u0001");
  return t.split("|").map((c) => c.replace(/\u0001/g, "|").trim());
}
export function readGlossary(file) {
  const lines = fs.readFileSync(file, "utf8").replace(/^﻿/, "").split(/\r?\n/);
  const problems = [], terms = [];
  const at = lines.findIndex((l) => /^##\s+Terms\b/i.test(l.trim()));
  if (at < 0) return { terms, problems: ['no "## Terms" section'] };
  let i = at + 1;
  while (i < lines.length && !lines[i].trim().startsWith("|") && !/^##\s/.test(lines[i].trim())) i++;
  if (i >= lines.length || !lines[i].trim().startsWith("|")) return { terms, problems: ["no table under ## Terms"] };
  const head = cells(lines[i]).map((c) => c.toLowerCase());
  const col = (name) => head.findIndex((c) => c.startsWith(name));
  const cEn = col("english"), cAf = col("afrikaans"), cRet = col("retired");
  if (cAf < 0 || cRet < 0) return { terms, problems: ["the Terms table needs Afrikaans and Retired columns"] };
  for (i++; i < lines.length && lines[i].trim().startsWith("|"); i++) {
    const c = cells(lines[i]);
    if (c.every((x) => /^:?-{2,}:?$/.test(x) || x === "")) continue;           // |---|---|
    const retiredCell = (c[cRet] || "").trim();
    if (!retiredCell || /^(?:-+|\u2014|\u2013|none|geen|n\/a)$/i.test(retiredCell)) continue;
    const to = cleanForm((c[cAf] || "").split(/[,;]/)[0] || "");
    const row = { line: i + 1, en: cEn >= 0 ? c[cEn] : "", to, retired: retiredCell.split(";").map(cleanForm).filter(Boolean) };
    if (!to) { problems.push(`line ${row.line}: no Afrikaans form; row skipped`); continue; }
    row.retired = row.retired.filter((old) => {
      if (old.toLowerCase() === to.toLowerCase()) { problems.push(`line ${row.line}: "${old}" is retired AND the new form; skipped`); return false; }
      if (wordRe([old]).test(to)) { problems.push(`line ${row.line}: the new form "${to}" contains the retired "${old}" (would never settle); skipped`); return false; }
      return true;
    });
    if (row.retired.length) terms.push(row);
  }
  const seen = new Map();
  for (const t of terms) for (const old of t.retired) {
    const k = old.toLowerCase();
    if (seen.has(k) && seen.get(k) !== t.to) problems.push(`"${old}" is retired twice with different new forms ("${seen.get(k)}", "${t.to}"); the first row wins`);
    else seen.set(k, t.to);
  }
  for (const t of terms) if (seen.has(t.to.toLowerCase())) problems.push(`line ${t.line}: the new form "${t.to}" is itself retired by another row (a chain: run --write twice)`);
  return { terms, problems, map: seen };
}
const esc = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function wordRe(forms, flags = "iu") {
  const alt = [...forms].sort((a, b) => b.length - a.length).map(esc).join("|");
  return new RegExp(`(?<![\\p{L}\\p{N}_])(?:${alt})(?![\\p{L}\\p{N}_])`, flags);
}

/* ---------------- replacing inside one stretch of af text ----------------
   `src` is raw source text (escapes verbatim). Tags and entities are
   masked; returns [{ i, j, old, new }] relative to src. */
function matchesIn(src, re, map) {
  const masked = src.replace(/<[A-Za-z/!][^<>]*(?:>|$)|&(?:[a-zA-Z][a-zA-Z0-9]*|#[0-9]+|#x[0-9a-fA-F]+);/g, (m) => "\u0000".repeat(m.length));
  const out = [];
  re.lastIndex = 0;
  for (const m of masked.matchAll(re)) {
    const old = src.slice(m.index, m.index + m[0].length);
    let to = map.get(old.toLowerCase());
    if (to === undefined) continue;
    if (/^\p{Lu}/u.test(old)) to = to[0].toUpperCase() + to.slice(1);
    if (to !== old) out.push({ i: m.index, j: m.index + old.length, old, new: to });
  }
  return out;
}
/* the editable stretches of one af literal node: [start, end) in the file */
function stretchesOf(node) {
  if (isStr(node)) return [[node.start + 1, node.end - 1, node.raw ? node.raw[0] : '"']];
  const out = node.quasis.map((q) => [q.start, q.end, "`"]);
  for (const e of node.expressions) {
    walk.fullAncestor(e, (n, _st, anc) => {
      const parent = anc[anc.length - 2];
      if (n.type === "Literal" && typeof n.value === "string") {
        if (parent && ((parent.type === "Property" && parent.key === n) || (parent.type === "MemberExpression" && parent.property === n))) return;
        if (dataUse(n, parent)) return;
        out.push([n.start + 1, n.end - 1, n.raw ? n.raw[0] : '"']);
      } else if (n.type === "TemplateElement") out.push([n.start, n.end, "`"]);
    });
  }
  return out;
}
const escFor = (q, s) => q === "`" ? s.replace(/`/g, "\\`").replace(/\$\{/g, "\\${") : s.split(q).join("\\" + q);
function validLiteral(src) {
  try {
    const n = acorn.parseExpressionAt(src, 0, { ecmaVersion: "latest" });
    return (n.type === "TemplateLiteral" || (n.type === "Literal" && typeof n.value === "string")) && n.end === src.length;
  } catch { return false; }
}

/* ---------------- one JS file ---------------- */
function planJs(abs, as, re, map) {
  const src = readSource(abs);
  const { text } = src;
  const A = analyse(text, abs, { as });
  const afNodes = A.sites.filter((s) => (s.cls === "L1" && A.Lname) || (s.cls === "pairAf" && A.exam)).map((s) => s.node);
  const edits = [], errors = [];
  for (const node of afNodes) {
    const local = [];
    for (const [a, b, q] of stretchesOf(node)) {
      for (const m of matchesIn(text.slice(a, b), re, map)) local.push({ start: a + m.i, end: a + m.j, old: m.old, text: escFor(q, m.new), shown: m.new });
    }
    if (!local.length) continue;
    let lit = text.slice(node.start, node.end);
    for (const e of [...local].sort((x, y) => y.start - x.start)) lit = lit.slice(0, e.start - node.start) + e.text + lit.slice(e.end - node.start);
    if (!validLiteral(lit)) { errors.push(`line ${node.loc.start.line}: the af literal would not parse after the replacement; left alone`); continue; }
    edits.push(...local);
  }
  edits.sort((a, b) => b.start - a.start);
  let out = text;
  for (const e of edits) out = out.slice(0, e.start) + e.text + out.slice(e.end);
  if (edits.length) { try { parse(out); } catch (e) { errors.push(`the rewritten file does not parse: ${e.message}`); } }
  const lineOf = (pos) => text.slice(0, pos).split("\n").length;
  return {
    abs, kind: "js", errors,
    changes: [...edits].reverse().map((e) => ({ line: lineOf(e.start), old: e.old, new: e.shown, ctx: ctxOf(text, e.start, e.end) })),
    write: () => fs.writeFileSync(abs, Buffer.concat([src.hasBOM ? Buffer.from([0xef, 0xbb, 0xbf]) : Buffer.alloc(0), Buffer.from(out, "utf8")])),
  };
}
const ctxOf = (text, a, b) => {
  const s = Math.max(0, a - 25), e = Math.min(text.length, b + 25);
  return ((s > 0 ? "…" : "") + text.slice(s, e) + (e < text.length ? "…" : "")).replace(/\r?\n/g, "⏎");
};

/* ---------------- one briefs/af/<unit>.af.json ---------------- */
function planJson(abs, re, map) {
  const src = readSource(abs);
  const { text, eol } = src;
  let obj;
  try { obj = JSON.parse(text); } catch (e) { return { abs, kind: "json", errors: [`not JSON: ${e.message}`], changes: [] }; }
  const changes = [], errors = [];
  for (const [k, v] of Object.entries(obj)) {
    if (typeof v !== "string") continue;
    /* a template value: its ${...} code is parsed like the JS (raw convention) */
    let stretches = [[0, v.length, '"']];
    if (v.includes("${")) {
      try {
        const n = acorn.parseExpressionAt("`" + v + "`", 0, { ecmaVersion: "latest" });
        if (n.type === "TemplateLiteral" && n.end === v.length + 2) stretches = stretchesOf(n).map(([a, b]) => [a - 1, b - 1, "`"]);
      } catch { /* a string value with a stray ${: whole text */ }
    }
    const local = [];
    for (const [a, b] of stretches) for (const m of matchesIn(v.slice(a, b), re, map)) local.push({ start: a + m.i, end: a + m.j, ...m });
    if (!local.length) continue;
    local.sort((x, y) => x.start - y.start);
    let nv = v;
    for (const e of [...local].sort((x, y) => y.start - x.start)) nv = nv.slice(0, e.start) + e.new + nv.slice(e.end);
    obj[k] = nv;
    const at = text.indexOf(JSON.stringify(k) + ":");
    const line = at < 0 ? 0 : text.slice(0, at).split("\n").length;
    for (const e of local) changes.push({ line, old: e.old, new: e.new, ctx: `${k}: ${ctxOf(v, e.start, e.end)}` });
  }
  const indent = (text.match(/^\{\r?\n([ \t]+)"/) || [, "  "])[1];
  let out = JSON.stringify(obj, null, indent) + (/\n$/.test(text) ? "\n" : "");
  if (eol === "\r\n") out = out.replace(/\n/g, "\r\n");
  return {
    abs, kind: "json", errors, changes,
    write: () => fs.writeFileSync(abs, Buffer.concat([src.hasBOM ? Buffer.from([0xef, 0xbb, 0xbf]) : Buffer.alloc(0), Buffer.from(out, "utf8")])),
  };
}

/* ---------------- the CLI ---------------- */
function parseArgs(argv) {
  const o = { glossary: path.join(REPO, "AF-GLOSSARY.md"), write: false, all: false, as: null, files: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--glossary") o.glossary = path.resolve(argv[++i]);
    else if (a === "--write") o.write = true;
    else if (a === "--all") o.all = true;
    else if (a === "--as") o.as = argv[++i];
    else if (a.startsWith("--")) { console.error(`af_glossary_apply: unknown option ${a}`); process.exit(2); }
    else o.files.push(a);
  }
  return o;
}
const never = (abs) => isFunfunFile(abs) || abs === LANG_JS;

function main() {
  const o = parseArgs(process.argv.slice(2));
  if (!fs.existsSync(o.glossary)) {
    console.log(`no AF-GLOSSARY.md yet${o.glossary !== path.join(REPO, "AF-GLOSSARY.md") ? ` (${o.glossary})` : ""}`);
    process.exit(0);
  }
  if (!o.all && !o.files.length) {
    console.error("usage: node tools/af_glossary_apply.mjs [--glossary <path>] [--write] [--as <repo path>] [--all | <file> ...]");
    process.exit(2);
  }
  const g = readGlossary(o.glossary);
  g.problems.forEach((p) => console.log(`glossary: ${p}`));
  if (!g.terms.length) { console.log("glossary: no Terms row has a Retired form: nothing to replace"); process.exit(0); }
  console.log(`glossary: ${g.terms.length} row(s) retire ${g.map.size} form(s): ${[...g.map].map(([a, b]) => `${a} → ${b}`).join("; ")}`);
  const re = wordRe([...g.map.keys()], "giu");

  let files = [];
  if (o.all) {
    files.push(...contentFiles());
    if (fs.existsSync(AF_DIR)) files.push(...fs.readdirSync(AF_DIR).filter((f) => f.endsWith(".af.json")).sort().map((f) => path.join(AF_DIR, f)));
  }
  for (const f of o.files) {
    const a = resolveFile(f);
    if (!a) { console.error(`af_glossary_apply: no such file: ${f}`); process.exit(2); }
    files.push(a);
  }
  files = [...new Set(files)];
  let asAbs = null;
  if (o.as) {
    if (files.length !== 1 || o.all) { console.error("af_glossary_apply: --as takes exactly one file"); process.exit(2); }
    asAbs = path.resolve(REPO, o.as);
  }

  const plans = [];
  for (const abs of files) {
    if (never(abs) || (asAbs && never(asAbs))) { console.log(`  ${repoRel(abs)}: never touched (js/funfun/ and js/lang.js are off limits)`); continue; }
    if (abs.endsWith(".json")) {
      if (!abs.endsWith(".af.json")) { console.log(`  ${repoRel(abs)}: not an af table (only <unit>.af.json is touched); skipped`); continue; }
      plans.push(planJson(abs, re, g.map));
    } else plans.push(planJs(abs, asAbs, re, g.map));
  }
  const perTerm = new Map();
  let total = 0;
  for (const p of plans) {
    const rel = repoRel(p.abs);
    p.errors.forEach((e) => console.log(`  ${rel}: ⚠ ${e}`));
    if (!p.changes.length) continue;
    for (const c of p.changes) {
      console.log(`  ${rel}:${c.line}  ${c.old} → ${c.new}   ${c.ctx}`);
      const k = `${c.old.toLowerCase()} → ${g.map.get(c.old.toLowerCase())}`;
      perTerm.set(k, (perTerm.get(k) || 0) + 1);
    }
    console.log(`  ${rel}: ${p.changes.length} replacement${p.changes.length === 1 ? "" : "s"}`);
    total += p.changes.length;
  }
  for (const [k, n] of perTerm) console.log(`  term ${k}: ${n}`);
  const failed = plans.filter((p) => p.errors.some((e) => /does not parse|not JSON/.test(e)));
  const touched = plans.filter((p) => p.changes.length && !failed.includes(p));
  console.log(`af_glossary_apply: ${total} replacement${total === 1 ? "" : "s"} in ${touched.length} file${touched.length === 1 ? "" : "s"} (${plans.length} read)`);
  if (!o.write) { if (total) console.log("af_glossary_apply: dry run, nothing written (add --write to apply)"); process.exit(failed.length ? 1 : 0); }
  for (const p of touched) p.write();
  if (touched.length) {
    console.log(`af_glossary_apply: wrote ${touched.length} file${touched.length === 1 ? "" : "s"}. Next, check them:`);
    const js = touched.filter((p) => p.kind === "js").map((p) => repoRel(p.abs));
    const units = touched.filter((p) => p.kind === "json").map((p) => path.basename(p.abs).replace(/\.af\.json$/, ""));
    if (js.length) console.log(`  node tools/af_check.mjs ${asAbs ? `--as ${repoRel(asAbs)} ` : ""}${js.join(" ")}`);
    for (const u of units) console.log(`  node tools/af_check.mjs --unit ${u}   (and re-inject: node tools/af_inject.mjs ${u})`);
  }
  process.exit(failed.length ? 1 : 0);
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) main();
