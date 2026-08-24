// ============================================================
//  BLIPWORK — paper-admin
//  FEEDBACK-PAPERS-BRIEF.md Feature 2: the teacher's side of Papers.
//
//  ⚠️ WRITTEN, NOT DEPLOYED. The foreman deploys this.
//
//  POST { admin_pw, action, … } from admin.html, with the publishable
//  key on the request exactly like every mhq_admin_* RPC. The admin
//  password is checked on EVERY action through mhq_admin_ok_rpc — a
//  service-role-only wrapper over _mhq_admin_ok — before anything is
//  read, written or deleted. Never logged.
//
//  ------------------------------------------------------------
//  ACTIONS
//   · "list"   -> { ok, papers: [{id,title,chapter,sizeBytes,createdAt}] }
//   · "upload" { title, chapter, filename, b64 }
//        -> service-role upload to papers/<uuid>-<safe-filename>, then
//           one row in public.papers. PDF only.
//   · "remove" { paper_id }
//        -> delete the object, then the row.
//
//  WHY THE UUID PREFIX ON THE PATH
//  Two papers named "September P1.pdf" (one Gr11, one Gr12) are a matter
//  of when, not if. A uuid prefix makes every key unique without her
//  having to think about filenames, and the readable tail is what makes
//  the bucket browsable in the Supabase dashboard when something needs
//  checking by hand. The filename is also SANITISED — the raw name goes
//  into a storage key, and a key is a path.
//
//  WHY BASE64 AND NOT A DIRECT UPLOAD
//  A direct-to-storage upload would need a signed upload URL and a
//  second round trip; her papers are ≤ ~5 MB and this runs from a laptop
//  on her own desk once every few weeks. One request, no extra moving
//  parts. The cap below is what keeps that judgement honest.
//
//  REMOVE ORDER: object first, THEN the row. If the object delete fails
//  the row stays and she sees the paper still listed — recoverable, and
//  honest. The other order would leave an orphaned file in a private
//  bucket with nothing pointing at it, invisible forever.
// ============================================================

import { createClient } from "npm:@supabase/supabase-js@2";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE_ROLE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

// 12 MB of decoded bytes. Her papers are ≤ ~5 MB (brief); this leaves
// room for a scan-heavy one without leaving the door open to a request
// that would time the function out.
const MAX_BYTES = 12 * 1024 * 1024;

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

/* A storage key is a PATH. Keep letters, digits, dot, dash, underscore
   and space; collapse everything else to a dash. That kills "../", any
   slash, and every quoting surprise in one rule rather than a blocklist
   of the ones we thought of. Length-capped so the key stays sane. */
function safeName(raw: string): string {
  const base = (raw || "paper.pdf").split(/[\\/]/).pop() || "paper.pdf";
  const cleaned = base.replace(/[^A-Za-z0-9._ -]+/g, "-").replace(/^-+/, "").slice(0, 80);
  return cleaned || "paper.pdf";
}

