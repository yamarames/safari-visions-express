"""
bilo — "The Home Collection" 30s vertical commercial.

Single source of truth for the edit. Both the ffmpeg video build and the
browser-rendered motion-graphics overlay read the timeline from here, so the
graphics can never drift out of sync with the cuts.

Source footage: three 10s vertical bilo product films (720x1280 @ 24fps).
Each one is really four sub-shots -- hero / flat-lay / macro / end card --
so there are nine clean body shots to cut a brand film from.
"""

import os

FPS = 30
W, H = 1080, 1920

UPLOADS = os.environ.get(
    "BILO_FOOTAGE",
    "/root/.claude/uploads/bcdd6c7f-4cbd-524b-9687-0116415e8b72",
)

SOURCES = {
    # woven throws / kilim -- "Bring Culture to Your Space"
    "S1": os.path.join(UPLOADS, "98452446-gemini_generated_video_5A8077D8.mp4"),
    # bedding -- "Premium Cotton & Sateen"
    "S2": os.path.join(UPLOADS, "9ce60fae-gemini_generated_video_462A033E.mov"),
    # waffle towels -- "Towels You Can Trust"
    "S3": os.path.join(UPLOADS, "fcbc1b21-gemini_generated_video_B9660BD4.mp4"),
}

# Sub-shot in/out points inside each source, from scene detection.
#   A = hero / establishing, B = flat lay, C = macro texture, D = baked end card
# The D sub-shots are bilo's own end cards and are deliberately unused -- this
# film builds its own lockup. Out points are hard limits: reading past one
# cuts into the next scene mid-shot.
SUBSHOT = {
    "S1A": ("S1", 0.10, 2.95), "S1B": ("S1", 3.15, 5.40), "S1C": ("S1", 5.55, 7.40),
    "S2A": ("S2", 0.20, 2.35), "S2B": ("S2", 2.60, 4.85), "S2C": ("S2", 5.10, 7.30),
    "S3A": ("S3", 0.20, 2.45), "S3B": ("S3", 2.65, 4.85), "S3C": ("S3", 5.20, 7.40),
}

# Per-chapter looks. Each chapter gets its own grade so the three product
# worlds read as distinct without breaking the overall warm-neutral palette.
LOOKS = {
    # rich + warm, leans into the dyed wool
    "warm": "eq=contrast=1.10:saturation=1.16:gamma=1.00:gamma_r=1.02:gamma_b=0.98",
    # airy + cool, keeps the white linens clean
    "airy": "eq=contrast=1.05:saturation=0.96:gamma=1.05:gamma_b=1.03",
    # soft neutral for the bathroom pastels
    "soft": "eq=contrast=1.04:saturation=1.06:gamma=1.02:gamma_r=1.01",
    # crushed + punchy, only used for the strobe hook
    "punch": "eq=contrast=1.30:saturation=1.22:gamma=0.94",
    # montage look, slightly hotter than the chapter grades
    "hot": "eq=contrast=1.14:saturation=1.18:gamma=0.99",
}


def shot(name, sub, frames, z0, z1, look, speed=1.0, extra=""):
    """One cut on the timeline.

    `frames` is the shot's *clean* length -- how long it is fully visible.
    The last shot of each block is padded automatically by the length of the
    transition that follows, so transition durations can be retimed here
    without hand-adjusting any shot.

    z0/z1 are the start and end zoom of the move. speed < 1 slows the source
    down, which is how the short macro shots stretch to fill a longer beat.
    """
    return dict(name=name, sub=sub, frames=frames, z0=z0, z1=z1,
                look=look, speed=speed, extra=extra)


# --- Blocks -----------------------------------------------------------------
# Cuts inside a block are hard cuts (concat). Blocks are joined by xfade
# transitions. The last shot of each block is padded by the length of the
# transition that follows it, so the visible timeline still lands on 30.000s.

BLOCKS = [
    # B0 -- HOOK: six-frame strobe of pure texture, then settle on the hero.
    ("hook", [
        shot("h1", "S1C", 4, 1.45, 1.45, "punch"),
        shot("h2", "S2C", 4, 1.45, 1.45, "punch"),
        shot("h3", "S3C", 4, 1.45, 1.45, "punch"),
        shot("h4", "S1C", 4, 1.30, 1.30, "punch"),
        shot("h5", "S2C", 4, 1.30, 1.30, "punch"),
        shot("h6", "S3C", 4, 1.30, 1.30, "punch"),
        shot("hero", "S1A", 75, 1.02, 1.14, "warm"),
    ]),
    # B1 -- 01 LIVING: the woven throws.
    ("living", [
        shot("liv_a", "S1B", 87, 1.05, 1.15, "warm", speed=0.77),
        shot("liv_b", "S1C", 87, 1.08, 1.24, "warm", speed=0.56),
    ]),
    # B2 -- 02 SLEEP: cotton & sateen bedding.
    ("sleep", [
        shot("slp_a", "S2A", 66, 1.02, 1.12, "airy", speed=0.97),
        shot("slp_b", "S2B", 57, 1.14, 1.04, "airy"),
        shot("slp_c", "S2C", 54, 1.06, 1.20, "airy", speed=0.93),
    ]),
    # B3 -- 03 BATH: waffle towels.
    ("bath", [
        shot("bth_a", "S3A", 66, 1.03, 1.13, "soft"),
        shot("bth_b", "S3B", 57, 1.16, 1.06, "soft"),
        shot("bth_c", "S3C", 57, 1.06, 1.20, "soft", speed=0.95),
    ]),
    # B4 -- MONTAGE: eight rapid-fire cuts, then a three-way split screen.
    ("montage", [
        shot("m1", "S1A", 7, 1.20, 1.24, "hot"),
        shot("m2", "S2C", 7, 1.35, 1.40, "hot"),
        shot("m3", "S3A", 7, 1.22, 1.26, "hot"),
        shot("m4", "S1C", 7, 1.35, 1.40, "hot"),
        shot("m5", "S2A", 7, 1.20, 1.24, "hot"),
        shot("m6", "S3C", 7, 1.35, 1.40, "hot"),
        shot("m7", "S1B", 7, 1.25, 1.29, "hot"),
        shot("m8", "S3B", 7, 1.25, 1.29, "hot"),
        shot("tri", "TRIPTYCH", 82, 1.0, 1.0, None),
    ]),
    # B5 -- END CARD: hero shot thrown far out of focus as a plate for the lockup.
    ("endcard", [
        shot("ec", "S1A", 132, 1.10, 1.22, "warm", speed=0.62,
             extra="gblur=sigma=34,eq=brightness=-0.12:saturation=1.05"),
    ]),
]

