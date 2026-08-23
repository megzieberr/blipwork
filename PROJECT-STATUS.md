# Project status — updated 2026-08-23 (late) (🎲 DICE ×3 SHIPPED — Finance, Number Patterns, 2D Trig dice LIVE on sw v64, + the two Euclid cosmetics + four review fixes)

## 🎲 2026-08-23 (late) — THREE DICE CHAPTERS + COSMETICS (Fable foreman, 3 parallel Opus sessions under her /go)

Her brief: the two small Euclid cosmetics first, then "the dice rounds". Her question "isn't
this a nice task for parallel agents?" — yes: one Opus session per chapter, same working
tree, stub pools pre-registered by the foreman so no session touched a shared file.
Agent spend ≈ 1.0M Opus (F 0.34M · P 0.32M · T 0.35M) inside the 1.5–2M estimate.
**SHIPPED on her "yes, you can ship"**: commit `2262d23`, pushed, Pages built; live-verified
sw v64 served, the three pool files 200, `DICE_CHAPTERS` live, 🎲 card on all three chapters,
a real round opened on each on the live site (offline backend) with zero page errors.

**The two cosmetics (foreman, before the build)**
- "O" read like a zero: the centre label was painted BEFORE the chords/wedges, so every
  amber wedge at O dimmed it and ate its halo. `renderDiagram` now emits it after the
  angles — position unchanged on all 371 Euclid figure states (measured), paint order only.
- Index "1" under the "O" on the cyclic-quad walk: a keener global step-out was tried and
  REJECTED (it also moved t2q4 and sib.ca.q4, and on both the moved O read as the arc's).
  Instead a spec opt-in `oLabel: "outside"` on SPEC_BW3 only — 5 states move (reveal + 4
  walk steps), 366 identical. Question side untouched. Harnesses 673 · 7374 · 5819 · 41.

**Dice pools (each: reuse every skill.gen() verbatim — CARE guards ride free; `kind` =
skillId unless a true near-duplicate; roundLength = median skills-per-quest)**
| chapter | id | entries | kinds | roundLength | method links | harness |
|---|---|---|---|---|---|---|
| Finance | `finance` | 51/51 | 49 (f5.rateChangeSegment→f3.exponent, f3.monthlyRate→f3.ratePerPeriod) | 7 | 10 | verify-dice-finance 89/89 + NEW verify-finance 146/146 |
| Number Patterns | `pat` | 44/44 | 44 | 7 | 3 | verify-dice-pat 96/96 (verify-patterns 41/41 unchanged) |
| 2D Trig | `trig` | 36/36 | 36 | 5 | 19 | verify-dice-trig 82/82 (verify-trig 36/36 unchanged) |
- Finance's one hardcoded skill `f5.anyPoint` now rolls (P/rate/T/k; false one roll in
  three, two misconception wordings; solutions follow FINANCE-METHOD.md). `f7.whichGrowsMore`
  rolls its rate. `f5.expression` prints "R2 000" like its own timeline.
- **THE METHOD RULE (new, all pools):** "📖 Show me the method" appears ONLY where the
  solution holds real working (2+ steps, a reason, or a sentence that isn't just the
  answer). The builders' default `[{ s: answer }]` would have made the link a spoiler
  button. Split: Finance 10/51 · Patterns 3/44 · Trig 19/36 have a method; the rest show
  no link (the answer still shows on a wrong answer).
- `tools/shoot_dice.py` (foreman): walks a REAL dealt round at 375 px by resuming from
  the save (production regenerate path), shooting question / method / feedback / steps /
  results. Works without the hub flag. 404 crops read across the three chapters + my own;
  scrollW never above 375; zero page errors.

**Shared-file fixes the sessions surfaced (foreman review fixes, each proven)**
- `js/play.js`: the method panel ran the formula prettifier over the WHOLE markup, so
  `.sol-step`'s flex row got 3–6 children — "height = 2 ·Area / base = 8,49½" on the phone.
  Hit 29/58 shipped Stats skills too. Now per-step (fmt(s.s), fmt(s.r), fmt(answerLabel)),
  exactly like questions.js. Read on screen: stacked fractions, whole steps, reasons on
  their own line.
- `js/engine/triangle-graph.js`: a sharp angle's label went "behind" the vertex at 23 px —
  where the vertex letter already sits at 16 px. 23% of t2.findSide rolls printed "40°"
  over "A" (pre-existing in static play). Names shown → label now passes the letter; the
  frame-edge fallback stacks it under the letter. **General Trig untouched by construction:
  every gtrig spec is `hideNames: true` and both branches key on that flag.** Sweep: 15
  figure skills × 400 rolls → 0 collisions, 0 off-frame, 0 on a side label.
- `js/questions.js`: "Answer: X" followed by X again as a lone step (every pure-recall mc,
  app-wide, static too) — the default single answer-only step is dropped; real working
  untouched.
- `js/ui.js`: "the 7th term" broke as "7 / th" (a number becomes an inline-block; browsers
  may break after an atomic inline). Ordinal suffixes now ride with their number. verify-wrap
  50 693/50 693.
- `np5.readWhichTerm`: the graph labelled the turning point T₃ — the answer to "which
  term?" (her no-spoilers rule). `termParabola` takes a pointLabel; that skill passes "".
  `readValue` keeps T₍k₎. `np1.tapFirstDiff` got a real Hint (was the generic fallback).

Harnesses at the end (all fresh, after every change): verify-dice 134 · dice-finance 89 ·
dice-pat 96 · dice-trig 82 · finance 146 · patterns 41 · trig 36 · gtrig 6 · wrap 50 693 ·
store 4033 · exam 673 · exam-modules 7374 · exam-fractions 5819 · exam-skills 41 — all green.
Hub: 🎲 card on exactly finance / pat / trig / stats, none elsewhere (checked at 375 px).

### ⏳ Pending on Megan
- 📱 5 min **[whenever]**: close-and-reopen the PWA twice (sw v64), then Finance → 🎲 one
  round; Number Patterns → 🎲 one round; 2D Trig → 🎲 one round — the phone-test per
  chapter (her rhythm). No SQL to run.

### Next up
- **Worked-method content batch?** 99 of the 131 new dice skills ship without a method
  link because their vetted solution is just the answer. Patterns: ~20 already carry the
  working in their `answerLabel` (cheap promotion, her wording). Finance's must follow
  FINANCE-METHOD.md. Her call whether/when.
- Dice: Trig Graphs waits on the shared Soek-die-fout mechanic (graph-quest); Probability
  and Analytical Geometry need their METHODS digest first; Measurement's engine blocker
  (curated safe-proportion lists) needs her ruling before its turn; Exponents/Equations
  have 9 + 8 STATIC skills that simply stay out of the pool.
- Calculator emulator round 2 (carried). Two-circle riders: the circle engine knows ONE
  circle (`cx, cy, R` singletons; points = degrees on THE circle; tangents/centre label/
  harness all assume it) — one engine session (second centre+radius, points on circle 2,
  contact-point tangent, second O label, verifyDiagram on both) before any rider is written.
- Trig's open question: the method panel opens with "Answer: …" before the working —
  inherited from the Stats recipe, all four pools; fine while the link only shows on real
  working, but she may prefer steps-only.
