/* ============================================================
   EXAM FOCUS — node harness for the 15 overnight-run-#1 modules
   registered into js/exam/index.js (day session, 2026-08-22 —
   OVERNIGHT-1-REPORT.md's "day-session work list", item 1). Adapted
   from that overnight run's own scratch check script (which reported
   325/325 green) into a permanent repo-root harness, because some of
   its checks — a per-module independent recompute of every prompt's
   numbers, worked from first principles, never copied from a memo
   string — don't host cleanly inside verify-exam.html's browser-side
   Part 7 (that HTML harness's own recompute stays scoped to the
   eqn/nature-of-roots pilot; this file is where its stated "the
   harness recomputes every seeded question's numbers from prompt
   data" promise for the 15 new modules actually lives). Run with:

     node verify-exam-modules.mjs

   SCOPE: the 15 modules registered that session (eqn ×5 new + the
   eqn/nature-of-roots pilot for id-uniqueness only, exp ×3, func ×4,
   trig ×3 — two of which became GTRIG questions on 2026-08-22 without
   changing file, id or topic), PLUS — added the next day session, 2026-08-22 — the two
   EUCLIDEAN modules, promoted out of js/exam/_pending-engine-port/
   once the Circle Quest engine port landed
   (js/exam/circle-engine.js). Extending the MODULES list was the
   route that session was asked to take, rather than duplicating this
   file's machinery, so that is what it did; the Euclidean-specific
   work is section 9 at the bottom (diagrams).
   ============================================================ */

const { validateQuestion } = await import("./js/exam/_schema.js");
const { CHAPTERS } = await import("./js/config.js");
const { eqnNatureOfRootsQuestions } = await import("./js/exam/eqn-nature-of-roots.js");

const MODULES = [
  ["exp-first-step-and-method.js",        "expFirstStepAndMethodQuestions"],
  ["eqn-k-method.js",                     "eqnKMethodQuestions"],
  ["eqn-inequalities.js",                 "eqnInequalitiesQuestions"],
  ["func-hyperbola-and-exponential.js",   "funcHyperbolaAndExponentialQuestions"],
  ["func-graphs-together.js",             "funcGraphsTogetherQuestions"],
  ["eqn-nature-of-roots-2.js",            "eqnNatureOfRootsTopUpQuestions"],
  ["exp-conjugates-and-rationalising.js", "expConjugatesAndRationalisingQuestions"],
  ["exp-no-solution-and-strategy.js",     "expNoSolutionAndStrategyQuestions"],
  ["eqn-fractions-and-restrictions.js",   "eqnFractionsAndRestrictionsQuestions"],
  ["eqn-inequalities-2.js",               "eqnInequalitiesTopUpQuestions"],
  ["func-line-and-parabola.js",           "funcLineAndParabolaQuestions"],
  /* --- Sept T2, non-Euclidean. The two trig-*.js files below now
     declare chapter "gtrig" (2026-08-22) — same ids, same topics. --- */
  ["trig-reduction-and-ratios.js",        "trigReductionAndRatiosQuestions"],
  ["trig-general-solutions.js",           "trigGeneralSolutionsQuestions"],
  ["func-hyperbola-and-exponential-2.js", "funcHyperbolaAndExponentialT2Questions"],
  ["trig-mixed-problems.js",              "trigMixedProblemsQuestions"],
  /* --- Sept T2, EUCLIDEAN (registered 2026-08-22, engine-port day) --- */
  ["euclid-circle-theorems.js",           "euclidCircleTheoremsQuestions"],
  ["euclid-tangents-and-cyclic-quads.js", "euclidTangentsAndCyclicQuadsQuestions"],
];

/* the ported diagram engine, for section 9 */
const { verifyDiagram, computeGeometry, highlightedSpec, diagramRefIssues } =
  await import("./js/exam/circle-engine.js");
const { EXAM_ONLY_CHAPTERS, EXAM_CHAPTERS } = await import("./js/config.js");

/* Questions whose lostQuest CANNOT resolve, by design, each with a
   documented placeholder in its file header. Excluded from the resolve
   check below; asserted to carry the placeholder instead. */
const LOST_PLACEHOLDER_EXPECTED = new Set([
  /* 2026-08-22, stage 4 of the General Trig build: trig.rr.t2q1 and
     trig.gs.t2q2 LEFT this set. They were placeholders only because no
     round taught reductions or general solutions; gtrig's gt5 and gt11
     now do, so both were relinked and both moved into the gtrig
     chapter. They are checked by the ordinary resolve path below. */
  /* EUCLIDEAN (2026-08-22). Not "waiting on" anything — her ruling that
     morning was that the Euclidean exam chapter has NO "I'm lost" button
     at all ("they don't need it anyway"). The schema still requires the
     field, so it carries an unresolvable PENDING- id; a chapter that is
     not in js/config.js CHAPTERS cannot resolve either half of it, which
     is precisely what makes the button not render. */
  "euclid.circ.t2q4",
  "euclid.tan.t2q5",
]);

let total = 0, passed = 0; const fails = [];
const tick = (cond, label) => { total++; if (cond) passed++; else fails.push(label); return cond; };
const near = (a, b) => Math.abs(a - b) < 1e-9;

/* ---------- load ---------- */
const mine = [];
for (const [file, exportName] of MODULES) {
  const m = await import(`./js/exam/${file}`);
  const arr = m[exportName];
  tick(Array.isArray(arr) && arr.length > 0, `${file}: exports ${exportName} as a non-empty array`);
  (arr || []).forEach(q => mine.push({ file, q }));
}
console.log(`loaded ${mine.length} questions from ${MODULES.length} files (+ ${eqnNatureOfRootsQuestions.length} live pilot questions, checked for id-uniqueness only)\n`);

/* ---------- 1. schema ---------- */
console.log("== 1. validateQuestion() (marks sum, ticks sum, levels, glyphs, lostQuest shape) ==");
mine.forEach(({ file, q }) => {
  const { ok, issues } = validateQuestion(q);
  tick(ok, `${q.id}: validateQuestion — ${issues.join(" | ")}`);
  console.log(`  ${q.id.padEnd(20)} ${String(q.marks).padStart(2)} marks · ${q.parts.length} parts · ${ok ? "OK" : "FAIL: " + issues.join(" | ")}`);
});

/* ---------- 2. id uniqueness across the WHOLE bank ---------- */
console.log("\n== 2. id uniqueness (the 15 new modules + the 4 live pilot questions) ==");
const allIds = [...eqnNatureOfRootsQuestions.map(q => q.id), ...mine.map(m => m.q.id)];
const dupes = allIds.filter((id, i) => allIds.indexOf(id) !== i);
tick(dupes.length === 0, `duplicate question ids: ${dupes.join(", ")}`);
console.log(`  ${allIds.length} ids, ${new Set(allIds).size} distinct — ${dupes.length ? "FAIL " + dupes : "OK"}`);
mine.forEach(({ q }) => {
  const partIds = q.parts.map(p => p.id);
  tick(new Set(partIds).size === partIds.length, `${q.id}: duplicate part ids`);
});

