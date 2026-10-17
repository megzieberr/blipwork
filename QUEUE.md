# Blipwork Afrikaans queue (the brief is AFRIKAANS-PLAN.md; rows run top to bottom, up to three per night)

Legend: `☐` open · `⏳` claimed by a run (timestamp) · `☑` done (date) · `⏸` gate, waits for Megan · `⚠` note after a red run.
Whoever works a row writes `⏳` on it FIRST. A run that sees any `⏳` row stops.
A row = ONE table of at most ~4 000 English prose words (several small files may share a table; a file over the cap stands alone).
Words = English prose words inside string literals (slight overcount). Under 1 500 = a small row.

## Setup (one build per row; English output byte-identical after every row)
- ☑ 2026-10-16 S1 | `js/lang.js`: key `mhq.lang`, default `en`, getLang / setLang / onLangChange (Circle Quest's js/i18n.js pattern), the header button behind `SHOW_TOGGLE = false`, `?lang=af` / `?lang=en` URL override that sets the device; js/exam/lang.js reads it instead of its pinned "en"; the funfun mount passes it; verify pages accept `?lang=` | check: verify-wrap, verify-store, verify-exam, verify-finance unchanged in EN
- ☑ 2026-10-17 S2 | `tools/af_extract.mjs` + `tools/af_inject.mjs` (acorn; `npm i acorn` inside tools/; a table may list several files, keys prefixed by file name) + `tools/af_roundtrip_test.mjs` (inject af = en on js/quests/questnp1-spot.js: EN harness identical, file diff = wrappers only, then revert) | check: round-trip test green, verify-patterns unchanged
- ☑ 2026-10-17 S3 | `tools/af_check.mjs` (twins present, placeholders + tags identical, English stop-words, her wording rules, length ratio > 1.6 flagged) + `tools/af_glossary_apply.mjs`; self-test on js/exam/eqn-nature-of-roots.js and js/funfun/quests/q1-discover.js | check: both self-tests print the expected report
- ☑ 2026-10-17 S4 | split `js/concepts.js` into `js/concepts/<chapter>.js` with js/concepts.js re-exporting the same object | check: verify-store + verify-wrap unchanged, concept text byte-identical
- ☑ 2026-10-17 S5 | `AF-GLOSSARY.md` seeded from Fun Functions' AF strings (js/funfun), Circle Quest's js/i18n.js, maths-quest-grade7's vocabulary and every wording ruling listed in AFRIKAANS-PLAN.md; one line per term | check: every standing rule in the plan appears as a row
- ☑ 2026-10-17 S6 | PILOT: `js/quests/questnp1-spot.js` through the whole pipeline (extract → Opus translate → inject → af_check → verify-patterns EN + AF) | check: pipeline green, one commit
- ☑ 2026-10-17 18:36 G1 | Megan played questnp1 in Afrikaans on her phone (`?lang=af`, Chrome on Android, sw v98): "the wording of the questions looks fine" (her word, no fixes)
- ☑ 2026-10-17 S9 | (setup, one Opus worker; added 2026-10-17 19:46 on her 'yes, add it tonight'): verify-exam.html's 12 hub-navigation checks compare chapter names against English literals and fail under ?lang=af since T89; make them read the expected names from js/config.js (the app's own L(en, af) source) or compare chapter ids, cards found by id; no js/ change | check: verify-exam 678/678 in EN and ?lang=af

