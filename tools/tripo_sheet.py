"""
tripo_sheet.py — turn one Tripo "items on a flat magenta background" sheet
into individual transparent PNG accessories.

WHY THIS EXISTS
  Tripo's image tool does NOT emit a real alpha channel — it PAINTS a fake
  checkerboard. Megan was hand-removing backgrounds in Canva, one sheet at a
  time. So instead we ask the generator for a flat #FF00FF background (a
  colour no accessory contains) and key it out here, losslessly and for free.

WHAT IT DOES
  1. Detects the background colour from the image border (or takes --bg).
  2. Builds an alpha channel by UNMIXING the background out of every pixel
     (see alpha_from_background below) — this is what saves soft glow edges
     that a plain "delete near-magenta pixels" threshold would chew up.
  3. Splits the sheet into items by CONNECTED COMPONENTS (scipy.ndimage.label).
     It used to use row/column projection, which merged any two items that
     shared a row or a column — components handle a scattered sheet, which is
     what Tripo actually returns.
  4. Trims each item to its own bounds and writes a PNG with real alpha.

USAGE
  python tools/tripo_sheet.py SHEET.png --names storm-ring,shadow-crown,glow-ring
  python tools/tripo_sheet.py SHEET.png            # dry run: report only
  python tools/tripo_sheet.py SHEET.png --names a,b,c --out assets/companion/items

  --bg auto|#RRGGBB   background colour (default auto = median of the border)
  --min-gap N         blank px needed to call it a gap between items (default 12)
  --min-area N        blobs under N px are background dust, not art (default 256)
  --opaque            sheet has no see-through art (food/accessories, NOT effects)
  --pad N             transparent padding kept around each item (default 2)
  --max N             cap the longest side of each item, px (default 512)
  --dry-run           report what it found, write nothing

NOTE ON SHEET 1 (the checkerboard one): this tool keys a SOLID background.
A painted checkerboard is two greys and will not key cleanly — regenerate
that sheet on magenta rather than fighting it.
"""

import argparse
import os
import sys

import numpy as np
from PIL import Image
from scipy import ndimage

# Opacity ramp. alpha_from_background() reads the SMALLEST alpha that can
# explain a pixel, which is right for genuinely translucent pixels and
# under-reads opaque ones. Above OPAQUE_HI a pixel is taken as solid — alpha
# 1, colour used exactly as photographed. Below OPAQUE_LO it is taken as
# translucent and the background is unmixed out of its colour.
#
# ⚠️ This reading ALONE is not enough, and wave 1 hid that. It separates the
# saturated, glowy items well (gold reads 0.78, near-black 0.89, pale blue
# 0.96) but it is genuinely ambiguous for MID-GREY: an opaque steel pixel and
# a half-opaque green pixel over magenta are the same colour, and the minimum
# reading picks the green. Measured on wave 2's brushed-steel arms, rgb(136,
# 148,160) read as 54% opaque and unmixed to rgb(37,247,82) — bright green,
# half see-through, on a third of the item. So solidity is decided by
# DISTANCE from the background colour as well (see solidity below), which is
# the one thing grey is unambiguous about.
#
# RESIDUAL, known and accepted: the brightest ~20% of a soft glow falloff
# sits inside the ramp and comes out slightly warm (a little magenta left
# in). It is a thin band right against the glow's own opaque core, and the
# fix would need the same art shot over a second background colour. Judge
# it by eye on the real items rather than chasing it here.
OPAQUE_LO = 0.50
OPAQUE_HI = 0.70


def detect_background(rgb):
    """Median colour of the image border, plus how much it VARIES.

    The border is background, unless an item bleeds off the edge (it
    doesn't; the prompt says 'spaced apart'). The spread matters as much as
    the colour: a generated sheet's background is never one exact value —
    it is compressed and faintly gradiented, drifting a few units. Callers
    need that tolerance or they read the noise as foreground.
    """
    border = np.concatenate([
        rgb[0, :, :].reshape(-1, 3), rgb[-1, :, :].reshape(-1, 3),
        rgb[:, 0, :].reshape(-1, 3), rgb[:, -1, :].reshape(-1, 3),
    ]).astype(np.float64)
    bg = np.median(border, axis=0)
    # Robust per-channel spread. Percentiles, not min/max: a single item
    # pixel touching an edge would otherwise set the tolerance for the sheet.
    spread = np.maximum(bg - np.percentile(border, 0.5, axis=0),
                        np.percentile(border, 99.5, axis=0) - bg)
    return bg, border, np.maximum(spread, 1.0)


