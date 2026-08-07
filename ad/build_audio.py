#!/usr/bin/env python3
"""Score and sound-design the bilo commercial, synthesised entirely in ffmpeg.

The source clips only carry faint generated room tone, so the track is built
from scratch: an Am-F-C-G pad progression under a soft pulse, plus hits,
whooshes, a riser and a shimmer placed on the exact cut points that
timeline.py hands the picture edit.

Run:  python3 ad/build_audio.py [workdir]
"""

import os
import subprocess
import sys

from timeline import FPS, build_timeline

WORK = sys.argv[1] if len(sys.argv) > 1 else "/tmp/bilo_build"
SFX = os.path.join(WORK, "sfx")
SR = 48000
DUR = 30.0


def run(args):
    p = subprocess.run(args, capture_output=True, text=True)
    if p.returncode != 0:
        sys.stderr.write(" ".join(args[:12]) + " ...\n" + p.stderr[-2000:] + "\n")
        raise SystemExit(f"ffmpeg failed ({p.returncode})")


def gen(name, filt, dur):
    """Render one primitive to a wav via a lavfi graph."""
    out = os.path.join(SFX, name + ".wav")
    run(["ffmpeg", "-y", "-v", "error", "-f", "lavfi", "-i", filt,
         "-t", f"{dur:.3f}", "-ac", "1", "-ar", str(SR), out])
    return out


def sines(freqs, dur, decay=None, amp=0.2):
    """aevalsrc expression summing detuned sine partials."""
    terms = []
    for i, f in enumerate(freqs):
        det = 1.0 + (0.0016 if i % 2 else -0.0016)   # slight spread = warmth
        terms.append(f"sin(2*PI*{f * det:.4f}*t)")
    e = f"({amp:.4f})*({'+'.join(terms)})"
    if decay:
        e = f"{e}*exp(-{decay}*t)"
    return f"aevalsrc=exprs={e}:s={SR}:d={dur:.3f}"


# --- chord bed --------------------------------------------------------------
# Am -> F -> C -> G -> Am, each section fading across the next so the pad never
# hard-switches. Times are picture beats, not a metronome: the cuts were placed
# for the edit, so the score follows them instead of fighting a grid.
CHORDS = [
    ("c1", [110.00, 261.63, 329.63, 440.00], 0.00, 9.60),   # Am
    ("c2", [ 87.31, 220.00, 261.63, 349.23], 9.10, 15.50),  # F
    ("c3", [130.81, 164.81, 196.00, 392.00], 15.00, 21.40),  # C
    ("c4", [ 98.00, 246.94, 293.66, 392.00], 21.00, 26.10),  # G
    ("c5", [110.00, 261.63, 329.63, 493.88], 25.60, 30.00),  # Am add9
]