## Translation (her 2027 Gr11 teaching order; inside a chapter: concepts → hub rounds → exam cards)
### Hub tiles first (her ruling 2026-10-17 18:33: she sees each tile in Afrikaans when she opens a round to play, so a weird name is caught chapter by chapter, not at the end)
- ☑ 2026-10-17 T89 | hub tiles: js/config.js chapter names, round titles, blurbs | 225 items, 1 469 words | verify-wrap (moved up from "Everything else" 2026-10-17 18:35; done 18:50, Fable catchup session, one Opus translator ~60k; af_check clean, verify-wrap EN = baseline and AF green; G2 items it leaned on: mond-en-snor, vlerkies, onbepaald, inklinasiehoek, tweerigtingtabel, DP for TP)
### Exponents & Surds
- ☑ 2026-10-17 T01 | concepts: the `exp` block (js/concepts/exp.js after S4) | ~860 words | counted by af_extract 2026-10-17
- ☑ 2026-10-17 T02 | hub rounds: queses1-laws … queses5-surds (5 files) | ~3 420 words | verify page: verify-exp.html
- ☑ 2026-10-17 T03 | hub rounds: queses6-conjugates … queses8-nosolution (3 files) | ~1 692 words | verify page: verify-exp.html
- ☑ 2026-10-17 T04 | exam: cards-exp, exp-conjugates-and-rationalising, exp-first-step-and-method (3 files) | ~1 818 words | verify-exam.html
- ☑ 2026-10-17 T05 | exam: exp-level4, exp-no-solution-and-strategy (2 files) | ~3 266 words | verify-exam.html
- ☑ 2026-10-17 T06 | exam: exp-siblings-exponent-expressions, exp-siblings-exponential-equations, exp-siblings-rational-exponents-numeric (3 files) | ~3 163 words | verify-exam.html
- ☑ 2026-10-17 T07 | exam: exp-siblings-rationalise, exp-siblings-surd-proofs, exp-siblings-surds (3 files) | ~3 173 words | verify-exam.html

### Equations & Inequalities
- ☑ 2026-10-17 T08 | concepts: the `eqn` block (js/concepts/eqn.js after S4) | ~1 255 words | counted by af_extract 2026-10-17
- ☑ 2026-10-17 T09 | hub rounds: queseq1-zeroproduct … queseq3-kmethod (3 files) | ~3 307 words | verify page: verify-eq.html
- ☑ 2026-10-17 T10 | hub rounds: queseq4-fractions … queseq6-formula (3 files) | ~3 472 words | verify page: verify-eq.html
- ☑ 2026-10-17 T11 | hub rounds: queseq7-inequalities … queseq8-nature (2 files) | ~3 446 words | verify page: verify-eq.html
- ☑ 2026-10-17 T12 | hub rounds: queseq9-solution-count | ~681 words | verify page: verify-eq.html
- ☑ 2026-10-17 T13 | exam: cards-eqn, eqn-fractions-and-restrictions, eqn-inequalities-2, eqn-inequalities, eqn-k-method (5 files) | ~3 473 words | verify-exam.html
- ☑ 2026-10-17 T14 | exam: eqn-level4, eqn-nature-of-roots-2 (2 files) | ~3 512 words | verify-exam.html
- ☐ S8 | before T15 (setup, one Opus worker): tools/af_check.mjs reads an optional briefs/af/allow.json ({ rule: [file globs or keys] }); findings listed there become WARN, not ERROR; seed it with wording:em-dash for js/exam/eqn-nature-of-roots.js (her ruling 2026-10-17: her August em-dashes stay) | check: af_check on that file exits 0 with 31 WARN lines; negative copy still fails on other rules
- ☐ T15 | exam: eqn-nature-of-roots | ~3 382 words | verify-exam.html ⚠ her August af sides hold 36 em-dashes: HER RULING 2026-10-17 = KEEP them; S8 (above) teaches af_check to allow them first
- ☑ 2026-10-17 T16 | exam: eqn-siblings-delta-in-p, eqn-siblings-fraction-equations (2 files) | ~3 370 words | verify-exam.html
- ☑ 2026-10-17 T17 | exam: eqn-siblings-inequalities, eqn-siblings-k-equal-roots (2 files) | ~2 445 words | verify-exam.html
- ☑ 2026-10-17 T18 | exam: eqn-siblings-k-for-nature, eqn-siblings-nature-chain (2 files) | ~3 831 words | verify-exam.html
- ☑ 2026-10-17 T19 | exam: eqn-siblings-quadratic-solving | ~2 336 words | verify-exam.html
- ☑ 2026-10-17 T20 | exam: eqn-siblings-rational-exponents-k, eqn-siblings-simultaneous (2 files) | ~3 495 words | verify-exam.html
- ☑ 2026-10-17 T21 | exam: eqn-siblings-solution-count, eqn-siblings-surd-equations (2 files) | ~3 877 words | verify-exam.html

