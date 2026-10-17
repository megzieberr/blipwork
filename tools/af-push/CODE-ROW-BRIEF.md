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

# Blipwork Afrikaans: a CODE row (T90, T91, T92, T93), one row per worker (second push, 2026-10-17)

Read `AF-WORKER-BRIEF-2.md` FIRST for the register, her translation rules, the glossary and the never-list. This brief changes exactly one thing: in a code row you MAY open and edit the row's own .js files by hand, because the English in them sits where the extractor cannot see it (built with helpers like RX() / F(), inside ternaries, in data tables, in lib constants). Everything else in that brief holds: Opus only, one row, never git, never another row's files, never English strings edited, report what looks wrong instead of fixing it, stop at the cap.

## What "wrap by hand" means
- A learner-facing English string becomes `L("English exactly as it was", "Afrikaans")`, imported the way the injected files do it: look at any file that already has twins (for example `js/quests/questgt4-cofunctions.js`, header area) and copy its import line (`import { L } from "../lang.js";` or `{ L as afL }` when the file already has its own `L`). Where the string is built from pieces (`RX(...)`, `F(...)`, template helpers), wrap the PIECES that carry prose, never the helper call, and keep every `${...}`, tag, tick and number exactly.
- **English output stays byte-identical.** `L(en, af)` returns `en` on an English device, so wrapping changes nothing in English; that is the whole safety argument. Anything that could change the English (reordering, a helper that evaluates differently, a draw inside an L argument) is forbidden.
- **A string that is also DATA (an id, a key compared with `===`, a lookup into a table, a CSS class, a FAMILY name shared with an id, "in"/"out"/"down" in f8, 'distance', 'zero', 'positive'/'negative', 'quadratic') is NOT wrapped as is.** First split it: keep the data value where the code needs it, show the learner a separate label (`const LABEL = { sine: L("sine", "sinus"), ... }` or a display twin next to the id). Search every file in the repo for each such string before you decide (`grep` in js/ and the verify-*.html pages): the row list in your dispatch names the known ones, your grep finds the rest. A comparison in a verify page that matches English prose must then accept both languages or compare the id (the pattern S9 / S10 used).
- Prefer the smallest change that keeps the code readable; no refactors, no renames beyond the split above.

## The steps
0. BASELINE: run every verify page named in your dispatch in English and record the banners (`PYTHONUTF8=1 python tools/harness_run.py <page> [<page> ...]`). Any red: stop, report RED "baseline red".
1. SCAN: read the row's files and list every learner-facing English string the extractor missed (your dispatch gives known line numbers; find the rest). Decide per string: wrap, split-then-wrap, or leave (a string no learner ever sees, a dev-only console message) and say which in the report.
2. TRANSLATE + WRAP by hand (glossary first; the rules of AF-WORKER-BRIEF-2.md; her rulings; plain safe word + list it when unsure).
3. CHECK: `node tools/af_extract.mjs --unit <ROW> <the row's files>` (it writes `briefs/af/<ROW>.en.json` and records the twins you wrapped; 0 impure required) then `node tools/af_check.mjs --unit <ROW>` must exit 0 (WARNs listed). If the extractor cannot see a wrapped string at all, say so in the report; af_check `--all` on the file is the fallback.
4. HARNESS: every verify page named in your dispatch, in English (same banner as step 0) and with `?lang=af` (ALL GOOD). Exam-page rows: verify-exam must read 678/678 in both.
5. SELF-READ your wrapped Afrikaans once (no English left, no em-dash, no `??term??`).

## Never (on top of AF-WORKER-BRIEF-2.md's list)
Edit tools/, sw.js, css/, QUEUE.md, AF-LOG.md, AF-GLOSSARY.md, any file not in your dispatch; edit a verify page unless your dispatch names it; change an English string; change behaviour or probabilities; run git. Cap: stop and report RED "cap" at about 200k tokens, leaving the files as they are (the foreman reverts).

## Report (at most 14 short lines)
ROW: <ROW> | files touched <n> | strings wrapped <n> | split-then-wrapped <n> | left as is <n> (why)
BASELINE: <page: banner, ...> | AFTER EN: <same pages> | AF: <same pages>
af_check: exit <0/1>, WARN <n>: <keys>
Data strings found by grep beyond the dispatch list: <where, or none>
Verify-page comparisons touched: <or none>
??term??: <or none>
Glossary calls Megan should rule on: <term: your choice, or none>
Odd in the English (report only): <or none>
Tokens used (rough): <n>k
STATUS: GREEN | RED <reason>