/* ---------- 3. lostQuest resolves against js/config.js ---------- */
console.log("\n== 3. lostQuest ids exist in js/config.js CHAPTERS (placeholders asserted separately) ==");
mine.forEach(({ q }) => {
  const ch = CHAPTERS.find(c => c.id === q.lostQuest.chapter);
  const qu = ch && (ch.quests || []).find(x => x.id === q.lostQuest.quest);
  if (LOST_PLACEHOLDER_EXPECTED.has(q.id)) {
    const isPlaceholder = /^PENDING-/.test(q.lostQuest.quest) && !qu;
    tick(isPlaceholder, `${q.id}: expected a PENDING- lostQuest placeholder, got ${JSON.stringify(q.lostQuest)}`);
    console.log(`  ${q.id.padEnd(20)} → ${q.lostQuest.chapter}/${q.lostQuest.quest} — ${isPlaceholder ? "OK, documented placeholder (renders no reteach link, by design)" : "FAIL"}`);
    return;
  }
  tick(!!ch && !!qu, `${q.id}: lostQuest ${JSON.stringify(q.lostQuest)} does not resolve`);
  console.log(`  ${q.id.padEnd(20)} → ${q.lostQuest.chapter}/${q.lostQuest.quest} "${qu ? qu.title : "??"}" — ${ch && qu ? "OK" : "FAIL"}`);
  tick(q.lostQuest.chapter === q.chapter, `${q.id}: lostQuest.chapter (${q.lostQuest.chapter}) differs from q.chapter (${q.chapter}) — allowed by schema but flag it`);
});
/* the two placeholders must be exactly the two expected — no silent drift */
{
  const actual = new Set(mine.filter(m => /^PENDING-/.test(m.q.lostQuest.quest)).map(m => m.q.id));
  const same = actual.size === LOST_PLACEHOLDER_EXPECTED.size && [...actual].every(id => LOST_PLACEHOLDER_EXPECTED.has(id));
  tick(same, `placeholder set drifted: got [${[...actual]}], expected [${[...LOST_PLACEHOLDER_EXPECTED]}]`);
  console.log(`  placeholder set: [${[...actual].join(", ")}] — ${same ? "OK, exactly the two documented ones" : "FAIL"}`);
}

/* ---------- 4. star (level === 4) placement ---------- */
console.log("\n== 4. star (level === 4) placement ==");
const EXPECTED_STARS = {
  "exp.fsm.t1q1": [],            // print memo stars nothing in Q1
  "eqn.km.t1q2": [],             // nothing in Q2
  "eqn.ineq.t1q3": ["b"],        // print memo ★ 3(b)
  "func.hyp.t1q4": [],           // nothing in Q4
  "func.gt.t1q5": ["b", "c"],    // print memo ★ 5(b), 5(c)
  "eqn.nor.q5": ["d"],
  "exp.cr.q1": [],
  "exp.nss.q1": ["d"],
  "eqn.fr.q1": ["d"],
  "eqn.ineq.q2": ["d"],
  "func.lp.q1": ["e"],
  /* --- Sept T2. The print memo stars exactly 3(e) and 5(d) (5(d) is
     one of the pending Euclidean modules, out of scope here). --- */
  "trig.rr.t2q1": [],
  "trig.gs.t2q2": [],
  "func.hyp.t2q3": ["e"],   // print memo ★ 3(e)
  "trig.mix.t2q6": [],
  /* Euclidean: the print memo stars 5(d) and nothing in Q4. */
  "euclid.circ.t2q4": [],
  "euclid.tan.t2q5": ["d"],
};
mine.forEach(({ q }) => {
  const stars = q.parts.filter(p => p.level === 4).map(p => p.id);
  const want = EXPECTED_STARS[q.id];
  tick(JSON.stringify(stars) === JSON.stringify(want), `${q.id}: level-4 parts are [${stars}] but should be [${want}]`);
  console.log(`  ${q.id.padEnd(20)} level-4 parts [${stars.join(",") || "none"}] — ${JSON.stringify(stars) === JSON.stringify(want) ? "OK" : "FAIL, want [" + want + "]"}`);
  q.parts.forEach(p => tick([1, 2, 3, 4].includes(p.level), `${q.id}(${p.id}): level ${p.level} out of range`));
});
const t1Stars = mine.filter(m => m.q.paper === "sept-t1").flatMap(m => m.q.parts.filter(p => p.level === 4).map(p => `${m.q.id}(${p.id})`));
tick(t1Stars.length === 3, `the five sept-t1 modules carry exactly 3 stars (print memo stars 3(b), 5(b), 5(c)) — got ${t1Stars.length}`);
console.log(`  sept-t1 stars overall: ${t1Stars.join(", ")} — ${t1Stars.length === 3 ? "OK, matches the printed memo" : "FAIL"}`);
const t2Stars = mine.filter(m => m.q.paper === "sept-t2").flatMap(m => m.q.parts.filter(p => p.level === 4).map(p => `${m.q.id}(${p.id})`));
/* WAS 1 while 5(d) sat unregistered in _pending-engine-port/; now that the
   Euclidean modules are in, the count is the printed paper's own: exactly
   the two starred parts, 3(e) and 5(d). */
tick(t2Stars.length === 2, `the six sept-t2 modules carry exactly 2 stars (the print memo stars 3(e) and 5(d)) — got ${t2Stars.length}`);
console.log(`  sept-t2 stars overall: ${t2Stars.join(", ")} — ${t2Stars.length === 2 ? "OK, matches the printed memo" : "FAIL"}`);

/* ---------- 5. glyph hygiene beyond the validator ---------- */
console.log("\n== 5. glyph hygiene (validator already checks dot-decimals + hyphen-before-digit) ==");
let glyphBad = [];
mine.forEach(({ q }) => {
  const walk = (s, where) => {
    if (typeof s !== "string") return;
    if (/\d\.\d/.test(s)) glyphBad.push(`${where}: dot-decimal`);
    if (/-\d/.test(s)) glyphBad.push(`${where}: ASCII hyphen before a digit`);
    if (/⁄/.test(s)) glyphBad.push(`${where}: U+2044 fraction slash (renders unevenly — use /)`);
    if (/[⅐-⅞]/.test(s)) glyphBad.push(`${where}: vulgar-fraction glyph (font-risky — write 1/3)`);
  };
  q.parts.forEach(p => {
    walk(p.prompt.en, `${q.id}(${p.id}).prompt`);
    walk(p.hint.en, `${q.id}(${p.id}).hint`);
    walk(p.esplain.en, `${q.id}(${p.id}).esplain`);
    p.memo.forEach((b, i) => walk(b.text.en, `${q.id}(${p.id}).memo[${i}]`));
  });
});
tick(glyphBad.length === 0, `glyph issues: ${glyphBad.join(" | ")}`);
console.log(`  ${glyphBad.length ? "FAIL: " + glyphBad.join("\n       ") : "OK — no dot-decimals, no ASCII minus, no font-risky fraction glyphs"}`);

