-- ============================================================
--  PRIVATE SEED — run this in the Supabase SQL editor only.
--  Roster login (2026-08-21, CQ-BRIDGE-PLAN.md Part 1): the teacher seeds
--  the class list, learners never sign themselves up any more.
--  The only thing to set here is YOUR admin password. Don't commit it.
--
--  ⚠️ PUBLIC REPO — this file (seed-private.sql) IS committed, so it must
--  NEVER carry a real learner name. Placeholder names only ('Learner A'
--  below). The REAL roster goes in supabase/seed-private-real.sql, which
--  is already in .gitignore — that file is written and run by the foreman
--  via MCP, never by a build session, and is never created here.
-- ============================================================

-- Set YOUR admin password (stored hashed). Change 'choose-a-strong-one'.
update public.app_config
   set value = crypt('choose-a-strong-one', gen_salt('bf'))
 where key = 'admin_password';

-- ---------- roster shape (placeholder — the real file is seed-private-real.sql) ----------
-- One row per learner. `password` stays NULL — the picker shows them as
-- "new" and they set their own on first login (mhq_first_login). `cq_name`
-- must match Circle Quest's students.display_name EXACTLY (copy it out via
-- MCP, never retype it) — it is the join the XP-to-diamonds bridge (Part 3)
-- uses. A learner who never played Circle Quest gets cq_name = null.
-- `hidden` is left at its default (false), so a freshly seeded row shows in
-- the picker immediately.
--
-- insert into public.students (username, display_name, cq_name) values
--   ('learner_a', 'Learner A', 'Learner A (CQ spelling)'),
--   ('learner_b', 'Learner B', null)   -- e.g. never played Circle Quest
-- on conflict (username) do nothing;
--
-- …or one at a time through the admin RPC instead of a bulk insert:
--   select mhq_admin_add_student('choose-a-strong-one', 'Learner A', 'learner_a', 'Learner A (CQ spelling)');

-- Handy later (run any of these as needed):
--   open a quest:        update public.quests set is_open = true  where quest_id = 'q4';
--   close a quest:       update public.quests set is_open = false where quest_id = 'q4';
--   reset a password:    update public.students set password = null where username = 'their_username';
--                        (the learner's name shows as "new" again in the picker; progress is kept)
--   remove a learner:    delete from public.students where username = 'their_username';
--   add a mid-year arrival:
--     select mhq_admin_add_student('choose-a-strong-one', 'Display Name', 'username', null);
