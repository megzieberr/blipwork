# DICE-AUDIT — General Trig (gtrig, gt1–gt13)

Written 2026-08-23/24, wave-2 session GT (audit-only, no app code touched).
Companion to `DICE-AUDIT.md` — that file classified the eleven chapters that
existed on 2026-08-21. General Trig was built on 2026-08-22, **after** it was
written, so it had no classification. This file is that chapter's section, in
the same format, so a future session can build `js/quests/dice-gtrig.js` the
way every other pool was built.

Read `DICE-AUDIT.md` §1 first — everything it says about how generation works
(gen() is called fresh every play, the numbers are already random, the recipe
job is extraction plus guard-copying) is true of gtrig too, and is not
repeated here.

**Legend:** CLEAN = ROLLS CLEANLY · CARE = ROLLS WITH CARE (the specific care
is named in the reason column) · STATIC = STAYS STATIC (not in the dice pool)
· BLOCKED = rolls fine but the dice player cannot render its question type.

---

## 1. What is different about General Trig

### 1.1 It is a `steps` chapter, not an `mc` chapter

Every wave-1 chapter emitted flat questions — one prompt, one input, one
answer. gtrig does not. Measured by generating every skill 160 times
(14 880 rolls, zero throws):

| Question type gtrig emits | Skills |
|---|---:|
| `steps` (an ordered chain of sub-inputs) | 48 |
| `mc` | 38 |
| `mc` **or** `yesno`, decided by the roll | 2 |
| `tapcross` (her quadrant cross, question-level) | 2 |
| `yesno` | 2 |
| `tap` on a `triangle` graph | 1 |
| **Total skills** | **93** |

Inside those 48 chains, eight different sub-inputs appear:

| `step.kind` | Steps | Where |
|---|---:|---|
| `mc` | 39 | everywhere |
| `calc` (number pad) | 16 | gt4, gt5, gt9, gt12, gt13 |
| `tapcross` | 16 | gt5, gt8, gt12 |
| `tokenpad` | 7 | gt5 |
| `mcmulti` | 6 | gt13 |
| `doubletick` | 5 | gt8 |
| `sketchfill` | 5 | gt8 |
| `tapside` | 4 | gt8, gt10 |

Ten skills also carry `q.reveal` teaching frames (gt1 ×3, gt2 ×1, gt3 ×2,
gt6 ×2, gt8 ×1, gt10 ×1).

### 1.2 Mechanic support — what the dice player can render

**The dice player has no question-type set of its own.** `js/dice-play.js`
deals a round and calls `app.go("play", …)`; `js/play.js`'s `renderPlay` then
calls `mountQuestion()` from `js/questions.js` — the same function, on the same
code path, that static rounds use. Checked: `grep q.type` finds **zero** hits in
`js/dice.js`, `js/dice-play.js` and `js/play.js`. The only type-aware code in
the whole play stack is `js/questions.js`, and it is shared byte-for-byte.

So the support table is short:

| Type / mechanic gtrig emits | Rendered by | Verdict |
|---|---|---|
| `mc` | `questions.js` mc branch | **supported**, no work |
| `yesno` | yesno branch | **supported** |
| `tap` + `graph:{type:"triangle"}` | tap/triangle branch → `addTriangleHits` | **supported** |
| `tapcross` (single and multi, `noRef`) | tapcross branch → `mountTapcross` | **supported** |
| `steps` | `mountSteps` | **supported** |
| ↳ `step.kind: mc` | `mountSteps` → checkStep | **supported** |
| ↳ `step.kind: calc` | `mountKeypad` | **supported** |
| ↳ `step.kind: tokenpad` | `mountTokenpad` | **supported**; INPUT-LAW clean — it is the keypad with whole tokens (`90°`, `180°`, `−`, `θ`) on the keys, never free text |
| ↳ `step.kind: tapcross` | `mountTapcross` | **supported**; note `step.correct` may be the *string* `"noref"` rather than an array (gt12) |
| ↳ `step.kind: doubletick` | `mountDoubleTick` | **supported** |
| ↳ `step.kind: sketchfill` | keypad + live redraw | **supported** |
| ↳ `step.kind: tapside` | `addQuadTriHits` | **supported**; needs a preceding `quadtri` graph in the chain — every gtrig use has one |
| ↳ `step.kind: mcmulti` | toggle + Submit | **supported** |
| `q.reveal` frames (+ `revealMode:"replace"`) | `mountReveal` | **supported** — see the wart in §1.4 |
| `quadtri` engine (gt8, gt10) | `renderQuadTri` | **supported** |
| `trigg` engine + quadrant `bands` (gt2, gt3) | `renderTrig` | **supported** |
| `triangle` engine (gt1, gt3, gt4) | `renderTriangle` | **supported** |
| **`q.method` on a `steps` chain** | `js/play.js` renders the link unconditionally at mount | **NEEDS PLAYER WORK** — §1.3 |

