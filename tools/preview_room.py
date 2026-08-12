"""
preview_room.py — composite Blip's isometric room exactly the way the app
lays it out, so a human can LOOK at a furniture set before it ships.

WHY IT EXISTS: this project's browser preview pane never composites frames,
so `computer{action:"screenshot"}` times out (PROJECT-STATUS, "Browser pane:
rAF/IO dead"). DOM measurements prove the numbers are right; they cannot
show that a bed is sitting through a wall. This re-does the CSS's own maths
in PIL and writes a PNG.

⚠️ IT RE-IMPLEMENTS THE PLACEMENT MATHS, which is exactly how
tools/preview_accessory.py came to lie about paired accessories. Trust
dressing-room.html (which drives the real code) for final numbers; use this
to see the whole room at once, which the dressing room does not do.

    python tools/preview_room.py --out out.png [--set basic|techy|princess]
"""
import argparse, json, os, re, colorsys
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SHELL = os.path.join(ROOT, "assets/companion/room-shell.png")
FURN = os.path.join(ROOT, "assets/companion/furniture")
BLIP = os.path.join(ROOT, "assets/companion/blip-base-blue.png")


def read_catalogue():
    """Pull FURNITURE + SLOT_PLACEMENT out of js/companion/furniture.js so
    this script can never drift from the app's own numbers."""
    src = open(os.path.join(ROOT, "js/companion/furniture.js"), encoding="utf-8").read()
    place = {}
    # ⚠️ slot keys may be QUOTED and HYPHENATED since the 2026-08-12 decor
    # slots ("shelf-left"). With the old \w+ pattern they simply did not
    # parse and the shelves silently vanished from the preview.
    for m in re.finditer(r"\"?([\w-]+)\"?:\s*\{\s*anchor:\s*\{\s*x:\s*([\d.]+),\s*y:\s*([\d.]+)\s*\},\s*attach:\s*\{\s*x:\s*([\d.]+),\s*y:\s*([\d.]+)\s*\}", src):
        place[m.group(1)] = dict(anchor=(float(m.group(2)), float(m.group(3))),
                                 attach=(float(m.group(4)), float(m.group(5))))
    # DOOR_TINTS is a named map in the JS; resolve it so `tint: DOOR_TINTS.pink`
    # is not silently read as "no tint" (it was, and every door previewed white)
    tints = dict(re.findall(r"^\s*(\w+):\s*\"(#[0-9a-fA-F]{6})\",", src, re.M))
    items = {}
    # slot values may be hyphenated too ("shelf-left"); wallpapers carry no
    # widthPct and are deliberately NOT matched here — they are the shell,
    # not a piece standing in the room (see --wall below).
    for m in re.finditer(r'"([a-z0-9-]+)":\s*\{\s*slot:\s*"([\w-]+)",\s*label:\s*"([^"]+)",\s*img:\s*"([^"]+)",\s*widthPct:\s*(\d+)(?:,\s*tint:\s*(null|DOOR_TINTS\.\w+|"#[0-9a-fA-F]{6}"))?', src):
        raw = m.group(6)
        if raw in (None, "null"):
            tint = None
        elif raw.startswith("DOOR_TINTS."):
            tint = tints[raw.split(".", 1)[1]]
        else:
            tint = raw.strip('"')
        items[m.group(1)] = dict(slot=m.group(2), label=m.group(3), img=m.group(4),
                                 widthPct=int(m.group(5)), tint=tint)
    if not items:
        raise SystemExit("could not parse FURNITURE out of furniture.js — the shapes have changed")
    return items, place


def smoothstep(lo, hi, x):
    t = max(0.0, min(1.0, (x - lo) / (hi - lo)))
    return t * t * (3 - 2 * t)


