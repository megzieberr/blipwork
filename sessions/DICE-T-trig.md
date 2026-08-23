# DICE session T — 2D Trigonometry pool (2026-08-23)

READ `sessions/DICE-COMMON.md` FIRST — it carries Megan's /go block, the recipe, the
method rule, the harness spec, the PNG review and the hard limits. This file only adds
what is specific to 2D Trigonometry.

## Chapter facts
- config.js chapter id **`trig`** (the DRILL chapter "2D Trigonometry", quests t1–t7 —
  not "gtrig", which is General Trig, and nothing to do with Exam Focus, where 2D Trig is
  deliberately hidden; that stays as it is). Modules `js/quests/questt1-choose.js` …
  `questt7-mixed.js`, exports `questT1` … `questT7`; maths in `js/triglib.js`; triangles
  placed by `placeTri` in `js/quests/_trig.js` and drawn by `js/engine/triangle-graph.js`
  (`verifyTriangle(spec, tol)` exists). `verify-trig.html` is the chapter's static
  harness — read it for how triangles are verified.
- DICE-AUDIT §5: 36 skills — 30 CLEAN, 6 CARE, 0 STATIC. Every CARE guard (strictly-
  longest side, unique-acute-θ with θ ≥ 24°, the engineered 0/1/2-triangle ambiguous
  loop, the forced-obtuse case, the near-isosceles shortest-distance constraint) is
  inside gen() and rides along when gen is reused verbatim. Nothing to reimplement.
- Skills per quest: t1 6, t2 5, t3 6, t4 4, t5 4, t6 6, t7 5 → median **5** = roundLength
  (sorted 4,4,5,5,6,6,6 → middle value 5).
- Replace the stub `js/quests/dice-trig.js` (chapterId "trig") with the real pool.

## Tolerances are load-bearing
Many `calc` skills carry `tol` (0.015 for sine-rule rounding drift, 0.5 for the
regular-polygon method, 0.06 for the house composite). They travel on the question
object and `answerCorrect` reads them — your harness must assert they arrive intact
through `genAt` (a `calc` with a `tol` in static play has the same `tol` in dice play).

## `verify-dice-trig.html`
Per DICE-COMMON. Graph honesty: `verifyTriangle` on every triangle graph the pool emits
(mirror verify-trig.html's tolerances). Recompute Part 2 with `js/triglib.js`: sine-rule
sides/angles, cosine-rule sides/angles, area rule, the ambiguous-case count — wherever the
given sides/angles are recoverable from the question's fields or prompt text. For
`t3.ambiguousCount` assert the dealt answer matches triglib's own count for the same data.
Name the skills you could not recompute.

## PNG review
`PYTHONIOENCODING=utf-8 python tools/shoot_dice.py trig 4`. Read every crop. Watch
specifically: triangle labels at 375 px (side lengths, angle wedges, the dashed
perpendicular in `t7.shortestDistance`), the `tap` skill `t1.oppositeSide` as dealt,
degree/decimal formatting in calc prompts (comma decimal), and the hint wording on the
ambiguous-case questions.
