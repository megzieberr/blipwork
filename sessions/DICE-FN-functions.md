# DICE session FN — Functions pool (wave 2, 2026-08-23 overnight)

READ `sessions/DICE-COMMON.md` FIRST — it carries Megan's /go block, the recipe, the
wave-2 CARE-parametrising rule, the method rule, the harness spec, the PNG review and
the hard limits. This file only adds what is specific to Functions.

## Chapter facts
- config.js chapter id **`func`**, quests fn1–fn7, modules
  `js/quests/questfn1-families.js` … `questfn7-together.js`, exports
  `questFn1` … `questFn7`; maths in `js/funclib.js`; graphs drawn by
  `js/engine/function-graph.js` (**`verifyFunction(spec)` exists — every rolled
  figure spec must pass it**, exactly as the exam cards do).
- DICE-AUDIT §7: **38 skills — 22 CLEAN, 16 CARE, 0 STATIC.** Here CARE mostly means
  figure-bearing skills whose gen() already carries curated windows / nice-number
  banks — those guards ride along verbatim; parametrise only where the audit says a
  fixed worked-number example blocks rolling. Read the whole section first.
- roundLength = median skills-per-quest; show the arithmetic in the file header.
- Replace the foreman stub `js/quests/dice-func.js` (chapterId "func") with the real
  pool. Do NOT edit `js/quests/dice-pools.js` — already registered.

## Method law
Functions' methods law is her digest:
`C:\Users\megzi\Desktop\Claude Code Projects\graph-quest\reference\GR11-FUNCTIONS-NOTES-DIGEST.md`
— read it before touching any solution text. Per DICE-COMMON, never write NEW method
text for skills that lack real working.

## Graph honesty (this chapter's whole point)
- Every rolled spec through `verifyFunction` in your harness — a point off its curve,
  a mislabelled asymptote, or an intercept that doesn't compute FAILS the roll.
- Known engine fact (2026-08-23 morning audit): the label placer has NO free slot in
  some crowded random windows (~158 faults measured in random chapter graphs, 0 in
  curated exam specs). Your rolled specs must stay in the curated-safe families the
  static skills already use. If a rolled window produces a label fault, tighten the
  roll's bounds in the chapter's own files; if the fault is the engine's, REPORT with
  the crop, don't touch `js/engine/function-graph.js`.
- **Do NOT touch `js/funfun/` or `js/funfun-play.js`** — that is the Fun Functions
  mount (a synced copy of graph-quest, never hand-edited). Your chapter is blipwork's
  own static Functions quests only.

## Harness
- NEW `verify-dice-func.html` per DICE-COMMON's spec + a Part for verifyFunction over
  every rolled figure (200 seeded rolls per figure-bearing entry).
- The chapter's EXISTING static harness is **`verify-func.html`** — green before AND
  after; assertion updates only for legitimately parametrised fixed numbers, said so
  in the report.
- Also run `python tools/harness_run.py verify-dice` (Stats).

## PNG review
`PYTHONIOENCODING=utf-8 python tools/shoot_dice.py func 4` then READ every crop at
375 px per DICE-COMMON — graphs in frame, labels legible and not colliding, curve
names on their curves. The dev server on http://localhost:5191 is already running.

## Report
DICE-COMMON's report spec, PLUS: verifyFunction totals, any label-fault crops
(fixed-by-bounds vs reported), and the list of parametrised CARE skills.