def tint(im, hex_col, lo=0.45, hi=0.65):
    """Mirror of renderer.js tintedImageSrc: keep each pixel's VALUE, take the
    target's hue+saturation, leave the dark outline alone."""
    r0, g0, b0 = (int(hex_col[i:i + 2], 16) / 255 for i in (1, 3, 5))
    th, ts, _ = colorsys.rgb_to_hsv(r0, g0, b0)
    px = im.load()
    for y in range(im.height):
        for x in range(im.width):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            _, _, v = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)
            w = smoothstep(lo, hi, v)
            if w == 0:
                continue
            nr, ng, nb = (int(c * 255) for c in colorsys.hsv_to_rgb(th, ts, v))
            px[x, y] = (round(r + (nr - r) * w), round(g + (ng - g) * w), round(b + (nb - b) * w), a)
    return im


def compose(equipped, width=768, wall=None):
    items, place = read_catalogue()
    # `wall` names a room-shell PNG beside room-shell.png (the wallpaper
    # slot). All five shells are the same 768x762 drawing with different
    # walls, so nothing else in here changes when it swaps.
    shell_path = os.path.join(os.path.dirname(SHELL), wall) if wall else SHELL
    shell = Image.open(shell_path).convert("RGBA")
    H = round(width * shell.height / shell.width)
    canvas = shell.resize((width, H), Image.LANCZOS)
    # same paint order as FURNITURE_SLOTS — shelves BEFORE the door, which
    # stands on the floor in front of the right wall
    for slot in ("window", "shelf-left", "shelf-right", "door", "desk", "bed", "beanbag"):
        fid = equipped.get(slot)
        if not fid:
            continue          # an optional slot with nothing in it: bare wall
        d = items[fid]
        p = place[d["slot"]]
        art = Image.open(os.path.join(FURN, d["img"])).convert("RGBA")
        if d["tint"]:
            art = tint(art, d["tint"])
        w = round(width * d["widthPct"] / 100)
        h = round(w * art.height / art.width)
        art = art.resize((w, h), Image.LANCZOS)
        x = round(p["attach"][0] * width - p["anchor"][0] * w)
        y = round(p["attach"][1] * H - p["anchor"][1] * h)
        canvas.alpha_composite(art, (x, y))
    # Blip: .room .room-blip-stage {left:50%; bottom:12%; width:30%}
    b = Image.open(BLIP).convert("RGBA")
    bw = round(width * 0.30)
    bh = round(bw * b.height / b.width)
    b = b.resize((bw, bh), Image.LANCZOS)
    canvas.alpha_composite(b, (round(width / 2 - bw / 2), round(H * 0.88 - bh)))
    return canvas


SETS = {
    "basic": dict(door="door-white", window="city-window", desk="basic-desk", bed="basic-bed"),
    "techy": dict(door="door-sky", window="space-window", desk="techy-desk", bed="techy-bed"),
    "princess": dict(door="door-pink", window="mountain-window", desk="princess-desk", bed="princess-bed"),
    # room decor (2026-08-12)
    "nerdy": dict(door="door-sky", window="nerdy-window", desk="nerdy-desk", bed="nerdy-bed"),
    "sport": dict(door="door-coral", window="sport-window", desk="sport-desk", bed="sport-bed"),
    "emo": dict(door="door-lilac", window="emo-window", desk="emo-desk", bed="emo-bed"),
}

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--set", default="basic", choices=list(SETS))
    ap.add_argument("--out", default="room.png")
    ap.add_argument("--width", type=int, default=768)
    # decor: any of these may be omitted, which is what an empty slot looks like
    ap.add_argument("--shelf-left", default=None)
    ap.add_argument("--shelf-right", default=None)
    ap.add_argument("--beanbag", default=None)
    ap.add_argument("--wall", default=None, help="a room-shell-*.png filename")
    a = ap.parse_args()
    eq = dict(SETS[a.set])
    for k, v in (("shelf-left", a.shelf_left), ("shelf-right", a.shelf_right), ("beanbag", a.beanbag)):
        if v:
            eq[k] = v
    img = compose(eq, a.width, a.wall)
    # the app draws the room on the app's own dark page, not on nothing
    bgd = Image.new("RGBA", img.size, (11, 16, 32, 255))
    bgd.alpha_composite(img)
    bgd.convert("RGB").save(a.out)
    print("wrote", a.out, bgd.size)
