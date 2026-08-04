#!/usr/bin/env python3
"""Render kinetic-typography PNG sequences for the villa ad.

Static title cards read as flat. Each beat here is animated per frame:
letter-spacing eases open, the line drifts up, alpha fades in and out, and a
hairline rule wipes out from the centre under the type. That motion is what
makes it read as a title sequence rather than a caption.

Usage: make_kinetic.py OUTDIR FPS WIDTH HEIGHT
Beats are defined in BEATS below; each becomes OUTDIR/<name>/f%04d.png
"""
import sys
import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

FONTDIR = "/mnt/skills/examples/canvas-design/canvas-fonts"
DISPLAY = os.path.join(FONTDIR, "Italiana-Regular.ttf")
BODY = os.path.join(FONTDIR, "CrimsonPro-Regular.ttf")

# name, duration_s, main text, main size, sub text, sub size, rule?, y_fraction
# Mid-film lines sit low, like lower-thirds, so they stay off the busy centre
# of each shot. The opening and end cards own the middle of the frame.
BEATS = [
    ("b1_open",  2.6, "PARADISE VILLA",       92, "ZANZIBAR",   28, True, 0.50),
    ("b2_pool",  2.2, "A POOL OF YOUR OWN",   56, "",            0, True, 0.74),
    ("b3_ocean", 2.2, "STEPS FROM THE OCEAN", 56, "",            0, True, 0.74),
    ("b4_bare",  2.2, "BAREFOOT LUXURY",      56, "",            0, True, 0.74),
    ("b5_end",   3.4, "PARADISE VILLA",      118, "ZANZIBAR",   32, True, 0.46),
]


def ease_out_cubic(t):
    return 1 - (1 - t) ** 3


def ease_in_out(t):
    return 3 * t * t - 2 * t * t * t


def tracked_width(draw, text, fnt, tracking):
    w = sum(draw.textlength(ch, font=fnt) for ch in text)
    return w + tracking * max(len(text) - 1, 0)


def draw_tracked(draw, xy, text, fnt, fill, tracking):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += draw.textlength(ch, font=fnt) + tracking


def shadowed(img, w, h, strength=0.8, blur=16):
    """Composite a soft dark shadow beneath the type so it survives bright plates."""
    # Two passes: a tight one for edge definition, a wide one that darkens the
    # plate behind the line. Sunlit water is bright enough to eat a single pass.
    out = Image.new("RGBA", (w, h), (0, 0, 0, 0))
    black = Image.new("L", (w, h), 0)
    for b, st in ((blur * 2.5, strength * 0.7), (blur, strength)):
        sh = img.filter(ImageFilter.GaussianBlur(b))
        alpha = sh.split()[3].point(lambda v: min(255, int(v * st)))
        out.alpha_composite(Image.merge("RGBA", (black, black, black, alpha)))
    out.alpha_composite(img)
    return out


def render_beat(outdir, name, dur, main, main_size, sub, sub_size, rule, yfrac, fps, w, h):
    d = os.path.join(outdir, name)
    os.makedirs(d, exist_ok=True)
    n = max(int(round(dur * fps)), 1)

    f_main = ImageFont.truetype(DISPLAY, main_size)
    f_sub = ImageFont.truetype(BODY, sub_size) if sub else None

    track_target = max(int(main_size * 0.17), 8)
    fade_in, fade_out = 0.55, 0.45

    for i in range(n):
        t = i / fps
        img = Image.new("RGBA", (w, h), (0, 0, 0, 0))
        dr = ImageDraw.Draw(img)

        # Alpha envelope: ease up, hold, ease away.
        if t < fade_in:
            a = ease_out_cubic(t / fade_in)
        elif t > dur - fade_out:
            a = max(0.0, 1 - (t - (dur - fade_out)) / fade_out)
        else:
            a = 1.0

        # Letter-spacing eases open across the first 60% of the beat, and the
        # line drifts up a touch — the two together give the "settling" feel.
        p = ease_out_cubic(min(t / (dur * 0.6), 1.0))
        tracking = track_target * (0.45 + 0.55 * p)
        drift = (1 - p) * 14

        ycentre = h * yfrac + drift
        alpha = int(255 * a)

        tw = tracked_width(dr, main, f_main, tracking)
        asc, desc = f_main.getmetrics()
        draw_tracked(dr, ((w - tw) / 2, ycentre - (asc + desc) / 2),
                     main, f_main, (255, 255, 255, alpha), tracking)

        if f_sub:
            sub_track = max(int(sub_size * 0.38), 8)
            sw = tracked_width(dr, sub, f_sub, sub_track)
            sasc, sdesc = f_sub.getmetrics()
            sy = ycentre + main_size * 0.78 + drift * 0.5
            draw_tracked(dr, ((w - sw) / 2, sy - (sasc + sdesc) / 2),
                         sub, f_sub, (255, 255, 255, int(alpha * 0.8)), sub_track)

        if rule:
            # Hairline wipes out from the centre, then retracts at the tail.
            grow = ease_in_out(min(t / (dur * 0.45), 1.0))
            if t > dur - fade_out:
                grow *= max(0.0, 1 - (t - (dur - fade_out)) / fade_out)
            half = (tw * 0.55) * grow / 2
            ry = ycentre - (asc + desc) / 2 - main_size * 0.34
            if half > 1:
                dr.rectangle([(w / 2 - half, ry), (w / 2 + half, ry + 2)],
                             fill=(255, 255, 255, int(alpha * 0.75)))

        shadowed(img, w, h).save(os.path.join(d, "f%04d.png" % i))

    return n


def main():
    outdir = sys.argv[1]
    fps = int(sys.argv[2]) if len(sys.argv) > 2 else 24
    w = int(sys.argv[3]) if len(sys.argv) > 3 else 1920
    h = int(sys.argv[4]) if len(sys.argv) > 4 else 1080
    os.makedirs(outdir, exist_ok=True)
    for beat in BEATS:
        n = render_beat(outdir, *beat, fps=fps, w=w, h=h)
        print(f"{beat[0]}: {n} frames")


if __name__ == "__main__":
    main()
