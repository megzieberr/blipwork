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

# Worker brief: Blipwork finance round f11 "Pick the meeting day"

You are ONE worker building ONE unit: round f11 only. Repo
`C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (GitHub Pages app
"Blipwork", a Grade 11 maths homework hub, English, PUBLIC repo). Work on the current
branch, commit locally when done, never push.

## Read first (and nothing heavier)
1. `CLAUDE.md` in the repo root: "Technical map", "How code loads", "Gotchas",
   "Working rules". Do NOT read STATUS-ARCHIVE.md, PROJECT-STATUS.md, transcripts, or
   the Tutoring Resources folder.
2. `FINANCE-ROUNDS-2-PLAN.md` whole (7 KB): "Why", the vocabulary table, the input law,
   the f11 section, the build rules. Correction: `verify-finance.html` already exists
   (f1–f10 and f12, green); you extend it.
3. The shapes you copy: `js/quests/questf9-car-or-no-car.js` (the closest round: the
   meeting-day flag, coloured roads, `?` with its role letter, car counting, the
   `money()` helper, the per-position hook, unbreakable-term wrapping),
   `js/quests/questf12-one-equation.js` (the newest round's registration),
   `js/quests/_shared.js` (mc / mcNum), `js/finlib.js`, `js/engine/timeline-graph.js`
   (spec only), the finance block of `js/config.js`, `js/quests/index.js`,
   `js/quests/load.js`, `js/local-backend.js` (`QUEST_IDS`, `DEFAULT_OPEN`), the finance
   concepts in `js/concepts.js`, `js/quests/_finance-check.js`, `verify-finance.html`.

## Her rulings that bind this round
- The total is never a bare money label: `?` with its role letter (engine-drawn, accent
  colour, ring). A payment may share the total's day.
- Vocabulary: "the total", "meeting day", "car", "road" (a rate segment), "deposit" /
  "withdrawal" / "repayment", "down payment". Never "lumpsum" here, never "lump sum",
  "accumulated amount", "LHS/RHS".
- "The answer is the same wherever you meet; picking the day is only about typing less."
  That sentence (or a close plain version) closes every solution.
- Equations unbreakable per term, money through `money()`, literal U+202F in concept
  HTML (as f9 / f10 / f12 do).

## What to build
`js/quests/questf11-meeting-day.js` exporting `questF11`, registered in `js/config.js`
BETWEEN f10 and f12 (`{ id: "f11", n: 11, title: "Pick the meeting day", blurb: ..., built: true }`;
the array order becomes f10, f11, f12), `js/quests/index.js`, `js/quests/load.js`,
`js/local-backend.js` (QUEST_IDS and DEFAULT_OPEN, same order). A concept card in
`js/concepts.js` (id e.g. `meetingDay`): two rules of thumb, "meet where someone already
stands" (that amount needs no car) and "meet where the road changes colour" (fewer
two-car trips), and the reminder that any meeting day gives the same answer.

### Skills (each its own `gen`, id, 200 harness rolls; 8 cards a round)
Every card shows a timeline (f9 style, but the flag is NOT drawn, since the learner picks
it) with 2 to 3 amounts (payments as amounts, the total as `?` with its role letter) and
0 or 1 rate change (one or two coloured roads).
- `fewestCars` (mc): "Which meeting day needs the fewest cars?" Options are 3 or 4
  T-values (always including the best one and the end day); on reveal each option is
  annotated with its car count, e.g. "T3: 2 cars", "T7: 3 cars". When two days tie for
  fewest, both must not be options, or the prompt says "fewest cars, as late as
  possible" so one answer is right; keep it simple and say which you did.
- `carCountAt` (mcNum): "If we meet at T4, how many cars are needed?" → the count
  (an amount standing on T4 needs none; an amount crossing the rate change needs two).
- `whereStands` (mc): "Meeting where someone already stands saves a car. Which amount
  is already standing on T5?" → the amount at T5 (or "none"), a recall of f9's idea.
- `colourChange` (mc): "Meeting where the road changes colour: which T is that?" → the
  rate-change T; decoys: the end, T0, a middle T.
- `sameAnswer` (yesno): "Meeting at T2 instead of T7: does the final answer change?" →
  no. Solution: only the typing changes.
- `bestReason` (mc): "Why is T3 a good meeting day here?" → "an amount already stands
  there" / "the road changes colour there" / both; decoys: "it is the end", "it is the
  biggest amount".
Hints, `answerLabel`s and `solution` arrays on every card with working (count the cars
per candidate day, then the closing sentence).

### Typesetting rules from the phone checks
- From f10's phone check: the "=" glues to the term BEFORE it (a continued line
  starts with a term, never with "="); an operator never dangles at a line end; concept
  cards use the ordinary no-break space U+00A0 (not U+202F, which looks too thin); never
  show an exponent of 1; "half‑yearly" with a non-breaking hyphen; whenever a solution
  says "car", the first use carries the clause "the (1 + i)^n bracket that moves an
  amount"; write exponents out for the learner ("3 years × 12 payments a year = 36"),
  never a bare "k".

- From f12's phone check: a number and its unit are ONE unbreakable unit ("2 years",
  "8% p.a.", "R8 000 at T3"); the app's formatter wraps bare numbers in their own
  inline-block, so a no-break space outside it does not help. When the left side of an
  equation is a single letter, glue "A = " to the first right-hand term. Copy the way
  f12 does both after its review fix (look at `questf12-one-equation.js`).

### Numbers and honesty
Whole rand amounts, whole % rates, roads at least 2 years, 4 to 8 years total; decoys
never collide; engine-placed to-scale timeline; every label fits at 360 px; pronouns
only, no first names.

## Harness
- `verify-finance.html` picks f11 up through `CHAPTERS` once registered. In
  `_finance-check.js` add a recompute of the car count per candidate day from the
  displayed amounts, their T's and the rate-change T (an amount on the day: 0; crossing
  the change: 2; else 1), and check the marked answer is the true minimum (and unique
  under the rule you chose). Update the page header (f1–f12 complete).
- Server on http://localhost:5191/ (start `python -m http.server 5191` in the repo root
  in the background if it does not answer). Then
  `PYTHONIOENCODING=utf-8 python tools/harness_run.py verify-finance verify-dice-finance`
  must print ✓ ALL GOOD for both. Also `node verify-lazy-load.mjs` green.
- Play one f11 round headlessly at 390 px, DOM checks only (no screenshots into your
  context): `?local=1`, log in, Finance map → "Pick the meeting day" (between f10 and
  f12 on the map), every card renders, a wrong answer shows the per-option car counts, a
  right one commits right, the 🆘 concept opens, no sideways scroll at 360 px. Adapt the
  drivers in `C:\Users\megzi\AppData\Local\Temp\claude\C--Users-megzi--claude\279c8df9-d1f3-4473-b85b-b9a45e708cdb\scratchpad\`.

## Do NOT
- No `sw.js` bump, no `tools/sw_check.py`.
- No push, no Supabase, no migrations, nothing live.
- No edits to `PROJECT-STATUS.md`, `STATUS-ARCHIVE.md`, `EXAM-BUILD-DAY.md`, the plan,
  or the questions of f8, f9, f10, f12.
- No images or long logs into your context.

## Commit
Stage only the files you changed or created. `git commit -F` with a message file:
```
Finance f11: Pick the meeting day (fewest cars; same answer anywhere)

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
```

## Report back (under 60 lines)
1. Files changed/created, one line each.
2. The harness lines verbatim and the headless play result.
3. Every place the spec was silent and what you picked.
4. Anything not done, anything that seemed outside SCOPE.
