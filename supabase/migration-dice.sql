-- ============================================================
--  ⚠️ WRITTEN, NOT RUN. Nothing in this file has touched the live
--  database — session 0b (2026-08-21, DICE-PLAN.md build) wrote it as
--  part of the dice INFRASTRUCTURE build. The foreman applies it
--  (via MCP) only once a real chapter recipe pool exists and Megan
--  is ready for the corresponding chapter to go live — until then
--  config.js's DICE_CHAPTERS stays [] and none of this is reachable
--  from the client even after the migration runs.
--
--  BLIPWORK — DICE INFRASTRUCTURE  (DICE-PLAN.md, session 0b build)
--
--  WHAT THIS DOES
--   1. One new table, dice_plays: (student_id, chapter) primary key,
--      `plays` (completed-round counter), `met_kinds` (coverage-first
--      dealing memory — see below), `save` (the in-progress round
--      blob, null when none). RLS on, no policies, revoke-all —
--      SECURITY DEFINER RPCs only, same posture as every other table
--      here (assignments/box_grants/push_subscriptions etc.).
--   2. _mhq_dice_xp(answered) — mirrors js/config.js's XP economy
--      (perCorrect 10 · firstTryBonus 5 · streakCap 3, see js/play.js's
--      onResult accumulator) over a stored true/false array. This is
--      the WHOLE point of the "never names an amount" rule: the
--      client cannot pay itself XP, because payment is recomputed
--      here from data the server already has (the save it already
--      accepted question-by-question), never from a number the
--      client sends at submit time.
--   3. mhq_dice_save(u, p, chapter, save) — persist/clear the resume
--      checkpoint. Learner-callable. Idempotent upsert.
--   4. mhq_submit_dice(u, p, chapter) — pays out XP (via _mhq_dice_xp)
--      + a flat 10 gold (mirrors mhq_submit_quest's flat gold),
--      row-locked (double-submit rule: FOR UPDATE), refuses an
--      incomplete or missing round rather than paying for one,
--      updates met_kinds (coverage memory), clears save, atomic.
--      Learner-callable.
--   5. mhq_get_state re-created, adding ONE field: `dice`, a
--      jsonb_object_agg of every chapter this student has a
--      dice_plays row for → { plays, metKinds, save }. ⚠️ COPY-FORWARD
--      DANGER (schema.sql's own header, and PROJECT-STATUS.md — this
--      function has been recreated before): the body below is
--      supabase/migration-cq-bridge.sql's mhq_get_state (confirmed
--      current — schema.sql line 433 matches it byte-for-byte as of
--      this session's read) with exactly the `dice` block inserted.
--      Diffed against migration-cq-bridge.sql before this file was
--      written; nothing else changed.
--   6. mhq_admin_data re-created, adding ONE field: `dicePlays`, a
--      per-CHAPTER total across the whole class (not per student —
--      DICE-PLAN's admin ruling is "🎲 icon + play count per chapter,
--      nothing more"). ⚠️ COPY-FORWARD DANGER, and a real one found
--      THIS session: schema.sql's mhq_admin_data (line 992) is STALE
--      — it predates Phase 3 and is missing the `assignment` field
--      admin.js's assignmentSection() actually reads. The TRUE current
--      live body is supabase/migration-phase3.sql's version (line
--      482, the most recent standalone migration to define this
--      function) — confirmed by matching its `assignment` shape
--      (questId/note/assignedOn/dueOn/doneCount) against admin.js's
--      actual field reads. THE FOREMAN SHOULD RE-CHECK THIS with
--      `list_migrations`/reading the live function body before
--      applying — if some later, unfiled change touched
--      mhq_admin_data directly on live, re-diff before running this.
--      The body below is migration-phase3.sql's version, byte-for-
--      byte, plus the `dicePlays` block.
--
--  COVERAGE-FIRST DEALING, WHERE IT ACTUALLY LIVES: js/dice.js's
--  dealRound() decides WHICH skills go in a round (client-side —
--  the pool/recipe definitions are client-side JS, the server has no
--  idea what a "kind" even is). met_kinds here is just the server's
--  MEMORY of which kinds have ever been completed for a chapter, fed
--  back to the client via mhq_get_state's `dice.metKinds` so the next
--  deal can read it. The save's `kinds` array (parallel to
--  skillIds — a deliberate small addition beyond DICE-PLAN's literal
--  save shape, session 0b's call: a pool MAY group several skillIds
--  under one coverage `kind`, and the server cannot recover that
--  grouping from skillIds alone) is what mhq_submit_dice folds into
--  met_kinds on a completed round.
--
--  Postgres grants EXECUTE to PUBLIC by default on CREATE FUNCTION —
--  the explicit revoke+grant blocks below are the entire security
--  model for the two new learner RPCs (same lesson as every other
--  migration here — migration-ship-fixes.sql hit this gap once
--  already for a lower-stakes function).
-- ============================================================


