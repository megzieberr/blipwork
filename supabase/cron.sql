-- ============================================================
--  BLIPWORK — the daily Blip reminder schedule
--
--  A "schedule" = a job the database runs by itself at a set time. This one
--  calls the send-push Edge Function once a day. That function then decides
--  who actually gets a notification: only learners whose Blip has just
--  crossed into a hungrier stage (day 3, day 5, day 6), never on weekends
--  or holidays, never twice in one day, and never at all from day 7.
--
--  RUN THIS ONLY AFTER you have:
--    1. run supabase/migration-phase3.sql,
--    2. deployed the send-push Edge Function (with Verify JWT OFF), and
--    3. set its secrets (including CRON_SECRET).
--
--  BEFORE running, replace the two placeholders below:
--    <PROJECT_REF>  ->  pjpwhalcifywjrwtjknd
--    <CRON_SECRET>  ->  the EXACT same value you set as the CRON_SECRET secret
--
--  PICK THE TIME: pg_cron runs on UTC. South Africa is UTC+2 all year (no
--  daylight saving), so subtract 2 hours from the SA time you want:
--    15:00 SA (straight after school) = 13:00 UTC  ->  '0 13 * * *'
--    17:00 SA (settled at home)       = 15:00 UTC  ->  '0 15 * * *'   <-- default below
--    18:30 SA (after supper)          = 16:30 UTC  ->  '30 16 * * *'
--  Cron format is:  minute hour day-of-month month day-of-week
--
--  17:00 SA is the default deliberately: late enough that school and the
--  trip home are done, early enough that it isn't competing with supper or
--  landing after she has put the phone down for the evening.
-- ============================================================

-- Make sure the scheduling tools exist (also doable on the Extensions page).
create extension if not exists pg_cron;
create extension if not exists pg_net;

-- Remove an old copy first so this file is safe to re-run.
do $$ begin perform cron.unschedule('blipwork-blip-reminder'); exception when others then null; end $$;

-- Daily Blip reminder. Default 17:00 SA (15:00 UTC).
-- Note it runs EVERY day: the weekend/holiday skip is decided inside the
-- function by _mhq_is_qual_day(), which also knows about the term toggle —
-- a cron expression could only ever handle the weekend half of that rule.
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

-- To check the job was created, run:   select jobname, schedule from cron.job;
-- To see whether it ran, run:          select * from cron.job_run_details order by start_time desc limit 5;
-- To change the time later, just edit the time above and run this file again.