def build_music():
    parts = []
    for name, freqs, a, b in CHORDS:
        d = b - a
        f = gen(name, sines(freqs, d, amp=0.115), d)
        parts.append((f, a, d))

    # low pulse + airy tick layer, both free-running under the pad
    sub = gen("sub", f"aevalsrc=exprs=0.42*sin(2*PI*55*t)*exp(-5.5*mod(t\\,1.0))"
                     f":s={SR}:d={DUR}", DUR)
    hat = gen("hat", f"anoisesrc=c=pink:a=0.34:d={DUR}:r={SR},"
                     f"highpass=f=6800,"
                     f"volume=volume='exp(-46*mod(t\\,0.5))':eval=frame", DUR)

    inputs, fc, labels = [], [], []
    for i, (f, a, d) in enumerate(parts):
        inputs += ["-i", f]
        # long smooth crossfades between chords
        fc.append(f"[{i}:a]afade=t=in:st=0:d=1.4,"
                  f"afade=t=out:st={max(0, d - 1.5):.3f}:d=1.5,"
                  f"adelay={int(a * 1000)}|{int(a * 1000)}[p{i}]")
        labels.append(f"[p{i}]")
    n = len(parts)
    inputs += ["-i", sub, "-i", hat]
    fc.append(f"[{n}:a]volume=0.50[psub]")
    fc.append(f"[{n + 1}:a]volume=0.30[phat]")
    labels += ["[psub]", "[phat]"]

    # One shared envelope: slow fade up, a dip just before the montage so the
    # 21.0s flash-cut lands like a drop, then a tail under the end card.
    envl = ("min(1,t/1.6)"
            "*(if(between(t,20.45,21.00),1-0.80*sin(PI*(t-20.45)/0.55),1))"
            "*(1-0.74*max(0,min(1,(t-28.90)/1.55)))")
    fc.append("".join(labels) + f"amix=inputs={len(labels)}:normalize=0[mx]")
    fc.append(f"[mx]volume=volume='{envl}':eval=frame,"
              f"aecho=0.8:0.85:60|140:0.28|0.18,"
              f"lowpass=f=7200,highpass=f=42[music]")

    out = os.path.join(WORK, "music.wav")
    run(["ffmpeg", "-y", "-v", "error", *inputs,
         "-filter_complex", ";".join(fc), "-map", "[music]",
         "-t", f"{DUR}", "-ac", "1", "-ar", str(SR), out])
    return out


# --- one-shots --------------------------------------------------------------
def build_sfx():
    s = {}
    s["tick"] = gen("tick", f"anoisesrc=c=white:a=0.85:d=0.07:r={SR},"
                            f"highpass=f=1600,lowpass=f=9500,"
                            f"volume=volume='exp(-95*t)':eval=frame", 0.07)

    # noise swell + pitch sweep = whip / whoosh
    s["whoosh"] = gen("whoosh",
                      f"anoisesrc=c=pink:a=0.9:d=0.80:r={SR},highpass=f=280,"
                      f"volume=volume='pow(sin(PI*min(t/0.80\\,1))\\,2.6)':eval=frame,"
                      f"aphaser=in_gain=0.5:speed=1.9", 0.80)
    s["sweep"] = gen("sweep",
                     f"aevalsrc=exprs='0.34*sin(2*PI*(220+2600*(t/0.8))*t)"
                     f"*pow(sin(PI*min(t/0.8\\,1))\\,2)':s={SR}:d=0.80", 0.80)

    # body thump + transient crack
    s["impact"] = gen("impact",
                      f"aevalsrc=exprs='0.85*sin(2*PI*47*t)*exp(-4.2*t)"
                      f"+0.34*sin(2*PI*94*t)*exp(-8*t)':s={SR}:d=1.30", 1.30)
    s["crack"] = gen("crack", f"anoisesrc=c=white:a=0.75:d=0.20:r={SR},"
                              f"highpass=f=900,"
                              f"volume=volume='exp(-34*t)':eval=frame", 0.20)

    # short punchy hit for the rapid-fire montage cuts
    s["hit"] = gen("hit",
                   f"aevalsrc=exprs='0.55*sin(2*PI*160*t)*exp(-26*t)"
                   f"+0.30*sin(2*PI*70*t)*exp(-15*t)':s={SR}:d=0.28", 0.28)
    s["snap"] = gen("snap", f"anoisesrc=c=white:a=0.6:d=0.14:r={SR},"
                            f"highpass=f=2600,"
                            f"volume=volume='exp(-52*t)':eval=frame", 0.14)

    # 1.7s riser into the drop
    s["riser"] = gen("riser",
                     f"aevalsrc=exprs='0.30*sin(2*PI*(260+2900*pow(t/1.7\\,2))*t)"
                     f"*pow(t/1.7\\,1.6)':s={SR}:d=1.70", 1.70)
    s["rnoise"] = gen("rnoise", f"anoisesrc=c=pink:a=0.7:d=1.70:r={SR},"
                                f"highpass=f=700,"
                                f"volume=volume='pow(t/1.7\\,2.4)':eval=frame", 1.70)

    # shimmer under the end-card lockup
    s["shimmer"] = gen("shimmer",
                       sines([1318.5, 1760.0, 2093.0, 2637.0], 3.20,
                             decay=1.5, amp=0.075), 3.20)
    return s


