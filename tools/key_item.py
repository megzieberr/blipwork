"""
key_item.py — cut ONE Tripo export off its background, trim it, downscale it.

WHY IT EXISTS, and why it is not tripo_sheet.py: that script keys a SHEET of
several items off flat magenta and slices them apart. Tripo's single-object
exports arrive one per file on a plain-ish backdrop that is NOT magenta and
is not always one flat colour (the 2026-08-09 furniture drop came on
off-white; the 2026-08-12 emo closet came on a lavender GRADIENT). Running
the sheet slicer over those reads the whole picture as one item, or as no
item at all.

HOW IT KEYS — flood, not threshold. A threshold ("everything close to the
corner colour is background") eats any part of the SUBJECT that happens to
be a similar colour: a white wardrobe on off-white loses its doors. A FLOOD
from the border only removes background that is CONNECTED to the border, so
an off-white door panel in the middle of the picture survives because the
subject's own outline separates it from the edge. That is the same reasoning
the room shell used.

⚠️ Pillow's ImageDraw.floodfill IS A SILENT NO-OP in Pillow 12 — it exists,
returns cleanly and changes nothing. This uses scipy.ndimage.label instead.

⚠️ THE TOLERANCE IS PER IMAGE AND MUST BE LOOKED AT. Too low and a halo of
background survives around the outline; too high and the flood leaks through
a soft edge and eats into the art. --report prints the numbers that tell you
which happened (background removed, and whether any interior region got
cut), but only looking proves art.

    python tools/key_item.py in.png out.png [--tol 40] [--width 512] [--report]
"""
import argparse
import numpy as np
from PIL import Image
from scipy import ndimage


def key(path, tol=40, feather=1.0):
    """Return an RGBA image with border-connected background made transparent."""
    im = Image.open(path).convert("RGBA")
    a = np.array(im)
    rgb = a[:, :, :3].astype(np.int16)

    # The background colour is the MEDIAN of the border ring, not a single
    # corner pixel — one corner can sit on a vignette or a stray speck.
    ring = np.concatenate([rgb[0], rgb[-1], rgb[:, 0], rgb[:, -1]])
    bg = np.median(ring, axis=0)

    # Distance from the background colour, per pixel.
    dist = np.abs(rgb - bg).sum(axis=2)
    bgish = dist <= tol

    # Keep only the bg-ish region CONNECTED TO THE BORDER. An interior pool of
    # the same colour (a white door panel, the hole in a ring) is not
    # background and must survive — this is the whole point of flooding.
    lab, n = ndimage.label(bgish)
    border_labels = set(np.unique(np.concatenate([
        lab[0], lab[-1], lab[:, 0], lab[:, -1]])))
    border_labels.discard(0)
    background = np.isin(lab, list(border_labels))

    alpha = np.where(background, 0, 255).astype(np.uint8)

    # Soften the one-pixel stair-step the hard cut leaves, WITHOUT eating the
    # outline: blur the mask slightly and keep anything already fully opaque.
    if feather > 0:
        soft = ndimage.gaussian_filter(alpha.astype(np.float32), feather)
        alpha = np.maximum(alpha, 0)
        alpha = np.where(alpha == 255, 255, soft).astype(np.uint8)

    out = a.copy()
    out[:, :, 3] = np.minimum(a[:, :, 3], alpha)
    return Image.fromarray(out, "RGBA"), background


def trim(im):
    a = np.array(im)[:, :, 3]
    ys, xs = np.where(a > 8)
    if not len(ys):
        raise SystemExit("nothing survived the key — the tolerance is too high")
    return im.crop((xs.min(), ys.min(), xs.max() + 1, ys.max() + 1))


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("src")
    ap.add_argument("dst")
    ap.add_argument("--tol", type=int, default=40)
    ap.add_argument("--width", type=int, default=512, help="downscale so the long edge is at most this")
    ap.add_argument("--report", action="store_true")
    a = ap.parse_args()

    im, background = key(a.src, a.tol)
    im = trim(im)
    if max(im.size) > a.width:
        s = a.width / max(im.size)
        im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    im.save(a.dst, optimize=True)

    if a.report:
        alpha = np.array(im)[:, :, 3]
        opaque = int((alpha > 250).sum())
        soft = int(((alpha > 8) & (alpha <= 250)).sum())
        print(f"{a.dst}  {im.width}x{im.height}  "
              f"background removed {100 * background.mean():.1f}%  "
              f"opaque {opaque}  soft-edge {soft} ({100 * soft / max(1, opaque + soft):.1f}%)")
