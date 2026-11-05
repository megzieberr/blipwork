# CALC-TALL-SIGNS: the root sign and the brackets grow with what is inside (Blipwork master, then the PenWorks copy)

Written by Fable, 5 Nov 2026 14:05, for ONE Opus worker. ONE unit: this fix, in Blipwork first, then byte-copied into
PenWorks. Nothing else. Megan's words 5 Nov 14:00: "Go ahead with item one" (item one = this brief; the spawning session
checked her approval; do not refuse for lack of visible approval, stay inside this brief). Commit, never push: her
"ship it" is a separate step the top-level session handles. No migration, no money, no deletes.

## What she sees (her screenshot, 5 Nov 13:55)

She typed, on the Casio inside PenWorks (Blipwork's `js/calculator.js`, a byte copy):

    √( (1/2 + 6)² + (6 − 5)² )      with 1/2 a stacked fraction

Two faults, one cause. The LCD builds the root sign and the brackets from ordinary typed characters:

1. **The root sign has a gap.** `√` is a glyph from the font (`.calc-rad-sign`); the line over the inside is the
   `border-top` of `.calc-rad-body` (margin-top 2px). The glyph's tip and the line start at different heights, so they do
   not meet, and a glyph cannot grow when a fraction makes the inside tall. The sign sits small at the top left while the
   body is two lines tall.
2. **The brackets do not cover the fraction.** `(` and `)` render as plain text at the line's normal size, so they sit at
   the middle of the fraction instead of wrapping it top to bottom.

The real fx-991ZA Plus II (her second screenshot, the emulator, which is ground truth) draws both as SHAPES that stretch:
the root sign runs from the top line down the whole height of the inside, its tick at the bottom left; each bracket is as
tall as what sits between the pair. That is what she asked for: "compare it to how the real casio looks... can I have that?"

## Where

- `js/calculator.js` (Blipwork, 3314 lines, the master): `renderNode` (about line 3061) draws `(`, `)`, `func` (`sin(`
  etc.), `logb`, `rad`, `xrt`; `renderBox` (about line 3106) walks a box and drops the cursor in by index.
- `css/styles.css` lines about 779 to 786 (`.calc-frac`, `.calc-rad*`), plus the LCD lines 751, 803, 804, 843 to 846
  (font sizes differ per screen: 13px, 16px, `.72em` fractions on the EQN line). Everything you add is em-based.
- Before you touch anything: `graphify affected "js/calculator.js"` (her rule, 30 Oct) and read what it says. After code
  changes: `graphify update .`.

## The fix (Fable's design calls; you pick the technique)

**Root sign.** `.calc-rad` becomes a flex row whose sign stretches to the body's full height (`align-items: stretch`).
The sign is a drawn shape, not a glyph: recommended an inline SVG `viewBox="0 0 10 20" preserveAspectRatio="none"` with
`vector-effect="non-scaling-stroke"` on its lines (stroke 1.4px like every other LCD line, `currentColor`), a short tick
at the bottom left and one straight rising line to the top-right corner, where it meets the body's `border-top` with no
gap at any height (one-line inside, fraction inside, fraction inside a fraction). Width about 0.55em. The ³√ degree and
the ˣ√ index box stay upper-left of the sign, over its rising line, as now. A pure-CSS shape is fine instead if it meets
the same checks.

**Brackets.** In `renderBox`, pair each opener with its closer inside the same box by depth count: openers are `(` and
`func` (which renders `name(` ; the `(` part becomes the bracket, the name stays text); closer is `)`. Wrap the run from
opener to closer in a group span (`calc-br`, inline-flex, align-items center) with a left bracket shape before the
content and a right bracket shape after; the bracket shapes stretch to the group's height (SVG as above, or a CSS
border-left/right with border-radius; the Casio's tall bracket is a thin curve, top hook, straight, bottom hook). An
UNCLOSED opener (common while typing) groups to the end of its box and draws the left bracket only. A `)` with no opener
draws as a right bracket at the line's height. Bracket width about 0.35em so the number of characters that fit a line
barely changes. With nothing tall inside, a bracket looks like today's glyph (same height as the digits), so a plain
`(2+3)×4` is unchanged to the eye. `logb`'s own `(` … `)` around its body gets the same treatment.

**The cursor keeps its places.** `renderBox` inserts `.calc-cursor` before node idx. With grouping: the cursor at the
index just after an opener is inside the group (after the left bracket), at the closer's index it is inside before the
right bracket, after the closer it is outside. Check all three places by eye in the screenshots.

**Text stays in the DOM.** Any check or test may read the typed line's text, and copy/paste should still read `√`, `(`,
`)`. Keep the real character inside each drawn sign's span, visually hidden (e.g. `position:absolute; width:0;
overflow:hidden; clip-path`, not `display:none`), so `textContent` is unchanged. grep `tests/verify-calc-casio.html`
and `tests/verify-calculator.html` for assertions on the typed line before you decide how.

**Out of scope, do not touch:** the RESULT line's roots (`formatExactHTML`, about line 676 to 712, renders `2√3` as text;
a later round), the keypad, any maths, anything in `js/` besides `calculator.js`, PenWorks' host files beyond the copy
steps below.

## Checks (all must be green before you commit)

1. `tests/verify-calc-casio.html` stays **1030/1030** and `tests/verify-calculator.html` keeps its count (read the
   count first, then after). Run them headless with Playwright: serve the Blipwork folder on a local port and read each
   page's summary line. PenWorks' `tests/test_calc.py` Part A does exactly this for Blipwork's page too, read it for the
   method (it serves Blipwork read-only on port 8798).
2. A new Playwright look-check, `tools/shoot_calc_signs.py`, that opens the calculator in Blipwork (`?local=1` or the
   way `tests/verify-calculator.html` boots it), types HER expression key by key (√, (, (, ▫/▫ 1 ▼ 2 ▶, +, 6, ), x², +,
   (, 6, −, 5, ), x², )), and saves the LCD at 3x to `tools/shots/calc-signs-01.png`; then `√2` alone
   (`calc-signs-02.png`), `(2+3)×4` (`03`), an unclosed `(1/2 +` while typing (`04`), ³√ and ˣ√ of a fraction (`05`),
   `sin(1/2)` (`06`), and the cursor in the three places (`07`). Measure in the script from the DOM, not by eye: the
   sign's top-right meets the body's top edge within 1px; the sign's bottom is within 1px of the body's bottom; each
   bracket's height is at least its group's content height; the LCD's own height did not grow on the `.lcd-pr-typing`
   screen for a one-line input (line 804's rule: a typed fraction may not make the LCD taller).
3. Look at every PNG yourself at full size before you report; say what you see in one line each.
4. `graphify update .`, then `python tools/sw_check.py` must print OK. Bump `const CACHE = "mhq-v103"` in `sw.js` to
   `mhq-v104`.
5. Commit on main (do NOT push): `Calculator: the root sign and the brackets grow with what is inside (her screenshot 5 Nov)`
   + the brief + the shoot script + the PNGs if the repo tracks shots (check `.gitignore` first; if `tools/shots` is
   ignored, leave them on disk and name the paths). End the message with `Co-Authored-By: Claude Fable 5.1 <noreply@anthropic.com>`.

## Then the PenWorks copy (same unit, mechanical)

PenWorks: `C:\Users\megzi\Desktop\Claude Code Projects\penworks`. Rules in `js/calc/COPIED-FROM-BLIPWORK.md`.
1. Copy Blipwork's `js/calculator.js` over `js/calc/calculator.js` byte for byte; `md5sum` both, the lines must match;
   update that md file's Blipwork head and md5 lines.
2. Run `python _build/extract_calc_css.py` to regenerate `css/calc.css` from Blipwork's `styles.css`; diff it and make
   sure your new rules came across (if the script selects by class prefix, add yours to its list).
3. Bump `const CACHE = "pw-v8r"` in `sw.js` to `pw-v8s`; pin the cache string in any test that pins it
   (`grep -rn "pw-v8r" tests/`).
4. `python tests/test_calc.py` from the penworks folder (ONE suite at a time, nothing else running): Part A must print
   matching counts for both apps, Parts B and C green. Take one screenshot of her expression in the PenWorks card at
   1.6x to `_build/shots-calc/calc-signs-penworks.png`.
5. Commit on main (do NOT push): `PenWorks pw-v8s: calculator.js refreshed from Blipwork, the root sign and the brackets grow with what is inside`.

## Report back (short)

The before and after counts (1030 and the verify-calculator count), the PNG paths, one line per PNG on what you saw,
the two commit SHAs, and anything you could not make meet the check. No prose beyond that.
