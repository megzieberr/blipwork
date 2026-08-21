# DICE-AUDIT — classification of every static question for the dice recipes

Written 2026-08-21, session 0a (audit-only, per DICE-PLAN.md build order step 0).
Read DICE-PLAN.md first — this file assumes its rulings.

**Legend:** CLEAN = ROLLS CLEANLY · CARE = ROLLS WITH CARE (the specific care is
named in the reason column) · STATIC = STAYS STATIC (not in the dice pool).

---

## 1. How generation currently works (read this before anything else)

**The headline fact: Blipwork's questions are already randomly generated on
every play, in almost every chapter.** A quest file (e.g. `questf6-deposits.js`)
exports `{ id, skills: [{ id, concept, gen }, …] }`. `gen` is a plain function —
called fresh each time — that picks random numbers (`randInt`, `pick`,
`dataset`), feeds them into a maths library (`statlib.js`, `finlib.js`,
`triglib.js`, …) to compute the correct answer, builds decoys from those same
numbers, and (where relevant) hands a spec to a diagram engine
(`js/engine/*.js`) that draws it to scale. Nothing is hand-typed; the picture
and the answer key can't disagree because they're computed from the same
rolled values. `play.js`'s `present()` calls `skill.gen()` fresh every time a
question is (re)shown — including the "Try a similar one →" sibling after a
wrong answer, which is a live re-roll, not a repeat.

**So what is actually "static" about a static round?** Three things, and only
three:
1. **The skill sequence.** `def.skills` is a fixed, ordered array — quest 2 of
   Statistics is always `measure → mean → median → mode → range → total`, in
   that order, once each. The *numbers* inside each skill are fresh; the
   *set and order of skills* is not.
2. **The skill→question-kind mapping.** `measure` is always an `mc`; `mean`
   is always a `calc`. A skill's input mechanic doesn't vary between plays.
3. **Teacher-gated progression.** The chapter/quest map (outside the files
   audited here) controls which quests a learner can even reach. Play.js
   itself has no gating — gating lives one layer up, at the map/chapter
   level — but the practical effect is a learner can only meet skill X by
   unlocking quest Y first.

The dice's job, per DICE-PLAN, is genuinely different from "make it more
random" — the numbers are *already* random. Dice needs to: (a) deal skills in
a fresh order outside the fixed sequence (first play(s) = one of each kind,
then fully random), (b) do this **without** requiring the learner to unlock
the teacher-gated quest map first, and (c) skip the score/streak/mastery-loop
bookkeeping entirely (stat-free ruling). Because the generators already exist
and are already fresh-per-play, recipe work for most chapters is closer to
**"extract this skill's `gen()` into the dice pool and wire the dealing
algorithm around it"** than "build a new generator from scratch." The
classification below exists to find the skills where that extraction is NOT
a free lunch.

**What's genuinely NOT free**, chapter by chapter (detail in each section
below): a real fraction of skills across every chapter have zero numeric
variation (pure fact-recall, e.g. "P is the principal amount") — these are
trivially reusable but never look different twice. Several chapters
(Probability, Measurement, Trig, Functions, Analytical Geometry) lean on
explicit collision-avoidance loops (`do…while`, retry-with-fallback) or
curated "safe" value lists baked into the current generator — a dice recipe
**must** carry these guards over verbatim, or it will eventually roll a
degenerate question (a 2-button MC, a mislabeled diagram, an ambiguous
triangle). Two chapters — Exponents & Surds and Equations & Inequalities —
are explicitly commented in their own source as "THEORY only... curated
pools, no problem-crunching" and a real share of their content is hand-authored
worked-example prose tied to specific numbers, not a parametrised template;
that content is classified STATIC below, the only chapters where STATIC
shows up at all.

**Diagram engines:** every chapter with a diagram engine (`js/engine/*.js`)
already renders honestly from arbitrary generator output — proven in
production by the sibling-regeneration and `verify-*.html` machinery. The one
exception worth flagging hard is **Measurement**: the solid-figure engine's
dimension-letter placement is at *fixed pixel offsets*, and for many
proportions a letter lands on a hidden/back edge. The current code works
around this with hand-curated "safe" wrapper functions (`figPrismSafe`,
`safeCyl`, `safeConeTriple`, …) that nudge or pick from a short list of known
label-safe (r, h) pairs — see the Measurement section. This means the
Measurement diagram engine does **not** yet support truly arbitrary honest
inputs; a dice recipe either keeps re-using these curated lists (limits
variety) or the engine needs a real fix (auto label placement) before
Measurement dice rounds can roll freely.

**Harness coverage today:** `verify.html` (Stats *graph engine* only, not the
quest content), `verify-prob.html`, `verify-trig.html`, `verify-meas.html`,
`verify-func.html`, `verify-tgraph.html`, `verify-analytical.html`,
`verify-patterns.html`, `verify-exp.html`, `verify-eq.html`, `verify-store.html`
all exist. **There is no `verify-finance.html`** — Finance has no dedicated
harness at all today, static or otherwise. That's a real gap to close before
Finance gets a dice pool, on top of it being a pen-and-paper/METHODS-digest
chapter.

**Input law check (no violations found):** across all ~530 skills read for
this audit, every input is one of `mc`/`reason` (list-pick), `yesno`
(list-pick), `calc` (number pad), `tap` (sketch-click), or `calcdo` (stats
calculator, Statistics quest 1 only). No free-text entry exists anywhere.
Two chapter-level oddities worth knowing, not fixing: **Analytical Geometry
uses zero `calc` and zero `tap`** — every AG question, even ones reading a
gradient from two labelled points, is multiple-choice (fractions and signed
coordinates don't suit a decimal pad, and nothing currently invites a
sketch-click). **`calcdo` (the embedded Casio) exists only in Statistics
quest 1** — DICE-PLAN explicitly names this as reusable for the Stats pilot,
and it already rolls cleanly (see §2).

