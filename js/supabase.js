/* ============================================================
   SUPABASE BACKEND — calls the SECURITY DEFINER RPC functions.
   Self sign-up: learners create their own account (username + name +
   password). Passwords are hashed server-side; the teacher never sees
   them. supabase-js is loaded lazily from a CDN on first use.
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
  async signup(username, name, password) { return rpc("mhq_signup", { p_username: username, p_name: name, p_password: password }); },
  async login(username, password) { return rpc("mhq_login", { p_username: username, p_password: password }); },
  async setPassword(username, password) { return rpc("mhq_set_password", { p_username: username, p_password: password }); },
  async getState(username, password) { return rpc("mhq_get_state", { p_username: username, p_password: password }); },
  async submitQuest(username, password, quest, { score, xp, total, correct }) {
    return rpc("mhq_submit_quest", { p_username: username, p_password: password, p_quest: quest, p_score: score, p_xp: xp, p_total: total, p_correct: correct });
  },
  async logStruggle(username, password, concept) { return rpc("mhq_log_struggle", { p_username: username, p_password: password, p_concept: concept }); },

  // ---- admin ----
  async adminLogin(pw) { return rpc("mhq_admin_login", { p_admin_password: pw }); },
  async adminData(pw) { return rpc("mhq_admin_data", { p_admin_password: pw }); },
  async adminSetQuestOpen(pw, quest, open) { return rpc("mhq_admin_set_quest_open", { p_admin_password: pw, p_quest: quest, p_open: open }); },
  async adminResetPassword(pw, id) { return rpc("mhq_admin_reset_password", { p_admin_password: pw, p_id: id }); },
  async adminRemoveStudent(pw, id) { return rpc("mhq_admin_remove_student", { p_admin_password: pw, p_id: id }); },
  async adminResolveStruggle(pw, concept) { return rpc("mhq_admin_resolve_struggle", { p_admin_password: pw, p_concept: concept }); },
};
