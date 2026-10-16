#!/usr/bin/env node
/* ============================================================
   af_extract.mjs: pull every learner-facing maths string out of one
   or more JS files into a numbered table for the Afrikaans translator
   (AFRIKAANS-PLAN.md pipeline step 1; QUEUE.md row S2, 2026-10-16).

     node tools/af_extract.mjs --unit <name> [--out <dir>] [--dry] [--force] <file> [<file> ...]

   Writes <out>/<unit>.en.json (out defaults to briefs/af/). --dry prints
   the summary and writes nothing. The translator never reads code: the
   table is all they see, and tools/af_inject.mjs puts their twins back.

   What becomes an ITEM (one key, one twin; see tools/AF-TOOLS.md):
     1. KNOWN SLOTS: a helper's text argument (HELPERS below) or the value
        of a prose property (SLOTS below), followed through arrays, ?:
        branches, + pieces, call arguments (pick([...])), local consts and
        local helper functions. Every string/template literal found there
        whose VISIBLE text (tags stripped) has a letter is an item.
     2. SAME-TEXT PROPAGATION: every other literal in the same file with
        byte-identical source text is the same item, so runtime text
        comparisons (KINDS: `k !== correct`) stay true in Afrikaans.
     3. OPTION LISTS: a module-level `const NAME = ["...", "..."]` of 2+
        letter literals where at least one has a space.
     4. ALREADY WRAPPED: L(<lit>, <lit>) with L imported from js/lang.js,
        and exam { en, af } pairs: recorded with their existing `af`.
   Anything else with 2+ English-looking words is a LEFTOVER: listed in
   the table and the summary, never wrapped. A human decides.

   Exam files (js/exam/*.js) are pair-only: items are the `en:` values of
   { en, af? } objects, nothing else.

   This module also exports the shared parsing helpers af_inject.mjs and
   af_roundtrip_test.mjs use, so all three agree on what a "site" is.
   ============================================================ */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import * as acorn from "acorn";
import * as walk from "acorn-walk";

export const TOOLS = path.dirname(fileURLToPath(import.meta.url));
export const REPO = path.resolve(TOOLS, "..");
export const LANG_JS = path.join(REPO, "js", "lang.js");

/* ---------------- THE TABLES (surveyed 2026-10-16) ----------------
   HELPERS: question builders by NAME (the same name means the same
   signature everywhere it is exported: mc/_shared re-exported by _eq,
   _exp, _gtrig; tapQ in _patterns + _analytical; calcStep/mcStep in
   _shared + _gtrig; ynQ in _eq/_exp/_gtrig, yesnoQ in _patterns +
   _analytical). `text` = learner-facing positional params; `opts` = the
   options object (its prose keys are SLOTS); `pool` = a curated pool
   item { q, correct, wrongs, hint, ans }. Params NOT listed are data:
   concept ids, numbers (expected, mcNum), graph specs, tap targets,
   tokenpad chips (pair/known/decoys/s1/s2/angTxt/lhs/opp: maths that the
   pad compares by text), tapside/quad ids (correct: "opp", [2, 3]). */
export const HELPERS = {
  mc:                   { params: ["concept", "prompt", "correct", "wrongs", "opts"], text: [1, 2, 3], opts: 4 },
  mcStep:               { params: ["prompt", "correct", "wrongs", "hint", "opts"], text: [0, 1, 2, 3], opts: 4 },
  calcStep:             { params: ["prompt", "expected", "hint", "opts"], text: [0, 2], opts: 3 },
  calcQ:                { params: ["concept", "prompt", "expected", "opts"], text: [1], opts: 3 },
  tapQ:                 { params: ["concept", "prompt", "graph", "tap", "opts"], text: [1], opts: 4 },
  yesnoQ:               { params: ["concept", "prompt", "yes", "opts"], text: [1], opts: 3 },
  ynQ:                  { params: ["concept", "prompt", "yes", "opts"], text: [1], opts: 3 },
  poolMC:               { params: ["concept", "poolItem"], text: [], pool: 1 },
  poolYN:               { params: ["concept", "poolItem"], text: [], pool: 1 },
  tokenStep:            { params: ["prompt", "expected", "alsoAccept", "hint", "sym"], text: [0, 3] },
  quadStep:             { params: ["prompt", "correct", "hint", "opts"], text: [0, 2], opts: 3 },
  mcMultiStep:          { params: ["prompt", "options", "correct", "hint", "opts"], text: [0, 1, 3], opts: 4 },
  tapSideStep:          { params: ["prompt", "correct", "hint", "opts"], text: [0, 2], opts: 3 },
  sineSetupStep:        { params: ["pair", "known", "decoys", "hint"], text: [3] },
  sineAngleSetupStep:   { params: ["pair", "known", "decoys", "hint"], text: [3] },
  cosineSideSetupStep:  { params: ["lhs", "s1", "s2", "angTxt", "hint"], text: [4] },
  cosineAngleSetupStep: { params: ["lhsTxt", "opp", "o1", "o2", "hint"], text: [4] },
  areaSetupStep:        { params: ["s1", "s2", "angTxt", "hint"], text: [3] },
  mcNum:                { params: ["correct", "decoys"], text: [] },
};

