"""preview_accessory.py — composite a PNG accessory onto Blip, exactly the way
the renderer does, and write an image you can actually LOOK at.

WHY THIS EXISTS
  Placement numbers (attach point, widthPct, anchor) are judged by eye, and
  screenshots time out in the Browser pane on this project. Every previous
  wave was reviewed through headless Chromium instead, which works but is slow
  and flaky for what is really just a paste. This does the same arithmetic in
  fifty lines and hands back a PNG.

THE GEOMETRY IT MIRRORS (makeAccessoryLayer in js/companion/renderer.js)
  The wrapper is positioned at left = attach.x of the STAGE WIDTH and
  top = attach.y of the STAGE HEIGHT, sized to width = widthPct of the STAGE
  WIDTH with the height following the art's own aspect, then shifted back by
  the anchor as a fraction of ITS OWN box. Note the asymmetry — x and width
  are both measured against the stage's WIDTH while y is against its HEIGHT.
  Getting that wrong is what makes a hand-computed preview disagree with the
  live app.

  If renderer.js ever changes how a layer is placed, this file has to change
  with it, or it becomes a confident liar.

USAGE
  python tools/preview_accessory.py gold-chain --attach 0.5,0.60 --width 55
  python tools/preview_accessory.py gold-chain --attach 0.5,0.60 --width 55 \
         --anchor 0.5,0.1 --out preview.png
  Repeat --attach/--width to lay several candidates side by side.
"""

import argparse
import os

from PIL import Image, ImageDraw

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, ".."))
BASE = os.path.join(ROOT, "assets", "companion", "blip-base-blue.png")
ITEMS = os.path.join(ROOT, "assets", "companion", "items")


def pair(s):
    a, b = s.split(",")
    return float(a), float(b)


def compose(item, attach, width_pct, anchor, behind=False):
    base = Image.open(BASE).convert("RGBA")
    sw, sh = base.size
    art = Image.open(os.path.join(ITEMS, item + ".png")).convert("RGBA")
    w = max(1, round(width_pct / 100.0 * sw))          # % of stage WIDTH
    h = max(1, round(w * art.size[1] / art.size[0]))   # aspect preserved
    art = art.resize((w, h), Image.LANCZOS)
    x = round(attach[0] * sw - anchor[0] * w)          # x against WIDTH
    y = round(attach[1] * sh - anchor[1] * h)          # y against HEIGHT
    stage = Image.new("RGBA", (sw, sh), (0, 0, 0, 0))
    if behind:
        stage.alpha_composite(art, (x, y))
        stage.alpha_composite(base, (0, 0))
    else:
        stage.alpha_composite(base, (0, 0))
        stage.alpha_composite(art, (x, y))
    return stage


def main():
    ap = argparse.ArgumentParser(description=__doc__,
                                 formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("item")
    ap.add_argument("--attach", type=pair, action="append", required=True,
                    help="x,y as fractions of the stage. Repeatable.")
    ap.add_argument("--width", type=float, action="append", required=True,
                    help="widthPct. Repeatable, paired with --attach.")
    ap.add_argument("--anchor", type=pair, default=(0.5, 0.5))
    ap.add_argument("--behind", action="store_true",
                    help="paint BEHIND the body (back/effects slots)")
    ap.add_argument("--out", default="preview.png")
    args = ap.parse_args()

    if len(args.width) == 1:
        args.width *= len(args.attach)
    if len(args.attach) != len(args.width):
        raise SystemExit("give one --width per --attach, or a single --width")

    shots = [compose(args.item, a, w, args.anchor, args.behind)
             for a, w in zip(args.attach, args.width)]
    pad, label_h = 10, 18
    sw, sh = shots[0].size
    out = Image.new("RGB", (len(shots) * (sw + pad), sh + label_h), (7, 11, 22))
    d = ImageDraw.Draw(out)
    for i, (shot, a, w) in enumerate(zip(shots, args.attach, args.width)):
        out.paste(shot, (i * (sw + pad), 0), shot)
        d.text((i * (sw + pad) + 6, sh + 3),
               f"attach {a[0]:.2f},{a[1]:.2f}  w{w:g}", fill=(255, 255, 255))
    out.save(args.out)
    print("wrote", args.out)


if __name__ == "__main__":
    main()
