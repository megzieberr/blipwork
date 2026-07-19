"""Slice Megan's GPT sprite sheets into the renderer's per-frame PNGs.

Her sheets come out of GPT as one 1536x1024 image holding one or more
labelled ROWS of 4-5 frames, on a TRUE alpha background (the dark blue
haze you see in a viewer lives in the RGB channels but is masked out --
verified, do not "fix" it or ask for re-exports; see the memory note).

Each output frame is canvased to 480x600 and GROUND-ALIGNED so the
frames cycle without the body jittering:
  * every frame in a row is scaled by ONE shared factor (never per-frame
    fit -- that is what makes a loop wobble),
  * the row's bottom edge lands on the same baseline as the existing
    base body, so a loop reads as one character breathing in place.

Run:  python tools/slice_sprites.py
Writes into assets/companion/anim/ (and assets/companion/ for statics).
"""
import os
from collections import deque
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.normpath(os.path.join(HERE, ".."))
SRC = os.path.normpath(os.path.join(ROOT, "..", "homework-hub-companion", "images"))
OUT = os.path.join(ROOT, "assets", "companion", "anim")

# Canvas + content box copied from the existing frames so new rows drop
# straight in beside them: blip-base-blue.png is 480x600 with its content
# sitting at (8, 90)-(471, 531).
CANVAS_W, CANVAS_H = 480, 600
BOX_W, BOX_H = 463, 441
GROUND_Y = 531          # bottom of the content, in canvas space

ALPHA_ON = 40           # a pixel counts as "ink" above this alpha
COL_GAP = 6             # blank columns that separate two frames


def bands(mask_counts, min_run, gap_max):
    """Group indices whose ink-count is non-trivial into runs."""
    out, start, blank = [], None, 0
    for i, v in enumerate(mask_counts):
        if v > 2:
            if start is None:
                start = i
            blank = 0
        elif start is not None:
            blank += 1
            if blank > gap_max:
                if i - blank - start >= min_run:
                    out.append((start, i - blank))
                start, blank = None, 0
    if start is not None and len(mask_counts) - start >= min_run:
        out.append((start, len(mask_counts)))
    return out


def split_row(sheet, y0, y1, expect):
    """Cut one labelled row of the sheet into `expect` frame images."""
    row = sheet.crop((0, y0, sheet.width, y1))
    a = row.getchannel("A")
    cols = [0] * row.width
    px = a.load()
    for x in range(row.width):
        c = 0
        for y in range(row.height):
            if px[x, y] > ALPHA_ON:
                c += 1
        cols[x] = c
    runs = bands(cols, min_run=40, gap_max=COL_GAP)
    if len(runs) != expect:
        raise SystemExit(
            "row y%d-%d: found %d frames, expected %d (runs=%s)"
            % (y0, y1, len(runs), expect, runs)
        )
    return [row.crop((x0, 0, x1, row.height)) for x0, x1 in runs]


def body_fit_scale(frames):
    """One scale factor sizing the biggest BODY in `frames` to the box."""
    bw = bh = 0
    for f in frames:
        b = body_box(f)
        if b:
            bw = max(bw, b[2] - b[0])
            bh = max(bh, b[3] - b[1])
    return min(BOX_W / bw, BOX_H / bh)


def body_box(img):
    """Bounding box of the BODY only — the largest blob of bright blue.

    The raw alpha box also contains zZ marks, motion lines, sweat drops
    and heat squiggles, which differ frame to frame and between rows. If
    the scale is derived from that box, a row whose frames happen to have
    tall zZ marks gets a SMALLER body than a row without them: the baby
    came out 441px tall asleep and 317px happy, visibly resizing when he
    woke up. Scaling off the body fixes that.
    """
    a = img.convert("RGBA")
    w, h = a.size
    px = a.load()
    solid = lambda x, y: (lambda p: p[3] > 120 and p[2] > 140)(px[x, y])
    seen = bytearray(w * h)
    best, bb = 0, None
    for sy in range(0, h, 3):
        for sx in range(0, w, 3):
            if not solid(sx, sy) or seen[sy * w + sx]:
                continue
            q = deque([(sx, sy)])
            seen[sy * w + sx] = 1
            n, box = 0, [sx, sy, sx, sy]
            while q:
                x, y = q.popleft()
                n += 1
                box[0] = min(box[0], x); box[1] = min(box[1], y)
                box[2] = max(box[2], x); box[3] = max(box[3], y)
                for nx, ny in ((x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)):
                    if 0 <= nx < w and 0 <= ny < h and not seen[ny * w + nx] and solid(nx, ny):
                        seen[ny * w + nx] = 1
                        q.append((nx, ny))
            if n > best:
                best, bb = n, box
    return bb