### Number Patterns
- ☑ 2026-10-17 T22 | concepts: the `pat` block (js/concepts/pat.js after S4) | ~511 words | counted by af_extract 2026-10-17
- ☑ 2026-10-17 T23 | hub rounds: questnp1-spot … questnp7-geometric (7 files) | ~1 767 words | verify page: verify-patterns.html

### Analytical Geometry
- ☑ 2026-10-17 T24 | concepts: the `analytical` block (js/concepts/analytical.js after S4) | ~455 words | counted by af_extract 2026-10-17
- ☑ 2026-10-17 T25 | hub rounds: questag1-formulas … questag7-mixed (7 files) | ~1 830 words | verify page: verify-analytical.html

### Functions
- ☑ 2026-10-17 T26 | concepts: the `func` block (js/concepts/func.js after S4) | ~734 words | counted by af_extract 2026-10-17
- ☑ 2026-10-17 T27 | hub rounds: questfn1-families … questfn6-transformations (6 files) | ~3 719 words | verify page: verify-func.html
- ☑ 2026-10-17 T28 | hub rounds: questfn7-together | ~667 words | verify page: verify-func.html
- ☑ 2026-10-17 T29 | exam: cards-func, func-graphs-together, func-hyperbola-and-exponential-2, func-hyperbola-and-exponential (4 files) | ~3 442 words | verify-exam.html
- ☑ 2026-10-17 T30 | exam: func-level4 | ~3 087 words | verify-exam.html
- ☑ 2026-10-17 T31 | exam: func-line-and-parabola, func-siblings-asymptotes-domain-range (2 files) | ~2 920 words | verify-exam.html
- ☑ 2026-10-17 T32 | exam: func-siblings-average-gradient | ~2 532 words | verify-exam.html
- ☑ 2026-10-17 T33 | exam: func-siblings-axis-of-symmetry | ~2 173 words | verify-exam.html
- ☑ 2026-10-17 T34 | exam: func-siblings-distances, func-siblings-find-equation (2 files) | ~3 962 words | verify-exam.html
- ☑ 2026-10-17 T35 | exam: func-siblings-inequalities | ~2 264 words | verify-exam.html
- ☑ 2026-10-17 T36 | exam: func-siblings-intercepts-turning-point | ~2 163 words | verify-exam.html
- ☑ 2026-10-17 T37 | exam: func-siblings-intersection | ~2 992 words | verify-exam.html
- ☑ 2026-10-17 T38 | exam: func-siblings-nature-of-roots | ~1 689 words | verify-exam.html
- ☑ 2026-10-17 T39 | exam: func-siblings-reflections | ~3 175 words | verify-exam.html
- ☑ 2026-10-17 T40 | exam: func-siblings-shift | ~1 985 words | verify-exam.html
- ☑ 2026-10-17 T41 | exam: func-siblings-sketch | ~3 900 words | verify-exam.html
- ☑ 2026-10-17 T42 | exam: func-siblings-topup | ~2 253 words | verify-exam.html

### 2D Trigonometry
- ☑ 2026-10-17 T43 | concepts: the `trig` block (js/concepts/trig.js after S4) | ~588 words | counted by af_extract 2026-10-17
- ☑ 2026-10-17 T44 | hub rounds: questt1-choose … questt7-mixed (7 files) | ~3 381 words | verify page: verify-trig.html

### Trig Graphs
- ☑ 2026-10-17 T45 | concepts: the `tgraph` block (js/concepts/tgraph.js after S4) | ~576 words | counted by af_extract 2026-10-17
- ☑ 2026-10-17 T46 | hub rounds: questtg1-parents … questtg7-mixed (7 files) | ~1 528 words | verify page: verify-tgraph.html
- ☑ 2026-10-17 T47 | exam: cards-tgraph, tgraph-level4 (2 files) | ~2 962 words | verify-exam.html
- ☑ 2026-10-17 T48 | exam: tgraph-siblings-intersections-inequalities | ~3 186 words | verify-exam.html
- ☑ 2026-10-17 T49 | exam: tgraph-siblings-period-amplitude-range | ~3 535 words | verify-exam.html
- ☑ 2026-10-17 T50 | exam: tgraph-siblings-read-parameters | ~3 131 words | verify-exam.html
- ☑ 2026-10-17 T51 | exam: tgraph-siblings-shift-reflect | ~2 603 words | verify-exam.html
- ☑ 2026-10-17 T52 | exam: tgraph-siblings-sketch | ~2 603 words | verify-exam.html

