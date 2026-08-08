-- ============================================================
--  BLIPWORK — pin search_path on the two pure-maths helpers
--  (Fable audit 2026-08-06, "low-risk but real"; the standing
--   PROJECT-STATUS note "worth pinning one day".)
--
--  WHAT THIS IS
--  Supabase's database linter flags `_mhq_level` and `_mhq_growth` with
--  "role mutable search_path". Every other function in this schema already
--  pins one; these two were simply missed.
--
--  WHY IT IS LOW RISK EITHER WAY
--  Both are `immutable`, touch NO tables, and are NOT security definer — so
--  the usual hijack (someone plants a table or function earlier on the path
--  and a definer function runs it with elevated rights) does not apply.
--  This is hygiene, and it makes the linter's security page read clean so a
--  real warning is not lost in the noise.
--
--  WHY `= ''` IS SAFE HERE
--  An empty search_path means unqualified names resolve only in pg_catalog.
--  Both bodies use nothing else: greatest, coalesce, round, power, case,
--  jsonb_build_object, to_jsonb are all pg_catalog. Checked line by line.
--  (Note the OTHER helpers use `set search_path = public, extensions`,
--   because they DO read tables — do not "tidy" those to '' as well.)
--
--  SAFE TO RE-RUN. Replaces two function bodies, changes no data, no DDL on
--  any table. Nothing reads from or writes to a learner row.
--
--  Mirrored in schema.sql (same two definitions) so the from-scratch file and
--  live stay in step — that "AND" is what went missing three times before.
-- ============================================================

-- Level curve. cost(L) = round(300 * 1.5^(L-1) / 10) * 10, bar resets each
-- level, cap 20. Body unchanged from schema.sql — only `set search_path` added.
create or replace function public._mhq_level(p_xp integer) returns jsonb
language plpgsql immutable
set search_path = ''
as $$
declare lvl int := 1; cost int; rem int := greatest(coalesce(p_xp, 0), 0);
begin
  loop
    cost := (round(300 * power(1.5, lvl - 1) / 10))::int * 10;
    exit when rem < cost or lvl >= 20;
    rem := rem - cost; lvl := lvl + 1;
  end loop;
  return jsonb_build_object('level', lvl, 'intoLevel', rem,
    'nextCost', case when lvl >= 20 then null else to_jsonb(cost) end);
end; $$;

-- Growth stage 0..3 from cumulative feedings (thresholds 10/25/45).
create or replace function public._mhq_growth(p_feed integer)
returns integer language sql immutable set search_path = '' as $$
  select case when coalesce(p_feed,0) >= 45 then 3
              when coalesce(p_feed,0) >= 25 then 2
              when coalesce(p_feed,0) >= 10 then 1
              else 0 end;
$$;

-- Sanity check after running: both should come back with a search_path set.
--   select p.proname, p.proconfig
--     from pg_proc p join pg_namespace n on n.oid = p.pronamespace
--    where n.nspname = 'public' and p.proname in ('_mhq_level','_mhq_growth');
-- Expected: proconfig = {"search_path="} for each.
--
-- And the behaviour is unchanged:
--   select public._mhq_level(0), public._mhq_level(300), public._mhq_growth(25);
-- Expected: level 1 / level 2 / 2.
