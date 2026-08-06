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
  3. Splits the sheet into items by row/column projection (the items are
     drawn spaced apart, so gaps of blank background separate them).
  4. Trims each item to its own bounds and writes a PNG with real alpha.

USAGE
  python tools/tripo_sheet.py SHEET.png --names storm-ring,shadow-crown,glow-ring
  python tools/tripo_sheet.py SHEET.png            # dry run: report only
  python tools/tripo_sheet.py SHEET.png --names a,b,c --out assets/companion/items

  --bg auto|#RRGGBB   background colour (default auto = median of the border)
  --min-gap N         blank px needed to call it a gap between items (default 12)
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


def solidity(rgb, bg):
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
    return smoothstep(SOLID_LO, SOLID_HI, d / far)


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


def resolve(rgb, bg, alpha_min):
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


def drop_specks(boxes, min_size):
    """Discard boxes too small to be a real accessory. Returns (kept, dropped)
    so the caller can SAY what it threw away — a silent truncation here would
    read as 'found everything' when it hadn't."""
    kept = [b for b in boxes if (b[2] - b[0] + 1) >= min_size or (b[3] - b[1] + 1) >= min_size]
    return kept, len(boxes) - len(kept)


def find_items(alpha, min_gap, min_size=24, floor=0.06):
    """(boxes in reading order, specks dropped, label image), via components.

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
    return reading_order(boxes), dropped, labels


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
    ap.add_argument("--pad", type=int, default=2)
    ap.add_argument("--max", type=int, default=512)
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
    alpha, fore = resolve(rgb, bg, np.where(raw <= dead, 0.0, raw))

    boxes, dropped, labels = find_items(alpha, args.min_gap, args.min_size)
    names = [n.strip() for n in args.names.split(",") if n.strip()]

    print(f"{os.path.basename(args.sheet)}: background rgb"
          f"({int(bg[0])},{int(bg[1])},{int(bg[2])}) noise {dead:.3f}"
          f" — {len(boxes)} item(s)"
          + (f", {dropped} speck(s) below --min-size discarded" if dropped else ""))
    if names and len(names) != len(boxes):
        print(f"  ! {len(names)} name(s) given for {len(boxes)} item(s). "
              f"Check --min-gap, or run without --names to look first.", file=sys.stderr)

    rgba = np.dstack([fore, alpha * 255.0]).astype(np.uint8)
    if not args.dry_run and names:
        os.makedirs(args.out, exist_ok=True)

    for i, (x0, y0, x1, y1, lab) in enumerate(boxes):
        px0, py0 = max(0, x0 - args.pad), max(0, y0 - args.pad)
        px1 = min(rgba.shape[1] - 1, x1 + args.pad)
        py1 = min(rgba.shape[0] - 1, y1 + args.pad)
        tile = rgba[py0:py1 + 1, px0:px1 + 1].copy()
        # Erase any NEIGHBOUR that shares this rectangle, plus the halo around
        # it that sits below the component floor. Only pixels belonging to
        # another item are touched, so nothing of this item's own soft edge
        # is cut.
        near = labels[py0:py1 + 1, px0:px1 + 1]
        intruder = (near != lab) & (near != 0)
        if intruder.any():
            spill = ndimage.binary_dilation(intruder, iterations=max(1, args.min_gap // 2))
            tile[..., 3] = np.where(spill & (near != lab), 0, tile[..., 3])
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
