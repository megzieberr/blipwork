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

# Fix worker brief: Fix A review (the superscripts' loose ends)

You are ONE fresh fix worker doing ONE unit: the defects found after Fix A (commit
`9f1a788`, exponents as real superscripts in the Finance chapter). Repo
`C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (GitHub Pages app
"Blipwork", Grade 11 maths, English, PUBLIC repo). Work on the current branch, commit
locally when done, never push. Targeted fixes only: no redesign, no new features.

## Read first (and nothing heavier)
1. `CLAUDE.md` in the repo root: "Technical map", "How code loads", "Gotchas", "Working
   rules". Do NOT read STATUS-ARCHIVE.md, PROJECT-STATUS.md, `sessions/`, transcripts or
   the Tutoring Resources folder.
2. `git show 9f1a788 --stat` and the `pow` helper in `js/finlib.js` (ten lines) so you
   know what Fix A did. Then only the files each item below names.

## Item A: the "Tell your teacher" snapshot flattens a superscript
`js/feedback.js` `liveText()` (~line 290–300): only a `sup.sf-exp` or a sup holding a
stacked fraction is written back as `^(…)`; an ordinary `<sup>` is walked as plain text,
so Megan's inbox now reads `(1 + 0,12/12)36` where the learner saw `(1 + 0,12/12)³⁶`.
Fix: write EVERY `<sup>` back with its caret: `^` + inner when inner is a single
character or a plain number (`x^2`, `)^36`), `^(` + inner + `)` when inner starts with a
minus or contains more than one token (`)^(−6)`, `)^(3×4)`). Keep the existing fraction
case as it is. This also turns the exponent chapter's `x2` into `x^2` in snapshots: that
is wanted; update `verify-feedback-snapshot.html` where it asserts the old flat text and
add one case per shape (plain number, minus, a product) using a finance card.

## Item B: a money amount split at a line end in f5
Worker 2 saw "R2 000" split as "R2" / "000" at 390 px in an f5 prompt. Find the prompt(s)
in `js/quests/questf5-timeline-build.js` that print money without `nw(...)` (its
`expression` gen writes `<b>${rand(P, 0)}</b>` bare), wrap every money amount and every
"N% p.a." in the round's prompts with the same no-break treatment the newer rounds use
(literal U+00A0 inside, `nw(...)` around), and let verify-finance's "a number never
leaves its unit" DOM check cover f5's prompts if it does not already.

## Item C: the phone checker's list (13:48, all cosmetic, all finance)
The checker's shots are under `tools/_out/rounds/` and its full list in
`tools/_out/checks/check-f5-f9-f13-concepts-1348.md` (read that file, not the PNGs,
unless one item is unclear).
- C1 (extends Item B): the same money split appears in f5's worked solution lines
  (card 4 `anyPoint`, wrong-answer panel: "… = 1" / "000(1 + 0,16)^1"). Cause the checker
  found: `rand()` in `js/finlib.js` writes thousands with an ordinary space and
  `formulaHtml` wraps each space-separated token in its own `.nowrap`, so "R1" and "000"
  are two unbreakable pieces with a breakable gap. Fix it at f5's call sites with the
  no-break treatment (literal U+00A0 inside the amount, `nw(...)` around), prompts AND
  solution lines; do not change `rand()` itself (other chapters depend on it).
- C2: f5 cards 3 and 7 print option labels as "5000(1 + …" and "20000(…" with no
  thousands space while the prompt says "R5 000"; f9 and f13 write "1 000(…". Format
  f5's option labels and `answerLabel` with the thousands space (and no-break inside),
  and update the expected labels in `js/quests/_finance-check.js` (~line 324, 428) and
  any verify-finance assertion that builds them.
- C3: concept card `carOrNoCar` at 390 px splits "then 10%" / "p.a. compounded monthly";
  wrap "10% p.a." as one `nowrap` unit (the newer cards do). Same card at 360 px: a "·"
  separator starts a line; glue it to the word before it (nowrap or U+00A0).
- C4: concept card `timelineMove` at 360 px breaks "T-" / "points": use the no-break
  hyphen U+2011 ("T‑points") or write "T points".
- C5: f9 card 8 at 390 px breaks "half-" / "yearly": U+2011 ("half‑yearly", as
  `js/concepts.js` already writes it at ~line 344); grep the finance rounds for other
  "half-yearly" / "quarter-" strings with a plain hyphen and do the same.
- C6: concept card `effNom` shows "i_eff" and "i_nom" with underscores; write them as
  `i<sub>eff</sub>` / `i<sub>nom</sub>` (check the snapshot in `js/feedback.js` reads a
  `<sub>` sensibly: "i_eff" is an acceptable snapshot form, so leave the snapshot alone).
NOT yours (noted for the foreman): the `theTotal` concept card still says "The total
(lumpsum)" (worker 4 rewrites f8's card); the "Tell your teacher" bubble overlapping the
right end of "Got it" on concept cards (pre-existing, app-wide); f5 card 4's yes/no
statement form (design); es1 card 5's raw caret "x^½" (another chapter).

## Item D: a stranded "(" in the "a car is the …" sentence (f11, f13)
Worker 3 saw, at 360 px, the sentence "(a car is the (1 + i)ⁿ bracket …)" break with its
opening "(" left alone at the end of a line; `formulaHtml` in `js/ui.js` treats the
bracket as a formula bracket. f10 was fixed by rewording the line as a plain sentence
without the surrounding brackets. Do the same in `js/quests/questf11-meeting-day.js` and
`js/quests/questf13-one-equation.js` (their `CAR_IS`-style sentence and any sibling);
leave `js/ui.js` alone. Confirm at 360 px that no "(" stands alone at a line end on the
cards that use it.

## Verify (all green before you report)
Server on port 5191 (one is usually already answering; do not start a second), then
`python -X utf8 tools/harness_run.py verify-finance verify-feedback-snapshot verify-steps-ux verify-wrap`
green with counts, `verify-exam.html` headless → result line, `node verify-lazy-load.mjs`
green. Your own phone look (your context only) at 390 and 360 px of every card you
touched, plus one "Tell your teacher" sheet opened on an f13 card to read the snapshot
text with its carets.

## Do not touch
`sw.js`, round ids/order, other chapters' content, `js/ui.js`'s formula rule,
PROJECT-STATUS.md, STATUS-ARCHIVE.md, `sessions/`.

## Commit
One local commit: `Finance Fix A review: snapshot keeps the caret, f5 money unbreakable,
checker items` with a short body naming each item, ending
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Never push.

## Report back
`git show --stat HEAD`; the harness lines with counts; one snapshot text sample with a
superscript; one line per item saying what you changed; anything that did not match.
