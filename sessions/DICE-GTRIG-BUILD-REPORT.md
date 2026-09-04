# DICE-GTRIG — build report (wave 3, BUILD ONLY)

Session GT-BUILD, 2026-08-24. One Opus build agent, working to
`sessions/DICE-GTRIG-BRIEF.md` with `sessions/DICE-AUDIT-gtrig.md` as the law.
Nothing was pushed. `DICE_CHAPTERS` was not touched. `sw.js` was not touched.

---

## 1. Files created / changed

| File | What |
|---|---|
| `js/quests/dice-gtrig.js` | **NEW** — the pool. 65 entries, `roundLength` 5. |
| `verify-dice-gtrig.html` | **NEW** — the dice-layer harness, steps-recursive over all eight sub-kinds. |
| `js/quests/dice-pools.js` | Registered `gtrig: diceGtrig` (import + one map key), exactly the way the wave-2 pools register. |
| `verify-gtrig.html` | The single pre-approved line: the stale exam-card count assertion, 4 → 54. |

Nothing else. No quest module, no engine, no `triglib.js`, no `js/play.js`,
no `js/questions.js`, no `js/config.js`, no `sw.js`, no SQL.

**One thing worth knowing about the registration:** `js/quests/dice-pools.js`
is statically imported by `js/screens.js`, so `dice-gtrig.js` now loads for
every learner. It costs nothing — `js/quests/index.js` already static-imports
all thirteen `questgt*.js` modules, so no new module enters the graph — and
`DICE_CHAPTERS` still gates whether anything is dealable. `sw.js` needs no
change either: JS is network-first there, not in the precache `SHELL` list.
(The `CACHE` bump at ship time is the foreman's, as always.)

---

## 2. The pool — 65 entries, and the arithmetic

Checked against DICE-AUDIT-gtrig §5's family table before a line was written,
then re-checked by the harness at run time (it walks `QUEST_DEFS` and proves
KEEP + DROPPED account for all 93 skills, with nothing in both or neither):

```
 93  audited skills (the audit's chapter total)
−19  duplicate-generator slots collapsed  (§5's family table)
= 74  collapsed entries                    (matches §5's "74")
− 7  gt1, all of it — her ruling, audit §6 option C
− 1  gt6.chip3       — pending Megan, audit §9 Q4
− 1  gt3.quadrantal  — pending Megan, audit §9 Q3
= 65
```

Per round, as the file actually builds it:

| gt2 | gt3 | gt4 | gt5 | gt6 | gt7 | gt8 | gt9 | gt10 | gt11 | gt12 | gt13 | total |
|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| 7 | 5 | 7 | 6 | 6 | 1 | 4 | 8 | 6 | 7 | 5 | 3 | **65** |

`chapterId: "gtrig"` · 65 distinct kinds · `roundLength: 5`.

### The 19 collapsed duplicates (kind = the representative's skillId)

| Representative | Slots it stands for | Why it is a literal duplicate |
|---|---|---|
| `gt3.pickValue1` | pickValue1, pickValue2 | both are `() => pickValueQ()` |
| `gt5.pos1` | pos1, pos2 | both are the same `positivePool` object |
| `gt7.item1` | item1 … item7 | all seven are the same `randomReduceVarQ` object |
| `gt8.chain1` | chain1 … chain4 | all four are the same `chainItem` object |
| `gt10.readRatio` | readRatio, readRatio2 | the same `readRatio` function object |
| `gt11.mixedA` | mixedA, mixedB | both are the same `mixed` object |
| `gt12.dec1` | dec1, dec2 | both `decimalItem("plain")`; `dec3` is `decimalItem("bracket")` and stays its own entry |
| `gt12.bound1` | bound1, bound2 | both `boundaryItem` |
| `gt12.cofn1` | cofn1, cofn2 | both `coFnItem` |
| `gt13.item1/2/3` | item1 … item6 | `slot(0,4) + slot(1,5) + slot(2,3)` already covers all six shapes once each; item4–6 are the other disjoint pairing of the same six |

Every other entry has `kind === skillId`. No judgement-call grouping was made
anywhere ("when unsure, don't group").

### Out of the pool

- **gt1, all seven skills** — her ruling (audit §6 option C: gt2 and gt3 in,
  gt1 out). Reversible in two lines: add `questGt1` to `QUESTS` and a `gt1`
  key to `KEEP`. Dropping gt1 also removed both of its CARE items — `tapSide`'s
  near-isosceles midpoint separation and `whatItMeans`' mixed mc-or-yesno kind —
  so neither needed handling, and the harness carries no min-separation assert.
- **`gt6.chip3`** — pending Megan (audit §9 Q4, the arguably-true decoy).
  One-line re-add: put `"chip3"` back in `KEEP.gt6`.
- **`gt3.quadrantal`** — pending Megan (audit §9 Q3, the permanent 3-option
  guess). One-line re-add: put `"quadrantal"` back in `KEEP.gt3`.
- **`reduceThenRead()`** — she cut it 2026-08-22. It is not in
  `questgt10-super-special.js`'s `SKILLS` at all, so it cannot reach the pool
  by accident; the pool header records that so nobody re-adds it.

Both pending items are recorded in the pool header AND printed by the harness
under a "PENDING MEGAN" heading, so they cannot be forgotten.

### Mixed kind, documented not split

`gt6.chip2Pool` emits `mc` on some rolls and `yesno` on others (`pick([chip2Mc,
chip2Yn])()`). Left as ONE entry with the mixed kind written into the pool
comment, per the foreman's ruling. Its generator was not modified. The 200-roll
sweep saw both faces (13 000 rolls across the pool: 5 910 mc, 290 yesno — the
yesno count is `gt6.butWhy`'s 200 plus chip2Pool's share).

### roundLength = 5

The foreman's call (audit §7). The house median is **7** — skills per quest
sorted are 6, 7, 7, 7, 7, 7, 7, 7, 7, 7, 8, 8, 8, so the 7th of thirteen is 7.
It is a **one-character change** on the `roundLength` line if she prefers 7.
Coverage: ⌈65/5⌉ = **13 rounds** to meet every kind (⌈65/7⌉ = 10 at 7).
The reason for 5 is real and visible in the crops: a `gt8.chain1` question is a
double-tick (two tick passes + the overlap tap), three number-pad entries and
two multiple choices — eight interactions for one question's XP.

---

## 3. Method coverage — pool-side rule, and the exact list

Rule as implemented (`methodEligible(q)` in the pool, asserted by the harness
on all 13 000 rolls): attach `q.method` **only** when the question is **not** a
`steps` chain **and** its solution carries real working (2+ steps, or a step
with a reason `r`, or a single step whose text is not just the answer).

**15 of the 65 entries carry a method link. 50 do not.**

| Attached (15) |
|---|
| `gt4.twoLabelTriangle` · `gt8.substitute` · `gt9.whichSide` · `gt9.maskedPick` · `gt9.kfcItem` · `gt9.coFnIdentity` · `gt10.flamingoCard` · `gt10.readRatio` · `gt11.type1` · `gt11.type2` · `gt11.type3` · `gt11.type4` · `gt11.type5` · `gt11.type6` · `gt11.mixedA` |

**Why 15 and not the audit's 17.** Audit §4 counts 17 non-`steps` eligible
skills across the un-collapsed 93. Two of those seventeen are collapsed
duplicates — `gt10.readRatio2` (same object as `readRatio`) and `gt11.mixedB`
(same object as `mixedA`) — so at pool level the same rule yields 15 entries.
Recomputed independently, not copied: the harness prints the list from what
`gen()` actually produced. The audit's 17 is right about skills; 15 is right
about entries.

The 48 `steps` chains get no link, by design: `js/play.js` renders it at mount,
before step 1, and a chain's `solution` IS the remaining answers. The
wrong-answer panel still shows the full solution at the end, exactly as in
static play. When the player-side gate lands (`root.dataset.step === String(
q.steps.length)`), deleting the `q.type !== "steps"` clause in `withMethod()`
gives all 48 their link back — that is the whole change.

---

## 4. Harness numbers — every one my own fresh run, in a real browser

Dev server on `:5191`, Playwright Chromium, fresh context per page and a
cache-busting query string on every load (the 08-23 stale-module trap).

| Harness | Result |
|---|---|
| **`verify-dice-gtrig` (NEW)** | **141 / 141** ✓ |
| `verify-gtrig` | **1 037 200 / 1 037 200** ✓, 0 console errors — **fully green for the first time** (it was 1 037 076 / 1 037 077 before the count fix, the single red the audit named) |
| `verify-dice` (Stats, the shared machinery) | 134 / 134 ✓ |
| `verify-dice-eqn` | 151 / 151 ✓ |
| `verify-dice-exp` | 78 / 78 ✓ |
| `verify-dice-func` | 89 / 89 ✓ |
| `verify-dice-finance` | 89 / 89 ✓ |
| `verify-dice-pat` | 96 / 96 ✓ |
| `verify-dice-trig` | 82 / 82 ✓ |
| `verify-store` | all 4 032 checks passed ✓ |

`verify-gtrig`'s total moved from 1 037 077 to 1 037 200 between the two runs.
That is not the fix — it is the 300-roll sweep, whose per-roll check count
depends on how long the rolled `steps` chains happen to be. The failure count
is what matters: 1 before, 0 after.

### What `verify-dice-gtrig` actually proves

**Part 0 — the ledger.** Pool shape (65 entries, `roundLength` 5, unique
skillIds, `kind === skillId`, every gen zero-arg, every concept has a card in
`js/concepts.js`), and the 93-skill ledger: it walks `QUEST_DEFS` and asserts
KEEP + `DROPPED` account for every skill, that nothing is in both or neither,
that `DROPPED` names no skill that has since been renamed away, and that the
19/7/2 split closes back to 65.

**Part 1 — per entry, 200 seeded rolls (13 000 questions).** Input law, prompt,
concept, no ASCII hyphen-as-minus in learner copy, method-rule conformance
(including a separate assert that no `steps` chain ever carries `q.method`),
per-type shape, and reveal-frame shape.

The steps-recursive validation is lifted from `verify-gtrig.html` §9 and
widened: §9 covers mc / mcmulti / tapside / tapcross / tokenpad / calc and step
graphs; this adds **doubletick** and **sketchfill**, and puts **every** sub-kind
through `checkStep()` twice — once with its own right answer, once with a wrong
one — so a step that cannot be marked can never reach a dice round. All eight
sub-kinds were exercised, counted, and asserted non-zero:

```
6 400 steps chains · 17 800 sub-steps
mc 8 600 · tapcross 2 800 · calc 2 200 · tokenpad 1 600 · tapside 1 600
mcmulti 600 · doubletick 400 · sketchfill 400
```

Specific things it checks that a generic dice harness would get wrong:

- `gt12`'s tapcross answer may be the **string `"noref"`**, not an array — both
  shapes are accepted and both are marked through `checkStep`.
- `gt8`'s doubletick: the two tick passes must overlap in **exactly one**
  quadrant and that quadrant must be the stated answer. That is `overlapPick()`'s
  400-try guarantee, re-proved from the outside on all 400 rolls.
- `gt8`'s sketchfill: every field finite, `checkStep` accepts the exact fills and
  rejects one that is a whole unit out, and rejects an empty fill.
- A `tapside` step must have a `quadtri` sketch at or before it in the chain.
- The by-VALUE decoy check ran for real: **4 902 decoys compared numerically**
  against their answer (1 651 option sets had an answer the parser reads as a
  number — integer, comma-decimal, `fracLabel` "a/b", or an exact special-angle
  string; 12 859 were prose or expressions and fall to the distinct-labels
  check). **0 collisions.** The counter exists so "0 collisions" can never mean
  "the check never ran".

**Part 2 — graph honesty.** Every rolled figure, question-level and step-level,
back through the engine's own verifier: **2 000 figures, 12 400 engine
assertions, 0 faults** (1 600 quadtri → `verifyQuadTri`, 200 trigg →
`verifyTrig`, 200 triangle → `verifyTriangle`). No rolled figure ever needed
tightening — the pool reuses the chapter's own curated-safe builders.

**Part 3 — the dice layer.** Determinism, resume, rng restored to `Math.random`
after `genAt`, salted retry (salt 1 differs from salt 0 over 20 indices for
every non-exempt entry; same salt twice is byte-identical; no-salt-arg equals
salt 0), dealing (first round = 5 distinct unmet kinds; full 65-kind coverage
reached in **13 rounds**, allowed ≤ 15; full-coverage deal still fills a round),
and resume of a real dealt round.

Salt-variance exempt list, exactly the brief's: **`gt6.butWhy`,
`gt6.threeBoxes`** (audit §1.5 measured them at 0/200 — one fixed true/false
each). `gt1.rightTriangleOnly`, the third one the audit names, left with gt1.
Of the two exempt, `gt6.threeBoxes` still varied in practice via `mc()`'s seeded
option shuffle; the harness prints that rather than hiding it.

**Deliberately NOT checked: option order variance.** `gt11`'s six options are a
list to learn, not a shuffle — the file says so — so a generic "options must
reshuffle" assert would false-flag that whole round. The harness prints that
omission on the page so nobody adds it later by mistake.

---

## 5. PNG walk — 13 rounds, all 65 kinds, read at 375 px

`PYTHONIOENCODING=utf-8 python tools/shoot_dice.py gtrig 13`, at 375 px on the
demo learner (`?local=1`). Because dealing is coverage-first, thirteen rounds of
five dealt **every one of the 65 kinds exactly once** — the whole pool, walked.

- **`scrollW` 375 / 375 on all 65 questions.** Not one overflow.
- **`page errors: none`.**
- `-m` (method panel) fired on exactly the 15 entries the harness names, and on
  no others — the pool-side rule confirmed from the outside.
- No `-s` ("Show me the steps") crop exists, and that is correct, not a gap:
  that button belongs to `js/questions.js`'s **question-level `calc`** branch,
  and gtrig has no question-level `calc` in the pool (calc only ever appears as
  a sub-step inside a chain).

### Crops I opened and read

| Crop | Skill | What I was looking for | Verdict |
|---|---|---|---|
| `gtrig-r7-02-q` | gt2.wheelWord | reveal frame dealt cold | renders; see finding **F1** |
| `gtrig-r4-00-q` | gt3.oahRead | the 6-frame `replace` reveal, frame 0 | frame 0 is the EMPTY table skeleton — no spoiler, in frame, clean |
| `gtrig-r6-00-q` | gt3.triangles | 3-frame reveal, to-scale triangles | 45-45-90 drawn to scale (1, 1, √2), in frame, clean |
| `gtrig-r10-04-q` | gt6.threeBoxes | one-frame recall card | renders; see finding **F1** |
| `gtrig-r0-03-q` | gt3.pickValue1 | the O-A-H table + by-value decoy filter | table complete; 4 distinct options (1, 1/√2, √3/2, 1/2); no collapse to 3 on this roll |
| `gtrig-r6-02-q` | gt2.bandSign | `trigg` engine + quadrant bands | real cos curve to scale, her four band colours, 3 options (legal and deliberate) |
| `gtrig-r1-00-q` | gt2.tapSign | question-level multi tapcross | cross + Submit, in frame, clean |
| `gtrig-r0-02-q` | gt12.dec1 | tapcross step + the `noRef` button | `cos x = −1/3` stacked, real minus, noRef present, clean |
| `gtrig-r3-03-q` | gt12.cofn1 | the `"noref"` answer path | "no reference angle" button on screen next to Submit, clean |
| `gtrig-r12-03-q` | gt5.pos1 | tokenpad chain, step 0 | `cos 200° = ?` → single-select cross, clean |
| `gtrig-r11-01-q` | gt7.item1 | the 7-slots-collapsed entry | `sin(A − 90°)`, sign step, clean |
| `gtrig-r2-03-q` / `-m` | gt4.twoLabelTriangle | `triangle` engine + method panel | renders; method panel — see **F2** |
| `gtrig-r8-04-q` / `-r` | gt8.chain1 | doubletick chain dealt cold | `tan x = 15/8` (a PRIM_TRIPLE, lowest terms), cross renders; see **F3** |
| `gtrig-r5-01-q` | gt8.substitute | SMALL_TRIPLES sketch + numeric options | 3-4-5 to scale in ①; 25 sin²x − 5 cos x = 13 ✓; options 13 / 19 / −13 / −19 with real minus |
| `gtrig-r3-00-q`, `gtrig-r10-02-q` | gt10.shortcutCos / shortcutTan | the curated {35,40,50,55} bank, tapside step | 55° and 35° sketches, hot-spots well separated, in frame |
| `gtrig-r8-01-q` (+ 2× zoom) | gt10.readRatio | labelled sketch + option legibility | sketch clean; one decoy is not — finding **F4** |
| `gtrig-r9-00-q` | gt13.item1 | mcmulti + NEVER_ZERO decoys | 5 stacked-fraction options, all decoys genuinely never zero, Submit, clean |
| `gtrig-r9-03-m` | gt11.type5 | fixed ①–⑥ option order + method | six options in her fixed order, not shuffled ✓; method panel — see **F2** |
| `gtrig-r1-01-m` | gt10.flamingoCard | method on a recall card | see **F2** |
| `gtrig-r12-end` | — | the results screen | "Dice round complete", 5/5, +145 XP · +10 💎, level-up line, clean |

---

## 6. Findings — flagged, not fixed (all outside this session's scope)

> **Update 2026-09-04 (her word, fix day):** **F1**, **F2** and **F4** are FIXED —
> F1 via `q.revealAfter` (gt2.wheelWord + gt6.threeBoxes, and gt6.butWhy got the
> same treatment on her explicit word), F2 via `slimMethodPanel()` in js/play.js,
> F4 via `flipRatio()` in questgt10. Commits c090251 · 6415b21 · 5fdfbf5.
> The text below is the original report, kept as written.

**F1 · Two recall cards show their own answer in their reveal frame.**
`gt2.wheelWord` asks "Which word is quadrant ④?" and its first reveal frame is
the full ASTC bow tie with ④ labelled **Cash**. `gt6.threeBoxes` asks "A
negative angle turns…" and its one frame reads "negative angles → clockwise".
Dealt cold in a drill round, both are free marks.
*This is not a dice regression* — `mountReveal` shows frames before the input in
static play too, and in a discovery ROUND the frame is the teaching and the
question is the read-off. It only looks different when the dice deals the beat
standalone. Her call whether that matters; fixing it would mean editing
`questgt2-cartesian.js` / `questgt6-tip-chips.js`, which is out of scope.
Crops: `gtrig-r7-02-q.png`, `gtrig-r10-04-q.png`.

**F2 · The method panel opens with the answer.**
`methodHtml()` — copied verbatim from the wave-2 pools, unchanged — leads with
`<div class="fb-answer"><b>Answer:</b> …`. On `gt11.type5` the panel's first
line is "**Answer:** ⑤ trinomial …"; on `gt10.flamingoCard` it is the whole
point of the card. So the always-available "📖 Show me the method" link on all
15 entries hands the answer over before the learner picks.
This is DICE-PLAN's always-available-method ruling plus the shared
`methodHtml()`, identical in `dice-eqn` / `dice-exp` / `dice-func` — nothing
gtrig introduced. It just bites harder here, because gtrig's non-`steps` set is
almost entirely *classify this* / *recall this*, where "the method" and "the
answer" are the same sentence. Worth the foreman's eye. Not changed: it would
mean either a shared-file change or diverging from the wave-2 pools.
Crops: `gtrig-r9-03-m.png`, `gtrig-r1-01-m.png`.

**F3 · A chain step's hint is printed twice.**
On `gt8.chain1`, after a failed submit with the question-level Hint already
open, the identical sentence appears twice on screen: once inside the steps card
(the step's own `hint`) and once in the question hint box below. It happens
because `H_TICK` is both `steps[0].hint` and `q.hint`. Cosmetic, same in static
play, lives in `js/questions.js` + the quest module. Reported only.
Crop: `gtrig-r8-04-r.png`.

**F4 · `gt10.readRatio`'s reciprocal decoy renders as an unreadable nested
fraction.** `questgt10-super-special.js` line 182 builds a decoy as
``1/(${shape.ratios[ask]})``. When that ratio is itself a fraction — which it
usually is — the string is `1/(k/√(k² + 1))`, and the app's fraction stacker
renders it as a three-level stack with the brackets gone and the lower bar
colliding with the `k²` exponent. At 375 px a learner cannot tell
`(1/k)/√(k²+1)` from `1/(k/√(k²+1))`. Not a correctness bug (the by-value check
passes and it is a genuine decoy), a legibility one — and pre-existing: the same
option appears in the static gt10 round. Editing the generator is outside scope,
so it is reported with the crop.
Crops: `gtrig-r8-01-q.png` and the 2× zoom `_zoom-r8-01-options.png` next to it.

**F5 · The `verify-gtrig.html` comment above the fixed assertion is now stale.**
The brief allowed exactly one line, so only the assertion changed. The comment
block above it still says "four cards across four skills"; the count is 54. The
new assertion carries its own explanation inline, so nothing is misleading in
the output — but somebody with a free hand should tidy the comment.

**Nothing else smelled off.** Every CARE guard the audit lists was reached by the
harness and held: `overlapPick()`'s single-quadrant overlap (400 rolls),
`PRIM_TRIPLES` lowest terms, `SMALL_TRIPLES` for the substitute item, `byValue`
/ `optionsByFn` (4 902 numeric decoy comparisons, 0 collisions), gt10's
{35,40,50,55} bank, gt12's `alsoAccept` short-cut, gt13's `NEVER_ZERO` bank,
gt11's `trinomialQuad` loop and F11 throw. Zero throws across 13 000 seeded
rolls.

---

## 7. Open questions for Megan (one line each)

1. `gt6.chip3` and `gt3.quadrantal` are held out pending her one-liner — each is
   a one-line re-add in `KEEP`.
2. `roundLength` is 5 (a gtrig question can be eight taps); the house median is
   7 and it is a one-character change.
3. F1 — dealt cold, `gt2.wheelWord` and `gt6.threeBoxes` show their answer on
   their own card. Fine as free reference marks, or should they come out?
4. F2 — the always-available method link opens with "Answer:". Fine for a
   drill, or should the link be gated for recall-style cards?

## 8. Still with the foreman (not done here, by instruction)

- The `DICE_CHAPTERS` flip in `js/config.js`.
- The `sw.js` `CACHE` bump.
- The push.
- The player-side method gate in `js/play.js` (would give the 48 chains their
  link back with a one-clause deletion in this pool).