#  A channel only gets a vote if its divisor is comfortably bigger than that
#  channel's own background wobble. This is the most important rule in the
#  file, and it has to be RELATIVE, not a fixed number:
#    · a "magenta" sheet measures rgb(253,16,248), not (255,0,255), so red's
#      upper bound divides by 255-253 = 2 and two units of noise read as
#      fully opaque — that keyed whole sheets as one solid rectangle;
#    · on two of Megan's four real sheets green sat at 42 while wandering
#      ±10, so green's LOWER bound (divide by 42) turned that wobble into
#      "60% opaque" — a fixed threshold of 24 happily allowed it.
#  An ill-conditioned channel carries almost no information anyway (the
#  background is already near that channel's limit), so dropping it costs
#  nothing and removes the amplification entirely.
NOISE_HEADROOM = 4.0   # divisor must exceed this many times the wobble
MIN_DIVISOR = 16.0     # ...and this many units, however clean the sheet


def alpha_from_background(rgb, bg, spread):
    """Recover per-pixel alpha AND un-blended colour, given a known background.

    Every pixel is C = a*F + (1-a)*bg for some foreground F and alpha a.
    That is 3 equations and 4 unknowns, so we take the standard chroma-key
    reading: the SMALLEST alpha that still explains C with a valid colour
    (all channels within 0..255). Per channel that gives a lower bound on a,
    and the binding one is the max:

        bg_c > 0    ->  a >= (bg_c - C_c) / bg_c
        bg_c < 255  ->  a >= (C_c - bg_c) / (255 - bg_c)

    For magenta (255, 0, 255) this collapses to
        a = max((255-R)/255, G/255, (255-B)/255)
    which reads a 20%-opaque white glow as exactly 0.2 — the whole point.

    It UNDER-reads solid mid-tones though (opaque gold scores ~0.78), so the
    caller forces alpha to 1 wherever the pixel is clearly foreground BEFORE
    unmixing the colour — see unmix_colour.
    """
    c = np.atleast_3d(rgb.astype(np.float64))
    candidates = []
    for i in range(3):
        b = float(bg[i])
        need = max(MIN_DIVISOR, NOISE_HEADROOM * float(spread[i]))
        candidates.append((b, "lo", i, need))
        candidates.append((255.0 - b, "hi", i, need))
    usable = [d for d in candidates if d[0] >= d[3]] or [max(candidates)]
    bounds = []
    for div, kind, i, _ in usable:
        b = float(bg[i])
        bounds.append((b - c[..., i]) / div if kind == "lo" else (c[..., i] - b) / div)
    return np.clip(np.max(np.stack(bounds), axis=0), 0.0, 1.0)


# How far from the background a colour must sit before it is taken as solid,
# as a fraction of the furthest any colour COULD be from it (measured to the
# RGB cube's corners, so it adapts to whatever background the sheet used).
# Against magenta: opaque steel lands at 0.45, gold 0.51, near-black 0.72,
# while the outer falloff of a soft glow — the thing that must stay soft —
# sits near 0.23, because a translucent pixel's distance is scaled by its own
# alpha. The gap between those two is what this test lives in.
SOLID_LO = 0.28
SOLID_HI = 0.42

