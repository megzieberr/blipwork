// ============================================================
//  BLIPWORK — collect-cq
//  CQ-BRIDGE-PLAN.md Part 3: the XP -> diamonds bridge, the moment.
//
//  One Edge Function, called directly by the browser (unlike send-push,
//  which is cron-only). POST { username, password } — the learner's own
//  Blipwork credentials, exactly what every mhq_* RPC already takes.
//  Never logs either.
//
//  ------------------------------------------------------------
//  FLOW (CQ-BRIDGE-PLAN.md Part 3, "Where it runs")
//   1. Verify the learner + read their cq_name/watermark link, via the
//      OWN database's mhq_cq_link RPC (service-role client — this
//      function IS the trusted caller that RPC is locked to).
//   2. Not linked (cq_name null) -> {ok:false, error:"not_linked"}, no
//      further calls. The client never shows the Collect panel to an
//      unlinked learner anyway; this is the defensive floor.
//   3. Read-only against CIRCLE QUEST's REST API with ITS service key
//      (CQ_URL / CQ_SERVICE_KEY, both function secrets set by the
//      foreman at deploy — CQ is never written to, and this function
//      holds no other CQ credential). Exact display_name match — the
//      roster seed copies spellings verbatim from CQ, no fuzzing.
//      Missing/unreachable/misconfigured -> {ok:false, error:"cq_down"},
//      soft fail, nothing on the Blipwork side is touched.
//   4. Sum xp_events.xp for that CQ student, in-process rather than a
//      CQ-side aggregate RPC we don't have — PAGED (limit/offset, 1000
//      rows/page), because Supabase's REST layer silently caps an unpaged
//      response at its own max-rows setting. Today's top learner is only
//      ~100 rows deep, but this bridge is specced to run forever over
//      replays and every future CQ chapter, so >1000 is a real future, not
//      a hypothetical one — see the fuller reasoning inline at the fetch.
//   5. Call mhq_credit_cq(student_id, cqTotal) — OUR OWN service-role-only
//      RPC — and return its jsonb straight through. All the delta/
//      watermark/row-lock maths lives there, not here.
//
//  ONE REQUEST = ONE COLLECT. No scheduled anything (CQ-BRIDGE-PLAN.md:
//  "no cron to maintain" — the plumbing IS the visible Collect button).
// ============================================================

import { createClient } from "npm:@supabase/supabase-js@2";

// --- Configuration ----------------------------------------------------
// SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY: auto-injected by Supabase for
// every Edge Function (this project's OWN database — Blipwork, ref
// pjpwhalcifywjrwtjknd).
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
// CQ_URL / CQ_SERVICE_KEY: Circle Quest's project (ref vlelxvhlyydwxnhbijco),
// set by hand as function secrets at deploy (CQ-BRIDGE-PLAN.md). READ ONLY —
// this function never writes a row to CQ. Absent -> every collect fails
// soft as "cq_down" rather than throwing.
const CQ_URL = Deno.env.get("CQ_URL");
const CQ_SERVICE_KEY = Deno.env.get("CQ_SERVICE_KEY");

const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: Record<string, unknown>, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

type LinkResult = {
  ok: boolean;
  error?: string;
  student_id?: string;
  cq_name?: string | null;
  cq_xp_credited?: number;
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  let body: { username?: unknown; password?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }
  const username = typeof body.username === "string" ? body.username : "";
  const password = typeof body.password === "string" ? body.password : "";
  // Never logged (see header) — deliberately not interpolated into any
  // console.log/error anywhere in this file.
  if (!username || !password) return json({ ok: false, error: "auth" });

  // ---- 1+2. auth + link, via our own DB (service-role-only RPC) --------
  const { data: link, error: linkErr } = await admin.rpc("mhq_cq_link", {
    p_username: username,
    p_password: password,
  });
  if (linkErr) return json({ ok: false, error: "auth" });
  const l = link as LinkResult | null;
  if (!l || !l.ok) return json({ ok: false, error: "auth" });
  if (!l.cq_name) return json({ ok: false, error: "not_linked" });

  // ---- 3+4. CQ read (service key, READ ONLY) ----------------------------
  if (!CQ_URL || !CQ_SERVICE_KEY) return json({ ok: false, error: "cq_down" });

  const cqHeaders = { apikey: CQ_SERVICE_KEY, Authorization: `Bearer ${CQ_SERVICE_KEY}` };

  let cqStudentId: string;
  try {
    const r = await fetch(
      `${CQ_URL}/rest/v1/students?display_name=eq.${encodeURIComponent(l.cq_name)}&select=id`,
      { headers: cqHeaders },
    );
    if (!r.ok) return json({ ok: false, error: "cq_down" });
    const rows = (await r.json()) as Array<{ id?: string }>;
    // Missing on the CQ side is impossible by design (the seed copies the
    // spelling verbatim) — but if it ever happens, it's the same soft fail
    // as any other CQ-unreachable state, not a new user-facing error.
    if (!Array.isArray(rows) || rows.length === 0 || !rows[0].id) return json({ ok: false, error: "cq_down" });
    cqStudentId = rows[0].id;
  } catch {
    return json({ ok: false, error: "cq_down" });
  }

  // xp_events is unbounded — a learner accumulates one row per round played,
  // forever, across replays and every future CQ chapter (that's the whole
  // point of the bridge). Supabase's REST layer silently CAPS an unpaged
  // response at its max-rows setting (default 1000) — no error, just a
  // truncated array — so an unpaged fetch would quietly underpay any
  // learner who ever crosses that line, permanently (the watermark would
  // bank the truncated total as if it were the real one). Page explicitly
  // and sum every page; treat hitting the page cap as cq_down, never as a
  // partial sum — an undercounted total must never reach mhq_credit_cq.
  let cqTotal = 0;
  const XP_PAGE_SIZE = 1000;
  const XP_MAX_PAGES = 50; // absurd-but-finite: 50k events/learner
  try {
    for (let page = 0; page < XP_MAX_PAGES; page++) {
      const offset = page * XP_PAGE_SIZE;
      const r = await fetch(
        `${CQ_URL}/rest/v1/xp_events?student_id=eq.${encodeURIComponent(cqStudentId)}&select=xp&limit=${XP_PAGE_SIZE}&offset=${offset}`,
        { headers: cqHeaders },
      );
      if (!r.ok) return json({ ok: false, error: "cq_down" });
      const rows = (await r.json()) as Array<{ xp?: number }>;
      if (!Array.isArray(rows)) return json({ ok: false, error: "cq_down" });
      cqTotal += rows.reduce((sum, row) => sum + (Number(row.xp) || 0), 0);
      if (rows.length < XP_PAGE_SIZE) break; // short page = that was the last one
      if (page === XP_MAX_PAGES - 1) return json({ ok: false, error: "cq_down" }); // filled the cap — more rows exist, don't guess
    }
  } catch {
    return json({ ok: false, error: "cq_down" });
  }

  // ---- 5. credit — all the delta/watermark/row-lock maths lives in SQL --
  const { data: credit, error: creditErr } = await admin.rpc("mhq_credit_cq", {
    p_student_id: l.student_id,
    p_cq_total: cqTotal,
  });
  if (creditErr) return json({ ok: false, error: "credit_failed" });
  return json(credit as Record<string, unknown>);
});
