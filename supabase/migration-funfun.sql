-- ============================================================
--  ⚠️ WRITTEN, NOT RUN. Nothing in this file has touched the live
--  database. Session 1 of the Fun Functions mount Part 2 build
--  (FUNFUN-PART2-BRIEF.md, 2026-08-23) wrote it; the FOREMAN applies
--  it via MCP after review. It is safe to apply BEFORE the client
--  ships: nothing calls these RPCs until js/config.js's
--  FUNFUN_ENABLED is true AND session 2's screens exist, so the
--  seeded-closed equivalent here is simply "no caller yet".
--
--  BLIPWORK — FUN FUNCTIONS MOUNT  (D2 / D3 / D4 of the brief)
--
--  WHAT THIS IS
--  Fun Functions is its own app (the graph-quest repo — it also lives
--  standalone at megzieberr.github.io/graph-quest). blipwork MOUNTS one
--  quest of it at a time inside the Functions chapter, owns the learner,
--  and pays out its own XP. This file is the whole server side of that.
--
--  WHAT THIS DOES
--   1. One new table, funfun_progress: (student_id, quest_id) primary
--      key, `best` (0..1 FRACTION of the round scored — NOT the raw
--      count the standalone stores), `total` (items in the most recent
--      play), `plays`, `done`, `met_kinds` ({skillId: true} — the qE
--      "deal each kind first" memory). RLS on, no policies, revoke-all
--      — SECURITY DEFINER RPCs only, the same posture as dice_plays,
--      exam_progress, box_grants and every other table here.
--
--   2. FOUR small RPCs of its own. ⚠️ mhq_get_state AND mhq_admin_data
--      ARE DELIBERATELY NOT TOUCHED (brief D3). Both have been recreated
--      by migration after migration and migration-dice.sql's header
--      records a real copy-forward bug found that way — re-creating
--      either one to add a Fun Functions field would risk silently
--      reverting whatever landed on live since. So Fun Functions gets
--      its own surface and mhq_get_state keeps its exact current body:
--        · mhq_funfun_state(u, p)                     -> the profile
--        · mhq_funfun_met(u, p, quest, skill)         -> the profile
--        · mhq_submit_funfun(u, p, quest, answered)   -> the payout
--        · mhq_admin_funfun(admin_pw)                 -> per-quest plays
--      The profile payload is exactly the shape graph-quest's
--      js/mount.js documents for host.profile():
--        { ok, xp, quests: { [questId]: {best,total,plays,done} },
--          met: { [questId]: { [skillId]: true } } }
--
--   3. THE PAYOUT (brief D2). The client hands over `answered` — the
--      per-item record js/play.js builds:
--        [{ i, skillId, outcome: "full"|"hinted"|"half"|"wrong"|"skipped", xp }]
--      and its own res.xp / res.score are NEVER used for payment (the
--      dice's "the client never names an amount" rule, unchanged).
--      Server-side, from `answered` alone:
--        · XP: outcome in (full, hinted, half) -> true, else false; that
--          boolean array goes into the EXISTING _mhq_dice_xp(), so Fun
--          Functions pays on the static-round economy blipwork already
--          uses (js/config.js XP: perCorrect 10 · firstTryBonus 5 ·
--          streakCap 3), not graph-quest's own internal 10/5 numbers.
--        · clamp to 1000, then 25% if the quest was ALREADY done before
--          this play — clamp first, then quarter, exactly the order
--          mhq_submit_quest uses.
--        · score: full/hinted = 1, half = 0.5, wrong/skipped = 0.
--        · passed = score/total >= 0.7 — graph-quest's js/play.js PASS,
--          NOT blipwork's 0.8. Two different games, two different bars;
--          this one is the bar the learner was actually playing against.
--        · done = done or passed. best = greatest(best, score/total),
--          the fraction rounded to 4 decimals (see the note at the round
--          itself — it is what keeps this and the offline mirror equal).
--        · gold: flat 10 per completed quest, same as mhq_submit_quest
--          and mhq_submit_dice.
--
--   4. VALIDATION. quest_id must be one of the FIFTEEN known ids, listed
--      once in _mhq_funfun_quests() below. They were read out of
--      js/funfun/quests/*.js in js/funfun/quests/index.js's QUESTS array
--      order, never guessed. `answered` must be a jsonb ARRAY of 1..40
--      OBJECTS. Anything else -> {ok:false, error:"bad_round"}.
--
--  Postgres grants EXECUTE to PUBLIC by default on CREATE FUNCTION, so
--  the explicit revoke/grant block at the bottom is the entire security
--  model for these four functions — the same lesson
--  migration-ship-fixes.sql learned the hard way once.
-- ============================================================


-- ============================================================
--  0. DEPENDENCY GUARD — this migration builds on four functions
--     that must already be on live. Fail loudly here rather than
--     half-way through, or (worse) leave a function that only
--     errors the first time a learner finishes a quest.
-- ============================================================
do $$
begin
  if to_regprocedure('public._mhq_auth(text, text)') is null then
    raise exception 'missing public._mhq_auth(text,text) — run supabase/schema.sql first';
  end if;
  if to_regprocedure('public._mhq_admin_ok(text)') is null then
    raise exception 'missing public._mhq_admin_ok(text) — run supabase/schema.sql first';
  end if;
  if to_regprocedure('public._mhq_level(integer)') is null then
    raise exception 'missing public._mhq_level(integer) — run supabase/schema.sql first';
  end if;
  if to_regprocedure('public._mhq_dice_xp(jsonb)') is null then
    raise exception 'missing public._mhq_dice_xp(jsonb) — run supabase/migration-dice.sql first (it defines the shared XP economy this file pays on)';
  end if;
end $$;


-- ============================================================
--  1. TABLE
--
--  `best` is a FRACTION 0..1, not a raw score count. graph-quest's own
--  localStorage backend stores the raw count and renders "best/total";
--  blipwork's tile renders a PERCENT (brief D7), and a fraction is the
--  only thing that stays meaningful when a later play deals a different
--  number of items. Nothing inside the mount reads profile.best — the
--  mount only ever consults plays/done (js/mount.js runQuest) — so this
--  difference is invisible to Fun Functions itself.
--
--  `total` is the item count of the MOST RECENT play, mirroring what
--  graph-quest's saveResult() stores (it overwrites `total` every play
--  rather than keeping a maximum).
-- ============================================================
create table if not exists public.funfun_progress (
  student_id  uuid not null references public.students(id) on delete cascade,
  quest_id    text not null,
  best        numeric not null default 0,     -- 0..1 fraction of the round scored
  total       int     not null default 0,     -- items in the most recent play
  plays       int     not null default 0,
  done        boolean not null default false, -- has ever scored >= 0.7
  -- { skillId: true, … } — which round KINDS this learner has actually
  -- been SHOWN in this quest. Only qE opts into dealEachKindFirst, but
  -- the column is generic; js/funfun/mount.js threads it back in as
  -- profile.met[questId]. Never question content, only ids.
  met_kinds   jsonb not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now(),
  primary key (student_id, quest_id)
);
create index if not exists funfun_progress_student_idx on public.funfun_progress (student_id);

alter table public.funfun_progress enable row level security;
revoke all on public.funfun_progress from anon, authenticated;


-- ============================================================
--  2. THE FIFTEEN QUEST IDS — the allow-list, in ONE place.
--
--  Read out of js/funfun/quests/*.js (each file's `quest("<id>", …)`)
--  in the order js/funfun/quests/index.js's QUESTS array lists them,
--  which is also the order blipwork's tiles are drawn in:
--
--    1 q1   Discovery (parabola sliders)   9 qG   Average gradient
--    2 q1b  Discovery 2                   10 qT   Transformations
--    3 qB   Recognise (equation only)     11 qE   Find the equation
--    4 q2   Point on the graph            12 qK   Nature of roots
--    5 q3   Read the region               13 qI   Inequalities 2
--    6 q5   Signs                         14 qF   Find the fault
--    7 q6   Above / below                 15 q7   Exam mode
--    8 qL   Lengths
--
--  If a 16th quest is ever added upstream, this array and the tile
--  strip both need it — the array is what refuses an unknown id.
-- ============================================================
create or replace function public._mhq_funfun_quests()
returns text[] language sql immutable set search_path = '' as $$
  select array['q1','q1b','qB','q2','q3','q5','q6','qL','qG','qT','qE','qK','qI','qF','q7']::text[];
$$;


-- ============================================================
--  3. _mhq_funfun_profile — the profile payload, built once and
--     returned by all three learner RPCs so the client always gets
--     the same shape back (js/mount.js's host.profile() contract).
--     INTERNAL: revoked from anon/authenticated at the bottom; it
--     takes a student id, not a password, and must never be
--     callable directly.
-- ============================================================
create or replace function public._mhq_funfun_profile(p_sid uuid)
-- NOT marked STABLE on purpose: mhq_funfun_met and mhq_submit_funfun both
-- write and then call this to hand the fresh profile back, and a volatile
-- function is unambiguously reading what the same transaction just wrote.
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_quests jsonb; v_met jsonb; v_xp int;
begin
  select coalesce(jsonb_object_agg(quest_id, jsonb_build_object(
            'best', best, 'total', total, 'plays', plays, 'done', done)), '{}'::jsonb)
    into v_quests from public.funfun_progress where student_id = p_sid;

  -- only quests that HAVE met kinds, so the payload stays small; the
  -- mount reads (profile.met || {})[questId] || {} either way.
  select coalesce(jsonb_object_agg(quest_id, met_kinds), '{}'::jsonb)
    into v_met from public.funfun_progress
   where student_id = p_sid and met_kinds <> '{}'::jsonb;

  select xp into v_xp from public.students where id = p_sid;

  return jsonb_build_object('ok', true, 'xp', coalesce(v_xp, 0),
                            'quests', v_quests, 'met', v_met);
end; $$;


-- ============================================================
--  4. mhq_funfun_state — the learner's whole Fun Functions profile.
--     Called on entering the Functions chapter (to draw the tiles)
--     and by the play screen's host.profile().
-- ============================================================
create or replace function public.mhq_funfun_state(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;
  update public.students set last_active_at = now() where id = v_sid;
  return public._mhq_funfun_profile(v_sid);
end; $$;


-- ============================================================
--  5. mhq_funfun_met — folds one skill id into met_kinds and hands
--     the fresh profile back (host.markMet's contract: it returns a
--     profile). Idempotent. Only qE's dealEachKindFirst calls it, but
--     nothing here is qE-specific.
--
--     Pays NOTHING and can never pay anything — being shown a round
--     is not an achievement, and this RPC touches no xp/gold column.
-- ============================================================
create or replace function public.mhq_funfun_met(p_username text, p_password text,
                                                p_quest_id text, p_skill_id text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_skill text;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;

  if p_quest_id is null or not (p_quest_id = any(public._mhq_funfun_quests())) then
    return jsonb_build_object('ok', false, 'error', 'bad_round');
  end if;
  v_skill := nullif(btrim(coalesce(p_skill_id, '')), '');
  if v_skill is null or length(v_skill) > 64 then
    return jsonb_build_object('ok', false, 'error', 'bad_round');
  end if;

  insert into public.funfun_progress (student_id, quest_id, met_kinds)
  values (v_sid, p_quest_id, jsonb_build_object(v_skill, true))
  on conflict (student_id, quest_id) do update
    set met_kinds = public.funfun_progress.met_kinds || jsonb_build_object(v_skill, true),
        updated_at = now();

  return public._mhq_funfun_profile(v_sid);
end; $$;


-- ============================================================
--  6. mhq_submit_funfun — pays out one finished quest.
--
--     Takes NO xp and NO score from the client (see this file's
--     header): it is handed `answered`, the per-item outcome record,
--     and recomputes everything. A client that lies can only lie
--     about outcomes it would have had to play for anyway, and the
--     length cap + id allow-list bound the damage.
--
--     Row-locked (the double-submit rule, same as every gold/XP write
--     in this schema): the progress row is created-if-absent, then
--     SELECT … FOR UPDATE, then the students row FOR UPDATE.
-- ============================================================
create or replace function public.mhq_submit_funfun(p_username text, p_password text,
                                                    p_quest_id text, p_answered jsonb)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_row record; v_n int; v_i int; v_elem jsonb; v_outcome text;
        v_bools jsonb := '[]'::jsonb; v_score numeric := 0; v_frac numeric;
        v_passed boolean; v_already boolean; v_xp_gain int; v_gold_gain int := 10;
        v_old_xp int; v_new_xp int; v_new_gold int; v_old_lvl int; v_new_lvl int;
        v_best numeric; v_plays int;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;

  -- ---- validation (brief D3) ----
  if p_quest_id is null or not (p_quest_id = any(public._mhq_funfun_quests())) then
    return jsonb_build_object('ok', false, 'error', 'bad_round');
  end if;
  if p_answered is null or jsonb_typeof(p_answered) <> 'array' then
    return jsonb_build_object('ok', false, 'error', 'bad_round');
  end if;
  v_n := jsonb_array_length(p_answered);
  if v_n < 1 or v_n > 40 then
    return jsonb_build_object('ok', false, 'error', 'bad_round');
  end if;
  for v_i in 0 .. v_n - 1 loop
    if jsonb_typeof(p_answered->v_i) <> 'object' then
      return jsonb_build_object('ok', false, 'error', 'bad_round');
    end if;
  end loop;

  -- ---- the round, scored from `answered` alone ----
  for v_i in 0 .. v_n - 1 loop
    v_elem := p_answered->v_i;
    v_outcome := v_elem->>'outcome';
    -- coalesce: a record with no `outcome` key at all yields NULL here, and a
    -- jsonb null in the array would reach _mhq_dice_xp as NULL. It already
    -- treats that as "not correct", but say it out loud rather than lean on it.
    v_bools := v_bools || to_jsonb(coalesce(v_outcome in ('full', 'hinted', 'half'), false));
    v_score := v_score + case v_outcome
                           when 'full'   then 1
                           when 'hinted' then 1
                           when 'half'   then 0.5
                           else 0
                         end;
  end loop;
  v_passed := (v_score / v_n >= 0.7);   -- graph-quest js/play.js PASS, not blipwork's 0.8
  -- `best` is rounded to 4 decimals so this and js/local-backend.js's mirror
  -- store the SAME number. Unrounded, Postgres numeric division would give
  -- ~20 decimals and JavaScript a 64-bit double — two values that agree on
  -- screen but never byte-for-byte. The pass test above deliberately uses the
  -- UNROUNDED fraction, so rounding can never tip a round over the bar.
  v_frac := round(v_score / v_n, 4);

  -- ---- lock (create the row first so FOR UPDATE always has one) ----
  insert into public.funfun_progress (student_id, quest_id)
  values (v_sid, p_quest_id)
  on conflict (student_id, quest_id) do nothing;

  select * into v_row from public.funfun_progress
   where student_id = v_sid and quest_id = p_quest_id for update;
  v_already := coalesce(v_row.done, false);

  -- ---- the payout ----
  -- clamp first, THEN quarter it — the exact order mhq_submit_quest uses.
  v_xp_gain := greatest(0, least(coalesce(public._mhq_dice_xp(v_bools), 0), 1000));
  if v_already then v_xp_gain := round(v_xp_gain * 0.25)::int; end if;

  select xp into v_old_xp from public.students where id = v_sid for update;
  update public.students
     set xp = xp + v_xp_gain, gold = gold + v_gold_gain, last_active_at = now()
   where id = v_sid
   returning xp, gold into v_new_xp, v_new_gold;

  update public.funfun_progress
     set best  = greatest(best, v_frac),
         total = v_n,
         plays = plays + 1,
         done  = done or v_passed,
         updated_at = now()
   where student_id = v_sid and quest_id = p_quest_id
   returning best, plays into v_best, v_plays;

  v_old_lvl := (public._mhq_level(v_old_xp)->>'level')::int;
  v_new_lvl := (public._mhq_level(v_new_xp)->>'level')::int;

  return jsonb_build_object('ok', true,
    'xpAwarded', v_xp_gain, 'goldAwarded', v_gold_gain,
    -- `correct` is the SCORE, so a half-credit item contributes 0.5 —
    -- the results card renders "correct / total" and half credit is a
    -- real outcome in this game (a right answer on the second chance).
    'correct', v_score, 'total', v_n,
    'passed', v_passed, 'alreadyDone', v_already,
    'xp', v_new_xp, 'gold', v_new_gold, 'level', v_new_lvl,
    'levelUp', (v_new_lvl > v_old_lvl), 'levelInfo', public._mhq_level(v_new_xp),
    'best', v_best, 'plays', v_plays);
end; $$;


-- ============================================================
--  7. mhq_admin_funfun — the dashboard chip (brief D10): class-total
--     plays per quest id, nothing per student. Deliberately its own
--     RPC rather than a new field on mhq_admin_data (D3).
-- ============================================================
create or replace function public.mhq_admin_funfun(p_admin_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_plays jsonb;
begin
  if not public._mhq_admin_ok(p_admin_password) then
    return jsonb_build_object('ok', false, 'error', 'auth');
  end if;
  -- `plays > 0` matters: mhq_funfun_met creates a row the moment a round
  -- KIND is shown, so a quest someone opened and walked out of would
  -- otherwise report a 0 and light the chip for nothing.
  select coalesce(jsonb_object_agg(quest_id, total_plays), '{}'::jsonb) into v_plays
    from (select quest_id, sum(plays) as total_plays
            from public.funfun_progress where plays > 0 group by quest_id) t;
  return jsonb_build_object('ok', true, 'plays', v_plays);
end; $$;


-- ============================================================
--  8. GRANTS
--     · the four callable RPCs -> anon, authenticated (the admin one
--       too: admin.html signs in with the publishable key and a
--       password, exactly like mhq_admin_data).
--     · the two internals -> revoked from PUBLIC as well as anon and
--       authenticated. _mhq_funfun_profile takes a student id and no
--       password; it must never be reachable from the browser.
-- ============================================================
grant execute on function
  public.mhq_funfun_state(text, text),
  public.mhq_funfun_met(text, text, text, text),
  public.mhq_submit_funfun(text, text, text, jsonb),
  public.mhq_admin_funfun(text)
to anon, authenticated;

revoke execute on function public._mhq_funfun_profile(uuid) from public, anon, authenticated;
revoke execute on function public._mhq_funfun_quests() from public, anon, authenticated;


-- ============================================================
--  sanity checks after running
-- ============================================================
--   select * from public.funfun_progress limit 5;
--   -- expected: empty until the first learner finishes a Fun Functions quest.
--
--   select array_length(public._mhq_funfun_quests(), 1);
--   -- expected: 15
--
--   select public.mhq_funfun_state('someusername', 'wrongpassword');
--   select public.mhq_funfun_met('someusername', 'wrongpassword', 'q1', 'slider');
--   select public.mhq_submit_funfun('someusername', 'wrongpassword', 'q1', '[]'::jsonb);
--   select public.mhq_admin_funfun('wrongpassword');
--   -- expected, all four: {"ok": false, "error": "auth"}
--
--   -- with a REAL throwaway learner (replace someuser/somepassword):
--   select public.mhq_submit_funfun('someuser','somepassword','nope','[{"outcome":"full"}]'::jsonb);
--   -- expected: {"ok": false, "error": "bad_round"}   (unknown quest id)
--   select public.mhq_submit_funfun('someuser','somepassword','q1','[]'::jsonb);
--   -- expected: {"ok": false, "error": "bad_round"}   (empty array)
--   select public.mhq_submit_funfun('someuser','somepassword','q1','["full"]'::jsonb);
--   -- expected: {"ok": false, "error": "bad_round"}   (array of strings, not objects)
--
--   select public.mhq_submit_funfun('someuser','somepassword','q1',
--     '[{"outcome":"full"},{"outcome":"full"},{"outcome":"full"},
--       {"outcome":"full"},{"outcome":"full"},{"outcome":"full"}]'::jsonb);
--   -- expected: xpAwarded 180, correct 6, total 6, passed true, alreadyDone false
--   --   (15+25+35+35+35+35 — _mhq_dice_xp's streak cap of 3 bites from item 3 on)
--   select public.mhq_submit_funfun('someuser','somepassword','q1',
--     '[{"outcome":"full"},{"outcome":"full"},{"outcome":"full"},
--       {"outcome":"full"},{"outcome":"full"},{"outcome":"full"}]'::jsonb);
--   -- expected: xpAwarded 45 (= round(180 * 0.25)), alreadyDone true, plays 2
--
--   select public.mhq_funfun_state('someuser','somepassword');
--   -- expected: quests.q1 = {best: 1.0, total: 6, plays: 2, done: true}
--
--   -- grants: the two internals must NOT be executable by anon
--   select p.proname, has_function_privilege('anon', p.oid, 'execute') as anon_can
--     from pg_proc p join pg_namespace n on n.oid = p.pronamespace
--    where n.nspname = 'public' and p.proname like '%funfun%'
--    order by p.proname;
--   -- expected: _mhq_funfun_profile false, _mhq_funfun_quests false,
--   --           mhq_admin_funfun true, mhq_funfun_met true,
--   --           mhq_funfun_state true, mhq_submit_funfun true
--
--   -- table is unreachable without an RPC
--   select has_table_privilege('anon', 'public.funfun_progress', 'select');
--   -- expected: false