**Decoy collision-checking by value:** DICE-PLAN's rule ("decoys must be
collision-checked BY VALUE, string de-dup silently drops value-equal
decoys") is already followed in spirit almost everywhere — `mc()`/`mcNum()`
in `_shared.js` dedup against the *formatted display string*, and because the
formatter (`C()`/`fmtComma`) is deterministic that's effectively value-safe
for the common case. Some chapters go further and explicitly filter by
numeric value before formatting (Probability's `fracMC`/`table*` helpers,
Analytical Geometry's `cleanGrad`/perpendicular-fraction logic, Number
Patterns' `generalTerm` decoy filters) — these are the pattern to copy when a
recipe's decoys are themselves computed values rather than fixed strings.
Worth a harness check once dice recipes exist, not a live bug today.

---

## 2. Statistics (q1–q8) — the pilot chapter

Every one of Statistics' 58 skills is already parametric; none rely on a
fixed hand-authored prose bank (unlike Exponents/Equations). 49 are CLEAN
outright. All 9 CARE items already carry their own guard in the current
code — the "care" is real but *already solved*; the recipe work is to copy
the guard, not invent one. **No STATIC skills in this chapter.**

### q1 · Calculator skills (`quest01-calculator.js`) — mechanic: stats calculator

| Skill | Kind | Class | Reason |
|---|---|---|---|
| clear | calcdo | CLEAN | fixed calculator action, goal already computed from calculator state |
| freqOn | calcdo | CLEAN | fixed action |
| statMode | calcdo | CLEAN | fixed action |
| capture | calcdo | CLEAN | `dataset(5,2,16)` fresh each roll; goal = matching set |
| readN | calcdo | CLEAN | fresh data set, n computed |
| readMean | calcdo | CLEAN | fresh set, mean computed via statlib |
| readSd | calcdo | CLEAN | fresh set, σ computed via statlib |
| readMedian | calcdo | CLEAN | fresh set, median computed via statlib |

All 8 CLEAN. This is exactly the mechanism DICE-PLAN names for the Stats
pilot ("reusing the existing stats calculator-button rounds").

### q2 · Centre & spread (`quest02-centre-spread.js`) — mechanics: list-pick / number pad

| Skill | Kind | Class | Reason |
|---|---|---|---|
| measure | mc | CLEAN | trivial fixed recall (which measure is spread vs centre), no diagram |
| mean | calc | CLEAN | `rawset(5-8,2,20)` fresh, computed mean |
| median | mc | CLEAN | `dataset` fresh, computed via statlib, `mcNum` dedups decoys |
| mode | mc | CLEAN | fresh base+duplicate, `mcNum` dedups |
| range | calc | CLEAN | fresh dataset, computed range |
| total | calc | CLEAN | reverse (mean→sum), fresh n/m |

All 6 CLEAN.

### q3 · Quartiles, box-and-whisker, outliers (`quest03-quartiles.js`) — mechanics: list-pick / number pad / sketch-click

| Skill | Kind | Class | Reason |
|---|---|---|---|
| pos | mc | CLEAN | fresh n(7-16), computed via `quartilePos`, decoys are specific misconceptions |
| value | mc | CARE | decoy construction branches on the fractional part of the position (multiple misconception cases) — copy the branch logic exactly |
| iqr | calc | CLEAN | fresh q1/q3 |
| iqrList | calc | CLEAN | fresh dataset, computed q1/q3 |
| semiIqr | calc | CLEAN | fresh q1/q3 (even IQR forced for a whole-number answer) |
| readBox | calc + graph(box) | CLEAN | fresh five-number summary, `tol: TOL.graphRead` already tuned |
| tapBox | tap + graph(box) | CLEAN | sketch-click, fresh five-number summary |
| outBound | calc | CLEAN | fresh q1/q3, computed via `outlierBounds` |
| isOutlier | yesno | CARE | deliberately engineers an outlier/non-outlier 50/50 split with margin buffers so the value isn't ambiguously close to a boundary — copy the margin logic |
| percentile | calc | CLEAN | fresh n/p, computed via `percentilePos` |

8 CLEAN, 2 CARE.

### q4 · Skewness & shape (`quest04-skewness.js`) — mechanic: list-pick

| Skill | Kind | Class | Reason |
|---|---|---|---|
| tailName | mc | CLEAN | trivial pick(direction), no diagram |
| meanMedian | mc | CLEAN | fresh median/skew, computed relation |
| boxSkew | mc + graph(box) | CLEAN | `skewBox()` engineers the skew type honestly per call |
| histSkew | mc + graph(hist) | CLEAN | `skewClasses()` engineers the skew honestly |
| ogiveSkew | mc + graph(ogive) | CLEAN | `skewClasses()` engineers the skew honestly |
| reasonStep | mc | CLEAN | trivial pick |

All 6 CLEAN.

### q5 · Grouped data (`quest05-grouped.js`) — mechanic: number pad / list-pick, some with an embedded frequency **table**

| Skill | Kind | Class | Reason |
|---|---|---|---|
| total | calc + table | CLEAN | `groupedSet()` fresh |
| midpoint | calc | CLEAN | fresh class bounds |
| fx | calc | CLEAN | fresh class + frequency |
| estMean | calc + table | CLEAN | fresh classes, computed via `groupedMean` |
| modalClass | mc + table | CARE | `uniqueMax()` bumps a tied maximum frequency so the modal class is unambiguous — copy this |
| medianClass | mc + table | CARE | `hitsHalfBoundary()` reroll loop avoids the median landing exactly on a class edge — copy this |
| calcMethod | mc | CLEAN | fixed recall, no numbers |

5 CLEAN, 2 CARE.

### q6 · Ogives (`quest06-ogives.js`) — mechanic: list-pick / number pad, embedded **table**

| Skill | Kind | Class | Reason |
|---|---|---|---|
| whichPoint | mc | CARE | `do…while` avoids the cumulative frequency accidentally equalling the class's upper bound (decoy collision) |
| anchor | mc | CLEAN | trivial pick |
| cumFreq | calc + table | CLEAN | fresh classes |
| modalSteepest | mc + graph(ogive) | CARE | `uniqueMax()` avoids a tied steepest section |
| readQuartile | calc + graph | CLEAN | engine-computed via `ogiveAnswerAtCum`, `tol: TOL.graphRead` |
| readPercentile | calc + graph | CLEAN | same engine function |
| valueAtMost | calc + graph | CLEAN | engine-computed via `ogiveAnswerAtVal` |

5 CLEAN, 2 CARE.

### q7 · Standard deviation & variance (`quest07-stddev.js`) — mechanic: list-pick / number pad

| Skill | Kind | Class | Reason |
|---|---|---|---|
| meaning | mc | CLEAN | fixed recall |
| calcKey | mc | CLEAN | fixed recall |
| varFromSd | calc | CLEAN | fresh σ |
| sdFromVar | calc | CLEAN | fresh σ |
| boundary | calc | CLEAN | fresh mean/σ |
| within | calc | CARE | 60-try retry loop enforces agreement between the exact and the *displayed rounded* mean/σ, and keeps data away from the boundary — the hardest-won guard in the whole app, copy it exactly |
| consistency | mc | CLEAN | fresh a/b with an enforced margin so they're clearly different |

6 CLEAN, 1 CARE.

### q8 · Mixed exam favourites (`quest08-mixed.js`) — mechanic: list-pick / number pad, some **multi-graph** (side-by-side box plots)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| effectChange | mc | CLEAN | fresh k, fixed measure-list pick |
| effectMean | calc | CLEAN | fresh mean/k |
| sdShifted | mc | CLEAN | fresh σ/k, `mcNum` dedups |
| compareMedian | mc + multi-graph | CARE | `do…while` avoids two box plots with equal medians |
| compareSpread | mc + multi-graph | CARE | `do…while` avoids two box plots with equal range |
| findUnknown | calc | CLEAN | fresh IQR/quartile |
| varShift | calc | CLEAN | fresh σ/k |

5 CLEAN, 2 CARE.

**Statistics totals: 58 skills — 49 CLEAN, 9 CARE, 0 STATIC.**

**Which of q1–q8 are dice-ready, and what the recipe work actually is:**
every single skill in every quest already rolls fresh numbers, computes its
answer from a maths library, and (where relevant) draws an honest diagram —
including all 9 CARE skills, whose guards already exist and just need to be
copied into the recipe function, not invented. There is **no missing
generator anywhere in this chapter.** The real recipe work for Statistics is
almost entirely mechanical: (1) pull each `gen()` out from behind its fixed
`quest0N` sequence into a shared dice pool per concept, (2) build the
"first play = one of each kind, then fully random" dealing algorithm
DICE-PLAN specifies (this is new code, but chapter-agnostic — build it once),
(3) make sure the dice round is stat-free (skip the `st.firstTry`/streak/XP
bookkeeping that assumes a fixed-length teacher-gated round — dice still
pays XP per DICE-PLAN, just not best-score/streak), and (4) stand up a
harness (`verify-dice-stats.html` in the `verify-*.html` style) that rolls
each recipe hundreds of times and checks: clean answer, honest diagram,
4 distinct options, no decoy collision, input-law compliance, method text
present. Given this, Statistics is a genuinely low-risk pilot — the ceiling
on "recipe effort" here is the harness and the dealing algorithm, not new
maths generation.

---

## 3. Finance (f1–f7)

Almost entirely CLEAN already (50/51) — but this is a **pen-and-paper**
chapter (DICE-PLAN's list) that needs its METHODS digest before recipes are
written; `FINANCE-METHOD.md` already exists per the brief, so Finance is
ahead of Probability/Analytical Geometry on that front. **No harness file
exists for this chapter at all today** (`verify-finance.html` is missing) —
that gap should close alongside (or before) any dice work here, static or not.

### f1 · Words & formulas (`questf1-words.js`) — mechanic: list-pick

All 8 skills (`symP`, `symA`, `pctToFrac`, `whichSimple`, `whichCompoundScenario`,
`pickCompoundFormula`, `whatN`, `inflationType`) are **CLEAN**. Most are pure
fixed-fact recall (no numbers to roll, trivially safe to reuse); `pctToFrac`
rolls a fresh percentage from a small list and computes `i` via `toFrac`.

### f2 · Simple, compound & depreciation (`questf2-types.js`) — mechanic: list-pick

All 8 skills (`simpleBase`, `compoundBase`, `growsFaster`, `reducingWhich`,
`linearWhich`, `reducingGraph`, `linearGraph`, `depMeaning`) are **CLEAN** —
pure conceptual recall, zero numeric content, no diagram.

### f3 · Compounding periods (`questf3-compounding.js`) — mechanic: list-pick

All 6 skills (`timesPerYear`, `ratePerPeriod`, `exponent`, `fullSetup`,
`monthlyRate`, `whyDivide`) are **CLEAN** — each rolls a fresh
rate/compounding-frequency/year combination from `COMPOUNDING`/`toFrac` and
computes the answer; `whyDivide` is fixed recall.

### f4 · Timelines — counting moves (`questf4-timeline-count.js`) — mechanic: list-pick / number pad / sketch-click

All 7 skills (`countForward`, `countBetween`, `countBackward`,
`directionForward`, `directionBackward`, `tapTarget`, `directionWord`) are
**CLEAN** — every one rolls fresh period counts and renders an honest
timeline via the timeline engine.

### f5 · Timelines — building the move (`questf5-timeline-build.js`) — mechanic: list-pick

| Skill | Kind | Class | Reason |
|---|---|---|---|
| exponentForward | mc + graph(timeline) | CLEAN | fresh k |
| exponentBackward | mc + graph(timeline) | CLEAN | fresh a/b |
| expression | mc + graph(timeline) | CLEAN | fresh k/P/rate |
| anyPoint | yesno + graph(timeline) | CARE | **entirely hardcoded** — "R1 000 at T0 is worth R2 100,34 at T5" has no `pick`/`randInt` call at all; always the same numbers, always `yes: true`. Needs generalising to arbitrary P/rate/T (and an occasional false case) before it can roll |
| rateChangeBrackets | mc | CLEAN | fresh y1/y2 |
| rateChangeSegment | mc | CLEAN | fresh compounding option/years/rate |
| rateChangeExpr | mc + graph(timeline) | CLEAN | fresh two-segment rate change, fully computed |

6 CLEAN, 1 CARE (the one skill in the whole Finance chapter that needs real generator work, not just extraction).

### f6 · Deposits & hire purchase (`questf6-deposits.js`) — mechanic: list-pick / number pad

All 7 skills (`depositAmount`, `amountOwed`, `percentOwed`, `depositInterest`,
`interestOnWhat`, `hpType`, `hpTotal`) are **CLEAN** — fresh price/percentage/
rate/term combinations, computed via `finlib.js`, rounded to whole rand by
construction.

### f7 · Effective vs nominal rates (`questf7-eff-nom.js`) — mechanic: list-pick / number pad

All 8 skills (`effectiveAnnual`, `nominalFreq`, `bothCompound`,
`conversionFormula`, `nMeaning`, `whyConvert`, `whichGrowsMore`, `effCalc`)
are **CLEAN**. `whichGrowsMore` currently hardcodes "10% p.a." on both sides
of its comparison, but the qualitative point (more frequent compounding →
higher effective rate) holds for any rate — trivially parametrisable, not
worth a CARE flag on its own.

**Finance totals: 51 skills — 50 CLEAN, 1 CARE, 0 STATIC.**

---

## 4. Probability (p1–p7)

Also a **pen-and-paper** chapter needing a METHODS digest (worked examples
from Megan) before recipes are written — but unlike Finance, this chapter's
generators lean heavily on explicit retry/collision-avoidance code that a
recipe **must** copy, not skip. 30 CLEAN, 25 CARE — the highest CARE share of
any chapter with a real diagram engine.

### p1 · Chance & the scale (`questp1-basics.js`) — mechanic: number pad / list-pick

| Skill | Kind | Class | Reason |
|---|---|---|---|
| sampleSpace | calc | CLEAN | fresh die size |
| countOutcomes | calc | CLEAN | fresh die size + event |
| probFraction | mc | CLEAN | decoys filtered by value (`Math.abs(c.val - f.val) < 1e-9`) |
| probDecimal | calc | CARE | `do…while` forces the event count to divide the die size exactly (clean 2dp decimal) |
| probPercent | calc | CLEAN | fresh die/event, dp logic already handles eighths |
| relativeFrequency | calc | CLEAN | fresh total/hits |
| theoryVsRel | mc | CLEAN | fixed recall |
| scaleSense | mc | CLEAN | trivial pick |

7 CLEAN, 1 CARE.

### p2 · Venn diagrams — regions (`questp2-venn-regions.js`) — mechanic: list-pick / sketch-click

| Skill | Kind | Class | Reason |
|---|---|---|---|
| symbolAnd | mc + graph(venn) | CLEAN | fixed notation recall, static diagram |
| symbolOr | mc + graph(venn) | CLEAN | fixed |
| complementMeaning | mc + graph(venn) | CLEAN | fixed |
| tapIntersection | tap + graph(venn) | CLEAN | fixed target, sketch-click |
| tapOnlyRegion | tap + graph(venn) | CLEAN | 2-way pick |
| tapNeither | tap + graph(venn) | CLEAN | fixed |
| shadedMeaning | mc + graph(venn) | CLEAN | pick of 4 fixed shade-cases |
| complementSum | mc | CLEAN | fixed |
| vowelView | mc + graph(venn) | CARE | word drawn from a 4-item fixed bank (FORMULA/NUMBERS/TRIANGLE/DIAMETER) — a dice pool would want a bigger/generated word list to avoid quick repeats |

8 CLEAN, 1 CARE.

### p3 · Venn diagrams — probabilities (`questp3-venn-prob.js`) — mechanic: number pad / list-pick

Every skill (`countInter`, `countOnlyA`, `pA`, `pIntersection`, `pUnion`,
`pComplement`, `pNeither`, `pOnlyB`) shares one `scenario()` helper.

| Skill | Kind | Class | Reason |
|---|---|---|---|
| countInter | calc + graph(venn) | CARE | `scenario()` retries up to 60× (with a hardcoded fallback) so all 4 Venn regions are non-empty |
| countOnlyA | calc + graph(venn) | CARE | same `scenario()` |
| pA | mc + graph(venn) | CARE | same `scenario()`, plus value-filtered decoys |
| pIntersection | mc + graph(venn) | CARE | same |
| pUnion | mc + graph(venn) | CARE | same |
| pComplement | mc + graph(venn) | CARE | same |
| pNeither | mc + graph(venn) | CARE | same |
| pOnlyB | mc + graph(venn) | CARE | same |

0 CLEAN, 8 CARE — the whole quest hinges on one retry-loop helper; copy it once, reuse for all eight.

### p4 · The probability rules (`questp4-rules.js`) — mechanic: number pad / list-pick / sketch... (no tap, list-pick/number pad only)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| addUnion | calc | CARE | `probs()` retries up to 80× (fallback hardcoded) to keep all four probabilities in range |
| addFindInter | calc | CARE | same `probs()` |
| complement | calc | CARE | same `probs()` |
| mutExUnion | calc | CARE | same `probs()` (mutually-exclusive variant) |
| classifyByOverlap | mc | CARE | same `probs()` |
| exclusiveFromVenn | yesno + graph(venn) | CLEAN | direct random ints, no retry loop needed |
| exhaustiveDef | mc | CLEAN | fixed recall |
| whichFormula | mc | CLEAN | fixed recall |

3 CLEAN, 5 CARE.

### p5 · Independent events (`questp5-independence.js`) — mechanic: number pad / list-pick, embedded contingency **table**

| Skill | Kind | Class | Reason |
|---|---|---|---|
| defTest | mc | CLEAN | fixed recall |
| productRule | calc | CARE | `PAIRS` is a curated 7-pair bank of "nice" decimals so the product is exact to 2dp — arbitrary rolls would break exactness |
| isIndependent | yesno | CARE | same curated `PAIRS` bank |
| tableReadFeature | mc + table | CARE | `table()` is a careful integer-grid builder (grand total 100, forced divisibility) — copy it |
| tableReadOverlap | mc + table | CARE | same `table()` |
| tableIndependent | yesno + table | CARE | same `table()` |
| notIndependentMeaning | mc | CLEAN | fixed recall |

2 CLEAN, 5 CARE.

### p6 · Tree diagrams (`questp6-trees.js`) — mechanic: number pad / list-pick / sketch-click

| Skill | Kind | Class | Reason |
|---|---|---|---|
| branchSum | mc + graph(tree) | CLEAN | fixed 0.5 coin, trivial |
| pathProduct | calc + graph(tree) | CARE | P(H) restricted to a curated 5-value list so products round exactly to 2dp |
| tapPath | tap + graph(tree) | CLEAN | fixed 0.5 coin, sketch-click |
| exactlyOneHead | calc + graph(tree) | CARE | same curated P(H) list |
| atLeastOneHead | calc + graph(tree) | CARE | **entirely hardcoded** — always a fair (0.5) coin, no `pick`/`randInt` at all; needs generalising to the same curated P(H) list its siblings already use |
| noneShortcut | mc | CLEAN | fixed recall |
| pNoHeads | calc + graph(tree) | CARE | curated P(H) list, only 3 values — thin bank |
| biasedFindOther | calc | CARE | curated P(H) list (3 values), computed both-squared |

3 CLEAN, 5 CARE.

### p7 · With & without replacement (`questp7-replacement.js`) — mechanic: number pad / list-pick / sketch-click

All 7 skills (`totalAfterDraw`, `colourAfterDraw`, `denomChanges`, `pathWith`,
`pathWithout`, `atLeastOneWithout`, `tapPathWithout`) are **CLEAN** — all
route through `twoColourBag()`, which picks a colour pair and counts (4-9)
freely with no fragile retry loop, and answers/decoys are computed via
`problib.js` (`twoDrawPaths`, `atLeastOne`).

**Probability totals: 55 skills — 30 CLEAN, 25 CARE, 0 STATIC.**

---

## 5. 2D Trigonometry (t1–t7)

Fully generative, diagrams drawn to scale by `placeTri` (`_trig.js`) +
`triglib.js`. The recurring CARE pattern here is triangle-uniqueness /
non-ambiguity, on top of a universal "is this a valid triangle" check
(triangle-inequality `do…while`) that appears almost everywhere and is not
flagged per-row below — it's the baseline, not a special case.

### t1 · Which rule fits? (`questt1-choose.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| ruleForCase | mc + graph(triangle) | CLEAN | per-case triangle gen (AAS/SAS/SSS/AREA), computed |
| oppositeSide | tap + graph(triangle) | CLEAN | sketch-click |
| biggestAngle | mc + graph(triangle) | CARE | `do…while` forces a strictly-longest side (no tie for "biggest angle") |
| cosineTrigger | mc | CLEAN | fixed recall |
| areaTrigger | mc | CLEAN | fixed recall |
| ssaTrigger | mc | CLEAN | fixed recall |

5 CLEAN, 1 CARE.

### t2 · Sine rule — sides (`questt2-sine-sides.js`)

All 5 skills (`findSide`, `findThirdSide`, `wordSide`, `whichForm`,
`setupRatio`) are **CLEAN** — fresh AAS triangles, tolerance (`tol: 0.015`)
already tuned for the last-digit rounding drift the method allows.

### t3 · Sine rule — angles & the ambiguous case (`questt3-sine-angles.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| findAngle | calc + graph(triangle) | CARE | `do…while` requires b<a-3 (unique acute θ) AND θ≥24° (label wedge width) |
| ambiguousCount | mc | CARE | up to 200-iteration engineered loop to deliberately hit 0/1/2-triangle outcomes |
| ambiguousBoth | calc + graph? | CARE | `do…while` forces exactly the 2-triangle case |
| obtusePartner | calc | CLEAN | simple random acute angle |
| whichForm | mc | CLEAN | fixed recall |
| ambiguousWhen | mc | CLEAN | fixed recall |

3 CLEAN, 3 CARE.

### t4 · Cosine rule — sides (`questt4-cosine-sides.js`)

All 4 skills (`findSide`, `wordSide`, `includedAngle`, `whichFormula`) are
**CLEAN**.

### t5 · Cosine rule — angles (`questt5-cosine-angles.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| findAngle | calc + graph(triangle) | CLEAN | standard triangle-inequality guard only |
| obtuseAngle | calc + graph(triangle) | CARE | deliberately engineers c² > a² + b² (forces the obtuse case) via bounded `randInt` |
| rearrange | mc | CLEAN | fixed recall |
| oppositeSubtracted | mc | CLEAN | fixed recall |

3 CLEAN, 1 CARE.

### t6 · Area rule (`questt6-area.js`)

All 6 skills (`triArea`, `triAreaWord`, `regularPolygon`, `houseArea`,
`areaFormula`, `needIncluded`) are **CLEAN** — tolerances already tuned
(`tol: 0.5` for the regular-polygon triangle-method drift, `tol: 0.06` for
the house-composite figure).

### t7 · Mixed problems (`questt7-mixed.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| solveUnknown | calc + graph(triangle) | CLEAN | 3-way branch (sine-side/cos-side/cos-angle), each independently valid |
| shortestDistance | calc + graph(triangle) | CARE | near-isosceles constraint keeps the perpendicular's foot inside the triangle; `segStartClear()` dash-positioning trick to avoid overlapping the angle label |
| areaFromSSS | calc + graph(triangle) | CLEAN | standard triangle-inequality guard only |
| contextCosine | calc | CLEAN | word problem, fresh b/c/A, no diagram |
| strategy | mc | CLEAN | fixed pick of 4 cases |

4 CLEAN, 1 CARE.

**2D Trigonometry totals: 36 skills — 30 CLEAN, 6 CARE, 0 STATIC.**

---

## 6. Measurement (m1–m6)

**The chapter's defining fact: almost every skill that draws a solid figure
already wraps it in a hand-curated "safe" helper** (`figPrismSafe`,
`figTriPrismSafe`, `figConePerp`, `safeCyl`, `safeConeTriple`,
`safePyramidTriple`, …) because the solid-figure engine places dimension
letters at fixed pixel offsets, and for a real range of (r, h) proportions a
letter lands on a hidden/back edge — every one of these wrappers has a code
comment pointing at "the chapter review" as where this was worked out by
hand. **This means the engine does not yet support arbitrary honest inputs
end-to-end** — it draws honestly, but label placement is only proven safe
for the curated proportions the current code already picks from. A dice
recipe here has two real choices: keep reusing (and extending) these curated
"safe" lists (bounded variety, but zero risk), or invest in a real fix to the
engine's label placement (unbounded variety, real engineering work). Either
way, this is the single biggest engine-readiness gap found in this audit —
worth raising with Megan explicitly before Measurement's turn in the build
order.

### m1 · Name it & its formula (`questm1-name-formula.js`)

All 5 skills (`nameSolid`, `volFormula`, `saFormula`, `baseTimesHeight`,
`thirdFamily`) are **CARE** — every one draws through the `FIG`/label-safe
wrapper set described above.

### m2 · Slant vs perpendicular height (`questm2-heights.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| volUsesPerp | mc + graph(solid) | CARE | `bothCone`/`bothPyr` label-safety nudges |
| saUsesSlant | mc + graph(solid) | CARE | same |
| whichIsSlant | mc + graph(solid) | CARE | same |
| slantBigger | yesno + graph(solid) | CARE | same |
| units | mc | CLEAN | no diagram, pure cm²-vs-cm³ recall |

4 CARE, 1 CLEAN.

### m3 · Open tops & bottoms (`questm3-open.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| closedCyl | mc + graph(solid) | CARE | `safeCyl()` label-safety wrapper |
| openTopCyl | mc + graph(solid) | CARE | same |
| openBothCyl | mc + graph(solid) | CARE | same |
| topCounted | yesno + graph(solid) | CARE | same |
| pipeSurfaces | mc + graph(solid) | CARE | same |
| openBox | mc | CLEAN | no diagram, pure face-count recall |

5 CARE, 1 CLEAN.

### m4 · Composite (compound) solids (`questm4-composite.js`)

All 5 skills (`hiddenFace`, `volSilo`, `volDome`, `saPieces`, `addVolumes`)
are **CARE** — every one draws through `silo()`/`dome()` composite-figure
wrappers with the same label-safety nudging.

### m5 · Mixed: read it & pick the formula (`questm5-mixed.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| mixName | mc + graph(solid) | CARE | `FIG` label-safe set |
| mixVolume | mc + graph(solid) | CARE | same |
| mixSA | mc + graph(solid) | CARE | `FIG_SA` label-safe set (adds slant-height labels) |
| mixOpen | mc + graph(solid) | CARE | `safeCyl`-equivalent width/height check |
| scaleVolume | mc | CLEAN | no diagram, pure k³ computation |
| scaleArea | mc | CLEAN | no diagram, pure k² computation |

4 CARE, 2 CLEAN.

### m6 · Find the perpendicular height (`questm6-height.js`)

All 6 skills (`coneFindH`, `pyramidFindH`, `coneFindSlant`, `coneRelation`,
`pyramidWhichLeg`, `hypIs`) are **CARE** — every one draws through
`safeConeTriple()`/`safePyramidTriple()`, which not only pick whole-number
Pythagorean triples but also adjust the frame size and reject proportions
known to mislabel (documented in-code: "the 16-base pyramid... always sits
on hidden edges, so skip that one triple").

**Measurement totals: 33 skills — 4 CLEAN, 29 CARE, 0 STATIC.** By far the
most CARE-heavy chapter with a real diagram engine — treat the label-safety
problem as a prerequisite, not an afterthought, before writing Measurement
recipes.

---

## 7. Functions (fn1–fn7)

Fully generative via `_func.js`/`funclib.js`; the graph engine already
renders arbitrary lines/parabolas/hyperbolas/exponentials honestly (proven
by the sheer variety already live). This is also one of the two chapters
(with Trig Graphs) slated to get the shared "Soek die fout" error-checking
mechanic later — that's new work layered on top, it doesn't change the
classification of the existing static content below.

### fn1 · The four families (`questfn1-families.js`)

All 4 skills (`identifyFromEq`, `nameFromGraph`, `featureMatch`, `notation`)
are **CLEAN**.

### fn2 · The line & the parabola (`questfn2-line-parabola.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| lineDirection | mc + graph(function) | CLEAN | fresh line |
| lineIntercepts | mc + graph(function) | CARE | `while` loop excludes a=0, q=0, undefined x-intercept |
| happySad | mc + graph(function) | CLEAN | fresh parabola |
| turningPoint | mc + graph(function) | CLEAN | fresh parabola, `ptDecoys` |
| tpFormRead | mc + graph(function) | CARE | `while` loop avoids p=0, q=0, p=q collisions |
| axisOfSymmetry | mc + graph(function) | CARE | hand-built conditional decoy-collision avoidance for the tp.x=0 edge case |
| parabolaRange | mc + graph(function) | CLEAN | fresh parabola |

4 CLEAN, 3 CARE.

### fn3 · Hyperbola & exponential (`questfn3-hyperbola-exp.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| hypAsymptotes | mc + graph(function) | CARE | `while` loop excludes p=q |
| hypDomainRange | mc + graph(function) | CARE | same |
| hypBranches | mc + graph(function) | CLEAN | fresh hyperbola |
| expGrowthDecay | mc + graph(function) | CARE | `while` loop excludes a<0 (keeps "growth" phrasing valid) |
| expAsymptote | mc + graph(function) | CLEAN | fresh exponential |

2 CLEAN, 3 CARE.

### fn4 · Reading features off a graph (`questfn4-read-graph.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| readYIntercept | mc + graph(function) | CARE | `while` loop ensures a non-zero intercept that's actually marked |
| readXIntercept | mc + graph(function) | CARE | `while` loop ensures an integer, non-zero intercept |
| readTP | mc + graph(function) | CARE | `while` loop ensures integer TP coordinates (must land on a gridline for a fair read-off) |
| readAsymptotes | mc + graph(function) | CARE | `while` loop excludes p=q for the hyperbola branch |
| readRange | mc + graph(function) | CLEAN | no loop |

1 CLEAN, 4 CARE.

### fn5 · Increasing/decreasing & inequalities (`questfn5-inequalities.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| incDec | mc + graph(function) | CLEAN | fresh parabola, deterministic side logic |
| fPositive | mc + graph(function) | CARE | `rootsParabola()` do-while ensures 2 distinct roots ≥1 apart |
| fNegative | mc + graph(function) | CARE | same `rootsParabola()` |
| productSign | mc | CLEAN | fixed pick of 3 |
| xfSign | mc | CLEAN | fixed pick of 2 |

3 CLEAN, 2 CARE.

### fn6 · Transformations (`questfn6-transformations.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| shiftRule | mc | CLEAN | fresh k, fixed pick of 4 directions |
| shiftDescribe | mc | CLEAN | same pattern |
| reflect | mc | CLEAN | fixed pick of 4 |
| stretch | mc | CLEAN | trivial fixed |
| applyReflect | mc + graph(function) | CARE | `while` loop keeps both TP coordinates ≥0.4 in magnitude so all 4 decoys stay distinct |
| applyToParabola | mc + graph(function) | CLEAN | fresh parabola + k |
| applyToHyperbola | mc + graph(function) | CLEAN | fresh hyperbola + k |

6 CLEAN, 1 CARE.

### fn7 · Putting graphs together (`questfn7-together.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| intersectionRead | mc + graph(function) | CARE | two `while` loops avoid the origin and avoid a1=a2 (or either =0) |
| fAboveG | mc + graph(function) | CARE | same distinctness `while` loops |
| natureRoots | mc | CLEAN | pick of 4 cases, one uses a live TP value but no loop |
| avgGradient | calc + graph(function) | CARE | `for(;;)` retry loop bounds all feature y-values to ≤12 so the sketch stays readable |
| maxLength | calc + graph(function) | CLEAN | closed-form construction, no retry needed |

2 CLEAN, 3 CARE.

**Functions totals: 38 skills — 22 CLEAN, 16 CARE, 0 STATIC.**

---

## 8. Trig Graphs (tg1–tg7)

**The cleanest large chapter in the app.** The engine (`trigGraph`/
`ampRangeGraph`/`periodGraph`/`twoTrigGraph` in `_tgraph.js`) already renders
honestly from arbitrary a/b/p/q, and a shared generic helper, `pick3()`
(`_tgraph.js`), already handles decoy-collision-safe option building across
most of the chapter — it's used repeatedly and is the one piece of shared
machinery worth calling out once here rather than per-row. Combined with
being Megan's #2 pilot chapter (after Statistics) and the other half of the
error-checking mechanic pilot, this chapter is about as close to
"copy-paste the generators into a dice pool" as it gets.

### tg1 · The three parent graphs (`questtg1-parents.js`)
All 6 skills (`whichShape`, `parentPeriod`, `parentRange`, `parentAmplitude`,
`tanAsymptotes`, `tapPeak`) are **CLEAN**.

### tg2 · What a, b and q do (`questtg2-params.js`)
All 6 skills (`signOfA`, `sizeOfA`, `effectOfB`, `effectOfQ`, `findMidline`,
`reflectYesNo`) are **CLEAN**.

### tg3 · Period, amplitude & range (`questtg3-period-amp-range.js`)
All 9 skills (`periodCalc`, `amplitudeMC`, `rangeMC`, `rangeShift`,
`cyclesCalc`, `readPeriod`, `readAmplitude`, `readRange`, `tanNoAmp`) are
**CLEAN**.

### tg4 · Horizontal & vertical shifts (`questtg4-shifts.js`)
All 7 skills (`hShiftDir`, `whichShiftsLeft`, `sinCosTwin`, `factorB`,
`vShiftDir`, `shiftRange`, `shiftPeriodYesNo`) are **CLEAN**.

### tg5 · The tangent graph (`questtg5-tan.js`)
All 6 skills (`tanPeriodCalc`, `tanAsymWhere`, `tanXintercept`, `tanRange`,
`tanAValue`, `tanSteeperYesNo`) are **CLEAN**.

### tg6 · Find the equation (`questtg6-find-equation.js`)
All 6 skills (`whichBase`, `findA`, `findQ`, `findB`, `findEquationFull`,
`findTanB`) are **CLEAN**.

### tg7 · Putting it together (`questtg7-mixed.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| largerAmplitude | mc + graph(trigg) | CARE | `while` loop avoids `af === ag` (tied amplitudes) |
| whichGreaterAt | mc + graph(trigg) | CLEAN | fresh x from a 7-value pick |
| fPositiveInterval | mc + graph(trigg) | CLEAN | fixed interval fact |
| pointOnGraph | yesno + graph(trigg) | CLEAN | engineered true/false candidate construction |
| tapIntersection | tap + graph(trigg) | CLEAN | fixed 45° intersection, sketch-click |
| transformDescribe | mc + graph(trigg) | CLEAN | branches on transformation kind |

5 CLEAN, 1 CARE.

**Trig Graphs totals: 46 skills — 45 CLEAN, 1 CARE, 0 STATIC.**

---

## 9. Analytical Geometry (ag1–ag7)

Fully generative, but relies more than most chapters on curated "nice
number" helpers (`cleanGrad()` in ag3 restricts gradients to a bank of 10
tidy rise/run pairs so fractions stay legible) and on `while`/`do…while`
loops to keep four multiple-choice options genuinely distinct — most of
ag3, ag5 and ag6/ag7's diagram-backed skills carry one of these. Also a
**pen-and-paper** chapter needing a METHODS digest before recipes are
written. Worth noting for the recipe author: **AG uses zero `calc` and zero
`tap`** across all 49 skills — every answer (even a coordinate or a
gradient) is multiple-choice, and none of the diagrams are currently
sketch-click targets despite the input law allowing it. Introducing tap
here (e.g. "tap the altitude") would be new mechanic work, not reuse.

### ag1 · Which formula, and what it tells you (`questag1-formulas.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| whichFormula | mc + graph(analytic) | CLEAN | fresh segment |
| answerLooks | mc | CLEAN | fixed pick of 3 |
| mVsM | mc | CLEAN | fixed pick of 2 |
| forTheJob | mc | CLEAN | fixed pick of 4 |
| orderRule | mc | CLEAN | fixed recall |
| readPoint | mc + graph(analytic) | CARE | `while` loop places 3 points ≥3 units apart and away from the origin — explicit spacing guard |

5 CLEAN, 1 CARE.

### ag2 · Gradient: sign, steepness & special lines (`questag2-gradient.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| signFromGraph | mc + graph(analytic) | CLEAN | kind-branched point construction |
| whichBySign | mc + graph(analytic) | CLEAN | same |
| horizontal | mc + graph(analytic) | CLEAN | fixed |
| vertical | mc + graph(analytic) | CLEAN | fixed |
| zeroVsUndef | mc | CLEAN | fixed |
| incDec | yesno | CLEAN | fixed-ish boolean logic |
| fromPoints | mc + graph(analytic) | CARE | `do…while` excludes m=0 and \|m\|=1 to avoid decoy collision |
| steeper | mc | CLEAN | `while` loop just for m1≠m2, trivial |

7 CLEAN, 1 CARE.

### ag3 · Parallel & perpendicular (`questag3-parallel-perp.js`)

Every gradient-based skill here routes through `cleanGrad()`, a curated
10-pair bank of tidy rise/run fractions (not arbitrary integers) — needed to
keep fraction labels legible. This is real, chapter-wide care.

| Skill | Kind | Class | Reason |
|---|---|---|---|
| parallelTest | yesno | CARE | `cleanGrad()` curated fraction bank |
| perpTest | yesno | CARE | same |
| perpGradient | mc | CARE | `cleanGrad({noOne:true})` — explicitly excludes \|m\|=1 to avoid decoy collapse |
| classify | mc | CARE | `cleanGrad()` |
| fromGraph | yesno + graph(analytic) | CARE | `cleanGrad()` + to-scale `twoLines()` |
| fromStandard | mc | CARE | `while` loop excludes \|a\|=b (avoids m=±1 decoy collision) |
| perpRule | mc | CLEAN | fixed recall |

1 CLEAN, 6 CARE.

### ag4 · Angle of inclination (`questag4-inclination.js`)

All 7 skills (`acuteObtuse`, `addRule`, `value`, `dontTypeNeg`, `tanTheta`,
`cleanValue`, `whichObtuse`) are **CLEAN** — all route through
`inclinationCase()` (helper lives in `_analytical.js`, no visible loop at
the quest-file layer) and render honest to-scale angle diagrams.

### ag5 · Perpendicular bisector (`questag5-perp-bisector.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| definition | mc | CLEAN | fixed recall |
| isIt | yesno + graph(analytic) | CLEAN | random true/false flags via `bisectorCandidate()` |
| gradientOf | mc + graph(analytic) | CARE | `do…while` excludes horizontal/vertical/\|m\|=1 |
| findMidpoint | mc + graph(analytic) | CARE | `do…while` with an explicit `Set` check that all 4 decoy strings are distinct |
| passesThrough | mc + graph(analytic) | CARE | `do…while` excludes the edge case where the origin happens to be equidistant too |
| whichBisector | mc + graph(analytic) | CLEAN | constructed geometrically, no loop |
| equidistant | mc | CLEAN | fixed recall |

4 CLEAN, 3 CARE.

### ag6 · Area of a triangle (`questag6-triangle-area.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| formula | mc | CLEAN | fixed recall |
| whichBase | mc + graph(analytic) | CARE | `niceTriangle()` — up to 300-iteration retry with area, altitude-foot-inside, and non-parallel-side constraints |
| whichHeight | mc + graph(analytic) | CARE | same `niceTriangle()` |
| heightMustBe | mc | CLEAN | fixed recall |
| medianVsAltitude | mc | CLEAN | fixed recall |
| whichVertex | mc + graph(analytic) | CARE | same `niceTriangle()` |
| notASide | yesno | CLEAN | fixed recall |

4 CLEAN, 3 CARE.

### ag7 · Putting it together + proof words (`questag7-mixed.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| lineNames | mc | CLEAN | fixed pick of 3 |
| identifyLine | mc + graph(analytic) | CARE | `niceTri()` — up to 400-iteration retry, even heavier than ag6's version (also checks the median stays well off-perpendicular) |
| proveParallel | mc | CLEAN | fixed recall |
| provePerp | mc | CLEAN | fixed recall |
| proveCollinear | mc | CLEAN | fixed recall |
| proveParallelogram | mc | CLEAN | fixed recall |
| circleFormulas | mc | CLEAN | fixed pick of 2 |

6 CLEAN, 1 CARE.

**Analytical Geometry totals: 49 skills — 34 CLEAN, 15 CARE, 0 STATIC.**

---

## 10. Number Patterns (np1–np7)

Fully generative via `patternlib.js` + the pyramid diagram engine
(`_patterns.js`). CARE here is mostly about keeping ratios/turning-points
"nice" (integer or a controlled non-integer) rather than avoiding degenerate
diagrams.

### np1 · Spot the pattern (`questnp1-spot.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| classifyArith | mc + graph(pyramid) | CLEAN | fresh arithmetic sequence |
| classifyQuad | mc + graph(pyramid) | CLEAN | fresh quadratic sequence |
| classifyGeo | mc | CARE | `integerR: true` constraint forces a whole-number ratio |
| whichConstant | mc + graph(pyramid) | CLEAN | fresh quadratic |
| commonDiff | calc + graph(pyramid) | CLEAN | fresh arithmetic |
| tapFirstDiff | tap + graph(pyramid) | CLEAN | sketch-click on a pyramid cell |
| ratioOf | calc | CARE | same `integerR: true` constraint |

5 CLEAN, 2 CARE.

### np2 · Arithmetic (linear) patterns (`questnp2-arithmetic.js`)

All 7 skills (`commonDiff`, `nextTerm`, `generalTerm`, `nthTerm`,
`fromFormula`, `whichTerm`, `meaningOfC`) are **CLEAN**.

### np3 · Quadratic patterns (`questnp3-quadratic.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| secondDiff | calc + graph(pyramid) | CLEAN | fresh quadratic |
| findA | calc + graph(pyramid) | CLEAN | fresh quadratic |
| findB | calc + graph(pyramid) | CLEAN | fresh quadratic |
| findC | calc + graph(pyramid) | CLEAN | fresh quadratic |
| generalTerm | mc + graph(pyramid) | CARE | documented in-code: "when b = 0 the sign-of-b decoy collapses" — explicit multi-filter decoy dedup |
| fromFormula | calc | CLEAN | fresh a/b/c/n |

5 CLEAN, 1 CARE.

### np4 · Find a missing term (`questnp4-missing.js`)

All 5 skills (`missing4`, `missing5`, `forwardFromSecond`, `methodMC`,
`constYesno`) are **CLEAN** — `withHidden()` computes the hidden term by
solving the equal-second-differences equation live, so the worked solution
is always honest.

### np5 · Minimum & maximum (`questnp5-minmax.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| minOrMax | mc | CLEAN | fresh a/b/c via `randQuadExtreme` |
| whichTerm | calc | CLEAN | fresh extreme |
| nearestTerm | calc | CARE | engineered so the true turning point is deliberately non-integer (n* = k ± 0,25 exactly) — sophisticated deliberate-non-integer construction, copy exactly |
| extremeValue | calc | CLEAN | fresh extreme |
| readWhichTerm | calc + graph(pattern) | CARE | `readableExtreme()` constrains \|a\|=1 and small values so the read-off is countable on the grid |
| readValue | calc + graph(pattern) | CARE | same `readableExtreme()` |
| signMC | mc | CLEAN | fixed recall |

4 CLEAN, 3 CARE.

### np6 · Gaps between consecutive terms (`questnp6-gaps.js`)

All 5 skills (`gapAtK`, `whichGap`, `gapsAreLinear`, `gapCommonDiff`,
`indexRule`) are **CLEAN**.

### np7 · Geometric patterns + mixed check (`questnp7-geometric.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| ratio | calc | CARE | `integerR: true` constraint |
| nextTerm | calc | CARE | same `integerR: true` |
| generalTerm | mc | CARE | documented in-code: with a1=1 the "merged a·r" decoy would equal the correct answer — `a1 ≥ 2` forced |
| nthTerm | calc | CARE | `k` bounded per `r` to keep the exponent's result reasonable |
| ratioAsFraction | mc | CLEAN | `integerR: false` + rounding, self-contained |
| dontMerge | yesno | CLEAN | fixed recall |
| mixedClassify | mc | CLEAN | routes through `randArith`/`randQuad`/`randGeo` + `classify()` |

3 CLEAN, 4 CARE.

**Number Patterns totals: 44 skills — 34 CLEAN, 10 CARE, 0 STATIC.**

---

## 11. Exponents & Surds (es1–es8) — theory-only, no engine

The file headers say it themselves: *"THEORY chapter... mc + yesno curated
pools, no problem-crunching"* and *"This chapter is THEORY only — no graph
engine."* This is the chapter where STATIC first shows up, and it shows up
for a specific reason: many skills `pick()` between 2-14 **hand-authored
prose items** — a specific worked example tied to specific numbers and a
specific multi-line explanation (e.g. the k-method's 5²⁰⁰⁷/5²⁰¹⁰ walkthrough,
or the 12-item factorising-type bank). Re-rolling those isn't "pick new
numbers" — it's "write a new worked example," which is real authoring
effort, not a mechanical extraction. Skills classified CARE below are ones
with a *simple, clearly parametrisable* pattern (e.g. "conjugate of √a + b")
that's currently fixed to 2-3 concrete instances but would take modest,
templatable work to roll. A chapter-wide risk worth flagging once: **es2's
four "trap" skills all sample the same 10-item yes/no pool**, and its two
"fixIt" skills share one 4-item pool — a dice deal that treats these as
different "kinds" could show a learner near-duplicate content back to back
within one round; the dealing algorithm (or the pool itself) needs to guard
against that specifically for banks this small.

### es1 · The exponent laws (`queses1-laws.js`)
All 7 skills (`whatToDo`, `nameLaw`, `zero`, `negative`, `fractional`,
`flip`, `sameBase`) are **CLEAN** — small (2-4 item) fixed banks of pure
symbolic law-recall, no numbers to roll, trivially safe and correct every
time.

### es2 · Spot the trap (`queses2-traps.js`)
All 6 skills (`trap1`, `trap2`, `trap3`, `trap4`, `fixIt1`, `fixIt2`) are
**CARE** — every one draws from one of two small shared pools (10-item YN
bank, 4-item "fix it" bank); the pools themselves are fine, but the
cross-skill sharing is the thing to guard against (see chapter note above).

### es3 · First step & which method (`queses3-method.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| firstStep | mc | CLEAN | 4-item bank, only the base-string varies |
| oneTerm | mc | CLEAN | single fixed item |
| plusMinus | mc | CLEAN | single fixed item |
| likeTerms | mc | CLEAN | 2-item bank of distinct short examples |
| cancel | yesno | CLEAN | single fixed item |
| kMethod | mc | STATIC | 2-item bank, each a full worked example with huge exponents (5²⁰⁰⁷…) and a multi-line explanation — a genuine worked walkthrough, not a numeric template |
| order | mc | CLEAN | single fixed item |

6 CLEAN, 1 STATIC.

### es4 · Which "divorce" (factorising type)? (`queses4-divorce.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| classify1 | mc | STATIC | samples the shared 12-item factorising-type pool — each item is a distinct hand-authored expression |
| classify2 | mc | STATIC | same shared pool |
| classify3 | mc | STATIC | same shared pool |
| substitution | mc | STATIC | 5-item pool, each a specific expression+k pairing |
| restriction | yesno | CLEAN | single fixed item, generic |
| byShape | mc | CLEAN | 3-item pool of generic shape-description prose (no specific expression) |

2 CLEAN, 4 STATIC.

### es5 · Surd laws & traps (`queses5-surds.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| multiplyDivide | mc | CLEAN | 2-item bank, fully symbolic (√a·√b), no concrete numbers |
| bigNoNo | yesno | CLEAN | single fixed item |
| likeSurds | mc | CARE | 3 fixed concrete examples (5√x−2√x etc.) — coefficients trivially parametrisable |
| insideOutside | mc | CARE | 3-item bank, mixes generic + 2 concrete (√(x⁴), ³√(y⁶)) — partially parametrisable |
| signRules | mc | CLEAN | 4-item bank, fully generic/symbolic (even/odd power of a negative) |
| twoAnswers | mc | CARE | 2 fixed concrete examples (x²=9, x²=25) — trivially parametrisable |

3 CLEAN, 3 CARE.

### es6 · Conjugates & rationalising (`queses6-conjugates.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| findConjugate | mc | CARE | 3 concrete surds — pattern is clearly parametrisable |
| whyConjugate | mc | CLEAN | single fixed item, generic |
| conjugateProduct | mc | CARE | 3 concrete examples — parametrisable |
| rationaliseSingle | mc | CARE | 2 concrete examples — parametrisable |
| rationaliseTwo | mc | CARE | 2 concrete examples — parametrisable |
| equalsOne | yesno | CLEAN | single fixed item, generic |
| abForm | mc | CARE | 2 concrete examples — parametrisable |

2 CLEAN, 5 CARE.

### es7 · Rational-exponent equations (`queses7-ratexp.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| classify1 | mc | STATIC | samples the shared 11-item pool, each tied to its own classification+explanation |
| classify2 | mc | STATIC | same shared pool |
| classify3 | mc | STATIC | same shared pool |
| reciprocalStep | mc | CARE | 3-item bank, simple parametrisable pattern (x^(p/q)=k → reciprocal) |
| whyReciprocal | mc | CLEAN | single fixed item, generic |
| noSolutionRule | yesno | CLEAN | single fixed item, generic |

2 CLEAN, 1 CARE, 3 STATIC.

### es8 · No-solution & equation strategy (`queses8-nosolution.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| sameBase | mc | CARE | one fixed example (5ˣ=25) — trivially parametrisable |
| positiveBase | mc | CARE | 2 concrete examples — parametrisable |
| whichMethod | mc | STATIC | 3-item bank, each a distinct worked expression requiring its own method-identification explanation |
| rejectK | yesno | CARE | one fixed example, simple pattern |
| surdIsolate | mc | CARE | one fixed worked example — parametrisable (vary the constant) |
| alwaysTest | mc | CLEAN | single fixed item, pure recall |
| surdDomain | mc | CLEAN | single fixed item, pure recall |

2 CLEAN, 4 CARE, 1 STATIC.

**Exponents & Surds totals: 52 skills — 24 CLEAN, 19 CARE, 9 STATIC.**

---

## 12. Equations & Inequalities (eq1–eq8) — theory-only, no engine (except small bowl/Δ sketches)

Same shape as Exponents & Surds — commented in its own source as *"THEORY
chapter like Exponents & Surds — mc + yesno curated pools."* A meaningfully
larger share of this chapter already rolls fresh `randInt`-driven numbers
than ES does (68 skills, 48 CLEAN vs ES's 52/24), because many EQ skills
build their own fresh coefficients (`bracketsZero`, `threeFactors`,
`findRestrictions`, `completeC`, `readTP`, `signsIn`, `flipApply`,
`readInside`/`readOutside`, `hiddenNeg`, `whereUndefined`, …) rather than
picking from a fixed prose bank. STATIC is reserved for skills where **every
item in the pool is a full worked-method walkthrough tied to one specific
equation** (`eq5.solveSteps`, `eq7.compound`, `eq7.expandFirst`,
`eq8.threeTypes`, `eq8.proveTrick`) — these teach the *shape* of a method on
one canonical example, and a fresh roll would mean re-deriving and
re-authoring the whole walkthrough, not swapping a number.

### eq1 · Standard form & brackets = 0 (`queseq1-zeroproduct.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| firstStep | mc | STATIC | 3-item bank, each a distinct worded scenario with its own reasoning |
| eqnMode | mc | CLEAN | 3-item bank, generic calculator-UI procedural recall |
| rootsToFactors | mc | CARE | 4 concrete root→factor examples — clearly parametrisable (roll the root) |
| whyRule | mc | CLEAN | 2-item bank, generic conceptual |
| bracketsZero | mc | CLEAN | fresh p/q via `randInt` |
| threeFactors | mc | CLEAN | fresh a/b/c via `randInt` |
| onlyAgainstZero | yesno | CLEAN | fresh k, 2-item pool (1 numeric + 1 generic) |

5 CLEAN, 1 CARE, 1 STATIC.

### eq2 · Special cases & exponent brackets (`queseq2-special.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| noRealSol | mc | CLEAN | fresh k via `randInt` |
| noB | mc | CLEAN | fresh k |
| plusMinus | yesno | CLEAN | fresh k |
| noC | mc | CLEAN | fresh k |
| dontDivideByX | yesno/mc | CLEAN | fresh k |
| expSameBase | mc | CARE | 3 concrete examples (√27, =1, =16) — simple parametrisable pattern |
| expNoSol | mc/yesno | CLEAN | fresh base/k from pick lists |
| ratExpPM | mc/yesno | CARE | core explanation tied to one fixed worked example (x^(2/3)=16=±64) — parametrisable with real effort |
| countSolutions | mc | STATIC | 3-item bank of full multi-bracket worked examples |

6 CLEAN, 2 CARE, 1 STATIC.

### eq3 · The k-method (`queseq3-kmethod.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| whenK | mc | CLEAN | conceptual identification, works with any bracket |
| whatIsK | mc | CLEAN | `repBracket()` fresh inner expression + fresh A/B |
| afterSub | mc | CLEAN | same `repBracket()` + fresh A/B |
| notDone | yesno/mc | CLEAN | fresh k1/k2 |
| howMany | mc | CLEAN | 4-item bank, mostly generic rule-of-thumb |
| hiddenRepeat | mc | STATIC | 2-item bank, worked "factor hides the repeat" trick, context-tied |
| carryK | yesno/mc | CLEAN | fresh r |

6 CLEAN, 1 STATIC.

### eq4 · Fractions & restrictions (`queseq4-fractions.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| firstMove | mc | CLEAN | 2-item bank, generic procedural |
| negTwin | mc | CLEAN | fresh m |
| whichLCD | mc | CLEAN | fresh m, 3-item template |
| clearFractions | mc/yesno | CARE | one fixed worked example (10/x + 3x/(x−2) = 7) — trivially parametrisable |
| stateWhen | mc/yesno | CLEAN | generic procedural |
| findRestrictions | mc | CLEAN | fresh m |
| whyRestrict | mc | CLEAN | generic conceptual |
| rejectNA | mc | CLEAN | fresh m/other |

7 CLEAN, 1 CARE.

### eq5 · Perfect squares & the turning point (`queseq5-square.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| completeC | mc | CLEAN | fresh half/sign |
| whenRule | yesno/mc | CARE | one fixed concrete example ("2x²−7x+16") — parametrisable |
| signInside | mc | CLEAN | fresh half/sign |
| findK | mc | CLEAN | fresh odd b from a pick list |
| readTP | mc | CLEAN | fresh a/p/q |
| pqRule | mc/yesno | CARE | one fixed concrete example ("y=2(x+4)²−1") — parametrisable |
| happySad | mc | CLEAN | fresh a |
| solveSteps | mc | STATIC | 4-item bank, each ONE STEP of a single worked example (−x²+10x−22=0) walked through in stages — can't be rolled without re-deriving the whole chain |

5 CLEAN, 2 CARE, 1 STATIC.

### eq6 · Quadratic formula & simultaneous (`queseq6-formula.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| whenFormula | mc | CLEAN | 2-item bank, generic |
| theFormula | mc | CLEAN | single fixed formula-recall item |
| showSteps | mc/yesno | CLEAN | generic procedural |
| signsIn | mc | CLEAN | fresh bb/cc |
| rounding | mc/yesno | CARE | one fixed concrete example ("x=1±√2") — parametrisable |
| sumProduct | mc | CLEAN | fresh m/n |
| simulSubject | mc | CARE | one fixed concrete example ("2x−y=9") — parametrisable |
| simulFinish | mc/yesno | CARE | one fixed concrete example ("x=3→y") mixed with generic items — parametrisable |

5 CLEAN, 3 CARE.

### eq7 · Inequalities: flip & the bowl (`queseq7-inequalities.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| flipWhen | mc/yesno | CLEAN | mostly generic, one trivial concrete example |
| flipApply | mc | CARE | `randInt` + explicit `gcd` guard so the fraction −b/a arrives already simplified |
| compound | mc/yesno | STATIC | 3-item bank, all three explain ONE specific compound inequality from different angles |
| circles | mc | CLEAN | mostly generic, one trivial concrete example |
| setup | mc/yesno | CLEAN | generic procedural |
| readInside | mc + graph(function) | CLEAN | fresh roots via `randRoots()`, honest shaded-bowl diagram |
| readOutside | mc + graph(function) | CLEAN | same `randRoots()` |
| orNotAnd | yesno/mc | CLEAN | generic conceptual |
| hiddenNeg | mc/yesno | CLEAN | fresh r/s |
| expandFirst | mc/yesno | STATIC | 3-item bank, all three explain ONE specific example, `(x+1)(x+2)≤20` |
| fracIneq | mc/yesno | CLEAN | fresh m, mixed generic+concrete built from it |
| perfectSquareIneq | mc | CLEAN | fresh r |

9 CLEAN, 1 CARE, 2 STATIC.

### eq8 · Nature of roots & KNOW THE DIFFERENCE (`queseq8-nature.js`)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| whatDelta | mc | CLEAN | 3-item bank, generic conceptual |
| matchGraph | mc + graph(function) | CLEAN | `deltaGraph()` computed to-scale from fresh roots/TP |
| classify | mc | CARE | 5 concrete Δ values — clearly parametrisable (roll a Δ, derive category) |
| conditions | mc | CLEAN | 5-item bank, fully generic (no numbers) |
| threeTypes | mc | STATIC | 3-item bank, each a full distinct exam-question stem used to teach question-type recognition |
| proveTrick | mc | STATIC | 3-item bank, each a distinct worked proof example |
| rejectParam | mc/yesno | CARE | one fixed worked example (k(k+8)=0) — parametrisable with real effort |
| knowDiff | mc | CLEAN | 5-item bank, generic vocabulary matching (no real numbers) |
| whereUndefined | mc | CLEAN | fresh m/n |

5 CLEAN, 2 CARE, 2 STATIC.

**Equations & Inequalities totals: 68 skills — 48 CLEAN, 12 CARE, 8 STATIC.**

---

## 13. Summary

### Counts per chapter

| Chapter | Skills | CLEAN | CARE | STATIC |
|---|---:|---:|---:|---:|
| Statistics (q1-q8) | 58 | 49 | 9 | 0 |
| Finance (f1-f7) | 51 | 50 | 1 | 0 |
| Probability (p1-p7) | 55 | 30 | 25 | 0 |
| 2D Trigonometry (t1-t7) | 36 | 30 | 6 | 0 |
| Measurement (m1-m6) | 33 | 4 | 29 | 0 |
| Functions (fn1-fn7) | 38 | 22 | 16 | 0 |
| Trig Graphs (tg1-tg7) | 46 | 45 | 1 | 0 |
| Analytical Geometry (ag1-ag7) | 49 | 34 | 15 | 0 |
| Number Patterns (np1-np7) | 44 | 34 | 10 | 0 |
| Exponents & Surds (es1-es8) | 52 | 24 | 19 | 9 |
| Equations & Inequalities (eq1-eq8) | 68 | 48 | 12 | 8 |
| **Total** | **530** | **370** | **143** | **17** |

### What this says about the build order

- **Statistics (the pilot) is the best possible first chapter**, exactly as
  Megan ruled: 49/58 CLEAN outright, and every one of the other 9 already
  carries its own working guard in the live code. There is no chapter-level
  blocker — no missing engine feature, no fragile retry loop that doesn't
  already exist, no fixed-prose problem. The dealing algorithm and harness
  are the real work; the maths generation basically already exists.
- **Trig Graphs (the #2 pilot) is even cleaner in percentage terms** — 45/46
  — and shares the reusable `pick3()` decoy-dedup helper across most of its
  skills. It's arguably readier than Statistics on a pure "how much of this
  already rolls" basis; the extra build cost there is the shared
  error-checking ("Soek die fout") mechanic, which is new work regardless of
  chapter.
- **Measurement is the one chapter with a real engine-level blocker**, not
  just per-skill care: the solid-figure engine's fixed label offsets force
  every figure-drawing skill through a hand-curated "safe proportions" list.
  This should be raised with Megan explicitly before Measurement's turn —
  either accept bounded variety from the curated lists, or budget engine
  work to fix label placement generally.
- **Probability and Analytical Geometry are both pen-and-paper chapters
  that are numerically ready but procedurally heavy** — roughly half of
  each chapter's skills carry an explicit retry loop or curated "nice
  number" bank that a recipe must copy exactly. Neither has a missing
  generator; the risk is a recipe author skipping a guard they didn't know
  was load-bearing. Both also need their METHODS digest before recipes are
  written (Probability has none yet; Finance's already exists per the
  brief; Analytical Geometry has none yet either).
- **Exponents & Surds and Equations & Inequalities are the only chapters
  with genuine STATIC content** (9 and 8 skills respectively) — both are
  explicitly commented as theory-only in their own source. The STATIC
  items are specifically the ones built from a hand-authored worked-example
  bank (the k-method, the factorising-type gallery, "KNOW THE DIFFERENCE"
  proof walkthroughs) where a fresh roll would mean writing new maths
  content, not substituting new numbers. Both chapters still have a
  healthy CLEAN majority (24/52 and 48/68) from skills that already build
  fresh coefficients — those are dice-ready today. The CARE items in both
  chapters are the interesting middle ground: currently one fixed
  worked-number example, but following a simple enough pattern that
  parametrising them is real but modest effort (worth doing before writing
  these two chapters' recipes, since it roughly doubles their usable pool).
- **No input-law violations were found anywhere.** No free-text entry
  exists in any chapter. The two structural oddities worth remembering are
  chapter-specific, not bugs: Analytical Geometry never uses `calc` or
  `tap`; `calcdo` (the embedded calculator) exists only in Statistics
  quest 1.
- **Finance has no verification harness at all today** (`verify-finance.html`
  doesn't exist) — worth building even before dice work starts there, since
  the chapter currently ships with zero automated proof that its existing
  static content behaves.
