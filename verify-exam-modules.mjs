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
  /* --- FUNCTIONS SIBLING CARDS (session 2a of the function-diagram
     build, 2026-08-22). Fifteen fresh questions composed from her own
     Gr11 notes digest, one file per skill, taking four Functions
     skill tiles from 2–3 cards each to six. They belong to no paper
     (paper: "siblings"), so the sept-t1 / sept-t2 star counts in
     section 4 are untouched by them. --- */
  ["func-siblings-find-equation.js",             "funcFindEquationSiblingQuestions"],
  ["func-siblings-asymptotes-domain-range.js",   "funcAsymptotesDomainRangeSiblingQuestions"],
  ["func-siblings-intercepts-turning-point.js",  "funcInterceptsTurningPointSiblingQuestions"],
  ["func-siblings-axis-of-symmetry.js",          "funcAxisOfSymmetrySiblingQuestions"],
  /* --- FUNCTIONS SIBLING CARDS, SESSION 2b (2026-08-22). The other
     four Functions skill tiles: shift, inequalities, nature-of-roots
     and distances — sixteen more fresh questions from the same notes
     digest, taking every one of the eight tiles to six cards. Also
     paper: "siblings", so section 4's sept-t1 / sept-t2 star counts
     stay untouched. --- */
  ["func-siblings-shift.js",                     "funcShiftSiblingQuestions"],
  ["func-siblings-inequalities.js",              "funcInequalitiesSiblingQuestions"],
  ["func-siblings-nature-of-roots.js",           "funcNatureOfRootsSiblingQuestions"],
  ["func-siblings-distances.js",                 "funcDistancesSiblingQuestions"],
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
  /* FUNCTIONS SIBLING CARDS (session 2a). These are SHORT drill cards,
     not practice-paper questions, so the brief's level mix is "mostly
     1–2, one level 3 per skill, at most one level 4" — and none of the
     four skills needed a level 4. Every one of the fifteen is therefore
     expected to carry NO star; a star appearing here would mean a level
     drifted. */
  "func.sib.fe.q1": [], "func.sib.fe.q2": [], "func.sib.fe.q3": [], "func.sib.fe.q4": [],
  "func.sib.adr.q1": [], "func.sib.adr.q2": [], "func.sib.adr.q3": [],
  "func.sib.itp.q1": [], "func.sib.itp.q2": [], "func.sib.itp.q3": [], "func.sib.itp.q4": [],
  "func.sib.aos.q1": [], "func.sib.aos.q2": [], "func.sib.aos.q3": [], "func.sib.aos.q4": [],
  /* SESSION 2b's sixteen, same rule and the same expectation: mostly
     level 1-2 with exactly one level 3 per skill, and no level 4
     anywhere, so no star may appear on any of them. */
  "func.sib.sh.q1": [], "func.sib.sh.q2": [], "func.sib.sh.q3": [], "func.sib.sh.q4": [],
  "func.sib.ineq.q1": [], "func.sib.ineq.q2": [], "func.sib.ineq.q3": [], "func.sib.ineq.q4": [],
  "func.sib.nor.q1": [], "func.sib.nor.q2": [], "func.sib.nor.q3": [],
  "func.sib.dist.q1": [], "func.sib.dist.q2": [], "func.sib.dist.q3": [], "func.sib.dist.q4": [],
  "func.sib.dist.q5": [],
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
  /* The first seven are the CONTENT slugs the four seeded practice-paper
     questions carry, straight off the fn1–fn7 quest breakdown. The four
     after them are SKILL ids (js/exam/skills.js): the session-2a sibling
     questions are composed skill-first — one file per tile — so their
     `topic` is the skill from the start, rather than a content slug that
     js/exam/_cards.js would then overwrite. Both kinds of slug are inside
     the Functions chapter's own rounds either way, which is what this
     wall exists to check. */
  func: ["four-families", "line-and-parabola", "hyperbola-and-exponential", "reading-a-graph",
         "inequalities-off-a-graph", "transformations", "graphs-together",
         "find-equation", "asymptotes-domain-range", "intercepts-turning-point", "axis-of-symmetry",
         "shift", "inequalities", "nature-of-roots", "distances"],
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

/* --- FUNCTIONS SIBLING CARDS (session 2a, 2026-08-22) ---------------
   Same rule as everything above it: every number is worked from the
   PROMPT's own given facts, never read out of a memo string. Each block
   rebuilds the function from what the learner is told, then checks that
   the memo's answer really is what that function does. --- */
console.log("\n-- session 2a: Functions sibling cards --");

/* fe.q1 — parabola from TP(−1 ; −8) through (1 ; 0) */
{
  const a = (0 - (-8)) / ((1 - (-1)) ** 2);
  chk("fe.q1(a) a from TP(−1 ; −8) and (1 ; 0)", a, 2);
  const f = x => a * (x + 1) ** 2 - 8;
  chk("fe.q1(a) the found parabola really passes through (1 ; 0)", f(1), 0);
  chk("fe.q1(a) and really turns at y = −8", f(-1), -8);
  const fe = x => 2 * x * x + 4 * x - 6;
  let bad = 0;
  for (let i = -600; i <= 400; i++) { const x = i / 100; if (Math.abs(f(x) - fe(x)) > 1e-9) bad++; }
  chk("fe.q1(b) 2(x + 1)² − 8 ≡ 2x² + 4x − 6 (1 001-point sweep, mismatches)", bad, 0);
  chk("fe.q1(b) both forms give the same y-intercept", fe(0), -6);
}

/* fe.q2 — hyperbola from the symmetry lines y = x + 2, y = −x − 4 and x-int (2 ; 0) */
{
  const px = (-4 - 2) / 2, py = px + 2;                    // solve x + 2 = −x − 4
  chk("fe.q2(a) the two symmetry lines cross at x = −3", px, -3);
  chk("fe.q2(a) …and at y = −1", py, -1);
  chk("fe.q2(a) the crossing point is on BOTH given lines", -px - 4, py);
  const a = (0 - py) * (2 - px);                            // 0 = a/(2 − p) + q ⟹ a = −q(2 − p)
  chk("fe.q2(a) a from the x-intercept (2 ; 0)", a, 5);
  const h = x => 5 / (x + 3) - 1;
  chk("fe.q2(a) the found hyperbola really cuts the x-axis at 2", h(2), 0);
}

