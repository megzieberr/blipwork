/* ============================================================
   SUPABASE CONFIG
   The publishable key is the PUBLIC client key — safe to commit and
   ship in the browser. The secret / service-role key is NEVER here.
   To run fully offline (local demo backend) instead, append ?local=1
   to the URL or set localStorage mhq.forceLocal — see js/api.js.
   ?local=0 undoes it and puts the device back on Supabase.
   ============================================================ */
export const SUPABASE = {
  url: "https://pjpwhalcifywjrwtjknd.supabase.co",
  key: "sb_publishable_72AQZGnVkuWhg3ad-0xaGg_gL-tC_z9",
};

export const hasSupabase = !!(SUPABASE.url && SUPABASE.key && !SUPABASE.url.includes("YOURPROJECT"));
