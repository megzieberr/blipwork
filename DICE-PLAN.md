# DICE-PLAN — generative practice rounds for Blipwork

Written 2026-08-21 from Megan's design conversation (the Fun Functions qE playtest
session). Status: **DESIGN APPROVED, BUILD NOT SCHEDULED** — Fun Functions batch 3
finishes first. Read this whole file before any dice build session.

## The idea in one paragraph

Keep every static round and the teacher dashboard **exactly as they are**. Add a 🎲
dice at the top of each chapter page. The dice deals a freshly *generated* round —
same question kinds as the chapter's static rounds, but the numbers (and diagrams)
are rolled new every play, and answers are computed, never stored. Dice rounds pay
real XP and diamonds, so learners never run out of things to play or ways to feed
their blips. The dice is **never locked** — a kid who skips straight to dice practice
is a kid practising maths.

Why this shape won over full conversion: the dashboard's per-round chips keep
meaning what they mean, nothing live is touched, and every question Megan already
vetted becomes the skeleton of a recipe instead of being thrown away.

## Her rulings (2026-08-21 — all DECIDED, do not re-ask)

- **Dashboard:** 🎲 icon + play count per chapter, nothing more. Her struggles
  panel already covers question-type weaknesses.
- **XP:** dice rounds pay **full XP**. (Watchpoint, not a rule: if diamond farming
  ever distorts the shop, raise it once with data. Do not nag.)
- **Dealing:** first play(s) deal **one round of each kind**; once a learner has met
  every kind, fully random. (Same ruling as Fun Functions qE, made the same day.)
- **Method reveal:** worked method shows **on a wrong answer**, plus an
  always-available **"show me the method"** link — some kids get the right answer
  by a very long road and should be able to see the shorter one.
- **Pilot order:** **Statistics first**, then **Trig Graphs**.
- **Pen-and-paper chapters** (work it out, type the number): Algebra, Probability,
  Finance, Analytical Geometry.
- **Error-checking chapters:** Functions, Trig Graphs — "does this graph match this
  equation?" yes/no; if no, pick from a list what is wrong.
- ⚖️ **INPUT LAW (never relax):** learners never type words or sentences. The only
  inputs are: pick from a list, click on the sketch, the number pad, or the stats
  calculator buttons.

## How a static round becomes a recipe

Every vetted static question is the skeleton. Per question:

1. **Slots + dice limits** — which numbers vary and within what bounds, chosen so
   the question stays fair and the diagram stays honest. The original static
   numbers define what "fair" looks like.
2. **Computed answer** — worked out from the rolled numbers by a maths library
   (the funclib pattern from graph-quest). Nothing hand-typed, so picture and
   answer can never disagree.
3. **Rebuilt decoys** — wrong options are computed from the same rolled numbers
   (sign-flip, forgot-to-square, etc.), collision-checked **by value** so no decoy
   ever equals the right answer.
4. **Rolled diagram** — drawn to scale from the same numbers, every time.

**Audit rule:** every static question gets classified once —
`ROLLS CLEANLY` / `ROLLS WITH CARE` / `STAYS STATIC`. Worded, context-rich
questions stay static and simply aren't in that chapter's dice pool. Nobody
converts everything; hybrid is the design.

## The number pad (exists already — reuse, don't rebuild)

- Comma only, **no fraction entry**; answers to **2 decimals** — deliberate exam
  practice (they lose marks for wrong rounding).
- This *frees* the recipes: rolled answers don't need to be clean integers.
- ⚖️ Compute EXACT all the way through, round **once at the end** — Megan's
  Finance one-equation law (never round mid-question) applies to every generated
  worked method, not just finance.
- The answer checker (decimal comma, minus sign, expected rounding) gets
  harness-tested as hard as anything else.

## Method study — BLOCKING prerequisite for pen-and-paper chapters

Her kids reject apps that show alien methods (the Photomath complaint). So before
any pen-and-paper recipe is written for a chapter:

1. Megan supplies her worked examples for that chapter — board photos, notes,
   whatever she has.
2. One session digests them into `METHODS-<chapter>.md` (the same pattern as
   graph-quest's GR11-FUNCTIONS-NOTES-DIGEST.md).
3. Every generated worked solution follows that document. Standing law from Fun
   Functions applies here too: **never substitute a textbook method**.

Head start: **Finance's method doc already exists** —
`C:\Users\megzi\Desktop\Graad 12 Curro\FINANCE-METHOD.md` (ONE equation, no
mid-question rounding).

## Error-checking rounds (Functions, Trig Graphs)

This is the same mechanic as Fun Functions' **"Soek die fout"** (batch 3,
session 4, not yet built). Build it once, share it between both apps:

- Generate a graph from a deliberately corrupted equation (one corruption: sign
  flip, wrong intercept, wrong amplitude…) — or an honest pair.
- Learner: match? yes/no. If no: pick what's wrong from a list.
- The "what's wrong" options ARE the corruption list — the decoy machinery doing
  double duty.

Coordinate timing: graph-quest's Soek die fout session should land first (or
together), so blipwork inherits a tested mechanic.

## Statistics pilot (first build)

- Roll a fresh data set per round, constrained so the summary values come out
  reasonable at 2 dp (no degenerate sets — harness-checked).
- Question kinds mirror the chapter's static skills (q1–q8), reusing the existing
  stats **calculator-button rounds** as an input mechanic.
- Ships alone, behind the dice, Megan phone-tests before anything else moves.

## Engineering notes

- **Additive only.** No existing round, save, XP total, or dashboard chip is
  touched. Feature-flag the dice per chapter so chapters light up one at a time.
- **Saves:** store the rolled numbers in the save, so resuming mid-round gives the
  exact same question back.
- **Supabase:** one new additive table for dice plays (learner × chapter × count,
  plus whatever the save needs). Own grants per the column-revoke house rules;
  XP/diamonds through the existing server-side RPC counters (double-submit rule:
  disable before await).
- **Harness per chapter, verify.html-style:** hundreds of rolls per recipe —
  clean computable answer, honest in-frame diagram, four distinct options, no
  decoy collisions, input-law compliance, method text present. A recipe that is
  fine 97% of the time still hits a kid with nonsense on roll 34; the harness is
  the guarantee that replaces Megan's pre-reading.
- **Dashboard:** one 🎲 + count cell per chapter on the teacher dashboard.

## What Megan supplies

- Worked examples per pen-and-paper chapter (Algebra, Probability, Analytical
  Geometry — Finance is covered by FINANCE-METHOD.md).
- Classification calls when the audit is unsure whether a question rolls or stays
  static.
- A phone-test between every shipped chapter — one at a time, her rhythm.

## Build order (each its own session(s), her phone-test between)

0. **Audit + infrastructure** — classify every static question; dice UI, save
   shape, Supabase table, harness scaffold. (After Fun Functions batch 3.)
1. **Statistics pilot** — recipes + harness + ship behind the dice.
2. **Trig Graphs** — error-check mechanic, shared with graph-quest's Soek die fout.
3. Onwards chapter by chapter, her order — pen-and-paper chapters each need their
   METHODS digest session first.

## Open questions (for the build kickoff, not now)

- Dice round length: same number of questions as a static round? (Assumed yes.)
- Does a dice play mark anything on the learner-facing chapter page (streak dots,
  best score), or is the dice deliberately stat-free for the kids?
