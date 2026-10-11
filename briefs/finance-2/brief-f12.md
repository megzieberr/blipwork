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

# Worker brief: Blipwork finance round f12 "Build the one equation"

You are ONE worker building ONE unit: round f12 only. Repo
`C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (GitHub Pages app
"Blipwork", a Grade 11 maths homework hub, English, PUBLIC repo). Work on the current
branch, commit locally when done, never push.

## Read first (and nothing heavier)
1. `CLAUDE.md` in the repo root: "Technical map", "How code loads", "Gotchas",
   "Working rules". Do NOT read STATUS-ARCHIVE.md, PROJECT-STATUS.md, or transcripts.
2. `FINANCE-ROUNDS-2-PLAN.md` whole (7 KB): "Why", the vocabulary table, the input law,
   the f12 section, the build rules. Correction: `verify-finance.html` already exists
   (f1–f10, green); you extend it.
3. The question bank, ONLY these lines of
   `C:\Users\megzi\Desktop\Tutoring Resources\Graad 11 Curro\Gr11 Finance Explainers\CLASS-DIGEST-2026.md`:
   lines 26–37 ("The method, in her words") and lines 95–108 ("Examples bank used").
   Read them with a line-ranged read; the rest of that file is class notes you must not
   read. The ten example names there (Brenda, Bradley, Jason, Brian, Mandy, Bob,
   Stephanie, Arnold, David, Mvelo) are TEXTBOOK example names and may appear in
   prompts. Any other name you might see in those lines is a real learner: never use it.
4. The shapes you copy: `js/quests/questf10-in-or-out.js` and
   `js/quests/questf9-car-or-no-car.js` (the newest rounds: registration, the `skills`
   list, the per-position hook, the `money()` helper, the unbreakable-term wrapping of
   equations, the timeline spec with `meet` and `roads`, `?` with its role letter),
   `js/quests/questf6-deposits.js` and `js/quests/questf7-eff-nom.js` (the `steps` chain
   type, `mcStep` / `calcStep` from `js/quests/_shared.js`, and how verify-finance checks a
   chain with `checkStep`), `js/finlib.js` (`moveMoney`, `compoundAmount`, `COMPOUNDING`,
   `rand`, `toFrac`), `js/engine/timeline-graph.js` (spec only), the finance block of
   `js/config.js`, `js/quests/index.js`, `js/quests/load.js`, `js/local-backend.js`
   (`QUEST_IDS`, `DEFAULT_OPEN`), the finance concepts in `js/concepts.js`,
   `js/quests/_finance-check.js`, and `verify-finance.html`.

## Her rulings that bind this round
- ONE equation, built completely before anything is worked out; never solve in stages;
  never round mid-way; the answer to 2 dp at the end. (The method lines of the digest
  say it in her words.)
- The total (A for saving, the loan for a loan) is never a bare money label on a
  timeline: `?` with its role letter (the engine draws it in the accent colour with a
  ring). A payment may share the total's day.
- Vocabulary: "the total" only (no "lumpsum" in this round), "meeting day", "car",
  "deposit" / "withdrawal" / "repayment", "down payment" for hire purchase (never
  "deposit" for that). Never "lump sum", "accumulated amount", "LHS/RHS".
- Input law: mc, mcNum, yesno, calc. A `steps` chain of mc then calc is the shape here.
- Equations are long: every term unbreakable, breaks only between terms, exactly the
  wrapping f9/f10 use; every amount through the `money()` pattern; concept-card HTML uses
  the literal U+202F, never an HTML entity.

## What to build
`js/quests/questf12-one-equation.js` exporting `questF12`, registered after f10 in
`js/config.js` (`{ id: "f12", n: 12, title: "Build the one equation", blurb: ..., built: true }`;
f11 comes later and will slot between, so give f12 `n: 12` and keep the array order
f10, f12), `js/quests/index.js`, `js/quests/load.js`, `js/local-backend.js`. A concept
card in `js/concepts.js` (id e.g. `oneEquation`): pick the meeting day, give every amount
its car (none if it already stands there), write everything in ONE line with the
payments on the right, the total (or x) on the left, then type it once and round once.

### The families (one `gen` per family, each its own skill id; 8 cards a round)
Recycle the ten bank shapes with ROLLED numbers (amounts whole rand, whole % rates,
compounding sa / q / m / annual, rate changes where the bank has them, timelines 4 to 10
years), keeping each family's structure:
- `twoDeposits` (Brenda, Mvelo): deposits at T0 and later, one rate change, find A at the
  end.
- `withdrawal` (Bradley, Jason): a deposit then a withdrawal, find A.
- `mixed` (Mandy): two deposits and a withdrawal, A at the end, rate change.
- `loanTwoRepayments` (Brian, Stephanie): repayments at two later dates, two rates, find
  the loan P at T0.
- `targetAmount` (Bob): "wants R1 000 000 after 10 years", two rates, find the deposit P.
- `hirePurchase` (Arnold): a down payment, then repayments, find the loan, then
  "price = loan + down payment" as the last step (a three-step chain: mc equation, calc
  loan, calc price).
- `unknownPayment` (David): "x" in the middle with the target A given, find x.
Each card is a `steps` chain:
- Step 1 (mcStep): four equations, exactly the plan's decoys: the correct one; a wrong
  sign on the withdrawal or a repayment; a car given to the payment that already stands
  on the meeting day; a reverse exponent written positive. (Where the story has no
  withdrawal, the sign decoy flips a deposit instead.) The meeting day is the exam's
  natural one: A's day for saving, T0 for a loan; the equation is written in the tidy
  form with the payments positive on the right.
- Step 2 (calcStep): the answer to 2 dp, computed by finlib from the SAME numbers the
  prompt shows (no mid-way rounding), with the app's calc tolerance.
- (`hirePurchase` only) Step 3 (calcStep): the price.
Every chain carries `hint`s and a worked `solution` array in the one-equation form (the
equation, then the typed answer), and `answerLabel`s.

### The fade
Cards 1 to 3 of a round show the timeline (f9 style: meeting-day flag, coloured roads,
`?` with its role letter, payments as amounts). Cards 4 to 8 show NO timeline: the
learner builds it in their head. Use the same per-position hook f8/f9/f10 use (the
skill's index in the round). The harness calls each `gen` 200 times; keep that safe.

### Reuse later
The Exam Focus "timeline-equation" tile will deal these gens later. Keep each `gen` a
pure function of the shared `rng` helpers (`randInt`, `pick` from the app's rng, as the
other rounds do) so a seeded roll reproduces a card; no module-level state beyond the
position hook. Do NOT build the tile.

### Consistency with f10
- Exponents are written worked out, the exam way (`^36`, `^(−8)`), as f10 does, not f9's
  teaching form `^(3×12)`. Rates inside brackets as f10 writes them (`(1 + 0,12/12)`).
- The withdrawal marker on a timeline is f10's `out: true` (drawn "−R2 000" in red).
- Copy f10's equation parser conventions so `_finance-check.js` can parse f12's options
  with the same code where possible.

### Typesetting rules from the phone checks
- From f10's phone check: the "=" glues to the term BEFORE it (a continued line
  starts with a term, never with "="); an operator never dangles at a line end; concept
  cards use the ordinary no-break space U+00A0 (not U+202F, which looks too thin); never
  show an exponent of 1; "half‑yearly" with a non-breaking hyphen; whenever a solution
  says "car", the first use carries the clause "the (1 + i)^n bracket that moves an
  amount"; write exponents out for the learner ("3 years × 12 payments a year = 36"),
  never a bare "k".

### Numbers and honesty
Whole rand amounts, whole % rates; the four options never coincide after rolling (check
the strings differ); the computed answer is positive and sensible (a loan smaller than the
repayments' sum; x positive); the timeline is engine-placed and to scale; pronouns or the
textbook names only.

## Harness
- `verify-finance.html` picks f12 up through `CHAPTERS` once registered. In
  `_finance-check.js` add an independent recompute per family (finlib from the displayed
  numbers → the step-2 answer, and the step-3 price), a check that the correct option's
  terms match the story (one term per amount, the right sign, the right exponent sign,
  no car on a meeting-day payment), that the three decoys each differ from the correct
  option in exactly the way the plan names, and that the timeline is present on cards
  1–3 and absent on 4–8. Update the page header (f1–f12 with f11 pending).
- Server on http://localhost:5191/ (start `python -m http.server 5191` in the repo root
  in the background if it does not answer). Then
  `PYTHONIOENCODING=utf-8 python tools/harness_run.py verify-finance verify-dice-finance`
  must print ✓ ALL GOOD for both. Also `node verify-lazy-load.mjs` green.
- Play one f12 round headlessly at 390 px, DOM checks only (no screenshots into your
  context): `?local=1`, log in, Finance map → "Build the one equation", every card
  renders, step 1 wrong then right, step 2 typed via the app's keypad commits as right
  with the 2 dp value, no option wider than the viewport at 360 px, no term span broken
  across lines, the 🆘 concept opens. Adapt the f9/f10 drivers in
  `C:\Users\megzi\AppData\Local\Temp\claude\C--Users-megzi--claude\279c8df9-d1f3-4473-b85b-b9a45e708cdb\scratchpad\`.

## Do NOT
- No `sw.js` bump, no `tools/sw_check.py` (it refuses by design until the ship's bump).
- No push, no Supabase, no migrations, nothing live.
- No edits to `PROJECT-STATUS.md`, `STATUS-ARCHIVE.md`, `EXAM-BUILD-DAY.md`, the plan,
  the digest, or the questions of f8, f9, f10.
- No images or long logs into your context.

## Commit
Stage only the files you changed or created. `git commit -F` with a message file:
```
Finance f12: Build the one equation (exam-shape chains, timeline fades after card 3)

Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>
```

## Report back (under 60 lines)
1. Files changed/created, one line each.
2. The harness lines verbatim and the headless play result.
3. Every place the spec was silent and what you picked.
4. Anything not done, anything that seemed outside SCOPE.
