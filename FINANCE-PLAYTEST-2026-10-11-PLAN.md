# Finance rounds part 2: play-test notes and the build queue (Sun 2026-10-11)

> STATE 2026-10-11 16:35: the §6 queue RAN (Fable foreman, six workers, commits 75e73ce…4736ce5), NOT shipped; see PROJECT-STATUS.md and SHIP-PLAN-finance-2.md. The f12 down payment is answered "nowhere" (worker 5's call, flagged); fix lists parked in briefs/finance-2/brief-2b…5b.

Megan play-tested f9, f10, f11, f12 on `localhost:5191/?local=1` (11:05 to 11:50) and we talked
f8 through. This file is the hand-off for the FRESH foreman session that runs the builds
(her word 12:02: "a fresh session will run as foreman for the build"). Read this file,
`PROJECT-STATUS.md` and `SHIP-PLAN-finance-2.md`; do not re-ask anything ruled here.

Standing rules for the foreman: one unit per worker, fresh Opus worker per fix round,
Sonnet phone-width checker (390 + 360 px) after every build, verify-finance green at every
step, workers never bump `sw.js`, `/go` stamp in every brief, cost estimate + her "run it"
before each dispatch. The Fable session that briefs is never the one holding the screenshots.

## The finance ladder this year (her ruling 11:47)

| n | id | title | state |
|---|----|-------|-------|
| 8 | f8 | Which one is the total? | REDESIGN (the jug), see §3 |
| 9 | f9 | Car or no car? | fix A |
| 10 | f10 | In or out? | fix A + REWORK (taught form only), see §2 |
| 11 | f11 | Pick the meeting day | clean (no exponents shown; nothing owed) |
| 12 | f12 | Build the timeline | NEW, see §4 (takes f12's slot) |
| 13 | f13 | Build the one equation | was f12: fix A + fix B (colour), renumber |

Why 12 before 13: the exam hands them words, nothing else. Words → timeline → equation is the
order they must work in, so the rounds go the same way. (She first proposed the timeline round
after the equation round, then moved it before: 11:47.)

Renumbering touches `js/config.js` (n, id), `js/quests/index.js`, `js/quests/load.js`,
`js/local-backend.js` QUEST_IDS + DEFAULT_OPEN, the seeding migration (sort 94–99), schema.sql,
and `verify-finance.html`; `node verify-lazy-load.mjs` must stay green. Keep the FILE name of
the one-equation round (`questf12-one-equation.js`) or rename it: foreman's call, but the quest
ID must become `f13` so the DB rows and the Exam Focus `timeline-equation` tile point at the
right thing. Check `EXAM-BUILD-DAY.md` ROUND TWO for any reference to "f12's gens" and update it.

## 1. Fix A: exponents as real superscripts (f9, f10, f13; f11 shows none)

What she saw: `1 000(1 + 0,14/2)^(3×2)`, `…(1 + 0,11)^4`, `(1 + 0,2/2)^(−10)` all drawn with a
literal caret. "The exponents need to be real exponents, not like this ^."

Cause (measured): `formulaHtml` in `js/ui.js` only superscripts a caret whose exponent is a
parked FRACTION (`^(2/5)`, ui.js:184). A plain `^3`, `^(−10)` or `^(3×2)` passes through as text.
f5, f6, f7 write `^${k}` as text too (questf5-timeline-build.js:53), so the older rounds have
the same look; she did not flag those, but the fix should not make f1–f7 look different from
f8–f13.

Two ways, foreman picks ONE and says which in the brief:
- **(recommended) finance-only helper.** A `pow(base, exp)` in `js/quests/_shared.js` (or a
  finance-local helper) that returns `base<sup class="sf-exp">exp</sup>`, with `exp` written as
  `3×2`, `−10`, `36`: no brackets inside the sup, the minus is a real minus (U+2212). Used by
  f9's car labels (questf9:141), f10's term builder (questf10:106), f13's equation lines, and,
  her call, f5/f6/f7 (default: yes, so the chapter reads as one). Blast radius = finance only.
- **app-wide rule in formulaHtml**: `^(\S+?)` → `<sup>`. Touches every chapter (exp, eqn, pat,
  gtrig…). Only if the helper turns out impossible; then the full harness sweep AND a look at
  es1–es8, eq1–eq9, np1–np7 pages is mandatory before the ship.

Watch-outs the f9/f10 reviews already solved and must survive: unbreakable terms (no line
break between a bracket and its exponent), the no-break spaces inside money, MC option labels
must still de-dupe by VALUE (a `<sup>` changes the label string; `mc()` compares strings), and
`check.js` must compare the plain answer, not the HTML. verify-finance asserts on answer
labels: expect to update those assertions, not the rule.

Phone check: 390 and 360 px, each of f9, f10, f13, every card kind; a sup must not push a term
onto its own line nor clip in a chip.

## 2. f10 "In or out?": taught form only this year; jug form archived for 2027

Her ruling 11:29 + 11:35: the "jug form first, then tidy it: move the minuses across" is HOW SHE
WILL TEACH IT IN 2027, after a proper discovery lesson. This year the class was crammed and never
did discovery, so a form she showed once in class would confuse them. Keep this year's rounds to
the taught shape: **total on the left, payments on the right**.

Action (not a nuke, an archive):
- Move the jug-form cards, their gens and their concept text out of the live round into
  `briefs/finance-2/ARCHIVE-f10-jug-form-2027.md` (the exact card wording, the gens as they
  are in commit `55e5c6a` + `cf85183`, the "tidy it" step, the saving refrain), with a pointer
  line at the top of `Tutoring Resources/Graad 11 Curro/Gr11 Finance Explainers/
  GR11-FINANCE-REDESIGN.md`: "f10 jug form: built 10 Oct 2026, archived for the 2027 build,
  see maths-homework-quest/briefs/finance-2/ARCHIVE-f10-jug-form-2027.md". Git history keeps
  the code; the md keeps the design readable without digging.
- f10's job THIS year (my proposal, she vetoes with one line in the fresh session if she
  disagrees): every amount on the right gets a sign. Cards:
  1. "In or out?" per amount: a deposit / the loan goes IN (+ on the right... see note), a
     withdrawal / a repayment comes OUT (−). Tap + or −. Timeline shown, taught form shown
     beneath as it fills: `A = 5 000(…)^… + 3 000(…)^… − 4 000(…)^…` (savings) and
     `P = 6 000(…)^(−…) + 3 000(…)^(−…)` (loan: repayments positive on the right, as taught).
  2. "Is this equation correct?" yes/no in the taught form only, with ONE sign flipped or one
     amount on the wrong side as the wrong case. Never the `… = 0` form.
  3. Keep the existing "the equals sign never alone" and same-day deposit rules from review 1.
  Note on signs in the taught form: for savings, deposits +, withdrawals −, A alone on the
  left. For a loan, P alone on the left, repayments + on the right (her 10 Oct ruling that the
  closing line is kind-specific still holds; only the jug/tidy pair goes).
- Concept card: the jug PICTURE from f8 (§3) may be reused as the reminder ("coins in, coins
  out; the jug stays on the left"), but no "jug FORM" equation.

## 3. f8 "Which one is the total?": the jug redesign (her "absolutely perfect", 12:02)

Mock-up she approved: `briefs/finance-2/f8-jug-mockup.png` (phone width; concept card on top,
the question below). Source html in that session's scratchpad only; rebuild from this spec.

The idea, in her words and mine (11:54–11:57):
- "Lump sum" literally means ONE PAYMENT in the textbooks, so the kids heard "a payment" every
  time. The word is retired; the app says **the total**.
- Definition the app uses: **the ONE amount that is worth the same as ALL the payments
  together, once they are all on the same day.** Payments are the many; the total is the one.
- The picture: **payments are coins, the total is the jug.** Savings: you fill the jug; the jug
  at the END is the total (A). Loan: the bank hands you a full jug at the START; that jug is the
  total (P); you pay it back coin by coin. Interest makes the jug (or the debt) grow. A
  withdrawal is a coin going out. The jug can end up smaller than a coin: it is still the jug.
  ("Biggest value" and "your balance" both break; the jug does not.)
- The test the kids keep: in the taught equation the total is the one that stands ALONE on its
  side; everything on the other side is a coin. In the paragraph, the total is the "has /
  borrows / wants to have" sentence (a state); coins are the "pays / deposits / withdraws"
  sentences (actions).

Round shape (replaces the 10 Oct f8 entirely; its tap-the-money-label cards are archived the
same way as §2, `briefs/finance-2/ARCHIVE-f8-tap-label-2026-10-10.md`, pointer in
GR11-FINANCE-REDESIGN.md):
1. Concept card first (the mock-up's top card): jug + coins, both kinds side by side, the
   three-line caption each, the "still the jug" line.
2. Card kind A, **"Tap the sentence that is the jug."** The paragraph cut into its sentences as
   tap chips (3 to 5 sentences; exactly one is the total; the rest are coins or rate/time
   sentences). Savings and loan paragraphs both; hire purchase says "down payment". Fresh
   paragraphs from gens, textbook example names only (public repo).
3. Card kind B, **"Savings or loan?"** (mc, same paragraph).
4. Card kind C, **"Does the jug sit at T0 or at the end?"** (mc: T0 / the last T), then the
   timeline appears with the `?` already in its ring and its role letter, coins NOT yet placed.
   This is the only timeline in f8. No tapping money labels on a timeline in f8 any more.
5. Card kind D (recall, later in the round): "Which of these is the jug?" with FOUR short
   phrases (e.g. "she deposits R3 000", "he borrows R80 000", "she withdraws R4 000", "he pays
   R6 000 at T1"), one jug. Fresh numbers.
Wrong-answer feedback always says which KIND the tapped sentence is ("that is a coin: money
going in on its day") and never "wrong".

Art: **she draws the jug herself** (her word 12:02: "I will need to create a new jug, your jug
is very wonky"). ONE jug PNG, transparent background, the inside see-through so the app can
draw the fill level behind it in the chapter colour (then one drawing serves both the
filling-savings jug and the full-loan jug). Coins: code-drawn circles with a gold rim (red rim
when the coin goes out) and SHORT labels ("5 000", or no number at all on the concept card).
Until her PNG lands the worker uses a plain code-drawn placeholder jug and the brief says so;
swapping in her PNG is a one-line asset change, never a reason to wait.
Run `tools/to_webp.py` after her PNG lands (house rule for new art).

## 4. f12 "Build the timeline" (NEW; her design 11:39, order 11:47)

The capstone of f8–f11 and the step before the equation: a paragraph, and the learner builds the
whole timeline by taps. Every step is a pick from a list (input law: never type words).

Steps per card, in her order:
1. **How far does the timeline go?** Pick the last T (list of T values).
2. **Where does the interest rate change?** Pick the T, or "no change".
3. **Which rate goes on which road?** Fill the road slots from a list (the 2D-trig tokenpad
   style, but the slots are the roads between T's). Roads take the colour of the rate placed
   (the f9 coloured-roads engine).
4. **Where does the total (the jug) go?** T0 for a loan, the last T for savings. The `?` with its
   role letter appears in its ring when placed.
5. **Where does each coin go?** Place each deposit / withdrawal / repayment on its T from a list.
   Same-day cases (a down payment on the loan's day) use the engine's stacked labels: one slot
   per T, a second slot opens when a T already holds a coin.

Optional fold (my suggestion, her call, default = her five steps as written): steps 2 and 3 can
be one step, "drop each rate on its road", with the change point implied by the colour change.
Keep "no change" as a visible choice either way.

Marking: each step marked on its own; the next step's picture shows the CORRECT state so far
(so a slip in step 2 does not poison step 5). XP full. The finished timeline is the
same drawing f13 starts from.

Gens: reuse f13's paragraph/timeline generators (exam-shape chains, 2 rates or 1, 2 to 3
coins, loan or savings, hire purchase with "down payment"); the worker must not invent a second
timeline model. verify-finance gets a section for f12 (every gen: exactly one correct pick per
step, slots resolve, stacked case renders).

## 5. Fix B: f13 equation lines coloured like the timeline (11:47)

In "Which line is the one equation?" each rate factor `(1 + 0,2/2)^10` takes its ROAD's colour,
`(1 + 0,16)^3` the other road's colour; amounts may take their stop colour if the timeline marks
them. The kids read the equation off the picture. Colour via a span class per road index
(`.tl-road-1`, `.tl-road-2`…), the same CSS variables the engine already uses, so the two can
never drift. Colour must survive the sup fix (A) and the unbreakable-term wrapping; wrong
options are coloured the same way (colour is never a hint to the right answer: check that no
option is the only one with two colours, etc.). After the timeline fades (card 3 onward) the
colours stay in the equation lines: that is the point.

## 6. Build queue for the fresh foreman session (one unit per worker)

Estimates are build price; fix rounds cost the same as builds (10 Oct lesson), quote them so.

| # | unit | worker | est |
|---|------|--------|-----|
| 1 | Renumber: one-equation round f12 → f13; f12 slot freed; config/index/load/local-backend/migration/schema/verify-lazy-load/EXAM-BUILD-DAY; harness sweep | Sonnet (mechanical, exact spec) | ~120k |
| 2 | Fix A: the `pow` helper + f9, f10, f13 (+ f5–f7 by default) + verify-finance assertions | Opus | ~250k |
| 3 | f10 rework: archive the jug form (md + pointer), taught-form cards per §2 | Opus | ~300k |
| 4 | f8 redesign per §3 (placeholder jug, her PNG swapped in when it lands) | Opus | ~350k |
| 5 | f12 Build the timeline per §4 | Opus | ~400k |
| 6 | Fix B: f13 colours per §5 | Opus | ~200k |
| each | Sonnet phone checker after 2–6, fresh Opus fix worker where it finds something | | ~150k + ~300k per fix |

Then the ship per `SHIP-PLAN-finance-2.md`, updated for f8–f13 (six rows, sort 94–99, all
CLOSED; sw mhq-v95 → v96; `python tools/sw_check.py` OK; push; live checks). The f8 "ship it
closed or built:false" question is now answered: f8 ships as the jug round, closed like the rest.

Rough total if nothing needs a second fix round: ~2.2M worker tokens; with one fix round per
Opus unit ~3.7M. She runs it one worker at a time and plays each round before the next, or
says "carry on" and plays them all at the end (both were fine on 10 Oct).
