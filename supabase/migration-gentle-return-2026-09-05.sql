-- ============================================================
--  GENTLE RETURN FOR A LAPSED LEARNER — 2026-09-05
--  (fix day, Build 2; her ruling that day: "a good idea")
-- ============================================================
--  WHAT THIS DOES, IN PLAIN WORDS
--  A learner who has not opened the app for SEVEN OR MORE CALENDAR DAYS
--  finds a WELL Blip waiting instead of a critically sick one, and the room
--  says one warm line. Nothing else about him changes: today's free cookie
--  is still unclaimed and waiting to be fed, and nothing is unlocked that
--  would not have unlocked anyway. Sickness is there to nudge a kid who is
--  here; it must never be the thing that greets one who has been away.
--
--  HOW
--  One function is replaced: mhq_get_state. At the very start of the call —
--  BEFORE it stamps last_active_at with this visit — it now reads the
--  learner's PREVIOUS last_active_at. If that is null or 7+ calendar days
--  old AND _mhq_health says the Blip is at stage 2 or worse, it sets
--  last_fed_day = current_date (the sickness clock restarts) and
--  care_streak = 0, and the returned JSON carries welcomeBack: true.
--  last_cookie_day is deliberately NOT touched, so the daily cookie is
--  still there to feed. Every other field is computed exactly as before,
--  which is why the payload now reads stage 0.
--
--  welcomeBack is true only on the call that did the healing; a second call
--  the same day returns false and changes nothing (the first call's
--  last_active_at stamp makes the learner "here" again).
--
--  SAFETY
--  * Additive and idempotent: `create or replace function` on an unchanged
--    signature, so it may be run twice with no effect the second time, and
--    the function keeps its existing grants (PUBLIC/anon/authenticated/
--    service_role EXECUTE) — replacing a function does not reset its ACL.
--  * security definer + `set search_path = public, extensions` are carried
--    over from the live definition unchanged.
--  * The body below was derived from the LIVE definition (pg_get_functiondef
--    on 2026-09-05, md5 5f69ec26567aadf3ebd7d72cab1217e2) and is byte-for-
--    byte the same as supabase/schema.sql's copy in this commit.
--
--  WHEN TO RUN
--  Paste into the Supabase SQL editor AFTER
--  supabase/migration-audit-2026-09-05.sql. Run once. No table changes, no
--  data migration, nothing to seed.
-- ============================================================

