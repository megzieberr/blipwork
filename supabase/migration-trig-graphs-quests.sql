-- ============================================================
--  MIGRATION — add the Trig Graphs chapter's quests (tg1..tg7).
--  Safe on the LIVE database: it only adds/updates these 7 quest
--  rows. It does NOT touch learners or progress.
--  Run once in the Supabase SQL editor.
--
--  The Trig Graphs quests are added OPEN (is_open = true) so you can
--  test/revise the whole chapter straight away — Trig Graphs sits in
--  the "Revision" tab on the hub. Close any you don't want yet from
--  the admin dashboard (or run the "close" snippet at the bottom).
--
--  Idempotent: re-running it re-opens all seven.
-- ============================================================
insert into public.quests (quest_id, chapter, is_open, sort) values
  ('tg1','tgraph',true,43),
  ('tg2','tgraph',true,44),
  ('tg3','tgraph',true,45),
  ('tg4','tgraph',true,46),
  ('tg5','tgraph',true,47),
  ('tg6','tgraph',true,48),
  ('tg7','tgraph',true,49)
on conflict (quest_id) do update
  set is_open = true, chapter = 'tgraph', sort = excluded.sort;

-- ------------------------------------------------------------
--  When you're done testing, close them all again with:
--
--    update public.quests set is_open = false
--    where quest_id in ('tg1','tg2','tg3','tg4','tg5','tg6','tg7');
--
--  …then re-open each one from the admin dashboard as you revise it.
-- ------------------------------------------------------------
