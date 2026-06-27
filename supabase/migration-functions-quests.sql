-- ============================================================
--  MIGRATION — add the Functions chapter's quests (fn1..fn7).
--  Safe on the LIVE database: it only adds/updates these 7 quest
--  rows. It does NOT touch learners or progress.
--  Run once in the Supabase SQL editor.
--
--  The Functions quests are added OPEN (is_open = true) so you can
--  test/revise the whole chapter straight away — Functions sits in
--  the "Revision" tab on the hub. Close any you don't want yet from
--  the admin dashboard (or run the "close" snippet at the bottom).
--
--  Idempotent: re-running it re-opens all seven.
-- ============================================================
insert into public.quests (quest_id, chapter, is_open, sort) values
  ('fn1','func',true,36),
  ('fn2','func',true,37),
  ('fn3','func',true,38),
  ('fn4','func',true,39),
  ('fn5','func',true,40),
  ('fn6','func',true,41),
  ('fn7','func',true,42)
on conflict (quest_id) do update
  set is_open = true, chapter = 'func', sort = excluded.sort;

-- ------------------------------------------------------------
--  When you're done testing, close them all again with:
--
--    update public.quests set is_open = false
--    where quest_id in ('fn1','fn2','fn3','fn4','fn5','fn6','fn7');
--
--  …then re-open each one from the admin dashboard as you revise it.
-- ------------------------------------------------------------
