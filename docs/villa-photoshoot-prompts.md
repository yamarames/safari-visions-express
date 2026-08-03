# Villa photoshoot — cinematic re-shoot prompts

Golden-hour anamorphic Hollywood-commercial treatment for 20 villa photos.
The goal is a **professional re-shoot, not a redesign**: same building, same pool,
same objects — only the camera angle, lens character, lighting and colour grade change.

## Settings

| Setting | Value |
|---|---|
| Model | Seedream 4.5 (4K, `quality: high`) or Nano Banana Pro (4K) |
| Mode | image-to-image / edit, original photo as reference |
| Aspect ratio | keep the source ratio unless noted |
| Variation strength | **low-to-mid, ~0.35–0.45** — higher starts redesigning the villa |
| Runs | two per shot, keep the better one (anamorphic flares vary) |

Seedream 5.0 Lite also works and is the cheapest option at 1 credit/image, but
Seedream 4.5 holds architectural detail better at 4K.

## Paste structure

Every prompt is three blocks: `[LOCK]` + shot prompt + `[STYLE]`.

### `[LOCK]` — start of every prompt

```
Preserve the architecture, materials, layout, proportions, furniture and every
object exactly as in the reference photograph. Do not add, remove, relocate or
redesign anything. Same building, same pool shape, same plants, same objects in
the same positions. Change ONLY the lighting, camera angle, lens character and
colour grade.
```

### `[STYLE]` — end of every prompt

```
Shot on ARRI Alexa 65 with Panavision C-Series anamorphic lenses, 2x squeeze,
T2.8, oval bokeh, horizontal blue lens flare, slight edge barrel distortion.
Golden hour twenty minutes before sunset: warm 3200K sun raking low from camera
left, long soft shadows, deep amber falloff, cool 6500K sky fill in the shadow
side, light volumetric haze and dust in the air. Kodak Vision3 500T grain,
teal-and-amber digital intermediate, rolled-off filmic highlights, lifted
espresso blacks, high dynamic range. Tack-sharp micro-detail in thatch fibre,
wood grain and sand texture. Luxury travel commercial finish, 4K.
```

### `[NEGATIVE]` — if the model exposes a negative field

```
new buildings, extra furniture, added people, changed pool shape, text,
watermark, logo, HDR halos, oversaturation, plastic CGI look, warped straight
lines, distorted architecture, fake painted sunset sky, oversharpening
```

## The 20 shots

Source filenames are the uploaded originals, listed so each prompt pairs with the
right photo.

### 1 — Pool + staircase villa, vertical
`b5a01ea9-b9a6b44175914972a791df66044b846b.jpeg`

Same villa and kidney-shaped pool. Camera lowered to 40cm above the pool coping on
the near side, wide anamorphic 40mm, so the water surface fills the bottom third
and leads the eye to the staircase. Sun low behind the thatched roof creating a rim
of fire along the roof ridge, warm bounce off the white wall.

> Note: the source is a phone screenshot with UI bars top and bottom. Crop those
> away before uploading.

### 2 — Pool + staircase villa, cleaner vertical
`2fb4a40d-cb7ffc72db7c4c9d85b6f49ce82ead3f.jpeg`

Same framing intent as the reference but the camera steps 1.5m left and tilts up
slightly, 32mm anamorphic, palm fronds entering top-left as a soft dark foreground
frame. Sun flaring through the fronds, one long horizontal blue streak across the
upper third.

### 3 — Pool wide with sun lounger
`06035213-667322e138a0435a9d8cc001986bd6fb.jpeg`

Same scene, camera drops to knee height at the pool's south edge, 35mm anamorphic.
Low sun skims the water making the surface a sheet of molten gold with specular
glitter, the lounger and palm rim-lit, the makuti fence glowing amber behind.

### 4 — Villa with flower arch
`18adbf1b-2adb5ce5fd4f47439fcedd448b4c5b86.jpeg`

Same villa, arch and pool. Camera moves in half a metre and drops to 1m, 50mm
anamorphic, shallow focus on the flower arch with the staircase falling gently soft
behind. Sun directly behind the roof ridge, blooming a warm halo over the white wall.

