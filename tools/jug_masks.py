"""
jug_masks.py: turn Megan's jug drawing into the two masks the f8 jug is painted through.

    python tools/jug_masks.py

Needs Pillow and scipy (her machine: the Microsoft Store Python 3.12, Pillow 12.2,
scipy 1.18).

SOURCE: art-source/finance/jug-outline.png, her own drawing (11 Oct 2026), copied
in untouched. 2000 x 2000 RGBA, transparent background, ONE pure-black outline about
35 px thick, the inside see-through. Never edit or redraw it (her rule: her art is
used as is); change the masks only by re-running this script.

OUTPUT (512 x 512, lossless WebP, alpha is all that matters):
  assets/finance/jug-outline.webp   alpha = her outline (her own alpha, scaled down)
  assets/finance/jug-inside.webp    alpha = the sealed BODY interior only: never the
                                    rim mouth, never the handle holes, never outside

The app paints the outline in a light tint of the chapter colour through the first
mask (so her black lines never show black on the dark UI), and the fill behind it
through the second (css/styles.css, the .jug rules). One drawing serves both the
filling savings jug and the full loan jug.

HOW THE INTERIOR IS FOUND. House trap: Pillow 12's ImageDraw.floodfill is a silent
no-op. So: label the non-ink pixels with scipy.ndimage.label and keep the region
that holds the body centre. Her outline seals five free regions (outside, the rim
mouth, two handle holes, the body); the body is the one under BODY_PT. It is then
grown DILATE px into the ink (never past it) so the fill tucks under the line with no
dark seam, and scaled down by area.

THE FILL LEVELS (printed at the end, copied into css/styles.css and js/concepts.js):
the fill is a bar painted from the bottom of the box, so its height is a percent of
the 2000 px box. BOTTOM = where the interior ends at the bottom; FULL = the loan
jug's level: just under the rim, never into the spout (the spout's interior dips to
its lowest point at about y 245; FULL sits SPOUT_AIR px below that).
"""
import os

import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "art-source", "finance", "jug-outline.png")
OUT_DIR = os.path.join(ROOT, "assets", "finance")
SIZE = 512
INK_ALPHA = 128          # a pixel at or above this alpha is her line
BODY_PT = (1100, 850)    # (y, x) at 2000 px: deep inside the body, far from every line
DILATE = 10              # px at 2000: the fill reaches under the 35-px line, never through it
SPOUT_AIR = 20           # px at 2000 between the spout's lowest interior point and FULL


def main():
    im = Image.open(SRC).convert("RGBA")
    if im.size != (2000, 2000):
        raise SystemExit(f"expected her 2000 x 2000 drawing, got {im.size}")
    alpha = np.array(im)[..., 3]
    ink = alpha >= INK_ALPHA

    labels, count = ndimage.label(~ink)
    body_id = labels[BODY_PT]
    if body_id == 0:
        raise SystemExit("BODY_PT landed on the ink: move it")
    body = labels == body_id
    ys, xs = np.where(body)
    print(f"{count} free regions; the body is region {body_id}: x {xs.min()}-{xs.max()}, y {ys.min()}-{ys.max()}")
    if xs.min() == 0 or ys.min() == 0 or xs.max() == 1999 or ys.max() == 1999:
        raise SystemExit("the body region touches the edge: the outline is not sealed")

    grown = ndimage.binary_dilation(body, iterations=DILATE) & (body | ink)

    os.makedirs(OUT_DIR, exist_ok=True)

    def save(mask_alpha, name):
        a = Image.fromarray(mask_alpha.astype(np.uint8), "L").resize((SIZE, SIZE), Image.LANCZOS if name == "outline" else Image.BOX)
        rgba = Image.new("RGBA", (SIZE, SIZE), (255, 255, 255, 0))
        rgba.putalpha(a)
        path = os.path.join(OUT_DIR, f"jug-{name}.webp")
        rgba.save(path, "WEBP", lossless=True, quality=100, method=6)
        print(f"wrote {os.path.relpath(path, ROOT)}  {os.path.getsize(path)} bytes")

    save(alpha, "outline")                       # her own alpha, so her line's soft edge survives
    save(grown * 255, "inside")

    # the levels, as a percent of the box from the bottom
    left = {y: np.where(body[y])[0].min() for y in range(ys.min(), ys.max() + 1) if body[y].any()}
    wall_x = left[600]                           # the body's own left wall, well under the spout
    spout_rows = [y for y, x in left.items() if x < wall_x - 60 and y < 600]
    spout_low = max(spout_rows)
    full_y = spout_low + SPOUT_AIR
    bottom_y = ys.max()
    pct = lambda y: round((2000 - y) / 2000 * 100, 1)
    print(f"spout interior lowest at y {spout_low}; FULL at y {full_y} = {pct(full_y)}% of the box from the bottom")
    print(f"interior bottom at y {bottom_y} = {pct(bottom_y)}% of the box from the bottom")


if __name__ == "__main__":
    main()
