#!/usr/bin/env python3
"""Render the ad's title cards as transparent PNGs.

The static ffmpeg build here has no drawtext filter (compiled without
freetype), and rendering type in Pillow is the better route anyway: real
letter-spacing, optical centring and a soft drop shadow that keeps white type
legible over bright sand and water.

Usage: make_titles.py OUTDIR BRAND TAGLINE [WIDTH HEIGHT]
Writes: title_open.png, title_end.png
"""
import sys
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FONTDIR = "/mnt/skills/examples/canvas-design/canvas-fonts"
DISPLAY = os.path.join(FONTDIR, "Italiana-Regular.ttf")     # luxury display serif
BODY = os.path.join(FONTDIR, "CrimsonPro-Regular.ttf")


def font(path, size):
    return ImageFont.truetype(path, size)


def tracked_width(draw, text, fnt, tracking):
    """Width of `text` when each glyph is spaced by `tracking` extra pixels."""
    w = sum(draw.textlength(ch, font=fnt) for ch in text)
    return w + tracking * max(len(text) - 1, 0)


def draw_tracked(draw, xy, text, fnt, fill, tracking):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += draw.textlength(ch, font=fnt) + tracking


def card(w, h, lines):
    """lines: list of (text, font, tracking, fill, y_centre)."""
    img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    for text, fnt, tracking, fill, ycentre in lines:
        tw = tracked_width(d, text, fnt, tracking)
        ascent, descent = fnt.getmetrics()
        y = ycentre - (ascent + descent) / 2
        draw_tracked(d, ((w - tw) / 2, y), text, fnt, fill, tracking)

    # Soft shadow so white type survives over bright sand, water and sky.
    shadow = img.filter(ImageFilter.GaussianBlur(9))
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    out.alpha_composite(Image.merge("RGBA", (
        Image.new("L", (w, h), 0), Image.new("L", (w, h), 0),
        Image.new("L", (w, h), 0), shadow.split()[3].point(lambda v: int(v * 0.55)),
    )))
    out.alpha_composite(img)
    return out


def main():
    outdir = sys.argv[1]
    brand = sys.argv[2]
    tagline = sys.argv[3]
    w = int(sys.argv[4]) if len(sys.argv) > 4 else 1920
    h = int(sys.argv[5]) if len(sys.argv) > 5 else 1080
    os.makedirs(outdir, exist_ok=True)

    # Opening: quiet, small, sitting inside the lower letterbox safe area.
    open_card = card(w, h, [
        (tagline.upper(), font(BODY, 34), 14, (255, 255, 255, 235), int(h * 0.78)),
    ])
    open_card.save(os.path.join(outdir, "title_open.png"))

    # End card: brand large, tagline beneath, generous air between them.
    end_card = card(w, h, [
        (brand.upper(), font(DISPLAY, 118), 20, (255, 255, 255, 255), int(h * 0.46)),
        (tagline.upper(), font(BODY, 32), 12, (255, 255, 255, 200), int(h * 0.575)),
    ])
    end_card.save(os.path.join(outdir, "title_end.png"))

    print("wrote title_open.png and title_end.png")


if __name__ == "__main__":
    main()