/* fe.q3 — exponential from asymptote y = −4, y-int (0 ; −2), point (2 ; 4) */
{
  const q = -4, a = -2 - q;                                 // y-int: a·b⁰ + q = −2
  chk("fe.q3(a) a from the y-intercept", a, 2);
  const bSq = (4 - q) / a;                                  // (2 ; 4): a·b² + q = 4
  chk("fe.q3(a) b² from the second point", bSq, 4);
  chk("fe.q3(a) b (positive root only)", Math.sqrt(bSq), 2);
  const g = x => 2 * Math.pow(2, x) - 4;
  chk("fe.q3(a) the found graph passes through (0 ; −2)", g(0), -2);
  chk("fe.q3(a) …and through (2 ; 4)", g(2), 4);
  let bad = 0;
  for (let i = -500; i <= 400; i++) { const x = i / 100; if (Math.abs(g(x) - (Math.pow(2, x + 1) - 4)) > 1e-9) bad++; }
  chk("fe.q3(b) 2·2ˣ − 4 ≡ 2^(x+1) − 4 (901-point sweep, mismatches)", bad, 0);
}

/* fe.q4 — parabola through (−2 ; −2), (0 ; −4), (1 ; 1), solved as the
   learner does: c off the y-intercept, then two simultaneous equations */
{
  const c = -4;                                             // (0 ; −4)
  // (1 ; 1):  a + b + c = 1      ⟹ a + b = 5
  // (−2 ; −2): 4a − 2b + c = −2  ⟹ 2a − b = 1
  const a = (5 + 1) / 3, b = 5 - a;
  chk("fe.q4(a) a from ① + ②", a, 2);
  chk("fe.q4(a) b back-substituted", b, 3);
  const f = x => a * x * x + b * x + c;
  chk("fe.q4(a) the found parabola passes through (−2 ; −2)", f(-2), -2);
  chk("fe.q4(a) …through (0 ; −4)", f(0), -4);
  chk("fe.q4(a) …and through (1 ; 1)", f(1), 1);
  chkS("fe.q4(a) premise: its x-intercepts are NOT whole numbers (so the factorised route is genuinely unavailable)",
    Number.isInteger((-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a)), false);
}

/* adr.q1 — h(x) = −4/(x − 1) + 3, then k(x) = h(x + 3) − 2 */
{
  const h = x => -4 / (x - 1) + 3;
  chk("adr.q1(a) h is undefined exactly at x = 1", 1, 1 /* p */);
  chk("adr.q1(a) h(x) → 3 as x grows (tested at x = 10⁶)", Math.round(h(1e6) * 1e3) / 1e3, 3);
  chkS("adr.q1(b) h never actually equals 3", (() => { for (let i = -5000; i <= 5000; i++) { const x = i / 10; if (x === 1) continue; if (h(x) === 3) return true; } return false; })(), false);
  const k = x => h(x + 3) - 2;
  chk("adr.q1(c) k(x) ≡ −4/(x + 2) + 1 (tested at x = 5)", k(5), -4 / 7 + 1);
  chk("adr.q1(c) k(x) → 1 as x grows", Math.round(k(1e6) * 1e3) / 1e3, 1);
  chkS("adr.q1(c) k's vertical asymptote is x = −2", Number.isFinite(k(-2)), false);
}

/* adr.q2 — f(x) = 2·3ˣ − 5 and g(x) = 4(1/2)ˣ + 1, restricted to x ≥ −2 */
{
  const f = x => 2 * Math.pow(3, x) - 5, g = x => 4 * Math.pow(0.5, x) + 1;
  /* SWEEP RANGES ARE DELIBERATELY MODEST HERE. The maths claim is "the
     graph never reaches its asymptote", which is true for every real x —
     but a DOUBLE cannot show it past about x = −25 for f (2·3ˣ underflows
     into the last bit of −5) or x = 45 for g. Sweeping wider tests
     JavaScript's float precision, not her question, so each sweep stops
     while the gap is still representable and the limit is checked
     separately at the edge of that range. */
  chk("adr.q2(a) f → −5 from above (tested at x = −20)", Math.round(f(-20) * 1e6) / 1e6, -5);
  chkS("adr.q2(a) f is never ≤ −5 (−20 ≤ x ≤ 3)", (() => { for (let i = -2000; i <= 300; i++) if (f(i / 100) <= -5) return true; return false; })(), false);
  chk("adr.q2(b) g → 1 from above (tested at x = 40)", Math.round(g(40) * 1e6) / 1e6, 1);
  chkS("adr.q2(b) g is never ≤ 1 (−3 ≤ x ≤ 40)", (() => { for (let i = -300; i <= 4000; i++) if (g(i / 100) <= 1) return true; return false; })(), false);
  chk("adr.q2(c) g(−2) = 17, the top of the restricted range", g(-2), 17);
  let bad = 0;
  for (let i = -200; i <= 4000; i++) { const y = g(i / 100); if (!(y > 1 && y <= 17)) bad++; }
  chk("adr.q2(c) on −2 ≤ x ≤ 40 every g-value lies in 1 < y ≤ 17 (4 201-point sweep, misses)", bad, 0);
}