create or replace function public.mhq_get_state(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; prog jsonb; total int; open_q jsonb; st record; shop jsonb; food jsonb; furn jsonb;
        blips_j jsonb; blip1 jsonb; health jsonb; stg int; is_qual boolean;
        can_feed boolean; can_care boolean; dice_j jsonb; lvl int;
        asg record; assignment_j jsonb := null; hw_done boolean; mystery int;
        prev_active timestamptz; prev_fed date; prev_streak int;
        welcome_back boolean := false;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;

  /* GENTLE RETURN (2026-09-05, her ruling: "a good idea"). A learner who has
     been away SEVEN OR MORE CALENDAR DAYS comes back to a WELL Blip, not a
     critical one. The sickness clock is meant to nudge a kid who is here; it
     must never be the thing that greets one who has been away.
     ⚠️ This block reads last_active_at BEFORE the stamp below — that stamp is
     THIS visit, so reading after it would always say "0 days away".
     Heals by moving the sickness clock (last_fed_day) to today and clearing
     the care streak. last_cookie_day is DELIBERATELY untouched, so today's
     free cookie is still there to be fed to him. The stage-3 shop and
     gallery locks are not special-cased here: healing to stage 0 lifts them
     the ordinary way, and they are otherwise left exactly as they were
     (her tick, 2026-09-05).
     welcome_back rides out in the payload so the room can say one warm line;
     it is true only on THIS call, so the line shows once and is gone on the
     next state load. */
  select last_active_at, last_fed_day, care_streak
    into prev_active, prev_fed, prev_streak
    from public.students where id = sid;
  if (prev_active is null or current_date - prev_active::date >= 7)
     and (public._mhq_health(prev_fed, prev_streak)->>'stage')::int >= 2 then
    update public.students set last_fed_day = current_date, care_streak = 0 where id = sid;
    welcome_back := true;
  end if;

  update public.students set last_active_at = now() where id = sid;
  perform public._mhq_ensure_blip(sid);
  select * into st from public.students where id = sid;

  -- S4b: a stale tray (yesterday's groceries) is discarded here too — no
  -- refund — and the clearing is written back so it is a fact on the row.
  if st.tray_day is not null and st.tray_day < current_date then
    update public.students set tray = '{}'::jsonb where id = sid;
    st.tray := '{}'::jsonb;
  end if;

  select coalesce(jsonb_object_agg(quest_id, jsonb_build_object(
            'best_score', best_score, 'attempts', attempts, 'total_xp', total_xp,
            'passed', passed, 'last_played_at', last_played_at)), '{}'::jsonb)
    into prog from public.progress where student_id = sid;
  select coalesce(sum(total_xp), 0) into total from public.progress where student_id = sid;
  select coalesce(jsonb_agg(quest_id order by sort), '[]'::jsonb) into open_q from public.quests where is_open;
  -- cosmetics only, exact existing shape
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', item_id, 'slot', slot, 'price', price, 'minLevel', min_level) order by sort), '[]'::jsonb)
    into shop from public.shop_items where active and category = 'cosmetic';
  -- pharmacy / grocery, separate array so `shop` keeps its shape.
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', item_id, 'kind', item_id, 'price', price, 'minLevel', min_level) order by sort), '[]'::jsonb)
    into food from public.shop_items where active and category = 'food';
  -- Room build S5v2 (2026-08-08): the furniture catalogue, in its own array
  -- so `shop` keeps its exact shape.
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', item_id, 'slot', slot, 'price', price, 'minLevel', min_level) order by sort), '[]'::jsonb)
    into furn from public.shop_items where active and category = 'furniture';

  health := public._mhq_health(st.last_fed_day, st.care_streak);
  stg := (health->>'stage')::int;
  lvl := (public._mhq_level(st.xp)->>'level')::int;

  -- MOOD METER + CRAVINGS (2026-08-21): mood decays at READ time; craving
  -- reads the shared _mhq_craving helper, the SAME one mhq_eat_food uses.
  select coalesce(jsonb_agg(jsonb_build_object(
            'slot', slot, 'name', name, 'colour', colour, 'feedCount', feed_count,
            'growthStage', public._mhq_growth(feed_count),
            'owned', owned_items, 'equipped', equipped,
            'mood', public._mhq_mood_effective(mood, mood_day),
            'craving', public._mhq_craving(id, lvl)) order by slot), '[]'::jsonb)
    into blips_j from public.blips where student_id = sid;
  -- back-compat: `blip` = slot 1 (the existing UI reads this object)
  select jsonb_build_object('name', name, 'colour', colour, 'owned', owned_items, 'equipped', equipped)
    into blip1 from public.blips where student_id = sid and slot = 1;

  is_qual  := public._mhq_is_qual_day();
  -- S4: the cookie reads its OWN stamp.
  can_feed := (stg < 2) and (st.last_cookie_day is null or st.last_cookie_day < current_date);
  can_care := (stg >= 2) and is_qual and (st.last_care_day is null or st.last_care_day < current_date);

  -- DICE-PLAN.md, session 0b: the ONE new field.
  select coalesce(jsonb_object_agg(chapter, jsonb_build_object(
            'plays', plays, 'metKinds', met_kinds, 'save', save)), '{}'::jsonb)
    into dice_j from public.dice_plays where student_id = sid;

  -- RESTORED (phase 3, 2026-07-19; lost 2026-08-21, back 2026-08-26).
  -- `done` comes from box_grants, not progress.passed — passed stays true
  -- forever once earned, so it cannot say whether THIS assignment was done.
  select * into asg from public.assignments where assignments.active limit 1;
  if found then                       -- FOUND, not asg.id: an empty SELECT INTO
    select exists(select 1 from public.box_grants   -- leaves the record null-valued
                   where box_grants.student_id = sid
                     and box_grants.assignment_id = asg.id) into hw_done;
    assignment_j := jsonb_build_object(
      'questId', asg.quest_id, 'note', asg.note,
      'assignedOn', asg.assigned_on, 'dueOn', asg.due_on, 'done', hw_done);
  end if;

  -- RESTORED (room build S2, 2026-08-08; lost 2026-08-21, back 2026-08-26).
  mystery := jsonb_array_length(coalesce(st.milestone_boxes, '[]'::jsonb));

  return jsonb_build_object('ok', true,
    'student', jsonb_build_object('id', sid, 'name', st.display_name, 'username', lower(p_username)),
    'progress', prog, 'totalXp', total, 'openQuests', open_q,
    'gold', st.gold, 'xp', st.xp, 'levelInfo', public._mhq_level(st.xp),
    'blip', blip1, 'blips', blips_j, 'shop', shop, 'foodShop', food, 'furnitureShop', furn,
    'pantry', st.pantry, 'tray', coalesce(st.tray, '{}'::jsonb), 'health', health,
    'canFeedToday', can_feed, 'canCareToday', can_care,
    -- GENTLE RETURN (2026-09-05): true only on the call that healed him.
    'welcomeBack', welcome_back,
    'cqLinked', (st.cq_name is not null),
    'dice', dice_j,
    'termRunning', (select coalesce((value = 'true'), false) from public.app_config where key = 'term_running'),
    'assignment', assignment_j,
    -- S2: `pending` is the TOTAL (homework + milestone); `mystery` titles the modal.
    'boxes', jsonb_build_object(
       'pending', coalesce(st.boxes_pending, 0) + mystery,
       'mystery', mystery),
    'trinkets', coalesce(st.trinkets, '[]'::jsonb));
end; $$;
