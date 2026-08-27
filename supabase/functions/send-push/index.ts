// ============================================================
//  BLIPWORK — send-push
//  Every notification the app sends, in one function.
//
//  One Edge Function (a small program Supabase runs on demand). It runs
//  on Deno, so libraries come in with npm: specifiers.
//
//  ------------------------------------------------------------
//  THE THREE KINDS (her ask, 2026-08-27)
//
//    homework  "📚 New homework!"      — the moment she sets it in admin,
//                                        or held to 07:00 if it's late.
//    nudge     "still to do"            — the evening before it's due, and
//                                        only to a learner who hasn't
//                                        passed it yet.
//    blip      "he's getting hungry"    — DAILY while Blip is unwell.
//
//  ------------------------------------------------------------
//  ⚠️ ONE NOTIFICATION PER LEARNER PER DAY, STILL.
//  Her ruling 2026-08-27, verbatim: "homework beats blip". So when more
//  than one wants to fire on the same day the order is
//
//      homework  >  nudge  >  blip
//
//  and the losers simply don't send. Blip will still be hungry tomorrow;
//  a phone that buzzes three times in an evening gets its notifications
//  switched off, and then none of this works for anybody. The budget is
//  spent by writing last_push_day (+ last_push_kind) onto the learner's
//  devices, exactly as before.
//
//  ------------------------------------------------------------
//  WHAT CHANGED FROM THE ORIGINAL HUNGER-ONLY VERSION (2026-07-19)
//
//  The old ruling was nudge-on-TRANSITION: days 3, 5 and 6 only, then
//  permanent silence from day 7. She has overruled it — the kids asked
//  for a daily reminder — so levelForDaysUnfed() now returns a level for
//  EVERY day from 3 onwards and the "same stage twice per episode" check
//  is gone with it.
//
//  The reason the old rule existed has NOT gone away, so it is answered
//  in the wording instead: from day 7 the message stops escalating and
//  turns into a soft, no-pressure line that is safe to read fourteen days
//  running. A daily notification may be repetitive; it must never nag.
//  If notifications start getting switched off, THIS is the knob.
//
//  ------------------------------------------------------------
//  WHY THE HEALTH CLOCK IS NOT REIMPLEMENTED HERE
//  _mhq_health(last_fed_day, care_streak) in the database is the single
//  source of truth for how sick a Blip is — the term toggle, term_on_since,
//  the weekday-only counting rule and the pause rule all live inside it.
//  A second copy in TypeScript would drift the first time a rule changes
//  and would silently send the WRONG message. So this function calls it
//  over RPC, once per learner, and only maps its daysUnfed onto a message.
//
//  ------------------------------------------------------------
//  WHO IS ALLOWED TO CALL IT
//  Deployed with Verify JWT OFF, so this function checks callers itself,
//  two ways:
//    · x-cron-secret header  — the pg_cron schedule (supabase/cron.sql).
//    · { admin_pw } in body  — admin.html, when she saves homework and we
//      want the kids told NOW rather than at the next cron tick. Checked
//      through mhq_admin_ok_rpc, the service-role-only wrapper over
//      _mhq_admin_ok that paper-admin already uses. No new secret exists
//      anywhere, and the CRON_SECRET never goes near a browser.
//  An admin_pw caller may ONLY run mode "homework". It cannot make Blip
//  nudges fire, and it cannot run the test ping.
//
//  ------------------------------------------------------------
//  THE MODES
//    { test: true }        cron-secret only. Pings EVERY subscribed device
//                          regardless of stage, term or feeding — that is
//                          how PUSH-SETUP.md Part 8 proves the plumbing
//                          without waiting three days. Writes NO
//                          bookkeeping, so a test can never eat a real one.
//    { mode: "homework" }  admin_pw or cron secret. Announce the active
//                          assignment NOW if the clock is inside the
//                          polite window, otherwise leave it for morning.
//    { type: "morning" }   cron 07:00 SA. Sends any announcement that was
//                          held overnight. Usually does nothing at all.
//    { type: "daily" }     cron 17:00 SA. The evening nudge, then Blip.
//                          (An empty body {} means this, as before.)
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
  last_push_kind: string | null;
};

type AsgRow = {
  id: string;
  quest_id: string;
  note: string | null;
  due_on: string | null;
  announce_title: string | null;
  announce_chapter: string | null;
  announced_at: string | null;
};

