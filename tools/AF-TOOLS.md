# Afrikaans tools: af_extract, af_inject, the round trip (QUEUE.md row S2, 2026-10-16)

The translator never reads code. `af_extract` turns a file into a table of English strings, an Opus
translator writes the Afrikaans table, `af_inject` puts the twins back. English output never changes.
Setup once per machine: `cd tools && npm ci` (acorn + acorn-walk; the night routine runs it when
`tools/node_modules` is missing). Node 24.

**A translation row, start to end:** `node tools/af_extract.mjs --unit T09 <files>` → the translator
writes `briefs/af/T09.af.json` → `node tools/af_inject.mjs T09` → `node tools/af_check.mjs` (row S3) →
the chapter's verify page in EN and with `?lang=af` (`python tools/harness_run.py verify-eq "verify-eq?lang=af"`).

## Commands
- `node tools/af_extract.mjs --unit <name> [--out <dir>] [--dry] [--force] <file> [<file> ...]`
  writes `<out>/<name>.en.json` (default `briefs/af/`) and prints a summary (items, words, option lists,
  leftovers, flags). `--dry` writes nothing. It REFUSES to overwrite a table whose `af.json` already
  translates keys that would now point at different English; `--force` starts the table over.
- `node tools/af_inject.mjs <name> [--dir <dir>] [--allow-missing] [--skip-impure] [--dry] [<file> ...]`
  reads `<name>.en.json` + `<name>.af.json` and rewrites the unit's files (or only those named).
  `--dry` prints `file:line before → after` (120 chars) and writes nothing.
- `node tools/af_roundtrip_test.mjs`: the self-test on `js/quests/questnp1-spot.js` (af = en, wrappers-only
  diff, verify-patterns EN + `?lang=af` equal to a baseline, verify-lazy-load, file restored). GREEN/RED.
  Starts `python -m http.server 5191` if nothing listens there.

## The tables
`<unit>.en.json`: `{ unit, generated, files: [repo paths], items: { "<file stem>#<n>": { en, kind:
"string"|"template", slots: [...], where: ["file.js:line:col", ...], af?, nested?, data?, impure? } },
optionLists: { "file.js:NAME": [keys] }, leftovers: [{ where, text, in?, impure? }], words,
skippedLists?, nonLiteralPairs?, afConflicts? }`. `en` is the RAW source text between the quotes or
backticks (escapes and `${...}` verbatim, CRLF folded to LF). Keys number by first position, per file.
`<unit>.af.json` (the translator's): flat `{ "<key>": "<af text>" }`, written raw like `en`
(` `, `\"` mean what they mean in the English). Same `${...}`, same tags.

## What becomes an item
1. **Known slots**: a HELPERS text argument or a SLOTS property value, followed through arrays, `?:`
   branches, `+` pieces, call arguments (`pick([...])`), local consts, `it.q`-style lookups into local
   pools, and local helper functions (their text parameters are inferred). Every string or template
   literal there whose VISIBLE text (tags and `${...}` removed) has a letter.
2. **Same-text propagation**: every other literal in the same file with byte-identical source text is
   the same item (one key, all places), so text comparisons like the pilot's `k !== correct` stay true.
3. **Option lists**: a module-level `const NAME = ["...", "..."]`, 2+ letter literals, at least one with
   a space. Lists with no spaces (`["sin","cos","tan"]`, chapter ids) are SKIPPED and printed.
4. **Already wrapped**: `L(<lit>, <lit>)` (L from js/lang.js) and exam `{ en, af }` pairs, with their `af`.

**Leftovers**: any other literal with two runs of 2+ letters separated by a space is listed, never
wrapped (console/Error text excluded). A human decides: wrap by hand, or add a helper/slot here.
A literal INSIDE an item template's `${...}` stays part of that template (listed under `nested`, and
as a leftover with `in`); the brief decides whether the translator may translate quoted text there.

## SLOTS and HELPERS (surveyed 2026-10-16 against js/questions.js)
- Prose anywhere: prompt hint tapHint answerLabel task finalPrompt graphCap graphAfterCap reveal
  revealAfter solution(→ s, r) options(→ label, why, note) wrongs why note cue ans title blurb body.
- In context: pool items (`q` + correct/yes/ans/wrongs) → q, correct, sol; option objects (`label` +
  correct/spec) → label; `name` in js/config.js only.
- Data, never followed: concept id type kind graph(s) spec tap targets correctId expected alsoAccept unit
  dp tol allowNeg yes layout sym keys frame labels placeLabel goal setup; exam ticks hl diagram.
- HELPERS (text params): mc(prompt, correct, wrongs, opts) · mcStep(prompt, correct, wrongs, hint) ·
  calcStep(prompt, hint) · calcQ(prompt, opts) · tapQ(prompt, opts) · yesnoQ / ynQ(prompt, opts) ·
  poolMC / poolYN(pool item) · tokenStep(prompt, hint) · quadStep(prompt, hint) · mcMultiStep(prompt,
  options, hint) · tapSideStep(prompt, hint) · sineSetupStep / sineAngleSetupStep / areaSetupStep /
  cosineSideSetupStep / cosineAngleSetupStep(hint only: chips are maths) · mcNum (none).
- Maths formatters, arguments skipped: C P fmtComma fmtDeg sup pw pwp root frac tfrac sf upw usup sgn
  negNum fracLabel toSub ord argDeg list classInterval labelPt ptStr nstr eqStr eqHtml eqPlain.

## What inject writes
- Hub, concept, config files: `<lit>` → `L(<lit>, <af lit>)`, English bytes untouched, plus one
  `import { L } from "<rel>/lang.js";` after the last import. A file that already uses the name `L`
  (gtrig's angle letter, `const L = 13` in concepts) gets `import { L as afL }` and `afL(...)`.
- Exam files (js/exam/): `en: <lit>` gains `, af: <af lit>` right after it, same line; an existing af
  literal is replaced in place when the table differs. No L, no import.
- The af literal keeps the English literal's kind and quote character. Every literal and the whole
  file are re-parsed before writing. Edits go from the end backwards: CRLF/LF and BOM are kept.
- **Re-running** is a no-op (an L(...) or af: already equal to the table is left alone); a changed af
  in the table replaces the old one in place (that is how glossary re-application will work).
- **Refuses** (exit 1, nothing written): a key with no af or an empty af (`--allow-missing` leaves
  those places English and lists them); a template whose `${...}` calls the random generator
  (`impure`: L evaluates both sides, so a seeded dice round would draw twice; hoist the call into a
  const first, or `--skip-impure`); a literal or file that will not parse.

## Watch for (the summary prints each)
- "also used as data": an item that also sits in a comparison or an id-like key. Keep its af equal
  to the English unless the code is checked (trig names, `x`, `θ`).
- Prose that lives in OTHER files (js/measlib.js wrongs, finlib.js COMPOUNDING, patternlib.js
  classifyName, _patterns.js `ord()` suffixes, tgraphlib FN_NAME) reaches a quest by import: it is
  translated with those files' own row, and a text comparison across files must be checked by hand.
- `js/quests/_finance-check.js` reads English prompts (pcts, yearsIn, freqIn): verify-finance in
  `?lang=af` needs those checks to read the af side before finance is translated.
