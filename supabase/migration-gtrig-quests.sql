-- ============================================================
--  MIGRATION — add the General Trig chapter's quests (gt1..gt13).
--  Safe on the LIVE database: it only adds/updates these 13 quest
--  rows in public.quests. It does NOT touch any learner, progress,
--  struggle, or blip row — nothing about a real kid changes.
--
--  ⚠️ SEEDED CLOSED (is_open = false), unlike migration-equations-
--  quests.sql. All 13 rounds are built (stages 1–4 of the General Trig
--  build, 2026-08-22): gt1–gt3 are discovery rounds (XP the first time
--  only), gt4–gt13 are drills. Megan opens each round from the admin
--  dashboard herself as she teaches it — never auto-opened by this file.
--  Opening ≥ 1 round also makes the General Trig tab appear in Exam
--  Focus (its two questions moved there from 2D Trig, her ruling).
--
--  Idempotent AND non-destructive on re-run: the on-conflict clause
--  updates chapter/sort only and deliberately leaves is_open alone,
--  so re-running this after she has opened gt1 in admin can never
--  re-close a round she has already opened for her class.
--
--  Run once in the Supabase SQL editor (NOT run as part of this
--  build session — stage 2's brief stops before any migration).
-- ============================================================
insert into public.quests (quest_id, chapter, is_open, sort) values
  ('gt1','gtrig',false,80),
  ('gt2','gtrig',false,81),
  ('gt3','gtrig',false,82),
  ('gt4','gtrig',false,83),
  ('gt5','gtrig',false,86),
  ('gt6','gtrig',false,84),
  ('gt7','gtrig',false,85),
  ('gt8','gtrig',false,87),
  ('gt9','gtrig',false,88),
  ('gt10','gtrig',false,89),
  ('gt11','gtrig',false,90),
  ('gt12','gtrig',false,91),
  ('gt13','gtrig',false,92)
on conflict (quest_id) do update
  set chapter = excluded.chapter, sort = excluded.sort;

-- ------------------------------------------------------------
--  When she's ready to teach a round, open just that one from the
--  admin dashboard (or):
--
--    update public.quests set is_open = true where quest_id = 'gt1';
--
--  There is deliberately no "open them all" snippet here, unlike the
--  eqn migration — she introduces these one at a time.
-- ------------------------------------------------------------
