> RAN 2026-10-11 19:04–19:15 (this session, her 'ship it' 18:12): migration f8–f13 CLOSED at 94–99, sw v96, sw_check OK, commit `a4621b5`, push 7d3fc3c..a4621b5, live checks green. Kept as the record; the next ship writes its own plan.

# Ship plan: Blipwork finance rounds part 2 (updated 2026-10-11 14:50, foreman day)

Runs in the foreman session only after Megan's explicit "yes, ship it" in that message.
Nothing below has run. (The 10 Oct draft is superseded by this one; its open question,
"does f8 ship closed or built:false", is answered: f8 ships as the jug round, closed like
the rest.)

## State before the ship (as of 14:50; the ship step re-reads `git log` first)
- Live: sw mhq-v95 (`7d3fc3c`). Local commits on main since then, oldest first: the v95
  wrap-up docs (`46f3a56`, `a6f6364`), the 10 Oct builds (f8 `66498aa`+`12018be`, concept
  fix `6505cf1`, f9 `c6f5cec`+`7ecefa2`, f10 `55e5c6a`+`cf85183`, one-equation
  `fc8efef`+`2d8ffe2`, f11 `b39a7fa`+`8ddb325`), status `db79522`, ship prep `82526bc`,
  then today: renumber `75e73ce` + review fix `a4872ea`, Fix A `9f1a788`, f10 taught form
  `73c89c2`, f8 the jug `ff3e5e1`, f12 Build the timeline `2d55459`, Fix B `4736ce5`.
  All six units reviewed by the foreman and phone-checked by 15:47, nothing blocking;
  final harness verify-finance 675/675. Live DB re-read 15:30: 93 rows, max sort 93.
- Live DB checked 2026-10-10 20:58: 93 quest rows, max sort 93, finance f1–f6 open, f7
  closed, none of f8–f13 present. Re-check before running.
- The seeding migration `supabase/migration-finance-quests-2.sql` already holds the six
  rows f8–f13, CLOSED, sort 94–99, `on conflict do nothing`; `supabase/schema.sql` mirrors
  them (worker 1, 11 Oct).
- New art: `assets/finance/jug-outline.webp` + `jug-inside.webp` (her drawing as masks);
  `sw.js` precaches no images (worker 4 checked), so no list change, only the CACHE bump.

## Steps, in order
1. All six build units reviewed by the foreman, their capped checkers reporting nothing
   blocking. The parked cosmetic fix rounds (`briefs/finance-2/brief-2b-fixA-review.md`,
   `brief-3b-f10-review.md`, plus any f8/f12/f13 lists) are her one-line call: today or a
   later session. The "Tell your teacher" snapshot fix (2b Item A) is the one the foreman
   argues for before the ship, because it changes what she reads in her inbox.
2. Migration (live, Supabase project homework-hub `pjpwhalcifywjrwtjknd`): first
   `select max(sort), count(*) from quests` (expect 93 / 93; if not, renumber the sorts in
   the file to max+1..max+6 before running), then run the file, then
   `select quest_id, is_open, sort from quests where chapter='finance' order by sort`
   must show f8–f13 false at 94–99. /migration-check afterwards (grants unchanged,
   nothing exposed: the table is already revoked from anon per the inbox ship).
3. sw bump: `sw.js` CACHE mhq-v95 → mhq-v96 (one bump for all rounds).
   `python tools/sw_check.py` must print OK.
4. Full harness sweep before the push (`python -X utf8 tools/harness_run.py …`):
   verify-finance (expect the final count the last worker reported), verify-dice-finance
   89/89, verify-exam 673/673 (read the page text), verify-steps-ux, verify-wrap,
   verify-store (the quest list grew), verify-feedback-snapshot (if 2b ran),
   `node verify-lazy-load.mjs`.
5. Commit the ship (`Ship: sw v96 (finance rounds part 2: f8 the jug, f9–f11, f12 Build the
   timeline, f13 the one equation; 2026-10-11)`), push to origin main, wait for the Pages
   build, then live checks: live `sw.js` reads mhq-v96; live `js/quests/questf8-which-total.js`,
   `questf12-build-timeline.js`, `questf13-one-equation.js`, `js/finlib.js`,
   `css/styles.css` byte-identical to HEAD; `assets/finance/jug-outline.webp` served as
   image/webp; the finance map in a fresh incognito window shows rounds 8–13 as closed.
6. Open rounds for learners: her admin page, one toggle per round, when she teaches it.
7. Wrap-up: PROJECT-STATUS (Where we are, Decisions, Pending, Next up), STATUS-ARCHIVE
   diary, memory AT A GLANCE, the plan files' state lines; the untracked plan md files and
   briefs get committed with the ship (public repo: textbook names only, checked).
