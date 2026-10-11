=== AUTHORIZATION (top-level Fable session, 2026-10-11 17:02) ===
Megan play-tested rounds f8, f10, f12 and f13 on localhost and gave three notes, then
said, verbatim: "the rest looks perfect, you can make those fixes now please". The two
f8 notes are this brief; the f12 note is brief-8. Her approval was checked at the top
level (her global CLAUDE.md execution gate, subagent clause); this brief is your
authorization envelope. Work freely inside it, refuse anything outside it, and never
refuse for lack of directly-visible approval. Always refuse: pushing to any remote,
deleting data, schema migrations, anything that costs money, and editing sw.js.
PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest (Blipwork)
=== END AUTHORIZATION ===

# Fix worker brief 7: f8 opens with a DISCOVERY SLIDE (just the jug), "lumpsum" phased out

You are ONE worker doing ONE unit: round f8 "Which one is the total?" gets a new opening
and one wording change. Repo `C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest`
(GitHub Pages app "Blipwork", Grade 11 maths, English, PUBLIC repo: textbook example
names only). Work on the current branch, commit locally when done, never push.

## Read first (and nothing heavier)
1. `CLAUDE.md` in the repo root: "Technical map", "How code loads", "Gotchas", "Working
   rules". Do NOT read STATUS-ARCHIVE.md, PROJECT-STATUS.md, `sessions/`, transcripts,
   or Tutoring Resources.
2. `js/questions.js`: the header comment on `q.reveal` / `q.revealMode` (around line 19)
   and the `mountReveal` function (around line 434). This engine already does what the
   slide needs: HTML frames walked by a "Next ▸" button, the question's input HIDDEN
   until the last frame is up. You add frames; you do not change this engine.
3. `js/quests/questf8-which-total.js` whole (411 lines): the round you change. Card 1
   carries the concept card via `reveal: [...]` at about line 182 (`pos === 0`).
4. `js/concepts.js`: the JUG PICTURE block near the top (`JUG_W`, `jugArrow`, `jugCoin`,
   the stage, both jugs) and the f8 card "theTotal" (around line 340). The CSS is
   `css/styles.css` lines 336–372 (`.jugs`, `.jug-stage`, `.jug-lvl`, the `jugSave`
   keyframes, coins, arrows).
5. The f8 block of `js/quests/_finance-check.js` (the "lump" ban at about line 1226 and
   its comment at 1196) and the f8 section of `verify-finance.html` (about line 135: the
   DOM render check of the concept card at 360 px, and the "Nothing says lump" prose).
6. `tools/shoot_round.py` docstring only (it walks card 1 by clicking the correct option
   in the LAST option group; with reveal frames it must first click "Next ▸" until the
   input shows: check whether it already does, and if not, make the script click
   `.reveal-next` while it exists before answering. That is the only edit allowed in
   that script).

## Her two notes (16:54 and 16:56, her words)
- "In round 8, just put 'lumpsum' in brackets in the first paragraph, because we are
  phasing that phrase out, not just cold turkeying it. Just put in an extra line that the
  lumpsum is the total we are talking about and that from now on let's just call it the
  total."
- "Questions in round 8 are good, but let's make the first slide just the jug, like a
  'discovery' slide, where they tap, then the savings fill up and we say the total sits
  at the end of the question, and when they tap again the loan total drains and we say
  we start with the total at the beginning with a loan. Then the next slide starts with
  the questions."

## What to build

### A. Card 1's reveal becomes three discovery frames (`revealMode: "replace"`)
Replace the current `reveal: [<concept card>]` on card 1 with THREE frames, replace
mode, so the learner sees ONE jug at a time and the question (the sentence chips) stays
hidden until frame 3 is up. The engine's "Next ▸" button is the tap. If it is trivial
to also make a tap on the jug itself advance the frames (a delegated click listener in
questf8 that clicks `.reveal-next` when `.jug-discover` is tapped), do it; if it needs
any engine edit, skip it and say so. Every frame is a single-jug stage, large: the jug
box about 60 to 70 percent of the card width, centred, with its caption beneath. Reuse
the existing mask rendering (`.jug-line` outline tint, `.jug-fill` with `.jug-lvl` as the
level), the code-drawn coins and arrows from `js/concepts.js`. Build the stage once as a
small function (in `js/concepts.js` next to the JUG PICTURE, exported, or in questf8)
that takes a mode: `"empty" | "save" | "loan"`.

