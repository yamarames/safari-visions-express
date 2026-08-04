#!/usr/bin/env bash
# Villa commercial v2 — the energetic cut.
#
# Differences from v1: twelve segments instead of six (each clip is cut twice),
# eleven varied transitions instead of one repeated dissolve, speed ramps, a
# chromatic-aberration edge, and four kinetic-typography beats through the body
# of the film rather than a single card at the end.
#
# Usage: ./build-ad-v2.sh CLIPDIR OUTDIR [BRAND] [TAGLINE] [MUSIC.mp3]

set -euo pipefail

CLIPDIR="${1:?usage: build-ad-v2.sh CLIPDIR OUTDIR [BRAND] [TAGLINE] [MUSIC]}"
OUTDIR="${2:?missing OUTDIR}"
BRAND="${3:-Paradise Villa}"
TAGLINE="${4:-Zanzibar}"
MUSIC="${5:-}"

FFMPEG="${FFMPEG:-$(python3 -c 'import imageio_ffmpeg;print(imageio_ffmpeg.get_ffmpeg_exe())' 2>/dev/null || echo ffmpeg)}"
SCRIPTDIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
mkdir -p "$OUTDIR" "$OUTDIR/tmp"
TMP="$OUTDIR/tmp"

W=1920; H=1080; FPS=24
BAR=$(python3 -c "print(int(($H - $W/2.39)/2))")
X=0.35                     # transition length — short, so cuts stay punchy
SEG=2.40                   # source seconds taken per segment

GRADE_DAY="colorbalance=rs=.05:gs=.01:bs=-.06:rm=.03:bm=-.02:rh=.06:bh=-.05,\
curves=r='0/0.02 0.5/0.54 1/1':g='0/0.02 0.5/0.5 1/0.99':b='0/0.05 0.5/0.47 1/0.95',\
eq=contrast=1.10:saturation=1.10"

GRADE_NIGHT="colorbalance=rs=-.03:bs=.07:rm=.02:bm=.02:rh=.07:bh=-.02,\
curves=r='0/0.03 0.5/0.53 1/1':g='0/0.03 0.5/0.49 1/0.98':b='0/0.09 0.5/0.5 1/0.97',\
eq=contrast=1.12:saturation=1.02"

# segment: source clip | in-point | grade | speed (PTS multiplier: <1 faster)
#   Alternating pace — the wides breathe, the details snap.
SEGS=(
  "01_banda:0.10:NIGHT:1.00"
  "02_reveal:0.10:DAY:0.90"
  "03_pool:0.10:DAY:1.00"
  "04_bed:0.10:DAY:0.92"
  "05_detail:0.15:DAY:0.85"
  "06_fire:0.10:NIGHT:1.00"
  "01_banda:2.55:NIGHT:0.90"
  "02_reveal:2.55:DAY:1.00"
  "03_pool:2.55:DAY:1.15"
  "04_bed:2.55:DAY:0.90"
  "05_detail:2.55:DAY:0.85"
  "06_fire:2.55:NIGHT:1.00"
)

TRANS=(zoomin slideleft squeezeh circleopen hrwind fadewhite coverup revealright zoomin wipeleft fadewhite)

echo "==> cutting ${#SEGS[@]} segments"
i=0
for s in "${SEGS[@]}"; do
  IFS=':' read -r clip inpoint gradename speed <<< "$s"
  [ "$gradename" = "DAY" ] && G="$GRADE_DAY" || G="$GRADE_NIGHT"
  # rgbashift adds a whisper of chromatic aberration at the frame edges, the
  # thing that separates a graded picture from a "filter".
  "$FFMPEG" -y -loglevel error -ss "$inpoint" -t "$SEG" -i "$CLIPDIR/$clip.mp4" \
    -an -vf "scale=${W}:${H}:force_original_aspect_ratio=increase:flags=lanczos,\
crop=${W}:${H},fps=${FPS},format=yuv420p,${G},rgbashift=rh=-1:bh=1,\
setpts=${speed}*PTS" \
    -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p \
    "$TMP/s$(printf %02d $i).mp4"
  i=$((i+1))
done

# Segment durations are deterministic: source length times the speed factor.
DURS=(); TOTAL=0
for s in "${SEGS[@]}"; do
  IFS=':' read -r _ _ _ speed <<< "$s"
  d=$(python3 -c "print(round($SEG*$speed,3))")
  DURS+=("$d")