// ============================================================
//  >>> PURE-BLOCK START <<<
//
//  Everything between these two markers is pure: no network, no database,
//  no Deno globals. verify-push.mjs SLICES THIS EXACT TEXT out of this
//  file and runs it under Node, so these are the real decisions being
//  tested, not a copy that can drift.
//
//  ⚠️ Two rules for anything living in here:
//    · it must not touch `admin`, `Deno`, or any import — the slice is
//      compiled on its own and an outside reference is a harness crash;
//    · these marker comments are load-bearing. verify-push.mjs fails
//      loudly if either one goes missing, but a function MOVED out of
//      the block silently stops being tested. Keep decisions inside.
//
//  Why a slice rather than a second file: PUSH-SETUP.md Part 6 has her
//  deploy this function by PASTING index.ts into the Supabase browser
//  editor. A `./logic.ts` import would be cleaner and would never reach
//  the server. One file is the constraint; the marker is the workaround.
// ============================================================

// ---- Time ----------------------------------------------------------------
// South Africa is UTC+2 all year — no daylight saving, ever. That single
// fact is why the two-hour offset below can be a constant.
const SA_OFFSET_HOURS = 2;

// `at` exists only so the harness can ask "what would you decide at 21:30?"
// without moving the machine clock. Production always calls it with nothing.
function saNow(at?: number): Date {
  return new Date((at ?? Date.now()) + SA_OFFSET_HOURS * 3600_000);
}

// "Today" as a plain YYYY-MM-DD in SOUTH AFRICAN calendar terms.
//
// The original version of this file used the UTC date, reasoning that the
// cron fires at 15:00 UTC, comfortably far from any date boundary. That is
// still true of the cron runs (05:00 and 15:00 UTC), but homework can now
// be announced the moment she clicks Save — at any hour — so the safe
// answer is the one the learner's phone would give. The polite-hours
// window means a homework push only ever SENDS between 05:00 and 17:00
// UTC, where the two dates agree anyway; this is belt and braces.
function today(at?: number): string {
  return saNow(at).toISOString().slice(0, 10);
}