# --opaque: how far INSIDE the silhouette a pixel must sit before the sheet
# author's "nothing here is see-through" is applied to it.
#
# WHY THIS HAS TO BE DECLARED RATHER THAN DETECTED. A pixel's distance from the
# background cannot tell opaque pink from a half-opaque glow — measured on real
# sheets, opaque icing and grape purple sit at 0.306-0.327, while the genuine
# soft glows in wave 1 have their 90th percentile at 0.32-0.34 and run to 0.366.
# The distributions OVERLAP, so no threshold exists. That is the same wall the
# plasma ring hit on 2026-08-06, and it is not a tuning failure: an opaque pink
# and a half-opaque yellow-green over magenta are genuinely the same pixel.
# Untreated, the pink doughnut glaze came out at 52% alpha unmixed to
# rgb(247,235,92) — yellow-green — across a third of the item; the grapes were
# 49% wrong, the cupcake 22%, the watermelon 17%.
#
# What breaks the tie is knowledge the image does not carry: whether the sheet
# was prompted for translucent art. Food and accessory sheets say "no glow, no
# aura, no sparkles", so on those every pixel well inside an item is solid.
# Effects sheets ARE glows — run those without the flag. Getting it wrong is
# visible either way: a wrongly-soft opaque item unmixes to green, and a
# wrongly-hard glow loses its falloff.
#
# ⚠️ Applied to the WHOLE silhouette this trades one artefact for another. The
# anti-aliased rim is genuinely half-background, so forcing it solid keeps the
# magenta in it — a pink halo, measured at ~800 px per item and plainly visible
# around the pale ones (the marshmallow's grey outline went mauve). So the
# declaration is applied only to the INTERIOR, and the rim keeps the ordinary
# soft reading that unmixes it correctly. That is an erosion, not a hole fill:
# the doughnut's centre hole is not in the silhouette to begin with, so it
# erodes like any other edge and stays open. Verified: centre alpha 0.
OPAQUE_INSET = 2


def solidity(rgb, bg, lo=SOLID_LO, hi=SOLID_HI):
    """1 where a pixel is too far from the background to be a faded one.

    This is the test the header calls for: the background is a colour no
    accessory contains, so anything far from it is the item, at full opacity,
    whatever the minimum-alpha reading believes. It is per-pixel, so it never
    touches topology — a ring's hole and the eye mask's cut-outs are exactly
    background-coloured and stay transparent, which is why this is used here
    instead of filling interior holes.
    """
    d = np.sqrt(((rgb.astype(np.float64) - bg[None, None, :]) ** 2).sum(axis=2))
    corners = np.array([(r, g, b) for r in (0.0, 255.0)
                        for g in (0.0, 255.0) for b in (0.0, 255.0)])
    far = np.sqrt(((corners - bg[None, :]) ** 2).sum(axis=1)).max()
    # KNOWN RESIDUAL: an anti-aliased outline pixel is half item and half
    # background, and for a DARK item that blend is still far enough from
    # magenta to be called solid, so a little magenta stays in it — a one-pixel
    # pink rim, measured at 1-2% of the visible pixels on the eye mask and the
    # sword. Excluding the outline (eroding this mask by one pixel) halves that
    # on real art and is WRONG on hard-edged art, where the outermost pixel is
    # genuinely solid and gets thrown back to the reading that turns it green —
    # test_tripo_sheet.py fails exactly that way if you try it. Left in: at the
    # size Blip renders (a 400px item drawn ~100px wide) one rim pixel averages
    # away to nothing. Fix it by keying, not by eroding, if it ever shows.
    return smoothstep(lo, hi, d / far)


def noise_floor(border, bg, spread):
    """How much alpha the BACKGROUND ITSELF produces, from its own pixels.

    Self-calibrating: compression noise and the faint gradient give every
    background pixel a small non-zero reading, and this measures it rather
    than guessing a constant. Subtracted (and rescaled) so background reads
    as a true zero instead of a speckle of 5x5 'items'.
    """
    a = alpha_from_background(border.reshape(-1, 1, 3), bg, spread)
    return float(min(max(np.percentile(a, 99.9), 0.02), 0.25))


# Below this alpha a pixel's unmixed colour is mostly amplified rounding
# noise (dividing by a small alpha multiplies an 8-bit rounding error by
# 1/alpha), which shows up as a coloured fringe. Such pixels borrow their
# colour from confident neighbours instead.
FRINGE_ALPHA = 0.12


