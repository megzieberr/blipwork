# CALC-FACT: SHIFT °'" = FACT, prime factors of a shown whole-number result (Blipwork master, then the PenWorks copy)

Written by Fable, 5 Nov 2026 14:50, for ONE Opus worker. ONE unit: this fix, in Blipwork first, then byte-copied into
PenWorks. Nothing else. Megan's words 5 Nov 14:40: "Can we do the Shift fact fixes now" (= this brief; the spawning
session checked her approval; do not refuse for lack of visible approval, stay inside this brief). Commit, never push:
her "ship it" is a separate step the top-level session handles. No migration, no money, no deletes.

## What she wants

On the real fx-991ZA Plus II, SHIFT then °'" (the key whose yellow label is FACT) turns a shown whole-number answer
into its prime factors: 1092 = shows `1092`; SHIFT FACT shows `2²×3×7×13` on the result line; SHIFT FACT again shows
`1092` again. Her 4 Oct ruling switched the key off ("not school use"); today she wants it ON. Everything about FACT
below comes from the Casio manual, NOT from her emulator (nothing measured yet): mark every row and comment
"not measured, from the Casio manual" and keep each choice easy to flip when she measures.

## Where

- `js/calculator.js` (Blipwork, 3389 lines, the master).
  - line 63 and line about 2795: two comments list FACT among the keys that do nothing. Update both (FACT is live).
  - line about 2800: `const NOOP_SHIFT = new Set(["intdx", "logbox", "dms", "eng"])`. Take `"dms"` out and map
    `SHIFT dms` to a new key, e.g. `else if (id === "dms") key = "factor";` in the SHIFT block (line about 2876;
    `"fact"` is already taken by x!, so pick another name).
  - `compKey` (line about 2920): `if (key === "factor") return toggleFact();` next to `toggleSD` / `toggleMixed` /
    `dmsToggle`. Off the COMP screen (menus, STAT grid, prompts, TABLE, EQN) the key does nothing, as every other
    SHIFT function those screens do not know. Add `"factor"` to `CALC_KEEP` (line about 2917): after a CALC answer it
    only changes how the answer is shown, like S⇔D.
  - `S.form` (line about 1401) gains a fourth value `"fact"`; `shownHTML()` (line about 2163) renders it with a new
    `formatFact(S.exactVal)`; `toggleSD`, `toggleMixed`, `dmsToggle` (lines about 2173 to 2205) meet the new form, see
    the rules.
  - `refreshResult`, `resetEntry`, `doEquals` and every place that sets `S.form = null` already clear it.
- Before you touch anything: `graphify affected "js/calculator.js"` (her rule, 30 Oct) and read what it says. After
  code changes: `graphify update .`.

## The rules (Fable's design calls, from the manual; her emulator overrules all of them later)

1. **When it works.** COMP screen, a result is shown (`S.result != null`, no error), and `S.exactVal` is a WHOLE
   number, positive, 2 or more, with at most 10 digits (< 1e10). Then `toggleFact()` sets `S.form = "fact"`,
   `S.showDecimal = false`, `S.result = shownHTML()`.
2. **When it does nothing.** 0, 1, a negative, a decimal answer, a fraction, anything with π or a root, more than 10
   digits, an error on screen, no result (typing): the key is consumed (SHIFT goes off) and the screen stays as it is.
   With no result it must NOT type the °'" mark (today SHIFT °'" is a noop; keep it that way, only the live case
   changes).
3. **The factors.** Trial division by every prime up to 997 (the manual: "prime factors up to three digits"),
   ascending, `×` between them, a repeated prime as one factor with a raised count (`2²`, `13²`, `2¹⁰`). Whatever is
   left above 1 after the three-digit primes are out goes in round brackets as ONE number, last: 1234567 →
   `127×(9721)`; 1009 → `(1009)`; 1018081 (= 1009²) → `(1018081)`. A prime under 1000 shows plain: 7 → `7`.
   Use the same raised-digit markup the result line already uses for exponents if it has one (`formatExactHTML`,
   line about 681, and the CSS it relies on); if the result line has none, use the typed line's superscript class so
   the ² matches the ² she sees elsewhere on the LCD. The result line must still fit: a long factorisation steps its
   font down the way `fitAnswer` does for EQN, or scrolls as long results already do (read how the result line copes
   with a 10-digit answer today and do the same).
