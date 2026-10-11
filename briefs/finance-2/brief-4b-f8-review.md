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

# Fix worker brief: f8 review (after the jug rebuild, commit ff3e5e1)

You are ONE fresh fix worker doing ONE unit: the cosmetic defects the phone checker found
in round f8 "Which one is the total?" (the jug round). Repo
`C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (English, PUBLIC repo).
Work on the current branch, commit locally when done, never push. Targeted fixes only.

## Read first (and nothing heavier)
`CLAUDE.md` ("Technical map", "How code loads", "Gotchas", "Working rules");
`js/quests/questf8-which-total.js` whole; the f8 concept card in `js/concepts.js` and
its CSS block in `css/styles.css` (the jug / coin rules worker 4 added); the f8 block of
`js/quests/_finance-check.js` and the f8 section of `verify-finance.html` only where an
item touches them; the checker's list `tools/_out/checks/check-f8-1448.md` (shots in
`tools/_out/rounds/`; open a PNG only if an item is unclear). Do NOT read status files,
`sessions/`, transcripts or Tutoring Resources.

## The items
- G1 **Coin digits touch the rim** (concept card, both widths): the amounts fill the whole
  coin. Megan's plan allowed "no number at all on the concept card"; do that (plain coins
  on the concept card, numbers only where a card's story needs them), or if the numbers
  help the picture, shrink them so there is clear air inside the rim at 360 px. Keep the
  mock-up's look otherwise.
- G2 **The step-3 timeline is tiny** (ring ~11 px, letter ~7 px): the picture after "T0 or
  the end?" is drawn in the step's own host, narrower than a question-level graph. Draw it
  at the card's full width like the question-level timelines in f9–f13 (the engine's
  normal ring and letter size), without changing the engine.
- G3 **Hire-purchase paragraph**: the first sentence carries the price and the down
  payment together ("Bradley buys a lounge suite for R29 000 and pays a down payment of
  R5 500 straight to the shop"), labelled "a coin: down payment"; a learner can read the
  R29 000 as the total. Split it: "Bradley buys a lounge suite for R29 000." (kind label
  "the price: not the jug" with a miss sentence "the price is not the loan; the jug is the
  rest he borrows") and "He pays a down payment of R5 500 straight to the shop." (a coin:
  down payment). Update the checks so every hire-purchase roll has exactly one jug chip
  and the price chip is never the jug.
- G4 **Kind-label chip indent** on a wrapped line: a few px off its sentence text. Align
  it if it is a one-line CSS fix; otherwise leave it and say so.
- NOT yours: the concept card's arrows drawing in over a few seconds (intended), the
  long concept card on card 1 (design: the idea first), the floating calculator button
  over buttons in full-page shots (app-wide, pinned), the "T in years" caption colour
  (engine default).

## Verify (all green before you report)
Server on port 5191 (usually already answering), `python -X utf8 tools/harness_run.py
verify-finance verify-dice-finance verify-steps-ux verify-wrap` green with counts,
`verify-exam.html` headless → result line, `node verify-lazy-load.mjs` green. Your own
phone look (your context only) at 390 and 360 px: the concept card, card 1's step-3
picture, the hire-purchase card (`tools/shoot_round.py f8` walks the round; it may take
a few runs to roll hire purchase on card 6, or drive the round's gen directly).

## Do not touch
`sw.js`, round ids/order, other rounds, `js/ui.js`, the engine, her PNG, PROJECT-STATUS.md,
STATUS-ARCHIVE.md, `sessions/`.

## Commit
One local commit: `Finance f8 review 1: plain coins on the concept card, full-width step
timeline, the price is not the jug` with a short body, ending
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Never push.

## Report back
`git show --stat HEAD`; the harness lines with counts; one line per item saying what you
changed; anything that did not match.
