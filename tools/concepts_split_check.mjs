/* ============================================================
   concepts_split_check.mjs: the permanent check for AF row S4
   (2026-10-17), the split of js/concepts.js into one file per chapter.

   Plain English: before the split, every concept card lived in one big
   file. Now each chapter has its own file in js/concepts/ and
   js/concepts.js glues them back together. This script loads the OLD
   file (straight out of git, from the commit just before the split) and
   the NEW one, and proves the app sees exactly the same cards: the same
   150 ids in the same order, every field the same, letter for letter.

   It also proves it at the source level: the card lines of the 12
   chapter files, read in chapter order, are byte-identical to the old
   file's card lines, and the finance pictures file holds the old helper
   lines unchanged. So not one character of learner text moved.

   Run from the repo root:
     node tools/concepts_split_check.mjs            (old = the pre-split commit)
     node tools/concepts_split_check.mjs --ref <git rev>
   Prints "IDENTICAL: 150 cards, N properties" and exits 0, or prints
   the first difference and exits 1.

   Once the Afrikaans twins land (L("en", "af") inside the chapter
   files), the source-level part will stop matching by design; the
   object-level part still holds in English mode for as long as L()
   returns the English side. That is the moment to retire this check.
   ============================================================ */
import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync, readFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const REPO = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const PRE_SPLIT = "20951e0ab82b985d77e7696ca816ee372ede6727";   // last commit with the one-file js/concepts.js
const argRef = process.argv.indexOf("--ref");
const REF = argRef > 0 ? process.argv[argRef + 1] : PRE_SPLIT;
const CHAPTERS = ["stats", "finance", "prob", "trig", "meas", "func", "tgraph", "analytical", "pat", "exp", "eqn", "gtrig"];

let fail = null;
const firstDiff = msg => { if (!fail) fail = msg; };
const git = (...args) => execFileSync("git", ["-C", REPO, ...args], { maxBuffer: 64 << 20 });

/* ---- 1. the OLD module, written out of git beside the files it imports ---- */
const OLD = join(REPO, "tools", "_out", "old");
rmSync(OLD, { recursive: true, force: true });
const oldFiles = ["js/concepts.js", "js/finlib.js",
  ...git("ls-tree", "-r", "--name-only", REF, "js/engine/").toString().trim().split("\n")];
