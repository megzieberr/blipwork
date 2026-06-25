-- ============================================================
--  PRIVATE SEED — run this in the Supabase SQL editor only.
--  Do NOT commit real learner names or your real admin password.
--  (This file is a TEMPLATE; the values here are placeholders.)
-- ============================================================

-- 1) Set YOUR admin password (stored hashed). Change 'choose-a-strong-one'.
update public.app_config
   set value = crypt('choose-a-strong-one', gen_salt('bf'))
 where key = 'admin_password';

-- 2) Remove the demo learners once you add the real class.
delete from public.students
 where display_name in ('Demo Learner', 'Aanton M', 'Bongani K', 'Chloé V');

-- 3) Add your real class (first name + surname initial). Add/remove lines.
insert into public.students (display_name) values
  ('Name One S'),
  ('Name Two M'),
  ('Name Three K')
on conflict (display_name) do nothing;

-- Handy later:
--   add one:     insert into public.students (display_name) values ('New Name') on conflict do nothing;
--   remove one:  delete from public.students where display_name = 'Some Name';
--   open a quest: update public.quests set is_open = true  where quest_id = 'q4';
--   close a quest:update public.quests set is_open = false where quest_id = 'q4';
