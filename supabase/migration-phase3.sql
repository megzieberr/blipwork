-- ============================================================
--  BLIPWORK — PHASE 3 MIGRATION  (2026-07-19)
--  Sick-stage push warnings · teacher-assigned homework · treasure box
--
--  Additive and idempotent: safe to run more than once, and it never
--  drops or rewrites Phase 1/2 data. Run the WHOLE file in the Supabase
--  SQL editor (project pjpwhalcifywjrwtjknd).
--
--  Design rulings this file enforces (see homework-hub-companion/
--  PHASE-3-PLAN.md for the reasoning):
--    • Push fires on stage TRANSITIONS only (day 3 / 5 / 6), never daily,
--      and never at critical — one push per learner per day, server-side.
--    • ONE active assignment at a time. No penalty, no overdue state.
--      Assigning never opens a closed quest.
--    • ONE treasure box per completed assignment, deduped by box_grants
--      so replays cannot farm boxes. Loot weights live in the DB and are
--      never sent to the client.
--
--  ⚠️ PL/pgSQL lesson from Phase 2 (a bare `slot = slot` silently matched
--  every row and broke buy/equip): every local variable in this file is
--  v_-prefixed and every column reference is table-qualified. Keep that up.
-- ============================================================


-- ============================================================
--  1. TABLES
-- ============================================================

-- Web-push subscriptions. One row per DEVICE (a learner may install on a
-- phone and a tablet); endpoint is the natural key the push service gives us.
-- last_push_day / last_push_stage are the anti-nag record: the daily job
-- refuses to send twice in a day, or twice at the same message level.
-- ⚠️ last_push_stage is the MESSAGE LEVEL (1 = tired, 2 = bedridden,
-- 3 = last warning), NOT the health stage. They deliberately differ: health
-- stage 2 spans days 5 AND 6, so day 6's final warning is invisible at health
-- -stage granularity. The edge function maps daysUnfed (3/5/6) to these levels.
create table if not exists public.push_subscriptions (
  student_id      uuid not null references public.students(id) on delete cascade,
  endpoint        text primary key,
  sub             jsonb not null,               -- full PushSubscription JSON
  created_at      timestamptz not null default now(),
  last_push_day   date,
  last_push_stage integer
);
create index if not exists push_subscriptions_student_idx
  on public.push_subscriptions (student_id);

-- Teacher's "today's homework". Kept as an append-only log with a single
-- active row rather than one mutable row, so the history of what was set
-- survives — and so box_grants can reference a stable assignment id.
create table if not exists public.assignments (
  id          uuid primary key default gen_random_uuid(),
  quest_id    text not null,
  note        text,
  assigned_on date not null default current_date,
  due_on      date,
  active      boolean not null default true,
  created_at  timestamptz not null default now()
);
-- At most one active assignment, enforced by the database rather than by
-- convention (the admin RPC deactivates the old one first, but a partial
-- unique index means a bug can never produce two).
create unique index if not exists assignments_one_active_idx
  on public.assignments (active) where active;

-- One box per (student, assignment). The primary key IS the dedupe: a
-- replay of the same assigned quest finds the row already there and grants
-- nothing. Also doubles as the "has she completed the assignment?" record,
-- which is more honest than reading progress.passed (that stays true
-- forever once earned, so it cannot tell us about THIS assignment).
create table if not exists public.box_grants (
  student_id    uuid not null references public.students(id) on delete cascade,
  assignment_id uuid not null references public.assignments(id) on delete cascade,
  granted_at    timestamptz not null default now(),
  primary key (student_id, assignment_id)
);

-- Loot table. Weights are relative, not percentages — they need not total
-- 100, the roll normalises. Kept in the DB so Megan can retune drop rates
-- without a deploy, and so rates never reach the client.
create table if not exists public.loot_table (
  id         text primary key,
  kind       text not null check (kind in ('gold', 'food', 'cosmetic')),
  item_id    text,                              -- null for gold + cosmetic (cosmetic is rolled from the unowned pool)
  amount_min integer not null default 1,
  amount_max integer not null default 1,
  weight     integer not null check (weight > 0),
  active     boolean not null default true,
  sort       integer not null default 0
);

