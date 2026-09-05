-- ============================================================
--  ⚠️ WRITTEN, NOT RUN. Nothing in this file has touched the live
--  database. Build 1 of the 2026-09-05 fix day wrote it; the foreman
--  applies it at ship time on Megan's word (or she pastes it into the
--  Supabase SQL editor herself).
--
--  BLIPWORK — 🔒 BACK-END SEAL + CLAMP + DATA TIDY
--  Follow-up to the read-only audit of 2026-09-05 (AUDIT-2026-09-05.md).
--
--  WHAT THIS DOES, IN PLAIN WORDS
--   1. Shuts the shop-price table (`shop_items`) again. It was closed to
--      the public key in schema.sql, but a later migration re-created the
--      table and Postgres handed the default "everyone" rights straight
--      back. Nothing in the app reads that table from the browser, so
--      closing it changes nothing a learner or Megan can see.
--   2. Locks ten internal helper functions so only the server can run
--      them. They are the plumbing behind the real API calls; none of
--      them is ever called from a phone. The push robot DOES call two of
--      them, so those get an explicit server grant (see the warning
--      below).
--   3. Puts sane limits on what a submitted round may claim: a score
--      between 0 and 1, and at most 500 XP. Nothing about gold changes.
--   4. Three small data tidies Megan asked for.
--
--  SAFE TO RUN TWICE. Every statement is a revoke, a grant, a
--  create-or-replace, or an update/delete addressed by primary key.
--
--  ⚠️ DO NOT DROP THE service_role GRANTS IN SECTION 2. The `send-push`
--  edge function runs as the service role and calls
--  `_mhq_is_qual_day()` and `_mhq_health(date, integer)`. Those two
--  explicit grants are what keep the 07:00 and 17:00 push notifications
--  alive. service_role inherits PUBLIC's rights, so revoking from PUBLIC
--  without re-granting would silently kill the pushes.
--
--  Order does not matter against the app: nothing here changes any
--  function signature the browser calls, so this file can be applied
--  before or after the code push.
-- ============================================================


-- ============================================================
--  1. shop_items — close it to the publishable (anon) key again
--
--  schema.sql:319 already revokes this. migration-store-expansion.sql
--  re-created the table, and a freshly created table in this project
--  gets the default grants for anon and authenticated. Live on
--  2026-09-05 read: anon=arwdDxtm, authenticated=arwdDxtm.
--  The shop prices reach the browser through mhq_get_state, never by a
--  direct table read, so no learner or admin screen changes.
-- ============================================================
revoke all on table public.shop_items from anon, authenticated;


-- ============================================================
--  2. Seal the ten internal helpers
--
--  Shape from the Circle Quest seal (2026-08-15): revoke from PUBLIC as
--  well as anon and authenticated (service_role inherits PUBLIC, so a
--  bare revoke would take it away from the server too), then grant back
--  to service_role explicitly. Target ACL after this =
--  {postgres, service_role} — the same as mhq_auth_ok and
--  mhq_admin_ok_rpc already have.
--
--  Signatures verified against live pg_proc on 2026-09-05.
--  exam_name_key is safe to seal: the sept2024-check site calls only the
--  exam_* RPCs, never this helper.
-- ============================================================
revoke execute on function public._mhq_admin_ok(text)            from public, anon, authenticated;
revoke execute on function public._mhq_auth(text, text)          from public, anon, authenticated;
revoke execute on function public._mhq_ensure_blip(uuid)         from public, anon, authenticated;
revoke execute on function public._mhq_health(date, integer)     from public, anon, authenticated;
revoke execute on function public._mhq_is_qual_day()             from public, anon, authenticated;
revoke execute on function public._mhq_tray(jsonb, date)         from public, anon, authenticated;
revoke execute on function public._mhq_dice_xp(jsonb)            from public, anon, authenticated;
revoke execute on function public._mhq_growth(integer)           from public, anon, authenticated;
revoke execute on function public._mhq_level(integer)            from public, anon, authenticated;
revoke execute on function public.exam_name_key(text)            from public, anon, authenticated;

