# GENERAL TRIG — build plan for her 13 drill rounds

Design pass written by Fable, 2026-08-22, from `TRIG-DRILL-ROUNDS-PLAN.md` (her rounds,
her words) + `METHODS-trig.md` (her digest) + the add-chapter recipe. Status: **DESIGN
DRAFT for her nod — nothing built.** The fresh foreman session that builds this reads
this file first, then `EXAM-FOCUS-PLAN.md` (Corrections), then `PROJECT-STATUS.md`.

**In short:** a new Revision-tab chapter called **General Trig** with 13 rounds in her
order. Ten of the thirteen can be built with question types Blipwork already has. Three
new pieces of plumbing make the rest possible: a *multi-step* question type (pick the
sign → pick the ratio → type the value), a *quadrant cross* you tap to tick, and a small
*token pad* for typing `180° −`. One new diagram engine (a right triangle drawn in the
chosen quadrant). Four build stages, foreman-reviewed between each, then one migration +
ship. Roughly 2,5–3,2M tokens.

## Her rulings (2026-08-22)

- Chapter **"General Trig"**, id `gtrig`, lives on the **Revision** tab. Blipwork's
  existing `trig` chapter is 2D trig (sine/cosine/area rule) — its sibling, not a rename.
- **13 rounds, her order, her page refs** — `TRIG-DRILL-ROUNDS-PLAN.md` is the spec;
  do not merge, reorder or drop rounds.
- **Discovery rounds (1–3) earn XP the FIRST time through only** — replays pay 0.
  (Foreman reading: the drill rounds 4–13 keep the chapter-wide norm — full XP first
  completion, 25% on replay — unless she says otherwise.)
- **Her method = the textbook method; only the story differs.** So the maths is standard
  Gr11 trig (triglib computes every answer); her voice is in the cards, hints, concept
  cards and Esplains. Vocabulary = `METHODS-trig.md` appendix. **Correct her spelling
  slips in learner-facing copy** (never "seperately").
- Input law (dice plan, carried over): **never type words** — lists, picks, number pad.
- Once live, the two trig exam modules' `lostQuest` placeholders point here
  (Q1 → round 5; Q2 → round 11). Euclidean keeps NO "I'm lost" (her ruling).

## Inputs still wanted from her (defaults stated — none block the start)

1. **"Hayley's way"** (p22, drawn as a cross annotated `x−1`, never explained in words)
   — used in round 4/7 cards only if she gives the wording; default: omit.
2. **Round 3's triangle derivation** (square → 45-45-90, equilateral → 30-60-90) is
   spoken-only in her notes (digest F18). Default: the round opens on the two finished
   triangles with a one-line "where they come from" card written in her voice.
3. **Rationalising** (F12): her table values are unrationalised (`1/√2`) and her
   sketch-derived answers are rationalised (`2√5/5`). Default: round 3 accepts `1/√2`
   only, round 8 lists rationalised fractions. One line from her settles it.

## What exists vs what is new

**Exists and is reused:** `mc` (incl. multi-option lists), `yesno`, `calc` (number pad,
decimal comma, minus), `tap` (regions on an SVG — venn regions / triangle sides), theory
card rounds (the `queses3-method.js` shape), discovery precedent (patterns' no-spoiler
rounds), `trig-graph` engine (sin/cos/tan curves), `triangle-graph` engine (to-scale
triangles), `triglib`, concept cards (`js/concepts.js`), sibling generators, the
Hint → solution → "I'm lost" chain, `verify-*.html` harness pattern.

**New plumbing (stage 1):**
- **`steps` question type** — one question made of ordered sub-steps, each an existing
  input (mc / tap / calc / token pad). All steps must be right for the question to count;
  a wrong step shows that step's hint and lets the learner retry the step (first answer
  counts for XP, like the dice fix); "Try a similar one" regenerates the whole chain.
  Resume-safe: the save holds the step index. Needed by rounds 4, 5, 7, 8, 12, 13.
