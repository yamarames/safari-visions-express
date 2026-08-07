#!/usr/bin/env python3
"""Composite the overlay onto the graded bed, finish the image and encode.

  bed -> vignette -> grain -> overlay(alpha PNG seq) -> unify grain -> H.264

The blend runs in yuv444 so the type keeps clean edges, and only converts to
yuv420p on the way into the encoder.

Run:  python3 ad/build_master.py [workdir] [outfile]
"""

import os
import subprocess
import sys

from timeline import FPS, H, W, build_timeline

WORK = sys.argv[1] if len(sys.argv) > 1 else "/tmp/bilo_build"
HERE = os.path.dirname(os.path.abspath(__file__))
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(
    HERE, "out", "bilo_home_collection_30s_1080x1920.mp4")


def main():
    os.makedirs(os.path.dirname(OUT), exist_ok=True)
    shots, total = build_timeline()

    bed = os.path.join(WORK, "bed.mp4")
    mg = os.path.join(WORK, "mg", "f_%05d.png")
    aud = os.path.join(WORK, "audio.wav")
    for p in (bed, aud):
        if not os.path.exists(p):
            raise SystemExit(f"missing {p} -- run build_video.py / build_audio.py first")

    fc = (
        # finish the footage before anything is drawn on top of it
        "[0:v]vignette=angle=PI/5.4:mode=forward,"
        "noise=alls=5:allf=t+u,"
        "unsharp=5:5:0.42:5:5:0.0,"
        "format=yuv444p[bed];"
        # graphics
        "[1:v]format=rgba[gfx];"
        "[bed][gfx]overlay=0:0:format=yuv444:eof_action=pass[comp];"
        "[comp]format=yuv420p[v]"
    )
    # Grain is deliberately applied to the footage only, never over the
    # graphics: temporal noise across the full frame roughly triples the
    # bitrate and softens the type for nothing.

    cmd = [
        "ffmpeg", "-y", "-v", "error", "-stats",
        "-i", bed,
        "-framerate", str(FPS), "-i", mg,
        "-i", aud,
        "-filter_complex", fc,
        "-map", "[v]", "-map", "2:a",
        "-frames:v", str(total),
        "-c:v", "libx264", "-preset", "slow", "-crf", "20",
        "-profile:v", "high", "-level", "4.2", "-pix_fmt", "yuv420p",
        "-x264-params", "keyint=60:min-keyint=30:ref=4",
        "-colorspace", "bt709", "-color_primaries", "bt709", "-color_trc", "bt709",
        "-c:a", "aac", "-b:a", "192k", "-ar", "48000", "-ac", "2",
        "-movflags", "+faststart",
        "-metadata", "title=bilo - The Home Collection",
        OUT,
    ]
    p = subprocess.run(cmd, capture_output=True, text=True)
    if p.returncode != 0:
        sys.stderr.write(p.stderr[-3000:] + "\n")
        raise SystemExit(f"ffmpeg failed ({p.returncode})")

    mb = os.path.getsize(OUT) / 1e6
    print(f"master -> {OUT}  ({mb:.1f} MB, {total} frames, {total / FPS:.2f}s)")


if __name__ == "__main__":
    main()
