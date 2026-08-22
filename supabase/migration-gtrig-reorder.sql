-- ============================================================
--  MIGRATION — General Trig round reorder (her ruling, 2026-08-22 evening):
--  TIP Chips (gt6) → Reductions: variables (gt7) → Reductions: numbers (gt5).
--  Touches ONLY the `sort` of three quest rows. No learner row changes.
--  Idempotent. Run once in the Supabase SQL editor (or via MCP at ship).
-- ============================================================
update public.quests set sort = 84 where quest_id = 'gt6';
update public.quests set sort = 85 where quest_id = 'gt7';
update public.quests set sort = 86 where quest_id = 'gt5';