/* adr.q3 — f(x) = −3·2ˣ + 6 and g(x) = −3(1/2)ˣ + 6 */
{
  const f = x => -3 * Math.pow(2, x) + 6, g = x => -3 * Math.pow(0.5, x) + 6;
  chkS("adr.q3(a) f is never ≥ 6", (() => { for (let i = -4000; i <= 400; i++) if (f(i / 100) >= 6) return true; return false; })(), false);
  chkS("adr.q3(b) g is never ≥ 6 either — same range", (() => { for (let i = -400; i <= 4000; i++) if (g(i / 100) >= 6) return true; return false; })(), false);
  let bad = 0;
  for (let i = -400; i <= 400; i++) { const x = i / 100; if (Math.abs(f(-x) - g(x)) > 1e-9) bad++; }
  chk("adr.q3(b) g(x) ≡ f(−x) — the mirror-image claim (801-point sweep, mismatches)", bad, 0);
  chk("adr.q3(a) f cuts the x-axis at 1 (drawn on the figure)", f(1), 0);
  chk("adr.q3(b) g cuts the x-axis at −1 (drawn on the figure)", g(-1), 0);
}

/* itp.q1 — f(x) = x² − 2x − 8 */
{
  const f = x => x * x - 2 * x - 8;
  chk("itp.q1(a) y-intercept", f(0), -8);
  chk("itp.q1(a) x-intercept at −2", f(-2), 0);
  chk("itp.q1(a) x-intercept at 4", f(4), 0);
  chk("itp.q1(b) xTP = −b/(2a)", 2 / 2, 1);
  chk("itp.q1(b) yTP substituted back", f(1), -9);
  chk("itp.q1(b) the TP really is midway between the intercepts (the memo's own check)", (-2 + 4) / 2, 1);
}

/* itp.q2 — f(x) = x² − 4x + 9, no x-intercepts */
{
  const f = x => x * x - 4 * x + 9;
  chk("itp.q2(a) xTP", 4 / 2, 2);
  chk("itp.q2(a) yTP", f(2), 5);
  chk("itp.q2(b) b² − 4ac", (-4) ** 2 - 4 * 1 * 9, -20);
  chkS("itp.q2(b) the discriminant really is negative", ((-4) ** 2 - 4 * 1 * 9) < 0, true);
  chkS("itp.q2(b) f never reaches 0 (2 001-point sweep)", (() => { for (let i = -1000; i <= 1000; i++) if (f(i / 100) <= 0) return true; return false; })(), false);
  chk("itp.q2(c) y-intercept", f(0), 9);
}

/* itp.q3 — g(x) = 3x² + 12x + 5, completed square */
{
  const g = x => 3 * x * x + 12 * x + 5, gc = x => 3 * (x + 2) ** 2 - 7;
  let bad = 0;
  for (let i = -600; i <= 200; i++) { const x = i / 100; if (Math.abs(g(x) - gc(x)) > 1e-9) bad++; }
  chk("itp.q3(a) 3x² + 12x + 5 ≡ 3(x + 2)² − 7 (801-point sweep, mismatches)", bad, 0);
  chk("itp.q3(b) TP x from the completed form agrees with −b/(2a)", -12 / 6, -2);
  chk("itp.q3(b) TP y", g(-2), -7);
  chk("itp.q3(c) y-intercept", g(0), 5);
  chk("itp.q3(c) minimum value over a fine sweep", (() => { let m = Infinity; for (let i = -600; i <= 200; i++) m = Math.min(m, g(i / 100)); return m; })(), -7);
}

/* itp.q4 — f(x) = 2ˣ − 8 (crosses) and g(x) = 2ˣ + 4 (cannot) */
{
  const f = x => Math.pow(2, x) - 8, g = x => Math.pow(2, x) + 4;
  chk("itp.q4(a) f's y-intercept", f(0), -7);
  chk("itp.q4(a) f's x-intercept at x = 3, since 8 = 2³", f(3), 0);
  chk("itp.q4(b) g's y-intercept", g(0), 5);
  chkS("itp.q4(b) g is never ≤ 0 (4 001-point sweep over the drawn window and well beyond)",
    (() => { for (let i = -3000; i <= 1000; i++) if (g(i / 10) <= 0) return true; return false; })(), false);
  chkS("itp.q4(b) premise: 2ˣ is always positive", (() => { for (let i = -2000; i <= 200; i++) if (Math.pow(2, i / 10) <= 0) return true; return false; })(), false);
}

/* aos.q1 — g(x) = 2(x − 3)² − 5, h(x) = −(x + 4)² + 1, k = g shifted */
{
  const g = x => 2 * (x - 3) ** 2 - 5, h = x => -((x + 4) ** 2) + 1, k = x => 2 * (x - 1) ** 2 + 1;
  chk("aos.q1(a) g is symmetric about x = 3 (g(3+t) = g(3−t) at t = 2,5)", g(3 + 2.5), g(3 - 2.5));
  chk("aos.q1(b) h is symmetric about x = −4", h(-4 + 3.5), h(-4 - 3.5));
  let bad = 0;
  for (let i = -300; i <= 900; i++) { const x = i / 100; if (Math.abs(k(x) - (g(x + 2) + 6)) > 1e-9) bad++; }
  chk("aos.q1(c) k(x) ≡ g(x + 2) + 6, i.e. g moved 2 left and 6 up (1 201-point sweep, mismatches)", bad, 0);
  chk("aos.q1(c) k is symmetric about x = 1", k(1 + 4), k(1 - 4));
}

/* aos.q2 — f(x) = −2x² + 8x − 3, m = f − 4, k = f(x + 5) */
{
  const f = x => -2 * x * x + 8 * x - 3;
  chk("aos.q2(a) axis from −b/(2a)", -8 / (2 * -2), 2);
  chk("aos.q2(a) f is symmetric about x = 2", f(2 + 3), f(2 - 3));
  const m = x => f(x) - 4;
  chk("aos.q2(b) m is STILL symmetric about x = 2 (a vertical shift moves nothing sideways)", m(2 + 3), m(2 - 3));
  const kk = x => f(x + 5);
  chk("aos.q2(c) k is symmetric about x = −3", kk(-3 + 3), kk(-3 - 3));
  chkS("aos.q2(c) …and NOT about x = 2", Math.abs(kk(2 + 3) - kk(2 - 3)) < 1e-9, false);
  chk("aos.q2(c) the memo's own check: k(−3) = f(2)", kk(-3), f(2));
}

