/* ============================================================
   NOTIFICATIONS — node harness (her ask, 2026-08-27: daily Blip
   reminders + a push when new homework is assigned + an evening
   "still to do" nudge).

     node verify-push.mjs

   ------------------------------------------------------------
   WHY THIS FILE EXISTS AND WHAT IT CAN HONESTLY PROVE

   The decisions live in supabase/functions/send-push/index.ts, which
   runs on Deno. Deno is not installed on this machine, and the file
   imports npm: specifiers and touches Deno.env at module load, so it
   cannot simply be imported here.

   So this harness SLICES the marked pure block straight out of that
   file — the real source text, byte for byte — writes it to a temp
   .ts module, and lets Node 22+/24 strip the types on import. If a
   decision changes in index.ts, it changes here. There is no second
   copy of the logic to drift.

   ✅ WHAT IS PROVEN HERE
      · which day gets which Blip message, including the day-7-onwards
        no-pressure wording and its two alternating variants;
      · the polite-hours window, hour by hour, across a whole day;
      · the SA date, including the two hours a day when UTC disagrees;
      · the due-date wording matching js/assignment.js's dueLine()
        EXACTLY — the same function is imported from the app and the
        two are compared over a year of dates;
      · the priority rule ("homework beats blip");
      · every homework/nudge message body, including all four
        fallbacks when the announce columns are missing.

   ❌ WHAT IS NOT PROVEN HERE, and must be checked on the day
      · that a notification actually ARRIVES on a phone. Nothing local
        can prove that — it needs the VAPID keys, the deployed
        function, and a real device. That is PUSH-SETUP.md Part 8.
      · the database reads/writes inside the handler (announced_at,
        last_push_day). Those need the migration applied and the
        function deployed.
   ============================================================ */

import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";
import { dueLine as appDueLine } from "./js/assignment.js";

const SRC = "supabase/functions/send-push/index.ts";
const START = ">>> PURE-BLOCK START <<<";
const END = ">>> PURE-BLOCK END <<<";

let pass = 0;
const fails = [];
function ok(name, cond, detail) {
  if (cond) { pass++; return; }
  fails.push(detail ? `${name} — ${detail}` : name);
}
function eq(name, got, want) {
  ok(name, got === want, `got ${JSON.stringify(got)}, wanted ${JSON.stringify(want)}`);
}

/* ---------- 1. slice the real source ---------- */
const src = readFileSync(SRC, "utf8");
if (!src.includes(START) || !src.includes(END)) {
  console.error(`\n✗ ${SRC} no longer has both PURE-BLOCK markers.\n` +
    `  The harness cannot find the code it is supposed to test, and a\n` +
    `  silent pass here would be a lie. Put the markers back (or move\n` +
    `  this harness to wherever the decisions went).\n`);
  process.exit(1);
}
const block = src.slice(src.indexOf(START) + START.length, src.indexOf(END));

// Export every decision the tests below reach for. Named explicitly (not a
// regex sweep) so a function QUIETLY RENAMED breaks the harness loudly
// instead of dropping out of the suite unnoticed.
const WANTED = ["saNow", "today", "addDays", "insidePoliteHours", "outranksDailyBudget",
                "messageFor", "levelForDaysUnfed", "dueLine", "homeworkMessage", "nudgeMessage",
                "SA_OFFSET_HOURS", "ANNOUNCE_FROM_HOUR", "ANNOUNCE_UNTIL_HOUR"];
for (const w of WANTED) {
  if (!new RegExp(`\\b(function|const)\\s+${w}\\b`).test(block)) {
    console.error(`\n✗ '${w}' is not in ${SRC}'s pure block any more.\n` +
      `  Renamed, or moved out of the markers? Either way it has stopped\n` +
      `  being tested, which is the thing this check exists to prevent.\n`);
    process.exit(1);
  }
}

