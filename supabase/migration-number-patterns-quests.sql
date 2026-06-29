-- ============================================================
--  MIGRATION — add the Number Patterns chapter's quests (np1..np7).
--  Safe on the LIVE database: it only adds/updates these 7 quest
--  rows. It does NOT touch learners or progress.
--  Run once in the Supabase SQL editor.
--
--  The Number Patterns quests are added OPEN (is_open = true) so you
--  can test/revise the whole chapter straight away — it sits in the
--  "Revision" tab on the hub. Close any you don't want yet from the
--  admin dashboard (or run the "close" snippet at the bottom).
--
--  Idempotent: re-running it re-opens all seven.
-- ============================================================
insert into public.quests (quest_id, chapter, is_open, sort) values
  ('np1','pat',true,57),
  ('np2','pat',true,58),
  ('np3','pat',true,59),
  ('np4','pat',true,60),
  ('np5','pat',true,61),
  ('np6','pat',true,62),
  ('np7','pat',true,63)
on conflict (quest_id) do update
  set is_open = true, chapter = 'pat', sort = excluded.sort;

-- ------------------------------------------------------------
--  When you're done testing, close them all again with:
--
--    update public.quests set is_open = false
--    where quest_id in ('np1','np2','np3','np4','np5','np6','np7');
--
--  …then re-open each one from the admin dashboard as you revise it.
-- ------------------------------------------------------------