/* ---------- 6. English-only + required fields ---------- */
console.log("\n== 6. English-only (session E) + every part has hint/memo/esplain ==");
let afFound = 0, missing = [];
mine.forEach(({ q }) => q.parts.forEach(p => {
  if (p.prompt.af || p.hint.af || p.esplain.af) afFound++;
  p.memo.forEach(b => { if (b.text.af) afFound++; });
  if (!p.hint || !p.esplain || !p.memo.length) missing.push(`${q.id}(${p.id})`);
}));
tick(afFound === 0, `${afFound} af strings present — session E composes EN-only`);
tick(missing.length === 0, `parts missing hint/memo/esplain: ${missing.join(", ")}`);
console.log(`  af strings: ${afFound} (want 0) · parts missing a required field: ${missing.length} — ${afFound === 0 && !missing.length ? "OK" : "FAIL"}`);

/* ---------- 7. topic slugs vs scope walls (mirrors verify-exam.html Part 6) ---------- */
console.log("\n== 7. topic slugs vs scope walls ==");
const WALLS = {
  eqn: ["standard-form-and-factorising", "special-cases", "k-method", "fractions-and-restrictions",
        "perfect-square-and-turning-point", "formula-and-simultaneous", "inequalities", "nature-of-roots"],
  exp: ["exponent-laws", "spot-the-trap", "first-step-and-method", "which-divorce", "surd-laws-and-traps",
        "conjugates-and-rationalising", "rational-exponent-equations", "no-solution-and-strategy"],
  func: ["four-families", "line-and-parabola", "hyperbola-and-exponential", "reading-a-graph",
         "inequalities-off-a-graph", "transformations", "graphs-together"],
  /* trig wall from the t1–t7 quest breakdown — sine rule, cosine rule,
     area rule and mixed problems, nothing else. The two topics that
     used to sit here and stretch it past its own rounds moved to the
     gtrig wall below on 2026-08-22. */
  /* GENERAL TRIG (2026-08-22): its own chapter, its own rounds — the
     two topics that used to widen the trig wall belong here now. */
  gtrig: ["introduction", "cartesian-plane", "special-angles", "co-functions", "reductions",
          "tip-chips", "reduction-and-ratios", "special-sums", "identities",
          "super-special-sums", "six-types", "general-solutions", "undefined-values"],
  trig: ["which-rule-fits", "sine-rule-sides", "sine-rule-angles", "cosine-rule-sides",
         "cosine-rule-angles", "area-rule", "mixed-problems"],
  /* EUCLIDEAN wall, from GR11-IEB-PAPER-BANK.md's Grade 11 Euclidean
     scope wall (four examinable proofs, acute case only; everything
     else use-as-result; no similarity, no concurrency, no proof by
     contradiction) — proposed in README-PENDING.md, adopted here. */
  euclid: ["circle-theorems", "tangents-and-cyclic-quads"],
};
/* Nothing widens a chapter past its own rounds any more: the two topics
   that did were moved into the chapter that teaches them (2026-08-22). */
const WALL_NEEDS_A_DECISION = new Set();
mine.forEach(({ q }) => {
  const ok = WALLS[q.chapter] && WALLS[q.chapter].includes(q.topic);
  tick(ok, `${q.id}: topic "${q.topic}" outside the ${q.chapter} wall`);
  const flag = WALL_NEEDS_A_DECISION.has(q.topic) ? "  ⚠ widens the chapter past its built rounds — already decided this session, see header" : "";
  console.log(`  ${q.id.padEnd(20)} ${q.chapter}/${q.topic} — ${ok ? "OK" : "FAIL"}${flag}`);
});

/* =====================================================================
   8. INDEPENDENT RECOMPUTE — every number, worked from the PROMPT text
   only. Nothing below reads a memo string.
   ===================================================================== */
console.log("\n== 8. independent recompute of every number ==");
const R = [];
const chk = (label, got, want) => { const ok = near(got, want); R.push(`  ${ok ? "OK  " : "FAIL"} ${label}: got ${got}, want ${want}`); tick(ok, `recompute ${label}`); };
const chkS = (label, got, want) => { const ok = got === want; R.push(`  ${ok ? "OK  " : "FAIL"} ${label}: got ${got}, want ${want}`); tick(ok, `recompute ${label}`); };

/* --- T1 Q1 (exp.fsm.t1q1) --- */
chk("1(a) √48 + √300 − √27 = 11√3", Math.sqrt(48) + Math.sqrt(300) - Math.sqrt(27), 11 * Math.sqrt(3));
chk("1(b) 6/(√5−√2) = 2√5 + 2√2", 6 / (Math.sqrt(5) - Math.sqrt(2)), 2 * Math.sqrt(5) + 2 * Math.sqrt(2));
{ const x = 1.7; const v = (3 ** (x + 1) + 3 ** (x - 1)) / (3 ** x + 3 ** (x - 2)); chk("1(c) exponential fraction = 3 (tested at x = 1,7)", v, 3); }
{ const x = 2.3, a = 2 ** x, b = 3 ** x; chk("1(d) 72^x = a³b² (tested at x = 2,3)", 72 ** x, a ** 3 * b ** 2); }

/* --- T1 Q2 (eqn.km.t1q2) --- */
chk("2(a) 2x^(3/4) = 54 at x = 81", 2 * 81 ** 0.75, 54);
chk("2(a) OR route: 27⁴ = 531 441", 27 ** 4, 531441);
[-5, 3].forEach(x => chk(`2(b) x = ${x} satisfies the fraction equation`, 4 / (x - 2) + x / (x + 2), 23 / (x * x - 4)));
chkS("2(b) neither root is a limit (±2)", [-5, 3].some(x => x === 2 || x === -2), false);
chk("2(c) x = 16 satisfies x − 3√x − 4 = 0", 16 - 3 * Math.sqrt(16) - 4, 0);
chkS("2(c) the K = −1 branch is impossible (√x ≥ 0)", -1 >= 0, false);
chkS("2(c) OR route's x = 1 is genuinely extraneous", near(1 - 3 * Math.sqrt(1) - 4, 0), false);