### 5 — Villa front, pergola and terrace
`e8e78117-3e46258d22bf4a4589aa7372859e0f91.jpeg`

Same building and terrace. Camera to 1.2m height, 28mm anamorphic, dead-centre
symmetrical to the pergola columns, palm frond framing right edge. Golden hour sun
from camera-right throwing long column shadows across the polished terrace floor,
the white render glowing peach.

### 6 — Villa at night, lit interior *(blue hour, not golden)*
`fb4e5a95-5c3ec8c52bec4a929c84454b22c9c076.jpeg`

Same villa at deep blue hour instead of night. Camera at 1.2m, 32mm anamorphic,
centred. Interior tungsten light spilling warm onto the terrace, pool glowing
turquoise from below, sky a deep cobalt gradient with the last band of orange at the
horizon. Warm-cool contrast between the lit rooms and the blue exterior.

### 7 — Banda with fairy lights, dusk
`c8264394-37096019e3994ff2bef2d5ad587f65d1.jpeg`

Same banda, daybed and fairy lights. Camera lowered to 60cm and pushed in one metre,
40mm anamorphic. Fairy lights render as soft oval bokeh orbs, the last warm light
rakes across the white sand from camera-left, sky a graded magenta-to-indigo.

### 8 — Swing bed, orange cushions
`03e86140-35f3f7cf419c4785a2de5354e0f65386.jpeg`

Same swing seat, cushions and shell curtain. Camera to seat height, 50mm anamorphic,
three-quarter angle from the left so the ropes lead diagonally out of frame top. Low
sun through the thatch throwing dappled light across the cream cushions, the orange
pillows glowing saturated but not clipped.

### 9 — Bathroom sink, driftwood mirror
`790857c1-6708eafb3cdc4433b8d6076d12c5404e.jpeg`

Same sink, wooden shelf, mirror and amenities — remove the person's reflection in the
mirror, show only the empty room reflected. Camera slightly left of centre at counter
height, 40mm anamorphic. Warm practical light from the right, a shaft of golden window
light hitting the wall behind, replace the flat yellow cast with a clean warm-white
grade so the wall reads as soft cream.

### 10 — Bed with rose-petal heart
`32441f49-7720fe98b1a44e9480d0be4641b995dc.jpeg`

Same bed, headboard, mosquito net, petals and cushions. Camera at foot of bed, lowered
to 90cm, 35mm anamorphic, symmetrical. Golden hour light entering from the left through
an unseen window, dappling across the white sheet, the mosquito net catching the light
as a glowing veil.

### 11 — Bed with "LOVE" petals *(needs the most repair)*
`383d0e8f-f3c24b26140b4b398a49b082b1782cfa.jpeg`

Same bed and petal lettering, restored to full sharpness and correct exposure. Camera
square to the bed at 1m, 40mm anamorphic. Warm evening light from the right, net drapes
catching a soft glow. Remove all motion blur and colour cast; render clean whites in the
linen and true crimson in the petals.

### 12 — Bedroom interior, four-poster
`e0d1be27-85924dd2eec347638db3057e4902c944.jpeg`

Same room, bed, ceiling beams, fan, window and sink. Camera to 1.4m, 24mm anamorphic
from the doorway, verticals kept straight. Late sun pouring through the window casting a
hard warm rectangle across the polished floor, mangrove ceiling poles catching the light,
cool shadow in the corners.

### 13 — Towel ladder and amenities
`3390f22b-162174eb93fb4c9dba8ec97bab46733f.jpeg`

Same ladder, towels and toiletries. Camera moves back half a metre to 1.3m, 50mm
anamorphic, shallow depth so the front towel edge is sharp and the wall falls soft. Warm
side light from the left, replace the yellow cast with a clean warm-white grade so the
white towel is white and the red towel is deep scarlet.

### 14 — Beach fire at night *(night, fire-lit)*
`874528cf-84dc52cfcf5c4835b17312c1c3397437.jpeg`

