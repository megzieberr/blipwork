/* ============================================================
   SUPABASE BACKEND — calls the SECURITY DEFINER RPC functions.
   The supabase-js client is loaded lazily from a CDN the first time
   a call is made (so offline/local play never fetches it). Every
   learner method takes (name, password); the server verifies it.
   ============================================================ */
import { SUPABASE, hasSupabase as _has } from "./supabase-config.js";

export const hasSupabase = _has;

let _client = null;
async function client() {
  if (_client) return _client;
  const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2");
  _client = createClient(SUPABASE.url, SUPABASE.key, { auth: { persistSession: false, autoRefreshToken: false } });
  return _client;
}
async function rpc(fn, params) {
  const c = await client();
  const { data, error } = await c.rpc(fn, params || {});
  if (error) throw new Error(error.message || "rpc_error");
  return data;
}

export const SupabaseBackend = {
  async listStudents() { return (await rpc("mhq_list_students")) || []; },
  async login(name, pw) { return rpc("mhq_login", { p_name: name, p_password: pw }); },
  async firstLogin(name, pw) { return rpc("mhq_first_login", { p_name: name, p_password: pw }); },
  async getState(name, pw) { return rpc("mhq_get_state", { p_name: name, p_password: pw }); },
  async submitQuest(name, pw, quest, { score, xp, total, correct }) {
    return rpc("mhq_submit_quest", { p_name: name, p_password: pw, p_quest: quest, p_score: score, p_xp: xp, p_total: total, p_correct: correct });
  },
  async logStruggle(name, pw, concept) { return rpc("mhq_log_struggle", { p_name: name, p_password: pw, p_concept: concept }); },

  // ---- admin ----
  async adminLogin(pw) { return rpc("mhq_admin_login", { p_admin_password: pw }); },
  async adminData(pw) { return rpc("mhq_admin_data", { p_admin_password: pw }); },
  async adminSetQuestOpen(pw, quest, open) { return rpc("mhq_admin_set_quest_open", { p_admin_password: pw, p_quest: quest, p_open: open }); },
  async adminResetPassword(pw, id) { return rpc("mhq_admin_reset_password", { p_admin_password: pw, p_id: id }); },
  async adminAddStudent(pw, name) { return rpc("mhq_admin_add_student", { p_admin_password: pw, p_name: name }); },
  async adminRemoveStudent(pw, id) { return rpc("mhq_admin_remove_student", { p_admin_password: pw, p_id: id }); },
  async adminResolveStruggle(pw, concept) { return rpc("mhq_admin_resolve_struggle", { p_admin_password: pw, p_concept: concept }); },
};