/* --- T1 Q3 (eqn.ineq.t1q3) --- */
{ // 3(a): brute sweep of (x+1)(5−x) ≥ 0 against −1 ≤ x ≤ 5
  let bad = 0;
  for (let i = -400; i <= 800; i++) { const x = i / 100; const lhs = (x + 1) * (5 - x) >= 0; const claim = x >= -1 && x <= 5; if (lhs !== claim) bad++; }
  chk("3(a) (x+1)(5−x) ≥ 0 ⇔ −1 ≤ x ≤ 5 (1 201-point sweep, mismatches)", bad, 0);
}
{ // 3(b): Δ = (p−1)² − 4(p−3) equals (p−3)² + 4, and its minimum is 4
  let bad = 0, min = Infinity;
  for (let i = -2000; i <= 2000; i++) { const p = i / 100; const d = (p - 1) ** 2 - 4 * (p - 3); if (!near(d, (p - 3) ** 2 + 4)) bad++; min = Math.min(min, d); }
  chk("3(b) Δ = (p−1)²−4(p−3) ≡ (p−3)²+4 (4 001-point sweep, mismatches)", bad, 0);
  chk("3(b) minimum of Δ over the sweep", min, 4);
}

/* --- T1 Q4 (func.hyp.t1q4) --- */
{ const h = x => 6 / (x + 2) + 1;
  chk("4(a) h(0) = 4, so A(0 ; 4) is on h", h(0), 4);
  chk("4(c) h(−8) = 0, so B(−8 ; 0)", h(-8), 0);
  chk("4(d) axis y = x + 3 passes through (−2 ; 1)", -2 + 3, 1);
  let bad = 0;
  for (let i = -2000; i <= 1000; i++) { const x = i / 100; if (near(x, -2)) continue; const claim = x >= -8 && x < -2; if ((h(x) <= 0) !== claim) bad++; }
  chk("4(e) h(x) ≤ 0 ⇔ −8 ≤ x < −2 (3 001-point sweep, mismatches)", bad, 0);
}

/* --- T1 Q5 (func.gt.t1q5) --- */
{ const f = x => -x * x + 6 * x + 7, g = x => 2 * x + 2;
  chk("5 stem: A(−1 ; 0) is on both f and g", f(-1) + g(-1), 0);
  let max = -Infinity;
  for (let i = -100000; i <= 100000; i++) { const x = i / 10000; if (f(x) > max) { max = f(x); } }
  chk("5(a) maximum of f (200 001-point scan) = 16", Math.round(max * 1e6) / 1e6, 16);
  let pqMax = -Infinity, pqAt = null;
  for (let i = -10000; i <= 50000; i++) { const x = i / 10000; const d = f(x) - g(x); if (d > pqMax) { pqMax = d; pqAt = x; } }
  chk("5(b) max of f−g over [−1 ; 5] (60 001-point scan)", Math.round(pqMax * 1e6) / 1e6, 9);
  chk("5(b) it occurs at x = 2", pqAt, 2);
  const twoUnequalPositive = t => { const disc = 36 + 4 * (7 - t); if (disc <= 0) return false; const r1 = (-6 + Math.sqrt(disc)) / -2, r2 = (-6 - Math.sqrt(disc)) / -2; return r1 > 0 && r2 > 0 && !near(r1, r2); };
  let bad = 0;
  for (let i = -500; i <= 2500; i++) { const t = i / 100; const claim = t > 7 && t < 16; if (twoUnequalPositive(t) !== claim) bad++; }
  chk("5(c) two unequal POSITIVE roots ⇔ 7 < t < 16 (3 001-point sweep, mismatches)", bad, 0);
}

/* --- B1 eqn.nor.q5 : x² + (2m−1)x − (4m+2) = 0 --- */
{ let bad = 0;
  for (let i = -1000; i <= 1000; i++) {
    const m = i / 100, a = 1, b = 2 * m - 1, c = -(4 * m + 2);
    const d = b * b - 4 * a * c;
    if (!near(d, 4 * m * m + 12 * m + 9)) bad++;
    if (!near(d, (2 * m + 3) ** 2)) bad++;
    const r1 = (-b + Math.sqrt(Math.max(d, 0))) / 2, r2 = (-b - Math.sqrt(Math.max(d, 0))) / 2;
    const want = [2, -2 * m - 1].sort((p, q) => p - q), got = [r1, r2].sort((p, q) => p - q);
    if (!near(got[0], want[0]) || !near(got[1], want[1])) bad++;
    [2, -2 * m - 1].forEach(x => { if (!near(x * x + (2 * m - 1) * x - (4 * m + 2), 0)) bad++; });
  }
  chk("B1 Δ = 4m²+12m+9 = (2m+3)², roots 2 and −2m−1, both substituted back (2 001 m-values, failures)", bad, 0);
  chk("B1 equal roots at m = −3/2: Δ = 0", (2 * (-1.5) + 3) ** 2, 0);
  chk("B1 equal root there is x = 2", -2 * (-1.5) - 1, 2);
  chkS("B1 Δ is never negative", (() => { for (let i = -5000; i <= 5000; i++) { const m = i / 50; if ((2 * m + 3) ** 2 < 0) return true; } return false; })(), false);
}

/* --- B2 exp.cr.q1 --- */
chk("B2(a) ∛54 − ∛16 = ∛2", Math.cbrt(54) - Math.cbrt(16), Math.cbrt(2));
chk("B2(a) ∛54 = 3∛2", Math.cbrt(54), 3 * Math.cbrt(2));
chk("B2(a) ∛16 = 2∛2", Math.cbrt(16), 2 * Math.cbrt(2));
chk("B2(b) (2√3−√5)(2√3+√5) = 7", (2 * Math.sqrt(3) - Math.sqrt(5)) * (2 * Math.sqrt(3) + Math.sqrt(5)), 7);
chk("B2(c) (√7+√2)² = 9 + 2√14", (Math.sqrt(7) + Math.sqrt(2)) ** 2, 9 + 2 * Math.sqrt(14));
{ let bad = 0; for (let i = 1; i <= 2000; i++) { const x = i / 100; if (near(x, 4)) continue; if (!near((x - 4) / (Math.sqrt(x) - 2), Math.sqrt(x) + 2)) bad++; }
  chk("B2(d) (x−4)/(√x−2) ≡ √x+2 for x > 0, x ≠ 4 (2 000-point sweep, mismatches)", bad, 0); }

/* --- B3 exp.nss.q1 --- */
chk("B3(a) 2^(x−3) = 16 at x = 7", 2 ** (7 - 3), 16);
chk("B3(b) 9^(x+1) = 27^(x−1) at x = 5 (LHS)", 9 ** 6, 27 ** 4);
chkS("B3(b) x = 5 is the only solution (2x+2 = 3x−3)", 2 * 5 + 2 === 3 * 5 - 3, true);
[3, 1].forEach(x => chk(`B3(c) x = ${x} satisfies 2^(2x) − 10·2^x + 16 = 0`, 2 ** (2 * x) - 10 * 2 ** x + 16, 0));
chk("B3(d) x = 2 satisfies 4^x − 3·2^x − 4 = 0", 4 ** 2 - 3 * 2 ** 2 - 4, 0);
chkS("B3(d) the K = −1 branch is impossible (2^x > 0 always)", (() => { for (let i = -500; i <= 500; i++) { if (2 ** (i / 10) <= 0) return true; } return false; })(), false);

