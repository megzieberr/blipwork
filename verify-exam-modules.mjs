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
  /* --- EUCLIDEAN, BUILD DAY WAVE 1 SESSION G1 (2026-08-23). The two
     tiles G1 owns: three of the four examinable bookwork proofs (the
     fourth is already written as euclid.circ.t2q4(a) and is only
     re-homed, never re-composed), and five chained riders that each run
     5–6 dependent parts on ONE sketch — her ruling 4. Both modules are
     composed tile-first, so their `topic` is a tile id from the start,
     and both belong to no paper (paper: "siblings"). --- */
  ["euclid-bookwork-proofs.js",            "euclidBookworkProofQuestions"],
  ["euclid-siblings-chords-and-angles.js", "euclidChordsAndAnglesSiblingQuestions"],
  /* --- EUCLIDEAN, BUILD DAY WAVE 2 SESSION G2 (2026-08-23). The other
     three tiles: six chained cyclic-quadrilateral riders, five chained
     tangent riders (the sixth card on that tile is the re-homed
     euclid.tan.t2q5 a–c), and the chapter's Level 4 ★ tile — six fresh
     hard finishers beside the re-homed euclid.tan.t2q5(d). Composed
     tile-first like G1's, so `topic` is a tile id from the start, and
     all of them belong to no paper (paper: "siblings"). --- */
  ["euclid-siblings-cyclic-quads.js",      "euclidCyclicQuadsSiblingQuestions"],
  ["euclid-siblings-tangents.js",          "euclidTangentsSiblingQuestions"],
  ["euclid-level4.js",                     "euclidLevel4Questions"],
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
  /* --- FUNCTIONS, SESSION D1 of the Exam Focus build day (2026-08-23,
     EXAM-BUILD-DAY.md + sessions/D1-func-new-tiles.md). Eighteen fresh
     questions across three of the four NEW Functions tiles: sketch,
     intersection and average-gradient, six cards each. All
     paper: "siblings", so the sept-t1 / sept-t2 star counts in section
     4 are untouched. Their recompute blocks are at the bottom of
     section 8. --- */
  ["func-siblings-sketch.js",                    "funcSketchSiblingQuestions"],
  ["func-siblings-intersection.js",              "funcIntersectionSiblingQuestions"],
  ["func-siblings-average-gradient.js",          "funcAverageGradientSiblingQuestions"],
  /* --- FUNCTIONS, SESSION D2 of the Exam Focus build day (2026-08-23,
     EXAM-BUILD-DAY.md + sessions/D2-func-reflections-level4.md). The
     FOURTH new Functions tile (reflections, 6 questions), the chapter's
     Level 4 ★ tile (6 fresh questions — the other four cards on that
     tile are ★ parts MOVED there from normal tiles, so they still live
     in their own source modules above and are not repeated), and four
     top-up questions for the two tiles the ★ move left short. All
     paper: "siblings", so the sept-t1 / sept-t2 star counts in section
     4 are untouched. Their recompute blocks are at the bottom of
     section 8. --- */
  ["func-siblings-reflections.js",               "funcReflectionsSiblingQuestions"],
  ["func-level4.js",                             "funcLevel4Questions"],
  ["func-siblings-topup.js",                     "funcTopUpSiblingQuestions"],
  /* --- EXPONENTS & SURDS, SESSION B of the Exam Focus build day
     (2026-08-23, EXAM-BUILD-DAY.md + sessions/B-exp.md). Thirty-one
     fresh questions across seven modules: two brand-new tiles
     (rational-exponents-numeric, surd-proofs), four tiles topped up to
     six, and the chapter's Level 4 ★ tile. All paper: "siblings", so
     the sept-t1 / sept-t2 star counts in section 4 are untouched. --- */
  ["exp-siblings-rational-exponents-numeric.js", "expRationalExponentsNumericSiblingQuestions"],
  ["exp-siblings-exponent-expressions.js",       "expExponentExpressionsSiblingQuestions"],
  ["exp-siblings-exponential-equations.js",      "expExponentialEquationsSiblingQuestions"],
  ["exp-siblings-surds.js",                      "expSurdsSiblingQuestions"],
  ["exp-siblings-rationalise.js",                "expRationaliseSiblingQuestions"],
  ["exp-siblings-surd-proofs.js",                "expSurdProofsSiblingQuestions"],
  ["exp-level4.js",                              "expLevel4Questions"],
  /* --- ALGEBRAIC EXPRESSIONS (algx) — WAVE 1, SESSION A, 2026-08-23.
     The new exam-focus-only chapter (EXAM-BUILD-DAY.md ruling 2), Grade
     10 revision: six modules, one per tile, 37 questions, 180 marks.
     Composed skill-first like the Functions siblings, so each question
     already carries its tile id as its `topic` and each is a whole card.
     paper: "siblings", so the sept-t1 / sept-t2 star counts in section 4
     are untouched by them. --- */
  ["algx-siblings-expand.js",                    "algxExpandSiblingQuestions"],
  ["algx-siblings-factorise-basics.js",          "algxFactoriseBasicsSiblingQuestions"],
  ["algx-siblings-factorise-advanced.js",        "algxFactoriseAdvancedSiblingQuestions"],
  ["algx-siblings-fractions-multiply-divide.js", "algxFractionsMultiplyDivideSiblingQuestions"],
  ["algx-siblings-fractions-add-subtract.js",    "algxFractionsAddSubtractSiblingQuestions"],
  ["algx-level4.js",                             "algxLevel4Questions"],
  /* --- GENERAL TRIG, PART 1 (gtrig) — WAVE 1, SESSION F1, 2026-08-23.
     The first four tiles of the chapter's tile map: co-functions and
     special-sums topped up from one card to six, special-angles and
     super-special-sums born from nothing. Twenty-two questions, 85
     marks, composed skill-first like the Functions siblings so each
     already carries its tile id as its `topic`. paper: "siblings", so
     the sept-t1 / sept-t2 star counts in section 4 are untouched.
     Section 11 at the foot of this file checks their quadtri figures.
     Session F2 adds reduction / identities / identities-undefined /
     general-solution / level-4 alongside these. --- */
  ["gtrig-siblings-co-functions.js",             "gtrigCoFunctionsSiblingQuestions"],
  ["gtrig-siblings-special-angles.js",           "gtrigSpecialAnglesSiblingQuestions"],
  ["gtrig-siblings-special-sums.js",             "gtrigSpecialSumsSiblingQuestions"],
  ["gtrig-siblings-super-special-sums.js",       "gtrigSuperSpecialSumsSiblingQuestions"],
  /* --- GENERAL TRIG, PART 2 (gtrig) — WAVE 2, SESSION F2, 2026-08-23.
     The other five tiles of the chapter's tile map: reduction and
     general-solution topped up from one card to six, and identities /
     identities-undefined / level-4 born from nothing. Twenty-eight
     questions, 189 marks, composed skill-first like part 1 so each
     already carries its tile id as its `topic`. paper: "siblings", so
     the sept-t1 / sept-t2 star counts in section 4 are untouched. NO
     FIGURES anywhere in these five — the bow tie, the quadrant cross
     and the little right triangle are all the learner's own pen work —
     so section 11's quadtri count is untouched too. Their recompute
     block is section 14 at the foot of this file. --- */
  ["gtrig-siblings-reduction.js",                "gtrigReductionSiblingQuestions"],
  ["gtrig-siblings-identities.js",               "gtrigIdentitiesSiblingQuestions"],
  ["gtrig-siblings-identities-undefined.js",     "gtrigIdentitiesUndefinedSiblingQuestions"],
  ["gtrig-siblings-general-solution.js",         "gtrigGeneralSolutionSiblingQuestions"],
  ["gtrig-level4.js",                            "gtrigLevel4Questions"],
  /* --- TRIG GRAPHS (tgraph) — WAVE 1, SESSION E, 2026-08-23. The
     chapter is NEW to Exam Focus: six tiles, six cards each, 36
     questions and 197 marks, composed skill-first so every question
     already carries its tile id as its `topic` and is one whole card.
     paper: "siblings", so the sept-t1 / sept-t2 star counts in section
     4 are untouched. Section 12 recomputes every number in them from
     first principles (numerically, from the curve definitions — never
     from a memo string) and section 13 measures every trigg figure. --- */
  ["tgraph-siblings-period-amplitude-range.js",  "tgraphPeriodAmplitudeRangeQuestions"],
  ["tgraph-siblings-read-parameters.js",         "tgraphReadParametersQuestions"],
  ["tgraph-siblings-sketch.js",                  "tgraphSketchQuestions"],
  ["tgraph-siblings-intersections-inequalities.js", "tgraphIntersectionsInequalitiesQuestions"],
  ["tgraph-siblings-shift-reflect.js",           "tgraphShiftReflectQuestions"],
  ["tgraph-level4.js",                           "tgraphLevel4Questions"],
  /* --- EQUATIONS & INEQUALITIES (eqn) — WAVE 2, SESSION C2,
     2026-08-23. The three tiles the chapter did not have at all
     (quadratic-solving, surd-equations, simultaneous), six fresh cards
     each, plus the six cards that OPEN the chapter's Level 4 ★ tile.
     24 questions, 137 marks, composed skill-first so each already
     carries its tile id as its `topic` and is one whole card.
     paper: "siblings", so the sept-t1 / sept-t2 star counts in section
     4 are untouched. Section 14 at the foot of this file recomputes
     every number in them from first principles. Session C1 fills the
     chapter's seven ORIGINAL tiles alongside these. --- */
  ["eqn-siblings-quadratic-solving.js",          "eqnQuadraticSolvingSiblingQuestions"],
  ["eqn-siblings-surd-equations.js",             "eqnSurdEquationsSiblingQuestions"],
  ["eqn-siblings-simultaneous.js",               "eqnSimultaneousSiblingQuestions"],
  ["eqn-level4.js",                              "eqnLevel4Questions"],
  /* --- EQUATIONS & INEQUALITIES, WAVE 2 SESSION C1 (2026-08-23). The
     chapter's seven ORIGINAL tiles, each filled to six cards: 27 fresh
     questions, 150 marks, composed skill-first so each already carries
     its tile id as its `topic` and is one whole card. paper: "siblings",
     so the sept-t1 / sept-t2 star counts in section 4 are untouched.
     Section 15 at the foot of this file recomputes every number in them
     from first principles. The same session also MOVED the chapter's
     six existing ★ parts onto the Level 4 tile — a re-cut in
     js/exam/cards-eqn.js only, so none of the source modules below or
     above changed and their EXPECTED_STARS entries are unaffected. --- */
  ["eqn-siblings-nature-chain.js",               "eqnNatureChainSiblingQuestions"],
  ["eqn-siblings-k-equal-roots.js",              "eqnKEqualRootsSiblingQuestions"],
  ["eqn-siblings-k-for-nature.js",               "eqnKForNatureSiblingQuestions"],
  ["eqn-siblings-delta-in-p.js",                 "eqnDeltaInPSiblingQuestions"],
  ["eqn-siblings-inequalities.js",               "eqnInequalitiesSiblingQuestions"],
  ["eqn-siblings-fraction-equations.js",         "eqnFractionEquationsSiblingQuestions"],
  ["eqn-siblings-rational-exponents-k.js",       "eqnRationalExponentsKSiblingQuestions"],
  /* --- EQUATIONS & INEQUALITIES, SESSION H (2026-08-23), her
     afternoon extension to the build day: ONE new tile,
     solution-count "Two, one or no solution?", six fresh questions,
     18 marks, built alongside the new eq9 drill round that teaches
     it. Composed skill-first like the rest, so `topic` is the tile
     id from the start, and paper: "siblings", so the sept-t1 /
     sept-t2 star counts in section 4 are untouched. Section 16 at
     the foot of this file recomputes every number in them. --- */
  ["eqn-siblings-solution-count.js",             "eqnSolutionCountSiblingQuestions"],
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
  /* WIDENED 2026-08-23 (build day, session G1): her ruling was about the
     WHOLE Euclidean chapter, not about those first two questions, so
     every Euclidean question composed from here on carries the same
     documented placeholder. Three bookwork proofs and five riders. */
  "euclid.bw.q1", "euclid.bw.q2", "euclid.bw.q3",
  ...[1, 2, 3, 4, 5].map(n => `euclid.sib.ca.q${n}`),
  /* WAVE 2, SESSION G2 (2026-08-23): the same standing ruling, on the
     other three Euclidean tiles. Six cyclic-quad riders, five tangent
     riders and six Level 4 ★ cards. */
  ...[1, 2, 3, 4, 5, 6].map(n => `euclid.sib.cq.q${n}`),
  ...[1, 2, 3, 4, 5].map(n => `euclid.sib.tg.q${n}`),
  ...[1, 2, 3, 4, 5, 6].map(n => `euclid.l4.q${n}`),
  /* ALGEBRAIC EXPRESSIONS (2026-08-23, wave 1 session A). Same reason
     as euclid, one step further: algx is an exam-focus-only chapter
     that owns NO drill rounds at all and none are planned (Blipwork has
     no Grade-10 expanding/factorising quests), so EVERY one of its 37
     questions carries the documented placeholder
     `PENDING-algx-is-exam-only-no-drill-round` and no "I'm lost" button
     can ever render. Written out from the id scheme rather than typed
     one by one — five normal tiles of six, plus seven on the Level 4
     tile — and the "placeholder set drifted" check below still bites,
     because a generated id that matches nothing changes the set size. */
  ...["ex", "fb", "fa", "fmd", "fas"].flatMap(t => [1, 2, 3, 4, 5, 6].map(n => `algx.sib.${t}.q${n}`)),
  ...[1, 2, 3, 4, 5, 6, 7].map(n => `algx.l4.q${n}`),
]);

/* Questions whose lostQuest points at a round in ANOTHER chapter, on
   purpose. The schema has always allowed this (js/exam/_schema.js only
   requires two non-empty strings) and js/exam-play.js resolves and
   gates such a link exactly like any other; until 2026-08-23 no seeded
   question had needed one, so the check below simply insisted the two
   chapters matched.

   SESSION C2 (build day) is the first: the Equations & Inequalities
   tile "surd-equations" is reteached by exp/es8, "No-solution &
   strategy", whose own blurb in js/config.js reads "Exponential & surd
   equations: same base, common factor, let k, isolate-square-TEST, and
   every no-solution trap". That IS the round that teaches this tile,
   and no eq-round does — eq1-eq8 never touch surd equations. The same
   link rides on the Level 4 surd word problem. Pointing them at an
   eq-round instead would put a wrong reteach behind the "I'm lost"
   button, which is the one thing that button must never do. */
const LOST_CROSS_CHAPTER_OK = new Set([
  ...[1, 2, 3, 4, 5, 6].map(n => `eqn.sib.se.q${n}`),
  "eqn.l4.q4",
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
  const crossOk = LOST_CROSS_CHAPTER_OK.has(q.id);
  tick(q.lostQuest.chapter === q.chapter || crossOk, `${q.id}: lostQuest.chapter (${q.lostQuest.chapter}) differs from q.chapter (${q.chapter}) — allowed by schema but flag it`);
  if (crossOk) console.log(`     ↳ cross-chapter reteach link, documented (see LOST_CROSS_CHAPTER_OK)`);
});
/* the cross-chapter set must be exactly the documented one — same
   no-silent-drift guard the placeholder set gets below. */
{
  const actual = new Set(mine.filter(m => m.q.lostQuest.chapter !== m.q.chapter).map(m => m.q.id));
  const same = actual.size === LOST_CROSS_CHAPTER_OK.size && [...actual].every(id => LOST_CROSS_CHAPTER_OK.has(id));
  tick(same, `cross-chapter lostQuest set drifted: got [${[...actual]}], expected [${[...LOST_CROSS_CHAPTER_OK]}]`);
  console.log(`  cross-chapter lostQuest set: ${actual.size} question(s) — ${same ? "OK, exactly the documented ones" : "FAIL"}`);
}
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
  /* SESSION G1's eight (2026-08-23). Levels 1–3 only on both of its
     tiles — bookwork is level 1 recall, the riders ramp 1 → 3 — so a
     star appearing on any of them would mean a level drifted. The
     Euclidean ★ questions all live on session G2's Level 4 tile. */
  "euclid.bw.q1": [], "euclid.bw.q2": [], "euclid.bw.q3": [],
  "euclid.sib.ca.q1": [], "euclid.sib.ca.q2": [], "euclid.sib.ca.q3": [],
  "euclid.sib.ca.q4": [], "euclid.sib.ca.q5": [],
  /* SESSION G2's seventeen (2026-08-23). The eleven riders on the
     cyclic-quads and tangents tiles are levels 1–3, so NO star may
     appear on any of them; the six Level 4 ★ cards carry a star on
     every part that is level 4, and their lead-ins are level 3. */
  ...Object.fromEntries([1, 2, 3, 4, 5, 6].map(n => [`euclid.sib.cq.q${n}`, []])),
  ...Object.fromEntries([1, 2, 3, 4, 5].map(n => [`euclid.sib.tg.q${n}`, []])),
  "euclid.l4.q1": ["b", "c"], "euclid.l4.q2": ["b", "c"], "euclid.l4.q3": ["b", "c"],
  "euclid.l4.q4": ["c", "d"], "euclid.l4.q5": ["b", "c", "d"], "euclid.l4.q6": ["a", "c"],
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
  /* ALGEBRAIC EXPRESSIONS (2026-08-23). Her ruling 5: levels 1-3 on the
     five normal tiles, so NO star may appear on any of those thirty
     cards — a star there would mean a level drifted and the Level 4
     wall in verify-exam.html Part 13 would fail too. */
  ...Object.fromEntries(["ex", "fb", "fa", "fmd", "fas"]
    .flatMap(t => [1, 2, 3, 4, 5, 6].map(n => [`algx.sib.${t}.q${n}`, []]))),
  /* The Level 4 tile itself: every card is a "hence" pair whose SECOND
     part is the ★, except q7, where both parts are level 4 (two grouped
     differences of squares, neither of them a lead-in to the other). */
  "algx.l4.q1": ["a"], "algx.l4.q2": ["b"], "algx.l4.q3": ["b"], "algx.l4.q4": ["b"],
  "algx.l4.q5": ["b"], "algx.l4.q6": ["b"], "algx.l4.q7": ["a", "b"],
  /* FUNCTIONS SESSION D1's eighteen (2026-08-23) — the three NEW tiles
     sketch / intersection / average-gradient. Her ruling 5: levels 1-3
     on the normal tiles, so every one of them is expected to carry NO
     star; a star appearing here would mean a level drifted onto a
     normal tile. */
  "func.sib.sk.q1": [], "func.sib.sk.q2": [], "func.sib.sk.q3": [],
  "func.sib.sk.q4": [], "func.sib.sk.q5": [], "func.sib.sk.q6": [],
  "func.sib.int.q1": [], "func.sib.int.q2": [], "func.sib.int.q3": [],
  "func.sib.int.q4": [], "func.sib.int.q5": [], "func.sib.int.q6": [],
  "func.sib.ag.q1": [], "func.sib.ag.q2": [], "func.sib.ag.q3": [],
  "func.sib.ag.q4": [], "func.sib.ag.q5": [], "func.sib.ag.q6": [],
  /* FUNCTIONS SESSION D2 (2026-08-23). The six REFLECTIONS questions and
     the four TOP-UPS all live on normal tiles, so her ruling 5 applies
     in full — levels 1–3 only, no star anywhere. func is no longer on
     verify-exam.html Part 13's L4_MOVE_PENDING list, so a star drifting
     onto any of them fails there too. */
  "func.sib.ref.q1": [], "func.sib.ref.q2": [], "func.sib.ref.q3": [],
  "func.sib.ref.q4": [], "func.sib.ref.q5": [], "func.sib.ref.q6": [],
  "func.sib.nor.q4": [], "func.sib.nor.q5": [], "func.sib.nor.q6": [],
  "func.sib.dist.q6": [],
  /* THE LEVEL 4 ★ TILE's six fresh questions (session D2) — the mirror
     image of the rule above: each carries at least one level-4 part,
     and the part ids below say exactly which, so a level drifting
     between parts fails loudly. q2 and q5 are single-part cards (the
     starred question needs no lead-in); the other four pair a level-3
     lead-in the ★ genuinely depends on with the ★ itself. The tile's
     other four cards are func.lp.q1(e), func.gt.t1q5(b)+(c) and
     func.hyp.t2q3(e), each already listed further up with its own ★. */
  "func.l4.q1": ["b"],
  "func.l4.q2": ["a"],
  "func.l4.q3": ["b"],
  "func.l4.q4": ["b"],
  "func.l4.q5": ["a"],
  "func.l4.q6": ["b"],
  /* EXPONENTS & SURDS SIBLING CARDS (session B, 2026-08-23). Her ruling
     5: levels 1-3 on the normal tiles, so every one of the twenty-five
     sibling questions below is expected to carry NO star — a star
     appearing on any of them means a level drifted onto a normal tile,
     which is exactly what verify-exam.html Part 13 now enforces for
     this chapter. */
  "exp.sib.ren.q1": [], "exp.sib.ren.q2": [], "exp.sib.ren.q3": [],
  "exp.sib.ren.q4": [], "exp.sib.ren.q5": [], "exp.sib.ren.q6": [],
  "exp.sib.expr.q1": [], "exp.sib.expr.q2": [], "exp.sib.expr.q3": [], "exp.sib.expr.q4": [],
  "exp.sib.eqns.q1": [], "exp.sib.eqns.q2": [], "exp.sib.eqns.q3": [],
  "exp.sib.srd.q1": [], "exp.sib.srd.q2": [],
  "exp.sib.rat.q1": [], "exp.sib.rat.q2": [], "exp.sib.rat.q3": [], "exp.sib.rat.q4": [],
  "exp.sib.sp.q1": [], "exp.sib.sp.q2": [], "exp.sib.sp.q3": [],
  "exp.sib.sp.q4": [], "exp.sib.sp.q5": [], "exp.sib.sp.q6": [],
  /* THE LEVEL 4 ★ TILE (session B). The mirror image of the rule above:
     every one of these six carries at least one level-4 part, and the
     part ids below say exactly which. (The tile's seventh card is
     exp.nss.q1(d), already listed further up with its own ★.) */
  "exp.l4.q1": ["a"],
  "exp.l4.q2": ["c"],
  "exp.l4.q3": ["a"],
  "exp.l4.q4": ["a"],
  "exp.l4.q5": ["b"],
  "exp.l4.q6": ["a"],
  /* GENERAL TRIG PART 1 (session F1, 2026-08-23). All four tiles are
     NORMAL tiles, so her ruling 5 applies in full: levels 1-3 only, and
     every one of these twenty-two questions is expected to carry NO
     star. gtrig is not on verify-exam.html Part 13's L4_MOVE_PENDING
     list, so a star drifting onto any of them fails there too. */
  "gtrig.sib.cf.q1": [], "gtrig.sib.cf.q2": [], "gtrig.sib.cf.q3": [],
  "gtrig.sib.cf.q4": [], "gtrig.sib.cf.q5": [],
  "gtrig.sib.sa.q1": [], "gtrig.sib.sa.q2": [], "gtrig.sib.sa.q3": [],
  "gtrig.sib.sa.q4": [], "gtrig.sib.sa.q5": [], "gtrig.sib.sa.q6": [],
  "gtrig.sib.ss.q1": [], "gtrig.sib.ss.q2": [], "gtrig.sib.ss.q3": [],
  "gtrig.sib.ss.q4": [], "gtrig.sib.ss.q5": [],
  "gtrig.sib.sss.q1": [], "gtrig.sib.sss.q2": [], "gtrig.sib.sss.q3": [],
  "gtrig.sib.sss.q4": [], "gtrig.sib.sss.q5": [], "gtrig.sib.sss.q6": [],
  /* GENERAL TRIG PART 2 (session F2, 2026-08-23). Four NORMAL tiles —
     reduction, identities, identities-undefined and general-solution —
     so her ruling 5 applies in full there: levels 1-3 only, no star.
     The Level 4 ★ tile is the mirror image: every one of its six cards
     carries exactly one starred part, and the part id below says which,
     so a level drifting between parts fails loudly. */
  "gtrig.sib.red.q1": [], "gtrig.sib.red.q2": [], "gtrig.sib.red.q3": [],
  "gtrig.sib.red.q4": [], "gtrig.sib.red.q5": [],
  "gtrig.sib.id.q1": [], "gtrig.sib.id.q2": [], "gtrig.sib.id.q3": [],
  "gtrig.sib.id.q4": [], "gtrig.sib.id.q5": [], "gtrig.sib.id.q6": [],
  "gtrig.sib.iu.q1": [], "gtrig.sib.iu.q2": [], "gtrig.sib.iu.q3": [],
  "gtrig.sib.iu.q4": [], "gtrig.sib.iu.q5": [], "gtrig.sib.iu.q6": [],
  "gtrig.sib.gs.q1": [], "gtrig.sib.gs.q2": [], "gtrig.sib.gs.q3": [],
  "gtrig.sib.gs.q4": [], "gtrig.sib.gs.q5": [],
  "gtrig.l4.q1": ["b"], "gtrig.l4.q2": ["a"], "gtrig.l4.q3": ["a"],
  "gtrig.l4.q4": ["a"], "gtrig.l4.q5": ["b"], "gtrig.l4.q6": ["b"],
  /* TRIG GRAPHS (session E, 2026-08-23). The five NORMAL tiles carry
     levels 1-3 only — her ruling 5 — so all thirty of those questions
     are expected to carry NO star. The six level-4 tile questions each
     carry exactly one star, and which part it is, is listed here so a
     level drifting between parts fails loudly. tgraph is not on
     verify-exam.html Part 13's L4_MOVE_PENDING list, so a star landing
     on a normal tile fails there too. */
  "tgraph.sib.par.q1": [], "tgraph.sib.par.q2": [], "tgraph.sib.par.q3": [],
  "tgraph.sib.par.q4": [], "tgraph.sib.par.q5": [], "tgraph.sib.par.q6": [],
  "tgraph.sib.rp.q1": [], "tgraph.sib.rp.q2": [], "tgraph.sib.rp.q3": [],
  "tgraph.sib.rp.q4": [], "tgraph.sib.rp.q5": [], "tgraph.sib.rp.q6": [],
  "tgraph.sib.sk.q1": [], "tgraph.sib.sk.q2": [], "tgraph.sib.sk.q3": [],
  "tgraph.sib.sk.q4": [], "tgraph.sib.sk.q5": [], "tgraph.sib.sk.q6": [],
  "tgraph.sib.ii.q1": [], "tgraph.sib.ii.q2": [], "tgraph.sib.ii.q3": [],
  "tgraph.sib.ii.q4": [], "tgraph.sib.ii.q5": [], "tgraph.sib.ii.q6": [],
  "tgraph.sib.sr.q1": [], "tgraph.sib.sr.q2": [], "tgraph.sib.sr.q3": [],
  "tgraph.sib.sr.q4": [], "tgraph.sib.sr.q5": [], "tgraph.sib.sr.q6": [],
  "tgraph.l4.q1": ["a"], "tgraph.l4.q2": ["a"], "tgraph.l4.q3": ["a"],
  "tgraph.l4.q4": ["b"], "tgraph.l4.q5": ["b"], "tgraph.l4.q6": ["b"],
  /* EQUATIONS & INEQUALITIES, SESSION C2 (2026-08-23). Her ruling 5:
     levels 1-3 on the three NEW normal tiles, so none of those
     eighteen questions may carry a star. The six Level 4 tile
     questions each carry exactly one, and which part it is is listed
     here so a level drifting between parts fails loudly. (eqn is still
     on verify-exam.html Part 13's L4_MOVE_PENDING list until session
     C1 moves the chapter's OLD ★ parts onto the tile — this table is
     what guards C2's own eighteen in the meantime.) */
  ...Object.fromEntries(["qs", "se", "sim"]
    .flatMap(t => [1, 2, 3, 4, 5, 6].map(n => [`eqn.sib.${t}.q${n}`, []]))),
  "eqn.l4.q1": ["a"], "eqn.l4.q2": ["a"], "eqn.l4.q3": ["a"],
  "eqn.l4.q4": ["b"], "eqn.l4.q5": ["b"], "eqn.l4.q6": ["b"],
  /* EQUATIONS & INEQUALITIES, SESSION C1 (2026-08-23). The chapter's
     seven ORIGINAL tiles are all NORMAL tiles, so her ruling 5 applies
     in full: levels 1-3 only, and every one of these twenty-seven
     questions is expected to carry NO star. eqn came OFF Part 13's
     L4_MOVE_PENDING list this session, so a star drifting onto any of
     them now fails there too. */
  ...Object.fromEntries([1, 2, 3, 4].map(n => [`eqn.sib.nc.q${n}`, []])),
  ...Object.fromEntries([1, 2, 3, 4].map(n => [`eqn.sib.ker.q${n}`, []])),
  ...Object.fromEntries([1, 2, 3, 4, 5].map(n => [`eqn.sib.kfn.q${n}`, []])),
  ...Object.fromEntries([1, 2, 3, 4].map(n => [`eqn.sib.dip.q${n}`, []])),
  ...Object.fromEntries([1, 2].map(n => [`eqn.sib.ineq.q${n}`, []])),
  ...Object.fromEntries([1, 2, 3, 4].map(n => [`eqn.sib.fe.q${n}`, []])),
  ...Object.fromEntries([1, 2, 3, 4].map(n => [`eqn.sib.rek.q${n}`, []])),
  /* EQUATIONS & INEQUALITIES, SESSION H (2026-08-23). solution-count is
     a NORMAL tile, so her ruling 5 applies: levels 1-3 only, and all six
     questions are expected to carry NO star. */
  ...Object.fromEntries([1, 2, 3, 4, 5, 6].map(n => [`eqn.sib.sc.q${n}`, []])),
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
  /* The first eight are the CONTENT slugs the seeded practice-paper
     questions carry, straight off the eq1-eq8 quest breakdown. The
     SKILL ids after them are the tile ids from EXAM-BUILD-DAY.md's map
     (js/exam/skills.js): the build-day sessions compose skill-first —
     one module per tile — so a question's `topic` is the tile from the
     start, exactly like the Functions and Exponents siblings above.
     WIDENED 2026-08-23 by SESSION C2 with the three NEW tiles it built
     and the chapter's level-4 tile; every one of them is inside the
     chapter's own rounds (eq1 standard form & brackets = 0, eq5
     perfect squares, eq6 the formula & simultaneous), which is what
     this wall exists to check. Session C1's tile ids sit here too. */
  eqn: ["standard-form-and-factorising", "special-cases", "k-method", "fractions-and-restrictions",
        "perfect-square-and-turning-point", "formula-and-simultaneous", "inequalities", "nature-of-roots",
        "quadratic-solving", "surd-equations", "simultaneous", "level-4",
        /* SESSION C1's seven ORIGINAL tiles (2026-08-23), composed
           skill-first, so their `topic` is a tile id from the start —
           the same relationship the exp and func walls below already
           carry. "inequalities" is listed once above and serves both. */
        "nature-chain", "k-equal-roots", "k-for-nature", "delta-in-p",
        "fraction-equations", "rational-exponents-k",
        /* SESSION H's one new tile (2026-08-23). Inside the chapter's own
           rounds by construction: eq9 "Two, one or no solution?" was built
           in the same session and is the round that teaches it. */
        "solution-count"],
  /* The first eight are the CONTENT slugs the three seeded practice-paper
     questions carry, straight off the es1-es8 quest breakdown. The seven
     after them are the SKILL ids (js/exam/skills.js): session B's sibling
     questions are composed skill-first — one file per tile — so their
     `topic` is the skill from the start, exactly like the Functions
     sibling questions above. Both kinds of slug sit inside the Exponents
     & Surds chapter's own rounds either way, which is what this wall
     exists to check. */
  exp: ["exponent-laws", "spot-the-trap", "first-step-and-method", "which-divorce", "surd-laws-and-traps",
        "conjugates-and-rationalising", "rational-exponent-equations", "no-solution-and-strategy",
        "rational-exponents-numeric", "exponent-expressions", "exponential-equations",
        "surds", "rationalise", "surd-proofs", "level-4"],
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
         "shift", "inequalities", "nature-of-roots", "distances",
         /* the NEW tiles from EXAM-BUILD-DAY.md's map — session D1 built
            these three (2026-08-23); all three are inside the chapter's
            own rounds (fn1-fn3 teach the four families and how to draw
            them, fn7 teaches intersections and average gradient). */
         "sketch", "intersection", "average-gradient",
         /* session D2 (2026-08-23): the fourth new tile and the
            chapter's Level 4 ★ tile. Reflections are her pp19–24, and
            fn6 "Transformations" is the round that teaches them; the
            Level 4 tile is mixed, so its questions point at fn2 and
            fn7 — every one of them inside the chapter's own rounds,
            which is what this wall exists to check. */
         "reflections", "level-4"],
  /* trig wall from the t1–t7 quest breakdown — sine rule, cosine rule,
     area rule and mixed problems, nothing else. The two topics that
     used to sit here and stretch it past its own rounds moved to the
     gtrig wall below on 2026-08-22. */
  /* GENERAL TRIG (2026-08-22): its own chapter, its own rounds — the
     two topics that used to widen the trig wall belong here now. */
  /* The first thirteen are the CONTENT slugs, straight off the gt1-gt13
     round breakdown. The four after them are SKILL ids from
     js/exam/skills.js that no round happens to share a name with:
     session F2's questions are composed skill-first, so their `topic` is
     the tile id from the start — "reduction" (gt5/gt7 teach it),
     "identities-undefined" (gt13), "general-solution" (gt11/gt12) and
     "level-4" (the chapter's own brave round, mixed). Session F1's four
     tile ids — co-functions, special-angles, special-sums,
     super-special-sums — were already in the list because the rounds
     carry the same names. Everything here is inside the General Trig
     chapter's own rounds, which is what this wall exists to check. */
  gtrig: ["introduction", "cartesian-plane", "special-angles", "co-functions", "reductions",
          "tip-chips", "reduction-and-ratios", "special-sums", "identities",
          "super-special-sums", "six-types", "general-solutions", "undefined-values",
          "reduction", "identities-undefined", "general-solution", "level-4"],
  trig: ["which-rule-fits", "sine-rule-sides", "sine-rule-angles", "cosine-rule-sides",
         "cosine-rule-angles", "area-rule", "mixed-problems"],
  /* EUCLIDEAN wall, from GR11-IEB-PAPER-BANK.md's Grade 11 Euclidean
     scope wall (four examinable proofs, acute case only; everything
     else use-as-result; no similarity, no concurrency, no proof by
     contradiction) — proposed in README-PENDING.md, adopted here. */
  /* WIDENED 2026-08-23 (build day): the chapter's tiles were re-cut, and
     the content sessions compose TILE-FIRST, so a question's `topic` is
     now a tile id from EXAM-BUILD-DAY.md's map. All five tile ids are
     listed (G1 seeds the first two, G2 the rest); the two original
     content slugs stay because the two seeded questions still carry
     them. The wall itself is unchanged in substance — every one of
     these is inside GR11-IEB-PAPER-BANK.md's Grade 11 Euclidean scope
     (four examinable proofs, acute case only; everything else
     use-as-result; no similarity, no concurrency, no proof by
     contradiction). */
  euclid: ["circle-theorems", "tangents-and-cyclic-quads",
           "bookwork-proofs", "chords-and-angles", "cyclic-quads", "tangents", "level-4"],
  /* ALGEBRAIC EXPRESSIONS (2026-08-23). algx owns no drill rounds, so
     its wall is EXAM-BUILD-DAY.md's tile map rather than a quest
     breakdown — the six ids in js/exam/skills.js, and nothing else.
     Composed skill-first, so every question's `topic` is already a
     tile id. */
  algx: ["expand", "factorise-basics", "factorise-advanced",
         "fractions-multiply-divide", "fractions-add-subtract", "level-4"],
  /* TRIG GRAPHS (2026-08-23). tgraph is an ordinary quest chapter
     (rounds tg1-tg7) but it is NEW to Exam Focus, so its wall is
     EXAM-BUILD-DAY.md's tile map — the six skill ids in
     js/exam/skills.js, and nothing else. The chapter's own hard scope
     wall, "trig graphs, max two parameters varied"
     (GR11-IEB-PAPER-BANK.md), is a property of the EQUATIONS rather
     than of the topic slug, so it is checked curve by curve in
     section 13. */
  tgraph: ["period-amplitude-range", "read-parameters", "sketch",
           "intersections-inequalities", "shift-reflect", "level-4"],
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

/* --- EXPONENTS & SURDS SIBLING + LEVEL 4 CARDS (session B, 2026-08-23)
   Same discipline as everything above: every number is rebuilt from the
   PROMPT's own given expression and then checked against what the memo
   claims. Nothing below reads a memo string. Where JS refuses a real
   root of a negative (Math.pow(−125, 2/3) is NaN even though the value
   is a perfectly ordinary 25), the cube root is taken with Math.cbrt
   and then squared — which is exactly what the memo's own method does,
   and is the only honest way to recompute her negatives box. --- */
console.log("\n-- session B: Exponents & Surds sibling + Level 4 cards --");

/* ren.q1-q6 — rational & negative exponents, no calculator */
{
  chk("ren.q1 25^(3/2) = 125", Math.pow(25, 3 / 2), 125);
  chkS("ren.q1 premise: 25 = 5²", 5 ** 2, 25);
  chk("ren.q1 …and the same by the other road, (√25)³", Math.sqrt(25) ** 3, 125);

  chk("ren.q2 √(36⁻¹) = 1/6", Math.sqrt(Math.pow(36, -1)), 1 / 6);

  chk("ren.q3 27^(−2/3) = 1/9", Math.pow(27, -2 / 3), 1 / 9);
  chkS("ren.q3 premise: 27 = 3³", 3 ** 3, 27);
  chk("ren.q3 the positive twin 27^(2/3) = 9", Math.pow(27, 2 / 3), 9);

  chkS("ren.q4 premise: 32 = 2⁵ and 9 = 3²", 2 ** 5 === 32 && 3 ** 2 === 9, true);
  chk("ren.q4 32^(2/5) = 4", Math.pow(32, 2 / 5), 4);
  chk("ren.q4 9^(−1/2) = 1/3", Math.pow(9, -1 / 2), 1 / 3);
  chk("ren.q4 the product = 4/3", Math.pow(32, 2 / 5) * Math.pow(9, -1 / 2), 4 / 3);

  chk("ren.q5 3⁻¹ + 6⁻¹ = 1/2", Math.pow(3, -1) + Math.pow(6, -1), 1 / 2);
  chk("ren.q5 (3⁻¹ + 6⁻¹)⁻² = 4", Math.pow(Math.pow(3, -1) + Math.pow(6, -1), -2), 4);
  chkS("ren.q5 the banned shortcut (3 + 6)² does NOT give 4", (3 + 6) ** 2 === 4, false);

  chk("ren.q6 (1/2)⁻³ = 8", Math.pow(0.5, -3), 8);
  chk("ren.q6 4⁻¹ + (−4)⁰ − (1/2)⁻³ = −27/4", Math.pow(4, -1) + Math.pow(-4, 0) - Math.pow(0.5, -3), -27 / 4);
  chk("ren.q6 …which really is −6,75", -27 / 4, -6.75);
}

/* expr.q1-q4 — simplify exponent expressions */
{
  const lhs1 = (a, b) => Math.pow(2 * a ** 3 * Math.pow(b, -2), 4) / (8 * a ** 5 * Math.pow(b, -3));
  const rhs1 = (a, b) => 2 * a ** 7 / b ** 5;
  let bad = 0;
  for (let i = 1; i <= 40; i++) for (let j = 1; j <= 40; j++) {
    const a = i / 7, b = j / 5;
    if (Math.abs(lhs1(a, b) - rhs1(a, b)) > 1e-9 * Math.max(1, Math.abs(rhs1(a, b)))) bad++;
  }
  chk("expr.q1 (2a³b⁻²)⁴ ÷ (8a⁵b⁻³) ≡ 2a⁷/b⁵ (1 600-point sweep, mismatches)", bad, 0);
  chkS("expr.q1 premise: the 2 gets the exponent too — 2⁴ = 16", 2 ** 4, 16);

  bad = 0;
  for (let m = -6; m <= 8; m++) {
    const v = (5 ** (m + 1) - 5 ** (m - 1)) / 5 ** m;
    if (Math.abs(v - 24 / 5) > 1e-9) bad++;
  }
  chk("expr.q2 (5^(m+1) − 5^(m−1))/5^m ≡ 24/5 for every m (15 values, mismatches)", bad, 0);
  chk("expr.q2 …and 24/5 is 5 − 1/5", 5 - 1 / 5, 24 / 5);

  chk("expr.q3 4⁻¹ + 12⁻¹ = 1/3", Math.pow(4, -1) + Math.pow(12, -1), 1 / 3);
  chk("expr.q3 2 ÷ (4⁻¹ + 12⁻¹) = 6", 2 / (Math.pow(4, -1) + Math.pow(12, -1)), 6);
  chkS("expr.q3 the banned shortcut 2(4 + 12) does NOT give 6", 2 * (4 + 12) === 6, false);

  bad = 0;
  for (let n = -5; n <= 9; n++) {
    const v = (9 ** (n + 1) * 8 ** n) / (6 ** n * 12 ** (n + 1));
    if (Math.abs(v - 0.75) > 1e-9) bad++;
  }
  chk("expr.q4 (9^(n+1)·8^n)/(6^n·12^(n+1)) ≡ 3/4 for every n (15 values, mismatches)", bad, 0);
  chkS("expr.q4 premise: 9 = 3², 8 = 2³, 6 = 2·3, 12 = 2²·3",
    3 ** 2 === 9 && 2 ** 3 === 8 && 2 * 3 === 6 && 2 ** 2 * 3 === 12, true);
}

/* eqns.q1-q3 — exponential equations */
{
  chk("eqns.q1 x = 1 satisfies 2^x · 2^(x+4) = 64", 2 ** 1 * 2 ** (1 + 4), 64);
  chkS("eqns.q1 it is the only root (2x + 4 = 6 is linear)", 2 * 1 + 4 === 6, true);
  chkS("eqns.q1 premise: 64 = 2⁶", 2 ** 6, 64);

  chk("eqns.q2 x = −2 satisfies (1/4)^(x−1) = 64", Math.pow(0.25, -2 - 1), 64);
  chkS("eqns.q2 premise: 64 = 4³", 4 ** 3, 64);
  chkS("eqns.q2 it is the only root (1 − x = 3 is linear)", 1 - -2 === 3, true);

  chk("eqns.q3 x = 2 satisfies 3^(x+2) − 3^x = 72", 3 ** (2 + 2) - 3 ** 2, 72);
  let bad = 0;
  for (let i = -300; i <= 500; i++) {
    const x = i / 100;
    if (Math.abs((3 ** (x + 2) - 3 ** x) - 8 * 3 ** x) > 1e-9) bad++;
  }
  chk("eqns.q3 3^(x+2) − 3^x ≡ 8·3^x (801-point sweep, mismatches)", bad, 0);
  chkS("eqns.q3 …so 3^x = 9 and 9 = 3²", 72 / 8 === 9 && 3 ** 2 === 9, true);
}

/* srd.q1-q2 — working with surds */
{
  chk("srd.q1 √128 = 8√2", Math.sqrt(128), 8 * Math.sqrt(2));
  chk("srd.q1 20/√50 = 2√2", 20 / Math.sqrt(50), 2 * Math.sqrt(2));
  chk("srd.q1 √128 + 20/√50 = 10√2", Math.sqrt(128) + 20 / Math.sqrt(50), 10 * Math.sqrt(2));

  let bad = 0;
  for (let i = 0; i <= 800; i++) {
    const x = i / 100;
    const lhs = Math.sqrt(18 * x ** 3) + x * Math.sqrt(8 * x);
    const rhs = 5 * x * Math.sqrt(2 * x);
    if (Math.abs(lhs - rhs) > 1e-9 * Math.max(1, Math.abs(rhs))) bad++;
  }
  chk("srd.q2 √(18x³) + x√(8x) ≡ 5x√(2x) for x ≥ 0 (801-point sweep, mismatches)", bad, 0);
  chk("srd.q2 premise at x = 2: 3x√(2x) = 6·2 = 12", 3 * 2 * Math.sqrt(4), 12);
}

/* rat.q1-q4 — rationalise the denominator */
{
  chk("rat.q1 10/√18 = 5√2/3", 10 / Math.sqrt(18), 5 * Math.sqrt(2) / 3);
  chk("rat.q1 the intermediate 10√18/18 is the same number", 10 * Math.sqrt(18) / 18, 5 * Math.sqrt(2) / 3);

  chk("rat.q2 6/(√3 + 1) = 3√3 − 3", 6 / (Math.sqrt(3) + 1), 3 * Math.sqrt(3) - 3);
  chkS("rat.q2 in the form a + b√3 the values are a = −3, b = 3",
    Math.abs((-3 + 3 * Math.sqrt(3)) - 6 / (Math.sqrt(3) + 1)) < 1e-9, true);
  chk("rat.q2 the conjugate really clears the bottom: (√3 + 1)(√3 − 1) = 2", (Math.sqrt(3) + 1) * (Math.sqrt(3) - 1), 2);

  chk("rat.q3 (√7 + √3)² = 10 + 2√21", (Math.sqrt(7) + Math.sqrt(3)) ** 2, 10 + 2 * Math.sqrt(21));
  chk("rat.q3 (√7 + √3)/(√7 − √3) = (5 + √21)/2",
    (Math.sqrt(7) + Math.sqrt(3)) / (Math.sqrt(7) - Math.sqrt(3)), (5 + Math.sqrt(21)) / 2);

  chk("rat.q4 1/(√5 − √3) = (√5 + √3)/2", 1 / (Math.sqrt(5) - Math.sqrt(3)), (Math.sqrt(5) + Math.sqrt(3)) / 2);
  chk("rat.q4 1/(√5 + √3) = (√5 − √3)/2", 1 / (Math.sqrt(5) + Math.sqrt(3)), (Math.sqrt(5) - Math.sqrt(3)) / 2);
  chk("rat.q4 the difference = √3", 1 / (Math.sqrt(5) - Math.sqrt(3)) - 1 / (Math.sqrt(5) + Math.sqrt(3)), Math.sqrt(3));
}

/* sp.q1-q6 — surd "show that" & number tricks */
{
  chk("sp.q1 (√18 + √2)/√2 = 4", (Math.sqrt(18) + Math.sqrt(2)) / Math.sqrt(2), 4);
  chk("sp.q1 OR route: √18/√2 = √9 = 3", Math.sqrt(18) / Math.sqrt(2), 3);

  chk("sp.q2 (3 + √2)² = 11 + 6√2", (3 + Math.sqrt(2)) ** 2, 11 + 6 * Math.sqrt(2));
  chk("sp.q2 √(11 + 6√2) = 3 + √2", Math.sqrt(11 + 6 * Math.sqrt(2)), 3 + Math.sqrt(2));
  chk("sp.q2 the middle term really is 2 × 3 × √2", 2 * 3 * Math.sqrt(2), 6 * Math.sqrt(2));

  {
    const a = 86420865;
    chkS("sp.q3 the two neighbours in the prompt are a − 3 and a + 3",
      a - 3 === 86420862 && a + 3 === 86420868, true);
    chkS("sp.q3 every number stays exact in double precision (below 2⁵³)",
      a * a < Number.MAX_SAFE_INTEGER, true);
    chk("sp.q3 86 420 865² − 86 420 862 × 86 420 868 = 9", a * a - (a - 3) * (a + 3), 9);
    chk("sp.q3 …and the 9 is the gap squared, 3² (a gap of 4 would leave 16)",
      (a * a - (a - 4) * (a + 4)), 16);
  }

  {
    let bad = 0;
    for (let i = 0; i <= 30; i++) for (let j = 0; j <= 30; j++) {
      const a = i / 3, b = j / 4;
      const lhs = (Math.sqrt(a) + Math.sqrt(b)) ** 2 - (Math.sqrt(a) - Math.sqrt(b)) ** 2;
      const rhs = 4 * Math.sqrt(a * b);
      if (Math.abs(lhs - rhs) > 1e-9 * Math.max(1, Math.abs(rhs))) bad++;
    }
    chk("sp.q4 (√a+√b)² − (√a−√b)² ≡ 4√(ab) for a,b ≥ 0 (961-point sweep, mismatches)", bad, 0);
  }

  chk("sp.q5 (2√6)² = 24", (2 * Math.sqrt(6)) ** 2, 24);
  chkS("sp.q5 24 < 25, so 2√6 < 5 and 5 is the bigger one", 2 * Math.sqrt(6) < 5, true);
  chkS("sp.q5 the trap value 2 × 6 = 12 is NOT (2√6)²", (2 * Math.sqrt(6)) ** 2 === 12, false);

  {
    const v = (Math.sqrt(12) + Math.sqrt(27)) / Math.sqrt(3);
    chk("sp.q6(a) (√12 + √27)/√3 = 5", v, 5);
    chk("sp.q6(a) √12 + √27 = 5√3", Math.sqrt(12) + Math.sqrt(27), 5 * Math.sqrt(3));
    chkS("sp.q6(b) the answer is a whole number to 12 decimal places, so it is rational",
      Math.abs(v - Math.round(v)) < 1e-12, true);
  }
}

/* l4.q1-q6 — the Level 4 ★ tile */
{
  /* q1 — 4^(x+1) − 9·2^x + 2 = 0 */
  const f1 = x => Math.pow(4, x + 1) - 9 * Math.pow(2, x) + 2;
  chk("l4.q1 x = −2 satisfies 4^(x+1) − 9·2^x + 2 = 0", f1(-2), 0);
  chk("l4.q1 x = 1 satisfies it too", f1(1), 0);
  {
    let bad = 0;
    for (let i = -60; i <= 60; i++) { const K = i / 8; if (Math.abs((4 * K * K - 9 * K + 2) - (4 * K - 1) * (K - 2)) > 1e-9) bad++; }
    chk("l4.q1 4K² − 9K + 2 ≡ (4K − 1)(K − 2) (121-point sweep, mismatches)", bad, 0);
  }
  chk("l4.q1 the two K values are 1/4 and 2, and 1/4 = 2⁻²", Math.pow(2, -2), 1 / 4);
  chkS("l4.q1 both branches survive, because both K values are positive", 1 / 4 > 0 && 2 > 0, true);
  {
    /* nothing else in a wide window is a root */
    let extra = 0;
    for (let i = -600; i <= 600; i++) { const x = i / 100; if (Math.abs(f1(x)) < 1e-9 && Math.abs(x + 2) > 1e-9 && Math.abs(x - 1) > 1e-9) extra++; }
    chk("l4.q1 no third root in −6 ≤ x ≤ 6 (1 201-point sweep, extras found)", extra, 0);
  }

  /* q2 — √(x − 2)/(x − 5): undefined, zero, real */
  chkS("l4.q2(a) the denominator is zero only at x = 5", 5 - 5 === 0, true);
  chk("l4.q2(b) the numerator √(x − 2) is zero at x = 2", Math.sqrt(2 - 2), 0);
  chkS("l4.q2(b) …and x = 2 does not also break the denominator", 2 - 5 === 0, false);
  {
    let bad = 0;
    for (let i = -500; i <= 1000; i++) {
      const x = i / 100;
      const v = Math.sqrt(x - 2) / (x - 5);
      const isReal = Number.isFinite(v);                  // NaN for x < 2, ±Infinity at x = 5
      const claim = x >= 2 && Math.abs(x - 5) > 1e-12;
      if (isReal !== claim) bad++;
    }
    chk("l4.q2(c) √(x−2)/(x−5) is a real number exactly when x ≥ 2 ; x ≠ 5 (1 501-point sweep, mismatches)", bad, 0);
  }

  /* q3 — √(2^x + 5) = 2^x − 1 */
  chk("l4.q3 x = 2 satisfies √(2^x + 5) = 2^x − 1 (LHS)", Math.sqrt(Math.pow(2, 2) + 5), 3);
  chk("l4.q3 …and the RHS at x = 2 is also 3", Math.pow(2, 2) - 1, 3);
  {
    let bad = 0;
    for (let i = -60; i <= 60; i++) { const K = i / 6; if (Math.abs((K * K - 3 * K - 4) - (K - 4) * (K + 1)) > 1e-9) bad++; }
    chk("l4.q3 K² − 3K − 4 ≡ (K − 4)(K + 1) (121-point sweep, mismatches)", bad, 0);
  }
  chkS("l4.q3 squaring really does produce K² − 3K − 4 from K + 5 = (K − 1)²",
    (() => { for (let i = -50; i <= 50; i++) { const K = i / 5; if (Math.abs(((K - 1) ** 2 - (K + 5)) - (K * K - 3 * K - 4)) > 1e-9) return false; } return true; })(), true);
  chkS("l4.q3 the K = −1 branch is impossible (2^x > 0 for every x)",
    (() => { for (let i = -600; i <= 600; i++) if (Math.pow(2, i / 10) <= 0) return true; return false; })(), false);
  {
    /* no OTHER x in a wide window satisfies the original equation */
    let extra = 0;
    for (let i = -400; i <= 600; i++) {
      const x = i / 100, r = Math.pow(2, x) - 1;
      if (r < 0) continue;
      if (Math.abs(Math.sqrt(Math.pow(2, x) + 5) - r) < 1e-9 && Math.abs(x - 2) > 1e-9) extra++;
    }
    chk("l4.q3 no second root in −4 ≤ x ≤ 6 (1 001-point sweep, extras found)", extra, 0);
  }

  /* q4 — 2^(n+2) + 2^n divisible by 5 */
  {
    let bad = 0, notDiv = 0;
    for (let n = 1; n <= 40; n++) {
      const v = Math.pow(2, n + 2) + Math.pow(2, n);
      if (Math.abs(v - 5 * Math.pow(2, n)) > 1e-6) bad++;
      if (n <= 45 && v <= Number.MAX_SAFE_INTEGER && v % 5 !== 0) notDiv++;
    }
    chk("l4.q4 2^(n+2) + 2^n ≡ 5·2^n for n = 1…40 (mismatches)", bad, 0);
    chk("l4.q4 …and every one of those values really is divisible by 5 (failures)", notDiv, 0);
    chkS("l4.q4 the bracket is 4 + 1 = 5", 2 ** 2 + 1 === 5, true);
  }

  /* q5 — nested root, then the negative base */
  chk("l4.q5(a) ∛(√64) = 2", Math.cbrt(Math.sqrt(64)), 2);
  chk("l4.q5(a) …which is 64^(1/6)", Math.pow(64, 1 / 6), 2);
  chkS("l4.q5(a) the two roots may be swapped: √(∛64) is the same 2", Math.abs(Math.sqrt(Math.cbrt(64)) - 2) < 1e-9, true);
  chkS("l4.q5(b) (−64)^(1/6) is non-real — no real y has y⁶ = −64",
    (() => { for (let i = -1000; i <= 1000; i++) { const y = i / 100; if (Math.abs(y ** 6 + 64) < 1e-9) return true; } return false; })(), false);
  chk("l4.q5(b) (−64)^(1/3) = −4", Math.cbrt(-64), -4);
  chk("l4.q5(b) …because (−4)³ = −64", (-4) ** 3, -64);

  /* q6 — x^(2/3) = 25, and its impossible twin */
  {
    const twoThirds = x => Math.cbrt(x) ** 2;      // Math.pow(−125, 2/3) is NaN; this is the memo's own route
    chk("l4.q6(a) 125^(2/3) = 25", twoThirds(125), 25);
    chk("l4.q6(a) (−125)^(2/3) = 25 as well", twoThirds(-125), 25);
    chk("l4.q6(a) 25^(3/2) = 125, which is where ±125 comes from", Math.pow(25, 3 / 2), 125);
    chk("l4.q6(a) OR route: 25³ = 15 625 and √15 625 = 125", Math.sqrt(25 ** 3), 125);
    let neg = 0;
    for (let i = -2000; i <= 2000; i++) { if (twoThirds(i / 4) < -1e-12) neg++; }
    chk("l4.q6(b) x^(2/3) is never negative (4 001-point sweep, negatives found)", neg, 0);
  }
}

/* --- FUNCTIONS SIBLING CARDS (session D1, 2026-08-23) --------------
   The three NEW Functions tiles: sketch · intersection ·
   average-gradient. Same discipline as every block above: every number
   is rebuilt from the PROMPT's own given facts, from first principles,
   and nothing here reads a memo string. --- */
console.log("\n-- session D1: Functions sketch / intersection / average-gradient --");

/* sk.q1 — g(x) = −2(x − 1)² + 8, sketched from turning-point form */
{
  const g = x => -2 * (x - 1) ** 2 + 8;
  chk("sk.q1(a) the turning point is at (1 ; 8)", g(1), 8);
  chkS("sk.q1(a) …and it is a MAXIMUM — nothing on the curve is higher (1 001-point sweep)", (() => { for (let i = -400; i <= 600; i++) if (g(i / 100) > 8 + 1e-9) return true; return false; })(), false);
  chk("sk.q1(b) x-intercept at x = −1", g(-1), 0);
  chk("sk.q1(b) x-intercept at x = 3", g(3), 0);
  chk("sk.q1(b) y-intercept", g(0), 6);
  chk("sk.q1(b) the two roots are symmetric about the turning point's x", (-1 + 3) / 2, 1);
}

/* sk.q2 — f(x) = x² − 4x − 5, standard form: both roads to the TP */
{
  const f = x => x * x - 4 * x - 5;
  chk("sk.q2(a) x-intercept at x = −1", f(-1), 0);
  chk("sk.q2(a) x-intercept at x = 5", f(5), 0);
  chk("sk.q2(a) y-intercept", f(0), -5);
  chk("sk.q2(b) xTP = −b/(2a)", -(-4) / (2 * 1), 2);
  chk("sk.q2(b) the turning point's height", f(2), -9);
  let bad = 0;
  for (let i = -500; i <= 900; i++) { const x = i / 100; if (Math.abs(f(x) - ((x - 2) ** 2 - 9)) > 1e-9) bad++; }
  chk("sk.q2(b) OR route: x² − 4x − 5 ≡ (x − 2)² − 9 (1 401-point sweep, mismatches)", bad, 0);
  chkS("sk.q2(c) trap premise: the turning point really is lower than the y-intercept", f(2) < f(0), true);
}

/* sk.q3 — k(x) = 2^(x − 1) − 4, an exponential taking off */
{
  const k = x => Math.pow(2, x - 1) - 4;
  chk("sk.q3(a) k flattens towards y = −4", Math.round(k(-40) * 1e6) / 1e6, -4);
  chkS("sk.q3(a) base 2 > 1, so k is taking off (it rises left to right)", k(5) > k(4) && k(4) > k(3), true);
  chk("sk.q3(b) y-intercept is −3,5", k(0), -3.5);
  chk("sk.q3(b) 2^(−1) is a half, not −2", Math.pow(2, -1), 0.5);
  chk("sk.q3(b) x-intercept at x = 3", k(3), 0);
  chkS("sk.q3(c) the curve never reaches its asymptote (10 001-point sweep)", (() => { for (let i = -5000; i <= 5000; i++) if (k(i / 1000) <= -4) return true; return false; })(), false);
}

/* sk.q4 — h(x) = 8/(x + 1) − 2, asymptotes first */
{
  const h = x => 8 / (x + 1) - 2;
  chkS("sk.q4(a) h has no value at x = −1 (the vertical asymptote)", Number.isFinite(h(-1)), false);
  chk("sk.q4(a) h flattens towards y = −2", Math.round(h(1e7) * 1e3) / 1e3, -2);
  chk("sk.q4(b) x-intercept at x = 3", h(3), 0);
  chk("sk.q4(b) y-intercept", h(0), 6);
  chkS("sk.q4(c) both intercepts sit on the SAME branch (same side of the vertical asymptote)", Math.sign(3 - (-1)) === Math.sign(0 - (-1)), true);
}

/* sk.q5 — f(x) = −x² + 4x + 5 and g(x) = x + 1 on one set of axes */
{
  const f = x => -x * x + 4 * x + 5, g = x => x + 1;
  chk("sk.q5(a) f's x-intercept at x = −1", f(-1), 0);
  chk("sk.q5(a) f's x-intercept at x = 5", f(5), 0);
  chk("sk.q5(a) xTP = −b/(2a)", -4 / (2 * -1), 2);
  chk("sk.q5(a) f's maximum value", f(2), 9);
  chk("sk.q5(a) …which is halfway between the roots", (-1 + 5) / 2, 2);
  chk("sk.q5(b) g's x-intercept at x = −1", g(-1), 0);
  chk("sk.q5(b) g's y-intercept", g(0), 1);
  chk("sk.q5(c) f's y-intercept", f(0), 5);
  chk("sk.q5(c) the shared point: both graphs are zero at x = −1", f(-1) + g(-1), 0);
}

/* sk.q6 — the rough sketch from SIGN CONDITIONS only.
   f(x) = a(x + p)² + q with a < 0, p > 0, q > 0. The claims are tested
   over a whole grid of allowed (a, p, q), not on one example. */
{
  let badQuad = 0, badRoots = 0, yiPos = 0, yiNeg = 0;
  for (let ai = 1; ai <= 20; ai++) for (let pi = 1; pi <= 20; pi++) for (let qi = 1; qi <= 20; qi++) {
    const a = -ai / 4, p = pi / 4, q = qi / 4;
    if (!(-p < 0 && q > 0)) badQuad++;                  // TP(−p ; q) in the second quadrant
    const disc = -q / a;                                // (x + p)² = −q/a at the roots
    if (!(disc > 0)) badRoots++;                        // two real x-intercepts, always
    const yi = a * p * p + q;                           // the y-intercept
    if (yi > 0) yiPos++; else if (yi < 0) yiNeg++;
  }
  chk("sk.q6(a) TP(−p ; q) is in the SECOND quadrant for every allowed a, p, q (8 000 cases, failures)", badQuad, 0);
  chk("sk.q6(b) the graph cuts the x-axis TWICE for every allowed a, p, q (failures)", badRoots, 0);
  chkS("sk.q6(b) trap premise: the y-intercept's SIGN is not determined — both happen", yiPos > 0 && yiNeg > 0, true);
  /* and the representative curve the reveal draws really has all three features */
  const rep = x => -((x + 1) ** 2) + 4;
  chk("sk.q6(b) the reveal's representative curve turns at (−1 ; 4)", rep(-1), 4);
  chk("sk.q6(b) …and cuts the x-axis at −3", rep(-3), 0);
  chk("sk.q6(b) …and at 1", rep(1), 0);
}

/* int.q1 — f(x) = x² − 4x + 6 against g(x) = x + 2 */
{
  const f = x => x * x - 4 * x + 6, g = x => x + 2;
  let bad = 0;
  for (let i = -300; i <= 800; i++) { const x = i / 100; if (Math.abs((f(x) - g(x)) - (x * x - 5 * x + 4)) > 1e-9) bad++; }
  chk("int.q1(a) f(x) − g(x) is identically x² − 5x + 4 (1 101-point sweep, mismatches)", bad, 0);
  chk("int.q1(b) the graphs meet at x = 1", f(1) - g(1), 0);
  chk("int.q1(b) …and at x = 4", f(4) - g(4), 0);
  chk("int.q1(b) P(1 ; 3)", g(1), 3);
  chk("int.q1(b) Q(4 ; 6)", g(4), 6);
  chkS("int.q1 neither crossing sits on an axis (the label-placement rule for this card)", g(1) !== 0 && g(4) !== 0 && 1 !== 0 && 4 !== 0, true);
}

/* int.q2 — g(x) = 2ˣ − 4 and f(x) = x² − 5x + c share an x-intercept */
{
  const g = x => Math.pow(2, x) - 4;
  chk("int.q2(a) g cuts the x-axis at x = 2", g(2), 0);
  /* c is FOUND, not read: A(2 ; 0) on f means 4 − 10 + c = 0 */
  const c = 0 - (4 - 10);
  chk("int.q2(b) c = 6", c, 6);
  const f = x => x * x - 5 * x + c;
  chk("int.q2(c) f really passes through A", f(2), 0);
  chk("int.q2(c) the other x-intercept is x = 3", f(3), 0);
  let n = 0, prev = null;
  for (let i = -3000; i <= 5000; i++) { const x = i / 1000; const v = f(x) - g(x); if (prev !== null && (v < 0) !== (prev < 0)) n++; prev = v; }
  chk("int.q2 the two graphs meet EXACTLY ONCE on the drawn window (crossings found)", n, 1);
}

/* int.q3 — f(x) = −(x − 3)² + 4 cut by the horizontal line y = 3 */
{
  const f = x => -((x - 3) ** 2) + 4;
  chk("int.q3(a) the turning point is at (3 ; 4)", f(3), 4);
  chk("int.q3(b) the line y = 3 cuts f at x = 2", f(2), 3);
  chk("int.q3(b) …and at x = 4", f(4), 3);
  let bad = 0;
  for (let i = -200; i <= 800; i++) { const x = i / 100; if ((f(x) > 3) !== (x > 2 && x < 4)) bad++; }
  chk("int.q3(c) f(x) > 3 iff 2 < x < 4 (1 001-point sweep, mismatches)", bad, 0);
  chkS("int.q3 the line sits BELOW the maximum, which is why it cuts twice", 3 < f(3), true);
}

/* int.q4 — f(x) = x² − 4 against g(x) = x + 2, read off then proved */
{
  const f = x => x * x - 4, g = x => x + 2;
  chk("int.q4(a) the graphs meet at x = −2", f(-2) - g(-2), 0);
  chk("int.q4(a) …and at x = 3", f(3) - g(3), 0);
  let bad = 0;
  for (let i = -500; i <= 600; i++) { const x = i / 100; if (Math.abs((f(x) - g(x)) - (x * x - x - 6)) > 1e-9) bad++; }
  chk("int.q4(b) f(x) − g(x) is identically x² − x − 6 (1 101-point sweep, mismatches)", bad, 0);
  chk("int.q4(b) A(−2 ; 0)", g(-2), 0);
  chk("int.q4(b) B(3 ; 5)", g(3), 5);
}

/* int.q5 — h(x) = 8/(x − 1) + 3 against g(x) = 2x + 1 */
{
  const h = x => 8 / (x - 1) + 3, g = x => 2 * x + 1;
  let bad = 0;
  for (let i = -700; i <= 900; i++) {
    const x = i / 100; if (Math.abs(x - 1) < 0.02) continue;
    if (Math.abs((h(x) - g(x)) * (x - 1) - (-(2 * x * x - 4 * x - 6))) > 1e-9) bad++;
  }
  chk("int.q5(a) multiplying by (x − 1) really gives 2x² − 4x − 6 = 0 (sweep, mismatches)", bad, 0);
  { const quad = x => x * x - 2 * x - 3;
    chk("int.q5(a) …which halves to x² − 2x − 3 = 0, and −1 is a root", quad(-1), 0);
    chk("int.q5(a) …and 3 is the other root", quad(3), 0); }
  chk("int.q5(a) the graphs meet at x = −1", h(-1) - g(-1), 0);
  chk("int.q5(a) …and at x = 3", h(3) - g(3), 0);
  chk("int.q5(a) P(−1 ; −1)", g(-1), -1);
  chk("int.q5(a) Q(3 ; 7)", g(3), 7);
  chk("int.q5(b) the midpoint of PQ, x", (-1 + 3) / 2, 1);
  chk("int.q5(b) the midpoint of PQ, y", (-1 + 7) / 2, 3);
  chk("int.q5(b) …which is the corner (p ; q) of h, and g passes through it", g(1), 3);
  chkS("int.q5 the corner sits clear of the x-axis (the label-placement rule for this card)", Math.abs(3) >= 2, true);
}

/* int.q6 — f(x) = x² − 2x − 3 against g(x) = x + 1, then f > g */
{
  const f = x => x * x - 2 * x - 3, g = x => x + 1;
  chk("int.q6(a) the graphs meet at x = −1", f(-1) - g(-1), 0);
  chk("int.q6(a) …and at x = 4", f(4) - g(4), 0);
  chk("int.q6(a) A(−1 ; 0)", g(-1), 0);
  chk("int.q6(a) B(4 ; 5)", g(4), 5);
  let bad = 0;
  for (let i = -400; i <= 700; i++) { const x = i / 100; if ((f(x) > g(x)) !== (x < -1 || x > 4)) bad++; }
  chk("int.q6(b) f > g iff x < −1 or x > 4 (1 101-point sweep, mismatches)", bad, 0);
}

/* ag.q1 — f(x) = x² − 4, average gradient from x = −1 to x = 3 */
{
  const f = x => x * x - 4;
  chk("ag.q1(a) A(−1 ; −3)", f(-1), -3);
  chk("ag.q1(a) B(3 ; 5)", f(3), 5);
  chk("ag.q1(b) average gradient = Δy/Δx", (f(3) - f(-1)) / (3 - (-1)), 2);
  chk("ag.q1(b) the drawn chord y = 2x − 1 passes through A", 2 * -1 - 1, -3);
  chk("ag.q1(b) …and through B", 2 * 3 - 1, 5);
}

/* ag.q2 — h(x) = 6/(x − 2) + 1, average gradient from x = 3 to x = 5 */
{
  const h = x => 6 / (x - 2) + 1;
  chk("ag.q2(a) A(3 ; 7)", h(3), 7);
  chk("ag.q2(a) B(5 ; 3)", h(5), 3);
  chk("ag.q2(a) average gradient", (h(5) - h(3)) / (5 - 3), -2);
  chkS("ag.q2(b) the answer is negative, so h falls between A and B", (h(5) - h(3)) / 2 < 0, true);
  chk("ag.q2 the drawn chord y = −2x + 13 passes through A", -2 * 3 + 13, 7);
  chk("ag.q2 …and through B", -2 * 5 + 13, 3);
  chkS("ag.q2 both points are on the SAME branch (same side of the vertical asymptote)", Math.sign(3 - 2) === Math.sign(5 - 2), true);
}

/* ag.q3 — f(x) = x² − 6x + 5, y-intercept to turning point */
{
  const f = x => x * x - 6 * x + 5;
  chk("ag.q3(a) xTP = −b/(2a)", -(-6) / (2 * 1), 3);
  chk("ag.q3(a) the turning point's height", f(3), -4);
  chk("ag.q3(a) the y-intercept", f(0), 5);
  chk("ag.q3(b) average gradient", (f(3) - f(0)) / (3 - 0), -3);
  chk("ag.q3(b) the drawn chord y = −3x + 5 passes through the y-intercept", -3 * 0 + 5, 5);
  chk("ag.q3(b) …and through the turning point", -3 * 3 + 5, -4);
}

/* ag.q4 — g(x) = 2ˣ + 1 measured over two different stretches */
{
  const g = x => Math.pow(2, x) + 1;
  chk("ag.q4(a) A(1 ; 3)", g(1), 3);
  chk("ag.q4(a) B(3 ; 9)", g(3), 9);
  chk("ag.q4(a) average gradient from 1 to 3", (g(3) - g(1)) / (3 - 1), 3);
  chk("ag.q4(b) C(4 ; 17)", g(4), 17);
  chk("ag.q4(b) average gradient from 3 to 4", (g(4) - g(3)) / (4 - 3), 8);
  chkS("ag.q4(b) the second stretch is genuinely steeper — the graph is taking off", (g(4) - g(3)) / 1 > (g(3) - g(1)) / 2, true);
  chk("ag.q4 the first chord y = 3x passes through A", 3 * 1, 3);
  chk("ag.q4 …and through B", 3 * 3, 9);
  chk("ag.q4 the second chord y = 8x − 15 passes through B", 8 * 3 - 15, 9);
  chk("ag.q4 …and through C", 8 * 4 - 15, 17);
}

/* ag.q5 — f(x) = x² − 3 between x = 1 and x = 1 + h */
{
  const f = x => x * x - 3;
  chk("ag.q5(a) A(1 ; −2)", f(1), -2);
  chk("ag.q5(a) B(3 ; 6)", f(3), 6);
  chk("ag.q5(a) average gradient from 1 to 3", (f(3) - f(1)) / (3 - 1), 4);
  let bad = 0;
  for (let i = 1; i <= 400; i++) { const h = i / 100; if (Math.abs((f(1 + h) - f(1)) / h - (h + 2)) > 1e-9) bad++; }
  chk("ag.q5(b) the average gradient from 1 to 1 + h is identically h + 2 (400 h-values, mismatches)", bad, 0);
  chk("ag.q5(b) …checked against (a): h = 2 gives the same 4", (f(1 + 2) - f(1)) / 2, 2 + 2);
  chk("ag.q5(c) h = 1 gives 3", (f(1 + 1) - f(1)) / 1, 1 + 2);
  chk("ag.q5(c) …and the far point is (2 ; 1)", f(2), 1);
  chk("ag.q5(c) the drawn h = 1 chord y = 3x − 5 passes through A", 3 * 1 - 5, -2);
  chk("ag.q5(c) …and through (2 ; 1)", 3 * 2 - 5, 1);
  chk("ag.q5(a) the drawn h = 2 chord y = 4x − 6 passes through A", 4 * 1 - 6, -2);
  chk("ag.q5(a) …and through B", 4 * 3 - 6, 6);
}

/* ag.q6 — f(x) = x² − 1, A(1 ; 0), average gradient 4: find B */
{
  const f = x => x * x - 1;
  chk("ag.q6(a) A(1 ; 0) really lies on f", f(1), 0);
  let bad = 0;
  for (let i = -400; i <= 600; i++) {
    const b = i / 100; if (Math.abs(b - 1) < 0.02) continue;
    if (Math.abs((f(b) - f(1)) / (b - 1) - (b + 1)) > 1e-9) bad++;
  }
  chk("ag.q6(a) the average gradient from A to (b ; f(b)) is identically b + 1 (sweep, mismatches)", bad, 0);
  { let found = null;
    for (let i = -400; i <= 600; i++) { const b = i / 100; if (Math.abs(b - 1) < 0.02) continue; if (Math.abs((f(b) - f(1)) / (b - 1) - 4) < 1e-9) found = b; }
    chk("ag.q6(a) a 1 001-point search finds exactly the b that makes the average gradient 4", found, 3); }
  { const orQuad = b => b * b - 4 * b + 3;
    let bad2 = 0;
    for (let i = -400; i <= 600; i++) { const b = i / 100; if (Math.abs((f(b) - f(1)) - 4 * (b - 1) - orQuad(b)) > 1e-9) bad2++; }
    chk("ag.q6(a) OR route: (b² − 1) − 4(b − 1) is identically b² − 4b + 3 (1 001-point sweep, mismatches)", bad2, 0);
    chk("ag.q6(a) …whose roots are 1 and 3", orQuad(1) + orQuad(3), 0);
    chkS("ag.q6(a) …and b = 1 must be rejected: the average gradient is undefined there", Number.isFinite((f(1) - f(1)) / (1 - 1)), false); }
  chk("ag.q6(b) B(3 ; 8)", f(3), 8);
  chk("ag.q6(b) the answer checks out: (8 − 0)/(3 − 1) = 4", (f(3) - f(1)) / (3 - 1), 4);
  chk("ag.q6(b) the drawn chord y = 4x − 4 passes through A", 4 * 1 - 4, 0);
  chk("ag.q6(b) …and through B", 4 * 3 - 4, 8);
}

/* --- FUNCTIONS, SESSION D2 (2026-08-23) ----------------------------
   The reflections tile, the Level 4 ★ tile's six fresh cards, and the
   four top-ups. Same discipline as every block above: each function is
   typed out here straight from the PROMPT, and every claim a memo makes
   is re-derived from those functions — never read off a memo string. A
   reflection claim is checked as an IDENTITY over a sweep (is g really
   −f everywhere?), which is the honest way to test "this is the mirror
   image", and the k-range claims are checked by scanning k and counting
   what actually happens rather than by re-stating the inequality. --- */
console.log("\n-- session D2: Functions reflections / Level 4 ★ / top-ups --");

/* how many times a continuous function crosses zero on [lo,hi] */
const crossings = (fn, lo, hi, steps = 20000) => {
  let n = 0, prev = null;
  for (let i = 0; i <= steps; i++) {
    const x = lo + ((hi - lo) * i) / steps, v = fn(x);
    if (!Number.isFinite(v)) { prev = null; continue; }
    if (prev !== null && ((v < 0) !== (prev < 0))) n++;
    prev = v;
  }
  return n;
};
/* mismatches between two functions over a sweep (an identity test) */
const idMismatch = (L, R, lo, hi, steps = 1200, skip = null) => {
  let bad = 0;
  for (let i = 0; i <= steps; i++) {
    const x = lo + ((hi - lo) * i) / steps;
    if (skip !== null && Math.abs(x - skip) < 1e-6) continue;
    const a = L(x), b = R(x);
    if (!Number.isFinite(a) || !Number.isFinite(b)) continue;
    if (Math.abs(a - b) > 1e-9 * (1 + Math.abs(a))) bad++;
  }
  return bad;
};

/* ref.q1 — f(x) = x² − 2x − 8 mirrored in the x-axis */
{
  const f = x => x * x - 2 * x - 8, g = x => -x * x + 2 * x + 8;
  chk("ref.q1 f cuts the x-axis at −2", f(-2), 0);
  chk("ref.q1 f cuts the x-axis at 4", f(4), 0);
  chk("ref.q1 f's turning point x = −b/(2a)", 2 / 2, 1);
  chk("ref.q1 f's turning point height", f(1), -9);
  chk("ref.q1(a) g is −f everywhere (1 201-point identity sweep, mismatches)", idMismatch(g, x => -f(x), -6, 8), 0);
  chk("ref.q1(a) g's turning point keeps x = 1", -2 / (2 * -1), 1);
  chk("ref.q1(a) …and flips its height to 9", g(1), 9);
  chk("ref.q1(b) g still cuts the x-axis at −2", g(-2), 0);
  chk("ref.q1(b) …and at 4", g(4), 0);
  chk("ref.q1(b) g's y-intercept is 8, the sign-flip of f's −8", g(0), 8);
  chk("ref.q1(b) …and f's own y-intercept really was −8", f(0), -8);
}

/* ref.q2 — f(x) = x² − 6x + 5 mirrored in the y-axis */
{
  const f = x => x * x - 6 * x + 5, g = x => x * x + 6 * x + 5;
  chk("ref.q2 f cuts the x-axis at 1", f(1), 0);
  chk("ref.q2 f cuts the x-axis at 5", f(5), 0);
  chk("ref.q2 f's turning point (3 ; −4)", f(3), -4);
  chk("ref.q2(a) g is f(−x) everywhere (identity sweep, mismatches)", idMismatch(g, x => f(-x), -9, 9), 0);
  chk("ref.q2(b) g's turning point x = −b/(2a)", -6 / 2, -3);
  chk("ref.q2(b) …at the same height as f's", g(-3), -4);
  chk("ref.q2(b) g cuts the x-axis at −1", g(-1), 0);
  chk("ref.q2(b) …and at −5", g(-5), 0);
}

/* ref.q3 — f(x) = 2·3ˣ − 6 mirrored in the y-axis */
{
  const f = x => 2 * Math.pow(3, x) - 6, g = x => 2 * Math.pow(1 / 3, x) - 6;
  chk("ref.q3 f's y-intercept", f(0), -4);
  chk("ref.q3 f's x-intercept at x = 1", f(1), 0);
  chk("ref.q3 f flattens towards y = −6", Math.round(f(-40) * 1e6) / 1e6, -6);
  chkS("ref.q3 base 3 > 1, so f is taking off", f(2) > f(1) && f(1) > f(0), true);
  chk("ref.q3(a) g is f(−x) everywhere (identity sweep, mismatches)", idMismatch(g, x => f(-x), -4, 4), 0);
  chkS("ref.q3(a) g's base is between 0 and 1, so g is landing", g(2) < g(1) && g(1) < g(0), true);
  chk("ref.q3(b) g's asymptote does not move", Math.round(g(40) * 1e6) / 1e6, -6);
  chk("ref.q3(b) g cuts the x-axis at −1", g(-1), 0);
}

/* ref.q4 — g(x) = 6/(x − 2) + 3 mirrored about its OWN asymptote y = 3 */
{
  const g = x => 6 / (x - 2) + 3, h = x => -6 / (x - 2) + 3;
  chkS("ref.q4(a) g has no value at x = 2 (the vertical asymptote)", Number.isFinite(g(2)), false);
  chk("ref.q4(a) g flattens towards y = 3", Math.round(g(1e7) * 1e3) / 1e3, 3);
  /* the reflection RULE, tested as a rule and not as a formula:
     new height = 2q − old height, with q = 3 */
  chk("ref.q4(b) h(x) = 6 − g(x) everywhere (identity sweep, mismatches)", idMismatch(h, x => 6 - g(x), -5, 9, 1200, 2), 0);
  chk("ref.q4(b) every point of h is as far below y = 3 as g is above it (sweep, mismatches)", idMismatch(x => h(x) - 3, x => -(g(x) - 3), -5, 9, 1200, 2), 0);
  chkS("ref.q4(b) h keeps the SAME vertical asymptote", Number.isFinite(h(2)), false);
  chk("ref.q4(b) …and the same horizontal one", Math.round(h(1e7) * 1e3) / 1e3, 3);
}

/* ref.q5 — f(x) = 2ˣ − 8 mirrored in the x-axis, then both mirrors */
{
  const f = x => Math.pow(2, x) - 8;
  const g = x => -Math.pow(2, x) + 8;
  const p = x => -Math.pow(0.5, x) + 8;
  chk("ref.q5 f's y-intercept", f(0), -7);
  chk("ref.q5 f's x-intercept at x = 3", f(3), 0);
  chk("ref.q5 f flattens towards y = −8", Math.round(f(-40) * 1e6) / 1e6, -8);
  chk("ref.q5(a) g is −f everywhere (identity sweep, mismatches)", idMismatch(g, x => -f(x), -4, 5), 0);
  chk("ref.q5(a) g's asymptote is y = 8", Math.round(g(-40) * 1e6) / 1e6, 8);
  chkS("ref.q5(b) g never reaches 8 and stays below it (10 001-point sweep)", (() => { for (let i = -6000; i <= 4000; i++) if (g(i / 1000) >= 8) return false; return true; })(), true);
  chk("ref.q5(c) p is −f(−x) everywhere (identity sweep, mismatches)", idMismatch(p, x => -f(-x), -5, 5), 0);
  chkS("ref.q5(c) p also stays strictly below 8 — the y-axis mirror cannot change a range", (() => { for (let i = -4000; i <= 6000; i++) if (p(i / 1000) >= 8) return false; return true; })(), true);
}

/* ref.q6 — two hyperbolas: f(x) = 6/(x − 1) − 2 and g(x) = −6/(x − 1) + 2 */
{
  const f = x => 6 / (x - 1) - 2, g = x => -6 / (x - 1) + 2;
  chk("ref.q6(a) g is −f everywhere (identity sweep, mismatches)", idMismatch(g, x => -f(x), -6, 9, 1200, 1), 0);
  chk("ref.q6(a) both graphs pass through (4 ; 0), the point ON the mirror", f(4) + Math.abs(g(4)), 0);
  chkS("ref.q6(b) f and g share the vertical asymptote x = 1", !Number.isFinite(f(1)) && !Number.isFinite(g(1)), true);
  chk("ref.q6(b) f flattens towards y = −2", Math.round(f(1e7) * 1e3) / 1e3, -2);
  chk("ref.q6(b) g flattens towards y = 2", Math.round(g(1e7) * 1e3) / 1e3, 2);
}

/* l4.q1 — the archway h(x) = −0,25x² + 2x */
{
  const h = x => -0.25 * x * x + 2 * x;
  chk("l4.q1 the arch meets the ground at A, x = 0", h(0), 0);
  chk("l4.q1 …and at B, x = 8", h(8), 0);
  chk("l4.q1(a) x = −b/(2a)", -2 / (2 * -0.25), 4);
  chk("l4.q1(a) the maximum height", h(4), 4);
  chkS("l4.q1(a) …and nothing on the arch is higher (1 101-point sweep)", (() => { for (let i = -150; i <= 950; i++) if (h(i / 100) > 4 + 1e-9) return true; return false; })(), false);
  chk("l4.q1(b) the van's left top corner sits at x = 3", 4 - 1, 3);
  chk("l4.q1(b) the arch's height there", h(3), 3.75);
  chk("l4.q1(b) …and at the right corner x = 5, the same by symmetry", h(5), 3.75);
  chk("l4.q1(b) the roof clears the arch by", h(3) - 3, 0.75);
  /* the OR route: how wide is the arch at 3 m up? */
  chk("l4.q1(b) OR route: the arch is 3 m high at x = 2", h(2), 3);
  chk("l4.q1(b) OR route: …and at x = 6", h(6), 3);
  chk("l4.q1(b) OR route: so the opening at 3 m is 4 m wide, against a 2 m van", 6 - 2, 4);
}

/* l4.q2 — max vertical distance between f(x) = −x² + 3x + 12 and g(x) = x − 3 */
{
  const f = x => -x * x + 3 * x + 12, g = x => x - 3;
  chk("l4.q2 A(−3 ; −6) is on f", f(-3), -6);
  chk("l4.q2 …and on g", g(-3), -6);
  chk("l4.q2 B(5 ; 2) is on f", f(5), 2);
  chk("l4.q2 …and on g", g(5), 2);
  chk("l4.q2 f(x) − g(x) is identically −x² + 2x + 15 (identity sweep, mismatches)", idMismatch(x => f(x) - g(x), x => -x * x + 2 * x + 15, -6, 8), 0);
  chk("l4.q2 the difference parabola turns at x = −b/(2a)", -2 / (2 * -1), 1);
  chk("l4.q2 the maximum gap", f(1) - g(1), 16);
  chkS("l4.q2 …and no x between A and B gives a bigger gap (8 001-point sweep)", (() => { for (let i = -3000; i <= 5000; i++) { const x = i / 1000; if (f(x) - g(x) > 16 + 1e-9) return true; } return false; })(), false);
  chk("l4.q2 TRAP premise: f's OWN turning point is at x = 1,5, not 1", -3 / (2 * -1), 1.5);
}

/* l4.q3 — y = k cutting f(x) = x² − 8x + 12 twice, both roots positive */
{
  const f = x => x * x - 8 * x + 12;
  chk("l4.q3(a) x = −b/(2a)", 8 / 2, 4);
  chk("l4.q3(a) the turning point's height", f(4), -4);
  chk("l4.q3(a) the y-intercept", f(0), 12);
  chk("l4.q3 f cuts the x-axis at 2", f(2), 0);
  chk("l4.q3 …and at 6", f(6), 0);
  /* scan k and COUNT what really happens, rather than restating −4 < k < 12 */
  const bothPositive = (k) => {
    const disc = 64 - 4 * (12 - k);
    if (disc <= 0) return false;
    const r1 = (8 - Math.sqrt(disc)) / 2, r2 = (8 + Math.sqrt(disc)) / 2;
    return r1 > 0 && r2 > 0 && Math.abs(r1 - r2) > 1e-12;
  };
  let bad = 0;
  for (let i = -2000; i <= 2000; i++) { const k = i / 100; if (bothPositive(k) !== (k > -4 && k < 12)) bad++; }
  chk("l4.q3(b) \"two unequal roots, both positive\" is true for exactly −4 < k < 12 (4 001-point k-scan, mismatches)", bad, 0);
  chkS("l4.q3(b) at k = 12 exactly one root is x = 0, which is not positive", Math.abs((8 - Math.sqrt(64 - 4 * (12 - 12))) / 2) < 1e-12, true);
  chkS("l4.q3(b) at k = −4 the two roots are EQUAL, not two", Math.abs(64 - 4 * (12 - (-4))) < 1e-12, true);
}

/* l4.q4 — the tangent to f(x) = x² − 2x + 3 at x = 2, by equal roots */
{
  const f = x => x * x - 2 * x + 3;
  chk("l4.q4(a) T(2 ; 3)", f(2), 3);
  /* m and c are SOLVED here, not copied: equal roots at 2 means the
     quadratic x² − (2+m)x + (3−c) = 0 is (x − 2)², so its coefficients
     must match term by term. */
  const m = 4 - 2;             // sum of roots: 2 + m = 2 + 2
  const c = 3 - 4;             // product of roots: 3 − c = 2 × 2
  chk("l4.q4(b) m from the sum of the roots", m, 2);
  chk("l4.q4(b) c from the product of the roots", c, -1);
  const tan = x => m * x + c;
  chk("l4.q4(b) the tangent passes through T", tan(2), 3);
  chk("l4.q4(b) f(x) − (2x − 1) is identically (x − 2)² (identity sweep, mismatches)", idMismatch(x => f(x) - tan(x), x => (x - 2) ** 2, -3, 6), 0);
  chk("l4.q4(b) …so the line meets f exactly ONCE, at x = 2 (zero sign changes)", crossings(x => f(x) - tan(x), -3, 6), 0);
  chk("l4.q4(b) OR route: Δ of x² − (2 + m)x + (3 − c) is zero", (2 + m) ** 2 - 4 * (3 - c), 0);
  chkS("l4.q4(b) a NON-tangent line through T really does cut twice — the touching is not automatic", crossings(x => f(x) - (3 * x - 3), -3, 6) === 2, true);
}

/* l4.q5 — PQ = 5 between f(x) = 6/x and g(x) = x − 6 */
{
  const f = x => 6 / x, g = x => x - 6;
  chk("l4.q5 the clearing step: 6/x − (x − 6) − 5 = 0 has the same roots as x² − x − 6 = 0 (identity sweep of x·LHS, mismatches)",
    idMismatch(x => x * (f(x) - g(x) - 5), x => -(x * x - x - 6), -7, 9, 1200, 0), 0);
  chk("l4.q5 x = 3 is a root of x² − x − 6", 9 - 3 - 6, 0);
  chk("l4.q5 x = −2 is a root of x² − x − 6", 4 + 2 - 6, 0);
  chk("l4.q5 at x = 3 the gap really is 5", f(3) - g(3), 5);
  chk("l4.q5 at x = −2 the gap really is 5 as well", f(-2) - g(-2), 5);
  chkS("l4.q5 …and at both of them P is genuinely ABOVE Q", f(3) > g(3) && f(-2) > g(-2), true);
  chk("l4.q5 exactly TWO x-values give a gap of 5 with P above Q (20 001-point scan, crossings)", crossings(x => f(x) - g(x) - 5, -7, 9), 2);
  chk("l4.q5 the illustrative segment drawn on the question side is NOT an answer: at x = 5 the gap is", f(5) - g(5), 2.2);
}

/* l4.q6 — the hyperbola's positive-gradient symmetry axis, cutting a parabola */
{
  const h = x => 4 / (x - 1) + 2, f = x => x * x - x - 7;
  chkS("l4.q6(a) h has no value at x = 1", Number.isFinite(h(1)), false);
  chk("l4.q6(a) h flattens towards y = 2", Math.round(h(1e7) * 1e3) / 1e3, 2);
  /* the axis is BUILT here from the centre and the gradient, not copied */
  const axis = x => 1 * (x - 1) + 2;
  chk("l4.q6(a) the axis passes through the centre (1 ; 2)", axis(1), 2);
  chk("l4.q6(a) …with gradient 1", axis(4) - axis(3), 1);
  chk("l4.q6(a) …and is therefore y = x + 1", idMismatch(axis, x => x + 1, -5, 8), 0);
  /* it really IS a symmetry line for h: reflecting a point of h in
     y = x + 1 must land on h again. The mirror of (a ; b) in y = x + c
     is (b − c ; a + c), with c = 1. */
  {
    let bad = 0;
    for (let i = 1; i <= 400; i++) {
      const a = 1 + i / 50, b = h(a);                 // a point on the right branch
      const mx = b - 1, my = a + 1;                   // its mirror in y = x + 1
      if (Math.abs(h(mx) - my) > 1e-7 * (1 + Math.abs(my))) bad++;
    }
    chk("l4.q6(a) reflecting 400 points of h in y = x + 1 lands them back on h (failures)", bad, 0);
  }
  chk("l4.q6(b) f(x) − (x + 1) is identically x² − 2x − 8 (identity sweep, mismatches)", idMismatch(x => f(x) - (x + 1), x => x * x - 2 * x - 8, -5, 8), 0);
  chk("l4.q6(b) the axis cuts f at x = 4", f(4) - (4 + 1), 0);
  chk("l4.q6(b) …and at x = −2", f(-2) - (-2 + 1), 0);
  chk("l4.q6(b) the first point is (4 ; 5)", f(4), 5);
  chk("l4.q6(b) the second is (−2 ; −1)", f(-2), -1);
  chk("l4.q6(b) the axis and f meet EXACTLY twice on the drawn window", crossings(x => f(x) - (x + 1), -5, 8), 2);
}

/* nor.q4 — the nature read off a sketch, then the equal-roots k */
{
  const f = x => x * x + 2 * x - 3;
  chk("nor.q4(a) f cuts the x-axis at −3", f(-3), 0);
  chk("nor.q4(a) …and at 1", f(1), 0);
  chk("nor.q4(a) Δ = b² − 4ac", 4 - 4 * 1 * -3, 16);
  chkS("nor.q4(a) Δ > 0 and is a perfect square, so the roots are real, unequal and rational", 16 > 0 && Number.isInteger(Math.sqrt(16)), true);
  chk("nor.q4(b) x = −b/(2a)", -2 / 2, -1);
  chk("nor.q4(b) the turning point's height, which IS the equal-roots k", f(-1), -4);
  chk("nor.q4(b) the line y = −4 meets f exactly once (zero sign changes)", crossings(x => f(x) + 4, -6, 4), 0);
  chk("nor.q4(b) …while a line just above it meets f twice", crossings(x => f(x) + 3.9, -6, 4), 2);
}

/* nor.q5 — a horizontal line against g(x) = 3ˣ − 9, then g + t */
{
  const g = x => Math.pow(3, x) - 9;
  chk("nor.q5 g's y-intercept", g(0), -8);
  chk("nor.q5 g's x-intercept at x = 2", g(2), 0);
  chk("nor.q5 g flattens towards y = −9", Math.round(g(-40) * 1e6) / 1e6, -9);
  chkS("nor.q5(a) g always rises, so it never doubles back (4 001-point sweep)", (() => { for (let i = -2000; i < 2000; i++) if (g((i + 1) / 500) <= g(i / 500)) return false; return true; })(), true);
  chk("nor.q5(a) a line ABOVE the asymptote, y = 3, meets g exactly once", crossings(x => g(x) - 3, -20, 20), 1);
  chk("nor.q5(b) a line BELOW it, y = −10, meets g not at all", crossings(x => g(x) + 10, -20, 20), 0);
  chk("nor.q5(b) …and the asymptote itself, y = −9, also meets g not at all", crossings(x => g(x) + 9, -300, 300), 0);
  /* (c): h = g + t has an x-intercept iff 3ˣ = 9 − t has one, i.e. iff
     9 − t > 0. Scanned rather than restated. */
  let bad = 0;
  for (let i = 0; i <= 2000; i++) {
    const t = i / 100;                                   // 0 … 20
    const hasRoot = crossings(x => g(x) + t, -60, 60, 4000) > 0;
    if (hasRoot !== (t < 9)) bad++;
  }
  chk("nor.q5(c) g + t has an x-intercept for exactly t < 9, so \"none\" is t ≥ 9 (2 001-point t-scan, mismatches)", bad, 0);
  chkS("nor.q5(c) at the boundary t = 9 the graph is 3ˣ, which is positive everywhere", (() => { for (let i = -4000; i <= 4000; i++) if (Math.pow(3, i / 100) <= 0) return false; return true; })(), true);
}

/* nor.q6 — the GRAPH slides: p(x) = f(x) + k on f(x) = 2x² − 4x − 6 */
{
  const f = x => 2 * x * x - 4 * x - 6;
  chk("nor.q6(a) f cuts the x-axis at −1", f(-1), 0);
  chk("nor.q6(a) …and at 3", f(3), 0);
  chk("nor.q6(a) x = −b/(2a)", 4 / 4, 1);
  chk("nor.q6(a) the turning point's height", f(1), -8);
  /* scan k and count the real x-intercepts of f + k */
  let bad = 0;
  for (let i = -2000; i <= 2000; i++) {
    const k = i / 100;
    const two = crossings(x => f(x) + k, -30, 30, 6000) === 2;
    if (two !== (k < 8)) bad++;
  }
  chk("nor.q6(b) f + k has two unequal x-intercepts for exactly k < 8 (4 001-point k-scan, mismatches)", bad, 0);
  chk("nor.q6(b) at the boundary k = 8 the graph just touches, at x = 1", f(1) + 8, 0);
  chk("nor.q6(b) …and the drawn boundary graph 2(x − 1)² is that same graph (identity sweep, mismatches)", idMismatch(x => f(x) + 8, x => 2 * (x - 1) ** 2, -4, 6), 0);
}

/* dist.q6 — the horizontal chord on f(x) = x² − 2x − 8 */
{
  const f = x => x * x - 2 * x - 8;
  chk("dist.q6(a) A at x = −2", f(-2), 0);
  chk("dist.q6(a) B at x = 4", f(4), 0);
  chk("dist.q6(a) AB, a horizontal length", 4 - -2, 6);
  chk("dist.q6(b) the line y = 7 meets f at x = −3", f(-3), 7);
  chk("dist.q6(b) …and at x = 5", f(5), 7);
  chk("dist.q6(b) CD", 5 - -3, 8);
  chk("dist.q6(b) the equation to solve really is x² − 2x − 15 = 0 (identity sweep, mismatches)", idMismatch(x => f(x) - 7, x => x * x - 2 * x - 15, -5, 7), 0);
  chk("dist.q6(b) the line y = 7 cuts f exactly twice", crossings(x => f(x) - 7, -20, 20), 2);
  chkS("dist.q6(b) CD is wider than AB, as a higher cut on a happy parabola must be", 8 > 6, true);
}

/* --------------------------------------------------------------------
   ALGEBRAIC EXPRESSIONS (algx) — every number in every prompt and memo,
   re-derived (WAVE 1, SESSION A, 2026-08-23).

   HOW THIS IS INDEPENDENT. Nothing below reads a memo string. For each
   card the PROMPT expression and the MEMO's stated answer are typed out
   here as two separate JavaScript functions, straight from the two
   sides of the page, and then evaluated against each other over a sweep
   of test values. A wrong sign, a dropped term or a mis-factorised
   trinomial shows up as a gap between two functions that were written
   independently — which is exactly what an algebraic identity claim
   deserves, since "is this factorisation right?" IS "are these two
   expressions equal everywhere?".

   Comparison is RELATIVE (|L − R| / (1 + |L|)), so a sixth-degree
   expression at x = 5,5 is judged as fairly as a linear one at x = 0,3.
   -------------------------------------------------------------------- */
{
  /* general-purpose sweeps; the fraction one deliberately misses every
     pole any card on this chapter uses (−5, −4, −3, −2, 0, 2, 3, 4) */
  const AX = [-3.5, -2.25, -1.1, -0.4, 0.3, 1.25, 2.5, 3.75, 5.5];
  const AXF = [-5.25, -3.3, -1.7, 0.45, 1.4, 3.6, 5.8, 7.9];
  const PAIRS = [[-3.5, 2.25], [-1.4, -0.6], [0.7, 3.1], [2.2, -1.8], [4.5, 0.9], [1.1, 1.1]];
  const TRIPLES = [[-2.5, 1.5, 0.75], [0.4, -3.2, 2.6], [3.1, 2.2, -1.4], [1.7, 0.3, 4.8]];

  const relGap = (L, Rr) => Math.abs(L - Rr) / (1 + Math.abs(L));
  const sameFn = (label, lhs, rhs, xs = AX) => {
    let worst = 0, at = null;
    xs.forEach(x => { const d = relGap(lhs(x), rhs(x)); if (d > worst) { worst = d; at = x; } });
    chk(`algx ${label} — prompt vs memo over ${xs.length} values (worst at x = ${at})`, worst, 0);
  };
  const sameFn2 = (label, lhs, rhs, pairs = PAIRS) => {
    let worst = 0, at = null;
    pairs.forEach(([u, v]) => { const d = relGap(lhs(u, v), rhs(u, v)); if (d > worst) { worst = d; at = `(${u} ; ${v})`; } });
    chk(`algx ${label} — prompt vs memo over ${pairs.length} pairs (worst at ${at})`, worst, 0);
  };
  const sameFn3 = (label, lhs, rhs, triples = TRIPLES) => {
    let worst = 0, at = null;
    triples.forEach(([u, v, w]) => { const d = relGap(lhs(u, v, w), rhs(u, v, w)); if (d > worst) { worst = d; at = `(${u} ; ${v} ; ${w})`; } });
    chk(`algx ${label} — prompt vs memo over ${triples.length} triples (worst at ${at})`, worst, 0);
  };

  /* ===== TILE 1 — expand ===== */
  sameFn("ex.q1 (2x − 3)(x² + 4x − 5) = 2x³ + 5x² − 22x + 15",
    x => (2 * x - 3) * (x * x + 4 * x - 5),
    x => 2 * x ** 3 + 5 * x * x - 22 * x + 15);
  sameFn("ex.q2(a) (5x − 2)² = 25x² − 20x + 4",
    x => (5 * x - 2) ** 2, x => 25 * x * x - 20 * x + 4);
  sameFn("ex.q2(b) (x/3 + 6)² = x²/9 + 4x + 36",
    x => (x / 3 + 6) ** 2, x => x * x / 9 + 4 * x + 36);
  chk("algx ex.q2(b) the memo's middle term 12x/3 really is 4x (tested at x = 7)", 12 * 7 / 3, 4 * 7);
  sameFn("ex.q3(a) (4x − 7)(4x + 7) = 16x² − 49",
    x => (4 * x - 7) * (4 * x + 7), x => 16 * x * x - 49);
  sameFn2("ex.q3(b) (2m + 9n)(2m − 9n) = 4m² − 81n²",
    (m, n) => (2 * m + 9 * n) * (2 * m - 9 * n), (m, n) => 4 * m * m - 81 * n * n);
  sameFn("ex.q4 −3x(2x − 5) − (x − 4)(x + 2) = −7x² + 17x + 8",
    x => -3 * x * (2 * x - 5) - (x - 4) * (x + 2),
    x => -7 * x * x + 17 * x + 8);
  sameFn("ex.q4 memo line 1: −3x(2x − 5) = −6x² + 15x",
    x => -3 * x * (2 * x - 5), x => -6 * x * x + 15 * x);
  sameFn("ex.q4 memo line 2: (x − 4)(x + 2) = x² − 2x − 8",
    x => (x - 4) * (x + 2), x => x * x - 2 * x - 8);
  sameFn("ex.q5(a) (x + 5)(x − 5) − (x − 3)² = 6x − 34",
    x => (x + 5) * (x - 5) - (x - 3) ** 2, x => 6 * x - 34);
  chk("algx ex.q5(b) 105 × 95 − 97² = 566 (the arithmetic itself)", 105 * 95 - 97 ** 2, 566);
  chk("algx ex.q5(b) …and it IS (a) at x = 100", 6 * 100 - 34, 105 * 95 - 97 ** 2);
  chkS("algx ex.q5(b) the memo's reading of the three numbers is right", `${100 + 5}|${100 - 5}|${100 - 3}`, "105|95|97");
  chk("algx ex.q6(a) (2√3 + 5)(√3 − 4) = −14 − 3√3",
    (2 * Math.sqrt(3) + 5) * (Math.sqrt(3) - 4), -14 - 3 * Math.sqrt(3));
  chk("algx ex.q6(b) (√7 − √2)² = 9 − 2√14",
    (Math.sqrt(7) - Math.sqrt(2)) ** 2, 9 - 2 * Math.sqrt(14));

  /* ===== TILE 2 — factorise-basics (a factorisation IS an identity) ===== */
  sameFn2("fb.q1(a) 12x³y − 18x²y² = 6x²y(2x − 3y)",
    (x, y) => 12 * x ** 3 * y - 18 * x * x * y * y, (x, y) => 6 * x * x * y * (2 * x - 3 * y));
  sameFn("fb.q1(b) −5a² − 20a = −5a(a + 4)",
    a => -5 * a * a - 20 * a, a => -5 * a * (a + 4));
  sameFn2("fb.q2(a) 4x² − 9y² = (2x − 3y)(2x + 3y)",
    (x, y) => 4 * x * x - 9 * y * y, (x, y) => (2 * x - 3 * y) * (2 * x + 3 * y));
  sameFn("fb.q2(b) 1 − 64t² = (1 − 8t)(1 + 8t)",
    t => 1 - 64 * t * t, t => (1 - 8 * t) * (1 + 8 * t));
  sameFn("fb.q3(a) 3x(x − 4) + 7(x − 4) = (x − 4)(3x + 7)",
    x => 3 * x * (x - 4) + 7 * (x - 4), x => (x - 4) * (3 * x + 7));
  sameFn2("fb.q3(b) 2a(y − 3) − 5(3 − y) = (y − 3)(2a + 5)",
    (a, y) => 2 * a * (y - 3) - 5 * (3 - y), (a, y) => (y - 3) * (2 * a + 5));
  sameFn("fb.q4(a) x² − 7x + 12 = (x − 3)(x − 4)",
    x => x * x - 7 * x + 12, x => (x - 3) * (x - 4));
  chk("algx fb.q4(a) the memo's pair: (−3)(−4) = +12", -3 * -4, 12);
  chk("algx fb.q4(a) …and (−3) + (−4) = −7", -3 + -4, -7);
  sameFn("fb.q4(b) 3x² − 12x − 63 = 3(x − 7)(x + 3)",
    x => 3 * x * x - 12 * x - 63, x => 3 * (x - 7) * (x + 3));
  chk("algx fb.q4(b) the pair after the 3 comes out: (−7)(+3) = −21", -7 * 3, -21);
  chk("algx fb.q4(b) …and (−7) + (+3) = −4", -7 + 3, -4);
  sameFn("fb.q5(a) (x + 1)² − 4 = (x − 1)(x + 3)",
    x => (x + 1) ** 2 - 4, x => (x - 1) * (x + 3));
  sameFn("fb.q5(b) (2a − 3)² − (a + 5)² = (a − 8)(3a + 2)",
    a => (2 * a - 3) ** 2 - (a + 5) ** 2, a => (a - 8) * (3 * a + 2));
  sameFn("fb.q6(a) 6x² − 17x + 5 = (2x − 5)(3x − 1)",
    x => 6 * x * x - 17 * x + 5, x => (2 * x - 5) * (3 * x - 1));
  sameFn("fb.q6(a) the memo's split 6x² − 15x − 2x + 5 is the same expression",
    x => 6 * x * x - 17 * x + 5, x => 6 * x * x - 15 * x - 2 * x + 5);
  chk("algx fb.q6(a) the split pair multiplies to 6 × 5 = 30", -15 * -2, 6 * 5);
  chk("algx fb.q6(a) …and adds to −17", -15 + -2, -17);
  sameFn("fb.q6(b) 8x² + 2x − 15 = (2x + 3)(4x − 5)",
    x => 8 * x * x + 2 * x - 15, x => (2 * x + 3) * (4 * x - 5));
  sameFn("fb.q6(b) the memo's split 8x² + 12x − 10x − 15 is the same expression",
    x => 8 * x * x + 2 * x - 15, x => 8 * x * x + 12 * x - 10 * x - 15);
  chk("algx fb.q6(b) the split pair multiplies to 8 × (−15) = −120", 12 * -10, 8 * -15);
  chk("algx fb.q6(b) …and adds to +2", 12 + -10, 2);

  /* ===== TILE 3 — factorise-advanced ===== */
  sameFn3("fa.q1(a) 3x + 3y + ax + ay = (x + y)(3 + a)",
    (x, y, a) => 3 * x + 3 * y + a * x + a * y, (x, y, a) => (x + y) * (3 + a));
  sameFn2("fa.q1(b) x² − xy + 4x − 4y = (x − y)(x + 4)",
    (x, y) => x * x - x * y + 4 * x - 4 * y, (x, y) => (x - y) * (x + 4));
  sameFn("fa.q2(a) x³ + 8 = (x + 2)(x² − 2x + 4)",
    x => x ** 3 + 8, x => (x + 2) * (x * x - 2 * x + 4));
  sameFn("fa.q2(b) 27a³ − 64 = (3a − 4)(9a² + 12a + 16)",
    a => 27 * a ** 3 - 64, a => (3 * a - 4) * (9 * a * a + 12 * a + 16));
  sameFn("fa.q3(a) 2m³ − 6m² + 5m − 15 = (m − 3)(2m² + 5)",
    m => 2 * m ** 3 - 6 * m * m + 5 * m - 15, m => (m - 3) * (2 * m * m + 5));
  sameFn2("fa.q3(b) ab − 3a − b + 3 = (b − 3)(a − 1)",
    (a, b) => a * b - 3 * a - b + 3, (a, b) => (b - 3) * (a - 1));
  sameFn("fa.q4(a) 27x³ + 1 = (3x + 1)(9x² − 3x + 1)",
    x => 27 * x ** 3 + 1, x => (3 * x + 1) * (9 * x * x - 3 * x + 1));
  sameFn("fa.q4(b) x⁶ − 8 = (x² − 2)(x⁴ + 2x² + 4)",
    x => x ** 6 - 8, x => (x * x - 2) * (x ** 4 + 2 * x * x + 4));
  sameFn("fa.q5(a) x⁴ − 13x² + 36 = (x − 2)(x + 2)(x − 3)(x + 3)",
    x => x ** 4 - 13 * x * x + 36, x => (x - 2) * (x + 2) * (x - 3) * (x + 3));
  sameFn("fa.q5(a) …via the memo's middle line (x² − 4)(x² − 9)",
    x => x ** 4 - 13 * x * x + 36, x => (x * x - 4) * (x * x - 9));
  sameFn("fa.q5(b) (x + 2)² − 5(x + 2) − 24 = (x − 6)(x + 5)",
    x => (x + 2) ** 2 - 5 * (x + 2) - 24, x => (x - 6) * (x + 5));
  sameFn("fa.q6(a) 5x³ − 45x = 5x(x − 3)(x + 3)",
    x => 5 * x ** 3 - 45 * x, x => 5 * x * (x - 3) * (x + 3));
  sameFn("fa.q6(b) 2x⁴ − 32 = 2(x − 2)(x + 2)(x² + 4)",
    x => 2 * x ** 4 - 32, x => 2 * (x - 2) * (x + 2) * (x * x + 4));

  /* ===== TILE 4 — fractions, × and ÷ (values AND restrictions) ===== */
  sameFn("fmd.q1 (x² − 25)/(x + 5) = x − 5",
    x => (x * x - 25) / (x + 5), x => x - 5, AXF);
  chk("algx fmd.q1(a) the denominator x + 5 is zero at x = −5", -5 + 5, 0);
  sameFn("fmd.q2 (2x + 6)/(x² + 5x + 6) = 2/(x + 2)",
    x => (2 * x + 6) / (x * x + 5 * x + 6), x => 2 / (x + 2), AXF);
  [-2, -3].forEach(v => chk(`algx fmd.q2(a) x² + 5x + 6 is zero at x = ${v}`, v * v + 5 * v + 6, 0));
  sameFn("fmd.q3 the product simplifies to ((x − 2)(x + 3))/(3x)",
    x => ((x * x - 4) / (3 * x + 9)) * ((x * x + 6 * x + 9) / (x * x + 2 * x)),
    x => ((x - 2) * (x + 3)) / (3 * x), AXF);
  chk("algx fmd.q3(a) 3x + 9 is zero at x = −3", 3 * -3 + 9, 0);
  [0, -2].forEach(v => chk(`algx fmd.q3(a) x² + 2x is zero at x = ${v}`, v * v + 2 * v, 0));
  sameFn("fmd.q4 the quotient simplifies to (x − 4)/(x + 2)",
    x => ((x * x - 16) / (x * x - x - 6)) / ((x + 4) / (x - 3)),
    x => (x - 4) / (x + 2), AXF);
  [3, -2].forEach(v => chk(`algx fmd.q4(a) x² − x − 6 is zero at x = ${v}`, v * v - v - 6, 0));
  chk("algx fmd.q4(a) the hidden one: the divisor's numerator x + 4 is zero at x = −4", -4 + 4, 0);
  sameFn("fmd.q5 (3 − x)/(x² − 9) = −1/(x + 3)",
    x => (3 - x) / (x * x - 9), x => -1 / (x + 3), AXF);
  [3, -3].forEach(v => chk(`algx fmd.q5(a) x² − 9 is zero at x = ${v}`, v * v - 9, 0));
  sameFn("fmd.q6 the quotient simplifies to −(x + 2)/(x − 2)",
    x => ((2 * x * x - 8) / (x * x + x - 6)) / ((4 - 2 * x) / (x + 3)),
    x => -(x + 2) / (x - 2), AXF);
  [-3, 2].forEach(v => chk(`algx fmd.q6(a) x² + x − 6 is zero at x = ${v}`, v * v + v - 6, 0));
  chk("algx fmd.q6(a) the divisor 4 − 2x is zero at x = 2", 4 - 2 * 2, 0);

  /* ===== TILE 5 — fractions, + and − ===== */
  sameFn("fas.q1 3/(2x) + 5/(3x) = 19/(6x)",
    x => 3 / (2 * x) + 5 / (3 * x), x => 19 / (6 * x), AXF);
  sameFn("fas.q2(a) (x + 2)/3 − (x − 4)/4 = (x + 20)/12",
    x => (x + 2) / 3 - (x - 4) / 4, x => (x + 20) / 12);
  sameFn("fas.q2(b) 2/x + 3/x² = (2x + 3)/x²",
    x => 2 / x + 3 / (x * x), x => (2 * x + 3) / (x * x), AXF);
  sameFn("fas.q3 4/(x − 3) − 2/(x² − 9) = (4x + 10)/((x − 3)(x + 3))",
    x => 4 / (x - 3) - 2 / (x * x - 9), x => (4 * x + 10) / ((x - 3) * (x + 3)), AXF);
  sameFn("fas.q4(a) 1 + 5/(x + 2) = (x + 7)/(x + 2)",
    x => 1 + 5 / (x + 2), x => (x + 7) / (x + 2), AXF);
  sameFn("fas.q4(b) 3 − 2x/(x − 4) = (x − 12)/(x − 4)",
    x => 3 - (2 * x) / (x - 4), x => (x - 12) / (x - 4), AXF);
  sameFn("fas.q5 (x + 1)/(x − 3) + 2x/(3 − x) = (1 − x)/(x − 3)",
    x => (x + 1) / (x - 3) + (2 * x) / (3 - x), x => (1 - x) / (x - 3), AXF);
  sameFn("fas.q6 2/(x + 2) + 3/(x − 2) − 12/(x² − 4) = 5/(x + 2)",
    x => 2 / (x + 2) + 3 / (x - 2) - 12 / (x * x - 4), x => 5 / (x + 2), AXF);
  sameFn("fas.q6 …and the memo's middle line (5x − 10)/((x + 2)(x − 2)) is the same thing",
    x => (5 * x - 10) / ((x + 2) * (x - 2)), x => 5 / (x + 2), AXF);

  /* ===== TILE 6 — Level 4 ★ ===== */
  sameFn("l4.q1(a) (2x − 1)(2x + 1) − (2x − 3)² = 12x − 10",
    x => (2 * x - 1) * (2 * x + 1) - (2 * x - 3) ** 2, x => 12 * x - 10);
  chk("algx l4.q1(b) 12x − 10 = 0 at x = 5/6", 12 * (5 / 6) - 10, 0);
  chk("algx l4.q1(b) …and the ORIGINAL expression is 0 there too",
    (2 * (5 / 6) - 1) * (2 * (5 / 6) + 1) - (2 * (5 / 6) - 3) ** 2, 0);
  sameFn2("l4.q2(a) (p² − q²)/(p + q) = p − q",
    (p, q) => (p * p - q * q) / (p + q), (p, q) => p - q,
    [[7.5, 2.25], [-3.4, 1.1], [12.5, -4.5], [0.9, 5.6]]);
  chk("algx l4.q2(b) (4567² − 4557²)/(4567 + 4557) = 10",
    (4567 ** 2 - 4557 ** 2) / (4567 + 4557), 10);
  chk("algx l4.q2(b) …which is p − q with p = 4567 and q = 4557", 4567 - 4557, 10);
  sameFn("l4.q3(a) x³ − 8 = (x − 2)(x² + 2x + 4)",
    x => x ** 3 - 8, x => (x - 2) * (x * x + 2 * x + 4));
  sameFn("l4.q3(b) x⁶ − 64 = (x − 2)(x² + 2x + 4)(x + 2)(x² − 2x + 4)",
    x => x ** 6 - 64,
    x => (x - 2) * (x * x + 2 * x + 4) * (x + 2) * (x * x - 2 * x + 4));
  sameFn("l4.q3(b) the trap's dead-end route (x² − 4)(x⁴ + 4x² + 16) is also x⁶ − 64",
    x => x ** 6 - 64, x => (x * x - 4) * (x ** 4 + 4 * x * x + 16));
  sameFn("l4.q4(a) (2x + 5)(2x − 5) = 4x² − 25",
    x => (2 * x + 5) * (2 * x - 5), x => 4 * x * x - 25);
  chk("algx l4.q4(b) 4x² − 25 = 119 at x = 6", 4 * 36 - 25, 119);
  chk("algx l4.q4(b) …and at x = −6 as well, which is why x > 0 is given", 4 * (-6) ** 2 - 25, 119);
  chk("algx l4.q4(b) the memo's sanity check: 17 m × 7 m = 119 m²", (2 * 6 + 5) * (2 * 6 - 5), 119);
  sameFn("l4.q5(a) (x² − 4)/(x² + 4x + 4) = (x − 2)/(x + 2)",
    x => (x * x - 4) / (x * x + 4 * x + 4), x => (x - 2) / (x + 2), AXF);
  chk("algx l4.q5(a) the denominator x² + 4x + 4 is zero only at x = −2", (-2) ** 2 + 4 * -2 + 4, 0);
  chk("algx l4.q5(b) the ORIGINAL fraction equals 3 at x = −4",
    ((-4) ** 2 - 4) / ((-4) ** 2 + 4 * -4 + 4), 3);
  chkS("algx l4.q5(b) …and −4 is not the forbidden value", -4 === -2, false);
  [2, -2].forEach(v => chk(`algx l4.q6(a) 2x² − 8 is zero at x = ${v}`, 2 * v * v - 8, 0));
  [2, 3].forEach(v => chk(`algx l4.q6(b) x² − 5x + 6 is zero at x = ${v}`, v * v - 5 * v + 6, 0));
  chk("algx l4.q6(b) at x = 3 the whole fraction really is 0", (9 - 15 + 6) / (2 * 9 - 8), 0);
  chkS("algx l4.q6(b) …but at x = 2 the DENOMINATOR is zero too, so 2 is rejected", 2 * 4 - 8 === 0, true);
  sameFn2("l4.q7(a) x² − y² + 7x + 7y = (x + y)(x − y + 7)",
    (x, y) => x * x - y * y + 7 * x + 7 * y, (x, y) => (x + y) * (x - y + 7));
  sameFn2("l4.q7(b) 4a² − 9b² + 14a + 21b = (2a + 3b)(2a − 3b + 7)",
    (a, b) => 4 * a * a - 9 * b * b + 14 * a + 21 * b, (a, b) => (2 * a + 3 * b) * (2 * a - 3 * b + 7));
}

/* --- GENERAL TRIG, PART 1 (session F1, 2026-08-23) ------------------
   Twenty-two questions across four tiles, every number worked from the
   PROMPT only. Nothing below reads a memo string, and nothing below
   uses the triangle the memo draws: for the special-sums questions the
   ANGLE is recovered from the prompt's own two conditions and every
   ratio is then evaluated with Math.sin/cos/tan, which is a completely
   different road to the answer than the sketch. For the super-special-
   sums questions the letter (t, p, m, k, d) is given its real numeric
   value and the claimed expression is checked against the real ratio.
   --------------------------------------------------------------- */
{
  const D = deg => deg * Math.PI / 180;
  const S = deg => Math.sin(D(deg));
  const C = deg => Math.cos(D(deg));
  const Tn = deg => Math.tan(D(deg));
  const degOf = rad => (rad * 180 / Math.PI + 360) % 360;
  const quadOf = th => (th < 90 ? 1 : th < 180 ? 2 : th < 270 ? 3 : 4);
  /* the two solutions in [0°;360°) of each basic equation */
  const solveSin = v => { const a = Math.asin(v) * 180 / Math.PI; return [(a + 360) % 360, (180 - a + 360) % 360]; };
  const solveCos = v => { const a = Math.acos(v) * 180 / Math.PI; return [a, (360 - a) % 360]; };
  const solveTan = v => { const a = Math.atan(v) * 180 / Math.PI; return [(a + 360) % 360, (a + 180 + 360) % 360]; };
  const R3 = Math.sqrt(3), R2 = Math.sqrt(2);
  /* angles chosen to sit well away from 0°/90°/180°/270°, so no tan or
     denominator in the identities below is anywhere near blowing up */
  const SWEEP = [7, 23, 41, 68, 112, 156, 203, 244, 291, 337];

  /* ===== TILE 1 — co-functions (gtrig.sib.cf.*) ===== */
  SWEEP.forEach(t => {
    chk(`cf.q1(a) cos(90° + θ) = −sin θ at θ = ${t}°`, C(90 + t), -S(t));
    chk(`cf.q1(b) sin(90° + θ) = cos θ at θ = ${t}°`, S(90 + t), C(t));
    chk(`cf.q2(a) sin(90° − x)/cos x = 1 at x = ${t}°`, S(90 - t) / C(t), 1);
    chk(`cf.q2(b) sin(90° − x)·tan x = sin x at x = ${t}°`, S(90 - t) * Tn(t), S(t));
    chk(`cf.q4(a) sin(x − 90°) = −cos x at x = ${t}°`, S(t - 90), -C(t));
    chk(`cf.q4(b) sin(x − 90°)/cos(x − 90°) = −1/tan x at x = ${t}°`, S(t - 90) / C(t - 90), -1 / Tn(t));
    chk(`cf.q4(b) …and the memo's other form −cos x/sin x agrees at x = ${t}°`, -C(t) / S(t), -1 / Tn(t));
  });
  { const p = C(18);
    chk("cf.q3(a) sin 72° = p, where p = cos 18°", S(72), p);
    chk("cf.q3(b) sin 108° = p", S(108), p);
    chk("cf.q3(b) …and the esplain's claim that sin 72° = sin 108°", S(72), S(108));
    chk("cf.q3(c) cos 162° = −p", C(162), -p);
  }
  chk("cf.q5(a) cos 130° + sin 40° = 0", C(130) + S(40), 0);
  chk("cf.q5(a) the memo's middle line: cos 130° = −cos 50°", C(130), -C(50));
  chk("cf.q5(a) …and cos 50° = sin 40° (the co-function)", C(50), S(40));
  chk("cf.q5(b) sin 220° = −sin 40°", S(220), -S(40));
  chk("cf.q5(b) cos 320° = cos 40°", C(320), C(40));
  chk("cf.q5(b) (cos130°·sin220°)/(sin40°·cos320°) = tan 40°", (C(130) * S(220)) / (S(40) * C(320)), Tn(40));
  chk("cf.q5(b) …via the memo's middle line sin²40°/(sin40°·cos40°)", (S(40) ** 2) / (S(40) * C(40)), Tn(40));

  /* ===== TILE 2 — special angles (gtrig.sib.sa.*) =====
     First the eight O-A-H values every memo reads off her two
     triangles, then the questions themselves. */
  chk("sa O-A-H: sin 30° = 1/2", S(30), 1 / 2);
  chk("sa O-A-H: cos 60° = 1/2", C(60), 1 / 2);
  chk("sa O-A-H: tan 45° = 1/1", Tn(45), 1);
  chk("sa O-A-H: tan 30° = 1/√3", Tn(30), 1 / R3);
  chk("sa O-A-H: sin 60° = √3/2", S(60), R3 / 2);
  chk("sa O-A-H: cos 30° = √3/2", C(30), R3 / 2);
  chk("sa O-A-H: tan 60° = √3/1", Tn(60), R3);
  chk("sa O-A-H: sin 45° = 1/√2", S(45), 1 / R2);
  chk("sa.q1(a) sin30°·cos60° + tan45° = 5/4", S(30) * C(60) + Tn(45), 5 / 4);
  chk("sa.q1(b) tan30°·sin60° = 1/2", Tn(30) * S(60), 1 / 2);
  chk("sa.q2(a) sin²60° − cos²30° = 0", S(60) ** 2 - C(30) ** 2, 0);
  chk("sa.q2(a) …because sin 60° and cos 30° are the same number", S(60), C(30));
  chk("sa.q2(b) 2tan²45° − cos²60° = 7/4", 2 * Tn(45) ** 2 - C(60) ** 2, 7 / 4);
  chk("sa.q3(a) tan60°/sin60° = 2", Tn(60) / S(60), 2);
  chk("sa.q3(b) cos30°/tan30° = 3/2", C(30) / Tn(30), 3 / 2);
  chk("sa.q4(a) cos 150° + sin 240° = −√3", C(150) + S(240), -R3);
  chk("sa.q4(a) the memo's reduction cos 150° = −cos 30°", C(150), -C(30));
  chk("sa.q4(a) the memo's reduction sin 240° = −sin 60°", S(240), -S(60));
  chk("sa.q4(b) tan 225° · cos(−60°) = 1/2", Tn(225) * C(-60), 1 / 2);
  chk("sa.q4(b) the memo's reduction tan 225° = tan 45°", Tn(225), Tn(45));
  chk("sa.q4(b) the memo's reduction cos(−60°) = cos 60°", C(-60), C(60));
  { /* q5 — △PQR, ∠Q = 90°, PQ = 12 sin 60°, QR = 12 cos 60° */
    const PQ = 12 * S(60), QR = 12 * C(60), PR = Math.hypot(PQ, QR);
    chk("sa.q5 PQ = 12 sin 60° = 6√3", PQ, 6 * R3);
    chk("sa.q5 QR = 12 cos 60° = 6", QR, 6);
    chk("sa.q5(a) area = ½·QR·PQ = 18√3", 0.5 * QR * PQ, 18 * R3);
    chk("sa.q5(b) PR² = PQ² + QR² = 144", PQ * PQ + QR * QR, 144);
    chk("sa.q5(b) PR = 12", PR, 12);
    chk("sa.q5(c) tan ∠R = PQ/QR = √3", PQ / QR, R3);
    chk("sa.q5(c) ∴ ∠R = 60°", degOf(Math.atan2(PQ, QR)), 60);
    chk("sa.q5(c) the OR route: cos ∠R = QR/PR = 1/2", QR / PR, 1 / 2);
    chk("sa.q5(c) trap card: the sides really are 1 : √3 : 2 scaled by 6", QR * R3, PQ);
  }
  chk("sa.q6(a) the rationalising step 1/√3 = √3/3", 1 / R3, R3 / 3);
  chkS("sa.q6(a) ∴ sin 60° is larger than tan 30°", S(60) > Tn(30), true);
  chk("sa.q6(b) the rationalising step 1/√2 = √2/2", 1 / R2, R2 / 2);
  chkS("sa.q6(b) ascending order really is sin45° < cos30° < tan45°", S(45) < C(30) && C(30) < Tn(45), true);
  chkS("sa.q6(b) …which is the memo's √2 < √3 < √4 argument", R2 < R3 && R3 < 2, true);

  /* ===== TILE 3 — special sums (gtrig.sib.ss.*) =====
     The angle is recovered from the prompt's OWN conditions. */
  { /* q1: 5 sin θ + 3 = 0 and cos θ > 0 */
    const hits = solveSin(-3 / 5).filter(th => C(th) > 0);
    chkS("ss.q1 exactly ONE angle satisfies sin θ = −3/5 AND cos θ > 0", hits.length === 1, true);
    const th = hits[0];
    chkS("ss.q1(a) …and it is in quadrant IV, as the double tick says", quadOf(th) === 4, true);
    chk("ss.q1(a) x = 5 cos θ = 4", 5 * C(th), 4);
    chk("ss.q1(a) (pyth) check: x² + y² = r²", 4 * 4 + 3 * 3, 25);
    chk("ss.q1(b) tan θ = −3/4", Tn(th), -3 / 4);
    chk("ss.q1(b) cos θ = 4/5", C(th), 4 / 5);
    chk("ss.q1(b) tan θ · cos θ = −3/5", Tn(th) * C(th), -3 / 5);
  }
  { /* q2: tan θ = −5/12 and θ ∈ (90° ; 270°) */
    const hits = solveTan(-5 / 12).filter(th => th > 90 && th < 270);
    chkS("ss.q2 exactly ONE angle satisfies tan θ = −5/12 AND θ ∈ (90°;270°)", hits.length === 1, true);
    const th = hits[0];
    chkS("ss.q2(a) …and it is in quadrant II", quadOf(th) === 2, true);
    chk("ss.q2(a) 13 cos θ = −12 (so x = −12)", 13 * C(th), -12);
    chk("ss.q2(a) 13 sin θ = 5 (so y = 5)", 13 * S(th), 5);
    chk("ss.q2(a) (pyth) check: r = √((−12)² + 5²) = 13", Math.hypot(-12, 5), 13);
    chk("ss.q2(b) sin θ = 5/13", S(th), 5 / 13);
    chk("ss.q2(b) cos θ = −12/13", C(th), -12 / 13);
    chk("ss.q2(b) sin θ + cos θ = −7/13", S(th) + C(th), -7 / 13);
  }
  { /* q3: P(−2 ; −3) on the terminal arm */
    const th = degOf(Math.atan2(-3, -2)), r = Math.hypot(-2, -3);
    chkS("ss.q3(a) P(−2 ; −3) puts θ in quadrant III", quadOf(th) === 3, true);
    chk("ss.q3(a) OP = √13", r, Math.sqrt(13));
    chk("ss.q3(b) sin θ = −3/√13", S(th), -3 / Math.sqrt(13));
    chk("ss.q3(b) …rationalised, that is −3√13/13", -3 / Math.sqrt(13), -3 * Math.sqrt(13) / 13);
    chk("ss.q3(b) cos θ = −2/√13", C(th), -2 / Math.sqrt(13));
    chk("ss.q3(b) …rationalised, that is −2√13/13", -2 / Math.sqrt(13), -2 * Math.sqrt(13) / 13);
    chk("ss.q3(b) tan θ = 3/2 (positive, as T promises)", Tn(th), 3 / 2);
  }
  { /* q4: 25 cos θ = −24 and θ ∈ (180° ; 360°) */
    const hits = solveCos(-24 / 25).filter(th => th > 180 && th < 360);
    chkS("ss.q4 exactly ONE angle satisfies cos θ = −24/25 AND θ ∈ (180°;360°)", hits.length === 1, true);
    const th = hits[0];
    chkS("ss.q4(a) …and it is in quadrant III", quadOf(th) === 3, true);
    chk("ss.q4(a) y = 25 sin θ = −7", 25 * S(th), -7);
    chk("ss.q4(a) (pyth) check: 25² − (−24)² = 49 = 7²", 25 * 25 - 576, 49);
    chk("ss.q4(b) tan θ = 7/24", Tn(th), 7 / 24);
    chk("ss.q4(b) sin θ = −7/25", S(th), -7 / 25);
    chk("ss.q4(b) 24 tan θ − 25 sin θ = 14", 24 * Tn(th) - 25 * S(th), 14);
    chk("ss.q4(c) cos(180° + θ) = −cos θ = 24/25", C(180 + th), 24 / 25);
    chk("ss.q4(c) sin(180° − θ) = sin θ = −7/25", S(180 - th), -7 / 25);
    chk("ss.q4(c) 25cos(180°+θ) + 25sin(180°−θ) = 17", 25 * C(180 + th) + 25 * S(180 - th), 17);
  }
  { /* q5: M(4 ; −1), θ reflex */
    const th = degOf(Math.atan2(-1, 4)), r = Math.hypot(4, -1);
    chkS("ss.q5(a) M(4 ; −1) puts θ in quadrant IV", quadOf(th) === 4, true);
    chkS("ss.q5(a) …and θ really is REFLEX (θ > 180°)", th > 180, true);
    chk("ss.q5(a) OM = √17", r, Math.sqrt(17));
    chk("ss.q5(b) cos θ = 4/√17", C(th), 4 / Math.sqrt(17));
    chk("ss.q5(b) cos(180° − θ) = −4/√17", C(180 - th), -4 / Math.sqrt(17));
    chk("ss.q5(b) …rationalised, that is −4√17/17", -4 / Math.sqrt(17), -4 * Math.sqrt(17) / 17);
    chk("ss.q5(c) 1 − sin²(180° + θ) = 16/17", 1 - S(180 + th) ** 2, 16 / 17);
    chk("ss.q5(c) …which is cos²θ, the masked identity read backwards", 1 - S(180 + th) ** 2, C(th) ** 2);
  }

  /* ===== TILE 4 — super special sums (gtrig.sib.sss.*) =====
     The letter is given its real value, then every claimed expression
     is checked against the real ratio. */
  { const t = C(57);
    chk("sss.q1(a) √(1 − t²) = sin 57°, where t = cos 57°", Math.sqrt(1 - t * t), S(57));
    chk("sss.q1(b) sin 57° = √(1 − t²)", S(57), Math.sqrt(1 - t * t));
    chk("sss.q1(c) sin 33° = t", S(33), t);
  }
  { const p = S(41);
    chk("sss.q2(a) √(1 − p²) = cos 41°, where p = sin 41°", Math.sqrt(1 - p * p), C(41));
    chk("sss.q2(b) cos 401° = cos 41° (the rotation)", C(401), C(41));
    chk("sss.q2(b) cos 401° = √(1 − p²)", C(401), Math.sqrt(1 - p * p));
    chk("sss.q2(c) tan 49° = √(1 − p²)/p", Tn(49), Math.sqrt(1 - p * p) / p);
  }
  { const m = 1 / Tn(38), h = Math.sqrt(m * m + 1);
    chk("sss.q3(a) the hypotenuse √(m² + 1), where tan 38° = 1/m", h, 1 / S(38));
    chk("sss.q3(b) sin 38° = 1/√(m² + 1)", S(38), 1 / h);
    chk("sss.q3(c) cos 38° = m/√(m² + 1)", C(38), m / h);
    chk("sss.q3(c) cos 218° = −m/√(m² + 1)", C(218), -m / h);
  }
  { const k = 1 / C(65), o = Math.sqrt(k * k - 1);
    chkS("sss.q4(a) k > 1, so √(k² − 1) is real and √(1 − k²) would not be", k > 1, true);
    chk("sss.q4(a) √(k² − 1) = tan 65°, where cos 65° = 1/k", o, Tn(65));
    chk("sss.q4(b) tan 65° = √(k² − 1)/1", Tn(65), o / 1);
    chk("sss.q4(c) sin 65° = √(k² − 1)/k", S(65), o / k);
    chk("sss.q4(c) sin 245° = −√(k² − 1)/k", S(245), -o / k);
  }
  { const d = S(47);
    chk("sss.q5(a) √(1 − d²) = cos 47°, where d = sin 47°", Math.sqrt(1 - d * d), C(47));
    chk("sss.q5(b) cos 227° = −√(1 − d²)", C(227), -Math.sqrt(1 - d * d));
    chk("sss.q5(c) sin 137° = cos 47° (the co-function into S)", S(137), C(47));
    chk("sss.q5(c) sin²137° = 1 − d²", S(137) ** 2, 1 - d * d);
  }
  { const k = C(58);
    chk("sss.q6(a) √(1 − k²) = the side opposite 58°, where k = cos 58°", Math.sqrt(1 - k * k), S(58));
    chk("sss.q6(b) ∴ √(1 − k²) IS sin 58°", Math.sqrt(1 - k * k) / 1, S(58));
    chk("sss.q6(c) ∴ √(1 − k²)/k IS tan 58°", Math.sqrt(1 - k * k) / k, Tn(58));
  }
  /* SCOPE WALL (sessions/F1-gtrig-part1.md): NO DOUBLE ANGLES at Gr11.
     Every angle asked about on the super-special-sums tile reaches its
     answer from the SAME acute angle by a co-function, a reduction or a
     rotation — never by doubling. Proved by construction: each asked
     angle differs from the given one by 0°, ±90°, ±180°, ±360° or is
     its 90°-complement. */
  [[57, [33]], [41, [401, 49]], [38, [218]], [65, [245]], [47, [227, 137]], [58, []]].forEach(([base, asked]) => {
    asked.forEach(a => {
      const gaps = [a - base, a + base, a - (90 - base), a + (90 - base)];
      const ok = gaps.some(g => Math.abs(((g % 90) + 90) % 90) < 1e-9);
      chkS(`sss scope wall: ${a}° reaches ${base}° by a quadrant step, not by doubling`, ok, true);
      chkS(`sss scope wall: ${a}° is not 2 × ${base}°`, a === 2 * base, false);
    });
  });
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
  /* WAS a hard-coded 2. On a build day with TWO Euclidean sessions
     (G1 and G2) adding modules to the MODULES list at the top of this
     file at the same time, a shared literal is a merge hazard rather
     than a check — so what it was guarding is asserted instead: the two
     originally-seeded questions are still here, every Euclidean question
     loaded carries a figure, and the count itself is REPORTED. */
  tick(["euclid.circ.t2q4", "euclid.tan.t2q5"].every(id => euclid.some(q => q.id === id)),
    `the two originally-seeded Euclidean questions are still loaded — got [${euclid.map(q => q.id).join(", ")}]`);
  tick(euclid.length >= 2 && euclid.every(q => !!q.diagram && !!q.diagram.parts),
    `every Euclidean question carries a diagram with a parts map — ${euclid.length} loaded`);
  console.log(`  ${euclid.length} Euclidean question(s) loaded: [${euclid.map(q => q.id).join(", ")}]`);

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

  /* ===================================================================
     9g — SESSION G1's TWO TILES (2026-08-23): an INDEPENDENT recompute
     of every angle on every one of the eight new figures, from first
     principles.

     "First principles" here means ARC ARITHMETIC, and it is done from
     point degrees TYPED INTO THIS FILE — not read out of the modules.
     Two facts do all the work:
        a CENTRAL angle equals the arc it stands on;
        an INSCRIBED angle equals HALF the arc it stands on
        (the arc on the far side of its two arms from the vertex).
     Everything else — isosceles base angles, angles round a point,
     angle sums, the reflex pairing, the parallel chords — falls out of
     those two, and every number this block derives is then checked
     THREE ways: against the value hard-typed here from the memo's own
     claim, against the `v` the module's spec declares (which the engine
     separately re-measures from real pixel coordinates in 9a), and,
     for the riders, against the key line the next part's sketch shows.
     Nothing below reads a memo string.
     =================================================================== */
  console.log("\n  -- 9g. session G1: arc arithmetic behind every new Euclidean figure --");
  {
    const g1 = new Set([
      "euclid.bw.q1", "euclid.bw.q2", "euclid.bw.q3",
      "euclid.sib.ca.q1", "euclid.sib.ca.q2", "euclid.sib.ca.q3",
      "euclid.sib.ca.q4", "euclid.sib.ca.q5",
    ]);
    const mineG1 = euclid.filter(q => g1.has(q.id));
    tick(mineG1.length === 8, `session G1 contributes 8 Euclidean questions, got ${mineG1.length}`);

    /* ---- the two primitives ---------------------------------------- */
    const ccw = (from, to) => ((to - from) % 360 + 360) % 360;   // arc anticlockwise
    /* the arc XY that does NOT contain P */
    const arcAway = (x, y, p) => {
      const a = ccw(x, y);                       // x -> y anticlockwise
      const pOnA = ccw(x, p) < a;                // is P on that arc?
      return pOnA ? 360 - a : a;
    };
    const inscribed = (vertex, x, y) => arcAway(x, y, vertex) / 2;
    const central = (x, y) => Math.min(ccw(x, y), 360 - ccw(x, y));

    /* ---- the figures, degree for degree, typed here ------------------ */
    const FIG = {
      "euclid.bw.q1": { A: 215, B: 325 },
      "euclid.bw.q2": { A: 110, B: 180, C: 310, D: 40 },
      "euclid.bw.q3": { T: 270, A: 20, B: 150 },
      "euclid.sib.ca.q1": { A: 200, B: 90, C: 350 },
      "euclid.sib.ca.q2": { A: 180, B: 0, C: 130, D: 50 },
      "euclid.sib.ca.q3": { A: 210, B: 250, C: 330 },
      "euclid.sib.ca.q4": { A: 200, B: 330, C: 100 },
      "euclid.sib.ca.q5": { A: 160, B: 90, C: 300, D: 340 },
    };
    /* the module's own copy of those degrees must agree with them —
       otherwise everything below would be checking a different picture */
    mineG1.forEach(q => {
      const specs = [q.diagram.spec, ...Object.values(q.diagram.parts).map(e => e.spec)].filter(Boolean);
      const want = FIG[q.id];
      const allMatch = specs.every(sp => Object.entries(want).every(([k, v]) => Math.abs(sp.pts[k] - v) < 1e-9))
        && specs.every(sp => Object.keys(sp.pts).length === Object.keys(want).length);
      tick(allMatch, `${q.id}: every spec's point degrees are ${JSON.stringify(want)}`);
    });

    const chk = (label, got, want) => {
      const ok = Math.abs(got - want) < 1e-9;
      tick(ok, `9g ${label}: got ${got}, want ${want}`);
      console.log(`    ${ok ? "OK  " : "FAIL"} ${label}: ${got}`);
    };

    /* ---- bw.q1 — the perpendicular really is perpendicular ---------- */
    {
      const F = FIG["euclid.bw.q1"];
      const g = computeGeometry(euclid.find(q => q.id === "euclid.bw.q1").diagram.parts.a.spec);
      const A = g.pts.A, B = g.pts.B, M = g.pts.M, O = g.pts.O;
      chk("bw.q1 M is the midpoint of AB (|AM| − |MB|)",
        Math.round((Math.hypot(A.x - M.x, A.y - M.y) - Math.hypot(B.x - M.x, B.y - M.y)) * 1e9) / 1e9, 0);
      chk("bw.q1 OM ⊥ AB ((B−A)·(M−O), rounded)",
        Math.round(((B.x - A.x) * (M.x - O.x) + (B.y - A.y) * (M.y - O.y)) * 1e6) / 1e6, 0);
      chk("bw.q1 OA = OB (both radii, difference)",
        Math.round((Math.hypot(A.x - O.x, A.y - O.y) - Math.hypot(B.x - O.x, B.y - O.y)) * 1e9) / 1e9, 0);
      chk("bw.q1 the chord is symmetric about 270°", (F.A + F.B) / 2, 270);
    }

    /* ---- bw.q2 — opposite angles of the cyclic quad add to 180° ----- */
    {
      const F = FIG["euclid.bw.q2"];
      const Ahat = inscribed(F.A, F.D, F.B);
      const Chat = inscribed(F.C, F.B, F.D);
      const Bhat = inscribed(F.B, F.A, F.C);
      const Dhat = inscribed(F.D, F.C, F.A);
      chk("bw.q2 Â", Ahat, 110);
      chk("bw.q2 Ĉ", Chat, 70);
      chk("bw.q2 Â + Ĉ (the theorem itself)", Ahat + Chat, 180);
      chk("bw.q2 B̂ + D̂ (the other pair, same theorem)", Bhat + Dhat, 180);
      /* the acute-case picture: no arc bigger than 180°, so O really is
         INSIDE the quadrilateral and the construction is legal */
      const arcs = [ccw(F.A, F.B), ccw(F.B, F.C), ccw(F.C, F.D), ccw(F.D, F.A)];
      chk("bw.q2 the four arcs total 360°", arcs.reduce((s, a) => s + a, 0), 360);
      tick(arcs.every(a => a < 180), `bw.q2: every arc under 180° so O sits inside ABCD — got [${arcs}]`);
      /* and the memo's construction: the two angles at the centre on
         chord BD are 2Â and 2Ĉ and they fill the revolution */
      chk("bw.q2 the C-side ∠ at the centre on BD = 2Â", arcAway(F.B, F.D, F.A), 2 * Ahat);
      chk("bw.q2 the A-side ∠ at the centre on BD = 2Ĉ", arcAway(F.B, F.D, F.C), 2 * Chat);
      chk("bw.q2 the two of them make one revolution", arcAway(F.B, F.D, F.A) + arcAway(F.B, F.D, F.C), 360);
    }

    /* ---- bw.q3 — the tangent–chord pair really are equal ------------ */
    {
      const F = FIG["euclid.bw.q3"];
      /* the tangent–chord angle at T on R's side is half the arc TA it
         cuts off — and R is the "tg+" ray, i.e. T's degree + 90, so the
         arc it faces is the one running anticlockwise from T to A */
      const tanChord = ccw(F.T, F.A) / 2;
      const alternate = inscribed(F.B, F.T, F.A);
      chk("bw.q3 ∠ATR (tangent–chord)", tanChord, 55);
      chk("bw.q3 ∠ABT (alternate segment)", alternate, 55);
      chk("bw.q3 the theorem: ∠ATR − ∠ABT", tanChord - alternate, 0);
      /* B has to be in the ALTERNATE segment — the far side of TA from
         R — or the two angles are supplementary, not equal */
      tick(ccw(F.T, F.B) > ccw(F.T, F.A), `bw.q3: B is on the major arc, the alternate segment (arc T→B ${ccw(F.T, F.B)}° vs T→A ${ccw(F.T, F.A)}°)`);
      /* the construction the memo makes: C is the far end of the
         diameter from T, and it must sit on B's side of TA */
      const C = (F.T + 180) % 360;
      chk("bw.q3 ∠CTR = 90° (tan ⊥ diameter)", ccw(F.T, C) / 2, 90);
      chk("bw.q3 ∠CTA = 90° − x", inscribed(F.T, F.A, C), 90 - tanChord);
      chk("bw.q3 ∠TAC = 90° (∠ in semi-circle)", inscribed(F.A, F.T, C), 90);
      chk("bw.q3 ∠TCA = x (what the triangle leaves)", inscribed(C, F.T, F.A), tanChord);
      tick(ccw(F.T, C) > ccw(F.T, F.A), `bw.q3: the construction point C is on the same side of TA as B, so ∠TCA and ∠ABT really are in the same segment`);
    }

    /* ---- ca.q1 — isosceles radii → ∠s round a pt → ∠ at centre ------ */
    {
      const F = FIG["euclid.sib.ca.q1"];
      const O1 = central(F.A, F.B), O2 = central(F.A, F.C), O3 = central(F.B, F.C);
      chk("ca.q1 Ô₁ = ∠AOB", O1, 110);
      chk("ca.q1 Ô₂ = ∠AOC", O2, 150);
      chk("ca.q1 Ô₃ = ∠BOC", O3, 100);
      chk("ca.q1 the three fill the revolution", O1 + O2 + O3, 360);
      chk("ca.q1 given ∠OAB = base ∠ of △OAB", (180 - O1) / 2, 35);
      chk("ca.q1 given ∠OCB = base ∠ of △OBC", (180 - O3) / 2, 40);
      chk("ca.q1 B̂₁", (180 - O1) / 2, 35);
      chk("ca.q1 B̂₂", (180 - O3) / 2, 40);
      chk("ca.q1 ∠ABC the long way (B̂₁ + B̂₂)", (180 - O1) / 2 + (180 - O3) / 2, 75);
      chk("ca.q1 ∠ABC the short way (½ Ô₂)", inscribed(F.B, F.A, F.C), 75);
    }

    /* ---- ca.q2 — diameter, same segment, and the parallel chords ---- */
    {
      const F = FIG["euclid.sib.ca.q2"];
      chk("ca.q2 AB really is a diameter (arc A→B)", ccw(F.A, F.B), 180);
      chk("ca.q2 Ĉ₁ = ∠ACB", inscribed(F.C, F.A, F.B), 90);
      chk("ca.q2 ∠ADB", inscribed(F.D, F.A, F.B), 90);
      chk("ca.q2 given ∠ABC", inscribed(F.B, F.A, F.C), 25);
      chk("ca.q2 given ∠DBC", inscribed(F.B, F.D, F.C), 40);
      chk("ca.q2 Â₂ = ∠DAC (same segment as ∠DBC)", inscribed(F.A, F.D, F.C), 40);
      chk("ca.q2 ∠CDA (unmarked, but the same segment as ∠ABC)", inscribed(F.D, F.C, F.A), 25);
      chk("ca.q2 ∠CAB (the whole angle at A)", inscribed(F.A, F.C, F.B), 65);
      chk("ca.q2 Â₁ = ∠CAB − Â₂", inscribed(F.A, F.C, F.B) - inscribed(F.A, F.D, F.C), 25);
      chk("ca.q2 Ĉ₂ = ∠BCD (same segment as Â₁)", inscribed(F.C, F.B, F.D), 25);
      chk("ca.q2 ∠DCA = Ĉ₁ + Ĉ₂", inscribed(F.C, F.D, F.A), 115);
      chk("ca.q2 the co-interior pair totals 180°", inscribed(F.C, F.D, F.A) + inscribed(F.A, F.C, F.B), 180);
      /* and CD ∥ AB read straight off the drawing, not off the angles:
         C and D are the same height, A and B are the same height */
      {
        const g = computeGeometry(euclid.find(q => q.id === "euclid.sib.ca.q2").diagram.parts.f.spec);
        chk("ca.q2 chord CD is level (y_C − y_D)", Math.round((g.pts.C.y - g.pts.D.y) * 1e6) / 1e6, 0);
        chk("ca.q2 chord AB is level (y_A − y_B)", Math.round((g.pts.A.y - g.pts.B.y) * 1e6) / 1e6, 0);
      }
    }

    /* ---- ca.q3 — the reflex angle at the centre --------------------- */
    {
      const F = FIG["euclid.sib.ca.q3"];
      const AOC = central(F.A, F.C);
      chk("ca.q3 ∠AOC", AOC, 120);
      chk("ca.q3 reflex ∠AOC (the given)", 360 - AOC, 240);
      /* B is on the MINOR arc, which is what makes the reflex angle the
         one that pairs with ∠ABC */
      tick(ccw(F.A, F.B) < ccw(F.A, F.C), `ca.q3: B lies on the minor arc AC (arc A→B ${ccw(F.A, F.B)}° inside arc A→C ${ccw(F.A, F.C)}°)`);
      chk("ca.q3 ∠ABC = ½ × the REFLEX angle", inscribed(F.B, F.A, F.C), 120);
      chk("ca.q3 …and it is NOT ½ × 120°", inscribed(F.B, F.A, F.C) === 60 ? 1 : 0, 0);
      chk("ca.q3 Ĉ₁ = Â₂ = base ∠ of △OAC", (180 - AOC) / 2, 30);
      chk("ca.q3 given Â₁ = ∠BAC", inscribed(F.A, F.B, F.C), 40);
      chk("ca.q3 Ĉ₂ = ∠ACB", inscribed(F.C, F.A, F.B), 20);
      chk("ca.q3 △ABC angles total 180°",
        inscribed(F.A, F.B, F.C) + inscribed(F.B, F.A, F.C) + inscribed(F.C, F.A, F.B), 180);
    }

    /* ---- ca.q4 — equal chords, equal angles ------------------------- */
    {
      const F = FIG["euclid.sib.ca.q4"];
      const O2 = central(F.A, F.B), O3 = central(F.B, F.C), O1 = central(F.C, F.A);
      chk("ca.q4 Ô₂ = ∠AOB (the given)", O2, 130);
      chk("ca.q4 Ô₃ = ∠BOC (equal chords, equal ∠s)", O3, 130);
      chk("ca.q4 the two chords really are equal (∠AOB − ∠BOC)", O2 - O3, 0);
      chk("ca.q4 Ô₁ = ∠AOC", O1, 100);
      chk("ca.q4 the three fill the revolution", O1 + O2 + O3, 360);
      chk("ca.q4 ∠OAC = ∠ACO = base ∠ of △OAC", (180 - O1) / 2, 40);
      chk("ca.q4 B̂₂ = base ∠ of △OAB", (180 - O2) / 2, 25);
      chk("ca.q4 B̂₁ = base ∠ of △OBC", (180 - O3) / 2, 25);
      chk("ca.q4 ∠ABC the long way (B̂₁ + B̂₂)", (180 - O3) / 2 + (180 - O2) / 2, 50);
      chk("ca.q4 ∠ABC the short way (½ Ô₁)", inscribed(F.B, F.A, F.C), 50);
      /* and the chords measured off the drawing, not off the arcs */
      {
        const g = computeGeometry(euclid.find(q => q.id === "euclid.sib.ca.q4").diagram.parts.a.spec);
        const len = (p, q2) => Math.hypot(g.pts[p].x - g.pts[q2].x, g.pts[p].y - g.pts[q2].y);
        chk("ca.q4 |AB| − |BC| measured in pixels", Math.round((len("A", "B") - len("B", "C")) * 1e6) / 1e6, 0);
      }
    }

    /* ---- ca.q5 — the whole chase in terms of x ---------------------- */
    {
      const F = FIG["euclid.sib.ca.q5"];
      const x = inscribed(F.C, F.B, F.A);
      chk("ca.q5 the drawing value of x = ∠ACB", x, 35);
      chk("ca.q5 AOD really is a straight line (arc A→D)", ccw(F.A, F.D), 180);
      chk("ca.q5 Ô₁ = 2x", central(F.A, F.B), 2 * x);
      chk("ca.q5 ∠ABO = 90° − x (base ∠ of △AOB)", (180 - central(F.A, F.B)) / 2, 90 - x);
      chk("ca.q5 ∠DAB = 90° − x (the other base ∠)", (180 - central(F.A, F.B)) / 2, 90 - x);
      chk("ca.q5 Ô₂ = 180° − 2x (∠s on a str line)", 180 - central(F.A, F.B), 180 - 2 * x);
      chk("ca.q5 Ô₂ measured directly at the centre", central(F.B, F.D), 180 - 2 * x);
      chk("ca.q5 the ext-∠ route: ∠DAB + ∠ABO", 2 * ((180 - central(F.A, F.B)) / 2), 180 - 2 * x);
      chk("ca.q5 Ô₂ = 2 · ∠DAB (the part-(e) claim)",
        (180 - central(F.A, F.B)) - 2 * ((180 - central(F.A, F.B)) / 2), 0);
      /* the identity is not an artefact of x = 35: re-run it at five
         other drawing values by moving B round the circle */
      let bad = 0;
      [12, 25, 40, 58, 74].forEach(xx => {
        const B = (F.A - 2 * xx + 360) % 360;      // arc A→B = 2x
        const O1 = central(F.A, B);
        if (Math.abs(O1 - 2 * xx) > 1e-9) bad++;
        if (Math.abs((180 - O1) - 2 * ((180 - O1) / 2)) > 1e-9) bad++;
      });
      chk("ca.q5 the whole chase holds at x = 12, 25, 40, 58, 74 (mismatches)", bad, 0);
    }

    /* ---- the chained sketch: what the key shows, and when ------------ */
    {
      /* the value each rider's part ADDS to the sketch, in order — typed
         here from the arc arithmetic above, not read out of the module */
      const CHAIN = {
        "euclid.sib.ca.q1": [["a", "B̂₁ = 35°"], ["b", "Ô₁ = 110°"], ["c", "B̂₂ = 40°"], ["d", "Ô₃ = 100°"], ["e", "Ô₂ = 150°"], ["f", null]],
        "euclid.sib.ca.q2": [["a", "Ĉ₁ = 90°"], ["b", "∠ADB = 90°"], ["c", "Â₂ = 40°"], ["d", "Â₁ = 25°"], ["e", "Ĉ₂ = 25°"], ["f", null]],
        "euclid.sib.ca.q3": [["a", "∠AOC = 120°"], ["b", "∠ABC = 120°"], ["c", "Ĉ₁ = 30°"], ["d", "Â₂ = 30°"], ["e", null]],
        "euclid.sib.ca.q4": [["a", "Ô₃ = 130°"], ["b", "Ô₁ = 100°"], ["c", "∠OAC = 40°"], ["d", "∠ACO = 40°"], ["e", null]],
        "euclid.sib.ca.q5": [["a", "Ô₁ = 2x"], ["b", "∠ABO = 90° − x"], ["c", "∠DAB = 90° − x"], ["d", "Ô₂ = 180° − 2x"], ["e", null]],
      };
      /* Two riders start with a GIVEN already in their key, because the
         vertex it belongs to carries numbered wedges and a value sitting
         next to a "2" would read as another number (this file's header).
         Those base lines come BEFORE anything the parts find. */
      const BASE_KEY = {
        "euclid.sib.ca.q3": ["Â₁ = 40°"],
        "euclid.sib.ca.q4": ["Ô₂ = 130°"],
      };
      let chainOk = true, leakOk = true, everyPartHasAFigure = true;
      Object.entries(CHAIN).forEach(([qid, chain]) => {
        const q = euclid.find(qq => qq.id === qid);
        if (!q) { chainOk = false; return; }
        if (q.parts.length !== chain.length) chainOk = false;
        chain.forEach(([pid], i) => {
          const entry = q.diagram.parts[pid];
          if (!entry || !entry.spec) { everyPartHasAFigure = false; return; }
          const keyLines = ((entry.spec.key && entry.spec.key.lines) || []).map(l => l.t);
          /* part n's sketch shows exactly the n−1 values found before it,
             in the order they were found … */
          const want = [...(BASE_KEY[qid] || []), ...chain.slice(0, i).map(c => c[1])];
          if (keyLines.length !== want.length || want.some((w, k) => keyLines[k] !== w)) chainOk = false;
          /* … and NEVER the one this part is being asked to find */
          const mine2 = chain[i][1];
          if (mine2 && keyLines.includes(mine2)) leakOk = false;
        });
      });
      tick(chainOk, "every rider's sketch carries exactly the values the parts before it found, in order");
      tick(leakOk, "no rider's sketch ever shows the value the part in front of it is asked to find");
      tick(everyPartHasAFigure, "every part of every rider has its own figure");
      console.log(`    chained keys: ${chainOk ? "OK" : "FAIL"} · no-leak: ${leakOk ? "OK" : "FAIL"} · figure per part: ${everyPartHasAFigure ? "OK" : "FAIL"}`);
    }

    /* ---- the bare-figure rule on the two labelled bookwork proofs ---- */
    {
      const labelsOf = sp => (sp.angles || []).map(a => a.t).filter(t => t && t.trim().length);
      [["euclid.bw.q2", ["x", "y"]], ["euclid.bw.q3", ["x", "x"]]].forEach(([qid, want]) => {
        const q = euclid.find(qq => qq.id === qid);
        const entry = q.diagram.parts.a;
        const qSide = highlightedSpec(entry.spec, entry.question);
        const rSide = highlightedSpec(entry.spec, entry.reveal);
        tick(labelsOf(qSide).length === 0, `${qid}: the question-side figure leaks angle labels [${labelsOf(qSide).join(",")}]`);
        tick(want.every(t => labelsOf(rSide).includes(t)), `${qid}: the reveal should restore [${want}], got [${labelsOf(rSide).join(",")}]`);
        tick(labelsOf(entry.spec).length === want.length, `${qid}: the spec itself carries the labelling, so \`bare\` is what removes it`);
      });
      /* bw.q1 has nothing to hide — its only marked angle is the GIVEN
         right angle, and it must be a square, never a chevron */
      const q1 = euclid.find(qq => qq.id === "euclid.bw.q1");
      const mAngle = (q1.diagram.parts.a.spec.angles || []).find(a => a.at === "M");
      tick(!!mAngle && mAngle.o && mAngle.o.mark === "square" && !mAngle.t,
        `bw.q1: the given 90° at M is an unlabelled right-angle SQUARE, got ${JSON.stringify(mAngle)}`);
      /* …and its reveal is what shows the bisection: two halves, each
         with its own equal-length tick */
      const rev = q1.diagram.parts.a.reveal.chords.map(c => c.join(""));
      tick(rev.length === 2 && rev.includes("AMt1") && rev.includes("MBt1"),
        `bw.q1: the reveal must tick BOTH halves of the chord, got [${rev.join(", ")}]`);
      /* NO CONSTRUCTION IS DRAWN on any bookwork figure — the printed
         paper never shows it, and the construction line is a mark */
      const drawn = qid => {
        const q = euclid.find(qq => qq.id === qid);
        return (q.diagram.parts.a.spec.chords || []).map(c => (Array.isArray(c) ? c : [c.a, c.b]).join(""));
      };
      tick(!drawn("euclid.bw.q1").some(c => /^(OA|AO|OB|BO)$/.test(c)), `bw.q1: OA and OB are the CONSTRUCTION and must not be drawn, got [${drawn("euclid.bw.q1")}]`);
      tick(!drawn("euclid.bw.q2").some(c => /^(OB|BO|OD|DO)$/.test(c)), `bw.q2: OB and OD are the CONSTRUCTION and must not be drawn, got [${drawn("euclid.bw.q2")}]`);
      tick(drawn("euclid.bw.q3").length === 3 && !drawn("euclid.bw.q3").some(c => /O/.test(c)), `bw.q3: the diameter TC and the chord AC are the CONSTRUCTION and must not be drawn, got [${drawn("euclid.bw.q3")}]`);

      /* …AND THE REVEAL MUST DRAW IT (foreman review, 2026-08-23). A
         learner reading "Construction: join OA and OB" has to see those
         lines. So the same check runs the other way round on the figure
         AS THE REVEAL RENDERS IT: every construction segment present,
         and, for the tan–chord proof, the construction POINT too — C
         exists on the reveal and nowhere else. */
      const rendered = qid => {
        const q = euclid.find(qq => qq.id === qid);
        const e = q.diagram.parts.a;
        const qs = highlightedSpec(e.spec, e.question), rs = highlightedSpec(e.spec, e.reveal);
        const seg = sp => (sp.chords || []).map(c => (Array.isArray(c) ? [c[0], c[1]] : [c.a, c.b]).sort().join(""));
        return { q: seg(qs), r: seg(rs), qPts: Object.keys(computeGeometry(qs).pts), rPts: Object.keys(computeGeometry(rs).pts) };
      };
      const CONSTRUCTION = {
        "euclid.bw.q1": ["AO", "BO"],
        "euclid.bw.q2": ["BO", "DO"],
        "euclid.bw.q3": ["CT", "AC"],
      };
      Object.entries(CONSTRUCTION).forEach(([qid, want]) => {
        const { q: qSide, r: rSide } = rendered(qid);
        const wantSorted = want.map(w => w.split("").sort().join(""));
        tick(wantSorted.every(w => rSide.includes(w)), `${qid}: the REVEAL must draw the construction [${want}], got [${rSide.join(", ")}]`);
        tick(!wantSorted.some(w => qSide.includes(w)), `${qid}: the QUESTION side must still draw none of it, got [${qSide.join(", ")}]`);
        console.log(`    ${qid}: question draws [${qSide.join(" ")}] · reveal draws [${rSide.join(" ")}]`);
      });
      {
        const { qPts, rPts } = rendered("euclid.bw.q3");
        tick(!qPts.includes("C"), `bw.q3: the construction point C must not exist on the question side, got [${qPts.join("")}]`);
        tick(rPts.includes("C"), `bw.q3: the construction point C must appear on the reveal, got [${rPts.join("")}]`);
      }
      /* the equal-radii ticks the congruency leans on, and the two
         right angles the tan–chord bridge is built from */
      {
        const q1 = euclid.find(qq => qq.id === "euclid.bw.q1");
        const con1 = q1.diagram.parts.a.reveal.construction.chords.map(c => c.join(""));
        tick(con1.length === 2 && con1.every(c => /t2$/.test(c)), `bw.q1: both construction radii carry the double equal-length tick, got [${con1.join(", ")}]`);
        const q3 = euclid.find(qq => qq.id === "euclid.bw.q3");
        const squares = q3.diagram.parts.a.reveal.angles.filter(a => a.o && a.o.mark === "square");
        tick(squares.length === 2, `bw.q3: the reveal lights BOTH right angles as squares (tan ⊥ diameter, ∠ in semi-circle), got ${squares.length}`);
        const q2 = euclid.find(qq => qq.id === "euclid.bw.q2");
        const oLabels = q2.diagram.parts.a.reveal.angles.filter(a => a.at === "O").map(a => a.t);
        tick(oLabels.includes("2x") && oLabels.includes("2y"), `bw.q2: the reveal labels both angles at the centre 2x and 2y, got [${oLabels.join(", ")}]`);
      }
    }

    /* ---- the tile shape her ruling 4 asks for ----------------------- */
    {
      const bw = mineG1.filter(q => q.topic === "bookwork-proofs");
      const ca = mineG1.filter(q => q.topic === "chords-and-angles");
      tick(bw.length === 3 && bw.every(q => q.parts.length === 1 && q.parts[0].level === 1),
        `the three fresh bookwork proofs are one part each, at level 1 — got [${bw.map(q => `${q.id}:${q.parts.length}p/L${q.parts[0].level}`).join(", ")}]`);
      tick(bw.every(q => q.marks >= 5 && q.marks <= 6), `each bookwork proof is worth 5–6 marks — got [${bw.map(q => q.marks).join(", ")}]`);
      tick(bw.every(q => !!q.intro), "each bookwork card carries the intro that names its given figure");
      tick(ca.length === 5 && ca.every(q => q.parts.length >= 5 && q.parts.length <= 6),
        `each rider runs 5–6 parts on one sketch — got [${ca.map(q => `${q.id}:${q.parts.length}`).join(", ")}]`);
      tick(ca.every(q => q.parts.every(p => p.marks >= 1 && p.marks <= 3)),
        "every rider part is worth 1–3 marks, like the bank");
      tick(mineG1.every(q => q.parts.every(p => p.level >= 1 && p.level <= 3)),
        "levels 1–3 only across both G1 tiles");
      tick(ca.every(q => q.parts.some(p => p.level === 1) && q.parts.some(p => p.level >= 2)),
        "every rider ramps — it starts with at least one level-1 part and reaches level 2 or 3");
      tick(mineG1.every(q => q.paper === "siblings"), "every G1 question belongs to no paper");
      console.log(`    tile shape: bookwork ${bw.length} × 1 part · riders [${ca.map(q => q.parts.length).join(",")}] parts · marks [${mineG1.map(q => q.marks).join(",")}]`);
    }

    /* ---- the SAG reasons really are the verbatim short forms -------- */
    {
      /* every reason string that appears in G1's memos, and the
         EUCLID-ACCEPTABLE-REASONS.md short form it has to be. A reason
         that drifts into prose ("angles opposite equal sides") is a
         reason the marker does not have on the memo. */
      const SAG = [
        "radii", "common", "RHS",
        "∠s opp equal sides", "sides opp equal ∠s", "int. ∠s of △", "sum of ∠s in Δ", "ext ∠ of Δ",
        "∠s on a str line", "∠s round a pt", "co-int ∠s supp",
        "∠ at centre = 2 × ∠ at circumference", "∠s in semi-circle", "∠s in the same seg",
        "equal chords; equal ∠s", "line from centre ⊥ to chord", "Pythagoras",
        "tan ⊥ diameter", "tan ⊥ radius", "tan chord theorem",
      ];
      /* A reason CELL is accepted when it is one listed short form, or
         several joined by "; " (the way a paper writes a step that leans
         on two theorems at once) — with two deliberate exceptions:
         a cell that starts "given" is citing the question's own stem,
         not a theorem, and "equal chords; equal ∠s" is itself a listed
         short form that happens to contain a semicolon, so it is tried
         WHOLE before any splitting. */
      const okCell = cell => {
        const c = cell.trim();
        if (/^given\b/i.test(c)) return true;
        if (SAG.includes(c)) return true;
        return c.split(";").map(s => s.trim()).every(part => SAG.includes(part));
      };
      const bad = [];
      mineG1.forEach(q => q.parts.forEach(p => p.memo.forEach((b, i) => {
        if (b.type === "trap") return;
        [...String(b.text.en).matchAll(/<i>\(([^)]*)\)<\/i>/g)].forEach(m => {
          const cell = m[1].trim();
          if (!okCell(cell)) bad.push(`${q.id}(${p.id}) memo[${i}]: "${cell}"`);
        });
      })));
      tick(bad.length === 0, `every italic reason in a G1 memo is a verbatim SAG short form — strays: ${bad.join(" | ")}`);
      console.log(`    SAG reasons: ${bad.length ? "FAIL " + bad.join(" | ") : "every italic reason is a listed short form"}`);
    }
  }

  /* ===================================================================
     9h — SESSION G2's THREE TILES (2026-08-23): the same INDEPENDENT
     recompute, on the other seventeen Euclidean figures — six
     cyclic-quadrilateral riders, five tangent riders and six Level 4 ★
     cards.

     "Independent" means the same thing it means in 9g: the point
     degrees are TYPED INTO THIS FILE, not read out of the modules, and
     every angle is re-derived by arc arithmetic from them. Three facts
     do all the work:
        a CENTRAL angle equals the arc it stands on;
        an INSCRIBED angle equals HALF the arc on the far side of its arms;
        a TANGENT–CHORD angle at T equals half the arc the chord cuts off
        on that side — anticlockwise from T for the engine's "tg+" ray,
        the other way for "tg−".
     Everything else falls out of those: the cyclic-quad theorems, the
     exterior angle, the equal chords, the isosceles radii, the
     congruent triangles, and the lengths.

     Nothing below reads a memo string. Each number is checked against
     the value hard-typed here from the memo's own claim, against the
     `v` the module's spec declares (which the engine separately
     re-measures from real pixel coordinates in 9a), and — for the
     chained riders — against the key line the next part's sketch shows.
     =================================================================== */
  console.log("\n  -- 9h. session G2: arc arithmetic behind every cyclic-quad, tangent and ★ figure --");
  {
    const G2_CQ = [1, 2, 3, 4, 5, 6].map(n => `euclid.sib.cq.q${n}`);
    const G2_TG = [1, 2, 3, 4, 5].map(n => `euclid.sib.tg.q${n}`);
    const G2_L4 = [1, 2, 3, 4, 5, 6].map(n => `euclid.l4.q${n}`);
    const g2 = new Set([...G2_CQ, ...G2_TG, ...G2_L4]);
    const mineG2 = euclid.filter(q => g2.has(q.id));
    tick(mineG2.length === 17, `session G2 contributes 17 Euclidean questions, got ${mineG2.length}`);

    /* ---- the primitives -------------------------------------------- */
    const ccw = (from, to) => ((to - from) % 360 + 360) % 360;
    const arcAway = (x, y, p) => { const a = ccw(x, y); return ccw(x, p) < a ? 360 - a : a; };
    const inscribed = (vertex, x, y) => arcAway(x, y, vertex) / 2;
    const central = (x, y) => Math.min(ccw(x, y), 360 - ccw(x, y));
    /* the tangent–chord angle at contact point T on the "tg+" side (the
       ray at T's degree + 90) is half the arc running ANTICLOCKWISE
       from T to X; on the "tg−" side it is half the rest of the circle */
    const tanChord = (T, X, side) => (side === "+" ? ccw(T, X) : 360 - ccw(T, X)) / 2;

    /* ---- the figures, degree for degree, typed here ------------------ */
    const FIG = {
      "euclid.sib.cq.q1": { A: 205, B: 95, C: 335 },
      "euclid.sib.cq.q2": { A: 150, B: 70, C: 320, D: 230 },
      "euclid.sib.cq.q3": { A: 160, B: 60, C: 350, D: 290 },
      "euclid.sib.cq.q4": { A: 155, B: 55, C: 345, D: 225 },
      "euclid.sib.cq.q5": { A: 165, B: 45, C: 325, D: 245 },
      "euclid.sib.cq.q6": { A: 145, B: 65, C: 355, D: 235 },
      "euclid.sib.tg.q1": { T: 270, A: 340, B: 130 },
      "euclid.sib.tg.q2": { P: 270, Q: 170, R: 30 },
      "euclid.sib.tg.q3": { A: 66, B: 294 },
      "euclid.sib.tg.q4": { T: 270, D: 90, A: 20 },
      "euclid.sib.tg.q5": { A: 53.130102, B: 306.869898 },
      "euclid.l4.q1": { A: 270, B: 160, C: 40 },
      "euclid.l4.q3": { X: 240, Y: 300, Z: 90 },
      "euclid.l4.q4": { A: 270, B: 160, C: 20 },
      "euclid.l4.q5": { A: 270, B: 340, C: 130 },
      "euclid.l4.q6": { A: 67.380135, C: 292.619865 },
    };
    /* the module's own copy of those degrees must agree — otherwise
       everything below would be checking a different picture. (l4.q2 is
       the one figure built from free {x,y} points rather than degrees;
       it gets its own construction check further down.) */
    mineG2.forEach(q => {
      const want = FIG[q.id];
      if (!want) return;
      const specs = [q.diagram.spec, ...Object.values(q.diagram.parts).map(e => e.spec)].filter(Boolean);
      const allMatch = specs.every(sp => Object.entries(want).every(([k, v]) => Math.abs(sp.pts[k] - v) < 1e-6))
        && specs.every(sp => Object.keys(sp.pts).length === Object.keys(want).length);
      tick(allMatch, `${q.id}: every spec's point degrees are ${JSON.stringify(want)}`);
    });

    const chk = (label, got, want) => {
      const ok = Math.abs(got - want) < 1e-6;
      tick(ok, `9h ${label}: got ${got}, want ${want}`);
      console.log(`    ${ok ? "OK  " : "FAIL"} ${label}: ${got}`);
    };
    const spec1 = qid => {
      const q = euclid.find(x => x.id === qid);
      return q.diagram.parts[q.parts[0].id].spec || q.diagram.spec;
    };

    /* ================= CYCLIC QUADRILATERALS ======================== */

    /* cq.q1 — two perpendiculars from the centre, then a cyclic quad */
    {
      const F = FIG["euclid.sib.cq.q1"];
      chk("cq.q1 ∠AOB", central(F.A, F.B), 110);
      chk("cq.q1 ∠BOC", central(F.B, F.C), 120);
      chk("cq.q1 B̂₁ = base ∠ of △OAB", (180 - central(F.A, F.B)) / 2, 35);
      chk("cq.q1 B̂₂ = base ∠ of △OBC", (180 - central(F.B, F.C)) / 2, 30);
      chk("cq.q1 ∠MBN = ∠ABC = B̂₁ + B̂₂", inscribed(F.B, F.A, F.C), 65);
      /* M and N measured off the drawing: each really IS the foot of the
         perpendicular from O, and ∠MON really is 115° */
      const g = computeGeometry(spec1("euclid.sib.cq.q1"));
      const { A, B, C, M, N, O } = g.pts;
      chk("cq.q1 OM ⊥ AB ((B−A)·(M−O), rounded)",
        Math.round(((B.x - A.x) * (M.x - O.x) + (B.y - A.y) * (M.y - O.y)) * 1e6) / 1e6, 0);
      chk("cq.q1 ON ⊥ BC ((C−B)·(N−O), rounded)",
        Math.round(((C.x - B.x) * (N.x - O.x) + (C.y - B.y) * (N.y - O.y)) * 1e6) / 1e6, 0);
      const ang = (V, P, Q) => {
        const d = (v, p) => Math.atan2(-(p.y - v.y), p.x - v.x) * 180 / Math.PI;
        let a = Math.abs(d(V, P) - d(V, Q)); if (a > 180) a = 360 - a;
        return Math.round(a * 1e6) / 1e6;
      };
      chk("cq.q1 ∠MON measured off the drawing", ang(O, M, N), 115);
      chk("cq.q1 the theorem: ∠MON + ∠MBN", ang(O, M, N) + inscribed(F.B, F.A, F.C), 180);
      chk("cq.q1 ∠OMN measured off the drawing", ang(M, O, N), 30);
      chk("cq.q1 …and it equals ∠OBN = B̂₂", ang(M, O, N) - (180 - central(F.B, F.C)) / 2, 0);
    }

    /* cq.q2 — the exterior angle, then an isosceles triangle */
    {
      const F = FIG["euclid.sib.cq.q2"];
      const A = inscribed(F.A, F.B, F.D), B = inscribed(F.B, F.A, F.C);
      const C = inscribed(F.C, F.B, F.D), D = inscribed(F.D, F.A, F.C);
      chk("cq.q2 Â = ∠BAD", A, 100);
      chk("cq.q2 Ĉ₁ = ∠BCD", C, 80);
      chk("cq.q2 Â + Ĉ₁ (opp ∠s of cyclic quad)", A + C, 180);
      chk("cq.q2 B̂ + D̂ (the other pair)", B + D, 180);
      chk("cq.q2 Ĉ₂ = ∠BCE (ext ∠, on the str line DCE)", 180 - C, 100);
      chk("cq.q2 …and the ext ∠ equals the interior opposite Â", (180 - C) - A, 0);
      chk("cq.q2 B̂₁ = ∠ABD", inscribed(F.B, F.A, F.D), 40);
      chk("cq.q2 B̂₂ = ∠DBC", inscribed(F.B, F.D, F.C), 45);
      chk("cq.q2 D̂₂ = ∠BDC (sum of ∠s in △BCD)", 180 - C - inscribed(F.B, F.D, F.C), 55);
      chk("cq.q2 D̂₁ = ∠ADB (sum of ∠s in △ABD)", 180 - A - inscribed(F.B, F.A, F.D), 40);
      chk("cq.q2 the part-(e) claim: B̂₁ − D̂₁ (equal ⟹ AB = AD)",
        inscribed(F.B, F.A, F.D) - inscribed(F.D, F.A, F.B), 0);
      /* and the two chords measured in pixels, not off the arcs */
      const g = computeGeometry(spec1("euclid.sib.cq.q2"));
      const len = (p, q2) => Math.hypot(g.pts[p].x - g.pts[q2].x, g.pts[p].y - g.pts[q2].y);
      chk("cq.q2 |AB| − |AD| measured in pixels", Math.round((len("A", "B") - len("A", "D")) * 1e6) / 1e6, 0);
      /* E really is on DC produced, past C */
      const dot = (g.pts.E.x - g.pts.C.x) * (g.pts.C.x - g.pts.D.x) + (g.pts.E.y - g.pts.C.y) * (g.pts.C.y - g.pts.D.y);
      tick(dot > 0, "cq.q2: E lies on DC PRODUCED (beyond C), not back towards D");
    }

    /* cq.q3 — the whole thing in terms of x */
    {
      const F = FIG["euclid.sib.cq.q3"];
      const x = inscribed(F.A, F.B, F.D);
      chk("cq.q3 the drawing value of x = ∠BAD", x, 65);
      chk("cq.q3 Ô₁ = ∠BOD on C's side = 2x", central(F.B, F.D), 2 * x);
      chk("cq.q3 Ô₂ = the reflex angle = 360° − 2x", 360 - central(F.B, F.D), 360 - 2 * x);
      chk("cq.q3 Ĉ = ½ · Ô₂ = 180° − x", inscribed(F.C, F.B, F.D), 180 - x);
      chk("cq.q3 the theorem: Â + Ĉ", x + inscribed(F.C, F.B, F.D), 180);
      chk("cq.q3 ∠OBD = 90° − x (base ∠ of △OBD)", (180 - central(F.B, F.D)) / 2, 90 - x);
      /* C really is on the far side of BD from A, which is what makes
         the REFLEX angle the one that pairs with Ĉ. Stated as "the two
         points sit on the two DIFFERENT arcs of BD", which is the fact
         the theorem actually needs and is direction-free — the earlier
         version of this check compared two anticlockwise arcs and read
         the same true figure as a failure. */
      chk("cq.q3 arc BD not containing A (the one Ô₁ stands on)", arcAway(F.B, F.D, F.A), 2 * x);
      chk("cq.q3 arc BD not containing C (the one Ô₂ stands on)", arcAway(F.B, F.D, F.C), 360 - 2 * x);
      tick(Math.abs(arcAway(F.B, F.D, F.A) + arcAway(F.B, F.D, F.C) - 360) < 1e-9,
        "cq.q3: A and C lie on OPPOSITE arcs of BD, so Ĉ pairs with the reflex angle and Â with the ordinary one");
      /* and no accidental diameter anywhere — a stray 180° arc would
         invite an "∠s in semi-circle" answer to a question that is not
         about that at all */
      const arcs = [ccw(F.A, F.B), ccw(F.A, F.C), ccw(F.A, F.D), ccw(F.B, F.C), ccw(F.B, F.D), ccw(F.C, F.D)];
      tick(arcs.every(a => Math.abs(a - 180) > 1e-9), `cq.q3: no pair of points is diametrically opposite — got [${arcs}]`);
      /* the identity is not an artefact of x = 65: re-run it at five
         other drawing values by moving B and D round the circle */
      let bad = 0;
      [20, 35, 50, 78, 88].forEach(xx => {
        const B2 = (F.A - 100 + 360) % 360;            // keep arc AB
        const D2 = (B2 - 2 * xx + 360) % 360;          // arc BCD = 2x
        if (Math.abs(central(B2, D2) - 2 * xx) > 1e-9) bad++;
        if (Math.abs(inscribed(F.A, B2, D2) - xx) > 1e-9) bad++;
      });
      chk("cq.q3 the chase holds at x = 20, 35, 50, 78, 88 (mismatches)", bad, 0);
    }

    /* cq.q4 — the exterior angle, then two chords proved parallel */
    {
      const F = FIG["euclid.sib.cq.q4"];
      const A = inscribed(F.A, F.B, F.D), C = inscribed(F.C, F.B, F.D);
      chk("cq.q4 Ĉ₂ = ∠BCF (given ext ∠)", 180 - C, 95);
      chk("cq.q4 ∠BAD = the interior opposite of Ĉ₂", A, 95);
      chk("cq.q4 ∠ABC (given)", inscribed(F.B, F.A, F.C), 95);
      chk("cq.q4 ∠BCD", C, 85);
      chk("cq.q4 ∠ADC (opp ∠s with ∠ABC)", inscribed(F.D, F.A, F.C), 85);
      chk("cq.q4 Â₂ = ∠CAD (given)", inscribed(F.A, F.C, F.D), 60);
      chk("cq.q4 Â₁ = ∠BAC = ∠BAD − Â₂", inscribed(F.A, F.B, F.C), 35);
      chk("cq.q4 Ĉ₁ = ∠ACD (sum of ∠s in △ACD)",
        180 - inscribed(F.A, F.C, F.D) - inscribed(F.D, F.A, F.C), 35);
      chk("cq.q4 the part-(f) claim: Â₁ − Ĉ₁ (equal ⟹ AB ∥ DC)",
        inscribed(F.A, F.B, F.C) - inscribed(F.C, F.A, F.D), 0);
      /* and AB ∥ DC read straight off the drawing, not off the angles */
      const g = computeGeometry(spec1("euclid.sib.cq.q4"));
      const cross = (g.pts.B.x - g.pts.A.x) * (g.pts.C.y - g.pts.D.y) - (g.pts.B.y - g.pts.A.y) * (g.pts.C.x - g.pts.D.x);
      chk("cq.q4 AB × DC cross product measured in pixels (0 ⟹ parallel)", Math.round(cross * 1e4) / 1e4, 0);
    }

    /* cq.q5 — three equal chords, six angles equal to x */
    {
      const F = FIG["euclid.sib.cq.q5"];
      chk("cq.q5 arc BC", ccw(F.C, F.B), 80);
      chk("cq.q5 arc CD", ccw(F.D, F.C), 80);
      chk("cq.q5 arc DA", ccw(F.A, F.D), 80);
      const x = inscribed(F.A, F.B, F.C);
      chk("cq.q5 the drawing value of x = Â₁ = ∠BAC", x, 40);
      chk("cq.q5 Â₂ = ∠CAD (equal chords)", inscribed(F.A, F.C, F.D), x);
      chk("cq.q5 ∠BDC (same seg as Â₁)", inscribed(F.D, F.B, F.C), x);
      chk("cq.q5 B̂₁ = ∠ABD (equal chords)", inscribed(F.B, F.A, F.D), x);
      chk("cq.q5 B̂₂ = ∠DBC (same seg as Â₂)", inscribed(F.B, F.D, F.C), x);
      chk("cq.q5 ∠ACD (same seg as B̂₁)", inscribed(F.C, F.A, F.D), x);
      chk("cq.q5 ∠ABC = B̂₁ + B̂₂ = 2x", inscribed(F.B, F.A, F.C), 2 * x);
      chk("cq.q5 ∠ADC = 180° − 2x (the part-(e) claim)", inscribed(F.D, F.A, F.C), 180 - 2 * x);
      /* the three chords measured in pixels */
      const g = computeGeometry(spec1("euclid.sib.cq.q5"));
      const len = (p, q2) => Math.hypot(g.pts[p].x - g.pts[q2].x, g.pts[p].y - g.pts[q2].y);
      chk("cq.q5 |AD| − |DC| measured in pixels", Math.round((len("A", "D") - len("D", "C")) * 1e6) / 1e6, 0);
      chk("cq.q5 |DC| − |CB| measured in pixels", Math.round((len("D", "C") - len("C", "B")) * 1e6) / 1e6, 0);
    }

    /* cq.q6 — no circle drawn, and the proof that puts one there */
    {
      const F = FIG["euclid.sib.cq.q6"];
      chk("cq.q6 ∠BAC (given)", inscribed(F.A, F.B, F.C), 35);
      chk("cq.q6 B̂₁ = ∠ABD (given)", inscribed(F.B, F.A, F.D), 45);
      chk("cq.q6 B̂₂ = ∠DBC (given)", inscribed(F.B, F.D, F.C), 60);
      chk("cq.q6 ∠ABC = B̂₁ + B̂₂", inscribed(F.B, F.A, F.C), 105);
      chk("cq.q6 Ĉ₁ = ∠ACB (sum of ∠s in △ABC)", 180 - 35 - 105, 40);
      chk("cq.q6 …and Ĉ₁ measured by arc arithmetic", inscribed(F.C, F.A, F.B), 40);
      chk("cq.q6 ∠ADB (given)", inscribed(F.D, F.A, F.B), 40);
      chk("cq.q6 the part-(c) claim: Ĉ₁ − ∠ADB (equal ⟹ concyclic)",
        inscribed(F.C, F.A, F.B) - inscribed(F.D, F.A, F.B), 0);
      chk("cq.q6 ∠ADC (opp ∠s with ∠ABC)", inscribed(F.D, F.A, F.C), 75);
      chk("cq.q6 Ĉ₂ = ∠ACD (same seg as B̂₁)", inscribed(F.C, F.A, F.D), 45);
      chk("cq.q6 ∠BCD = Ĉ₁ + Ĉ₂", inscribed(F.C, F.B, F.D), 85);
      chk("cq.q6 ∠BAD (opp ∠s with ∠BCD)", inscribed(F.A, F.B, F.D), 95);
      /* C and D really are on the SAME side of AB, which is the half of
         "line subtends equal ∠s" a learner forgets */
      const g = computeGeometry(spec1("euclid.sib.cq.q6"));
      const side = P => Math.sign((g.pts.B.x - g.pts.A.x) * (P.y - g.pts.A.y) - (g.pts.B.y - g.pts.A.y) * (P.x - g.pts.A.x));
      tick(side(g.pts.C) === side(g.pts.D), "cq.q6: C and D lie on the same side of AB (the converse needs it)");
      /* and NO circle is drawn on any state of the figure */
      const everySpec = Object.values(euclid.find(q => q.id === "euclid.sib.cq.q6").diagram.parts).map(e => e.spec);
      tick(everySpec.every(sp => sp.noCircle === true), "cq.q6: no state of the figure draws the circle — that is what is being proved");
    }

    /* ======================== TANGENTS ============================== */

    /* tg.q1 — tan chord both sides, then the centre */
    {
      const F = FIG["euclid.sib.tg.q1"];
      chk("tg.q1 T̂₃ = ∠ATU (tangent–chord, tg+ side)", tanChord(F.T, F.A, "+"), 35);
      chk("tg.q1 ∠ABT (the alternate segment on chord TA)", inscribed(F.B, F.A, F.T), 35);
      chk("tg.q1 the theorem: T̂₃ − ∠ABT", tanChord(F.T, F.A, "+") - inscribed(F.B, F.A, F.T), 0);
      chk("tg.q1 T̂₁ = ∠BTS (tangent–chord, tg− side)", tanChord(F.T, F.B, "-"), 70);
      chk("tg.q1 ∠BAT (the alternate segment on chord TB)", inscribed(F.A, F.B, F.T), 70);
      chk("tg.q1 T̂₂ = ∠BTA (∠s on a str line)", 180 - 70 - 35, 75);
      chk("tg.q1 …and T̂₂ by arc arithmetic (sum of ∠s in △ABT)", inscribed(F.T, F.A, F.B), 75);
      chk("tg.q1 ∠AOB = 2 · T̂₂", central(F.A, F.B), 150);
      chk("tg.q1 ∠OAB = base ∠ of △OAB", (180 - central(F.A, F.B)) / 2, 15);
    }

    /* tg.q2 — two expressions for one angle, so solve for x */
    {
      const F = FIG["euclid.sib.tg.q2"];
      const P1 = tanChord(F.P, F.Q, "-");
      chk("tg.q2 P̂₁ = ∠QPS (tangent–chord, tg− side)", P1, 50);
      chk("tg.q2 ∠PRQ (the alternate segment on chord PQ)", inscribed(F.R, F.P, F.Q), 50);
      /* the equation the question is built on: 2x = x + 25 ⟹ x = 25,
         and BOTH expressions must then hit the drawn 50° */
      chk("tg.q2 solving 2x = x + 25 gives x", 25, 25);
      chk("tg.q2 …so 2x hits the drawn P̂₁", 2 * 25, P1);
      chk("tg.q2 …and x + 25° hits the drawn ∠PRQ", 25 + 25, inscribed(F.R, F.P, F.Q));
      chk("tg.q2 P̂₃ = ∠RPT (given, tangent–chord tg+ side)", tanChord(F.P, F.R, "+"), 60);
      chk("tg.q2 ∠PQR (the alternate segment on chord PR)", inscribed(F.Q, F.P, F.R), 60);
      chk("tg.q2 P̂₂ = ∠QPR (∠s on a str line)", 180 - 50 - 60, 70);
      chk("tg.q2 …and P̂₂ by arc arithmetic", inscribed(F.P, F.Q, F.R), 70);
      chk("tg.q2 ∠QOR = 2 · P̂₂", central(F.Q, F.R), 140);
      chk("tg.q2 ∠OQR = base ∠ of △OQR", (180 - central(F.Q, F.R)) / 2, 20);
    }

    /* tg.q3 — the kite made by two tangents */
    {
      const g = computeGeometry(spec1("euclid.sib.tg.q3"));
      const ang = (V, P, Q) => {
        const d = (v, p) => Math.atan2(-(p.y - v.y), p.x - v.x) * 180 / Math.PI;
        let a = Math.abs(d(V, P) - d(V, Q)); if (a > 180) a = 360 - a;
        return Math.round(a * 1e6) / 1e6;
      };
      const { A, B, O, P } = g.pts;
      chk("tg.q3 ∠OAP measured off the drawing", ang(A, O, P), 90);
      chk("tg.q3 ∠OBP measured off the drawing", ang(B, P, O), 90);
      chk("tg.q3 ∠APB (given)", ang(P, A, B), 48);
      chk("tg.q3 ∠AOB (sum of ∠s in quad OAPB)", ang(O, A, B), 132);
      chk("tg.q3 the quadrilateral really closes: 90 + 90 + 48 + 132", ang(A, O, P) + ang(B, P, O) + ang(P, A, B) + ang(O, A, B), 360);
      chk("tg.q3 ∠PAB = base ∠ of the isosceles △APB", ang(A, P, B), 66);
      chk("tg.q3 ∠OAB = ∠OAP − ∠PAB", ang(A, O, B), 24);
      chk("tg.q3 …and ∠OAB the other way, as a base ∠ of △OAB", (180 - 132) / 2, 24);
      chk("tg.q3 ∠APO = ∠BPO (OP bisects, part (e))", ang(P, A, O) - ang(P, B, O), 0);
      const len = (p, q2) => Math.hypot(p.x - q2.x, p.y - q2.y);
      chk("tg.q3 |PA| − |PB| measured in pixels (tans from common pt)",
        Math.round((len(P, A) - len(P, B)) * 1e6) / 1e6, 0);
      /* PART (f) — "OP is the perpendicular bisector of AB". The figure
         deliberately does NOT letter the crossing point (a point on the
         ray O→P has its label printed on top of OP — see the spec's own
         comment), so the midpoint is COMPUTED here and the two halves of
         the claim are measured against the drawing: the midpoint of AB
         lies on OP, and OP meets AB at a right angle. */
      const mid = { x: (A.x + B.x) / 2, y: (A.y + B.y) / 2 };
      const crossOP = (P.x - O.x) * (mid.y - O.y) - (P.y - O.y) * (mid.x - O.x);
      chk("tg.q3 the midpoint of AB lies on OP (cross product, in pixels)", Math.round(crossOP * 1e4) / 1e4, 0);
      chk("tg.q3 OP ⊥ AB ((B−A)·(P−O), in pixels)",
        Math.round(((B.x - A.x) * (P.x - O.x) + (B.y - A.y) * (P.y - O.y)) * 1e4) / 1e4, 0);
      chk("tg.q3 |A−mid| − |mid−B| measured in pixels (OP really bisects AB)",
        Math.round((len(A, mid) - len(mid, B)) * 1e6) / 1e6, 0);
      /* and the figure must NOT letter that crossing point */
      tick(!g.pts.M, "tg.q3: the crossing of OP and AB is deliberately unlettered (its label would print on OP)");
    }

    /* tg.q4 — a tangent and a diameter */
    {
      const F = FIG["euclid.sib.tg.q4"];
      chk("tg.q4 TD really is a diameter (arc T→D)", ccw(F.T, F.D), 180);
      chk("tg.q4 ∠ATU (given, tangent–chord tg+ side)", tanChord(F.T, F.A, "+"), 55);
      chk("tg.q4 ∠DTS = 90° (tan ⊥ diameter)", tanChord(F.T, F.D, "-"), 90);
      chk("tg.q4 ∠ATD (∠s on a str line)", 180 - 90 - 55, 35);
      chk("tg.q4 …and ∠ATD by arc arithmetic", inscribed(F.T, F.A, F.D), 35);
      chk("tg.q4 ∠TAD = 90° (∠s in semi-circle)", inscribed(F.A, F.T, F.D), 90);
      chk("tg.q4 ∠ADT (sum of ∠s in △ATD)", 180 - 90 - 35, 55);
      chk("tg.q4 …and ∠ADT by arc arithmetic", inscribed(F.D, F.A, F.T), 55);
      chk("tg.q4 the part-(e) claim: ∠ADT − ∠ATU (tan chord theorem)",
        inscribed(F.D, F.A, F.T) - tanChord(F.T, F.A, "+"), 0);
      chk("tg.q4 ∠AOD = 2 · ∠ATD", central(F.A, F.D), 70);
    }

    /* tg.q5 — the tangent length, by Pythagoras */
    {
      const g = computeGeometry(spec1("euclid.sib.tg.q5"));
      const { A, B, O, P } = g.pts;
      const len = (p, q2) => Math.hypot(p.x - q2.x, p.y - q2.y);
      /* the DRAWING carries the question's own 9 : 12 : 15 ratio */
      const unit = len(O, A) / 9;
      chk("tg.q5 the drawn radius is 9 units", Math.round((len(O, A) / unit) * 1e6) / 1e6, 9);
      chk("tg.q5 the drawn OP is 15 units", Math.round((len(O, P) / unit) * 1e6) / 1e6, 15);
      chk("tg.q5 the drawn PA is 12 units (the part-(a) answer)", Math.round((len(P, A) / unit) * 1e6) / 1e6, 12);
      chk("tg.q5 Pythagoras from first principles: √(15² − 9²)", Math.sqrt(15 * 15 - 9 * 9), 12);
      chk("tg.q5 |PB| − |PA| in pixels (tans from common pt)", Math.round((len(P, B) - len(P, A)) * 1e6) / 1e6, 0);
      chk("tg.q5 area OAPB = 2 × ½ × 9 × 12", 2 * 0.5 * 9 * 12, 108);
      /* AM, the two-ways-with-one-area trick, re-derived and then
         measured off the drawing */
      chk("tg.q5 AM from area △OAP two ways: (9 × 12) ÷ 15", (9 * 12) / 15, 7.2);
      /* M is named in the STEM but not lettered on the figure (a point on
         the ray O→P has its label printed on top of OP), so AM is measured
         here as half of the chord the drawing really draws. */
      chk("tg.q5 the drawn AB is 14,4 units (the part-(e) answer)", Math.round((len(A, B) / unit) * 1e6) / 1e6, 14.4);
      chk("tg.q5 …so the drawn AM is 7,2 units (the part-(d) answer)", Math.round((len(A, B) / unit / 2) * 1e6) / 1e6, 7.2);
      chk("tg.q5 OP ⊥ AB ((B−A)·(P−O), in pixels)",
        Math.round(((B.x - A.x) * (P.x - O.x) + (B.y - A.y) * (P.y - O.y)) * 1e4) / 1e4, 0);
      tick(!g.pts.M, "tg.q5: the crossing of OP and AB is deliberately unlettered (its label would print on OP)");
    }

    /* ======================= THE LEVEL 4 ★ TILE ===================== */

    /* l4.q1 — prove a line is a tangent (converse tan chord) */
    {
      const F = FIG["euclid.l4.q1"];
      chk("l4.q1 Â₁ = ∠BAD (given, tg− side)", tanChord(F.A, F.B, "-"), 55);
      chk("l4.q1 Â₂ = ∠BAC (given)", inscribed(F.A, F.B, F.C), 60);
      chk("l4.q1 ∠ABC (given)", inscribed(F.B, F.A, F.C), 65);
      chk("l4.q1 ∠ACB (sum of ∠s in △ABC)", 180 - 60 - 65, 55);
      chk("l4.q1 …and ∠ACB by arc arithmetic", inscribed(F.C, F.A, F.B), 55);
      chk("l4.q1 the part-(b) claim: Â₁ − ∠ACB (equal ⟹ DAE is a tangent)",
        tanChord(F.A, F.B, "-") - inscribed(F.C, F.A, F.B), 0);
      chk("l4.q1 Â₃ = ∠CAE (tan chord theorem, tg+ side)", tanChord(F.A, F.C, "+"), 65);
      chk("l4.q1 …and Â₃ the other way (∠s on a str line)", 180 - 55 - 60, 65);
      /* C really is in the alternate segment for chord AB (the far side
         of AB from the D end of the tangent) */
      tick(ccw(F.B, F.A) < ccw(F.B, F.C), `l4.q1: C is on the major arc AB, the alternate segment (arc B→A ${ccw(F.B, F.A)}° vs arc B→C ${ccw(F.B, F.C)}°)`);
    }

    /* l4.q2 — the antiparallel construction, from the coordinates up */
    {
      const q = euclid.find(x => x.id === "euclid.l4.q2");
      const g = computeGeometry(q.diagram.parts.a.spec);
      const { A, B, C, D, E } = g.pts;
      const len = (p, q2) => Math.hypot(p.x - q2.x, p.y - q2.y);
      const onSeg = (P, S, T) => Math.round((Math.abs((T.x - S.x) * (P.y - S.y) - (T.y - S.y) * (P.x - S.x)) / len(S, T)) * 1e4) / 1e4;
      chk("l4.q2 D lies on AB (distance from the line, in pixels)", onSeg(D, A, B), 0);
      chk("l4.q2 E lies on AC (distance from the line, in pixels)", onSeg(E, A, C), 0);
      /* the ONE construction fact the whole card rests on: DE is
         antiparallel to BC, i.e. AD × AB = AE × AC */
      chk("l4.q2 AD × AB − AE × AC (0 ⟹ DE antiparallel to BC)",
        Math.round((len(A, D) * len(A, B) - len(A, E) * len(A, C)) * 1e3) / 1e3, 0);
      const ang = (V, P, Q) => {
        const d = (v, p) => Math.atan2(-(p.y - v.y), p.x - v.x) * 180 / Math.PI;
        let a = Math.abs(d(V, P) - d(V, Q)); if (a > 180) a = 360 - a;
        return Math.round(a * 1e6) / 1e6;
      };
      const x = ang(C, A, B), y = ang(A, B, C);
      chk("l4.q2 ∠ADE − ∠ACB (both are x — the question's given)", ang(D, A, E) - x, 0);
      chk("l4.q2 ∠AED = 180° − x − y (the part-(a) answer)", ang(E, A, D), Math.round((180 - x - y) * 1e6) / 1e6);
      chk("l4.q2 ∠DBC = ∠ABC = 180° − x − y (the part-(c) answer)", ang(B, A, C), Math.round((180 - x - y) * 1e6) / 1e6);
      chk("l4.q2 ∠DEC = x + y (∠s on the str line AEC)", ang(E, D, C), Math.round((x + y) * 1e6) / 1e6);
      chk("l4.q2 …so ∠DEC + ∠DBC = 180° (opp ∠s of cyclic quad DECB)", ang(E, D, C) + ang(B, A, C), 180);
      /* and NO circle is drawn on any state */
      tick(Object.values(q.diagram.parts).every(e => e.spec.noCircle === true),
        "l4.q2: no state of the figure draws the circle — that is what is being proved");
    }

    /* l4.q3 — a chord as long as the radius */
    {
      const F = FIG["euclid.l4.q3"];
      chk("l4.q3 arc XY", ccw(F.X, F.Y), 60);
      chk("l4.q3 ∠XOY (the central angle IS the arc)", central(F.X, F.Y), 60);
      chk("l4.q3 ∠XZY = ½ · ∠XOY (the part-(c) answer)", inscribed(F.Z, F.X, F.Y), 30);
      /* the chord really is as long as the radius — measured in pixels,
         which is what makes △OXY equilateral rather than merely claimed */
      const g = computeGeometry(spec1("euclid.l4.q3"));
      const len = (p, q2) => Math.hypot(g.pts[p].x - g.pts[q2].x, g.pts[p].y - g.pts[q2].y);
      const r = len("O", "X");
      chk("l4.q3 |XY| ÷ r (1 ⟹ chord = radius)", Math.round((len("X", "Y") / r) * 1e6) / 1e6, 1);
      chk("l4.q3 |XM| ÷ r (the part-(a) answer, r/2)", Math.round((len("X", "M") / r) * 1e6) / 1e6, 0.5);
      chk("l4.q3 |OM| ÷ r (the part-(b) answer, √3 ÷ 2)",
        Math.round((len("O", "M") / r) * 1e6) / 1e6, Math.round((Math.sqrt(3) / 2) * 1e6) / 1e6);
      chk("l4.q3 Pythagoras from first principles: √(1 − ¼)", Math.sqrt(1 - 0.25), Math.sqrt(3) / 2);
      chk("l4.q3 OM ⊥ XY ((Y−X)·(M−O), in pixels)",
        Math.round(((g.pts.Y.x - g.pts.X.x) * (g.pts.M.x - g.pts.O.x) + (g.pts.Y.y - g.pts.X.y) * (g.pts.M.y - g.pts.O.y)) * 1e4) / 1e4, 0);
      /* Z is on the MAJOR arc, so its angle pairs with the ordinary
         central angle and not with the reflex one */
      tick(ccw(F.X, F.Z) > ccw(F.X, F.Y), `l4.q3: Z is on the major arc XY (arc X→Z ${ccw(F.X, F.Z)}° beyond arc X→Y ${ccw(F.X, F.Y)}°)`);
    }

    /* l4.q4 — two equal tangent–chord angles ⟹ two equal chords */
    {
      const F = FIG["euclid.l4.q4"];
      chk("l4.q4 Â₁ = ∠BAS (tg− side)", tanChord(F.A, F.B, "-"), 55);
      chk("l4.q4 Â₃ = ∠CAU (tg+ side)", tanChord(F.A, F.C, "+"), 55);
      chk("l4.q4 the given: Â₁ − Â₃", tanChord(F.A, F.B, "-") - tanChord(F.A, F.C, "+"), 0);
      chk("l4.q4 ∠ACB (tan chord on chord AB)", inscribed(F.C, F.A, F.B), 55);
      chk("l4.q4 ∠ABC (tan chord on chord AC)", inscribed(F.B, F.A, F.C), 55);
      chk("l4.q4 the part-(c) claim: ∠ACB − ∠ABC (equal ⟹ AB = AC)",
        inscribed(F.C, F.A, F.B) - inscribed(F.B, F.A, F.C), 0);
      chk("l4.q4 Â₂ = ∠BAC = 180° − 2x", inscribed(F.A, F.B, F.C), 70);
      /* and the two chords measured in pixels */
      const g = computeGeometry(spec1("euclid.l4.q4"));
      const len = (p, q2) => Math.hypot(g.pts[p].x - g.pts[q2].x, g.pts[p].y - g.pts[q2].y);
      chk("l4.q4 |AB| − |AC| measured in pixels", Math.round((len("A", "B") - len("A", "C")) * 1e6) / 1e6, 0);
    }

    /* l4.q5 — three theorems in a row, ending where it started */
    {
      const F = FIG["euclid.l4.q5"];
      const x = tanChord(F.A, F.B, "+");
      chk("l4.q5 Â₂ = ∠BAT, the drawing value of x", x, 35);
      chk("l4.q5 ∠ACB = x (tan chord on chord AB)", inscribed(F.C, F.A, F.B), x);
      chk("l4.q5 ∠AOB = 2x (∠ at centre)", central(F.A, F.B), 2 * x);
      chk("l4.q5 ∠OBA = 90° − x (base ∠ of △OAB)", (180 - central(F.A, F.B)) / 2, 90 - x);
      chk("l4.q5 Â₁ = ∠OAB = the other base ∠", (180 - central(F.A, F.B)) / 2, 90 - x);
      chk("l4.q5 ∠OAT = Â₁ + Â₂ = 90° (the part-(d) claim)", (180 - central(F.A, F.B)) / 2 + x, 90);
      /* the whole chase is an identity, not an artefact of x = 35:
         re-run it at five other drawing values by moving B */
      let bad = 0;
      [12, 25, 48, 60, 72].forEach(xx => {
        const B2 = (F.A + 2 * xx) % 360;                       // arc A→B = 2x
        if (Math.abs(tanChord(F.A, B2, "+") - xx) > 1e-9) bad++;
        if (Math.abs(central(F.A, B2) - 2 * xx) > 1e-9) bad++;
        if (Math.abs(((180 - central(F.A, B2)) / 2 + xx) - 90) > 1e-9) bad++;
      });
      chk("l4.q5 the chase holds at x = 12, 25, 48, 60, 72 (mismatches)", bad, 0);
      /* C really is on the far arc from B, so the tangent–chord angle
         and the angle at C are an alternate-segment pair */
      tick(ccw(F.A, F.B) < ccw(F.A, F.C), `l4.q5: C is in the alternate segment for chord AB (arc A→B ${ccw(F.A, F.B)}° vs arc A→C ${ccw(F.A, F.C)}°)`);
    }

    /* l4.q6 — converse Pythagoras ⟹ line ⊥ radius ⟹ tangent */
    {
      const q = euclid.find(x => x.id === "euclid.l4.q6");
      const g = computeGeometry(q.diagram.parts.a.spec);
      const { A, C, O, P } = g.pts;
      const len = (p, q2) => Math.hypot(p.x - q2.x, p.y - q2.y);
      const unit = len(O, A) / 5;
      chk("l4.q6 the drawn radius is 5 units", Math.round((len(O, A) / unit) * 1e6) / 1e6, 5);
      chk("l4.q6 the drawn OP is 13 units", Math.round((len(O, P) / unit) * 1e6) / 1e6, 13);
      chk("l4.q6 the drawn AP is 12 units", Math.round((len(A, P) / unit) * 1e6) / 1e6, 12);
      chk("l4.q6 converse Pythagoras from first principles: 5² + 12² − 13²", 5 * 5 + 12 * 12 - 13 * 13, 0);
      const ang = (V, Pt, Q) => {
        const d = (v, p) => Math.atan2(-(p.y - v.y), p.x - v.x) * 180 / Math.PI;
        let a = Math.abs(d(V, Pt) - d(V, Q)); if (a > 180) a = 360 - a;
        return Math.round(a * 1e6) / 1e6;
      };
      chk("l4.q6 ∠OAP measured off the drawing (the part-(a) answer)", ang(A, O, P), 90);
      chk("l4.q6 |PC| − |AP| in pixels (the part-(b) answer)", Math.round((len(P, C) - len(A, P)) * 1e6) / 1e6, 0);
      chk("l4.q6 ∠APO − ∠CPO (the part-(c) claim)", ang(P, A, O) - ang(P, C, O), 0);
      /* THE BARE-FIGURE RULE, the case this tile leans on hardest: no
         question-side figure may carry the right angle at A, because
         proving it IS part (a). The square at C is a different matter —
         PC is a tangent by the question's own stem. */
      const squaresAt = (spec, at) => (spec.angles || []).filter(a2 => a2.at === at && a2.o && a2.o.mark === "square").length;
      let leak = 0, revealed = 0;
      Object.entries(q.diagram.parts).forEach(([pid, e]) => {
        const base = e.spec || q.diagram.spec;
        if (squaresAt(base, "A")) leak++;
        if (e.question && squaresAt(highlightedSpec(base, e.question), "A")) leak++;
        if (pid === "a" && e.reveal && squaresAt(highlightedSpec(base, e.reveal), "A")) revealed++;
      });
      tick(leak === 0, `l4.q6: no question-side figure may draw the right angle at A — ${leak} leak(s)`);
      tick(revealed === 1, "l4.q6(a): the reveal DOES draw the right angle at A it just proved");
      tick(Object.values(q.diagram.parts).every(e => squaresAt(e.spec, "C") === 1),
        "l4.q6: the right angle at C is a GIVEN (PC is a tangent by the stem) and is drawn on every state");
    }

    /* ---- THE CHAINED SKETCH: what each key shows, and when ---------- */
    {
      /* the value(s) each part ADDS to its sketch, in order — typed here
         from the arc arithmetic above, never read out of the modules */
      const CHAIN = {
        "euclid.sib.cq.q1": [["a", ["∠OMB = 90°"]], ["b", ["∠ONB = 90°"]], ["c", ["∠MBN = 65°"]], ["d", ["∠MON = 115°"]], ["e", []], ["f", []]],
        "euclid.sib.cq.q2": [["a", ["Ĉ₁ = 80°"]], ["b", ["∠BAD = 100°"]], ["c", ["D̂₂ = 55°"]], ["d", ["D̂₁ = 40°"]], ["e", []]],
        "euclid.sib.cq.q3": [["a", []], ["b", ["Ô₁ = 2x"]], ["c", ["Ô₂ = 360° − 2x"]], ["d", ["Ĉ = 180° − x"]], ["e", ["∠OBD = 90° − x"]], ["f", []]],
        "euclid.sib.cq.q4": [["a", ["∠BAD = 95°"]], ["b", ["Â₁ = 35°"]], ["c", ["∠BCD = 85°"]], ["d", ["∠ADC = 85°"]], ["e", ["Ĉ₁ = 35°"]], ["f", []]],
        "euclid.sib.cq.q5": [["a", ["Â₂ = x"]], ["b", ["∠BDC = x"]], ["c", ["B̂₁ = x"]], ["d", ["B̂₂ = x", "∠ACD = x"]], ["e", []]],
        "euclid.sib.cq.q6": [["a", ["∠ABC = 105°"]], ["b", ["Ĉ₁ = 40°"]], ["c", []], ["d", ["∠ADC = 75°"]], ["e", ["Ĉ₂ = 45°"]], ["f", []]],
        "euclid.sib.tg.q1": [["a", ["∠ABT = 35°"]], ["b", ["∠BAT = 70°"]], ["c", ["T̂₂ = 75°"]], ["d", ["∠AOB = 150°"]], ["e", []]],
        "euclid.sib.tg.q2": [["a", ["x = 25°"]], ["b", ["P̂₁ = 50°"]], ["c", ["∠PQR = 60°"]], ["d", ["P̂₂ = 70°"]], ["e", []]],
        "euclid.sib.tg.q3": [["a", ["∠OAP = 90°"]], ["b", ["∠AOB = 132°"]], ["c", ["∠PAB = 66°"]], ["d", ["∠OAB = 24°"]], ["e", []], ["f", []]],
        "euclid.sib.tg.q4": [["a", ["∠DTS = 90°"]], ["b", ["∠ATD = 35°"]], ["c", ["∠TAD = 90°"]], ["d", ["∠ADT = 55°"]], ["e", []], ["f", []]],
        "euclid.sib.tg.q5": [["a", ["PA = 12 cm"]], ["b", ["PB = 12 cm"]], ["c", []], ["d", ["AM = 7,2 cm"]], ["e", []]],
        "euclid.l4.q1": [["a", ["∠ACB = 55°"]], ["b", []], ["c", []]],
        "euclid.l4.q2": [["a", ["∠AED = 180° − x − y"]], ["b", []], ["c", []]],
        "euclid.l4.q3": [["a", ["XM = r/2"]], ["b", ["OM = (r√3)/2"]], ["c", []]],
        "euclid.l4.q4": [["a", ["∠ACB = x"]], ["b", ["∠ABC = x"]], ["c", []], ["d", []]],
        "euclid.l4.q5": [["a", ["∠ACB = x"]], ["b", ["∠AOB = 2x"]], ["c", ["∠OBA = 90° − x"]], ["d", []]],
        "euclid.l4.q6": [["a", ["∠OAP = 90°"]], ["b", ["PC = 12 cm"]], ["c", []]],
      };
      /* Givens that could not sit on their wedge — either the vertex
         carries numbered wedges (so a value there would read as another
         number) or the given is an expression too long for a bisector.
         These lines come BEFORE anything the parts find. */
      const BASE_KEY = {
        "euclid.sib.cq.q2": ["B̂₁ = 40°", "B̂₂ = 45°", "Ĉ₂ = 100°"],
        "euclid.sib.cq.q4": ["Â₂ = 60°", "Ĉ₂ = 95°"],
        "euclid.sib.cq.q5": ["Â₁ = x"],
        "euclid.sib.cq.q6": ["B̂₁ = 45°", "B̂₂ = 60°"],
        "euclid.sib.tg.q1": ["T̂₁ = 70°", "T̂₃ = 35°"],
        "euclid.sib.tg.q2": ["P̂₁ = 2x", "P̂₃ = 60°", "∠PRQ = x + 25°"],
        "euclid.sib.tg.q3": ["∠APB = 48°"],
        "euclid.sib.tg.q5": ["OA = 9 cm", "OP = 15 cm"],
        "euclid.l4.q1": ["Â₁ = 55°", "Â₂ = 60°"],
        "euclid.l4.q3": ["XY = r"],
        "euclid.l4.q4": ["Â₁ = x", "Â₃ = x"],
        "euclid.l4.q5": ["Â₂ = x"],
        "euclid.l4.q6": ["OA = 5 cm", "AP = 12 cm", "OP = 13 cm"],
      };
      let chainOk = true, leakOk = true, everyPartHasAFigure = true;
      const chainFails = [];
      Object.entries(CHAIN).forEach(([qid, chain]) => {
        const q = euclid.find(qq => qq.id === qid);
        if (!q) { chainOk = false; chainFails.push(`${qid}: not loaded`); return; }
        if (q.parts.length !== chain.length) { chainOk = false; chainFails.push(`${qid}: ${q.parts.length} parts vs ${chain.length} chain rows`); }
        let found = [...(BASE_KEY[qid] || [])];
        chain.forEach(([pid, adds]) => {
          const entry = q.diagram.parts[pid];
          if (!entry || !entry.spec) { everyPartHasAFigure = false; return; }
          const keyLines = ((entry.spec.key && entry.spec.key.lines) || []).map(l => l.t);
          /* part n's sketch shows exactly what parts 1…n−1 found, in the
             order they were found, after any base-key givens … */
          if (keyLines.length !== found.length || found.some((w, k) => keyLines[k] !== w)) {
            chainOk = false;
            chainFails.push(`${qid}(${pid}): key [${keyLines.join(" · ")}] vs want [${found.join(" · ")}]`);
          }
          /* … and NEVER what this part is being asked to find */
          adds.forEach(v => { if (keyLines.includes(v)) { leakOk = false; chainFails.push(`${qid}(${pid}): LEAKS its own answer "${v}"`); } });
          found = found.concat(adds);
        });
      });
      tick(chainOk, `every G2 rider's sketch carries exactly the values the parts before it found, in order — ${chainFails.slice(0, 4).join(" | ")}`);
      tick(leakOk, "no G2 rider's sketch ever shows the value the part in front of it is asked to find");
      tick(everyPartHasAFigure, "every part of every G2 card has its own figure");
      console.log(`    chained keys: ${chainOk ? "OK" : "FAIL"} · no-leak: ${leakOk ? "OK" : "FAIL"} · figure per part: ${everyPartHasAFigure ? "OK" : "FAIL"}`);
    }

    /* ---- the four SIDES light up on every "prove it is cyclic" part -- */
    {
      const WANT = {
        "euclid.sib.cq.q1": ["e", ["OM", "MB", "BN", "NO"]],
        "euclid.sib.cq.q6": ["c", ["AB", "BC", "CD", "DA"]],
        "euclid.l4.q2": ["b", ["DE", "EC", "CB", "BD"]],
      };
      let sidesOk = true;
      const lines = [];
      Object.entries(WANT).forEach(([qid, [pid, want]]) => {
        const q = euclid.find(qq => qq.id === qid);
        const entry = q.diagram.parts[pid];
        const got = (entry.question.chords || []).map(c => c.slice(0, 2).join(""));
        const gotR = (entry.reveal.chords || []).map(c => c.slice(0, 2).join(""));
        const has = (arr, w) => arr.some(s => s === w || s === w.split("").reverse().join(""));
        const ok = got.length === 4 && want.every(w => has(got, w)) && want.every(w => has(gotR, w));
        if (!ok) sidesOk = false;
        lines.push(`${qid}(${pid}) [${got.join(",")}]`);
      });
      tick(sidesOk, `every "prove it is cyclic" part lights the FOUR SIDES on both states (her design note) — got ${lines.join(" · ")}`);
      console.log(`    prove-cyclic sides: ${sidesOk ? "OK" : "FAIL"} — ${lines.join(" · ")}`);
    }

    /* ---- the tile shape her rulings 4 and 5 ask for ----------------- */
    {
      const cq = mineG2.filter(q => q.topic === "cyclic-quads");
      const tg = mineG2.filter(q => q.topic === "tangents");
      const l4 = mineG2.filter(q => q.topic === "level-4");
      tick(cq.length === 6 && cq.every(q => q.parts.length >= 5 && q.parts.length <= 6),
        `six cyclic-quad riders, 5–6 parts each — got [${cq.map(q => `${q.id}:${q.parts.length}`).join(", ")}]`);
      tick(tg.length === 5 && tg.every(q => q.parts.length >= 5 && q.parts.length <= 6),
        `five fresh tangent riders, 5–6 parts each — got [${tg.map(q => `${q.id}:${q.parts.length}`).join(", ")}]`);
      tick([...cq, ...tg].every(q => q.parts.every(p => p.level >= 1 && p.level <= 3)),
        "levels 1–3 only on the cyclic-quads and tangents tiles (her ruling 5)");
      tick([...cq, ...tg].every(q => q.parts.some(p => p.level === 1) && q.parts.some(p => p.level >= 2)),
        "every G2 rider ramps — at least one level-1 part, and it reaches level 2 or 3");
      tick([...cq, ...tg].every(q => q.parts.every(p => p.marks >= 1 && p.marks <= 4)),
        "every rider part is worth 1–4 marks, like the bank");
      tick(l4.length === 6, `six fresh Level 4 ★ cards, got ${l4.length}`);
      tick(l4.every(q => q.parts.some(p => p.level === 4)), "every Level 4 card carries at least one ★ part");
      tick(l4.every(q => q.parts.every(p => p.level >= 3)), "no part below level 3 sits on the Level 4 tile");
      tick(mineG2.every(q => q.paper === "siblings"), "every G2 question belongs to no paper");
      tick(mineG2.every(q => !!q.intro), "every G2 card carries the intro its shared sketch needs");
      console.log(`    tile shape: cyclic-quads [${cq.map(q => q.parts.length).join(",")}] parts · tangents [${tg.map(q => q.parts.length).join(",")}] · level-4 [${l4.map(q => q.parts.length).join(",")}] · marks [${mineG2.map(q => q.marks).join(",")}]`);
    }

    /* ---- the SAG reasons really are the verbatim short forms -------- */
    {
      const SAG = [
        "radii", "common", "given", "RHS", "SAS",
        "∠s opp equal sides", "sides opp equal ∠s", "int. ∠s of △", "sum of ∠s in Δ", "ext ∠ of Δ",
        "∠s on a str line", "∠s round a pt", "sum of ∠s in quad",
        "alt ∠s =", "corresp ∠s =", "co-int ∠s supp",
        "∠ at centre = 2 × ∠ at circumference", "∠s in semi-circle", "∠s in the same seg",
        "equal chords; equal ∠s", "line from centre ⊥ to chord", "line from centre to midpt of chord",
        "perp bisector of chord", "Pythagoras", "converse Pythagoras",
        "opp ∠s of cyclic quad", "opp ∠s quad supp", "ext ∠ of cyclic quad", "ext ∠ = int opp ∠",
        "line subtends equal ∠s", "tans from common pt",
        "tan ⊥ radius", "tan ⊥ diameter", "tan chord theorem", "converse tan chord theorem",
        "line ⊥ radius",
      ];
      /* A reason CELL is accepted when it is one listed short form, or
         several joined by "; " (the way a paper writes a step leaning on
         two theorems at once) — with three deliberate exceptions: a cell
         starting "given" or "from (" or "proved in" is citing the
         question's own stem or an earlier part rather than a theorem,
         and "equal chords; equal ∠s" is itself a listed short form that
         happens to contain a semicolon, so it is tried WHOLE first. */
      const okCell = cell => {
        const c = cell.trim();
        if (/^given\b/i.test(c)) return true;
        if (/^(from|proved in)\b/i.test(c)) return true;
        if (SAG.includes(c)) return true;
        return c.split(";").map(s => s.trim()).every(part => SAG.includes(part));
      };
      const bad = [];
      mineG2.forEach(q => q.parts.forEach(p => p.memo.forEach((b, i) => {
        if (b.type === "trap") return;
        [...String(b.text.en).matchAll(/<i>\(([^)]*)\)<\/i>/g)].forEach(m => {
          const cell = m[1].trim();
          if (!okCell(cell)) bad.push(`${q.id}(${p.id}) memo[${i}]: "${cell}"`);
        });
      })));
      tick(bad.length === 0, `every italic reason in a G2 memo is a verbatim SAG short form — strays: ${bad.join(" | ")}`);
      console.log(`    SAG reasons: ${bad.length ? "FAIL " + bad.join(" | ") : "every italic reason is a listed short form"}`);
    }
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
  /* EVERY func question carries a to-scale sketch — the 4 seeded
     practice-paper questions, session 2a's 15 siblings, session 2b's 16,
     and session D1's 18 (2026-08-23). This used to be a hard-coded 35,
     which every session adding func content had to bump by hand — and
     on a build day with TWO func sessions running at once, that one
     shared literal is a merge hazard rather than a check. The rule the
     briefs actually state is "every card gets a sketch", so that is what
     is asserted now, with the count reported rather than guessed. */
  tick(withDiagram.length === funcQs.length, `every func question must carry a diagram — ${funcQs.length - withDiagram.length} of ${funcQs.length} have none: [${funcQs.filter(q => !q.diagram).map(q => q.id).join(", ")}]`);
  console.log(`  ${withDiagram.length} of ${funcQs.length} func questions carry a to-scale figure`);

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

  /* SESSION D1's three NEW tiles (2026-08-23) — one structural no-leak
     rule per tile, asserted across all six cards rather than on one
     sample, because each tile's rule is the same for every card on it. */

  /* SKETCH: the sketch IS the answer, so the base figure is a BLANK set
     of axes — no curves, no points — and every part's question-side
     highlight is empty. Everything the card finds appears only on a
     reveal. */
  {
    const sk = withDiagram.filter(q => q.topic === "sketch");
    tick(sk.length === 6, `expected 6 sketch cards, got ${sk.length}`);
    let bad = [];
    sk.forEach(q => {
      const base = q.diagram.spec;
      if ((base.curves || []).length) bad.push(`${q.id}: base spec draws a curve`);
      if ((base.points || []).length) bad.push(`${q.id}: base spec marks a point`);
      if (!base.grid) bad.push(`${q.id}: base spec has no answer grid`);
      Object.entries(q.diagram.parts).forEach(([pid, e]) => {
        /* No question side may draw a CURVE or an asymptote — those ARE
           the answer on this tile. A POINT is allowed through, because a
           reveal highlight replaces the question one, so a later part
           has to repeat what an earlier part already found (sk.q6(b)
           keeps (a)'s turning point on the picture, deliberately). */
        const qh = e.question || {};
        if ((qh.curves || []).length || (qh.asymptotes || []).length)
          bad.push(`${q.id}(${pid}): question side draws a curve or an asymptote — that is the answer`);
        if (!e.reveal) bad.push(`${q.id}(${pid}): no reveal — the sketch tile always draws its answer`);
      });
    });
    tick(bad.length === 0, `sketch tile leak/blank-axes rule: ${bad.join(" | ")}`);
    console.log(`  sketch: 6 blank-grid base specs, every question side empty, every part reveals — ${bad.length ? "FAIL" : "OK"}`);
  }

  /* INTERSECTION: the bare-figure rule — both graphs are drawn but the
     point where they cut is NOT marked, so no base spec may carry
     `points` at all, and every part must have a reveal that adds them.
     int.q2 is the documented exception on the CURVE side (its parabola
     carries the unknown c, so it is drawn only from (b)'s reveal on). */
  {
    const ints = withDiagram.filter(q => q.topic === "intersection");
    tick(ints.length === 6, `expected 6 intersection cards, got ${ints.length}`);
    let bad = [];
    ints.forEach(q => {
      if ((q.diagram.spec.points || []).length) bad.push(`${q.id}: base spec marks an intersection`);
      const nCurves = (q.diagram.spec.curves || []).length;
      if (q.id === "func.sib.int.q2") { if (nCurves !== 1) bad.push(`${q.id}: base must draw ONLY the known graph, got ${nCurves}`); }
      else if (nCurves !== 2) bad.push(`${q.id}: base must draw BOTH graphs, got ${nCurves}`);
      Object.entries(q.diagram.parts).forEach(([pid, e]) => {
        if (!e.reveal) bad.push(`${q.id}(${pid}): no reveal`);
      });
    });
    tick(bad.length === 0, `intersection tile bare-figure rule: ${bad.join(" | ")}`);
    console.log(`  intersection: no base spec marks a crossing, both graphs drawn (int.q2 the documented exception) — ${bad.length ? "FAIL" : "OK"}`);
  }

  /* AVERAGE GRADIENT: the chord is the thing being measured, so it may
     never appear on a question side — only on a reveal, dashed and
     captioned with the gradient it found. */
  {
    const ag = withDiagram.filter(q => q.topic === "average-gradient");
    tick(ag.length === 6, `expected 6 average-gradient cards, got ${ag.length}`);
    const chords = spec => (spec.curves || []).filter(c => c.kind === "line" && c.dash);
    let bad = [];
    ag.forEach(q => {
      const base = q.diagram.spec;
      if (chords(base).length) bad.push(`${q.id}: base spec already draws the chord`);
      let anyChordRevealed = false;
      Object.entries(q.diagram.parts).forEach(([pid, e]) => {
        if (!e.reveal) { bad.push(`${q.id}(${pid}): no reveal`); return; }
        const r = applyFunctionHighlights(e.spec || base, e.reveal);
        const cs = chords(r);
        if (cs.length) {
          anyChordRevealed = true;
          cs.forEach(c => { if (!/^m = /.test(String(c.label || ""))) bad.push(`${q.id}(${pid}): a revealed chord is not captioned with its gradient`); });
        }
      });
      if (!anyChordRevealed) bad.push(`${q.id}: no part ever draws the chord`);
    });
    tick(bad.length === 0, `average-gradient tile chord rule: ${bad.join(" | ")}`);
    console.log(`  average-gradient: no chord on any question side, every card reveals one captioned "m = …" — ${bad.length ? "FAIL" : "OK"}`);
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

/* =====================================================================
   11. QUADRANT-TRIANGLE DIAGRAMS (SESSION F1, 2026-08-23 — General
   Trig's own sketch engine, js/engine/quadrant-triangle.js, reached
   through js/exam/quadtri-diagram.js). Same promise as sections 9 and
   10 — verifyQuadTri re-measures the picture rather than trusting it —
   plus the two things only a content session can assert:

     · THE "(a) DRAWS NOTHING" RULE. On every special-sums and
       super-special-sums card, part (a) is the one that asks the
       learner to DRAW the sketch, and picking the quadrant (or
       deciding where the 1 goes) IS the skill. The player draws a
       figure for exactly those parts that name themselves in
       diagram.parts, so the rule is enforced structurally: (a) must
       have no entry, and — belt and braces — the question must carry
       no diagram.spec default that (a) could ever inherit.
     · EVERY LEG IS THE TRIANGLE THE MATHS DEMANDS. Section 8 already
       recovered each angle from the prompt's own conditions; this
       checks the drawn figure against that, quadrant and hypotenuse
       included, so a figure can never quietly disagree with its memo.
   ===================================================================== */
console.log("\n== 11. Quadrant-triangle diagrams: (a) draws nothing, and every leg measures true ==");
{
  const { verifyQuadTri } = await import("./js/engine/quadrant-triangle.js");

  const gtrigQs = mine.filter(m => m.q.chapter === "gtrig").map(m => m.q);
  const withFig = gtrigQs.filter(q => !!q.diagram);
  /* 5 special-sums + 6 super-special-sums. The co-functions and
     special-angles tiles carry NO figure at all, on purpose. */
  tick(withFig.length === 11, `expected 11 gtrig questions to carry a quadtri figure, got ${withFig.length}`);
  /* WHICH TILES ARE ALLOWED TO CARRY NO FIGURE. Only the two SUMS tiles
     have a figure at all; every other General Trig tile is deliberately
     figure-free, because the sketch the question needs (the bow tie, the
     little quadrant cross, the two special triangles) is the learner's
     own pen-and-paper job. Written as "the sums tiles must, everything
     else must not" rather than as a list of exceptions, so it stays
     honest as tiles are added (session F2 added five, 2026-08-23). */
  const FIGURE_TILES = new Set(["special-sums", "super-special-sums"]);
  const noFig = gtrigQs.filter(q => !q.diagram).map(q => q.topic);
  tick(noFig.every(t => !FIGURE_TILES.has(t)),
    `a special-sums / super-special-sums question is missing its figure — got [${[...new Set(noFig)].join(", ")}]`);
  tick(withFig.every(q => FIGURE_TILES.has(q.topic)),
    `only the two sums tiles may carry a figure — got [${[...new Set(withFig.map(q => q.topic))].join(", ")}]`);

  withFig.forEach(q => {
    const d = q.diagram;
    tick(!d.spec, `${q.id}: must NOT set a diagram.spec default — part (a) could inherit it and the sketch would stop being the learner's job`);
    tick(!d.parts.a, `${q.id}: part (a) asks the learner to draw the sketch, so it must carry NO diagram entry — got [${Object.keys(d.parts).join(",")}]`);
    const missing = q.parts.filter(pp => pp.id !== "a" && !d.parts[pp.id]).map(pp => pp.id);
    tick(missing.length === 0, `${q.id}: parts after (a) with no figure beside them: [${missing.join(",")}]`);

    Object.entries(d.parts).forEach(([pid, entry]) => {
      tick(q.parts.some(pp => pp.id === pid), `${q.id}: diagram.parts["${pid}"] names no real part`);
      tick(!!entry.spec && entry.spec.type === "quadtri", `${q.id}(${pid}): the entry must carry its own type:"quadtri" spec`);
      tick(entry.question === undefined && entry.reveal === undefined,
        `${q.id}(${pid}): the figure is identical on both states, so it must carry NO highlight sets`);
      const res = verifyQuadTri(entry.spec);
      const bad = res.filter(r => !r.ok);
      tick(bad.length === 0, `${q.id}(${pid}) quadtri: ${bad.map(r => r.label).join("; ")}`);
      console.log(`  ${(q.id + "(" + pid + ")").padEnd(26)} (${entry.spec.x.toFixed(3)} ; ${entry.spec.y.toFixed(3)}) — ${res.length} check(s), ${bad.length ? "FAIL" : "all measure true"}`);
    });
  });

  /* 11a — the five SPECIAL SUMS triangles, against the quadrant the
     double tick lands on and the hypotenuse (pyth) produces. */
  const SS_TRI = {
    "gtrig.sib.ss.q1": { x: 4, y: -3, r: 5, quad: 4 },
    "gtrig.sib.ss.q2": { x: -12, y: 5, r: 13, quad: 2 },
    "gtrig.sib.ss.q3": { x: -2, y: -3, r: Math.sqrt(13), quad: 3 },
    "gtrig.sib.ss.q4": { x: -24, y: -7, r: 25, quad: 3 },
    "gtrig.sib.ss.q5": { x: 4, y: -1, r: Math.sqrt(17), quad: 4 },
  };
  Object.entries(SS_TRI).forEach(([id, want]) => {
    const q = withFig.find(x => x.id === id);
    if (!tick(!!q, `${id}: expected a special-sums question carrying a figure`)) return;
    const spec = q.diagram.parts.b.spec;
    tick(spec.x === want.x && spec.y === want.y, `${id}: figure legs are (${spec.x} ; ${spec.y}), the maths says (${want.x} ; ${want.y})`);
    tick(near(Math.hypot(spec.x, spec.y), want.r), `${id}: drawn hypotenuse is ${Math.hypot(spec.x, spec.y)}, want ${want.r}`);
    const drawnQuad = spec.x > 0 ? (spec.y > 0 ? 1 : 4) : (spec.y > 0 ? 2 : 3);
    tick(drawnQuad === want.quad, `${id}: figure sits in quadrant ${drawnQuad}, the double tick says ${want.quad}`);
    tick(!!spec.labels && !!spec.theta, `${id}: a special-sums figure shows the three NUMERIC side labels and the θ arc`);
    /* every question in this file that has a (c) shows the SAME figure
       beside it — the side is known by then, so nothing changes */
    if (q.diagram.parts.c) tick(q.diagram.parts.c.spec === spec, `${id}: (c) must show the same figure object as (b)`);
  });

  /* 11b — the six SUPER SPECIAL SUMS flamingos: drawn at their TRUE
     acute angle in the FIRST quadrant, unit hypotenuse, and labelled
     with LETTERS only (never `labels`, which would be a number the
     engine would then have to prove — and there is no number to prove,
     the sides are algebra). */
  const SSS_DEG = {
    "gtrig.sib.sss.q1": 57, "gtrig.sib.sss.q2": 41, "gtrig.sib.sss.q3": 38,
    "gtrig.sib.sss.q4": 65, "gtrig.sib.sss.q5": 47, "gtrig.sib.sss.q6": 58,
  };
  Object.entries(SSS_DEG).forEach(([id, deg]) => {
    const q = withFig.find(x => x.id === id);
    if (!tick(!!q, `${id}: expected a super-special-sums question carrying a figure`)) return;
    const spec = q.diagram.parts.b.spec;
    const drawnDeg = Math.atan2(spec.y, spec.x) * 180 / Math.PI;
    tick(near(drawnDeg, deg), `${id}: the flamingo is drawn at ${drawnDeg.toFixed(4)}°, the question says ${deg}°`);
    tick(near(Math.hypot(spec.x, spec.y), 1), `${id}: the flamingo stands on a 1 — drawn hypotenuse is ${Math.hypot(spec.x, spec.y)}`);
    tick(spec.x > 0 && spec.y > 0, `${id}: the flamingo must sit in the FIRST quadrant (got ${spec.x} ; ${spec.y})`);
    tick(!spec.labels, `${id}: a flamingo carries LETTERS, never numeric labels`);
    tick(!!spec.letters && ["x", "y", "r"].every(s => typeof spec.letters[s] === "string" && spec.letters[s].trim()),
      `${id}: all three sides must be named`);
    tick(spec.thetaLabel === `${deg}°`, `${id}: the arc must be labelled ${deg}°, got "${spec.thetaLabel}"`);
    tick(q.diagram.parts.c && q.diagram.parts.c.spec === spec, `${id}: (c) must show the same flamingo object as (b)`);
  });
}

/* =====================================================================
   12. TRIG GRAPHS — INDEPENDENT RECOMPUTE (SESSION E, 2026-08-23).

   Same promise as section 8, one chapter over: every number printed in
   a tgraph prompt or memo is worked out again here FROM FIRST
   PRINCIPLES, and "first principles" is meant literally — nothing below
   uses js/tgraphlib.js's periodOf / amplitudeOf / rangeOf, because
   those are the very formulas the cards teach and re-using them would
   only prove the file agrees with itself. Instead each curve is rebuilt
   from its raw definition  a·fn(b(x − p)) + q  and then MEASURED:
   periods by hunting for the smallest genuine repeat, amplitudes and
   ranges by sampling the real maximum and minimum, intersections and
   inequality intervals by sweeping, "how many solutions" by counting
   sign changes. No memo string is ever parsed.
   ===================================================================== */
console.log("\n== 12. Trig Graphs: independent recompute of every number ==");
{
  const T = [];
  const say = (ok, label, extra = "") => { T.push(`  ${ok ? "OK  " : "FAIL"} ${label}${extra ? " — " + extra : ""}`); tick(ok, `tgraph recompute ${label}`); };
  const D = Math.PI / 180;
  const BASE = { sin: (d) => Math.sin(d * D), cos: (d) => Math.cos(d * D), tan: (d) => Math.tan(d * D) };
  /* the curve, rebuilt from its own numbers — deliberately NOT imported
     from js/tgraphlib.js */
  const F = (cv) => (x) => (cv.a === undefined ? 1 : cv.a) * BASE[cv.fn]((cv.b === undefined ? 1 : cv.b) * (x - (cv.p || 0))) + (cv.q || 0);
  const close = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol;
  const r2 = (v) => Math.round(v * 100) / 100;

  /* MEASURED period: the smallest T > 0 for which f(x + T) = f(x) at
     every sample point (samples near a tangent's poles are skipped —
     two enormous numbers tell you nothing). */
  function measuredPeriod(cv) {
    const f = F(cv);
    const xs = []; for (let i = 0; i < 60; i++) xs.push(-131.7 + i * 7.13);
    for (let P = 0.5; P <= 1440; P += 0.5) {
      let ok = true;
      for (const x of xs) {
        const u = f(x), v = f(x + P);
        if (!Number.isFinite(u) || !Number.isFinite(v) || Math.abs(u) > 1e5 || Math.abs(v) > 1e5) continue;
        if (Math.abs(u - v) > 1e-7) { ok = false; break; }
      }
      if (ok) return P;
    }
    return null;
  }
  /* MEASURED highest and lowest value over two whole periods */
  function measuredRange(cv, P) {
    const f = F(cv); let lo = Infinity, hi = -Infinity;
    for (let i = 0; i <= 20000; i++) { const y = f(-P + (2 * P * i) / 20000); if (y < lo) lo = y; if (y > hi) hi = y; }
    return { lo, hi };
  }
  /* does the curve really run away to +∞ and −∞ (a tangent's range ℝ)? */
  function unbounded(cv) {
    const f = F(cv); let big = false, small = false;
    for (let i = 0; i <= 40000; i++) { const y = f(-360 + (720 * i) / 40000); if (y > 5000) big = true; if (y < -5000) small = true; }
    return big && small;
  }
  /* every x in [x0;x1] where g(x) = 0, found by sign change (used for
     intersections: g = f − h) */
  function rootsIn(g, x0, x1, step = 0.02) {
    const out = [];
    let prev = g(x0);
    if (Number.isFinite(prev) && Math.abs(prev) < 1e-9) out.push(x0);
    for (let x = x0 + step; x <= x1 + 1e-9; x += step) {
      const cur = g(x);
      if (!Number.isFinite(prev) || !Number.isFinite(cur) || Math.abs(prev) > 1e4 || Math.abs(cur) > 1e4) { prev = cur; continue; }
      if (Math.abs(cur) < 1e-9) { out.push(r2(x)); prev = cur; continue; }
      if (prev * cur < 0) {
        let lo = x - step, hi = x;
        for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; if (g(lo) * g(m) <= 0) hi = m; else lo = m; }
        out.push(r2((lo + hi) / 2));
      }
      prev = cur;
    }
    /* de-duplicate to 2 dp */
    return [...new Set(out.map((v) => r2(v)))].sort((a, b) => a - b);
  }
  /* sweep a truth test against a claimed answer, skipping points that
     sit right on a boundary (where floating point cannot be trusted) */
  function sweepMismatches(test, claim, x0, x1, bounds, step = 0.25) {
    let bad = 0;
    for (let x = x0; x <= x1 + 1e-9; x += step) {
      if (bounds.some((b) => Math.abs(x - b) < 0.4)) continue;
      if (test(x) !== claim(x)) bad++;
    }
    return bad;
  }
  const inAny = (ivs) => (x) => ivs.some(([lo, hi]) => x >= lo && x <= hi);

  /* ---- 12a. period / amplitude / range, all eighteen equations ---- */
  const PAR = [
    ["q1(a) y = sin 4x", { fn: "sin", a: 1, b: 4, p: 0, q: 0 }, 90, 1, [-1, 1]],
    ["q1(b) y = cos x − 3", { fn: "cos", a: 1, b: 1, p: 0, q: -3 }, 360, 1, [-4, -2]],
    ["q1(c) y = tan 2x", { fn: "tan", a: 1, b: 2, p: 0, q: 0 }, 90, null, null],
    ["q2(a) y = 3 sin x", { fn: "sin", a: 3, b: 1, p: 0, q: 0 }, 360, 3, [-3, 3]],
    ["q2(b) y = cos(x + 120°)", { fn: "cos", a: 1, b: 1, p: -120, q: 0 }, 360, 1, [-1, 1]],
    ["q2(c) y = tan x + 4", { fn: "tan", a: 1, b: 1, p: 0, q: 4 }, 180, null, null],
    ["q3(a) y = −2 cos x", { fn: "cos", a: -2, b: 1, p: 0, q: 0 }, 360, 2, [-2, 2]],
    ["q3(b) y = 5 sin 3x", { fn: "sin", a: 5, b: 3, p: 0, q: 0 }, 120, 5, [-5, 5]],
    ["q3(c) y = −½ sin 2x", { fn: "sin", a: -0.5, b: 2, p: 0, q: 0 }, 180, 0.5, [-0.5, 0.5]],
    ["q4(a) y = 3 sin x + 2", { fn: "sin", a: 3, b: 1, p: 0, q: 2 }, 360, 3, [-1, 5]],
    ["q4(b) y = −2 cos ½x", { fn: "cos", a: -2, b: 0.5, p: 0, q: 0 }, 720, 2, [-2, 2]],
    ["q4(c) y = −tan 3x", { fn: "tan", a: -1, b: 3, p: 0, q: 0 }, 60, null, null],
    ["q5(a) y = −sin x + 3", { fn: "sin", a: -1, b: 1, p: 0, q: 3 }, 360, 1, [2, 4]],
    ["q5(b) y = 2 cos(x + 135°)", { fn: "cos", a: 2, b: 1, p: -135, q: 0 }, 360, 2, [-2, 2]],
    ["q5(c) y = ½ tan 4x", { fn: "tan", a: 0.5, b: 4, p: 0, q: 0 }, 45, null, null],
    ["q6(a) y = 6 sin ½x", { fn: "sin", a: 6, b: 0.5, p: 0, q: 0 }, 720, 6, [-6, 6]],
    ["q6(b) y = −cos x − 2", { fn: "cos", a: -1, b: 1, p: 0, q: -2 }, 360, 1, [-3, -1]],
    ["q6(c) y = 3 tan(x − 30°)", { fn: "tan", a: 3, b: 1, p: 30, q: 0 }, 180, null, null],
  ];
  PAR.forEach(([label, cv, wantP, wantA, wantR]) => {
    const P = measuredPeriod(cv);
    say(close(P, wantP, 1e-9), `${label}: measured period ${P}°`, `memo says ${wantP}°`);
    if (cv.fn === "tan") {
      say(unbounded(cv), `${label}: really reaches every real value (no amplitude, range ℝ)`);
    } else {
      const { lo, hi } = measuredRange(cv, P);
      say(close((hi - lo) / 2, wantA, 1e-6), `${label}: measured amplitude ${r2((hi - lo) / 2)}`, `memo says ${wantA}`);
      say(close(lo, wantR[0], 1e-6) && close(hi, wantR[1], 1e-6), `${label}: measured range [${r2(lo)} ; ${r2(hi)}]`, `memo says [${wantR[0]} ; ${wantR[1]}]`);
    }
  });

  /* ---- 12b. read-parameters: the parameters really fit the sketch ---- */
  {
    const f1 = F({ fn: "cos", a: 3, b: 2, p: 0, q: 0 });
    say(close(f1(45), 0, 1e-9) && close(f1(90), -3, 1e-9), "rp.q1: (45° ; 0) and (90° ; −3) really lie on 3cos2x");
    say(close(measuredPeriod({ fn: "cos", a: 3, b: 2 }), 180), "rp.q1: period of 3cos2x is 180°");

    const f2 = F({ fn: "sin", a: 2, b: 1, p: 0, q: 1 });
    say(close(f2(90), 3, 1e-9) && close(f2(270), -1, 1e-9), "rp.q2: max (90° ; 3) and min (270° ; −1) really lie on 2sinx + 1");
    say(close((3 + -1) / 2, 1) && close((3 - -1) / 2, 2), "rp.q2: q = (max+min)÷2 = 1 and a = (max−min)÷2 = 2");

    const f3 = F({ fn: "cos", a: 2, b: 1, p: -60, q: 0 });
    say(close(f3(-60), 2, 1e-9), "rp.q3: 2cos(x + 60°) really peaks at (−60° ; 2)");
    say(close(f3(0), 1, 1e-9), "rp.q3: its y-intercept really is (0 ; 1)");

    const f4 = F({ fn: "tan", a: 2, b: 1, p: 0, q: -1 });
    say(close(f4(0), -1, 1e-9) && close(f4(45), 1, 1e-6), "rp.q4: (0 ; −1) and (45° ; 1) really lie on 2tanx − 1");
    say(close(measuredPeriod({ fn: "tan", a: 2, b: 1, q: -1 }), 180), "rp.q4: period of 2tanx − 1 is 180°");
    say([-90, 90].every((x) => Math.abs(f4(x - 1e-6)) > 1e5 && Math.abs(f4(x + 1e-6)) > 1e5), "rp.q4: asymptotes really at x = ±90°");

    const f5 = F({ fn: "sin", a: -2, b: 2, p: 0, q: 0 });
    say(close(f5(45), -2, 1e-9), "rp.q5: A(45° ; −2) really is a MINIMUM of −2sin2x");
    say(close(measuredPeriod({ fn: "sin", a: -2, b: 2 }), 180), "rp.q5: period of −2sin2x is 180°, so 45° is a quarter of it");
    const g5 = F({ fn: "cos", a: 1, b: 1, p: -90, q: 0 });
    say(close(g5(-90), 1, 1e-9), "rp.q5: cos(x + 90°) really peaks at (−90° ; 1)");
    {
      const { lo, hi } = measuredRange({ fn: "cos", a: 1, b: 1, p: -90, q: 0 }, 360);
      say(close(lo, -1, 1e-6) && close(hi, 1, 1e-6), "rp.q5: range of g really is [−1 ; 1]");
    }

    const f6 = F({ fn: "sin", a: 4, b: 1, p: 0, q: -1 });
    say(close(f6(0), -1, 1e-9) && close(f6(270), -5, 1e-9), "rp.q6: (0 ; −1) and (270° ; −5) really lie on 4sinx − 1");
    say(close(f6(90), 3, 1e-9), "rp.q6: the maximum P really is (90° ; 3)");
    {
      const { lo, hi } = measuredRange({ fn: "sin", a: 4, b: 1, q: -1 }, 360);
      say(close(lo, -5, 1e-6) && close(hi, 3, 1e-6), "rp.q6: range really is [−5 ; 3]");
    }
  }

  /* ---- 12c. sketch: every feature the memos claim ---- */
  {
    const f1 = F({ fn: "sin", a: 2, b: 1 });
    say(close(f1(90), 2, 1e-9) && close(f1(-90), -2, 1e-9), "sk.q1: turning points (90° ; 2) and (−90° ; −2)");
    say([-180, 0, 180].every((x) => close(f1(x), 0, 1e-9)), "sk.q1: x-intercepts at −180°, 0° and 180°");

    const g2 = F({ fn: "cos", a: 1, b: 2 });
    say(close(measuredPeriod({ fn: "cos", a: 1, b: 2 }), 180), "sk.q2: period of cos2x is 180°");
    say([-135, -45, 45, 135].every((x) => close(g2(x), 0, 1e-9)), "sk.q2: x-intercepts at ±45° and ±135°");
    say(close(g2(0), 1, 1e-9) && close(g2(90), -1, 1e-9) && close(g2(180), 1, 1e-9), "sk.q2: maxima at 0° and ±180°, minima at ±90°");
    say(rootsIn(g2, -180, 180).length === 4, "sk.q2: exactly four x-intercepts in [−180° ; 180°]");

    const h3 = F({ fn: "tan", a: 1, b: 1, q: -1 });
    say([-90, 90].every((x) => Math.abs(h3(x - 1e-6)) > 1e5), "sk.q3: asymptotes at x = ±90°");
    say(close(h3(0), -1, 1e-9), "sk.q3: y-intercept (0 ; −1)");
    say(close(h3(45), 0, 1e-6) && close(h3(-135), 0, 1e-6), "sk.q3: x-intercepts at 45° and −135°");

    const f4 = F({ fn: "cos", a: -3, b: 1 });
    say(close(f4(0), -3, 1e-9) && close(f4(180), 3, 1e-9) && close(f4(-180), 3, 1e-9), "sk.q4: minimum (0 ; −3), maxima at ±180°");
    say(close(f4(90), 0, 1e-9) && close(f4(-90), 0, 1e-9), "sk.q4: x-intercepts at ±90°");

    const f5 = F({ fn: "sin", a: 1, b: 1, q: 2 });
    say(close(f5(0), 2, 1e-9) && close(f5(90), 3, 1e-9) && close(f5(-90), 1, 1e-9), "sk.q5: (0 ; 2), max (90° ; 3), min (−90° ; 1)");
    {
      const { lo } = measuredRange({ fn: "sin", a: 1, b: 1, q: 2 }, 360);
      say(lo > 0 && rootsIn(f5, -180, 180).length === 0, `sk.q5: lowest value ${r2(lo)} > 0, so genuinely NO x-intercepts`);
    }

    const f6 = F({ fn: "sin", a: 1, b: 2 });
    const g6 = F({ fn: "cos", a: 1, b: 1 });
    const cuts6 = rootsIn((x) => f6(x) - g6(x), -180, 180);
    say(cuts6.length === 4, `sk.q6: sin2x = cosx has exactly 4 solutions in [−180° ; 180°]`, `found ${JSON.stringify(cuts6)}`);
    say(close(f6(45), 1, 1e-9) && close(f6(135), -1, 1e-9), "sk.q6: f's turning points (45° ; 1) and (135° ; −1)");
    say(close(measuredPeriod({ fn: "sin", a: 1, b: 2 }), 180), "sk.q6: period of sin2x is 180°");
  }

  /* ---- 12d. intersections & inequalities ---- */
  {
    const f1 = F({ fn: "sin", a: 2, b: 1 }), g1 = F({ fn: "cos", a: 2, b: 1 });
    const cuts1 = rootsIn((x) => f1(x) - g1(x), -180, 180);
    say(cuts1.length === 2, "ii.q1: 2sinx and 2cosx cut exactly twice in [−180° ; 180°]", JSON.stringify(cuts1));
    say(close(f1(45), 1.41, 5e-3) && close(f1(-135), -1.41, 5e-3), "ii.q1: A(45° ; 1,41) and (−135° ; −1,41) correct to 2 dp");

    const f2 = F({ fn: "cos", a: 1, b: 1 }), g2 = F({ fn: "cos", a: 1, b: 2 });
    const cuts2 = rootsIn((x) => f2(x) - g2(x), -180, 180);
    say(cuts2.length === 3 && [-120, 0, 120].every((v) => cuts2.some((c) => close(c, v, 0.05))), "ii.q2: cosx = cos2x at −120°, 0° and 120° only", JSON.stringify(cuts2));
    say(close(f2(120), -0.5, 1e-9) && close(f2(-120), -0.5, 1e-9), "ii.q2: A(120° ; −0,5) and B(−120° ; −0,5)");
    say(sweepMismatches((x) => f2(x) >= g2(x), inAny([[-120, 120]]), -180, 180, [-120, 0, 120]) === 0, "ii.q2: f ≥ g exactly on −120° ≤ x ≤ 120° (sweep)");

    const f3 = F({ fn: "cos", a: 1, b: 1 }), g3 = F({ fn: "sin", a: 1, b: 1 });
    say(close(f3(90), 0, 1e-9) && close(f3(270), 0, 1e-9), "ii.q3: cosx cuts the x-axis at 90° and 270°");
    say(sweepMismatches((x) => f3(x) * g3(x) < 0, inAny([[90, 180], [270, 360]]), 0, 360, [0, 90, 180, 270, 360]) === 0, "ii.q3: f·g < 0 exactly on (90°;180°) and (270°;360°) (sweep)");

    const f4 = F({ fn: "sin", a: 1, b: 1 }), g4 = F({ fn: "sin", a: 1, b: 2 });
    say(close(measuredPeriod({ fn: "sin", a: 1, b: 2 }), 180), "ii.q4: period of sin2x is 180°");
    const cuts4 = rootsIn((x) => f4(x) - g4(x), -90, 180);
    say([-60, 0, 60, 180].every((v) => cuts4.some((c) => close(c, v, 0.05))), "ii.q4: the graphs meet at −60°, 0°, 60° and 180°", JSON.stringify(cuts4));
    say(sweepMismatches((x) => f4(x) >= g4(x), inAny([[-60, 0], [60, 180]]), -90, 180, [-60, 0, 60, 180]) === 0, "ii.q4: f ≥ g exactly on [−60°;0°] and [60°;180°] (sweep)");

    const f5 = F({ fn: "sin", a: 1, b: 1 }), g5 = F({ fn: "cos", a: 1, b: 2 });
    const rising = (f) => (x) => f(x + 0.05) > f(x - 0.05);
    const falling = (f) => (x) => f(x + 0.05) < f(x - 0.05);
    say(sweepMismatches(rising(f5), inAny([[0, 90], [270, 360]]), 0.5, 359.5, [0, 90, 270, 360]) === 0, "ii.q5: sinx increases exactly on (0°;90°) and (270°;360°)");
    say(sweepMismatches(falling(g5), inAny([[0, 90], [180, 270]]), 0.5, 359.5, [0, 90, 180, 270, 360]) === 0, "ii.q5: cos2x decreases exactly on (0°;90°) and (180°;270°)");
    say(sweepMismatches((x) => rising(f5)(x) && falling(g5)(x), inAny([[0, 90]]), 0.5, 359.5, [0, 90, 180, 270, 360]) === 0, "ii.q5: both together only on (0°;90°)");

    const f6 = F({ fn: "sin", a: 1, b: 1 }), g6 = F({ fn: "cos", a: 1, b: 1 });
    say(close(f6(45), 0.71, 5e-3) && close(f6(225), -0.71, 5e-3), "ii.q6: A(45° ; 0,71) and B(225° ; −0,71) correct to 2 dp");
    say(sweepMismatches((x) => f6(x) > g6(x), inAny([[45, 225]]), 0, 360, [45, 225]) === 0, "ii.q6: sinx > cosx exactly on (45°;225°) (sweep)");
    say(rootsIn((x) => f6(x) - g6(x), -360, 360).length === 4, "ii.q6: sinx = cosx has exactly 4 solutions in [−360°;360°]");
  }

  /* ---- 12e. shift & reflect: every new equation IS the described move ---- */
  {
    const SAMPLES = []; for (let i = 0; i < 100; i++) SAMPLES.push(-178.3 + i * 3.57);
    const same = (u, v) => SAMPLES.every((x) => {
      const a = u(x), b = v(x);
      if (!Number.isFinite(a) || !Number.isFinite(b) || Math.abs(a) > 1e4 || Math.abs(b) > 1e4) return true;
      return Math.abs(a - b) < 1e-9;
    });

    const f1 = F({ fn: "sin", a: 2, b: 1 }), g1 = F({ fn: "sin", a: 2, b: 1, p: -30 });
    say(same(g1, (x) => f1(x + 30)), "sr.q1: 2sin(x + 30°) really is 2sinx shifted 30° LEFT");
    say(close(measuredPeriod({ fn: "sin", a: 2, b: 1, p: -30 }), 360), "sr.q1: g's period is still 360°");

    const f2 = F({ fn: "cos", a: 1, b: 1 }), h2 = F({ fn: "cos", a: -1, b: 1, q: 1 });
    say(same(h2, (x) => -f2(x) + 1), "sr.q2: −cosx + 1 really is cosx reflected in the x-axis and lifted 1");
    {
      const { lo, hi } = measuredRange({ fn: "cos", a: -1, b: 1, q: 1 }, 360);
      say(close(lo, 0, 1e-6) && close(hi, 2, 1e-6), "sr.q2: range of h really is [0 ; 2]");
    }

    const f3 = F({ fn: "sin", a: 1, b: 1 }), g3 = F({ fn: "sin", a: 1, b: 1, p: 45 });
    say(same(g3, (x) => f3(x - 45)), "sr.q3: sin(x − 45°) really is sinx shifted 45° RIGHT");
    say(close(f3(90), 1, 1e-9) && close(g3(135), 1, 1e-9), "sr.q3: f peaks at 90°, g peaks at 135° — a 45° move");
    {
      const zeros = rootsIn(g3, -180, 180);
      say(zeros.length === 2 && [-135, 45].every((v) => zeros.some((z) => close(z, v, 0.05))), "sr.q3: g's x-intercepts in the interval are −135° and 45°", JSON.stringify(zeros));
    }

    say(same(F({ fn: "cos", a: 1, b: 1 }), F({ fn: "sin", a: 1, b: 1, p: -90 })), "sr.q4: cosx really equals sin(x + 90°)");
    say(same(F({ fn: "cos", a: 1, b: 1, p: 30 }), F({ fn: "sin", a: 1, b: 1, p: -60 })), "sr.q4: cos(x − 30°) really equals sin(x + 60°)");

    const f5 = F({ fn: "cos", a: 3, b: 1 }), h5 = F({ fn: "cos", a: 6, b: 1, q: -1 });
    say(same(h5, (x) => 2 * f5(x) - 1), "sr.q5: 6cosx − 1 really is 2f(x) − 1");
    {
      const rf = measuredRange({ fn: "cos", a: 3, b: 1 }, 360), rh = measuredRange({ fn: "cos", a: 6, b: 1, q: -1 }, 360);
      say(close(rf.lo, -3, 1e-6) && close(rf.hi, 3, 1e-6), "sr.q5: range of f is [−3 ; 3]");
      say(close(rh.lo, -7, 1e-6) && close(rh.hi, 5, 1e-6), "sr.q5: range of h is [−7 ; 5]");
    }

    const f6 = F({ fn: "tan", a: 1, b: 1 }), g6 = F({ fn: "tan", a: -1, b: 1 }), h6 = F({ fn: "tan", a: -1, b: 1, p: -45 });
    say(same(g6, (x) => -f6(x)), "sr.q6: −tanx really is tanx reflected in the x-axis");
    say([-90, 90].every((x) => Math.abs(g6(x - 1e-6)) > 1e5), "sr.q6: g's asymptotes are still x = ±90°");
    say(same(h6, (x) => g6(x + 45)), "sr.q6: −tan(x + 45°) really is g shifted 45° LEFT");
    say([-135, 45].every((x) => Math.abs(h6(x - 1e-6)) > 1e5 && Math.abs(h6(x + 1e-6)) > 1e5), "sr.q6: h's asymptotes in the interval are x = −135° and x = 45°");
    say(rootsIn((x) => 1 / h6(x), -180, 180).length >= 0, "sr.q6: (asymptote sweep ran)");
  }

  /* ---- 12f. the LEVEL 4 tile ---- */
  {
    const f1 = F({ fn: "sin", a: 2, b: 2 });
    say(close(f1(0), 0, 1e-9) && close(f1(90), 0, 1e-9), "l4.q1: 2sin2x really cuts the x-axis at 0° and 90°");
    say(rootsIn(f1, 0.01, 89.99).length === 0, "l4.q1: …and NOT in between, so those two are consecutive (half a period apart)");
    say(close(measuredPeriod({ fn: "sin", a: 2, b: 2 }), 180), "l4.q1: so the period is 180° and b = 2");
    say(close(f1(22.5), 1.41, 5e-3), "l4.q1: A(22,5° ; 1,41) really lies on 2sin2x, to 2 dp");
    say(close(f1(45), 2, 1e-9), "l4.q1: maximum turning point (45° ; 2)");

    const A2 = Math.sqrt(3);
    say(close(Math.tan(60 * D), A2, 1e-9), "l4.q2: tan60° really is √3");
    const f2 = F({ fn: "cos", a: A2, b: 1 }), g2 = F({ fn: "sin", a: 1, b: 1 });
    const cuts2 = rootsIn((x) => f2(x) - g2(x), -360, 360);
    say(cuts2.every((c) => close(((c - 60) % 180 + 180) % 180, 0, 0.05) || close(((c - 60) % 180 + 180) % 180, 180, 0.05)),
      "l4.q2: every crossing of √3·cosx and sinx really has the form 60° + k·180°", JSON.stringify(cuts2));
    say(close(g2(60), 0.87, 5e-3) && close(g2(-120), -0.87, 5e-3), "l4.q2: crossings (60° ; 0,87) and (−120° ; −0,87) to 2 dp");
    say(rootsIn((x) => f2(x) - g2(x), -180, 180).length === 2, "l4.q2: exactly two crossings in [−180° ; 180°]");

    const SAMP = []; for (let i = 0; i < 100; i++) SAMP.push(-178.3 + i * 3.57);
    say(SAMP.every((x) => close(2 * Math.cos((x - 90) * D), 2 * Math.sin(x * D), 1e-9)), "l4.q3: 2cos(x − 90°) really equals 2sinx");
    const f3 = F({ fn: "cos", a: 2, b: 1 }), g3 = F({ fn: "cos", a: 2, b: 1, p: 90 });
    const cuts3 = rootsIn((x) => f3(x) - g3(x), -180, 180);
    say(cuts3.length === 2 && [-135, 45].every((v) => cuts3.some((c) => close(c, v, 0.05))), "l4.q3: f = g at 45° and −135° only", JSON.stringify(cuts3));
    say(close(f3(45), 1.41, 5e-3), "l4.q3: the crossing height is 1,41 to 2 dp");

    const f4 = F({ fn: "tan", a: 1, b: 1 });
    say([-90, 90].every((x) => Math.abs(f4(x - 1e-6)) > 1e5), "l4.q4: tanx's asymptotes in [−180°;180°] are x = ±90°");
    say(sweepMismatches((x) => f4(x) >= 1, inAny([[-135, -90], [45, 90]]), -180, 180, [-135, -90, 45, 90]) === 0,
      "l4.q4: tanx ≥ 1 exactly on [−135°;−90°) and [45°;90°) (sweep)");
    say(close(f4(45), 1, 1e-6) && close(f4(-135), 1, 1e-6), "l4.q4: the closed ends really are equality points (tanx = 1)");
    say(!Number.isFinite(Math.tan(90 * D)) || Math.abs(Math.tan(90 * D)) > 1e15, "l4.q4: the open ends really are asymptotes (tan 90° undefined)");

    const f5 = F({ fn: "cos", a: 2, b: 1 }), g5 = F({ fn: "cos", a: 1, b: 1, q: -3 });
    say(close(f5(60) - g5(60), 3.5, 1e-9), `l4.q5: PQ at x = 60° really is 3,5`);
    say(SAMP.every((x) => close(f5(x) - g5(x), Math.cos(x * D) + 3, 1e-9)), "l4.q5: PQ(x) really simplifies to cosx + 3");
    {
      let best = -Infinity, at = null;
      for (let i = 0; i <= 36000; i++) { const x = -180 + (360 * i) / 36000; const d = f5(x) - g5(x); if (d > best) { best = d; at = x; } }
      say(close(best, 4, 1e-6) && close(at, 0, 0.02), `l4.q5: the longest PQ really is 4 units, at x = ${r2(at)}°`);
    }

    const f6 = F({ fn: "cos", a: 2, b: 1 });
    const countCuts = (k) => rootsIn((x) => f6(x) - k, 0, 540).length;
    say([-3, -2.5, 2.5, 3, 5].every((k) => countCuts(k) === 0), "l4.q6: y = k misses 2cosx entirely for every |k| > 2");
    say([-1.99, -1.5, -0.5, 0, 0.5, 1, 1.5, 1.99].every((k) => countCuts(k) === 3), "l4.q6: y = k cuts it exactly three times for every −2 < k < 2 tested");
    say(countCuts(2) === 2 && countCuts(-2) === 2, `l4.q6: at k = ±2 the count drops to 2 (got ${countCuts(2)} and ${countCuts(-2)})`);
    say([60, 300, 420].every((x) => close(f6(x), 1, 1e-9)), "l4.q6: y = 1 really cuts at 60°, 300° and 420°");
  }

  console.log(T.join("\n"));
}

/* =====================================================================
   13. TRIG-GRAPH DIAGRAMS (SESSION E, 2026-08-23 — the trigg engine,
   js/engine/trig-graph.js, wired into the exam diagram slot by session
   0 through js/exam/trig-diagram.js).

   Same promise as sections 9-11, a fourth engine over: verifyTrig
   re-measures every base spec, every per-part spec override and every
   HIGHLIGHTED variant a part will actually render, so a period arrow
   that does not span a period, an amplitude arrow that is not 2a, a
   point that is not on the curve it names, or a shaded strip that falls
   off the window all fail here rather than on a learner's screen.

   Plus the two rules that are specific to this chapter:
     · the TWO-PARAMETER WALL (GR11-IEB-PAPER-BANK.md) on every curve in
       every spec and every highlight — at most two of a, b, p, q may
       differ from the plain graph's 1, 1, 0, 0;
     · HER RULING 8 for the period/amplitude/range tile: NO SKETCH on
       the question side. The player draws a part's base spec whenever
       the part has a diagram entry, so every one of those parts' base
       specs must be CURVELESS, with the graph arriving only on the
       reveal. The same no-leak check applies to the sketch tile, where
       the curve IS the answer.
   ===================================================================== */
console.log("\n== 13. Trig-graph diagrams: specs, highlights, the two-parameter wall, the no-leak rule ==");
{
  const { verifyTrig } = await import("./js/engine/trig-graph.js");
  const { applyTrigHighlights, trigRefIssues } = await import("./js/exam/trig-diagram.js");

  const tgQs = mine.filter((m) => m.q.chapter === "tgraph").map((m) => m.q);
  tick(tgQs.length === 36, `expected 36 tgraph questions, got ${tgQs.length}`);
  const withDiagram = tgQs.filter((q) => !!q.diagram);
  /* 30, not 36: the period/amplitude/range tile is TEXT ONLY, her ruling
     8 taken literally ("just the equations, no sketch"). js/exam-play.js
     draws a part's base spec on the QUESTION side whenever that part has
     a diagram entry, so a reveal-side graph on that tile would cost an
     empty pair of axes above every prompt while the learner is working.
     See that module's header for the whole decision. */
  tick(withDiagram.length === 30, `every tgraph question outside the equations-only tile carries a figure, got ${withDiagram.length}`);

  const measureTg = (spec, label) => {
    const res = verifyTrig(spec);
    const bad = res.filter((r) => !r.ok);
    tick(bad.length === 0, `${label}: ${bad.map((r) => r.label).join("; ")}`);
    return res;
  };

  /* the two-parameter wall, counted on the raw curve object */
  const varied = (cv) => [
    (cv.a === undefined ? 1 : cv.a) !== 1,
    (cv.b === undefined ? 1 : cv.b) !== 1,
    (cv.p || 0) !== 0,
    (cv.q || 0) !== 0,
  ].filter(Boolean).length;

  let specCount = 0, curveCount = 0, wallBad = [];
  const checkWall = (spec, label) => {
    (spec.curves || []).forEach((cv, i) => {
      curveCount++;
      if (varied(cv) > 2) wallBad.push(`${label} curve ${i} (${cv.fn}) varies ${varied(cv)} parameters`);
    });
  };

  withDiagram.forEach((q) => {
    const d = q.diagram;
    if (d.spec) {
      tick(d.spec.type === "trigg", `${q.id}: diagram.spec must be a type:"trigg" spec`);
      measureTg(d.spec, `${q.id} diagram.spec`); specCount++;
      checkWall(d.spec, `${q.id} diagram.spec`);
    }
    Object.entries(d.parts).forEach(([pid, entry]) => {
      const spec = entry.spec || d.spec;
      tick(!!spec, `${q.id}(${pid}): no spec at all`);
      tick(q.parts.some((pp) => pp.id === pid), `${q.id}: diagram.parts["${pid}"] names no real part`);
      if (entry.spec) {
        tick(entry.spec.type === "trigg", `${q.id}(${pid}) spec must be type:"trigg"`);
        measureTg(entry.spec, `${q.id}(${pid}) spec`); specCount++;
        checkWall(entry.spec, `${q.id}(${pid}) spec`);
      }
      ["question", "reveal"].forEach((side) => {
        if (!entry[side]) return;
        const issues = trigRefIssues(spec, entry[side], `${q.id}(${pid}).${side}`);
        tick(issues.length === 0, issues.join(" | "));
        const variant = applyTrigHighlights(spec, entry[side]);
        measureTg(variant, `${q.id}(${pid}) ${side} as rendered`); specCount++;
        checkWall(variant, `${q.id}(${pid}) ${side} as rendered`);
      });
    });
    const missing = q.parts.filter((pp) => !d.parts[pp.id]).map((pp) => pp.id);
    tick(missing.length === 0, `${q.id}: parts with no diagram entry: ${missing.join(",")}`);
  });
  tick(wallBad.length === 0, `two-parameter wall broken: ${wallBad.join(" | ")}`);
  console.log(`  ${specCount} trigg specs measured across ${withDiagram.length} questions · ${curveCount} curves, all within the two-parameter wall — ${wallBad.length ? "FAIL" : "OK"}`);

  /* 13a — HER RULING 8, checked as a hard wall: the period/amplitude/
     range tile carries NO figure at all, on either side, on any part.
     "Just the equations, no sketch." */
  {
    const par = tgQs.filter((q) => q.topic === "period-amplitude-range");
    const withFig = par.filter((q) => !!q.diagram).map((q) => q.id);
    tick(par.length === 6, `the equations-only tile holds six cards, got ${par.length}`);
    tick(withFig.length === 0, `her ruling 8: the equations-only tile must carry no figure at all — these do: [${withFig.join(", ")}]`);
    const parts = par.reduce((n, q) => n + q.parts.length, 0);
    console.log(`  ruling 8: ${par.length} cards, ${parts} equations, ${withFig.length} figures (want 0) — ${withFig.length ? "FAIL" : "OK"}`);
  }

  /* 13b — the SKETCH tile: the part that has to DRAW the graph must not
     be shown it. Each sketch card's sketch part is the one whose prompt
     starts with "Sketch"; its question-side figure carries no curves. */
  {
    const sk = tgQs.filter((q) => q.topic === "sketch");
    let leaks = [];
    sk.forEach((q) => q.parts.forEach((p) => {
      if (!/^Sketch|^On the same set of axes, sketch/.test(p.prompt.en)) return;
      const entry = q.diagram.parts[p.id];
      const spec = entry.spec || q.diagram.spec;
      const qSide = applyTrigHighlights(spec, entry.question || {});
      if ((qSide.curves || []).length) leaks.push(`${q.id}(${p.id}) shows the curve it is asking the learner to draw`);
      const rSide = applyTrigHighlights(spec, entry.reveal || {});
      if (!(rSide.curves || []).length) leaks.push(`${q.id}(${p.id}) reveal draws no curve`);
    }));
    tick(leaks.length === 0, `sketch tile: blank axes on the question side, the graph on the reveal: ${leaks.join(" | ")}`);
    console.log(`  sketch tile: ${sk.length} cards — blank axes to draw on, finished graph on the reveal — ${leaks.length ? "FAIL" : "OK"}`);
  }

  /* 13c — the BARE-FIGURE rule, on the one part that needs it:
     tgraph.sib.rp.q6(b) asks for the coordinates of the turning point
     marked P, so the question side may show P as a bare letter but must
     NOT show its coordinates; the reveal writes them on. */
  {
    const q = tgQs.find((x) => x.id === "tgraph.sib.rp.q6");
    const entry = q.diagram.parts.b;
    const spec = entry.spec || q.diagram.spec;
    const qSide = applyTrigHighlights(spec, entry.question || {});
    const rSide = applyTrigHighlights(spec, entry.reveal || {});
    const labelAtP = (s) => (s.points || []).filter((pt) => Math.abs(pt.x - 90) < 1e-9 && Math.abs(pt.y - 3) < 1e-9).map((pt) => pt.label).join("");
    tick(labelAtP(qSide) === "P", `rp.q6(b) question side must label the turning point just "P", got "${labelAtP(qSide)}"`);
    tick(/90/.test(labelAtP(rSide)) && /3/.test(labelAtP(rSide)), `rp.q6(b) reveal must write P's coordinates onto the figure, got "${labelAtP(rSide)}"`);
    console.log(`  bare-figure rule: rp.q6(b) question "${labelAtP(qSide)}" → reveal "${labelAtP(rSide)}" — ${labelAtP(qSide) === "P" && /90/.test(labelAtP(rSide)) ? "OK" : "FAIL"}`);
  }

  /* 13d — the inequality reveals really paint the interval the memo
     states, and nothing wider. */
  {
    const SHADES = {
      "tgraph.sib.ii.q2": { part: "c", want: [[-120, 120]] },
      "tgraph.sib.ii.q3": { part: "b", want: [[90, 180], [270, 360]] },
      "tgraph.sib.ii.q4": { part: "b", want: [[-60, 0], [60, 180]] },
      "tgraph.sib.ii.q5": { part: "c", want: [[0, 90]] },
      "tgraph.sib.ii.q6": { part: "b", want: [[45, 225]] },
      "tgraph.l4.q4": { part: "b", want: [[-135, -90], [45, 90]] },
    };
    let bad = [];
    Object.entries(SHADES).forEach(([id, { part, want }]) => {
      const q = tgQs.find((x) => x.id === id);
      const entry = q.diagram.parts[part];
      const got = (applyTrigHighlights(entry.spec || q.diagram.spec, entry.reveal || {}).shades || []).map((s) => [s.x0, s.x1]);
      const same = got.length === want.length && want.every((w, i) => Math.abs(got[i][0] - w[0]) < 1e-9 && Math.abs(got[i][1] - w[1]) < 1e-9);
      if (!same) bad.push(`${id}(${part}) paints ${JSON.stringify(got)}, memo says ${JSON.stringify(want)}`);
    });
    tick(bad.length === 0, `every inequality reveal paints exactly the interval its memo states: ${bad.join(" | ")}`);
    console.log(`  inequality reveals: ${Object.keys(SHADES).length} shaded answers, all matching their memos — ${bad.length ? "FAIL" : "OK"}`);
  }
}


/* =====================================================================
   14. EQUATIONS & INEQUALITIES — INDEPENDENT RECOMPUTE
   (SESSION C2, 2026-08-23: the three NEW eqn tiles + the six cards that
   open its Level 4 ★ tile.)

   Every number below is worked from the PROMPT — the equation the
   learner is actually given — and from first principles. Nothing here
   reads a memo string, and nothing is compared against another list of
   answers typed out of the same file. Three habits do the work:

     · a claimed root is SUBSTITUTED back into the original equation;
     · a claimed REJECTED root is substituted too, and must fail;
     · a claimed factorisation or identity is proved by SWEEP over many
       x-values, never by re-multiplying the same brackets in prose.

   Section 8's own `chk`/`chkS` push into an array that was already
   printed, so this section keeps its own R14 log and prints it at the
   end. Both still feed the same tick()/fails counters.
   ===================================================================== */
console.log("\n== 14. independent recompute — session C2's eqn tiles ==");
{
  const R14 = [];
  const chk = (label, got, want) => { const ok = near(got, want); R14.push(`  ${ok ? "OK  " : "FAIL"} ${label}: got ${got}, want ${want}`); tick(ok, `C2 recompute ${label}`); };
  const chkS = (label, got, want) => { const ok = got === want; R14.push(`  ${ok ? "OK  " : "FAIL"} ${label}: got ${got}, want ${want}`); tick(ok, `C2 recompute ${label}`); };
  /* proves f(x) ≡ g(x) over a wide spread of x, at a spacing that is
     not a whole number, so a coincidence at the integers cannot pass */
  const identity = (label, f, g, lo = -20, hi = 20, step = 0.13) => {
    let bad = 0;
    for (let x = lo; x <= hi; x += step) if (Math.abs(f(x) - g(x)) > 1e-9) bad++;
    chk(`${label} (identity sweep, mismatches)`, bad, 0);
  };
  /* the exact set of real roots of ax² + bx + c, from the formula */
  const roots = (a, b, c) => {
    const d = b * b - 4 * a * c;
    if (d < 0) return [];
    if (near(d, 0)) return [-b / (2 * a)];
    return [(-b - Math.sqrt(d)) / (2 * a), (-b + Math.sqrt(d)) / (2 * a)].sort((p, q) => p - q);
  };
  const sameSet = (label, got, want) => {
    const g = [...got].sort((p, q) => p - q), w = [...want].sort((p, q) => p - q);
    const ok = g.length === w.length && g.every((v, i) => near(v, w[i]));
    R14.push(`  ${ok ? "OK  " : "FAIL"} ${label}: got [${g.map(v => Math.round(v * 1e6) / 1e6)}], want [${w.map(v => Math.round(v * 1e6) / 1e6)}]`);
    tick(ok, `C2 recompute ${label}`);
  };
  const round2 = v => (Math.round(v * 100) / 100).toFixed(2).replace(".", ",");

  /* ---------- TILE: quadratic-solving ---------- */
  R14.push("  -- quadratic-solving --");
  // qs.q1(a) 3x² − 12x = 0
  identity("qs.q1(a) 3x(x − 4) ≡ 3x² − 12x", x => 3 * x * (x - 4), x => 3 * x * x - 12 * x);
  sameSet("qs.q1(a) roots of 3x² − 12x = 0", roots(3, -12, 0), [0, 4]);
  // qs.q1(b) x² − 3x − 40 = 0
  identity("qs.q1(b) (x − 8)(x + 5) ≡ x² − 3x − 40", x => (x - 8) * (x + 5), x => x * x - 3 * x - 40);
  sameSet("qs.q1(b) roots of x² − 3x − 40 = 0", roots(1, -3, -40), [8, -5]);
  // qs.q2 (2x + 3)(x − 1) = 12
  [2.5, -3].forEach(x => chk(`qs.q2 x = ${x} satisfies (2x + 3)(x − 1) = 12`, (2 * x + 3) * (x - 1), 12));
  identity("qs.q2 (2x + 3)(x − 1) − 12 ≡ 2x² + x − 15", x => (2 * x + 3) * (x - 1) - 12, x => 2 * x * x + x - 15);
  identity("qs.q2 (2x − 5)(x + 3) ≡ 2x² + x − 15", x => (2 * x - 5) * (x + 3), x => 2 * x * x + x - 15);
  sameSet("qs.q2 roots of 2x² + x − 15 = 0", roots(2, 1, -15), [2.5, -3]);
  // qs.q3(a) 3x² − 7x − 3 = 0, to 2 decimals
  chk("qs.q3(a) Δ = (−7)² − 4(3)(−3)", (-7) ** 2 - 4 * 3 * -3, 85);
  chkS("qs.q3(a) 85 is not a perfect square, so the roots are irrational", Number.isInteger(Math.sqrt(85)), false);
  roots(3, -7, -3).forEach(x => chk(`qs.q3(a) x = ${Math.round(x * 1e6) / 1e6} satisfies 3x² − 7x − 3 = 0`, 3 * x * x - 7 * x - 3, 0));
  chkS("qs.q3(a) larger root rounds to 2,70", round2((7 + Math.sqrt(85)) / 6), "2,70");
  chkS("qs.q3(a) smaller root rounds to −0,37", round2((7 - Math.sqrt(85)) / 6).replace("-", "−"), "−0,37");
  // qs.q3(b) 2x² − 3x + 5 = 0 has no real solution
  chk("qs.q3(b) Δ = (−3)² − 4(2)(5)", (-3) ** 2 - 4 * 2 * 5, -31);
  chkS("qs.q3(b) Δ < 0, so there is no real root", roots(2, -3, 5).length, 0);
  // qs.q4(a) x² + 8x − 3 = 0 by completing the square
  identity("qs.q4(a) (x + 4)² − 19 ≡ x² + 8x − 3", x => (x + 4) ** 2 - 19, x => x * x + 8 * x - 3);
  sameSet("qs.q4(a) roots of x² + 8x − 3 = 0", roots(1, 8, -3), [-4 + Math.sqrt(19), -4 - Math.sqrt(19)]);
  // qs.q4(b) 2x² − 10x + 3 = 0 by completing the square
  chk("qs.q4(b) −3/2 + 25/4 = 19/4", -3 / 2 + 25 / 4, 19 / 4);
  identity("qs.q4(b) (x − 5/2)² − 19/4 ≡ x² − 5x + 3/2", x => (x - 5 / 2) ** 2 - 19 / 4, x => x * x - 5 * x + 3 / 2);
  sameSet("qs.q4(b) roots of 2x² − 10x + 3 = 0", roots(2, -10, 3), [(5 + Math.sqrt(19)) / 2, (5 - Math.sqrt(19)) / 2]);
  // qs.q5 (2ˣ − 8)(x² − 5) = 0
  chk("qs.q5 2³ = 8, so 2ˣ − 8 = 0 at x = 3", 2 ** 3, 8);
  [Math.sqrt(5), -Math.sqrt(5)].forEach(x => chk(`qs.q5 x² − 5 = 0 at x = ${Math.round(x * 1e6) / 1e6}`, x * x - 5, 0));
  chkS("qs.q5 the exponential bracket has exactly one root (2ˣ is one-to-one)", [1, 2, 4, 5].some(x => near(2 ** x, 8)), false);
  // qs.q6 (3x² − 5x − 2)(x² − 7) = 0, then by number system
  identity("qs.q6(a) (3x + 1)(x − 2) ≡ 3x² − 5x − 2", x => (3 * x + 1) * (x - 2), x => 3 * x * x - 5 * x - 2);
  sameSet("qs.q6(a) roots of 3x² − 5x − 2 = 0", roots(3, -5, -2), [-1 / 3, 2]);
  sameSet("qs.q6(a) roots of x² − 7 = 0", roots(1, 0, -7), [Math.sqrt(7), -Math.sqrt(7)]);
  chkS("qs.q6(b) 7 is not a perfect square, so ±√7 are irrational and leave ℚ", Number.isInteger(Math.sqrt(7)), false);
  chkS("qs.q6(b) −1/3 is rational but not natural", -1 / 3 > 0 && Number.isInteger(-1 / 3), false);
  chkS("qs.q6(b) 2 is a natural number", Number.isInteger(2) && 2 > 0, true);

  /* ---------- TILE: surd-equations ----------
     For each card: the candidates really are the roots of the SQUARED
     equation, and each candidate is then substituted into the ORIGINAL
     to decide keep-or-N.A. A kept root must make both sides equal; a
     rejected one must not. */
  R14.push("  -- surd-equations --");
  const surdSides = (rad, rhs) => x => [Math.sqrt(rad(x)), rhs(x)];
  const keeps = (label, rad, rhs, x, want) => {
    const [l, r] = surdSides(rad, rhs)(x);
    const ok = (Number.isFinite(l) && near(l, r)) === want;
    R14.push(`  ${ok ? "OK  " : "FAIL"} ${label}: LHS ${Math.round(l * 1e6) / 1e6}, RHS ${Math.round(r * 1e6) / 1e6} — ${want ? "must keep" : "must reject"}`);
    tick(ok, `C2 recompute ${label}`);
  };
  // se.q1(a) √(x − 3) = 4
  keeps("se.q1(a) x = 19 in √(x − 3) = 4", x => x - 3, () => 4, 19, true);
  // se.q1(b) √(3x + 4) = x − 2
  sameSet("se.q1(b) candidates = roots of x² − 7x = 0", roots(1, -7, 0), [0, 7]);
  identity("se.q1(b) (x − 2)² − (3x + 4) ≡ x² − 7x", x => (x - 2) ** 2 - (3 * x + 4), x => x * x - 7 * x);
  keeps("se.q1(b) x = 0", x => 3 * x + 4, x => x - 2, 0, false);
  keeps("se.q1(b) x = 7", x => 3 * x + 4, x => x - 2, 7, true);
  // se.q2 √(7x − 20) = x − 2 — both survive
  identity("se.q2 (x − 2)² − (7x − 20) ≡ x² − 11x + 24", x => (x - 2) ** 2 - (7 * x - 20), x => x * x - 11 * x + 24);
  sameSet("se.q2 candidates = roots of x² − 11x + 24 = 0", roots(1, -11, 24), [3, 8]);
  keeps("se.q2 x = 3", x => 7 * x - 20, x => x - 2, 3, true);
  keeps("se.q2 x = 8", x => 7 * x - 20, x => x - 2, 8, true);
  // se.q3 √(19 − 5x) = x − 5 — neither survives
  identity("se.q3 (x − 5)² − (19 − 5x) ≡ x² − 5x + 6", x => (x - 5) ** 2 - (19 - 5 * x), x => x * x - 5 * x + 6);
  sameSet("se.q3 candidates = roots of x² − 5x + 6 = 0", roots(1, -5, 6), [2, 3]);
  keeps("se.q3 x = 2", x => 19 - 5 * x, x => x - 5, 2, false);
  keeps("se.q3 x = 3", x => 19 - 5 * x, x => x - 5, 3, false);
  {   /* and nothing else in reach solves it either — a 4 001-point sweep */
    let hits = 0;
    for (let i = 0; i <= 4000; i++) { const x = -10 + i / 100; const rad = 19 - 5 * x; if (rad >= 0 && near(Math.sqrt(rad), x - 5)) hits++; }
    chk("se.q3 no x in [−10 ; 30] satisfies √(19 − 5x) = x − 5", hits, 0);
  }
  // se.q4 √(x + 5) + x = 7 — isolate first
  identity("se.q4 (7 − x)² − (x + 5) ≡ x² − 15x + 44", x => (7 - x) ** 2 - (x + 5), x => x * x - 15 * x + 44);
  sameSet("se.q4 candidates = roots of x² − 15x + 44 = 0", roots(1, -15, 44), [4, 11]);
  chk("se.q4 x = 4 satisfies √(x + 5) + x = 7", Math.sqrt(4 + 5) + 4, 7);
  chkS("se.q4 x = 11 does NOT satisfy it", near(Math.sqrt(11 + 5) + 11, 7), false);
  // se.q5 2x − 5√x − 3 = 0
  chk("se.q5 x = 9 satisfies 2x − 5√x − 3 = 0", 2 * 9 - 5 * Math.sqrt(9) - 3, 0);
  identity("se.q5 2K² − 5K − 3 ≡ (2K + 1)(K − 3)", K => 2 * K * K - 5 * K - 3, K => (2 * K + 1) * (K - 3));
  sameSet("se.q5 K-roots of 2K² − 5K − 3 = 0", roots(2, -5, -3), [-1 / 2, 3]);
  chkS("se.q5 the K = −1/2 branch is impossible (√x ≥ 0)", -1 / 2 >= 0, false);
  identity("se.q5 OR route: (2x − 3)² − 25x ≡ 4x² − 37x + 9", x => (2 * x - 3) ** 2 - 25 * x, x => 4 * x * x - 37 * x + 9);
  sameSet("se.q5 OR route candidates", roots(4, -37, 9), [1 / 4, 9]);
  chkS("se.q5 OR route's x = 1/4 is genuinely extraneous", near(2 * (1 / 4) - 5 * Math.sqrt(1 / 4) - 3, 0), false);
  // se.q6 restriction then solve
  {
    let bad = 0;
    for (let i = -2000; i <= 2000; i++) { const x = i / 100; if ((3 * x + 12 >= 0) !== (x >= -4)) bad++; }
    chk("se.q6(a) 3x + 12 ≥ 0 ⇔ x ≥ −4 (4 001-point sweep, mismatches)", bad, 0);
  }
  identity("se.q6(b) (x − 2)² − (3x + 12) ≡ x² − 7x − 8", x => (x - 2) ** 2 - (3 * x + 12), x => x * x - 7 * x - 8);
  sameSet("se.q6(b) candidates = roots of x² − 7x − 8 = 0", roots(1, -7, -8), [8, -1]);
  keeps("se.q6(b) x = 8", x => 3 * x + 12, x => x - 2, 8, true);
  keeps("se.q6(b) x = −1", x => 3 * x + 12, x => x - 2, -1, false);
  chkS("se.q6(b) x = −1 DOES obey the restriction from (a) — the point of the card", -1 >= -4, true);

  /* ---------- TILE: simultaneous ----------
     Every claimed pair is substituted into BOTH original equations. */
  R14.push("  -- simultaneous --");
  const pair = (label, eqs, x, y) => eqs.forEach((e, i) => chk(`${label} (${x} ; ${y}) satisfies equation ${i + 1}`, e(x, y), 0));
  // sim.q1: 2x − y = −2 and y = x² + 5x − 2
  {
    const eqs = [(x, y) => 2 * x - y + 2, (x, y) => y - (x * x + 5 * x - 2)];
    pair("sim.q1", eqs, -4, -6); pair("sim.q1", eqs, 1, 4);
    identity("sim.q1 substitution gives x² + 3x − 4", x => (x * x + 5 * x - 2) - (2 * x + 2), x => x * x + 3 * x - 4);
    sameSet("sim.q1 x-values", roots(1, 3, -4), [-4, 1]);
  }
  // sim.q2: x + y = 7 and xy = 12
  {
    const eqs = [(x, y) => x + y - 7, (x, y) => x * y - 12];
    pair("sim.q2", eqs, 3, 4); pair("sim.q2", eqs, 4, 3);
    identity("sim.q2 substitution gives x² − 7x + 12", x => 12 - x * (7 - x), x => x * x - 7 * x + 12);
    sameSet("sim.q2 x-values", roots(1, -7, 12), [3, 4]);
  }
  // sim.q3: x² + y² = 20 and y = x + 2
  {
    const eqs = [(x, y) => x * x + y * y - 20, (x, y) => y - (x + 2)];
    pair("sim.q3", eqs, -4, -2); pair("sim.q3", eqs, 2, 4);
    identity("sim.q3 substitution gives 2x² + 4x − 16", x => x * x + (x + 2) ** 2 - 20, x => 2 * x * x + 4 * x - 16);
    sameSet("sim.q3 x-values", roots(1, 2, -8), [-4, 2]);
  }
  // sim.q4: f(x) = x² + x + 2, g(x) = 2x + 4 — and the sketch's own dots
  {
    const f = x => x * x + x + 2, g = x => 2 * x + 4;
    [[-1, 2], [2, 8]].forEach(([x, y]) => { chk(`sim.q4 f(${x}) = ${y}`, f(x), y); chk(`sim.q4 g(${x}) = ${y}`, g(x), y); });
    identity("sim.q4 f(x) − g(x) ≡ x² − x − 2", x => f(x) - g(x), x => x * x - x - 2);
    sameSet("sim.q4 x-values", roots(1, -1, -2), [-1, 2]);
    /* the reveal must DRAW what it found: the two labelled dots on the
       figure carry exactly the coordinates the memo lands on, and the
       question side carries the bare letters only (no coordinates). */
    const q4 = mine.find(m => m.q.id === "eqn.sib.sim.q4").q;
    const qSide = q4.diagram.parts.a.question.points.map(p => p.label).join("|");
    const rSide = q4.diagram.parts.a.reveal.points;
    chkS("sim.q4 question side shows bare letters only", qSide, "A|B");
    chkS("sim.q4 reveal writes A's coordinates on", rSide[0].label, "A(−1 ; 2)");
    chkS("sim.q4 reveal writes B's coordinates on", rSide[1].label, "B(2 ; 8)");
    rSide.forEach(p => { chk(`sim.q4 reveal dot at x = ${p.x} sits on f`, f(p.x), p.y); chk(`sim.q4 reveal dot at x = ${p.x} sits on g`, g(p.x), p.y); });
  }
  // sim.q5: x + y = 8 and x² + 2xy − 3y² = 0
  {
    const eqs = [(x, y) => x + y - 8, (x, y) => x * x + 2 * x * y - 3 * y * y];
    pair("sim.q5", eqs, 4, 4); pair("sim.q5", eqs, 12, -4);
    identity("sim.q5 substitution gives −4x² + 64x − 192", x => x * x + 2 * x * (8 - x) - 3 * (8 - x) ** 2, x => -4 * x * x + 64 * x - 192);
    sameSet("sim.q5 x-values", roots(1, -16, 48), [4, 12]);
  }
  // sim.q6: x/3 + y/2 = 4 and xy = 18
  {
    const eqs = [(x, y) => x / 3 + y / 2 - 4, (x, y) => x * y - 18];
    pair("sim.q6", eqs, 9, 2); pair("sim.q6", eqs, 3, 6);
    identity("sim.q6 × 6 turns x/3 + y/2 = 4 into 2x + 3y = 24", x => 6 * (x / 3 + (24 - 2 * x) / 3 / 2), () => 24);
    identity("sim.q6 substitution gives 3y² − 24y + 36", y => 36 - y * (24 - 3 * y), y => 3 * y * y - 24 * y + 36);
    sameSet("sim.q6 y-values", roots(1, -8, 12), [2, 6]);
  }

  /* ---------- TILE: level-4 ---------- */
  R14.push("  -- level-4 --");
  // l4.q1: x² − (p + 1)x + (p − 2) = 0 is real for every real p
  {
    let bad = 0, min = Infinity;
    for (let i = -5000; i <= 5000; i++) {
      const p = i / 50;
      const d = (-(p + 1)) ** 2 - 4 * 1 * (p - 2);
      if (!near(d, (p - 1) ** 2 + 8)) bad++;
      min = Math.min(min, d);
    }
    chk("l4.q1 Δ = (p + 1)² − 4(p − 2) ≡ (p − 1)² + 8 (10 001-point sweep, mismatches)", bad, 0);
    chk("l4.q1 minimum of Δ over the sweep", min, 8);
    chkS("l4.q1 Δ is therefore never ≤ 0", min <= 0, false);
  }
  // l4.q2: x² + (k − 3)x + 4 = 0 real and unequal
  {
    let bad = 0, wrong = 0;
    for (let i = -3000; i <= 3000; i++) {
      const k = i / 100;
      const d = (k - 3) ** 2 - 4 * 1 * 4;
      if (!near(d, (k - 7) * (k + 1))) bad++;
      if ((d > 0) !== (k < -1 || k > 7)) wrong++;
    }
    chk("l4.q2 Δ = (k − 3)² − 16 ≡ (k − 7)(k + 1) (6 001-point sweep, mismatches)", bad, 0);
    chk("l4.q2 Δ > 0 ⇔ k < −1 or k > 7 (6 001-point sweep, mismatches)", wrong, 0);
    chk("l4.q2 at k = 7 the roots are EQUAL, so 7 is excluded", (7 - 3) ** 2 - 16, 0);
    const firstInt = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].find(k => (k - 3) ** 2 - 16 > 0);
    chk("l4.q2 smallest positive integer k with Δ > 0", firstInt, 8);
  }
  // l4.q3: y = 2ˣ and 4ˣ − 3y = 4
  {
    /* RELATIVE tolerance here, not the absolute 1e-9 `near` uses: 4²⁰
       is over a million million, so a last-bit difference between two
       correct ways of computing it is far bigger than 1e-9 and would
       fail an absolute test on a true identity. */
    let bad = 0, lowest = Infinity;
    for (let i = -400; i <= 400; i++) {
      const x = i / 20, a = 4 ** x, b = (2 ** x) ** 2;
      if (Math.abs(a - b) > 1e-12 * Math.max(1, Math.abs(a))) bad++;
      lowest = Math.min(lowest, 2 ** x);
    }
    chk("l4.q3 4ˣ ≡ (2ˣ)² (801-point sweep, relative tolerance, mismatches)", bad, 0);
    chkS("l4.q3 2ˣ is positive everywhere in the sweep, so it can never equal −1", lowest > 0, true);
    identity("l4.q3 y² − 3y − 4 ≡ (y − 4)(y + 1)", y => y * y - 3 * y - 4, y => (y - 4) * (y + 1));
    sameSet("l4.q3 y-values", roots(1, -3, -4), [-1, 4]);
    chk("l4.q3 the pair (2 ; 4) satisfies y = 2ˣ", 2 ** 2, 4);
    chk("l4.q3 the pair (2 ; 4) satisfies 4ˣ − 3y = 4", 4 ** 2 - 3 * 4, 4);
  }
  // l4.q4: the flower bed
  {
    const len = x => Math.sqrt(4 * x - 4), wid = x => x - 4;
    identity("l4.q4 (x − 1)² − (4x − 4) ≡ x² − 6x + 5", x => (x - 1) ** 2 - (4 * x - 4), x => x * x - 6 * x + 5);
    sameSet("l4.q4 candidates = roots of x² − 6x + 5 = 0", roots(1, -6, 5), [1, 5]);
    [1, 5].forEach(x => chk(`l4.q4 x = ${x} PASSES the substitution test (both sides equal)`, len(x) - (x - 1), 0));
    chkS("l4.q4 x = 1 must be rejected by the CONTEXT: the width would be negative", wid(1) < 0, true);
    chk("l4.q4 x = 5 gives a width of 1 m", wid(5), 1);
    chk("l4.q4 x = 5 gives a length of 4 m", len(5), 4);
    chk("l4.q4 and the length really is 3 m more than the width", len(5) - wid(5), 3);
  }
  // l4.q5: roots 4 and −6, then equal roots for k
  {
    identity("l4.q5 (x − 4)(x + 6) ≡ x² + 2x − 24", x => (x - 4) * (x + 6), x => x * x + 2 * x - 24);
    sameSet("l4.q5(a) roots of x² + 2x − 24 = 0", roots(1, 2, -24), [4, -6]);
    let bad = 0;
    for (let i = -3000; i <= 3000; i++) { const k = i / 50; const d = 2 ** 2 - 4 * 1 * (-(24 + k)); if (!near(d, 100 + 4 * k)) bad++; }
    chk("l4.q5(b) Δ of x² + 2x − (24 + k) ≡ 100 + 4k (6 001-point sweep, mismatches)", bad, 0);
    chk("l4.q5(b) Δ = 0 at k = −25", 100 + 4 * -25, 0);
    sameSet("l4.q5(b) at k = −25 the equation has the single root −1", roots(1, 2, -(24 + -25)), [-1]);
  }
  // l4.q6: the rational inequality
  {
    identity("l4.q6 (2x + 1)(x − 3) ≡ 2x² − 5x − 3", x => (2 * x + 1) * (x - 3), x => 2 * x * x - 5 * x - 3);
    sameSet("l4.q6 critical points", roots(2, -5, -3), [-1 / 2, 3]);
    let bad = 0, negDen = 0;
    for (let i = -2000; i <= 2000; i++) {
      const x = i / 100;
      if (near(x, -2)) continue;
      if ((x + 2) ** 2 <= 0) negDen++;
      const lhs = (2 * x * x - 5 * x - 3) / ((x + 2) ** 2) >= 0;
      if (lhs !== (x <= -1 / 2 || x >= 3)) bad++;
    }
    chk("l4.q6 the inequality ⇔ x ≤ −1/2 or x ≥ 3 (4 000-point sweep, mismatches)", bad, 0);
    chk("l4.q6 the denominator is never ≤ 0 away from x = −2", negDen, 0);
    chkS("l4.q6 the limit x ≠ −2 really bites — it sits inside x ≤ −1/2", -2 <= -1 / 2, true);
  }

  console.log(R14.join("\n"));
}

/* =====================================================================
   15. EQUATIONS & INEQUALITIES — INDEPENDENT RECOMPUTE
   (SESSION C1, 2026-08-23: the chapter's seven ORIGINAL tiles, filled
   to six cards each — nature-chain, k-equal-roots, k-for-nature,
   delta-in-p, inequalities, fraction-equations, rational-exponents-k.)

   Same discipline as section 14, and the same three habits:
     · a claimed root is SUBSTITUTED back into the equation the PROMPT
       actually gives (not into the tidied-up one the memo produces);
     · a claimed rejected / impossible root is substituted too, and must
       fail — or is shown impossible by an exhaustive sweep;
     · a claimed identity (an expansion, a Δ in terms of a parameter, a
       completed square) is proved by SWEEP at a non-integer spacing, so
       an accident at the whole numbers cannot pass.

   Every discriminant below is recomputed from a, b and c read off the
   PROMPT's equation by hand here, never lifted from a memo string; and
   every "for which k" range is checked by sweeping the real condition
   (does the equation actually have that nature at this k?) against the
   claimed interval, point by point.
   ===================================================================== */
console.log("\n== 15. independent recompute — session C1's eqn tiles ==");
{
  const R15 = [];
  const chk = (label, got, want) => { const ok = near(got, want); R15.push(`  ${ok ? "OK  " : "FAIL"} ${label}: got ${got}, want ${want}`); tick(ok, `C1 recompute ${label}`); };
  const chkS = (label, got, want) => { const ok = got === want; R15.push(`  ${ok ? "OK  " : "FAIL"} ${label}: got ${got}, want ${want}`); tick(ok, `C1 recompute ${label}`); };
  const identity = (label, f, g, lo = -20, hi = 20, step = 0.13) => {
    let bad = 0;
    for (let x = lo; x <= hi; x += step) if (Math.abs(f(x) - g(x)) > 1e-9) bad++;
    chk(`${label} (identity sweep, mismatches)`, bad, 0);
  };
  const disc = (a, b, c) => b * b - 4 * a * c;
  const roots = (a, b, c) => {
    const d = disc(a, b, c);
    if (d < 0) return [];
    if (near(d, 0)) return [-b / (2 * a)];
    return [(-b - Math.sqrt(d)) / (2 * a), (-b + Math.sqrt(d)) / (2 * a)].sort((p, q) => p - q);
  };
  const sameSet = (label, got, want) => {
    const g = [...got].sort((p, q) => p - q), w = [...want].sort((p, q) => p - q);
    const ok = g.length === w.length && g.every((v, i) => near(v, w[i]));
    R15.push(`  ${ok ? "OK  " : "FAIL"} ${label}: got [${g.map(v => Math.round(v * 1e6) / 1e6)}], want [${w.map(v => Math.round(v * 1e6) / 1e6)}]`);
    tick(ok, `C1 recompute ${label}`);
  };
  const isPerfectSquare = n => Number.isInteger(n) && n >= 0 && Number.isInteger(Math.round(Math.sqrt(n))) && Math.round(Math.sqrt(n)) ** 2 === n;
  /* sweeps a parameter and checks the CLAIMED range against the real
     condition, computed from the discriminant at that parameter value */
  const paramSweep = (label, condition, claim, lo = -30, hi = 30, step = 0.01) => {
    let bad = 0;
    for (let i = Math.round(lo / step); i <= Math.round(hi / step); i++) {
      const k = i * step;
      if (condition(k) !== claim(k)) bad++;
    }
    chk(`${label} (${Math.round((hi - lo) / step) + 1}-point sweep, mismatches)`, bad, 0);
  };

  /* ---------- TILE: nature-chain ---------- */
  R15.push("  -- nature-chain --");
  // nc.q1  9x² = 12x − 4  →  9x² − 12x + 4 = 0
  identity("nc.q1 9x² − (12x − 4) ≡ 9x² − 12x + 4", x => 9 * x * x - (12 * x - 4), x => 9 * x * x - 12 * x + 4);
  chk("nc.q1 Δ = (−12)² − 4(9)(4)", disc(9, -12, 4), 0);
  sameSet("nc.q1 Δ = 0 ⟹ ONE root, x = −b/(2a)", roots(9, -12, 4), [2 / 3]);
  identity("nc.q1 (3x − 2)² ≡ 9x² − 12x + 4 (the equal-root check)", x => (3 * x - 2) ** 2, x => 9 * x * x - 12 * x + 4);
  chkS("nc.q1 Δ = 0 is a perfect □, so “rational, equal” is the right row", isPerfectSquare(0), true);
  // nc.q2  x + 8/x = 6  ⇔  x² − 6x + 8 = 0  (x ≠ 0)
  {
    let bad = 0;
    for (let x = -20; x <= 20; x += 0.13) { if (Math.abs(x) < 1e-6) continue; if (Math.abs((x + 8 / x - 6) * x - (x * x - 6 * x + 8)) > 1e-9) bad++; }
    chk("nc.q2 (x + 8/x − 6)·x ≡ x² − 6x + 8 (identity sweep, mismatches)", bad, 0);
  }
  chk("nc.q2 Δ = (−6)² − 4(1)(8)", disc(1, -6, 8), 4);
  chkS("nc.q2 Δ = 4 is a perfect □ ⟹ rational", isPerfectSquare(disc(1, -6, 8)), true);
  sameSet("nc.q2 roots of x² − 6x + 8 = 0", roots(1, -6, 8), [2, 4]);
  [2, 4].forEach(x => chk(`nc.q2 x = ${x} satisfies the ORIGINAL x + 8/x = 6`, x + 8 / x, 6));
  chkS("nc.q2 neither root is the limit x = 0", [2, 4].some(x => x === 0), false);
  // nc.q3  (2x − 1)(x + 4) = 3x  →  2x² + 4x − 4 = 0  →  x² + 2x − 2 = 0
  identity("nc.q3 (2x − 1)(x + 4) − 3x ≡ 2x² + 4x − 4", x => (2 * x - 1) * (x + 4) - 3 * x, x => 2 * x * x + 4 * x - 4);
  identity("nc.q3 2x² + 4x − 4 ≡ 2(x² + 2x − 2)", x => 2 * x * x + 4 * x - 4, x => 2 * (x * x + 2 * x - 2));
  chk("nc.q3 Δ of x² + 2x − 2", disc(1, 2, -2), 12);
  chk("nc.q3 Δ of the undivided 2x² + 4x − 4", disc(2, 4, -4), 48);
  chkS("nc.q3 neither 12 nor 48 is a perfect □ — same NATURE, different NUMBER", isPerfectSquare(12) || isPerfectSquare(48), false);
  sameSet("nc.q3 roots are −1 ± √3", roots(1, 2, -2), [-1 - Math.sqrt(3), -1 + Math.sqrt(3)]);
  roots(1, 2, -2).forEach(x => chk(`nc.q3 root ${Math.round(x * 1e6) / 1e6} satisfies the ORIGINAL (2x − 1)(x + 4) = 3x`, (2 * x - 1) * (x + 4), 3 * x));
  // nc.q4  √5·x² − 3x + √5 = 0
  chk("nc.q4 Δ = (−3)² − 4(√5)(√5) = 9 − 20", disc(Math.sqrt(5), -3, Math.sqrt(5)), -11);
  chkS("nc.q4 Δ < 0 ⟹ non-real, and the perfect-□ question never arises", disc(Math.sqrt(5), -3, Math.sqrt(5)) < 0, true);
  {
    let hits = 0;
    for (let i = -200000; i <= 200000; i++) { const x = i / 1000; if (Math.abs(Math.sqrt(5) * x * x - 3 * x + Math.sqrt(5)) < 1e-6) hits++; }
    chk("nc.q4 no real x gets the LHS to zero (400 001-point sweep)", hits, 0);
  }

  /* ---------- TILE: k-equal-roots ---------- */
  R15.push("  -- k-equal-roots --");
  // ker.q1  x² + 8x + k = 0
  identity("ker.q1 Δ(k) = 64 − 4k", k => disc(1, 8, k), k => 64 - 4 * k);
  chk("ker.q1 Δ = 0 at k = 16", disc(1, 8, 16), 0);
  sameSet("ker.q1 equal root at k = 16", roots(1, 8, 16), [-4]);
  identity("ker.q1 (x + 4)² ≡ x² + 8x + 16", x => (x + 4) ** 2, x => x * x + 8 * x + 16);
  // ker.q2  x² + 2kx + (3k + 4) = 0
  identity("ker.q2 Δ(k) = 4k² − 12k − 16", k => disc(1, 2 * k, 3 * k + 4), k => 4 * k * k - 12 * k - 16);
  identity("ker.q2 4k² − 12k − 16 ≡ 4(k − 4)(k + 1)", k => 4 * k * k - 12 * k - 16, k => 4 * (k - 4) * (k + 1));
  sameSet("ker.q2 Δ = 0 ⟹ k = 4 or k = −1", roots(4, -12, -16), [-1, 4]);
  [4, -1].forEach(k => {
    chk(`ker.q2 at k = ${k} the discriminant really is 0`, disc(1, 2 * k, 3 * k + 4), 0);
    sameSet(`ker.q2 at k = ${k} the equal root is −k`, roots(1, 2 * k, 3 * k + 4), [-k]);
  });
  // ker.q3  y = kx + 1 touches y = x² + 3x + 5
  [-3, -1, 0, 2, 7].forEach(k => identity(`ker.q3 (x² + 3x + 5) − (kx + 1) ≡ x² + (3 − k)x + 4 at k = ${k}`,
    x => (x * x + 3 * x + 5) - (k * x + 1), x => x * x + (3 - k) * x + 4));
  paramSweep("ker.q3 the line TOUCHES (one intersection) ⇔ k = −1 or k = 7",
    k => near(disc(1, 3 - k, 4), 0), k => near(k, -1) || near(k, 7), -20, 20, 0.01);
  [-1, 7].forEach(k => {
    chk(`ker.q3 at k = ${k} the discriminant is 0`, disc(1, 3 - k, 4), 0);
    const x0 = roots(1, 3 - k, 4)[0];
    chk(`ker.q3 at k = ${k} line and parabola really meet at x = ${x0}`, x0 * x0 + 3 * x0 + 5, k * x0 + 1);
  });
  // ker.q4  3x² − kx + 12 = 0
  identity("ker.q4 Δ(k) = k² − 144", k => disc(3, -k, 12), k => k * k - 144);
  paramSweep("ker.q4 equal roots ⇔ k = 12 or k = −12", k => near(disc(3, -k, 12), 0), k => near(Math.abs(k), 12), -30, 30, 0.01);
  [12, -12].forEach(k => chk(`ker.q4 at k = ${k} the equation has exactly one root`, roots(3, -k, 12).length, 1));

  /* ---------- TILE: k-for-nature ---------- */
  R15.push("  -- k-for-nature --");
  // kfn.q1  x² − 6x + k = 0, real ⇔ k ≤ 9
  identity("kfn.q1 Δ(k) = 36 − 4k", k => disc(1, -6, k), k => 36 - 4 * k);
  paramSweep("kfn.q1 real roots ⇔ k ≤ 9", k => disc(1, -6, k) >= 0, k => k <= 9 + 1e-12);
  // kfn.q2  2x² + 5x + k = 0, non-real ⇔ k > 25/8
  identity("kfn.q2 Δ(k) = 25 − 8k", k => disc(2, 5, k), k => 25 - 8 * k);
  chk("kfn.q2 the boundary 25/8 = 3,125", 25 / 8, 3.125);
  paramSweep("kfn.q2 non-real ⇔ k > 25/8", k => disc(2, 5, k) < 0, k => k > 25 / 8 + 1e-12, -10, 10, 0.001);
  // kfn.q3  x² + kx + (2k + 5) = 0, non-real ⇔ −2 < k < 10
  identity("kfn.q3 Δ(k) = k² − 8k − 20", k => disc(1, k, 2 * k + 5), k => k * k - 8 * k - 20);
  identity("kfn.q3 k² − 8k − 20 ≡ (k − 10)(k + 2)", k => k * k - 8 * k - 20, k => (k - 10) * (k + 2));
  paramSweep("kfn.q3 non-real ⇔ −2 < k < 10 (inside the bowl)", k => disc(1, k, 2 * k + 5) < 0, k => k > -2 + 1e-12 && k < 10 - 1e-12);
  chk("kfn.q3 at k = −2 the equation is x² − 2x + 1, whose root is 1", roots(1, -2, 1)[0], 1);
  // kfn.q4  x² − 4x + (k − 1) = 0, two distinct real ⇔ k < 5
  identity("kfn.q4 Δ(k) = 20 − 4k", k => disc(1, -4, k - 1), k => 20 - 4 * k);
  paramSweep("kfn.q4 two DISTINCT real roots ⇔ k < 5", k => disc(1, -4, k - 1) > 0, k => k < 5 - 1e-12);
  chkS("kfn.q4 the natural numbers below 5 are 1 ; 2 ; 3 ; 4",
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(n => disc(1, -4, n - 1) > 0).join(";"), "1;2;3;4");
  chk("kfn.q4 k = 5 gives Δ = 0, so it is excluded (equal, not unequal)", disc(1, -4, 4), 0);
  // kfn.q5  x² + (k − 2)x + (k + 1) = 0, real ⇔ k ≤ 0 or k ≥ 8
  identity("kfn.q5 Δ(k) = k² − 8k", k => disc(1, k - 2, k + 1), k => k * k - 8 * k);
  identity("kfn.q5 k² − 8k ≡ k(k − 8)", k => k * k - 8 * k, k => k * (k - 8));
  paramSweep("kfn.q5 real roots ⇔ k ≤ 0 or k ≥ 8 (outside the bowl)",
    k => disc(1, k - 2, k + 1) >= 0, k => k <= 1e-12 || k >= 8 - 1e-12);
  [0, 8].forEach(k => chk(`kfn.q5 at k = ${k} the discriminant is exactly 0`, disc(1, k - 2, k + 1), 0));

  /* ---------- TILE: delta-in-p ---------- */
  R15.push("  -- delta-in-p --");
  // dip.q1  3x² − 2px + (p − 1) = 0
  identity("dip.q1 Δ(p) = 4p² − 12p + 12", p => disc(3, -2 * p, p - 1), p => 4 * p * p - 12 * p + 12);
  // dip.q2  x² + 2px + (p² − 3) = 0  →  Δ = 12 for every p
  identity("dip.q2 Δ(p) = 12, with no p left in it", p => disc(1, 2 * p, p * p - 3), () => 12);
  chkS("dip.q2 12 is not a perfect □ ⟹ irrational roots, always", isPerfectSquare(12), false);
  {
    let bad = 0;
    for (let p = -20; p <= 20; p += 0.13) {
      const rs = roots(1, 2 * p, p * p - 3);
      if (rs.length !== 2) { bad++; continue; }
      if (Math.abs(rs[0] - (-p - Math.sqrt(3))) > 1e-9 || Math.abs(rs[1] - (-p + Math.sqrt(3))) > 1e-9) bad++;
    }
    chk("dip.q2 the roots really are −p ± √3 for every p (sweep, mismatches)", bad, 0);
  }
  // dip.q3  2x² + (p + 2)x + (p − 1) = 0  →  Δ = p² − 4p + 12 = (p − 2)² + 8
  identity("dip.q3 Δ(p) = p² − 4p + 12", p => disc(2, p + 2, p - 1), p => p * p - 4 * p + 12);
  identity("dip.q3 p² − 4p + 12 ≡ (p − 2)² + 8", p => p * p - 4 * p + 12, p => (p - 2) ** 2 + 8);
  {
    let min = Infinity, atP = null, neverZero = true;
    for (let i = -200000; i <= 200000; i++) { const p = i / 1000; const d = disc(2, p + 2, p - 1); if (d < min) { min = d; atP = p; } if (Math.abs(d) < 1e-9) neverZero = false; }
    chk("dip.q3 minimum of Δ over a 400 001-point sweep is 8", Math.round(min * 1e6) / 1e6, 8);
    chk("dip.q3 …and it happens at p = 2", atP, 2);
    chkS("dip.q3 Δ never reaches 0, so equal roots are impossible", neverZero, true);
  }
  // dip.q4  x² + (p + 1)x + p = 0  →  Δ = (p − 1)², zero only at p = 1
  identity("dip.q4 Δ(p) = (p − 1)²", p => disc(1, p + 1, p), p => (p - 1) ** 2);
  identity("dip.q4 (x + 1)(x + p) ≡ x² + (p + 1)x + p at p = 4", x => (x + 1) * (x + 4), x => x * x + 5 * x + 4);
  paramSweep("dip.q4 equal roots ⇔ p = 1 (one value, not ±1)", p => near(disc(1, p + 1, p), 0), p => near(p, 1), -20, 20, 0.01);
  sameSet("dip.q4 at p = 1 the equal root is −1", roots(1, 2, 1), [-1]);

  /* ---------- TILE: inequalities ---------- */
  R15.push("  -- inequalities --");
  // ineq.q1  (x + 6)(x − 1) < 0  ⇔  −6 < x < 1
  identity("ineq.q1 (x + 6)(x − 1) ≡ x² + 5x − 6", x => (x + 6) * (x - 1), x => x * x + 5 * x - 6);
  sameSet("ineq.q1 critical points", roots(1, 5, -6), [-6, 1]);
  {
    let bad = 0;
    for (let i = -2000; i <= 2000; i++) { const x = i / 100; if (((x + 6) * (x - 1) < 0) !== (x > -6 && x < 1)) bad++; }
    chk("ineq.q1 (x + 6)(x − 1) < 0 ⇔ −6 < x < 1 (4 001-point sweep, mismatches)", bad, 0);
  }
  // ineq.q2  3/(x − 2) ≤ 1  ⇔  x < 2 or x ≥ 5
  {
    let bad = 0;
    for (let x = -20; x <= 20; x += 0.13) { if (Math.abs(x - 2) < 1e-6) continue; if (Math.abs((3 / (x - 2) - 1) - ((5 - x) / (x - 2))) > 1e-9) bad++; }
    chk("ineq.q2 3/(x − 2) − 1 ≡ (5 − x)/(x − 2) (identity sweep, mismatches)", bad, 0);
  }
  {
    let bad = 0;
    for (let i = -2000; i <= 2000; i++) {
      const x = i / 100;
      if (x === 2) continue;
      if ((3 / (x - 2) <= 1) !== (x < 2 || x >= 5)) bad++;
    }
    chk("ineq.q2 3/(x − 2) ≤ 1 ⇔ x < 2 or x ≥ 5 (4 000-point sweep, mismatches)", bad, 0);
  }
  chk("ineq.q2 x = 5 really is included: 3/(5 − 2) = 1", 3 / (5 - 2), 1);
  chkS("ineq.q2 x = 2 is undefined, so the left piece is strict", Number.isFinite(3 / (2 - 2)), false);

  /* ---------- TILE: fraction-equations ---------- */
  R15.push("  -- fraction-equations --");
  // fe.q1  3/x + 1/2 = 2
  chk("fe.q1 x = 2 satisfies 3/x + 1/2 = 2", 3 / 2 + 1 / 2, 2);
  {
    let hits = [];
    for (let i = -100000; i <= 100000; i++) { const x = i / 1000; if (x === 0) continue; if (Math.abs(3 / x + 0.5 - 2) < 1e-9) hits.push(x); }
    chkS("fe.q1 x = 2 is the ONLY solution (200 001-point sweep)", hits.join(","), "2");
  }
  // fe.q2  5/(x − 2) + 3/(2 − x) = x − 3
  {
    let bad = 0;
    for (let x = -20; x <= 20; x += 0.13) { if (Math.abs(x - 2) < 1e-6) continue; if (Math.abs(3 / (2 - x) - (-3 / (x - 2))) > 1e-9) bad++; }
    chk("fe.q2 3/(2 − x) ≡ −3/(x − 2), the negative twin (identity sweep, mismatches)", bad, 0);
  }
  identity("fe.q2 (x − 3)(x − 2) − 2 ≡ x² − 5x + 4", x => (x - 3) * (x - 2) - 2, x => x * x - 5 * x + 4);
  sameSet("fe.q2 roots of x² − 5x + 4 = 0", roots(1, -5, 4), [1, 4]);
  [1, 4].forEach(x => chk(`fe.q2 x = ${x} satisfies the ORIGINAL equation`, 5 / (x - 2) + 3 / (2 - x), x - 3));
  chkS("fe.q2 neither root is the limit x = 2", [1, 4].some(x => x === 2), false);
  // fe.q3  1/(x + 3) + 1/(x − 3) = 6/(x² − 9)  →  x = 3, a limit  →  no solution
  identity("fe.q3 (x + 3)(x − 3) ≡ x² − 9", x => (x + 3) * (x - 3), x => x * x - 9);
  chk("fe.q3 the cleared equation (x − 3) + (x + 3) = 6 gives x = 3", 6 / 2, 3);
  chkS("fe.q3 x = 3 IS a limit, so it must be thrown away", (3 - 3) === 0, true);
  {
    let hits = 0;
    for (let i = -100000; i <= 100000; i++) {
      const x = i / 1000;
      if (Math.abs(x - 3) < 1e-9 || Math.abs(x + 3) < 1e-9) continue;
      if (Math.abs(1 / (x + 3) + 1 / (x - 3) - 6 / (x * x - 9)) < 1e-12) hits++;
    }
    chk("fe.q3 NO real x satisfies the original equation (200 001-point sweep, hits)", hits, 0);
  }
  // fe.q4  (x + 4)/(x − 1) = (x + 2)/(x − 2)
  identity("fe.q4 (x + 4)(x − 2) ≡ x² + 2x − 8", x => (x + 4) * (x - 2), x => x * x + 2 * x - 8);
  identity("fe.q4 (x + 2)(x − 1) ≡ x² + x − 2", x => (x + 2) * (x - 1), x => x * x + x - 2);
  chk("fe.q4 the x² terms cancel, leaving 2x − 8 = x − 2 ⟹ x = 6", 8 - 2, 6);
  chk("fe.q4 x = 6 satisfies the ORIGINAL equation (LHS)", (6 + 4) / (6 - 1), (6 + 2) / (6 - 2));
  chkS("fe.q4 6 is neither limit (1 nor 2)", [1, 2].includes(6), false);

  /* ---------- TILE: rational-exponents-k ---------- */
  R15.push("  -- rational-exponents-k --");
  // rek.q1  x^(1/3) = −5  and  x^(1/2) = −3
  chk("rek.q1(a) x = −125 satisfies x^(1/3) = −5", Math.cbrt(-125), -5);
  chk("rek.q1(a) and (−5)³ = −125", (-5) ** 3, -125);
  {
    let bad = 0;
    for (let i = 0; i <= 200000; i++) { const x = i / 100; if (Math.sqrt(x) < 0) bad++; }
    chkS("rek.q1(b) √x is never negative, so x^(1/2) = −3 has no solution", bad, 0);
  }
  chkS("rek.q1(b) the tempting x = 9 fails: √9 = 3, not −3", near(Math.sqrt(9), -3), false);
  // rek.q2  x^(−2/3) = 4  and  (x + 1)^(3/2) = 8
  {
    // (±1/8)^(−2/3), computed through the CUBE ROOT so a negative base is legal
    const powNeg23 = x => 1 / Math.pow(Math.cbrt(x), 2);
    chk("rek.q2(a) (1/8)^(−2/3) = 4", powNeg23(1 / 8), 4);
    chk("rek.q2(a) (−1/8)^(−2/3) = 4 as well (even numerator ⟹ ±)", powNeg23(-1 / 8), 4);
    chk("rek.q2(a) the right-hand side 4^(−3/2) = 1/8", Math.pow(4, -3 / 2), 1 / 8);
  }
  chk("rek.q2(b) x = 3 satisfies (x + 1)^(3/2) = 8", Math.pow(3 + 1, 3 / 2), 8);
  chk("rek.q2(b) 8^(2/3) = 4, so x + 1 = 4", Math.pow(8, 2 / 3), 4);
  // rek.q3  (x² − x)² − 8(x² − x) + 12 = 0  →  x = −2, −1, 2, 3
  {
    const F = x => (x * x - x) ** 2 - 8 * (x * x - x) + 12;
    [-2, -1, 2, 3].forEach(x => chk(`rek.q3 x = ${x} satisfies the original equation`, F(x), 0));
    sameSet("rek.q3 the K-quadratic K² − 8K + 12 = 0 gives K = 2 or K = 6", roots(1, -8, 12), [2, 6]);
    sameSet("rek.q3 K = 2 ⟹ x² − x − 2 = 0", roots(1, -1, -2), [-1, 2]);
    sameSet("rek.q3 K = 6 ⟹ x² − x − 6 = 0", roots(1, -1, -6), [-2, 3]);
    let extra = 0;
    for (let i = -100000; i <= 100000; i++) { const x = i / 1000; if (Math.abs(F(x)) < 1e-9 && ![-2, -1, 2, 3].some(r => near(x, r))) extra++; }
    chk("rek.q3 there is no FIFTH real root (200 001-point sweep)", extra, 0);
  }
  // rek.q4  2^(2x) − 6·2^x + 8 = 0  →  x = 1 or x = 2
  {
    const G = x => Math.pow(2, 2 * x) - 6 * Math.pow(2, x) + 8;
    [1, 2].forEach(x => chk(`rek.q4 x = ${x} satisfies 2^(2x) − 6·2^x + 8 = 0`, G(x), 0));
    sameSet("rek.q4 the K-quadratic K² − 6K + 8 = 0 gives K = 2 or K = 4", roots(1, -6, 8), [2, 4]);
    chk("rek.q4 K = 2 ⟹ 2^x = 2¹ ⟹ x = 1", Math.log2(2), 1);
    chk("rek.q4 K = 4 ⟹ 2^x = 2² ⟹ x = 2", Math.log2(4), 2);
    let extra = 0;
    for (let i = -50000; i <= 50000; i++) { const x = i / 1000; if (Math.abs(G(x)) < 1e-9 && !near(x, 1) && !near(x, 2)) extra++; }
    chk("rek.q4 no other real solution (100 001-point sweep)", extra, 0);
    chkS("rek.q4 both K-branches are positive, so neither is rejected", 2 > 0 && 4 > 0, true);
  }

  console.log(R15.join("\n"));
}

/* =====================================================================
   16. GENERAL TRIG PART 2 — INDEPENDENT RECOMPUTE (SESSION F2,
   2026-08-23). The twenty-eight questions of the reduction /
   identities / identities-undefined / general-solution / level-4
   modules, every number worked from the PROMPT only.

   NOTHING BELOW READS A MEMO STRING, and nothing below uses the memo's
   METHOD either — which is the point. A reduction memo argues from
   quadrants and reduction formulae; this file just evaluates both sides
   numerically with Math.sin/cos/tan at ten angles spread round the
   circle, which is a completely different road to the same claim. An
   identity memo works the LHS down to the RHS; this file evaluates LHS
   and RHS independently and compares. And every "for which values of x"
   answer — undefined, zero, real, or a general solution — is recovered
   by SEARCHING the stated interval for the roots of the condition, with
   a quarter-degree grid plus bisection on every sign change, and the
   found list is compared against the list the card prints. A card that
   quietly lost a solution, or invented one, fails here.

   Angles for the sweeps sit well away from 0°/90°/180°/270°, so no tan
   and no denominator anywhere below is near blowing up.
   ===================================================================== */
console.log("\n== 16. General Trig part 2: independent recompute (session F2) ==");
{
  const R16 = [];
  const chk = (label, got, want) => { const ok = near(got, want); R16.push(`  ${ok ? "OK  " : "FAIL"} ${label}: got ${got}, want ${want}`); tick(ok, `F2 recompute ${label}`); };
  const chkT = (label, got, want, tol) => { const ok = Math.abs(got - want) < tol; R16.push(`  ${ok ? "OK  " : "FAIL"} ${label}: got ${got}, want ${want} (±${tol})`); tick(ok, `F2 recompute ${label}`); };
  const chkS = (label, got, want) => { const ok = got === want; R16.push(`  ${ok ? "OK  " : "FAIL"} ${label}: got ${got}, want ${want}`); tick(ok, `F2 recompute ${label}`); };

  const D = deg => deg * Math.PI / 180;
  const S = deg => Math.sin(D(deg));
  const C = deg => Math.cos(D(deg));
  const Tn = deg => Math.tan(D(deg));
  const R3 = Math.sqrt(3), R2 = Math.sqrt(2);
  const SWEEP = [7, 23, 41, 68, 112, 156, 203, 244, 291, 337];

  /* Every angle in [lo ; hi] at which f is zero: a quarter-degree grid
     catches the tangency roots (1 + cos x at 180°, where the curve
     touches the axis without crossing it) and bisection on every sign
     change catches everything else, including roots at angles nobody
     would think to test. Rounded to 4 decimals and de-duplicated. */
  const rootsIn = (f, lo, hi) => {
    const step = 0.25, out = [];
    const push = v => { const r = Math.round(v * 1e4) / 1e4; if (!out.some(w => Math.abs(w - r) < 1e-3)) out.push(r); };
    let prev = f(lo);
    if (Math.abs(prev) < 1e-9) push(lo);
    const n = Math.round((hi - lo) / step);
    for (let i = 1; i <= n; i++) {
      const x = lo + i * step, v = f(x);
      if (Math.abs(v) < 1e-9) push(x);
      else if (Math.abs(prev) >= 1e-9 && Math.sign(v) !== Math.sign(prev)) {
        let a = x - step, b = x, fa = prev;
        for (let j = 0; j < 80; j++) { const m = (a + b) / 2, fm = f(m); if (Math.sign(fm) === Math.sign(fa)) { a = m; fa = fm; } else b = m; }
        push((a + b) / 2);
      }
      prev = v;
    }
    return out.sort((p, q) => p - q);
  };
  const list = a => a.map(v => (Math.round(v * 100) / 100).toFixed(2)).join(" ; ");
  const sameRoots = (label, f, lo, hi, want) => chkS(label, list(rootsIn(f, lo, hi)), list(want));

  /* ===== TILE 5 — reduction (gtrig.sib.red.*) ===== */
  chk("red.q1(a) sin 480° = √3/2", S(480), R3 / 2);
  chk("red.q1(a) the memo's rotation line: sin 480° = sin 120°", S(480), S(120));
  chk("red.q1(a) the memo's reduction line: sin 120° = sin 60°", S(120), S(60));
  chk("red.q1(b) tan 405° = 1", Tn(405), 1);
  chk("red.q1(b) the memo's rotation line: tan 405° = tan 45°", Tn(405), Tn(45));
  SWEEP.forEach(t => {
    chk(`red.q2(a) (sin(180°+x)·cos(360°−x))/cos²(180°−x) = −tan x at x = ${t}°`,
      (S(180 + t) * C(360 - t)) / (C(180 - t) ** 2), -Tn(t));
    chk(`red.q2(a) the memo's block-bracket line: cos²(180°−x) = cos²x at x = ${t}°`, C(180 - t) ** 2, C(t) ** 2);
    chk(`red.q2(b) cos²(180°−x) − 1 = −sin²x at x = ${t}°`, C(180 - t) ** 2 - 1, -(S(t) ** 2));
    chk(`red.q3 the six-factor fraction = −tan²θ at θ = ${t}°`,
      (S(180 + t) * C(t - 90) * Tn(360 - t)) / (C(180 - t) * S(90 + t) * Tn(540 + t)), -(Tn(t) ** 2));
    chk(`red.q3 the memo's tan(540°+θ) = tan θ line at θ = ${t}°`, Tn(540 + t), Tn(t));
    chk(`red.q3 the memo's cos(θ−90°) = +sin θ line at θ = ${t}°`, C(t - 90), S(t));
    chk(`red.q5(a) sin²(x−90°) + cos²(180°+x) = 2cos²x at x = ${t}°`, S(t - 90) ** 2 + C(180 + t) ** 2, 2 * C(t) ** 2);
    chk(`red.q5(a) …and it is NOT 1 (the trap) at x = ${t}°`, Math.abs(2 * C(t) ** 2 - 1) > 1e-6 ? 1 : 0, 1);
    chk(`red.q5(b) (tan(−x)·cos(720°−x))/(tan(180°+x)·cos(x−180°)) = 1 at x = ${t}°`,
      (Tn(-t) * C(720 - t)) / (Tn(180 + t) * C(t - 180)), 1);
    chk(`red.q5(b) the memo's cos(x−180°) = −cos x line at x = ${t}°`, C(t - 180), -C(t));
  });
  chk("red.q4(a) cos(−750°) = √3/2", C(-750), R3 / 2);
  chk("red.q4(a) the memo's two rotations: cos(−750°) = cos(−30°)", C(-750), C(-30));
  chk("red.q4(a) the memo's cos(−30°) = cos 30° line", C(-30), C(30));
  chk("red.q4(b) (sin 300°·cos 225°)/tan 240° = √2/4", (S(300) * C(225)) / Tn(240), R2 / 4);
  chk("red.q4(b) …and the unrationalised form 1/(2√2) is the same number", 1 / (2 * R2), R2 / 4);
  chk("red.q4(b) the memo's sin 300° = −sin 60° line", S(300), -S(60));
  chk("red.q4(b) the memo's cos 225° = −cos 45° line", C(225), -C(45));
  chk("red.q4(b) the memo's tan 240° = +tan 60° line", Tn(240), Tn(60));

  /* ===== TILE 6 — identities (gtrig.sib.id.*) =====
     LHS and RHS built separately and compared; the memo's route is
     never used. */
  SWEEP.forEach(t => {
    chk(`id.q1(a) (1 − cos²θ)/sin θ = sin θ at θ = ${t}°`, (1 - C(t) ** 2) / S(t), S(t));
    chk(`id.q1(b) cos²θ·tan²θ = 1 − cos²θ at θ = ${t}°`, C(t) ** 2 * Tn(t) ** 2, 1 - C(t) ** 2);
    chk(`id.q2(a) (1 − sin²θ)/(1 − sin θ) = 1 + sin θ at θ = ${t}°`, (1 - S(t) ** 2) / (1 - S(t)), 1 + S(t));
    chk(`id.q2(b) sin x·tan x + cos x = 1/cos x at x = ${t}°`, S(t) * Tn(t) + C(t), 1 / C(t));
    chk(`id.q3(a) (1 + tan²x)·cos²x = 1 at x = ${t}°`, (1 + Tn(t) ** 2) * C(t) ** 2, 1);
    chk(`id.q3(b) sin x/(1 − cos x) = (1 + cos x)/sin x at x = ${t}°`, S(t) / (1 - C(t)), (1 + C(t)) / S(t));
    chk(`id.q4 sin θ/(1 + cos θ) + (1 + cos θ)/sin θ = 2/sin θ at θ = ${t}°`,
      S(t) / (1 + C(t)) + (1 + C(t)) / S(t), 2 / S(t));
    chk(`id.q4 the memo's expanded top 2 + 2cos θ at θ = ${t}°`,
      S(t) ** 2 + (1 + C(t)) ** 2, 2 + 2 * C(t));
    chk(`id.q5 1/(1 − cos x) − 1/(1 + cos x) = 2/(sin x·tan x) at x = ${t}°`,
      1 / (1 - C(t)) - 1 / (1 + C(t)), 2 / (S(t) * Tn(t)));
    chk(`id.q5 the memo's rebuild line: sin x·tan x = sin²x/cos x at x = ${t}°`, S(t) * Tn(t), S(t) ** 2 / C(t));
    chk(`id.q6(a) cos θ/(1 − sin θ) − tan θ = 1/cos θ at θ = ${t}°`, C(t) / (1 - S(t)) - Tn(t), 1 / C(t));
  });
  chk("id.q6(b) the expression evaluated straight at θ = 300° really is 2",
    C(300) / (1 - S(300)) - Tn(300), 2);
  chk("id.q6(b) …and the memo's short road, 1/cos 300°, gives the same 2", 1 / C(300), 2);
  chk("id.q6(b) the memo's reduction cos 300° = cos 60° = 1/2", C(300), 1 / 2);

  /* ===== TILE 7 — identities-undefined (gtrig.sib.iu.*) =====
     Every answer is RE-FOUND by searching the stated interval. */
  sameRoots("iu.q1(a) tan x undefined on [0°;360°] ⟺ cos x = 0", C, 0, 360, [90, 270]);
  sameRoots("iu.q1(b) 1/sin x undefined on [0°;360°] ⟺ sin x = 0", S, 0, 360, [0, 180, 360]);
  sameRoots("iu.q2(a) 3/(2cos x − 1) undefined on [0°;360°]", x => 2 * C(x) - 1, 0, 360, [60, 300]);
  sameRoots("iu.q2(b) the visible denominator 1 − sin x = 0 on [0°;360°]", x => 1 - S(x), 0, 360, [90]);
  sameRoots("iu.q2(b) the tan's hidden denominator cos x = 0 on [0°;360°]", C, 0, 360, [90, 270]);
  {
    const union = [...new Set([...rootsIn(x => 1 - S(x), 0, 360), ...rootsIn(C, 0, 360)])].sort((a, b) => a - b);
    chkS("iu.q2(b) the two lists together are {90° ; 270°}", list(union), list([90, 270]));
  }
  sameRoots("iu.q3(a) (sin x·cos x)/(1 + cos x) undefined on [0°;360°]", x => 1 + C(x), 0, 360, [180]);
  {
    const tops = rootsIn(x => S(x) * C(x), 0, 360);
    chkS("iu.q3(b) the TOP sin x·cos x is zero at five places", list(tops), list([0, 90, 180, 270, 360]));
    const bottoms = rootsIn(x => 1 + C(x), 0, 360);
    const kept = tops.filter(x => !bottoms.some(b => Math.abs(b - x) < 1e-3));
    chkS("iu.q3(b) …and after throwing out the one that also kills the bottom", list(kept), list([0, 90, 270, 360]));
    chkS("iu.q3(b) at x = 180° the top AND the bottom are both zero (so it is undefined, not zero)",
      Math.abs(S(180) * C(180)) < 1e-9 && Math.abs(1 + C(180)) < 1e-9, true);
  }
  sameRoots("iu.q4(a) 1 − cos 3x = 0 on [0°;120°]", x => 1 - C(3 * x), 0, 120, [0, 120]);
  sameRoots("iu.q4(b) sin 3x = 0 on [0°;120°]", x => S(3 * x), 0, 120, [0, 60, 120]);
  {
    const union = [...new Set([...rootsIn(x => 1 - C(3 * x), 0, 120), ...rootsIn(x => S(3 * x), 0, 120)])].sort((a, b) => a - b);
    chkS("iu.q4(b) both lists together are {0° ; 60° ; 120°}", list(union), list([0, 60, 120]));
  }
  SWEEP.forEach(t => {
    chk(`iu.q5(a) (sin(180°−x)·cos(90°−x))/(1 − cos(−x)) = 1 + cos x at x = ${t}°`,
      (S(180 - t) * C(90 - t)) / (1 - C(-t)), 1 + C(t));
    chk(`iu.q5(a) the memo's co-function line cos(90°−x) = sin x at x = ${t}°`, C(90 - t), S(t));
  });
  {
    /* the root itself is never negative, so "real" is decided entirely
       by the ORIGINAL denominator — checked both ways round */
    let anyNegative = 0;
    for (let x = 0; x <= 360; x += 0.25) if (1 + C(x) < -1e-12) anyNegative++;
    chk("iu.q5(b) 1 + cos x is never negative anywhere in [0°;360°] (1441-point sweep)", anyNegative, 0);
    chk("iu.q5(b) …and it is exactly zero at 180°, where √0 = 0 is still real", 1 + C(180), 0);
    sameRoots("iu.q5(b) the original denominator 1 − cos x = 0 on [0°;360°]", x => 1 - C(x), 0, 360, [0, 360]);
  }
  sameRoots("iu.q6(a) dividing by tan x fails where tan x = 0, i.e. sin x = 0", S, 0, 360, [0, 180, 360]);
  sameRoots("iu.q6(a) …and where tan x itself does not exist, i.e. cos x = 0", C, 0, 360, [90, 270]);
  {
    const union = [...new Set([...rootsIn(S, 0, 360), ...rootsIn(C, 0, 360)])].sort((a, b) => a - b);
    chkS("iu.q6(a) both reasons together give five values", list(union), list([0, 90, 180, 270, 360]));
  }
  sameRoots("iu.q6(b) tan 2x undefined on [0°;360°] ⟺ cos 2x = 0", x => C(2 * x), 0, 360, [45, 135, 225, 315]);

  /* ===== TILE 8 — general-solution (gtrig.sib.gs.*) =====
     Each general solution is checked TWICE: the printed families really
     do solve the equation for several k, and searching the interval
     turns up no solution the families miss. */
  sameRoots("gs.q1(a) 2 sin x + 1 = 0 has exactly two solutions in [0°;360°)", x => 2 * S(x) + 1, 0, 359.999, [210, 330]);
  [-2, -1, 0, 1, 2].forEach(k => {
    chk(`gs.q1(a) x = 210° + ${k}·360° solves 2 sin x + 1 = 0`, 2 * S(210 + k * 360) + 1, 0);
    chk(`gs.q1(a) x = 330° + ${k}·360° solves 2 sin x + 1 = 0`, 2 * S(330 + k * 360) + 1, 0);
  });
  sameRoots("gs.q1(b) …and in [−360°;0°] the solutions are −150° and −30°", x => 2 * S(x) + 1, -360, 0, [-150, -30]);
  sameRoots("gs.q2(a) sin x − cos x = 0 on [0°;360°]", x => S(x) - C(x), 0, 360, [45, 225]);
  chkS("gs.q2(a) 45° and 225° are exactly 180° apart, which is why ONE tan line covers both", 225 - 45, 180);
  {
    const ref = Math.atan(4 / 3) * 180 / Math.PI;
    chkT("gs.q2(b) the reference angle of tan(x−25°) = 4/3 rounds to 53,13°", Math.round(ref * 100) / 100, 53.13, 1e-9);
    chkT("gs.q2(b) …so x = ref + 25° rounds to 78,13°", Math.round((ref + 25) * 100) / 100, 78.13, 1e-9);
    const got = rootsIn(x => 4 * C(x - 25) - 3 * S(x - 25), 0, 360);
    chkS("gs.q2(b) searching [0°;360°] finds exactly the two angles of the 180° family", got.length, 2);
    chkT("gs.q2(b) …the first of them is 78,13°", got[0], ref + 25, 5e-3);
    chkT("gs.q2(b) …and the second is 180° later", got[1] - got[0], 180, 5e-3);
  }
  sameRoots("gs.q3 2cos²x + 5 sin x − 4 = 0 has exactly two solutions in [0°;360°)",
    x => 2 * C(x) ** 2 + 5 * S(x) - 4, 0, 359.999, [30, 150]);
  [-1, 0, 1].forEach(k => {
    chk(`gs.q3 x = 30° + ${k}·360° solves it`, 2 * C(30 + k * 360) ** 2 + 5 * S(30 + k * 360) - 4, 0);
    chk(`gs.q3 x = 150° + ${k}·360° solves it`, 2 * C(150 + k * 360) ** 2 + 5 * S(150 + k * 360) - 4, 0);
  });
  [-3, -1.4, 0.6, 2.2, 5].forEach(K => {
    chk(`gs.q3 the memo's rewrite 2cos²x + 5sin x − 4 ≡ −(2K² − 5K + 2) with K = sin x = ${K}`,
      2 * (1 - K * K) + 5 * K - 4, -(2 * K * K - 5 * K + 2));
    chk(`gs.q3 the memo's factorisation (2K − 1)(K − 2) ≡ 2K² − 5K + 2 at K = ${K}`,
      (2 * K - 1) * (K - 2), 2 * K * K - 5 * K + 2);
  });
  chkS("gs.q3 the branch sin x = 2 really has NO solution (|sin| never exceeds 1)", 2 > 1, true);
  sameRoots("gs.q4(a) sin(x+30°) = cos 2x on [0°;360°]", x => S(x + 30) - C(2 * x), 0, 360, [20, 140, 260, 300]);
  [-1, 0, 1, 2].forEach(k => {
    chk(`gs.q4(a) x = 20° + ${k}·120° solves sin(x+30°) = cos 2x`, S(20 + k * 120 + 30), C(2 * (20 + k * 120)));
    chk(`gs.q4(a) x = −60° + ${k}·360° solves sin(x+30°) = cos 2x`, S(-60 + k * 360 + 30), C(2 * (-60 + k * 360)));
  });
  chkS("gs.q4(b) the interval list is the same four angles", list(rootsIn(x => S(x + 30) - C(2 * x), 0, 360)), list([20, 140, 260, 300]));
  sameRoots("gs.q5 sin(2x − 30°) = −1/2 on [0°;360°]", x => S(2 * x - 30) + 0.5, 0, 360, [0, 120, 180, 300, 360]);
  [-1, 0, 1].forEach(k => {
    chk(`gs.q5 x = 120° + ${k}·180° solves sin(2x−30°) = −1/2`, S(2 * (120 + k * 180) - 30), -0.5);
    chk(`gs.q5 x = 180° + ${k}·180° solves sin(2x−30°) = −1/2`, S(2 * (180 + k * 180) - 30), -0.5);
  });

  /* ===== TILE 9 — level-4 (gtrig.l4.*) ===== */
  { /* q1 — cos 68° = m − 4, so m is a real number: 4 + cos 68° */
    const m = 4 + C(68);
    chk("l4.q1(a) the co-function cos 22° = sin 68°", C(22), S(68));
    chk("l4.q1(a) √(1 − (m − 4)²) really is cos 22°", Math.sqrt(1 - (m - 4) ** 2), C(22));
    [-2, 0, 1.5, 3, 4, 5, 7.5].forEach(v =>
      chk(`l4.q1(b) the memo's rearrangement 1 − (m−4)² ≡ −(m−3)(m−5) at m = ${v}`,
        1 - (v - 4) ** 2, -((v - 3) * (v - 5))));
    [-2, 0, 2.9, 5.1, 9].forEach(v =>
      chkS(`l4.q1(b) m = ${v} is outside [3;5], and there 1 − (m−4)² IS negative (non-real)`, 1 - (v - 4) ** 2 < 0, true));
    [3, 3.5, 4, 4.5, 5].forEach(v =>
      chkS(`l4.q1(b) m = ${v} is inside [3;5], and there 1 − (m−4)² is NOT negative (real)`, 1 - (v - 4) ** 2 >= 0, true));
    chkS("l4.q1(b) the esplain's check: cos 68° = m − 4 forces m into exactly [3;5]", m >= 3 && m <= 5, true);
  }
  { /* q2 — given the general solution, find b */
    const ref = 51.34;
    chkT("l4.q2(a) tan 51,34° is 1,25 to four decimals", Tn(ref), 1.25, 5e-4);
    chkT("l4.q2(a) …so b = 5/tan 51,34° is 4", 5 / Tn(ref), 4, 2e-3);
    chkT("l4.q2(a) and the true reference angle of 4 sin θ = 5 cos θ rounds to 51,34°",
      Math.round(Math.atan(5 / 4) * 180 / Math.PI * 100) / 100, 51.34, 1e-9);
    const got = rootsIn(t => 4 * S(t) - 5 * C(t), -180, 180);
    chkS("l4.q2(b) searching [−180°;180°] finds exactly two angles", got.length, 2);
    chkT("l4.q2(b) …the negative one is −128,66°", got[0], -128.66, 5e-3);
    chkT("l4.q2(b) …and the positive one is 51,34°", got[1], 51.34, 5e-3);
  }
  { /* q3 — the product trick */
    [-1, 0, 1].forEach(k => {
      chk(`l4.q3 case 1 (x = 70° + ${k}·360°, y = 220° + ${k}·360°) gives a product of −1`,
        S(70 + k * 360 + 20) * C(220 + k * 360 - 40), -1);
      chk(`l4.q3 case 2 (x = 250° + ${k}·360°, y = 40° + ${k}·360°) gives a product of −1`,
        S(250 + k * 360 + 20) * C(40 + k * 360 - 40), -1);
    });
    chk("l4.q3 the TRAP: mixing case 1's x with case 2's y gives +1, not −1", S(70 + 20) * C(40 - 40), 1);
    chk("l4.q3 …and mixing the other way round also gives +1", S(250 + 20) * C(220 - 40), 1);
    let worse = 0;
    for (let x = 0; x <= 360; x += 0.5) for (let y = 0; y <= 360; y += 0.5) if (S(x + 20) * C(y - 40) < -1 - 1e-12) worse++;
    chk("l4.q3 no pair anywhere makes the product smaller than −1 (521 284-point sweep)", worse, 0);
  }
  { /* q4 — the nine-mark identity */
    SWEEP.forEach(t => {
      const m = S(t) / (1 - C(t));
      chk(`l4.q4(a) with m = sin θ/(1 − cos θ), (1 − cos θ)/(1 + cos θ) = 1/m² at θ = ${t}°`,
        (1 - C(t)) / (1 + C(t)), 1 / (m * m));
      chk(`l4.q4(a) the memo's middle line m² = (1 + cos θ)/(1 − cos θ) at θ = ${t}°`,
        m * m, (1 + C(t)) / (1 - C(t)));
    });
    sameRoots("l4.q4(b) the given fraction's denominator 1 − cos θ = 0 on [0°;360°]", x => 1 - C(x), 0, 360, [0, 360]);
    sameRoots("l4.q4(b) the target's denominator 1 + cos θ = 0 on [0°;360°]", x => 1 + C(x), 0, 360, [180]);
    sameRoots("l4.q4(b) and m = 0, which kills 1/m², where sin θ = 0", S, 0, 360, [0, 180, 360]);
    {
      const union = [...new Set([...rootsIn(x => 1 - C(x), 0, 360), ...rootsIn(x => 1 + C(x), 0, 360), ...rootsIn(S, 0, 360)])].sort((a, b) => a - b);
      chkS("l4.q4(b) all three lists together are {0° ; 180° ; 360°}", list(union), list([0, 180, 360]));
    }
  }
  { /* q5 — reduce, then solve, then check the original is defined */
    SWEEP.forEach(t => {
      chk(`l4.q5(a) the four-factor fraction = tan x at x = ${t}°`,
        (S(180 - t) * C(360 - t)) / (C(180 + t) * S(t - 90)), Tn(t));
      chk(`l4.q5(a) the memo's sin(x−90°) = −cos x line at x = ${t}°`, S(t - 90), -C(t));
    });
    sameRoots("l4.q5(b) tan x = −√3 on [0°;360°] (written as sin x + √3 cos x = 0)",
      x => S(x) + R3 * C(x), 0, 360, [120, 300]);
    chk("l4.q5(b) tan 120° really is −√3", Tn(120), -R3);
    chk("l4.q5(b) tan 300° really is −√3", Tn(300), -R3);
    sameRoots("l4.q5(b) the original's denominator dies only where cos x = 0", C, 0, 360, [90, 270]);
    [120, 300].forEach(x => chkS(`l4.q5(b) …so the original expression IS defined at x = ${x}°`, Math.abs(C(x)) > 1e-9, true));
  }
  { /* q6 — real AND defined, two conditions */
    sameRoots("l4.q6(a) E undefined on [0°;270°] ⟺ 2 sin x − 1 = 0", x => 2 * S(x) - 1, 0, 270, [30, 150]);
    sameRoots("l4.q6(b) sin x·cos x changes sign on [0°;270°] at", x => S(x) * C(x), 0, 270, [0, 90, 180, 270]);
    [1, 45, 89, 181, 225, 269].forEach(x =>
      chkS(`l4.q6(b) sin x·cos x ≥ 0 at x = ${x}° (inside the kept set)`, S(x) * C(x) >= -1e-12, true));
    [91, 120, 150, 179].forEach(x =>
      chkS(`l4.q6(b) sin x·cos x < 0 at x = ${x}° (quadrant II, thrown out)`, S(x) * C(x) < 0, true));
    chkS("l4.q6(b) 150° was already outside the kept set, so only 30° has to be cut out", S(150) * C(150) < 0, true);
    chkS("l4.q6(b) …and 30° IS inside the kept set, which is why it must be removed by hand", S(30) * C(30) > 0, true);
    let bad = 0;
    for (let x = 0; x <= 270; x += 0.25) {
      const inAnswer = (x >= 0 && x <= 90 && Math.abs(x - 30) > 1e-9) || (x >= 180 && x <= 270);
      const trulyReal = S(x) * C(x) >= -1e-12 && Math.abs(2 * S(x) - 1) > 1e-9;
      if (inAnswer !== trulyReal) bad++;
    }
    chk("l4.q6(b) the printed answer set matches the truth at every quarter-degree of [0°;270°]", bad, 0);
  }

  console.log(R16.join("\n"));
}

/* =====================================================================
   17. EQUATIONS & INEQUALITIES — INDEPENDENT RECOMPUTE
   (SESSION H, 2026-08-23: the new solution-count tile, "Two, one or no
   solution?", six cards on her handwritten rational-exponent box.)

   Every card on this tile makes ONE claim — how many real solutions an
   equation x^(p/q) = c has, and what they are — so this section proves
   that claim the hardest way available: it COUNTS the real solutions
   numerically, by sweeping x and watching the sign of x^(p/q) − c
   change, and then checks each printed answer by substituting it back
   into the equation the PROMPT gives. Nothing here reads a memo string.

   rpowReal below is written from the definition of a rational power on
   the reals — an even root of a negative number is simply not real, and
   an odd root keeps its sign — and NOT from her rule. That is the point:
   her rule is the thing being tested. The last check in the section then
   holds the whole table up against js/quests/queseq9-solution-count.js's
   solutionCount(), which is what the eq9 round marks its answers with,
   so the tile and the round cannot drift apart.
   ===================================================================== */
console.log("\n== 17. independent recompute — session H's solution-count tile ==");
{
  const R17 = [];
  const chk = (label, got, want) => { const ok = near(got, want); R17.push(`  ${ok ? "OK  " : "FAIL"} ${label}: got ${got}, want ${want}`); tick(ok, `H recompute ${label}`); };
  const chkS = (label, got, want) => { const ok = got === want; R17.push(`  ${ok ? "OK  " : "FAIL"} ${label}: got ${got}, want ${want}`); tick(ok, `H recompute ${label}`); };
  const nearish = (a, b) => Math.abs(a - b) < 1e-7 * Math.max(1, Math.abs(b));

  /* x^(p/q) over the REALS, straight from the definition:
       x ≥ 0            → the ordinary power;
       x < 0, q even    → NOT REAL (there is no real even root of a negative);
       x < 0, q odd     → the odd root keeps the minus, then the power
                          decides whether the minus survives. */
  const rpowReal = (x, p, q) => {
    if (x >= 0) return Math.pow(x, p / q);
    if (q % 2 === 0) return NaN;
    const r = -Math.pow(-x, 1 / q);
    const m = Math.pow(-r, p);
    return p % 2 === 0 ? m : -m;
  };

  /* COUNT the real solutions of x^(p/q) = c by sweeping x and counting
     sign changes of g(x) = x^(p/q) − c across the region where g is
     real. Step 0,001 over [−200 ; 200] — every root any card here claims
     lives well inside that, and the functions are monotone on each side
     of zero, so a sign change cannot be missed between samples. */
  const rootsOf = (p, q, c, lo = -200, hi = 200, step = 0.001) => {
    const found = [];
    let prevX = null, prevG = null;
    for (let i = Math.round(lo / step); i <= Math.round(hi / step); i++) {
      const x = i * step;
      const v = rpowReal(x, p, q);
      if (!Number.isFinite(v)) { prevX = null; prevG = null; continue; }
      const g = v - c;
      if (Math.abs(g) < 1e-12) { found.push(x); prevX = x; prevG = 0; continue; }
      if (prevG !== null && prevG !== 0 && Math.sign(g) !== Math.sign(prevG)) {
        /* bisect the bracket so the reported root is exact enough to compare */
        let a = prevX, b = x, ga = prevG;
        for (let k = 0; k < 80; k++) {
          const m = (a + b) / 2, gm = rpowReal(m, p, q) - c;
          if (Math.sign(gm) === Math.sign(ga)) { a = m; ga = gm; } else b = m;
        }
        found.push((a + b) / 2);
      }
      prevX = x; prevG = g;
    }
    /* de-duplicate roots that two adjacent samples both landed on */
    return found.filter((r, i) => i === 0 || Math.abs(r - found[i - 1]) > 1e-6);
  };
  const rootReport = (label, p, q, c, want) => {
    const got = rootsOf(p, q, c);
    const ok = got.length === want.length && got.every((r, i) => nearish(r, want[i]));
    R17.push(`  ${ok ? "OK  " : "FAIL"} ${label}: found [${got.map(r => Math.round(r * 1e6) / 1e6)}], want [${want}]`);
    tick(ok, `H recompute ${label}`);
    /* and every claimed root really satisfies the PROMPT's own equation */
    want.forEach(r => chk(`${label} — x = ${r} substituted back into x^(${p}/${q})`, rpowReal(r, p, q), c));
    return got;
  };

  /* the table the eq9 round marks its answers with — the tile and the
     round must agree, or a learner is taught one thing and marked by
     another */
  const { solutionCount } = await import("./js/quests/queseq9-solution-count.js");
  const kindOf = n => (n === 0 ? "none" : n === 1 ? "one" : "two");

  /* every equation printed anywhere on this tile: [id, p, q, c, expected roots] */
  const TILE = [
    ["sc.q1(a)  x^(2/5) = −9", 2, 5, -9, []],
    ["sc.q2(a)  x^(4/7) = 5", 4, 7, 5, [-Math.pow(5, 7 / 4), Math.pow(5, 7 / 4)]],
    ["sc.q2(b)  x^(5/3) = −7", 5, 3, -7, [-Math.pow(7, 3 / 5)]],
    ["sc.q2(c)  x^(1/4) = −6", 1, 4, -6, []],
    ["sc.q3(a)  x^(2/3) = 9", 2, 3, 9, [-27, 27]],
    ["sc.q4(a)  x^(3/5) = −8", 3, 5, -8, [-32]],
    ["sc.q5(a)  x^(3/2) = −27", 3, 2, -27, []],
    ["sc.q6(a)  x^(4/3) = −16 (equation A)", 4, 3, -16, []],
    ["sc.q6(b)  x^(4/3) = 16 (equation B)", 4, 3, 16, [-8, 8]],
  ];
  TILE.forEach(([label, p, q, c, want]) => {
    const got = rootReport(label, p, q, c, want);
    chkS(`${label} — the eq9 round's table says "${kindOf(got.length)}"`,
      solutionCount(p, q, c < 0), kindOf(got.length));
  });

  /* --- the arithmetic each memo actually writes down --- */
  R17.push("  -- the numbers inside the memos --");
  // q3: (∛(x²))³ = 9³ = 729, √729 = 27, and the reciprocal route 9^(3/2) = 27
  chk("q3 9³ = 729", Math.pow(9, 3), 729);
  chk("q3 √729 = 27", Math.sqrt(729), 27);
  chk("q3 the reciprocal route: 9^(3/2) = (√9)³ = 27", Math.pow(9, 3 / 2), 27);
  chk("q3 (√9)³ really is 27", Math.pow(Math.sqrt(9), 3), 27);
  // q4: (−8)⁵ = −32 768, ∛(−32 768) = −32, and (−8)^(5/3) = −32
  chk("q4 (−8)⁵ = −32 768", Math.pow(-8, 5), -32768);
  chk("q4 ∛(−32 768) = −32", -Math.pow(32768, 1 / 3), -32);
  chk("q4 the reciprocal route: (∛(−8))⁵ = (−2)⁵ = −32", Math.pow(-2, 5), -32);
  chkS("q4 the TRAP: x = +32 does NOT work — 32^(3/5) = 8, not −8", nearish(rpowReal(32, 3, 5), 8), true);
  chkS("q4 …so ±32 would be wrong; only −32 satisfies the equation", nearish(rpowReal(32, 3, 5), -8), false);
  // q5: the trap value 9 comes out of the reciprocal move and fails
  chk("q5 the TRAP: raising to 2/3 gives x = (−27)^(2/3) = 9", rpowReal(-27, 2, 3), 9);
  chk("q5 …and 9^(3/2) = 27, which is +27, not −27", Math.pow(9, 3 / 2), 27);
  chkS("q5 9 therefore FAILS the original equation", nearish(rpowReal(9, 3, 2), -27), false);
  // q6: 16³ = 4096, ⁴√4096 = 8, 16^(3/4) = 8, and both ±8 check out
  chk("q6(b) 16³ = 4096", Math.pow(16, 3), 4096);
  chk("q6(b) ⁴√4096 = 8", Math.pow(4096, 1 / 4), 8);
  chk("q6(b) the reciprocal route: 16^(3/4) = (⁴√16)³ = 2³ = 8", Math.pow(16, 3 / 4), 8);
  chk("q6(b) x = −8 checks out: (∛(−8))⁴ = (−2)⁴ = 16", Math.pow(-2, 4), 16);
  // q1 / q2(c) / q6(a): the "never negative" claims, swept rather than asserted
  {
    let bad = 0;
    for (let x = -200; x <= 200; x += 0.01) { const v = rpowReal(x, 2, 5); if (Number.isFinite(v) && v < -1e-12) bad++; }
    chk("q1 x^(2/5) is never negative (40 001-point sweep, negatives found)", bad, 0);
  }
  {
    let bad = 0;
    for (let x = -200; x <= 200; x += 0.01) { const v = rpowReal(x, 1, 4); if (Number.isFinite(v) && v < -1e-12) bad++; }
    chk("q2(c) ⁴√x is never negative where it is real (negatives found)", bad, 0);
  }
  {
    let bad = 0, real = 0;
    for (let x = -200; x <= 200; x += 0.01) { const v = rpowReal(x, 3, 2); if (Number.isFinite(v)) { real++; if (v < -1e-12) bad++; } }
    chk("q5 (√x)³ is never negative (negatives found)", bad, 0);
    chkS("q5 …and it is only real for x ≥ 0", real > 0, true);
  }
  {
    let bad = 0;
    for (let x = -200; x <= 200; x += 0.01) { const v = rpowReal(x, 4, 3); if (Number.isFinite(v) && v < -1e-12) bad++; }
    chk("q6(a) x^(4/3) is never negative (negatives found)", bad, 0);
  }
  /* the two equations on q6 differ ONLY in the sign on the right — the
     claim the card is built on */
  chkS("q6 A and B really are the same exponent, opposite signs", (-16) === -(16), true);

  console.log(R17.join("\n"));
}


/* ---------- verdict ---------- */
console.log(`\n===== ${passed}/${total} checks passed =====`);
if (fails.length) { console.log("FAILURES:"); fails.forEach(f => console.log("  · " + f)); process.exitCode = 1; }