**BLOCKED-by-player skills: 0.** Nothing gtrig emits is unrenderable in a dice
round. That is a structural fact, not a lucky one — gtrig's whole type set was
added to the shared `questions.js` when the chapter was built, so dice
inherited it the moment it was written.

### 1.3 The one real player gap: `q.method` on a chain

DICE-COMMON's method rule says attach `q.method` when the solution contains
real working (`solution.length >= 2`, or any step has a reason `r`). By that
rule **65 of the 93 gtrig skills qualify** — and 48 of those are `steps`
chains whose `solution` array *is* the chain, answer by answer:

```
{ s: "Sign: −",            r: "90° + θ is quadrant S…" }
{ s: "Ratio: cos → sin",   r: "co-functions convert sin ↔ cos." }
{ s: "Value: 40°",         r: "160° − 90° = 40°." }
```

`js/play.js` appends the "📖 Show me the method" button the moment the question
mounts — before step 1 is answered. On a chain that hands the learner every
remaining answer. It is a spoiler button, exactly the thing the method rule was
written to prevent, just one level deeper.

Two ways out, both the foreman's call, neither of them this session's work:
- **Pool-side (no player change):** the gtrig pool simply does not set
  `q.method` on `steps` skills. The wrong-answer panel still shows the full
  solution at the end, unchanged. Cost: 48 of 65 eligible skills lose the
  always-available link.
- **Player-side:** gate the method link in `js/play.js` until
  `root.dataset.step === String(q.steps.length)` (the DOM already carries that
  state for the harness), or let a step carry its own `step.method`.

Recommendation for the first pool: **pool-side**, so no shared file is touched.

### 1.4 Two smaller warts, both report-only

- **Reveal frames replay on every retry.** A wrong answer calls `present()`
  again with a fresh salt (`js/play.js`), which re-mounts the question — and
  `mountReveal` restarts at frame 0 with the input hidden. `gt1.whereFrom`
  (4 frames) and `gt3.oahRead` (6 frames) mean 4–6 extra "Next ▸" taps before
  the learner can answer the similar one. Static play has the same behaviour,
  so this is not new; it just gets hit more often in a dice round.
- **`dice-play.js` builds a synthetic `def: { skills }`** with no
  `stackFractions` and no `xpOnce`. `stackFractions` is a documented no-op
  since the 2026-08-23 whole-app fraction sweep, and `xpOnce` never reaches the
  dice path at all (see §7), so neither costs anything today. Worth knowing
  before anyone re-activates either flag.

### 1.5 Determinism and salt variance — measured, not assumed

93 skills × 200 seeded rolls through `genAt(seed, i, skill, salt)`:

- **Determinism: 93/93.** Same `(roundSeed, index, skillId, salt)` reproduces a
  deep-equal question every time. Resume is safe. No gtrig file calls
  `Math.random()` directly — every roll goes through `pick`/`randInt`/
  `shuffled` in `js/ui.js`, which route through `rng()`.
