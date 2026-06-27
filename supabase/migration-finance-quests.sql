-- ============================================================
--  MIGRATION — add the Finance chapter's quests (f1..f7).
--  Safe on the LIVE database: it only INSERTS quest rows (and skips
--  any that already exist). It does NOT touch learners or progress.
--  Run once in the Supabase SQL editor.
--
--  The finance quests are added CLOSED (is_open = false) so they
--  stay hidden from learners until you open each one in the admin
--  dashboard as you teach it — exactly like the later stats quests.
-- ============================================================
insert into public.quests (quest_id, chapter, is_open, sort) values
  ('f1','finance',false, 9),
  ('f2','finance',false,10),
  ('f3','finance',false,11),
  ('f4','finance',false,12),
  ('f5','finance',false,13),
  ('f6','finance',false,14),
  ('f7','finance',false,15)
on conflict (quest_id) do nothing;
