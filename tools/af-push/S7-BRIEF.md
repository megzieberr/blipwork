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

# Setup row S7: the finance harness must survive Afrikaans prompts (one Opus worker)

Repo: `C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest`. Run every command from there. A local server listens on port 5191 (do not start another). Two other workers run at the same time (S8 edits tools/af_check.mjs, S10 edits verify-gtrig.html): touch ONLY `js/quests/_finance-check.js`, `js/quests/questf8-which-total.js` and, if you truly need it, `verify-finance.html`. Never run git. Never edit any other file. Never run af_inject or af_check.

## Background
Blipwork's maths content is getting Afrikaans twins: a translation tool rewrites learner-facing string literals as `L("English", "Afrikaans")` (js/lang.js; the device's language picks the side; `?lang=af` on the URL switches it). Later tonight rows T80 to T82 will do that to the Finance concept cards and all thirteen finance rounds (js/quests/questf1 … questf13). Right now the finance files have NO twins, so `verify-finance.html?lang=af` passes trivially. Your job is to make sure it still passes AFTER those rows land, without weakening a check.

## Part 1: js/quests/_finance-check.js reads prompts through the English side
`_finance-check.js` is harness-only (not imported by the app). By design it re-derives every answer from the question's OWN rendered prompt / options / feedback, and it does that by parsing English words out of the rendered HTML (examples: `/(\d+)%\s?p\.a\. compounded (annually|half-yearly|quarterly|monthly)/`, `/withdraws <span …>R…/`, `/from T(\d+) the rate is/`, `/loan itself|the total/`, `mSame[4].includes("same")`). Under `?lang=af` those prompts will be Afrikaans and every such parse fails.

Fix it so the checks keep their meaning in both languages. The Afrikaans wording does NOT exist yet, so do not invent Afrikaans alternatives. Two sound routes; read the code, then pick (or combine):
- (a) Give the harness the English rendering of the same question: for example seed `Math.random` in the harness, generate the question once in the page's language and once with the language forced to English (`js/lang.js` exports `setLang` / `getLang`; a temporary switch around the second generation, restored after), and let `_finance-check.js` parse the English copy while the displayed copy is the Afrikaans one. Check first that generation is deterministic under a seeded `Math.random` (draws before any string are the same in both languages; a `pick()` INSIDE an `L(...)` argument would be a different draw per side, which is exactly why Part 2 exists).
- (b) Where a parse only needs numbers, R amounts, `T<n>` markers, `%`, option order or HTML structure, make the regex language-neutral so it no longer needs the English word.
Whatever you choose: English output of the app byte-identical (the app never imports this file; questf8's change in Part 2 must not alter what a learner sees), no check removed or skipped under `?lang=af`.

## Part 2: hoist the random draws out of questf8's templates
`js/quests/questf8-which-total.js`, lines about 416 to 426: template literals call random draws (`pick(...)` or similar) INSIDE `${...}`, which the extractor flags as impure (an `L(en, af)` twin would draw twice, once per side, and the two sides could disagree). Hoist each such draw into a `const` just above the template and reference the const inside `${...}`. Same words, same probabilities, same output. Then `node tools/af_extract.mjs --dry --unit S7 js/quests/questf8-which-total.js` (if `--dry` exists; otherwise run the real extract to a scratch table under your scratchpad with `--dir`, never into briefs/af/) must report 0 impure items for that file.

## Check (must pass before you report GREEN)
Step 0, before any edit: `PYTHONUTF8=1 python tools/harness_run.py verify-finance verify-dice-finance` and record both banners (expected verify-finance 692/692; if either is red, stop, report RED "baseline red").
After: `PYTHONUTF8=1 python tools/harness_run.py verify-finance "verify-finance?lang=af" verify-dice-finance`: verify-finance ALL GOOD 692/692 in both, verify-dice-finance the same banner as your baseline, errs []. Run the three twice. Then the Part 2 extractor check above.

## Never
git; any file other than the three named; af_inject / af_check / anything in briefs/af/; push, deploy, Supabase, sw.js; memory files. Stop and report RED at about 250k tokens.

## Report (at most 10 lines)
PART 1: <route (a)/(b)/both, what changed in _finance-check.js and verify-finance.html, lines touched>
PART 2: <the draws hoisted, extractor impure count before/after>
BASELINE: <banners> | AFTER: <EN / AF / dice banners> (twice)
Anything T81 / T82 translators must know: <or none>
Tokens used (rough): <n>k
STATUS: GREEN | RED <reason>
