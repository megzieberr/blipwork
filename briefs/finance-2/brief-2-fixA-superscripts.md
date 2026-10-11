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

# Worker 2 brief: Fix A, exponents as real superscripts in the Finance chapter

You are ONE worker doing ONE unit: every exponent a learner SEES in the Finance chapter
becomes a real superscript instead of a caret. Repo
`C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest` (GitHub Pages app
"Blipwork", Grade 11 maths, English, PUBLIC repo). Work on the current branch, commit
locally when done, never push. No wording changes, no new cards, no redesign.

## Read first (and nothing heavier)
1. `CLAUDE.md` in the repo root: "Technical map", "How code loads", "Gotchas", "Working
   rules" (local server on port 5191, harness pages). Do NOT read STATUS-ARCHIVE.md,
   PROJECT-STATUS.md, the `sessions` folder, transcripts or the Tutoring Resources folder.
2. The code you touch, listed below. Read the finance files whole once; read `js/ui.js`
   only around `formulaHtml` / `formulaHtmlExpr` (lines ~660–720) and the fraction block
   (~170–190); `css/styles.css` only around line 1686 (`sup.sf-exp`).

## What Megan saw (her play-test, 11 Oct 11:22)
`1 000(1 + 0,14/2)^(3×2)`, `…(1 + 0,11)^4`, `(1 + 0,2/2)^(−10)` drawn with a literal
caret. "The exponents need to be real exponents, not like this ^." Cause (measured):
`formulaHtml` in `js/ui.js` only superscripts a caret whose exponent is a parked
FRACTION (`^(2/5)`); a plain `^3`, `^(−10)` or `^(3×2)` passes through as text.

## The fix: ONE finance helper, used everywhere a learner reads an exponent
- Add to `js/finlib.js`: `export const pow = (base, exp) => `${base}<sup>${exp}</sup>`;`
  `exp` is a READY string: `36`, `−10`, `3×4`, `−3×4` (never brackets inside the sup;
  the minus is a real minus U+2212, the times sign U+00D7 as the rounds already use).
  The app already writes plain `<sup>` in the exponent and equation chapters
  (`js/quests/_exp.js:24`, `_eq.js:35` export the same shape), so this is the house
  convention, not a new look. Do not use `sup.sf-exp` (that class is for stacked-fraction
  exponents and shrinks to .62em).
- If the phone check below shows a `<sup>` growing a chip's line height or clipping at the
  top of an `.opt` or a tap chip, add ONE rule to `css/styles.css` next to `sup.sf-exp`:
  `.opt sup,.q-prompt sup,.steps sup,.concept sup{line-height:0;vertical-align:.55em;font-size:.72em}`
  (or whichever selectors the app's option / prompt / steps / concept containers really
  use: check the class names first). Only if needed; say in the report whether you did.

## Where carets are learner-visible today (measured with grep, 11 Oct)
Replace with `pow(...)` in every learner-facing string (prompts, mc option labels,
`answerLabel`, `solution` step text, hints, concept HTML). Comments and parser regexes
are NOT learner-visible and stay in caret form (see "The checks" below).
- `js/quests/questf9-car-or-no-car.js` `bracket(l)` (~line 141): `(1 + i)^3`,
  `^(−3)`, `^(3×4)`, `^(−3×4)` → `pow("(1 + i)", "3")`, `pow(…, "−3")`, `pow(…, "3×4")`,
  `pow(…, "−3×4")`. f9 KEEPS the teaching form `3×4` inside the sup (her ruling).
- `js/quests/questf10-in-or-out.js` `car(sc, e)` (~line 106): `^(−n)` / `^n` →
  `pow(base, "−n")` / `pow(base, "n")`.
- `js/quests/questf13-one-equation.js` (was questf12 until today; worker 1 renamed it):
  its term builder writes exponents worked out (`^36`, `^(−36)`) → `pow(base, "36")`,
  `pow(base, "−36")`. Keep every `nw(...)` unbreakable-term wrapper and the `.f13-eq`
  wrapper exactly as they are; the sup goes INSIDE the nowrap unit.
- `js/quests/questf5-timeline-build.js` (15 carets), `questf7-eff-nom.js` (6),
  `questf3-compounding.js` (4), `questf4-timeline-count.js` (2), `questf11-meeting-day.js`
  (2): fix every learner-visible one so the chapter reads as one (her default: yes to the
  older rounds). A caret inside a code comment stays.
