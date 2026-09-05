"""
to_webp.py: convert every companion sprite in assets/companion/ to WebP.

WHY: the companion art was 30 MB of PNG, and a phone on school wifi paid for
all of it. WebP carries the same drawings in a fraction of the bytes.

THE ONE RULE THAT MATTERS (fix day, 2026-09-05):

  * Any picture the app RE-PAINTS in code must be LOSSLESS.
    The body recolour (renderer.js buildRecolouredDataUrl), the door tint
    (tintedImageSrc) and the outline-follows pass (outlineTintedImageSrc)
    all sort pixels by brightness against DARK_LO = 0.68 / DARK_HI = 0.85.
    Lossy compression nudges brightness by a few points, and a pixel that
    drifts across one of those thresholds flips from "outline navy" to
    "body colour". That reads as speckle along every stroke. So: lossless.

  * Any picture the app only DISPLAYS may be lossy at quality 90.
    Food, furniture, trinkets, room shells and the sick animation frames
    are drawn to the screen exactly as Megan made them, so a compressor
    that throws away what the eye cannot see costs nothing.

SAFE TO RUN AGAIN. It skips a sprite whose .webp is already newer than its
.png, so after a new sprite lands you just run it and only that one is done.

    python tools/to_webp.py                 # convert, keep the PNGs
    python tools/to_webp.py --delete-png    # convert, then remove the PNGs
    python tools/to_webp.py --force         # redo everything from scratch
"""
import argparse
import fnmatch
import os
import re
import sys

from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ART = os.path.join(ROOT, "assets", "companion")

# ---------------------------------------------------------------------------
# THE LOSSLESS LIST. Paths are relative to assets/companion/, forward slashes,
# fnmatch globs. Everything not matched here is lossy at quality 90.
#
# Keep this list next to the reason for each line: a future session must be
# able to see WHY a file is here without re-deriving it from the JS.
# ---------------------------------------------------------------------------
LOSSLESS = [
    # The body itself. getBodySrc() recolours these pixel by pixel.
    "blip-base-blue.png",
    "blip-base.png",            # the old cream body, kept as history/fallback
    # Phase-2 health art. None of these exist yet; when Megan draws one it
    # goes through getBodySrc() too (renderer.js resolveRawBody), so it is
    # listed in advance rather than discovered by a bug.
    "blip-tired.png",
    "blip-bedridden.png",
    "blip-critical.png",
    "blip-recovering.png",
    # Animation sheets that recolour (renderer.js ANIM_RECOLOURS = true).
    "anim/sleeping-*.png",
    "anim/excited-*.png",
    "anim/jumping-*.png",
    "anim/hungry-*.png",
    "anim/wink-*.png",
    "anim/eating-*.png",
    "anim/sad-*.png",
    # ONE door drawing, tinted nine ways in code (furniture.js DOOR_TINTS
    # through renderer.js tintedImageSrc).
    "furniture/door.png",
    # The PNG accessories marked outlineFollows in renderer.js: their navy
    # strokes are moved onto the body's outline hue by outlineTintedImageSrc.
    "items/wizard-hat.png",
    "items/backwards-cap.png",
    "items/medal-choker.png",
    "items/star-eyes.png",
    "items/angry-eyes.png",
    "items/happy-eyes.png",
    "items/lash-eyes.png",
    "items/dreamy-eyes.png",
    "items/wink-eyes.png",
]

# Sheets that are deliberately NOT recoloured ("sickness overrides colour",
# renderer.js ANIM_RECOLOURS = false) and so are safe to compress lossily.
# Listed only so a reader can see they were considered, not overlooked.
DECORATIVE_ANIM = ["anim/sick-*.png", "anim/veryill-*.png", "anim/recovering-*.png"]

QUALITY = 90


def rel(path):
    return os.path.relpath(path, ART).replace(os.sep, "/")


def is_lossless(relpath):
    return any(fnmatch.fnmatch(relpath, pat) for pat in LOSSLESS)