/* SLOTS: object keys whose value is prose wherever they appear (checked
   against js/questions.js: every one reaches the DOM through fmt()).
   Data keys, never followed: concept id type kind graph graphs(spec)
   tap targets correctId expected alsoAccept unit dp tol allowNeg yes
   layout sym keys frame labels placeLabel single noRef goal setup
   revealMode collapseSteps stackFractions stepGraphPinned graphWide
   accent; exam ticks hl diagram. */
export const SLOTS = [
  "prompt", "hint", "tapHint", "answerLabel", "task", "finalPrompt",
  "graphCap", "graphAfterCap", "reveal", "revealAfter", "solution",
  "options", "wrongs", "why", "note", "cue", "ans",
  "title", "blurb", "body",           // config rounds + concept cards
];
/* keys that are prose only in context */
export const POOL_SLOTS = ["q", "correct", "sol"];   // object has q + (correct|yes|ans|wrongs)
export const OPTION_SLOTS = ["label"];               // object has label + (correct|spec)
export const CONFIG_SLOTS = ["name"];                // js/config.js only (chapter names)
/* inside a slot, a nested object's keys that carry on the prose */
export const INNER = {
  solution: ["s", "r"],
  options: ["label", "why", "note"],
  wrongs: ["label", "why", "note"],
  pool: ["q", "correct", "wrongs", "hint", "ans", "sol"],
};
/* formatters whose arguments are maths, never prose */
export const MATH_CALLS = new Set([
  "C", "P", "fmtComma", "fmtDeg", "sup", "pw", "pwp", "root", "frac", "tfrac", "sf",
  "upw", "usup", "sgn", "negNum", "fracLabel", "toSub", "ord", "argDeg", "list",
  "classInterval", "labelPt", "ptStr", "nstr", "eqStr", "eqHtml", "eqPlain",
]);
/* a literal sitting here is (also) used as data: flagged in the summary */
const DATA_KEYS = new Set(["id", "kind", "type", "fn", "mode", "at", "role", "key", "sym", "unit",
  "accent", "correctId", "targets", "layout", "tone", "place", "concept", "dashTo", "chapterId"]);
const DATA_METHODS = new Set(["includes", "indexOf", "has", "startsWith", "endsWith", "get", "set", "add", "delete"]);

/* ---------------- reading + parsing ---------------- */
export function readSource(abs) {
  const buf = fs.readFileSync(abs);
  const hasBOM = buf.length >= 3 && buf[0] === 0xef && buf[1] === 0xbb && buf[2] === 0xbf;
  const text = buf.toString("utf8", hasBOM ? 3 : 0);
  const eol = text.includes("\r\n") ? "\r\n" : "\n";
  return { buf, hasBOM, text, eol };
}
export function parse(text) {
  return acorn.parse(text, { ecmaVersion: "latest", sourceType: "module", ranges: true, locations: true, allowHashBang: true });
}
export const repoRel = (abs) => path.relative(REPO, abs).split(path.sep).join("/");
export const isExamFile = (abs) => repoRel(abs).startsWith("js/exam/");
export function resolveFile(f) {
  for (const cand of [path.resolve(f), path.resolve(REPO, f)]) if (fs.existsSync(cand)) return cand;
  return null;
}

