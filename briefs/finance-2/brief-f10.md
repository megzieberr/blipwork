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

# Worker brief: Blipwork finance round f10 "In or out?"

You are ONE worker building ONE unit: round f10 only. Repo
`C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (GitHub Pages app
"Blipwork", a Grade 11 maths homework hub, English, PUBLIC repo). Work on the current
branch, commit locally when done, never push.

## Read first (and nothing heavier)
1. `CLAUDE.md` in the repo root: "Technical map", "How code loads", "Gotchas",
   "Working rules". Do NOT read STATUS-ARCHIVE.md, PROJECT-STATUS.md, transcripts, or
   the Tutoring Resources folder.
2. `FINANCE-ROUNDS-2-PLAN.md` whole (7 KB): "Why", the vocabulary table, the input law,
   the f10 section, the build rules. Correction: `verify-finance.html` already exists
   (f1–f9, green); you extend it.
3. The shapes you copy: `js/quests/questf9-car-or-no-car.js` (the newest round and the
   current house style: registration, `skills` list, the story helper, money with no-break
   spaces, `solution` arrays, the timeline spec with `meet` and `roads`, and the rule that
   the total is drawn as `?` with its role letter), `js/quests/questf5-timeline-build.js`
   (how equations are written in prompts and options, e.g. `P(1 + 0,08)^3`),
   `js/quests/questf6-deposits.js` (hire purchase wording), `js/quests/_shared.js` (mc /
   mcNum helpers), `js/finlib.js` exports, `js/engine/timeline-graph.js` (spec only),
   the finance block of `js/config.js`, `js/quests/index.js`, `js/quests/load.js`,
   `js/local-backend.js` (`QUEST_IDS`, `DEFAULT_OPEN`), the finance concepts in
   `js/concepts.js`, `js/quests/_finance-check.js`, and `verify-finance.html`.

## Her rulings that bind this round
- The total (the amount all the payments add up to: A for saving, the loan for a loan) is
  never a bare money label on a timeline. On a picture it is `?` with its role letter, or
  carries the role letter if it is a known number. A payment may share the total's day.
- Vocabulary: "the total" only (no "lumpsum" in this round), "meeting day", "car",
  "deposit" / "withdrawal" / "repayment", "down payment" for a hire-purchase cash payment
  (never "deposit" for that). Never "lump sum", "accumulated amount", "LHS/RHS".
- ONE equation, built completely before anything is worked out; never solve in stages;
  never round mid-way. Worked `solution` arrays on every card with real working.
- Input law: mc, mcNum, yesno only (calc is allowed but this round needs none). No free
  text.

## What to build
`js/quests/questf10-in-or-out.js` exporting `questF10`, registered after f9 in
`js/config.js` (`{ id: "f10", n: 10, title: "In or out?", blurb: ..., built: true }`),
`js/quests/index.js`, `js/quests/load.js`, `js/local-backend.js`. A concept card in
`js/concepts.js` (id e.g. `inOrOut`): deposits and the loan go IN (plus); withdrawals and
repayments come OUT (minus); the "jug" form writes everything on one side and sets it
equal to zero or to the total; the "tidy" form moves the minuses across so the payments
stand positive on the right. The round teaches the sign the way her class is now taught:
the jug form FIRST (it is the kids' instinct and it is right), then the tidy step.

### Skills (each its own `gen`, id, 200 harness rolls; 8 cards a round)
Each card has a short story (pronouns only) and, where it helps, a timeline in the f9
style (meeting day flag, roads, `?` with its role letter). Rates whole %, compounding from
`COMPOUNDING` with k in {1, 2, 4, 12}, amounts whole rand, exponents years × k.
- `jugCorrect` (yesno): the jug form shown for a loan, e.g.
  `P(1 + 0,12/12)^36 − 8 000(1 + 0,12/12)^24 − 9 000 = 0`. "Is this equation correct?"
  → yes. Also roll a saving version, `A − 14 000(…)^k + 2 000(…)^j = 0` with a
  withdrawal. Solution: what each sign means (in / out), then the tidy form.
- `jugWrong` (yesno): the jug form with one sign slipped (a repayment added, or a
  withdrawal subtracted the wrong way, or a deposit subtracted). "Is this equation
  correct?" → no. Solution names the slipped term and gives the right jug form.
- `tidy` (mc): "Tidy it: move the minuses across. Which line is the tidy form?" The
  correct `P(1 + i)^n = 8 000(1 + i)^m + 9 000` among three sign-slip decoys (a minus
  kept, a term moved without changing sign, a car dropped).
- `withdrawal` (mc): saving with one withdrawal: `A = 14 000(…)^k − 2 000(…)^j` among
  decoys that add the withdrawal, give it the wrong exponent sign, or give it no car.
- `inOrOutWord` (mc): a plain recall card: "A repayment on a loan: in or out?" → out;
  "A deposit into savings" → in; "A withdrawal" → out; "The loan itself" → in; "A down
  payment on a car bought on hire purchase" → it never enters the account (no car, no
  sign; it comes off the price). Roll one of these per card.
- `interestPaid` (mcNum): "She borrowed R3 587,42 and paid back R2 300 and R4 200. How
  much interest did she pay?" → 2 912,58 (payments minus the loan). Roll the numbers;
  answers to 2 dp or whole rand; decoys: loan minus payments (negative, shown as a
  positive), one payment minus the loan, the sum of the payments.
- `tidyLoan` (mc): the loan version of tidy with the loan on the left and a down
  payment in the story: "price = loan + down payment", so the loan is the price minus the
  down payment; the correct tidy line uses the loan, decoys use the price or add the down
  payment into the account.
- `signOnTimeline` (mc): a timeline with `?` (role A) and two or three amounts, one of
  them a withdrawal marked clearly (e.g. an arrow or the word "out" in the label; extend
  the timeline spec minimally if needed, e.g. `out: true` on a node draws its label with
  a leading "−" or an "out" tag; verify must measure it). "Which equation matches the
  picture?" → the correct tidy form among sign decoys.
Round's solution refrain, every card with working: "Deposits and the loan go IN.
Withdrawals and repayments come OUT. Tidy: payments positive on the right."

### Lessons from f9's phone check (bind this round too)
- Equations are long. Every TERM must be unbreakable and a line may break only between
  terms (at " + ", " − ", " = "). Copy the exact pattern f9 uses after its review fix
  (look at how `questf9-car-or-no-car.js` wraps terms, e.g. a `nowrap` span, and reuse
  that class). Test it: at 360 px no option may be wider than the viewport and no term
  span may be broken across lines (`getClientRects().length === 1`).
- Money: never a plain space inside an amount. In quest strings use the no-break helper
  (f9's `money()` pattern). In concept-card HTML use the literal character U+202F, never
  the HTML entity `&#8239;` (the concept renderer escapes it and shows raw text).
