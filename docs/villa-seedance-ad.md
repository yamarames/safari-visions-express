# Villa commercial — Seedance 2.0 production pack

A 30-second cinematic ad, built as six Seedance 2.0 clips cut together.
Each clip starts from one of the **restyled stills** produced by
`villa-photoshoot-prompts.md` — never from the raw phone photo. The still carries
the golden-hour anamorphic look; Seedance only has to add motion.

## Order of work

1. Re-shoot the stills (Seedream 4.5 / Nano Banana Pro) — see the photoshoot doc.
2. Upload the restyled stills to Higgsfield.
3. Run the six clips below, each with its still as `start_image`.
4. Cut together in any editor, add music, add the end card.

Do not skip step 1. Seedance will faithfully animate whatever it is given, so a
flat midday phone snap produces a flat midday commercial.

## Global settings — identical for every clip

| Parameter | Value | Why |
|---|---|---|
| `model` | `seedance_2_0` | Not Mini — Mini caps at 720p |
| `resolution` | `4k` | Requires `mode: std` |
| `mode` | `std` | `fast` only supports 480p/720p |
| `bitrate_mode` | `high` | Less compression mush in the water and thatch |
| `aspect_ratio` | `16:9` | See the vertical section for Reels/TikTok |
| `generate_audio` | `true` | Ambience only — see the audio note |
| `medias` | restyled still as role `start_image` | This is what holds the villa's identity |

`duration` and `genre` vary per clip and are listed with each one.

**Cost: 110 credits per 5s 4K clip.** Six clips ≈ **660 credits**, before retries.
Budget ~900 to allow one re-run on two or three shots.

## The video LOCK line

Every clip prompt below already opens with this. It is the video equivalent of the
still `[LOCK]` — it stops Seedance reinventing the building mid-move:

```
The start frame is a real location. Hold its architecture, materials, layout and
every object exactly as they appear — nothing morphs, warps, grows or changes
shape. Only the camera moves, plus natural ambient motion.
```

## Audio note — read before running

`generate_audio: true` gives native sound, but Seedance will invent **speech** if a
prompt hints at people. Every prompt below names ambient sound only. Do not add
"a couple laughing", "a voice says", or similar unless you want invented dialogue
in a language you did not choose.

If you would rather score the whole thing in the edit, set `generate_audio: false`
on all six — it is also cheaper.

## The six clips

### Clip 1 — Opening: banda at dusk (5s, `genre: drama`)

Start image: restyled **shot 7** (banda with fairy lights).

```
The start frame is a real location. Hold its architecture, materials, layout and
every object exactly as they appear — nothing morphs, warps, grows or changes
shape. Only the camera moves, plus natural ambient motion. Slow steady push-in
toward the thatched banda, dolly on rails, the fairy lights drifting into soft
oval bokeh as the camera closes. Warm string lights flicker gently, palm fronds
sway in a light evening breeze, fine sand catches the last light. Anamorphic
lens, shallow depth of field, cinematic golden-dusk grade. Ambient sound: distant
ocean, soft wind in palm leaves, night insects.
```

### Clip 2 — The reveal: villa front (5s, `genre: epic`)

Start image: restyled **shot 5** (villa front, pergola and terrace).

```
The start frame is a real location. Hold its architecture, materials, layout and
every object exactly as they appear — nothing morphs, warps, grows or changes
shape. Only the camera moves, plus natural ambient motion. Smooth aerial rise,
camera lifts slowly from sand level revealing the full villa and its makuti
thatched roof against open sky, drone-style vertical crane move, horizon staying
level. Palm fronds sway across the frame edge, curtains breathe softly in the
doorway. Anamorphic lens, golden hour, long shadows across white sand. Ambient
sound: ocean waves, wind, palm leaves rustling.
```

### Clip 3 — The pool (5s, `genre: epic`)

Start image: restyled **shot 3** (pool wide with sun lounger).

```
The start frame is a real location. Hold its architecture, materials, layout and
every object exactly as they appear — nothing morphs, warps, grows or changes
shape. Only the camera moves, plus natural ambient motion. Low gliding tracking
shot skimming just above the pool surface, moving left to right parallel to the
water, the villa drifting through the background. Sunlight refracts and dances on
the water, gentle ripples cross the surface, light caustics play on the dark pool
render. Anamorphic lens, low golden sun, specular glitter on the water. Ambient
sound: water lapping, distant ocean, light breeze.
```

### Clip 4 — Interior intimacy (5s, `genre: drama`)

Start image: restyled **shot 10** (bed with rose-petal heart).

```
The start frame is a real location. Hold its architecture, materials, layout and
every object exactly as they appear — nothing morphs, warps, grows or changes
shape. Only the camera moves, plus natural ambient motion. Slow forward dolly
through the parted mosquito net toward the bed, the net drifting softly past the
lens on both sides. Sheer white fabric breathes in a light draught, warm window
light shifts gently across the linen. Anamorphic lens, shallow focus, warm
interior grade. Ambient sound: soft breeze, distant surf, quiet room tone.
```

