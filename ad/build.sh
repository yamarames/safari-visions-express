#!/usr/bin/env bash
# Build the bilo commercial end to end.
#
#   ./build.sh [workdir]
#
# Requires ffmpeg, python3 and node with playwright + chromium available.
# Source footage is located via $BILO_FOOTAGE (see timeline.py).
set -euo pipefail

cd "$(dirname "$0")"
WORK=${1:-/tmp/bilo_build}
mkdir -p "$WORK"

echo "==> timeline"
python3 timeline.py overlay/timeline.json

echo "==> fonts"
[ -f overlay/fonts.css ] || python3 overlay/fetch_fonts.py

echo "==> video bed"
python3 build_video.py "$WORK"

echo "==> motion graphics"
node overlay/render_frames.mjs "$WORK/mg"

echo "==> audio"
python3 build_audio.py "$WORK"

echo "==> master"
python3 build_master.py "$WORK"
