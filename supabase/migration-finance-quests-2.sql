-- ============================================================
--  MIGRATION — add the Finance chapter's part-2 quests (f8..f13).
--  Safe on the LIVE database: it only INSERTS quest rows (and skips
--  any that already exist). It does NOT touch learners or progress.
--  The rounds are added CLOSED (is_open = false) so they stay hidden
--  until opened one by one in the admin dashboard, exactly like f1..f7.
--  sort 94..99: live max(sort) was 93 on 2026-10-10 20:58 (93 rows, f1..f6 open, f7 closed, none of f8..f13 present); the ship re-checks it.
--  (f12 "Build the timeline" is seeded now because this file only runs at the ship, by which time that round exists; f13 is the one-equation round, renumbered from f12 on 2026-10-11.)
-- ============================================================
insert into public.quests (quest_id, chapter, is_open, sort) values
  ('f8', 'finance', false, 94),
  ('f9', 'finance', false, 95),
  ('f10','finance', false, 96),
  ('f11','finance', false, 97),
  ('f12','finance', false, 98),
  ('f13','finance', false, 99)
on conflict (quest_id) do nothing;
