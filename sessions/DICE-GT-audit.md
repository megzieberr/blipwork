# DICE session GT — General Trig dice AUDIT (wave 2, 2026-08-23 overnight)

READ `sessions/DICE-COMMON.md` FIRST for Megan's /go block and the house context.
This session is **READ-ONLY on all app code**: you audit, you write ONE new markdown
file, you change nothing else. No pool is built tonight.

## The job
General Trig (config id **`gtrig`**, quests gt1–gt13, modules
`js/quests/questgt1-intro.js` … `questgt13-undefined.js`, exports `questGt1` …
`questGt13`) was built 2026-08-22, AFTER `DICE-AUDIT.md` was written, so it has no
dice classification. Produce `sessions/DICE-AUDIT-gtrig.md` in DICE-AUDIT.md's exact
format so a future session can build its pool the same way the other chapters were:
- Read `DICE-AUDIT.md` §1 (the method + conventions) and one worked chapter section
  (§3 Finance is short) so your file matches the house format.
- Per quest: a table of every skill — mechanic, CLEAN / CARE / STATIC, and the note
  saying what makes it so (guards, banks, fixed prose).
- Chapter totals line + a "what this says about the build order" verdict.

## What makes gtrig different (audit these specifically)
1. **Mechanic support**: gtrig uses mechanics beyond the wave-1 chapters — `steps`
   chains, `tapcross`, `tokenpad`, `doubletick`, `sketchfill`, `mcmulti`, `reveal`
   frames, the `quadtri` engine, trig-graph `bands`. The dice player
   (`js/dice-play.js` + `js/play.js`) renders a known type set. For EVERY question
   type gtrig actually emits, check whether the dice player handles it; list
   supported vs would-need-player-work. A skill whose type the dice player can't
   render is a BLOCKED skill regardless of how cleanly it rolls — classify it and
   say what player work would unblock it. Do not do that player work.
2. **Pedagogy**: rounds gt1–gt3 are DISCOVERY rounds (her no-spoilers rule — raw
   measurements, never the conclusion; they pay XP every play). Dice deals skills
   out of sequence — flag whether each discovery skill still makes sense dealt
   standalone, or whether gt1–gt3 should stay out of the pool as a block. Give a
   recommendation, clearly marked as needing HER ruling, not a decision.
3. **XP economy**: note anything about gtrig's xpOnce/xpToSubmit structure a dice
   pool would interact with (report only).

## Hard limits
- Edit NOTHING except creating `sessions/DICE-AUDIT-gtrig.md`.
- No git commands, nothing live, no servers started or killed.

## Report (last thing you print)
1. The file path you wrote.
2. Totals: N skills — CLEAN / CARE / STATIC / BLOCKED-by-player.
3. The mechanic-support table (type → supported / needs work).
4. Your build-order verdict in 3 lines, and the open questions for Megan (one line
   each — expect at least the discovery-rounds one).