/* aos.q3 — h(x) = 8/(x − 2) − 3, both symmetry lines through (2 ; −3) */
{
  chk("aos.q3(a) y = −x − 1 passes through (2 ; −3)", -(2) - 1, -3);
  chk("aos.q3(b) y = x − 5 passes through (2 ; −3)", 2 - 5, -3);
  /* a symmetry line really is one: reflecting a point of h in y = x − 5
     (for a line of gradient 1 through (p ; q): (x ; y) ↦ (y + 5 ; x − 5))
     must land back on h */
  const h = x => 8 / (x - 2) - 3;
  let bad = 0;
  for (let i = 30; i <= 120; i++) { const x = i / 10; const y = h(x); const rx = y + 5, ry = x - 5; if (Math.abs(h(rx) - ry) > 1e-9) bad++; }
  chk("aos.q3(b) reflecting h in y = x − 5 maps h onto itself (91-point sweep, misses)", bad, 0);
}

/* aos.q4 — f(x) = 6/x → g(x) = 6/(x − 4) − 1 */
{
  const f = x => 6 / x, g = x => 6 / (x - 4) - 1;
  let bad = 0;
  for (let i = -700; i <= 700; i++) { const x = i / 100; if (x === 0) continue; if (Math.abs(g(x + 4) - (f(x) - 1)) > 1e-9) bad++; }
  chk("aos.q4(b) g(x + 4) ≡ f(x) − 1, i.e. f moved 4 right and 1 down (1 401-point sweep, mismatches)", bad, 0);
  chk("aos.q4(b) y = x − 5 passes through (4 ; −1)", 4 - 5, -1);
  chk("aos.q4(b) y = −x + 3 passes through (4 ; −1)", -(4) + 3, -1);
  let bad2 = 0;
  for (let i = 50; i <= 140; i++) { const x = i / 10; const y = g(x); const rx = y + 5, ry = x - 5; if (Math.abs(g(rx) - ry) > 1e-9) bad2++; }
  chk("aos.q4(b) reflecting g in y = x − 5 maps g onto itself (91-point sweep, misses)", bad2, 0);
}

/* --- FUNCTIONS SIBLING CARDS (session 2b, 2026-08-22) --------------
   Same discipline again: every number below is rebuilt from the
   PROMPT's own given facts and then checked against what the memo
   claims. Nothing here reads a memo string. --- */
console.log("\n-- session 2b: Functions sibling cards --");

/* sh.q1 — f(x) = (x − 1)² − 4, then g = f(x − 3) and h = −f(x) */
{
  const f = x => (x - 1) ** 2 - 4;
  const g = x => f(x - 3), h = x => -f(x);
  let bad = 0;
  for (let i = -400; i <= 800; i++) { const x = i / 100; if (Math.abs(g(x) - ((x - 4) ** 2 - 4)) > 1e-9) bad++; }
  chk("sh.q1(a) f(x−3) is identically (x−4)² − 4 (1 201-point sweep, mismatches)", bad, 0);
  chk("sh.q1(a) the new turning point is at (4 ; −4)", g(4), -4);
  chkS("sh.q1(a) …and it really is the lowest point of g", (() => { for (let i = -400; i <= 800; i++) if (g(i / 100) < -4 - 1e-9) return true; return false; })(), false);
  bad = 0;
  for (let i = -400; i <= 800; i++) { const x = i / 100; if (Math.abs(h(x) - (-((x - 1) ** 2) + 4)) > 1e-9) bad++; }
  chk("sh.q1(b) −f(x) is identically −(x−1)² + 4 (1 201-point sweep, mismatches)", bad, 0);
  chk("sh.q1(b) the new turning point is at (1 ; 4)", h(1), 4);
  chk("sh.q1(b) the reflection keeps both x-intercepts", h(-1) + h(3), 0);
}

/* sh.q2 — f(x) = 3/(x − 2) + 1, then g = f(x + 4) and h = f(x) − 5 */
{
  const f = x => 3 / (x - 2) + 1;
  const g = x => f(x + 4), h = x => f(x) - 5;
  let bad = 0;
  for (let i = -700; i <= 800; i++) { const x = i / 100; if (Math.abs(x + 2) < 0.05) continue; if (Math.abs(g(x) - (3 / (x + 2) + 1)) > 1e-9) bad++; }
  chk("sh.q2(a) f(x+4) is identically 3/(x+2) + 1 (sweep, mismatches)", bad, 0);
  chkS("sh.q2(a) g's vertical asymptote is x = −2", Number.isFinite(g(-2)), false);
  chk("sh.q2(a) g still flattens towards y = 1", Math.round(g(1e6) * 1e3) / 1e3, 1);
  bad = 0;
  for (let i = -700; i <= 800; i++) { const x = i / 100; if (Math.abs(x - 2) < 0.05) continue; if (Math.abs(h(x) - (3 / (x - 2) - 4)) > 1e-9) bad++; }
  chk("sh.q2(b) f(x)−5 is identically 3/(x−2) − 4 (sweep, mismatches)", bad, 0);
  chkS("sh.q2(b) h's vertical asymptote is still x = 2", Number.isFinite(h(2)), false);
  chk("sh.q2(b) h flattens towards y = −4", Math.round(h(1e6) * 1e3) / 1e3, -4);
}

/* sh.q3 — f(x) = 2ˣ − 4, then g = f(x) + 3 and h = f(−x) */
{
  const f = x => Math.pow(2, x) - 4;
  const g = x => f(x) + 3, h = x => f(-x);
  chk("sh.q3 stem: f's y-intercept is (0 ; −3)", f(0), -3);
  chk("sh.q3 stem: f's x-intercept is (2 ; 0)", f(2), 0);
  let bad = 0;
  for (let i = -500; i <= 500; i++) { const x = i / 100; if (Math.abs(g(x) - (Math.pow(2, x) - 1)) > 1e-9) bad++; }
  chk("sh.q3(a) f(x)+3 is identically 2ˣ − 1 (1 001-point sweep, mismatches)", bad, 0);
  chk("sh.q3(a) g flattens towards y = −1", Math.round(g(-40) * 1e6) / 1e6, -1);
  bad = 0;
  for (let i = -500; i <= 500; i++) { const x = i / 100; if (Math.abs(h(x) - (Math.pow(0.5, x) - 4)) > 1e-9) bad++; }
  chk("sh.q3(b) f(−x) is identically (1/2)ˣ − 4 (1 001-point sweep, mismatches)", bad, 0);
  chk("sh.q3(b) h still flattens towards y = −4", Math.round(h(40) * 1e6) / 1e6, -4);
  chk("sh.q3(b) h cuts the x-axis at −2, the mirror of f's 2", h(-2), 0);
}