def resolve(rgb, bg, alpha_min, opaque=False):
    """Turn the minimum-alpha reading into the final (alpha, colour) pair.

    Solid pixels (alpha_min above OPAQUE_HI) keep their photographed colour
    exactly — unmixing them would desaturate, which once turned opaque gold
    into lime green. Translucent pixels get the background divided back out,
    which is what strips the magenta from a soft glow instead of leaving a
    pink halo.
    """
    c = rgb.astype(np.float64)
    # 1 = certainly solid. Either test may say so: the minimum-alpha reading
    # catches saturated colours, the distance test catches the mid-greys it
    # under-reads. Taking the max means a pixel is only left translucent when
    # BOTH agree it could be, which is the honest reading of the ambiguity.
    w = np.maximum(smoothstep(OPAQUE_LO, OPAQUE_HI, alpha_min), solidity(rgb, bg))
    if opaque:
        # The author says nothing here is see-through, so anything properly
        # inside an item is solid whatever its colour reads as. Only the rim,
        # which really is part background, keeps the ordinary reading.
        inside = ndimage.binary_erosion(alpha_min > 0.06, iterations=OPAQUE_INSET)
        w = np.maximum(w, inside.astype(np.float64))
    alpha = w + (1.0 - w) * alpha_min

    # Unmix with the FINAL alpha, not the provisional one. That keeps the
    # result exactly invertible — recompositing (alpha, colour) back over
    # the original background reproduces the sheet pixel-for-pixel, at any
    # point on the ramp. Where alpha is 1 this reduces to colour = c, which
    # is what keeps solid items bit-perfect.
    safe = np.maximum(alpha, 1e-4)[..., None]
    colour = (c - (1.0 - alpha)[..., None] * bg[None, None, :]) / safe

    # Fringe repair: near-transparent pixels amplify 8-bit rounding by
    # 1/alpha, so let confident neighbours vote by averaging PREMULTIPLIED
    # colour and dividing by averaged alpha.
    num = ndimage.gaussian_filter(colour * alpha[..., None], sigma=(2, 2, 0))
    den = ndimage.gaussian_filter(alpha, sigma=2)[..., None]
    borrowed = num / np.maximum(den, 1e-6)
    trust = np.clip(alpha / FRINGE_ALPHA, 0.0, 1.0)[..., None]
    colour = trust * colour + (1.0 - trust) * borrowed
    return alpha, np.clip(colour, 0, 255)


def smoothstep(lo, hi, x):
    t = np.clip((x - lo) / (hi - lo), 0.0, 1.0)
    return t * t * (3.0 - 2.0 * t)


#  ⚠️ DO NOT "fill interior holes" here (scipy.ndimage.binary_fill_holes or
#  a flood fill). It is the obvious-looking way to stop a dark item going
#  see-through in the middle, and it is WRONG for this catalogue: a ring
#  effect is an annulus whose middle is genuinely background, and the eye
#  mask has cut-out eye holes. Filling turned both into solid blobs. The
#  per-pixel solidity() test above already keeps solid items opaque
#  (near-black reads ~306 away from magenta, gold ~216, steel ~191), so
#  topology never needs to come into it.
#  (Aside, if a flood fill is ever genuinely needed: PIL's
#  ImageDraw.floodfill is a silent no-op in Pillow 12 — it still exists and
#  still returns cleanly while changing nothing.)


def reading_order(boxes):
    """Left-to-right, top-to-bottom — the order the names are given in.

    Rows are grouped by vertical overlap rather than by a fixed grid, so a
    sheet whose items sit at slightly different heights still reads sensibly.
    """
    if not boxes:
        return []
    heights = [b[3] - b[1] + 1 for b in boxes]
    tol = 0.5 * float(np.median(heights))
    rows, out = [], []
    for b in sorted(boxes, key=lambda b: (b[1] + b[3]) / 2):
        centre = (b[1] + b[3]) / 2
        if rows and centre - rows[-1][0] <= tol:
            rows[-1][1].append(b)
        else:
            rows.append((centre, [b]))
    for _, row in rows:
        out.extend(sorted(row, key=lambda b: (b[0] + b[2]) / 2))
    return out


