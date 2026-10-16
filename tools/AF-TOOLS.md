# Afrikaans tools: af_extract, af_inject, the round trip (QUEUE.md row S2, 2026-10-16)

The translator never reads code. `af_extract` turns a file into a table of English strings, an Opus
translator writes the Afrikaans table, `af_inject` puts the twins back. English output never changes.
Setup once per machine: `cd tools && npm ci` (acorn + acorn-walk; the night routine runs it when
`tools/node_modules` is missing). Node 24.

**A translation row, start to end:** `node tools/af_extract.mjs --unit T09 <files>` → the translator
writes `briefs/af/T09.af.json` → `node tools/af_inject.mjs T09` → `node tools/af_check.mjs --unit T09` (exit 0) →
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

## af_check (row S3): is every item twinned, is every twin safe
`node tools/af_check.mjs [--unit <row> [--dir <d>]] [--all] [--strict] [--json] [--verbose] [--as <repo path>] <file> ...`
reads the FILES (never the tables): af_extract's items, and each one's twin (`L`/`afL` second argument,
exam `af:`, read-only `B(en, af)` for js/funfun/). Prints `ERROR|WARN <rule> <key> <file:line> [detail]
<snippet>` per file, a counts line (`items / twins / missing / errors / warns`) and a totals line.
Exit 1 on any ERROR; `--strict` turns WARNs into errors; `--json` also writes `tools/_out/af_check.json`.
**The night routine, after inject: `node tools/af_check.mjs --unit <row>` must exit 0.**
`--all` (every content file: `contentFiles()` in af_check.mjs; not js/funfun/, js/lang.js, js/exam/lang.js,
the harness stub, the loaders) is the ship-time DEBT REPORT: missing twins are counted per file (lines with
`--verbose`), other findings listed, exit 0 unless `--strict`. `--as` checks a copy (tools/_out/) as if it sat
at that path. One finding per rule per twin; several hits show as `[×n]`.
- `missing` ERROR (debt in `--all`): an item with no twin. `af-conflict` WARN: one English, two af texts.
- `placeholders` ERROR: the `${...}` sequence differs after blanking quoted strings inside each placeholder
  (quoted prose there may be translated, the code may not); the af template does not parse; `${` in a string.
- `tags` ERROR: HTML tags, entities, and ✓ / ✓ca / ✗ ticks differ in order or count.
- `english-leak` WARN: an af word from `STOP_WORDS` (top of af_check.mjs; English words that are NOT also
  Afrikaans; ALL-CAPS, tags and `${...}` skipped). ERROR when af == en, en has 3+ words and it is not data.
- `wording:<id>` (the `RULES` table, top of af_check.mjs; G2 extends it there): ERROR frase(s), em-dash,
  en-dash used as a dash, decimal point between digits (question numbers like Vraag 3.1 skipped), kot / kosek
  / sek (not "30 sek"), weerkaats*, sin/cos/tan⁻¹ (also ^-1, <sup>−1</sup>), a translator's `??term??`;
  WARN hyphen-minus where the en has a real minus, formal `u` (skipped when u is a variable), en "interval"
  without af "interval", en "drag" with af "sleep".
- `length` WARN: visible af/en > 1.6 with en ≥ 12 characters (360 px). `numbers` WARN: digit runs differ
  (decimal comma/point and thousands spaces normalised; "(1,2)" vs "(1;2)" shows here).
- `must-equal` ERROR: an item also used as data (a comparison, an id-like key) whose af differs.

## af_glossary_apply (row S3): her later word wins everywhere
`node tools/af_glossary_apply.mjs [--glossary <path>] [--write] [--as <repo path>] [--all | <file> ...]`
reads `AF-GLOSSARY.md` (row S5): a `## Terms` table `| English | Afrikaans | Note | Retired |` (columns
found by name), then `## Rules`. A row with a Retired cell (old forms split by `;`) replaces each whole-word,
case-insensitive old form with the FIRST Afrikaans form (before the first `,`), a leading capital kept, in
AF SIDES ONLY: `L`/`afL` second arguments, exam `af:`, `briefs/af/*.af.json` values (so a re-inject keeps it).
Inside a template only its text and the quoted prose in `${...}` change: never code, comparison strings,
tags or entities. Never an English side, js/funfun/ or js/lang.js. DRY by default (`file:line old → new`,
per-file and per-term counts); `--write` edits from the end backwards, CRLF/LF + BOM kept, re-parses every
literal and the file. No glossary: "no AF-GLOSSARY.md yet", exit 0. Rows that would never settle (the new
form contains the old one) are skipped and printed. `--all` = contentFiles() + every `.af.json`. After
`--write` it prints the af_check (and re-inject) commands for the touched files. Retire only words with ONE
meaning: a dry run's per-term count is the brake (e.g. retiring "deel" would hit every "deel deur").