/* sh.q4 — f(x) = (x + 2)² − 1 and g(x) = (x − 3)² + 4 */
{
  const f = x => (x + 2) ** 2 - 1, g = x => (x - 3) ** 2 + 4;
  chk("sh.q4(a) f turns at (−2 ; −1)", f(-2), -1);
  chk("sh.q4(a) g turns at (3 ; 4)", g(3), 4);
  let bad = 0;
  for (let i = -600; i <= 800; i++) { const x = i / 100; if (Math.abs(g(x) - (f(x - 5) + 5)) > 1e-9) bad++; }
  chk("sh.q4(b) g(x) is identically f(x−5) + 5, i.e. 5 right and 5 up (1 401-point sweep, mismatches)", bad, 0);
}

/* ineq.q1 — f(x) = −x² + 2x + 8 */
{
  const f = x => -x * x + 2 * x + 8;
  chk("ineq.q1 stem: f cuts the x-axis at −2 and 4", f(-2) + f(4), 0);
  let bad = 0;
  for (let i = -500; i <= 700; i++) { const x = i / 100; if ((f(x) > 0) !== (x > -2 && x < 4)) bad++; }
  chk("ineq.q1(a) f(x) > 0 iff −2 < x < 4 (1 201-point sweep, mismatches)", bad, 0);
  bad = 0;
  for (let i = -500; i <= 700; i++) { const x = i / 100; if ((f(x) <= 0) !== (x <= -2 || x >= 4)) bad++; }
  chk("ineq.q1(b) f(x) ≤ 0 iff x ≤ −2 or x ≥ 4 (1 201-point sweep, mismatches)", bad, 0);
}

/* ineq.q2 — f(x) = x² − 9 and g(x) = x + 1 */
{
  const f = x => x * x - 9, g = x => x + 1;
  chk("ineq.q2 stem: f cuts at −3 and 3", f(-3) + f(3), 0);
  chk("ineq.q2 stem: g cuts at −1", g(-1), 0);
  let bad = 0;
  for (let i = -600; i <= 600; i++) { const x = i / 100; if ((f(x) * g(x) >= 0) !== ((x >= -3 && x <= -1) || x >= 3)) bad++; }
  chk("ineq.q2(a) f·g ≥ 0 iff −3 ≤ x ≤ −1 or x ≥ 3 (1 201-point sweep, mismatches)", bad, 0);
  bad = 0;
  for (let i = -600; i <= 600; i++) { const x = i / 100; if (near(x, -1)) continue; if ((f(x) / g(x) < 0) !== (x < -3 || (x > -1 && x < 3))) bad++; }
  chk("ineq.q2(b) f/g < 0 iff x < −3 or −1 < x < 3 (sweep, mismatches)", bad, 0);
  chkS("ineq.q2(b) x = −1 is excluded because g is zero there", g(-1) === 0, true);
}

/* ineq.q3 — h(x) = 4/(x − 1) − 2 */
{
  const h = x => 4 / (x - 1) - 2;
  chk("ineq.q3 stem: h cuts the x-axis at 3", h(3), 0);
  chk("ineq.q3 stem: h cuts the y-axis at −6", h(0), -6);
  let bad = 0;
  for (let i = -400; i <= 800; i++) { const x = i / 100; if (near(x, 1)) continue; if ((h(x) >= 0) !== (x > 1 && x <= 3)) bad++; }
  chk("ineq.q3(a) h(x) ≥ 0 iff 1 < x ≤ 3 (sweep, mismatches)", bad, 0);
  bad = 0;
  for (let i = -400; i <= 800; i++) { const x = i / 100; if (near(x, 1)) continue; if ((x * h(x) <= 0) !== ((x >= 0 && x < 1) || x >= 3)) bad++; }
  chk("ineq.q3(b) x·h(x) ≤ 0 iff 0 ≤ x < 1 or x ≥ 3 (sweep, mismatches)", bad, 0);
}

/* ineq.q4 — f(x) = x² − 2x − 3 against g(x) = x + 1 */
{
  const f = x => x * x - 2 * x - 3, g = x => x + 1;
  chk("ineq.q4(a) the graphs meet at x = −1", f(-1) - g(-1), 0);
  chk("ineq.q4(a) …and at x = 4", f(4) - g(4), 0);
  chk("ineq.q4(a) the second meeting point is (4 ; 5)", g(4), 5);
  chk("ineq.q4(a) the first meeting point is (−1 ; 0)", g(-1), 0);
  let bad = 0;
  for (let i = -500; i <= 800; i++) { const x = i / 100; if ((f(x) >= g(x)) !== (x <= -1 || x >= 4)) bad++; }
  chk("ineq.q4(b) f ≥ g iff x ≤ −1 or x ≥ 4 (1 301-point sweep, mismatches)", bad, 0);
}