### General Trig
- ☑ 2026-10-17 T53 | concepts: the `gtrig` block (js/concepts/gtrig.js after S4) | ~1 555 words | counted by af_extract 2026-10-17
- ☐ S10 | before T54 (setup, one Opus worker; added 2026-10-17 21:25 after T54 went red): verify-gtrig.html reads English wording out of the mc step text ("becomes …", "stays X" / "changes to X", "Quadrant: / Sign: / Ratio:"), so ?lang=af fails 2862 checks (2857 "could read a claimed ratio off the mc steps" in gt4 co*, gt5 pos/neg/coFn/rotationPool, gt7 item1-7; 5 "gt6.threeBoxes confirm side fills all three boxes"); make those checks read the English side (L's en) or accept both languages, like S9 did for verify-exam; no js/ change | check: verify-gtrig ALL GOOD in EN and ?lang=af, then T54 re-runs inject + af_check + harness from its saved .af.json
- ☐ T54 | hub rounds: questgt1-intro … questgt9-identities (9 files) | ~3 976 words | verify page: verify-gtrig.html ⚠ verify-gtrig?lang=af fails 2862 checks because the page reads English step wording (see S10, the harness fix); briefs/af/T54.af.json is COMPLETE (560 keys): after S10, inject + af_check + harness only
- ☑ 2026-10-17 T55 | hub rounds: questgt10-super-special … questgt13-undefined (4 files) | ~1 256 words | verify page: verify-gtrig.html
- ☑ 2026-10-17 T56 | exam: cards-gtrig, gtrig-level4 (2 files) | ~3 324 words | verify-exam.html
- ☑ 2026-10-17 T57 | exam: gtrig-siblings-co-functions | ~2 067 words | verify-exam.html
- ☑ 2026-10-17 T58 | exam: gtrig-siblings-general-solution | ~2 144 words | verify-exam.html
- ☑ 2026-10-17 T59 | exam: gtrig-siblings-identities-undefined | ~2 867 words | verify-exam.html
- ☑ 2026-10-17 T60 | exam: gtrig-siblings-identities | ~2 265 words | verify-exam.html
- ☑ 2026-10-17 T61 | exam: gtrig-siblings-reduction | ~2 108 words | verify-exam.html
- ⏳ 2026-10-17 21:28 T62 | exam: gtrig-siblings-special-angles | ~2 444 words | verify-exam.html
- ☐ T63 | exam: gtrig-siblings-special-sums | ~2 521 words | verify-exam.html
- ☐ T64 | exam: gtrig-siblings-super-special-sums, trig-general-solutions (2 files) | ~3 848 words | verify-exam.html
- ☐ T65 | exam: trig-mixed-problems, trig-reduction-and-ratios (2 files) | ~1 577 words | verify-exam.html

### Euclidean Geometry (exam-only)
- ☑ 2026-10-17 T66 | concepts: the `euclid` block: NONE EXISTS (exam-only chapter, no concept cards), nothing to translate
- ☐ T67 | exam: cards-euclid, euclid-bookwork-proofs, euclid-circle-theorems (3 files) | ~1 965 words | verify-exam.html
- ☐ T68 | exam: euclid-level4 | ~3 960 words | verify-exam.html
- ☐ T69 | exam: euclid-siblings-chords-and-angles | ~4 735 words | verify-exam.html
- ☐ T70 | exam: euclid-siblings-cyclic-quads | ~5 790 words | verify-exam.html
- ☐ T71 | exam: euclid-siblings-tangents | ~4 566 words | verify-exam.html
- ☐ T72 | exam: euclid-tangents-and-cyclic-quads | ~1 071 words | verify-exam.html

### Algebraic Expressions (exam-only)
- ☑ 2026-10-17 T73 | concepts: the `algx` block: NONE EXISTS (exam-only chapter, no concept cards), nothing to translate
- ☐ T74 | exam: algx-level4 | ~2 860 words | verify-exam.html
- ☐ T75 | exam: algx-siblings-expand | ~1 915 words | verify-exam.html
- ☐ T76 | exam: algx-siblings-factorise-advanced | ~2 126 words | verify-exam.html
- ☐ T77 | exam: algx-siblings-factorise-basics | ~2 237 words | verify-exam.html
- ☐ T78 | exam: algx-siblings-fractions-add-subtract | ~2 216 words | verify-exam.html
- ☐ T79 | exam: algx-siblings-fractions-multiply-divide | ~2 363 words | verify-exam.html

### Finance
- ☐ S7 | before the first Finance row (setup, one Opus worker): js/quests/_finance-check.js reads prompts through the en side so verify-finance passes in ?lang=af; hoist the random draws out of questf8's templates (lines ~416-426, flagged impure by af_extract) into consts | check: verify-finance 692/692 in EN and ?lang=af, verify-dice-finance unchanged
- ☐ T80 | concepts: the `finance` block (js/concepts/finance.js after S4) | ~1 474 words + the two jug captions in js/concepts/_finance-pictures.js (leftovers  hand L()) | counted by af_extract 2026-10-17
- ☐ T81 | hub rounds: questf1-words … questf9-car-or-no-car (9 files) | ~3 367 words | verify page: verify-finance.html
- ☐ T82 | hub rounds: questf10-in-or-out … questf13-one-equation (4 files) | ~3 094 words | verify page: verify-finance.html

### Statistics
- ☐ T83 | concepts: the `stats` block (js/concepts/stats.js after S4) | ~904 words | counted by af_extract 2026-10-17
- ☐ T84 | hub rounds: quest01-calculator … quest08-mixed (8 files) | ~2 231 words | verify page: verify.html

### Probability
- ☐ T85 | concepts: the `prob` block (js/concepts/prob.js after S4) | ~532 words | counted by af_extract 2026-10-17
- ☐ T86 | hub rounds: questp1-basics … questp7-replacement (7 files) | ~2 008 words | verify page: verify-prob.html

### Measurement
- ☐ T87 | concepts: the `meas` block (js/concepts/meas.js after S4) | ~569 words | counted by af_extract 2026-10-17
- ☐ T88 | hub rounds: questm1-name-formula … questm6-height (6 files) | ~1 632 words | verify page: verify-meas.html

### Everything else
- (T89 the hub tiles moved to the FRONT of the Translation section on her 2026-10-17 18:33 ruling; see "Hub tiles first" above T01)
- ☐ T90 | hub helpers + dice lines: _gtrig, _shared, _trig, dice-eqn, dice-exp, dice-finance, dice-func, dice-gtrig, dice-patterns, dice-stats, dice-stub, dice-trig (12 files; content slots only) | ~1 299 words | all verify-dice-*.html
- ☐ T91 | exam engines + skills.js (extractor scan, content slots only, expected small): circle-engine, function-diagram, quadtri-diagram, trig-diagram, skills (5 files) | ~997 words | verify-exam.html ⚠ af_extract reads js/exam files pair-only, so these engine files need a hand scan for bare label strings first
- ☐ T92 | libs with learner prose reached by import (af_check --all shows the debt; most of it sits in leftovers, so hand-scan): js/measlib.js (wrongs, VOL_WRONG, SA_WRONG, CYL_SA_LABEL), js/finlib.js (COMPOUNDING), js/patternlib.js (classifyName), js/quests/_patterns.js (ord suffixes), js/tgraphlib.js (FN_NAME) and the other js/*lib.js | words: count with af_extract first | every text comparison across files checked by hand; all verify-*.html

## After the queue
- ⏸ G2 | Megan's wording sweep across the glossary; `tools/af_glossary_apply.mjs`; full `af_check` over the repo; her "show it" turns `SHOW_TOGGLE` on; ship with the sw bump (sw_check OK)