- On any timeline the `?` with its role letter is drawn by the engine in the accent
  colour with a ring (f9's review fix); do not restyle it.

### Numbers and honesty
Whole rand amounts, whole % rates; decoys never collide with the correct option; every
option fits at 360 px (the equations are long: break them the way f5 and f9 do, or use a
smaller option font via an existing class if one exists; no sideways scroll); the
timeline is engine-placed and to scale; pronouns only.

## Harness
- `verify-finance.html` picks f10 up through `CHAPTERS` once registered. In
  `_finance-check.js` add recompute for `interestPaid` (from the displayed numbers), a
  check that every equation option is a valid equation string with balanced brackets and
  exactly the terms the story has, and a check that the correct jug/tidy forms are
  consistent with each other (same terms, signs flipped across the equals sign). Any new
  timeline marker must be measured like the others. Update the page header (f1–f10).
- Server on http://localhost:5191/ (start `python -m http.server 5191` in the repo root
  in the background if it does not answer). Then
  `PYTHONIOENCODING=utf-8 python tools/harness_run.py verify-finance verify-dice-finance`
  must print ✓ ALL GOOD for both. Also `node verify-lazy-load.mjs` green.
- Play one f10 round headlessly at 390 px, DOM checks only (no screenshots into your
  context): `?local=1`, log in, Finance map → round 10, every card renders, a correct
  answer commits as correct, a wrong one as wrong, options never wider than the viewport,
  the 🆘 concept opens. `C:\Users\megzi\AppData\Local\Temp\claude\C--Users-megzi--claude\279c8df9-d1f3-4473-b85b-b9a45e708cdb\scratchpad\f9\play_f9.py`
  shows how f9's worker drove the app; adapt it.

## Do NOT
- No `sw.js` bump, no `tools/sw_check.py` (it refuses by design until the ship's bump).
- No push, no Supabase, no migrations, nothing live.
- No edits to `PROJECT-STATUS.md`, `STATUS-ARCHIVE.md`, `EXAM-BUILD-DAY.md`, the plan,
  or the questions of f8 and f9.
- No images or long logs into your context.

## Commit
Stage only the files you changed or created. `git commit -F` with a message file:
```
Finance f10: In or out? (jug form first, then the tidy step)

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
```

## Report back (under 60 lines)
1. Files changed/created, one line each.
2. The harness lines verbatim and the headless play result.
3. Every place the spec was silent and what you picked.
4. Anything not done, anything that seemed outside SCOPE.
