"""Generate the PWA app icons — a violet rounded square with a white sigma.
Run: python tools/make_icons.py  (writes the PNGs into the project root)."""
import os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
VIOLET = (139, 92, 246, 255)
WHITE = (255, 255, 255, 255)
GLYPH = "σ"  # σ

def font_for(size):
    for path in ("C:/Windows/Fonts/seguisb.ttf", "C:/Windows/Fonts/segoeui.ttf",
                 "C:/Windows/Fonts/arialbd.ttf", "C:/Windows/Fonts/arial.ttf"):
        try:
            return ImageFont.truetype(path, size)
        except Exception:
            pass
    return ImageFont.load_default()

def make(size, name, *, maskable=False, glyph_frac=0.6):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    if maskable:
        d.rectangle([0, 0, size, size], fill=VIOLET)               # full bleed for masking
    else:
        d.rounded_rectangle([0, 0, size - 1, size - 1], radius=int(size * 0.22), fill=VIOLET)
    f = font_for(int(size * glyph_frac))
    bbox = d.textbbox((0, 0), GLYPH, font=f)
    w, h = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text(((size - w) / 2 - bbox[0], (size - h) / 2 - bbox[1]), GLYPH, font=f, fill=WHITE)
    img.save(os.path.join(ROOT, name))
    print("wrote", name)

make(192, "icon-192.png")
make(512, "icon-512.png")
make(512, "icon-512-maskable.png", maskable=True, glyph_frac=0.46)   # smaller glyph inside the safe zone
make(180, "apple-touch-icon.png", maskable=True, glyph_frac=0.58)    # Apple applies its own rounded mask
