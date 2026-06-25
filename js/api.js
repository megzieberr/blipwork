/* ============================================================
   API LAYER — one async interface, two interchangeable backends.
   Uses Supabase when js/supabase-config.js has keys; otherwise (or
   with ?local=1) the offline LocalBackend. Same method signatures,
   so nothing else in the app changes.
   ============================================================ */
import { SupabaseBackend, hasSupabase } from "./supabase.js";
import { LocalBackend } from "./local-backend.js";

function forceLocal() {
  try {
    if (new URLSearchParams(location.search).has("local")) { localStorage.setItem("mhq.forceLocal", "1"); return true; }
    return localStorage.getItem("mhq.forceLocal") === "1";
  } catch { return false; }
}

const useLocal = !hasSupabase || forceLocal();
export const api = useLocal ? LocalBackend : SupabaseBackend;
export const BACKEND = useLocal ? "local" : "supabase";