-- ============================================================
--  1. TABLE
-- ============================================================
create table if not exists public.dice_plays (
  student_id  uuid not null references public.students(id) on delete cascade,
  chapter     text not null,
  plays       integer not null default 0,
  -- coverage-first dealing memory: kind ids this student has ever
  -- completed a dice question for, in this chapter. Read back through
  -- mhq_get_state's `dice.metKinds`; js/dice.js's dealRound() deals
  -- unmet kinds first until this covers the whole pool, then goes
  -- fully random (DICE-PLAN's dealing ruling).
  met_kinds   jsonb not null default '[]'::jsonb,
  -- the in-progress round, or null when none. Shape (js/dice-play.js):
  -- { chapter, roundSeed, skillIds, kinds, index, answeredCorrect, xpEarned }
  -- — small and regenerable (never serializes actual question content;
  -- see js/dice.js's genAt/withSeed for why a seed is enough).
  save        jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (student_id, chapter)
);
create index if not exists dice_plays_student_idx on public.dice_plays (student_id);

alter table public.dice_plays enable row level security;
revoke all on public.dice_plays from anon, authenticated;


-- ============================================================
--  2. _mhq_dice_xp — mirrors js/config.js's XP economy
--     (perCorrect 10 · firstTryBonus 5 · streakCap 3). Change one,
--     change both — same relationship _mhq_level has with
--     js/companion/level.js.
-- ============================================================
create or replace function public._mhq_dice_xp(p_answered jsonb)
returns integer language plpgsql immutable set search_path = '' as $$
declare v_streak int := 0; v_xp int := 0; v_i int; v_n int; v_ok boolean;
begin
  if p_answered is null or jsonb_typeof(p_answered) <> 'array' then return 0; end if;
  v_n := jsonb_array_length(p_answered);
  for v_i in 0 .. v_n - 1 loop
    v_ok := (p_answered->>v_i)::boolean;
    if v_ok then
      v_streak := v_streak + 1;
      v_xp := v_xp + 10 * least(v_streak, 3) + 5;     -- perCorrect * min(streak,cap) + firstTryBonus
    else
      v_streak := 0;
    end if;
  end loop;
  return v_xp;
end; $$;


-- ============================================================
--  3. mhq_dice_save — persist/clear the resume checkpoint. Learner-
--     callable (bcrypt auth per call, same pattern as every other
--     learner RPC — see _mhq_auth). Idempotent upsert; p_save = null
--     clears (used when a round is abandoned, and by mhq_submit_dice
--     itself after paying out).
-- ============================================================
create or replace function public.mhq_dice_save(p_username text, p_password text, p_chapter text, p_save jsonb)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;

  insert into public.dice_plays (student_id, chapter, save, updated_at)
  values (v_sid, p_chapter, p_save, now())
  on conflict (student_id, chapter) do update
    set save = excluded.save, updated_at = now();

  return jsonb_build_object('ok', true);
end; $$;


-- ============================================================
--  4. mhq_submit_dice — pays out the round. Takes NO xp/amount from
--     the client (DICE-PLAN "never names an amount") — recomputes it
--     from the save's own answeredCorrect[] via _mhq_dice_xp. Row-
--     locked (double-submit rule, same as every gold/XP write in this
--     schema); refuses a missing or incomplete round rather than
--     paying for one.
-- ============================================================
create or replace function public.mhq_submit_dice(p_username text, p_password text, p_chapter text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_row record; v_save jsonb; v_skill_ids jsonb; v_kinds jsonb; v_answered jsonb;
        v_n int; v_answered_n int; v_xp_gain int; v_gold_gain int := 10;
        v_old_xp int; v_new_xp int; v_new_gold int; v_old_lvl int; v_new_lvl int;
        v_met jsonb; v_correct int; v_plays int;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;

  select * into v_row from public.dice_plays
   where student_id = v_sid and chapter = p_chapter for update;
  if not found or v_row.save is null then
    return jsonb_build_object('ok', false, 'error', 'no_active_round');
  end if;

  v_save := v_row.save;
  v_skill_ids := coalesce(v_save->'skillIds', '[]'::jsonb);
  v_answered  := coalesce(v_save->'answeredCorrect', '[]'::jsonb);
  v_n := jsonb_array_length(v_skill_ids);
  v_answered_n := jsonb_array_length(v_answered);
  if v_n = 0 or v_answered_n < v_n then
    return jsonb_build_object('ok', false, 'error', 'round_incomplete');
  end if;

  v_xp_gain := public._mhq_dice_xp(v_answered);
  select count(*) into v_correct from jsonb_array_elements_text(v_answered) t(val) where val = 'true';

  select xp into v_old_xp from public.students where id = v_sid for update;
  update public.students set xp = xp + v_xp_gain, gold = gold + v_gold_gain, last_active_at = now()
   where id = v_sid
   returning xp, gold into v_new_xp, v_new_gold;

  -- coverage memory: v_kinds parallel to v_skill_ids when the save carries
  -- it (session-0b addition — see this file's header); falls back to the
  -- skill ids themselves for a save written before `kinds` existed.
  v_kinds := case when jsonb_typeof(v_save->'kinds') = 'array'
                    and jsonb_array_length(v_save->'kinds') = v_n
                  then v_save->'kinds' else v_skill_ids end;
  select coalesce(jsonb_agg(distinct k), '[]'::jsonb) into v_met
    from (
      select val as k from jsonb_array_elements_text(coalesce(v_row.met_kinds, '[]'::jsonb)) t(val)
      union
      select val as k from jsonb_array_elements_text(v_kinds) t(val)
    ) u;

  update public.dice_plays
     set plays = plays + 1, met_kinds = v_met, save = null, updated_at = now()
   where student_id = v_sid and chapter = p_chapter
   returning plays into v_plays;

  v_old_lvl := (public._mhq_level(v_old_xp)->>'level')::int;
  v_new_lvl := (public._mhq_level(v_new_xp)->>'level')::int;

  return jsonb_build_object('ok', true, 'xpAwarded', v_xp_gain, 'goldAwarded', v_gold_gain,
    'correct', v_correct, 'total', v_n,
    'xp', v_new_xp, 'gold', v_new_gold, 'level', v_new_lvl,
    'levelUp', (v_new_lvl > v_old_lvl), 'levelInfo', public._mhq_level(v_new_xp), 'plays', v_plays);
end; $$;


-- ============================================================
--  5. mhq_get_state — adds `dice`. Body = migration-cq-bridge.sql's
--     current mhq_get_state, byte-for-byte, plus the block marked
--     below. See this file's header for the copy-forward note.
-- ============================================================
create or replace function public.mhq_get_state(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; prog jsonb; total int; open_q jsonb; st record; shop jsonb; food jsonb; furn jsonb;
        blips_j jsonb; blip1 jsonb; health jsonb; stg int; is_qual boolean;
        can_feed boolean; can_care boolean; dice_j jsonb;
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
  -- S4 (2026-08-08): `minLevel` joined the payload when the 44 groceries
  -- landed — the tiers are level-gated, and without it a food card cannot
  -- say "Unlocks at Lv N". No new column: shop_items.min_level was always
  -- there, so nothing needed a new GRANT.
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', item_id, 'kind', item_id, 'price', price, 'minLevel', min_level) order by sort), '[]'::jsonb)
    into food from public.shop_items where active and category = 'food';
  -- Room build S5v2 (2026-08-08): the furniture catalogue, in its own array
  -- for the same reason foodShop is separate — `shop` keeps its exact shape,
  -- so the cosmetic panels never learn what a bed is. Same four fields as
  -- `shop`, so the furniture panel can reuse the cards the shop already draws.
  select coalesce(jsonb_agg(jsonb_build_object(
            'id', item_id, 'slot', slot, 'price', price, 'minLevel', min_level) order by sort), '[]'::jsonb)
    into furn from public.shop_items where active and category = 'furniture';

  health := public._mhq_health(st.last_fed_day, st.care_streak);
  stg := (health->>'stage')::int;

  select coalesce(jsonb_agg(jsonb_build_object(
            'slot', slot, 'name', name, 'colour', colour, 'feedCount', feed_count,
            'growthStage', public._mhq_growth(feed_count),
            'owned', owned_items, 'equipped', equipped) order by slot), '[]'::jsonb)
    into blips_j from public.blips where student_id = sid;
  -- back-compat: `blip` = slot 1 (the existing UI reads this object)
  select jsonb_build_object('name', name, 'colour', colour, 'owned', owned_items, 'equipped', equipped)
    into blip1 from public.blips where student_id = sid and slot = 1;

  is_qual  := public._mhq_is_qual_day();
  -- S4: the cookie reads its OWN stamp, so eating a bought grocery (which
  -- sets last_fed_day) leaves the free cookie sitting there waiting.
  can_feed := (stg < 2) and (st.last_cookie_day is null or st.last_cookie_day < current_date);
  can_care := (stg >= 2) and is_qual and (st.last_care_day is null or st.last_care_day < current_date);

  -- DICE-PLAN.md, session 0b: the ONE new field.
  select coalesce(jsonb_object_agg(chapter, jsonb_build_object(
            'plays', plays, 'metKinds', met_kinds, 'save', save)), '{}'::jsonb)
    into dice_j from public.dice_plays where student_id = sid;

  return jsonb_build_object('ok', true,
    'student', jsonb_build_object('id', sid, 'name', st.display_name, 'username', lower(p_username)),
    'progress', prog, 'totalXp', total, 'openQuests', open_q,
    'gold', st.gold, 'xp', st.xp, 'levelInfo', public._mhq_level(st.xp),
    'blip', blip1, 'blips', blips_j, 'shop', shop, 'foodShop', food, 'furnitureShop', furn,
    'pantry', st.pantry, 'tray', coalesce(st.tray, '{}'::jsonb), 'health', health,
    'canFeedToday', can_feed, 'canCareToday', can_care,
    -- CQ-BRIDGE-PLAN.md Part 3: the ONE new field. cq_name lives on `st`
    -- (select * above), so no extra query — the Collect panel renders only
    -- when this is true (session 3's client-side rule).
    'cqLinked', (st.cq_name is not null),
    'dice', dice_j,
    'termRunning', (select coalesce((value = 'true'), false) from public.app_config where key = 'term_running'));
end; $$;


-- ============================================================
--  6. mhq_admin_data — adds `dicePlays`. Body =
--     migration-phase3.sql's current mhq_admin_data (the TRUE live
--     one — see this file's header copy-forward note), byte-for-byte,
--     plus the block marked below.
-- ============================================================
create or replace function public.mhq_admin_data(p_admin_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_rows jsonb; v_qs jsonb; v_strug jsonb; v_term_on boolean; v_term_since text;
        v_asg record; v_assignment jsonb := null; v_dice jsonb;
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

  -- ---------- DICE-PLAN.md, session 0b: the ONE new field ----------
  -- Per-CHAPTER total across the whole class — her admin ruling is
  -- "🎲 icon + play count per chapter, nothing more", not a per-student
  -- breakdown (the roster table already has enough columns).
  select coalesce(jsonb_object_agg(chapter, total_plays), '{}'::jsonb) into v_dice
    from (select chapter, sum(plays) as total_plays from public.dice_plays group by chapter) t;

  return jsonb_build_object('ok', true, 'rows', v_rows, 'quests', v_qs, 'struggles', v_strug,
    'inactiveDays', 7, 'termRunning', coalesce(v_term_on, false), 'termOnSince', v_term_since,
    'assignment', v_assignment, 'dicePlays', v_dice);
end; $$;


-- ============================================================
--  7. GRANTS — the two new learner RPCs. mhq_get_state and
--     mhq_admin_data keep their EXISTING grants automatically
--     (CREATE OR REPLACE preserves a function's OID, and grants are
--     tied to the OID, not the body — no re-grant needed for either).
-- ============================================================
grant execute on function
  public.mhq_dice_save(text, text, text, jsonb),
  public.mhq_submit_dice(text, text, text)
to anon, authenticated;


-- ============================================================
--  sanity checks after running
-- ============================================================
--   select * from public.dice_plays limit 5;
--   -- expected: empty until the first learner deals a dice round.
--   select public.mhq_dice_save('someusername', 'wrongpassword', 'stats', null);
--   -- expected: {"ok": false, "error": "auth"}
--   select public.mhq_submit_dice('someusername', 'wrongpassword', 'stats');
--   -- expected: {"ok": false, "error": "auth"}
--   select proname, provolatile from pg_proc where proname = '_mhq_dice_xp';
--   -- expected: immutable (matches the js/config.js XP constants it mirrors)
