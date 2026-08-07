#!/usr/bin/env python3
"""Render the graded video bed for the bilo commercial.

Four stages:
  1. every shot -> its own segment, with a Ken Burns move and a chapter grade
  2. the three-way split screen, built separately and dropped into the montage
  3. hard cuts concatenated into blocks
  4. blocks joined with xfade transitions -> bed.mp4

Run from anywhere:  python3 ad/build_video.py [workdir]
"""

import os
import subprocess
import sys

from timeline import (BLOCKS, FPS, LOOKS, SOURCES, SUBSHOT, TRANSITIONS,
                      TRIPTYCH, TRIPTYCH_SPEED, W, H, build_timeline,
                      check_windows, source_window)

WORK = sys.argv[1] if len(sys.argv) > 1 else "/tmp/bilo_build"
SEG = os.path.join(WORK, "seg")

# Intermediates are re-encoded three times before mastering, so keep them
# visually lossless rather than trusting a delivery-grade CRF to survive it.
ENC = ["-c:v", "libx264", "-preset", "fast", "-crf", "14",
       "-pix_fmt", "yuv420p", "-an"]


def run(args):
    p = subprocess.run(args, capture_output=True, text=True)
    if p.returncode != 0:
        sys.stderr.write(" ".join(args[:14]) + " ...\n" + p.stderr[-2500:] + "\n")
        raise SystemExit(f"ffmpeg failed ({p.returncode})")


def move(z0, z1, n):
    """Ken Burns move as a zoompan expression, linear from z0 to z1 over n frames.

    The source is pre-scaled 2x before this runs, so even the tightest punch-in
    is still sampling at or above native resolution.
    """
    if n > 1:
        z = f"{z0:.4f}+({z1 - z0:.4f})*on/{n - 1}"
    else:
        z = f"{z0:.4f}"
    return (f"zoompan=z='{z}':d=1:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)'"
            f":s={W}x{H}:fps={FPS}")


def build_shot(s):
    """One cut -> one segment file."""
    out = os.path.join(SEG, f"{s['name']}.mp4")
    n = s["render_frames"]
    src, tin, dur = source_window(s["sub"], n, s["speed"])

    vf = []
    if s["speed"] != 1.0:
        vf.append(f"setpts=PTS/{s['speed']}")
    vf.append(f"fps={FPS}")
    vf.append(f"scale={W * 2}:{H * 2}:flags=lanczos")
    vf.append(move(s["z0"], s["z1"], n))
    if s["look"]:
        vf.append(LOOKS[s["look"]])
    if s["extra"]:
        vf.append(s["extra"])
    vf.append("format=yuv420p")

    run(["ffmpeg", "-y", "-v", "error",
         "-ss", f"{tin:.3f}", "-t", f"{dur + 0.30:.3f}", "-i", src,
         "-vf", ",".join(vf), "-frames:v", str(n),
         *ENC, out])
    return out


def build_triptych(frames):
    """Three products on screen at once, each band drifting a different way."""
    out = os.path.join(SEG, "tri.mp4")
    band = H // 3  # 640
    looks = ["warm", "airy", "soft"]

    inputs, parts, labels = [], [], []
    for i, (sub, yfrac) in enumerate(TRIPTYCH):
        src, tin = SUBSHOT[sub][0], SUBSHOT[sub][1]
        dur = frames / FPS * TRIPTYCH_SPEED
        inputs += ["-ss", f"{tin:.3f}", "-t", f"{dur + 0.30:.3f}",
                   "-i", SOURCES[src]]
        # Scale 10% past frame width so each band has room to pan horizontally,
        # alternating direction band to band.
        d0, d1 = (0.10, 0.80) if i % 2 == 0 else (0.80, 0.10)
        parts.append(
            f"[{i}:v]setpts=PTS/{TRIPTYCH_SPEED},fps={FPS},"
            f"scale={int(W * 1.10)}:{int(H * 1.10)}:flags=lanczos,"
            f"crop={W}:{band}:"
            f"x='(iw-ow)*({d0}+({d1 - d0:.3f})*n/{frames - 1})':"
            f"y='(ih-oh)*{yfrac}',"
            f"{LOOKS[looks[i]]},format=yuv420p[b{i}]")
        labels.append(f"[b{i}]")

    fc = ";".join(parts) + ";" + "".join(labels) + "vstack=inputs=3[v]"
    run(["ffmpeg", "-y", "-v", "error", *inputs,
         "-filter_complex", fc, "-map", "[v]", "-frames:v", str(frames),
         *ENC, out])
    return out


def concat_block(name, files):
    lst = os.path.join(WORK, f"{name}.txt")
    with open(lst, "w") as f:
        for p in files:
            f.write(f"file '{p}'\n")
    out = os.path.join(WORK, f"blk_{name}.mp4")
    run(["ffmpeg", "-y", "-v", "error", "-f", "concat", "-safe", "0",
         "-i", lst, "-c", "copy", out])
    return out


def main():
    os.makedirs(SEG, exist_ok=True)
    shots, total = build_timeline()

    bad = check_windows()
    if bad:
        raise SystemExit("source window overrun:\n  " + "\n  ".join(bad))

    print(f"timeline: {total} frames / {total / FPS:.3f}s")

    # 1 + 2 -- segments
    for s in shots:
        if s["sub"] == "TRIPTYCH":
            build_triptych(s["render_frames"])
        else:
            build_shot(s)
        print(f"  shot {s['name']:6s} {s['render_frames']:3d}f")

    # 3 -- blocks (hard cuts)
    blocks = []
    for bname, blk in BLOCKS:
        files = [os.path.join(SEG, f"{s['name']}.mp4") for s in blk]
        blocks.append(concat_block(bname, files))
        print(f"  block {bname}")

    # 4 -- xfade chain. Offsets are the clean block boundaries, which is
    # exactly what timeline.py hands the overlay renderer.
    inputs, fc, prev = [], [], "[0:v]"
    by = {s["name"]: s for s in shots}
    blen = lambda blk: sum(by[x["name"]]["render_frames"] for x in blk)
    acc = blen(BLOCKS[0][1])
    for p in blocks:
        inputs += ["-i", p]
    for i, (kind, tf) in enumerate(TRANSITIONS):
        offset = (acc - tf) / FPS
        out = f"[x{i}]"
        fc.append(f"{prev}[{i + 1}:v]xfade=transition={kind}"
                  f":duration={tf / FPS:.4f}:offset={offset:.4f}{out}")
        acc += blen(BLOCKS[i + 1][1]) - tf
        prev = out
        print(f"  xfade {kind:11s} @ {offset:6.3f}s  ({tf}f)")

    bed = os.path.join(WORK, "bed.mp4")
    run(["ffmpeg", "-y", "-v", "error", *inputs,
         "-filter_complex", ";".join(fc), "-map", prev,
         "-frames:v", str(total), *ENC, bed])

    print(f"\nbed -> {bed}")


if __name__ == "__main__":
    main()
