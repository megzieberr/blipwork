-- ============================================================
--  ⚠️ WRITTEN, NOT RUN. Nothing in this file has touched the live
--  database — foreman build day 2026-08-21, session C (EXAM FOCUS
--  INFRASTRUCTURE). SQL files may be written today but must never be
--  applied; the foreman runs this later, once EXAM-FOCUS-PLAN.md's
--  build order actually reaches a chapter going live.
--
--  Migration name: exam_focus_infrastructure
--
--  WHY THIS EXISTS: EXAM-FOCUS-PLAN.md — the exam focus tab is real
--  pen-and-paper exam revision wearing a friendly face. The learner works
--  a question part by part on paper, reveals the colour memo, and marks
--  themselves (the app never marks). The server's ONLY jobs are: (1)
--  remember which parts of which question a learner has already opened,
--  so a phone swap never loses their place, and (2) pay a flat reward
--  once a question's every part has been opened, exactly once ever.
--  There is no correctness signal anywhere in this schema, by design.
--
--  WHAT THIS DOES
--   1. One new table, exam_progress: per (student, question), the set of
--      part ids opened so far, whether the question is complete, and
--      when. RLS on, no policies, revoke-all — SECURITY DEFINER RPCs
--      only, same posture as every other table here.
--   2. mhq_exam_state(u, p) — the learner's whole exam-focus progress
--      map, keyed by question_id: { partsOpened, completed, completedAt }.
--      Read by the topic screen ("worked N of M"), the question list (✓
--      badges) and the player itself (restoring an in-progress question's
--      already-revealed parts on reload).
--   3. mhq_exam_open_part(u, p, question_id, part_id, total_parts) —
--      records ONE part reveal, idempotently (re-revealing an
--      already-opened part is a no-op beyond confirming the set). When
--      the part just opened brings parts_opened up to total_parts, the
--      question flips completed = true and pays a flat 75 XP + 10 gold
--      (js/config.js EXAM.xpPerQuestion / EXAM.goldPerQuestion — SERVER
--      LITERALS here, mirrored there for display only, never the other
--      way round — same "never client-named" posture DICE-PLAN.md
--      established for _mhq_dice_xp, just flat instead of formula-based).
--      Once completed = true, ANY further call for that question is a
--      pure no-op (0 XP, 0 gold) — the row's own completed flag IS the
--      dedupe ("paid once per question ever", her ruling).
--
--  ⚠️ JUDGEMENT CALL — total_parts is CLIENT-SUPPLIED CONTENT-SHAPE DATA,
--  not a trust-sensitive amount. The seeded question bank
--  (js/exam/index.js) lives entirely in client-side JS — nothing about a
--  question's shape is mirrored server-side (unlike, say, shop prices) —
--  so the server has no independent way to know how many parts a
--  question has. The AMOUNT paid is still never client-named (it's the
--  two literals above, full stop); total_parts only decides WHEN
--  completion fires. Worst case if a learner spoofed a smaller
--  total_parts for a real question: they'd bank that question's flat
--  75 XP / 10 gold after opening fewer parts than intended — bounded to
--  once per real question id they already know, and consistent with the
--  EXISTING trust model on mhq_submit_quest (which has always taken a
--  client-supplied p_xp, clamped 0-1000) — not a new category of risk
--  this schema introduces. Clamped defensively to [1, 40] below anyway.
--  Flagged here for the foreman/Megan to see plainly; not one of the
--  build order's open questions, so this session made the call rather
--  than blocking on it.
--
--  ⚠️ THE BRIEF SAID "three new RPCs" BUT NAMED TWO — mhq_exam_state and
--  mhq_exam_open_part, with "completion+pay folded into open_part" read
--  as a description of the second RPC's behaviour, not a third function.
--  Built exactly two learner RPCs; flagged in the build report rather
--  than guessing at an unnamed third one.
--
--  ⚠️ mhq_get_state IS DELIBERATELY UNTOUCHED BY THIS FILE. Sessions A/B
--  already re-created it once each today (dice, then mood/cravings) — a
--  third re-creation in the same build day, chained off files this
--  session didn't author, is exactly the copy-forward-drift risk
--  migration-mood-cravings.sql's own header warns about. Exam-focus
--  progress is read through its OWN new RPC (mhq_exam_state) instead —
--  fully additive, order-safe next to migration-mood-cravings.sql (or
--  before it, or without it ever running) either way.
--
--  Mirrored in: supabase/schema.sql (table + both functions + grants),
--  js/config.js (EXAM block, display mirror only), js/local-backend.js
--  (the offline ?local=1 mirror), js/supabase.js (the two RPC calls).
--  verify-exam.html cross-checks the SQL's XP/gold literals against
--  js/config.js's EXAM block and exercises the local round-trip.
-- ============================================================


