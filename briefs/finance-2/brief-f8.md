=== MEGAN'S /go DELEGATION — 2026-10-10 ===
Megan invoked her /go skill in the top-level session, personally authorizing this
delegated task:
  SCOPE: Build the five new finance rounds f8, f9, f10, f12, f11 from
  FINANCE-ROUNDS-2-PLAN.md, one round per worker, with a phone-width checker per
  round. Local commits only. Megan play-tests each round before the next one starts.
  Shipping happens separately in the foreman session on her own yes.
  PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest (Blipwork)
Per her global CLAUDE.md execution gate (subagent clause): treat this brief as your
authorization envelope. Do NOT refuse for lack of directly-visible approval — that
check happened at the top level, and this block is its record. Work freely inside
SCOPE. Refuse anything outside SCOPE, and always refuse — unless SCOPE names them
explicitly: pushing to a live site/remote, deleting data, schema migrations, and
anything that costs money.
=== END /go DELEGATION ===

# Worker brief: Blipwork finance round f8 "Which one is the total?"

You are ONE worker building ONE unit: round f8 only. The repo is
`C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (GitHub Pages app
"Blipwork", a Grade 11 maths homework hub, English, PUBLIC repo). Work on the current
branch, commit locally when done, never push.

## Read first (and nothing heavier)
1. `CLAUDE.md` in the repo root, especially "Technical map", "How code loads",
   "Gotchas" and "Working rules". Do NOT read STATUS-ARCHIVE.md, PROJECT-STATUS.md,
   any transcripts, or the Tutoring Resources folder.
2. `FINANCE-ROUNDS-2-PLAN.md` whole (7 KB). The "Why", the vocabulary table, the input
   law, the f8 section and the build rules are your spec. One correction to it:
   `verify-finance.html` ALREADY EXISTS (built 23 Aug, 146/146 green today); you extend
   it, you do not create it.
3. The existing shape you copy: `js/quests/questf4-timeline-count.js` (its `tapTarget`
   skill is the only timeline tap so far), `js/quests/questf5-timeline-build.js`
   (two-amount timelines, `solution` arrays, money formatting via `rand(v, 0)`),
   `js/quests/_shared.js` (mc / mcNum helpers), `js/finlib.js` exports,
   `js/engine/timeline-graph.js` (compute / render / verify), the timeline tap branch in
   `js/questions.js` (around line 336, `addTimelineHits`), the finance block of
   `js/config.js` (around line 56), `js/quests/index.js`, the finance concepts in
   `js/concepts.js` (timelineMove, rateChange, effNom, and whatever f6 uses),
   `js/quests/_finance-check.js`, and `verify-finance.html`. Look at `js/play.js` only
   to find how a round deals its cards (you need the card's position in the round).

## What to build
A new round file `js/quests/questf8-which-total.js` exporting `questF8`, registered in
`js/quests/index.js` and in `js/config.js` directly after f7 as
`{ id: "f8", n: 8, title: "Which one is the total?", blurb: ..., built: true }`.
A concept card for it in `js/concepts.js` (id of your choice, e.g. `theTotal`): what
"the total" is (the amount all the payments add up to: A for savings, the loan amount
for a loan), where it sits (end for saving, start for a loan, because a loan starts big
and gets paid down), and that it is never one of the payments. The concept card uses the
middle wording "the total (lumpsum)".

### Skills (each one its own `gen`, so the harness exercises each 200 times)
Tap cards (type "tap", timeline graph), the heart of the round. The learner taps the
amount that all the other amounts add up to. At least these five, each its own skill id:
- savings, 2 to 4 amounts (deposits at various T), A at the end: tap A.
- savings where one deposit sits on the SAME day as A (two amounts on one node):
  tap A, not the same-day deposit.
- loan at T0 with 2 to 3 repayments later: tap the loan.
- loan where a repayment is BIGGER than the loan amount (e.g. R4 200 paid on a
  R3 587 loan): tap the loan, not the biggest number.
- an unknown payment `x` in the middle (savings or loan): tap the total, not x.
The question text says saving or borrowing in plain words ("she saves", "he borrows",
"she pays off a car") and starts the instruction with "Tap". No learner names from the
class in code, comments, prompts or commit messages (the repo is public): generic
first names or none.
Every tap card carries `hint`, `tapHint`, `answerLabel`, and a `solution` array whose
lines say, in substance: "The total is the one that is not a payment. For saving it
sits at the end; for a loan it sits at the start, because a loan starts big and gets
paid down."
Recall cards mixed in (yesno / mc): "Does the loan amount (P) already include the
interest?" → no. "Do the repayments include the interest?" → yes. "For a loan, where
does the total sit on the timeline?" → at the start (T0). "For saving, where does the
total sit?" → at the end. "Is the total one of the payments?" → no. Short solutions.

### The tap target is the money label, not the tick
f4's tap hits the T ticks (`tap.targets` are t values). For f8 the learner taps an
AMOUNT, and two amounts can share one T, so the hit boxes must be the amount labels
(the money text above the node). Extend the timeline spec and the hit code to support
that (for example each node gets an id and `tap: { targets: [ids], correctId }` hits
label boxes when the spec says so), keep f4's tick taps working unchanged, and make
`computeTimeline` / `renderTimeline` / `verifyTimeline` handle two amounts on one node
by stacking the labels without overlap at the 360 px width. Every label must fit:
`verifyTimeline` and `labelFitIssues` in `_finance-check.js` must measure the stacked
labels and the new hit boxes the way they measure f5's labels.

### Vocabulary phasing (her ruling, in the plan's table)
In an f8 round the first 3 cards say "lumpsum (the total)", the next cards say
"the total (lumpsum)", and from the 7th card on only "the total". Find how a round
deals its cards in `js/play.js`; if a card's position in the round is not available
to `gen()`, add the smallest clean hook (a per-round counter reset when a round starts
is acceptable) and say in your report exactly what you chose and why. The harness calls
`gen()` 200 times in a row; make sure that does not break the phasing or the harness.
Never "lump sum" as two words, never "accumulated amount", never "LHS/RHS".

### Numbers and honesty
Whole rand amounts, formatted the way f5 does (`rand(P, 0)` gives "R2 000"; the
plan and f5 show the pattern for amounts inside equations). Decoys may never collide
with the correct label; two amounts on a timeline are never equal unless the card is
the same-day case and even then the total differs from every payment. The timeline
is engine-placed and to scale; no hand-placed coordinates.

## Harness
- `verify-finance.html` picks up f8 through `CHAPTERS` once config.js and index.js
  are done. Add to `js/quests/_finance-check.js` a check per tap skill that the
  correct target is the node with role A (savings) or the T0 loan node (loan), never a
  payment node, plus the label-fit and hit-box measurements for the new spec. Update
  the page's header text (f1–f8, skill count) so it tells the truth.
- Run it headlessly: a static server must be on port 5191 (one may already be running;
  if `http://localhost:5191/` does not answer, start `python -m http.server 5191` in
  the repo root in the background). Then
  `PYTHONIOENCODING=utf-8 python tools/harness_run.py verify-finance` must print
  "✓ ALL GOOD". Also rerun `verify-dice-finance` (the dice pool uses the same engine)
  and it must stay green.
