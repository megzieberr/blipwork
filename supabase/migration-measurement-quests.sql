-- ============================================================
--  MIGRATION — add the Measurement chapter's quests (m1..m6).
--  Safe on the LIVE database: it only adds/updates these 6 quest
--  rows. It does NOT touch learners or progress.
--  Run once in the Supabase SQL editor.
--
--  The quests are added OPEN (is_open = true) so you can test the
--  whole chapter end-to-end straight away. Once you're happy, CLOSE
--  the ones you haven't taught yet from the admin dashboard (or run
--  the "close" snippet at the bottom of this file).
--
--  Note on order: the chapter is taught m1, m2, m3, m4, then m6
--  ("Find the perpendicular height"), then m5 ("Mixed") last — so the
--  sort numbers put m6 (34) before m5 (35) to match the app.
--
--  Idempotent: re-running it re-opens all six.
-- ============================================================
insert into public.quests (quest_id, chapter, is_open, sort) values
  ('m1','meas',true,30),
  ('m2','meas',true,31),
  ('m3','meas',true,32),
  ('m4','meas',true,33),
  ('m6','meas',true,34),
  ('m5','meas',true,35)
on conflict (quest_id) do update
  set is_open = true, chapter = 'meas', sort = excluded.sort;

-- ------------------------------------------------------------
--  When you're done testing, close them all again with:
--
--    update public.quests set is_open = false
--    where quest_id in ('m1','m2','m3','m4','m5','m6');
--
--  …then re-open each one from the admin dashboard as you teach it.
-- ------------------------------------------------------------