alter table public.students add column if not exists boxes_pending integer not null default 0;

-- ---------- lock the new tables down (same posture as Phase 1/2:
-- ---------- RLS on, no policies, all access through SECURITY DEFINER RPCs)
alter table public.push_subscriptions enable row level security;
alter table public.assignments        enable row level security;
alter table public.box_grants         enable row level security;
alter table public.loot_table         enable row level security;
revoke all on public.push_subscriptions, public.assignments, public.box_grants, public.loot_table
  from anon, authenticated;


-- ============================================================
--  2. SEED — loot weights  (TUNABLE: edit weight, re-run this block)
--     gold 55 · food 30 · cosmetic 15, per the phase-3 plan.
--     Food loot is soup/medicine only: the cookie is the FREE daily feed
--     and is not a pantry item, so a box that "contains a cookie" would
--     have nowhere to put it. Stocking the pharmacy is also a kinder
--     safety net — a learner who fell ill gets help toward recovery.
-- ============================================================
insert into public.loot_table (id, kind, item_id, amount_min, amount_max, weight, sort) values
  ('gold-small', 'gold',     null,       15, 25, 35, 1),
  ('gold-big',   'gold',     null,       26, 40, 20, 2),
  ('food-soup',  'food',     'soup',      1,  1, 16, 3),
  ('food-med',   'food',     'medicine',  1,  1, 14, 4),
  ('cosmetic',   'cosmetic', null,        1,  1, 15, 5)
on conflict (id) do nothing;


-- ============================================================
--  3. PUSH SUBSCRIPTIONS  (learner-facing)
-- ============================================================

-- Re-subscribing with the same endpoint updates the row rather than
-- erroring — browsers hand back the same endpoint on every app open.
create or replace function public.mhq_push_subscribe(p_username text, p_password text, p_sub jsonb)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_endpoint text;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  v_endpoint := p_sub->>'endpoint';
  if v_endpoint is null or v_endpoint = '' then
    return jsonb_build_object('ok', false, 'error', 'bad_subscription');
  end if;

  insert into public.push_subscriptions (student_id, endpoint, sub)
  values (v_sid, v_endpoint, p_sub)
  on conflict (endpoint) do update
    set student_id = excluded.student_id, sub = excluded.sub;

  return jsonb_build_object('ok', true);
end; $$;