- **`tapcross` widget** — a `tap` variant: a plain cross (two perpendicular lines),
  four hit regions, multi-select, a ✓ appears in a tapped quadrant (her round-12 image —
  it is literally drawn on p47 of her notes). Optional extra button **"no reference
  angle"** (round 12 co-function items). Needed by rounds 2, 5, 8, 12.
- **`tokenpad`** — the number pad with extra chips: `90°`, `180°`, `360°`, `−`, `+`, `θ`
  (or `x`) so the learner TYPES `180° −` / `360° +`. Answer compared as a token string.
  Needed by round 5 only (her "they must type 180−"). If she'd rather pick from a list,
  round 5 step 2 becomes `mc` and this widget is dropped — her call at stage-1 nod.
- **`quadrant-triangle` engine** (`js/engine/quadrant-triangle.js`) — axes + a right
  triangle from the origin into the chosen quadrant, hypotenuse labelled r, legs
  labelled with GIVEN values only (letters otherwise), with `verify()` proving the
  triangle sits in the right quadrant and the labelled lengths match the drawn ones.
  Needed by rounds 8 and 10 (round 10 = the first-quadrant "1 and k" triangle).

## Round-by-round mapping

| # | Round (hers) | Type(s) | Engine / widget | Notes |
|---|---|---|---|---|
| 1 | Introduction — discovery | theory cards + 2–3 `yesno`/`mc` checks | small stepped SVG: point rotating on a circle (3–4 static frames, tap to advance — no animation loops) | "ratios mean nothing without the angle" is the one check that matters. XP once. |
| 2 | Cartesian plane — discovery | cards + `tapcross` | `trig-graph` draws sin/cos/tan with above/below-axis shading per quadrant | Story card: All Strippers Take Cash. Checks: "tap the quadrants where cos is positive" → cross ticks. XP once. |
| 3 | Special angles & identities — discovery | cards (ordered reveal) + `mc` value picks | static SVG: the two triangles; the O-A-H table REVEALED IN HER ORDER (table → O A H → 30 45 60 → values left to right) | Never show a bare 9-value grid first (her standing dislike). Then tan identity + masked identities as cards + 2 `mc`. XP once. |
| 4 | Co-functions (FIRST drill) | `steps`: sign (`mc` +/−) → sin/cos (`mc`) → value (`calc`, numeric items only) | — | Mix numbers and variables from the start; the trap `cos(90° + x) = −sin x` appears early and often. Variable items drop step 3. |
| 5 | Reductions — numerical | `steps`: quadrant (`tapcross`, single) → formula (`tokenpad`) → sign (`mc`) → ratio (`mc` sin/cos/tan incl. "changes to…") | — | Positive, negative and co-function angles mixed immediately. Hint per step in her three-step language. |
| 6 | Reductions Tip Chips | theory cards + `mc`/`yesno` | — | Revises TIP Chips ①–⑤ (pp. 23–25), "but why?" card, rotations thresholds (F10: −90° is deliberate). |
| 7 | Reductions — variables | `steps`: sign → ratio | — | Value is x or θ; no pad. |
| 8 | Cartesian plane — special sums | `steps`: quadrant (`tapcross`) → app draws the triangle → three sides (`calc`, signs required) → 2–3 follow-up ratios (`mc` lists of fractions) | `quadrant-triangle` | Her five-step routine; the double-tick quadrant overlap is the teaching point (two conditions given). Bow tie card. |
| 9 | Identities — next step | `mc` (pick the part / the move) + `calc` for "= 1" | — | LCD items, `sin²x + cos²x → 1`, masked-identity picks (p32–35). No full proofs. |
| 10 | Super special sums — triangle sides | `tap` (where do 1 and k go — sides of a drawn first-quadrant triangle) → `mc` (`√(1 − t²)` vs `√(t² − 1)`) | `quadrant-triangle` (Q1 only) | "Flamingo" card (stand t on a 1). |
| 11 | General solution — the six types | `mc` with six NAMED options | — | Options carry number + name exactly as p44: ① function alone · ② same angles · ③ common factor · ④ grouping · ⑤ trinomial · ⑥ co-functions. Never generate the p44 ⑤ snippet (Δ<0, F11). |
| 12 | General solution — last steps | `steps`: quadrants (`tapcross`, multi, + "no reference angle" button) → ref ∠ (`calc`) | — | `sin x = 1/2` → ticks in I and II, ref 30°. Co-function items → "no reference angle" is the right answer. "don't type − into calculator" hint. tan items: ONE quadrant line is hers ("waste of time!") — the tick check accepts her one-line convention. |
| 13 | Undefined values | `mc` multi-select (which terms) + `calc` (`= 0`) | — | Equation rendered; learner picks the terms that must be equated to zero. (pp. 62–64) |