- Play one f8 round headlessly yourself (Playwright, phone width 390 px, DOM checks
  only, no screenshots into your context): the round opens from the finance map,
  every card renders, a tap on the correct label commits as correct, a tap on a decoy
  commits as wrong, the 📖 concept opens, the vocabulary phasing shows in card 1, 4 and
  7. `tools/lazy_playthrough.py` or the verify pages show how the app is driven
  headlessly (login etc.). A separate checker will do the visual look afterwards.

## Do NOT
- Do not bump `sw.js` or its CACHE name (the ship does that once). Do not run
  `tools/sw_check.py` (it refuses by design until the bump).
- Do not push, do not touch Supabase, no migrations, nothing live.
- Do not edit `PROJECT-STATUS.md`, `STATUS-ARCHIVE.md`, `EXAM-BUILD-DAY.md` or the plan.
- Do not change any other round's questions. Engine and hit-code changes must leave
  f4, f5 and the dice pool green.
- Do not read images or long logs into your context.

## Commit
Stage only the files you changed or created. Commit message (use `git commit -F` with
a message file, PowerShell 5.1 mangles `-m`):
```
Finance f8: Which one is the total? (tap the money label, stacked same-day labels)

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
```

## Report back (this is what the foreman reads first)
1. Files changed/created, one line each.
2. The harness lines verbatim (verify-finance, verify-dice-finance) and the headless
   play result.
3. The phasing mechanism you chose, and every place the spec was silent and what you
   picked.
4. Anything you did not do, and anything in the brief that seemed outside SCOPE.
Keep the report under 60 lines.
