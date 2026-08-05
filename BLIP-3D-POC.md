# Blip art expansion via Tripo — plan of record

Rewritten 2026-08-05 after a guided tour of Megan's actual Tripo Studio account
(mathwithmegan, studio.tripo3d.ai). Supersedes the earlier "3D rebuild POC" —
the account tour showed a much cheaper route for accessories. Build work still
needs her explicit "build it" per the execution gate.

## What the account tour established (2026-08-05, seen first-hand)

- Her proven Katse pipeline is the **Image tool** (Nano Banana 2), NOT 3D:
  transparent-background sprite sheets, drift controlled by a **locked-reference
  prompt** ("Use the attached picture as a locked reference. Copy this exact
  <X>: same shapes, same proportions, same outline…") + attached image. This
  recipe is the crown jewel — reuse it verbatim for Blipwork.
- She already generated a **sky-blue blob mascot** (08/05 18:22, the Route-B
  chibi prompt) — a candidate NEW Blip design. Parked as Track 2.
- Templates: **Asset Extraction** (split one multi-object image into clean
  individual assets — one 40-token generation can carry a shelf of items),
  **Variants** (one design → styled family), Character Completion, T Pose,
  3D Enhance, Photo to Figure.
- Community gallery = free recipe library: every public model exposes its full
  prompt + input image. Model pages have an **Export** button — untested
  (deliberately not clicked); Megan to test one click to see if community
  models export free.
- Costs: image generation 40 (cheaper models exist in the model dropdown),
  Smart Mesh 35, HD Model 55, Recraft 5. Balance at tour time: **2260**.

## The split

### Track 1 — accessories in 2D (the store expansion; do this first)

Accessories never animate; they are static layers at attach points. So they do
NOT need 3D. They come from her Image pipeline:

1. **Megan generates**, per batch (~40 tokens each, retries included):
   - Attach the SAME reference image every batch (she anchored the set on
     her blue droplet, 2026-08-05 — keep using it), and ask for **the items
     ALONE** — front view, several items per sheet (then Asset Extraction to
     split, or I slice).
   - ⚠️ **The image tool does NOT emit true transparency** (it paints a fake
     checkerboard; she was hand-removing backgrounds in Canva). Fix: prompt
     for "NO drop shadows, on a completely flat solid bright magenta
     background (#FF00FF)" and the build session's tools/ script chroma-keys
     the magenta out + cleans edge fringe automatically. (Optional test:
     the GPT Image 2 model may support real alpha; Nano Banana 2 doesn't.)
   - Paired slots (wings/ears/arms): ask for the pair spread apart, or one
     side only (client mirrors it — current SVG pairs already mirror).
   - Effects (glows/auras): soft-edged transparency is the risk — curate for
     clean alpha; solid showy effects (flames, orbiting crystals, bolts) are
     safer than faint mists. Code-drawn SVG stays the fallback for soft glows.
2. **Build session adds** (one session, after her go-ahead):
   - A **PNG accessory path** in renderer.js beside the SVG one (image layer
     at an ATTACH point, widthPct, mirrored twin for paired slots). One-time
     machinery, serves every future slot.
   - The **effects slot migration**: new slot key in `mhq_equip`'s hard-coded
     list + `shop_items_slot_cat_check` + seeded rows + client catalogue
     mirror in local-backend.js (the back-slot lesson: a slot is never just
     new rows).
   - verify-store.html coverage for PNG items + new slot; sw bump; ship
     ritual with live smoke test.
3. **POC gate first** (cheap): ONE effect + ONE hat as PNGs behind `?art3d=1`,
   judged by Megan on her phone at hero size. Pass → full wave. Fail → SVG
   effects plan from 2026-08-05 discussion proceeds instead.

Token estimate Track 1: POC ~80–160; full wave (say 10–15 new items via
multi-item sheets) ~200–400. Trivial against 2260.

### Track 2 — Blip's body (separate, later decision)

The blob is a NEW design, not current Blip. Two decisions, in order:
1. Does the blob (or a refined generation) REPLACE current Blip? Her call,
   eyes-on, no deadline. Timing note: still cheapest before go-live/CQ
   migration — but not blocking the store.
2. If yes, how do his state loops get made?
   - **2D route**: her locked-reference recipe per state (hungry/sleeping/
     sick/…) — same shape as the old GPT sheets but with drift control.
     Cheapest; slicing pipeline already exists (tools/slice_sprites.py).
   - **3D route**: blob → HD Model (55) → auto-rig → animation presets →
     export GLB → frames rendered at a locked camera via headless Chromium
     (tools/render_blip/, to be built). Perfect consistency, more machinery.
     The Animate tab shows multi-morphology rig support (incl. snake-like),
     so a legless blob may rig fine; if not, procedural squash-stretch on the
     static model + per-state model variants.
   - Recolour (10 body colours, economy feature) must be proven on whichever
     route before commitment: canvas hue-shift first, per-colour renders as
     fallback.

## Standing rules that carry over

- Her art, her account, her curation ([[prefers-own-art-over-ai-drawn]] —
  she generates and picks; we integrate as-is, never redraw).
- Item ids never change → owned/equipped survive any art swap; the server
  never knows. Art swaps are client-only.
- Free items bought at 0 gold; rarity derived from price; free items excluded
  from loot (`price > 0`) — unchanged.
- Never generate on her account from a Claude session — browsing her
  workspace is read-only; generations are hers to run.

## Decisions (Megan, 2026-08-05)

- **Wave 1 = effects slot PLUS a top-up of existing slots** (multi-item sheets
  make the extras nearly free).
- **The blob is parked as Track 2** — no body-swap decision until after the
  mixed-art POC has been seen in the app. Accessories therefore use
  `assets/companion/blip-base.png` (current Blip) as the locked style
  reference for now; if Track 2 later replaces him, accessory art referencing
  the old body may need a regeneration pass (cheap, ids unchanged).
- Style direction if Track 2 ever proceeds: accessories always copy Blip's
  look, never the reverse — shiny items on a flat body clash; flat-ish items
  on a shaded body pass. Pick the body's final look first.

## Wave 1 shopping list (suggested; Megan may swap any item)

Effects slot (new slot, needs the migration): free faint-blue glow (0 g, L1) ·
flame ring (amber) · orbiting crystals (💎-themed) · storm sparks · RARE
"Monarch's Shadow" violet mist (≥120 g, L6+). Soft-alpha items (glow, mist)
are the risky renders — code-drawn SVG stays their fallback.

Top-ups (existing slots, no migration, just rows + art): 1–2 hats (e.g.
wizard hat, crown), 1 eyewear, 1 back item, 1 wings colourway via the
Variants template. Paired slots: generate ONE side; the client mirrors.

## Out of scope until decided

- PATTERNS and FACE tabs (unchanged backlog order).
- ~~Community-model Export usability~~ — tested 2026-08-05: Export on a
  community model costs **5 tokens**, formats GLB/FBX/OBJ/STL/USD/3MF at 2k
  textures. Community gallery = 5-token parts bin for the 3D route (Track 2 /
  future). Style-match caveat stands: realistic community art (e.g. feathered
  wings) may clash with the vinyl-toy look — judge per item.
- Any deploy: POC lives behind the dev flag, nothing live until the ship
  ritual.
