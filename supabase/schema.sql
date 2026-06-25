-- ============================================================
--  MATHS QUEST — Supabase schema, security & RPC API
--  Run this whole file once in the Supabase SQL editor.
--
--  SECURITY MODEL (same as the circle-geometry game):
--   • Every table has Row-Level Security ON with NO policies, so the
--     public publishable key can never read or write a table directly.
--   • All reads/writes go through SECURITY DEFINER functions that
--     verify the supplied password SERVER-SIDE before doing anything.
--   • Learner passwords are stored readable (plaintext) ON PURPOSE so
--     the teacher can read a forgotten one back from the admin panel.
--   • The admin password is stored HASHED (bcrypt via pgcrypto).
--   • The service-role / secret key is never needed by the app.
-- ============================================================

create extension if not exists pgcrypto with schema extensions;

-- ---------- tables ----------
create table if not exists public.students (
  id             uuid primary key default gen_random_uuid(),
  display_name   text unique not null,
  password       text,                       -- null until first login; readable by design
  created_at     timestamptz not null default now(),
  last_active_at timestamptz
);

-- one row per quest; the teacher opens/closes each independently
create table if not exists public.quests (
  quest_id  text primary key,               -- 'q1'..'q8'
  chapter   text not null default 'stats',
  is_open   boolean not null default false,  -- closed quests are hidden from learners
  sort      int not null default 0
);

create table if not exists public.progress (
  id             uuid primary key default gen_random_uuid(),
  student_id     uuid not null references public.students(id) on delete cascade,
  quest_id       text not null,
  best_score     numeric not null default 0,  -- 0..1 (first-try fraction)
  attempts       int not null default 0,
  total_xp       int not null default 0,
  passed         boolean not null default false,
  last_played_at timestamptz,
  unique (student_id, quest_id)
);

-- struggle flags: one row per (student, concept), counting repeated misses + "I'm lost"
create table if not exists public.struggles (
  id          uuid primary key default gen_random_uuid(),
  student_id  uuid not null references public.students(id) on delete cascade,
  concept     text not null,
  count       int not null default 0,
  last_ts     timestamptz not null default now(),
  unique (student_id, concept)
);

-- key/value config: admin_password (hashed)
create table if not exists public.app_config (
  key   text primary key,
  value text
);

-- ---------- lock everything down ----------
alter table public.students   enable row level security;
alter table public.quests     enable row level security;
alter table public.progress   enable row level security;
alter table public.struggles  enable row level security;
alter table public.app_config enable row level security;
-- (no policies created => publishable/anon key gets nothing directly)

revoke all on public.students, public.quests, public.progress, public.struggles, public.app_config from anon, authenticated;

-- ============================================================
--  HELPERS
-- ============================================================
-- verify a learner; returns the student id or null
create or replace function public._mhq_auth(p_name text, p_password text)
returns uuid language sql stable security definer set search_path = public, extensions as $$
  select id from public.students
  where display_name = p_name and password is not null and password = p_password;
$$;

-- verify the admin password against the bcrypt hash in app_config
create or replace function public._mhq_admin_ok(p_admin_password text)
returns boolean language sql stable security definer set search_path = public, extensions as $$
  select coalesce(
    (select value = crypt(p_admin_password, value) from public.app_config where key = 'admin_password'),
    false);
$$;

-- ============================================================
--  LEARNER RPC
-- ============================================================
-- names + whether a password is set (NO passwords). Safe for the name picker.
create or replace function public.mhq_list_students()
returns table (id uuid, display_name text, has_password boolean)
language sql stable security definer set search_path = public, extensions as $$
  select id, display_name, (password is not null) from public.students order by display_name;
$$;