/* --- B4 eqn.fr.q1 --- */
{ const L = x => x / (x - 2) + 2 / (x + 1), Rr = x => 6 / (x * x - x - 2);
  chk("B4(a) x²−x−2 = (x−2)(x+1) (tested at x = 3,7)", 3.7 ** 2 - 3.7 - 2, (3.7 - 2) * (3.7 + 1));
  chk("B4(b) x = −5 satisfies the original equation", L(-5), Rr(-5));
  chkS("B4(b) x = 2 is a limit, so it is rejected", (2 - 2) === 0, true);
  chk("B4(b) the cleared quadratic is x²+3x−10 (tested at x = 4,1)", 4.1 * (4.1 + 1) + 2 * (4.1 - 2) - 6, 4.1 ** 2 + 3 * 4.1 - 10);
  const k = -25 / 4;
  chk("B4(d) Δ = 25 + 4k is 0 at k = −25/4", 25 + 4 * k, 0);
  chk("B4(d) k = −25/4 = −6,25", k, -6.25);
  chk("B4(d) equal root x = −b/(2a) = −1,5", -3 / 2, -1.5);
  chk("B4(d) x = −1,5 satisfies x²+3x−4−k = 0", (-1.5) ** 2 + 3 * -1.5 - 4 - k, 0);
  chk("B4(d) and it satisfies the fraction equation with k = −6,25", L(-1.5), k / ((-1.5) ** 2 - (-1.5) - 2));
  chkS("B4(d) −1,5 is not a limit", (-1.5 === 2 || -1.5 === -1), false);
}

/* --- B5 eqn.ineq.q2 --- */
{ let bad = 0;
  for (let i = -3000; i <= 3000; i++) { const x = i / 100; if ((-3 * x + 7 > 19) !== (x < -4)) bad++; }
  chk("B5(a) −3x+7 > 19 ⇔ x < −4 (6 001-point sweep, mismatches)", bad, 0);
  bad = 0;
  for (let i = -1000; i <= 1000; i++) { const x = i / 100; if ((2 * x * x + 5 * x < 3) !== (x > -3 && x < 0.5)) bad++; }
  chk("B5(b) 2x²+5x < 3 ⇔ −3 < x < 1/2 (2 001-point sweep, mismatches)", bad, 0);
  chk("B5(b) (2x−1)(x+3) expands to 2x²+5x−3 (tested at x = 2,7)", (2 * 2.7 - 1) * (2.7 + 3), 2 * 2.7 ** 2 + 5 * 2.7 - 3);
  bad = 0;
  for (let i = -1000; i <= 1000; i++) { const x = i / 100; if (x === 0) continue; if (((x - 1) / (x * x) <= 0) !== (x <= 1 && x !== 0)) bad++; }
  chk("B5(c) (x−1)/x² ≤ 0 ⇔ x ≤ 1 ; x ≠ 0 (2 000-point sweep, mismatches)", bad, 0);
  bad = 0;
  for (let i = -1000; i <= 1000; i++) { const x = i / 100; if ((x * x - 3 * x - 10 <= 0) !== (x >= -2 && x <= 5)) bad++; }
  chk("B5(d) x²−3x−10 ≤ 0 ⇔ −2 ≤ x ≤ 5, so b = −3, c = −10 (2 001-point sweep, mismatches)", bad, 0);
}

/* --- B6 func.lp.q1 --- */
{ const f = x => 2 * x * x - 6 * x - 8;
  chk("B6(a) f(−1) = 0", f(-1), 0);
  chk("B6(a) f(4) = 0", f(4), 0);
  chk("B6(a) f(0) = −8", f(0), -8);
  chk("B6(a) a = 2 from −8 = a(1)(−4)", -8 / -4, 2);
  chk("B6(b) x of TP = −b/(2a) = 1,5", 6 / 4, 1.5);
  chk("B6(b) y of TP = −12,5", f(1.5), -12.5);
  let min = Infinity; for (let i = -100000; i <= 100000; i++) { const x = i / 10000; if (f(x) < min) min = f(x); }
  chk("B6(c) minimum of f (200 001-point scan) = −12,5", Math.round(min * 1e6) / 1e6, -12.5);
  let bad = 0; for (let i = -1000; i <= 1000; i++) { const x = i / 100; if (!near(f(x), 2 * (x - 1.5) ** 2 - 12.5)) bad++; }
  chk("B6(d) f ≡ 2(x−1,5)² − 12,5 (2 001-point sweep, mismatches)", bad, 0);
  bad = 0; for (let i = -1000; i <= 1000; i++) { const x = i / 100; if (!near(f(x + 2) + 5, 2 * (x + 0.5) ** 2 - 7.5)) bad++; }
  chk("B6(d) g(x) = f(x+2)+5 ≡ 2(x+0,5)² − 7,5 (2 001-point sweep, mismatches)", bad, 0);
  bad = 0;
  for (let i = -3000; i <= 1000; i++) { const k = i / 100; const disc = 36 + 8 * (8 + k); const noRoots = disc < 0; if (noRoots !== (k < -12.5)) bad++; }
  chk("B6(e) f(x)=k has no real roots ⇔ k < −12,5 (4 001-point sweep, mismatches)", bad, 0);
}

/* =====================================================================
   Sept T2 — non-Euclidean. Same discipline: every number worked from
   the PROMPT text, nothing read out of a memo string.
   ===================================================================== */
const rad = d => d * Math.PI / 180;
const sinD = d => Math.sin(rad(d)), cosD = d => Math.cos(rad(d)), tanD = d => Math.tan(rad(d));