Frame 1, the empty jug, nothing moving. Text under it, three short lines:
> Payments are coins. The total (the lumpsum) is the jug.
> Your textbook says "lump sum". That is the total we are talking about. From now on we
> just call it the total.
> Tap Next to see where the jug sits.
(The first two lines are her note 1: the bracketed word, then the extra line. Keep her
meaning; tighten grammar only. "lumpsum" or "lump sum" appears ONLY here and on the
library card in part C, nowhere else in f8.)

Frame 2 (first tap), SAVINGS: coins go IN one by one and the jug fills in steps as they
land (the existing `jugSave` animation and `.jug-arr.a1/.a2/.a3` arrow timing are the
model; a small final rise for the interest is fine). Caption:
> Savings: you fill the jug coin by coin. The total sits at the END.

Frame 3 (second tap), LOAN: the jug starts FULL (to just under the rim, never into the
spout) and DRAINS coin by coin, coins going OUT with the red rim, each one lowering the
level, ending near empty. A plain "BANK" label with the dotted bank arrow from the
existing picture may show where the full jug came from. Caption:
> A loan: the bank hands you the full jug at the START. The total sits at the beginning,
> and your coins pay it back.
Below frame 3 the engine shows the question (the sentence chips) by itself.

Animation rules: CSS keyframes on the `.jug-lvl` HEIGHT (a div, not an SVG transform;
the house trap "SVG CSS transforms don't animate" does not apply here). The animation
must start when its frame mounts (a fresh element each time, `animation` on the
class, as `jugSave` does now). No autoplay sound, nothing that loops forever. Respect
nothing else. Whole numbers in the SVG. Captions keep "full jug", "the total", "the END"
together with literal U+00A0 where a break would split a phrase.

### B. Checks
- `js/quests/_finance-check.js` f8 block: the "lump" ban stays for every prompt, option,
  feedback line, hint and the recall cards; carve out ONLY the reveal frames of card 1,
  and there assert the opposite: frame 1 contains "the total (the lumpsum)" and the
  phrase "we just call it the total"; frames 2 and 3 do not contain "lump" at all.
  Assert `revealMode === "replace"` and exactly three frames on card 1, none on cards
  2 to 8.
- `verify-finance.html` f8 section: replace the "both jugs drawn" concept-card DOM check
  with: at 360 px, card 1 mounts with the input hidden, frame 1 shows one jug with the
  outline mask applied (computed `mask-image` not "none"), two clicks on `.reveal-next`
  reach frame 3 and the input becomes visible, the sentence chips are present, no raw
  tags. Update the prose line "Nothing says lump" to say where it may appear.
- Report the new verify-finance count and why it moved.

### C. The library card (📖 "theTotal" in `js/concepts.js`)
Keep it (it is the reference a learner opens from the play screen) and add her note-1
wording to its first paragraph the same way: "The total (the lumpsum) is the jug." and
the extra line. Nothing else on it changes.

## Verify (all green before you report)
Server on port 5191 is already answering (`http://localhost:5191/`); if not,
`python -m http.server 5191` from the repo root. Then:
1. `node verify-lazy-load.mjs` green.
2. `python -X utf8 tools/harness_run.py verify-finance verify-dice-finance verify-steps-ux verify-wrap`
   green with counts; `verify-exam.html` headless → its result line (673/673).
3. Your own phone look (your context only, no screenshots pasted back): 390 and 360 px,
   `http://localhost:5191/?local=1`, demo learner from `tools/lazy_playthrough.py`, card
   1 of f8: frame 1 fills the first screen with the jug and its three lines, the chips
   are NOT visible yet; tap Next: the savings fill plays; tap Next: the loan drains and
   the chips appear below. The outline is visible in colour on the dark UI, the fill
   inside the body only (never in the handle), no caption clipped at 360 px.
4. `python tools/shoot_round.py f8` still walks all 8 cards.
5. `grep -n -i "lump" js/quests/questf8-which-total.js js/concepts.js` → only the lines
   you intend (frame 1 and the library card).

## Do not touch
`sw.js` (never bump), other rounds, `js/questions.js`, `js/ui.js`, round ids/order,
`js/config.js`, the migration or schema, PROJECT-STATUS.md, STATUS-ARCHIVE.md,
`sessions/`, her PNG and the two WebP masks, `tools/shoot_round.py` beyond the
reveal-next click.

## Commit
One local commit: `Finance f8: discovery slide first (one jug: savings fills, loan
drains), "the total (the lumpsum)" phased in` with a short body, ending
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Never push.

## Report back (what the foreman reads first)
- `git show --stat HEAD`.
- The harness lines with counts and the verify-finance count with the reason it moved.
- The three frames' text, plain, as a learner reads them.
- Whether the jug-tap advance was done or skipped, and whether shoot_round.py needed
  the reveal-next click.
- Anything in this brief that did not match the code as you found it, and what you did.
