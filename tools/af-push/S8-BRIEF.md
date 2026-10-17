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

# Setup row S8: an allow-list for tools/af_check.mjs (one Opus worker)

Repo: `C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest`. Run every command from there. Two other workers run at the same time (S10 edits verify-gtrig.html, S7 edits js/quests/_finance-check.js and js/quests/questf8-which-total.js): touch ONLY `tools/af_check.mjs` and the new `briefs/af/allow.json`. Never run git. Never edit anything under js/, css/, any .html, or any other file in briefs/. You are the only process touching af_check.mjs tonight: nobody else calls it until you report.

## The problem
`tools/af_check.mjs` is the checker every translation row runs (`node tools/af_check.mjs --unit <row>`; read its header for the flags and its rules). One of its rules flags an em-dash in an Afrikaans string as an ERROR (the rule key in the file looks like `wording:em-dash`; use the exact key the code uses). `js/exam/eqn-nature-of-roots.js` carries Megan's OWN August Afrikaans twins with 36 em-dashes on 31 lines. Her ruling 2026-10-17: those em-dashes STAY; new translations still avoid em-dashes. Row T15 (the rest of that file) can only go green once the checker lets her lines through.

## What to do
1. af_check.mjs reads an optional `briefs/af/allow.json`:
   `{ "<rule key>": ["<file path as the checker prints it>", "<or an item key>", ...] }`
   (a plain path is fine; support a simple `*` glob if it is cheap). A finding whose rule key is listed AND whose file or item key matches an entry is reported as **WARN instead of ERROR**: still printed, with a short tag such as `(allowed: briefs/af/allow.json)`, counted among the WARNs, so the exit code no longer fails on it. No allow.json: nothing changes. `--strict` keeps turning WARNs into errors exactly as today. Every other rule and every other file: unchanged.
2. Seed `briefs/af/allow.json` with the em-dash rule for `js/exam/eqn-nature-of-roots.js` only, plus a one-line `_note` key saying why (her ruling 2026-10-17: her August em-dashes stay; new translations avoid them), if the loader tolerates it (otherwise no note).
3. Keep the code in the file's own style (comments at the top explain the rules: add the allow-list there in two or three lines).

## Check (must pass before you report GREEN)
- Find a way to run the checker over `js/exam/eqn-nature-of-roots.js` (T15 has no table yet: `--all` and filter the output to that file, or write a throwaway `briefs/af/_s8.en.json`-style table ONLY if the checker's `--dir` lets you keep it under your scratchpad; never leave a stray table in briefs/af/). With allow.json in place: that file's em-dash findings are exactly 31 WARN lines and 0 ERROR lines. Quote the counts.
- Negative check: move allow.json aside for one run (rename it, run, rename it back): the same 31 lines come back as ERROR. Then confirm with the file restored. Any OTHER rule's ERROR in that file (missing twins are expected: the file is not translated yet) must still be an ERROR with allow.json present: quote one such line.
- `node tools/af_check.mjs --unit T62` (a finished row) still exits 0 with the same WARN count as before your change (run it before and after).

## Never
git; any file other than tools/af_check.mjs and briefs/af/allow.json; push, deploy, Supabase, sw.js; memory files. Stop and report RED at about 150k tokens.

## Report (at most 10 lines)
WHAT CHANGED: <where in af_check.mjs, the allow.json shape, the seed>
eqn-nature-of-roots: em-dash WARN <n> / ERROR <n> with allow.json; ERROR <n> without
Other-rule ERROR still fails: <one quoted line>
T62 before/after: <exit, WARN count>
Tokens used (rough): <n>k
STATUS: GREEN | RED <reason>