/* --- T2 Q1 (trig.rr.t2q1) --- */
chk("T2 1(a) cos 56° = sin 34°, so the answer is t", cosD(56), sinD(34));
{ // 1(b): 5 sin β + 3 = 0 and tan β > 0  →  quadrant 3
  const beta = 180 + Math.atan2(3, 4) * 180 / Math.PI;   // the real Q3 angle, 216,87°
  chk("T2 1(b) the Q3 angle really satisfies 5 sin β + 3 = 0", 5 * sinD(beta) + 3, 0);
  chkS("T2 1(b) and tan β > 0 there", tanD(beta) > 0, true);
  chk("T2 1(b) via the (x ; y ; r) triangle: 5cos β + tan β = −13/4", 5 * (-4 / 5) + (-3) / (-4), -13 / 4);
  chk("T2 1(b) again from the real angle", Math.round((5 * cosD(beta) + tanD(beta)) * 1e9) / 1e9, -3.25);
  chkS("T2 1(b) x = +4 would contradict tan β > 0 (the memo's own check)", (-3) / 4 > 0, false);
}
{ // 1(c): numeric identity check at six angles
  let bad = 0;
  [17, 40, 73, 128, 200, 311].forEach(x => {
    const lhs = (cosD(180 - x) * sinD(90 + x)) / Math.pow(cosD(90 + x), 2);
    if (!near(Math.round(lhs * 1e8) / 1e8, Math.round((-Math.pow(cosD(x), 2) / Math.pow(sinD(x), 2)) * 1e8) / 1e8)) bad++;
    if (!near(Math.round(lhs * 1e8) / 1e8, Math.round((-1 / Math.pow(tanD(x), 2)) * 1e8) / 1e8)) bad++;
  });
  chk("T2 1(c) expression ≡ −cos²x/sin²x ≡ −1/tan²x at 17°, 40°, 73°, 128°, 200°, 311° (failures)", bad, 0);
}

/* --- T2 Q2 (trig.gs.t2q2) --- */
{ let bad = 0;
  [0, 25, 60, 137, 300, 359].forEach(t => { if (!near(2 * cosD(t) ** 2 + 5 * cosD(t) - 3, (2 * cosD(t) - 1) * (cosD(t) + 3))) bad++; });
  chk("T2 2(a) (2cosθ − 1)(cosθ + 3) expands back to the given equation, 6 angles (failures)", bad, 0);
  chkS("T2 2(a) cos θ = −3 is impossible (|cos| ≤ 1)", -3 >= -1, false);
  [-3, -2, -1, 0, 1, 2, 3].forEach(k => {
    chk(`T2 2(a) θ = 60° + ${k}·360° satisfies the equation`, Math.round((2 * cosD(60 + k * 360) ** 2 + 5 * cosD(60 + k * 360) - 3) * 1e9) / 1e9, 0);
    chk(`T2 2(a) θ = 300° + ${k}·360° satisfies the equation`, Math.round((2 * cosD(300 + k * 360) ** 2 + 5 * cosD(300 + k * 360) - 3) * 1e9) / 1e9, 0);
  });
  let roots = 0, prev = null;
  for (let i = 0; i < 36000; i++) { const t = (i + 0.5) / 100; const v = 2 * cosD(t) ** 2 + 5 * cosD(t) - 3; if (prev !== null && (v < 0) !== (prev < 0)) roots++; prev = v; }
  chk("T2 2(a) sign-change sweep of [0° ; 360°) at 0,01° finds exactly 2 roots", roots, 2);
  const inRange = [];
  [-2, -1, 0, 1].forEach(k => { [60, 300].forEach(base => { const t = base + k * 360; if (t >= -360 && t <= 0) inRange.push(t); }); });
  chkS("T2 2(b) the solutions in [−360° ; 0°] are exactly −300° and −60°", inRange.sort((a, b) => a - b).join(","), "-300,-60");
  [-300, -60].forEach(t => chk(`T2 2(b) θ = ${t}° satisfies the original equation`, Math.round((2 * cosD(t) ** 2 + 5 * cosD(t) - 3) * 1e9) / 1e9, 0));
}

/* --- T2 Q3 (func.hyp.t2q3) --- */
{ const f = x => 4 / (x + 1) + 2, h = x => 4 / (x + 3) - 2;
  chk("T2 3(a) vertical asymptote: x + 1 = 0 at x = −1", -1 + 1, 0);
  chk("T2 3(a) horizontal asymptote y = 2 (f far out)", Math.round(f(1e9) * 1e6) / 1e6, 2);
  let bad = 0;
  [-6, -3, 0.5, 4].forEach(x0 => {
    const y0 = f(x0);
    const xi = 1 - y0, yi = 1 - x0;
    if (!near(Math.round(f(xi) * 1e9) / 1e9, Math.round(yi * 1e9) / 1e9)) bad++;
  });
  chk("T2 3(b) reflecting 4 points of f in y = −x + 1 lands them back on f (failures)", bad, 0);
  chk("T2 3(b) the line passes through the asymptote crossing (−1 ; 2)", -(-1) + 1, 2);
  bad = 0;
  for (let i = -2000; i <= 2000; i++) { const x = i / 100; if (near(x, -3)) continue; if (!near(f(x + 2) - 4, h(x))) bad++; }
  chk("T2 3(c) h(x) ≡ f(x + 2) − 4 ≡ 4/(x+3) − 2 (4 001-point sweep, mismatches)", bad, 0);
  bad = 0;
  for (let i = -2000; i <= 2000; i++) { const x = i / 100; if (near(x, -3)) continue; if ((h(x) < -2) !== (x < -3)) bad++; }
  chk("T2 3(d) h(x) < −2 ⇔ x < −3 (4 001-point sweep, mismatches)", bad, 0);
  bad = 0;
  for (let i = -1000; i <= 1000; i++) {
    const k = i / 100;
    const d = (3 - k) ** 2 - 4 * (6 - k);
    if (!near(d, k * k - 2 * k - 15)) bad++;
    if (!near(d, (k - 5) * (k + 3))) bad++;
  }
  chk("T2 3(e) Δ = (3−k)² − 4(6−k) ≡ k² − 2k − 15 ≡ (k−5)(k+3) (2 001 k-values, failures)", bad, 0);
  chk("T2 3(e) x = −1 is never a root of x² + (3−k)x + (6−k) (it evaluates to 4 for every k)", (() => { let worst = 0; for (let i = -1000; i <= 1000; i++) { const k = i / 100; worst = Math.max(worst, Math.abs(((-1) ** 2 + (3 - k) * -1 + (6 - k)) - 4)); } return Math.round(worst * 1e9) / 1e9; })(), 0);
  const cuts = k => { let n = 0, prev = null; for (let i = -200000; i <= 200000; i++) { const x = i / 1000; if (near(x, -1)) { prev = null; continue; } const v = f(x) - (-x + k); if (prev !== null && (v < 0) !== (prev < 0)) n++; prev = v; } return n; };
  chk("T2 3(e) k = 0 (inside −3 < k < 5): the line cuts f 0 times", cuts(0), 0);
  chk("T2 3(e) k = −4 (outside): the line cuts f 2 times", cuts(-4), 2);
  chk("T2 3(e) k = 6 (outside): the line cuts f 2 times", cuts(6), 2);
  chk("T2 3(e) at k = 5 exactly, Δ = 0 (touching — so 5 is excluded)", (5 - 5) * (5 + 3), 0);
  chk("T2 3(e) at k = −3 exactly, Δ = 0 (touching — so −3 is excluded)", (-3 - 5) * (-3 + 3), 0);
}