grant execute on function public._mhq_admin_ok(text)             to service_role;
grant execute on function public._mhq_auth(text, text)           to service_role;
grant execute on function public._mhq_ensure_blip(uuid)          to service_role;
grant execute on function public._mhq_health(date, integer)      to service_role;  -- ⚠️ send-push
grant execute on function public._mhq_is_qual_day()              to service_role;  -- ⚠️ send-push
grant execute on function public._mhq_tray(jsonb, date)          to service_role;
grant execute on function public._mhq_dice_xp(jsonb)             to service_role;
grant execute on function public._mhq_growth(integer)            to service_role;
grant execute on function public._mhq_level(integer)             to service_role;
grant execute on function public.exam_name_key(text)             to service_role;


-- ============================================================
--  3. mhq_submit_quest — clamp the score, lower the XP cap
--
--  Body copied from LIVE pg_get_functiondef on 2026-09-05 (standing
--  ruling 2026-08-26: never rebuild a live function from schema.sql).
--  Two changes only:
--    * p_score is clamped to [0, 1] before it is used, so a bad or
--      hand-made call can no longer write a best_score above 100% or
--      below zero. The pass test (>= 0.8) reads the clamped value.
--    * the XP cap drops from 1000 to 500. The largest honest round on
--      record paid 465, so no real round is affected.
--  Gold is UNCHANGED: every submit still pays 10 gold, exactly as today
--  (her call, 2026-09-05).
-- ============================================================
create or replace function public.mhq_submit_quest(p_username text, p_password text, p_quest text, p_score numeric, p_xp integer, p_total integer, p_correct integer)
 returns jsonb
 language plpgsql
 security definer
 set search_path to 'public', 'extensions'
as $function$
declare v_sid uuid; v_was_passed boolean := false; v_now_passed boolean;
        v_score numeric;
        v_xp_gain int; v_gold_gain int := 10; v_old_xp int; v_new_xp int; v_new_gold int;
        v_old_lvl int; v_new_lvl int;
        v_asg_id uuid; v_box_awarded boolean := false; v_boxes int;
        v_ms int; v_rows int; v_mystery jsonb; v_ms_awarded int := 0;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  -- AUDIT 2026-09-05: a score is a fraction of one round. Clamp it.
  v_score := greatest(0::numeric, least(coalesce(p_score, 0::numeric), 1::numeric));
  v_now_passed := (v_score >= 0.8);
  select progress.passed into v_was_passed
    from public.progress where progress.student_id = v_sid and progress.quest_id = p_quest;
  v_was_passed := coalesce(v_was_passed, false);
  -- AUDIT 2026-09-05: XP cap 1000 -> 500 (largest honest round: 465).
  if v_was_passed then
    v_xp_gain := round(greatest(0, least(coalesce(p_xp, 0), 500)) * 0.25)::int;
  else
    v_xp_gain := greatest(0, least(coalesce(p_xp, 0), 500));
  end if;

  insert into public.progress (student_id, quest_id, best_score, attempts, total_xp, passed, last_played_at)
  values (v_sid, p_quest, v_score, 1, v_xp_gain, v_now_passed, now())
  on conflict (student_id, quest_id) do update set
    best_score = greatest(public.progress.best_score, excluded.best_score),
    attempts   = public.progress.attempts + 1,
    total_xp   = public.progress.total_xp + excluded.total_xp,
    passed     = public.progress.passed or excluded.passed,
    last_played_at = now();

  select students.xp into v_old_xp from public.students where students.id = v_sid;
  update public.students
     set last_active_at = now(), xp = students.xp + v_xp_gain, gold = students.gold + v_gold_gain
   where students.id = v_sid
   returning students.xp, students.gold into v_new_xp, v_new_gold;

  -- Homework treasure box (phase 3) — unchanged.
  if v_now_passed then
    select assignments.id into v_asg_id
      from public.assignments
     where assignments.active and assignments.quest_id = p_quest
     limit 1;

    if v_asg_id is not null then
      insert into public.box_grants (student_id, assignment_id)
      values (v_sid, v_asg_id)
      on conflict (student_id, assignment_id) do nothing;

      if found then
        update public.students
           set boxes_pending = students.boxes_pending + 1
         where students.id = v_sid
         returning students.boxes_pending into v_boxes;
        v_box_awarded := true;
      end if;
    end if;
  end if;

  if v_boxes is null then
    select students.boxes_pending into v_boxes from public.students where students.id = v_sid;
  end if;

  v_old_lvl := (public._mhq_level(v_old_xp)->>'level')::int;
  v_new_lvl := (public._mhq_level(v_new_xp)->>'level')::int;

  -- Milestone mystery boxes. SHIP FIX 2: the queue append happens INSIDE
  -- the update statement (atomic), never via a variable read earlier —
  -- two concurrent submits can no longer overwrite each other's append.
  -- The `>=` test and the primary-key dedupe are unchanged from S2.
  if v_new_lvl >= 10 then
    for v_ms in select m from unnest(array[10, 20, 30, 40]) m where m <= v_new_lvl order by m loop
      insert into public.milestone_grants (student_id, milestone)
      values (v_sid, v_ms)
      on conflict (student_id, milestone) do nothing;
      get diagnostics v_rows = row_count;
      if v_rows > 0 then
        update public.students
           set milestone_boxes = coalesce(students.milestone_boxes, '[]'::jsonb) || to_jsonb(v_ms)
         where students.id = v_sid;
        v_ms_awarded := v_ms_awarded + 1;
      end if;
    end loop;
  end if;

  -- re-read for the return payload (the appends above are already facts)
  select coalesce(students.milestone_boxes, '[]'::jsonb) into v_mystery
    from public.students where students.id = v_sid;

  return jsonb_build_object('ok', true, 'passed', v_now_passed,
    'badgeEarned', (v_now_passed and not v_was_passed), 'xpAwarded', v_xp_gain,
    'alreadyPassed', v_was_passed, 'goldAwarded', v_gold_gain,
    'xp', v_new_xp, 'gold', v_new_gold, 'level', v_new_lvl,
    'levelUp', (v_new_lvl > v_old_lvl), 'levelInfo', public._mhq_level(v_new_xp),
    'boxAwarded', v_box_awarded,
    'mysteryAwarded', v_ms_awarded,
    'boxes', jsonb_build_object(
       'pending', coalesce(v_boxes, 0) + jsonb_array_length(v_mystery),
       'mystery', jsonb_array_length(v_mystery)));
