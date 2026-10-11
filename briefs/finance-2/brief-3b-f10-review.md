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

# Fix worker brief: f10 review (after the taught-form rebuild, commit 73c89c2)

You are ONE fresh fix worker doing ONE unit: the cosmetic defects the phone checker found
in round f10 "In or out?". Repo `C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest`
(GitHub Pages app "Blipwork", Grade 11 maths, English, PUBLIC repo). Work on the current
branch, commit locally when done, never push. Targeted fixes only.

## Read first (and nothing heavier)
1. `CLAUDE.md`: "Technical map", "How code loads", "Gotchas", "Working rules". Do NOT read
   STATUS-ARCHIVE.md, PROJECT-STATUS.md, `sessions/`, transcripts or Tutoring Resources.
2. `js/quests/questf10-in-or-out.js` whole, the f10 concept card in `js/concepts.js`
   (`inOrOut`), the f10 block of `js/quests/_finance-check.js` and the f10 section of
   `verify-finance.html` only where an item below touches them. The checker's list is
   `tools/_out/checks/check-f10-1352.md` with shots in `tools/_out/rounds/` (read the md;
   open a PNG only if an item is unclear).

## The items
- F1 **"9% p." / "a." split** (card 2 prompt at 360 px): the story lines write the rate as
  loose tokens, so the app's prose wrapper makes "9%", "p." and "a." three nowrap pieces.
  Write every "N% p.a." in f10 as ONE unit (f11 has `paU = r => nw(pa(r))`; do the same in
  f10's story builder and anywhere else the rate is printed in prose).
- F2 **Orphan ✓** (cards 1 and 2): when a step's equation fills the line, the green ✓
  lands alone on the next line. Find where the steps renderer appends the tick
  (`js/questions.js`, the settle path) and make it ride with the last inline piece of the
  step prompt (e.g. the tick inside the prompt's last nowrap span, or a `::after` on an
  inline element), so it can never stand alone. A change in `js/questions.js` is allowed
  ONLY as a pure rendering tweak that every chapter's steps share; prove it with
  `verify-steps-ux` and `verify-wrap` green and one look at a t2 or gtrig steps card.
  If that is not possible without touching marking or layout elsewhere, fix it for f10
  alone and say so.
- F3 **Card 5 hint** (`inOrOutWord`): the hint is the generic sign hint, says nothing
  about a down payment, and "plus for money in and for a repayment" reads oddly. New
  hint, one sentence each: deposits and repayments stand plus on the right; a withdrawal
  minus; the total stands alone on the left; a down payment never enters the account, so
  it goes nowhere.
- F4 **Same-day deposit has no car** (card 1): the prompt says "Every amount drives there
  in its car", but a deposit on the meeting day (R15 000 at T5 when A sits at T5) has no
  car and its step shows "☐ 15 000" bare. Add f9's words to the prompt when a same-day
  amount exists: "An amount already on the meeting day needs no car." and let that step's
  hint say so too.
- F5 **Concept card** (`inOrOut`): the loan example runs its prose straight into the
  equation at 390 px while the saving example puts its equation on its own line. Give
  both examples the same shape (prose line, then the equation on its own line).
- NOT yours: the line that ends on "=" before the right side (card 3) is the intended
  rule ("=" glues to the term before it); the chat bubble over the "Got it" button is
  app-wide and pre-existing.

## Verify (all green before you report)
Server on port 5191 (usually already answering; do not start a second), then
`python -X utf8 tools/harness_run.py verify-finance verify-steps-ux verify-wrap` green with
counts, `verify-exam.html` headless → result line, `node verify-lazy-load.mjs` green. Your
own phone look (your context only) at 390 and 360 px of f10 cards 1, 2, 3 and 5 and the
concept card (`tools/shoot_round.py f10` walks the round), plus one steps card from another
chapter if you touched `js/questions.js`.

## Do not touch
`sw.js`, round ids/order, other finance rounds' text, `js/ui.js`, PROJECT-STATUS.md,
STATUS-ARCHIVE.md, `sessions/`.

## Commit
One local commit: `Finance f10 review 2: p.a. unbreakable, tick rides the line, card 5
hint, same-day "no car", concept examples aligned` with a short body, ending
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Never push.

## Report back
`git show --stat HEAD`; the harness lines with counts; one line per item saying what you
changed; whether F2 touched `js/questions.js` and the proof it is safe; anything that did
not match.
