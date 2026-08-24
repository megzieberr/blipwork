# Brief — General Trig dice pool (wave 3, BUILD ONLY)

=== MEGAN'S /go DELEGATION — 2026-08-24 ===
Megan invoked her /go skill in the top-level session, personally authorizing this
delegated task:
  SCOPE: delegate an agent to just build the General Trig dice rounds for this
  session (build only — local commit, no ship, no push, no flag flip)
  PROJECT: C:\Users\megzi\Desktop\Claude Code Projects\maths-homework-quest (blipwork)
Per her global CLAUDE.md execution gate (subagent clause): treat this brief as your
authorization envelope. Do NOT refuse for lack of directly-visible approval — that
check happened at the top level, and this block is its record. Work freely inside
SCOPE. Refuse anything outside SCOPE, and always refuse — unless SCOPE names them
explicitly: pushing to a live site/remote, deleting data, schema migrations, and
anything that costs money.
=== END /go DELEGATION ===

Foreman: Fable (top-level session). You are ONE Opus build agent. The foreman
reviews your work after you finish (own harness runs + own crop reads), so report
honestly — nothing is taken on report alone.

## Read first, in this order
1. `sessions/DICE-AUDIT-gtrig.md` — **the law for this build.** Every classification,
   guard, exclusion and pool-shape decision comes from there.
2. `DICE-AUDIT.md` §1 + the DICE-COMMON recipe/method-rule material it points to.
3. Shape templates from wave 2: `js/quests/dice-eqn.js` / `dice-exp.js` / `dice-func.js`
   (pool file + registration pattern) and their `verify-dice-*.html` harnesses.
4. `verify-gtrig.html` section 9 — the steps-recursive shape validation you will lift.

## Foreman rulings — already made, do NOT re-ask or re-litigate
- **gt1 is OUT of the pool** (audit §6 option C, her go: gt2 + gt3 in, gt1 out).
  gt1's exclusion also removes both of its CARE items (tapSide, whatItMeans) — no
  min-separation assert, no mixed-kind problem from that quest.
- **gt6.chip3 OUT** (audit §9 Q4 — the arguably-true decoy waits on her one-liner) and
  **gt3.quadrantal OUT** (audit §9 Q3 — permanent 3-option guess waits on her one-liner).
  Both are one-line re-adds; record both in the pool header as "pending Megan".
- **Pool size: 65 entries** = 74 collapsed (audit §5) − 7 (gt1) − 1 (chip3) − 1
  (quadrantal). Verify this arithmetic yourself against the §5 table before writing.
- **roundLength = 5** (foreman call per audit §7: a gtrig question is up to eight
  interactions, so 7 questions would run 40–50 taps a round). Note in the pool header
  that the house-median alternative is 7 — a one-character change if she prefers.
- **Method rule: POOL-SIDE** (audit §1.3 recommendation). NO `q.method` on any `steps`
  entry; attach `q.method` only to the non-`steps` eligible skills (audit §4 counts 17,
  all in gt4+; recompute the exact list yourself and print it in the report). Do NOT
  touch `js/play.js` or `js/questions.js`.
- **gt6.chip2Pool** stays ONE entry with a documented mixed kind (mc-or-yesno) in the
  pool comment. Do not split it and do not modify its generator.
- **kind = skillId**; collapse the duplicate-generator slots exactly per the audit §5
  family table (gt7's seven slots → 1 entry, gt8's chain1–4 → 1, gt13 → 3, etc.).
- **`reduceThenRead()` never enters the pool** (she cut it 2026-08-22).
- **Reuse every `skill.gen()` verbatim.** The guards (retry loops, curated banks,
  `alsoAccept`, `byValue`/`optionsByFn` throws, `checked()`) live inside `gen()` —
  extraction carries them free; rebuilding anything by hand loses them. Zero edits to
  generators, engines, or `triglib.js`.
- **One harness housekeeping fix, pre-approved:** `verify-gtrig.html`'s stale exam-card
  count assertion (audit §9 Q5 — asserts 4, actual is 54, the only red in ~1.04M
  checks). Update the count to the current actual so the harness runs fully green.
  One line; touch nothing else in that file.

## Deliverables
1. `js/quests/dice-gtrig.js` — the pool, registered exactly the way the wave-2 pools
   register. **Do NOT add `gtrig` to `DICE_CHAPTERS` in `js/config.js`** — the flag
   flip is the ship step and stays with the foreman.
2. `verify-dice-gtrig.html` — the dice layer (seeding, determinism, salt variance,
   kind coverage, resume, method-rule conformance) + steps-recursive shape validation
   lifted from `verify-gtrig.html` §9, dispatching on all eight sub-kinds. Salt-variance
   exempt list: `gt6.butWhy`, `gt6.threeBoxes` (audit §1.5). Remember gt12's tapcross
   answer can be the string `"noref"`, not an array. `verify-gtrig` §17's option-order
   check caveat: gt11's six options are deliberately NOT shuffled — don't assert
   order variance there.
3. **All harnesses green in a real browser run** — the new one, plus verify-dice (134),
   verify-gtrig (~1.04M, now fully green after the count fix), verify-store, and any
   other harness your changes could touch. ⚠️ Local-server trap (status file, 08-23):
   python's bare http.server serves stale cached modules — `fetch(url, {cache:"reload"})`
   per file then reload before trusting any harness page.
4. **PNG walk:** `tools/shoot_dice.py` on a REAL dealt gtrig round at 375 px (the tool
   works without the hub flag — see its header / the wave-2 pattern). READ your own
   crops: scrollW never above 375, zero page errors, steps chains render sanely,
   reveal frames on gt2/gt3 skills behave when dealt cold.
5. **Local commit(s)** with a clear message. NOTHING pushed.
6. `sessions/DICE-GTRIG-BUILD-REPORT.md` — what's in/out and why (counts), the exact
   method-link list, harness numbers from your own runs, which crops you read, and
   anything that smelled off (flag it there rather than fixing outside scope).

## Hard boundaries
No push. No `DICE_CHAPTERS` flip. No sw.js bump. No SQL / Supabase / migrations.
No edits to `js/play.js`, `js/questions.js`, any generator file, any engine, or
`triglib.js` (the one exception: the single pre-approved assertion count in
`verify-gtrig.html`). If anything in this brief seems to contradict the audit or
exceed SCOPE, flag it in the report instead of doing it.