def events(shots):
    """(sound, time, gain) placed against the picture cuts."""
    T = {s["name"]: s["start"] / FPS for s in shots}
    ev = []

    # strobe hook: a tick on every flash frame
    for i in range(1, 7):
        ev.append(("tick", T[f"h{i}"], 0.60))

    def land(t, gain=1.0, lead=0.72):
        """Whoosh leading into a hit that lands exactly on the cut."""
        ev.append(("whoosh", t - lead, 0.85 * gain))
        ev.append(("sweep", t - lead, 0.55 * gain))
        ev.append(("impact", t, 1.00 * gain))
        ev.append(("crack", t, 0.42 * gain))

    land(T["hero"], 0.95)                 # settle onto the hero
    land(T["liv_a"], 1.00)                # whip into 01 LIVING
    land(T["slp_a"], 1.00)                # into 02 SLEEP
    land(T["bth_a"], 1.00)                # into 03 BATH

    # soft accents on the punch cuts inside chapters
    for k in ("liv_b", "slp_b", "slp_c", "bth_b", "bth_c"):
        ev.append(("hit", T[k], 0.42))
        ev.append(("snap", T[k], 0.28))

    # riser -> drop into the montage
    ev.append(("riser", T["m1"] - 1.70, 0.90))
    ev.append(("rnoise", T["m1"] - 1.70, 0.55))
    ev.append(("impact", T["m1"], 1.25))
    ev.append(("crack", T["m1"], 0.65))

    # a hit on each rapid-fire cut
    for i in range(2, 9):
        ev.append(("hit", T[f"m{i}"], 0.70))
        ev.append(("snap", T[f"m{i}"], 0.45))

    # split screen, then the end card
    ev.append(("impact", T["tri"], 0.80))
    ev.append(("snap", T["tri"], 0.40))
    land(T["ec"], 1.15, lead=0.74)
    ev.append(("shimmer", T["ec"] + 0.10, 1.0))
    ev.append(("hit", T["ec"] + 2.60, 0.50))   # CTA pop
    ev.append(("snap", T["ec"] + 2.60, 0.30))
    return ev


def main():
    os.makedirs(SFX, exist_ok=True)
    shots, _ = build_timeline()

    music = build_music()
    s = build_sfx()
    ev = events(shots)
    print(f"music + {len(ev)} sound-design events")

    inputs = ["-i", music]
    fc = ["[0:a]volume=0.92[m]"]
    labels = ["[m]"]
    for i, (name, t, g) in enumerate(ev):
        idx = i + 1
        inputs += ["-i", s[name]]
        d = max(0, int(round(t * 1000)))
        fc.append(f"[{idx}:a]volume={g:.3f},adelay={d}|{d}[e{i}]")
        labels.append(f"[e{i}]")

    fc.append("".join(labels) + f"amix=inputs={len(labels)}:normalize=0[sum]")
    # gentle glue, then hard-limit and normalise for social delivery
    fc.append("[sum]acompressor=threshold=0.18:ratio=3:attack=6:release=180,"
              "alimiter=limit=0.94:level=disabled,"
              "aformat=channel_layouts=stereo,"
              "loudnorm=I=-14:TP=-1.2:LRA=11[out]")

    out = os.path.join(WORK, "audio.wav")
    run(["ffmpeg", "-y", "-v", "error", *inputs,
         "-filter_complex", ";".join(fc), "-map", "[out]",
         "-t", f"{DUR}", "-ar", str(SR), "-ac", "2", out])
    print(f"audio -> {out}")


if __name__ == "__main__":
    main()
