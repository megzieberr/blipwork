# Ship plan: Blipwork finance rounds part 2 (draft, 2026-10-10 evening)

Runs in the foreman session only after Megan's explicit "yes, ship it" in that message.
Nothing below has run.

## State before the ship
- Local commits on main since the live sw v95 (`7d3fc3c`): the v95 wrap-up docs
  (`46f3a56`, `a6f6364`), f8 (`66498aa`, `12018be`), concept fix (`6505cf1`), f9
  (`c6f5cec`, `7ecefa2`), f10 (`55e5c6a`, `cf85183`), f12 (`fc8efef`, `2d8ffe2`), f11 (`b39a7fa`, `8ddb325`), status `db79522`.
- Live DB checked 20:58: 93 quest rows, max sort 93, finance f1–f6 open, f7 closed,
  none of f8–f12 present.
- f8 is NOT approved (her play 19:10). Decide with her BEFORE the ship whether f8 ships
  closed (it is seeded closed anyway, so learners never see it) or is pulled from
  `js/config.js` (built: false) until it is redesigned. Default proposal: ship it closed,
  since the seed hides it and the map shows unbuilt rounds as "coming soon" only when
  built is false. Her call.

## Steps, in order
1. Her play-test of f9, f10, f12, f11 at `http://localhost:5191/?local=1` (incognito).
   Fix notes → fresh fix workers, one per round, harness green after each.
2. Migration (live, Supabase project homework-hub `pjpwhalcifywjrwtjknd`):
   `supabase/migration-finance-quests-2.sql`, which inserts f8–f12 CLOSED at sort
   94–98 with `on conflict do nothing`. Append the five rows to the seed block of `supabase/schema.sql` (mirror).
   Re-check `select max(sort)` right before running; then run; then
   `select quest_id, is_open, sort from quests where chapter='finance' order by sort`
   must show f8–f12 false. /migration-check afterwards (grants unchanged, nothing
   exposed: the table is already revoked from anon per the inbox ship).
3. sw bump: `sw.js` CACHE mhq-v95 → mhq-v96 (one bump for all rounds).
   `python tools/sw_check.py` must print OK.
4. Full harness sweep before the push: verify-finance, verify-dice-finance,
   verify-lazy-load, verify-wrap, verify-exam, verify-store (the quest list grew).
5. Commit the ship (`Ship: sw v96 (finance rounds part 2, f9–f12 built, f8 parked closed, 2026-10-10)`),
   push to origin main, wait for the Pages build, then live checks: live sw reads
   mhq-v96; live `js/quests/questf9-car-or-no-car.js` (and f10, f11, f12) byte-identical
   to HEAD; the finance map in a fresh incognito window shows rounds 8–12 as closed.
6. Open rounds for learners: her admin page, one toggle per round, when she teaches it.
7. Wrap-up: PROJECT-STATUS (Where we are, Decisions, Pending, Next up), STATUS-ARCHIVE
   diary, memory AT A GLANCE, EXAM-BUILD-DAY F0 line corrected (harness existed since
   23 Aug), plan file's F0 line corrected.
