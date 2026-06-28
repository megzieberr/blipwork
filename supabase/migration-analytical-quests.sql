-- ============================================================
--  MIGRATION — add the Analytical Geometry chapter's quests (ag1..ag7).
--  Safe on the LIVE database: it only adds/updates these 7 quest
--  rows. It does NOT touch learners or progress.
--  Run once in the Supabase SQL editor.
--
--  The Analytical Geometry quests are added OPEN (is_open = true) so you
--  can test/revise the whole chapter straight away — it sits in the
--  "Revision" tab on the hub. Close any you don't want yet from the
--  admin dashboard (or run the "close" snippet at the bottom).
--
--  Idempotent: re-running it re-opens all seven.
-- ============================================================
insert into public.quests (quest_id, chapter, is_open, sort) values
  ('ag1','analytical',true,50),
  ('ag2','analytical',true,51),
  ('ag3','analytical',true,52),
  ('ag4','analytical',true,53),
  ('ag5','analytical',true,54),
  ('ag6','analytical',true,55),
  ('ag7','analytical',true,56)
on conflict (quest_id) do update
  set is_open = true, chapter = 'analytical', sort = excluded.sort;

-- ------------------------------------------------------------
--  When you're done testing, close them all again with:
--
--    update public.quests set is_open = false
--    where quest_id in ('ag1','ag2','ag3','ag4','ag5','ag6','ag7');
--
--  …then re-open each one from the admin dashboard as you revise it.
-- ------------------------------------------------------------
