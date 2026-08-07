# bilo — "The Home Collection" (30s vertical commercial)

One brand film cut from the three supplied bilo product clips, built as code so
the edit can be retimed and re-rendered rather than re-hand-assembled.

**Output:** `out/bilo_home_collection_30s_1080x1920.mp4`
— 1080×1920, 30 fps, 30.000s, H.264 high, AAC 192k, −14 LUFS / −1.2 dBTP.

## The cut

| Time | Beat | |
|---|---|---|
| 0.00–0.80 | Hook | six-frame strobe of pure texture, RGB-split word slams — *Soft. Warm. Home.* |
| 0.80–3.30 | Brand open | hero push-in, `bilo®` wordmark builds, marquee bar rises |
| 3.30–9.10 | **01 LIVING** | woven throws → macro embroidery — *"Bring culture to your space."* |
| 9.10–15.00 | **02 SLEEP** | bedroom → flat lay → macro sateen — *"Premium cotton & sateen."* |
| 15.00–21.00 | **03 BATH** | towel stack + colourway swatches → macro waffle — *"Towels you can trust."* |
| 21.00–22.87 | Montage | eight rapid-fire cuts, one word per cut, glitch bars |
| 22.87–25.60 | Split screen | all three products at once, light sweep |
| 25.60–30.00 | End card | letter-by-letter lockup, tagline, CTA |

Transitions: whip-blur → pixelize → iris → flash → bloom.

## How it's built

Four stages, one entry point:

```sh
./build.sh [workdir]          # default workdir: /tmp/bilo_build
```

| File | Does |
|---|---|
| `timeline.py` | **Source of truth.** Shots, in/out points, moves, grades, transitions. |
| `build_video.py` | Shots → Ken Burns segments → blocks → xfade chain → `bed.mp4` |
| `overlay/overlay.html` | The motion graphics: one `renderAt(t)` that is a pure function of time |
| `overlay/render_frames.mjs` | Steps that page frame by frame in headless Chromium → transparent PNG sequence |
| `build_audio.py` | Score + sound design, synthesised entirely in ffmpeg |
| `build_master.py` | Composites, finishes and encodes the deliverable |

`timeline.py` feeds both the picture edit and `overlay/timeline.json`, so the
graphics animate against shot *names* and cannot drift out of sync with the
cuts. `check_windows()` fails the build if retiming ever makes a shot read past
its scene boundary.

Useful while iterating — composite single frames without a full render:

```sh
node overlay/render_frames.mjs /tmp/bilo_build/spot --frames=75,260,640,870
./preview_frame.sh /tmp/bilo_build /tmp/out 420 75 260 640 870
```

## Notes on the source footage

- Each supplied clip is really four sub-shots (hero / flat lay / macro / bilo's
  own end card) at ~2.5s each. The nine body shots are used; the three baked-in
  end cards are not, since this film builds its own lockup.
- The clips carry a generative-AI watermark in the bottom-right corner. Rather
  than erase it, the lower band of the frame is occupied for the whole body of
  the film by the scrolling marquee bar, which sits over it by design.
- The clips' own audio is faint generated room tone, so the track is scored from
  scratch: an Am–F–C–G pad under a soft pulse, with hits, whooshes, a riser and
  a shimmer placed on the exact cut points.

## Copy

All on-screen copy is either bilo's own line from the supplied end cards
("Bring Culture to Your Space", "Premium Cotton & Sateen", "Towels You Can
Trust") or plainly visible in the footage ("5 Colourways", "4 Colourways",
"Waffle Weave", "Patterned Throws"). No specs, materials or claims were
invented. **"The Home Collection"** and the **"Shop the Collection"** CTA are
written for this film — swap them in `overlay/overlay.html` (`#openKick`,
`#ecCta`) if the real collection is named differently. The CTA carries no URL
because none was supplied.

Fonts are Fraunces, Inter and Outfit (all SIL Open Font License), inlined into
`overlay/fonts.css` by `overlay/fetch_fonts.py` so the render needs no network.
