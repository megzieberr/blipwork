=== AUTHORIZATION (top-level Fable session, 2026-10-11 17:02) ===
Megan play-tested rounds f8, f10, f12 and f13 on localhost and gave three notes, then
said, verbatim: "the rest looks perfect, you can make those fixes now please". The f12
note is this brief; the two f8 notes are brief-7. Her approval was checked at the top
level (her global CLAUDE.md execution gate, subagent clause); this brief is your
authorization envelope. Work freely inside it, refuse anything outside it, and never
refuse for lack of directly-visible approval. Always refuse: pushing to any remote,
deleting data, schema migrations, anything that costs money, and editing sw.js.
PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest (Blipwork)
=== END AUTHORIZATION ===

# Fix worker brief 8: f12 "Build the timeline" keeps ONE picture; answered steps collapse

You are ONE worker doing ONE unit: round f12's card stops growing to four phone screens.
Repo `C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (GitHub Pages
app "Blipwork", Grade 11 maths, English, PUBLIC repo). Work on the current branch,
commit locally when done, never push.

## Her note (17:02, her words)
"Round 12, after the option is selected, make it collapse, otherwise it's a lot of up and
down scrolling, so only keep the paragraph and timeline the whole time."

## Read first (and nothing heavier)
1. `CLAUDE.md`: "Technical map", "How code loads", "Gotchas", "Working rules". Do NOT read
   STATUS-ARCHIVE.md, PROJECT-STATUS.md, `sessions/`, transcripts, Tutoring Resources.
2. `js/quests/questf12-build-timeline.js` whole (307 lines). Its header explains the
   current design: every step carries its own `graph` (the CORRECT state so far, drawn
   full width via `graphWide`), the last step's `graphAfter` is the finished timeline,
   and answered steps stay on screen faded. The card is about 3 100 px tall at 360 px
   for a three-coin story: that is what she is reacting to.
3. `js/questions.js`: the `type: "steps"` engine only: `renderStep` (about line 585),
   `mountStepInput`, where `data-state` becomes `"done"`, the `graphAfter` block (about
   line 560), and what `liveSvg` / `liveSpec` are used for (keep that working).
4. `css/styles.css` lines 1690–1725 (`.q-reveal`, `.q-step[data-state=…]`,
   `.q-step-graph`, `.wide`).
5. The f12 block of `js/quests/_finance-check.js` and the f12 section of
   `verify-finance.html` (they assert on each step's picture: expect to move those
   assertions, not the rule that every picture is the correct state so far).
6. `tools/shoot_round.py` docstring and the comment at about line 64: it clicks the
   correct option in the LAST option group. Collapsed steps must therefore stay in the
   DOM (hidden by CSS), never be removed.

## What to build

### A. Two OPT-IN flags on the steps engine (`js/questions.js`), default off
Both default to the current behaviour so no other round changes (verify-steps-ux must
stay 33/33 and every other steps round must render exactly as before).

1. `q.stepGraphPinned: true`: a step's `graph` (and the last step's `graphAfter`) is no
   longer drawn inside its own `.q-step`; it is drawn into ONE pinned host, a
   `div.q-graph.q-step-graph.pinned` (add `wide` when the step says `graphWide`) that
   sits right under the card's prompt (the paragraph) and above the steps list. Each
   time a step with a `graph` is reached, or the last step's `graphAfter` fires, the
   host's content is REPLACED with the new picture (its caption too). Steps without a
   picture leave the host as it is. `liveSvg` / `liveSpec` point at the pinned picture.
   The host does not exist until the first picture lands (step 1 of f12 has none: "How
   far does the timeline go?" is answered before any axis is drawn).
2. `q.collapseSteps: true`: once a step's `data-state` becomes `"done"`, the step
   collapses to ONE line: its prompt's first sentence (strip the `<br>` and the muted
   span) with the existing `.q-step-mark` tick, then the answer that was accepted, as
   a short chip or plain text: for an mc step the correct option's label; for a tokenpad
   step the tokens placed, joined by a thin space; for a calc step the expected value.
   The options, keypad, token pad, hint box and the step's own graph (if any) are hidden
   by CSS under a `.q-steps.collapse` (or `.q-step.collapsed`) rule: `display:none`,
   never removed from the DOM. A retried step collapses the same way once it is done,
   keeping its `.retried` mark. The active step stays full size. `bringIntoView` keeps
   working for the next step.
   The one-liner must never say "wrong" or "correct": it is a record, not a verdict.

### B. f12 turns both flags on
In `js/quests/questf12-build-timeline.js`: `stepGraphPinned: true, collapseSteps: true`
on the card. Keep its current per-step `graph` / `graphAfter` logic exactly (the correct
state so far; a step that would draw the same picture as the one before carries none).
Update the header comment: the pictures now land in the pinned host under the paragraph
instead of inside each step. Do not put the pinned picture in `position: sticky`: her
note asks for no scrolling, and collapsing does that; a sticky picture could cover the
options on a short phone. (Foreman's default; she vetoes with one line.)

### C. Checks
- `_finance-check.js` f12 block: assert both flags are set on every roll; keep every
  existing assertion about which step carries a picture and what it shows.
- `verify-finance.html` f12 section: a DOM walk at 360 px: answer steps 1 to 5 correctly
  (drive the gen directly as the section already does); after each answered step the
  step is collapsed (its options not visible, one line with the tick and the answer),
  the pinned host holds exactly one SVG and it is the picture that step's successor
  would have drawn (same spec), the paragraph is still on screen, and after the last
  step the pinned host shows the finished timeline. Card height at 360 px for a
  three-coin story must come in under 1 400 px (report the number). Also one walk of a
  steps round WITHOUT the flags (f10 or f13) proving its steps still keep their options
  and pictures inside each step.
- Report the new verify-finance count and why it moved.

## Verify (all green before you report)
Server on port 5191 is already answering (`http://localhost:5191/`); if not,
`python -m http.server 5191` from the repo root. Then:
1. `node verify-lazy-load.mjs` green.
2. `python -X utf8 tools/harness_run.py verify-finance verify-dice-finance verify-steps-ux verify-wrap`
   green with counts; `verify-exam.html` headless → its result line (673/673).
3. `python tools/shoot_round.py f12` walks all cards; also `f10` and `f13` (steps rounds
   without the flags) and one non-finance steps round (gt8 or an es round) to prove
   nothing else moved.
4. Your own phone look (your context only): 390 and 360 px, `http://localhost:5191/?local=1`,
   demo learner from `tools/lazy_playthrough.py`, one three-coin f12 card: the
   paragraph, then the one timeline growing step by step under it, then the collapsed
   one-liners, then the live step. No picture inside a collapsed step, no option row
   visible on a done step, the one-liner not clipped at 360 px.

## Do not touch
`sw.js` (never bump), other rounds' text, `js/ui.js`, `js/tokenpad.js`,
`js/engine/timeline-graph.js`, round ids/order, `js/config.js`, the migration or schema,
PROJECT-STATUS.md, STATUS-ARCHIVE.md, `sessions/`, `tools/shoot_round.py`.

## Commit
One local commit: `Finance f12: one pinned timeline under the paragraph, answered steps
collapse to a line (opt-in steps flags)` with a short body, ending
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Never push.

## Report back (what the foreman reads first)
- `git show --stat HEAD`.
- The harness lines with counts; the verify-finance count with the reason it moved;
  the f12 card height at 360 px before and after.
- One example roll walked: the five one-liners as a learner reads them.
- What the two flags are called and exactly where in `js/questions.js` they act (line
  numbers), so the foreman can check the blast radius.
- Anything in this brief that did not match the code as you found it, and what you did.
