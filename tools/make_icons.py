"""Generate the Blipwork PWA icons from Megan's "SL Blip Icon.png" artwork.

Run: python tools/make_icons.py   (writes the PNGs into the project root)

WHY THIS ISN'T A STRAIGHT CROP (2026-07-19, second pass)
Her source art is a glowing blue rounded TILE with Blip inside it. The
first pass exported that tile as-is, which meant the launcher then drew
its OWN rounded container around her tile -- two nested frames, and Blip
ended up ~50% of the icon (45% on the maskable one) and read tiny on the
home screen.

So this script pulls Blip OUT of her tile and re-composites him on a
plain dark card at ~78% of the canvas. Her drawing of Blip is untouched
(house rule: her art is used as-is, never redrawn) -- only the framing
around him changes. The launcher's own shape becomes the only frame.

Isolating him: everything inside the tile is either near-black
background, the bright glow RING at the tile's edge, or Blip. The ring
touches the tile border and Blip doesn't, so a flood fill seeded at the
tile centre grabs Blip's connected blob and leaves the ring behind.

We deliberately do NOT cut Blip out of his aura. Two attempts at that
failed and are recorded here so nobody retries them:
  * INK_MIN 60 swallowed the soft aura she drew around him (brightness
    ~84, versus his outline ~112 and body ~108) and exported a visible
    grey BOX — the aura's own rounded-square outer edge.
  * INK_MIN 95 cut between aura and Blip on paper, but his lower body
    and outline dip below it too, so the flood fill lost connectivity
    and returned only his bright crown (a 484x234 fragment).
Blue-dominance doesn't separate them either (aura 147, body 128,
outline 153 — the aura is if anything MORE blue than he is).

So instead: keep her aura, and crop to the fill's bounding box. Inside
that box the aura bleeds all the way to every edge, so there is no
boundary left to read as a box, and the tile's dark interior at the
corners is within a few RGB points of our own card colour — the seam
disappears. The glow ring and the empty tile margin, which were the
actual cause of the double-framing, are simply cropped away.
"""
import os
from collections import deque
from PIL import Image, ImageDraw, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, ".."))
SRC = os.path.normpath(
    os.path.join(ROOT, "..", "homework-hub-companion", "images", "SL Blip Icon.png")
)

BG = (7, 11, 22, 255)      # #070b16 — the SL theme colour, matches manifest
INK_MIN = 60               # permissive: grabs Blip AND the aura as one blob (see header)


def fill_holes(mask, w, h):
    """Re-fill enclosed gaps (his sunglasses) left by the ink threshold."""
    outside = bytearray(w * h)
    q = deque()
    for x in range(w):
        for y in (0, h - 1):
            if not mask[y * w + x] and not outside[y * w + x]:
                outside[y * w + x] = 1
                q.append((x, y))
    for y in range(h):
        for x in (0, w - 1):
            if not mask[y * w + x] and not outside[y * w + x]:
                outside[y * w + x] = 1
                q.append((x, y))
    while q:
        x, y = q.popleft()
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not outside[ny * w + nx] and not mask[ny * w + nx]:
                outside[ny * w + nx] = 1
                q.append((nx, ny))
    filled = 0
    for i in range(w * h):
        if not mask[i] and not outside[i]:
            mask[i] = 1
            filled += 1
    print("filled %d enclosed pixels (sunglasses/highlights)" % filled)
    return mask


def isolate_blip(im):
    """Flood-fill Blip's blob out of her tile artwork."""
    im = im.convert("RGBA")
    w, h = im.size
    px = im.load()

    def ink(x, y):
        r, g, b, a = px[x, y]
        return a > 40 and (r + g + b) / 3 > INK_MIN

    # Seed at the centre of the tile — that is Blip's body in her art.
    sx, sy = w // 2, h // 2
    if not ink(sx, sy):
        raise SystemExit("seed pixel isn't part of Blip — has the artwork changed?")

    seen = bytearray(w * h)
    q = deque([(sx, sy)])
    seen[sy * w + sx] = 1
    minx, miny, maxx, maxy = w, h, 0, 0
    while q:
        x, y = q.popleft()
        if x < minx: minx = x
        if x > maxx: maxx = x
        if y < miny: miny = y
        if y > maxy: maxy = y
        for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
            if 0 <= nx < w and 0 <= ny < h and not seen[ny * w + nx]:
                seen[ny * w + nx] = 1
                if ink(nx, ny):
                    q.append((nx, ny))

    # Crop the ORIGINAL pixels (not a masked copy) to the blob's box, so
    # Blip keeps her aura and it runs off all four edges.
    # TRIM: his aura touches the tile's glow ring in the corners, so the
    # raw blob box catches four little arcs of ring. They're invisible on
    # the cover-scaled "any" icons but showed up as blue corner ticks on
    # the maskable one. 6% off each side clears them without biting into
    # Blip (measured: he sits ~60px clear of the box on every side).
    tw, th = maxx - minx, maxy - miny
    tx, ty = round(tw * 0.06), round(th * 0.06)
    blip = im.crop((minx + tx, miny + ty, maxx + 1 - tx, maxy + 1 - ty))
    print("cropped to Blip + aura: %dx%d (from %dx%d source)" % (blip.width, blip.height, w, h))
    return blip


def make(blip, size, name, *, maskable=False, inset=1.0):
    """Draw the Blip crop onto the dark card at `inset` of the canvas.

    inset=1.0 scales the crop to COVER the canvas (art bleeds off the
    edges, no border at all). Smaller values pull it in for maskable
    icons, whose outer 20% the OS may crop away.
    """
    card = Image.new("L", (size, size), 255)
    if not maskable:
        card = Image.new("L", (size, size), 0)
        ImageDraw.Draw(card).rounded_rectangle(
            [0, 0, size - 1, size - 1], radius=int(size * 0.22), fill=255
        )

    target = size * inset
    scale = max(target / blip.width, target / blip.height)  # cover, never letterbox
    w, h = max(1, round(blip.width * scale)), max(1, round(blip.height * scale))
    art = blip.resize((w, h), Image.LANCZOS)

    img = Image.new("RGBA", (size, size), BG)
    img.paste(art, ((size - w) // 2, (size - h) // 2), art)
    img.putalpha(Image.composite(img.getchannel("A"), Image.new("L", (size, size), 0), card))
    img.save(os.path.join(ROOT, name))
    print("wrote %-24s art %dx%d in %dpx (inset %d%%)" % (name, w, h, size, round(inset * 100)))


if __name__ == "__main__":
    blip = isolate_blip(Image.open(SRC))
    # "any" icons: the launcher draws these roughly as-is, so the art
    # covers the whole card.
    make(blip, 192, "icon-192.png")
    make(blip, 512, "icon-512.png")
    # maskable: the OS may crop to a circle/squircle inside an 80% safe
    # zone, so pull the art in — his shades sit wide and clip first.
    make(blip, 512, "icon-512-maskable.png", maskable=True, inset=0.78)
    # Apple applies its own rounded mask to a full-bleed square.
    make(blip, 180, "apple-touch-icon.png", maskable=True, inset=0.9)
    make(blip, 32, "favicon-32.png")
