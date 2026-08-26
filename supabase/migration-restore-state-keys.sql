-- ============================================================
--  RESTORE LOST LEARNER-STATE KEYS  (2026-08-26)
--
--  ✅ APPLIED TO LIVE 2026-08-26 (migration `restore_state_keys`).
--
--  WHAT BROKE: migration-cq-bridge.sql (2026-08-21 14:02) redefined
--  mhq_get_state from a base copy that predates phase 3, and
--  migration-dice.sql + migration-mood-cravings.sql (same day) each
--  copied the gap forward. Since then the learner state payload has
--  been missing THREE keys the client still reads:
--    • assignment — the pinned homework card (js/assignment.js) and
--      the red-book desk badge (hasActiveAssignment → blip.js:636).
--      Found 2026-08-26: Megan set homework and no learner could see it.
--    • boxes {pending, mystery} — the treasure-box card + modal title
--      (js/companion/treasure.js). Earning still worked (mhq_submit_quest
--      kept its box_grants + milestone_grants blocks); only the
--      ADVERTISING of an earned box was lost.
--    • trinkets — the household shelf (blip.js:1086).
--
--  THE FIX: the CURRENT live body (mood-cravings lineage: tray, mood,
--  cravings, cqLinked, dice — all kept byte-for-byte) plus the three
--  restored blocks, sourced from migration-phase3.sql §6 (assignment)
--  and migration-level-curve-40.sql §7 (boxes + trinkets).
--
--  ⚠️ COPY-FORWARD RULE (the lesson, again): before redefining
--  mhq_get_state, ALWAYS diff against the LIVE definition
--  (pg_get_functiondef), never against another migration file.
--  schema.sql is updated in the same commit as this file — keep it so.
-- ============================================================

create or replace function public.mhq_get_state(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; prog jsonb; total int; open_q jsonb; st record; shop jsonb; food jsonb; furn jsonb;
        blips_j jsonb; blip1 jsonb; health jsonb; stg int; is_qual boolean;
        can_feed boolean; can_care boolean; dice_j jsonb; lvl int;
        asg record; assignment_j jsonb := null; hw_done boolean; mystery int;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
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