create or replace function public.mhq_push_unsubscribe(p_username text, p_password text, p_endpoint text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  delete from public.push_subscriptions
    where student_id = v_sid and push_subscriptions.endpoint = p_endpoint;
  return jsonb_build_object('ok', true);
end; $$;


-- ============================================================
--  4. ASSIGNMENTS  (teacher-facing)
-- ============================================================

-- Setting homework deactivates whatever was active and inserts a fresh row.
-- Deliberately does NOT open the quest: opening is a separate teaching
-- decision, and silently opening one here would let a slip of the finger
-- expose an untaught section. The admin UI only offers open quests.
create or replace function public.mhq_admin_set_assignment(
  p_admin_password text, p_quest_id text, p_due date, p_note text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_is_open boolean; v_row public.assignments;
begin
  if not public._mhq_admin_ok(p_admin_password) then
    return jsonb_build_object('ok', false, 'error', 'auth');
  end if;

  select quests.is_open into v_is_open from public.quests where quests.quest_id = p_quest_id;
  if v_is_open is null then return jsonb_build_object('ok', false, 'error', 'unknown_quest'); end if;
  if not v_is_open  then return jsonb_build_object('ok', false, 'error', 'quest_closed'); end if;

  update public.assignments set active = false where assignments.active;

  insert into public.assignments (quest_id, note, due_on)
  values (p_quest_id, nullif(btrim(coalesce(p_note, '')), ''), p_due)
  returning * into v_row;

  return jsonb_build_object('ok', true, 'assignment', jsonb_build_object(
    'questId', v_row.quest_id, 'note', v_row.note,
    'assignedOn', v_row.assigned_on, 'dueOn', v_row.due_on));
end; $$;

create or replace function public.mhq_admin_clear_assignment(p_admin_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
begin
  if not public._mhq_admin_ok(p_admin_password) then
    return jsonb_build_object('ok', false, 'error', 'auth');
  end if;
  update public.assignments set active = false where assignments.active;
  return jsonb_build_object('ok', true);
end; $$;


-- ============================================================
--  5. TREASURE BOX
-- ============================================================

-- The weighted roll. Split out so both the RPC and any future grant path
-- share one implementation. Returns the chosen loot_table row id.
create or replace function public._mhq_roll_loot()
returns text language plpgsql security definer set search_path = public, extensions as $$
declare v_total int; v_pick int; v_acc int := 0; v_row record;
begin
  select coalesce(sum(loot_table.weight), 0) into v_total from public.loot_table where loot_table.active;
  if v_total <= 0 then return null; end if;
  v_pick := floor(random() * v_total)::int + 1;
  for v_row in select * from public.loot_table where loot_table.active order by loot_table.sort, loot_table.id loop
    v_acc := v_acc + v_row.weight;
    if v_pick <= v_acc then return v_row.id; end if;
  end loop;
  return null;
end; $$;

-- Open a box. Server owns every part of this: the pending count, the roll,
-- and the payout. The client is told only what it won.
--
-- Guaranteed-new cosmetics: the pool is the ACTIVE cosmetics she does not
-- already own on her primary blip and whose min_level she has reached. A
-- box that hands back a duplicate hat is a punishment, not a prize — so if
-- that pool is empty the roll falls back to gold rather than fizzling.
create or replace function public.mhq_open_box(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_st record; v_loot record; v_loot_id text;
        v_kind text; v_item text; v_amount int; v_is_new boolean := false;
        v_level int; v_owned jsonb; v_pantry jsonb; v_gold int;
        v_blips jsonb; v_pending int;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  perform public._mhq_ensure_blip(v_sid);

  -- row lock: two taps in flight must not open two boxes
  select students.boxes_pending, students.gold, students.xp, students.pantry
    into v_st from public.students where students.id = v_sid for update;

  if coalesce(v_st.boxes_pending, 0) < 1 then
    return jsonb_build_object('ok', false, 'error', 'no_box');
  end if;

  v_level  := (public._mhq_level(v_st.xp)->>'level')::int;
  v_pantry := coalesce(v_st.pantry, '{}'::jsonb);
  v_gold   := v_st.gold;

  v_loot_id := public._mhq_roll_loot();
  if v_loot_id is null then return jsonb_build_object('ok', false, 'error', 'no_loot_table'); end if;
  select * into v_loot from public.loot_table where loot_table.id = v_loot_id;

  v_kind   := v_loot.kind;
  v_amount := v_loot.amount_min + floor(random() * (v_loot.amount_max - v_loot.amount_min + 1))::int;
  v_item   := v_loot.item_id;

  if v_kind = 'cosmetic' then
    select coalesce(blips.owned_items, '[]'::jsonb) into v_owned
      from public.blips where blips.student_id = v_sid and blips.slot = 1;

    select shop_items.item_id into v_item
      from public.shop_items
     where shop_items.active
       and shop_items.category = 'cosmetic'
       and shop_items.min_level <= v_level
       and not (coalesce(v_owned, '[]'::jsonb) ? shop_items.item_id)
     order by random()
     limit 1;

    if v_item is null then
      -- nothing new to give — pay gold instead, never a duplicate
      v_kind := 'gold'; v_amount := 20; v_item := null;
    else
      v_is_new := true;
      update public.blips
         set owned_items = coalesce(blips.owned_items, '[]'::jsonb) || to_jsonb(v_item)
       where blips.student_id = v_sid and blips.slot = 1;
      v_amount := 1;
    end if;
  end if;

  if v_kind = 'gold' then
    v_gold := v_gold + v_amount;
  elsif v_kind = 'food' then
    v_pantry := jsonb_set(v_pantry, array[v_item],
                  to_jsonb(coalesce((v_pantry->>v_item)::int, 0) + v_amount), true);
  end if;

  update public.students
     set boxes_pending = students.boxes_pending - 1,
         gold          = v_gold,
         pantry        = v_pantry,
         last_active_at = now()
   where students.id = v_sid
   returning students.boxes_pending into v_pending;

  select coalesce(jsonb_agg(jsonb_build_object(
            'slot', blips.slot, 'name', blips.name, 'colour', blips.colour,
            'feedCount', blips.feed_count,
            'growthStage', public._mhq_growth(blips.feed_count),
            'owned', blips.owned_items, 'equipped', blips.equipped) order by blips.slot), '[]'::jsonb)
    into v_blips from public.blips where blips.student_id = v_sid;

  return jsonb_build_object('ok', true,
    'loot', jsonb_build_object('kind', v_kind, 'id', v_item, 'amount', v_amount, 'isNew', v_is_new),
    'boxes', jsonb_build_object('pending', v_pending),
    'gold', v_gold, 'pantry', v_pantry, 'blips', v_blips);
end; $$;


-- ============================================================
--  6. STATE  — extends mhq_get_state with `assignment` and `boxes`
--     (full redefinition: this is the Phase 2 body plus two keys)
-- ============================================================
create or replace function public.mhq_get_state(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_prog jsonb; v_total int; v_open_q jsonb; v_st record;
        v_shop jsonb; v_food jsonb; v_blips_j jsonb; v_blip1 jsonb;
        v_health jsonb; v_stg int; v_is_qual boolean;
        v_can_feed boolean; v_can_care boolean;
        v_asg record; v_assignment jsonb := null; v_done boolean;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  update public.students set last_active_at = now() where students.id = v_sid;
  perform public._mhq_ensure_blip(v_sid);
  select * into v_st from public.students where students.id = v_sid;

  select coalesce(jsonb_object_agg(progress.quest_id, jsonb_build_object(
            'best_score', progress.best_score, 'attempts', progress.attempts,
            'total_xp', progress.total_xp, 'passed', progress.passed,
            'last_played_at', progress.last_played_at)), '{}'::jsonb)
    into v_prog from public.progress where progress.student_id = v_sid;
  select coalesce(sum(progress.total_xp), 0) into v_total
    from public.progress where progress.student_id = v_sid;
  select coalesce(jsonb_agg(quests.quest_id order by quests.sort), '[]'::jsonb)
    into v_open_q from public.quests where quests.is_open;

  select coalesce(jsonb_agg(jsonb_build_object(
            'id', shop_items.item_id, 'slot', shop_items.slot,
            'price', shop_items.price, 'minLevel', shop_items.min_level) order by shop_items.sort), '[]'::jsonb)
    into v_shop from public.shop_items where shop_items.active and shop_items.category = 'cosmetic';
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', shop_items.item_id, 'kind', shop_items.item_id,
            'price', shop_items.price) order by shop_items.sort), '[]'::jsonb)
    into v_food from public.shop_items where shop_items.active and shop_items.category = 'food';

  v_health := public._mhq_health(v_st.last_fed_day, v_st.care_streak);
  v_stg := (v_health->>'stage')::int;

  select coalesce(jsonb_agg(jsonb_build_object(
            'slot', blips.slot, 'name', blips.name, 'colour', blips.colour,
            'feedCount', blips.feed_count,
            'growthStage', public._mhq_growth(blips.feed_count),
            'owned', blips.owned_items, 'equipped', blips.equipped) order by blips.slot), '[]'::jsonb)
    into v_blips_j from public.blips where blips.student_id = v_sid;

  select jsonb_build_object('name', blips.name, 'colour', blips.colour,
                            'owned', blips.owned_items, 'equipped', blips.equipped)
    into v_blip1 from public.blips where blips.student_id = v_sid and blips.slot = 1;

  v_is_qual  := public._mhq_is_qual_day();
  v_can_feed := (v_stg < 2) and (v_st.last_fed_day is null or v_st.last_fed_day < current_date);
  v_can_care := (v_stg >= 2) and v_is_qual and (v_st.last_care_day is null or v_st.last_care_day < current_date);

  -- Active assignment. `done` comes from box_grants, not progress.passed —
  -- passed stays true forever once earned, so it cannot say whether THIS
  -- assignment was completed. The grant row is written the moment she
  -- passes the assigned quest, so the two can never disagree.
  select * into v_asg from public.assignments where assignments.active limit 1;
  if found then                       -- FOUND, not v_asg.id: an empty SELECT INTO
    select exists(select 1 from public.box_grants   -- leaves the record null-valued
                   where box_grants.student_id = v_sid
                     and box_grants.assignment_id = v_asg.id) into v_done;
    v_assignment := jsonb_build_object(
      'questId', v_asg.quest_id, 'note', v_asg.note,
      'assignedOn', v_asg.assigned_on, 'dueOn', v_asg.due_on, 'done', v_done);
  end if;

  return jsonb_build_object('ok', true,
    'student', jsonb_build_object('id', v_sid, 'name', v_st.display_name, 'username', lower(p_username)),
    'progress', v_prog, 'totalXp', v_total, 'openQuests', v_open_q,
    'gold', v_st.gold, 'xp', v_st.xp, 'levelInfo', public._mhq_level(v_st.xp),
    'blip', v_blip1, 'blips', v_blips_j, 'shop', v_shop, 'foodShop', v_food,
    'pantry', v_st.pantry, 'health', v_health,
    'canFeedToday', v_can_feed, 'canCareToday', v_can_care,
    'termRunning', (select coalesce((app_config.value = 'true'), false)
                      from public.app_config where app_config.key = 'term_running'),
    -- Phase 3
    'assignment', v_assignment,
    'boxes', jsonb_build_object('pending', coalesce(v_st.boxes_pending, 0)));
end; $$;


-- ============================================================
--  7. SUBMIT QUEST — unchanged, plus the treasure-box grant
-- ============================================================
create or replace function public.mhq_submit_quest(
  p_username text, p_password text, p_quest text,
  p_score numeric, p_xp int, p_total int, p_correct int)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_was_passed boolean := false; v_now_passed boolean;
        v_xp_gain int; v_gold_gain int := 10; v_old_xp int; v_new_xp int; v_new_gold int;
        v_old_lvl int; v_new_lvl int;
        v_asg_id uuid; v_box_awarded boolean := false; v_boxes int;
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

  -- Treasure box: awarded once, the first time she PASSES the currently
  -- assigned quest. The box_grants primary key does the deduping, so a
  -- replay inserts nothing and awards nothing (on conflict do nothing
  -- reports 0 rows, which is exactly the test we want).
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

  return jsonb_build_object('ok', true, 'passed', v_now_passed,
    'badgeEarned', (v_now_passed and not v_was_passed), 'xpAwarded', v_xp_gain,
    'alreadyPassed', v_was_passed, 'goldAwarded', v_gold_gain,
    'xp', v_new_xp, 'gold', v_new_gold, 'level', v_new_lvl,
    'levelUp', (v_new_lvl > v_old_lvl), 'levelInfo', public._mhq_level(v_new_xp),
    -- Phase 3
    'boxAwarded', v_box_awarded,
    'boxes', jsonb_build_object('pending', coalesce(v_boxes, 0)));
end; $$;


-- ============================================================
--  8. ADMIN DATA — unchanged, plus the active assignment
-- ============================================================
create or replace function public.mhq_admin_data(p_admin_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_rows jsonb; v_qs jsonb; v_strug jsonb; v_term_on boolean; v_term_since text;
        v_asg record; v_assignment jsonb := null;
begin
  if not public._mhq_admin_ok(p_admin_password) then
    return jsonb_build_object('ok', false, 'error', 'auth');
  end if;

  select coalesce(jsonb_agg(jsonb_build_object(
      'id', s.id, 'name', s.display_name, 'username', s.username,
      'hasPassword', (s.password is not null),       -- never the hash
      'lastActive', s.last_active_at,
      'totalXp', coalesce((select sum(p.total_xp) from public.progress p where p.student_id = s.id), 0),
      'health', public._mhq_health(s.last_fed_day, s.care_streak),
      'growthStage', (select public._mhq_growth(b.feed_count) from public.blips b where b.student_id = s.id and b.slot = 1),
      'blipCount', (select count(*) from public.blips b where b.student_id = s.id),
      'quests', coalesce((select jsonb_object_agg(p.quest_id, jsonb_build_object(
                  'best_score', p.best_score, 'attempts', p.attempts, 'passed', p.passed,
                  'last_played_at', p.last_played_at)) from public.progress p where p.student_id = s.id), '{}'::jsonb)
    ) order by s.display_name), '[]'::jsonb)
  into v_rows from public.students s;

  select coalesce(jsonb_agg(jsonb_build_object('quest_id', quests.quest_id, 'is_open', quests.is_open)
                            order by quests.sort), '[]'::jsonb)
  into v_qs from public.quests;

  select coalesce(jsonb_agg(j order by (j->>'count')::int desc), '[]'::jsonb) into v_strug
  from (select jsonb_build_object('concept', concept, 'count', sum(count),
                                  'students', count(distinct student_id)) j
        from public.struggles group by concept) t;

  select coalesce((app_config.value = 'true'), false) into v_term_on
    from public.app_config where app_config.key = 'term_running';
  select app_config.value into v_term_since
    from public.app_config where app_config.key = 'term_on_since';

  -- Active assignment + how many learners have finished it (the teacher's
  -- actual question is "who has done it?", and the grant rows already know).
  select * into v_asg from public.assignments where assignments.active limit 1;
  if found then
    v_assignment := jsonb_build_object(
      'questId', v_asg.quest_id, 'note', v_asg.note,
      'assignedOn', v_asg.assigned_on, 'dueOn', v_asg.due_on,
      'doneCount', (select count(*) from public.box_grants
                     where box_grants.assignment_id = v_asg.id));
  end if;

  return jsonb_build_object('ok', true, 'rows', v_rows, 'quests', v_qs, 'struggles', v_strug,
    'inactiveDays', 7, 'termRunning', coalesce(v_term_on, false), 'termOnSince', v_term_since,
    'assignment', v_assignment);
end; $$;


-- ============================================================
--  9. GRANTS — the publishable/anon key may only EXECUTE the API
-- ============================================================
grant execute on function
  public.mhq_push_subscribe(text, text, jsonb),
  public.mhq_push_unsubscribe(text, text, text),
  public.mhq_open_box(text, text),
  public.mhq_admin_set_assignment(text, text, date, text),
  public.mhq_admin_clear_assignment(text)
to anon, authenticated;

-- The send-push edge function calls these two over PostgREST as the service
-- role. They have always worked in-process (SECURITY DEFINER, called from
-- other RPCs) but have never been invoked as endpoints, so PostgREST may not
-- have them in its schema cache. Granting them explicitly settles it — they
-- leak nothing on their own (health of an unnamed row, and a global boolean).
grant execute on function
  public._mhq_health(date, integer),
  public._mhq_is_qual_day()
to service_role;

-- (mhq_get_state, mhq_submit_quest and mhq_admin_data were already granted
--  in schema.sql; create-or-replace keeps existing grants.)


-- ============================================================
--  10. SMOKE TEST — run these AFTER the migration, on live.
--      Phase 2's lesson: the local JS backend does not exercise this SQL,
--      and a PL/pgSQL ambiguity slipped through to production. Every new
--      RPC gets called for real before it is called done.
--
--  Replace 'someuser' / 'somepassword' / 'adminpw' with real values.
--
--    select public.mhq_get_state('someuser','somepassword') -> 'assignment';
--    select public.mhq_get_state('someuser','somepassword') -> 'boxes';
--    select public.mhq_admin_set_assignment('adminpw','q1',null,'Test note');
--    select public.mhq_admin_data('adminpw') -> 'assignment';
--    select public.mhq_submit_quest('someuser','somepassword','q1',0.9,50,5,5) -> 'boxAwarded';
--    select public.mhq_open_box('someuser','somepassword');
--    select public.mhq_open_box('someuser','somepassword');   -- expect error 'no_box'
--    select public.mhq_admin_clear_assignment('adminpw');
-- ============================================================
</content>