- NOT `js/quests/questf8-which-total.js`: f8 is being rebuilt by a later worker today.
- `js/concepts.js` FINANCE cards only (lines ~210–360: `A = P(1 + i/k)^(n·k)`,
  `(1 + i)^(±periods)`, the two-rate formula at ~247, `(1 + i)^n` at ~290/340/359, the
  worked examples at ~299–345 such as `P(1 + 0,12/12)^36 =`). Hand-edit those to
  `<sup>…</sup>` (no brackets inside the sup; `(1 + i)^(±periods)` becomes
  `(1 + i)<sup>±periods</sup>`; `A = P(1 + i/k)^(n·k)` becomes `P(1 + i/k)<sup>n·k</sup>`).
  Leave every other chapter's concept card alone (the exponent chapter at ~1227+ is not
  yours).
- Any other finance file your grep finds: `grep -n "\^" js/quests/questf*.js js/finlib.js js/concepts.js`.

## The checks must stay honest (the part that takes care)
- `js/quests/_finance-check.js` (52 carets) READS labels back and recomputes them. Rule:
  every place that BUILDS an expected label (lines ~324, ~428, ~505 and any sibling) must
  import and use the same `pow`, so equality holds; every place that PARSES a label
  (`F10_TERM` ~793, `F13_CAR` / `F13_TERM` / `F13_CARS_ONLY` ~1130–1132, `f13Joined`
  ~1144, the wrapper-strip in `f13ParseEq` at ~1149, and f10's own strip near ~787;
  every f13 helper in that file was renamed from f12 on 11 Oct) first normalises
  `<sup>X</sup>` back to the caret form it already understands (`^X` for a plain number,
  `^(X)` when X starts with a minus or contains ×), then parses as before. One small
  `unsup(html)` helper in `_finance-check.js` does this; do not rewrite the regexes.
- `mc()` in `js/quests/_shared.js` de-dupes options by string. Correct and decoy labels
  must be built through the same `pow` so a true duplicate still collides. Check f5's
  decoys especially (`^(−k)` vs `^k` decoys).
- `check.js` compares the learner's answer (option flag / typed number), never HTML; make
  sure no path compares `answerLabel` HTML to typed text (grep `answerLabel` in `js/`).
- `verify-finance.html` asserts on labels (e.g. the regex at ~846 that expects
  `(A|P|\d[\d ]*)\(1`, and the "a number never leaves its unit" DOM check): update the
  ASSERTIONS to the sup form where they break, never the rule they protect. The count
  stays 586/586 unless you add checks (adding a "no learner-visible caret remains in
  f1–f13 renders" tick is welcome: render N cards per round, assert no `^` in the visible
  text of prompts, options, steps and concept cards).
- The feedback line ("the answer was …") and the 📖 solution steps render `answerLabel`
  and `solution[].s`: confirm they go through innerHTML (the equation chapter's `<sup>`
  already proves the path) so no raw `<sup>` tag ever shows.

## Verify (all green before you report)
Start the local server as CLAUDE.md says, then:
1. `node verify-lazy-load.mjs` green.
2. `python tools/harness_run.py verify-finance verify-dice-finance verify-steps-ux verify-wrap`
   → verify-finance 586/586 (or more if you added ticks; say the number), verify-dice-finance
   89/89, the others green, no page errors.
3. `verify-exam.html` headless, read the page text for the result line (expected 673/673).
4. Phone check, YOUR eyes, in your own context (do not paste screenshots back): headless
   Chromium at 390×844 and at 360×800, `http://localhost:5191/?local=1`, log in as the local
   test learner CLAUDE.md names, play f5, f9, f10 and f13 far enough to see every card kind
   that shows an exponent, plus the finance concept cards. A sup must not push a term onto
   its own line, must not clip in a chip or option, and the baseline of the running text
   must not jump. Also open one exponent-chapter card (es-series) to confirm you changed
   nothing there.
5. Proof grep for the report: `grep -n "\^" js/quests/questf*.js js/concepts.js | grep -v "^\s*//"`
   showing that what remains is comments, f8, or parser code.

## Do not touch
`sw.js` (never bump), `js/ui.js` `formulaHtml` rule itself (finance-only fix, by the
foreman's choice), the exponent / equation / patterns chapters, learner wording, round
order or ids, f8, PROJECT-STATUS.md, STATUS-ARCHIVE.md, anything under `sessions/`.

## Commit
One local commit: `Finance Fix A: exponents are real superscripts (pow helper; f3–f7,
f9–f11, f13, concept cards; checks normalise sups)` plus a short body, ending with
`Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Never push.

## Report back (what the foreman reads first)
- `git show --stat HEAD`.
- The harness lines (verify-finance with its count, verify-dice-finance, verify-exam,
  verify-lazy-load, steps-ux, wrap).
- Whether the CSS rule was needed and why (one line).
- The proof grep output.
- Anything in this brief that did not match the code as you found it, and what you did.
