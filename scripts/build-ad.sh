#!/usr/bin/env bash
# Villa commercial — assembly, grade, motion graphics and audio mix.
#
# Usage:
#   ./build-ad.sh CLIPDIR OUTDIR [BRAND] [TAGLINE] [MUSIC.mp3]
#
# CLIPDIR must contain the six clips named 01..06 (any extension ffmpeg reads):
#   01_banda.mp4  02_reveal.mp4  03_pool.mp4  04_bed.mp4  05_detail.mp4  06_fire.mp4
#
# Produces in OUTDIR:
#   master_1080p.mp4   16:9 master, 2.39:1 letterbox, graded, mixed
#   vertical_9x16.mp4  Reels / TikTok
#   square_1x1.mp4     feed placement
#
# Requires ffmpeg (installed via: pip install imageio-ffmpeg).

set -euo pipefail

CLIPDIR="${1:?usage: build-ad.sh CLIPDIR OUTDIR [BRAND] [TAGLINE] [MUSIC]}"
OUTDIR="${2:?missing OUTDIR}"
BRAND="${3:-Paradise Villa}"
TAGLINE="${4:-Zanzibar}"
MUSIC="${5:-}"

FFMPEG="${FFMPEG:-$(python3 -c 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())' 2>/dev/null || echo ffmpeg)}"
mkdir -p "$OUTDIR" "$OUTDIR/tmp"
TMP="$OUTDIR/tmp"

W=1920; H=1080; FPS=24   # match the Seedance source rate exactly — no frame duplication
BAR=$(python3 -c "print(int(($H - $W/2.39)/2))")   # 2.39:1 letterbox bar height

# ---------------------------------------------------------------------------
# 1. Normalise every clip: same size, fps, pixel format, colour space.
#    Mixed 4K and 1080p sources all land on a common 1080p timeline.
#    Downscaling 4K here supersamples — it looks sharper than native 1080p.
# ---------------------------------------------------------------------------
normalise() {
  local src="$1" dst="$2" grade="$3"
  "$FFMPEG" -y -loglevel error -i "$src" \
    -vf "scale=${W}:${H}:force_original_aspect_ratio=increase:flags=lanczos,\
crop=${W}:${H},fps=${FPS},format=yuv420p,${grade}" \
    -c:v libx264 -preset slow -crf 16 -pix_fmt yuv420p \
    -c:a aac -b:a 192k -ar 48000 -ac 2 \
    "$dst"
}

# Per-clip grade. The teal-and-amber look: warm the highlights, cool the
# shadows, lift the blacks slightly so they read as film rather than video.
GRADE_DAY="colorbalance=rs=.04:gs=.01:bs=-.05:rm=.03:bm=-.02:rh=.05:bh=-.04,\
curves=r='0/0.02 0.5/0.53 1/1':g='0/0.02 0.5/0.5 1/0.99':b='0/0.05 0.5/0.48 1/0.96',\
eq=contrast=1.06:saturation=1.05"

GRADE_NIGHT="colorbalance=rs=-.03:bs=.06:rm=.02:bm=.02:rh=.06:bh=-.02,\
curves=r='0/0.03 0.5/0.52 1/1':g='0/0.03 0.5/0.49 1/0.98':b='0/0.08 0.5/0.5 1/0.97',\
eq=contrast=1.08:saturation=0.98"

echo "==> normalising clips"
normalise "$CLIPDIR/01_banda.mp4"  "$TMP/n01.mp4" "$GRADE_NIGHT"
normalise "$CLIPDIR/02_reveal.mp4" "$TMP/n02.mp4" "$GRADE_DAY"
normalise "$CLIPDIR/03_pool.mp4"   "$TMP/n03.mp4" "$GRADE_DAY"
normalise "$CLIPDIR/04_bed.mp4"    "$TMP/n04.mp4" "$GRADE_DAY"
normalise "$CLIPDIR/05_detail.mp4" "$TMP/n05.mp4" "$GRADE_DAY"
normalise "$CLIPDIR/06_fire.mp4"   "$TMP/n06.mp4" "$GRADE_NIGHT"

# ffmpeg -i with no output file always exits non-zero, so shield it from pipefail.
dur() { { "$FFMPEG" -i "$1" 2>&1 || true; } | awk -F'[:,]' '/Duration/{print ($2*3600)+($3*60)+$4; exit}'; }

D1=$(dur "$TMP/n01.mp4"); D2=$(dur "$TMP/n02.mp4"); D3=$(dur "$TMP/n03.mp4")
D4=$(dur "$TMP/n04.mp4"); D5=$(dur "$TMP/n05.mp4"); D6=$(dur "$TMP/n06.mp4")

# ---------------------------------------------------------------------------
# 2. Cut the six together with cross-dissolves, and cross-fade the audio
#    underneath so the ambience flows instead of hard-cutting.
# ---------------------------------------------------------------------------
X=0.6   # dissolve length in seconds

O1=$(python3 -c "print(round($D1-$X,3))")
O2=$(python3 -c "print(round($D1+$D2-2*$X,3))")
O3=$(python3 -c "print(round($D1+$D2+$D3-3*$X,3))")
O4=$(python3 -c "print(round($D1+$D2+$D3+$D4-4*$X,3))")
O5=$(python3 -c "print(round($D1+$D2+$D3+$D4+$D5-5*$X,3))")

