#!/usr/bin/env node
/* ============================================================
   af_roundtrip_test.mjs: proves af_extract + af_inject on the pilot file
   without leaving a trace (QUEUE.md row S2, 2026-10-16).

     node tools/af_roundtrip_test.mjs

   1. keeps the original bytes of js/quests/questnp1-spot.js (a copy goes
      to tools/_out/) and takes a BASELINE: verify-patterns in EN and in
      ?lang=af, plus node verify-lazy-load.mjs;
   2. extracts it (unit _rt, tables in tools/_out/), writes an af table
      with af = en for every key, injects;
   3. proves the diff is wrappers only: drop the added import line, turn
      every L(X, X) with byte-identical sides back into X: the result must
      equal the original bytes exactly; a second inject must change nothing;
   4. runs the harness again with the injected file in place: both pass
      lines must match the baseline; verify-lazy-load must still pass;
   5. restores the original bytes (try/finally, even after a crash) and
      checks git status for js/ is what it was before the test.
   Prints GREEN or RED and exits 0 / 1.

   Needs a static server on port 5191 (the harness's port): if nothing
   listens there it starts `python -m http.server 5191` from the repo
   root and leaves it running.
   ============================================================ */
import fs from "node:fs";
import net from "node:net";
import path from "node:path";
import { spawn, spawnSync } from "node:child_process";
import { REPO, TOOLS, parse, langImport } from "./af_extract.mjs";

const FILE = "js/quests/questnp1-spot.js";
const ABS = path.join(REPO, FILE);
const OUT = path.join(TOOLS, "_out");
const PAGE = "verify-patterns";
const red = [];
const say = (s) => console.log(s);

function run(cmd, args, { allowFail = false } = {}) {
  const r = spawnSync(cmd, args, { cwd: REPO, encoding: "utf8", env: { ...process.env, PYTHONIOENCODING: "utf-8" }, timeout: 15 * 60 * 1000, maxBuffer: 64 * 1024 * 1024 });
  const out = (r.stdout || "") + (r.stderr || "");
  if (r.status !== 0 && !allowFail) throw new Error(`${cmd} ${args.join(" ")} exited ${r.status}:\n${out}`);
  return { code: r.status, out };
}
const gitJs = () => run("git", ["status", "--porcelain", "js/"]).out.trim();
const harness = (page) => {
  const line = run("python", ["tools/harness_run.py", page]).out.trim().split(/\r?\n/).filter((l) => l.trim()).pop() || "";
  return line.replace(/\s+/g, " ");
};
const lazy = () => {
  const r = run("node", ["verify-lazy-load.mjs"], { allowFail: true });
  return { code: r.code, line: r.out.trim().split(/\r?\n/).pop() || "" };
};

function listening(port) {
  return new Promise((res) => {
    const s = net.connect({ port, host: "127.0.0.1" }, () => { s.end(); res(true); });
    s.on("error", () => res(false));
  });
}
async function ensureServer() {
  if (await listening(5191)) return "already running";
  const p = spawn("python", ["-m", "http.server", "5191"], { cwd: REPO, detached: true, stdio: "ignore", windowsHide: true });
  p.unref();
  for (let i = 0; i < 50; i++) { if (await listening(5191)) return "started (python -m http.server 5191, left running)"; await new Promise((r) => setTimeout(r, 200)); }
  throw new Error("could not start a server on port 5191");
}

/* step 3: undo exactly what the injector did, when af = en */
function stripWrappers(text) {
  const ast = parse(text);
  const imp = langImport(ast, ABS);
  if (!imp) throw new Error("the injected file has no import of L from js/lang.js");
  const Lname = imp.local;
  const edits = [];
  let wrappers = 0;
  (function rec(n) {
    if (!n || typeof n.type !== "string") return;
    if (n.type === "CallExpression" && n.callee.type === "Identifier" && n.callee.name === Lname && n.arguments.length === 2) {
      const [a, b] = n.arguments;
      if (text.slice(a.start, a.end) === text.slice(b.start, b.end)) {
        edits.push({ start: n.start, end: n.end, text: text.slice(a.start, a.end) });
        wrappers++;
        return;                                     // nothing nests inside an item (ownership rule)
      }
    }
    for (const k of Object.keys(n)) {
      if (k === "loc" || k === "range") continue;
      const v = n[k];
      if (Array.isArray(v)) v.forEach(rec); else if (v && typeof v.type === "string") rec(v);
    }
  })(ast);
  /* the import line, with the line break the injector put before it */
  const d = imp.decl;
  const lineStart = text.lastIndexOf("\n", d.start - 1) + 1;
  let lineEnd = text.indexOf("\n", d.end); if (lineEnd < 0) lineEnd = text.length; else if (text[lineEnd - 1] === "\r") lineEnd--;
  const eolLen = text[lineStart - 2] === "\r" ? 2 : 1;
  edits.push({ start: lineStart - eolLen, end: lineEnd, text: "" });
  edits.sort((x, y) => y.start - x.start);
  let out = text;
  for (const e of edits) out = out.slice(0, e.start) + e.text + out.slice(e.end);
  return { out, wrappers };
}