def cross_check():
    """Read the JS back and shout if it names a picture as recoloured/tinted
    that the LOSSLESS list above does not cover. This is the guard against
    the list going stale the day a new outlineFollows item lands."""
    problems = []
    try:
        renderer = open(os.path.join(ROOT, "js", "companion", "renderer.js"), encoding="utf-8").read()
        furniture = open(os.path.join(ROOT, "js", "companion", "furniture.js"), encoding="utf-8").read()
    except OSError as exc:
        return ["could not read the JS to cross-check the lossless list: %s" % exc]

    # every accessory block that carries outlineFollows: true
    for block in re.split(r"\n\s*\"", renderer):
        if "outlineFollows: true" not in block:
            continue
        m = re.search(r"img:\s*\"([^\"]+)\"", block)
        if m and not is_lossless("items/" + os.path.splitext(m.group(1))[0] + ".png"):
            problems.append("items/%s follows the outline but is not in LOSSLESS" % m.group(1))

    # every furniture entry that carries a non-null tint
    for m in re.finditer(r"img:\s*\"([^\"]+)\",[^}]*?tint:\s*(?!null)(DOOR_TINTS[.]\w+|\"#)", furniture):
        name = os.path.splitext(m.group(1))[0] + ".png"
        if not is_lossless("furniture/" + name):
            problems.append("furniture/%s is tinted in code but is not in LOSSLESS" % m.group(1))

    # every anim state whose ANIM_RECOLOURS entry is true
    m = re.search(r"const ANIM_RECOLOURS = \{(.*?)\};", renderer, re.S)
    if m:
        for state, val in re.findall(r"(\w+):\s*(true|false)", m.group(1)):
            if val == "true" and not is_lossless("anim/%s-1.png" % state):
                problems.append("anim/%s-* recolours but is not in LOSSLESS" % state)
    # one door is named by nine catalogue rows, so say each thing once
    return sorted(set(problems))


def convert(png, force):
    relpath = rel(png)
    webp = os.path.splitext(png)[0] + ".webp"
    lossless = is_lossless(relpath)
    before = os.path.getsize(png)
    if (not force) and os.path.exists(webp) and os.path.getmtime(webp) >= os.path.getmtime(png):
        return relpath, lossless, before, os.path.getsize(webp), "skipped (already current)"
    im = Image.open(png)
    if im.mode != "RGBA":
        im = im.convert("RGBA")   # one room shell is a palette PNG
    if lossless:
        # exact=True keeps the colour under fully transparent pixels, so a
        # re-run can never quietly change a file's bytes.
        im.save(webp, "WEBP", lossless=True, quality=100, method=6, exact=True)
    else:
        im.save(webp, "WEBP", quality=QUALITY, method=6)
    return relpath, lossless, before, os.path.getsize(webp), "written"


def main():
    ap = argparse.ArgumentParser(description="Convert assets/companion PNGs to WebP.")
    ap.add_argument("--delete-png", action="store_true",
                    help="remove each source PNG once its WebP is written")
    ap.add_argument("--force", action="store_true",
                    help="re-encode even sprites whose WebP looks current")
    args = ap.parse_args()

    for problem in cross_check():
        print("WARNING: " + problem)

    pngs = []
    for dirpath, _dirs, files in os.walk(ART):
        for f in sorted(files):
            if f.lower().endswith(".png"):
                pngs.append(os.path.join(dirpath, f))
    pngs.sort(key=rel)
    if not pngs:
        print("No PNGs left under assets/companion/, nothing to do.")
        return 0

    rows = [convert(p, args.force) for p in pngs]

    width = max(len(r[0]) for r in rows)
    print()
    print("%-*s  %-8s %10s %10s %8s  %s" % (width, "file", "mode", "png", "webp", "saved", "status"))
    print("-" * (width + 52))
    tot_before = tot_after = 0
    for relpath, lossless, before, after, status in rows:
        tot_before += before
        tot_after += after
        pct = (1 - after / before) * 100 if before else 0
        print("%-*s  %-8s %10d %10d %7.1f%%  %s"
              % (width, relpath, "lossless" if lossless else "q%d" % QUALITY, before, after, pct, status))
    print("-" * (width + 52))
    pct = (1 - tot_after / tot_before) * 100 if tot_before else 0
    print("%-*s  %-8s %10d %10d %7.1f%%" % (width, "TOTAL (%d files)" % len(rows), "", tot_before, tot_after, pct))

    if args.delete_png:
        for p in pngs:
            os.remove(p)
        print("")
        print("Removed %d source PNGs. Commit the deletions with the new .webp files." % len(pngs))
    else:
        print("")
        print("The PNGs are still on disk. Re-run with --delete-png to remove them,")
        print("or delete them yourself once you have looked at the WebP.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
