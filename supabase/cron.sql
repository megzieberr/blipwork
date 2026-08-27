-- ============================================================
--  BLIPWORK — the notification schedule
--
--  A "schedule" = a job the database runs by itself at a set time. These
--  two call the send-push Edge Function, which then decides who actually
--  gets a notification.
--
--  THERE ARE TWO JOBS (2026-08-27, when homework notifications landed):
--
--    07:00 SA  "morning"  Sends any homework announcement that was HELD
--                         overnight. If she set homework at 21:00, the
--                         kids hear about it now instead of at bedtime.
--                         On most days this job does nothing at all —
--                         homework set during the day is announced the
--                         moment she clicks Save, straight from admin.
--
--    17:00 SA  "daily"    The evening reminder for homework due tomorrow,
--                         and then the Blip nudge for anyone whose Blip
--                         has gone hungry. One notification per learner
--                         per day, homework first.
--
--  RUN THIS ONLY AFTER you have:
--    1. run supabase/migration-phase3.sql,
--    2. run supabase/migration-push-homework.sql,
--    3. deployed the send-push Edge Function (with Verify JWT OFF), and
--    4. set its secrets (including CRON_SECRET).
--
--  BEFORE running, replace the placeholders below — they appear TWICE
--  each, once per job:
--    <PROJECT_REF>  ->  pjpwhalcifywjrwtjknd
--    <CRON_SECRET>  ->  the EXACT same value you set as the CRON_SECRET secret
--
--  PICK THE TIMES: pg_cron runs on UTC. South Africa is UTC+2 all year (no
--  daylight saving), so subtract 2 hours from the SA time you want:
--    07:00 SA (before school)         = 05:00 UTC  ->  '0 5 * * *'    <-- morning
--    15:00 SA (straight after school) = 13:00 UTC  ->  '0 13 * * *'
--    17:00 SA (settled at home)       = 15:00 UTC  ->  '0 15 * * *'   <-- daily
--    18:30 SA (after supper)          = 16:30 UTC  ->  '30 16 * * *'
--  Cron format is:  minute hour day-of-month month day-of-week
--
--  17:00 SA is the default deliberately: late enough that school and the
--  trip home are done, early enough that it isn't competing with supper or
--  landing after she has put the phone down for the evening.
--
--  ⚠️ If you move the MORNING job, keep it at or after 07:00 SA. The edge
--  function will not announce homework before 07:00 SA under any
--  circumstances — an earlier job would simply find nothing to do and the
--  announcement would wait another whole day.
-- ============================================================

-- Make sure the scheduling tools exist (also doable on the Extensions page).
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Remove old copies first so this file is safe to re-run.
do $$ begin perform cron.unschedule('blipwork-blip-reminder');   exception when others then null; end $$;
do $$ begin perform cron.unschedule('blipwork-morning-homework'); exception when others then null; end $$;

-- ------------------------------------------------------------
-- 1. MORNING — deliver homework held overnight. 07:00 SA (05:00 UTC).
-- ------------------------------------------------------------
select cron.schedule(
  'blipwork-morning-homework',
  '0 5 * * *',
  $job$
  select net.http_post(
    url     := 'https://<PROJECT_REF>.supabase.co/functions/v1/send-push',
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-secret', '<CRON_SECRET>'),
    body    := jsonb_build_object('type', 'morning')
  );
  $job$
);

-- ------------------------------------------------------------
-- 2. DAILY — evening homework reminder, then Blip. 17:00 SA (15:00 UTC).
--
-- Note it runs EVERY day: the weekend/holiday skip is decided inside the
-- function by _mhq_is_qual_day(), which also knows about the term toggle —
-- a cron expression could only ever handle the weekend half of that rule.
-- ------------------------------------------------------------
select cron.schedule(
  'blipwork-blip-reminder',
  '0 15 * * *',
  $job$
  select net.http_post(
    url     := 'https://<PROJECT_REF>.supabase.co/functions/v1/send-push',
    headers := jsonb_build_object('Content-Type', 'application/json', 'x-cron-secret', '<CRON_SECRET>'),
    body    := jsonb_build_object('type', 'daily')
  );
  $job$
);

-- To check both jobs were created, run:  select jobname, schedule from cron.job;
--   you should see blipwork-morning-homework and blipwork-blip-reminder.
-- To see whether they ran, run:          select * from cron.job_run_details order by start_time desc limit 5;
-- To change a time later, just edit it above and run this file again.