Same fire pit and burning logs. Camera lowered to sand level, 40mm anamorphic, embers in
the foreground soft. Fire as the sole key light, warm orange falloff into deep blue night,
faint moonlight rim on the sand, drifting smoke catching the glow. Deep blacks with detail
retained, no crushed shadows.

### 15 — Two chairs, stool, bougainvillea
`dafc82fb-e7d159eb922f4338b8e6f818ccc19a81.jpeg`

Same chairs, stool, bottle, bowl and flowers. Camera to seat height, 40mm anamorphic,
slight three-quarter from the left so the pool reads over the right shoulder of the frame.
Last golden light across the terrace floor turning it deep ochre, long chair shadows,
bougainvillea backlit and glowing translucent pink.

### 16 — Shell-curtain banda on grass
`2f93b950-555635c7ca8e4da5b06f26dd78639443.jpeg`

Same hut, shell curtains, deck and planters. Camera drops to 80cm, 35mm anamorphic,
three-quarter from the left. Low sun behind camera-right raking the thatch texture into
strong relief, shell strings catching light as thousands of small warm specular points,
grass glowing lime-gold.

### 17 — Shell hut with round gazebo
`bf766647-44e45355f70c4f5ab1fc817593232cfd.jpeg`

Same hut, gazebo, garden and planters. Camera to 1.2m, 28mm anamorphic, red croton leaves
held as a soft dark foreground frame on the left. Low golden sun from camera-left, the
gazebo's conical thatch rim-lit, long shadow reaching toward the lens across the grass.

### 18 — Sand courtyard with daybed and palm
`9ccc4375-81c5cd0a2744419f88e7aaf3aa00ad13.jpeg`

Same courtyard, palm, daybed and thatched shelter. Camera to 1m, 32mm anamorphic. Low sun
from camera-right throwing the palm's shadow in a long graphic diagonal across the raked
sand, shell strings glowing, the sand warm ivory rather than grey.

### 19 — Sunset with outrigger canoe
`c21a957f-9e29b87483cb4d809863cf2614604b7e.jpeg`

Same ngalawa canoe, garden, palm and makuti fence. Camera to 70cm, 40mm anamorphic, sun
kept just above the fence line for a controlled flare. Strong backlight rimming the canoe
hull and every blade of grass, foliage in rich silhouette, one long horizontal blue
anamorphic streak across the sun. Restore natural colour — no oversaturated HDR look.

### 20 — Rooftop view over the garden
`0442be17-714979910f3648408f581d7a7a1a9ac3.jpeg`

Same rooftop vantage, makuti eave, palms, daybed and view. Camera holds the eave as a dark
top frame, 24mm anamorphic, horizon level. Golden hour instead of midday: warm light
flooding the palm canopy from camera-left, long shadows across the sand courtyard, sky
graded to a soft warm gradient with the flat blue removed.

## Duplicates in the upload set

Four pairs are byte-identical — process only one of each:

| Keep | Skip |
|---|---|
| `18adbf1b-2adb5ce5…` | `ede7eacb-2adb5ce5…` |
| `bf766647-44e45355…` | `cb65dfd8-44e45355…` |
| `c21a957f-9e29b874…` | `f4bf13d2-9e29b874…` |
| `0442be17-71497991…` | `e7468dac-71497991…` |

## Video

`df8d8fe2-0977323311a440459a4edb2ec895b283.mov` is not an image job. Feed it to
Seedance 2.0 as a `video_reference` so the ad inherits its real camera move, rather than
inventing one.

## Ad shot order

Once the stills are re-shot, this is the sequence for a 30s spot — six 5s Seedance 2.0
clips, each using the restyled still as `start_image`:

1. Banda with fairy lights (dusk) — slow push-in
2. Villa front + white sand — low drone rise
3. Pool, daylight wide — glide across the water
4. Four-poster bed / petals — soft dolly through the net
5. Driftwood sink or towel ladder — macro detail
6. Beach fire at night — pull back to embers, fade to logo

Seedance 2.0 at 4K / `mode: std` / 5s costs 110 credits per clip — roughly 660 credits
for the six.
