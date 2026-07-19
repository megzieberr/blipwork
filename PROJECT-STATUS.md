# Project status — updated 2026-07-19

## Where we are
**The app is now BLIPWORK** — full rebrand from "Maths Homework Quest" executed today
(orchestrated session, 3 Sonnet agents + supervisor). ALL of it is **UNCOMMITTED in the
working tree by Megan's instruction** — nothing pushed, sw.js cache still v25; commit +
bump happen at ship after her phone play-through. Quest content, engines, and maths libs
are untouched (git status confirms zero changes under js/quests/, js/engine/, libs).

What changed:
- **Identity/theme**: solid Study-Bunny look (cream #f6e2b3 bg, brown ink #2b2016, flat
  fills, Quicksand/Nunito + JetBrains Mono for maths, 5 solid accents cycled across the
  11 chapters — honey/coral/sage/sky/rose, NO purple, NO Holo hues). Diagrams + Casio sit
  in dark "device screen" panels (deliberate — engines untouched). Blip mascot = logo,
  favicon, and full PWA icon set (regenerated from assets/companion/blip-base.png).
- **Companion system**: js/companion/renderer.js (layered blob + code-drawn SVG
  accessories + 10-colour recolour with cached canvas recolouring), js/companion/level.js
  (THE level-curve mirror of SQL `_mhq_level` — nothing else may recompute it),
  blip-ui.js, unlock-modal.js, js/blip.js (shop/equip/rename screen), js/gallery.js.
  Standalone proof page companion-test.html (hero 190px per phone review).
- **Game loop, live + local parity**: XP (lifetime, full on first completion / 25% on
  replays) + flat 10 gold per completed round; level-gated shop (5 starter items,
  hyphenated ids matching renderer ACCESSORIES); first-round colour unlock; HUD
  (level + XP bar + gold); results screen shows real awards + quiet level-up line;
  gallery (usernames only, alphabetical, no scores). Local backend (?local=1) mirrors
  everything incl. 3 hardcoded fake classmates for gallery layout (local-only).
- **Supabase (project "homework-hub" pjpwhalcifywjrwtjknd)**: RESTORED from pause and
  MIGRATED live — new students columns (gold/xp/blip_name/blip_colour/owned_items/
  equipped), shop_items table, `_mhq_level`, extended submit/get_state, new
  buy_item/equip/gallery RPCs, reset_progress zeroes xp but keeps gold/items/colour/name.
  Existing data survived (1 test student backfilled to 4 580 XP = level 6, 79 quests,
  progress intact). supabase/migration-blipwork.sql = record of what ran (all design
  rulings in its header); schema.sql updated as canonical.

Phone testing (today's saga, still relevant tonight): Store-Python/preview server 5191 is
localhost-only for agents; PHONE uses the node server `phone-server.js` (session
scratchpad — recreate from git-shy memory: any static server rooted at the repo on
0.0.0.0 works) — port 5599, http://<laptop-ip>:5599/?local=1. ⚠️ The home network has TWO
subnets both named "BerrSpace" (fibre router 192.168.101.x + TP-Link mesh 192.168.68.x);
laptop AND phone must be on the same one, and the laptop's IP changes when it swaps.
McAfee was MCPR-removed today (it was blocking inbound LAN); one stale SecurityCenter
registration may linger harmlessly — Defender is active.

## Decisions
- 2026-07-06: App identity = low-intimidation QUICK RECAP tool (revise the week's work /
  a fast round before past papers) — NOT a full homework session. Keep quests short and
  atomic; don't grow them into long worked-problem sets.
- 2026-07-06: Tap + keypad answering is deliberate and stays — marking is about maths,
  never spelling/handwriting.
- 2026-07-06: Calc tolerances are sized per-question from measured rounding drift of the
  printed solution's own method (e.g. t6 regularPolygon tol 0.5) — never tighten back to
  the 0.001 default without re-measuring.
- 2026-07-06: Casio-EXCLUSIVE quartiles stay in the calculator sim (matches the real
  fx-991ZA); quests/box plots keep the (n+1)/4 school method. Comment in calculator.js
  now says so.
- 2026-07-06: mc() in _shared.js keeps string-only de-dup by design; generators must
  self-filter decoys BY VALUE (all chapters now do — copy that pattern in new content).
- 2026-07-19: REBRAND to **Blipwork** (name chosen by Megan — "homework" pun). Character
  is "Blip" by default; kids may nickname their own Blip ANYTHING (free-form, max 24
  chars, no filter needed because nicknames are never displayed publicly — only usernames
  appear in the gallery).
- 2026-07-19: Base body art = Megan's GPT-generated PNG, used as-is; accessories are
  CODE-DRAWN SVG composited at attachment points (never GPT-drawn onto the body).
- 2026-07-19: XP and Gold decoupled. XP = levelling only, never spent; Gold = shop only,
  never rank. Level curve cost(L) = round(300·1.5^(L−1)/10)·10, bar resets per level,
  cap 20 — single source of truth is SQL `_mhq_level` mirrored ONLY in
  js/companion/level.js.
- 2026-07-19: **NO daily cap** (Megan overrode the planned cap): the app doubles as exam
  revision, so unlimited rounds count — replays pay 25% XP + full gold; pacing comes from
  the curve + level-gated shop items.
- 2026-07-19: First non-cream colour = reward for first completed round (server-enforced
  xp > 0, not just UI).
- 2026-07-19: Leaderboard → gallery/showcase: usernames + builds + level, alphabetical,
  no scores, no ranking.
- 2026-07-19: Accessory placement is PER-ACCESSORY by phone review: hat/wings/glasses
  FLOATY BY DESIGN (Megan: "cute"); ears/arms ATTACHED (overlap the body outline; arms
  redrawn as capsules and fills matched pixel-exact to the recoloured body). Recorded in
  renderer.js ATTACH comments — do not "fix" the floaty ones.
- 2026-07-19: Teacher "reset progress" zeroes XP (level drops, gates re-lock) but KEEPS
  gold, owned/equipped items, colour, nickname — resets never confiscate the blob.
- 2026-07-19: Shop prices are placeholders (glasses 40/L1, cat-ears 60/L2, party-hat
  80/L3, arms 100/L4, wings 150/L6) — tune after real play data.
- 2026-07-19: Backlog phase 2 (recorded in homework-hub-companion/plan.md): grocery-store
  food shop, daily cookie feeding on login, and Pou-style GROWTH (Blip starts baby-small,
  grows with feedings — renderer is size-agnostic so growth = a scale factor).

## Pending on Megan
- Phone play-through of the full loop at http://<laptop-ip>:5599/?local=1 (signup → round
  → +XP/+gold → colour unlock → shop → equip → gallery), plus eyeball: attached ears/arms
  (tilt −25°, arm angle 24° are single tunable values), lemon/peach recolours, hub-tile
  and Blip-screen sizes, level-up line, shop-card previews.
- Then: give the ship go-ahead (commit + sw bump + push) in the next session.
- No SQL left to run — today's migrations are already applied live via MCP.

## Next up
- Fix whatever the phone play-through surfaces; tune shop prices/level gates if wanted.
- Ship ritual: bump sw.js cache v25→v26, rename remaining "Maths Quest" strings in
  README.md + design/design-lab.html, decide whether to rename the GitHub repo/URL
  (app never shared — free to change; GitHub auto-redirects), commit + push, verify live.
- Phase 2 when Megan schedules it: feeding/growth/grocery shop (design notes in
  homework-hub-companion/plan.md), then teacher-assigned homework + treasure box +
  notifications from the original plan.
