# Project status — updated 2026-07-19 (night: SL restyle SHIPPED)

## Where we are — SOLO LEVELING RESTYLE SHIPPED & LIVE (third ship today)
After playing the rounds Megan saw the cream Study-Bunny theme clashed with the quest
content (authored for dark panels) — full pivot, built by 7 agents across two fan-outs
(theme/copy/icons, then blue-body+accessories(Opus)/catalogue/sparkle, + animations +
2 fix agents), supervised with seam-stitches. Commit `290b375`, sw **v28**,
**migration-sl-restyle.sql APPLIED live via MCP + smoke-tested** (new signup hatches
'blue', colour gate re-anchored blue, active catalogue = the 6 techy items; throwaway
student cleaned up). Verified live: all new assets 200, mhq-v28 serving.

What it is now:
- **Theme**: Solo Leveling "system windows" — near-black navy #070b16, electric blue
  #3aa0ff luminous borders, violet #7b5cf6 for rare moments only, sharp corners, Space
  Grotesk/Sora/JetBrains Mono, chapter accents = game-rarity cycle (blue/violet/cyan/
  gold/fuchsia in js/config.js). System copy: STATUS/SHOP/PHARMACY/GALLERY, "LEVEL UP"
  notice, reward drop lines. Sickness copy deliberately stays warm/human. Sparkle pass:
  glow pedestal under Blip, ✦ flourishes, gold displayed as 💎 crystals (server data
  still says gold — display-only). html has a solid dark base (overscroll never white).
- **Blip is BLUE now**: base = her art from SL Blip Design.png → assets/companion/
  blip-base-blue.png (cream file kept on disk; cream demoted to a colour). Blue = free
  default; first-colour-change gate re-anchored cream→blue. Recolour retuned: navy
  outline preserved across all 11 colours. Face sits lower than cream body — ATTACH
  fractions re-measured (eyes y 0.569).
- **Techy catalogue** (from HER "Blip Shop Idea.png" mockup): star-shades 40/L1,
  heart-eyes 45/L1 (both glasses; widthPct 90 so lenses land on the eyes — the 0.4286
  lens-separation maths is commented in renderer.js), headphones 60/L2 (ears, attached,
  cups measured onto the silhouette edges), halo 80/L3 (hat, floaty — literally), 
  power-gloves 100/L4 (arms), aurora-wings 150/L6. Old 5 retired active=false, NEVER
  confiscated (equip checks owned_items, not shop_items.active — verified).
- **ANIMATIONS**: her 3 sprite sheets sliced → assets/companion/anim/<state>-1..4.png
  (24 frames, 480×600 ground-aligned). Frame-cycler in renderer.js (setInterval, never
  rAF, WeakMap-keyed, leak-safe, prefers-reduced-motion freezes frame 1). Idle map:
  hungry (canFeedToday) / sleeping (stage1) / sick (stage2, blanket+props on top) /
  veryill (stage3, monitor beside). playMoment(handle,'excited'|'jumping'): excited on
  feed, jumping on passed results. Healthy loops recolour with the body; sick loops
  render as-authored ("sickness overrides colour"). Sheet 2's very-ill row REJECTED
  (read dead); sheet 3's re-rolled row used. Recovering = static path, no sheet yet.
- **Icons/logo**: her SL Blip Icon.png artwork → all 5 PWA icons; header/login logos
  point at blip-base-blue.png.
- Phase 2 mechanics (feeding/growth/sickness/pharmacy/2nd blip) all unchanged underneath.

## Previous ship today — PHASE 2 (same evening)
Phone-approved rulings folded in (accessories hidden during recovering confirmed), then
shipped: committed, **migration-phase2-blip-care.sql APPLIED to live Supabase via MCP**
and smoke-tested on the real DB (throwaway student: signup → state shape → buy cosmetic →
equip → feed → buy soup → deleted), sw v27, pushed, verified live (all new files 200,
mhq-v27 serving). ⚠️ Ship caught a REAL SQL bug the local mirror couldn't: PL/pgSQL
variable/column ambiguity on `blips.slot` in mhq_buy_item/mhq_equip (fixed by renaming
to v_slot in migration + schema.sql, commits 880e822/1852-style pair). Lesson recorded:
the JS local-backend mirror does NOT exercise the SQL — always smoke the RPCs on live
at ship.

