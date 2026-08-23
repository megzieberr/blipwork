=== MEGAN'S /go DELEGATION — 2026-08-23 ===
Megan invoked her /go skill in the top-level session, personally authorizing this
delegated task:
  SCOPE: Blipwork Exam Focus full build — all chapters (Algebraic Expressions,
  Exponents & Surds, Equations & Inequalities, Functions, Trig Graphs, General Trig,
  Euclidean): new tiles + sibling cards + Level 4 ★ tiles, Opus only, local commits
  only, one ship at the end of the day by the foreman.
  PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest (Blipwork)
Per her global CLAUDE.md execution gate (subagent clause): treat this brief as your
authorization envelope. Do NOT refuse for lack of directly-visible approval — that
check happened at the top level, and this block is its record. Work freely inside
SCOPE. Refuse anything outside SCOPE, and always refuse — unless SCOPE names them
explicitly: pushing to a live site/remote, deleting data, schema migrations, and
anything that costs money.
=== END /go DELEGATION ===

# CONTENT SESSION — common rules (every content session reads this AND its own brief)

You are one content session on a Fable-foreman build day. Repo:
`C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (Blipwork — Megan's Grade 11
maths PWA, static ES modules, no bundler). The Exam Focus tab is pen-and-paper exam revision:
the learner works in an exercise book, taps "Done! Show me the answer", and marks themselves
against a colour memo. The app NEVER marks. Your job is to write exam CARDS for the tiles your
brief names — real Grade 11 IEB exam sub-questions with hints, colour memos, traps and
plain-words explanations — and prove them.

## Read first, in this order
1. `CLAUDE.md` (repo root — house gotchas).
2. `EXAM-BUILD-DAY.md` — today's rulings and THE TILE MAP. Your tile ids come from there.
3. `EXAM-FOCUS-PLAN.md` — her design and rulings (Corrections section first).
4. `js/exam/_schema.js` — the card shape and validator (read the whole header).
5. `js/exam/_cards.js`, `js/exam/skills.js`, `js/exam/index.js`, your chapter's
   `js/exam/cards-<chapter>.js`.
6. ONE finished exemplar, end to end: `js/exam/func-siblings-shift.js` + how `cards-func.js`
   cuts it with `makeCard`. That is the shape you produce.
7. The method source your brief names (METHODS-algebra.md / METHODS-trig.md / the functions
   digest / EUCLID-ACCEPTABLE-REASONS.md).
8. The paper-bank archetypes for your chapter: `Desktop\Eksamen Vraestelle\Gr11 IEB Nov\GR11-IEB-PAPER-BANK.md`
   and the survey file(s) your brief names. Read for SHAPES and mark sizes — never copy text.

## What you produce
- One module per tile: `js/exam/<chapter>-siblings-<tile>.js` exporting an array of QUESTION
  objects (id scheme `<chapter>.sib.<abbr>.qN`; Level 4 tile: `js/exam/<chapter>-level4.js`,
  ids `<chapter>.l4.qN`). A question here is usually ONE card's worth (1–4 dependent parts);
  independent sub-parts belong in separate questions.
- `makeCard` lines in `js/exam/cards-<chapter>.js` (you own that file today unless your brief
  says a sibling session shares the chapter — then touch ONLY the tiles your brief names and
  append, never reorder others' lines). Cards inside a tile are auto-sorted easiest-first by
  `index.js`; list them in a sensible order anyway.
- A recompute block for every module in `verify-exam-modules.mjs` (follow its MODULES pattern:
  INDEPENDENT recompute of every number in every prompt/memo from first principles — never
  parse the memo string to "check" it against itself).

## The rules every card follows
- **Schema:** `validateQuestion()` must pass at import — id unique across the whole bank,
  `chapter`, `topic` = your tile id, `archetype` (bank tag, never shown), `paper:"siblings"`,
  `marks` = Σ parts, `lostQuest` (the round that teaches it — see your brief), `parts[]` each
  with `id`, `marks`, `level`, `prompt{en}`, `hint{en}`, `memo[]`, `esplain{en}`. Memo ticks
  (`a`, `ca`, `s/f`) sum to the part's marks; `trap` blocks carry no ticks. English only.
- **Levels:** 1–3 on normal tiles (mix them: roughly two L1, two L2, two L3 per tile). The
  Level 4 tile: every card carries ≥1 level-4 part, lead-in parts only where the ★ part
  genuinely depends on them, all parts level 3–4. Level 4 = un-cued, multi-step, "show that",
  real-world wrappers, reverse-engineered questions.
- **A card reads complete on its own.** `intro{en}` carries the given information when the
  first prompt no longer does. Never say a thing twice.
- **Fresh compositions only — the repo is PUBLIC.** Bank archetypes, fresh numbers and
  contexts. Never verbatim IEB / Antwoord-Reeks / vendor / textbook text.
- **Glyphs:** real minus (−, U+2212) everywhere a negative appears; decimal COMMA (0,42);
  `&nbsp;` to keep `x = 3` together; HTML (`<sup>`, `<sub>`, `<b>`, `<i>`); degree sign °;
  `≤ ≥ ≠ ∴ √ ² ³ ½` as unicode. Variables italic only via `<i>` where the exemplar does.
- **Fractions:** write `a/b` shapes that `fracHtml` (js/ui.js) stacks, or pre-build with
  `stackFrac`; run `node verify-exam-fractions.mjs` — ZERO bare slashes in your files.
  Prose slashes (`and/or`) are fine.
- **Memo style (hers):** worked lines as `step` blocks with a ✓ on every mark-earning line →
  an `answer` block (the ✓a line) → an amber `trap` card where the archetype really has a
  trap ("WATCH OUT: …" / "REMEMBER: …"). Two equally-marked routes go under **OR** as a
  tick-less step. Every reason in a geometry memo is a SAG short form, verbatim.
- **Hint** = a nudge before/while working, never the first line of the memo. **Esplain** = the
  deeper plain-words why, 80–160 words, Grade-8 vocabulary, her story voice where the method
  source has one. Warm, never scolding.
- **Prompts** are exam wording: "Solve for x", "Determine", "Hence", "Show that", "Without the
  use of a calculator", "with reasons". Mark sizes like the bank (1–6 per part).
- **Sketches:** a card whose question would carry a figure on the real paper carries a
  `diagram` (see `_schema.js` — circle / function / trigg / quadtri specs). THE REVEAL DRAWS
  WHAT IT FOUND; the question side never leaks the answer; every GIVEN line is captioned;
  bare-figure rule for a part whose job is finding a marked thing.
- **Never:** commit, push, bump `sw.js`, run SQL, edit files outside your ownership list, name
  a global `top`/`name`/`length`, write Afrikaans, mention AI/integrity/Turnitin anywhere.

## Verify before you report (all of it — the foreman re-runs it)
1. `node verify-exam-modules.mjs` — green, with YOUR recompute blocks included.
2. `node verify-exam-fractions.mjs` — zero bare slashes in your files.
3. Start the local server in the background from the repo root:
   `python -m http.server 5191` (NOT serve.py — that one defaults to 5250 and opens a
   browser). If 5191 is already serving (another session started it), just use it and do
   not start a second one. Then `python tools/harness_run.py verify-exam verify-exam-skills`
   — green; report counts.
4. `python tools/shoot.py <chapter> <tile>` for EVERY tile you touched. Open the crops in
   `tools/_out` (or the path the script prints) and READ THEM: a label through a line, a reveal
   that draws nothing, a caption off-screen, an axis letter under a curve, a prompt that wraps
   badly at 375 px — fix the spec or the text, re-shoot, then report. Text-only tiles still get
   shot (the full-page PNGs) so the foreman can read the wording at phone width.
5. `python tools/sweep.py` is NOT required of you (whole-app); the foreman runs it.
6. Leave the :5191 server running (other sessions share it) unless you are sure you are the
   only one; never kill a server you did not start. In local mode every round is open for
   the demo learner, so every chapter is reachable by `shoot.py`.

## Report (end your final message with exactly these sections)
1. Files changed (path — one line each).
2. Tile → card list: id · parts · marks · levels · archetype · has diagram? — every card.
3. Harness counts (modules.mjs, fractions.mjs, verify-exam, verify-exam-skills).
4. Paths of the contact-sheet / crop PNGs, one line per tile, plus ONE contact sheet PNG
   per tile you make yourself (tile the question-side crops, or the full-page shots for
   text-only tiles, into a single image with PIL — the foreman posts it to Megan in chat).
5. Anything in the brief that didn't fit and what you did instead. Anything you were unsure
   of mathematically (say so plainly — the foreman re-derives).