- **Throws: 0** across 55 800 seeded generations, and 0 across the 14 880
  unseeded ones. Every guard that *can* throw (gt9's `checked()`,
  gt11's F11 and type-⑥ assertions, gt12's co-function angle check,
  `symbolicReduce`'s "exactly one match") is a tripwire for a code typo, not a
  live failure mode.
- **Salt variance:** salt 1 differs from salt 0 on 200/200 rolls for most
  skills. The exceptions are the small-variety-space skills, and they are
  exactly what you would predict:

| Skill | Differs | Why |
|---|---:|---|
| `gt1.rightTriangleOnly` | 0/200 | pure recall — one fixed true/false, no roll at all |
| `gt6.butWhy` | 0/200 | pure recall — one fixed true/false |
| `gt6.threeBoxes` | 84/200 | only the two option labels shuffle |
| `gt4.twoLabelTriangle` | 104/200 | exactly **2** hand-written states |
| `gt2.onlyOne` | 139/200 | a fixed 4-item bank |
| `gt2.tapSign` | 167/200 | 3 ratios × 2 signs = 6 states |
| `gt1.whatItMeans` | 179/200 | a 4-item bank |

Those first two are the "pure-recall skills exempt" list DICE-COMMON's harness
spec asks for. `gt6.threeBoxes` should be listed with them.

---

## 2. Quest by quest

### gt1 · Introduction (`questgt1-intro.js`) — DISCOVERY — mechanics: list-pick / yes-no / sketch-click

| Skill | Kind | Class | Reason |
|---|---|---|---|
| theWord | mc + reveal(3) | CLEAN | fixed recall; the three word-frames are module-level constants |
| rightTriangleOnly | yesno | CLEAN | pure recall, **zero variance** — list it as harness-exempt |
| tapSide | tap + graph(triangle) | CARE | `rightTriangleThetaSpec()` rolls legs 3–8 **and a random 0–359° rotation**; the three hot-spots are side midpoints, so a near-isosceles roll (a ≈ b) puts the opp and adj targets close together at 375 px. Copy the spec builder verbatim; the harness should assert a minimum separation between the three midpoints |
| sohcahtoa | mc + reveal(3) | CLEAN | pick(sin/cos/tan) against a fixed ratio bank |
| whereFrom | mc + reveal(4, replace) | CLEAN | fixed recall; the four circle frames are computed by `circleFrame()` at module load, so they are to scale by construction |
| whatItMeans | **mc _or_ yesno** | CARE | one skillId that emits **two different question types** depending on the roll (3 mc + 1 yesno in its pool). The player renders both; what breaks is the pool's `kind` contract — a coverage bucket is supposed to be one mechanic. Either split it into two entries or accept a mixed-type kind and say so in the pool comment |
| ratioAlone | mc | CLEAN | fixed recall |

**5 CLEAN, 2 CARE.**

### gt2 · The Cartesian plane (`questgt2-cartesian.js`) — DISCOVERY — mechanics: list-pick / quadrant cross

| Skill | Kind | Class | Reason |
|---|---|---|---|
| wheelWord | mc + reveal(2) | CLEAN | pick quadrant, word looked up |
| bandSign | mc + graph(trigg bands) | CLEAN | `astcSign()` computed, `qbandsSpec()` draws the real curve. Note: 3 options, not 4 — legal, and deliberate (there is no fourth sensible wrong answer) |
| tapSign | tapcross (multi) | CLEAN | `solutionQuadrants()` computed |
| oneSign | mc | CLEAN | computed sign; 3 options |
| whySign | mc | CLEAN | quadrant is picked from **[2,3,4] only** — quadrant ① is deliberately excluded so the "why is it negative" beat has something to explain. Keep the exclusion |
| onlyOne | tapcross (single) | CLEAN | fixed 4-item bank |
| backwards | mc | CLEAN | computed from the (sin, cos) sign pair |

**7 CLEAN, 0 CARE.**

### gt3 · Special angles & identities (`questgt3-special.js`) — DISCOVERY — mechanic: list-pick, some with an embedded **table** or graph

| Skill | Kind | Class | Reason |
|---|---|---|---|
| triangles | mc + reveal(3, incl. two rendered triangles) | CLEAN | fixed 5-item bank; decoys are the other side labels |
| oahRead | mc + reveal(6, replace) | CLEAN | reads `OAH_TABLE`; the six frames build her table stage by stage |
| pickValue1 | mc + embedded O-A-H table | CARE | decoys are drawn from the other eight special values and filtered **by value** at 1e-9 — copy that filter. Because sin45 = cos45 and sin30 = cos60, the pool can collapse and the question can end up with 3 options, not 4 |
| pickValue2 | mc + table | CARE | identical generator to pickValue1 — same care, and a duplicate for pool purposes |
| quadrantal | mc + graph(trigg) | CARE | the values live in {−1, 0, 1} only, so after the by-value filter the question **always** has exactly 3 options. That is a permanent 1-in-3 guess. Correct, but worth her eye before it goes in a pool |
| reciprocals | mc | CLEAN | fixed 4-item bank |
| masked | mc | CLEAN | fixed 4-item bank |

**4 CLEAN, 3 CARE.**

### gt4 · Co-functions (`questgt4-cofunctions.js`) — mechanic: steps chain (sign → ratio → value)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| coNumMinus | steps (mc, mc, calc) | CLEAN | angle = 5·randInt(2,16); sign and ratio from `cofunction()` |
| coNumPlus | steps ×3 | CARE | **`fn` is pinned to `"cos"` on purpose** — the file's header says so: items 2 and 4 both drill the cos(90°+θ) trap so every play meets it twice. A recipe author who "improves" this by randomising fn silently removes the round's whole point |
| coVarMinus | steps ×2 | CLEAN | |
| coVarPlus | steps ×2 | CARE | same deliberate `cos` pin |
| coNeg | steps ×2 | CLEAN | `cofunction(fn, "θ−90")` computes the sign |
| twoLabelTriangle | mc + graph(triangle) | CARE | **two hand-written items**, pinned to the fixed 1/√3/2 triangle `triSpec()` draws. Measured: it differs on only 104/200 salted rolls, because there are exactly two states. Parametrising it needs a new triangle spec *and* new option labels — real work, not a substitution |
| coMixedFull | steps ×3 | CLEAN | form × fn × angle all rolled |

**4 CLEAN, 3 CARE.**

### gt5 · Reductions: numbers (`questgt5-reductions-numbers.js`) — mechanic: steps chain (quadrant cross → token pad → sign → ratio)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| pos1 | steps (tapcross, tokenpad, mc, mc) | CLEAN | `quadAngle(q)` never returns a quadrantal boundary |
| pos2 | steps ×4 | CLEAN | identical generator to pos1 |
| negNear | steps ×4 | CARE | `nonQuadrantalAngle(5,85)` is a reroll loop, and the range is chosen to sit **on the friendly side of −90°** so `reduce()` emits no rotation step (her F10 threshold). Widening the range changes the number of steps in the chain |
| negFar | steps ×5 | CARE | the other side of −90°, range −450…−91 chosen so `reduce()` emits **exactly one** turn. A wider range gives two turns and the tokenpad answer stops matching |
| coFnPlus | steps ×4 | CLEAN | off `cofunction()`, not `reduce()` — the ratio swaps |
| coFnMinus | steps ×4 | CLEAN | same |
| rotationPool | steps ×5 | CARE | both signs, one turn each, same range guards as negFar |

**4 CLEAN, 3 CARE.**

### gt6 · Reductions TIP Chips (`questgt6-tip-chips.js`) — theory round — mechanic: list-pick / yes-no

| Skill | Kind | Class | Reason |
|---|---|---|---|
| threeBoxes | mc + reveal(1) | CLEAN | effectively pure recall — only the two option labels shuffle (84/200). List it with the harness-exempt skills |
| chip1 | mc | CLEAN | fn + angle rolled; all three decoys computed from the same angle |
| chip2Pool | **mc _or_ yesno** | CARE | second mixed-type skill (see gt1.whatItMeans). Same choice: split, or document a mixed kind |
| chip3 | mc | CARE | `quadAngle(3\|4)` + `reduce()`. One decoy — `[fn A°]² = fn²A°` — is arguably a *true* statement as written; its wrongness is "you didn't reduce first". That is a teaching decision, not a maths bug, but it should have her eye before it is dealt cold in a dice round |
| chip4trap | mc | CLEAN | only the letter (θ/x) rolls — near-pure recall |
| chip5Pool | mc | CLEAN | two fixed items × the letter |
| butWhy | yesno + reveal(1) | CLEAN | pure recall, **zero variance** — harness-exempt |

**5 CLEAN, 2 CARE.**

### gt7 · Reductions: variables (`questgt7-reductions-variables.js`) — mechanic: steps chain (sign → ratio)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| item1 … item7 | steps (mc, mc) | CLEAN ×7 | **one generator in seven slots.** `symbolicReduce()` does not look anything up: it evaluates fn(form(θ)) at 20° and 37° and asks which of ±sin/±cos/±tan matches at both, throwing unless exactly one does. The identity is *derived* every roll. 11 forms × fn × 4 letters; tan is deliberately excluded from the three co-function arms (her rounds never ask cot) |

**7 CLEAN, 0 CARE.** Collapse the seven slots to **one** pool entry.

### gt8 · Special sums (`questgt8-special-sums.js`) — mechanic: steps chain (double tick → sketch fill → read two ratios)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| bowTieCard | steps (doubletick) + reveal(1) | CARE | `overlapPick()` is a **400-try retry loop** that keeps a (ratio-sign, interval) pair only if the two tick-lists overlap in exactly one quadrant, with a hardcoded fallback so it can never return undefined. Copy it whole |
| chain1 | steps (doubletick, sketchfill, mc, mc) | CARE | **three** load-bearing guards at once: `overlapPick()`; `PRIM_TRIPLES` only (lowest terms — the file explains that `sin θ = 20/25` would mark a learner wrong for reducing); and `byValue()`, which filters decoys by numeric value, not by string |
| chain2 | steps ×4 | CARE | identical generator to chain1 |
| chain3 | steps ×4 | CARE | identical generator to chain1 |
| chain4 | steps ×4 | CARE | identical generator to chain1 |
| substitute | mc + graph(quadtri, labelled) | CARE | `SMALL_TRIPLES` (r ≤ 13) so the r² coefficient stays a number she would write; the fourth expression form is added **only when r === 5**; decoys via `byValue()` |
| pointVariant | steps (tapcross, sketchfill, mc) | CARE | `PRIM_TRIPLES` + `byValue()`; the sketch shows the given coordinates but keeps r as a letter until it is typed |

**0 CLEAN, 7 CARE.** Every skill in this round carries a guard. It is the
Probability of this chapter — numerically ready, procedurally heavy.

### gt9 · Identities: the next step (`questgt9-identities.js`) — mechanic: list-pick / short steps chain

| Skill | Kind | Class | Reason |
|---|---|---|---|
| whichSide | mc | CLEAN | 4 statements × 4 letters. **The correct answer is always "the LHS"** — deliberate (it is her "when in doubt, go LEFT" ruling), but a learner meets a question whose answer never moves. Report-only |
| lcdItem | steps (mc, mc) | CLEAN | `roles()` swaps sin/cos; `checked()` proves the identity at 23° and 37° |
| whichPartFirst | steps (mc, calc) | CLEAN | |
| maskedPick | mc | CLEAN | 2 shapes × roles × letters |
| productsItem | steps (mc, mc) | CLEAN | the ± sign is rolled and carried through |
| kfcItem | mc | CLEAN | |
| coFnIdentity | mc | CLEAN | |
| oneNeedsDenominator | steps (mc, mc) | CLEAN | |

**8 CLEAN, 0 CARE** — the cleanest round in the chapter, and for a real
reason: every claimed equality goes through `checked()` (throws if the two
sides disagree at 23° or 37°) and every decoy goes through `optionsByFn()`
(**throws** if a decoy is numerically equal to the answer). The guards are
inside `gen()`, so extraction carries them for free — but a recipe that
rebuilds the decoys by hand loses the throw. Reuse `gen` verbatim.

### gt10 · Super special sums (`questgt10-super-special.js`) — mechanic: steps chain (tap a side, tap a side, pick the third)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| flamingoCard | mc + reveal(1) | CLEAN | only the letter and the angle roll; the four options are fixed prose |
| shortcutCos | steps (tapside, tapside, mc) + graph(quadtri) | CARE | **the angle bank is a hand-curated safe list: {35, 40, 50, 55}.** The file documents both reasons — below 35° / above 55° the adjacent and hypotenuse midpoints come within a fingertip of each other at phone width, and 45° would make sin = cos and collapse the decoys. This is Measurement's `figPrismSafe` pattern in a different chapter: real, bounded variety, and it **must** be copied |
| shortcutSin | steps ×3 | CARE | same bank |
| shortcutTan | steps ×3 | CARE | same bank |
| shortcutCosInv | steps ×3 | CARE | same bank |
| readRatio | mc + graph(quadtri, labelled) | CARE | same 4-angle bank, plus a by-value decoy filter that can return fewer than 3 decoys; the ratio the question handed over is excluded from the ask |
| readRatio2 | mc | CARE | identical generator to readRatio |

**1 CLEAN, 6 CARE.**

⚠️ `reduceThenRead()` is still in this file but is **not** in `SKILLS` — she cut
it on 2026-08-22 ("remove the rounds that ask the question like this without
the sketch"). The generator was kept in case she wants it back *with* a sketch.
It must never be added to a dice pool without her saying so.

### gt11 · General solution: the six types (`questgt11-six-types.js`) — mechanic: list-pick, six options in a FIXED order

| Skill | Kind | Class | Reason |
|---|---|---|---|
| type1 | mc | CLEAN | four shape builders, all fresh coefficients |
| type2 | mc | CLEAN | |
| type3 | mc | CLEAN | |
| type4 | mc | CLEAN | the grouping shapes are built **from** the two brackets, so the leftover brackets always match |
| type5 | mc | CARE | `trinomialQuad()` is a 400-try loop enforcing four separate conditions: integer factors, gcd(A,B,C) = 1, distinct roots, and at least one root inside [−1; 1] (otherwise the equation is two dead branches). Plus the F11 regex, which **throws** if `2cos²θ − cosθ + 1 = 0` is ever generated |
| type6 | mc | CARE | throws unless the two sides genuinely carry different angles |
| mixedA | mc | CARE | draws any of the six, so it inherits both the type-5 and type-6 guards |
| mixedB | mc | CARE | identical generator to mixedA |

**4 CLEAN, 4 CARE.**

⚠️ Harness note: the six options are **deliberately not shuffled** — the file
says so ("a list to learn, not a shuffle"). A generic dice harness check that
asserts option order varies would false-flag this round.

### gt12 · General solution: the last steps (`questgt12-last-steps.js`) — mechanic: steps chain (quadrant cross → reference angle)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| dec1 | steps (tapcross, calc dp 2) | CARE | the value is either a fraction (denominator 2–5) or a 2-dp decimal, signed either way; `refAngle()` deliberately takes the **size** only — her "don't type − into the calculator" ruling *is* the question. The ref ∠ is irrational on the fraction branch, so the learner rounds to 2 dp and the `dp`/`tol` pairing is load-bearing |
| dec2 | steps ×2 | CARE | identical generator to dec1 |
| dec3 | steps ×2 | CARE | same, plus a rolled bracket offset (`f(θ − k°) = v`) |
| tanItem | steps ×2 | CARE | **`alsoAccept: [[quadrants[0]]]`** — her one-line tan ruling ("the second one is a waste of time!"). Drop that array and a correct short-cut answer is marked wrong |
| bound1 | steps ×2 | CARE | `boundaryCase()` supplies the ticks and ref ∠ for a value in {−1, 0, 1}; that is her convention (0 counts as +), not a generic sign rule |
| bound2 | steps ×2 | CARE | identical generator to bound1 |
| cofn1 | steps (tapcross) | CARE | the correct answer is the **string `"noref"`**, not an array of quadrants. A pool or harness that assumes tapcross answers are arrays breaks here. Also throws if the two angles collide |
| cofn2 | steps ×1 | CARE | identical generator to cofn1 |

**0 CLEAN, 8 CARE.**

### gt13 · Undefined values (`questgt13-undefined.js`) — mechanic: steps chain (multi-pick → number pad → list-pick)

| Skill | Kind | Class | Reason |
|---|---|---|---|
| item1 … item6 | steps (mcmulti, calc, mc) | CARE ×6 | the decoy bank (`NEVER_ZERO`) is expressions that can **never** be zero, and that is load-bearing, not decorative: a decoy that *can* hit zero would be a second right answer wearing a wrong answer's coat. The file records that the brief's suggested decoy (`sin x` outside a denominator) was rejected for exactly that reason. All six slots share one 6-shape bank, paired two shapes per slot |

**0 CLEAN, 6 CARE.**

---

## 3. Chapter totals

| Round | Skills | CLEAN | CARE | STATIC | BLOCKED |
|---|---:|---:|---:|---:|---:|
| gt1 Introduction | 7 | 5 | 2 | 0 | 0 |
| gt2 Cartesian plane | 7 | 7 | 0 | 0 | 0 |
| gt3 Special angles | 7 | 4 | 3 | 0 | 0 |
| gt4 Co-functions | 7 | 4 | 3 | 0 | 0 |
| gt5 Reductions: numbers | 7 | 4 | 3 | 0 | 0 |
| gt6 TIP Chips | 7 | 5 | 2 | 0 | 0 |
| gt7 Reductions: variables | 7 | 7 | 0 | 0 | 0 |
| gt8 Special sums | 7 | 0 | 7 | 0 | 0 |
| gt9 Identities | 8 | 8 | 0 | 0 | 0 |
| gt10 Super special sums | 7 | 1 | 6 | 0 | 0 |
| gt11 The six types | 8 | 4 | 4 | 0 | 0 |
| gt12 The last steps | 8 | 0 | 8 | 0 | 0 |
| gt13 Undefined values | 6 | 0 | 6 | 0 | 0 |
| **General Trig (gt1–gt13)** | **93** | **49** | **44** | **0** | **0** |

For the `DICE-AUDIT.md` §13 summary table, the row is:

| Chapter | Skills | CLEAN | CARE | STATIC |
|---|---:|---:|---:|---:|
| General Trig (gt1-gt13) | 93 | 49 | 44 | 0 |

**No STATIC skills.** Unlike Exponents & Surds and Equations & Inequalities,
gtrig has no hand-authored worked-example bank — every one of the 93 skills
computes its answer from rolled values through `triglib.js` or its own numeric
prover. **No input-law violations**: the only inputs are list-pick, the
quadrant cross, the number pad, the token pad and sketch-clicks. No free text
anywhere.

The 44 CARE items are the highest count of any chapter except Measurement's
29-of-33 and Probability's 25-of-55 — but the character is different. Almost
every gtrig CARE item is *already solved in the live code*: a retry loop, a
curated angle/triple bank, an `alsoAccept`, or a value-filtered decoy list.
Only two need real work to widen (`gt4.twoLabelTriangle`, 2 states; and
`gt10`'s 4-angle bank, which is a genuine engine-adjacent limit).

---

## 4. Method coverage (DICE-COMMON's method rule, applied ahead of time)

Applying the rule *(attach `q.method` only when `solution.length >= 2`, or a
step carries a reason `r`, or the single step's text is not just the answer)*:

| | Skills |
|---|---:|
| Real working → method eligible | **65** |
| Answer only → no method | **28** |

The 28 without working are exactly **gt1, gt2, gt3 and gt6** — the two
discovery rounds plus the special-angles round and the TIP-Chips theory round.
Every skill from gt4 onward carries a real `solution` chain with reasons. That
is a clean line: theory rounds get no method link, drill rounds all do.

But see §1.3 — **48 of those 65 are `steps` chains**, where the method link as
currently rendered is a spoiler. Net recommendation for a first pool:
**attach `q.method` to the 17 non-`steps` eligible skills, leave it off the 48
chains** until `js/play.js` gates it.

---

## 5. Pool shape (for whoever builds `js/quests/dice-gtrig.js`)

**Duplicate generators.** gtrig fills its 7-question rounds by calling the same
generator in several slots. In a static round that is correct — seven fresh
draws from one machine. In a dice pool it is seven identical entries skewing
the deal. The families:

| Round | Slots | Distinct generators |
|---|---|---|
| gt3 | pickValue1, pickValue2 | 1 |
| gt5 | pos1, pos2 | 1 |
| gt7 | item1 … item7 | **1** |
| gt8 | chain1 … chain4 | **1** |
| gt10 | readRatio, readRatio2 | 1 |
| gt11 | mixedA, mixedB | 1 |
| gt12 | dec1, dec2 (dec3 differs) · bound1, bound2 · cofn1, cofn2 | 3 |
| gt13 | item1 … item6 | 6 slots, 6 shapes, two disjoint pairings — item1+item2+item3 already cover all six shapes once each |

Collapsing those gives **74 pool entries from 93 audited skills**:

```
gt1 7 · gt2 7 · gt3 6 · gt4 7 · gt5 6 · gt6 7 · gt7 1
gt8 4 · gt9 8 · gt10 6 · gt11 7 · gt12 5 · gt13 3   =  74
```

**`roundLength` = 7.** Skills per quest sorted: 6, 7, 7, 7, 7, 7, 7, 7, 7, 7,
8, 8, 8 — thirteen values, so the median is the 7th = **7**.

**Coverage:** ceil(74 / 7) = **11 rounds** for a fresh learner to meet every
kind (8 rounds if gt1–gt3 stay out — see §6).

**Exclusions: none among the 93.** No gtrig skill is hardcoded beyond rolling,
none breaks the input law, none fails to generate. The only thing that must
stay out is `reduceThenRead()` in `questgt10-super-special.js`, which is not a
skill (she cut it) and must not be re-added.

**Kinds.** With duplicates collapsed, `kind === skillId` throughout — except the
two mixed-type skills (`gt1.whatItMeans`, `gt6.chip2Pool`), which need either a
split or a documented mixed kind.

---

## 6. The discovery rounds — ⚖️ NEEDS HER RULING

gt1, gt2 and gt3 are discovery rounds. The question the brief asks is whether
a discovery skill still makes sense when the dice deals it standalone, out of
sequence, next to a gt12 general-solution chain.

**What is true (checked, not assumed):**

- **Her no-spoilers rule is safe either way.** Each discovery skill carries its
  *own* `q.reveal` frames, and `mountReveal` shows them before the input is
  even visible. The frames show the picture and the raw movement — the point
  travelling round the circle, the O-A-H table built row by row — and never the
  conclusion. Dealt cold, the beat still teaches itself first and asks second.
- **The XP argument is gone.** `xpOnce` was removed from all three rounds on
  2026-08-22 evening ("the questions rotate every play, so the discovery rounds
  pay like any other round"). Confirmed: all thirteen defs now have
  `xpOnce: false`. There is no payment reason to fence them off.
- **What dice destroys is the ORDER.** gt1's own header calls it out: "seven
  beats, her order — the word → ratios need a right triangle → O/A/H follow θ →
  SOHCAHTOA → where the ratios come from → what each one means → the one check
  that matters". That argument only lands in sequence. gt2 (the wheel, the
  signs) and gt3 (the two triangles, the table) are different in kind: those are
  **reference material**, and a learner meeting "which word is quadrant ③?"
  cold is simply being asked to recall the wheel, which is exactly what the
  drill rounds assume they can do.
- **Cost in round length.** Ten skills carry reveal frames (4 and 6 of them on
  two skills). A 7-question dice round that happens to deal three of them adds
  roughly a dozen "Next ▸" taps — and they replay in full after a wrong answer
  (§1.4).

**Three options, hers to pick:**

- **A — leave gt1–gt3 out of the pool entirely.** Dice is drill; discovery
  stays a journey you play as a round. Costs 20 of the 74 entries; coverage
  drops to 8 rounds. Safest, and reversible in one line later.
- **B — put all three in.** Every discovery skill already works standalone.
  Costs nothing but round length and the out-of-order argument in gt1.
- **C — gt2 and gt3 in, gt1 out.** gt2 and gt3 are reference the drills already
  lean on; gt1's seven beats are one argument that only works in order.

**My recommendation: C**, with A as the safe fallback if she would rather not
think about it before the first phone-test. **This is a recommendation, not a
decision — it needs her ruling before a pool is written.**

---

## 7. XP economy — report only

- **`xpOnce` never reaches a dice round.** `js/play.js`'s `finish()` returns at
  `if (dice) { await dice.finish(st); return; }`, which is *above* the
  `xpToSubmit(def, …)` line. So even if she restores `xpOnce` on gt1–gt3 one
  day, the discovery-pays-once rule would apply to the static round only —
  dice would keep paying full. Worth knowing; not worth changing.
- **Dice XP is per question, and a gtrig question is not one interaction.**
  `js/play.js` pays `XP.perCorrect × min(streak, cap) + firstTryBonus` **once
  per question**, and a `steps` chain commits exactly once, at the end. A Stats
  dice question is one tap. A `gt8.chain*` question is a double-tick (two tick
  passes plus the overlap tap), three number-pad entries, and two multiple
  choices — **eight interactions for one question's XP**. A seven-question
  gtrig dice round can run 40–50 interactions where a Stats one runs 7–8.
  Nothing is broken; the round is simply three to five times longer for the
  same payout. If she wants dice rounds to feel comparable across chapters,
  `roundLength` for gtrig should be **5, not 7** — that is a her-call, and the
  house recipe says 7, so it is flagged rather than assumed.
- Everything else is standard: `mhq_submit_dice` recomputes XP server-side from
  the stored `answeredCorrect[]`, the client never names an amount, and the
  first-answer-counts gate (`firstAnswered`) already handles the chain's single
  commit correctly.

---

## 8. What this says about the build order

- **General Trig is dice-ready today, and it is the best-defended chapter in
  the app.** `verify-gtrig.html` already runs **~1.04 million checks**: a
  300-roll generation sweep per skill with `steps`-recursive shape validation,
  independent numeric recomputes (1 000 items each for gt4/gt5/gt7), a
  structural equation classifier for gt11 written from the equation's *shape*
  rather than its type tag, every gt9/gt10 equality re-evaluated at three
  angles, and every sketch re-derived through `verifyQuadTri`. No other chapter
  comes close. A dice pool inherits all of that: the new
  `verify-dice-gtrig.html` only has to add the dice-specific layer — seeding,
  determinism, salt variance, kind coverage, resume, method.
- **The real cost is the harness, not the pool.** Extraction is genuinely
  free — 74 entries reusing `gen` verbatim — because every guard lives inside
  `gen()`. But DICE-COMMON's generic shape checks were written for flat
  questions (`q.options`, `q.expected`, `q.yes`). Fifty-two percent of gtrig's
  skills have **none of those at question level**; the checks must recurse into
  `q.steps` and dispatch on eight sub-kinds. `verify-gtrig.html`'s section 9
  already does exactly this recursion and can be lifted almost as-is.
- **One shared-file decision blocks nothing but shapes the pool:** the
  `q.method` link on a `steps` chain (§1.3). Decide it before the pool is
  written, because it changes 48 entries.
- **Two things need her, not us:** the discovery-rounds ruling (§6) and the
  round-length question (§7). Both are cheap to answer and expensive to guess.
- **No blocker anywhere.** No missing engine feature, no unrenderable type, no
  fixed-prose problem, no input-law violation, no skill that fails to generate.
  On a pure "how much of this already rolls" basis gtrig sits with Trig Graphs
  and Statistics at the top of the list — it just carries more guards, and the
  guards are all already written.

---

## 9. Open questions for Megan

1. **Discovery rounds:** do gt1–gt3 go in the dice pool? (§6 — recommendation
   C: gt2 and gt3 in, gt1 out.)
2. **Round length:** a gtrig dice question can be eight taps, not one. Keep
   `roundLength` at the house median of 7, or drop it to 5 for this chapter?
3. **`gt3.quadrantal`** always offers exactly 3 options, because sin/cos of a
   quadrantal angle can only be −1, 0 or 1. Fine as a permanent 1-in-3, or
   should it stay out of the pool?
4. **`gt6.chip3`'s decoy** `[sin A°]² = sin²A°` is arguably true as written —
   the intended wrongness is "you didn't reduce first". Reword, or leave it?
5. **Pre-existing, outside dice:** `verify-gtrig.html` section 17 has one stale
   assertion — `the gtrig exam chapter owns exactly 4 skill cards (got 54)`.
   That is the *only* failing check in 1 037 165. The exam registry grew past
   the number the assertion was written against; the card-by-card relink checks
   below it all pass. Someone should update the count. Not touched by this
   session (Exam Focus is outside its scope).
