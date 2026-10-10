# EXAM-BUILD-DAY — 2026-08-23, "the Exam Focus gets full and complete"

Fable foreman day. Opus writes everything (her ruling: "Only use Opus today"). Local work
only; the foreman commits after reviewing each session; ONE ship at the end of the day
after her phone round. Read this whole file before any session — it is the tile map every
content session builds against and the rules every card follows.

## Her rulings today (2026-08-23 morning — DECIDED, do not re-ask)

1. **Exam scope is uncertain, so over-prepare.** Sept T1 (11 Sep): algebraic expressions,
   exponents & surds, equations & inequalities, functions. Sept T2 (14 Sep): trigonometry,
   functions, Euclidean geometry. "Functions" in T2 may mean trig graphs or ordinary
   functions — **both are built**. The kids really struggle with Functions.
2. **Algebraic expressions (Gr10 revision) gets its own exam-only chapter** — that is where
   the 30%-learners will earn their marks.
3. **New tiles AND siblings — everything missing gets built.** She agreed the gap list in
   full (tile map below).
4. **Euclidean: pen-and-paper, NOT interactive.** One sketch per card, 4–6 parts on THAT
   sketch; each revealed value is WRITTEN ONTO the sketch for the next part. Mixed asks
   like Circle Quest's adventure rounds: some parts give the value and ask only the
   reason; some give the reason and ask only the value; some ask both. All 4 bookwork
   proofs + ~10 riders. Reasons use the SAG short forms verbatim
   (`EUCLID-ACCEPTABLE-REASONS.md`). No "I'm lost" button (standing ruling).
5. **Levels 1–3 on the normal tiles; every chapter gets a last tile "Level 4 ★"** holding
   mixed Level-4 questions for that chapter. The low achievers must never meet a ★ while
   drilling basics. Existing ★ parts inside cards MOVE to the Level 4 tile.
6. **Trig memos = textbook method, with her stories** in hints/esplains (`METHODS-trig.md`).
   Algebra memos follow `METHODS-algebra.md`; Functions follow her notes digest.
7. **XP: 50 XP + 5 💎 per card** (was 75/10) — config mirror + a new migration, applied at
   ship time only.
8. **Trig Graphs: one tile asks ONLY period / amplitude / range for a list of equations,
   no sketch** (her worksheet: f(x) = cos 3x, g(x) = cos(x + 60°), h = cos x + 2,
   j = −½ cos x, p = sin 2x, q = sin(x − 45°), k = tan x − 1, t = −2tan 2x, m = −3cos ½x,
   n = 4sin x + 2, r = 2tan 3x + 3 — that shape, fresh equations).
9. **2D Trig is HIDDEN** from Exam Focus for now (`"trig"` out of `EXAM_CHAPTERS`; its card
   and skills entry stay in the code for later).
10. Cards inside a tile run **easiest first** (Level 1 → 3).
11. She reviews diagrams **in chat as contact-sheet PNGs** per batch; one ship at the end.

## The tile map (canonical — `js/exam/skills.js` is written FROM this, content sessions
## build TO it; ids are final, do not invent others)

Every chapter's LAST tile is `level-4`, label **"Level 4 ★ — the brave round"**.
Target: **6 cards per normal tile, 6–8 per Level 4 tile.**

### algx — Algebraic Expressions (NEW exam-only chapter, no drill rounds)
| id | label |
|---|---|
| expand | Expand & simplify |
| factorise-basics | Factorise: common factor, squares, trinomials |
| factorise-advanced | Factorise: grouping & cubes |
| fractions-multiply-divide | Algebraic fractions: × and ÷ |
| fractions-add-subtract | Algebraic fractions: + and − |
| level-4 | Level 4 ★ — the brave round |

### exp — Exponents & Surds
| id | label | today |
|---|---|---|
| rational-exponents-numeric | Rational & negative exponents (no calculator) | NEW |
| exponent-expressions | Simplify exponent expressions | fill to 6 |
| exponential-equations | Exponential equations | fill to 6 |
| surds | Working with surds | fill to 6 |
| rationalise | Rationalise the denominator | fill to 6 |
| surd-proofs | Surd "show that" & number tricks | NEW |
| level-4 | Level 4 ★ — the brave round | NEW |

