#!/usr/bin/env node
/* ============================================================
   af_inject.mjs: put the translator's Afrikaans twins back into the
   code (AFRIKAANS-PLAN.md pipeline step 3; QUEUE.md row S2, 2026-10-16).

     node tools/af_inject.mjs <unit> [--dir <tabledir>] [--allow-missing] [--skip-impure] [--dry] [<file> ...]

   Reads <dir>/<unit>.en.json (af_extract's table) and <dir>/<unit>.af.json
   (a FLAT { "<key>": "<af text>" } written by the translator) and
   rewrites every file of the unit, or only the files named, in place.
   <dir> defaults to briefs/af/.

     hub / concept / config files: each occurrence <lit> becomes
       L(<lit>, <af lit>), the English literal kept byte for byte, plus
       one `import { L } from "<rel>/lang.js";` after the last import.
       A file that already uses the name L for something else (the gtrig
       angle letter, a local L = 13) gets `import { L as afL }` and afL(...).
     exam files (js/exam/*.js): `en: <lit>` gets `, af: <af lit>` right
       after the English value; an existing af literal is replaced in
       place when the table differs. No L, no import.

   The af literal has the same kind and quote character as the English
   one, with the af text written RAW, the same convention as the table's
   `en` (escapes like   or \" mean what they mean in the English);
   a bare quote or newline is escaped, a template keeps its ${...} live.
   Every literal is re-parsed before it is written; the whole file is
   re-parsed before it is saved.

   Edits run from the END of the file backwards, so nothing else moves:
   line endings (CRLF/LF) and a BOM are kept. Running it twice changes
   nothing (an L(...) / af: already equal to the table is left alone).

   Refuses (exit 1, nothing written) when a key has no af or an empty af
   (unless --allow-missing: those places stay English and are listed), or
   when a template's ${...} calls the random generator (af_extract flags
   these `impure`; --skip-impure leaves them English and lists them).
   ============================================================ */
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import * as acorn from "acorn";
import {
  REPO, readSource, parse, analyse, itemSites, isLit, rawOf, propOf, langRelPath,
  resolveFile, repoRel, isImpure,
} from "./af_extract.mjs";

/* the af side as a literal of the same kind as the English one */
export function afLiteral(enSrc, kind, afText, eol) {
  const t = String(afText).replace(/\r\n|\r|\n/g, "\n");
  let lit;
  if (kind === "template") {
    let out = "";
    for (let i = 0; i < t.length; i++) {
      const c = t[i];
      if (c === "\\") { out += i + 1 < t.length ? c + t[++i] : "\\\\"; }
      else if (c === "`") out += "\\`";
      else if (c === "\n") out += eol;
      else out += c;
    }
    lit = "`" + out + "`";
    if (!validLit(lit, "TemplateLiteral")) throw new Error(`not a valid template literal: ${lit.slice(0, 80)}`);
    return lit;
  }
  const q = enSrc[0] === "'" ? "'" : '"';
  let out = "";
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (c === "\\") { if (i + 1 < t.length && t[i + 1] !== "\n") out += c + t[++i]; else out += "\\\\"; }
    else if (c === q) out += "\\" + q;
    else if (c === "\n") out += "\\n";
    else if (c === " ") out += "\\u2028";
    else if (c === " ") out += "\\u2029";
    else out += c;
  }
  lit = q + out + q;
  if (validLit(lit, "Literal")) return lit;
  lit = JSON.stringify(t);                       // last resort: the text as plain characters
  if (validLit(lit, "Literal")) return lit;
  throw new Error(`cannot write a string literal for: ${t.slice(0, 80)}`);
}
function validLit(src, type) {
  try {
    const n = acorn.parseExpressionAt(src, 0, { ecmaVersion: "latest" });
    return n.type === type && n.end === src.length && (type !== "Literal" || typeof n.value === "string");
  } catch { return false; }
}

function pickAlias(declared) {
  if (!declared.has("L")) return "L";
  for (let i = 1; ; i++) { const a = i === 1 ? "afL" : `afL${i}`; if (!declared.has(a)) return a; }
}

/* plan (and optionally apply) the edits for ONE file.
   rows: Map(enText -> { key, af }) for this file. */
