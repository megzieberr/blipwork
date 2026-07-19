// ============================================================
//  BLIPWORK — send-push
//  The daily "your Blip is getting hungry" nudge.
//
//  One Edge Function (a small program Supabase runs on demand). The
//  pg_cron schedule in supabase/cron.sql calls it once a day, at 17:00
//  SA time by default. It runs on Deno, so libraries come in with npm:
//  specifiers.
//
//  ------------------------------------------------------------
//  THE RULING IT IMPLEMENTS (PHASE-3-PLAN.md §1)
//  Nudge on TRANSITION, never nag daily. A push fires only on the day
//  a learner ENTERS a stage:
//
//    days unfed | what she gets
//    -----------|------------------------------------------------
//      0–2      | silence (he's fine)
//      3        | gentle   — "he's looking a bit sleepy"
//      4        | silence  (already told her yesterday)
//      5        | clearer  — he's in bed, soup + medicine would help
//      6        | last word
//      7+       | SILENCE, permanently. She has been told twice. A
//               | learner who has disengaged does not need a daily
//               | guilt alarm — that is exactly the wrong move, and
//               | it is the fastest way to get notifications blocked.
//
//  Also silent: weekends and school holidays (the term toggle), via
//  _mhq_is_qual_day(); and any learner who has already fed him today.
//  At most ONE push per learner per day, enforced by writing
//  last_push_day / last_push_stage back onto push_subscriptions.
//
//  ------------------------------------------------------------
//  WHY THE HEALTH CLOCK IS NOT REIMPLEMENTED HERE
//  _mhq_health(last_fed_day, care_streak) in the database is the single
//  source of truth for how sick a Blip is — the term toggle, term_on_since,
//  the weekday-only counting rule and the pause rule all live inside it.
//  A second copy in TypeScript would drift the first time a rule changes
//  and would silently send the WRONG message. So this function calls it
//  over RPC, once per learner, and only maps its daysUnfed onto the
//  message table above.
//
//  ------------------------------------------------------------
//  TEST MODE: POST { "test": true } to ping EVERY subscribed device
//  regardless of stage, term or feeding. That is how PUSH-SETUP.md
//  Part 8 proves the plumbing works without waiting three days for a
//  Blip to get hungry. It deliberately does NOT write last_push_day,
//  so a test can never eat that day's real nudge.
// ============================================================

import { createClient } from "npm:@supabase/supabase-js@2";
import webpush from "npm:web-push@3.6.7";

// --- Configuration from environment ---------------------------------------
// SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are provided automatically by
// Supabase. The VAPID keys and CRON_SECRET are set by hand (PUSH-SETUP.md).
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const VAPID_PUBLIC = Deno.env.get("VAPID_PUBLIC_KEY")!;
const VAPID_PRIVATE = Deno.env.get("VAPID_PRIVATE_KEY")!;
const VAPID_SUBJECT = Deno.env.get("VAPID_SUBJECT") ?? "mailto:megzieberr@gmail.com";
const CRON_SECRET = Deno.env.get("CRON_SECRET")!;

webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC, VAPID_PRIVATE);

// Service role: bypasses RLS, and the app's own tables are REVOKEd from
// anon/authenticated, so nothing here is reachable from the browser.
const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

type SubRow = {
  endpoint: string;
  student_id: string;
  sub: unknown;
  last_push_day: string | null;
  last_push_stage: number | null;
};

// "Today" as the DATABASE sees it. Postgres `current_date` on Supabase is
// UTC, and last_fed_day / last_push_day are written by the RPCs with
// `current_date` — so comparing against a South-African calendar date (as
// Circle Quest does, for a different reason) would be subtly wrong two
// hours a day. The cron fires at 15:00 UTC / 17:00 SA, comfortably far
// from any date boundary in either zone, so this is stable in practice.
function dbToday(): string {
  return new Date().toISOString().slice(0, 10);
}