/* --- T2 Q6 (trig.mix.t2q6) --- */
{ const AB2 = 12 ** 2 + 15 ** 2 - 2 * 12 * 15 * cosD(68);
  chk("T2 6(a) AB² = 144 + 225 − 360cos68° = 234,1416…", Math.round(AB2 * 1e4) / 1e4, 234.1416);
  chk("T2 6(a) AB = 15,30 cm (rounded once, at the end)", Math.round(Math.sqrt(AB2) * 100) / 100, 15.30);
  const Dp = [0, 0], Ap = [12, 0], Bp = [15 * cosD(68), 15 * sinD(68)], Cp = [-8, 0];
  chk("T2 6(a) AB re-measured from coordinates", Math.round(Math.hypot(Bp[0] - Ap[0], Bp[1] - Ap[1]) * 100) / 100, 15.30);
  chk("T2 6(b) ∠BDC = 180° − 68° = 112°, and sin 112° = sin 68°", Math.round(sinD(112) * 1e12) / 1e12, Math.round(sinD(68) * 1e12) / 1e12);
  const area1 = 0.5 * 12 * 15 * sinD(68), area2 = 0.5 * 8 * 15 * sinD(112);
  /* ⚠️ the print memo prints 83,4466… here; the true value is
     90 sin 68° = 83,44654691…, so the print's 4th decimal is wrong
     either way you cut it. The module carries 83,4465… — this was
     reported to the foreman in OVERNIGHT-1-REPORT.md, not silently
     changed. Cosmetic: the sum and both ticks are unaffected. */
  chk("T2 6(b) △ABD area = 83,4465… (print memo says 83,4466… — reported discrepancy, print PDF already fixed)", Math.round(area1 * 1e4) / 1e4, 83.4465);
  chk("T2 6(b) △DBC area = 55,6310…", Math.round(area2 * 1e4) / 1e4, 55.6310);
  chk("T2 6(b) total area = 139,08 cm²", Math.round((area1 + area2) * 100) / 100, 139.08);
  chk("T2 6(b) OR route (shared height): ½(20)(15)sin68° agrees", Math.round(0.5 * 20 * 15 * sinD(68) * 1e4) / 1e4, Math.round((area1 + area2) * 1e4) / 1e4);
  const cross = Math.abs((Ap[0] - Cp[0]) * (Bp[1] - Cp[1]) - (Ap[1] - Cp[1]) * (Bp[0] - Cp[0])) / 2;
  chk("T2 6(b) third route — coordinate cross product of △ABC", Math.round(cross * 1e4) / 1e4, Math.round((area1 + area2) * 1e4) / 1e4);
  chkS("T2 6(a) the WATCH OUT temptation (12, 8, 68°) really does give a different answer", Math.round(Math.sqrt(12 ** 2 + 8 ** 2 - 2 * 12 * 8 * cosD(68)) * 100) / 100 === 15.30, false);
}

console.log(R.join("\n"));

/* =====================================================================
   9. EUCLIDEAN DIAGRAMS (2026-08-22, engine-port day).
   The engine's promise is "the picture cannot lie": every marked angle
   is re-measured from real coordinates. That promise now covers the
   HIGHLIGHTS too — every per-part marker-pen wedge declares its true
   value, so a wedge drawn on the wrong side of a leg fails here.
   ===================================================================== */