## The build (earlier this evening)
Same-day second build (3 agents: Opus backend + 2 Sonnet, supervised): **feeding, growth,
sickness ladder, pharmacy, and the second Blip are all built and e2e-verified** on
`?local=1` (full loop driven in-browser: signup → free cookie → term-on → neglect to
tired(3d)/bedridden(5d)/critical(7d) with weekend exclusion → cookie REFUSES_FOOD →
accessory buy BLIP_TOO_SICK → pharmacy stays open under lock → 3 care days heal, growth
kept → level 10 → claim 2nd Blip "any colour" → per-slot wardrobe → household feed +1 to
both). Zero console errors. **Nothing committed; migration-phase2-blip-care.sql written
but NOT applied to live Supabase** — both happen at ship after Megan's phone review.
Repo renamed to **megzieberr/blipwork** earlier today (old Pages URL 404s — phone PWA
must be reinstalled from https://megzieberr.github.io/blipwork/).

Key Phase 2 facts:
- Health clock: qualifying day = weekday AND term_running (admin toggle in admin.html;
  **seeds OFF** — Megan must switch it on when term starts). Toggling ON forgives
  accrued sickness. Server-computed, tamper-proof; local mirror has
  `__BLIP_DEV__.skipDays(n)` for testing.
- Economy: soup 15 / medicine 20 (pantry: buy then care), treat 8 (instant, no growth);
  free daily cookie = the ONLY growth credit (+1 to every blip, household). Growth
  stages at 10/25/45 feedings → 60/75/88/100% scale; sick shrink ×0.85 is temporary.
- Locks: stage2 = dress; stage3 = shop+gallery too (pharmacy always open); maths never
  locked. Recovery = 3 consecutive qualifying care days (weekends/term-off don't break).
- 2nd Blip: level 10, one ever, any colour at hatch, own wardrobe (cosmetics per-blip,
  buyItem/equip take a slot param); feeding+health household-wide.
- Sick art: renderer expects assets/companion/ blip-baby.png, blip-tired.png,
  blip-bedridden.png, blip-critical.png, blip-recovering.png (all optional, code-drawn
  placeholders until then; companion-test.html is the full state gallery). GPT prompts:
  homework-hub-companion/gpt-prompts-sick-scenes.md.
- Integration fixes made at the seam: UI food list now reads state.foodShop (backend
  keeps it separate from cosmetic shop); accessory buys pass the ACTIVE blip's slot.

## Where we were this morning
**The app is now BLIPWORK and it is SHIPPED.** Megan's phone play-through passed, so the
whole rebrand was committed (`eb6de94`), sw.js bumped v25→v26, and pushed. Verified live:
https://megzieberr.github.io/maths-homework-quest/ serves `<title>Blipwork · Grade 11</title>`,
`mhq-v26`, and all new companion/gallery/asset files return 200. The repo and URL still
say "maths-homework-quest" — renaming was deliberately deferred (app was never shared, so
it can be done any time; GitHub auto-redirects). Quest content, engines, and maths libs are
untouched. Focus now moves to Phase 2 (feeding / growth / grocery shop).

Note: the push needed a rebase onto `aa1bfd6` — a cloud-dispatch commit adding CLAUDE.md
and an /explain skill. That's intentional per the standing rule; it is now the parent of
the rebrand commit.

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
- **Reinstall the PWA from https://megzieberr.github.io/blipwork/** if not done yet (repo
  rename killed the old URL, no redirect). Close/reopen twice for the v28 worker — the
  new icon (blue Blip in shades) should appear on the home screen.
- Phone play-through of the full SL app on live; sickness ladder easiest at
  companion-test.html (animated state gallery) or `?local=1` + `__BLIP_DEV__.skipDays(n)`.
- Optional art, whenever: a "recovering" sprite row (weak smile, blanket on lap — prompt
  guidance in gpt-prompts-sick-scenes.md) and the baby-face PNG (blip-baby.png) — both
  have graceful fallbacks until then; each lands with a tiny asset-only ship.
- At term start: **term-running toggle ON in admin** — sickness clock frozen until then
  (deliberate). NO SQL outstanding — both today's migrations are applied live.

## Next up
- Fix whatever the phone review of the SL app surfaces.
- Sick-stage push warnings (reuse Circle Quest VAPID) — designed, not built; do with or
  after Phase 3.
- Phase 3 (original plan): teacher-assigned homework + treasure box + notifications.
- Mockup-derived backlog (recorded in homework-hub-companion/plan.md): FACE tab (her
  4-frame expression sheets exist!), EFFECTS tab (auras), PATTERNS tab, randomize/undo
  customize flow.
- All prices/thresholds (accessories 40-150, soup 15/med 20/treat 8, growth 10/25/45,
  2nd-blip level 10) are tunables — revisit on real play data.