### Clip 5 — Detail (4s, `genre: drama`)

Start image: restyled **shot 13** (towel ladder and amenities).

```
The start frame is a real location. Hold its architecture, materials, layout and
every object exactly as they appear — nothing morphs, warps, grows or changes
shape. Only the camera moves, plus natural ambient motion. Very slow macro push-in
across the folded towels and amenity bottles, extremely shallow depth of field,
focus drifting gently from the front towel edge to the bottles behind. Warm lamp
light, dust motes floating in the beam. Anamorphic lens, intimate close-up,
luxury hotel commercial texture. Ambient sound: quiet room tone only.
```

### Clip 6 — Closer: the fire (6s, `genre: drama`)

Start image: restyled **shot 14** (beach fire at night).

```
The start frame is a real location. Hold its architecture, materials, layout and
every object exactly as they appear — nothing morphs, warps, grows or changes
shape. Only the camera moves, plus natural ambient motion. Slow pull-back from the
burning fire, camera retreating low over the sand, the fire shrinking into the
frame as darkness opens around it. Flames flicker and dance, embers lift and drift
upward, smoke curls through the firelight. Anamorphic lens, fire as the only key
light, deep blue night beyond. Ambient sound: crackling fire, ocean waves, night
breeze.
```

## The end card — do not ask Seedance for it

Video models render text badly. Make the logo card as a **still** and cut it in:

- Model: `gpt_image_2` or `nano_banana_pro` (both strong at typography), 4K, 16:9.
- Prompt: a dark, slightly out-of-focus plate of the villa at night with the brand
  name centred in clean light serif type, generous margins, small line beneath for
  the website or booking line.
- Hold it 3 seconds at the end, cross-dissolving out of clip 6's embers.

## Using the .mov you uploaded

`df8d8fe2-0977323311a440459a4edb2ec895b283.mov` is your own real footage of the
property. Two uses, both better than ignoring it:

1. **As a Seedance `video_reference`** — the generated clip inherits its real
   camera move rather than an invented one. Pass it with role `video_references`
   alongside a `start_image`.
2. **Straight in the edit** — real footage cut between generated clips sells the
   whole thing as genuine. If it looks flat next to the graded clips, run it
   through `upscale_video` first.

## Vertical version for Reels / TikTok

Do **not** re-run all six clips at `9:16` — that doubles the credit spend and the
compositions change. Instead run the `reframe` tool on the finished 16:9 clips; it
is a fraction of the cost and keeps the subject centred.

## Assembly

| # | Clip | Duration | Running total |
|---|---|---|---|
| 1 | Banda at dusk | 5s | 0:05 |
| 2 | Villa reveal | 5s | 0:10 |
| 3 | Pool glide | 5s | 0:15 |
| 4 | Bed dolly | 5s | 0:20 |
| 5 | Detail macro | 4s | 0:24 |
| 6 | Fire pull-back | 6s | 0:30 |
| — | End card (still) | 3s | 0:33 |

Cut on the beat of whatever track you pick. Clips 2 and 3 are the money shots —
if you trim for a 15s version, keep those two plus the fire.

## Two optional extra clips

If you want 40 seconds, these slot in after clip 3:

**Swing bed** (4s, `genre: drama`) — start image: restyled shot 8.

```
The start frame is a real location. Hold its architecture, materials, layout and
every object exactly as they appear — nothing morphs, warps, grows or changes
shape. Only the camera moves, plus natural ambient motion. Slow lateral tracking
shot past the hanging swing seat, the swing rocking almost imperceptibly on its
ropes, shell curtains stirring in the breeze, dappled light moving across the
cushions. Anamorphic lens, warm late sun. Ambient sound: breeze, shells clicking
softly, distant ocean.
```

**Outrigger canoe at sunset** (5s, `genre: epic`) — start image: restyled shot 19.

```
The start frame is a real location. Hold its architecture, materials, layout and
every object exactly as they appear — nothing morphs, warps, grows or changes
shape. Only the camera moves, plus natural ambient motion. Slow lateral parallax
move past the traditional wooden outrigger canoe, foreground foliage sliding
through frame, the low sun flaring between the fence posts behind. Grass and
leaves stir in the evening breeze. Anamorphic lens, strong backlight, silhouette
foliage. Ambient sound: evening breeze, distant surf, birds settling.
```

## If a clip comes back wrong

| Problem | Fix |
|---|---|
| Building warps or melts mid-move | Shorten `duration` to 4s; simplify to a single camera move |
| Invented people or voices | Remove any human noun from the prompt; set `generate_audio: false` |
| Camera move too fast | Add "extremely slow, almost imperceptible" before the move |
| Look drifts from the still | Your `start_image` is doing the work — re-check you passed the restyled version, not the original |
| Result is soft at 4K | Confirm `mode: std` and `bitrate_mode: high` |
