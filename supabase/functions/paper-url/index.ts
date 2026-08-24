// ============================================================
//  BLIPWORK — paper-url
//  FEEDBACK-PAPERS-BRIEF.md Feature 2: one signed link to one paper.
//
//  ⚠️ WRITTEN, NOT DEPLOYED. The foreman deploys this.
//
//  One Edge Function, called directly by the browser (like collect-cq,
//  unlike send-push which is cron-only). POST { username, password,
//  paper_id } — the learner's own Blipwork credentials, exactly what
//  every mhq_* RPC already takes. Never logs either.
//
//  ------------------------------------------------------------
//  WHY THIS EXISTS AT ALL
//  The `papers` bucket is PRIVATE and has NO storage.objects policies
//  (supabase/migration-feedback-papers.sql §3). anon and authenticated
//  cannot read one byte of it. This function holds the service role and
//  is therefore the ONLY route from a learner to a PDF — which is
//  precisely her "papers live behind login" decision, enforced rather
//  than asked for politely.
//
//  FLOW
//   1. Check the learner's password via mhq_auth_ok — a service-role-only
//      RPC wrapper over _mhq_auth (this function IS the trusted caller
//      that wrapper is locked to). No id back -> {ok:false,error:"auth"}.
//   2. Look up the paper row for its storage_path. Unknown id ->
//      {ok:false, error:"not_found"}. The id comes from mhq_list_papers,
//      which is itself auth-gated, so an unknown id is a stale tab, not
//      an attack — but it is still refused before storage is touched.
//   3. createSignedUrl(path, 3600) — SIXTY MINUTES. Long enough that a
//      phone on school wifi can finish a slow download and the learner
//      can re-open it from their downloads; short enough that a link
//      pasted into a group chat is dead by the next lesson. The link is
//      the only thing that ever leaves this function; the service key
//      never does.
//   4. { ok:true, url, title } — the client window.open()s it and the
//      phone's own PDF viewer / downloader takes over from there.
//
//  ONE REQUEST = ONE LINK TO ONE PAPER. No listing here (mhq_list_papers
//  does that, from the browser, with the publishable key) and no writes
//  of any kind — this function cannot upload, cannot delete, and holds
//  no path the caller supplied.
// ============================================================

import { createClient } from "npm:@supabase/supabase-js@2";

// SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY: auto-injected by Supabase for
// every Edge Function (this project's OWN database — Blipwork).
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

// 60 minutes, in seconds. See the header for why this number.
const SIGNED_URL_SECONDS = 3600;

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

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  let body: { username?: unknown; password?: unknown; paper_id?: unknown } = {};
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }
  const username = typeof body.username === "string" ? body.username : "";
  const password = typeof body.password === "string" ? body.password : "";
  const paperId = typeof body.paper_id === "string" ? body.paper_id : "";
  // Never logged (see header) — deliberately not interpolated into any
  // console.log/error anywhere in this file.
  if (!username || !password) return json({ ok: false, error: "auth" });
  if (!paperId) return json({ ok: false, error: "bad_request" }, 400);

  // ---- 1. auth (service-role-only RPC wrapper) -------------------------
  const { data: sid, error: authErr } = await admin.rpc("mhq_auth_ok", {
    p_username: username,
    p_password: password,
  });
  if (authErr || !sid) return json({ ok: false, error: "auth" });

  // ---- 2. the paper row ------------------------------------------------
  const { data: paper, error: rowErr } = await admin
    .from("papers")
    .select("id, title, storage_path")
    .eq("id", paperId)
    .maybeSingle();
  if (rowErr) return json({ ok: false, error: "lookup_failed" });
  if (!paper || !paper.storage_path) return json({ ok: false, error: "not_found" });

  // ---- 3. the signed link ---------------------------------------------
  const { data: signed, error: signErr } = await admin
    .storage
    .from("papers")
    .createSignedUrl(paper.storage_path, SIGNED_URL_SECONDS);
  // A row whose object was removed from the bucket by hand would land
  // here. Same soft shape as every other failure — the tab shows "can't
  // open that one", never a stack trace.
  if (signErr || !signed || !signed.signedUrl) return json({ ok: false, error: "sign_failed" });

  return json({ ok: true, url: signed.signedUrl, title: paper.title });
});