export const isStr = (n) => !!n && n.type === "Literal" && typeof n.value === "string";
export const isTpl = (n) => !!n && n.type === "TemplateLiteral";
export const isLit = (n) => isStr(n) || isTpl(n);
/* the raw source between the quotes/backticks, CRLF folded to LF */
export const rawOf = (text, n) => text.slice(n.start + 1, n.end - 1).replace(/\r\n/g, "\n");
export const stripMarkup = (s) => s.replace(/<[^<>]*>/g, " ").replace(/&[a-zA-Z]+;|&#x?[0-9a-fA-F]+;/g, " ");
/* what a learner could read: the cooked text, tags/entities gone; a
   template's ${...} placeholders do not count (they are code) */
export function visibleText(n) {
  const s = isTpl(n) ? n.quasis.map((q) => q.value.cooked ?? q.value.raw).join(" ") : n.value;
  return stripMarkup(s);
}
export const hasLetter = (n) => /\p{L}/u.test(visibleText(n));
export const englishWords = (n) => /[A-Za-z]{2,}[\s ]+[A-Za-z]{2,}/.test(visibleText(n));
export const wordCount = (n) =>
  (visibleText(n).match(/\p{L}[\p{L}'’-]*/gu) || []).filter((w) => w.length > 1 || /^[aI]$/.test(w)).length;

export function keyName(p) {
  if (!p || p.type !== "Property") return null;
  if (!p.computed) return p.key.type === "Identifier" ? p.key.name : String(p.key.value);
  return isStr(p.key) ? p.key.value : null;
}
export const propOf = (obj, k) => obj.properties.find((p) => keyName(p) === k);
export function isPairObj(obj) {
  if (!obj || obj.type !== "ObjectExpression" || !obj.properties.length) return false;
  let en = false;
  for (const p of obj.properties) {
    const k = keyName(p);
    if (k === "en") en = true; else if (k !== "af") return false;
  }
  return en;
}

/* the file's import of L from js/lang.js (resolved, so js/exam/lang.js
   never counts): { decl, local } or null */
export function langImport(ast, abs) {
  for (const d of ast.body) {
    if (d.type !== "ImportDeclaration" || !String(d.source.value).startsWith(".")) continue;
    if (path.resolve(path.dirname(abs), d.source.value) !== LANG_JS) continue;
    for (const s of d.specifiers) {
      if (s.type === "ImportSpecifier" && (s.imported.name ?? s.imported.value) === "L") return { decl: d, local: s.local.name };
    }
  }
  return null;
}
export function langRelPath(abs) {
  let r = path.relative(path.dirname(abs), LANG_JS).split(path.sep).join("/");
  return r.startsWith(".") ? r : "./" + r;
}

function patternNames(p, out) {
  if (!p) return;
  switch (p.type) {
    case "Identifier": out.push(p.name); break;
    case "ObjectPattern": p.properties.forEach((q) => patternNames(q.type === "RestElement" ? q.argument : q.value, out)); break;
    case "ArrayPattern": p.elements.forEach((e) => patternNames(e, out)); break;
    case "RestElement": patternNames(p.argument, out); break;
    case "AssignmentPattern": patternNames(p.left, out); break;
  }
}
const push = (m, k, v) => { if (!m.has(k)) m.set(k, []); m.get(k).push(v); };
const FN_TYPES = new Set(["FunctionDeclaration", "FunctionExpression", "ArrowFunctionExpression"]);

/* ---------------- one pass over a file: sites, bindings, functions ----
   A SITE is every string or template literal, classified by where it
   sits: free | key | import | member | tagged | directive | L0 | L1 | Lx
   | pairEn | pairAf. Only free, L0 (and pairEn in exam files) can carry
   an item. */
export function analyse(text, abs) {
  const ast = parse(text);
  const exam = isExamFile(abs);
  const lang = langImport(ast, abs);
  const Lname = lang ? lang.local : null;
  const declared = new Set(), bindings = new Map(), calls = new Map(), fns = [], sites = [], siteByNode = new Map();
  walk.fullAncestor(ast, (node, _st, anc) => {
    const parent = anc[anc.length - 2], grand = anc[anc.length - 3];
    switch (node.type) {
      case "VariableDeclarator": {
        const ns = []; patternNames(node.id, ns);
        ns.forEach((n) => { declared.add(n); if (node.init) push(bindings, n, node.init); });
        break;
      }
      case "AssignmentExpression":
        if (node.operator === "=" && node.left.type === "Identifier") push(bindings, node.left.name, node.right);
        break;
      case "FunctionDeclaration": case "FunctionExpression": case "ArrowFunctionExpression": {
        let name = node.id ? node.id.name : null;
        if (!name && parent && parent.type === "VariableDeclarator" && parent.init === node && parent.id.type === "Identifier") name = parent.id.name;
        if (!name && parent && parent.type === "AssignmentExpression" && parent.right === node && parent.left.type === "Identifier") name = parent.left.name;
        if (node.type === "FunctionDeclaration" && name) { declared.add(name); push(bindings, name, node); }
        node.params.forEach((p) => { const ns = []; patternNames(p, ns); ns.forEach((n) => declared.add(n)); });
        const params = node.params.map((p) =>
          p.type === "Identifier" ? { name: p.name } :
          p.type === "AssignmentPattern" && p.left.type === "Identifier" ? { name: p.left.name, def: p.right } : { name: null });
        /* a callback's first param takes the elements of the array it is called on */
        const cb = parent && parent.type === "CallExpression" && parent.arguments.includes(node) && parent.callee.type === "MemberExpression" ? parent : null;
        fns.push({ node, name, params, cb });
        break;
      }
      case "ImportSpecifier": case "ImportDefaultSpecifier": case "ImportNamespaceSpecifier": declared.add(node.local.name); break;
      case "CatchClause": if (node.param) { const ns = []; patternNames(node.param, ns); ns.forEach((n) => declared.add(n)); } break;
      case "ClassDeclaration": if (node.id) declared.add(node.id.name); break;
      case "CallExpression": if (node.callee.type === "Identifier") push(calls, node.callee.name, node); break;
      case "Literal": case "TemplateLiteral": {
        if (node.type === "Literal" && typeof node.value !== "string") break;
        const s = makeSite(text, node, parent, grand, anc, Lname);
        sites.push(s); siteByNode.set(node, s);
        break;
      }
    }
  });
  return { ast, text, abs, exam, lang, Lname, declared, bindings, calls, fns, sites, siteByNode };
}

function makeSite(text, node, parent, grand, anc, Lname) {
  let cls = "free";
  if (parent) {
    const t = parent.type;
    if ((t === "ImportDeclaration" || t === "ExportNamedDeclaration" || t === "ExportAllDeclaration" || t === "ImportExpression") && parent.source === node) cls = "import";
    else if ((t === "Property" || t === "PropertyDefinition" || t === "MethodDefinition") && parent.key === node && !parent.computed) cls = "key";
    else if (t === "MemberExpression" && parent.property === node) cls = "member";
    else if (t === "TaggedTemplateExpression" && parent.quasi === node) cls = "tagged";
    else if (t === "ExpressionStatement" && parent.directive) cls = "directive";
    else if (t === "CallExpression" && Lname && parent.callee.type === "Identifier" && parent.callee.name === Lname && parent.arguments.includes(node)) {
      const i = parent.arguments.indexOf(node); cls = i === 0 ? "L0" : i === 1 ? "L1" : "Lx";
    } else if (t === "Property" && parent.value === node && isPairObj(grand)) {
      const k = keyName(parent); cls = k === "en" ? "pairEn" : "pairAf";
    }
  }
  const dev = anc.some((a) =>
    (a.type === "CallExpression" && a.callee.type === "MemberExpression" && a.callee.object.type === "Identifier" && a.callee.object.name === "console") ||
    (a.type === "NewExpression" && a.callee.type === "Identifier" && /Error$/.test(a.callee.name)) || a.type === "ThrowStatement");
  let data = false;
  if (parent) {
    if (parent.type === "BinaryExpression" && ["===", "!==", "==", "!="].includes(parent.operator)) data = true;
    else if (parent.type === "SwitchCase" && parent.test === node) data = true;
    else if (parent.type === "Property" && parent.value === node && DATA_KEYS.has(keyName(parent))) data = true;
    else if (parent.type === "CallExpression" && parent.arguments.includes(node) && parent.callee.type === "MemberExpression" &&
      !parent.callee.computed && DATA_METHODS.has(parent.callee.property.name)) data = true;
  }
  return {
    node, cls, parent, grand, dev, data,
    kind: isTpl(node) ? "template" : "string",
    raw: rawOf(text, node), start: node.start, end: node.end,
    line: node.loc.start.line, col: node.loc.start.column + 1,
  };
}

/* ---------------- impure placeholders ----------------
   L(en, af) evaluates BOTH sides. A template whose ${...} calls the
   random generator (pick, randInt, someone() ...) would then draw twice:
   the English text is still right, but a seeded dice round regenerates
   differently. Such an item is flagged `impure`; af_inject refuses it
   until a human hoists the call into a const above the template. */
const IMPURE_NAMES = new Set(["rng", "pick", "pick2", "randInt", "shuffled", "shuffle", "random", "someone", "roll", "rolled",
  "dataset", "rawset", "quadAngle", "nonQuadrantalAngle"]);
const impureName = (n) => IMPURE_NAMES.has(n) || /^rand[A-Z]/.test(n);
const calleeName = (c) => c.type === "Identifier" ? c.name : c.type === "MemberExpression" && !c.computed ? c.property.name : null;
function callsIn(node, fnOk) {
  const out = [];
  (function rec(n) {
    if (!n || typeof n.type !== "string") return;
    if (n.type === "CallExpression" || n.type === "NewExpression") out.push(n);
    if (!fnOk && FN_TYPES.has(n.type)) return;
    for (const k of Object.keys(n)) {
      if (k === "loc" || k === "range") continue;
      const v = n[k];
      if (Array.isArray(v)) v.forEach(rec); else if (v && typeof v.type === "string") rec(v);
    }
  })(node);
  return out;
}
export function impureFns(A) {
  if (A._impure) return A._impure;
  const bad = new Set();
  let grew = true;
  while (grew) {
    grew = false;
    for (const f of A.fns) {
      if (!f.name || bad.has(f.name)) continue;
      if (callsIn(f.node.body, true).some((c) => { const n = calleeName(c.callee); return n && (impureName(n) || bad.has(n)) || (c.callee.type === "MemberExpression" && calleeName(c.callee) === "random"); })) { bad.add(f.name); grew = true; }
    }
  }
  return (A._impure = bad);
}
export function isImpure(A, site) {
  if (site.kind !== "template") return false;
  const bad = impureFns(A);
  return site.node.expressions.some((e) => callsIn(e, false).some((c) => { const n = calleeName(c.callee); return n && (impureName(n) || bad.has(n)); }));
}

/* the ReturnStatement arguments of a function, nested functions excluded */
function returnsOf(fn) {
  if (fn.type === "ArrowFunctionExpression" && fn.expression) return [fn.body];
  const out = [];
  (function rec(n) {
    if (!n || typeof n.type !== "string") return;
    if (n.type === "ReturnStatement") { if (n.argument) out.push(n.argument); return; }
    if (FN_TYPES.has(n.type) || n.type === "ClassDeclaration" || n.type === "ClassExpression") return;
    for (const k of Object.keys(n)) {
      if (k === "loc" || k === "range") continue;
      const v = n[k];
      if (Array.isArray(v)) v.forEach(rec); else if (v && typeof v.type === "string") rec(v);
    }
  })(fn.body);
  return out;
}

/* ---------------- slot discovery ----------------
   Returns Map(literal node -> Set(slot labels)) plus option lists. */
function discover(A) {
  const hits = new Map(), seen = new Set(), work = [], inferred = new Map(), optionLists = [], skippedLists = [];
  const isConfig = repoRel(A.abs) === "js/config.js";
  const hit = (n, label) => { if (!hits.has(n)) hits.set(n, new Set()); hits.get(n).add(label); };
  const add = (n, label) => work.push([n, label, false]);
  const last = (label) => label.split(".").pop();
  const localFns = (name) => A.fns.filter((f) => f.name === name);

  function paramOf(id) {
    let best = null;
    for (const f of A.fns) {
      if (f.node.start > id.start || id.end > f.node.end) continue;
      const idx = f.params.findIndex((p) => p.name === id.name);
      if (idx < 0) continue;
      if (f.node.params.some((p) => p.start <= id.start && id.end <= p.end)) continue;   // the declaration itself
      if (!best || f.node.end - f.node.start < best.f.node.end - best.f.node.start) best = { f, idx };
    }
    return best;
  }
  function infer(f, idx, label) {
    if (!inferred.has(f)) inferred.set(f, new Set());
    if (inferred.get(f).has(idx)) return;
    inferred.get(f).add(idx);
    const pname = f.params[idx].name;
    if (f.name) (A.calls.get(f.name) || []).forEach((c) => c.arguments[idx] && add(c.arguments[idx], `${f.name}.${pname}`));
    else if (f.cb && idx === 0) add(f.cb.callee.object, label);   // xs.map(x => ...): x is an element of xs
  }
  const inferredFor = (name) => {
    const s = new Set();
    for (const f of localFns(name)) (inferred.get(f) || []).forEach((i) => s.add(i));
    return s;
  };

  /* the object/array literals an expression may evaluate to */
  function candidates(n, d = 0) {
    if (!n || d > 8) return [];
    switch (n.type) {
      case "ObjectExpression": case "ArrayExpression": return [n];
      case "Identifier": {
        const p = paramOf(n);
        if (p) return p.f.params[p.idx].def ? candidates(p.f.params[p.idx].def, d + 1) : [];
        return (A.bindings.get(n.name) || []).flatMap((i) => candidates(i, d + 1));
      }
      case "ConditionalExpression": return [...candidates(n.consequent, d + 1), ...candidates(n.alternate, d + 1)];
      case "LogicalExpression": return [...candidates(n.left, d + 1), ...candidates(n.right, d + 1)];
      case "CallExpression": {
        const c = n.callee;
        if (c.type === "Identifier") {
          if (MATH_CALLS.has(c.name) || HELPERS[c.name]) return [];
          const lf = localFns(c.name);
          if (lf.length) return lf.flatMap((f) => returnsOf(f.node).flatMap((r) => candidates(r, d + 1)));
          return n.arguments.flatMap((a) => candidates(a, d + 1));         // pick(xs), shuffled(xs)
        }
        if (c.type === "MemberExpression") return candidates(c.object, d + 1);   // xs.filter(...), xs.slice()
        return [];
      }
      case "MemberExpression": {
        const prop = !n.computed ? n.property.name : (isStr(n.property) ? n.property.value : null);
        const out = [];
        for (const v of elementsOf(candidates(n.object, d + 1), d)) {
          if (v.type !== "ObjectExpression") continue;
          if (prop != null) { const p = propOf(v, prop); if (p) out.push(...candidates(p.value, d + 1)); }
          else v.properties.forEach((p) => p.type === "Property" && out.push(...candidates(p.value, d + 1)));
        }
        return out;
      }
    }
    return [];
  }
  /* arrays flattened to their (object) elements, objects kept */
  function elementsOf(list, d) {
    const out = [];
    for (const v of list) {
      if (v.type === "ArrayExpression") {
        for (const e of v.elements) if (e) out.push(...(e.type === "ObjectExpression" ? [e] : elementsOf(candidates(e, d + 1), d + 1)));
      } else out.push(v);
    }
    return out;
  }

  function visit(n, label, owned, depth) {
    if (!n || depth > 60) return;
    const sk = `${n.start}:${n.end}:${n.type}:${label}:${owned ? 1 : 0}`;
    if (seen.has(sk)) return;
    seen.add(sk);
    const go = (m, l = label, o = owned) => m && visit(m.type === "SpreadElement" ? m.argument : m, l, o, depth + 1);
    switch (n.type) {
      case "Literal": if (!owned && typeof n.value === "string" && hasLetter(n)) hit(n, label); return;
      case "TemplateLiteral":
        /* an item template owns its ${...}: literals physically inside stay
           verbatim in the table; values flowing in by name are still followed */
        if (!owned && hasLetter(n)) { hit(n, label); n.expressions.forEach((e) => go(e, "placeholder", true)); }
        else n.expressions.forEach((e) => go(e));
        return;
      case "ArrayExpression": n.elements.forEach((e) => go(e)); return;
      case "ConditionalExpression": go(n.consequent); go(n.alternate); return;
      case "LogicalExpression": go(n.left); go(n.right); return;
      case "BinaryExpression": if (n.operator === "+") { go(n.left); go(n.right); } return;
      case "SequenceExpression": go(n.expressions[n.expressions.length - 1]); return;
      case "AwaitExpression": go(n.argument); return;
      case "ChainExpression": go(n.expression); return;
      case "ArrowFunctionExpression": case "FunctionExpression": returnsOf(n).forEach((r) => go(r)); return;
      case "ObjectExpression": {
        const inner = INNER[last(label)] || [];
        for (const p of n.properties) {
          if (p.type === "SpreadElement") { go(p.argument); continue; }
          const k = keyName(p);
          if (k && inner.includes(k)) go(p.value, k === "sol" ? "solution" : `${last(label)}.${k}`, false);
        }
        return;
      }
      case "Identifier": {
        const p = paramOf(n);
        if (p) { infer(p.f, p.idx, label); if (p.f.params[p.idx].def) go(p.f.params[p.idx].def, label, false); return; }
        (A.bindings.get(n.name) || []).forEach((init) => go(init, label, false));
        return;
      }
      case "MemberExpression": {
        if (!n.computed && n.property.name === "length") return;
        const prop = !n.computed ? n.property.name : (isStr(n.property) ? n.property.value : null);
        const l2 = prop === "sol" || prop === "solution" ? "solution" : (prop === "options" || prop === "wrongs") ? prop : label;
        for (const v of candidates(n.object)) {
          if (prop != null) {
            for (const o of elementsOf([v], 0)) if (o.type === "ObjectExpression") { const q = propOf(o, prop); if (q) go(q.value, l2, false); }
          } else if (v.type === "ObjectExpression") v.properties.forEach((q) => q.type === "Property" && go(q.value, label, false));
          else v.elements.forEach((e) => go(e, label, false));
        }
        return;
      }
      case "CallExpression": {
        const c = n.callee;
        if (c.type === "Identifier") {
          if (A.Lname && c.name === A.Lname) { if (!owned && isLit(n.arguments[0])) hit(n.arguments[0], "L"); return; }
          if (MATH_CALLS.has(c.name)) return;
          const h = HELPERS[c.name], inf = inferredFor(c.name);
          if (h || inf.size) {
            new Set([...(h ? h.text : []), ...inf]).forEach((i) =>
              n.arguments[i] && go(n.arguments[i], `${c.name}.${h ? h.params[i] : localFns(c.name)[0]?.params[i]?.name || "arg" + i}`));
            if (h && h.opts != null) go(n.arguments[h.opts], `${c.name}.opts`);
            if (h && h.pool != null) go(n.arguments[h.pool], "pool");
            if (!h) localFns(c.name).forEach((f) => returnsOf(f.node).forEach((r) => go(r, label, false)));
            return;
          }
          const lf = localFns(c.name);
          if (lf.length) { lf.forEach((f) => returnsOf(f.node).forEach((r) => go(r, label, false))); return; }
          n.arguments.forEach((a) => go(a));          // pick([...]), shuffled(...), String(x), someone()
          return;
        }
        if (c.type === "MemberExpression") {
          const m = !c.computed ? c.property.name : null;
          go(c.object);
          if (["join", "concat", "replace", "replaceAll", "padStart", "padEnd"].includes(m)) n.arguments.forEach((a) => go(a));
          if (["map", "flatMap"].includes(m)) n.arguments.forEach((a) => FN_TYPES.has(a.type) && go(a));
        }
        return;
      }
    }
  }

  if (A.exam) {
    for (const s of A.sites) if (s.cls === "pairEn") hit(s.node, "exam.en");
  } else {
    /* 1. helper calls */
    for (const [name, list] of A.calls) {
      const h = HELPERS[name];
      if (!h) continue;
      for (const call of list) {
        h.text.forEach((i) => call.arguments[i] && add(call.arguments[i], `${name}.${h.params[i]}`));
        if (h.opts != null && call.arguments[h.opts]) add(call.arguments[h.opts], `${name}.opts`);
        if (h.pool != null && call.arguments[h.pool]) add(call.arguments[h.pool], "pool");
      }
    }
    /* 2. prose properties */
    walk.simple(A.ast, {
      ObjectExpression(o) {
        const ks = new Set(o.properties.map(keyName).filter(Boolean));
        const pool = ks.has("q") && (ks.has("correct") || ks.has("yes") || ks.has("ans") || ks.has("wrongs"));
        const option = ks.has("label") && (ks.has("correct") || ks.has("spec"));
        for (const p of o.properties) {
          const k = keyName(p);
          if (!k || p.type !== "Property") continue;
          if (SLOTS.includes(k) || (isConfig && CONFIG_SLOTS.includes(k)) || (pool && POOL_SLOTS.includes(k)) || (option && OPTION_SLOTS.includes(k)))
            add(p.value, k === "sol" ? "solution" : k);
        }
      },
    });
    /* 3. option lists: module-level const NAME = ["...", "..."] */
    for (const st of A.ast.body) {
      const decl = st.type === "ExportNamedDeclaration" ? st.declaration : st;
      if (!decl || decl.type !== "VariableDeclaration" || decl.kind !== "const") continue;
      for (const d of decl.declarations) {
        if (d.id.type !== "Identifier" || !d.init || d.init.type !== "ArrayExpression") continue;
        const els = d.init.elements;
        if (els.length < 2 || !els.every((e) => e && (isStr(e) || (isTpl(e) && !e.expressions.length)) && hasLetter(e))) continue;
        if (els.some((e) => /\s/.test(visibleText(e).trim()))) { optionLists.push({ name: d.id.name, nodes: els }); els.forEach((e) => hit(e, "optionList")); }
        else skippedLists.push({ name: d.id.name, values: els.map((e) => visibleText(e)) });
      }
    }
    /* 4. already wrapped L(<lit>, <lit>) */
    if (A.Lname) (A.calls.get(A.Lname) || []).forEach((c) => isLit(c.arguments[0]) && hit(c.arguments[0], "L"));
    while (work.length) { const [n, label, owned] = work.pop(); visit(n, label, owned, 0); }
  }
  return { hits, optionLists, skippedLists };
}

/* ---------------- items for one file ----------------
   Shared with af_inject.mjs: given the set of item texts, which sites
   carry them (same-text propagation + the ownership rule). */
export function itemSites(A, texts) {
  const okCls = A.exam ? new Set(["pairEn"]) : new Set(["free", "L0"]);
  const cand = A.sites.filter((s) => okCls.has(s.cls) && texts.has(s.raw));
  /* owners: item templates, and every af side (L1 / pairAf) */
  const owners = [...cand.filter((s) => s.kind === "template"), ...A.sites.filter((s) => s.cls === "L1" || s.cls === "pairAf")];
  const owned = (s) => owners.some((o) => o !== s && o.start <= s.start && s.end <= o.end && (o.start < s.start || s.end < o.end));
  return cand.filter((s) => !owned(s));
}
export function existingAf(A, s) {
  if (s.cls === "L0") { const a1 = s.parent.arguments[1]; return isLit(a1) ? rawOf(A.text, a1) : undefined; }
  if (s.cls === "pairEn") { const p = propOf(s.grand, "af"); return p && isLit(p.value) ? rawOf(A.text, p.value) : undefined; }
  return undefined;
}

export function extractFile(abs) {
  const { text } = readSource(abs);
  const A = analyse(text, abs);
  const base = path.basename(abs);
  const { hits, optionLists, skippedLists } = discover(A);
  const slotsByText = new Map();
  for (const [n, labels] of hits) {
    const s = A.siteByNode.get(n);
    if (!s) continue;
    if (!slotsByText.has(s.raw)) slotsByText.set(s.raw, new Set());
    labels.forEach((l) => slotsByText.get(s.raw).add(l));
  }
  const occ = itemSites(A, new Set(slotsByText.keys()));
  const byText = new Map();
  for (const s of occ.sort((a, b) => a.start - b.start)) {
    if (!byText.has(s.raw)) byText.set(s.raw, []);
    byText.get(s.raw).push(s);
  }
  const occSet = new Set(occ);
  const afSides = A.sites.filter((s) => s.cls === "L1" || s.cls === "pairAf");
  const inside = (s, o) => o !== s && o.start <= s.start && s.end <= o.end;
  const items = [], afConflicts = [];
  for (const [raw, list] of byText) {
    const first = list[0];
    const it = { en: raw, kind: first.kind, slots: [...slotsByText.get(raw)].sort(), where: list.map((s) => `${base}:${s.line}:${s.col}`), _first: first, _sites: list };
    const afs = [...new Set(list.map((s) => existingAf(A, s)).filter((v) => v !== undefined))];
    if (afs.length) it.af = afs[0];
    if (afs.length > 1) afConflicts.push(raw);
    if (list.some((s) => s.data)) it.data = true;
    if (isImpure(A, first)) it.impure = true;
    if (first.kind === "template") {
      const nested = A.sites.filter((s) => inside(s, first) && hasLetter(s.node)).map((s) => s.raw);
      if (nested.length) it.nested = nested;
    }
    it.words = wordCount(first.node);
    items.push(it);
  }
  items.sort((a, b) => a._first.start - b._first.start);
  /* leftovers: prose nobody claimed */
  const itemTpls = occ.filter((s) => s.kind === "template");
  const leftovers = [];
  for (const s of A.sites) {
    if (occSet.has(s) || s.dev || !["free", "L0", "pairEn"].includes(s.cls)) continue;
    if (afSides.some((o) => inside(s, o))) continue;
    if (!englishWords(s.node)) continue;
    const owner = itemTpls.find((o) => inside(s, o));
    leftovers.push({ where: `${base}:${s.line}:${s.col}`, text: s.raw.length > 200 ? s.raw.slice(0, 200) + "…" : s.raw, ...(owner ? { in: owner.raw.slice(0, 60) } : {}), ...(isImpure(A, s) ? { impure: true } : {}) });
  }
  /* exam pairs whose en is not a literal: nothing can be twinned there */
  const nonLiteralPairs = [];
  if (A.exam) walk.simple(A.ast, {
    ObjectExpression(o) {
      if (!isPairObj(o)) return;
      const en = propOf(o, "en");
      if (en && !isLit(en.value)) nonLiteralPairs.push({ where: `${base}:${en.loc.start.line}:${en.loc.start.column + 1}`, src: text.slice(en.value.start, en.value.end).slice(0, 80) });
    },
  });
  return { abs, base, items, optionLists, skippedLists, leftovers, nonLiteralPairs, afConflicts, A };
}

/* ---------------- the CLI ---------------- */
function parseArgs(argv) {
  const o = { unit: null, out: path.join(REPO, "briefs", "af"), dry: false, force: false, files: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--unit") o.unit = argv[++i];
    else if (a === "--out") o.out = path.resolve(argv[++i]);
    else if (a === "--dry") o.dry = true;
    else if (a === "--force") o.force = true;
    else o.files.push(a);
  }
  return o;
}
const clip = (s, n = 100) => (s.length > n ? s.slice(0, n) + "…" : s).replace(/\n/g, "⏎");

export function buildTable(unit, absFiles) {
  const table = { unit, generated: new Date().toISOString(), files: [], items: {}, optionLists: {}, leftovers: [], words: 0 };
  const reports = [];
  for (const abs of absFiles) {
    const r = extractFile(abs);
    const stem = r.base.replace(/\.m?js$/, "");
    table.files.push(repoRel(abs));
    const keyOf = new Map();
    r.items.forEach((it, i) => {
      const key = `${stem}#${i + 1}`;
      keyOf.set(it._first, key);
      it._sites.forEach((s) => keyOf.set(s, key));
      const row = { en: it.en, kind: it.kind, slots: it.slots, where: it.where };
      if (it.af !== undefined) row.af = it.af;
      if (it.nested) row.nested = it.nested;
      if (it.data) row.data = true;
      if (it.impure) row.impure = true;
      table.items[key] = row;
      table.words += it.words;
      it.key = key;
    });
    for (const ol of r.optionLists) {
      table.optionLists[`${r.base}:${ol.name}`] = ol.nodes.map((n) => keyOf.get(r.A.siteByNode.get(n)) || `(not an item: ${clip(rawOf(r.A.text, n), 40)})`);
    }
    table.leftovers.push(...r.leftovers);
    if (r.nonLiteralPairs.length) (table.nonLiteralPairs ||= []).push(...r.nonLiteralPairs);
    if (r.afConflicts.length) (table.afConflicts ||= []).push(...r.afConflicts.map((t) => `${r.base}: ${clip(t, 60)}`));
    if (r.skippedLists.length) (table.skippedLists ||= []).push(...r.skippedLists.map((l) => `${r.base}:${l.name} [${l.values.join(", ")}]`));
    reports.push(r);
  }
  return { table, reports };
}

function main() {
  const o = parseArgs(process.argv.slice(2));
  if (!o.unit || !o.files.length) {
    console.error("usage: node tools/af_extract.mjs --unit <name> [--out <dir>] [--dry] [--force] <file> [<file> ...]");
    process.exit(2);
  }
  const abs = o.files.map((f) => { const a = resolveFile(f); if (!a) { console.error(`af_extract: no such file: ${f}`); process.exit(2); } return a; });
  const bases = abs.map((a) => path.basename(a));
  const dup = bases.find((b, i) => bases.indexOf(b) !== i);
  if (dup) { console.error(`af_extract: two files called ${dup} in one unit; keys would collide. Split the unit.`); process.exit(2); }

  const { table, reports } = buildTable(o.unit, abs);
  console.log(`af_extract: unit ${o.unit} (${abs.length} file${abs.length > 1 ? "s" : ""})`);
  for (const r of reports) {
    const places = r.items.reduce((n, it) => n + it.where.length, 0);
    const words = r.items.reduce((n, it) => n + it.words, 0);
    const twinned = r.items.filter((it) => it.af !== undefined).length;
    console.log(`  ${repoRel(r.abs)}: ${r.items.length} items (${places} places), ${words} words, ${twinned} already twinned`);
    for (const ol of r.optionLists) console.log(`    option list ${ol.name}: ${table.optionLists[`${r.base}:${ol.name}`].join(", ")}`);
    for (const l of r.skippedLists) console.log(`    skipped id-like list ${l.name}: [${l.values.join(", ")}] (no spaces: treated as data; wrap by hand if it is prose)`);
    const data = r.items.filter((it) => it.data);
    if (data.length) console.log(`    also used as data (translator: keep identical unless the code is checked): ${data.map((it) => `${it.key} "${clip(it.en, 30)}"`).join("; ")}`);
    const impure = r.items.filter((it) => it.impure);
    if (impure.length) console.log(`    ⚠ \${...} calls the random generator (af_inject refuses these; hoist the call into a const first): ${impure.map((it) => `${it.key} "${clip(it.en, 40)}"`).join("; ")}`);
    const nested = r.items.filter((it) => it.nested);
    if (nested.length) console.log(`    templates with literals inside \${...} (kept verbatim): ${nested.map((it) => it.key).join(", ")}`);
    if (r.afConflicts.length) console.log(`    ⚠ same English, different existing af: ${r.afConflicts.map((t) => clip(t, 40)).join("; ")}`);
    if (r.nonLiteralPairs.length) console.log(`    pairs with a non-literal en (cannot be twinned by the tools): ${r.nonLiteralPairs.length}`);
    console.log(`    leftovers (${r.leftovers.length}):`);
    for (const l of r.leftovers) console.log(`      ${l.where}  ${clip(l.text, 110)}${l.in ? `   [inside \${...} of "${clip(l.in, 30)}"]` : ""}${l.impure ? "   [⚠ calls the random generator]" : ""}`);
  }
  console.log(`  total: ${Object.keys(table.items).length} items, ${table.words} words, ${table.leftovers.length} leftovers`);
  if (o.dry) { console.log("  dry run: nothing written"); return; }

  /* never orphan a translation: an existing af.json must still match */
  const enPath = path.join(o.out, `${o.unit}.en.json`), afPath = path.join(o.out, `${o.unit}.af.json`);
  if (!o.force && fs.existsSync(afPath) && fs.existsSync(enPath)) {
    const oldEn = JSON.parse(fs.readFileSync(enPath, "utf8")), af = JSON.parse(fs.readFileSync(afPath, "utf8"));
    const moved = Object.keys(af).filter((k) => oldEn.items[k] && (!table.items[k] || table.items[k].en !== oldEn.items[k].en));
    if (moved.length) {
      console.error(`af_extract: REFUSED. ${afPath} already translates ${moved.length} key(s) that would now point at different English: ${moved.slice(0, 12).join(", ")}${moved.length > 12 ? " …" : ""}`);
      console.error("  Inject the existing translation first, or re-run with --force to start the table over.");
      process.exit(1);
    }
  }
  fs.mkdirSync(o.out, { recursive: true });
  fs.writeFileSync(enPath, JSON.stringify(table, null, 2) + "\n", "utf8");
  console.log(`  wrote ${path.relative(process.cwd(), enPath).split(path.sep).join("/")}`);
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) main();