### eqn — Equations & Inequalities
| id | label | today |
|---|---|---|
| quadratic-solving | Solve quadratic equations | NEW (factorise · formula · complete the square · "product = 0" incl. the x ∈ ℕ/ℤ/ℚ/ℝ question) |
| fraction-equations | Fraction equations with restrictions | fill to 6 |
| surd-equations | Surd equations (check the false root) | NEW |
| rational-exponents-k | Rational exponents & k-method | fill to 6 |
| simultaneous | Simultaneous equations | NEW |
| inequalities | Inequalities | fill to 6 (add a rational inequality) |
| nature-chain | Standard form → Δ → nature of roots | fill to 6 |
| k-equal-roots | Find k for equal roots | fill to 6 |
| k-for-nature | Values of k for a given nature | fill to 6 |
| delta-in-p | Δ in terms of p → prove real for all p | fill to 6 (L4 parts move out) |
| level-4 | Level 4 ★ — the brave round | NEW |

### func — Functions
| id | label | today |
|---|---|---|
| find-equation · asymptotes-domain-range · intercepts-turning-point · axis-of-symmetry · shift · inequalities · nature-of-roots · distances | (unchanged) | L4 parts move out; top up any tile that drops below 6 |
| sketch | Sketch the graph | NEW (from the equation; AND the rough sketch from sign conditions only) |
| intersection | Intersections (solve together) | NEW |
| average-gradient | Average gradient | NEW |
| reflections | Reflections | NEW (x-axis, y-axis, own asymptote) |
| level-4 | Level 4 ★ — the brave round | NEW (real-world parabola wrappers live here, plus the moved ★ parts) |

### tgraph — Trig Graphs (chapter exists with rounds tg1–tg7; NEW in Exam Focus)
| id | label |
|---|---|
| period-amplitude-range | Period, amplitude & range (equations only) |
| read-parameters | Read a, b, p, q off the graph |
| sketch | Sketch the graph |
| intersections-inequalities | Intersections & inequalities |
| shift-reflect | Shift & reflect |
| level-4 | Level 4 ★ — the brave round |

### gtrig — General Trig
| id | label | today |
|---|---|---|
| co-functions | Co-functions | fill to 6 |
| special-angles | Special angles (no calculator) | NEW |
| reduction | Reduction | fill to 6 |
| special-sums | Special Sums | fill to 6 |
| super-special-sums | Super Special Sums | NEW (0 → 6) |
| identities | Identities: prove | 0 → 6 |
| identities-undefined | Identities: undefined values | NEW |
| general-solution | General solution | fill to 6 (the six types of gt11) |
| level-4 | Level 4 ★ — the brave round | NEW |

### euclid — Euclidean Geometry (re-cut; the old single `circle-geometry` tile goes)
| id | label |
|---|---|
| bookwork-proofs | The four bookwork proofs |
| chords-and-angles | Chords, centre & angles |
| cyclic-quads | Cyclic quadrilaterals |
| tangents | Tangents |
| level-4 | Level 4 ★ — the brave round |

### trig — 2D Trig: HIDDEN (skills entry + its one card stay; chapter not in EXAM_CHAPTERS)

## Rules every card follows (content sessions)

- **Schema:** `js/exam/_schema.js` `validateQuestion()` — id, chapter, topic (= tile id),
  archetype, marks = Σ parts, lostQuest, parts[] with prompt/hint/memo/esplain, memo ticks
  sum to part marks (`a`, `ca`, `s/f`), trap cards carry no ticks. Real minus (−), decimal
  comma, HTML prompts. Fresh content = one module per tile (`<chapter>-siblings-<tile>.js`)
  exporting question objects, cut into cards by `makeCard` lines in `cards-<chapter>.js` —
  id scheme `<chapter>.sib.<abbr>.qN`, Level 4 `<chapter>.l4.qN` (`sessions/CONTENT-COMMON.md`).
- **Levels:** normal tiles hold parts of level 1–3 only. A Level 4 tile card holds the ★
  part(s) plus ONLY the lead-in parts it genuinely depends on. `intro` carries anything a
  card leans on that its own prompts no longer state. A card reads complete on its own.