done
N=${#DURS[@]}
TOTAL=$(python3 -c "
d=[${DURS[*]}]
print(round(sum(d)-(len(d)-1)*$X,3))" 2>/dev/null || true)
TOTAL=$(python3 - <<PY
d=[$(IFS=,; echo "${DURS[*]}")]
print(round(sum(d)-(len(d)-1)*$X,3))
PY
)
echo "==> timeline ${TOTAL}s across ${N} segments"

# Build the xfade chain: each offset is the running length minus accumulated
# transition overlap.
CHAIN=""; INPUTS=""
for ((k=0;k<N;k++)); do INPUTS+=" -i $TMP/s$(printf %02d $k).mp4"; done
prev="[0:v]"
run=0
for ((k=1;k<N;k++)); do
  run=$(python3 - <<PY
d=[$(IFS=,; echo "${DURS[*]}")]
print(round(sum(d[:$k])-$k*$X,3))
PY
)
  t=${TRANS[$((k-1))]}
  out="[v$k]"
  [ $k -eq $((N-1)) ] && out="[vcut]"
  CHAIN+="${prev}[${k}:v]xfade=transition=${t}:duration=${X}:offset=${run}${out};"
  prev="$out"
done
CHAIN="${CHAIN%;}"

echo "==> assembling picture"
"$FFMPEG" -y -loglevel error $INPUTS -filter_complex "$CHAIN" -map "[vcut]" \
  -c:v libx264 -preset medium -crf 16 -pix_fmt yuv420p "$TMP/cut.mp4"

# ---------------------------------------------------------------------------
# Ambience bed, built from the untouched clip audio and decoupled from the
# picture. The cut is faster than the source now, and ocean/fire/wind has no
# sync to break — so a continuous bed sounds better than chopped-up fragments.
# ---------------------------------------------------------------------------
echo "==> ambience bed"
"$FFMPEG" -y -loglevel error \
  -i "$CLIPDIR/01_banda.mp4" -i "$CLIPDIR/02_reveal.mp4" -i "$CLIPDIR/03_pool.mp4" \
  -i "$CLIPDIR/04_bed.mp4"   -i "$CLIPDIR/05_detail.mp4" -i "$CLIPDIR/06_fire.mp4" \
  -filter_complex "\
[0:a]aformat=sample_rates=48000:channel_layouts=stereo[a0];\
[1:a]aformat=sample_rates=48000:channel_layouts=stereo[a1];\
[2:a]aformat=sample_rates=48000:channel_layouts=stereo[a2];\
[3:a]aformat=sample_rates=48000:channel_layouts=stereo[a3];\
[4:a]aformat=sample_rates=48000:channel_layouts=stereo[a4];\
[5:a]aformat=sample_rates=48000:channel_layouts=stereo[a5];\
[a0][a1]acrossfade=d=1:c1=tri:c2=tri[x1];\
[x1][a2]acrossfade=d=1:c1=tri:c2=tri[x2];\
[x2][a3]acrossfade=d=1:c1=tri:c2=tri[x3];\
[x3][a4]acrossfade=d=1:c1=tri:c2=tri[x4];\
[x4][a5]acrossfade=d=1:c1=tri:c2=tri,atrim=0:${TOTAL},asetpts=PTS-STARTPTS[aout]" \
  -map "[aout]" -c:a aac -b:a 192k "$TMP/amb.m4a"

# ---------------------------------------------------------------------------
# Kinetic typography + finishing.
# ---------------------------------------------------------------------------
echo "==> kinetic typography"
python3 "$SCRIPTDIR/make_kinetic.py" "$TMP/kin" "$FPS" "$W" "$H" >/dev/null

# Each line lands on the shot it describes — the pool line over the pool, not
# over the bed. Segment starts: banda 0.00 | reveal 2.05 | pool 3.86 |
# bed 5.91 | detail 7.77 | fire 9.46 | banda 11.51 | reveal 13.32 | pool 15.37
# | bed 17.78 | detail 19.59 | fire 21.28
B1=0.70                                             # brand, over the opening banda
B2=4.10                                             # "a pool of your own", over the pool
B4=7.90                                             # "barefoot luxury", over the towel macro
B3=13.50                                            # "steps from the ocean", over the villa exterior
B5=$(python3 -c "print(round($TOTAL-3.4,2))")       # end card, over the last detail and fire
FADE_OUT=$(python3 -c "print(round($TOTAL-1.4,2))")

echo "==> finishing"
"$FFMPEG" -y -loglevel error \
  -i "$TMP/cut.mp4" -i "$TMP/amb.m4a" \
  -framerate $FPS -i "$TMP/kin/b1_open/f%04d.png" \
  -framerate $FPS -i "$TMP/kin/b2_pool/f%04d.png" \
  -framerate $FPS -i "$TMP/kin/b3_ocean/f%04d.png" \
  -framerate $FPS -i "$TMP/kin/b4_bare/f%04d.png" \
  -framerate $FPS -i "$TMP/kin/b5_end/f%04d.png" \
  -f lavfi -t "$TOTAL" -i "color=c=black:s=${W}x${H}:r=${FPS}" \
  -filter_complex "\
[0:v]noise=alls=5:allf=t+u,vignette=PI/5,\
drawbox=x=0:y=0:w=iw:h=${BAR}:color=black@1:t=fill,\
drawbox=x=0:y=ih-${BAR}:w=iw:h=${BAR}:color=black@1:t=fill[base];\
[7:v]format=rgba,colorchannelmixer=aa=0.5,fade=t=in:st=${B5}:d=1:alpha=1[scrim];\
[2:v]format=rgba,setpts=PTS-STARTPTS+${B1}/TB[k1];\
[3:v]format=rgba,setpts=PTS-STARTPTS+${B2}/TB[k2];\
[4:v]format=rgba,setpts=PTS-STARTPTS+${B3}/TB[k3];\
[5:v]format=rgba,setpts=PTS-STARTPTS+${B4}/TB[k4];\
[6:v]format=rgba,setpts=PTS-STARTPTS+${B5}/TB[k5];\
[base][k1]overlay=0:0:eof_action=pass[o1];\
[o1][k2]overlay=0:0:eof_action=pass[o2];\
[o2][k3]overlay=0:0:eof_action=pass[o3];\
[o3][k4]overlay=0:0:eof_action=pass[o4];\
[o4][scrim]overlay=0:0[o5];\
[o5][k5]overlay=0:0:eof_action=pass,\
fade=t=in:st=0:d=0.8,fade=t=out:st=${FADE_OUT}:d=1.4[vout];\
[1:a]loudnorm=I=-14:TP=-1.5:LRA=11,afade=t=in:st=0:d=0.8,\
afade=t=out:st=${FADE_OUT}:d=1.4[aout]" \
  -map "[vout]" -map "[aout]" -shortest \
  -c:v libx264 -preset slow -crf 17 -pix_fmt yuv420p -c:a aac -b:a 192k \
  "$TMP/graded.mp4"

if [ -n "$MUSIC" ] && [ -f "$MUSIC" ]; then
  echo "==> music bed"
  "$FFMPEG" -y -loglevel error -i "$TMP/graded.mp4" -i "$MUSIC" \
    -filter_complex "\
[1:a]aloop=loop=-1:size=2e9,atrim=0:${TOTAL},volume=0.38,\
afade=t=in:st=0:d=1.5,afade=t=out:st=${FADE_OUT}:d=1.4[mus];\
[0:a][mus]sidechaincompress=threshold=0.06:ratio=5:attack=20:release=350[duck];\
[duck]loudnorm=I=-14:TP=-1.5:LRA=11[aout]" \
    -map 0:v -map "[aout]" -c:v copy -c:a aac -b:a 192k "$OUTDIR/master_1080p.mp4"
else
  cp "$TMP/graded.mp4" "$OUTDIR/master_1080p.mp4"
fi

echo "==> social crops"
"$FFMPEG" -y -loglevel error -i "$OUTDIR/master_1080p.mp4" \
  -vf "crop=ih*9/16:ih,scale=1080:1920:flags=lanczos" \
  -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -c:a copy \
  "$OUTDIR/vertical_9x16.mp4"

"$FFMPEG" -y -loglevel error -i "$OUTDIR/master_1080p.mp4" \
  -vf "crop=ih:ih,scale=1080:1080:flags=lanczos" \
  -c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -c:a copy \
  "$OUTDIR/square_1x1.mp4"

rm -rf "$TMP"
echo "==> done"
ls -lh "$OUTDIR"
