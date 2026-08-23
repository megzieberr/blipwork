# DICE session ES — Exponents & Surds pool (wave 2, 2026-08-23 overnight)

READ `sessions/DICE-COMMON.md` FIRST — it carries Megan's /go block, the recipe, the
wave-2 CARE-parametrising rule, the method rule, the harness spec, the PNG review and
the hard limits. This file only adds what is specific to Exponents & Surds.

## Chapter facts
- config.js chapter id **`exp`**, quests es1–es8, modules
  `js/quests/queses1-laws.js` … `queses8-nosolution.js`, exports
  `questEs1` … `questEs8`; shared chapter helpers in `js/quests/_exp.js`.
- DICE-AUDIT §11: **52 skills — 24 CLEAN, 19 CARE, 9 STATIC.** Theory-only chapter,
  no diagram engine. Read the whole section before touching anything.
- The 9 STATIC skills stay OUT of the pool (hand-authored worked-example banks —
  e.g. the factorising-type gallery). List them by name with reasons in the pool
  file header.
- The 19 CARE skills: parametrise IN PLACE per DICE-COMMON's wave-2 rule — this is
  the chapter where that work nearly doubles the pool (24 → 43). Keep every existing
  guard; keep the trap/misconception structure of es2/es5 exactly (the wrong options
  ARE the teaching content — roll numbers, never invent new trap types). If a skill
  can't roll without losing its teaching point, leave it static + excluded, with the
  reason.
- roundLength = median skills-per-quest across the quests you include; show the
  arithmetic in the file header (wave-1 style).
- Replace the foreman stub `js/quests/dice-exp.js` (chapterId "exp") with the real
  pool. Do NOT edit `js/quests/dice-pools.js` — already registered.

## Method law
Where a solution has real working, its language follows **`METHODS-algebra.md`**
(repo root) where it speaks to exponents/surds; otherwise keep the module's existing
vetted wording with numbers substituted. Per DICE-COMMON, never write NEW method text
for skills that lack real working.

## Harness
- NEW `verify-dice-exp.html` per DICE-COMMON's spec.
- The chapter's EXISTING static harness is **`verify-exp.html`** — run it before AND
  after your CARE parametrising; it must stay green (update an assertion ONLY if it
  hardcoded a fixed number you legitimately parametrised, and say so in the report).
- Also run `python tools/harness_run.py verify-dice` (Stats) to prove nothing shared
  broke.

## PNG review
`PYTHONIOENCODING=utf-8 python tools/shoot_dice.py exp 4` then READ every crop at
375 px per DICE-COMMON. Watch surd/exponent rendering specifically: stacked fractions
in exponents, √ groups never splitting across lines (the js/ui.js scanner handles it —
if a rolled string defeats the scanner, that's a REPORTED shared-file finding, not
yours to fix). The dev server on http://localhost:5191 is already running.

## Report
DICE-COMMON's report spec, PLUS: the list of parametrised CARE skills with one line
each on what now rolls.