# Smallest blob, in pixels, that is allowed to be part of an item. Below this
# a component is compression dust off the background, not art.
#
# ⚠️ This runs BEFORE the dilation that groups an item's detached pieces, and
# that ordering is the whole point. The alpha gate is a PERCENTILE of the
# border's own noise, so by construction it lets roughly 0.1% of background
# pixels through. On a clean sheet that is a handful of stray pixels and the
# old bounding-box speck filter mopped them up afterwards. On a noisy one it
# is thousands, scattered evenly — and dilating by min_gap//2 CHAINS them into
# a bridge between items. Measured on the pastries sheet: six items at
# 56 000-74 000 px each, largest dust blob 185 px, and the sheet came back as
# ONE 944x704 "item" spanning four of them, with the other two lost among 29
# fragments. Filtering after the dilation cannot undo a bridge that has
# already merged two items into one component.
#
# The margin is enormous — three orders of magnitude between dust and art —
# so this needs no tuning. It is deliberately well under any genuinely
# detached art piece (a floating crystal, a glow's spark) and well over any
# dust: at the size items render, a 16x16 fragment of a 400px sheet lands at
# about 4 px on screen, so nothing visible is ever at risk here.
MIN_AREA = 256


def drop_dust(solid, min_area):
    """Remove components too small to be art. Returns (mask, pixels removed).

    Per-component AREA, not bounding box: dust is compact, and a genuinely
    thin-but-long piece of art (an antenna wire, a whisker) has a small box
    on one side while carrying plenty of pixels.
    """
    labels, n = ndimage.label(solid)
    if not n:
        return solid, 0
    areas = np.bincount(labels.ravel())
    areas[0] = 0
    keep = areas >= min_area
    cleaned = keep[labels]
    return cleaned, int(solid.sum() - cleaned.sum())


def apply_groups(boxes, spec):
    """Merge components the OPERATOR says belong to one item.

    `spec` is "1+2,3+4+5,7+9" over the indices a --dry-run printed. Each group
    becomes one item: the union of its boxes, carrying every member's label so
    the crop keeps all of them and still erases anything else.

    The automatic dilation grouping in find_items cannot do this job. It joins
    pieces that are CLOSE, and on the eye sheets the two eyes of one pair sit
    ~480 px apart while the pairs themselves are only ~250 px apart — the gap
    within an item is bigger than the gap between items, so no dilation radius
    separates them. Stating it beats guessing.

    Anything not listed is DROPPED, and the caller says so. That is a feature:
    it is how the stray mouth drawn between the happy-eyes pair was left out,
    without a re-generation.
    """
    out = []
    for part in spec.split(","):
        idx = [int(n) - 1 for n in part.split("+") if n.strip()]
        members = [boxes[i] for i in idx]
        out.append((min(b[0] for b in members), min(b[1] for b in members),
                    max(b[2] for b in members), max(b[3] for b in members),
                    set().union(*(b[4] for b in members))))
    return out


def drop_specks(boxes, min_size):
    """Discard boxes too small to be a real accessory. Returns (kept, dropped)
    so the caller can SAY what it threw away — a silent truncation here would
    read as 'found everything' when it hadn't."""
    kept = [b for b in boxes if (b[2] - b[0] + 1) >= min_size or (b[3] - b[1] + 1) >= min_size]
    return kept, len(boxes) - len(kept)