end; $function$;

-- create or replace keeps the existing grants, but state them anyway so
-- this file alone describes the end state.
grant execute on function public.mhq_submit_quest(text, text, text, numeric, int, int, int) to anon, authenticated;


-- ============================================================
--  4. DATA TIDY — three rows, each addressed by its id
--
--  4a. Delete the leftover "Test" note Megan sent herself on 2026-08-24
--      while the feedback button was being built. One row matched on
--      2026-09-05; it is deleted by id, never by its text.
--  4b. Mark the anonymous note of 2026-09-04 10:12 UTC as read. That is
--      the "swipe back to my question" ask from Fun Functions, and it
--      shipped in sw v90 on 2026-09-04 evening. It is still showing as
--      unread on her feedback screen.
--  4c. Switch off the t1 homework assignment. It was set on 2026-09-02
--      and was due 2026-09-04, so it is past due and still flagged as
--      the live assignment on every learner's home screen.
-- ============================================================

-- 4a
delete from public.feedback where id = '9c06c951-c863-454b-aa85-80f96bffe198';

-- 4b
update public.feedback
   set read_at = now()
 where id = '274e48b5-ada5-4ece-8317-7db1cd6fb627' and read_at is null;

-- 4c
update public.assignments
   set active = false
 where id = '6ca7bcc8-54f6-4897-bef9-28a31207edc6' and active;


-- ============================================================
--  DONE. After running, these should all be true:
--    has_function_privilege('anon', 'public._mhq_admin_ok(text)', 'execute')          = false
--    has_function_privilege('authenticated', 'public._mhq_admin_ok(text)', 'execute') = false
--    has_function_privilege('service_role', 'public._mhq_health(date,integer)', 'execute') = true
--    has_function_privilege('service_role', 'public._mhq_is_qual_day()', 'execute')   = true
--    has_table_privilege('anon', 'public.shop_items', 'select')                       = false
--  and an anon REST read of shop_items answers 42501 permission denied
--  instead of an empty list.
-- ============================================================
