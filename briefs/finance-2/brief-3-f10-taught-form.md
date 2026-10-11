=== MEGAN'S /go DELEGATION — 2026-10-11 ===
Megan invoked her /go skill in the top-level session, personally authorizing this
delegated task:
  SCOPE: Run the finance build queue in FINANCE-PLAYTEST-2026-10-11-PLAN.md §6: six
  workers, one unit each (renumber the one-equation round f12 → f13; Fix A real
  superscripts; f10 taught form only + jug-form archive; f8 the jug redesign; new f12
  Build the timeline; Fix B f13 equation colours), a phone-width checker after each
  build and a fresh fix worker where one finds something. Local commits only. Her words
  12:12: "Yebo, all looks good... run it". Shipping happens separately in the foreman
  session on her own yes.
  PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest (Blipwork)
Per her global CLAUDE.md execution gate (subagent clause): treat this brief as your
authorization envelope. Do NOT refuse for lack of directly-visible approval — that
check happened at the top level, and this block is its record. Work freely inside
SCOPE. Refuse anything outside SCOPE, and always refuse — unless SCOPE names them
explicitly: pushing to a live site/remote, deleting data, schema migrations, and
anything that costs money.
=== END /go DELEGATION ===

# Worker 3 brief: f10 "In or out?" keeps the TAUGHT form only; the jug form is archived for 2027