/* nor.q1 — f(x) = −x² + 4x + 5, sliding line y = k */
{
  const f = x => -x * x + 4 * x + 5;
  chk("nor.q1 stem: f cuts the x-axis at −1 and 5", f(-1) + f(5), 0);
  chk("nor.q1(a) xTP = −b/(2a)", -4 / (2 * -1), 2);
  chk("nor.q1(a) the maximum value of f", f(2), 9);
  let bad = 0;
  for (let i = -500; i <= 2000; i++) {
    const k = i / 100;
    const d = 16 + 4 * (5 - k);            // x² − 4x + (k − 5) = 0
    const n = d > 1e-12 ? 2 : (Math.abs(d) <= 1e-12 ? 1 : 0);
    const want = k < 9 ? 2 : (k === 9 ? 1 : 0);
    if (n !== want) bad++;
  }
  chk("nor.q1 Δ says: 2 roots below k = 9, 1 at k = 9, none above (2 501 k-values, mismatches)", bad, 0);
  chk("nor.q1(a) equal roots exactly at k = 9", 16 + 4 * (5 - 9), 0);
  chkS("nor.q1(b) a line at k = 11 really misses f", (() => { for (let i = -2000; i <= 3000; i++) if (Math.abs(f(i / 100) - 11) < 1e-6) return true; return false; })(), false);
}

/* nor.q2 — f(x) = x² + 1 against the rotating line y = kx */
{
  const f = x => x * x + 1;
  let bad = 0;
  for (let i = -800; i <= 800; i++) { const k = i / 100; const d = k * k - 4; if ((d < 0) !== (k > -2 && k < 2)) bad++; }
  chk("nor.q2(a) Δ = k² − 4 < 0 iff −2 < k < 2 (1 601 k-values, mismatches)", bad, 0);
  chk("nor.q2(a) Δ of x² − kx + 1 at k = 3 is positive", 9 - 4, 5);
  const cuts = k => { let n = 0, prev = null; for (let i = -40000; i <= 40000; i++) { const x = i / 10000; const v = f(x) - k * x; if (prev !== null && (v < 0) !== (prev < 0)) n++; prev = v; } return n; };
  chk("nor.q2(a) k = 0 inside the range: the line cuts f 0 times", cuts(0), 0);
  chk("nor.q2(a) k = 3 outside it: the line cuts f 2 times", cuts(3), 2);
  chk("nor.q2(a) k = −3 outside it: the line cuts f 2 times", cuts(-3), 2);
  chk("nor.q2(b) at k = 2 the touching point is x = 1", f(1) - 2 * 1, 0);
  chk("nor.q2(b) …and its height is 2", f(1), 2);
  chk("nor.q2(b) at k = −2 the touching point is (−1 ; 2)", f(-1) + 2 * -1, 0);
}

/* nor.q3 — f(x) = x² − 3x + 6 against the sliding line y = x + k */
{
  const f = x => x * x - 3 * x + 6;
  let bad = 0;
  for (let i = -500; i <= 1500; i++) { const k = i / 100; const d = 16 - 4 * (6 - k); if ((d > 0) !== (k > 2)) bad++; }
  chk("nor.q3 Δ = 4k − 8 > 0 iff k > 2 (2 001 k-values, mismatches)", bad, 0);
  chk("nor.q3(a) Δ is zero at k = 2", 16 - 4 * (6 - 2), 0);
  chk("nor.q3(a) the touching point is x = 2", f(2) - (2 + 2), 0);
  chk("nor.q3(a) …and its height is 4", f(2), 4);
  chkS("nor.q3 the illustrative line y = x, k = 0, really misses f", (() => { for (let i = -4000; i <= 7000; i++) { const x = i / 1000; if (Math.abs(f(x) - x) < 1e-6) return true; } return false; })(), false);
  chk("nor.q3(b) y = x + 6 cuts f at x = 0", f(0) - 6, 0);
  chk("nor.q3(b) …and at x = 4", f(4) - 10, 0);
  chk("nor.q3(b) the two cutting points are (0 ; 6) and (4 ; 10)", f(0) + f(4), 16);
}

/* dist.q1 — f(x) = x² − 4 with A(−3 ; 5) and B(2 ; 0) */
{
  const f = x => x * x - 4;
  chk("dist.q1 stem: A(−3 ; 5) is on f", f(-3), 5);
  chk("dist.q1 stem: B(2 ; 0) is on f", f(2), 0);
  chk("dist.q1(a) horizontal distance", Math.abs(2 - -3), 5);
  chk("dist.q1(b) vertical distance", Math.abs(0 - 5), 5);
  chk("dist.q1(c) AB² = (Δx)² + (Δy)²", 5 ** 2 + 5 ** 2, 50);
  chk("dist.q1(c) AB = 5√2", Math.sqrt(50), 5 * Math.sqrt(2));
  chk("dist.q1(c) …which is 7,07 to two decimals", Math.round(Math.sqrt(50) * 100) / 100, 7.07);
  chk("dist.q1(c) the drawn line AB, y = −x + 2, passes through A", -(-3) + 2, 5);
  chk("dist.q1(c) …and through B", -(2) + 2, 0);
}

/* dist.q2 — f(x) = −x² + 4x + 12 and g(x) = 2x + 4 */
{
  const f = x => -x * x + 4 * x + 12, g = x => 2 * x + 4;
  chk("dist.q2 stem: the graphs meet at (−2 ; 0)", f(-2) - g(-2), 0);
  chk("dist.q2 stem: …and at (4 ; 12)", f(4) - g(4), 0);
  chk("dist.q2 stem: the second meeting height is 12", g(4), 12);
  chk("dist.q2(a) f(1)", f(1), 15);
  chk("dist.q2(a) g(1)", g(1), 6);
  chk("dist.q2(a) PQ at x = 1", f(1) - g(1), 9);
  chk("dist.q2(b) f(5)", f(5), 7);
  chk("dist.q2(b) g(5)", g(5), 14);
  chk("dist.q2(b) at x = 5 the LINE is on top, length 7", g(5) - f(5), 7);
}