def find_items(alpha, min_gap, min_size=24, floor=0.06, min_area=MIN_AREA):
    """(boxes in reading order, specks dropped, dust px, label image).

    Each box is (x0, y0, x1, y1, label) and the label indexes the returned
    label image, so a caller can tell this item's pixels from a neighbour's.

    Row/column projection is the tempting approach and it is not enough:
    on the back+wings sheet the golden wing's tip and the dragon wing are
    side by side with ZERO blank columns between them, so no column split
    exists and the two came out as one item. Components separate them.

    The mask is dilated by half of `min_gap` first so pieces of the SAME
    item that are drawn apart — the crystals floating above their ring,
    a glow's stray sparks — group together instead of becoming separate
    items. Boxes are then measured on the UNdilated mask so the dilation
    never pads the crop.
    """
    solid = alpha > floor
    solid, dust = drop_dust(solid, min_area)
    grouped = ndimage.binary_dilation(solid, iterations=max(1, min_gap // 2))
    labels, n = ndimage.label(grouped)
    labels = np.where(solid, labels, 0)  # measure the real pixels, not the halo
    boxes = []
    for lab, obj in enumerate(ndimage.find_objects(labels, max_label=n), start=1):
        if obj is None:
            continue
        y_sl, x_sl = obj
        # The label travels with the box: a box is only a RECTANGLE, and when
        # items are staggered diagonally one item's rectangle overlaps the
        # next one, so the crop has to know which pixels are actually its own.
        boxes.append((x_sl.start, y_sl.start, x_sl.stop - 1, y_sl.stop - 1, lab))
    # Specks MUST go before reading_order, not after: it sizes its row
    # tolerance off the median box height, and a handful of 5x5 specks drag
    # that median so low that every real item lands in a row of its own and
    # the sheet reads top-to-bottom instead of left-to-right. That silently
    # renamed a wizard hat to "crystal-orbit".
    boxes, dropped = drop_specks(boxes, min_size)
    return reading_order(boxes), dropped, dust, labels


def main(argv=None):
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("sheet")
    ap.add_argument("--names", default="", help="comma-separated output names, in reading order")
    ap.add_argument("--out", default="assets/companion/items")
    ap.add_argument("--bg", default="auto")
    ap.add_argument("--min-gap", type=int, default=12)
    ap.add_argument("--min-size", type=int, default=24,
                    help="discard blobs smaller than this on BOTH sides (px)")
    ap.add_argument("--min-area", type=int, default=MIN_AREA,
                    help=f"treat components under this many px as background "
                         f"dust (default {MIN_AREA})")
    ap.add_argument("--pad", type=int, default=2)
    ap.add_argument("--max", type=int, default=512)
    ap.add_argument("--group", default="",
                    help="merge components into items by their --dry-run index, "
                         "e.g. \"1+2,3+4+5,7+9\". Anything not listed is left "
                         "out. Use when one item's pieces sit further apart "
                         "than two different items do (the eye pairs).")
    ap.add_argument("--opaque", action="store_true",
                    help="nothing on this sheet is see-through (food, accessories) "
                         "— keeps pink/purple art from unmixing to green. Do NOT "
                         "use on effects sheets, whose glows are meant to be soft.")
    ap.add_argument("--whole", metavar="PATH",
                    help="key the WHOLE sheet to one RGBA PNG at PATH and stop, "
                         "instead of cutting it into items. For CHARACTER sheets: "
                         "slice_sprites.py needs the frames still on their shared "
                         "canvas, because it ground-aligns them off a common "
                         "baseline — cropping each frame to its own bounds first "
                         "throws that away and the loop jitters.")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args(argv)

    img = Image.open(args.sheet).convert("RGB")
    rgb = np.asarray(img)

    bg, border, spread = detect_background(rgb)
    if args.bg != "auto":
        h = args.bg.lstrip("#")
        bg = np.array([int(h[i:i + 2], 16) for i in (0, 2, 4)], dtype=np.float64)

    # GATE on the noise floor, never rescale by it. The raw reading is by
    # construction the smallest alpha that still unmixes to an in-range
    # colour, so keeping it exactly means the unmix never has to clip;
    # shaving it (even by 0.02) makes faint pixels overshoot and clip, which
    # is the one thing that stops the result recompositing losslessly.
    dead = noise_floor(border, bg, spread)
    raw = alpha_from_background(rgb, bg, spread)
    alpha, fore = resolve(rgb, bg, np.where(raw <= dead, 0.0, raw), opaque=args.opaque)

    if args.whole:
        keep, dust = drop_dust(alpha > 0.06, args.min_area)
        alpha = np.where(keep, alpha, 0.0)
        os.makedirs(os.path.dirname(os.path.abspath(args.whole)), exist_ok=True)
        Image.fromarray(np.dstack([fore, alpha * 255.0]).astype(np.uint8),
                        "RGBA").save(args.whole)
        print(f"{os.path.basename(args.sheet)}: background rgb"
              f"({int(bg[0])},{int(bg[1])},{int(bg[2])}) noise {dead:.3f}"
              f" — whole sheet keyed"
              + (f", {dust} px of background dust erased" if dust else "")
              + f" -> {args.whole}")
        return 0

    boxes, dropped, dust, labels = find_items(alpha, args.min_gap, args.min_size,
                                              min_area=args.min_area)
    boxes = [(x0, y0, x1, y1, {lab}) for x0, y0, x1, y1, lab in boxes]
    if args.group:
        found = len(boxes)
        boxes = apply_groups(boxes, args.group)
        used = len({i for b in boxes for i in b[4]})
        if used < found:
            print(f"  grouped {found} components into {len(boxes)} item(s); "
                  f"{found - used} not listed and left out")

    names = [n.strip() for n in args.names.split(",") if n.strip()]

    # Erase the dust from the OUTPUT too, not just from the item hunt. A crop
    # is a rectangle around one component, so background speckle sitting inside
    # that rectangle would otherwise ride along into the PNG.
    alpha = np.where((alpha > 0.06) & (labels == 0), 0.0, alpha)

    print(f"{os.path.basename(args.sheet)}: background rgb"
          f"({int(bg[0])},{int(bg[1])},{int(bg[2])}) noise {dead:.3f}"
          f" — {len(boxes)} item(s)"
          + (f", {dust} px of background dust erased" if dust else "")
          + (f", {dropped} speck(s) below --min-size discarded" if dropped else ""))
    if names and len(names) != len(boxes):
        print(f"  ! {len(names)} name(s) given for {len(boxes)} item(s). "
              f"Check --min-gap, or run without --names to look first.", file=sys.stderr)

    rgba = np.dstack([fore, alpha * 255.0]).astype(np.uint8)
    if not args.dry_run and names:
        os.makedirs(args.out, exist_ok=True)

    for i, (x0, y0, x1, y1, labs) in enumerate(boxes):
        px0, py0 = max(0, x0 - args.pad), max(0, y0 - args.pad)
        px1 = min(rgba.shape[1] - 1, x1 + args.pad)
        py1 = min(rgba.shape[0] - 1, y1 + args.pad)
        tile = rgba[py0:py1 + 1, px0:px1 + 1].copy()
        # Erase any NEIGHBOUR that shares this rectangle, plus the halo around
        # it that sits below the component floor. Only pixels belonging to
        # another item are touched, so nothing of this item's own soft edge
        # is cut.
        near = labels[py0:py1 + 1, px0:px1 + 1]
        mine = np.isin(near, list(labs))
        intruder = (~mine) & (near != 0)
        if intruder.any():
            spill = ndimage.binary_dilation(intruder, iterations=max(1, args.min_gap // 2))
            tile[..., 3] = np.where(spill & ~mine, 0, tile[..., 3])
        crop = Image.fromarray(tile, "RGBA")
        if args.max and max(crop.size) > args.max:
            crop.thumbnail((args.max, args.max), Image.LANCZOS)
        name = names[i] if i < len(names) else f"item{i + 1}"
        # Print WHERE each item sat. Reading order is the one thing this tool
        # cannot verify for you — it has twice handed a name to the wrong item
        # on a staggered sheet (a wizard hat became "crystal-orbit"; a crown
        # and a monocle swapped, because the monocle floated high enough to
        # count as its own row). Seeing the positions makes that checkable
        # without opening the sheet.
        label = (f"  [{i + 1}] {name:<16} {crop.size[0]}x{crop.size[1]}"
                 f" at x{(x0 + x1) // 2},y{(y0 + y1) // 2}"
                 + ("  (neighbour masked out)" if intruder.any() else ""))
        if args.dry_run or not names:
            print(label + "   (not written)")
            continue
        path = os.path.join(args.out, name + ".png")
        crop.save(path)
        print(label + f" -> {path}")

    return 0


if __name__ == "__main__":
    sys.exit(main())