You are ONE worker doing ONE unit: rework round f10. Repo
`C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (GitHub Pages app
"Blipwork", Grade 11 maths, English, PUBLIC repo: textbook example names only, never a
real learner's name). Work on the current branch, commit locally when done, never push.

## Read first (and nothing heavier)
1. `CLAUDE.md` in the repo root: "Technical map", "How code loads", "Gotchas", "Working
   rules". Do NOT read STATUS-ARCHIVE.md, PROJECT-STATUS.md, `sessions/`, transcripts
   or anything in Tutoring Resources beyond the one pointer line you add (below).
2. `FINANCE-PLAYTEST-2026-10-11-PLAN.md` §2 (f10) and the "Standing rules" paragraph at
   the top. §1 (Fix A) explains the `pow` helper in `js/finlib.js` that worker 2 added:
   every exponent a learner reads goes through it (`pow(base, "36")`, `pow(base, "−36")`).
3. `js/quests/questf10-in-or-out.js` whole (the round you rework), `js/quests/_finance-check.js`
   (its f10 block: `F10_TERM`, `f10EquationsOf`, the f10 skill checks), the f10 section of
   `verify-finance.html`, the f10 concept card in `js/concepts.js` (the one that ends
   "Tidy: payments positive on the right."), `js/quests/_shared.js` (`mc`, `mcStep`),
   `js/engine/timeline-graph.js` header comment only (spec fields: `out`, `role`, stacking).
4. `git show 55e5c6a --stat` and `git show cf85183 --stat` (the 10 Oct f10 build and its
   review) so the archive below is exact.

## Megan's ruling (11 Oct, 11:29 and 11:35)
The "jug form first, then tidy it: move the minuses across" is HOW SHE WILL TEACH IT IN
2027 after a proper discovery lesson. This year's class was crammed and never did
discovery, so a form she showed once would confuse them. This year the round keeps the
TAUGHT shape only: **the total alone on the left, the payments on the right.** For a
saving: `A = deposits with their cars − withdrawals with their cars`. For a loan:
`P = repayments with their cars` (repayments positive on the right, as taught). Never the
`… − … = 0` form, never the word "tidy", never "move the minuses across".

## Step 1: archive, do not nuke
- Write `briefs/finance-2/ARCHIVE-f10-jug-form-2027.md`: the exact learner wording of the
  three jug-form cards (`jugCorrect`, `jugWrong`, `tidy`), their gens as they stand in
  commit `cf85183` (paste the code, fenced), the concept card's jug-form paragraph, the
  "tidy it" step, the saving refrain, and one line on why it is parked (her ruling above).
  Head it "f10 jug form: built 10 Oct 2026, archived 11 Oct 2026 for the 2027 build".
- Add ONE pointer line at the top of
  `C:\Users\megzi\Desktop\Tutoring Resources\Graad 11 Curro\Gr11 Finance Explainers\GR11-FINANCE-REDESIGN.md`
  (after its title line; do not read or change the rest):
  `> f10 jug form: built 10 Oct 2026, archived for the 2027 build, see maths-homework-quest/briefs/finance-2/ARCHIVE-f10-jug-form-2027.md`
- Git history keeps the code; the md keeps the design readable without digging.

## Step 2: the round this year (8 cards, dealing order below)
Keep what already works: `withdrawal` (card 4), `inOrOutWord` (card 5, recall),
`interestPaid` (card 6), `tidyLoan` (card 7, price = loan + down payment: keep the card,
rename its id to `hirePurchasePrice` and purge any "tidy" wording from its text),
`signOnTimeline` (card 8). Check each of those five for jug-form equations or the words
"tidy" / "move the minuses" / "= 0" form and bring them to the taught form.
Replace `jugCorrect`, `jugWrong`, `tidy` with:
1. **`inOrOutSaving`** (card 1): a saving with 2 or 3 amounts (deposits, one withdrawal
   in about half the rolls, a same-day deposit on A's day allowed per review 1). Timeline
   drawn (`out: true` on the withdrawal). A steps chain, ONE mc step per amount:
   "R3 000 at T2: in or out?" with the two options **+ (in)** and **− (out)**. Each step's
   prompt shows the taught form so far with the next slot as `☐`
   (`A = 5 000(…)^… + 3 000(…)^… ☐ 4 000(…)^…`); the last step's feedback shows the
   finished equation. A alone on the left always.
2. **`inOrOutLoan`** (card 2): a loan, 2 repayments (hire purchase with a down payment in
   some rolls). One mc step per repayment: "R6 000 at T1: where does it go?" with three
   options **+ on the right**, **− on the right**, **alone on the left**; correct = + on
   the right. P alone on the left in the form shown. Feedback for "alone on the left": "that
   is a coin: only the total stands alone".
3. **`equationYesNo`** (card 3): "Is this equation correct?" yes/no, taught form only,
   saving and loan alternating across rolls. The wrong case is exactly ONE slip: a sign
   flipped on a withdrawal, or a payment written on the total's side. Feedback names the
   slip in words.
Dealing order: inOrOutSaving, inOrOutLoan, equationYesNo, withdrawal, inOrOutWord,
interestPaid, hirePurchasePrice, signOnTimeline.
Rules that survive from review 1 and the 10 Oct rulings: the "=" never stands alone at a
line start; every term is one unbreakable `nw(...)` unit; money and "p.a." carry literal
U+00A0; the total is `?` / its role letter on the timeline, never a bare money label; a
payment may share the total's day (stacked labels); the closing line is kind-specific
(saving: deposits +, withdrawals −, A on the left; loan: repayments + on the right, P on
the left). Exponents through `pow(...)`, worked out (`^36`), as f13 writes them.
Input law: never type words; mc, yes/no, calc only.

## Step 3: the concept card
Rewrite f10's concept card to the taught form: deposits and the loan go IN (+ on the
right for a saving's deposits; the loan is the total, alone on the left), withdrawals come
OUT (−), repayments go + on the right, the total stands alone on the left. Two worked
examples (one saving with a withdrawal, one loan). No jug-form equation, no "tidy". No
picture for now (worker 4 is drawing the jug; a later pass may add it as a reminder).
Keep the card's U+00A0 and `.nowrap` habits.

## Step 4: checks
- `js/quests/_finance-check.js`: replace the f10 jug-form checks with checks for the new
  cards: every roll of `inOrOutSaving` / `inOrOutLoan` recomputes the finished equation
  from the scene (amounts, days, rates, cars) and asserts each step's correct option;
  `equationYesNo`: the "yes" equation recomputes true, the "no" equation differs by exactly
  one slip; no learner text of f10 contains "tidy", "= 0", "lump sum", "lumpsum", "jug
  form". Keep `F10_TERM` and the strip helper worker 2 added (`unsup`).
- `verify-finance.html`: update the f10 section and the f10 skill ids; report the new
  total count (586 before; say what it is after and why it moved).

## Verify (all green before you report)
Start the local server as CLAUDE.md says, then:
1. `node verify-lazy-load.mjs` green.
2. `python tools/harness_run.py verify-finance verify-dice-finance verify-steps-ux verify-wrap`
   green, no page errors; `verify-exam.html` headless → read its result line (673/673).
3. Your own phone look (your context only, no screenshots pasted back): 390 and 360 px,
   `http://localhost:5191/?local=1`, demo learner from `tools/lazy_playthrough.py`, play f10
   through all 8 cards (`tools/shoot_round.py f10` walks it for you at 375 px; it handles
   steps chains of mc). Nothing clipped, no term split, the ☐ slot visible, the finished
   equation readable at 360 px.
4. `grep -n -i -E "tidy|lump ?sum|= 0\b|jug form" js/quests/questf10-in-or-out.js js/concepts.js`
   → only comments (or nothing).

## Do not touch
`sw.js`, other rounds, `js/ui.js`, round ids/order in config.js (f10's title stays "In or
out?"; refresh its blurb to the taught form: "Deposits go in, withdrawals and repayments
come out; the total stands alone on the left."), PROJECT-STATUS.md, STATUS-ARCHIVE.md,
`sessions/`, GR11-FINANCE-REDESIGN.md beyond the one pointer line.

## Commit
One local commit: `Finance f10: taught form only this year (jug form archived for 2027)`
with a short body, ending `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`.
Never push.

## Report back (what the foreman reads first)
- `git show --stat HEAD`; the archive file path and the pointer line as written.
- The harness lines and the new verify-finance count with the reason it moved.
- The dealing order as built, with one example roll of each of the three new cards
  (prompt + options + the finished equation, plain text).
- Anything in this brief that did not match the code as you found it, and what you did.
