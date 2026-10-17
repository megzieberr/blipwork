# T93 half B: leftovers in Trig, Trig Graphs, General Trig, Stats, Prob, Analytical, Patterns (one Opus worker; brief = CODE-ROW-BRIEF.md)

Row T93 of QUEUE.md = learner-facing English the extractor cannot see. This half covers the trig family plus the data words found tonight. Verify pages for this half: `verify-trig`, `verify-tgraph`, `verify-gtrig`, `verify` (stats), `verify-prob`, `verify-analytical`, `verify-patterns`, `verify-exam` (678/678 in both languages). verify-gtrig's count moves with random draws; "ALL GOOD" is the signal.

## Files and the known spots (line numbers are approximate; the file is the truth)
- `js/quests/questt1-choose.js` lines 30-56: 16 worked-step lines; the Area pad cell in `questt6-*.js` `areaSetupStep`.
- `js/exam/tgraph-siblings-period-amplitude-range.js`: prompt 83, Range lines 105 / 117 / 156 / 168 / 219 / 260 / 365, Period lines 127 / 166 / 283 / 388.
- `js/exam/tgraph-siblings-intersections-inequalities.js`: sketch labels 60 / 275 / 429. `js/exam/tgraph-siblings-sketch.js` line 323.
- `js/quests/questgt11-six-types.js` lines 43-48: six type names.
- General Trig rounds 1-9 (24 lines): gt1:32; gt2: 52 / 56 / 95 / 132-136 / 183-185; gt3:25; gt5: 71-74; gt6: 27-31 / 157 / 164 (files `js/quests/questgt1-intro.js` … `questgt6-tip-chips.js`). CAUTION from S10: `verify-gtrig.html` has a check "three headings still open the card" that expects the gt6 headings in English ("positive angles" and so on), and two guards ("ask side never says clockwise", the hint guard) that only look for the English word. If you wrap those gt6 headings, that check in verify-gtrig.html must accept both languages (compare by id or accept the Afrikaans too); you may edit verify-gtrig.html for exactly that.
- Data words that stay English inside Afrikaans sentences and need a code check: `questag1` 'distance', `questag2` 'zero', `questgt2` 'positive' / 'negative'.
- From T84 (stats rounds, tonight): `${skew}` / `${dir}` print right / left / normal ("skeef na right"), `${which}` prints lower / upper ("Bereken die lower-grens"; "upper" was kept English to match), "Set A" / "Set B", the reason labels mean, median, mode, range, quartiles, midpoint, variance, and min / max (possible map keys): files `js/quests/quest02-centre-spread.js`, `quest03-quartiles.js`, `quest04-skewness.js`, `quest08-mixed.js` (grep for the exact spots). Keep the data value; show a label.
- From T86 (prob rounds, tonight): `js/quests/questp1-basics.js` lines 17-22, the die event names ("an odd number", "an even number", "a multiple of ${m}", "a factor of ${N}", "greater than ${k}", "at most ${k}") print English inside Afrikaans prompts; `questp7-replacement.js` colour names come from `${c.name}` (a data table: give it a display twin, keep the key).

Everything else in these files already has twins (rows T32 to T62, T84, T86): do not retranslate; use their words (read the chapter's `briefs/af/T..af.json` tables for the voice and the terms, and `AF-GLOSSARY.md`). Do not touch any file not listed here (verify-gtrig.html only for the gt6 heading check). Your dispatch names this file; the brief is CODE-ROW-BRIEF.md.

## Added 23:30 from T88 (Measurement; verify page verify-meas)
- js/quests/questm4-composite.js: 'cone' prints English inside the Afrikaans joining-face prompt when the solid on top is a cone (show a label, keep the key).
- none / top / both: m3#1, m3#8, m3#12, m4#1, m5#1, m5#13, m5#14 were kept English because CYL_SA_LABEL[open] in js/measlib.js looks them up; check the code and give them a display twin where a learner reads them (files questm3-open.js, questm4-composite.js, questm5-mixed.js). Add verify-meas to your pages.

## Added 23:40 from T91 (verify page verify-exam)
- js/screens.js: the Level 4 tile sub-line 'mixed hard questions — for when the basics sit' is learner-facing and still English (wrap it; no em-dash in the Afrikaans).
