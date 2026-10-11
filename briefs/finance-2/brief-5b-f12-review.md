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

# Fix worker brief: f12 review (after the Build-the-timeline build, commit 2d55459)

You are ONE fresh fix worker doing ONE unit: the cosmetic defects the phone checker found
in round f12 "Build the timeline". Repo
`C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (English, PUBLIC repo).
Work on the current branch, commit locally when done, never push. Targeted fixes only.

## Read first (and nothing heavier)
`CLAUDE.md` ("Technical map", "How code loads", "Gotchas", "Working rules");
`js/quests/questf12-build-timeline.js` whole; `js/engine/timeline-graph.js` only the
parts an item names (stack leaders, frame height); the f12 block of
`js/quests/_finance-check.js` and the f12 section of `verify-finance.html` where an item
touches them; the checker's list `tools/_out/checks/check-f12-1525.md` (shots in
`tools/_out/rounds/`; open a PNG only if an item is unclear). Do NOT read status files,
`sessions/`, transcripts or Tutoring Resources.

## The items
- H1 **Stacked label without its leader** (card 8, David's last deposit on A's day): the
  stacked amount has no dotted leader and sits right under the flag-pole tip, while card
  1's Mvelo case (same shape: a deposit on the day of A) gets a bent leader into the ring
  and clear air under the pole. Find why the engine's `stackLeaders` path skips David's
  case (the axis end? the label width? the T count?) and make both cases draw the same
  way. If the fix is in the engine, it must be a bug fix of the existing rule (f10's
  review-1 rule: a leader from each amount stacked above another on one node, down beside
  the stack and in to its own tick; the pole stops POLE_AIR above that amount), proven by
  verify-finance's graph checks for f8–f13 staying green.
- H2 **Blank headroom above flagless pictures** (step 2's bare axis, step 4's jug):
  about 80–100 px of empty space above the axis because the frame reserves the flag's
  height. If the spec's `h` (or an engine flag the spec can set) lets a flagless picture
  shrink its top without touching any other round, do it; otherwise leave it and say so.
- H3 **A decoy chip in the rates pad gets only the generic hint**: tapping "15% p.a."
  when the words give 7% and 13% clears the frame and shows the step's hint without
  naming the slip. Make the step's hint name the rates the words give ("The words give
  7% and 13%; a chip with any other rate is not in this story. First road = the first
  rate in the words.") so a learner can see which chip was the stranger. No change to
  `js/tokenpad.js`.
- H4 **Card length** (about 3 100 px at 360 px for a three-coin card, nearly four
  screens; every step keeps its own picture, faded): HER CALL, default leave. Do not
  change it in this round; the foreman will raise it with her. If she has already ruled
  (the foreman will say so in the dispatch message), collapse each answered step's
  picture to a one-line strip once the next step opens, keeping the latest picture
  full-size.
- NOT yours: the floating concept / calculator button over the option column in full-page
  shots (app-wide, pinned).

## Verify (all green before you report)
Server on port 5191 (usually already answering), `python -X utf8 tools/harness_run.py
verify-finance verify-dice-finance verify-steps-ux verify-wrap` green with counts,
`verify-exam.html` headless → result line, `node verify-lazy-load.mjs` green. Your own
phone look (your context only) at 390 and 360 px: card 8 and a Mvelo roll of card 1
(`tools/shoot_round.py f12` walks the round; roll until Mvelo's three-deposit case shows
or drive the gen directly), one f8, f9, f10 and f13 timeline each if you touched the engine.

## Do not touch
`sw.js`, round ids/order, other rounds' text, `js/ui.js`, `js/tokenpad.js`,
PROJECT-STATUS.md, STATUS-ARCHIVE.md, `sessions/`.

## Commit
One local commit: `Finance f12 review 1: stacked leader on the day of A, flagless
headroom, the rates hint names the words` with a short body, ending
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Never push.

## Report back
`git show --stat HEAD`; the harness lines with counts; one line per item saying what you
changed (and whether H1 touched the engine, with the proof); anything that did not match.
