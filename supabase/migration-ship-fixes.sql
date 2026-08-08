-- ============================================================
--  BLIPWORK — SHIP FIXES for the 2026-08-08 room build
--  Two small corrections flagged in the Fable review of S2.
--  ✅ APPLIED TO LIVE 2026-08-08 (migration `room_build_ship_fixes_roll_
--  loot_revoke_atomic_milestones`, via MCP, LAST — after
--  migration-level-curve-40.sql, migration-food-shop.sql and
--  migration-furniture-slots.sql). Do not run again.
--
--  FIX 1 — _mhq_roll_loot(text) was PUBLIC-executable. The curve
--  migration's comment claimed it was "deliberately NOT granted to anon",
--  but a newly created function is executable by PUBLIC by default, so
--  anon could call /rpc/_mhq_roll_loot. Harmless (it returns a random
--  loot-table id and writes nothing) but the comment was false; this
--  makes it true. Phase 3's zero-arg version had the same quiet gap and
--  was dropped by the curve migration.
--
--  FIX 2 — mhq_submit_quest appended milestone boxes via read-modify-
--  write: two SIMULTANEOUS submits crossing two DIFFERENT milestones
--  could lose one queue entry forever (the dedupe row would exist, so
--  the box could never be re-earned). Practically impossible for one
--  learner on one phone, but the fix is one statement: append to
--  students.milestone_boxes atomically inside the UPDATE itself.
--  The function below is otherwise BYTE-FOR-BYTE the curve migration's
--  §8 body (the version applied to live 2026-08-08) — only the
--  milestone block changed, plus v_mystery is re-read afterwards for
--  the return payload.
-- ============================================================

revoke execute on function public._mhq_roll_loot(text) from public, anon, authenticated;

create or replace function public.mhq_submit_quest(
  p_username text, p_password text, p_quest text,
  p_score numeric, p_xp int, p_total int, p_correct int)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_was_passed boolean := false; v_now_passed boolean;
        v_xp_gain int; v_gold_gain int := 10; v_old_xp int; v_new_xp int; v_new_gold int;
        v_old_lvl int; v_new_lvl int;
        v_asg_id uuid; v_box_awarded boolean := false; v_boxes int;
        v_ms int; v_rows int; v_mystery jsonb; v_ms_awarded int := 0;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  v_now_passed := (p_score >= 0.8);
  select progress.passed into v_was_passed
    from public.progress where progress.student_id = v_sid and progress.quest_id = p_quest;
  v_was_passed := coalesce(v_was_passed, false);
  if v_was_passed then
    v_xp_gain := round(greatest(0, least(coalesce(p_xp, 0), 1000)) * 0.25)::int;
  else
    v_xp_gain := greatest(0, least(coalesce(p_xp, 0), 1000));
  end if;

  insert into public.progress (student_id, quest_id, best_score, attempts, total_xp, passed, last_played_at)
  values (v_sid, p_quest, p_score, 1, v_xp_gain, v_now_passed, now())
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
end; $$;