for (const f of oldFiles) {
  const dest = join(OLD, f.replace(/^js\//, ""));
  mkdirSync(dirname(dest), { recursive: true });
  writeFileSync(dest, git("show", `${REF}:${f}`));
}
const oldMod = await import(pathToFileURL(join(OLD, "concepts.js")).href);
const newMod = await import(pathToFileURL(join(REPO, "js", "concepts.js")).href);

/* ---- 2. the export surface ---- */
const oldExports = Object.keys(oldMod).sort().join(","), newExports = Object.keys(newMod).sort().join(",");
if (oldExports !== newExports) firstDiff(`exports differ: old [${oldExports}] new [${newExports}]`);

/* ---- 3. every card, every property, recursively ---- */
let props = 0;
function same(a, b, path) {
  if (fail) return;
  if (typeof a !== typeof b) return firstDiff(`${path}: type ${typeof a} vs ${typeof b}`);
  if (typeof a === "function") {
    if (a.toString() !== b.toString()) firstDiff(`${path}: function source differs`);
    return;
  }
  if (a === null || b === null || typeof a !== "object") {
    if (!Object.is(a, b)) firstDiff(`${path}: ${JSON.stringify(a)?.slice(0, 120)} vs ${JSON.stringify(b)?.slice(0, 120)}`);
    return;
  }
  if (Array.isArray(a) !== Array.isArray(b)) return firstDiff(`${path}: array vs object`);
  if (Object.getPrototypeOf(a) !== Object.getPrototypeOf(b)) return firstDiff(`${path}: prototype differs`);
  const ka = Reflect.ownKeys(a), kb = Reflect.ownKeys(b);
  if (ka.length !== kb.length || ka.some((k, i) => k !== kb[i]))
    return firstDiff(`${path}: own keys differ\n  old [${ka.map(String).join(", ")}]\n  new [${kb.map(String).join(", ")}]`);
  for (const k of ka) {
    props++;
    same(a[k], b[k], `${path}.${String(k)}`);
  }
}
const oldIds = Object.keys(oldMod.CONCEPTS), newIds = Object.keys(newMod.CONCEPTS);
if (oldIds.length !== newIds.length || oldIds.some((k, i) => k !== newIds[i])) {
  const i = oldIds.findIndex((k, j) => k !== newIds[j]);
  firstDiff(`card order differs at index ${i}: old ${oldIds[i]} new ${newIds[i]} (old ${oldIds.length} cards, new ${newIds.length})`);
}
for (const id of oldIds) {
  if (fail) break;
  same(oldMod.CONCEPTS[id], newMod.CONCEPTS[id], `CONCEPTS.${id}`);
}
for (const id of oldIds) if (!fail && newMod.getConcept(id) !== newMod.CONCEPTS[id]) firstDiff(`getConcept(${id}) is not CONCEPTS.${id}`);
if (!fail && newMod.getConcept("no-such-card") !== null) firstDiff(`getConcept(unknown id) should be null`);
const cardProps = props;

/* ---- 4. the finance pictures, old vs new ---- */
for (const mode of ["empty", "save", "loan"]) {
  if (fail) break;
  if (oldMod.jugDiscover(mode) !== newMod.jugDiscover(mode)) firstDiff(`jugDiscover("${mode}") differs`);
}
const pics = [];
if (!fail) {
  same(oldMod.BUILD_TIMELINE_EXAMPLE, newMod.BUILD_TIMELINE_EXAMPLE, "BUILD_TIMELINE_EXAMPLE");
  if (!fail) pics.push(`jugDiscover empty/save/loan identical (${["empty", "save", "loan"].map(m => newMod.jugDiscover(m).length).join("/")} chars), BUILD_TIMELINE_EXAMPLE identical`);
}

/* ---- 5. source level: the card lines and helper lines, byte for byte ---- */
const splitLines = buf => { const s = buf.toString("utf8"); if (s.includes("\r")) firstDiff("CR found: expected LF files"); return s.split("\n"); };
const oldLines = splitLines(readFileSync(join(OLD, "concepts.js")));
const oOpen = oldLines.indexOf("export const CONCEPTS = {");
const oClose = oldLines.indexOf("};", oOpen);
const oldCards = oldLines.slice(oOpen + 1, oClose);
const newCards = [];
for (const c of CHAPTERS) {
  const ls = splitLines(readFileSync(join(REPO, "js", "concepts", `${c}.js`)));
  const open = ls.indexOf(`export const CONCEPTS_${c.toUpperCase()} = {`);
  const close = ls.lastIndexOf("};");
  if (open < 0 || close < open) { firstDiff(`js/concepts/${c}.js: no CONCEPTS_${c.toUpperCase()} object`); break; }
  newCards.push(...ls.slice(open + 1, close));
}
let srcNote = "";
if (!fail) {
  const i = oldCards.findIndex((l, j) => l !== newCards[j]);
  if (oldCards.length !== newCards.length || i >= 0) firstDiff(`card source lines differ at old line ${oOpen + 2 + (i < 0 ? oldCards.length : i)} (old ${oldCards.length} lines, new ${newCards.length})`);
}
if (!fail) {
  const helperOld = oldLines.slice(oldLines.findIndex(l => l.startsWith("/* ----")), oOpen - 1);
  const picLines = splitLines(readFileSync(join(REPO, "js", "concepts", "_finance-pictures.js")));
  const at = picLines.indexOf(helperOld[0]);
  const helperNew = at < 0 ? [] : picLines.slice(at, at + helperOld.length);
  const k = helperOld.findIndex((l, j) => l !== helperNew[j]);
  if (at < 0 || k >= 0) firstDiff(`_finance-pictures.js: helper line ${k} differs from the old file`);
  else srcNote = `source: ${oldCards.length} card lines and ${helperOld.length} helper lines byte-identical to ${REF.slice(0, 7)}:js/concepts.js`;
}

if (fail) {
  console.log(`DIFFERENT: ${fail}`);
  process.exit(1);
}
console.log(`IDENTICAL: ${newIds.length} cards, ${cardProps} properties`);
console.log(`  exports: ${newExports}`);
console.log(`  ${pics.join("; ")}`);
console.log(`  ${srcNote}`);
process.exit(0);