const dir = join(tmpdir(), "mhq-verify-push");
mkdirSync(dir, { recursive: true });
const tmp = join(dir, "pure.ts");
writeFileSync(tmp, block + `\nexport { ${WANTED.join(", ")} };\n`, "utf8");

let M;
try {
  M = await import(pathToFileURL(tmp).href);
} catch (e) {
  console.error(`\n✗ Could not load the sliced block: ${e.message}\n` +
    `  Node needs to strip the TypeScript types (Node 22.6+ with\n` +
    `  --experimental-strip-types, or Node 23+ by default). This is\n` +
    `  Node ${process.version}.\n` +
    `  If the message mentions an undefined name, something in the pure\n` +
    `  block is reaching outside it — that is the bug, not the harness.\n`);
  process.exit(1);
}

/* Clock helper: a real UTC instant for a given SA wall-clock time. */
const saAt = (ymd, hh, mm = 0) => Date.parse(`${ymd}T${String(hh).padStart(2, "0")}:${String(mm).padStart(2, "0")}:00Z`) - 2 * 3600_000;

/* ---------- 2. the Blip day table (HER 2026-08-27 RULING: daily) ---------- */
// Days 0–2 silent, then something every single day. The old file went
// silent on day 4 and permanently silent from day 7; both of those are
// gone, and this table is what says so.
eq("day 0 silent", M.levelForDaysUnfed(0), 0);
eq("day 1 silent", M.levelForDaysUnfed(1), 0);
eq("day 2 silent", M.levelForDaysUnfed(2), 0);
eq("day 3 speaks", M.levelForDaysUnfed(3), 1);
eq("day 4 speaks (used to be silent)", M.levelForDaysUnfed(4), 1);
eq("day 5 speaks", M.levelForDaysUnfed(5), 2);
eq("day 6 speaks", M.levelForDaysUnfed(6), 2);
eq("day 7 speaks (used to be permanent silence)", M.levelForDaysUnfed(7), 3);
for (const d of [8, 12, 30, 365]) {
  eq(`day ${d} still speaks, gently`, M.levelForDaysUnfed(d), 3);
}
// It must never escalate past level 3 — that is the whole safety valve.
ok("never escalates past level 3",
  [3, 4, 5, 6, 7, 8, 50, 400].every((d) => M.levelForDaysUnfed(d) <= 3));

/* ---------- 3. the wording ---------- */
const NAG_WORDS = /\b(still|neglect|forgot|forgotten|again|days?\s+ago|haven't|didn't|why)\b/i;
for (const [lvl, day] of [[1, 3], [1, 4], [2, 5], [2, 6], [3, 7], [3, 8]]) {
  const m = M.messageFor(lvl, "Pixel", day);
  ok(`level ${lvl} day ${day} has a message`, !!m);
  ok(`level ${lvl} day ${day} uses the learner's own Blip name`, m.title.includes("Pixel"));
  ok(`level ${lvl} day ${day} carries no day count`, !/\b\d+\s*days?\b/i.test(m.title + m.body),
    `${m.title} / ${m.body}`);
}
// The long-haul message is the one that repeats for weeks. It is the only
// one that MUST be free of every nagging word, because it is the one a
// disengaged learner reads over and over.
for (const day of [7, 8, 9, 10, 20]) {
  const m = M.messageFor(3, "Pixel", day);
  ok(`day ${day} long-haul wording never nags`, !NAG_WORDS.test(m.body), `${m.title} / ${m.body}`);
}
// Two variants, alternating, so a week of them doesn't read like a stuck machine.
ok("long-haul alternates day to day",
  M.messageFor(3, "Pixel", 8).title !== M.messageFor(3, "Pixel", 9).title);
ok("long-haul repeats every second day (only two variants, on purpose)",
  M.messageFor(3, "Pixel", 8).title === M.messageFor(3, "Pixel", 10).title);
eq("level 0 says nothing at all", M.messageFor(0, "Pixel", 1), null);
// A learner who never renamed him: the caller passes "Blip", and the
// sentence has to still read like a sentence.
ok("default name reads naturally", M.messageFor(1, "Blip", 3).title.startsWith("Blip is"));