console.log("\n== 9. Euclidean diagrams: specs, highlights, the bare-figure rule ==");
{
  const euclid = mine.filter(m => m.q.chapter === "euclid").map(m => m.q);
  tick(euclid.length === 2, `expected 2 Euclidean questions, got ${euclid.length}`);

  /* 9a — every spec and every rendered variant measures what it claims */
  const measure = (spec, label) => {
    const res = verifyDiagram(spec);
    const bad = res.filter(r => !r.ok);
    tick(bad.length === 0, `${label}: ${bad.map(r => `${r.at} drawn ${r.drawn}° vs v ${r.v}°`).join("; ")}`);
    console.log(`  ${label.padEnd(46)} ${res.length} marked angle(s), ${bad.length ? "FAIL" : "all measure true"}`);
    return res;
  };
  euclid.forEach(q => {
    const d = q.diagram;
    tick(!!d && !!d.parts, `${q.id}: carries a diagram with a parts map`);
    if (d.spec) measure(d.spec, `${q.id} diagram.spec`);
    Object.entries(d.parts).forEach(([pid, entry]) => {
      const spec = entry.spec || d.spec;
      if (entry.spec) measure(entry.spec, `${q.id}(${pid}) spec`);
      ["question", "reveal"].forEach(side => {
        if (!entry[side]) return;
        const refIssues = diagramRefIssues(spec, entry[side], `${q.id}(${pid}).${side}`);
        tick(refIssues.length === 0, refIssues.join(" | "));
        measure(highlightedSpec(spec, entry[side]), `${q.id}(${pid}) ${side} as rendered`);
      });
      /* every part named in the map is a real part, and vice versa where
         the module says the part has a figure */
      tick(q.parts.some(pp => pp.id === pid), `${q.id}: diagram.parts["${pid}"] names no real part`);
    });
    /* EVERY part of a Euclidean question gets a figure — a sub-part of a
       geometry question with no picture would be unanswerable on paper. */
    const missing = q.parts.filter(pp => !d.parts[pp.id]).map(pp => pp.id);
    tick(missing.length === 0, `${q.id}: parts with no diagram entry: ${missing.join(",")}`);
    console.log(`  ${q.id.padEnd(20)} figures for parts [${Object.keys(d.parts).join(",")}] — ${missing.length ? "FAIL" : "OK, every part covered"}`);
  });

  /* 9b — THE BARE-FIGURE RULE. Sept T2 4(a) is the bookwork proof: the
     learner invents the x / y labelling. The QUESTION-side figure must
     therefore carry no angle text at all, while the REVEAL side does. */
  {
    const q4 = euclid.find(q => q.id === "euclid.circ.t2q4");
    const entry = q4.diagram.parts.a;
    const spec = entry.spec || q4.diagram.spec;
    const qSide = highlightedSpec(spec, entry.question);
    const rSide = highlightedSpec(spec, entry.reveal);
    const labelsOf = sp => (sp.angles || []).map(a => a.t).filter(t => t && t.trim().length);
    const qLabels = labelsOf(qSide), rLabels = labelsOf(rSide);
    tick(qLabels.length === 0, `4(a) question-side figure leaks angle labels: [${qLabels.join(",")}]`);
    tick(["x", "y", "2x", "2y"].every(t => rLabels.includes(t)), `4(a) reveal-side figure should carry x/y/2x/2y, got [${rLabels.join(",")}]`);
    /* and the leak-check the other way round: the raw spec DOES carry them,
       so the bare flag is doing real work rather than the spec being empty */
    tick(labelsOf(spec).length >= 4, "4(a) specQ4a itself carries the x/y/2x/2y labelling (so `bare` is what removes it, not an empty spec)");
    console.log(`  4(a) question side labels [${qLabels.join(",") || "none"}] · reveal side [${rLabels.join(",")}] — ${qLabels.length === 0 ? "OK, bare-figure rule holds" : "FAIL"}`);
  }

  /* 9c — the RIGHT-ANGLE SQUARE (port-day gap 1). Q4(b)'s angle at M and
     Q5's tangent-radius angles must render a square, not the chevron. */
  {
    const q4 = euclid.find(q => q.id === "euclid.circ.t2q4");
    const specB = q4.diagram.parts.b1.spec;
    const mAngle = (specB.angles || []).find(a => a.at === "M");
    tick(!!mAngle && mAngle.o && mAngle.o.mark === "square", `Q4(b): the 90° at M must ask for o.mark:"square", got ${JSON.stringify(mAngle && mAngle.o)}`);
    const { renderDiagram } = await import("./js/exam/circle-engine.js");
    const svgSquare = renderDiagram(specB, "#8b5cf6");
    /* the chevron branch draws its middle point at m·√2 from the vertex;
       the square branch draws the vector-sum corner. Prove they differ by
       rendering the same spec both ways. */
    const chevronSpec = { ...specB, angles: specB.angles.map(a => ({ ...a, o: { ...a.o, mark: 1 } })) };
    const svgChevron = renderDiagram(chevronSpec, "#8b5cf6");
    tick(svgSquare !== svgChevron, "Q4(b): o.mark:\"square\" renders differently from the legacy chevron (the additive branch is actually reached)");
    console.log(`  Q4(b) right angle at M: mark="square", output differs from chevron — ${svgSquare !== svgChevron ? "OK" : "FAIL"}`);
  }

  /* 9d — PORT-DAY GAP 2, pinned. verifyDiagram alone CANNOT catch a
     flipped tangent leg: computeGeometry clamps a non-reflex mark to the
     short sweep, so ["O","tg-"] and ["O","tg+"] both measure exactly 90.
     What differs is the SIDE the wedge sits on, so that is what is
     asserted here — the bisector must point towards T. */
  {
    const q5 = euclid.find(q => q.id === "euclid.tan.t2q5");
    const spec = q5.diagram.spec;
    const g = computeGeometry(spec);
    const dirTo = (V, P) => Math.atan2(-(P.y - V.y), P.x - V.x) * 180 / Math.PI;
    const towardsT = dirTo(g.pts.A, g.pts.T);

    const bothMeasure90 = ["tg-", "tg+"].map(leg => {
      const v = verifyDiagram(highlightedSpec(spec, { angles: [{ at: "A", legs: ["O", leg], v: 90 }] })).find(r => r.at === "A");
      return v && v.drawn;
    });
    tick(bothMeasure90[0] === 90 && bothMeasure90[1] === 90,
      `gap-2 premise: both tangent-leg signs measure 90 (got ${bothMeasure90.join(" / ")}) — which is WHY the module names T instead`);
    console.log(`  gap 2: "tg-" measures ${bothMeasure90[0]}°, "tg+" measures ${bothMeasure90[1]}° — verifyDiagram alone cannot tell them apart`);

    const aEntry = q5.diagram.parts.a.question.angles[0];
    tick(aEntry.at === "A" && aEntry.legs[0] === "O" && aEntry.legs[1] === "T",
      `5(a) must name the real external point (legs ["O","T"]), got ${JSON.stringify(aEntry.legs)}`);
    const drawnA = computeGeometry(highlightedSpec(spec, q5.diagram.parts.a.question)).angles.slice(-1)[0];
    const delta = Math.abs(((drawnA.bis - towardsT + 540) % 360) - 180);
    tick(delta < 60, `5(a) wedge bisector ${drawnA.bis.toFixed(1)}° must point towards T (${towardsT.toFixed(1)}°), off by ${delta.toFixed(1)}°`);
    console.log(`  5(a) right angle at A: sweep ${drawnA.sweep.toFixed(1)}°, bisector ${drawnA.bis.toFixed(1)}° vs direction to T ${towardsT.toFixed(1)}° — ${delta < 60 ? "OK, on T's side" : "FAIL, wrong side"}`);
    tick(aEntry.o && aEntry.o.mark === "square", "5(a) the tangent-radius right angle is marked with a square");
  }

  /* 9e — 5(b) is the four-SIDES case from her design note */
  {
    const q5 = euclid.find(q => q.id === "euclid.tan.t2q5");
    const sides = (q5.diagram.parts.b.question.chords || []).map(c => c.join(""));
    const want = ["OA", "AT", "TB", "OB"];
    const same = sides.length === 4 && want.every(w => sides.includes(w));
    tick(same, `5(b) should light the four sides of OATB, got [${sides.join(",")}]`);
    console.log(`  5(b) highlighted sides [${sides.join(", ")}] — ${same ? "OK, the four sides of OATB" : "FAIL"}`);
    /* and the two tangent SEGMENTS really do come from `ext`, not chords */
    const chordPairs = (q5.diagram.spec.chords || []).map(c => c.join(""));
    tick(!chordPairs.includes("AT") && !chordPairs.includes("TB"),
      "5(b) premise: AT and TB are tangent segments from the ext point, not authored chords");
  }

  /* 9f — EXAM-FOCUS-ONLY chapter wiring, checked from data (the DOM side
     lives in verify-exam.html Part 11). */
  {
    const euclidChapter = EXAM_ONLY_CHAPTERS.find(c => c.id === "euclid");
    tick(!!euclidChapter, "js/config.js EXAM_ONLY_CHAPTERS contains euclid");
    tick(!!euclidChapter && euclidChapter.examOnly === true, "the euclid chapter is marked examOnly:true");
    tick(!!euclidChapter && (euclidChapter.quests || []).length === 0, "the euclid chapter owns NO quests (Circle Quest keeps the drill rounds)");
    tick(!CHAPTERS.some(c => c.id === "euclid"), "euclid is NOT in CHAPTERS — so the hub quest tabs, the dice, the admin grid and assignments can never see it");
    tick(EXAM_CHAPTERS.includes("euclid"), "js/config.js EXAM_CHAPTERS includes euclid");
    console.log(`  euclid: examOnly=${euclidChapter && euclidChapter.examOnly}, quests=${euclidChapter ? (euclidChapter.quests || []).length : "?"}, in CHAPTERS=${CHAPTERS.some(c => c.id === "euclid")}, flagged=${EXAM_CHAPTERS.includes("euclid")}`);
  }
}

/* ---------- verdict ---------- */
console.log(`\n===== ${passed}/${total} checks passed =====`);
if (fails.length) { console.log("FAILURES:"); fails.forEach(f => console.log("  · " + f)); process.exitCode = 1; }