- **Fresh compositions only — the repo is PUBLIC.** Bank archetypes, new numbers and
  contexts; never verbatim IEB / vendor / Antwoord-Reeks / textbook text.
- **Whose method:** algebra (algx, exp, eqn) → `METHODS-algebra.md` (algx's Gr10 factorising
  is not in her notes → textbook method, her voice: "tickets", "divorce", `∴` habit, the
  four no-answer words). Functions → `C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\GR11-FUNCTIONS-NOTES-DIGEST.md`
  (happy/sad, taking off/landing, cut lines + paint; never mine its 4 flagged slips).
  Trig (gtrig, tgraph) → textbook method in the memo, her story in hint/esplain
  (`METHODS-trig.md`). Euclidean → `EUCLID-ACCEPTABLE-REASONS.md` verbatim reasons.
- **Memo style:** question-restating framing is done by the player; memo = steps with a ✓ on
  every mark-earning line → ANSWER bar → amber trap card where a real trap exists. Both
  roads under OR where two methods are equally marked.
- **Sketches:** every card whose question would carry a figure on a real paper carries a
  `diagram` (function / trigg / quadtri / circle spec). THE REVEAL DRAWS WHAT IT FOUND;
  the question side never leaks the answer; every GIVEN line is captioned. Bare-figure rule
  for "find the turning point / find the label" parts.
- **Fractions:** write `a/b` shapes `fracHtml` (js/ui.js) knows, or pre-build with
  `stackFrac`; `node verify-exam-fractions.mjs` must report ZERO bare slashes for your files.
- **lostQuest:** the Blipwork round that teaches the skill (js/config.js CHAPTERS → quests).
  Exam-only chapters (euclid, algx) use the documented placeholder — no button renders.
- **Archetype tags** from the paper bank (`Desktop\Eksamen Vraestelle\Gr11 IEB Nov\GR11-IEB-PAPER-BANK.md`
  + survey files); scope walls are hard bounds (no annuities, trig graphs ≤ 2 parameters,
  Gr11 Euclidean = the four proofs, no concurrency).
- **Verify before reporting:** every module passes `validateQuestion` at import; add your
  modules to `verify-exam-modules.mjs` with an INDEPENDENT recompute of every number;
  `python tools/harness_run.py verify-exam` green; `python tools/shoot.py <chapter> <tile>`
  for every tile you touched and READ the crops yourself (labels through lines, reveal
  drawing nothing, axis letter under a curve = faults to fix before reporting);
  `python tools/sweep.py` A = 0, real C = 0, D = 0 is the standing bar.
- **Never:** commit, push, bump `sw.js`, run SQL, touch files another session owns.

## Session queue (foreman runs them as agents; reviewed one by one)

0. **Plumbing** (engineering, Opus) — `sessions/S0-plumbing.md`. Reviewed alone first.
1. Wave 1 (parallel, after S0 review; independent chapters/files): A algx · B exp ·
   F1 gtrig-part-1 · G1 euclid-part-1 · D1 func-new-tiles · E tgraph.
