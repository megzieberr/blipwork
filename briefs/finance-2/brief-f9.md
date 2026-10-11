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

# Worker brief: Blipwork finance round f9 "Car or no car?"

You are ONE worker building ONE unit: round f9 only. Repo
`C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (GitHub Pages app
"Blipwork", a Grade 11 maths homework hub, English, PUBLIC repo). Work on the current
branch, commit locally when done, never push.

## Read first (and nothing heavier)
1. `CLAUDE.md` in the repo root: "Technical map", "How code loads", "Gotchas",
   "Working rules". Do NOT read STATUS-ARCHIVE.md, PROJECT-STATUS.md, transcripts, or
   the Tutoring Resources folder.
2. `FINANCE-ROUNDS-2-PLAN.md` whole (7 KB): "Why", the vocabulary table, the input law,
   the f9 section, the build rules. Correction: `verify-finance.html` already exists
   (f1–f8, green); you extend it.
3. The shapes you copy: `js/quests/questf5-timeline-build.js` (two-amount timelines,
   rate changes, `solution` arrays, money via `rand(v, 0)`), `js/quests/questf8-which-total.js`
   (the newest round: how it registers, its `skills` list, the per-position hook; its
   content is under review, copy only its plumbing), `js/quests/_shared.js` (mc / mcNum
   helpers), `js/finlib.js` exports (`COMPOUNDING`, `compoundAmount`, `moveMoney`,
   `rand`, `toFrac`), `js/engine/timeline-graph.js` (compute / render / verify; it draws a
   role letter in the accent colour above a node when `role` is set), the finance block
   of `js/config.js`, `js/quests/index.js`, `js/quests/load.js`, `js/local-backend.js`
   (`QUEST_IDS`, `DEFAULT_OPEN`), the finance concepts in `js/concepts.js`,
   `js/quests/_finance-check.js`, and `verify-finance.html`.

## Her ruling tonight (overrides anything in f8 that disagrees)
Megan played f8 and rejected it: it drew the total (the amount all the payments add up
to) as a bare money amount among the payments, which is exactly the confusion her class
has (they already think the total is a payment), and a payment on the same day as the
total "breaks everyone". So, in f9:
- The total is NEVER a bare money label. It is drawn the f5 way: `role: "A"` (saving, at
  the end) or `role: "P"` (a loan, at T0), usually as the unknown `label: "?"`. When a
  story needs the total shown as a number, keep the role letter on that node so it is
  visibly different from the payments.
- No payment ever shares a day with the total. The "payment sitting ON the meeting day"
  cards use a meeting day that is NOT the total's day (a middle T, or any T where no total
  sits). The answer is the same whichever day you meet on, so a middle meeting day is
  legitimate.

## What to build
`js/quests/questf9-car-or-no-car.js` exporting `questF9`, registered after f8 in
`js/config.js` (`{ id: "f9", n: 9, title: "Car or no car?", blurb: ..., built: true }`),
`js/quests/index.js`, `js/quests/load.js`, and `js/local-backend.js` (QUEST_IDS and
DEFAULT_OPEN). A concept card in `js/concepts.js` (id of your choice, e.g. `carOrNoCar`):
a "car" is the bracket (1 + i)^n that moves an amount to the meeting day; forward gear
is a positive exponent (×), reverse gear a negative exponent (÷); the meeting day is the
one T every amount is moved to; an amount already standing on the meeting day needs no
car; an amount that crosses a rate change ("the road changes colour") needs one car per
road. Vocabulary: this round says only "the total" (no "lumpsum"), "meeting day", "car",
"forward gear" / "reverse gear", "road" for a rate segment. Never "lump sum",
"accumulated amount", "LHS/RHS", never "deposit" for a hire-purchase cash payment.

### Timeline engine extension (allowed by the plan)
Add to the spec: a flagged meeting day (e.g. `meet: t` draws a small flag/marker and the
words "meeting day" at that node) and coloured rate roads (e.g.
`roads: [{ from, to, rate: "8% p.a.", k: 4 }, ...]` draws each segment of the axis in its
own colour with the rate written along it; one road = one colour, a rate change = the
road changes colour). Keep every existing spec (f4, f5, f8, the dice pool) rendering
exactly as before when the new keys are absent. `verifyTimeline` and `labelFitIssues`
in `_finance-check.js` must measure the new flag and road labels like they measure the
amount labels (no overlap with amounts, T labels or each other at the 360 px width).

### Skills (each its own `gen`, id, 200 harness rolls; aim for 8 to 10 cards a round)
Every card shows a timeline with a flagged meeting day, one or two coloured roads, and
2 to 3 amounts (payments; plus the total as `?` with its role letter where the story has
one). A named amount is in bold in the prompt.
- `needsCar` (yesno): "Does the R8 000 need a car to reach the meeting day?" One card in
  three: the amount sits ON the meeting day → no.
- `gear` (mc): "Which gear moves the R8 000 to the meeting day?" → forward gear (later
  date, ×) / reverse gear (earlier date, ÷); include "no car, it is already there" as an
  option on the meeting-day cards.
- `roads` (mc): "Over which road(s) does the R8 000 travel?" → one colour / two colours
  (name the roads by their rate, e.g. "the 8% road only", "the 8% road, then the 10%
  road"); decoy: the wrong road, both roads when only one applies.
- `exponent` (mcNum): "Its exponent is …" → ± years × k for the road it travels, sign by
  direction (e.g. 3 years monthly backward → −36). Decoys: the wrong sign, years without
  × k, off by one period.
- `twoCars` (mc): an amount that crosses a rate change: "How many cars does the R5 000
  need?" → 2 (one per road), with the expression among options, e.g.
  `5 000(1 + 0,08)^4 (1 + 0,10)^2` vs the one-bracket decoys.
- `onTheDay` (yesno/mc): a recall card: "An amount standing on the meeting day: car or no
  car?" → no car.
Every card with real working carries `hint`, `answerLabel`, and a `solution` array in the
ONE-equation spirit (what moves, which gear, which road(s), the exponent). The round's
solution refrain: "A car only if it has to move. Already there? No car."

### Numbers and honesty
Whole rand amounts; whole % rates; `COMPOUNDING` entries with k in {1, 2, 4, 12}; the
exponent is years × k with its sign; decoys never collide with the correct label; the
timeline is engine-placed and to scale, no hand-placed coordinates; every label fits at
360 px. Names: pronouns only, no first names.

## Harness
- `verify-finance.html` picks f9 up through `CHAPTERS` once registered. In
  `_finance-check.js` add recompute for `exponent` and `twoCars` (from the displayed
  years, k and direction) and a check for `needsCar`/`gear` that the answer agrees with
  the amount's T versus the meeting day. Update the page header (f1–f9, counts).
- Server on http://localhost:5191/ (start `python -m http.server 5191` in the repo root
  in the background if it does not answer). Then
  `PYTHONIOENCODING=utf-8 python tools/harness_run.py verify-finance verify-dice-finance`
  must print ✓ ALL GOOD for both. Also `node verify-lazy-load.mjs` green.
- Play one f9 round headlessly at 390 px, DOM checks only (no screenshots into your
  context): `?local=1`, log in, Finance map → round 9, every card renders, a correct
  answer commits as correct, a wrong one as wrong, the 🆘 concept opens, no sideways
  scroll. `C:\Users\megzi\AppData\Local\Temp\claude\C--Users-megzi--claude\279c8df9-d1f3-4473-b85b-b9a45e708cdb\scratchpad\f8\play_f8.py`
  shows how f8's worker drove the app; adapt it.

## Do NOT
- No `sw.js` bump, no `tools/sw_check.py` (it refuses by design until the ship's bump).
- No push, no Supabase, no migrations, nothing live.
- No edits to `PROJECT-STATUS.md`, `STATUS-ARCHIVE.md`, `EXAM-BUILD-DAY.md`, the plan,
  or f8's questions (f8 is parked for Megan's review; leave its file alone).
- No images or long logs into your context.

## Commit
Stage only the files you changed or created. `git commit -F` with a message file:
```
Finance f9: Car or no car? (meeting-day flag, coloured rate roads on the timeline)

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
```

## Report back (under 60 lines)
1. Files changed/created, one line each.
2. The harness lines verbatim and the headless play result.
3. Every place the spec was silent and what you picked.
4. Anything not done, anything that seemed outside SCOPE.
