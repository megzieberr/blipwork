-- ============================================================
--  PRIVATE SEED — run this in the Supabase SQL editor only.
--  Learners SIGN THEMSELVES UP, so there's no class list to seed.
--  The only thing to set is YOUR admin password. Don't commit it.
-- ============================================================

-- Set YOUR admin password (stored hashed). Change 'choose-a-strong-one'.
update public.app_config
   set value = crypt('choose-a-strong-one', gen_salt('bf'))
 where key = 'admin_password';

-- Handy later (run any of these as needed):
--   open a quest:        update public.quests set is_open = true  where quest_id = 'q4';
--   close a quest:       update public.quests set is_open = false where quest_id = 'q4';
--   reset a password:    update public.students set password = null where username = 'their_username';
--                        (the learner sets a new one next login; progress is kept)
--   remove a learner:    delete from public.students where username = 'their_username';