create or replace function public.mhq_login(p_name text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare s public.students;
begin
  select * into s from public.students where display_name = p_name;
  if not found then return jsonb_build_object('ok', false, 'error', 'no_such_user'); end if;
  if s.password is null then return jsonb_build_object('ok', false, 'firstLogin', true); end if;
  if s.password <> p_password then return jsonb_build_object('ok', false, 'error', 'wrong_password'); end if;
  update public.students set last_active_at = now() where id = s.id;
  return jsonb_build_object('ok', true);
end; $$;

create or replace function public.mhq_first_login(p_name text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare s public.students;
begin
  if length(coalesce(p_password,'')) < 4 then return jsonb_build_object('ok', false, 'error', 'too_short'); end if;
  select * into s from public.students where display_name = p_name;
  if not found then return jsonb_build_object('ok', false, 'error', 'no_such_user'); end if;
  if s.password is not null then return jsonb_build_object('ok', false, 'error', 'already_set'); end if;
  update public.students set password = p_password, last_active_at = now() where id = s.id;
  return jsonb_build_object('ok', true);
end; $$;

create or replace function public.mhq_get_state(p_name text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; prog jsonb; total int; open_q jsonb;
begin
  sid := public._mhq_auth(p_name, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  update public.students set last_active_at = now() where id = sid;

  select coalesce(jsonb_object_agg(quest_id, jsonb_build_object(
            'best_score', best_score, 'attempts', attempts, 'total_xp', total_xp,
            'passed', passed, 'last_played_at', last_played_at)), '{}'::jsonb)
    into prog from public.progress where student_id = sid;

  select coalesce(sum(total_xp), 0) into total from public.progress where student_id = sid;

  select coalesce(jsonb_agg(quest_id order by sort), '[]'::jsonb) into open_q
    from public.quests where is_open;

  return jsonb_build_object('ok', true,
    'student', jsonb_build_object('id', sid, 'name', p_name),
    'progress', prog, 'totalXp', total, 'openQuests', open_q);
end; $$;

create or replace function public.mhq_submit_quest(
  p_name text, p_password text, p_quest text,
  p_score numeric, p_xp int, p_total int, p_correct int)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; was_passed boolean := false; now_passed boolean; xp_award int;
begin
  sid := public._mhq_auth(p_name, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  now_passed := (p_score >= 0.8);

  select passed into was_passed from public.progress where student_id = sid and quest_id = p_quest;
  was_passed := coalesce(was_passed, false);

  -- Anti-farming: once a quest has been passed, replays earn 0 XP. Amount is
  -- clamped here too, so a tampered client cannot inject huge XP.
  if was_passed then xp_award := 0; else xp_award := greatest(0, least(coalesce(p_xp, 0), 1000)); end if;

  insert into public.progress (student_id, quest_id, best_score, attempts, total_xp, passed, last_played_at)
  values (sid, p_quest, p_score, 1, xp_award, now_passed, now())
  on conflict (student_id, quest_id) do update set
    best_score = greatest(public.progress.best_score, excluded.best_score),
    attempts   = public.progress.attempts + 1,
    total_xp   = public.progress.total_xp + excluded.total_xp,
    passed     = public.progress.passed or excluded.passed,
    last_played_at = now();

  update public.students set last_active_at = now() where id = sid;

  return jsonb_build_object('ok', true, 'passed', now_passed,
    'badgeEarned', (now_passed and not was_passed),
    'xpAwarded', xp_award, 'alreadyPassed', was_passed);
end; $$;

-- log a struggle (a repeated miss or an "I'm lost" press) against a concept
create or replace function public.mhq_log_struggle(p_name text, p_password text, p_concept text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid;
begin
  sid := public._mhq_auth(p_name, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  insert into public.struggles (student_id, concept, count, last_ts)
  values (sid, p_concept, 1, now())
  on conflict (student_id, concept) do update set
    count = public.struggles.count + 1, last_ts = now();
  return jsonb_build_object('ok', true);
end; $$;

-- ============================================================
--  ADMIN RPC  (every function checks the admin password)
-- ============================================================
create or replace function public.mhq_admin_login(p_admin_password text)
returns jsonb language sql security definer set search_path = public, extensions as $$
  select jsonb_build_object('ok', public._mhq_admin_ok(p_admin_password));
$$;

create or replace function public.mhq_admin_data(p_admin_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare rows jsonb; qs jsonb; strug jsonb;
begin
  if not public._mhq_admin_ok(p_admin_password) then return jsonb_build_object('ok', false, 'error', 'auth'); end if;

  select coalesce(jsonb_agg(jsonb_build_object(
      'id', s.id, 'name', s.display_name, 'password', s.password,  -- readable, admin-only, by design
      'lastActive', s.last_active_at,
      'totalXp', coalesce((select sum(total_xp) from public.progress p where p.student_id = s.id), 0),
      'quests', coalesce((select jsonb_object_agg(quest_id, jsonb_build_object(
                  'best_score', best_score, 'attempts', attempts, 'passed', passed,
                  'last_played_at', last_played_at)) from public.progress p where p.student_id = s.id), '{}'::jsonb)
    ) order by s.display_name), '[]'::jsonb)
  into rows from public.students s;

  select coalesce(jsonb_agg(jsonb_build_object('quest_id', quest_id, 'is_open', is_open) order by sort), '[]'::jsonb)
  into qs from public.quests;

  select coalesce(jsonb_agg(j order by (j->>'count')::int desc), '[]'::jsonb) into strug
  from (
    select jsonb_build_object('concept', concept, 'count', sum(count), 'students', count(distinct student_id)) j
    from public.struggles group by concept
  ) t;

  return jsonb_build_object('ok', true, 'rows', rows, 'quests', qs, 'struggles', strug, 'inactiveDays', 7);
end; $$;

create or replace function public.mhq_admin_set_quest_open(p_admin_password text, p_quest text, p_open boolean)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public._mhq_admin_ok(p_admin_password) then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  update public.quests set is_open = p_open where quest_id = p_quest;
  return jsonb_build_object('ok', true);
end; $$;

create or replace function public.mhq_admin_reset_password(p_admin_password text, p_id uuid)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public._mhq_admin_ok(p_admin_password) then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  update public.students set password = null where id = p_id;
  return jsonb_build_object('ok', true);
end; $$;

create or replace function public.mhq_admin_add_student(p_admin_password text, p_name text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public._mhq_admin_ok(p_admin_password) then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  insert into public.students (display_name) values (p_name) on conflict (display_name) do nothing;
  return jsonb_build_object('ok', true);
end; $$;

create or replace function public.mhq_admin_remove_student(p_admin_password text, p_id uuid)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public._mhq_admin_ok(p_admin_password) then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  delete from public.students where id = p_id;
  return jsonb_build_object('ok', true);
end; $$;

-- clear the struggle flags for a concept once the teacher has addressed it
create or replace function public.mhq_admin_resolve_struggle(p_admin_password text, p_concept text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public._mhq_admin_ok(p_admin_password) then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  delete from public.struggles where concept = p_concept;
  return jsonb_build_object('ok', true);
end; $$;

-- ============================================================
--  GRANTS — the publishable/anon key may only EXECUTE the API
-- ============================================================
grant execute on function
  public.mhq_list_students(),
  public.mhq_login(text, text),
  public.mhq_first_login(text, text),
  public.mhq_get_state(text, text),
  public.mhq_submit_quest(text, text, text, numeric, int, int, int),
  public.mhq_log_struggle(text, text, text),
  public.mhq_admin_login(text),
  public.mhq_admin_data(text),
  public.mhq_admin_set_quest_open(text, text, boolean),
  public.mhq_admin_reset_password(text, uuid),
  public.mhq_admin_add_student(text, text),
  public.mhq_admin_remove_student(text, uuid),
  public.mhq_admin_resolve_struggle(text, text)
to anon, authenticated;

-- ============================================================
--  SEED — quests, a few demo learners, and the admin password.
--  Quests q1–q3 start OPEN so you can test immediately; open the
--  rest from the admin panel as you teach them.
--  ⚠ Replace the demo learners with your real class privately (see
--    seed-private.sql) and CHANGE the admin password below.
-- ============================================================
insert into public.quests (quest_id, chapter, is_open, sort) values
  ('q1','stats',true ,1), ('q2','stats',true ,2), ('q3','stats',true ,3),
  ('q4','stats',false,4), ('q5','stats',false,5), ('q6','stats',false,6),
  ('q7','stats',false,7), ('q8','stats',false,8)
on conflict (quest_id) do nothing;

insert into public.students (display_name) values
  ('Demo Learner'), ('Aanton M'), ('Bongani K'), ('Chloé V')
on conflict (display_name) do nothing;

-- admin password — default 'admin'. CHANGE IT (see seed-private.sql).
insert into public.app_config (key, value) values ('admin_password', crypt('admin', gen_salt('bf')))
on conflict (key) do nothing;