2. Wave 2 (after each chapter's part-1 review): C1 eqn-siblings · C2 eqn-new-tiles ·
   D2 func-reflections+level-4 · F2 gtrig-part-2 · G2 euclid-part-2.
3. Foreman: contact sheets to her per batch, review fixes, commits per reviewed session,
   whole-app sweep, status file, ship plan, ship on her yes.
Briefs: `sessions/CONTENT-COMMON.md` + one file per session in `sessions/`.

---

# ROUND TWO — the seven remaining chapters (planned 2026-10-07, Fable planning session)

Her word 2026-10-07 morning: "we can unhide 2D trig" and "write it down". This section is
the canonical tile map for round two, exactly as the 2026-08-23 map above is for round one.
`js/exam/skills.js` gets written FROM it; content sessions build TO it; ids are final.
Nothing here is built yet. Same card rules as round one (6 cards per normal tile, 6 to 8 on
Level 4, easiest first, every chapter ends on `level-4`).

## Her rulings 2026-10-07 (DECIDED)

1. **2D Trig comes back** into `EXAM_CHAPTERS` (one-word edit in js/config.js). Its one
   existing card (`js/exam/cards-trig.js`, cosine-rule-area) is re-homed under the new
   `cosine-rule` tile; the old `cosine-rule-area` tile id goes.
2. **The tile map below is agreed as proposed** ("you nailed it").
3. **Build order = exam order.** Paper 1 (Mon 26 Oct) chapters first: Finance,
   Probability, Number Patterns. Then Paper 2 (Mon 16 Nov): 2D Trig, Statistics,
   Measurement, Analytical Geometry. One chapter per content session, one unit per worker.
4. **The next fresh session starts with the three prep jobs** (see "Prep owed" below),
   not with cards.

## Prep owed BEFORE the card sessions (the next fresh session's queue)

1. **Probability: two page-cited reads into METHODS-probability.md** (her 2026-09-04
   rulings, top of that file): Part S = the Grade 11 Probability section of the 2026 SAG
   (`Eksamen Vraestelle/Gr11 IEB Nov/27. MATHEMATICS SAGs 2026 (Updated August 2025).pdf`);
   Part M = the memo layouts of the Probability questions in the surveyed Gr11 IEB bank
   (`Tutoring Resources/Graad 11 Curro/GR11-IEB-PAPER-BANK.md` + `survey/`), including
   every "given that" question found. One worker per read; after that the PDFs stay closed.
2. **Finance: `verify-finance.html` — DONE, it already existed** (built 2026-08-23, 146/146 on
   2026-10-10; the "no harness" note was stale; by the end of 10 Oct it covers f1–f12). Finlib recompute of every f1 to f7 generation, same shape as verify-func.
   Method source = `Tutoring Resources/Graad 12 Curro/Notas & Beplanning/FINANCE-METHOD.md`
   (ONE equation, no "start and stop", no rounding mid-question).
3. **Analytical: equation of a straight line has no drill round** (ag1 to ag7 skip it). Its
   tile's cards come from METHODS-analytical.md + the IEB bank survey rows, not from an
   existing generator. Decide in that session whether a small `analyticslib` helper
   (line through two points / through a point with a gradient, standard form) is needed
   first; probably yes.

## The round-two tile map (canonical)

### finance — Finance (Paper 1)
| id | label |
|---|---|
| which-formula | Simple, compound or depreciation? |
| depreciation | Depreciation: straight line vs reducing balance |
| compounding-periods | Rate per period & the exponent |
| timeline-equation | Timelines: the one equation |
| find-rate-or-time | Find the rate or the time |
| hire-purchase | Deposits & hire purchase |
| effective-nominal | Effective vs nominal |
| level-4 | Level 4 ★ — the brave round |
Notes: `timeline-equation` = deposits, withdrawals and rate changes on ONE timeline, ONE
equation (FINANCE-METHOD.md). `find-rate-or-time`: Gr11 finds i by the nth root; n by
the Gr11 route in the IEB memos (no logs unless the bank shows them). Scope wall: no
annuities.

### prob — Probability (Paper 1)
| id | label |
|---|---|
| venn-fill | Venn diagrams: fill the regions |
| venn-read | Venn diagrams: read the probability |
| rules | The addition rule & mutually exclusive |
| independent | Independent events: the test & contingency tables |
| tree | Tree diagrams & "at least one" |
| without-replacement | With & without replacement |
| given-that | "Given that" questions |
| level-4 | Level 4 ★ — the brave round |
Notes: `venn-fill` includes "find x from the total"; `venn-read` = ∩, ∪, complement,
"only", "neither"; `rules` = given P(A), P(B), P(A∪B), find the missing one; `given-that`
is laid out the IEB memo way (her ruling 3, 2026-09-04), never a textbook formula the
booklet doesn't show. Working follows the memos; hints/Esplains keep the booklet's voice.

### pat — Number Patterns (Paper 1)
| id | label |
|---|---|
| classify | Arithmetic, quadratic or geometric? |
| arithmetic | Arithmetic: Tₙ = an + c |
| quadratic-general-term | Quadratic: the pyramid → Tₙ = an² + bn + c |
| quadratic-which-term | Quadratic: which term? |
| missing-term | Find the missing term |
| min-max | Minimum & maximum term |
| first-differences | The gaps between terms are their own pattern |
| geometric | Geometric: Tₙ = a·rⁿ⁻¹ |
| level-4 | Level 4 ★ — the brave round |
Notes: arithmetic stays the Gr11 shortcut Tₙ = an + c, a = constant difference, c = T₀
(NEVER a + (n − 1)d). `quadratic-which-term` = solve Tₙ = a value, first term above/below.
Level 4 = picture patterns, "prove the second difference is constant", the long ones.
Discovery-round rule stands: pyramids show raw differences, never the conclusion.

### trig — 2D Trigonometry (Paper 2) — UNHIDDEN 2026-10-07
| id | label |
|---|---|
| which-rule | Which rule fits? |
| sine-rule | Sine rule: sides, angles & the ambiguous case |
| cosine-rule | Cosine rule: sides & angles |
| area-rule | Area rule: triangles, quads & regular polygons |
| two-triangles | Two triangles: carry a side across |
| level-4 | Level 4 ★ — the brave round |
Notes: `which-rule` = label the friends, name the rule, write the first line. Level 4 =
shortest distance, "show that" with a variable. Memos = textbook method with her
stories in hints (METHODS-trig.md, her ruling 6 of round one).

### stats — Statistics (Paper 2)
| id | label |
|---|---|
| centre-spread | Mean, median, mode & range from a list |
| five-number | Five-number summary, IQR, outliers & the box plot |
| grouped | Grouped data: estimated mean, modal & median class |
| ogive | Ogives: plot & read |
| std-dev | Standard deviation & "within one σ" |
| skewness | Skewness & shape |
| compare-change | Compare two sets & the effect of a change |
| level-4 | Level 4 ★ — the brave round |
Notes: quartiles = the school (n+1)/4 method on the page; the in-app Casio gives
exclusive quartiles, a known device difference, never "fix" either. `ogive` reads carry
TOL.graphRead (±2 marks). `compare-change` = a value added, every value +5, an outlier
removed. Calculator wording is SHIFT tan / STAT key words, never tan⁻¹.

### meas — Measurement (Paper 2)
| id | label |
|---|---|
| pick-formula | Name the solid & pick the formula |
| heights | Slant vs perpendicular height |
| surface-area | Surface area: open tops, pipes & joined solids |
| volume | Volume of composite solids |
| scaling | Scale factor k: area ×k², volume ×k³ |
| level-4 | Level 4 ★ — the brave round |
Notes: `heights` = find H with the hidden right-angled triangle (Pythagorean triples).
Level 4 = paint cost, fill the tank, the unknown dimension. Engine caveat from the dice
audit: solid-graph has fixed label offsets, so cards use curated safe proportions.

### analytical — Analytical Geometry (Paper 2)
| id | label |
|---|---|
| distance-midpoint | Distance & midpoint |
| gradient-lines | Gradient, parallel & perpendicular |
| equation-of-line | Equation of a straight line |
| inclination | Angle of inclination |
| triangle-lines | Median, altitude & perpendicular bisector |
| prove-shape | Prove the shape |
| area | Area of a triangle |
| level-4 | Level 4 ★ — the brave round |
Notes: `distance-midpoint` includes the converse midpoint by her transformation method
(METHODS-analytical.md D3). `gradient-lines` includes collinear with a variable.
`inclination` = acute or obtuse, SHIFT tan, 180° − …, the angle between two lines.
`prove-shape` = parallelogram, rhombus, right angle, isosceles, in her "to prove / show"
table. SAGs boundary (standing ruling): every type must exist in her IEB bank; the
k-families are Level 4 ONLY. No circles (Gr12).

## Session queue, round two (one chapter per content session, in this order)

0. Prep session: P-S (SAG read) · P-M (memo read) · F0 (verify-finance, DONE: existed since 23 Aug) · AG0 (line helper
   decision). Reviewed one by one.
1. Paper 1: FIN · PROB · PAT. Each = skills.js entry + cards file + siblings + Level 4 +
   `verify-exam-modules.mjs` recompute + contact sheets to her.
2. Config flip: `"trig"` back into EXAM_CHAPTERS; re-home the old card; then TRIG · STATS ·
   MEAS · AG.
3. Foreman: sweep, status file, ONE ship per paper (sw bump + `tools/sw_check.py` OK),
   on her yes. About 52 tiles, roughly 300 cards in all.