echo "==> cutting with ${X}s dissolves"
"$FFMPEG" -y -loglevel error \
  -i "$TMP/n01.mp4" -i "$TMP/n02.mp4" -i "$TMP/n03.mp4" \
  -i "$TMP/n04.mp4" -i "$TMP/n05.mp4" -i "$TMP/n06.mp4" \
  -filter_complex "\
[0:v][1:v]xfade=transition=fade:duration=$X:offset=$O1[v1];\
[v1][2:v]xfade=transition=fade:duration=$X:offset=$O2[v2];\
[v2][3:v]xfade=transition=fade:duration=$X:offset=$O3[v3];\
[v3][4:v]xfade=transition=fade:duration=$X:offset=$O4[v4];\
[v4][5:v]xfade=transition=fade:duration=$X:offset=$O5[vcut];\
[0:a][1:a]acrossfade=d=$X:c1=tri:c2=tri[a1];\
[a1][2:a]acrossfade=d=$X:c1=tri:c2=tri[a2];\
[a2][3:a]acrossfade=d=$X:c1=tri:c2=tri[a3];\
[a3][4:a]acrossfade=d=$X:c1=tri:c2=tri[a4];\
[a4][5:a]acrossfade=d=$X:c1=tri:c2=tri[acut]" \
  -map "[vcut]" -map "[acut]" \
  -c:v libx264 -preset slow -crf 16 -pix_fmt yuv420p -c:a aac -b:a 192k \
  "$TMP/cut.mp4"

TOTAL=$(dur "$TMP/cut.mp4")

# ---------------------------------------------------------------------------
# 3. VFX + motion graphics, all in one pass:
#      - 2.39:1 anamorphic letterbox
#      - film grain
#      - subtle vignette
#      - opening title, fading up over the first shot and out again
#      - end card: brand + tagline over the final darkness
#      - fade from black at the head, to black at the tail
# ---------------------------------------------------------------------------
SCRIPTDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
python3 "$SCRIPTDIR/make_titles.py" "$TMP" "$BRAND" "$TAGLINE" "$W" "$H"

TITLE_IN=1.2;  TITLE_OUT=4.2
END_IN=$(python3 -c "print(round($TOTAL-4.0,2))")
FADE_OUT=$(python3 -c "print(round($TOTAL-1.5,2))")

echo "==> vfx, titles and end card"
# Titles are PNG overlays faded on their alpha channel: this build of ffmpeg has
# no drawtext, and Pillow gives real letter-spacing and a legibility shadow.
"$FFMPEG" -y -loglevel error \
  -i "$TMP/cut.mp4" \
  -loop 1 -framerate $FPS -t "$TOTAL" -i "$TMP/title_open.png" \
  -loop 1 -framerate $FPS -t "$TOTAL" -i "$TMP/title_end.png" \
  -f lavfi -t "$TOTAL" -i "color=c=black:s=${W}x${H}:r=${FPS}" \
  -filter_complex "\
[0:v]noise=alls=6:allf=t+u,vignette=PI/5,\
drawbox=x=0:y=0:w=iw:h=${BAR}:color=black@1:t=fill,\
drawbox=x=0:y=ih-${BAR}:w=iw:h=${BAR}:color=black@1:t=fill[base];\
[1:v]format=rgba,fade=t=in:st=${TITLE_IN}:d=1:alpha=1,\
fade=t=out:st=${TITLE_OUT}:d=1:alpha=1[topen];\
[3:v]format=rgba,colorchannelmixer=aa=0.55,\
fade=t=in:st=${END_IN}:d=1.2:alpha=1[scrim];\
[2:v]format=rgba,fade=t=in:st=${END_IN}:d=1.2:alpha=1[tend];\
[base][topen]overlay=0:0[o1];\
[o1][scrim]overlay=0:0[o2];\
[o2][tend]overlay=0:0,fade=t=in:st=0:d=1.2,fade=t=out:st=${FADE_OUT}:d=1.5[vout]" \
  -map "[vout]" -map 0:a \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11,afade=t=in:st=0:d=1.2,afade=t=out:st=${FADE_OUT}:d=1.5" \
  -c:v libx264 -preset slow -crf 16 -pix_fmt yuv420p -c:a aac -b:a 192k \
  "$TMP/graded.mp4"

# ---------------------------------------------------------------------------
# 4. Music bed, ducked under the ambience (optional).
# ---------------------------------------------------------------------------
if [ -n "$MUSIC" ] && [ -f "$MUSIC" ]; then
  echo "==> mixing music bed"
  "$FFMPEG" -y -loglevel error -i "$TMP/graded.mp4" -i "$MUSIC" \
    -filter_complex "\
[1:a]aloop=loop=-1:size=2e9,atrim=0:${TOTAL},volume=0.34,\
afade=t=in:st=0:d=2,afade=t=out:st=${FADE_OUT}:d=1.5[mus];\
[0:a][mus]sidechaincompress=threshold=0.05:ratio=6:attack=20:release=400[duck];\
[duck]loudnorm=I=-14:TP=-1.5:LRA=11[aout]" \
    -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k \
    "$OUTDIR/master_1080p.mp4"
else
  cp "$TMP/graded.mp4" "$OUTDIR/master_1080p.mp4"
fi

# ---------------------------------------------------------------------------
# 5. Social deliverables — centre-crop from the master.
# ---------------------------------------------------------------------------
echo "==> vertical and square"
"$FFMPEG" -y -loglevel error -i "$OUTDIR/master_1080p.mp4" \
  -vf "crop=ih*9/16:ih,scale=1080:1920:flags=lanczos" \
  -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a copy \
  "$OUTDIR/vertical_9x16.mp4"

"$FFMPEG" -y -loglevel error -i "$OUTDIR/master_1080p.mp4" \
  -vf "crop=ih:ih,scale=1080:1080:flags=lanczos" \
  -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p -c:a copy \
  "$OUTDIR/square_1x1.mp4"

rm -rf "$TMP"
echo "==> done"
ls -lh "$OUTDIR"