// ---- The message table ----------------------------------------------------
// Cute-hungry throughout. Never guilt, never "you have neglected", never a
// count of missed days — the app's identity is a low-intimidation recap
// tool and a scolding notification would contradict it outright.
// `name` is the learner's OWN name for her Blip: "Pixel is getting sleepy"
// lands where "Your Blip" reads like a system alert.
function messageFor(level: number, name: string): { title: string; body: string } | null {
  if (level === 1) {
    return {
      title: `${name} is getting sleepy 😴`,
      body: `He's had a quiet few days. A cookie would perk him right up whenever you have a minute.`,
    };
  }
  if (level === 2) {
    return {
      title: `${name} has taken to his bed 🛏️`,
      body: `Some soup and medicine would sort him out — he'd be very glad to see you.`,
    };
  }
  if (level === 3) {
    return {
      title: `${name} is still under the blankets 🍲`,
      body: `One visit with soup and medicine and he'll be back on his feet.`,
    };
  }
  return null;
}

// daysUnfed -> which message (0 = say nothing). The 7+ silence is the
// ruling, not an oversight: see the table at the top of this file.
function levelForDaysUnfed(du: number): number {
  if (du === 3) return 1;
  if (du === 5) return 2;
  if (du === 6) return 3;
  return 0;
}

// Send one payload to a set of subscriptions. Drops any endpoint the push
// service reports as gone (404 / 410) — that means the learner uninstalled
// the app or cleared her browser, and keeping the row would make every
// future run do doomed work.
async function sendTo(subs: SubRow[], payload: Record<string, unknown>) {
  let sent = 0;
  let removed = 0;
  const delivered: string[] = [];
  for (const row of subs) {
    try {
      await webpush.sendNotification(row.sub as never, JSON.stringify(payload));
      sent++;
      delivered.push(row.endpoint);
    } catch (err) {
      const code = (err as { statusCode?: number }).statusCode;
      if (code === 404 || code === 410) {
        await admin.from("push_subscriptions").delete().eq("endpoint", row.endpoint);
        removed++;
      }
      // Any other error (a 5xx from the push service, a timeout) is left
      // alone on purpose: it is usually transient, and deleting a live
      // subscription on a blip of bad luck silently un-enrols a learner.
    }
  }
  return { sent, removed, delivered };
}

