# DICE session P — Number Patterns pool (2026-08-23)

READ `sessions/DICE-COMMON.md` FIRST — it carries Megan's /go block, the recipe, the
method rule, the harness spec, the PNG review and the hard limits. This file only adds
what is specific to Number Patterns.

## Chapter facts
- config.js chapter id is **`pat`** (NOT "patterns" — the stub and the registry already
  use `pat`; keep it). Quests np1–np7, modules `js/quests/questnp1-spot.js` …
  `questnp7-geometric.js`, exports `questNp1` … `questNp7`; maths in `js/patternlib.js`;
  builders in `js/quests/_patterns.js` (`calcQ/tapQ/yesnoQ`, the `pyramid` and
  `termParabola` graph specs); figures drawn by `js/engine/pattern-graph.js`
  (`verifyPattern` exists) and `js/engine/function-graph.js` (`verifyFunction`, for the
  np5 min/max term-parabola). `verify-patterns.html` is the chapter's static harness —
  read it, it already shows how to verify both figure kinds.
- DICE-AUDIT §10: 44 skills — 34 CLEAN, 10 CARE, 0 STATIC. Every CARE guard is inside
  gen() (`integerR: true`, `a1 ≥ 2`, `readableExtreme()`, the n* = k ± 0,25 turning-point
  construction) and rides along when gen is reused verbatim. Nothing to reimplement.
- Skills per quest: np1 7, np2 7, np3 6, np4 5, np5 7, np6 5, np7 7 → median **7** =
  roundLength.
- Replace the stub `js/quests/dice-patterns.js` (chapterId "pat") with the real pool.

## Kinds — two candidate groupings, decide and justify
The audit notes same-named skills across quests that are genuinely different concepts
(np2.commonDiff vs np6.gapCommonDiff; np2.generalTerm / np3.generalTerm / np7.generalTerm
are arithmetic / quadratic / geometric). Keep those SEPARATE kinds. Group only if two
skills are the same concept and mechanic (none are obvious; default is no grouping).

## Method coverage — expect it to be LOW
Only np4 and np5 carry any `solution` arrays; the rest get the builders' default
(`[{ s: answerLabel }]`). Per the method rule, most skills will ship WITHOUT a method
link. Report the exact split — Megan decides on a worked-method batch later.

## `verify-dice-pat.html`
Per DICE-COMMON. Graph honesty: `verifyPattern` on every pyramid graph and
`verifyFunction` on every term-parabola the pool emits (mirror what verify-patterns.html
does per figure kind). Recompute Part 2 with `js/patternlib.js` where the sequence is
recoverable from the question (the prompt prints the terms; pyramid graph specs carry
the sequence): first/second differences, Tₙ coefficients, the missing term, the
extreme term — whichever are cheap and honest. Name the skills you could not recompute.

## PNG review
`PYTHONIOENCODING=utf-8 python tools/shoot_dice.py pat 4`. Read every crop. Watch
specifically: the difference pyramid at 375 px (cell text fitting, negative numbers
with the `P()` parentheses convention), the np5 term-parabola's grid read-off
(countable?), the `tap` skills (np1.tapFirstDiff) — is the tap target obvious as
dealt — and subscripts (`toSub`) rendering in prompts and options.
