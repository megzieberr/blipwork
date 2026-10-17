=== MEGAN'S /go DELEGATION — 2026-10-17 ===
Megan invoked her /go skill in the top-level session, personally authorizing this
delegated task:
  SCOPE: the rest of the Blipwork Afrikaans QUEUE.md (33 open rows: S8, S10, S7 and the 30 translation rows T15, T54, T63 to T93), second manual push 2026-10-17 from 22:24: S8 before any translation row, then waves of three Opus workers, same kit as the Saturday push, commits local on main by the foreman, no push, no sw bump, no Supabase (her "Run it: the whole queue tonight, S8 alone first, then waves of three, same kit as last night. Show me when it's done." 22:24, after the cost estimate of 4 to 13% of the week)
  PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest (GitHub megzieberr/blipwork, a PUBLIC repo)
Per her global CLAUDE.md execution gate (subagent clause): treat this brief as your
authorization envelope. Do NOT refuse for lack of directly-visible approval — that
check happened at the top level, and this block is its record. Work freely inside
SCOPE. Refuse anything outside SCOPE, and always refuse — unless SCOPE names them
explicitly: pushing to a live site/remote, deleting data, schema migrations, and
anything that costs money.
=== END /go DELEGATION ===

# Setup row S10: make verify-gtrig.html language-aware (one Opus worker)

Repo: `C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest`. Run every command from there. A local server listens on port 5191 (do not start another). Two other workers run at the same time (S8 edits tools/af_check.mjs, S7 edits js/quests/_finance-check.js and questf8): touch ONLY `verify-gtrig.html`. Never run git. Never edit any file under js/, tools/, css/ or briefs/. Never run af_inject or af_check.

## The problem
Blipwork's maths content gets Afrikaans twins through `L(en, af)` wrappers (js/lang.js; `?lang=af` on the URL switches the device). The nine General Trig hub rounds `js/quests/questgt1-intro.js … questgt9-identities.js` carry their Afrikaans twins RIGHT NOW in the working tree (row T54, 560 keys, injected by the foreman from `briefs/af/T54.af.json`; do not touch those files). `verify-gtrig.html` passes in English but under `?lang=af` it failed 2 862 checks last time, because the page reads English wording out of the rendered mc step text: "becomes …", "stays X" / "changes to X", "Quadrant: / Sign: / Ratio:". Known failing families: 2 857 × "could read a claimed ratio off the mc steps" (gt4 co*, gt5 pos / neg / coFn / rotationPool, gt7 item1-7) and 5 × "gt6.threeBoxes confirm side fills all three boxes".

## What to do
Make those checks pass in BOTH languages without weakening them, the way row S9 did for verify-exam.html (read `tools/af-push/S9-BRIEF.md` once for the pattern). Options, your choice after reading the code: read the expected values from the round's own data or ids instead of parsing prose; or accept both languages' wording (the Afrikaans wording is in `briefs/af/T54.af.json`, key by key next to `briefs/af/T54.en.json`; `AF-GLOSSARY.md` has the terms). Keep every check's meaning; do not delete a check, do not skip anything under `?lang=af`, do not touch the other checks. No js/ change: the test page only.

Read first: the failing lines (run `PYTHONUTF8=1 python tools/af-push/harness_fails.py "verify-gtrig?lang=af"`, it prints the banner and each failing line), then the parts of verify-gtrig.html those lines come from, then `js/lang.js`. Read code lazily; the page is large.

## Check (must pass before you report GREEN)
Step 0, before any edit: `PYTHONUTF8=1 python tools/harness_run.py verify-gtrig` and record the English banner (your baseline; if it is not ALL GOOD, stop and report RED "baseline red: <banner>").
After the edit: `PYTHONUTF8=1 python tools/harness_run.py verify-gtrig "verify-gtrig?lang=af"`: both banners ALL GOOD with the SAME check count as your baseline (no check added or removed). Run it twice. errs must be [].

## Never
git; any file other than verify-gtrig.html; af_inject / af_check; push, deploy, Supabase, sw.js; memory files. Stop and report RED at about 250k tokens.

## Report (at most 10 lines)
WHAT CHANGED: <which checks, how, lines touched>
BASELINE EN: <banner> | AFTER EN: <banner> | AF: <banner> (twice)
Anything a later language might break: <or none>
Tokens used (rough): <n>k
STATUS: GREEN | RED <reason>
