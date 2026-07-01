-- ============================================================
--  MIGRATION — add the Exponents & Surds chapter's quests (es1..es8).
--  Safe on the LIVE database: it only adds/updates these 8 quest
--  rows. It does NOT touch learners or progress.
--  Run once in the Supabase SQL editor.
--
--  The Exponents & Surds quests are added OPEN (is_open = true) so
--  you can test/revise the whole chapter straight away — it sits in
--  the "Revision" tab on the hub. Close any you don't want yet from
--  the admin dashboard (or run the "close" snippet at the bottom).
--
--  Idempotent: re-running it re-opens all eight.
-- ============================================================
insert into public.quests (quest_id, chapter, is_open, sort) values
  ('es1','exp',true,64),
  ('es2','exp',true,65),
  ('es3','exp',true,66),
  ('es4','exp',true,67),
  ('es5','exp',true,68),
  ('es6','exp',true,69),
  ('es7','exp',true,70),
  ('es8','exp',true,71)
on conflict (quest_id) do update
  set is_open = true, chapter = 'exp', sort = excluded.sort;

-- ------------------------------------------------------------
--  When you're done testing, close them all again with:
--
--    update public.quests set is_open = false
--    where quest_id in ('es1','es2','es3','es4','es5','es6','es7','es8');
--
--  …then re-open each one from the admin dashboard as you revise it.
-- ------------------------------------------------------------