function decodeB64(b64: string): Uint8Array {
  // strip a data: URL prefix if the client sent one (FileReader's
  // readAsDataURL produces "data:application/pdf;base64,…")
  const payload = b64.includes(",") ? b64.slice(b64.indexOf(",") + 1) : b64;
  const bin = atob(payload);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

async function listPapers(): Promise<Response> {
  const { data, error } = await admin
    .from("papers")
    .select("id, title, chapter, size_bytes, sort, created_at")
    .order("chapter", { ascending: true })
    .order("sort", { ascending: true })
    .order("created_at", { ascending: true });
  if (error) return json({ ok: false, error: "list_failed" });
  return json({
    ok: true,
    papers: (data || []).map((p) => ({
      id: p.id,
      title: p.title,
      chapter: p.chapter || "General",
      sizeBytes: p.size_bytes,
      sort: p.sort,
      createdAt: p.created_at,
    })),
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ ok: false, error: "method_not_allowed" }, 405);

  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {
    return json({ ok: false, error: "bad_request" }, 400);
  }

  const adminPw = typeof body.admin_pw === "string" ? body.admin_pw : "";
  const action = typeof body.action === "string" ? body.action : "";
  if (!adminPw) return json({ ok: false, error: "auth" });

  // ---- the gate, on EVERY action ---------------------------------------
  const { data: okPw, error: authErr } = await admin.rpc("mhq_admin_ok_rpc", {
    p_admin_password: adminPw,
  });
  if (authErr || okPw !== true) return json({ ok: false, error: "auth" });

  // ---- list -------------------------------------------------------------
  if (action === "list") return await listPapers();

  // ---- upload -----------------------------------------------------------
  if (action === "upload") {
    const title = typeof body.title === "string" ? body.title.trim().slice(0, 160) : "";
    const chapter = typeof body.chapter === "string" ? body.chapter.trim().slice(0, 60) : "";
    const filename = typeof body.filename === "string" ? body.filename : "";
    const b64 = typeof body.b64 === "string" ? body.b64 : "";
    if (!title || !b64) return json({ ok: false, error: "bad_request" }, 400);

    const name = safeName(filename);
    // PDF only — her ask, and the one thing the phone's viewer opens
    // reliably from a signed URL. Checked on the extension AND on the
    // file's own magic bytes: an extension is a claim, %PDF- is evidence.
    if (!/\.pdf$/i.test(name)) return json({ ok: false, error: "not_pdf" });

    let bytes: Uint8Array;
    try {
      bytes = decodeB64(b64);
    } catch {
      return json({ ok: false, error: "bad_request" }, 400);
    }
    if (bytes.length === 0) return json({ ok: false, error: "bad_request" }, 400);
    if (bytes.length > MAX_BYTES) return json({ ok: false, error: "too_big" });
    const magic = String.fromCharCode(...bytes.slice(0, 5));
    if (magic !== "%PDF-") return json({ ok: false, error: "not_pdf" });

    const path = `${crypto.randomUUID()}-${name}`;
    const { error: upErr } = await admin.storage.from("papers").upload(path, bytes, {
      contentType: "application/pdf",
      upsert: false,
    });
    if (upErr) return json({ ok: false, error: "upload_failed" });

    const { data: row, error: rowErr } = await admin
      .from("papers")
      .insert({
        title,
        chapter: chapter || null,
        storage_path: path,
        size_bytes: bytes.length,
      })
      .select("id")
      .single();
    if (rowErr) {
      // The row is what makes the object findable. Without it the upload
      // is an invisible orphan in a private bucket, so undo it rather
      // than leave litter nobody can ever see to clean up.
      await admin.storage.from("papers").remove([path]);
      return json({ ok: false, error: "insert_failed" });
    }

    return json({ ok: true, id: row.id, path, sizeBytes: bytes.length });
  }

  // ---- remove -----------------------------------------------------------
  if (action === "remove") {
    const paperId = typeof body.paper_id === "string" ? body.paper_id : "";
    if (!paperId) return json({ ok: false, error: "bad_request" }, 400);

    const { data: paper, error: rowErr } = await admin
      .from("papers")
      .select("id, storage_path")
      .eq("id", paperId)
      .maybeSingle();
    if (rowErr) return json({ ok: false, error: "lookup_failed" });
    if (!paper) return json({ ok: false, error: "not_found" });

    // object first, then the row (see this file's header for the order).
    const { error: rmErr } = await admin.storage.from("papers").remove([paper.storage_path]);
    if (rmErr) return json({ ok: false, error: "remove_failed" });

    const { error: delErr } = await admin.from("papers").delete().eq("id", paperId);
    if (delErr) return json({ ok: false, error: "remove_failed" });

    return json({ ok: true });
  }

  return json({ ok: false, error: "bad_action" }, 400);
});