def emit(frames, name, start=1, shared_scale=None, by_body=False):
    """Scale a row by one shared factor, ground-align, write the PNGs.

    shared_scale lets several rows that must look like the SAME character
    (the two baby rows) be sized by one factor computed across all of them.
    """
    boxes = [f.getchannel("A").getbbox() for f in frames]
    trimmed = [f.crop(b) for f, b in zip(frames, boxes)]
    if shared_scale is not None:
        scale = shared_scale
    elif by_body:
        scale = body_fit_scale(frames)
    else:
        widest = max(t.width for t in trimmed)
        tallest = max(t.height for t in trimmed)
        scale = min(BOX_W / widest, BOX_H / tallest)   # ONE factor for the row

    os.makedirs(OUT, exist_ok=True)
    for i, t in enumerate(trimmed):
        w, h = max(1, round(t.width * scale)), max(1, round(t.height * scale))
        img = t.resize((w, h), Image.LANCZOS)
        canvas = Image.new("RGBA", (CANVAS_W, CANVAS_H), (0, 0, 0, 0))
        canvas.paste(img, ((CANVAS_W - w) // 2, GROUND_Y - h), img)
        path = os.path.join(OUT, "%s-%d.png" % (name, i + start))
        canvas.save(path)
        print("wrote", os.path.relpath(path, ROOT), "(%dx%d)" % (w, h))


# ---- the rows we actually want -------------------------------------------
# y-bands were measured off each sheet's alpha row-profile; the title text
# and the numbered circles are separate bands and are simply not listed.
JOBS = [
    # (sheet filename, y0, y1, frame count, output name)
    # "Recovering Blip 2.png" supersedes "Recovering Blip.png": same
    # silhouette, but a clean open/blink/open/blink rhythm and no stray
    # sweat drop in frame 4 (the first row's only real defect). The older
    # sheet is left in images/ as history.
    ("Recovering Blip 2.png", 344, 580, 4, "recovering"),
    ("Winking blip.png", 345, 568, 4, "wink"),
    # Baby rows carry FIVE drawings, not four — GPT numbered them 1,2,2,3,4
    # and 1,2,3,3,4. All five are distinct enough to keep, so the renderer
    # reads its frame count per state rather than assuming 4.
    # Verified before use: measuring the BODY ONLY (the raw bounding box is
    # inflated by the zZ marks and motion lines, which made these rows look
    # inconsistent), sleeping is 1.207-1.256 and happy 1.196-1.243 — 4%
    # spread each, and they match each other, so it is one character. Both
    # are squatter than the adult body (1.046), which is the point.
    # NOT used: "Baby Blip.png" (measures 1.09-1.12 — adult proportions, and
    # it is a sad/feverish face, not a neutral baby) and "Baby Blip
    # Winking.png" (blanket-wrapped, and in this app a blanket means sick).
]

# Rows that must read as the SAME body get one scale factor across all of
# them, measured off the body rather than the alpha box (see body_box).
GROUPS = [
    [
        # y0 is 262, not the 207 the alpha row-profile suggests: this
        # sheet puts its numbered badges BELOW the row label (y210-258)
        # with no blank gap before the zZ marks, so a naive band bakes a
        # big "4" into the corner of frame 5.
        #
        # PICK: each row holds five drawings, but the EXPRESSIONS inside a
        # row are not one state — GPT drew a sequence, not a loop. The
        # sleeping row runs asleep, asleep, asleep, winking, wide awake;
        # the "happy" row is crying, happy, happy, happy, crying. Looping
        # either one whole would make the baby blink awake or burst into
        # tears every few frames, so each keeps only its coherent frames.
        # (The BODY is consistent across all ten — that was measured
        # separately and is why both rows share one scale.)
        ("Baby Blip Sprite.png", 262, 465, 5, "baby-sleeping", [0, 1, 2]),
        ("Baby Blip Sprite.png", 637, 817, 5, "baby-happy", [1, 2, 3]),
    ],
]

if __name__ == "__main__":
    for fname, y0, y1, n, name in JOBS:
        sheet = Image.open(os.path.join(SRC, fname)).convert("RGBA")
        print("--", fname, "row y%d-%d ->" % (y0, y1), name)
        emit(split_row(sheet, y0, y1, n), name)

    for group in GROUPS:
        cut = []
        for fname, y0, y1, n, name, pick in group:
            sheet = Image.open(os.path.join(SRC, fname)).convert("RGBA")
            frames = split_row(sheet, y0, y1, n)
            cut.append((name, [frames[i] for i in pick]))
            print("-- %s: kept frames %s of %d" % (name, [i + 1 for i in pick], n))
        # scale off the KEPT frames only, and off the body (see body_box)
        scale = body_fit_scale([f for _, frames in cut for f in frames])
        print("-- group scale %.4f across %s" % (scale, ", ".join(n for n, _ in cut)))
        for name, frames in cut:
            emit(frames, name, shared_scale=scale)