function addDays(ymd: string, n: number): string {
  const d = new Date(ymd + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

// ---- The polite window ---------------------------------------------------
// Her ruling 2026-08-27: homework saved late at night must "hold off until
// the next morning". Inside these hours a new assignment is announced
// immediately; outside them it waits for the 07:00 run.
//
// 19:00 rather than something later on purpose: these are school kids, and
// a 21:00 "new homework!" buzz is the exact thing that makes a parent turn
// notifications off for the whole app.
const ANNOUNCE_FROM_HOUR = 7;
const ANNOUNCE_UNTIL_HOUR = 19;

function insidePoliteHours(at?: number): boolean {
  const h = saNow(at).getUTCHours();     // saNow() is already shifted, so UTC getters read SA
  return h >= ANNOUNCE_FROM_HOUR && h < ANNOUNCE_UNTIL_HOUR;
}

// ---- The priority rule ---------------------------------------------------
// HER RULING 2026-08-27, verbatim: "homework beats blip". Expressed as one
// predicate rather than scattered `if (kind !== "homework")` checks, so the
// rule has exactly one place to be read, changed, or tested.
//
// True  = this kind may send even if the learner has already had today's
//         notification (it is important enough to be the one that lands).
// False = this kind stands down when the day's budget is already spent.
function outranksDailyBudget(kind: string): boolean {
  return kind === "homework";
}

// ---- The message tables --------------------------------------------------
// Cute-hungry throughout. Never guilt, never "you have neglected", never a
// count of missed days — the app's identity is a low-intimidation recap
// tool and a scolding notification would contradict it outright.
// `name` is the learner's OWN name for her Blip: "Pixel is getting sleepy"
// lands where "Your Blip" reads like a system alert.
function messageFor(level: number, name: string, day: number): { title: string; body: string } | null {
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
    // DAY 7 AND ON. This is the message that now repeats, possibly for
    // weeks, so it must stay warm and completely pressure-free — no day
    // count, no "still", no escalation. Two variants alternate so a week
    // of them doesn't read like a stuck machine; neither one asks twice.
    return day % 2 === 0
      ? {
          title: `${name} is keeping his blanket warm 🍲`,
          body: `He's not going anywhere. Soup and medicine whenever you feel like popping in.`,
        }
      : {
          title: `${name} sends a small wave 👋`,
          body: `He's cosy enough, just a bit under the weather. Come by when you have a moment.`,
        };
  }
  return null;
}

// daysUnfed -> which message. 0 = say nothing.
//
// HER RULING 2026-08-27: daily, not transitions. Days 0–2 are still silent
// (he is genuinely fine, and a notification about nothing teaches people to
// ignore them); from day 3 there is a message every qualifying day.
function levelForDaysUnfed(du: number): number {
  if (du < 3) return 0;
  if (du <= 4) return 1;
  if (du <= 6) return 2;
  return 3;
}

// The learner-facing due wording. MIRRORS dueLine() in js/assignment.js —
// that is the source of truth and this is a copy, because Deno cannot
// import a browser module. Keep the two in step: a notification that says
// something the homework card doesn't is worse than no notification.
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
// ⚠️ ABBREVIATED, because js/assignment.js's MONTHS is abbreviated. Spelling
// these out in full was a real bug caught by verify-push.mjs on 2026-08-27:
// the notification said "by 3 September" while the learner's pinned card
// said "by 3 Sep". Same day, two different-looking answers, and the kid has
// to work out whether they mean the same thing. Copy the app, don't improve
// on it.
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function dueLine(dueOn: string | null, at?: number): string | null {
  if (!dueOn) return null;
  const due = new Date(dueOn + "T00:00:00Z");
  if (isNaN(due.getTime())) return null;
  const days = Math.round((due.getTime() - new Date(today(at) + "T00:00:00Z").getTime()) / 864e5);
  if (days < 0) return null;                        // past — say nothing at all
  if (days === 0) return "by today";
  if (days === 1) return "by tomorrow";
  if (days < 7) return `by ${DAY_NAMES[due.getUTCDay()]}`;
  return `by ${due.getUTCDate()} ${MONTHS[due.getUTCMonth()]}`;
}

// "📚 New homework!" — the announcement. Falls back gracefully all the way
// down to a bare chapter-less line if mhq_admin_set_announce never ran.
function homeworkMessage(asg: AsgRow, at?: number): { title: string; body: string } {
  const what = asg.announce_title
    ? (asg.announce_chapter ? `${asg.announce_title} · ${asg.announce_chapter}` : asg.announce_title)
    : (asg.announce_chapter ? `A new ${asg.announce_chapter} quest` : "A new quest is pinned to your hub");
  const tail = [dueLine(asg.due_on, at), asg.note ? `“${asg.note}”` : null].filter(Boolean).join(" — ");
  return {
    title: "📚 New homework!",
    body: tail ? `${what}\n${tail}` : what,
  };
}

// The evening-before reminder. Deliberately softer than the announcement:
// this one lands on a learner who already knows, so it is a tap on the
// shoulder, not a second announcement.
function nudgeMessage(asg: AsgRow): { title: string; body: string } {
  const what = asg.announce_title || "your homework quest";
  return {
    title: "A quick reminder 🩵",
    body: `${what} is due tomorrow — it's still waiting on your hub whenever you're ready.`,
  };
}

// ============================================================
//  >>> PURE-BLOCK END <<<
// ============================================================

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

// Spend a learner's daily budget on the devices that actually took the
// push. An endpoint that erred should be free to try again tomorrow.
async function spendBudget(delivered: string[], kind: string, day: string, stage: number | null) {
  if (!delivered.length) return;
  const patch: Record<string, unknown> = { last_push_day: day, last_push_kind: kind };
  if (stage !== null) patch.last_push_stage = stage;
  await admin.from("push_subscriptions").update(patch).in("endpoint", delivered);
}

function json(body: unknown, status = 200) {
  return Response.json(body as Record<string, unknown>, { status });
}

Deno.serve(async (req) => {
  let body: { test?: boolean; mode?: string; type?: string; admin_pw?: string } = {};
  try { body = await req.json(); } catch { body = {}; }

  // ---- WHO IS CALLING ----------------------------------------------------
  const cronOk = req.headers.get("x-cron-secret") === CRON_SECRET;
  let adminOk = false;
  if (!cronOk && typeof body.admin_pw === "string" && body.admin_pw) {
    const { data: ok, error } = await admin.rpc("mhq_admin_ok_rpc", { p_admin_password: body.admin_pw });
    if (error) return json({ ok: false, error: `admin check: ${error.message}` }, 500);
    adminOk = ok === true;
  }
  if (!cronOk && !adminOk) return new Response("forbidden", { status: 401 });

  // An admin-password caller is her browser, not the scheduler. It may
  // announce homework and nothing else — no test pings, no Blip runs.
  const mode = body.test === true ? "test" : (body.mode || body.type || "daily");
  if (adminOk && mode !== "homework") {
    return json({ ok: false, error: "admin_pw may only run mode 'homework'" }, 403);
  }

  const day = today();

  // Every subscription, with its per-device bookkeeping.
  const { data: subRows, error: subErr } = await admin
    .from("push_subscriptions")
    .select("endpoint, student_id, sub, last_push_day, last_push_stage, last_push_kind");
  if (subErr) return json({ ok: false, error: subErr.message }, 500);

  const subs = (subRows ?? []) as SubRow[];

  // The learners' Blip names (slot 1 — the original companion; slot 2 is
  // the reward baby and is not who the reminder is about).
  const ids = [...new Set(subs.map((s) => s.student_id))];
  const nameOf = new Map<string, string>();
  if (ids.length) {
    const { data: blipRows } = await admin
      .from("blips").select("student_id, name").eq("slot", 1).in("student_id", ids);
    for (const b of blipRows ?? []) {
      const n = String((b as { name?: string }).name ?? "").trim();
      if (n) nameOf.set((b as { student_id: string }).student_id, n);
    }
  }
  // Fallback when a learner never renamed him (or the row is missing).
  const blipName = (id: string) => nameOf.get(id) || "Blip";

  const subsOf = (id: string) => subs.filter((s) => s.student_id === id);

  // Has this learner already had her one notification today? Decided across
  // ALL her devices — otherwise a second phone would double up.
  const pushedToday = new Set(
    subs.filter((s) => s.last_push_day === day).map((s) => s.student_id),
  );

  // ========================================================================
  //  TEST MODE — ping everything, write nothing.
  // ========================================================================
  if (mode === "test") {
    if (!subs.length) return json({ ok: true, mode: "test", today: day, devices: 0, sent: 0 });
    let sent = 0, removed = 0;
    for (const id of ids) {
      const res = await sendTo(subsOf(id), {
        title: "Blipwork",
        body: `${blipName(id)} says hello 👋 — reminders are working.`,
        url: "./",
        tag: "blipwork-test",
      });
      sent += res.sent; removed += res.removed;
    }
    return json({ ok: true, mode: "test", today: day, devices: subs.length, sent, removed });
  }

  // ---- The active assignment, needed by two of the three modes -----------
  const { data: asgRows, error: asgErr } = await admin
    .from("assignments")
    .select("id, quest_id, note, due_on, announce_title, announce_chapter, announced_at")
    .eq("active", true)
    .limit(1);
  if (asgErr) return json({ ok: false, error: asgErr.message }, 500);
  const asg = ((asgRows ?? [])[0] ?? null) as AsgRow | null;

  // ========================================================================
  //  HOMEWORK — the announcement.
  //
  //  "homework" is her Save click (or the cron secret, for testing);
  //  "morning" is the 07:00 run sweeping up anything held overnight. The
  //  ONLY difference between them is the polite-hours check, so they share
  //  one body: morning IS the late path arriving.
  // ========================================================================
  if (mode === "homework" || mode === "morning") {
    if (!asg) return json({ ok: true, mode, today: day, skipped: "no_active_assignment", sent: 0 });
    if (asg.announced_at) {
      return json({ ok: true, mode, today: day, skipped: "already_announced", sent: 0 });
    }
    if (mode === "homework" && !insidePoliteHours()) {
      // HELD. Nothing is written: announced_at staying null IS the queue,
      // and the 07:00 run is what drains it.
      return json({
        ok: true, mode, today: day, held: true, sent: 0,
        note: `outside ${ANNOUNCE_FROM_HOUR}:00–${ANNOUNCE_UNTIL_HOUR}:00 SA — the kids will be told in the morning`,
      });
    }
    if (!subs.length) {
      // Nobody has reminders switched on yet. Still stamp it: there is no
      // announcement owed to an empty room, and leaving it null would make
      // every future morning run retry a message nobody can receive.
      await admin.from("assignments").update({ announced_at: new Date().toISOString() }).eq("id", asg.id);
      return json({ ok: true, mode, today: day, sent: 0, note: "no subscriptions" });
    }

    const msg = homeworkMessage(asg);
    let sent = 0, removed = 0;
    const told: string[] = [];
    for (const id of ids) {
      // Homework OUTRANKS everything (outranksDailyBudget), so it does not
      // check pushedToday — it is the one kind allowed to be somebody's
      // notification for the day even if Blip got in first at an earlier
      // run. (In practice the Blip run is at 17:00 and this is usually
      // earlier, so it rarely comes up.)
      if (!outranksDailyBudget("homework") && pushedToday.has(id)) continue;
      const res = await sendTo(subsOf(id), { ...msg, url: "./", tag: "blipwork-homework" });
      sent += res.sent; removed += res.removed;
      await spendBudget(res.delivered, "homework", day, null);
      if (res.sent) told.push(id);
    }
    await admin.from("assignments").update({ announced_at: new Date().toISOString() }).eq("id", asg.id);
    return json({ ok: true, mode, today: day, quest: asg.quest_id, learners: told.length, sent, removed });
  }

  // ========================================================================
  //  DAILY (17:00 SA) — the evening nudge, then Blip.
  // ========================================================================
  if (!subs.length) return json({ ok: true, mode: "daily", today: day, targets: 0, sent: 0, note: "no subscriptions" });

  // --- THE TERM / WEEKEND GATE -------------------------------------------
  // _mhq_is_qual_day() is false on weekends and whenever the term toggle is
  // off (holidays). The sickness clock itself is paused then, so a nudge
  // would be about a day that never counted — and homework due "tomorrow"
  // over a weekend is not the moment to buzz a child either.
  const { data: qual, error: qualErr } = await admin.rpc("_mhq_is_qual_day");
  if (qualErr) return json({ ok: false, error: `_mhq_is_qual_day: ${qualErr.message}` }, 500);
  if (qual !== true) {
    return json({ ok: true, mode: "daily", today: day, skipped: "not_a_qualifying_day", sent: 0 });
  }

  let sent = 0, removed = 0;
  const detail: Array<Record<string, unknown>> = [];

  // ---- 1. THE EVENING NUDGE ---------------------------------------------
  // Only on the one evening before the due date, and only to a learner who
  // has not passed it. `done` comes from box_grants, exactly as
  // mhq_get_state computes it — progress.passed stays true forever once
  // earned and so cannot say whether THIS assignment was done.
  //
  // It needs no "already nudged" column: due_on = tomorrow is true on
  // precisely one day, and the daily budget stops a re-run doubling up.
  if (asg && asg.due_on === addDays(day, 1)) {
    const { data: doneRows, error: doneErr } = await admin
      .from("box_grants").select("student_id").eq("assignment_id", asg.id);
    if (doneErr) return json({ ok: false, error: doneErr.message }, 500);
    const done = new Set((doneRows ?? []).map((r) => (r as { student_id: string }).student_id));

    const msg = nudgeMessage(asg);
    for (const id of ids) {
      if (done.has(id)) continue;
      if (!outranksDailyBudget("nudge") && pushedToday.has(id)) {
        detail.push({ student: id, kind: "nudge", skipped: "already_pushed_today" }); continue;
      }
      const res = await sendTo(subsOf(id), { ...msg, url: "./", tag: "blipwork-homework" });
      sent += res.sent; removed += res.removed;
      await spendBudget(res.delivered, "nudge", day, null);
      if (res.delivered.length) pushedToday.add(id);       // spends the budget for Blip below
      detail.push({ student: id, kind: "nudge", sent: res.sent });
    }
  }

  // ---- 2. BLIP ------------------------------------------------------------
  const { data: studRows, error: studErr } = await admin
    .from("students").select("id, last_fed_day, care_streak").in("id", ids);
  if (studErr) return json({ ok: false, error: studErr.message }, 500);

  let considered = 0;
  for (const st of (studRows ?? []) as Array<{ id: string; last_fed_day: string | null; care_streak: number | null }>) {
    considered++;

    // Already fed today — nothing to say. (daysUnfed would be 0 anyway;
    // this is the explicit, readable version of the same rule.)
    if (st.last_fed_day === day) continue;

    // HOMEWORK BEATS BLIP — her ruling, via outranksDailyBudget(). Whoever
    // already has today's notification keeps it.
    if (!outranksDailyBudget("blip") && pushedToday.has(st.id)) {
      detail.push({ student: st.id, kind: "blip", skipped: "already_pushed_today" }); continue;
    }

    // THE health clock. Never recomputed here — see the header.
    const { data: health, error: healthErr } = await admin.rpc("_mhq_health", {
      p_last_fed: st.last_fed_day,
      p_care_streak: st.care_streak ?? 0,
    });
    if (healthErr) { detail.push({ student: st.id, error: healthErr.message }); continue; }

    const du = Number((health as { daysUnfed?: number } | null)?.daysUnfed ?? 0);
    const level = levelForDaysUnfed(du);
    if (!level) continue;

    const mine = subsOf(st.id);
    if (!mine.length) continue;

    const msg = messageFor(level, blipName(st.id), du);
    if (!msg) continue;

    const res = await sendTo(mine, { ...msg, url: "./", tag: "blipwork-blip" });
    sent += res.sent; removed += res.removed;
    await spendBudget(res.delivered, "blip", day, level);
    detail.push({ student: st.id, kind: "blip", daysUnfed: du, level, devices: mine.length, sent: res.sent });
  }

  return json({ ok: true, mode: "daily", today: day, considered, sent, removed, detail });
});