/* ---------- 4. polite hours (her "hold off until the next morning") ---------- */
eq("window starts at 07:00", M.ANNOUNCE_FROM_HOUR, 7);
eq("window ends at 19:00", M.ANNOUNCE_UNTIL_HOUR, 19);
for (let h = 0; h < 24; h++) {
  const inside = h >= 7 && h < 19;
  eq(`${String(h).padStart(2, "0")}:00 SA ${inside ? "announces" : "holds"}`,
    M.insidePoliteHours(saAt("2026-08-27", h)), inside);
}
// The exact edges, to the minute — an off-by-one here is a 9pm buzz.
eq("06:59 SA holds", M.insidePoliteHours(saAt("2026-08-27", 6, 59)), false);
eq("07:00 SA announces", M.insidePoliteHours(saAt("2026-08-27", 7, 0)), true);
eq("18:59 SA announces", M.insidePoliteHours(saAt("2026-08-27", 18, 59)), true);
eq("19:00 SA holds", M.insidePoliteHours(saAt("2026-08-27", 19, 0)), false);
eq("23:30 SA holds", M.insidePoliteHours(saAt("2026-08-27", 23, 30)), false);
eq("02:00 SA holds", M.insidePoliteHours(saAt("2026-08-28", 2)), false);

/* ---------- 5. the SA calendar date ---------- */
// The two hours a day when UTC is still on yesterday. This is exactly the
// window the original UTC-based today() got wrong, and the reason it was
// safe before (cron only) but not now (she can click Save at 00:30).
eq("00:30 SA is already the new day", M.today(saAt("2026-08-28", 0, 30)), "2026-08-28");
eq("23:30 SA is still today", M.today(saAt("2026-08-27", 23, 30)), "2026-08-27");
eq("07:00 SA (morning cron)", M.today(saAt("2026-08-27", 7)), "2026-08-27");
eq("17:00 SA (daily cron)", M.today(saAt("2026-08-27", 17)), "2026-08-27");
eq("offset is UTC+2, no DST", M.SA_OFFSET_HOURS, 2);
// addDays across a month end and a leap day — the evening nudge compares
// due_on against addDays(today, 1), so an error here silently sends nothing.
eq("addDays over a month end", M.addDays("2026-08-31", 1), "2026-09-01");
eq("addDays over a year end", M.addDays("2026-12-31", 1), "2027-01-01");
eq("addDays over a leap day", M.addDays("2028-02-28", 1), "2028-02-29");

/* ---------- 6. the due wording MATCHES the learner's card ---------- */
// js/assignment.js's dueLine() is the source of truth; send-push carries a
// copy because Deno cannot import a browser module. The whole point of this
// block is that the copy never drifts: a notification saying "by Friday"
// while the pinned card says "by tomorrow" is worse than no notification.
const REF = "2026-08-27";                       // a Thursday
const at = saAt(REF, 12);
eq("no due date says nothing", M.dueLine(null, at), null);
eq("a past date says nothing", M.dueLine("2026-08-20", at), null);
eq("today", M.dueLine("2026-08-27", at), "by today");
eq("tomorrow", M.dueLine("2026-08-28", at), "by tomorrow");
eq("inside the week names the day", M.dueLine("2026-08-30", at), "by Sunday");
// Abbreviated, because the app's card is abbreviated. Spelling the month
// out in full was the real bug this harness caught on 2026-08-27.
eq("beyond a week uses a short date", M.dueLine("2026-09-10", at), "by 10 Sep");

