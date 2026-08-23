-- ============================================================
--  ⚠️ WRITTEN, NOT RUN. Pending on Megan (or the foreman) — apply at
--  ship time only, at the end of the Exam Focus build day.
--
--  Migration name: exam_xp_50
--
--  WHAT THIS DOES, and nothing else: re-creates ONE function,
--  public.mhq_exam_open_part, with its two pay literals changed from
--  75 XP / 10 gold to 50 XP / 5 gold. Her ruling, 2026-08-23 morning
--  (EXAM-BUILD-DAY.md, ruling 7): "XP: 50 XP + 5 💎 per card (was
--  75/10)". The exam bank is going from ~50 cards to several hundred
--  today, and at the old rate Exam Focus would have become by far the
--  fastest way to earn anything in the app.
--
--  IT SUPERSEDES THE PAY AMOUNTS IN supabase/migration-exam-focus.sql
--  AND NOTHING ELSE. Same function name, same argument types, same
--  SECURITY DEFINER, same pinned search_path, same body line for line,
--  same return shape. No table is touched, mhq_exam_state is not
--  re-created, and no other RPC is mentioned anywhere in this file.
--  migration-exam-focus.sql keeps its 75 / 10 on purpose — that file is
--  the applied history of what ran on 2026-08-21, not a live mirror.
--
--  ⚠️ THE GRANT IS RESTATED BELOW, DELIBERATELY. Postgres grants EXECUTE
--  to PUBLIC by default on CREATE FUNCTION, and `create or replace`
--  RESETS a function's privileges — so without the grant block at the
--  foot of this file, replacing the function would leave it callable by
--  anon straight through PostgREST with no explicit grant on record.
--  Restating it is what keeps the posture identical to the original.
--
--  ALREADY-PAID QUESTIONS ARE UNAFFECTED. The row's own `completed`
--  flag is still the dedupe: a card a learner finished yesterday paid
--  75/10 then and pays 0 now, exactly as before. Only cards completed
--  from here on pay the new rate. Nothing is clawed back and no
--  existing exam_progress row is read or written by this migration.
--
--  MIRRORED IN: js/config.js's EXAM block (display mirror only — 50 / 5),
--  js/local-backend.js (reads that block, so the offline ?local=1 mirror
--  follows automatically). verify-exam.html Part 5 cross-checks THIS
--  file's two literals against that block and fails if they drift.
--
--  ORDER-SAFE: run it before or after anything else; it depends only on
--  public.students, public.exam_progress, public._mhq_auth and
--  public._mhq_level, all of which already exist on live.
-- ============================================================