Every drill skill gets a fresh-number sibling generator; every answer computed by
`triglib` (extend it for reductions/co-functions/general solutions as pure functions
with their own unit checks in the harness). Concept cards per round in her voice.

## XP rule for discovery rounds (first time only)

Server truth is `mhq_submit_quest` (client-named XP ≤ 1000/call, same trust model as
everything). Simplest faithful implementation: the client pays the normal first-
completion XP for rounds 1–3 and sends **0 on any replay** (the existing `progress.passed`
record is the "already done" flag). No SQL beyond the quest seed. Alternative if she
wants it server-enforced: a `replay_xp` flag on `quests` — a migration; not proposed now.

## Chapter wiring (standard add-chapter recipe)

- `js/config.js` chapter block: id `gtrig`, "General Trig", Revision tab, a hue not yet
  taken (config shows the 11 in use; yellow/gold is free), 13 quests `gt1…gt13` with her
  titles. `js/quests/index.js` registration; `js/quests/_gtrig.js` shared lib.
- `js/local-backend.js`: ids in QUEST_IDS + DEFAULT_OPEN.
- `supabase/schema.sql` seed + `supabase/migration-gtrig-quests.sql` inserting the 13
  quests **CLOSED** (she opens them as she teaches). Applied via MCP at ship with
  before/after learner-row hashes (migration-check skill).
- `verify-gtrig.html`: engine checks + thousands of generations, the `steps` type's
  resume path, `tapcross` hit-regions, tokenpad comparisons, lostQuest relink of the two
  exam modules, sibling generators, 0 console errors on a 375px walk of all 13.
- `sw.js` bump at ship. Exam modules: `trig-reduction-and-ratios.js` → `{gtrig, gt5}`,
  `trig-general-solutions.js` → `{gtrig, gt11}`; harness placeholder assertions updated.

## Build order (fresh foreman session; her nod after each stage)

| Stage | Who | Scope | ≈ tokens |
|---|---|---|---|
| 0 | her | nod on this plan + the three inputs above (defaults apply if silent) | — |
| 1 | Opus | plumbing: `steps` type, `tapcross`, `tokenpad`, `quadrant-triangle` engine, triglib extensions, harness skeleton. Nothing learner-visible yet. | 600–800k |
| 2 | Sonnet | rounds 1–3 (discovery, XP-once rule) + concept cards | 400–500k |
| 3 | Sonnet | rounds 4–7 (co-functions, reductions ×2, Tip Chips) | 400–500k |
| 4 | Sonnet/Opus | rounds 8–10 (engine-heavy) + 11–13 | 500–700k |
| 5 | foreman | lostQuest relink, harness all-green, 375px walk of all 13, migration via MCP, sw bump, push, live check | ~300k |

Foreman reviews each stage with its own harness run and a DOM walk; anything that draws
gets rendered to PNG and LOOKED at (the Euclid build found two bugs only that way).

## Explicitly not in this build

Afrikaans (December) · the dice for gtrig (later, its own session) · any change to the
existing `trig` (2D) chapter · tap-interactivity on diagrams (banked for next year).
