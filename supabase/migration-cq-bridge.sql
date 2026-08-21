-- ============================================================
--  ✅ APPLIED TO LIVE 2026-08-21 via MCP (cq_bridge_watermark_and_credit)
--  by the foreman session; collect-cq deployed the same day.
--  BLIPWORK — THE XP -> DIAMONDS BRIDGE  (CQ-BRIDGE-PLAN.md Part 3,
--  build session 3, 2026-08-21)
--
--  ⚠️ THIS IS A FILE, NOT A LIVE ACTION. Written by the build session;
--  applied later by the foreman via MCP, alongside deploying the
--  collect-cq edge function and setting its CQ_URL / CQ_SERVICE_KEY
--  secrets. NEVER run this against the live project from a build session.
--
--  THE DESIGN (frozen contract, CQ-BRIDGE-PLAN.md Part 3 — do not redesign):
--  Each student row carries a watermark, cq_xp_credited: "how much of
--  their CQ XP has already been turned into diamonds". On every collect —
--    delta    = cq_total − cq_xp_credited   (never negative)
--    diamonds = floor(delta / rate)
--    watermark advances by diamonds * rate  -- remainder banks, never lost
--  Diamonds ARE students.gold, displayed as 💎 (CQ-BRIDGE-PLAN.md ruling:
--  CQ earnings are diamonds only, never Blipwork XP — no game logic keys
--  off gold, so crediting it has zero side effects). The watermark only
--  ever moves forward and the crediting runs row-locked (FOR UPDATE) —
--  same double-submit lesson as everywhere else in this schema — so a
--  double-tap, a retry, or two devices collecting at once can never pay
--  twice for the same CQ XP.
--
--  WHAT THIS DOES
--   1. One new column: students.cq_xp_credited (int, default 0). No
--      grant needed — students is revoke-all, RPC-only, same as every
--      other column on this table.
--   2. app_config seed: cq_rate = '30' (the foreman's data-driven
--      proposal from the real class's CQ totals — Megan retunes with one
--      SQL update, no deploy).
--   3. mhq_credit_cq(p_student_id, p_cq_total) — the locked delta maths.
--      SECURITY DEFINER, service_role ONLY. ⚠️ THIS IS THE FUNCTION THAT
--      MINTS DIAMONDS — a client-callable version would let anyone credit
--      any student any amount. It is never called with a learner's own
--      password check; the edge function is the only caller, and it only
--      ever passes a p_cq_total it just read from Circle Quest itself.
--   4. mhq_cq_link(p_username, p_password) — the edge function's internal
--      "who is this, and are they linked" read. SECURITY DEFINER, also
--      service_role ONLY: the learner's password reaches this only
--      through the edge function (which the browser calls over HTTPS with
--      the publishable key), never directly from the browser as an RPC.
--   5. mhq_get_state re-created, adding ONE field: cqLinked (boolean,
--      cq_name is not null). ⚠️ COPY-FORWARD DANGER (a real past
--      incident — see schema.sql's own header): the body below is
--      schema.sql's CURRENT mhq_get_state (mirror-current as of session 2)
--      with exactly one line inserted. Diffed against schema.sql before
--      this file was written; nothing else changed. Mirrored back into
--      schema.sql alongside the new column, seed row, and both new RPCs.
--
--  Postgres grants EXECUTE to PUBLIC by default on CREATE FUNCTION — the
--  explicit revoke below is not decorative, it is the entire security
--  model for §3/§4 (migration-ship-fixes.sql hit exactly this gap once
--  already, for a much lower-stakes function).
-- ============================================================

-- ---------- 1. column ----------
alter table public.students add column if not exists cq_xp_credited int not null default 0;

-- ---------- 2. rate config ----------
insert into public.app_config (key, value) values ('cq_rate', '30')
on conflict (key) do nothing;

-- ---------- 3. mhq_credit_cq — mints diamonds. service_role ONLY. ----------
create or replace function public.mhq_credit_cq(p_student_id uuid, p_cq_total int)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare st record; rate int; delta int; diamonds int; new_gold int; new_credited int;
begin
  select id, gold, cq_xp_credited into st from public.students where id = p_student_id for update;
  if not found then return jsonb_build_object('ok', false, 'error', 'no_such_student'); end if;

  rate := greatest(1, coalesce((select value::int from public.app_config where key = 'cq_rate'), 30));
  -- p_cq_total lower than the watermark (can't normally happen — CQ totals
  -- only grow) pays nothing and moves nothing, rather than erroring.
  delta := greatest(0, coalesce(p_cq_total, 0) - coalesce(st.cq_xp_credited, 0));
  diamonds := delta / rate;   -- integer division = floor for non-negatives

  if diamonds > 0 then
    update public.students
       set gold = gold + diamonds,
           cq_xp_credited = cq_xp_credited + diamonds * rate
     where id = p_student_id
     returning gold, cq_xp_credited into new_gold, new_credited;
  else
    -- nothing to pay: report the row exactly as it stands, watermark untouched
    new_gold := st.gold;
    new_credited := st.cq_xp_credited;
  end if;

  return jsonb_build_object('ok', true, 'paid', diamonds, 'gold', new_gold);
end; $$;

revoke execute on function public.mhq_credit_cq(uuid, int) from public, anon, authenticated;
grant execute on function public.mhq_credit_cq(uuid, int) to service_role;

-- ---------- 4. mhq_cq_link — the edge function's internal auth+link read. service_role ONLY. ----------
create or replace function public.mhq_cq_link(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; s record;
begin
  sid := public._mhq_auth(p_username, p_password);
  if sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  select cq_name, cq_xp_credited into s from public.students where id = sid;
  return jsonb_build_object('ok', true, 'student_id', sid, 'cq_name', s.cq_name, 'cq_xp_credited', s.cq_xp_credited);
end; $$;

revoke execute on function public.mhq_cq_link(text, text) from public, anon, authenticated;
grant execute on function public.mhq_cq_link(text, text) to service_role;

-- ---------- 5. mhq_get_state — adds cqLinked. BYTE-FOR-BYTE the current body
--    (schema.sql, mirror-current as of session 2) plus exactly one line. ----------
create or replace function public.mhq_get_state(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare sid uuid; prog jsonb; total int; open_q jsonb; st record; shop jsonb; food jsonb; furn jsonb;
        blips_j jsonb; blip1 jsonb; health jsonb; stg int; is_qual boolean;
        can_feed boolean; can_care boolean;
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
    'termRunning', (select coalesce((value = 'true'), false) from public.app_config where key = 'term_running'));
end; $$;

-- ---------- sanity check after running ----------
--   select cq_name, cq_xp_credited, gold from public.students where cq_name is not null;
--   -- expected: cq_xp_credited = 0 for every learner until their first collect.
--   select value from public.app_config where key = 'cq_rate';
--   -- expected: '30'.
--   select public.mhq_cq_link('someusername', 'wrongpassword');
--   -- expected: {"ok": false, "error": "auth"} — and this call must FAIL if
--   -- attempted from the anon/publishable key (service_role only).