export function planFile(abs, rows, opts = {}) {
  const src = readSource(abs);
  const { text, eol } = src;
  const A = analyse(text, abs);
  const sites = itemSites(A, new Set(rows.keys()));
  const Lname = A.Lname || pickAlias(A.declared);
  const edits = [], missing = [], impure = [], errors = [];
  const counts = { wrapped: 0, afAdded: 0, afReplaced: 0, same: 0 };
  for (const s of sites) {
    const row = rows.get(s.raw);
    const where = `${repoRel(abs)}:${s.line}:${s.col}`;
    const af = row.af;
    if (typeof af !== "string" || af.trim() === "") { missing.push(`${row.key} (${where})`); continue; }
    let lit;
    try { lit = afLiteral(text.slice(s.start, s.end), s.kind, af, eol); }
    catch (e) { errors.push(`${row.key}: ${e.message}`); continue; }
    if (s.cls === "free") {
      if (isImpure(A, s)) { impure.push(`${row.key} (${where})`); continue; }
      edits.push({ start: s.start, end: s.end, text: `${Lname}(${text.slice(s.start, s.end)}, ${lit})`, line: s.line, key: row.key });
      counts.wrapped++;
    } else if (s.cls === "L0") {
      const a1 = s.parent.arguments[1];
      if (!a1) { edits.push({ start: s.end, end: s.end, text: `, ${lit}`, line: s.line, key: row.key }); counts.afAdded++; }
      else if (!isLit(a1)) errors.push(`${row.key}: ${where} has a non-literal af argument; left alone`);
      else if (text.slice(a1.start, a1.end) !== lit) { edits.push({ start: a1.start, end: a1.end, text: lit, line: a1.loc.start.line, key: row.key }); counts.afReplaced++; }
      else counts.same++;
    } else if (s.cls === "pairEn") {
      if (isImpure(A, s)) { impure.push(`${row.key} (${where})`); continue; }
      const p = propOf(s.grand, "af");
      if (!p) { edits.push({ start: s.end, end: s.end, text: `, af: ${lit}`, line: s.line, key: row.key }); counts.afAdded++; }
      else if (!isLit(p.value)) errors.push(`${row.key}: ${where} has a non-literal af value; left alone`);
      else if (text.slice(p.value.start, p.value.end) !== lit) { edits.push({ start: p.value.start, end: p.value.end, text: lit, line: p.value.loc.start.line, key: row.key }); counts.afReplaced++; }
      else counts.same++;
    }
  }
  /* the import, once, only when a wrapper is new and L is not imported yet */
  let importLine = null;
  if (counts.wrapped && !A.Lname && !A.exam) {
    importLine = `import { ${Lname === "L" ? "L" : `L as ${Lname}`} } from "${langRelPath(abs)}";`;
    const imps = A.ast.body.filter((d) => d.type === "ImportDeclaration");
    if (imps.length) {
      const last = imps[imps.length - 1];
      let at = text.indexOf("\n", last.end);
      if (at < 0) at = text.length; else if (text[at - 1] === "\r") at--;
      edits.push({ start: at, end: at, text: eol + importLine, line: last.loc.end.line, key: "(import)" });
    } else {
      const at = A.ast.body.length ? A.ast.body[0].start : text.length;
      edits.push({ start: at, end: at, text: importLine + eol, line: 1, key: "(import)" });
    }
  }
  edits.sort((a, b) => b.start - a.start || b.end - a.end);
  for (let i = 1; i < edits.length; i++) {
    if (edits[i].end > edits[i - 1].start) errors.push(`overlapping edits at line ${edits[i].line} (${edits[i].key}) and line ${edits[i - 1].line} (${edits[i - 1].key})`);
  }
  let out = text;
  for (const e of edits) out = out.slice(0, e.start) + e.text + out.slice(e.end);
  if (edits.length && !errors.length) {
    try { parse(out); } catch (e) { errors.push(`the rewritten file does not parse: ${e.message}`); }
  }
  return { abs, src, text, out, edits, counts, missing, impure, errors, importLine, Lname, exam: A.exam };
}

function parseArgs(argv) {
  const o = { unit: null, dir: path.join(REPO, "briefs", "af"), allowMissing: false, skipImpure: false, dry: false, files: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--dir") o.dir = path.resolve(argv[++i]);
    else if (a === "--allow-missing") o.allowMissing = true;
    else if (a === "--skip-impure") o.skipImpure = true;
    else if (a === "--dry") o.dry = true;
    else if (!o.unit) o.unit = a;
    else o.files.push(a);
  }
  return o;
}
const clip = (s, n = 120) => (s.length > n ? s.slice(0, n) + "…" : s).replace(/\r?\n/g, "⏎");

