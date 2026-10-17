# T93 half C: leftovers in Finance (one Opus worker; brief = CODE-ROW-BRIEF.md)

Row T93 of QUEUE.md = learner-facing English the extractor cannot see. This half covers the thirteen Finance rounds. Verify pages: `verify-finance` (692/692 in both languages) and `verify-dice-finance` (English only; it is not twin-wired).

## The finance twin check (setup row S7 + its fix, tonight)
`verify-finance.html?lang=af` builds every Afrikaans card from recorded random draws and compares it with its English twin: same digits in every text (as a set, so word order may change; a number never becomes a word), the same money amounts outside an unbreakable `<span class="nowrap">` unit, the same HTML entities and superscripts (an em-dash may drop out), the same number of random draws, and **every id / flag / data field identical**. A mismatch throws "the Afrikaans card is not its English twin" and names the skill. So a string that is DATA (compared, looked up, used as an answer key) keeps its English value and gets a separate display label: that is the deposit / withdrawal / repayment case below.

## Files and the known spots (line numbers are approximate; the file is the truth)
From T81 (f1 to f9):
- `js/quests/questf8-which-total.js`: the story sentences at lines ~193-194, 273-303, 323-331, 350-354, 379-402, 420-430 and the "${w.S} deposits …" sentence; line ~77 "the total"; line ~127 the jug caption. The ITEMS list (lounge suite, fridge, …) is used only by these story sentences: give the items twins if the sentences get twins (T82 translated the f10 / f13 ITEMS as skootrekenaar, motorfiets, yskas, sitkamerstel, TV, bed: use the same words). The data items "in" / "out" / "down" stay identical.
- `js/quests/questf5-timeline-build.js` line ~103 "A plus exponent gives …", line ~177 "rate changes".
- `js/quests/questf9-car-or-no-car.js` line ~44 "A car only if it has to move…", lines ~161-168 "No car: in the one equation…"; and code data printed inside Afrikaans sentences: `${cap(p.he)}` / `${cap(p.his)}` (f9#5 / #6), `${HOW()}`, `${o.label}`, `${kindWord}` ("She spaar teen …"): give the data a display twin where a learner reads it.
From T82 (f10 to f13):
- `js/quests/questf12-build-timeline.js`: intro line ~97; day names ~125-129 ("the jug's day"); why lines ~162-183, 241-242, 280, 291; and the DATA DEBT: "deposit" / "withdrawal" / "repayment" (f12#13-15) are compared as data by the twin check, so they print in Afrikaans as "Withdrawal: watter T?" and in the answer-label list. Keep the data value, add a display label (and make sure the twin check compares the id, not the label; `js/quests/_finance-check.js` is harness-only and you may edit its twinDiff for exactly that, say so).
- `js/quests/questf13-one-equation.js`: intro ~86; lines ~379, 410, 419 ("reverse gear", "forward gear": T80 / T81 settled Vorentoe / Trurat); ~423-424 ("comes OUT, so minus"); ~473-474 (the Price = loan + down payment line).
- `js/quests/questf11-meeting-day.js` lines ~296-298 ("the road changes colour at T…").

Her finance words from tonight's rows (use the same): the total = die totaal; (the lumpsum) = (die enkelbedrag); down payment = aanbetaling; amount still owed = nog uitstaande; Forward / Reverse gear = Vorentoe / Trurat; Tap = Klik; p.a. = p.j.; accumulated amount = opgehoopte bedrag; gear = rat; after = ná; a real car = motor (the timeline kar stays kar); meet at T3 = ontmoet by T3; colour change = kleurverandering; T label = T-etiket; the flag = die vlag; KGV, DP, decimal comma from the glossary. Read `briefs/af/T81.af.json` and `briefs/af/T82.af.json` for the voice.

Do not touch any file not listed here; `tools/` is off limits (the af_extract helper idea in the queue row is NOT for tonight). Your dispatch names this file; the brief is CODE-ROW-BRIEF.md.