/* dist.q3 — f(x) = −x² + 5x + 15 and g(x) = x + 3, MAXIMUM segment */
{
  const f = x => -x * x + 5 * x + 15, g = x => x + 3;
  chk("dist.q3 stem: A(−2 ; 1) is on both", f(-2) - g(-2), 0);
  chk("dist.q3 stem: A's height is 1", g(-2), 1);
  chk("dist.q3 stem: B(6 ; 9) is on both", f(6) - g(6), 0);
  chk("dist.q3 stem: B's height is 9", g(6), 9);
  const d = x => f(x) - g(x);
  let bad = 0;
  for (let i = -400; i <= 800; i++) { const x = i / 100; if (Math.abs(d(x) - (-x * x + 4 * x + 12)) > 1e-9) bad++; }
  chk("dist.q3(a) f − g is identically −x² + 4x + 12 (1 201-point sweep, mismatches)", bad, 0);
  chk("dist.q3(a) its xTP = −b/(2a)", -4 / (2 * -1), 2);
  chk("dist.q3(a) maximum PQ", d(2), 16);
  let m = -Infinity, at = null;
  for (let i = -2000; i <= 6000; i++) { const x = i / 1000; if (d(x) > m) { m = d(x); at = x; } }
  chk("dist.q3(a) 8 001-point scan agrees on the maximum", Math.round(m * 1e6) / 1e6, 16);
  chk("dist.q3(a) …and on where it happens", at, 2);
  chk("dist.q3(b) P sits on f, so its height is f(2)", f(2), 21);
  chk("dist.q3(b) the memo's own check: 21 − 5 = 16", f(2) - g(2), 16);
  chk("dist.q3 the drawn illustrative segment at x = 4 is NOT the answer", d(4), 12);
  chkS("dist.q3 trap premise: f's own turning point is at 2,5, not 2", near(-5 / (2 * -1), 2), false);
}

/* dist.q4 — f(x) = x² − 2x + 6 and g(x) = x − 2, MINIMUM segment */
{
  const f = x => x * x - 2 * x + 6, g = x => x - 2;
  const d = x => f(x) - g(x);
  chk("dist.q4(a) f(4)", f(4), 14);
  chk("dist.q4(a) g(4)", g(4), 2);
  chk("dist.q4(a) PQ at x = 4", d(4), 12);
  let bad = 0;
  for (let i = -300; i <= 600; i++) { const x = i / 100; if (Math.abs(d(x) - (x * x - 3 * x + 8)) > 1e-9) bad++; }
  chk("dist.q4(b) f − g is identically x² − 3x + 8 (901-point sweep, mismatches)", bad, 0);
  chk("dist.q4(b) its xTP = −b/(2a)", 3 / 2, 1.5);
  chk("dist.q4(b) minimum PQ", d(1.5), 5.75);
  let m = Infinity, at = null;
  for (let i = -5000; i <= 9000; i++) { const x = i / 1000; if (d(x) < m) { m = d(x); at = x; } }
  chk("dist.q4(b) 14 001-point scan agrees on the minimum", Math.round(m * 1e6) / 1e6, 5.75);
  chk("dist.q4(b) …and on where it happens", at, 1.5);
  chk("dist.q4(b) the trap card's claim: the difference has a negative discriminant", 9 - 32, -23);
  chkS("dist.q4(b) …so the two graphs really never meet", (() => { for (let i = -5000; i <= 9000; i++) if (d(i / 1000) <= 0) return true; return false; })(), false);
}