function main() {
  const o = parseArgs(process.argv.slice(2));
  if (!o.unit) {
    console.error("usage: node tools/af_inject.mjs <unit> [--dir <tabledir>] [--allow-missing] [--skip-impure] [--dry] [<file> ...]");
    process.exit(2);
  }
  const enPath = path.join(o.dir, `${o.unit}.en.json`), afPath = path.join(o.dir, `${o.unit}.af.json`);
  for (const p of [enPath, afPath]) if (!fs.existsSync(p)) { console.error(`af_inject: missing ${p}`); process.exit(2); }
  const en = JSON.parse(fs.readFileSync(enPath, "utf8"));
  const af = JSON.parse(fs.readFileSync(afPath, "utf8"));
  if (!af || typeof af !== "object" || Array.isArray(af)) { console.error("af_inject: the af table must be a flat { key: text } object"); process.exit(2); }

  const unitFiles = en.files.map((f) => path.join(REPO, f));
  let files = unitFiles;
  if (o.files.length) {
    files = o.files.map((f) => {
      const a = resolveFile(f);
      if (!a || !unitFiles.includes(a)) { console.error(`af_inject: ${f} is not a file of unit ${o.unit} (${en.files.join(", ")})`); process.exit(2); }
      return a;
    });
  }
  const extra = Object.keys(af).filter((k) => !en.items[k]);
  if (extra.length) console.log(`af_inject: note: ${extra.length} key(s) in the af table are not in the en table (ignored): ${extra.slice(0, 10).join(", ")}`);

  const plans = [];
  for (const abs of files) {
    const stem = path.basename(abs).replace(/\.m?js$/, "");
    const rows = new Map();
    for (const [key, it] of Object.entries(en.items)) {
      if (key.slice(0, key.lastIndexOf("#")) !== stem) continue;
      rows.set(it.en, { key, af: af[key] });
    }
    plans.push(planFile(abs, rows));
  }
  const missing = plans.flatMap((p) => p.missing), impure = plans.flatMap((p) => p.impure), errors = plans.flatMap((p) => p.errors);
  if (errors.length) { console.error("af_inject: REFUSED, nothing written:"); errors.forEach((e) => console.error("  " + e)); process.exit(1); }
  if (missing.length && !o.allowMissing) {
    console.error(`af_inject: REFUSED, nothing written: ${missing.length} place(s) have no Afrikaans (missing or empty af):`);
    missing.forEach((m) => console.error("  " + m));
    console.error("  Fill them in, or pass --allow-missing to leave those places English.");
    process.exit(1);
  }
  if (impure.length && !o.skipImpure) {
    console.error(`af_inject: REFUSED, nothing written: ${impure.length} template(s) call the random generator inside \${...}; L(en, af) would draw twice:`);
    impure.forEach((m) => console.error("  " + m));
    console.error("  Hoist the call into a const above the template first, or pass --skip-impure to leave them English.");
    process.exit(1);
  }
  for (const p of plans) {
    const rel = repoRel(p.abs), c = p.counts;
    const what = p.exam ? `${c.afAdded} af added, ${c.afReplaced} af replaced, ${c.same} already equal`
      : `${c.wrapped} wrapped, ${c.afAdded} af added, ${c.afReplaced} af replaced, ${c.same} already equal${p.importLine ? `, import added (${p.Lname})` : ""}`;
    console.log(`af_inject: ${o.unit}  ${rel}: ${p.edits.length ? what : "no changes"}`);
    if (missing.length) p.missing.forEach((m) => console.log(`  left English (no af): ${m}`));
    if (impure.length) p.impure.forEach((m) => console.log(`  left English (impure \${...}): ${m}`));
    if (o.dry) {
      for (const e of [...p.edits].reverse()) {
        const before = p.text.slice(e.start, e.end);
        console.log(`  ${rel}:${e.line}  ${clip(before || "(insert)")}  →  ${clip(e.text)}`);
      }
      continue;
    }
    if (!p.edits.length) continue;
    const bytes = Buffer.concat([p.src.hasBOM ? Buffer.from([0xef, 0xbb, 0xbf]) : Buffer.alloc(0), Buffer.from(p.out, "utf8")]);
    fs.writeFileSync(p.abs, bytes);
  }
  if (o.dry) console.log("af_inject: dry run, nothing written");
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) main();