# xfade between block i and block i+1: (type, frames)
TRANSITIONS = [
    ("hblur", 7),        # hook -> living : whip-blur
    ("pixelize", 10),    # living -> sleep : glitch
    ("circleopen", 10),  # sleep -> bath : iris
    ("fadewhite", 5),    # bath -> montage : hard flash cut
    ("fadewhite", 8),    # montage -> end card : bloom into the lockup
]

# Shots that make up the three-way split screen, top to bottom.
TRIPTYCH = [("S1A", 0.55), ("S2A", 0.40), ("S3A", 0.45)]
TRIPTYCH_SPEED = 0.71


def build_timeline():
    """Resolve every shot to its absolute [start, end] frame in the final cut.

    Returns (shots, total_frames). Because each block is padded by the
    transition that follows it, a shot's clean (fully-visible) window is what
    the overlay animates against.
    """
    shots = []
    cursor = 0  # frame at which the current block's *clean* content starts
    for bi, (bname, blk) in enumerate(BLOCKS):
        t_in = TRANSITIONS[bi - 1][1] if bi > 0 else 0
        t_out = TRANSITIONS[bi][1] if bi < len(TRANSITIONS) else 0
        local = 0
        for si, s in enumerate(blk):
            last = si == len(blk) - 1
            clean = s["frames"]
            shots.append(dict(
                s, block=bname,
                start=cursor + local,
                end=cursor + local + clean,
                # what actually gets rendered: the clean length plus the
                # overlap consumed by the transition out of this block
                render_frames=clean + (t_out if last else 0),
                t_in=t_in if si == 0 else 0,
                t_out=t_out if last else 0,
            ))
            local += clean
        cursor += local
    return shots, cursor


def source_window(sub, frames, speed):
    """(path, in_point, source_duration) for a shot."""
    src, tin, _ = SUBSHOT[sub]
    return SOURCES[src], tin, frames / FPS * speed


def check_windows():
    """Fail loudly if any shot would read past its scene boundary.

    Retiming a transition changes how much source a padded shot consumes, and
    overrunning shows a frame or two of the *next* scene at the tail of a cut
    -- easy to miss when reviewing stills, obvious in motion.
    """
    problems = []
    shots, _ = build_timeline()
    for s in shots:
        if s["sub"] == "TRIPTYCH":
            need = s["render_frames"] / FPS * TRIPTYCH_SPEED
            subs = [sub for sub, _ in TRIPTYCH]
        else:
            need = s["render_frames"] / FPS * s["speed"]
            subs = [s["sub"]]
        for sub in subs:
            _, tin, tout = SUBSHOT[sub]
            have = tout - tin
            if need > have + 1e-6:
                problems.append(
                    f"{s['name']} ({sub}): needs {need:.3f}s of source, "
                    f"only {have:.3f}s available -- lower its speed")
    return problems


def dump_json(path):
    """Export the resolved cut points for the browser-rendered overlay.

    The overlay animates against shot names, so it can never drift out of
    sync with the edit -- change a shot length here and the graphics move too.
    """
    import json

    shots, total = build_timeline()
    data = {
        "fps": FPS, "w": W, "h": H,
        "totalFrames": total, "duration": total / FPS,
        "shots": {s["name"]: {"start": s["start"], "end": s["end"],
                              "startT": s["start"] / FPS, "endT": s["end"] / FPS,
                              "block": s["block"]} for s in shots},
    }
    with open(path, "w") as f:
        json.dump(data, f, indent=1)
    return data


if __name__ == "__main__":
    import sys

    shots, total = build_timeline()
    for s in shots:
        print(f"{s['block']:8s} {s['name']:6s} {s['sub']:9s} "
              f"{s['start']:4d}-{s['end']:4d}  "
              f"{s['start']/FPS:6.2f}s-{s['end']/FPS:6.2f}s")
    print(f"\ntotal {total} frames = {total/FPS:.3f}s")

    if len(sys.argv) > 1:
        dump_json(sys.argv[1])
        print(f"wrote {sys.argv[1]}")
