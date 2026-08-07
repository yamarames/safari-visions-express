#!/usr/bin/env bash
# Composite single overlay frames over the bed for eyeballing a look.
#   ./preview_frame.sh <workdir> <outdir> <width> <frame> [frame...]
set -euo pipefail
WORK=${1:?}; OUT=${2:?}; WIDTH=${3:?}; shift 3
mkdir -p "$OUT"
for f in "$@"; do
  n=$(printf '%05d' "$f")
  ffmpeg -v error -y \
    -i "$WORK/bed.mp4" -i "$WORK/spot/f_$n.png" \
    -filter_complex "[0:v]select='eq(n\,$f)',setpts=N/TB[b];[b][1:v]overlay=0:0,scale=$WIDTH:-1:flags=lanczos" \
    -frames:v 1 "$OUT/p_$n.jpg"
done
echo "-> $OUT"