-- ============================================================
--  1. mhq_exam_open_part — identical to migration-exam-focus.sql's
--     version except for the two pay literals.
-- ============================================================
create or replace function public.mhq_exam_open_part(
  p_username text, p_password text, p_question_id text, p_part_id text, p_total_parts int)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_row record; v_parts jsonb; v_total int;
        v_now_completed boolean := false;
        v_xp_gain int := 0; v_gold_gain int := 0;
        v_old_xp int; v_new_xp int; v_new_gold int; v_old_lvl int; v_new_lvl int;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  if p_question_id is null or p_question_id = '' or p_part_id is null or p_part_id = '' then
    return jsonb_build_object('ok', false, 'error', 'bad_request');
  end if;
  -- content-shape data, not an amount — see this file's header judgement-call note.
  v_total := greatest(1, least(coalesce(p_total_parts, 1), 40));

  insert into public.exam_progress (student_id, question_id, parts_opened, updated_at)
  values (v_sid, p_question_id, '[]'::jsonb, now())
  on conflict (student_id, question_id) do nothing;

  select * into v_row from public.exam_progress
   where student_id = v_sid and question_id = p_question_id for update;

  -- the completed flag IS the dedupe: her ruling, "paid once per question
  -- ever" — a completed question replaying open_part (reviewing it again)
  -- records nothing further and pays nothing.
  if v_row.completed then
    return jsonb_build_object('ok', true, 'partsOpened', v_row.parts_opened,
      'completed', true, 'justCompleted', false, 'xpAwarded', 0, 'goldAwarded', 0);
  end if;

  v_parts := v_row.parts_opened;
  if not (v_parts @> to_jsonb(p_part_id)) then
    v_parts := v_parts || to_jsonb(p_part_id);
  end if;

  v_now_completed := (jsonb_array_length(v_parts) >= v_total);

  if v_now_completed then
    -- RE-RATED 2026-08-23 (her ruling 7, EXAM-BUILD-DAY.md): 75/10 -> 50/5.
    -- SERVER LITERALS — must mirror js/config.js's EXAM block;
    -- verify-exam.html Part 5 cross-checks the two never drift, and as of
    -- today it reads THIS file, not migration-exam-focus.sql.
    v_xp_gain := 50;    -- EXAM.xpPerQuestion
    v_gold_gain := 5;   -- EXAM.goldPerQuestion
  end if;

  update public.exam_progress
     set parts_opened = v_parts, completed = v_now_completed,
         completed_at = case when v_now_completed then now() else completed_at end,
         updated_at = now()
   where student_id = v_sid and question_id = p_question_id;

  if v_xp_gain > 0 or v_gold_gain > 0 then
    select xp into v_old_xp from public.students where id = v_sid for update;
    update public.students
       set xp = xp + v_xp_gain, gold = gold + v_gold_gain, last_active_at = now()
     where id = v_sid
     returning xp, gold into v_new_xp, v_new_gold;
    v_old_lvl := (public._mhq_level(v_old_xp)->>'level')::int;
    v_new_lvl := (public._mhq_level(v_new_xp)->>'level')::int;
  else
    select xp, gold into v_new_xp, v_new_gold from public.students where id = v_sid;
    v_old_lvl := (public._mhq_level(v_new_xp)->>'level')::int;
    v_new_lvl := v_old_lvl;
    update public.students set last_active_at = now() where id = v_sid;
  end if;

  return jsonb_build_object('ok', true, 'partsOpened', v_parts,
    'completed', v_now_completed, 'justCompleted', v_now_completed,
    'xpAwarded', v_xp_gain, 'goldAwarded', v_gold_gain,
    'xp', v_new_xp, 'gold', v_new_gold, 'level', v_new_lvl,
    'levelUp', (v_new_lvl > v_old_lvl), 'levelInfo', public._mhq_level(v_new_xp));
end; $$;


-- ============================================================
--  2. GRANTS — restated, because `create or replace function` resets a
--     function's privileges (see this file's header). Only the one
--     function this migration re-creates; mhq_exam_state is untouched
--     and keeps the grant it already has.
-- ============================================================
grant execute on function
  public.mhq_exam_open_part(text, text, text, text, integer)
to anon, authenticated;


-- ============================================================
--  sanity checks after running
-- ============================================================
--   select prosecdef, proconfig from pg_proc
--    where proname = 'mhq_exam_open_part';
--   -- expected: prosecdef = true, proconfig = {"search_path=public, extensions"}
--
--   select pg_get_functiondef('public.mhq_exam_open_part(text,text,text,text,integer)'::regprocedure)
--          like '%v_xp_gain := 50%' as pays_50;
--   -- expected: true
--
--   select has_function_privilege('anon',
--     'public.mhq_exam_open_part(text,text,text,text,integer)', 'execute');
--   -- expected: true
--
--   -- end to end, on a throwaway learner with a fresh question id:
--   select public.mhq_exam_open_part('someusername','somepassword','xp50.smoke.q1','a',2);
--   -- expected: ok:true, completed:false, xpAwarded:0
--   select public.mhq_exam_open_part('someusername','somepassword','xp50.smoke.q1','b',2);
--   -- expected: completed:true, justCompleted:true, xpAwarded:50, goldAwarded:5
--   select public.mhq_exam_open_part('someusername','somepassword','xp50.smoke.q1','a',2);
--   -- expected (replayed): justCompleted:false, xpAwarded:0
-- ============================================================