async function main() {
  say(`af round trip on ${FILE}`);
  fs.mkdirSync(OUT, { recursive: true });
  const gitBefore = gitJs();
  if (gitBefore.split(/\r?\n/).some((l) => l.endsWith(FILE))) { say(`RED: ${FILE} is already modified; the test needs it clean`); process.exit(1); }
  say(`  server 5191: ${await ensureServer()}`);

  say("  baseline (original file):");
  const baseEn = harness(PAGE), baseAf = harness(`${PAGE}?lang=af`), baseLazy = lazy();
  say(`    EN       ${baseEn}`);
  say(`    ?lang=af ${baseAf}`);
  say(`    lazy     exit ${baseLazy.code}: ${baseLazy.line}`);

  const orig = fs.readFileSync(ABS);
  fs.writeFileSync(path.join(OUT, "questnp1-spot.orig.js"), orig);
  try {
    say("  extract + inject (af = en):");
    run("node", ["tools/af_extract.mjs", "--unit", "_rt", "--out", OUT, "--force", FILE]);
    const table = JSON.parse(fs.readFileSync(path.join(OUT, "_rt.en.json"), "utf8"));
    const af = Object.fromEntries(Object.entries(table.items).map(([k, v]) => [k, v.en]));
    fs.writeFileSync(path.join(OUT, "_rt.af.json"), JSON.stringify(af, null, 2) + "\n");
    const places = Object.values(table.items).reduce((n, it) => n + it.where.length, 0);
    say(`    table: ${Object.keys(table.items).length} items, ${places} places, ${table.words} words`);
    const inj = run("node", ["tools/af_inject.mjs", "_rt", "--dir", OUT]);
    say(`    ${inj.out.trim()}`);

    const injected = fs.readFileSync(ABS);
    const hasBOM = orig[0] === 0xef && orig[1] === 0xbb && orig[2] === 0xbf;
    if (hasBOM !== (injected[0] === 0xef && injected[1] === 0xbb && injected[2] === 0xbf)) red.push("BOM changed");
    const { out, wrappers } = stripWrappers(injected.toString("utf8", hasBOM ? 3 : 0));
    const back = Buffer.concat([hasBOM ? Buffer.from([0xef, 0xbb, 0xbf]) : Buffer.alloc(0), Buffer.from(out, "utf8")]);
    const same = Buffer.compare(back, orig) === 0;
    const numstat = run("git", ["diff", "--numstat", "--", FILE]).out.split(/\r?\n/).filter((l) => l.trim() && !l.startsWith("warning:")).join(" ").replace(/\s+/g, " ");
    const crlfIn = (orig.toString("utf8").match(/\r\n/g) || []).length, crlfOut = (injected.toString("utf8").match(/\r\n/g) || []).length;
    say(`    wrappers L(X, X): ${wrappers} (table places: ${places})`);
    say(`    git diff --numstat: ${numstat || "(none)"}   CRLF line ends: ${crlfIn} → ${crlfOut}`);
    say(`    strip import + unwrap → original bytes: ${same ? "IDENTICAL" : "DIFFERENT"}`);
    if (!same) red.push("unwrapped file differs from the original");
    if (wrappers !== places) red.push(`wrapper count ${wrappers} ≠ table places ${places}`);
    if (crlfOut !== crlfIn + (crlfIn ? 1 : 0)) red.push("line endings changed");

    const again = run("node", ["tools/af_inject.mjs", "_rt", "--dir", OUT]);
    const stable = Buffer.compare(fs.readFileSync(ABS), injected) === 0;
    say(`    second inject: ${again.out.trim()}  (bytes ${stable ? "unchanged" : "CHANGED"})`);
    if (!stable || !/no changes/.test(again.out)) red.push("second inject was not a no-op");

    say("  harness with the injected file in place:");
    const injEn = harness(PAGE), injAf = harness(`${PAGE}?lang=af`), injLazy = lazy();
    say(`    EN       ${injEn}`);
    say(`    ?lang=af ${injAf}`);
    say(`    lazy     exit ${injLazy.code}: ${injLazy.line}`);
    if (injEn !== baseEn) red.push("EN harness line differs from the baseline");
    if (injAf !== baseAf) red.push("?lang=af harness line differs from the baseline");
    if (!/(\d+)\/\1 /.test(injEn)) red.push("EN harness is not all-passed");
    if (injLazy.code !== 0) red.push("verify-lazy-load failed with the injected file");
  } catch (e) {
    red.push(`crashed: ${e.message.split("\n")[0]}`);
    console.error(e.message);
  } finally {
    fs.writeFileSync(ABS, orig);
    const restored = Buffer.compare(fs.readFileSync(ABS), orig) === 0;
    say(`  restored original bytes: ${restored ? "yes" : "NO"}`);
    if (!restored) red.push("restore failed");
  }
  const gitAfter = gitJs();
  say(`  git status --porcelain js/ before: ${gitBefore ? gitBefore.replace(/\r?\n/g, " | ") : "(empty)"}`);
  say(`  git status --porcelain js/ after:  ${gitAfter ? gitAfter.replace(/\r?\n/g, " | ") : "(empty)"}`);
  if (gitAfter !== gitBefore) red.push("git status for js/ changed");
  if (run("git", ["status", "--porcelain", "--", FILE]).out.trim()) red.push(`${FILE} is not clean after the test`);
  if (red.length) { say(`RED: ${red.join("; ")}`); process.exit(1); }
  say("GREEN");
}

main();