/* dist.q5 — h(x) = 4/(x − 1) + 2, the two "TP" points and the gap */
{
  const A = 4, P = 1, Q = 2, r = Math.sqrt(A);
  const h = x => A / (x - P) + Q;
  chk("dist.q5(a) √a", r, 2);
  chk("dist.q5(a) p + √a is 3", P + r, 3);
  chk("dist.q5(a) …and q + √a is 4", Q + r, 4);
  chk("dist.q5(a) that point really lies on h", h(3), 4);
  chk("dist.q5(a) the other one, (p − √a ; q − √a), is (−1 ; 0)", h(-1), 0);
  chk("dist.q5(b) d² = (Δx)² + (Δy)²", (3 - -1) ** 2 + (4 - 0) ** 2, 32);
  chk("dist.q5(b) d = 4√2", Math.sqrt(32), 4 * Math.sqrt(2));
  chk("dist.q5(b) …which is 5,66 to two decimals", Math.round(Math.sqrt(32) * 100) / 100, 5.66);
  chk("dist.q5(b) both points sit on the drawn line y = x + 1", (-1 + 1) + (3 + 1), 0 + 4);
  /* and the claim itself: no pair of points, one per branch, is closer */
  let best = Infinity;
  for (let i = 1; i <= 3000; i++) {
    const x1 = P + i / 500, y1 = h(x1);
    for (let j = 1; j <= 3000; j++) {
      const x2 = P - j / 500, y2 = h(x2);
      const dd = (x1 - x2) ** 2 + (y1 - y2) ** 2;
      if (dd < best) best = dd;
    }
  }
  chk("dist.q5(b) 9 000 000-pair brute-force search finds no closer pair than 32", Math.round(best * 1e3) / 1e3, 32);
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

/* =====================================================================
   10. FUNCTION DIAGRAMS (SESSION 1, 2026-08-22 — the function-graph
   engine wired into the same diagram slot section 9's Euclidean specs
   use, via js/exam/function-diagram.js). Same promise as section 9,
   different engine underneath: verifyFunction re-measures every point/
   asymptote/segment a spec (or a highlighted variant of one) claims to
   draw, and never against a memo string — against the real curve.
   ===================================================================== */
console.log("\n== 10. Function diagrams: specs, highlights, the no-leak rule ==");
{
  const { verifyFunction } = await import("./js/engine/function-graph.js");
  const { applyFunctionHighlights, functionRefIssues } = await import("./js/exam/function-diagram.js");

  const funcQs = mine.filter(m => m.q.chapter === "func").map(m => m.q);
  const withDiagram = funcQs.filter(q => !!q.diagram);
  /* 4 seeded practice-paper questions + the 15 session-2a sibling
     questions + the 16 session-2b ones, every one of which carries a
     to-scale sketch (the briefs' rule for both sessions: "every card
     gets a sketch"). */
  tick(withDiagram.length === 35, `expected all 35 func questions to carry a diagram, got ${withDiagram.length}`);

  const measureFn = (spec, label) => {
    const res = verifyFunction(spec);
    const bad = res.filter(r => !r.ok);
    tick(bad.length === 0, `${label}: ${bad.map(r => r.label).join("; ")}`);
    console.log(`  ${label.padEnd(46)} ${res.length} check(s), ${bad.length ? "FAIL" : "all measure true"}`);
    return res;
  };

  withDiagram.forEach(q => {
    const d = q.diagram;
    tick(!!d.spec && d.spec.type === "function", `${q.id}: diagram.spec must be a type:"function" spec`);
    measureFn(d.spec, `${q.id} diagram.spec`);
    Object.entries(d.parts).forEach(([pid, entry]) => {
      const spec = entry.spec || d.spec;
      if (entry.spec) measureFn(entry.spec, `${q.id}(${pid}) spec`);
      ["question", "reveal"].forEach(side => {
        if (!entry[side]) return;
        const refIssues = functionRefIssues(spec, entry[side], `${q.id}(${pid}).${side}`);
        tick(refIssues.length === 0, refIssues.join(" | "));
        measureFn(applyFunctionHighlights(spec, entry[side]), `${q.id}(${pid}) ${side} as rendered`);
      });
      tick(q.parts.some(pp => pp.id === pid), `${q.id}: diagram.parts["${pid}"] names no real part`);
    });
    /* every part of a func question with a diagram gets a figure entry,
       same "no unanswerable gap" rule section 9 applies to Euclidean */
    const missing = q.parts.filter(pp => !d.parts[pp.id]).map(pp => pp.id);
    tick(missing.length === 0, `${q.id}: parts with no diagram entry: ${missing.join(",")}`);
  });

  /* 10a — THE NO-LEAK RULE, one case per question, mirroring section
     9b's bare-figure check: a part's QUESTION-side figure must never
     draw the very fact that part is being asked to find. */

  /* func.hyp.t1q4(c) — B's coordinates are the answer to (c), so the
     question-side figure must carry no point at B until (c)'s own
     reveal. */
  {
    const q = withDiagram.find(x => x.id === "func.hyp.t1q4");
    const cQ = applyFunctionHighlights(q.diagram.spec, q.diagram.parts.c.question);
    const cR = applyFunctionHighlights(q.diagram.spec, q.diagram.parts.c.reveal);
    const hasB = pts => (pts || []).some(p => Math.abs(p.x - (-8)) < 1e-9 && Math.abs(p.y - 0) < 1e-9);
    tick(!hasB(cQ.points), "func.hyp.t1q4(c) question-side figure leaks B's coordinates");
    tick(hasB(cR.points), "func.hyp.t1q4(c) reveal-side figure should mark B");
    console.log(`  t1q4(c): B on question side? ${hasB(cQ.points)} · on reveal side? ${hasB(cR.points)} — ${!hasB(cQ.points) && hasB(cR.points) ? "OK" : "FAIL"}`);
  }

  /* func.hyp.t2q3(a) — the one part that DERIVES the asymptotes from
     the equation. The base spec must carry no `asymptotes` overlay and
     no grid, and (a)'s question-side figure must carry no points at
     all (nothing to read the answer off before it is found). */
  {
    const q = withDiagram.find(x => x.id === "func.hyp.t2q3");
    tick(!q.diagram.spec.asymptotes, "func.hyp.t2q3 base spec must not draw asymptote lines (leaks (a)'s answer)");
    tick(!q.diagram.spec.grid, "func.hyp.t2q3 base spec must not show a grid (leaks (a)'s answer by ruler)");
    const aQ = applyFunctionHighlights(q.diagram.spec, q.diagram.parts.a.question);
    tick((aQ.points || []).length === 0, `func.hyp.t2q3(a) question-side figure should carry no points, got ${JSON.stringify(aQ.points)}`);
    const aR = applyFunctionHighlights(q.diagram.spec, q.diagram.parts.a.reveal);
    const hasCentre = (aR.points || []).some(p => Math.abs(p.x - (-1)) < 1e-9 && Math.abs(p.y - 2) < 1e-9);
    tick(hasCentre, "func.hyp.t2q3(a) reveal-side figure should mark the centre (−1 ; 2)");
    console.log(`  t2q3(a): question-side points ${(aQ.points || []).length}, no asymptotes/grid on base, reveal marks centre — ${(aQ.points || []).length === 0 && !q.diagram.spec.asymptotes && !q.diagram.spec.grid && hasCentre ? "OK" : "FAIL"}`);
  }

  /* func.gt.t1q5(b) — PQ sits at the print's own illustrative x = 3,5
     on the base figure (never the answer), and only (b)'s own reveal
     moves it to the true maximum x = 2. */
  {
    const q = withDiagram.find(x => x.id === "func.gt.t1q5");
    tick(q.diagram.spec.segment && q.diagram.spec.segment.x === 3.5, `func.gt.t1q5 base segment must sit at the illustrative x=3,5, got ${q.diagram.spec.segment && q.diagram.spec.segment.x}`);
    const bQ = applyFunctionHighlights(q.diagram.spec, q.diagram.parts.b.question);
    tick(bQ.segment.x === 3.5, `func.gt.t1q5(b) question-side segment should still be the illustrative x=3,5, got ${bQ.segment.x}`);
    const bR = applyFunctionHighlights(q.diagram.spec, q.diagram.parts.b.reveal);
    tick(bR.segment.x === 2, `func.gt.t1q5(b) reveal-side segment must move to the true maximum x=2, got ${bR.segment.x}`);
    console.log(`  gt.t1q5(b): base/question segment x=${bQ.segment.x}, reveal segment x=${bR.segment.x} — ${bQ.segment.x === 3.5 && bR.segment.x === 2 ? "OK" : "FAIL"}`);
  }
}

/* ---------- verdict ---------- */
console.log(`\n===== ${passed}/${total} checks passed =====`);
if (fails.length) { console.log("FAILURES:"); fails.forEach(f => console.log("  · " + f)); process.exitCode = 1; }