Deno.serve(async (req) => {
  // Only our own cron job (which knows the shared secret) may trigger this.
  // The function is deployed with Verify JWT OFF, so this header IS the lock.
  if (req.headers.get("x-cron-secret") !== CRON_SECRET) {
    return new Response("forbidden", { status: 401 });
  }

  let body: { test?: boolean } = {};
  try { body = await req.json(); } catch { body = {}; }

  const today = dbToday();

  // Every subscription, with its per-device bookkeeping.
  const { data: subRows, error: subErr } = await admin
    .from("push_subscriptions")
    .select("endpoint, student_id, sub, last_push_day, last_push_stage");
  if (subErr) return Response.json({ ok: false, error: subErr.message }, { status: 500 });

  const subs = (subRows ?? []) as SubRow[];
  if (!subs.length) return Response.json({ ok: true, today, targets: 0, sent: 0, note: "no subscriptions" });

  // The learners' Blip names (slot 1 — the original companion; slot 2 is
  // the reward baby and is not who the reminder is about).
  const ids = [...new Set(subs.map((s) => s.student_id))];
  const { data: blipRows } = await admin
    .from("blips")
    .select("student_id, name")
    .eq("slot", 1)
    .in("student_id", ids);
  const nameOf = new Map<string, string>();
  for (const b of blipRows ?? []) {
    const n = String((b as { name?: string }).name ?? "").trim();
    if (n) nameOf.set((b as { student_id: string }).student_id, n);
  }
  // Fallback when a learner never renamed him (or the row is missing).
  const blipName = (id: string) => nameOf.get(id) || "Blip";

  // --- TEST MODE ----------------------------------------------------------
  // Ping everything. No stage logic, no term gate, no bookkeeping written.
  if (body.test === true) {
    let sent = 0, removed = 0;
    for (const id of ids) {
      const mine = subs.filter((s) => s.student_id === id);
      const res = await sendTo(mine, {
        title: "Blipwork",
        body: `${blipName(id)} says hello 👋 — reminders are working.`,
        url: "./",
        tag: "blipwork-test",
      });
      sent += res.sent;
      removed += res.removed;
    }
    return Response.json({ ok: true, mode: "test", today, devices: subs.length, sent, removed });
  }

  // --- THE TERM / WEEKEND GATE -------------------------------------------
  // _mhq_is_qual_day() is false on weekends and whenever the term toggle is
  // off (holidays). The sickness clock itself is paused then, so a nudge
  // would be about a day that never counted.
  const { data: qual, error: qualErr } = await admin.rpc("_mhq_is_qual_day");
  if (qualErr) return Response.json({ ok: false, error: `_mhq_is_qual_day: ${qualErr.message}` }, { status: 500 });
  if (qual !== true) {
    return Response.json({ ok: true, today, skipped: "not_a_qualifying_day", sent: 0 });
  }

  // The learners' feeding state, which is all _mhq_health needs.
  const { data: studRows, error: studErr } = await admin
    .from("students")
    .select("id, last_fed_day, care_streak")
    .in("id", ids);
  if (studErr) return Response.json({ ok: false, error: studErr.message }, { status: 500 });

  let sent = 0, removed = 0, considered = 0;
  const detail: Array<Record<string, unknown>> = [];

  for (const st of (studRows ?? []) as Array<{ id: string; last_fed_day: string | null; care_streak: number | null }>) {
    considered++;

    // Already fed today — nothing to say. (daysUnfed would be 0 anyway;
    // this is the explicit, readable version of the same rule.)
    if (st.last_fed_day === today) continue;

    // THE health clock. Never recomputed here — see the header.
    const { data: health, error: healthErr } = await admin.rpc("_mhq_health", {
      p_last_fed: st.last_fed_day,
      p_care_streak: st.care_streak ?? 0,
    });
    if (healthErr) { detail.push({ student: st.id, error: healthErr.message }); continue; }

    const du = Number((health as { daysUnfed?: number } | null)?.daysUnfed ?? 0);
    const level = levelForDaysUnfed(du);
    if (!level) continue;

    const mine = subs.filter((s) => s.student_id === st.id);
    if (!mine.length) continue;

    // ONE PUSH PER LEARNER PER DAY. The bookkeeping columns live per
    // device, so the decision is made on the learner's most recent push
    // across all her devices — otherwise a second phone would double up.
    const latest = mine
      .filter((s) => !!s.last_push_day)
      .sort((a, b) => (a.last_push_day! < b.last_push_day! ? -1 : 1))
      .pop() ?? null;
    const lastDay = latest?.last_push_day ?? null;
    if (lastDay === today) { detail.push({ student: st.id, skipped: "already_pushed_today" }); continue; }

    // AND never the same message twice in one sickness episode. The
    // episode began after last_fed_day, so a push recorded since then is
    // part of THIS episode; one from before it belongs to a previous
    // round of getting hungry and must not silence today's nudge.
    const lastStage = typeof latest?.last_push_stage === "number" ? latest.last_push_stage : null;
    const sameEpisode = lastDay !== null && (st.last_fed_day === null || lastDay > st.last_fed_day);
    if (sameEpisode && lastStage === level) { detail.push({ student: st.id, skipped: "stage_already_sent" }); continue; }

    const msg = messageFor(level, blipName(st.id));
    if (!msg) continue;

    const res = await sendTo(mine, { ...msg, url: "./", tag: "blipwork-blip" });
    sent += res.sent;
    removed += res.removed;

    // Record it only on the devices that actually took the push — an
    // endpoint that erred should be free to try again tomorrow.
    if (res.delivered.length) {
      await admin
        .from("push_subscriptions")
        .update({ last_push_day: today, last_push_stage: level })
        .in("endpoint", res.delivered);
    }
    detail.push({ student: st.id, daysUnfed: du, level, devices: mine.length, sent: res.sent });
  }

  return Response.json({ ok: true, today, considered, sent, removed, detail });
});