// And now the real test: a full year, compared against the app's own
// function with the app's clock set to the same day.
const realDateNow = Date.now;
let drift = 0, checked = 0;
try {
  Date.now = () => at;
  const OrigDate = Date;
  // js/assignment.js's dueLine builds `new Date()` for "today", so the
  // whole Date constructor has to answer as if it were REF at noon.
  globalThis.Date = class extends OrigDate {
    constructor(...a) { return a.length ? new OrigDate(...a) : new OrigDate(at); }
    static now() { return at; }
  };
  for (let d = -5; d < 365; d++) {
    const ymd = M.addDays(REF, d);
    const mine = M.dueLine(ymd, at);
    const theirs = appDueLine(ymd);
    checked++;
    if (mine !== theirs) {
      drift++;
      if (drift <= 3) fails.push(`due wording drift on ${ymd}: send-push "${mine}" vs the app's card "${theirs}"`);
    }
  }
  globalThis.Date = OrigDate;
} finally {
  Date.now = realDateNow;
}
ok(`due wording matches js/assignment.js on all ${checked} dates`, drift === 0,
  `${drift} of ${checked} dates disagree`);

/* ---------- 7. the priority rule ---------- */
eq("homework outranks the daily budget", M.outranksDailyBudget("homework"), true);
eq("the evening nudge stands down", M.outranksDailyBudget("nudge"), false);
eq("blip stands down (homework beats blip)", M.outranksDailyBudget("blip"), false);
eq("an unknown kind stands down", M.outranksDailyBudget("something-new"), false);

/* ---------- 8. the homework + nudge bodies ---------- */
const base = { id: "a1", quest_id: "t2", note: null, due_on: null,
               announce_title: null, announce_chapter: null, announced_at: null };
const full = { ...base, announce_title: "2. Sine rule: sides", announce_chapter: "2D Trigonometry",
               due_on: "2026-08-28", note: "do this before Friday" };

let m = M.homeworkMessage(full, at);
eq("homework title", m.title, "📚 New homework!");
ok("homework body names the quest", m.body.includes("2. Sine rule: sides"));
ok("homework body names the chapter", m.body.includes("2D Trigonometry"));
ok("homework body carries the due line", m.body.includes("by tomorrow"));
ok("homework body quotes her note", m.body.includes("“do this before Friday”"));

// The four fallbacks. mhq_admin_set_announce is a second, best-effort call —
// if it never lands the columns stay null, and every one of these still has
// to read like something a child wrote to a child.
m = M.homeworkMessage(base, at);
eq("no columns at all", m.body, "A new quest is pinned to your hub");
m = M.homeworkMessage({ ...base, announce_chapter: "Finance" }, at);
eq("chapter only", m.body, "A new Finance quest");
m = M.homeworkMessage({ ...base, announce_title: "3. Interest" }, at);
eq("title only", m.body, "3. Interest");
m = M.homeworkMessage({ ...base, announce_title: "3. Interest", due_on: "2026-08-20" }, at);
eq("a past due date is left off entirely", m.body, "3. Interest");
ok("no message ever mentions being late or overdue",
  !/(late|overdue|missed|behind)/i.test(
    [M.homeworkMessage(full, at), M.homeworkMessage(base, at), M.nudgeMessage(full), M.nudgeMessage(base)]
      .map((x) => x.title + " " + x.body).join(" ")));

const n = M.nudgeMessage(full);
ok("the nudge names the quest", n.body.includes("2. Sine rule: sides"));
ok("the nudge says due tomorrow", n.body.includes("due tomorrow"));
ok("the nudge has a fallback name", M.nudgeMessage(base).body.includes("your homework quest"));
ok("the nudge is softer than the announcement", n.title !== "📚 New homework!");

/* ---------- done ---------- */
rmSync(dir, { recursive: true, force: true });
const total = pass + fails.length;
if (fails.length) {
  console.error(`\n✗ ${fails.length} of ${total} checks FAILED\n`);
  for (const f of fails) console.error("   · " + f);
  console.error("");
  process.exit(1);
}
console.log(`\n✓ ${pass}/${total} notification checks pass`);
console.log("  (delivery to a real phone is NOT proven here — PUSH-SETUP.md Part 8)\n");
