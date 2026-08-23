# DICE session EQ — Equations & Inequalities pool (wave 2, 2026-08-23 overnight)

READ `sessions/DICE-COMMON.md` FIRST — it carries Megan's /go block, the recipe, the
wave-2 CARE-parametrising rule, the method rule, the harness spec, the PNG review and
the hard limits. This file only adds what is specific to Equations & Inequalities.

## Chapter facts
- config.js chapter id **`eqn`**, quests eq1–eq9, modules
  `js/quests/queseq1-zeroproduct.js` … `queseq9-solution-count.js`, exports
  `questEq1` … `questEq9`; shared chapter helpers in `js/quests/_eq.js`.
- DICE-AUDIT §12 (eq1–eq8): **68 skills — 48 CLEAN, 12 CARE, 8 STATIC.** Read that
  whole section before touching anything; it names each skill's classification and
  the guards that must ride along.
- The 8 STATIC skills stay OUT of the pool (hand-authored worked-example banks —
  k-method galleries, "KNOW THE DIFFERENCE" walkthroughs). List them by name with
  reasons in the pool file header.
- The 12 CARE skills: parametrise IN PLACE per DICE-COMMON's wave-2 rule. If one
  can't roll without losing its teaching point, leave it static + excluded, with the
  reason.
- **eq9 ("Two, one or no solution?") is NEWER than the audit** (built 2026-08-23 from
  her 2-page notes; teach-first → 10 picks). Audit it yourself in the pool file
  header using DICE-AUDIT §1's method: classify each of its skills CLEAN/CARE/STATIC,
  then include what honestly rolls. If its teach-first structure means its picks
  don't make sense dealt standalone, exclude with that reason — your call, justified.
- Small sketches: eq7/eq8 use bowl/Δ figures — whatever the static skills already
  draw rides along through gen(); graph honesty per DICE-COMMON where the data is
  recoverable.
- roundLength = median skills-per-quest across the quests you include; show the
  arithmetic in the file header (wave-1 style).
- Replace the foreman stub `js/quests/dice-eqn.js` (chapterId "eqn") with the real
  pool. Do NOT edit `js/quests/dice-pools.js` — already registered.

## Method law
Solution/method text follows **`METHODS-algebra.md`** (repo root) — her algebra
method language (B11 table wording, B12's three k-shapes, the ∴ habit). Never invent
a method she doesn't teach; per DICE-COMMON, don't write NEW method text for skills
that lack real working — no link is correct there.

## Harness
- NEW `verify-dice-eqn.html` per DICE-COMMON's spec (200 seeded rolls per entry,
  determinism, shape, self-consistency, decoys, INPUT LAW, method checks, Part 3
  dealing).
- The chapter's EXISTING static harness is **`verify-eq.html`** — run it before AND
  after your CARE parametrising; it must stay green (update an assertion ONLY if it
  hardcoded a fixed number you legitimately parametrised, and say so in the report).
- Also run `python tools/harness_run.py verify-dice` (Stats) to prove nothing shared
  broke.

## PNG review
`PYTHONIOENCODING=utf-8 python tools/shoot_dice.py eqn 4` then READ every crop at
375 px per DICE-COMMON. The dev server on http://localhost:5191 is already running.

## Report
DICE-COMMON's report spec, PLUS: the eq9 mini-audit verdict, and the list of
parametrised CARE skills with one line each on what now rolls.