- `f5.anyPoint` is false one roll in three (the session's default) — retune to ~half if
  she'd rather.

## 📌 Decisions (append-only, 2026-08-23 late)
- Three dice chapters built in PARALLEL (her question, my yes): independent pool files,
  shared registrations stubbed by the foreman first. Pattern for any future multi-chapter day.
- A "Show me the method" link appears only on real working — never on an answer-only
  solution (foreman rule, ratified by the three sessions' coverage reports).
- Centre-label placement: a per-spec opt-in (`oLabel`) over a global rule change, after
  measuring the global change moved two approved figures for the worse.
- Triangle engine fixes key on `hideNames` so General Trig's approved figures never move.
- The centre "O" is painted after the wedges, everywhere (paint order is not a layout change).

---

# (previous head) Project status — updated 2026-08-23 night (🧹 FIX DAY shipped — sw v63: exponent fractions, line-break nuggets, Euclid reasons/arcs, bookwork proofs WALK on the sketch)

## 🧹 2026-08-23 (night) — FIX DAY (Fable, her phone finds; one Opus agent under her /go)

Her ruling at the start: this session fixes only; the next build starts in a fresh session.
Two commits, shipped together on her "ship it": `5a62019` (fixes, sw v63) + `fb1f3dc`
(bookwork walk). Live-verified: sw v63 served, `js/exam/_walk.js` 200, new wording live.

**Her finds → what was actually wrong → fixed**
- `x^(2/5)` rendered as `x^(` + stacked fraction + `)` (es7, exam cards, concept cards).
  `fracHtml` now turns a fraction that IS a caret exponent into `<sup class="sf-exp">`;
  CSS raises/shrinks it (checked on the real es7 round at 375 px).
- "Horizontal asymptote" wrapping mid-label — that one bullet held two facts (split). But
  the hunt behind it found six renderer bugs in `js/ui.js`, each on many cards:
  × ÷ inside the fraction regex's À-ž letter range (`2/3 × −3/2` → "3 ×" as denominator);
  trailing `. , ; :` and `{ }` orphaning on the next line; `÷` not a glue op; `^(…)`
  breaking after the caret; `word = value` splitting (`Lower = | 20 − 18`, `gradient | = 0`,
  `x̄ > | median`); `∠`/`△` and precomposed `Â Ô Ĉ` unknown to the scanner (`∠ | ABC`).
  Round/square brackets deliberately NOT glued (verify-wrap rule 3: nowraps balance).
- Concept cards: spaced ` · ` is the formula-block one-identity-per-line separator, so
  `Tₙ = a · rⁿ⁻¹`, `xᵃ · xᵇ`, `√a · √b`, `½ · base · height` were chopped into lines —
  tightened. Replacement e.g. was born without numbers (`still /20` → 7/20, 6/19). Inline
  `.formula` spans wrapped once (were boxed three times). All 144 cards rendered at 375 px
  and READ (tools: scratchpad concept_sweep.py — not in repo).
- Euclid: reason `sum of ∠s in △` → **`int. ∠s of △`** everywhere (30; quads untouched;
  harness accept-list + EUCLID-ACCEPTABLE-REASONS.md updated). Rider 1 arcs: O₁ O₂ O₃ = 20
  as asked; B₁ 32 / B₂ 40 (NOT 20 — two narrow wedges can't hold digits below ~30 px, she
  may still want a say); circle-engine centre label now steps outside a crowded ring at O.
- **Bookwork proofs walk WITH the sketch** (session G3, `sessions/G3-bookwork-walk-steps.md`):
  memo blocks may carry `hl` (reveal-shaped); `js/exam/_walk.js` resolves step k's picture
  = last hl ≤ k, else question; answer without hl = reveal. Opt-in per part — riders are
  pixel-identical through a walk. All four proofs authored; ticks arrive with "OA = OB",
  not the construction (no spoilers); tangent–chord's `90° − x` wedge lit but unlabelled
  (label landed under the O). Harness 9i checks the walk states; `tools/shoot_walk.py`
  captures every step (crops in tools/diags-walk, git-ignored).

Harnesses at ship: verify-exam 673/673 · modules **7374/7374** (+75) · fractions 5819/5819 ·
wrap 304 611/304 611 · exam-skills 41/41 · sweep.py A = 0, D = 0. Agent spend ≈ 0.29M Opus.

### ⏳ Pending on Megan
- (nothing — she checked the bookwork walk + spot-checks on her phone, 2026-08-23 night, all approved)

### Next up
- Today's build (she postponed it to a fresh session) — her brief to come.
- Cyclic-quad proof step 1: index "1" sits near the "O" (cosmetic, same spot as the
  approved "2x"); `.diag .pl` "O" reads like a zero at 375 px (pre-existing).
- Dice rounds for other chapters; calculator emulator round 2; two-circle riders (banked).

## 📌 Decisions (append-only, 2026-08-23 fix day)
- Caret exponents that are fractions render as superscript fractions; other `^(…)` stay as
  written (her call to revisit if she wants `2^(x+4)` superscripted too).
- A formula block's spaced ` · ` means "separate identity"; multiplication dots are tight.
- Bookwork walk pictures are cumulative and never light what the sentence hasn't said yet.
- Rider arcs: digits need ≥ ~30 px arcs on narrow wedges; uniform-small is for wide wedges.

---

# (previous head) Project status — updated 2026-08-23 evening (🏁 EXAM FOCUS FULL — 360 cards / 7 chapters LIVE, sw v62, XP 50/5 + eq9 migrations applied)

## 🏁 2026-08-23 — THE EXAM FOCUS BUILD DAY (Fable foreman, 13 Opus sessions, her /go)

Her brief: "by the end of today I want the exam focus to be full and complete" — every missing
skill from the SAGs + paper bank, siblings for every tile, Opus only, cost not the constraint.
Gap check first (SAGs pp 42–52 + `GR11-IEB-PAPER-BANK.md` + surveys), her eight rulings, then
the build. Plan + tile map: `EXAM-BUILD-DAY.md`; briefs: `sessions/`; SAG reasons:
`EUCLID-ACCEPTABLE-REASONS.md`.

**SHIPPED 2026-08-23 evening on her "yes, ship it": sw v62 live, both migrations applied + verified (pays_50/pays_5 true, eq9 closed, anon grant intact), live site serves all 360 cards with no page errors.**

**What exists now (harness 673/673, modules 7299/7299, fractions 5819/5819):**

| chapter | tiles | cards | notes |
|---|---|---|---|
| Algebraic Expressions (NEW exam-only `algx`, 🧩 mint) | 6 | 37 | Gr10 revision — her "where the 30%-ers earn marks"; first in the Exam Focus tab |
| Exponents & Surds | 7 | 43 | +rational-exponents-numeric, +surd-proofs |
| Equations & Inequalities | 12 | 78 | +quadratic-solving, +surd-equations, +simultaneous, +solution-count (eq9's tile) |
| Functions | 13 | 83 | +sketch, +intersection, +average-gradient, +reflections; 48 → 83 |
| Trig Graphs (NEW in Exam Focus) | 6 | 36 | her equations-only period/amplitude/range round is tile 1 |
| General Trig | 9 | 54 | +special-angles, +identities-undefined; identities + super-special-sums filled |
| Euclidean | 5 | 29 | 4 bookwork proofs (reveal draws the construction) + 17 chained riders + Level 4 |
| 2D Trig | — | hidden | `"trig"` out of `EXAM_CHAPTERS`; card + skills entry kept |

Every chapter ends in a full-width amber **Level 4 ★ — the brave round** tile; every ★ part
moved there (level wall = harness Part 13). Cards inside a tile run easiest first.

**Engines today:** trigg + quadtri wired into Exam Focus (`js/exam/trig-diagram.js`,
`quadtri-diagram.js`, schema dispatch); vertical-line captions (`x = k`, vertical asymptotes)
moved to a band UNDER the picture in both graph engines (her phone ruling — drills too);
circle-engine: additive `construction` field (reveal draws the proof's construction), bare-digit
angle labels auto-render small + inside their arc (`al-idx`), Euclidean found values go in the
colour KEY beside the circle (approved by her — wedges too small for "110°").

**Also today (her afternoon ask):** drill round **eq9 "Two, one or no solution?"** in Equations
from her 2-page notes (teach first → 10 picks: two (±) / one / none; `queseq9-solution-count.js`,
concept card `eqSolutionCount`), migration `supabase/migration-eq9-solution-count.sql` seeded
CLOSED (sort 93 — 80–92 are gtrig), + its Exam Focus tile.

**XP:** 50 XP + 5 💎 per card (config mirror done; `supabase/migration-exam-xp-50.sql` WRITTEN,
NOT RUN — goes in at ship).

Spend: ≈ 7M Opus tokens across 13 sessions + 3 fix sessions + foreman reviews (her ruling:
"don't worry about the cost").

### ⏳ Pending on Megan
- 📱 10 min [whenever, after ship]: Exam Focus → Algebraic Expressions → Factorise tile → two
  cards; Euclidean → Tangents → one full rider; Trig Graphs → Period/amplitude/range → one card.
- 🌐 1 min [whenever]: admin → open eq9 "Two, one or no solution?" for the learner who asked.

### Next up
- Her phone round findings (she reviewed sheets in chat today — all approved bar the three
  fixes, which are in).
- `.diag .pl` centre label "O" reads like a zero at 375 px (pre-existing font; cosmetic).
- Dice rounds for other chapters; calculator emulator round 2 (both carried from 08-23 morning).
- Euclidean two-circle riders impossible until circle-engine draws a second circle (banked).

## 📌 Decisions (append-only, 2026-08-23 build day)
- Exam scope uncertain (T2 "functions" = trig graphs or ordinary?) → BOTH built; over-prepare.
- Algebraic expressions = its own exam-only chapter, basics-first in the tab order
  (`EXAM_TAB_ORDER` in config).
- Levels 1–3 on normal tiles; every ★ lives on the chapter's Level 4 tile; no ★ note there.
- Euclidean Exam Focus stays pen-and-paper (NOT the interactive CQ rounds); one sketch per
  rider, 4–6 chained parts, found values accumulate in the KEY beside the circle; reasons are
  the SAG short forms verbatim; angle index digits small + inside the arc.
- Vertical-line captions under the picture, never on the sketch.
- Trig memos = textbook method, her story in hints/esplains; interval notation never (B8).
- XP 50 + 5 per card. 2D Trig hidden until it has exam content.
- eq9 pays XP every play (a drill she sends the learner back to), seeded closed.

---

# (previous head) Project status — updated 2026-08-23 morning (📈 STAGE 2 + whole-app sweep LIVE — sw v60 after her phone round)

## 📈 2026-08-22 → 23 — STAGE 2: function sketches in Exam Focus, 48 Functions cards, whole-app sweep (Fable foreman day, her "spend more to make the graphs look good")

sw v57 (the formula line-break sweep) was already live when the day started. Then, in order,
with every sketch read as a 375-px PNG by the foreman before the next session ran:

1. **Function-graph engine wired into Exam Focus** (`js/exam/function-diagram.js`,
   `_schema.js` type-dispatch, `exam-play.js`, `css/exam.css` dark-ink-on-white overrides).
   A `diagram.spec.type === "function"` routes to `js/engine/function-graph.js`; every spec
   is measured by `verifyFunction` at validation time (a point off its curve fails the
   harness). The four seeded Functions questions got their sketches.
2. **Engine polish** (`function-graph.js`): ONE placer for every label — axis letters,
   curve names (placed on the curve's normal), asymptote captions (`asymptotes[].label`),
   vline captions (`vlines[].label`), point labels — all dodge axes/curves/dashed lines/
   each other; weighted least-bad fallback; a labelled point must sit ≥ 0,5 units inside
   the window. Audit over 2 268 figures: 1 861 label faults → 158 (all in random chapter
   graphs with no free slot), 0 in exam specs.
3. **31 sibling cards** from her digest (`js/exam/func-siblings-*.js`, 8 files): every
   Functions tile now has 6 cards (17 → 48). Every card has a to-scale sketch.
4. **THE REVEAL RULE** (now in `_schema.js`'s diagram comment): the question side never
   shows the answer; the reveal side ALWAYS DRAWS it — asymptote/axis/tangent/`y = k`
   answers as dashed captioned lines, shifted graphs as a second tone-b curve with its own
   captioned asymptotes, inequality answers as shaded strips bounded by the cut lines,
   lengths as the segment at its true x. Highlight sets accept `curves`, `asymptotes`,
   `vlines`, `shades`, `points`, `segment`, `bare`.
5. **Wording pass**: 11 "from (a)" back-references on split cards reworded to state the
   fact; `formulaHtml` no longer nowraps a PROSE bracket.
6. **WHOLE-APP SWEEP (her bedtime ask, done by Fable itself)** — every chapter, every
   round, 25 generated questions per skill + every concept card, rendered through the real
   pipeline at 375 px and checked by `scratchpad/sweep.py` (now in `tools/sweep.py`):
   - **stacked fractions are UNIVERSAL**: `fracHtml` runs at every insertion boundary
     (questions.js `fmt`, modal cards + titles, play.js method box); `q.stackFractions` /
     `c.fractions` are no-ops kept for history. Tree-diagram branch probabilities are
     stacked in SVG by `tree-graph.js` itself. Prose slashes (`add/subtract`, `Left/right`,
     `yes/no`) stay slashes; `0°/360°` axis labels stay; `rise/run`, `O/H` stack.
     Fraction regex learned: decimal commas (`0,08/12`), `i_nom/n`, `f(x)/g(x)`,
     `sin 30°/cos 60°`, `a/sinĈ`, `1/x⁻ᵃ`, groups containing `<sub>` tags, a coefficient
     before a bracket (`3(n + 1)/4` → 3·[stack]), fractions right after a `>` tag.
   - **recogniser misses closed**: `cos(90° + x) = −sin x` is ONE unit (a right-hand side
     may open with a minus — her `90 + x` case); `ax² + bx + c`, `an² + bn + c`, `MN·MP`
     letter runs are atoms; `½`-style fractions are numbers; `sinM̂`/`cosA` are function
     atoms; `→ ⟹ ∴` chain a worked line; juxtaposition after a number (`½ ab sin C`,
     `5 cm`) glues; 2-letter English words never become atoms.
   - **the real CSS safety net**: `.fml .nowrap` is a shrink-to-fit inline-block with
     normal white-space + max-width:100% — one line whenever it fits, wraps INSIDE only
     when wider than the screen (overflow-wrap under nowrap was inert; 150 overflows → 0).
   - Final sweep: 0 split expressions, 0 real slash fractions, 0 page overflows; the 257
     remaining "breaks" are prose sentences using `=`/`×` as words.
7. sw v57 → **v58**.
8. **Her morning phone round → v59** (three finds, all fixed at the root): `f(x) &gt; g(x)`
   broke at the sign — authored HTML writes `>` as `&gt;` (now an operator) and `f(x)`/`g(x)`
   sat in their own `<b>` tags (inline tags are now TRANSPARENT to the scanner; pieces are
   rebuilt with the tags inside, balanced). A number pattern `−5 ; −10 ; −15` is one unit
   (`;` chains like `=`). fn7's "maximum length of AB" never stated f and g — it does now.
   Bonus: `fmtComma` emits the real minus everywhere (`g(x) = −1`, `y ≥ −3` were hyphens);
   `parseNum` accepts both signs.

Spend: ≈ 2,5M agent tokens across 8 sessions + foreman reviews (her ruling: don't stress
the tokens, make the graphs look good).

### ⏳ Pending on Megan
- 📱 5 min [whenever]: Exam Focus → Functions → any tile → play two cards through to the
  reveal, then one General Trig round and one Stats round (fractions) — say what looks off.
- 🌐 1 min [whenever]: remove Janko from the roster before the kids get access.

### Next up
- **Dice rounds for every other drill chapter** (her ask 2026-08-23). Dice is live for Stats
  only (`DICE_CHAPTERS = ["stats"]` in js/config.js); each further chapter needs its recipe
  pool in `js/quests/dice-pools.js` + the seeded `genAt` path, then the flag. Per chapter,
  PNG-reviewed like today. Order her call (suggest: finance → prob → eqn → exp → gtrig →
  func → meas → trig → tgraph → analytical → patterns).
- **Calculator emulator, round 2 (her ask 2026-08-23):** re-map her real calculator (the
  Casio she teaches on — photograph/keymap it again first) and add to the in-app calculator
  (`js/calculator.js`): x², √, sin/cos/tan (+ their inverses and the DEG mode), and brackets,
  with the same key order and display behaviour as the real thing. Reason: many rounds need
  calculator work and learners should practise the exact key sequence. Plan first, her nod,
  then build; the existing LCD/`MEAN_GLYPH` conventions stay.
- Siblings for eqn → exp → gtrig the same way (6 per tile, reveal rule, PNG review);
  Identities + Super Special Sums first cards.
- Small sketch nits to re-look at with her: `ineq.q2`'s three crowded x-axis labels;
  `sh.q3(b)`'s `(0 ; −3)` at a three-line crossing; `dist.q1(c)` draws the full line AB
  (no diagonal-segment primitive yet).
- XP: 75 XP + 10 💎 per card × 48 Functions cards — her call whether to re-tune (migration).
- `css/exam.css` is missing from `sw.js`'s SHELL precache list (spotted, not touched).

## 📌 Decisions (append-only, 2026-08-23)
- ARITHMETIC PATTERNS teach the Grade 11 shortcut ONLY: Tₙ = an + c, a = the constant
  difference ("start with 3n"), c = T₀ = T₁ − d (step back one). The a + (n − 1)d formula is
  Grade 12 and must not appear in Gr11 content (her ruling, phone round 2026-08-23; v60).
- A reveal DRAWS what it found (lines dashed + captioned, shifted graphs as a second curve,
  inequalities as painted strips). Question side never leaks the answer.
- Stacked fractions everywhere, app-wide; prose word-pairs keep their slash.
- An expression never splits across a line; only a piece wider than the screen may wrap
  inside itself.
- Every sketch state gets looked at as a PNG before it ships (the PNG harnesses live in
  `tools/`).

---

# (previous head) # Project status — updated 2026-08-22 late (📐 FORMULA LINE-BREAK SWEEP built + reviewed, sw v57 LOCAL — ship waits on her word)

## 📐 2026-08-22 (late) — FORMULA LINE-BREAK SWEEP, app-wide (stage 1 of exam skills approved)

Her phone: `x² / − 16` split across lines in Equations round 4's MCQ, and `√(2² · 3 · / 5²)`
split inside a bracket in the surds memo. She paused stage 2 (function sketches): "first do a
whole app sweep and fix all these lines". Also ruled: Exam Focus skill rounds "flow better
now"; the tiny stacked ¾ in an exponent STAYS.

Cause: `formulaHtml` (js/ui.js) only protected trig chunks and was opt-in per quest. Built
(Sonnet, Fable foreman brief + review, 416k agent tokens — over the 150–250k estimate):
`formulaHtml` is now a tag-aware scanner for ANY maths expression → `<span class="fml">`
(inline-block: moves to the next line WHOLE; wraps inside only if wider than the screen)
with `.nowrap` pieces (sign + operand, bracket groups, √ groups, stacked fractions, exponents
never split). Applied universally: questions.js `fmt` (all quests), modal concept cards,
play.js method box, doubletick pass prompts (gt8 — was a real gap). fracHtml stays opt-in.
sw v57. No SQL, no source strings changed. Commit `bda60e1`.

Proof (Fable's own runs): `node verify-wrap.mjs` 257 750/257 750; `verify-wrap.html` at
375 px in the browser 23 335/23 335 (⚠️ first run showed 0/0 — the OLD sw v56 served the
cached ui.js; unregister SW + clear caches before trusting any local harness page);
forced 240 px break of the surds line lands exactly before `+ √(2² · 3 · 5²)`; stacked
fractions inside `.fml` render one-line, aligned. verify-exam-fractions 821/821, all other
harnesses green per the builder.

Known harmless wart: lone letters in prose ("a calculator", "e.g.") get an invisible `.fml`
wrapper. Not touched: `rangeStr()` in funclib/tgraphlib emits a literal `<` as text — works
by browser tolerance; worth a tidy some day.

### ⏳ Pending on Megan
- 💬 1 word [blocking]: "ship" → push sw v57 live (no migration).
- 📱 3 min [whenever, after ship]: reopen PWA, Equations round 4 + Exam Focus → surds card
  1 → Walk; then one General Trig round with fractions.

### Next up
- **Stage 2 — Functions**: function-sketch engine (parabola/hyperbola/exponential/line, to
  scale) + 5–6 sibling cards per skill from the digest; then eqn → exp → gtrig; Identities +
  Super Special Sums first cards. Wording pass on the four "from (a)" cards.
- Janko (her brother) added to the live roster 2026-08-22 (username `janko`, visible, sets
  his own password on first login) — SHE removes him via the dashboard before the kids get
  access. Teacher dashboard has no add-learner button (only remove/reset); adding = one SQL
  insert or `mhq_admin_add_student`.

## 📌 Decisions (append-only, 2026-08-22 late)
- A maths expression is one unit: moves whole; breaks only at = or before a sign; never inside
  brackets/√/exponents/fractions. App-wide, not per chapter.
- Stacked fraction in an exponent (x^¾) approved.
- Function sketches come AFTER this sweep ships.

---

# (previous head) Project status — updated 2026-08-22 night (📝 EXAM FOCUS → SKILL ROUNDS, stage 1 ✅ SHIPPED, sw v56 live)

## 📝 2026-08-22 (night) — EXAM FOCUS BECOMES SKILL ROUNDS (stage 1), local only

Her play-test verdict: practice-paper questions dropped whole into the app felt "too
sudden" — no title saying what skill is being practised, no sketch, one lonely 5-part
question. Her drawing (EXAM-SKILLS-BRIEF.md has it): chapter → SKILL TILES → straight into
one short card → Done / Hint / **Walk me through it** → after marking, **Another one!** /
**That's enough for now**. Fable foreman, Opus (content) + Sonnet (UI) in parallel, ≈530k
agent tokens, foreman review on the combined tree with own harness runs + own 375 px walk.
Commits `cf2b175` (cards) → `a3f0d6e` (UI, sw v56) → `2c6eabe` (review fixes).

Built: `js/exam/skills.js` (27 skills: eqn 7 · exp 4 · func 8 · gtrig 6 · trig 1 · euclid 1)
+ `cards-*.js` turning the 21 seeded questions into **54 cards** by part (dependent parts
stay together as (a)/(b) — her ruling; 15 cards carry a hand-written `intro` with the
given information; all 77 source parts covered; hyp.t2q3 (c) deliberately on two cards).
Skill tiles 2-col grid, "worked k of n"; Identities + Super Special Sums tiles read "coming
soon" (no cards yet). Walk = memo one block per "Next step →", last step pays like Done.
Another wraps with a toast. **Every play starts fresh** (foreman ruling: a card is a drill —
replaying yesterday's card must let you try again; server still pays once). Stacked fractions
chapter-wide via fracHtml/formulaHtml at render time; 9 source strings hand-stacked, harness
`verify-exam-fractions.mjs` reports 0 bare slashes. Euclidean = one continuous round. 2D Trig
paused (one card, nothing new). Old topic list screen deleted.

Harnesses: verify-exam 260/260 · verify-exam-modules 353/353 · verify-exam-skills 41/41 ·
verify-exam-fractions 821/821 · verify-gtrig 1 036 917 green. No SQL, nothing pushed.

**SHIPPED the same night on her "you can ship it"**: pushed `cf21691` to main, GitHub Pages
serving sw **v56** + js/exam/skills.js confirmed by curl. No migration (none needed).

### ⏳ Pending on Megan
- 📱 3 min [whenever]: close + reopen the PWA (v56), Exam Focus → Functions → feel a card,
  Walk, Another, Enough on your phone.
- 💬 1 line [whenever]: x to the ¾ renders as a tiny stacked fraction in the exponent
  (Equations → Rational exponents & k-method, card 1) — keep, or back to x^(3/4)?

### Next up
- **Stage 2 — Functions first**: 5–6 sibling cards per skill from her digest
  (graph-quest/reference/GR11-FUNCTIONS-NOTES-DIGEST.md) + a function-sketch engine so
  hyperbolas/parabolas get a drawing (the hyperbola with no sketch was the pain point).
  Then eqn → exp → gtrig (+ Identities, Super Special Sums get their first cards).
- Wording pass: a few split cards still say "from (a)" / "in (b)" in hints/memos where
  that part is now on another card (list in the Session A report inside
  EXAM-SKILLS-BRIEF.md's commit, cards: hyp.t2q3 b, lp.q1 d/e, nor.q3 a/b, fr.q1 d). Intro
  supplies the fact each time; it's only wording.
- ⚖️ XP: server pays 75 XP + 10 💎 per completed card id — 54 cards pay 2,6× what 21
  questions did. Needs a migration to change; her call.
- Hayley's way card once she sends the wording · practice-paper mode UI.

## 📌 Decisions (append-only, 2026-08-22 night)
- Exam Focus = skill rounds, not whole paper questions. Chapter → skill → cards.
- Dependent parts stay on one card; independent parts split.
- Learner decides when to stop: Another one! / That's enough for now. No finish line.
- Every play of a card starts fresh; server pays once ever.
- Euclidean stays one long round; 2D Trig paused until after September scope.
- Stacked fractions everywhere in Exam Focus — no slashes.
- "Walk me through it" stays: same memo, one step per tap, last step counts as Done.

---

# (previous head) Project status — updated 2026-08-22 evening (🔄 GENERAL TRIG LIVE + her phone-review fixes SHIPPED, sw v55; rounds 5–7 reordered)

## 📱 2026-08-22 (evening) — HER PHONE PLAY-TEST → 15 fixes, shipped (sw v55, commit a215e28)

She play-tested every round on her phone and sent 15 findings; Fable fixed them directly
on her ask ("can you maybe fix this yourself?"). Rulings now law: **discovery rounds 1–3
pay XP every play** (questions rotate — the xp-once rule is gone); **rounds 5–7 = TIP
Chips → variables → numbers** (ids unchanged; live `sort` swapped via
`migration-gtrig-reorder.sql`); **boundary values follow the plain sign rule** (cos = 1
→ tick I AND IV); **round 10's no-sketch items cut** ("the whole exercise is to read
from a sketch"). Built: stacked fractions chapter-wide (`js/ui.js fracHtml`, per-quest
`stackFractions`, no slashes anywhere); formula chunks never wrap, trailing brackets
like "(90° ± θ)" start on a new line (`formulaHtml`); concept-card identities one per
line; the solution panel's reason column wraps (it pushed the page sideways); a chain
that needed a retry gets a calm amber "Got there" verdict, never the red block; **round 8:
the learner MAKES the two ticks** (two colours, one cross — `doubletick`) then fills the
sketch with ONE keypad, each side appearing on the drawing (`sketchfill`); the bow tie is
a real bow tie; angle/side labels placed by wedge width / true perpendicular; round 3
value questions show the O-A-H table. verify-gtrig 1 037 352 green, every other harness
unchanged-green. Live migration `gtrig_reorder`: learner tables byte-identical.
⚖️ She likes round 10 (super special sums) — keep that shape.

### ⏳ Pending on Megan
- 📱 3 min whenever: re-feel round 8 (make the ticks, fill the sketch) and round 4's
  triangle on your phone — close and reopen the PWA first (v55).

### Next up
- **Exam Focus "walk me through it"** (her ask 2026-08-22): a third button next to
  "Done! Show me the answer" / "I'm stuck" that reveals the existing memo ONE step at a
  time with a Next button. No new content — same memo, paced. Small build.
- Hayley's way card once she sends the wording · practice-paper mode UI · overnight #2.

---

# (previous head) Project status — updated 2026-08-22 (🔄 GENERAL TRIG: all 13 rounds ✅ SHIPPED, sw v54, migration applied — rounds seeded CLOSED, open them in admin as you teach)

## 🔄 2026-08-22 (day, unattended) — GENERAL TRIG CHAPTER BUILT, stages 1–4, local commits only

Fable foreman (unattended, her /go in GENERAL-TRIG-FOREMAN-BRIEF.md), Opus ×2 + Sonnet ×2
build agents (≈1,67M agent tokens), every stage foreman-reviewed with own harness runs,
own 375 px plays and rendered sketches LOOKED at. Full report: **GENERAL-TRIG-BUILD-REPORT.md**
(start there — its top paragraph is the between-lessons read). Commits `d6a4b52` →
`bbea71b` → `c711f81` → `dbb81d5`. Chapter `gtrig` "General Trig" on the Revision tab,
13 rounds gt1–gt13 in her order; new plumbing (`steps` chains, her tick `tapcross`,
`tokenpad`, `quadtri` engine with verify(), `reveal` frames, trig-graph `bands`, `mcmulti`);
discovery rounds 1–3 pay XP once (`xpOnce` + `xpToSubmit` in play.js); the two trig exam
questions moved under a General Trig tab in Exam Focus with "I'm lost" → gt5 / gt11 (her
phone ruling mid-build); Mixed Problems stays under 2D Trig. verify-gtrig.html 1 058 724
checks green; all other harnesses unchanged-green. Her laptop died once mid-stage-3 —
nothing lost (commits), stage relaunched.
**SHIPPED the same evening on her "Yes, you can ship"**: migration `gtrig_quests` applied via MCP — students/progress/blips hashes byte-identical before and after (21 / 27 / 3 rows), the 79 existing quest rows byte-identical, 13 new gt rows all closed; sw v53 → **v54**; pushed to main.

### ⏳ Pending on Megan
- 💻 1 min when teaching starts: open gt1 in admin (all 13 are seeded CLOSED).
- 📱 3 min after the ship: feel round 1 (circle frames) and round 8 (triangle appears
  after the quadrant tap) on your phone.
- 💬 1 line whenever: round 12 treats `sin 3A = cos 60°` as "no reference angle" (your
  p60 type ⑥) — fine, or only when both sides carry the variable?

### Next up
- Open gt1 in admin when teaching starts; Hayley's way card once she
  sends the wording; practice-paper mode UI · overnight #2 content run.

---

# (previous head) Project status — updated 2026-08-22 (📝 EXAM FOCUS: 21 questions / 5 chapters incl. EUCLIDEAN exam-only chapter ✅ SHIPPED, sw v53)

## 🚀 2026-08-22 (morning) — BUILD DAY SHIPPED: register + Euclidean chapter + trig digest (sw v53, commit 537d863)

Fable foreman, Sonnet registration + Opus Euclid/digest/Esplain agents, her "Yes! You can
ship". Live now: Exam Focus = eqn 9 · exp 3 · func 4 · trig 3 · **euclid 2** (exam-only
chapter: `EXAM_ONLY_CHAPTERS` in config.js, never in hub/dice/admin; eligible on its flag
alone; NO "I'm lost" by her ruling). CQ engine ported as `js/exam/circle-engine.js`
(verbatim + additive `o.mark:"square"`; highlight helpers); `diagram` is a validated
schema field; per-part figure with that part's highlights. Harness 176/176 browser,
353/353 node; foreman looked at every figure render. `METHODS-trig.md` (her 68 pages;
six named general-solution types; 18 flags — F3/F12/F13/F14/F18 want one line from her
when convenient) + `TRIG-DRILL-ROUNDS-PLAN.md` (her 13 rounds verbatim). Trig exam
Esplains/hints rewritten in her voice, memos untouched (her ruling: method = textbook).
Also today: both Sept practice QPs re-laid to her layout rulings (every question on a
new page; ≤2 algebra parts per page) — ruling recorded in GR11-PAPERS-PROJECT.md.
No SQL today. ⚠️ `*.pdf` now gitignored — her notes scans sit in the repo folder.

### ⏳ Pending on Megan
- 🖨 whenever: print the two Sept practice papers (Sept Practice folder).
- 💻 2 min [whenever]: five one-liners for METHODS-trig flags (rationalising convention,
  "Hayley's way" wording, R3 triangle-derivation wording, p53 duplicate family, p04 word).
- 📱 3 min [whenever]: open Exam Focus → Euclidean Geometry on your phone and feel the
  diagrams + highlighting (foreman-looked, not phone-felt).

### Next up
- Trig drill rounds chapter (her 13 rounds) — needs a design pass + migration; then the
  two trig exam modules' lostQuest point at it.
- Practice-paper mode UI · overnight #2 content run.

---

# (previous head) Project status — updated 2026-08-22 early hours (📝 EXAM FOCUS SPEC CORRECTED + OVERNIGHT RUN #1 ✅ DONE, local commit only)

## ⚖️ 2026-08-21 LATE NIGHT — THE CORRECTIONS SESSION (read EXAM-FOCUS-PLAN.md's Corrections before ANY exam work; it SUPERSEDES the session-E head below where they clash)

Megan came in in tears after a day of sessions defending "rulings" SHE NEVER MADE.
Direct hearing with Fable → EXAM-FOCUS-PLAN.md rewritten. The three corrections,
now law: **(1) "NO Euclidean chapter" was never her ruling** — CQ owns circle-geo
drills, but Euclidean EXAM questions belong in Exam Focus (diagrams via a port of
CQ's `engine.js`, which already has `o.hl` marker-pen highlighting; tap-interactivity
banked for next year). **(2) No "digest-first rule" ever existed — exam focus AND
dice** (the session-E note "digest-first stays dice-only" below is superseded) —
her methods govern exactly three chapters via files that all already exist:
algebra `METHODS-algebra.md`, finance `FINANCE-METHOD.md`, functions
`graph-quest\reference\GR11-FUNCTIONS-NOTES-DIGEST.md`. Everything else: standard
Gr11 methods, her memo STYLE universal. **(3) Per-question vetting gate REMOVED** —
weeks of Gr12/physci papers proved the engine; the harness is the gate, she
spot-checks at will. Also ruled: one-pipeline-two-outputs (print paper + seeded
modules; "by topic" + "practice paper" doors), 5 questions/topic to start, Sept
scope first, ENGLISH ONLY incl. print (AF = December), overnight sessions are the
standing production mode. Her three METHODS flag answers recorded in that file:
F1 no solution · F2 ± only when solving · F5 both roads, hers leading.

## 🌙 2026-08-22 (early hours) — OVERNIGHT RUN #1, Fable foreman + 2 Opus writers ✅

Full report: `OVERNIGHT-1-REPORT.md` (start there). Delivered: **Sept T1 + T2
practice tests** (50 marks each, QP + colour memo PDFs + blueprints + re-runnable
verify scripts) in `Desktop\Eksamen Vraestelle\Gr11 IEB Nov\Sept Practice\`, and
**17 exam modules in `js/exam/`, all UNREGISTERED** (5 = T1 paper, 4 = T2
non-Euclidean, 6 fresh top-ups incl. nature-of-roots #5 on the perfect-square-Δ
skeleton; 2 Euclidean modules + CQ diagram specs wait in
`js/exam/_pending-engine-port/`). Every number derived twice by independent routes;
module harness 325/325; foreman re-derived both papers by hand. One print-memo digit
fixed (83,4466→83,4465, final answer was always right). ⚠️ Durable finds: **nothing
in the app teaches reductions/general solutions** (trig chapter is 2D-trig only) —
2 trig modules carry safe lostQuest placeholders (verified: degrades to no link,
never a throw); **no euclid chapter exists** and `examChapterEligible()` requires an
open quest, so Euclidean seeding needs her ruling; `js/exam/index.js`'s header still
carries the stale "NO Euclidean, her ruling" comment — fix on registration day.

### ⏳ Pending on Megan (this run)
- 💻 2 min **[blocks Euclidean seeding]**: pick the Euclidean home (small euclid
  chapter vs gate exception) — see OVERNIGHT-1-REPORT.
- 💻 1 min **[blocks 2 reteach links]**: want reduction/general-solution drill
  rounds built, or ship those two questions linkless?
- 🖨 whenever: print the two papers (say if trig graphs should swap into T2 — a
  5-mark swap is pre-designed — or if the folder should move to Graad 11 Curro).

### Next up
- Day session: seed + register the 15 non-Euclidean modules (file headers carry the
  exact steps; 6 pilot-era harness assertions need updating).
- Day build: port CQ engine.js + wire the 2 pending Euclidean modules (2 known gaps
  in their README). Then practice-paper mode UI.
- Overnight #2: menu at the bottom of OVERNIGHT-1-REPORT.md.

---

# (previous head) Project status — updated 2026-08-21 (FOREMAN DAY #5 ✅ SHIPPED end to end: dice-sibling fix + 💙 MOOD/CRAVINGS + 📝 EXAM FOCUS pilot + session E rulings, sw v52)

## 🔧 2026-08-21 (even later) — SESSION E: her three live-review rulings, SHIPPED (sw v52)

She walked the shipped pilot on her phone the same night: dice "Try a similar
one" **confirmed working**, mood/cravings **confirmed** ("I fed blip, it's
adorable"), exam focus "looks amazing" — with three change rulings, built as
session E (commit `a82f011`) and foreman-reviewed (verify-exam 130/130, my own
walk: link lands inside eq8's real round):
1. **English-only for now** — EN/AF toggle CUT (too much AF work without
   proper material; AF returns next year). Schema: `af` optional; the pilot's
   dormant AF stays; future seeding composes EN-only.
2. **"I'm lost" reteaches** — required `lostQuest {chapter, quest}` per
   question (pilot → eq8); a quiet link under Done/Stuck jumps into that round,
   shown ONLY while the round is open. Exam focus never opens a closed round.
3. **Exam focus follows the teacher's gates** — chapter eligible = build flag
   AND ≥1 open quest (`examChapterEligible()` in screens.js, used by tab,
   cards, both nav guards and the player). Checked live: all eq1–eq8 are open,
   so the tab stays visible for her.
Also her model confirmation (option A): ONE hub Exam Focus tab holding every
chapter's paper questions, chapter → topic → question. And the plan's content
law is corrected in **EXAM-FOCUS-PLAN.md's ADDENDUM** (read it before ANY
exam-focus content session): content = practice-paper questions from the bank
recipe; her built memo corpus is the method authority; EVERY chapter eligible
— the digest-first rule stays dice-only.

---

# (earlier the same night)

## 🛠 2026-08-21 (late night) — foreman day #5: four sessions, reviewed + SHIPPED

Fable foreman, four Sonnet builds (~1.46M agent tokens, inside the 1.5–2M
estimate she approved). Commits `d08100e` → `a097bcc` → `d0bc37c` (foreman
review fix) → `c252197` → `ce5e491` → the ship commit. Every session
foreman-reviewed with fresh proof: mechanical copy-forward diffs, own harness
runs on clean ports, own 375px walks.

**THE SHIP (her "yebo", same night):** both migrations applied to live via MCP
(`mood_meter_and_cravings`, `exam_focus_infrastructure`). Learner-row hashes
(students/blips/progress) **byte-identical before and after** (21 students,
3 blips, 24 progress, 4,760 XP); mood columns landed default-closed on all 3
blips. migration-check all-PASS: both new helpers revoked from anon AND
PUBLIC (acl = postgres + service_role only), both learner RPCs open, zero
unpinned search_path in the whole schema, no direct anon table reads.
Throwaway-learner smoke on live, deleted after with counts+hashes verified
back to baseline: craved food (mielie) paid +2 mood, broccoli +1, cookie +1
(mood 0→2→3→4), decay formula 5→3→0, exam q1 parts a–c paid 0, part d paid
exactly 75 XP + 10 💎 (gold arithmetic verified to the item prices), replay
paid 0, wrong password refused. sw v50 → **v51**, pushed, live-verified.

**A — dice "Try a similar one" FIXED.** Her live find: the button skipped to a
different concept (mean wrong → std dev next). Root cause: session-0b's
`onSibling` shortcut deliberately advanced in dice mode while the label
promised a similar one. Now it re-presents the SAME skill salted (fresh
values), and **first-answer-counts** governs XP/record: retries are free
practice, can't farm, and the fix also closed a real pre-existing hole where a
calcdo wrong→retry-correct overwrote the saved false and paid full XP.
Resume-mid-retry traced safe (save checkpoints on the first answer).
verify-dice 114 → **134** checks.

**B — 💙 MOOD METER + CRAVINGS** (her 1+2 pick from the morning's food
brainstorm — bought food finally DOES something). Hearts 0–5 per blip by the
nickname; overnight −2; cookie +1, any food +1, the day's craved food +2
(craving = deterministic per blip per day via hashtext, server-side in ONE
helper so it can't be spoofed; only from tiers the learner has unlocked, never
soup/medicine/treat). Craving = thought bubble by Blip (tap → food sheet,
hidden while he refuses food); craved feed plays the existing *excited*
moment + floating +2. Mood ≥4 → occasional spontaneous wink/hop (existing
moments only, NO new art); ≤1 → quieter. Mood touches NOTHING mechanical —
growth stays cookie-only, XP/gold untouched. Server: 2 columns on blips,
helpers `_mhq_mood_effective`/`_mhq_craving`, re-creates
mhq_get_state/mhq_feed/mhq_eat_food/mhq_care (4th = the care-day +1, a
flagged deviation the foreman accepted). Foreman review fix `d0bc37c`:
execute REVOKED on both new helpers (the _mhq_roll_loot precedent — B forgot).
⚠️ mhq_feed's body was restyled (v_-prefixes dropped) — verified functionally
identical to its base line by line; future copy-forwards of mhq_feed should
base on THIS migration's copy. verify-store ~3,990 → **~4,030**.

**C — 📝 EXAM FOCUS infrastructure** (EXAM-FOCUS-PLAN.md session 0), shipped
flag-off. Hub tab (only renders when EXAM_CHAPTERS is non-empty) → chapter →
topic ("worked N of M") → question → the part player: pen-and-paper opener,
ONE part at a time with the chain kept visible, Done!/I'm-stuck buttons, hint
local-only (never reported — no policing), colour-memo reveal (✓a/✓ca/✓s/f
tick pills per method line, ANSWER bar, amber trap card), the two marking
laws under every memo, ★+bank-the-marks note on ACTIVE level-4 parts (note
correctly disappears once revealed), Esplain 🤔, EN/AF toggle in the tab
header remembered per device (`mhq.examLang`). Supabase: `exam_progress`
table + `mhq_exam_state`/`mhq_exam_open_part` (⚠️ brief said "three RPCs" —
two exist, completion+pay folded into open_part, correct reading). Pay = 75
XP + 10 💎 per completed question ONCE ever (her kickoff ruling; server
literals, config `EXAM` block is display mirror, harness cross-checks).
mhq_get_state deliberately NOT touched (A/B already re-created functions
today — C stayed order-safe). New harness verify-exam.html.

**D — pilot topic seeded: eqn / nature-of-roots** (foreman's pick inside her
September-T1 steer; Functions is blocked by her own digest-first rule — no
methods digest exists for it). Four fresh questions (11/12/13/13 marks, 4
parts each, easy → hard, ★ tails on q3/q4), composed from GR11-IEB-PAPER-BANK
archetypes with all-new numbers, memos in her METHODS-algebra.md language
(B11 table wording, B12's three k-shapes, ∴ habit), EN+AF throughout.
**Foreman re-derived every number by hand — all correct** (Δ = 25/28/16−8k/
16+4k/p²−4p+8; k = −4 with root 2; the k<2 ladder; largest-integer k = 0
after k=1 rejects; (p−2)²+4 never-equal proof). Neither of the digest's two
open flags is touched. `EXAM_CHAPTERS = ["eqn"]` is COMMITTED ON — safe
because the class is not yet invited; her phone test gates everything
further. verify-exam **101**, scope-wall + independent-recompute checks in.

### Decisions (2026-08-21 evening, hers unless marked)
1. Fix the dice similar-one bug FIRST; fold mood+cravings into the day.
2. Mood design = brainstorm options 1+2 (mood meter + craving of the day).
3. Exam pay: **75 XP + 10 💎, once per question ever** (kickoff pick).
4. EN/AF toggle: **tab header, remembered on device** (kickoff pick).
5. Dispatch mode: Fable ran the agents (day gate = the ~1.5–2M estimate).
6. **Her picker name stays UNHIDDEN until the app is completely done** — the
   re-hide moved out of [blocking]; do it with the go-live/invite work.
7. Foreman defaults awaiting her nod (retune = one line each): mood numbers
   (cap 5, decay 2/day, gains cookie 1 / food 1 / craving 2 / care 1);
   craving also excludes treat (unearnable otherwise); mood/craving hit is
   household-wide (matches feed_count's shape); pilot topic choice; the eqn
   scope wall sourced from eq1–eq8 + METHODS Part E (bank has no eqn wall).

### ⚠️ Known / accepted
- **Exam RPC trust model = mhq_submit_quest's exact model** (client-named
  question ids; submit_quest even takes client-named XP ≤1000/call — checked
  during review). Same dev-tools-farming watchpoint class she ruled on for
  dice: raise once WITH DATA if the shop distorts, don't nag, don't harden
  one door while the older bigger one stays open.
- Local python test servers throw one benign "unknown error fetching script"
  (service-worker registration) — environmental, not app code; live Pages
  registers fine.
- verify-store's schema↔migration byte-compare now tracks
  migration-mood-cravings.sql as the latest carrier of those function bodies.

### ⏳ Pending on Megan
- ~~dice "Try a similar one"~~ — **CONFIRMED working by her, same night.**
- ~~mood/cravings phone look~~ — **CONFIRMED by her, same night** ("adorable").
- 📱 3 min **[before more exam chapters ship]**: proper examiner pass on the
  four nature-of-roots questions (EN only now) — maths, wording, memo lines.
  Her UX verdict ("looks amazing") is in; this is the content vet.
- 📱 1 min **[blocking dice chapter 2]**: the remaining half of the dice test —
  close a 🎲 round mid-question, reopen, same question should return.
- 💻 2 min **[whenever]**: the two METHODS-algebra calls (√9 = ±3 box; which
  road first for rational exponents / surd equations) — no longer blocking
  exam content (memo corpus is the authority there), still worth answering.
- 🌐 **[at go-live, not before]**: re-hide `megzieberr` in the picker (her
  ruling today: stays visible until completely done).

### Next up
- **THE OVERNIGHT EXAM-CONTENT BATCH (her stated plan)**: separate session(s)
  build exam focus content for every chapter with the paper recipe
  (GR11-IEB-PAPER-BANK.md + survey + her built memo corpus as method
  authority). ⚠️ Read EXAM-FOCUS-PLAN.md's ADDENDUM first — EN-only, required
  lostQuest per question, fresh numbers, scope walls. One session per chapter;
  suggested order: Term 3 first (stats/finance/prob/trig/meas, ~1.2–1.8M
  tokens) then the rest (full sweep ~2.5–3.5M). Flags per chapter flip after
  her examiner pass; the class invite stays the real gate.
- Dice chapter 2 = Trig Graphs (after her resume phone-check; needs the shared
  Soek-die-fout mechanic coordinated with graph-quest).
- Mood numbers retune if her phone-feel disagrees with the defaults.

---

# (previous head) Project status — updated 2026-08-21 night (🎲 DICE DAY + playtest fixes ✅ SHIPPED, sw v50)

## 🔧 2026-08-21 (night) — her playtest's four fixes, SHIPPED same evening (sw v50)

Her phone test passed except four finds, all fixed + foreman-verified
(verify-dice **114/114**, verify-store all green, both my own runs):
1. **Dice retry dealt identical values** — genAt() gained an attempt `salt`
   (0 = old hash byte-for-byte, so resume untouched); play.js passes
   attempt−1. ⚠️ The foreman brief's root cause was WRONG — "similar one"
   advances fine; the bug was the same-index re-present paths (calcdo "Try
   again" + the "I'm lost" return). The fix session refuted-and-fixed.
2. **👁 password eye** on all 4 password inputs (first-login pair, ?u=1,
   admin) — her ask after nearly locking herself out setting a password blind.
3. **x̄ macron skew** — calculator.js's `.lcd-ov` border-top recipe extended
   app-wide (`xbarHtml()`), every render boundary incl. MC option labels.
4. **Blip's cookie teleport** — MEASURED root cause: `.blip-happy`/`.blip-refuse`
   keyframes set `transform` without the stage's `translateX(-50%)`, replacing
   (not composing) the centring for the animation's duration — a 45.75px jump
   = exactly half the stage width. Every keyframe step now carries the
   translate (matching `.feed-target-over`'s existing precedent). Zero jump
   after; sprite frames proven innocent (centroids sub-pixel stable).
Also that evening: **her picker name unhidden for playtests** (see Pending —
re-hide before the class invite) and the ⚠️ record fix: the second hidden
adult account is **`lize`**, not "Michaela M" as the bridge-day notes said.

---

# (previous head, same day) Project status — updated 2026-08-21 evening (🎲 DICE DAY ✅ SHIPPED, sw v49)

## 🎲 2026-08-21 (evening) — THE DICE PILOT, SHIPPED (sw v49)

Foreman day (4th run): Fable briefed/reviewed, three Sonnet builds + one Opus
digest, ~1.55M agent tokens (re-approved mid-day when the first estimate
proved 2× light). **`migration-dice.sql` applied to live via MCP**, sw v48 →
**v49**, pushed. The 🎲 dice deals freshly generated rounds — **Statistics
only** (`DICE_CHAPTERS = ["stats"]` is the switch; every other chapter off).

**What shipped, in order:**
- `DICE-AUDIT.md` (0a): all 530 skills classified — 370 CLEAN / 143 CARE /
  17 STATIC. Headline: Blipwork already rolls fresh numbers per play; the
  dice's real job is dealing outside the teacher-gated sequence. Trig Graphs
  (45/46 CLEAN) is pilot #2; ⚠️ Measurement has a real engine blocker (fixed
  label offsets → curated "safe proportions" lists) — her call before its turn.
- `METHODS-algebra.md` (Opus digest, 196 handwritten pages): 28 skills in her
  own language (TIP Chips, guns/helmets, divorce, KFC), page-cited, memo tick
  cues, 15 flags (2 need her: the `√9 = ±3` box vs her practice; two-roads
  ordering for rational exponents + surd equations), 12 not-covered items.
- Dice infrastructure (0b): seeded regeneration (mulberry32; save = seed +
  skillIds + index, NEVER serialized questions — resume regenerates), rng
  indirection in `js/rng.js` (static play byte-identical), coverage-first
  dealing in `js/dice.js`, stat-free player branches in `play.js`, always-on
  "Show me the method" link (`q.method`), admin 🎲+count cell,
  `verify-dice.html`. `_mhq_dice_xp` mirrors config.js's 10×min(streak,3)+5.
- Statistics pool (1): all 58 skills REUSED from quest01–08 (guards ride
  free), roundLength 7 (median), kind = skillId (58 kinds, coverage in 9
  rounds), method text 58/58 from existing solution arrays.

**Foreman review, fresh-proof:** copy-forward diffs of the re-created
`mhq_get_state` (base: migration-cq-bridge) and `mhq_admin_data` (base:
migration-phase3 — schema.sql's copy was ALREADY stale pre-day, missing
`assignment`) verified mechanically — only the dice blocks differ. My own
harness runs on a clean origin: verify-dice **111/111**, verify-store
**"all 3990 checks passed"** (a session-1 report line saying "4/3998 wobble"
was the known count-wobble, misworded — nothing red). Math.random sweep: quest
generation fully routed; remaining direct calls deliberate (deal shuffle,
confetti, local-backend loot).

### Decisions (2026-08-21, hers unless marked)
1. Fable dispatched the build agents; mid-day spend re-approval ~1.4–1.7M.
2. Dice round length = same as the chapter's static rounds (7 for stats).
3. Dice is STAT-FREE learner-side; dashboard gets 🎲 + play count only.
4. **EXAM-FOCUS-PLAN.md written and fully ruled** (the fear-first pen-and-paper
   tab; colour-memo reveal; ⚖️ "Esplain" is her term, NOT a typo; XP yes; no
   Euclidean chapter — CQ covers it; progress remembered; EN+AF pairs).
   She runs that build "tomorrow".
5. Foreman default she ratified at ship: dice XP pays per-question
   streak-capped (every play like a first play) — full-XP ruling, no replay
   discount.

### ⚠️ Known / accepted
- A dev-tools kid could stuff a fake save to farm dice XP/gold — same surface
  class as replay-farming; her DICE-PLAN watchpoint stance applies (raise
  once WITH DATA if the shop distorts; do not nag).
- Stale service workers poisoned test origins THREE times today (5213
  included). Recipe: unregister SW + delete Cache Storage + cache-reload every
  changed file + full navigation, or a genuinely new port.
- `dice-stub.js` stays as a harness-only fixture, unreachable from the app.

### ⏳ Pending on Megan
- 📱 3 min **[blocking dice chapter 2]**: open Blipwork → Statistics → tap 🎲
  → play a round → close mid-round and reopen (same question should return).
- 🌐 1 min **[blocking — BEFORE the class is invited]**: re-hide her picker
  name (one SQL line: `update students set hidden = true where username =
  'megzieberr'`) — unhidden 2026-08-21 evening at her request FOR PLAYTESTS
  ONLY. The other hidden account (`lize`) was never unhidden. Any session
  doing the go-live/invite work must check this first.
- 💻 2 min **[whenever]**: two METHODS-algebra calls — the `√9 = ±3` box, and
  which road shows first (rational exponents; surd equations).

### Next up
- **Tomorrow (her word): the exam focus build day** — EXAM-FOCUS-PLAN.md is
  ready; kickoff details = XP amount, EN/AF toggle placement.
- Dice chapter 2 = **Trig Graphs** after her phone test — needs the Soek die
  fout mechanic coordinated with graph-quest (build once, share).
- Later: Measurement's engine-label decision; Finance needs a verify harness
  before its dice turn; f5 `anyPoint`/p6 `atLeastOneHead` need generalizing.

---

# (previous head) Project status — updated 2026-08-21 (CQ BRIDGE DAY ✅ SHIPPED, sw v45)

## 🌉 2026-08-21 — THE WHOLE CQ↔BLIPWORK BRIDGE DAY, SHIPPED (sw v45)

Foreman day (3rd run): Fable planned/briefed/reviewed, four Sonnet agents
built, Fable shipped. All three migrations applied via MCP
(`roster_login_picker_replaces_signup` → `cq_bridge_watermark_and_credit` →
`price_the_free_tier_and_close_gaps`), **the 19-learner roster seeded from
CQ via MCP** (both adult test accounts excluded, her ruling; spellings
copied verbatim, verified 1:1), the `collect-cq` edge function deployed
(verify_jwt OFF — the client's `sb_publishable_` key is not a JWT; the
function's real auth is the username+password bcrypt check inside).
verify-store ended **~3,999 green** (3,747 at day start). Learner-data
checks: blips/progress counts and gold/xp sums byte-stable through all
three migrations; students changed only by design (new columns, 2 test
rows hidden, 19 seeded rows).

**What the app now is:** login is the CQ-style NAME PICKER (self-signup is
gone, `mhq_signup` dropped); the hub has a third **⭕ Circle Geo** tab with
an "Open Circle Quest" out-link; a **💎 Collect** button pays CQ XP as
diamonds at `app_config.cq_rate = 30` (delta/watermark design — replays
and future CQ chapters flow through forever, remainder banks); and
**nothing in the cosmetic shop is free any more** (8–15💎 starter band,
butterfly-wing 60/L4 fills the wings gap, gold-shades 130/L8 is Eyes'
first rare; all 63 rows re-sorted price-ascending per slot).

### ⏳ Pending on Megan
- ~~the collect-cq secrets~~ — **DONE same day** (she set both in the
  Blipwork project; full paid-collect smoke test then ran green: 100 CQ XP
  → 3💎, replay → 0, +35 XP → 1 more with the remainder banked exactly;
  throwaways deleted from both sides, counts verified back to baseline).
- ~~📱 the go-live eyeball~~ — **DONE 2026-08-21** (she reopened the PWA
  through v45–v48 and confirmed: picker shows the 19 names and none of hers,
  `?u=1` works, ⭕ tab opens CQ, no "Free" in the shop). Nothing pending.

### Decisions (2026-08-21, all hers unless marked)
1. **Dispatch mode: Fable ran the build agents** (her call at day start —
   the /go block + ~500-700k estimate was the day's fan-out gate).
2. **Michaela M is the second adult** — excluded from the roster with Megan.
3. **RATE 30** (≈203💎 median learner on first collect) — approved at ship.
4. **The price table** (8–15 starter band + the two gap moves) — approved.
5. Foreman defaults she ratified by shipping: ex-free cosmetics ENTER the
   treasure-box loot pool (price>0 is the one rule); gold-shades joins the
   milestone rare pool; butterfly-wing/gold-shades moved girly/gangster →
   basics (their old collections' "?" cards would have hidden the new
   levels).
6. **`?u=1` login fallback** (session-1 review rider): hidden test accounts
   are otherwise unreachable from a fresh device. URL-only, no UI hint.
7. ⚠️ `migration-roster-login.sql` is **ONE-SHOT** — a re-run after the
   seed would hide the whole class from the picker (header says so now).

### Even later (sw v47/v48) — admin wide view, her two layout calls
- v47: admin container 800px → laptop width (min(96vw,1500px)); learner
  chip clusters flow side by side; action buttons stack vertically.
- v48: the Quests open/close chapters sit NEXT TO each other as compact
  grid cards (330px min) — toggles beside their rounds, ~⅓ the scrolling.
- Her question answered, no change made: kids can't rename usernames or
  display names, BY DESIGN (display name = the picker/roster label; the
  username shows in the gallery per her old ruling; the CQ bridge keys on
  cq_name so renames could never break it anyway). The kids' outlet is
  the Blip nickname. A playful-gallery-handles idea = its own future
  design talk, name filter included.

### Later the same day (sw v46) — admin restyle + tour fix
- **Admin dashboard restyled to the G7 pattern** (session 5, her ask after
  seeing the comma-list): learner rounds render as per-chapter chip
  clusters (green passed / orange tried / grey untouched, tooltip = chapter
  · title · best% · played date), and Quests open/close is grouped per
  chapter with "N / M open" + Open all / Close all (client-side loop over
  the existing per-quest RPC — no chapter RPC exists, none added).
- ✅ **Tour-survives-logout FIXED** (session 6): root cause was the overlay
  mounting on `<body>` above `#app`'s z-index with no teardown on
  navigation. `closeActiveTour()` now runs at the top of `app.go()` — every
  navigation clears a live tour. A nav-driven close counts as "seen", same
  as skip. Auto-fire-once + ❓ replay unchanged.
- ⚠️ Process note: session 5's agent REFUSED a mid-session task relayed by
  SendMessage even with approval described — a fresh spawn with the /go
  block at the top of the brief worked. Mid-session scope extensions want
  a new stamped brief, not a chat relay.

### Known issues / for a future session
- ⚠️ **Port 5191's browser cache poisons module loads** (bit two agents AND
  the foreman today): fresh screens.js + stale config.js = SyntaxError
  "does not provide an export named CQ_URL", or worse, silently stale
  behaviour that mimics data bugs. Recipe: `fetch(url,{cache:'reload'})`
  EVERY changed file (transitive imports too), then full navigation; or
  use the maths-quest-s3 config (port 5213) for a clean origin.
- chunky-chain (L7) still hides behind gangster's L20 collection card —
  pre-existing quirk, deliberately not touched by the pricing pass.
- ~~The smoke test of the full paid-collect path waits on the secrets~~ —
  **DONE same day**, all paths now tested live: auth / not_linked /
  cq_down / paid / replay-pays-zero / remainder-banks.

---

# (previous head) Project status — updated 2026-08-12 (ROOM DECOR + CLOSETS + EGG ✅ SHIPPED, sw v44)

## 🚪🥚 2026-08-12 (later) — SIX CLOSET DESIGNS, THE EGG, AND HATCH AT LEVEL 20

Three of her asks in one pass, all live. `migration-closets-and-hatch-20.sql`
applied via MCP (`closet_designs_and_second_blip_level_20`), sw v43 → **v44**.
`verify-store.html` green at **3,748 checks**. Learner rows byte-identical
again (2 students, 2 blips, 24 progress, 4,580 XP); active furniture 41 →
**47**, door slot 9 → **15**.

**1. Her six closets are wired.** `tools/key_item.py` (new) cuts a SINGLE
Tripo export off its background — a different job from `tripo_sheet.py`,
which keys a magenta SHEET and slices it. It floods from the border rather
than thresholding, so an off-white door panel in the middle of a picture on
an off-white background survives; the flood only removes background that is
CONNECTED to the edge. Five keyed at tol 40; the emo one needed 100 because
its backdrop is a lavender gradient, and it is stable from 100 to 160, which
is what says the flood is stopping at the outline rather than eating in.

⚠️ **EACH CLOSET'S SEAT WAS SOLVED, NOT COPIED.** `door` attach.y 0.542 is
specific to `door.png`'s own bottom edge — she caught that closet hanging
TWICE. Four of the six sink into the floor at 0.542, so each was solved
against the right wall's floor line until its FRONT FACE sits flush, then
verified: nerdy 0.529, sport 0.537, starry 0.533, flower 0.506; lines and
emo landed on the slot default and carry no override. The three with legs
or a plinth also float BETWEEN their feet, which is correct — the seat is
measured on the front face, never on the lowest pixel.

⚠️ **THE "NEVER ADD A SECOND DOOR PNG" RULE WAS REWORDED, NOT BROKEN.** As
written it forbade this outright. The ruling was always about COLOURS —
door-mint and door-coral are one drawing tinted, and must stay that way. A
patterned closet is a different piece of furniture that happens to share the
slot, like a canopy bed against a wooden one. **Colour → tint. Design → its
own file.** verify-store now asserts BOTH halves separately, so neither can
drift into the other.

**2. The hatch prompt is an egg beside the nickname** (her ruling). It was a
full-width card under the room — a heading, a line of copy and a button —
which made a quiet optional thing look like the most important item on the
screen and shoved the room up the page whenever it appeared.

⚠️ **TWO THINGS WENT WRONG BUILDING IT, both silent, both worth knowing.**
First: the egg was appended to `.room-name-wrap`, and `mountNameEditor`
calls `clear(container)` on EVERY render — so the egg rendered once and
vanished the moment the name drew. No error, just no egg. It now lives in a
new `.room-name-row` wrapper as a SIBLING, so the name editor can keep
clearing its own box. Second: the first CSS held the name still with a
negative margin, which pulled the egg 35px ON TOP of the name (measured, not
eyeballed). It is now `position:absolute; right:100%`, out of flow entirely
— verified that the name sits at the same offset with the egg present and
removed, so it will not jump when a second Blip is hatched.

**3. The second Blip now needs level 20** (was 10). Her call: 10 arrives too
soon now the curve caps at 40 and the milestone boxes land at 10/20/30/40.

⚠️ **THE GATE LIVED IN THREE PLACES AND ONE WAS ALREADY WRONG.**
`js/config.js secondBlipLevel` is the client's copy, `js/local-backend.js`
reads it, and `mhq_claim_second_blip` is what actually enforces — but
`js/blip.js` hard-coded `level >= 10` instead of reading the constant, so
after any change the card could appear at a level the server would refuse.
Fixed in the same pass; blip.js now reads the constant.

**Nobody lost anything**: checked on live BEFORE applying — 0 second blips
existed and the highest learner level was 10. Worth knowing that her own
test account sits exactly on level 10, so it *was* being offered a second
Blip and now is not until 20.

### Not done / punted
- **The closet prices and levels (40–120 💎, Lv 3/7/10/13/16/20) are mine,
  not hers** — she gave no numbers for these. Priced above the colours
  (10–20) because a colour is a tint of the closet you already own and a
  design is a new one. One line each to retune.
- The egg's 22px size and its bob are a first pass, never seen on a real
  phone.

---

## (earlier the same day) ROOM DECOR — sw v43

## 🛋️ 2026-08-12 — SHELVES, BEAN BAG, WALLPAPER + THREE THEMED SETS — ✅ LIVE

"Next up §3" built, placed by Megan, applied and pushed the same day.
**`supabase/migration-room-decor.sql` IS applied to live**
(`room_decor_shelves_beanbag_wallpaper_themed_sets`, via MCP), sw bumped
v42 → v43, everything pushed. `verify-store.html` green, **3,595–3,596
checks** (was 2,972; the few-check wobble is the documented milestone-loot
branch, see the S4 note). Zero console errors on every walk.

**Learner rows verified byte-identical before and after** — students-core,
blips and progress hashes all unchanged (2 students, 2 blips, 24 progress,
4,580 XP). Active furniture 18 → **41**; cosmetic 63, food 47 and trinket 6
untouched. Live smoke test with a throwaway learner (deleted after): the
payload reads 41/63/47, buy + equip works on all four new slots and on the
emo bed, unequip empties an optional slot, an unowned shelf is refused, a
trinket is still both unbuyable and unequippable, and the level gate fires
at Lv 1.

### ✅ PLACEMENT SETTLED BY MEGAN, same session
She opened Furniture mode and placed the three new slots herself, then
pasted the numbers back — the same loop that settled the four room-build
slots and the 41 accessories. Applied verbatim:

| slot | anchor | attach | widthPct |
|---|---|---|---|
| shelf-left | 0.5, 0.5 | **0.137, 0.383** | **16** |
| shelf-right | 0.5, 0.5 | **0.862, 0.403** | **16** |
| beanbag | 0.5, 0.95 | **0.457, 0.537** | **17** |

Her arrangement is better than the guess in every direction: both shelves
came DOWN in size (26 → 16, so they read as shelves rather than as planks),
the left one dropped and the right one rose so the two sit at different
heights instead of mirroring each other, and the bean bag moved right across
the room — from the front-left floor into the BACK CORNER, tucked behind
where Blip stands rather than beside him.

⚠️ **She sized only the WOODEN pair, and widthPct is per PIECE.** The other
three shelf designs kept the provisional 26 and would have rendered 60%
wider than the shelf she had just sized — same object, same spot, two
different sizes. All four drawings are 400px wide at the same scale, so all
eight are now 16. **That is an inference from her measurement, not a number
she gave**; the panel shelf is the one to look at first, because its art is
348px tall against the others' ~305, so at the same width it hangs lower.

**Her two calls this session:** two shelf slots, one per wall, **placed by
her** (the art already came as `-left`/`-right` pairs, so the slots match the
drawings); and the themed-set levels, where she asked for a recommendation
and took it — **nerdy Lv 4 · sport Lv 11 · emo Lv 18**, which puts a new room
look at 1 · 4 · 8 · 11 · 14 · 18, the same rhythm the food tiers run on.

### What shipped
- **`supabase/migration-room-decor.sql`** (new, UNRUN) — four new slots
  (`shelf-left`, `shelf-right`, `beanbag`, `wall`) through the known dance in
  BOTH places (`shop_items_slot_cat_check` AND `mhq_equip`'s key list), plus
  **23 rows**. Mirrored in `schema.sql` and `js/local-backend.js`.
- **It re-creates only `mhq_equip`.** `mhq_buy_item` already accepted
  category 'furniture' (S5v2 widened that guard) and `mhq_get_state` already
  builds `furnitureShop` from every furniture row, so both were left alone —
  every copy-forward of those bodies is a chance to silently un-ship S4b's
  tray. Two functions untouched is the smaller, safer change.
- **Three themed sets** = nine ordinary rows on the EXISTING bed/desk/window
  slots. No slot, no constraint change; independent of the four new slots if
  those ever have to be rolled back.
- **Wallpaper swaps the room shell**, proven geometry-safe on 2026-08-09.
  Five shells (plain + 4), one equipped at a time.
- **`tools/preview_room.py`** learned the new slots, the wallpaper swap and
  the three new sets (`--shelf-left`, `--shelf-right`, `--beanbag`, `--wall`).
  ⚠️ Its two regexes both had `\w+` where a slot name goes, so hyphenated
  slots silently did not parse and the shelves just vanished from the
  preview — no error, just an incomplete room. Fixed; worth knowing before
  the next slot with a hyphen in it.

### Decisions and judgement calls (rule 9 — recorded, not silently redesigned)
1. **⚠️ SHELVES AND THE BEAN BAG HAVE NO FREE DEFAULT — the first furniture
   slots that can legitimately be EMPTY.** Every slot S5v2 shipped falls back
   to a price-0 piece, so it is never bare. A bed you cannot remove makes
   sense; a shelf you cannot take down does not. `shelf-wood-left/right` ARE
   price-0 rows, which makes their absence from `DEFAULT_FURNITURE` look like
   an oversight — so it is stated in three places and asserted in
   `verify-store.html`, because the "fix" is a one-line edit that would
   silently make shelves permanent the moment a learner bought one.
   `roomFurniture()` now returns **null** for those slots and `js/blip.js`
   skips them.
2. **`wall` is an ordinary equip slot that draws NO layer.** Server-side the
   distinction does not exist and must not — a wallpaper is bought, owned and
   equipped exactly like a bed, so it inherits the level gate and the
   ownership test for free. Only the client knows: `roomShellSrc()` swaps the
   `.room` background and `wall` is deliberately absent from
   `FURNITURE_SLOTS`, which is the paint order for LAYERS. Putting it there
   would append a picture of a whole room on top of the room.
3. **⚠️ THE SHELVES PAINT BEFORE THE DOOR, and the door moved from first to
   fourth in the paint order to make that true.** A shelf hangs ON the right
   wall; the closet STANDS on the floor in front of it. If they overlap the
   closet has to win, or a plank floats in front of the furniture standing in
   front of it. Asserted, so a future tidy-up of that list fails loudly.
4. **A shelf is priced PER SIDE, not per pair** (60/90/120 each), because the
   two walls are independent slots — which is what lets a room mix two shelf
   designs, the whole reason she asked for two. The pairs are asserted to
   share a price and a level so half a shelf can never unlock.
5. **⚠️ THE `-left`/`-right` SUFFIX IS THE WALL, NOT A MIRROR FLAG.** Measured
   off the alpha before wiring anything: every `-left` piece slopes UP to the
   right (the left wall's rake — the same one all six windows carry) and
   every `-right` piece slopes DOWN to the right. There is no `flipX`
   shortcut and none is wanted; mirroring would mirror the wood grain and the
   brackets too. Asserted both ways.
6. **⚠️ THE WALLPAPER FILE NAMES DO NOT DESCRIBE THE DRAWINGS.** Tripo named
   the exports before anyone looked at them: `room-shell-sky.png` is the TEAL
   one with moons and clouds, `room-shell-cloudy.png` is the dark navy one
   with line-drawn mountains. So `wall-moons` reads `room-shell-sky.png` and
   `wall-mountains` reads `room-shell-cloudy.png`, on purpose. Open the PNGs
   before "correcting" either mapping.
7. **Shelves and wallpaper gate PER ITEM, not per collection** (`perItemGate`
   in collections.js) — a shelf is a pair of rows that must never unlock on
   different levels, so all eight live in one group whose `unlockLevel` is
   the FIRST gate. Both set `noMysteryCard`: their free tier is Lv 1, so the
   locked-card branch could never fire on them anyway. verify checks those
   two as a floor and every other collection as an equality.
8. **The bean bag is one piece at Lv 6 / 90💎 with no free version** — a
   single ornament, not a surface that has to be filled. That breaks the
   "every slot has a free way in and a real choice" assertion, so it is
   declared in a `SINGLE_PIECE_SLOTS` list rather than the assertion being
   loosened; a slot that accidentally ends up with one item still fails.
9. **The dressing room shows a FULL room even where the app would show a bare
   wall.** Its `others` map now falls back to each slot's first catalogue
   piece, because a shelf you cannot see is a shelf you cannot place. It
   differs from the app deliberately: it is a placement tool, not a preview.

### The themed sets' sizes are still first guesses
The three sets reuse the shipped sets' `widthPct` (41 bed / 33 desk / 20
window) because their drawings measure the same — all six windows are
~320×375 and the new desks share basic-desk's aspect to three decimals — and
they sit at her existing bed/desk/window placement, which is already settled.
Not re-checked on a phone; worth a glance.

Measured, so the look is honest: **every new piece is 0 pixels outside
the shell's silhouette** (checked against the shell's alpha, not a computed
floor line — the lesson from the wrong desk-overhang claim). The left
shelf's BOUNDING BOX starts at x 0.000, but its drawn pixels are all inboard
of that corner, which is the same "the bbox corner is empty space" fact that
made the desk claim wrong.

### Verified
- **`verify-store.html` green, 3,595–3,596** over repeated runs. New coverage:
  all 23 SQL rows cross-checked against the client mirror on price/minLevel/
  slot; the migration names each new slot in BOTH the constraint and
  mhq_equip; the paint order, including shelves-before-door; every piece has
  a label, art and exactly one collection whose gate matches its row; all 41
  furniture PNGs and all 5 shells fetch 200; `roomFurniture` returns null for
  the three optional slots and falls back for the rest, including for an
  unknown id; `roomShellSrc` falls back to the plain shell for an empty slot,
  an unknown id AND a non-shell furniture id; the shelf pairs share a price
  and a level; the four shelf designs use eight distinct drawings with no
  flipX; and, against the backend, **buy → equip → unequip on all eight
  slots**, with the bean bag bought past its Lv 6 gate using crystals the
  test learner actually earned.
  - ⚠️ **Two of my own new assertions were wrong first** and are worth the
    note: the bean bag failed "every slot sells something free at Lv 1" and
    "every slot sells 2+ pieces" — both true of every other slot, neither
    true of a single deliberate ornament. Fixed by declaring the exception,
    not by weakening the rule.
  - ⚠️ **A REPLAY PAYS 25% XP, and it broke a check.** A one-shot
    `submitQuest(..., xp: 1700)` was meant to land the test learner on level
    6 (1,600 XP) and landed on level 2 — the learner had already replayed
    q1-q3, so it banked 425. The loop now submits until the level is reached,
    bounded. Any future test that needs a level must not compute it as one
    XP number.
- **Walked at 375px** (`?local=1`, fresh signup, **zero console errors, zero
  broken images**): a brand-new learner's room shows exactly the four
  original pieces, bare walls, plain shell — the empty-slot rule working;
  buying and equipping a wooden left shelf, a glossy right shelf, the bean
  bag, the cloud wallpaper and the nerdy bed puts all five in the room at
  once, every image loaded, every piece inside the room box, painted in the
  asserted order; the panel shows Basics/Nerdy/Techy/Sporty/Wallpaper/
  Shelves/Bean bag/Door colours open at Lv 11 with Princess and Midnight as
  "?" cards at Lv 14 and Lv 18, and the per-item cards carry their own
  "unlocks at level 13/16/19/22"; and taking the shelves, bean bag and
  wallpaper back out really does leave bare walls and the plain shell.
- **Looked at it.** Four full rooms composited with `tools/preview_room.py`
  (screenshots still time out in this pane) — basic, nerdy, sporty and
  midnight, each with a different shelf design on both walls, the bean bag,
  and three of the four wallpapers. Shelf rakes match their walls in every
  one; nothing leans, nothing floats, nothing is cut off.

### Not done / punted
- **Her six new CLOSET designs are cut but NOT wired** (emo, flower, lines,
  nerdy, sporty, starry — `art-source/tripo/*closet*.png`, generated from
  this session's prompts). Measured: **all six carry the shipped door's rake**,
  so every one drops onto the right wall with no re-roll. The flower one
  already exports with a transparent background; the other five need keying,
  and the emo one needs the most care because its background is a gradient
  rather than one flat colour. Wiring them is rows + labels + a slice pass,
  no new slot and no constraint change — the door slot already exists.
  ⚠️ They would be the first doors that are NOT the one tinted drawing, so
  the "never add a second door PNG" rule in furniture.js needs rewording
  rather than breaking: the nine COLOURS stay one tinted file; a patterned
  closet is a different design, which is a different item.
- The 23 prices are first guesses, like every other price in the app; they
  belong in the "price the free tier before go-live" pass already on the list.
- The wallpaper shells are 139–234 KB against the plain shell's 51 KB
  (patterned walls do not quantise small). One is loaded at a time, and it is
  the one asset on screen 100% of the time — accepted, not ideal.

---

# Project status — earlier entry: 2026-08-09 (ROOM=HOME + POLISH + TUTORIAL SHIPPED, sw v42)

## 🚀 2026-08-09 (later) — THE WHOLE DAY SHIPPED: foreman day, three build sessions

Foreman pattern (2nd run, same shape as the 2026-08-08 room build): Fable
planned + reviewed, Sonnet built, Megan dispatched. **No SQL today** — the
whole day is client-side, so the ship was commit + push only. All three
sessions reviewed green before the next started; `verify-store.html` ended
at **2,972 checks green**, zero console errors on every walk.

**Session 1 — the room becomes the home screen** (full write-up in the next
section). Review fixes on top (commit `04b889b`): a DONE assignment no
longer badges the desk (the card's own header ruling — "no nagging repeat
once it's done" — applied to a cue that can only nag), and
`verify-store.html` now wipes `mhq.*` localStorage before every run —
stale local-backend state (a leftover pending milestone box) was making 3
box checks read false-red in a used browser, a diagnosis that cost real
review time today. Clean-slate-per-run is always correct on a dev page.

**Session 2 — the phone-walk polish list** (commit `e9746f8`), all four of
her 2026-08-08 21:30 rulings: food + cosmetic cards are small tiles
(~3-per-row at 375px, name clear of the art; furniture cards deliberately
stay big — a bed needs the room); **buying wears it immediately** (client
chains the existing `api.equip` after a successful buy — cosmetics AND
furniture; at dress-lock stage ≥ 2 the chained equip skips QUIETLY, and
verify asserts the specific `BLIP_TOO_SICK` code so nothing else slips
past that quiet-skip); the sheet footer is **pinned** on every sheet (one
shared sheet builder — `.room-sheet` overflow moved onto
`.room-sheet-body`, the `min-height:0` flex gotcha documented in the CSS);
food got the cosmetic shop's tab strip (Fresh · Bakery · Hot meals · Braai
· Sweets · Drinks, locked tiers keep their "?" card on their own tab).
Walked live at 375px: bought Sleepy eyes → worn same render; bought the
wooden bed → in the room same render; apple buy kept the sheet open, tray
tile appeared.

**Session 3 — the room tutorial** (commit `27e0a84`). WhenWorks'
`app/tour.js` mechanism PORTED, not reinvented (`js/companion/tour.js`):
spotlight hole + bubble, no rAF anywhere, steps drop themselves when
their anchor is off-screen (the tray step only exists when the tray has
food), versioned seen-flag `mhq.tourSeen` (inside the verify wipe
namespace on purpose, so verify always exercises the first-run path).
Auto-fires ONCE on first landing (her ruling — the ambush is intentional
here, unlike WhenWorks R11), never again; the ❓ replay button lives
permanently next to the gallery button. Six steps on an empty tray, seven
with food. Review note: the pane's synthetic clicks were flaky and its
spotlight-rect reads lag mid-transition — chased hard, concluded
measurement artifacts of THIS pane (three clean probes advanced
perfectly, style-attribute reads always correct, and it's the same code
WhenWorks parents use daily); **her real-phone tap-through is the final
confirmation** (in Pending).

**Art day (commits `f2e0f79`, `3724633`):** her 2026-08-09 Tripo drop
sliced and committed — bean bag, 4 shelf designs × both walls (all 8
slopes MEASURED correct per wall), emo/nerdy/sport bed+desk+window (all
orientations measured against the shipped pieces), and **4 wallpaper
shells that PROVED the shell-swap approach**: Tripo held the room's
geometry to 99.7% silhouette overlap with floor lines aligned (checked by
edge-overlay), so wallpaper = alternative `room-shell-*.png`, no tint
trick needed. The nerdy desk came back as a wrong-rake corner L-desk and
was re-rolled to a straight desk (correct rake, measured). Assets sit in
the repo UNWIRED — the shelves/beanbag/wallpaper build session does the
`mhq_equip` constraint dance. Wallpaper shells are 139–234 KB vs the
plain shell's 51 KB (patterned walls don't quantise small; one equipped
at a time, acceptable). Slicing scripts in the session scratchpad, keyed
on border-median flood (the 1080×1350 Tripo exports have off-white
backgrounds — plain white-threshold keying reads them as 100% subject).

## 🏠 2026-08-09 — THE ROOM BECOMES THE HOME SCREEN (Next up §1)

Her ruling, verbatim intent: *"blip's room is the first thing the kids see
when they open the app, then when they click on the study desk, that
takes them to the blipwork quests."* Committed, **not pushed** — the ship
happens later from the foreman session, per her scope fence for today.
`verify-store.html` green, **2927/2927** (was 2918; +9 net — a new section
plus the documented per-run wobble in the milestone-loot checks, see the
S4 note below in this file).

**Routing flip:**
- `js/app.js` `boot()` and `js/auth.js` `finishLogin()` both now
  `go("blip")` instead of `go("hub")` — login/refresh lands in the room.
- The chrome "Blipwork" brand tap (`js/app.js`) now goes `blip` too — the
  logo means "go home", and home is the room. The HUD Lv/💎 chip already
  went to the room; left alone.
- `js/blip.js`'s ← back arrow is **removed** (home has no back) — the 👥
  gallery button is the only thing left in that corner. The hub's own ←
  keeps going to `hub` unchanged (the chapter screen still needs it), and
  the hub's pulsing Blip button is untouched — it already called
  `go("blip")`, so it needed no code change to become "the way back to
  the room".

**The desk is the way to the maths, replacing its old "open the furniture
panel" job** (bed and window keep that job — the desk piece itself is
still shoppable from there, nothing lost). `js/blip.js`'s furniture-tap
loop special-cases `slot === "desk"`: a bare `app.go("hub")`, aria-label/
title now read *"— open your maths quests"*. **⚠️ Deliberately never
wrapped in a `health.locks` check** — every other room action gates on
Blip's sickness stage, this one must not, so homework stays reachable
even bedridden (stage 3, all three locks true). Verified live: forced
the local backend to stage 3 (`adminSetTerm` + `__BLIP_DEV__.skipDays`)
and the desk still opened the hub.

**Homework badge on the desk.** New `homeworkBadgeLayer()` in
`js/companion/furniture.js`, appended to the desk's own `.room-furn` div
only when `hasActiveAssignment(app)` (new export in `js/assignment.js`,
factored out of `renderAssignmentCard`'s own "nothing to pin" check so
the two can never silently drift apart). **The art exists** —
`art-source/tripo/badge.png` (her red book + "!") was already sitting in
the repo, unused; cropped to its alpha bbox and downsized to
`assets/companion/homework-badge.png` (235×400, 85 KB). Hides itself on
a failed image load (`img.onerror` → `badge.remove()`) — no drawn
placeholder, no broken-image icon, so the feature would have shipped
safely even if the art had never turned up. Positioned as a CHILD of the
desk's own box (`right:-6%; top:-8%; width:28%` of the desk element, new
CSS `.room-furn-badge`) rather than separate room-fraction maths, so it
automatically rides along if the desk ever moves — nothing to keep in
sync by hand. **Placement is a judgement call, not measured against a
live phone** — checked with `tools/preview_room.py`'s own compositing
math (screenshots time out in this pane) and it reads clearly without
crowding the window or bed; worth one look on her phone before it ships.

`maybeShowInstall` moved from the hub (`js/screens.js`) to the room
(`js/blip.js`) — the install prompt now lives on the landing screen. The
sick banner stayed on the hub (his room already shows his state in
person). The assignment card, Term 3/Revision tabs, chapter cards and
greeting all stayed on the hub, unchanged — the hub is now "the page the
desk opens".

**`sw.js`** bumped v39 → v40. No new SHELL entries — the badge PNG is
cache-first on-demand, same as every other companion art file (none of
which are in SHELL either).

**Verified live** (`?local=1`, fresh signup, zero console errors): login
lands in the room; desk tap opens the hub (aria-label confirmed); the
hub's pulsing Blip button returns to the room; a chapter's own back arrow
still returns to the hub; the results screen's two buttons are unchanged
and "Back to quests" still goes to `chapter`, not `hub`; the desk→hub
path survives a forced stage-3/bedridden state with all three
`health.locks` true; the homework badge attaches when an assignment is
active and its real image loads (200, not 404).

**Deviations / judgement calls:**
1. Found `art-source/tripo/badge.png` already in the repo (untracked,
   not mentioned in the brief) — it is exactly the art the brief
   described ("her red book with an !"), so it was cropped/downsized and
   wired in rather than leaving the badge to ship invisible. If this
   wasn't the art she meant, the fallback (hide on load failure) still
   holds — swap the file and nothing else needs to change.
2. Badge size/offset (28% of the desk box, top-right, slightly
   overlapping) is a first guess from the Python room-compositor, not
   from her own eyes on a phone — flag it if she wants it bigger/smaller.

### Not done / punted (today's scope fence)
- Food card size, buy→equip-immediately, pinned sheet footer, food shop
  tabs — **Next up §2** below, explicitly out of scope for this session.
- Not pushed, not deployed — foreman ships it later.

---

## ✅ 2026-08-08 evening — THE WHOLE ROOM BUILD IS LIVE

The Fable review session shipped the day: **all migrations are applied to
live** (food-shop → furniture-slots → ship-fixes, in that order, via MCP),
sw bumped v38 → v39, everything pushed. Learner rows verified byte-identical
before and after (md5 over students-core / blips / progress — all three
hashes unchanged). Live smoke test with a throwaway learner (deleted after,
cascade verified): category counts cosmetic 63 / food 47 / furniture 18 /
trinket 6; tray buy→eat→none_left; free bed bought + equipped; unowned and
trinket equips rejected; techy-bed locked at minLevel 8; door-mint bought
and equipped; soup → pantry; **milestone box granted at level 10, deduped
on replay, opened as boxKind=milestone and paid out a trinket (the old
sock, live and sincere)**.

**`supabase/migration-ship-fixes.sql`** (new, applied): revokes public
execute on `_mhq_roll_loot(text)` (the curve migration's "not granted"
comment is now true) and makes `mhq_submit_quest`'s milestone-queue append
atomic (the read-modify-write race from the S2 review). The migration files
all carry "applied" stamps in their headers now.

---

## 🛋️ 2026-08-08 — ROOM BUILD S5v2: the isometric room, furniture, windows, door

Per the REVISION section of `homework-hub-companion/ROOM-BUILD-PLAN.md`,
**with a layout re-call from Megan mid-session** (see below). Nothing pushed,
`sw.js` untouched (still v38), **no SQL run against live**.
`verify-store.html` is **green, ~2914 checks** (was 2434 — S5v2 adds ~480;
the total wobbles by a few run to run, as it always has — see the S4 note).

**THE ROOM IS HER ART NOW.** `assets/companion/room-shell.png` is the
background of `.room`, and the four EQUIPPED pieces are laid on top of it.
`js/companion/room-art.js` — S1's four placeholder SVGs — is **deleted**, its
whole job done.

### ⚠️ HER LAYOUT RE-CALL (2026-08-08 evening) — this overrides REVISION ruling 4
The plan put the door back-LEFT with the window upper-right. She stopped the
session mid-build and moved it:

> *"Put the door against the other wall, then the bed next to it, study table
> still as it is with the window above the table."*

So: **door + bed share the RIGHT wall** (door at the back, bed beside it);
**desk keeps the LEFT wall with its window directly above it.** She also
supplied a second door drawing (`art-source/tripo/door 2.png`).

**Both of her changes fixed real faults the first arrangement had**, and both
were visible in `tools/preview_room.py`'s output:
1. The desk had been **burying the door** — the door is the tap target for
   the Inventory sheet, so that mattered.
2. **The window art was drawn for the LEFT wall all along.** Measured, not
   guessed: its major axis slopes UP to the right (left column mid-y 0.619,
   right column 0.371), which is the left wall's rake. On the right wall it
   leaned against the room. Her instinct put it where the art belongs.
3. Her **door 2** faces down-LEFT, which is a right-wall object; the first
   door faced down-RIGHT. The new art and the new wall agree.

### What shipped
- **`supabase/migration-furniture-slots.sql`** — four new equip slots
  (`bed` / `desk` / `window` / `door`), the known dance done in BOTH places
  (`shop_items_slot_cat_check` AND `mhq_equip`'s hard-coded key list), plus
  `mhq_buy_item` widened to accept the new category and `mhq_get_state`
  gaining a `furnitureShop` array. 18 rows. Mirrored in `schema.sql`.
- **`js/companion/furniture.js`** (new) — labels, art files, code tints and
  the placement fractions, measured off the shell's own alpha channel.
- **`js/companion/collections.js`** — `FURNITURE_COLLECTIONS`: basic Lv 1
  (free) · techy Lv 8 · princess Lv 14 · **Door colours Lv 1, `noMysteryCard`**
  (her ruling — the front door is never a "?").
- **Furniture panel** with the same locked-"?" card the cosmetic shop and the
  grocery tiers use. It shows OWNED pieces in place with "Put it in the room" —
  there is deliberately no separate furniture inventory, because one bed is in
  the room and the others are in storage, and splitting that across two sheets
  would make swapping back a hunt.
- **The STYLE view** (her ruling 6, "don't throw that away"). One module-level
  `roomView` flag in `js/blip.js` swaps the STAGE only — the nickname header,
  the cookie + tray, the dock and every bottom sheet are built once and serve
  both. Verified: in the style view the colours sheet still shows 11 swatches
  and the furniture sheet still shows 12 cards, from the same code.
- **The trinket shelf is her art.** The six placeholder SVGs are gone.
- **`dressing-room.html` gained a Furniture mode** — the room shell as the
  stage, drag a piece to its spot, copy the numbers back. See below.

### Deviations and judgement calls (rule 9 — recorded, not silently redesigned)
1. **⚠️ FURNITURE IS ITS OWN CATEGORY, `furniture`, NOT `cosmetic`.** The plan
   says "four new equip slots" without naming a category, and `cosmetic` looks
   like the smaller change. It is not: `category = 'cosmetic'` is load-bearing
   in three places that have nothing to do with rooms — `mhq_get_state`'s
   `shop` payload (the cosmetic panels would have started listing beds),
   **`mhq_open_box`'s RARE pool for milestone boxes** (`price >= 120` at ANY
   level: a mystery box would have paid out "Canopy bed" as a rare cosmetic,
   which the reveal UI cannot even draw on Blip), and the assignment chest's
   pool. Trinkets set the precedent in this schema. Cost: one more payload
   array and two small function edits. `verify-store.html` now asserts
   furniture appears in *none* of the three.
2. **Furniture is PER BLIP, so a two-blip household has two rooms.** It rides
   `blips.equipped` / `blips.owned_items` through the mhq_equip machinery the
   plan explicitly told this session to reuse. Trinkets went household-wide
   because a shelf has no equip slot to ride; making furniture household-wide
   would mean a new column, a new RPC and a new GRANT. Worth a look before
   go-live — it is defensible either way, and it is her call.
3. **An empty slot draws its free default rather than a hole.** The four
   price-0 rows exist and are really bought (the panel says "Get it free"),
   but `roomFurniture()` falls back to them, so a brand-new learner walks into
   a complete room and "Take it out" means "put the plain one back". Buying
   the free item is what makes a slot *switchable*, not what makes it appear.
4. **The door tint could not call the Blip recolour pipeline as-is.** Her
   ruling is one drawing tinted in code, and the obvious move was
   `getBodySrc`. It would have returned the same grey door nine times: that
   pass computes `ns = ts * (s / BODY_S)`, i.e. it scales saturation
   *relative to the body blue's*, which is zero for grey art (the door's
   panels measure s ≈ 0.02–0.06). New `tintedImageSrc` in renderer.js shares
   the same offscreen canvas, the same cache-per-(file,colour) and the same
   smoothstep-on-VALUE that preserves the outline, but applies the target
   saturation FLAT at each pixel's own brightness. Thresholds were **measured
   off door.png** (outline V<0.45 · ramp 0.45–0.65 · panels 0.65–1.00), not
   copied from the body's — that was the wings lesson.
5. **The door tints are not the COLOURS palette**, though the names match.
   Blip's pastels are barely saturated (mint is 0.23); flat on a pale grey
   door at 26% of the room width they were indistinguishable from each other.
   Same hues, roughly double the saturation. Blip's own palette is untouched.
6. **The room shell IS keyed, despite the plan's "never keyed".** That
   instruction meant "don't run the magenta slicer over it" — it would have
   tried to cut it into items. It arrived on WHITE, and a white square behind
   an isometric room on a navy page is not shippable. Flooded from the border
   with scipy (`ImageDraw.floodfill` is a no-op in Pillow 12), trimmed,
   downscaled to 768px and quantised to 128 colours: **597 KB → 51 KB** on the
   one asset that is on screen 100% of the time. There is **no interior
   near-white pixel** in the drawing, so the flood is provably safe.
7. **Bed/desk/window taps open the Furniture panel** (the door opens
   Inventory, per her ruling). The brief only specified the door. A wiggle and
   nothing else would be a dead end now that the pieces are shoppable, and
   "tappable furniture opens the panel it belongs to" is S1's own convention.

### Verified
- **`verify-store.html` green, 2918/2918.** New section 6j: 18 rows
  cross-checked SQL↔client on price/minLevel/slot; every piece has a label,
  art and exactly one collection whose gate equals its own `min_level`; the
  four free defaults exist at price 0 / Lv 1; `roomFurniture({})` and an
  unknown id both fall back; **the nine doors resolve to ONE png file** and to
  eight distinct tint hexes; `tintedImageSrc` really returns a data-URL, a
  null tint really returns the file unchanged, and the cache returns the same
  object twice; all 10 PNGs + the shell fetch 200; and then, for real against
  the backend, **buy → equip → unequip on all four slots** (this is the July
  cape bug's exact shape), an unowned bed rejected, a Lv 8 bed refused at
  Lv 1, door colours priced correctly, and **a trinket still unbuyable and
  unequippable** — the guard that let furniture through must not have widened
  further.
- **Walked in the browser** (`?local=1`, **zero console errors throughout**):
  the room renders all four pieces at the measured fractions with the right
  art; the room box is 1.008 — the shell's own ratio; tapping the door opens
  INVENTORY and the bed opens FURNITURE; at Lv 1 the panel shows Basics and
  Door colours open with techy/princess as "?" cards reading Lv 8 / Lv 14;
  buying the coral door took 400 → 382 💎, "Put it in the room" equipped it
  and **the door's `<img>` really is a tinted data-URL**; "Take it out"
  dropped it back to `door-white`; and the Style toggle swaps to the flat
  stage (Blip 51% wide vs 30% in the room, zero furniture) where the colours
  and furniture sheets still work from the same components.
- **Looked at it.** Screenshots time out in this pane (the rAF/compositing
  limitation), so `tools/preview_room.py` (new) re-does the CSS's own maths in
  PIL and writes a PNG of the whole room. That is what caught the desk/door
  and bed/window collisions in the first arrangement, and what confirmed
  hers. Previews for all three sets + the nine-door strip are in the session
  scratchpad and were sent to her.

### The dressing room's Furniture mode
`dressing-room.html` now has a mode switch. Furniture mode drives the REAL
code — the stage is the app's own `.room` element with the app's own
`furnitureLayer()` pieces in it, so the shell art, the aspect ratio, the
clipping and the placement arithmetic are all the app's. Its own module, not
more branches in the accessory script: the data shapes genuinely differ
(**placement is per SLOT — all three beds share one spot — while SIZE is per
piece**), and the accessory flow is the one she has already used on 41 items.
- A checkbox decides whether a drag moves the whole slot (default, nearly
  always right) or gives one piece its own override. The snippet emits both
  halves and omits whatever did not move.
- The other three pieces stay visible, dimmed, and can be swapped from
  dropdowns — a canopy bed crowds the door in a way the plain one does not.
- Four checks, all exercised for real: off the edge, floating up the wall,
  walked off the front of the floor, and hidden behind a piece painted later.
- **It hit the same trap the accessory checks already fixed** — a furniture
  layer's height comes from the picture's aspect, so measuring before the
  `<img>` loads reports nothing. Same fix (await load, never `decode()`, plus
  a run ticket so a late run cannot write into the next piece's box).

### ✅ Placement SETTLED BY MEGAN, same session (2026-08-08)
She opened the new Furniture mode and placed it herself, then pasted the
numbers back — the same loop that settled the 41 accessories earlier the same
day, and the whole reason the mode was built. Applied verbatim and
**machine-verified value-for-value against her paste**:

| slot | anchor | attach |
|---|---|---|
| window | 0.5, 0.5 | **0.311, 0.287** |
| desk | 0.5, 0.95 | **0.221, 0.736** |
| bed | 0.5, 0.95 | **0.750, 0.816** |
| door | 0.5, 1 | **0.650, 0.542** (see the hanging-closet note below) |

plus `basic-bed` **widthPct 40 → 41**. Her arrangement is visibly better than
the shipped guess: everything moved outward toward its own wall, which opens
the middle of the floor so Blip stands *between* the desk and the bed instead
of in front of the bed. Re-previewed in all three sets and re-walked in the
app — the live DOM reports her exact fractions.

She then called one more size: **`princess-bed` 33 → 41**, matching the wooden
bed. A four-poster that reads *smaller* than the plain bed it is an upgrade
from looks wrong, and at her placement it has the room. (It had been shrunk to
33 during the first draft to keep it off the window — a constraint her layout
removed, which nobody noticed until she said so.) The vanity stays at 30: it
is the tallest thing in the catalogue and does not need the width.

### 🚪 THE CLOSET WAS HANGING — twice, and she caught it both times
She sent a screenshot: *"you have the closet hanging again, it must be
positioned on the floor please."* She was right. Measured along the door's own
bottom edge against the right wall's floor line, **the entire base was above
it** — 0.027 of the room height clear at the left end and more toward the
right — so a strip of dark wall showed underneath and it read as a cupboard
bolted to the wall. `door` attach.y 0.520 → **0.542**.

Two things made this one hard to reason to in a single pass, and both are
worth knowing before placing any other boxy iso piece:
- **The drawing's lowest pixel is at 72% across** — the depth face's back
  corner — not at either front corner. So anchoring by the picture's bottom
  edge (anchor y=1) seats a corner nobody looks at, and the front face, which
  is what the eye reads as "the bottom", floats.
- **The art's base slopes slightly shallower than the floor line**, so no
  single y sits flush along the whole edge. 0.542 seats the FRONT face and
  lets the far corner sit a touch forward on the floor, which reads correctly.

The first "fix" for this (0.497 → 0.520, earlier in the session) moved it by
eye off a full-room preview and only took out about a third of the gap. The
lesson is the S3 wings lesson again: **measure the art's own edge against the
surface it lands on** — a full-room preview is too zoomed-out to show a 2%
gap, so crop and enlarge the piece before calling it seated.

### ⚠️ A CLAIM MADE HERE THAT WAS WRONG — "the wider desks overhang the floor"
An earlier draft of this entry warned that the techy and princess desks hang
over the floor's left edge at her desk position. **They do not.** Megan
queried it; measured against the shell's own silhouette, every piece is
0 px outside the room:

| | outside the shell | left-most pixel |
|---|---|---|
| Study desk 33% | 0 / 41,374 | x 0.057 |
| Holo desk 36% | 0 / 38,150 | x 0.043 |
| Vanity desk 30% | 0 / 42,616 | x 0.074 |
| all three beds | 0 / 54k–76k | — |

The reasoning was wrong in two ways at once, and both are worth remembering
because they will recur: it compared the desk's BOUNDING-BOX corner (which for
an isometric desk is empty space — the drawn pixels nearest the left are its
back-top corner, higher up where the room is wider) against where the FLOOR
starts at that height — but left of the floor is the WALL, which is still
inside the room. A desk touching a wall is a desk against a wall.
**Measure against the shell's alpha, not against a computed floor line.**

### Not done / punted
- **Not smoke-tested against live** — the migrations are unrun. Same position
  every room-build session has left its work in.
- **The 18 prices are first guesses**, like every other price in the app. They
  belong in the "price the free tier before go-live" pass already on the list.
- **`art-source/tripo/door.png` (the first door) is now unused**, as are the
  four `furniture-techy 2/3/4` and `furniture-princess 2` alternates she
  generated. Left on disk — they are her source art, not build output.

---

## 🍱 2026-08-08 — ROOM BUILD S4b: the fridge is gone, groceries live on a same-day tray

Per the REVISION section of `homework-hub-companion/ROOM-BUILD-PLAN.md`
(rulings 2 and 4), written after Megan saw an isometric Tripo room concept
and redirected S4's food shop mid-build. Nothing pushed, `sw.js` untouched
(still v38), no SQL run against live. `verify-store.html` is **green,
2434/2434 checks** (was ~2418 — S4b adds the tray round-trip + day-roll
expiry test, section 6h2).

**HER RULING (verbatim): "they can't just buy and buy and buy and expect to
be refunded."** Groceries no longer live in `students.pantry` — they land
on a new `students.tray` (same `{item_id: count}` shape), day-stamped by
`students.tray_day`. Any function that touches the tray (buy, eat, or a
plain state read) calls a new helper, `_mhq_tray()`, which returns the
stored tray unchanged if it was written today, or an empty one if it
wasn't — **a stale tray is never restored, and there is no code path that
refunds gold for it.** Soup, medicine and the daily cookie are completely
untouched: soup/medicine still buy into the pantry (never expire, `mhq_care`
not touched) and the cookie still has its own stamp from S4.

**Since `migration-food-shop.sql` had never been run, it was EDITED IN
PLACE rather than superseded by a new file** — same basis S2/S3 used for
in-place edits of their own still-pending work. `schema.sql` mirrors
everything: the two new columns, the `_mhq_tray` helper, and the revised
`mhq_get_state` / `mhq_buy_item` / `mhq_eat_food` bodies.

**UI: the fridge is gone from the room** (bed/closet/desk stay). What's on
today's tray now renders beside the daily cookie, top-right of the room
card — every tile draggable onto Blip exactly like the old fridge tiles
(`js/companion/drag-feed.js` reused untouched, per the brief). Buying a
grocery updates the tray display live even while the Food sheet stays open
(the S1 "shopping trip keeps the sheet open" convention), the same
fresh-read trick `renderFoodPanel` already used for its own counts. The
Food panel's grocery store now says, right under the heading: *"Whatever
you buy lands on today's tray, top-right — give it to Blip TODAY. Anything
left there at midnight is gone, no refund."* The soup/medicine stash
readout moved from the (now fridge-less) Food panel into the Pharmacy
panel, with its own note that they never expire.

### Verified
- **`verify-store.html` green, 2434/2434.** New section 6h2 exercises the
  full round-trip against the local backend: buy apple + banana → both land
  on the tray; buy soup → lands in the pantry; `__BLIP_DEV__.skipDays(1)` →
  the SAME row now reads an empty tray with the SAME gold balance (no
  refund) and the pantry's soup untouched; the expired apple reports
  `none_left` when eaten; a fresh buy the next day starts a clean tray with
  no trace of yesterday's apple.
- **Walked in the browser** (`?local=1`, fresh signup, zero console errors
  throughout): room shows Bed/Closet/Desk only, no fridge; buying an apple
  in the Food sheet shows the toast *"Apple is on today's tray — give it to
  him today!"*, the sheet stays open, and a new draggable tile appears
  top-right beside the cookie in the same render (no page reload needed);
  tapping the tray tile (dispatched as real pointer events, same convention
  `verify-store.html` uses, since this pane's synthetic clicks don't always
  reach pointer listeners) fed him — gold spent, tray cleared, `last_fed_day`
  updated, but `last_cookie_day` and `feed_count` both untouched, matching
  the ruling exactly; the Pharmacy panel now shows the Soup/Medicine stash
  counts with a "never expire" note.

### Deviations and judgement calls (rule 9)
1. **`_mhq_tray` follows every other `_mhq_*` helper's convention of no
   explicit GRANT** (see the "noted, not urgent" item on `_mhq_roll_loot`
   below) — it's called only from within other SECURITY DEFINER functions,
   never directly by the client.
2. **`mhq_get_state` writes back a cleared tray the first time it notices
   staleness**, not just computes an empty view of one — "any read that
   touches the tray first discards a stale one" was read as making the
   clearing a fact on the row, not merely a display-time illusion.
3. **The top-right tray reads `app.state` fresh, exactly like
   `renderFoodPanel` already did**, rather than the `state` closure
   captured at screen-render time — needed because a grocery buy
   deliberately keeps the Food sheet open (S1's convention), and the old
   fridge display lived *inside* that sheet where the fresh-read trick
   already existed; the tray had to earn the same trick since it now lives
   outside the sheet, in the room header.

### Not done / punted
- Not smoke-tested against live (the migration is still unrun) — same
  position every room-build session has left its work in.
- `.room-titlewrap`'s clearance for the wider tray (96px, was 44px for just
  the cookie) is a best guess, not measured against a full tray of several
  items on a real phone — worth a look once S5's real room art lands.

---

## 🍎 2026-08-08 — ROOM BUILD S4: the food shop, the fridge, drag-to-feed

Per `homework-hub-companion/ROOM-BUILD-PLAN.md`. Nothing pushed, `sw.js`
untouched (still v38), **no SQL run against live**. `verify-store.html` is
**green, ~2418 checks** (see the note on the wobbling count below).

**44 GROCERIES IN THE SHOP.** `supabase/migration-food-shop.sql` seeds every
food already cut into `assets/companion/food/`, as ordinary `category='food'`
rows beside soup/medicine/treat. **No new category, no new slot, no new
column** — so nothing needed a GRANT and `shop_items_slot_cat_check` was not
touched. Six price tiers, gated by level:

| tier | items | level | price band |
|---|---|---|---|
| Fresh (fruit & veg) | 12 | 1 | 4–9 |
| Bakery (pastries) | 6 | 4 | 12–20 |
| Hot meals | 6 | 7 | 22–32 |
| Braai | 6 | 11 | 34–48 |
| Sweets | 6 | 14 | 18–30 |
| Drinks | 8 | 17 | 20–45 |

Sweets and drinks are gated ABOVE the hot meals they undercut on price —
they are treats, and the *level* is what makes them one.

**⚠️ THE FREE COOKIE IS NEVER USED UP BY BOUGHT FOOD** (her ruling — the
first draft got this wrong). Feeding him an apple leaves the 🍪 sitting
there. Bought food resets the sickness clock but does **not** grow him; the
free cookie is still the only thing that does, so growth stays unbuyable.
That needed one new column, `students.last_cookie_day` — full reasoning in
the deviations below.

**REUSED, NOT FORKED.** Buying a grocery already worked: `mhq_buy_item`'s
food branch puts any non-`treat` food row into the pantry, so the 44 rows
needed no new buy path. These changes were needed and no more:
1. `mhq_get_state`'s `foodShop` array now carries **`minLevel`** (the
   `min_level` column always existed — only the payload got wider).
2. `mhq_buy_item`'s food branch now **honours `min_level`**, which it never
   had to before because every food row was level 1. soup/medicine/treat are
   all still level 1, so **the pharmacy is provably unaffected** — the new
   check can never fire on them, at any level or sickness stage.
3. A new RPC **`mhq_eat_food(username, password, item)`**, shaped exactly
   like `mhq_feed`/`mhq_care`: auth → ensure blip → row lock → refuse while
   sick → consume → return fresh state. Granted to anon like every other RPC.
4. One new column, **`students.last_cookie_day`**, so the free cookie has a
   day-stamp of its own — and `mhq_feed` re-created to read it. It needs no
   GRANT (all privileges on `students` are already revoked from anon; access
   is RPC-only), the same basis S2 used for its two columns.

**DRAG-TO-FEED IS BUILT.** New `js/companion/drag-feed.js` — the gesture
only, knowing nothing about food, Blip or the backend, so the whole path can
be exercised in `verify-store.html` against two plain divs. Pointer events
throughout; the fly-home is a CSS transition torn down by `setTimeout`
(`transitionend` needs the compositor, which this project's preview pane does
not run — same reason rAF is banned here).
- Drop **on him**: eaten server-side, the `eating` moment plays, the fridge
  count drops.
- Drop **anywhere else**: floats back to exactly where it started, **no
  penalty**, and the `sad` moment plays (her ruling, 2026-08-07).
- A `pointercancel` (the browser taking the gesture away) flies home
  **silently** — that is not the child missing.
- **The open sheet slides down out of the way while a food is in the air**
  and comes back after. It covers the lower two-thirds of the screen, and you
  cannot aim at a Blip you cannot see. Measured on a 375×812 phone with a full
  fridge: 284px of clear space above the lowered sheet.
- **The daily cookie is draggable too**, same rules, and tap still works.

### Deviations and judgement calls (rule 9 — recorded, not silently redesigned)
1. **⚠️ THE FREE COOKIE IS NEVER USED UP BY BOUGHT FOOD — her ruling, and
   it needed a NEW COLUMN.** The first draft had eating share the cookie's
   day-stamp, so feeding him an apple quietly cost him his cookie. She said
   no. `last_fed_day` was doing two jobs — "has the cookie been claimed
   today?" and "when did he last eat?" (which drives the sickness clock) —
   so the first job moved to its own column, **`students.last_cookie_day`**.
   After the split:
   - **Free cookie**: unchanged. Once a day, free, grows him, resets the
     clock — and now nothing else can consume it.
   - **Bought food**: consumed, plays the eating moment, and **resets the
     sickness clock** (it is real food; feeding him a steak must not leave
     him starving) — but pays **no growth** and leaves the cookie sitting
     there.
   Growth therefore stays exactly what phase 2 always said it was: **the
   free daily cookie is the only thing that grows a blip**, so growth can
   never be bought. The once-a-day growth cap the first draft needed is gone
   with it.
   **The new column needs no GRANT** — `revoke all on public.students from
   anon, authenticated` is already in force and every read goes through a
   SECURITY DEFINER RPC, the same basis S2 used for its two columns. It is
   backfilled from `last_fed_day` so nobody who already had a cookie today
   is handed a second one the moment it lands.
2. **The grocery shop KEEPS THE SHEET OPEN after a buy**, unlike every other
   sheet action (the S1 convention). A shopping trip is several items, and
   S1 itself flagged that convention as "worth smoothing later" — this is the
   panel where it hurt. The Food panel therefore reads `app.state` fresh on
   each render instead of the captured closure, so the fridge counts update
   in place. Feeding still closes the sheet (you want to watch him eat).
3. **A fridge tile can also be TAPPED (and Enter/Space'd) to feed**, not only
   dragged. The brief only required that for the cookie, but a drag-only
   control is unreachable by keyboard, and the tap path is the same call.
4. **The daily cookie now plays `eating`, not `excited`.** It is food; the
   eating art exists for exactly this and did not when the cookie was built.
   Both cookie and grocery feeds now WAIT for the moment to finish (~2.1s)
   before the refresh + re-render — the re-render replaces the `<img>` the
   frames run on, so without the wait the animation was one frame. New export
   `momentDurationMs()` in renderer.js keeps that number in one place.
5. **A locked food tier reuses the S3 Blip-silhouette card**, not a food
   silhouette. "The S3 locked-card pattern" is what the brief asked for, and
   one card style for both shops reads as one system.
6. **`soup` / `medicine` / `treat` are refused by name** by `mhq_eat_food`
   (`not_edible`). Soup and medicine are consumed as a PAIR by `mhq_care` to
   make one care day; eating the soup on its own would quietly break the
   recovery streak.

### Verified
- **`verify-store.html` green**, ~2418 checks (was ~1700). Eight consecutive
  runs, zero failures. New coverage: all 44 SQL rows cross-checked against the
  client mirror on price / minLevel / kind; every grocery has a label, art
  (44/44 PNGs fetched), and exactly one tier; every tier gate equals its rows'
  `min_level`; soup/medicine/treat are in no tier; buy → fridge → eat →
  consumed; **eating leaves `canFeedToday` TRUE and `feedCount` unchanged**,
  the cookie afterwards still works and IS what grows him, and a second claim
  of it reports `already_fed`; a real meal given to a genuinely tired Blip
  puts `daysUnfed` back to 0 **without costing the cookie** (the term is
  toggled on and days are stepped ONE at a time until he is tired — a fixed
  6-day jump lands him bedridden, where he correctly refuses food, and that
  failed for the wrong reason first time); `not_edible` for all three
  supplies; `no_item` for a cosmetic; a level-1 learner is refused a Lv 11
  steak while soup still sells; and the whole drag gesture (tap · drop-on ·
  drop-away · cancel · disabled · keyboard · destroy).
- **⚠️ THE CHECK COUNT WOBBLES BY A FEW, AND ALWAYS HAS.** Section 6d asserts
  a different number of things per milestone box depending on which of the
  three loot branches it rolls, so the total drifts run to run. Measured: this
  suite 2417–2420, and the **pre-S4 file re-run today reads 1699–1702, not the
  "1736" recorded above** — that number was one sample, not a constant. Don't
  go hunting for 36 missing checks.
- **The cookie rule was walked in the browser too**: dragged an apple onto
  him — apple gone from the fridge, cookie still 🍪 and tappable,
  `canFeedToday` true, `feedCount` unmoved at 4 — then tapped the cookie:
  ✅, disabled, `feedCount` 4 → 5. Growth comes from the cookie and nothing
  else.
- **Walked in the browser pane** (`?local=1`, fresh signup, **zero console
  errors**): the fridge opens the Food sheet; at level 1 only Fresh is open
  and the other five tiers show as "?" cards reading Lv 4 / 7 / 11 / 14 / 17;
  buying an apple leaves the sheet open and the count goes to "×2 in the
  fridge"; at level 8 Fresh + Bakery + Hot meals are open (24 cards) and pizza
  buys for 32; dragging an apple onto Blip plays `eating-1.png`, drops the
  pantry 2 → 1, grows him 0 → 1 and dims the cookie to ✅; dragging it away
  leaves the pantry untouched and the cookie still available; the cookie
  drags both ways with the same result and still feeds on a plain tap; Enter
  on a fridge tile feeds; and at sickness stage 2 the stash greys out, says
  "Blip is too poorly for snacks" and eats nothing.
- **The sheet-slide and the drop highlight were verified with transitions
  forced off**, because the preview pane never advances a CSS transition (no
  animation frames — the rAF limitation again), so a computed transform read
  mid-drag sits at the transition's START value and looks like the rule never
  applied. With `transition:none` the sheet really does move down to leave a
  52px lip and Blip really does scale 1.06 with the dashed drop ring. **Worth
  remembering: in this pane a frozen-looking transition is the pane, not
  necessarily a bug — but prove it that way rather than assuming.**

### Not done / punted
- **Not smoke-tested against live**, because the migration is not run. Same
  position S2 and S3 left their work in.
- **`js/companion/room-art.js` furniture is still PLACEHOLDER** — S5's job.
- The 44 prices are first guesses, like every other price in the app. They
  belong in the "price the free tier before go-live" pass already on the list.

---

## ✅ ALL EARLIER SQL IS APPLIED TO LIVE (2026-08-08, by Claude at her request)

**Nothing before S4 is pending.** Applied in order, via MCP:
1. `room_build_s2_level_curve_40_milestone_boxes_trinkets`
2. `room_build_s3_wave3_collections_sixteen_items`
3. `cut_crystal_orbit_and_neural_crown`

`migration-search-path-pin.sql` turned out to be **already applied**
(20260808072203) — it had been sitting on the pending list wrongly. Re-check
pending items, don't inherit them.

**Learner data byte-identical before and after** — 2 students (lize,
megzieberr), 2 blips, 24 progress rows, 4,580 XP, 0 gold, 79 quests all
open. shop_items 57 → 77 (+6 trinkets, +16 wave-3, −2 cut); active cosmetics
49 → **63**, which matches `verify-store.html`'s payload exactly.

**Smoke tests, all correct on live:** the curve returns L1@0 · L1@199 ·
L2@200 · L9@3959 · L10@3960 · L20@14060 · L30@30160 · L40@52260 · capped at
40 with `nextCost` null; the test account's 4,580 XP re-maps 6 → **10** as
predicted; loot_table splits 3 milestone / 5 assignment rows (phase-3 rows
untouched); rare pool 15 items; trinkets 6, none leaking into the cosmetic
payload; `milestone_grants` exists with RLS on; no student row has a null
in either new column; effects 3 / hats 13 after the cuts.

**Security advisors: 74, in the same three pre-existing classes** (31+31
SECURITY-DEFINER-executable-by-anon, 12 RLS-on-no-policy). **No new class.**

### ⚠️ NOT verified on live (be honest about this)
The **box-grant and box-open paths were not exercised against live** — that
needs a throwaway learner account, which is a bigger step than "run the
SQL" and was not done. The identical logic passes headlessly in
`verify-store.html`, but that tests `js/local-backend.js`, which is a
MIRROR of the SQL, not the SQL itself. Nobody can reach these paths until
the client is pushed, so there is time — but the house habit is a
throwaway-learner smoke test (see "How Phase 3 was verified"), and it is
still owed.

### Noted, not urgent
- `migration-level-curve-40.sql` §9 claims `_mhq_roll_loot` is "deliberately
  NOT granted to anon". It contains no REVOKE, so the recreated function is
  anon-executable like **every other** `_mhq_*` helper (31 of them). Not a
  regression and it leaks nothing — it returns a loot-row id — but the
  comment and reality disagree, so either add the REVOKE or fix the comment.

### Not urgent, but noted
- **`wizard-hat` has 7% of it over the top edge** at the position she chose
  (its tip). The dressing room flagged it amber and she shipped it anyway,
  which is her call — recorded so nobody "fixes" it, and so it is easy to
  nudge down later if the clipped tip ever bothers her in the room.
- Four eye pairs (star / angry / dreamy / wink) still want re-rolling — the
  prompts are written and waiting, see below.

---

## 🎨 2026-08-08 — ROOM BUILD S3: shop collections + mystery cards + wave-3 wiring

Per `homework-hub-companion/ROOM-BUILD-PLAN.md`. Nothing pushed, `sw.js`
untouched (still v38), no SQL run against live. `verify-store.html` is
**1736/1736 green** (was 1243 — S3 adds 493 checks: 16 new items × their
usual battery, the collections completeness assertion, and the eye-mask
DOM check).

**WAVE-3 WIRED.** All ten themed accessories (fairy-wing, flower-crown,
hair-bow, tiara, butterfly-wing, backwards-cap, sport-shades, bucket-hat,
gold-shades, snapback) plus the six eye pairs (star/angry/happy/lash/
dreamy/wink-eyes) now have renderer entries, labels and shop rows —
`supabase/migration-wave3-collections.sql`, mirrored in `schema.sql` and
`js/local-backend.js`. `star-wand` stays CUT (Blip has no hands) — not
seeded, not wired, asserted absent from ACCESSORIES.

- **Eye pairs** use `widthPct` 70 (happy-eyes 54, per the S3 brief) and a
  NEW mechanism: `mask: true` on an accessory tells `renderCompanion` to
  mount a generic body-coloured mask layer (`makeEyeMaskLayer` in
  renderer.js, same ellipse geometry sleepy-eyes' SVG already used)
  UNDERNEATH the PNG art, hiding the painted eyes without baking a patch
  into Megan's art (which would break on recolour). This is new because
  every earlier masked item (sleepy-eyes) was inline SVG and could mask
  itself; a PNG accessory couldn't until now.
- **Both wings** (fairy-wing, butterfly-wing) use `flipX: true` — her art
  roots at the lower-left like every other Tripo wing.
- **Prices/levels match the collection gates**: tomboy items L9, girly L12,
  fairy L16, gangster (gold-shades, snapback) L20, eye pairs L5. One rare
  (≥120g) per collection where the plan implied one: tiara 130g, fairy-wing
  150g.

**MYSTERY COLLECTIONS shipped.** New `js/companion/collections.js` — one
tunable file mapping every active, sellable cosmetic id to a collection +
unlock level. The Shop panel (`js/blip.js` `renderShopCosmetics`) now
groups buyable items by collection; a collection below the learner's level
collapses to ONE locked card (grey silhouette + "?" + "Unlocks at Lv N",
CSS in `css/styles.css`) — no names, prices or counts leak. An unlocked
collection shows its items exactly as the flat list always did, with a
small label header. The **Inventory** panel (closet) is UNCHANGED — a
learner's own owned items are never collection-gated, only the shop is.

### Deviations from the plan (rule 9 — recorded, not silently redesigned)
1. **"basics" and "techy" required a judgement call.** The plan's
   collection table names "wave 1+2 tech items (visors, mech arms,
   effects…)" without listing all ~49 pre-S3 ids. Read literally against
   the real catalogue, Tripo waves 1+2 mixed genuinely sci-fi pieces (the
   whole effects slot, both visors, the mech arms/ears, both tech-styled
   wings, both tech crowns) with unmistakably FANTASY pieces from the same
   waves (wizard-hat, royal-crown, back-sword, gold-wings, dragon-wings,
   eye-mask). The 15 sci-fi ones went to "techy" (Lv6); the 6 fantasy ones
   joined "basics" (Lv1) alongside the pre-Tripo SL catalogue, the
   store-expansion set, and the five plain necklaces (excluding
   chunky-chain, which the plan's table explicitly places in "gangster").
   Full split lives in `js/companion/collections.js`'s header comment.
2. **Furniture collections (basic/techy/princess) are not in
   collections.js yet.** No furniture shop_items exist until S5 ships
   them — adding empty placeholder entries seemed more likely to drift
   silently than to help, so they're deferred to S5 entirely.
3. **Unlocked collections get a small label header** ("Basics", "Techy",
   …) the plan's "shows its items as now" didn't explicitly ask for. Kept
   because several unlocked groups can render in the same scroll with
   locked cards interspersed, and an unlabelled run of grids read
   confusing in testing. Easy to remove if Megan disagrees.

### Round 2 — phone-review fixes (same session, 2026-08-08)
Megan's actual phone review of the round-1 previews caught real placement
misses. All fixed in `renderer.js`, re-verified (`verify-store.html` stays
1736/1736), re-previewed and re-sent:
- **flower-crown, hair-bow**: lowered (`attach.y` 0.20→0.235, 0.19→0.225)
  so the crown wraps his pointy head instead of hovering above it, and the
  bow sits on the front of his head. Backwards-cap, bucket-hat, snapback
  lowered too, same ask ("hats should be lowered as well").
- **tiara**: confirmed perfect, unchanged.
- **fairy-wing / butterfly-wing** — first attempt was wrong twice, then
  measured properly. See the ⚠️ block below, it is the finding that matters.

### ⚠️ THE WINGS SLOT CANNOT SHOW A TRIPO WING AT ITS SHARED POINT
Round 2 tried to fix the invisible wings by moving the anchor sideways. Megan
came back with "the wings are being cut off, I can't see anything" — the
right answer, and the reason is arithmetic, not taste. Measured off
`blip-base-blue.png`, the stage left clear beside Blip by height:

| y (of stage) | clear each side |
|---|---|
| 0.25 | 0.32 |
| 0.30 | 0.26 |
| 0.35 | 0.19 |
| 0.40 | 0.14 |
| 0.50 | 0.065 |
| **0.55 (ATTACH.wings)** | **0.042** |

`ATTACH.wings` sits at **y0.55, where only 4% of the stage is clear.** Wings
paint BEHIND the body, so at that height a solid wing has nowhere to exist:
pull it in and the body swallows it, push it out and it leaves the stage —
and `.room` is `overflow:hidden`, so it is genuinely chopped, not merely
off-canvas in the preview tool. No `widthPct` or `anchor` rescues it.

The **code-drawn** wings survive y0.55 only because they are drawn to sweep
UP from a low root, so their visible mass ends up high regardless. Megan's
Tripo wing art is a solid lobe AROUND its root, so the root itself has to
move to where the clear space is.

Fix: both wave-3 wings carry their **own higher `attach`** (fairy y0.40,
butterfly y0.44) with the root tucked at x0.56 — inside the silhouette,
which is correct for a wing root — at widthPct 45, the largest that keeps
the whole wing inside the stage box. Swept 34/40/45 × y0.36–0.50 in
`tools/preview_accessory.py`.

**This applies to the already-shipped `gold-wings` / `dragon-wings` /
`plasma-wings` / `drone-wings` too** — all four sit at the shared y0.55 and
show only a sliver. NOT changed this session (out of S3 scope, and Megan has
not flagged them), but the same one-line `attach` override fixes each, and it
is worth doing in one pass if she ever says the Tripo wings look weak.

### The lesson (worth reading before the next wave)
Both wing mistakes came from the same habit: **copying a placement number
from a sibling item instead of measuring the new art and the body it lands
on.** Round 1 copied dragon-wings' anchor. Round 2 measured the ART's root
but never asked whether the BODY had room at that height. Measure both.

## ✅ 2026-08-08 (late) — Megan re-placed the WHOLE catalogue herself

The dressing room did its job on day one. She positioned **41 accessories by
hand** and handed back `art-source/Accessories Adjustments.txt` (kept in the
repo as the record). All 41 applied to `renderer.js` and machine-verified
value-for-value against her file — `verify-store.html` **1727/1727 green**.

Worth knowing about what she changed:
- **Most items now carry their OWN `attach`.** Items that used to share
  their slot's point (bunny-ears, cat-ears, ear-tufts, mitts, power-gloves,
  stubby-arms, angel-wings, halo, horns, party-hat, round-glasses,
  heart-eyes, bolt-antenna, schoolbag, cape…) now override it. The shared
  `ATTACH[slot]` points are increasingly just a fallback for anything new.
- **She fixed the OLD Tripo wings too** — gold-wings, dragon-wings,
  drone-wings and plasma-wings all got their own higher attach, exactly the
  latent problem flagged in the ⚠️ block below. That item is now closed.
  plasma-wings also went 34 → 25 wide.
- **back-sword is now off-centre** (`attach.x` 0.65) and much smaller
  (96 → 59). Deliberate, hers, don't "correct" it back to centred.
- A batch re-check through the dressing room covered 39 of the 69 items
  before the preview pane stalled (a pane limitation, not the page):
  **zero red flags**, one amber — `wizard-hat` 4% over the edge, which is
  moot because she is re-rolling that art anyway. She also saw every one of
  these warnings live while placing them.

### 🎩 Front-view re-rolls landed; `neural-crown` retired instead
The three angled headpieces are resolved (2026-08-08, end of session):
- **`flower-crown` and `wizard-hat` RE-ROLLED front-on and sliced in**, from
  `art-source/tripo/flower crown.png` and `wizard hat.png` per
  WAVE-3C-FRONT-VIEW-HATS-PROMPTS.md. Both keyed clean as a single component
  with `--opaque`. New shapes: flower-crown **512×232** (wide shallow arc),
  wizard-hat **512×451** (flat cut-out, straight bar brim). Same ids and
  filenames, so this is a pure art swap — **no migration, no shop change.**
  **Both are now placed by Megan in the dressing room and settled**:
  flower-crown `widthPct 52 · anchor 0.5,0.85 · attach 0.5,0.385`;
  wizard-hat `widthPct 41 · anchor 0.5,0.95 · attach 0.516,0.234`.
  flower-crown reports 100% on show; wizard-hat 93%, with 7% of its tip over
  the top edge — amber, seen, and accepted by her.
- **`neural-crown` RETIRED rather than re-rolled** — her call. Same angled-
  band fault; she chose to drop it. Hat slot 14 → 13.
- ⚠️ **The filenames did not change**, so a browser happily serves the OLD
  picture from cache. This is not theoretical — it bit immediately: the tab
  reported the flower crown as 432×325 (the previous art) when the real file
  is 512×232. **The dressing room now defends itself**: the first time an
  item is picked it re-fetches that PNG with `cache: "reload"`, so you can
  never position against stale art. Elsewhere (the app, preview scripts),
  hard-refresh after an art swap.
- **The page now says so when it fails to start.** Opening it mid-edit left
  an empty shell — no items, no Blip, no explanation — which is the same
  silent-failure trap as the checks. A plain (non-module) guard script now
  shows a red box after 2.5s with what to try and the actual error. Verified
  by loading a copy with a deliberately broken import: the box appears with
  the real message, and stays hidden on a healthy load.

### ✂️ `crystal-orbit` and `neural-crown` CUT (her calls)
Same treatment as shadow-crown and pearls: deleted outright, because the app
is still with no learner. Gone from renderer, labels, collections,
local-backend, schema.sql and the "Monarch" outfit in verify-store.
**Both cuts share ONE file — `supabase/migration-cut-items.sql`** — because
neither had been run yet, so folding them together keeps her pending list to
one item rather than two. (The migrations that SEEDED them stay untouched;
an applied migration records what actually ran.) **Effects is down to 3
items** (light-ring free / flame-ring / spark-halo), which still satisfies
the "≥2 items and a free level-1 one" rule, but it is now the thinnest slot.

### ⏳ Waiting on her Tripo re-rolls (nothing broken meanwhile)
- `art-source/tripo/WAVE-3B-EYE-BLIPS-PROMPTS.md` — four whole Blips drawn
  WITH the rejected eyes (star / angry / dreamy / wink).
- `art-source/tripo/WAVE-3C-FRONT-VIEW-HATS-PROMPTS.md` — **NEW.**
  flower-crown, neural-crown and wizard-hat re-drawn **front-on**. All three
  are currently drawn at an angle so the far side of the ring shows, which
  reads as a second object floating above his head. That is a drawing
  problem, not a placement one — no attach value fixes it, which is why
  flower-crown resisted three rounds of nudging.
- Her **`art-source/blip_no eyes.png`** is measured and matches the real
  base to within 0.1% at every height. Not wired to anything yet; the
  obvious use is as the Tripo canvas for the eye prompts above.

---

## 🪞 2026-08-08 — `dressing-room.html`: Megan places accessories herself

Her call, after three rounds of corrections in one afternoon: *"is there not
a way I can position the accessories on blip, so we can stop this cycle of
claude getting the positions wrong?"* There is, and this is it.

Open `http://localhost:5191/dressing-room.html` (serve it — don't
double-click; canvas reads are blocked on `file://` and it says so).

- Pick any accessory, **drag it onto Blip**, scroll or ± to resize, arrow
  keys to nudge (Shift = coarser). Paste-ready `ACCESSORIES` entry updates
  live with a **Copy** button, and "Back to shipped" restores exactly.
- **It drives the REAL renderer.** Every layer comes from
  `renderCompanion()` with the item's own entry temporarily overwritten;
  nothing in the page re-implements placement maths. That is the whole
  design rule — `tools/preview_accessory.py` re-implements it, and that is
  precisely how it lied (see below).
- **Paired slots show BOTH mirrored copies**, and dragging keeps them
  symmetric with the grabbed side deciding the direction.
- Renders at the **sizes he actually appears** — 160px (room) and 66px
  (shop card) — so "too small to read" is visible before shipping.
- **Two checks that would have caught every mistake this session:**
  *off the picture* (`.room` is `overflow:hidden`, so overflow is genuinely
  chopped) and *hidden behind him* (only counted for the behind-the-body
  slots — effects/back/wings). Verified against the real history: the
  round-1 wing placement reports **"80% falls off the edge"**, round-2
  reports **52%**, and the shipped fix reports **"49% on show"**.

**Three real bugs were found by actually running it** — all now fixed, all
worth knowing because each failed SILENTLY (an empty verdict box reads as
"nothing to report"):
1. **`img.decode()` never settles in a page that isn't painting** — which
   is exactly what this project's preview pane is. Every picture check hung
   forever on it. Measured: the canvas work takes 5 ms, `decode()` sat there
   past 30 seconds. Now uses plain `onload`, which fires either way.
2. **A fresh 1440×1800 canvas (10 MB) was allocated per check** and thrown
   away; after a few dozen the tab stopped responding. One reused canvas,
   one ninth the pixels.
3. **Late results leaked between items** — clicking down the list, an older
   run finishing late appended its verdict to the new item's box, so one
   item showed nothing and the next showed two items' worth. Runs now carry
   a ticket number and stale ones stop quietly.
`analyse()` also wraps everything now, so a failure says so on screen
instead of leaving the box empty.

**`tools/preview_accessory.py` is now the second-best tool and a known
liar** — it pastes a paired accessory ONCE, which is why Megan saw a single
wing and reasonably concluded the mirroring was broken (it was not; the app
draws two, and `verify-store.html` asserts two). Prefer the dressing room.
The script is still handy for a quick option-strip of several values in one
image, which the page does not do. **If you use it on a paired slot, say so
out loud, or you will hand her a picture of one wing again.**

### Also fixed: `verify-store.html` had a ~25% flaky check
"the shelf and the drops disagree" failed sporadically — it passed several
times today and then went red with nothing relevant changed. The app was
never wrong. The level-10 milestone box is opened before the 60-box loop,
and a quarter of the time it pays a **trinket**, which lands on the shelf
without being recorded in the loop's `seenTrinkets` set; the final tally
then compared N+1 against N. Both `seen*` sets are now seeded from that
first box. Confirmed with **six consecutive green runs**. A flaky check is
worse than no check — it teaches you to ignore a red banner.

### Worth a look before go-live (not changed — her call)
- **`happy-eyes`** is still the weakest of the six eye pairs by Megan's own
  earlier note (unwanted mouth masked out of the source sheet) — placement
  itself previews fine at widthPct 54, this is an art-quality call only.
- **Eye pairs, her call (2026-08-08 phone review)**: only the two "pink
  makeup" pairs (lash-eyes' eyeshadow, happy-eyes' rosy cheeks) read as
  aligned correctly to her; the other four (star/angry/dreamy/wink) "look
  odd". Her plan is to regenerate those four in Tripo — drawn **on a whole
  Blip** this time, not as free-floating pairs, so the eye size and spacing
  are matched to his real face rather than guessed. **Nothing changed in
  code, waiting on her new art.**
  ⏳ **Prompts are written and ready**: `art-source/tripo/
  WAVE-3B-EYE-BLIPS-PROMPTS.md` — four prompts, one whole Blip each, plus
  what to do with the results (crop the eye region for the existing overlay
  system, or keep the whole face, which is the much bigger FACE-tab job).
  The four current `star/angry/dreamy/wink-eyes` items stay shipped and
  wired in the meantime; replacing the art is a file swap plus a re-measure,
  no migration.

Preview PNGs (both rounds) saved to
`C:\Users\megzi\AppData\Local\Temp\claude\C--Users-megzi--claude\bb30f55a-21e5-4550-a574-5820b8637517\scratchpad\wave3-previews\`
(session-scoped scratch — copy anything worth keeping before it clears).

---

## 🎁 2026-08-08 — ROOM BUILD S2: level curve (cap 40), milestone mystery boxes, trinkets

Per `homework-hub-companion/ROOM-BUILD-PLAN.md`. Nothing pushed, `sw.js`
untouched (still v38 — the review session bumps once), **no SQL run against
live**. `verify-store.html` is **1243/1243 green** (was 988 — S2 adds 255
checks: the curve, the trinket mirror, and the whole milestone grant path).

### ⏳ Pending on Megan
- 💻 **Run `supabase/migration-level-curve-40.sql`** — NOT YET RUN. It must go
  in **after** `migration-phase3.sql` (it extends phase 3's box machinery).
  The review session at the end of the room build applies it. **[with S3-S5]**
- 🎨 **The trinket art is PLACEHOLDER.** `art-source/tripo/trinkets.png`
  (prompt 4 in ROOM-PROMPTS.md) doesn't exist yet, so all six are code-drawn
  stand-ins. Swapping in your Tripo art is a one-line change per item in
  `js/companion/trinkets.js` and needs **no migration**. **[whenever]**

**THE NEW CURVE.** `cost(L) = 200 + 60·(L−1)`, cap **40** — replacing
`round(300·1.5^(L−1)/10)·10` cap 20. XP is stored raw, so **no data
migration**: every account just re-maps, and the test account's 4,580 XP goes
from level 6 to **level 10**. Anchors L10 = 3,960 · L20 = 14,060 · L30 =
30,160 · L40 = 52,260 XP (~21 / ~74 / ~159 / ~275 rounds at the measured ~190
XP per fresh round). Only two places hold the curve: SQL `_mhq_level` and
`js/companion/level.js`. Everything else reads `levelInfo` off the payload,
so nothing else hard-coded 20 — checked, and the only remaining "cap 20"
strings are historical comments and **already-applied migrations, which are
never edited**.

**MILESTONE MYSTERY BOXES** at levels 10/20/30/40, granted in
`mhq_submit_quest`, deduped by the new `milestone_grants` primary key (one per
learner per milestone, ever). Loot is server-side, in phase 3's own
`loot_table` extended with a `box` column — **not a fork**, so the homework
chest keeps its exact gold 55 / food 30 / cosmetic 15 split untouched:
- **50% diamonds** = 10 × the milestone level (100 at L10 … 400 at L40).
- **25% rare cosmetic**, guaranteed-new, pool = unowned actives priced ≥ 120 at
  **any level** — a rare above your level is the fun of it; it waits in the
  closet until the gate opens.
- **25% trinket** (see below). Either pool running dry pays diamonds instead,
  never a duplicate and never a dud.

**TRINKETS** — pen · odd sock · smooth rock · paper clip · rubber duck · broken
ruler. `shop_items` category `trinket`, price 0, invisible in the shop (the
payload filters `category = 'cosmetic'`, so no "hidden" flag was needed), not
equippable, and they live on the **student** rather than a blip — a shelf
belongs to the room, so browsing your second Blip still shows your own shelf.
They fill the SHELF strip S1 left empty in the Inventory panel, and are
display-only: no buttons, nothing to wear. That is the whole joke.

**Verified in the browser (`?local=1`, fresh signup, zero console errors):**
the 🎁 badge appears and now says "a mystery box is next" when one is queued;
the modal titles itself **Mystery box / Milestone** before the tap (it reads
`boxes.mystery`, sharing the server's milestone-first rule) and falls back to
the ordinary Treasure box wording when only a homework box is waiting; sixteen
consecutive milestone boxes produced all three branches — `+200 💎` at
milestone 20, five rares (Jetpack, Bat wings, Neural crown, Medal choker,
Plasma wings — all above the test account's level, as designed), and two
trinkets which then appeared on the shelf reading "2 of 6 — mystery boxes hold
the rest"; the HUD reads Lv 10 with a 32% bar at 4,200 XP (240 of 740) and
Lv 40 / 100% / `nextCost: null` at the cap. **Headless (verify-store.html):**
crossing level 10 grants exactly one box, replaying grants nothing, 60
milestone boxes obeyed every pool rule, and the homework chest still pays its
own 15–40 band and never a trinket.

### Deviations from the plan (rule 9 — recorded, not silently redesigned)
1. **The milestone test is `level >= milestone`, not "crossed on this
   submit".** The curve change re-maps the existing test account to *exactly*
   level 10 without any submit ever crossing it, so a strict crossing test
   would owe that account a box it could never receive. The primary key gives
   the identical one-box-ever guarantee, so `>=` is just kinder to anyone
   already past a milestone when this lands.
2. **`milestone_grants` is keyed per STUDENT, not per blip.** The plan says
   "per blip", but XP and level live on `students`, not on a blip — per-student
   is the only reading that can work.
3. **`schema.sql` could only be mirrored in part.** Phase 3 never landed in
   that file (a pre-existing gap, not one this session widened), so the pieces
   of this migration that touch `loot_table` / `box_grants` / `boxes_pending`
   have nowhere to go there. Everything touching an object `schema.sql` *does*
   define IS mirrored, and its header now states the gap and the correct
   rebuild order: `schema.sql → migration-phase3.sql → migration-level-curve-40.sql`.

### Worth a look before go-live (not changed — her call)
- **`secondBlipLevel` is 10**, and level 10 is now ~21 rounds away instead of
  ~120. So hatching a second Blip and the first mystery box now land in the
  same moment, quite early. That reads as a good moment rather than a clash,
  but it is a real pacing change and the number is hers to move (`js/config.js`).
- **Item level gates were tuned to the old curve.** `jetpack` at L10 used to be
  a season's work; it is now about three weeks. Retuning is a migration plus
  the mirror, and belongs with the "price the free tier" job already on the
  list — worth doing in one pass rather than twice.

---

## 🏠 2026-08-08 — ROOM BUILD S1: room shell, hub button, inline nickname

Per `homework-hub-companion/ROOM-BUILD-PLAN.md` (frozen design, Fable +
Megan). UI only, no DB/SQL changes, nothing pushed, sw.js untouched.
`verify-store.html` unaffected: **988/988 still green** (same count as
before — S1 touched no catalogue data).

- **Hub**: the rectangular "Blip — tap to visit Blip" card is gone. A
  small pulsing circular button now sits beside "Hi, `<name>`" — same
  `app.go("blip")` target. The hub's cookie-feed badge is also gone
  (feeding is now exclusively on the room screen's top-right cookie
  button) — a deliberate simplification not spelled out in the plan, but
  the natural corollary of "the card is gone entirely" once feeding moved.
- **Blip screen → his ROOM**: nickname is now tap-to-edit inline (a plain
  button that becomes an `<input>`; Enter/blur saves, Escape cancels) —
  the old permanent input + Save button is gone. "Your study companion"
  subtitle added. Daily cookie moved to a top-right button on the room
  card (dims to ✅ once fed), reusing the old hub cookie badge's CSS/
  animation. Room layout: fridge top-left, bed top-right (wide), closet
  bottom-left, desk bottom-right, Blip centred on his existing glow
  pedestal — all PLACEHOLDER code-drawn SVG (`js/companion/room-art.js`),
  swapped for Megan's Tripo art in S5.
- **Tappable furniture**: closet opens the Inventory panel (renamed from
  Closet, now with an empty "shelf" strip placeholder for trinkets — S2
  fills it with milestone-box loot); fridge opens the Food stash panel
  (pantry soup/medicine counts + a "shop coming" note — same content the
  bottom FOOD button opens). Bed/desk just wiggle (no panel yet).
- **Bottom sheets**: five round dock buttons (colours/shop/food/pharmacy/
  furniture) open a shared bottom-sheet component (reuses the app's
  existing `.modal-scrim`/`.modal` convention, lighter backdrop so the
  room stays visible behind — `.room-sheet-scrim`). "Next →" cycles that
  fixed order, wrapping; "Done" closes. Colours/Shop/Pharmacy content is
  the exact same data + API calls as before, just relocated. Furniture
  sheet is a placeholder card (S5 fills it).
- **Sheet convention (a judgement call, worth knowing before S2-S5 touch
  these files)**: every backend-mutating action inside a sheet (buy, wear,
  equip colour, feed treat) **closes the sheet** before the app's normal
  full refresh + re-render — matching how every other action in this file
  already worked pre-room-build (`await app.refresh(); app.go("blip")`).
  Non-mutating interactions (the slot-tab filter inside Inventory/Shop)
  redraw the sheet's body in place via `activeSheetRerender()` without
  closing it. This means a purchase closes the shop sheet rather than
  staying open — simplest-safe choice for S1; worth smoothing later if
  Megan wants to stay in the shop after a buy.
- New file `js/companion/room-art.js` — four PLACEHOLDER furniture SVGs
  (fridge/bed/closet/desk), navy/electric line art, explicitly marked
  PLACEHOLDER in comments.
- Verified live in the browser pane (`?local=1`, fresh signup): hub
  button navigates to the room; nickname edits and saves (blur path —
  the pane's synthetic Enter keydown didn't route to the focused input,
  a known pane limitation, but Enter calls the identical `save()` as
  blur, both wired); fridge/closet open their panels non-cycling; the
  five dock buttons cycle in order and wrap; buying a free shop item
  closes the sheet, and the item then shows owned in Inventory; desk
  wiggles on tap; the cookie button feeds and dims to done. Zero console
  errors throughout.

---

# (previous) Project status — updated 2026-08-07 PM (audit fixes applied, NOT committed)

## 🔧 2026-08-07 — overnight audit fixes (local; `verify-store.html` 988 checks green)

Off `FABLE-AUDIT-2026-08-06.md`. Nothing committed, nothing run against live.

- **🔴 `?local=1` was a one-way trap — now it lets go.** `js/api.js` set
  `mhq.forceLocal` if the parameter merely EXISTED, so even `?local=0` deepened the
  trap, and nothing ever cleared it. Any phone that opened a testing link was stuck
  in the demo world for good: real progress apparently gone, nothing saving, and no
  cure short of devtools on the learner's own phone. **`?local=0` (also `false`/
  `off`/`no`) now clears the flag.** Proven in the browser: flag cleared, backend
  resolved back to `supabase`. **That URL is the fix to text a learner** if a phone
  ever lands in demo mode. Harmless today (no learner has the app) — which is exactly
  why it was worth fixing now.
- **🔴 `schema.sql` was THREE ships behind, not two**, and its header said "safe to
  re-run" four lines above `drop table students`. Fixed:
  - `effects` **and** `neck` added to `shop_items_slot_cat_check` **and** to
    `mhq_equip`'s allowed keys (the audit only caught `effects`; the neck ship landed
    after it ran). Both are needed — seeding rows alone leaves equip returning
    `bad_equipped`, which is the July cape bug.
  - **Catalogue regenerated from live** by a read-only query: exactly **57 rows
    (54 cosmetics + 3 food)**, no duplicates, `shadow-crown` correctly absent. This
    replaced the old hand-maintained block, so the file now provably matches live.
  - Header replaced with **⚠️ NEVER RUN THIS ON THE LIVE DATABASE** and a note that a
    schema change goes in TWO places — this file AND a migration. That "AND" got
    skipped three times, which is how it drifted.
- **`search_path` pinned** on `_mhq_level` / `_mhq_growth` in schema.sql, plus a new
  **`supabase/migration-search-path-pin.sql`** for live. ⏳ **NOT RUN — pending on
  Megan.** Safe, idempotent, changes no data; both functions use only pg_catalog
  built-ins so `search_path = ''` is safe (checked line by line).
- **Stale comments fixed**: `js/admin.js` no longer says "readable passwords" (they
  are bcrypt-hashed and unreadable by anyone); `js/supabase-config.js` said the key
  was `cgg.forceLocal`, it is `mhq.forceLocal`; wave 2 is "10 shipped, 5 cut", not 15
  (local-backend + renderer); `tools/tripo_sheet.py` describes connected components,
  not row/column projection; README no longer mentions seeding a class list;
  CLAUDE.md's cache-version line pointed at v25 while the repo shipped v37.
- **hud-monocle**: the comment claimed widthPct 25 was the measured shipped value
  while the code says 28. Now recorded honestly — measuring gives 25 (lens ≈0.16 of
  the stage), 28 ships (≈0.18) because 25 read as too small. Otherwise the next
  re-tune chases a bug that is not there.

### ⏳ Pending on Megan
1. **Run `supabase/migration-search-path-pin.sql`** in the SQL editor (optional, tidy-up).
2. ~~Confirm the empty `quests` table is expected — live has 0 quest rows.~~
   ❌ **THIS WAS FALSE, withdrawn 2026-08-07.** Live holds all **79 quests** across
   11 chapters (stats 8 · finance 7 · prob 7 · trig 7 · meas 6 · func 7 · tgraph 7 ·
   analytical 7 · pat 7 · exp 8 · eqn 8), and **all 79 are open**. Nothing to do.
   ⚠️ **The number came from the MCP's `list_tables`, whose row counts are Postgres
   PLANNER ESTIMATES (`reltuples`) — 0 for a table filled by a migration and never
   analysed since.** It was relayed into the audit and repeated three times before
   anyone ran `count(*)`. **Never quote a row count from `list_tables`.**
   (Worth a glance whenever convenient, but not a defect: the house habit is to seed
   a new chapter CLOSED and open it per class — all 79 sitting open is presumably
   deliberate from testing, and it is hers to set either way.)

**Not changed (accepted risk, recorded once):** the client computes its own score and
XP; the server caps XP at 1000 per submit and pays a flat 10 gold per submitted round,
pass or fail. Inherent to the no-JWT architecture, fine for a class that does not know
it is possible — worth saying out loud before go-live.

---

# (previous) Project status — 2026-08-07 (NECK slot live; 26 new food; sw v37 pushed)

## Where we are
**CURRENT AS OF 2026-08-12 — everything below this paragraph is history, kept
for the record.** Blipwork is fully live at https://megzieberr.github.io/blipwork/
on **sw v44**, with every migration applied. Blip's room is the home screen; the
desk opens the quests. The room now sells **47 furniture pieces across 8 slots**
(bed · desk · window · door · shelf-left · shelf-right · beanbag · wall), the
door slot carries 9 tinted colours plus 6 patterned closet designs, and the
second Blip hatches from an 🥚 beside his name at **level 20**. `verify-store.html`
runs **3,748 checks green**. Learner data has been hash-verified byte-identical
across all three of today's ships (2 students, 2 blips, 24 progress, 4,580 XP).
**No learner has the app yet**, so a cut item is still deleted outright rather
than deactivated. Uncommitted on purpose: `FABLE-AUDIT-2026-08-06.md` (public
repo — Megan hasn't said whether the audit notes may be published).

**NECK SLOT (8th cosmetic slot) — BUILT + 3 MIGRATIONS APPLIED TO LIVE, smoke-
tested 10/10.** Shop 43 → **49 active cosmetics**. Neck sells 6: bead-necklace
(FREE L1), flower-garland 60/L3, star-chain 80/L4, heart-chain 95/L5,
medal-choker 125/L6, chunky-chain 160/L7. Learner rows verified byte-identical
after every migration (2 students, 24 progress, 4580 XP).

**EATING + SAD moments are sliced, wired and verified in-app** (play once, both
recolour). Sad plays when a dragged food is dropped away from Blip — her ruling:
the food floats back to the pantry, no penalty, and Blip pulls the sad face.

**26 MORE FOOD PNGs cut** (hot meals, braai, veggies, drinks — the drinks sheet
gave 8, two free extras), joining the first 18 in `assets/companion/food/`.
**44 food items ready; NONE are in the shop yet** — that's the next build job.

**Wave-3 accessory art is cut but NOT wired**: fairy (fairy-wing, star-wand,
flower-crown), girly (hair-bow, tiara, butterfly-wing), tomboy (backwards-cap,
sport-shades, bucket-hat), gangster (gold-shades, snapback), and six eye pairs
(star/angry/happy/lash/dreamy/wink-eyes). All pass structure checks; placement
passes + shop rows still to do. `happy-eyes` is weak (Megan may re-roll).

Live at https://megzieberr.github.io/blipwork/, service worker **mhq-v37** pushed.

**TRIPO WAVE 2 — SHIPPED 2026-08-06, ✅ migration APPLIED to live and smoke-tested.**
Shop **34 → 43** items. The thin slots are fixed: ears and arms go 3 → 6.
No new slot, so `mhq_equip` and `shop_items_slot_cat_check` were untouched.
`verify-store.html` is **886/886 green**.

Megan drew 15 and **kept 10**. She cut five on sight — scanner band, energy
core, circuit ring, grid ring, plasma ring — and retired wave 1's
**shadow-crown** at the same time. Those are gone from the renderer, labels,
catalogue, migration and disk; shadow-crown was DELETED from live rather than
deactivated, because the app is not with any learner yet (verified: 0 blips
owned or wore it). Once kids are on it, retire with `active = false` instead.

**The slicer had a real bug and wave 1 was quietly carrying it.**
`tools/tripo_sheet.py` judged how solid a pixel was only by how much magenta
could be unmixed out of it. That is genuinely ambiguous for mid-grey — opaque
steel and half-opaque green over magenta are the same colour — so wave 2's
brushed steel came out green and half-transparent (measured: rgb(136,148,160)
read as 54% opaque, unmixed to rgb(37,247,82), a third of each item). It now
ALSO judges by distance from the background colour, and masks each crop to its
own connected component. **All twelve wave-1 items were re-cut**: the green
edging on cyber-visor (2.9% of visible pixels), shadow-crown, back-sword and
dragon-wings is gone.

**EFFECTS SLOT + TRIPO WAVE 1 — SHIPPED 2026-08-05, ✅ migration APPLIED to live
and smoke-tested 16/16.**
A seventh cosmetic slot (`effects` — auras/glows painted behind everything)
plus top-ups for hat/eyes/wings/back: 12 new items, shop 22 → 34.
All twelve are Megan's own Tripo art rather than code-drawn SVG.
`verify-store.html` is **685/685 green** with the real art in place, and every
item has been LOOKED at on Blip via headless Chromium, not just asserted.

- `tools/tripo_sheet.py` — keys the flat-magenta background out of a Tripo
  sheet and cuts it into per-item transparent PNGs. Tested by
  `tools/test_tripo_sheet.py` (synthetic sheet, exact-recovery assertions).
- PNG accessories are a new renderer path (`img:` instead of `svg:`) sharing
  the existing attach/anchor/widthPct/mirror machinery.
- `supabase/migration-effects-slot.sql` — applied 2026-08-05.

Verified end-to-end on the local backend with placeholders: all five effects
in the shop payload, the free one buys at 0 gold, it equips to the NEW slot
and sticks, a bogus id is refused with `bad_equipped`, the Effects chip
renders in the real shop UI, and layer order is effects → back → wings →
body → ears → eyes → hat → arms.

**STORE EXPANSION shipped 2026-07-28 — ✅ migration APPLIED to live and smoke-tested
(14/14).** The shop
went from 6 buyable items to **22**, across **6** slots — the new one being **back**
(cape / schoolbag / jetpack). Four of the five old slots sold exactly ONE item, so
there was nothing to choose between; the whole catalogue also cost 475 gold, about a
week of play, after which gold had no purpose.

- **16 new accessories**, all code-drawn SVG per the 2026-07-19 ruling (no imported
  art — see Decisions for why the free-asset route was rejected).
- **Free tier**: one item per slot at 0 gold / level 1, so a brand-new learner can
  dress Blip head to toe before earning anything.
- **Closet / Shop split** with a scrolling slot filter (All · Hat · Eyes · Ears ·
  Arms · Wings · Back). The old single flat grid was fine at 6 items and a scroll
  wall at 22.
- `verify-store.html` — **428 assertions, all green**, including a parse of the
  migration SQL cross-checked against the client's catalogue mirror (that is the
  drift that bites: an item added to one side only).
Phase 3 shipped as one commit, built by three parallel agents against a frozen
contract (`homework-hub-companion/PHASE-3-PLAN.md`) with the SQL and all
shared-file splices written by the lead session so nothing collided.

Three features, all client-complete:
1. **Sick-stage push warnings** — dormant until the VAPID key is set.
2. **Teacher-assigned homework** — one active assignment, pinned to the hub.
3. **Treasure box** — one per completed assignment, opened on the Blip screen.

✅ **`supabase/migration-phase3.sql` HAS been applied to live** (2026-07-19, via
MCP, migration `phase3_push_homework_treasure`) and smoke-tested end to end with
a throwaway learner that was deleted afterwards — 21/21 steps correct. Learner
data verified byte-identical before and after (1 student, 24 progress rows,
4580 XP, 0 gold, 0 boxes). Homework and the treasure box are therefore **live
and working right now**; push is live but dormant until the VAPID key is set.

The Circle Quest → Blipwork link was explicitly deferred (see Decisions).

## Decisions
- 2026-08-12: **Two shelf slots, one per wall** (her call), and she placed the shelves
  and bean bag herself in the dressing room. Her numbers are the rulings, as always.
- 2026-08-12: **Themed furniture sets unlock at nerdy 4 · sport 11 · emo 18** — she asked
  for a recommendation and took it. Furniture now unlocks at 1·4·8·11·14·18, matching the
  food tiers' rhythm.
- 2026-08-12: **Shelves and the bean bag have NO free default and can be genuinely empty.**
  A bed you can't remove makes sense; a shelf you can't take down doesn't.
- 2026-08-12: **`wall` is an ordinary equip slot that draws no layer** — a wallpaper
  replaces the room shell rather than sitting on it. Client-side distinction only.
- 2026-08-12: **"Never add a second door PNG" reworded, not broken.** The ruling is about
  COLOURS (one drawing tinted nine ways). A patterned closet is its own design and its own
  file. Colour → tint. Design → its own file.
- 2026-08-12: **The second Blip moves to level 20** (was 10), and the hatch prompt becomes
  an 🥚 beside the nickname instead of a card at the bottom of the room screen. Her ruling
  on both. Nobody lost anything — checked live first: 0 second blips, highest level 10.
- 2026-08-12: **Closet prices/levels APPROVED by her as proposed** — 40/60/70/80/100/120 💎
  at Lv 3/7/10/13/16/20. ("Closet prices are fine.") They were my numbers, now hers.
- 2026-07-06: App identity = low-intimidation QUICK RECAP tool (revise the week's work /
  a fast round before past papers) — NOT a full homework session. Keep quests short and
  atomic; don't grow them into long worked-problem sets.
- 2026-07-06: Tap + keypad answering is deliberate and stays — marking is about maths,
  never spelling/handwriting.
- 2026-07-06: Calc tolerances are sized per-question from measured rounding drift of the
  printed solution's own method (e.g. t6 regularPolygon tol 0.5) — never tighten back to
  the 0.001 default without re-measuring.
- 2026-07-06: Casio-EXCLUSIVE quartiles stay in the calculator sim (matches the real
  fx-991ZA); quests/box plots keep the (n+1)/4 school method. Comment in calculator.js
  now says so.
- 2026-07-06: mc() in _shared.js keeps string-only de-dup by design; generators must
  self-filter decoys BY VALUE (all chapters now do — copy that pattern in new content).
- 2026-07-19: REBRAND to **Blipwork** (name chosen by Megan — "homework" pun). Character
  is "Blip" by default; kids may nickname their own Blip ANYTHING (free-form, max 24
  chars, no filter needed because nicknames are never displayed publicly — only usernames
  appear in the gallery).
- 2026-07-19: Base body art = Megan's GPT-generated PNG, used as-is; accessories are
  CODE-DRAWN SVG composited at attachment points (never GPT-drawn onto the body).
- 2026-07-19: XP and Gold decoupled. XP = levelling only, never spent; Gold = shop only,
  never rank. ~~Level curve cost(L) = round(300·1.5^(L−1)/10)·10, bar resets per level,
  cap 20~~ — **curve SUPERSEDED 2026-08-08, see below**; the XP/Gold split and the
  "single source of truth is SQL `_mhq_level`, mirrored ONLY in js/companion/level.js"
  rule both still stand.
- 2026-08-08 (S2): **Level curve is cost(L) = 200 + 60·(L−1), cap 40.** The old
  exponential curve needed ~120 rounds for level 10 and put level 20 out of reach, so
  no milestone pacing was possible. XP is stored raw — a curve change is therefore
  never a data migration, just a re-map. Changed the day zero learners had the app,
  which is the only cheap moment to do it.
- 2026-08-09: **The room IS the home screen** (her words: "blip's room is the first
  thing the kids see… click on the study desk, that takes them to the blipwork
  quests"). Desk tap = the maths, NEVER health-locked; bed/window take over the
  furniture-panel job; the hub keeps everything else and the pulsing Blip button is
  the way back. The logo tap also goes home-to-the-room.
- 2026-08-09: **Homework badge = her red book-with-"!" on the desk, active
  assignments only** — a DONE assignment must never badge the desk (the "no nagging
  repeat" ruling extended to cues). Card keeps its gentle ✓ done-state on the hub.
- 2026-08-09: **Buying wears it immediately** (cosmetics and furniture) — chained
  client-side equip after a successful buy; quiet skip at dress-lock, a successful
  buy never surfaces an error.
- 2026-08-09: **Tutorial = ported WhenWorks tour, ambush-on-first-login by design**
  (kids, not parents — the R11 invite rule deliberately NOT ported), plus a
  permanent ❓ replay button in the room header. Bubble copy is hers to edit in
  js/companion/tour.js stepsFor().
- 2026-08-09: **Wallpaper = whole-shell swaps** (`room-shell-<name>.png`), proven
  geometry-safe (99.7% silhouette overlap, floor lines aligned). The door-tint
  fallback is dead. Angled/isometric TRIPO ART RULE confirmed both ways: badge-type
  floats over iso furniture SHOULD be angled; wall pieces must match their wall's
  rake (measure, don't eyeball — the L-desk re-roll proved it again).
- 2026-08-08 (S2): **Milestone boxes are deduped by a primary key, and that key is
  never cleared by a progress reset.** A reset drops XP so the gates re-lock (the
  2026-07-19 ruling), but a prize already won is never confiscated and re-climbing
  must not re-farm boxes. Same shape as phase 3's `box_grants`.
- 2026-08-08 (S2): **The milestone rare pool ignores min_level.** Every other pool in
  the app filters to what she can already wear; this one deliberately doesn't, because
  a rare above your level is the fun of a milestone box — it sits in the closet as
  something to climb toward. It is also why the pool floor is price ≥ 120 rather than
  price > 0: a milestone must not pay out a 30-gold pair of sleepy eyes.
- 2026-08-08 (S2): **Trinkets belong to the STUDENT, not to a blip.** Cosmetics are
  per-blip because they are worn; a shelf belongs to the room, so a learner browsing
  her second Blip must still see her own junk. That also keeps trinket ids out of
  `blips.owned_items`, so they can never leak into a cosmetic loot pool or a closet grid.
- 2026-08-08 (S2): **Trinkets are guaranteed-new, like cosmetics.** Six of them against
  four milestone boxes makes duplicates genuinely likely, and a second identical sock is
  the same let-down as a duplicate hat. All six owned → the box pays diamonds instead.
- 2026-08-08 (S2): **`mhq_buy_item` now refuses any non-cosmetic, non-food category.**
  It fell through to the cosmetic branch for anything that wasn't food, so a crafted
  request could have "bought" a price-0 trinket. Nothing in the app asks for one — but
  "never in the shop" belongs on the server, not in the client not offering it.
- 2026-08-08 (S2): **`loot_table` gained a `box` column rather than a second table.**
  Phase-3 rows default to 'assignment', so the homework chest's weights are untouched
  and both boxes stay tunable in one place, server-side, as the phase-3 ruling requires.
- 2026-08-08 (S4, **her ruling**): **The free cookie is NEVER used up by bought
  food.** A first draft had the two share `last_fed_day`, so feeding him an apple
  quietly cost him his cookie; she said no. `last_fed_day` was doing two jobs, so
  the cookie's got its own column, **`students.last_cookie_day`** (no GRANT needed —
  all privileges on `students` are revoked and access is RPC-only, as for S2's two
  columns; backfilled from `last_fed_day` so nobody gets a second cookie on day one).
  Now: bought food is consumed and **resets the sickness clock** (real food must
  actually feed him) but **pays no growth and leaves the cookie alone**; the free
  cookie is still the ONLY thing that grows a blip, so growth can never be bought.
  ⚠️ Anyone tempted to fold those two columns back together re-creates the bug —
  verify-store asserts `canFeedToday` stays true and `feedCount` unchanged after a
  grocery feeding.
- 2026-08-08 (S4): **The 44 groceries are ordinary `category='food'` rows.** No new
  category and no new slot — `mhq_buy_item`'s food branch already put any non-`treat`
  food into the pantry. Only these had to change: `minLevel` joins the `foodShop`
  payload, the food branch honours `min_level` (soup/medicine/treat are level 1, so
  the pharmacy cannot be affected), `mhq_eat_food` is new, and `mhq_feed` now reads
  the `last_cookie_day` column added for the ruling above.
- 2026-08-08 (S4): **soup / medicine / treat are refused by name as snacks**
  (`not_edible`). `mhq_care` consumes soup and medicine as a PAIR to make one care
  day; eating the soup alone would silently break the recovery streak.
- 2026-08-08 (S4): **The grocery panel keeps its sheet OPEN after a buy**, breaking
  S1's "every mutation closes the sheet" convention on purpose — a shopping trip is
  several items, and S1 itself flagged that convention as worth smoothing. It reads
  `app.state` fresh on each render so the fridge counts update in place. Feeding
  still closes the sheet: you want to watch him eat.
- 2026-08-08 (S4): **A moment must be waited out before the screen re-renders.** The
  refresh replaces the `<img>` the frames animate, so `playMoment` + immediate
  `app.go("blip")` showed exactly one frame. Both feed paths now wait
  `momentDurationMs("eating")` (~2.1s) first. The daily cookie also switched from
  `excited` to `eating` — the eating art did not exist when the cookie was built.
- 2026-07-19: **NO daily cap** (Megan overrode the planned cap): the app doubles as exam
  revision, so unlimited rounds count — replays pay 25% XP + full gold; pacing comes from
  the curve + level-gated shop items.
- 2026-07-19: First non-cream colour = reward for first completed round (server-enforced
  xp > 0, not just UI).
- 2026-07-19: Leaderboard → gallery/showcase: usernames + builds + level, alphabetical,
  no scores, no ranking.
- 2026-07-19: Accessory placement is PER-ACCESSORY by phone review: hat/wings/glasses
  FLOATY BY DESIGN (Megan: "cute"); ears/arms ATTACHED (overlap the body outline; arms
  redrawn as capsules and fills matched pixel-exact to the recoloured body). Recorded in
  renderer.js ATTACH comments — do not "fix" the floaty ones.
- 2026-07-19: Teacher "reset progress" zeroes XP (level drops, gates re-lock) but KEEPS
  gold, owned/equipped items, colour, nickname — resets never confiscate the blob.
- 2026-07-19: Shop prices are placeholders (glasses 40/L1, cat-ears 60/L2, party-hat
  80/L3, arms 100/L4, wings 150/L6) — tune after real play data.
- 2026-07-19: Backlog phase 2 (recorded in homework-hub-companion/plan.md): grocery-store
  food shop, daily cookie feeding on login, and Pou-style GROWTH (Blip starts baby-small,
  grows with feedings — renderer is size-agnostic so growth = a scale factor).
- 2026-07-19 (late): **Recovering joins the sick family for rendering** — as-authored, no
  recolour. Its blanket is drawn INTO her frames, so `animatedHealthOverlaySpec` returns
  null for it. It is also checked BEFORE health in `idleAnimState`, because the backend
  reports `recovering` while healthStage is still 2-3.
- 2026-07-19 (late): The **wink is a double-wink** — her frame 3 winks the opposite eye
  and grins. Shipped as drawn (all four frames, in order). If a single wink is ever
  wanted, that is a re-roll of the row, not a code change.
- 2026-07-19 (late): Recovering uses **`Recovering Blip 2.png`**, not the first sheet —
  cleaner blink rhythm, no stray sweat drop in frame 4.
- 2026-07-19 (late): Baby loops keep only the frames whose EXPRESSION matches the state.
  Her rows are sequences, not loops (sleeping ends wide awake; "happy" is book-ended by
  crying), so looping them whole would make him blink awake or burst into tears.
- 2026-07-19 (late): **Taps are ignored while he is sleeping / sick / recovering** — a
  bedridden Blip cheerfully hopping undercuts the care mechanic.
- 2026-07-19 (late): App icons are generated from **`New Logo.png`** (Blip + glow, no
  tile). The previous artwork nested a glowing tile inside the launcher's own container,
  which is why Blip read tiny on the home screen.
- 2026-07-19 (Phase 3): **Circle Quest → Blipwork link DEFERRED** (Megan): the kids get
  to finish their current CQ rounds first. Nothing in `circle-geometry-game` was touched
  — its push stack was copied out read-only, and its clean tree was verified after.
- 2026-07-19 (Phase 3): Push nudges fire on stage **transitions only** — day 3 (tired),
  day 5 (bedridden), day 6 (last warning) — and are **silent at critical**. She has
  already been told twice by then; nagging a learner who has disengaged is the wrong
  move. Skipped if already fed today, and gated by `_mhq_is_qual_day` so weekends and
  holidays are silent. One push per learner per day, enforced server-side.
- 2026-07-19 (Phase 3): `push_subscriptions.last_push_stage` stores the **message level**
  (1/2/3), NOT the health stage — health stage 2 spans days 5 AND 6, so day 6's final
  warning is invisible at health-stage granularity.
- 2026-07-19 (Phase 3): **One active assignment at a time, and no penalty for missing
  it.** A spotlight, not a deadline: optional due date renders as a soft "by Friday",
  never a countdown or an overdue badge. Setting homework NEVER opens a closed quest —
  admin only offers open ones.
- 2026-07-19 (Phase 3): Assignment `done` is read from **box_grants, not
  progress.passed** — passed stays true forever once earned, so it cannot say whether
  THIS assignment was completed. Re-assigning the same quest is a genuinely new
  assignment and legitimately earns a second box.
- 2026-07-19 (Phase 3): **One box per completed assignment**, deduped by the
  `box_grants` primary key so replays cannot farm boxes. Loot weights live in the
  `loot_table` table (gold 55 / food 30 / cosmetic 15) and never reach the client.
- 2026-07-19 (Phase 3): Cosmetic drops are **guaranteed-new** — the pool is filtered to
  unowned items at or below her level, granted to blip slot 1; an empty pool pays gold
  instead. A box handing back a hat she already owns is a punishment, not a prize.
- 2026-07-19 (Phase 3): Box food loot is **soup/medicine only, never cookies** — the
  cookie is the free daily `feed()`, not a pantry item, so a pantry cookie would be dead
  inventory. Boxes stocking the pharmacy also helps a learner whose Blip has fallen ill.
- 2026-07-28 (store): **Free accessory art was researched and rejected.** game-icons.net
  (CC BY 3.0, 4180 icons) is the best-fitting library, but its files are single white
  silhouettes in a 512 box with no outline or internal detail, its wings/capes are drawn
  as one two-sided object (useless for our mirrored paired slots), and using it puts a
  permanent credit line in a learner-facing app. Refitting one is about the same work as
  drawing a simple shape from scratch. OpenMoji was ruled out separately — CC BY-SA is
  viral onto derived art. Verdict: keep drawing them, use icon libraries only as visual
  reference. Megan's call, after the research.
- 2026-07-28 (store): **A back item can only be read from what peeks.** Blip is a wide
  egg — measured off the blue base's alpha: y0.20 → 0.202 wide, y0.65 → 0.94 wide, body
  ends y0.885. So anything behind him is completely hidden between roughly y0.35 and
  y0.85. All three back items are designed around that: shoulders/collar above, hem or
  thrust flames below, nothing that matters in the middle. Don't "fix" the hidden middle.
- 2026-07-28 (store): **A back item must CONTRAST with the body, not match the palette.**
  The schoolbag's first pass used the accessory blues and simply vanished; it is amber
  now. Anything new in the back slot needs a non-blue fill.
- 2026-07-28 (store): **Rarity is derived from price, not stored** — 0 = free badge,
  ≥120 = the theme's violet rare frame. No new column, no backfill. Retune the bands in
  `itemRarity()` in blip-ui.js, one place.
- 2026-07-28 (store): **Free items are bought, not granted** — they sit in the shop at
  price 0 and take one tap. That avoided backfilling owned_items for every existing
  learner. They are also excluded from treasure-box loot (`price > 0` in the pool):
  a box handing over something the shop gives away is the same let-down as a duplicate.
- 2026-07-28 (store): The glasses convention is now measured, not guessed — the painted
  eyes sit at stage x 0.308 / 0.688 spanning y 0.487–0.63, so every eyewear item uses
  viewBox width 210, lens centres x=60/x=150, widthPct 90. An eye-SHAPE item (sleepy
  eyes) additionally needs body-coloured mask ellipses or the painted eyes show through.
- 2026-07-28 (store): The beanie gets its own lower `attach`. The hat/wings/glasses
  FLOATY ruling from 2026-07-19 stands for party-hat and halo, but a floating beanie
  reads as a bug rather than as cute.
- 2026-08-05 (Tripo): **Tripo IS a proven art source** — Megan makes sprites with
  it daily (Re:Lefela's Katse cats). Accessories therefore come from her Tripo
  image tool as 2D PNGs, not from 3D models: accessories never animate, so 3D
  buys nothing for them. Do not re-litigate this.
- 2026-08-05 (Tripo): the drift-killer is her **locked-reference prompt** —
  "use the attached picture as a locked reference, same shapes, same
  proportions, same outline" with one reference image reused for the whole
  wave. Same reference every batch or the set stops matching.
- 2026-08-05 (Tripo): the image tool does **not** emit real alpha, it paints a
  fake checkerboard. So sheets are generated on flat **#FF00FF with no drop
  shadows** and keyed in `tools/tripo_sheet.py`. No more Canva by hand.
- 2026-08-05 (Tripo): **do not fill interior holes when keying.** It is the
  obvious way to stop dark items going see-through and it destroys ring
  effects (annulus) and the eye mask (cut-out eye holes). A per-pixel
  distance test keeps solids opaque without touching topology.
- 2026-08-05 (effects): an effect only reads if it is **wider than he is**
  (0.94 of the stage at his widest), hence widthPct ~110. A compact mass
  instead of a ring must carry its own LOW `attach` or the body swallows it
  — that is why `shadow-crown` pools at his base.
- 2026-08-05 (effects): effects paint behind **everything**, back item
  included — an aura over the cape reads as a sticker, not a glow.
- 2026-08-05 (keying): the background is NOT one exact colour — a "magenta"
  sheet measures rgb(253,16,248) and wanders a few units. So a channel only
  gets a vote if its divisor beats its own measured wobble; a fixed threshold
  is not enough (two sheets had green at 42 ±10, which read as 60% opaque).
- 2026-08-05 (keying): split items by **connected components**, not row/column
  projection. On the back+wings sheet the golden wing's tip and the dragon
  wing share columns with no blank gap, so no projection split exists.
- 2026-08-05 (keying): drop specks BEFORE working out reading order — the row
  grouping sizes itself off the median box height, and a few 5x5 specks made
  every item its own "row", so the sheet read top-to-bottom and silently
  renamed the wizard hat to "crystal-orbit".
- 2026-08-05 (hats): Blip is a TEARDROP with a pointed top, so a solid hat at
  the shared hat point (y0.10, above the body at y0.15) touches nothing and
  hovers. Both Tripo hats carry their own lower `attach`, per the beanie
  precedent. The floaty ruling still stands for the items it was made for.
- 2026-08-05 (Tripo): her wing art roots at the LOWER-LEFT, i.e. it is a
  RIGHT-hand piece, the opposite of every code-drawn wing. Handled by a
  `flipX` flag that inverts which side gets mirrored — her art is never
  edited to suit the code.
- 2026-08-05 (Tripo): 3D Blip is parked as a separate decision (Track 2 in
  BLIP-3D-POC.md) and blocks none of this. Community Tripo models export for
  5 tokens (GLB/FBX/OBJ/STL/USD/3MF) if that route is ever taken.
- 2026-08-06 (keying): solidity is judged by **two** tests, and a pixel is only
  left translucent when BOTH agree it could be. The minimum-alpha reading alone
  is ambiguous for mid-grey, which is most of wave 2. Do not remove the distance
  test to "simplify" — `tools/test_tripo_sheet.py` has a brushed-steel item that
  fails loudly if you do.
- 2026-08-06 (keying): do NOT exclude the outline from the distance test. It
  halves the 1-2% pink rim on real anti-aliased art and is WRONG on hard-edged
  art, where the outermost pixel is genuinely solid and gets thrown back to the
  reading that turns it green. The rim is invisible at the size Blip renders —
  you only see it at 3x zoom. Fix it by keying, not by eroding.
- 2026-08-06 (keying): the plasma-ring wisps came out green-teal and were NOT
  fixed: those pixels sit at distance-ratio 0.10-0.24, exactly where a genuine
  soft glow lives (0.23). No threshold separates them, so anything that fixes
  the wisps flattens every real glow. That item is cut now, but the finding
  stands for any future violet art on magenta.
- 2026-08-06 (slicing): reading order is the ONE thing the slicer cannot verify.
  A staggered sheet reads by rows, so an item floating higher than the others
  comes FIRST — that is how the crown and monocle got each other's names. The
  slicer now prints each item's x,y; check it against the sheet before trusting
  the names.
- 2026-08-06 (art review): five of fifteen new items were cut ON SIGHT, after
  they passed every assertion. Assertions prove structure; only looking proves
  art. Budget for a look-and-cut pass on every wave — it is not rework, it is
  the review.
- 2026-08-06 (cape): the cape sits LOWER than the shared back point (its own
  attach at y0.50, widthPct 92). Its collar is the narrow top edge of the art
  and at the shared point it cleared the silhouette either side of his crown.
- 2026-08-06 (retiring): while the app is with NO learner, a cut item is deleted
  outright. Once kids are on it, use `active = false` instead so nothing is
  confiscated from a closet. An applied migration is never edited — the removal
  goes in the NEW migration, and verify-store.html knows to stop expecting a
  retired id in the client mirror.
- 2026-08-06 (growth): **Baby Blip is retired.** Growth is SIZE ONLY — one body design
  shown at 0.60/0.75/0.88/1.00, never a second drawing. `idleAnimState` and
  `resolveRawBody` no longer branch on `growthStage` at all, so a tiny Blip uses the
  ordinary base and the ordinary loops. Do not reintroduce per-stage art. The admin
  growth label for stage 0 is now "Tiny", not "Baby".
- 2026-08-06 (shop, Megan): **nothing may be free once the kids are actually playing.**
  The 0-gold free tier exists so a brand-new learner can dress Blip before earning
  anything, and it is fine while the app is with no learner — but **before go-live every
  free item must get a real price.** That is a migration (prices) plus a re-tune of the
  "free" band in `itemRarity()`, and it also un-blocks free items from treasure-box loot
  (the pool currently filters on `price > 0`). See Next up.
- 2026-08-06 (feeding, Megan's idea): **the KID drags the food to Blip — the drag IS
  the animation.** We had been designing a floating-food layer that flies into his
  mouth on its own (a motion+scale timeline running in step with his body frames).
  Her call killed that entirely: if the child drags the food and lets go near him,
  their finger does the movement, and the app only has to notice the drop and play
  his four frames while the food disappears. No motion path, no per-food position
  tuning, and no risk of the food reading as "evaporating in mid-air". It is also
  more fun — feeding becomes something you DO, not something you watch after a tap.
- 2026-08-06 (art): the eating sheet is **GENERIC — no food drawn in it**, so ONE
  sheet covers every food in the shop forever. The food picture comes from the shop
  item art. Per-food sheets were considered and rejected: 18 foods = 18 generations,
  18 slicing runs and ~72 PNGs in a PWA, versus 4. Her later strawberry sheet proved
  per-food CAN come out clean first try, so this was a cost call, not a quality one.
- 2026-08-06 (art): the eating prompt's **gaze instruction is load-bearing.** Frames
  1-2 say "eyes looking down and slightly to one side" — that is where the dragged
  food will be. Without it he stares straight ahead while food hovers past his chin
  and the two layers read as unrelated. Frame 4 releases the look; the food is gone.
- 2026-08-06 (art): **Blip must never be drawn with arms.** Arms are an accessory
  slot (stubby-arms / mitts / power-gloves), so arms baked into the body double up
  the moment a learner equips one. Megan's own instinct, and the code agrees.
- 2026-08-06 (art): free asset libraries were sampled again FOR FOOD and rejected
  again. **Kenney's Food Kit is 3D models**, not sprites. Kenney's 2D pack (Generic
  Items, CC0) has **no outlines at all** and is tools/electronics rather than food.
  itch.io's food packs are **pixel art**. Blip's whole look is a thick navy outline
  on flat electric blue; nothing free sits next to that. Same wall as the July
  accessory search — do not re-litigate. Food comes from Tripo.
- 2026-07-19 (Phase 3): Phase-3 CSS lives in **separate stylesheets** (`assignment.css`,
  `treasure.css`, `push.css`) rather than growing `styles.css` — they were built by
  parallel agents and separate files meant no merge conflicts. All three load after
  styles.css and depend on its tokens.
- 2026-08-07 (slicer): **dust is dropped BEFORE the dilation that groups an item's
  pieces**, min area 256 px. The pastries sheet's background speckle chained four
  pastries into one 944x704 blob; filtering after grouping cannot undo a bridge.
- 2026-08-07 (slicer): **`--opaque` is a declaration, not a detection.** Opaque pink
  icing and grape purple sit at distance-ratio 0.31-0.33; genuine wave-1 glows run to
  0.366 — the distributions OVERLAP, so no threshold exists (same wall as the plasma
  ring). The sheet AUTHOR knows whether translucent art was prompted; food/accessory
  sheets say "no glow" so everything inside the rim is solid. Applied to the INTERIOR
  only (2px inset) — forcing the anti-aliased rim solid left a pink halo. Never use
  --opaque on effects sheets.
- 2026-08-07 (slicer): **`--group "1+2,3+4"`** merges components by dry-run index, for
  items whose pieces sit FURTHER apart than two different items do (the eye pairs:
  eyes ~480px apart, rows ~250px). Anything not listed is dropped — that is how the
  stray mouth Tripo drew between the happy-eyes pair was cut without a re-roll.
- 2026-08-07 (slicer): **`--whole`** keys a character sheet to one RGBA PNG without
  cropping — slice_sprites.py ground-aligns rows off a shared baseline, and per-item
  crops would destroy it. This is how Tripo sheets feed the sprite pipeline now.
- 2026-08-07 (neck): **Blip has no neck, so neck art must be ~5x wider than tall.**
  Eyes end at y 0.63, body ends at 0.885, and he is 0.954 wide at y 0.63-0.66 — a
  deep U whose arms clear his eyes is taller than his whole body (measured; the
  gangster chain proved it at every size). The wide set (2.5-2.8:1) works at the
  slot's shared attach 0.60 / widthPct 104.
- 2026-08-07 (neck): **widthPct 104 — wider than the stage — on purpose.** At 88 the
  arc's ends stopped inside his silhouette and read as "lying on him" (her exact
  complaint); the ends must pass THROUGH his widest point to read as wrapping behind.
  112 leaves the ends floating in mid-air. The chunky-chain (1.75:1, medallion drop)
  carries its own attach 0.50 or the medallion falls off the stage.
- 2026-08-07 (retiring): **a deleted item's ID never returns.** verify-store's
  retired-scan reads deletes out of every migration and asserts those ids are absent
  from the client. The regenerated gangster chain is therefore `chunky-chain` (label
  still "Gold chain"), not a re-seeded `gold-chain`. Applied migrations stay unedited.
- 2026-08-07 (drag-to-feed, Megan): **a food dropped away from Blip floats back to
  the pantry, no penalty, and Blip plays the `sad` moment.** Sad art exists and is
  wired; the drag interaction itself is still to build (pointer events, never rAF).
- 2026-08-07 (art): the eating prompt's gaze instruction ("eyes looking down") did
  NOT survive generation — frames look straight ahead. Shipped anyway: the child's
  own finger drags the food to his mouth, which does the connecting the gaze was for.
- 2026-08-07 (tooling): **tools/preview_accessory.py** composites an item onto Blip
  with the renderer's exact geometry (x/width against stage WIDTH, y against HEIGHT,
  anchor as fraction of the item's own box). Placement by eye in seconds instead of
  headless Chromium. If makeAccessoryLayer's maths ever changes, change it too.

## Pending on Megan
(The two BLOCKING items — the collect-cq secrets and the phone eyeball, now
v34 → v45 — live in the 2026-08-21 entry at the top of this file.)
- 📱 per chapter, when you have a minute: phone-test one dice round in Finance,
  Number Patterns and 2D Trig **[whenever]**

(2026-08-23 evening: FABLE-AUDIT-2026-08-06.md was already committed on 08-07
(`7bfa5e6`) — she also ok'd it today; the decor (closet/wallpaper/shelf/🥚) and the
happy-eyes re-roll are CLOSED — "decor designs look great".)

(Closet prices settled 2026-08-12 — she approved them as proposed.)

(2026-08-06's stuck-Pages saga resolved 2026-08-07: both stuck builds ended
"errored" on GitHub's side, and the fresh push built green in ~40s. The lesson
stands: a live site a ship behind = check `gh api .../pages/builds` first.)

## Next up
**Her plan, stated 2026-08-08 at ship time, two jobs:**

**1. ✅ DONE 2026-08-09 — THE ROOM BECOMES THE HOME SCREEN.** See the
2026-08-09 entry above. Committed, not yet pushed/deployed.

**2. ✅ DONE 2026-08-09 — PHONE-WALK POLISH LIST** (all four rulings built,
reviewed, shipped — see the day summary at the top of this file). Also the
**tutorial** shipped the same day (session 3).

**3. ✅ SHIPPED 2026-08-12 — SHELVES, BEAN BAG, WALLPAPER + the three THEMED
SETS.** See the entry at the top of this file. Migration applied to live,
sw v43, pushed. Her calls: **two shelf slots, one per wall, placed by her**,
and **nerdy Lv 4 · sport Lv 11 · emo Lv 18**. The original brief is kept
below for the record.

**4. ✅ SHIPPED 2026-08-12 — her six CLOSET designs**, the 🥚 hatch prompt,
and the second Blip moving to level 20. See the entry at the top of this
file. Applied to live and pushed on sw v44; prices approved by her as
proposed.

**5. ✅ SHIPPED 2026-08-21 — THE CQ↔BLIPWORK BRIDGE DAY** (see the entry at
the top of this file): roster login, ⭕ Circle Geo tab, 💎 Collect bridge,
AND the price-the-free-tier pass (sequence item 4 below) all live on sw
v45. **NEXT — the go-live trio is the ONLY gate left** (sequence item 5
below: term toggle ON + first homework assignment + the PUSH-SETUP
walkthrough), then the kids get invited.

**~~3 (original brief).~~** The art is ALL sliced, committed and measured
(assets/companion/furniture/: `beanbag`, `shelf-{wood,glossy,bracket,panel}-{left,right}`,
`{emo,nerdy,sport}-{bed,desk,window}`; assets/companion/:
`room-shell-{cloud,cloudy,sky,stripes}`). What the session decides/builds:
- Shelves + bean bag = NEW slots → the known `mhq_equip` + constraint
  dance (`shop_items_slot_cat_check`, key allow-list, grants) — the FIRST
  SQL since the room build; migration seeds everything CLOSED as usual.
  Two shelf slots (left wall / right wall)? Her call. The trinket shelf on
  the Inventory sheet is NOT these shelves.
- Wallpaper = a `wall` slot whose equip swaps the `.room` background art
  between `room-shell-*.png` — the shell-swap approach is PROVEN
  geometry-safe (see 2026-08-09 decision). Aspect deltas ≤1px, harmless.
- Themed sets = plain new furniture shop rows on the EXISTING slots
  (bed/desk/window), one collection label per theme, unlock levels her
  call. No new slots, no constraint change for these nine.
- Placement numbers for shelves/beanbag: her dressing-room pass, same as
  the room build (her numbers are rulings).

**The sequence (Megan's ruling, 2026-07-25) — in this order, nothing skips ahead:**
1. ~~Megan's full play-through of all levels~~ — **DONE 2026-07-31.**
2. ~~Store upgrade: free-tier bundles that include accessories~~ — **BUILT 2026-07-28**,
   waiting only on the SQL above. 22 items, free tier in every slot, new back slot,
   closet/shop split.
3. ~~Migrate the Circle Quest class → Blipwork~~ — **SHIPPED 2026-08-21**
   (she called it; see the entry at the top of this file).
4. ~~**Price the free tier before any learner arrives**~~ — **SHIPPED
   2026-08-21** in the same day (her ruling, 2026-08-06):
   nothing may be free once the kids are playing. Seven items sit at price 0 today
   (one per slot). Needs a migration setting real prices, a re-tune of the "free"
   band in `itemRarity()` (blip-ui.js), and a decision on whether ex-free items
   should now be eligible for treasure-box loot (the pool filters `price > 0`).
   Also worth doing at the same time: the shop lists all seven free items FIRST,
   so the whole first phone screen reads as "everything is free".
5. Only then, the go-live trio: term toggle ON + first homework assignment + the
   PUSH-SETUP.md walkthrough (~25 min, do it together in a session — reminders are
   pointless before the kids are actually here, which is why it waits).

**~~THE FOOD SHOP / DRAG-TO-FEED~~ — ✅ BUILT 2026-08-08 (room build S4).**
All four parts are done: the eating + sad moments were wired 2026-08-07, the
44 food PNGs were cut the same day, and S4 added the shop rows
(`supabase/migration-food-shop.sql`, **still to run**), the tiered grocery
panel and the drag gesture. The guess in point 4 was right — food needed no
new slot, no new category and no new column, so nothing needed a GRANT. Full
write-up at the top of this file.

**WAVE-3 ACCESSORY PLACEMENT (second build job):** the fairy/girly/tomboy/gangster
items and six eye pairs are cut and committed but have NO renderer entries, labels
or shop rows yet. Notes that matter, measured this session:
- eye pairs are drawn wider than his painted eyes — widthPct ~70 (happy-eyes ~54),
  not the eyewear convention's 90; code must hide the painted eyes underneath
  (never bake a body-coloured patch into the art — recolouring would break it).
- star-wand has NO slot (Blip has no hands) — needs a decision, not art.
- both wings root lower-left like her other wing art, so `flipX: true`.
- preview EVERYTHING with tools/preview_accessory.py before trusting numbers.

**Wave 2 is DONE (2026-08-06).** Two gaps it left, both visible only once the
whole catalogue was laid out side by side:
- **Wings jumps from free straight to 140g.** Six of its seven items are rare
  L6, so between level 1 and level 6 there is nothing to buy in that slot.
- **Eyes has no aspirational item** — it tops out at 65g, so a high-level
  learner with gold saved has nothing to want there.
- Effects is down to 4 and Back to 4 after the cuts. Both still have a free
  item and a real choice, so neither is urgent.
A wave 3 aimed at cheap wings + one rare eye item would fix all three.

**Store, if she wants more later** (in rough order of payoff per hour):
- ~~EFFECTS tab~~ — **BUILT 2026-08-05**, waiting on art + SQL.
- PATTERNS tab — body patterns. Needs a masked overlay following the body shape, so it
  touches the recolour pipeline.
- FACE tab — hardest, and last for a reason: the sprite animation frames have their own
  faces drawn in, so a swappable face has to reconcile with every animated state.
- Prices are still guesses. Worth retuning once the kids have actually played — the
  bands live in one function (`itemRarity`) and one migration.
- **Link Circle Quest → this hub** — deferred to after the kids finish their CQ rounds.
- Phase 3 remainder: teacher-assigned homework is done; the treasure box is done;
  sick-stage push needs only the manual setup above.
- Mockup-derived backlog (homework-hub-companion/plan.md): FACE / EFFECTS / PATTERNS
  shop tabs, randomize/undo customise flow.
- ~~Unused baby art, if ever wanted~~ — superseded by the Baby Blip retirement below.

**Companion art rework — ✅ BABY BLIP RETIRED 2026-08-06 (built + verified, NOT yet pushed).**
- ~~Retire Baby Blip entirely~~ — **DONE.** Growth is now SIZE ONLY: one body design at
  0.60 / 0.75 / 0.88 / 1.00, which is exactly what `GROWTH_SCALE` already did, so the
  retirement was a removal rather than a rebuild. Gone: the baby art swap in
  `resolveRawBody`, both baby branches in `idleAnimState`, the baby entries in
  `ANIM_FRAME_COUNTS` / `ANIM_RECOLOURS`, the six derived frames in
  `assets/companion/anim/`, and the two baby rows in `tools/slice_sprites.py`.
  Her master sheets stay in `art-source/` as archive.
  **Verified** in companion-test.html: growth ratio still exactly 0.600, growthStage 0
  now renders the ordinary base when fed and the ordinary `sleeping` loop when asleep,
  zero network requests for any `baby-*` file, no console errors.
- Her original art (sprite sheets, logo, design images) is now backed up in `art-source/`
  in this repo — use those masters, never redraw.

## How Phase 3 was verified (and what wasn't)
- **Headless harness** (33 assertions, all green) exercising the local backend for real:
  box awarded once and only once, replays award nothing, `no_box` on a second open,
  re-assignment earns a fresh box, loot distribution sane over 300 boxes, admin
  `doneCount` correct, closed/unknown quests refused.
- **Browser DOM verification**: homework card renders with the soft due line; treasure
  badge → chest → reveal → close reconciles both the box count and gold; all three new
  stylesheets load with real rules; every new module imports cleanly.
- **Pre-migration safety** verified by deleting `assignment`/`boxes` from the state and
  re-rendering: no errors, features simply absent.
- **Live SQL smoke test (2026-07-19, 21/21)**: new state keys present; `no_box` before
  any box; admin RPCs reject a wrong password; learner sees the assignment; a FAIL grants
  nothing; a PASS grants exactly one box; a replay grants nothing; `done` flips to true;
  the box opens and pays out; a second open returns `no_box`; push subscribe/re-subscribe
  (still one row) /unsubscribe; the one-active-assignment index blocks a second active row;
  `_mhq_health` and `_mhq_is_qual_day` callable. Test learner deleted, row counts back to
  baseline.
- **NOT verified**: push *delivery* (needs a phone plus the manual setup), and
  `mhq_admin_set_assignment` on the CORRECT password — deliberately not exercised, because
  that would have meant handling the admin password. Its auth gate, its quest-open check
  and every row it writes were all tested; the happy path runs the first time you set
  homework in admin.
- **Security advisor after the migration**: no new class of warning. The 64 WARNs are the
  existing deliberate architecture (RLS-on-no-policies + SECURITY DEFINER RPCs executable
  by anon — that IS the design). The only unrelated nits are `_mhq_level` and `_mhq_growth`
  having a mutable `search_path`; both pre-date Phase 3 and are pure-maths helpers that
  touch no tables. Worth pinning one day, not urgent.
- Screenshots still time out in the Browser pane (known); DOM inspection stands in.
- One agent reported an escaped-closing-tag bug in `screens.js` — checked against the
  actual bytes and it was a **false positive**. The markup is fine; nothing was changed.

## How the store expansion was verified (2026-07-28)
- **`verify-store.html`, 428 assertions, all green.** Every sellable id has renderer art
  AND a friendly label AND a matching slot; every accessory has an ATTACH point, a
  viewBox and a widthPct; every slot sells ≥2 items and has a free level-1 one; rares are
  all level 6+; free items are outside the loot pool; buying the free cape leaves gold
  unchanged; equipping/unequipping the NEW back slot round-trips; the back slot rejects an
  unowned id; every accessory renders the right number of layers (2 for paired slots) with
  no unreplaced `{{UID}}`; four full outfits keep every item and paint back-behind-body
  and hat-in-front-of-body.
- **The migration SQL is parsed by the verify page** and each row cross-checked (price,
  minLevel, slot) against the client's own catalogue mirror in local-backend.js. That
  drift — an item added to one side only — is the failure this is built to catch.
- **Seen, not assumed.** Screenshots time out in the Browser pane (known), so the art was
  reviewed through headless Chromium via Playwright. Two items failed that review and were
  redrawn: the schoolbag was invisible (blue on blue → amber, 56%→68%) and the cape's pale
  rounded collar read as a second pair of ears (→ one continuous piece, angular shoulders).
- **Live SQL smoke test (2026-07-28, 14/14)** — migration `store_expansion_back_slot_and_
  free_tier`, run via MCP against a throwaway learner that was deleted afterwards. Steps:
  signup; state shows 22 cosmetics; back slot has cape/schoolbag/jetpack; six free items
  across six distinct slots; the free cape buys OK and leaves gold unchanged; equipping to
  the NEW back slot succeeds and sticks; back REJECTS an unowned item; a bogus slot key is
  still rejected; taking it off works; a level-10 rare is refused at level 1; 60 boxes
  opened, all 13 cosmetic drops were paid items (never a free one); throwaway deleted.
- **Learner data verified byte-identical before and after**: 2 students, 2 blips, 24
  progress rows, 4580 XP, 0 gold, 0 boxes — unchanged. shop_items 14 → 30, active
  cosmetics 6 → 22, back items 3.
- **Security advisors after the migration**: 64 WARNs, the same count and the same three
  classes as before Phase 3 — no new category. The two `function_search_path_mutable` nits
  are still the pre-existing `_mhq_level` / `_mhq_growth`; both functions this migration
  replaced pin their own `search_path`.

## Tooling notes
- `tools/slice_sprites.py` — cuts her sheets into frames. Scale is computed off the
  **body**, not the alpha box.
- `tools/make_icons.py` — builds all five icons. Keys off **alpha**, not brightness.
- Preview: another chat often holds port 5191, so there is a `maths-quest-alt` entry
  on **5202** in the global `~/.claude/.claude/launch.json`.
- `globalThis.__BLIP_DEV__.grantBox(n)` hands you treasure boxes offline so the modal
  can be exercised without setting an assignment and playing it; `.skipDays(n)` still
  drives the sickness clock.
</content>