4. **Back again.** SHIFT FACT on the fact form → `S.form = null`, the plain answer, same decimal state as before
   (keep `S.showDecimal` as it was). S⇔D on the fact form → also back to the plain answer (Blipwork choice, not
   measured). °'" on the fact form → the °'" form, as from any other form (dmsToggle already does this since it only
   tests `=== "dms"`); SHIFT S⇔D (mixtog) on the fact form → nothing (a whole number has no mixed form anyway).
5. **Ans and chaining.** `S.exactVal` never changes, so Ans, history (▲), `+` after the answer (Ans+), a digit
   starting a new line all behave exactly as after the plain answer. Browsing history with ▲ ▼ to a whole-number
   answer and pressing SHIFT FACT works on that shown answer (same path as S⇔D on a browsed answer; check how
   `moveVert` restores `S.exactVal`).
6. **Out of scope, do not touch:** the keypad (the yellow FACT label is already on the key, line 114), any other key,
   the typed line, `formatExactHTML` beyond reusing its superscript, anything in `js/` besides `calculator.js`.

## Checks (all must be green before you commit)

1. `tests/verify-calc-casio.html` (Blipwork root: `verify-calc-casio.html`) gets a new section
   `section("Build 11 · FACT = SHIFT °'\" (spec §9, from the Casio manual, not measured)")` after the x! rows (line
   about 767), rows in the file's `row(...)` style, source column "manual, not measured" unless stated:
   `1092 = SHIFT °'"` → val `2²×3×7×13` (match the markup the way other rows match a raised ²; read how row 766's
   neighbours assert exponents), then `SHIFT °'"` again → val `1092`; `1234567 =` → `127×(9721)`; `1009 =` →
   `(1009)`; `7 =` → `7`; `2 , 5 = SHIFT °'"` → val unchanged `2,5`; `(−) 12 = SHIFT °'"` → `−12`; `0 =` and `1 =`
   unchanged; `12345678901 =` unchanged; `2 + 3 = SHIFT °'"` → `5`; `1092 = SHIFT °'" S⇔D` → `1092` (Blipwork
   choice); `1092 = SHIFT °'" +` → expr `Ans+`; `1 2 SHIFT °'"` while typing → expr still `12`, nothing typed;
   `MODE 7` then `SHIFT °'"` → the f(X)= screen unchanged. Read the count before (1030) and after; every new row
   green, no old row red.
2. `verify-calculator.html` keeps its count (77).
3. Run both headless with Playwright: PenWorks' `tests/test_calc.py` Part A shows the method (it serves Blipwork
   read-only on port 8798).
4. `CASIO-CALCULATOR-SPEC.md` §9 (line about 206, next to x!): add a FACT paragraph with rules 1 to 4 in two or three
   lines, headed "not measured, from the Casio manual, 5 Nov 2026; her emulator overrules".
5. `graphify update .`, then `python tools/sw_check.py` must print OK. Bump `const CACHE = "mhq-v105"` in `sw.js` to
   `mhq-v106`.
6. Commit on main (do NOT push): `Calculator: SHIFT °'" = FACT shows a whole answer's prime factors (her 5 Nov ask;
   from the manual, not measured)` + this brief. End the message with
   `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.

## Then the PenWorks copy (same unit, mechanical)

PenWorks: `C:\Users\megzi\Desktop\Claude Code Projects\penworks`. Rules in `js/calc/COPIED-FROM-BLIPWORK.md`.
1. Copy Blipwork's `js/calculator.js` over `js/calc/calculator.js` byte for byte; `md5sum` both, the lines must
   match; update that md file's Blipwork head, md5 and "last refreshed" lines.
2. Run `python _build/extract_calc_css.py` to regenerate `css/calc.css` from Blipwork's `styles.css`; diff it (if you
   added no CSS it is unchanged; say so).
3. Rebuild `tests/verify-calc-casio.html` from Blipwork's the way the last refresh did: copy Blipwork's file over it,
   then put back the two PenWorks-only lines (`git diff` the file after the copy shows exactly which two lines went
   missing; restore them).
4. Bump `const CACHE = "pw-v8s"` in `sw.js` to `pw-v8t`; pin the cache string in any test that pins it
   (`grep -rn "pw-v8s" tests/`).
5. `python tests/test_calc.py` from the penworks folder (ONE suite at a time, nothing else running): Part A must print
   matching counts for both apps, Parts B and C green.
6. Commit on main (do NOT push): `PenWorks pw-v8t: calculator.js refreshed from Blipwork, SHIFT °'" = FACT`.

## Report back (short)

The before and after counts (1030 → ?, and 77), the two commit SHAs, the md5 line, and anything you could not make
meet the check or had to choose yourself beyond the rules above. No prose beyond that.