-- ============================================================
--  1. TABLE
-- ============================================================
create table if not exists public.exam_progress (
  student_id    uuid not null references public.students(id) on delete cascade,
  question_id   text not null,
  -- part ids opened so far, e.g. ["a","b"] — jsonb array of text, not
  -- int[] (the brief's own "int[] (or jsonb)" leaves this open): part
  -- ids are letters ("a","b","c" — see js/exam/_schema.js), not integers.
  parts_opened  jsonb not null default '[]'::jsonb,
  completed     boolean not null default false,
  completed_at  timestamptz,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  primary key (student_id, question_id)
);
create index if not exists exam_progress_student_idx on public.exam_progress (student_id);

alter table public.exam_progress enable row level security;
revoke all on public.exam_progress from anon, authenticated;


-- ============================================================
--  2. mhq_exam_state — the learner's whole exam-focus progress map.
--     Learner-callable, read-only.
-- ============================================================
create or replace function public.mhq_exam_state(p_username text, p_password text)
returns jsonb language plpgsql security definer set search_path = public, extensions as $$
declare v_sid uuid; v_progress jsonb;
begin
  v_sid := public._mhq_auth(p_username, p_password);
  if v_sid is null then return jsonb_build_object('ok', false, 'error', 'auth'); end if;

  select coalesce(jsonb_object_agg(question_id, jsonb_build_object(
            'partsOpened', parts_opened, 'completed', completed, 'completedAt', completed_at)), '{}'::jsonb)
    into v_progress from public.exam_progress where student_id = v_sid;

  return jsonb_build_object('ok', true, 'progress', v_progress);
end; $$;


-- ============================================================
--  3. mhq_exam_open_part — records one part reveal, idempotently; pays
--     out exactly once, the moment a question's parts_opened first
--     reaches p_total_parts. Row-locked (double-submit rule, same as
--     every other gold/XP write in this schema).
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
    -- EXAM-FOCUS-PLAN.md kickoff (2026-08-21): flat pay per completed
    -- question, once ever. SERVER LITERALS — must mirror js/config.js's
    -- EXAM block; verify-exam.html cross-checks the two never drift.
    v_xp_gain := 75;    -- EXAM.xpPerQuestion
    v_gold_gain := 10;  -- EXAM.goldPerQuestion
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
--  4. GRANTS — the two new learner RPCs. Postgres grants EXECUTE to
--     PUBLIC by default on CREATE FUNCTION — without this block anon
--     could call either straight through PostgREST.
-- ============================================================
grant execute on function
  public.mhq_exam_state(text, text),
  public.mhq_exam_open_part(text, text, text, text, integer)
to anon, authenticated;


-- ============================================================
--  sanity checks after running
-- ============================================================
--   select * from public.exam_progress limit 5;
--   -- expected: empty until a learner reveals their first exam-focus part.
--   select public.mhq_exam_state('someusername', 'wrongpassword');
--   -- expected: {"ok": false, "error": "auth"}
--   select public.mhq_exam_open_part('someusername','wrongpassword','q1','a',4);
--   -- expected: {"ok": false, "error": "auth"}
--   select public.mhq_exam_open_part('someusername','somepassword','harness.stub.q1','a',4);
--   -- expected: ok:true, partsOpened:["a"], completed:false, xpAwarded:0
--   -- (repeat for 'b','c', then 'd' — the 4th call should flip
--   -- completed:true and pay xpAwarded:75, goldAwarded:10)
--   select public.mhq_exam_open_part('someusername','somepassword','harness.stub.q1','a',4);
--   -- expected (replayed after completion): completed:true, justCompleted:false, xpAwarded:0
-- ============================================================
