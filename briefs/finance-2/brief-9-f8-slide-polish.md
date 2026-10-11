=== AUTHORIZATION (top-level Fable session, 2026-10-11 18:12) ===
Megan reviewed the f8 discovery slide (local commit 40e6d97) through its phone checker's
report and said, verbatim: "do the two f8 fixes and 2b first, then ship it and wrap up
please". The two f8 fixes are this brief. Her approval was checked at the top level (her
global CLAUDE.md execution gate, subagent clause); this brief is your authorization
envelope. Work freely inside it, refuse anything outside it, and never refuse for lack of
directly-visible approval. Always refuse: pushing to any remote, deleting data, schema
migrations, anything that costs money, and editing sw.js.
PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest (Blipwork)
=== END AUTHORIZATION ===

# Fix worker brief 9: f8 discovery slide, two polish items

You are ONE fresh fix worker doing ONE unit: two small changes to card 1's discovery
slide in round f8 "Which one is the total?". Repo
`C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (English, PUBLIC
repo). Work on the current branch, commit locally when done, never push. Targeted fixes
only.

## Read first (and nothing heavier)
`CLAUDE.md` ("Technical map", "How code loads", "Gotchas", "Working rules");
`git show 40e6d97 --stat` and then the parts it touched that these items name: the
`jugDiscover` stage in `js/concepts.js`, the `.jug-discover` rules and keyframes in
`css/styles.css` (near lines 336–400), the reveal listener in
`js/quests/questf8-which-total.js` (the one that makes a tap on the jug click Next), and
the f8 card-1 DOM check in `verify-finance.html`. The checker's shots are under
`tools/_out/rounds/` (`360-tap-f3-160.png` shows item 1; `360-f8-0-r.png` shows item 2);
its list is `tools/_out/checks/check-f8-1715.md`. Do NOT read status files, `sessions/`,
transcripts or Tutoring Resources.

## Item 1: the loan jug drains to EMPTY
Frame 3 (the loan) ends with a purple sliver at the bottom (the level stops at about 9%).
A learner reads it as "the loan is not paid off yet". End the drain at the same level the
empty jug of frame 1 shows (1.8%, the `.jug-lvl` default), so after the last coin the jug
reads empty. Keep the coin-by-coin steps as they are; only the final level changes (and
the reduced-motion end level with it). Update any verify-finance assertion on the loan
jug's end level.

## Item 2: once the drain is done, the slide becomes a reminder
Frame 3 stays on screen for the whole card (that is the engine's replace mode, keep it),
so its caption "A loan: the bank hands you the full jug at the START…" sits above a
paragraph that, on card 1, is always a SAVINGS story: two stories on one screen. Fix:
when the loan drain animation has finished (listen for `animationend` on the loan
`.jug-lvl`, with a timer fallback of about 6 s for reduced motion or a missed event),
replace frame 3's caption with the neutral reminder line, in the same caption element,
with a short fade (opacity, about 300 ms):
> Payments are coins. The total is the jug.
The jug picture itself stays as it ended (empty, BANK label and arrow may stay). The
chips and everything below are untouched. Put this in the same place as the existing jug
listener in questf8 (delegated, registered once per round load), not in the engine. The
swap must not fire on frames 1 or 2 and must not break the jug-tap-advances-frames
behaviour.

## Checks
`verify-finance.html` f8 card-1 section: after reaching frame 3, dispatch `animationend`
on the loan level (or wait out the fallback) and assert the caption now reads the
reminder line and no longer contains "bank" or "START"; assert the end level of the loan
jug equals the empty level. Report the new verify-finance count and why it moved.

## Verify (all green before you report)
Server on port 5191 is already answering. `node verify-lazy-load.mjs`;
`python -X utf8 tools/harness_run.py verify-finance verify-dice-finance verify-steps-ux verify-wrap`
green with counts; `verify-exam.html` headless → result line (673/673);
`python tools/shoot_round.py f8` walks its cards. Your own phone look (your context
only) at 390 and 360 px of card 1: tap the jug twice, watch the drain end empty, see the
caption fade to the reminder line, then answer the chips; the answered side shows the
reminder line, not the loan caption.

## Do not touch
`sw.js`, `js/questions.js`, `js/ui.js`, other rounds, cards 2 to 8 of f8, the frame-1
and frame-2 text (the "(the lumpsum)" lines are intentional), her PNG and the WebP masks,
round ids/order, PROJECT-STATUS.md, STATUS-ARCHIVE.md, `sessions/`, `tools/shoot_round.py`.

## Commit
One local commit: `Finance f8 slide polish: the loan jug drains empty; the caption
becomes the reminder once the drain is done` with a short body, ending
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Never push.

## Report back
`git show --stat HEAD`; the harness lines with counts and the verify-finance count with
the reason it moved; one line per item saying what you changed and where; anything that
did not match.
