# URVI — Design Specification

Source of truth for building the URVI storefront. Derived from the approved product-detail-page comp.

**Reference artefacts**
| Artefact | Location |
|---|---|
| Figma comp | `figma.com/design/tizF7we68WT8auv9IfvbgS` — frame `URVI Brain Support Chews — PDP` |
| Live HTML reference | Published artifact (ribbon-field background, exact comp geometry) |
| Comp dimensions | 1242 × 848 (see *Scale derivation* below) |

---

## 0. Read this first — three things block "full working website"

These are not nitpicks; each one stops a real build.

**1. The comp's copy is placeholder gibberish.** Not lorem — corrupted strings: `3 Moeths`, `0 Ruistna`, `Onigberry`, `Cleoo`, `Noanrartaco`, `Divepy Targerst Bumds`, `Improve Focs & Comy™`, `Support Feerth Wards`. Every visible string except the headline, the price format, `FREE SHIPPING ON ALL ORDERS OVER $50`, and the trust row needs writing before launch. Section 9 lists every slot.

**2. There is no product photography.** The pouch, the chews, the gallery thumbnails and the add-on products in both the Figma file and the HTML are vector/CSS reconstructions I built to match the comp. They read well at comp scale and are fine for review, but a live storefront needs real shots. Section 8.2 lists the required asset set.

**3. Supplement retail carries legal obligations the comp doesn't show.** No FDA disclaimer, no supplement-facts panel, no allergen statement, no subscription terms of cancellation. The comp's `*` and `™` marks imply footnotes that don't exist yet. Section 10.3.

---

## 1. Scale derivation — read before using any pixel value

The comp is **1242px wide**, and its type runs small: body copy at 14.5px, card labels at 8.5px, benefit sub-lines at 6.5px. Those are not deliberate design decisions — 6.5px is unreadable and no designer specifies it. The comp is a **1440px design captured and scaled to 1242**, a factor of **1.159**.

**Build the site at 1440 and multiply every comp value by 1.159.** Doing so turns the odd numbers into an ordinary, sane scale:

| Role | Comp px | ×1.159 | **Production** |
|---|---|---|---|
| Pouch wordmark | 83.2 | 96.4 | 96 |
| Page H1 | 38.7 | 44.9 | 45 |
| Header wordmark | 30 | 34.8 | 35 |
| Lede / subtitle | 14.5 | 16.8 | 17 |
| Button label | 14 | 16.2 | 16 |
| Section heading | 13.5 | 15.6 | 16 |
| Price (supply) | 15 | 17.4 | 17 |
| Nav link | 12.5 | 14.5 | 14 |
| Card title | 12.5 | 14.5 | 14 |
| Add-on price | 11.5 | 13.3 | 13 |
| Benefit pill | 10.5 | 12.2 | 12 |
| Trust label | 9 | 10.4 | 12 ← floor |
| Card meta | 8.5 | 9.9 | 12 ← floor |
| Benefit sub-line | 6.5 | 7.5 | 12 ← floor |

**Hard floor: 12px.** Anything the comp puts below ~10px must come up to 12. This changes the layout — the benefit strip and add-on cards will need more room. Treat that as a required deviation from the comp, not a bug.

Every value in the rest of this document is quoted **at comp scale** with the production value where they differ.

---

## 2. Color

### 2.1 Ground
| Token | Hex | Use |
|---|---|---|
| `--ground-deep` | `#02070F` | Canvas base, darkest corner |
| `--ground` | `#040F21` | Canvas mid |
| `--ground-lift` | `#071A33` | Canvas top-left lift |
| `--wash-top` | `#0A1E38` | Page gradient stop 0 |
| `--wash-mid` | `#071527` | Page gradient stop 50% |
| `--wash-btm` | `#040C18` | Page gradient stop 100% |
| `--letterbox` | `#000000` | Frame band above the announcement bar |

The page ground is three stacked layers, bottom to top: animated canvas field → wash gradient at 32% → right-side vignette. See §7.

### 2.2 Brand & interactive
| Token | Hex | Use |
|---|---|---|
| `--brand` | `#2D7FF0` | Primary CTA, selected borders, badges, checks, cart dot |
| `--brand-bar` | `#1F6FE0` | Announcement bar only — deliberately deeper than `--brand` |
| `--brand-ring` | `#4E9BF5` | Selected gallery thumbnail border |
| `--surface` | `#111C2E` | Card / stepper background |
| `--surface-sel` | `#0D2646` | Selected card background |
| `--border` | `#2A3547` | Card border, 1px |
| `--border-thumb` | `#26324A` | Gallery thumbnail border |
| `--rule` | `#22314A` | Horizontal dividers, 90% opacity |
| `--sep` | `#31425C` | Trust-bar vertical separators |

### 2.3 Text
| Token | Hex | Use |
|---|---|---|
| `--fg` | `#FFFFFF` | H1, card titles, prices, button label |
| `--fg-nav` | `#E2E9F3` | Nav links |
| `--fg-strong` | `#E8EEF7` | Benefit strip titles |
| `--fg-2` | `#C3D0E2` | Benefit pills, flavor labels |
| `--fg-3` | `#C4D0E0` | Trust labels |
| `--fg-4` | `#A9B8CE` | Page subtitle |
| `--fg-muted` | `#8FA3BE` | Card meta, servings, notes |
| `--fg-faint` | `#8497B0` | Benefit sub-lines |

### 2.4 Product accents
| Token | Value | Use |
|---|---|---|
| `--chew` | `#F7A2AB → #E4707D → #B23B49` (135°) | Chew coral — the single warm accent |
| `--pouch` | `#6293E4 0% → #3866C6 42% → #1D3C8A 100%` (90°) | Pouch face |
| `--flavor-berry` | `#F49AA3 → #C74C5A` | Original Berry |
| `--flavor-lavender` | `#DAD5E8 → #A9A2C4` | Flavor 2 |
| `--flavor-amber` | `#F8D57C → #E0A32F` | Flavor 3 |
| `--flavor-red` | `#EE8272 → #C13F31` | Flavor 4 |

Coral is the only warm hue in the system and appears **only** on product (chews, berry swatch). Never use it for UI state — that role belongs to `--brand`.

### 2.5 Semantic — **not in the comp, must be added**
The comp has no error, success, warning, or disabled color. A working storefront needs all four (failed payment, out of stock, sold-out variant, applied discount). Derive them at the same saturation as `--brand` so they sit in the same world:

| Token | Suggested | Use |
|---|---|---|
| `--success` | `#2FA96B` | Order confirmed, in stock |
| `--warning` | `#D8A032` | Low stock, expiring cart |
| `--danger` | `#E0554E` | Payment failure, validation |
| `--disabled-fg` | `#5A6A83` | Unavailable variant (matches checkbox stroke) |

Verify each against `--surface` before adopting.

---

## 3. Typography

**Display — Archivo Narrow, Bold (700).** Wordmark, page H1, pouch face. The comp's headline is materially condensed; Inter at the measured cap-height is ~30% too wide. Archivo Narrow is the closest widely-available match. If URVI has a licensed brand face, substitute it — the requirement is *condensed grotesque, heavy weight*.

**UI — Inter.** Weights 300, 400, 500, 600, 700 plus Light Italic (300i, used only for `Brain Support` on the pouch).

```
--font-display: 'Archivo Narrow', 'Arial Narrow', sans-serif;
--font-ui: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
```

| Role | Family | Weight | Size (prod) | Tracking | Case |
|---|---|---|---|---|---|
| Page H1 | Display | 700 | 45 | −0.3 | Sentence |
| Header wordmark | Display | 700 | 35 | −0.5 | Upper |
| Section heading | UI | 600 | 16 | 0 | Sentence, numbered |
| Lede | UI | 400 | 17 | 0 | Sentence |
| Nav link | UI | 500 | 14 | 0 | Sentence |
| Card title | UI | 600 | 14 | 0 | Sentence |
| Price | UI | 700 | 17 | 0 | — |
| Button label | UI | 600 | 16 | 0 | Sentence |
| Meta / caption | UI | 400 | 12 | 0 | Sentence |
| Announcement | UI | 700 | 12 | +0.7 | UPPER |
| Badge | UI | 600 | 12 | 0 | Sentence |

Line-height 1.21 throughout except multi-line card titles (1.35). All prices and quantities use `font-variant-numeric: tabular-nums` — non-negotiable, prices change on selection and must not reflow.

---

## 4. Layout

### 4.1 Grid
| | Comp | Production (1440) |
|---|---|---|
| Frame width | 1242 | 1440 |
| Outer margin | 70 | 81 |
| Content width | 1102 | 1278 |
| Left column (gallery) | 558 | 647 |
| Gutter | 39 | 45 |
| Right column (purchase) | 422 | 489 |

Two columns, asymmetric. Gallery leads; the purchase panel is the narrower, denser column. Do not centre them — the imbalance is intentional and gives the pouch room.

### 4.2 Vertical rhythm (comp-scale offsets from page top)
```
  0    letterbox band (black)
 88    announcement bar          h 25
113    page body starts
113 ── header                    h 54
187 ── gallery + purchase panel begin
645    rule
658    benefit strip             4 columns
727    rule
743    trust bar                 3 items
```

### 4.3 Breakpoints — **not in the comp, must be designed**
The comp is desktop-only. Required:

| Name | Range | Behaviour |
|---|---|---|
| `sm` | < 640 | Single column. Gallery becomes a swipeable carousel with dot pagination; thumbnail rail moves below the stage, horizontal. Purchase panel stacks under. CTA becomes a sticky bottom bar. |
| `md` | 640–1023 | Single column, wider gallery. Supply cards 3-up hold; flavor 4-up → 2×2; add-ons 3-up → horizontal scroll. |
| `lg` | ≥ 1024 | Two columns as comped. |

The sticky mobile CTA is the important one — on a PDP it is the primary conversion surface and must never scroll away.

---

## 5. Components

Notation: **A** anatomy · **S** states · **P** props.

### 5.1 AnnouncementBar
**A** Full-bleed `--brand-bar`, h 25 (prod 29), centred label, 700/12/+0.7 upper.
**P** `message`, `href?`, `dismissible?`
**Note** Comped as static. If it becomes a rotating carousel, respect `prefers-reduced-motion` and pause on hover/focus.

### 5.2 SiteHeader
**A** h 54 (prod 63), transparent over the page ground. Wordmark + `®` left at x 88. Nav centred-left starting x 443, 5 links, gap 30. Account and cart icons right at x 1072 / 1117; cart carries a 7px `--brand` dot at its top-right.
**S** link `default | hover` (→ `--fg` + 2px underline offset 4) `| focus-visible` (2px `--brand` outline, offset 3) `| active-route` (full-opacity + persistent underline).
**Note** The cart dot in the comp is a plain dot with no count. For a working cart, show a numeral once count > 0 and expose `aria-label="Cart, 3 items"`.

### 5.3 ProductGallery
**A** Thumbnail rail — 6 tiles, 70×66 (prod 81×76), radius 8, vertical, gap 9. Stage 450×480 to its right.
**S** thumbnail `default` (1px `--border-thumb`) `| selected` (2px `--brand-ring`) `| hover` (border → `#3A4A66`) `| focus-visible` (2px `--brand` outline, offset 2).
**P** `images[]`, `activeIndex`, `onSelect`
**Behaviour** Selecting a thumbnail swaps the stage image. Arrow keys move between thumbnails; the rail is a `role="tablist"`, tiles are `role="tab"`, stage is `role="tabpanel"`. Support swipe on touch.

### 5.4 BenefitStrip
**A** 4 columns at x 9 / 154 / 287 / 424 (comp-local). Each: 22px outlined circular icon + 8px/700 title + two 6.5px sub-lines.
**Production change** Sub-lines to 12px forces a taller strip and probably 2 columns × 2 rows below `lg`. Redesign rather than shrink.

### 5.5 TrustBar
**A** 3 items at x 0 / 232 / 426, 17px icon + 9px label, 1px `--sep` dividers at x 192 / 386.
**Content is real and reusable:** *30-Day Money Back Guarantee* · *Secure Checkout* · *Direct Support*.

### 5.6 SupplySelector — the primary conversion control
**A** 3 cards, 132×98 (prod 153×114), radius 10, gap 13. Each: title 12.5/600 · servings 8.5 muted · price 15/700 · note 8.5 muted. Selected card gains a 16px `--brand` check disc at top-right.
**S** `default` (`--surface` + 1px `--border`) `| selected` (`--surface-sel` + 2px `--brand` + check) `| hover` (border → `#3A4A66`) `| focus-visible` `| disabled` (40% opacity, `--disabled-fg`, not selectable).
**P** `tiers[]`, `selectedId`, `onChange`
**Semantics** `role="radiogroup"` with `aria-label="Choose your supply"`; cards are `role="radio"`. Arrow keys cycle. **Changing selection must update the CTA price and announce via `aria-live="polite"`.**
**Badge** Tier 3 carries a `Save 18%` pill, 54×14, radius 7, `--brand`, centred on the card's top edge (straddling it, y −8 relative to the card).

### 5.7 FlavorSelector
**A** 4 cards, 99×70 (prod 115×81), radius 10, gap 8.5. Swatch 46×34 radius 11 centred at top; label centred below.
**S** as SupplySelector but selection marker is a 9px `--brand` dot at top-right, not a check.
**Semantics** Second `role="radiogroup"`, `aria-label="Choose your flavor"`. **Swatch color alone must not convey the flavor** — the text label is required, and each swatch needs `aria-hidden="true"` with the name in the label.
**Note** Flavor may gate availability: some flavors won't exist in all supply tiers. Model that (§6.2) — the comp doesn't show it.

### 5.8 AddOnSelector
**A** 3 cards, 134×100 (prod 155×116), radius 10, gap 10. Title (wraps to 2 lines, width 74) · sub · price 11.5/700 · note · 11px checkbox top-right at x 112 · product art 48×58 at x 80.
**S** `unchecked` (1.2px `--disabled-fg` box) `| checked` (`--brand` fill + white tick, card border → `--brand`) `| hover | focus-visible | out-of-stock`.
**Semantics** Real checkboxes, not radios — multiple add-ons combine. Each toggle adds its price to the order total.

### 5.9 AddToCartButton
**A** 313×38 (prod 363×44), radius 8, `--brand`, cart glyph + label, gap 9, shadow `0 4px 12px rgba(23,92,191,.35)`.
**Label is dynamic:** `Add to Cart - $49.00` reflects supply tier × quantity + checked add-ons.
**S** `default | hover` (`#4A8FF5`, shadow lifts) `| active` (`#2470DB`, shadow collapses) `| focus-visible` `| loading` (spinner, label → `Adding…`, disabled) `| disabled` (`--disabled-fg` on `--surface`) `| success` (transient `Added ✓`, ~1.5s, then revert).
**Behaviour** Adds the configured line to cart, increments the header cart dot, opens the cart drawer.

### 5.10 QuantityStepper
**A** 100×38 (prod 116×44), radius 8, `--surface` + 1px `--border`. `−` at cx 21 · value at cx 50 · `+` at cx 79.
**S** buttons `default | hover | focus-visible | disabled` (at min 1 / max 10).
**Semantics** Two `<button>`s around an `<input type="number">` (visually plain). Value changes must recompute the CTA price and announce politely. Never let the field go below 1 or accept non-numerics.

### 5.11 SectionHeading
Numbered `1.` `2.` `3.` — and the numbering is **real sequence**, a configuration flow the shopper walks in order. Keep it. (Note the comp has a double space in `3.  And More to Your Flavor` — reproduce or fix, your call, but be deliberate.)

---

## 6. Behaviour & data

### 6.1 PDP state
```ts
type PdpState = {
  supplyTierId: string;   // default: first tier
  flavorId:     string;   // default: first available flavor
  addOnIds:     string[]; // default: []
  quantity:     number;   // default 1, clamp 1..10
  galleryIndex: number;   // default 0
}
```

### 6.2 Content model
```ts
type Product = {
  id: string; slug: string; name: string; lede: string;
  claims: Claim[];          // the three icon+text benefit pills
  supplyTiers: SupplyTier[];
  flavors: Flavor[];
  addOns: AddOn[];
  gallery: MediaAsset[];
  benefits: BenefitCard[];  // the 4-up strip
  supplementFacts: FactsPanel;   // REQUIRED, absent from comp
  disclaimers: string[];         // REQUIRED, absent from comp
}

type SupplyTier = {
  id: string; label: string;        // "1 Pouch"
  pouches: number; servings: number;
  priceOnce: Money; priceSubscription?: Money;
  savingsPct?: number;              // drives the "Save 18%" badge
  badge?: string;
  availableFlavorIds: string[];     // gating, see 5.7
}

type Flavor = { id: string; name: string; swatch: [string,string]; inStock: boolean }
type AddOn  = { id: string; name: string; sub?: string; price: Money; art: MediaAsset; inStock: boolean }
```

### 6.3 Price computation
```
lineTotal = (tier.price × quantity) + Σ(checked addOn.price)
```
Displayed on the CTA. **Decide and specify:** do add-ons multiply with quantity, or are they one-per-order? The comp is silent. Recommend one-per-order — an add-on is a companion product, not a per-unit modifier.

`Subscribe to Save` on tier 1 implies a purchase-type toggle (one-time vs subscription) that **does not exist in the comp**. Either add the control or drop the label; shipping a price that says "subscribe" with no way to subscribe is a broken flow.

### 6.4 Motion
| Interaction | Duration | Easing |
|---|---|---|
| Card border/background on select | 140ms | `ease-out` |
| Button hover | 120ms | `ease-out` |
| Button press | 80ms | `ease-in` |
| Gallery image swap | 220ms | `cubic-bezier(.4,0,.2,1)` |
| Cart drawer | 280ms | `cubic-bezier(.32,.72,0,1)` |
| Background field | continuous | see §7 |

Every one of these must collapse to 0ms under `prefers-reduced-motion: reduce`.

---

## 7. Background system

Three stacked layers inside the page body. This is the site's signature and should carry across all pages.

**Layer 1 — animated ribbon field (canvas).** Five woven ribbons, each a band between two sine curves running at different frequencies in *opposite* directions, which is what produces the weave rather than parallel stripes. Band thickness oscillates along its length. The lead ribbon carries a 16-row staggered halftone dot mesh. Crest lines are stroked in three passes (10px @5%, 4.5px @10%, 1.35px @80%) to fake a bloom without `shadowBlur`. Three highlight points travel the lead crest; three bokeh discs drift behind. Composite `lighter` throughout.

**Layer 2 — wash gradient**, 32% opacity, `--wash-top → --wash-mid → --wash-btm`.

**Layer 3 — right vignette**, `rgba(3,9,15,0) → .30 @46% → .66 @100%`.

**The falloff is a requirement, not a preference.** Ribbon intensity holds at 100% to x=620, then decays quadratically to 10% by x=1160. Bright moving crests behind 12px type destroy legibility. Any page that puts dense text on the right must keep this falloff; a page that is mostly imagery may lift it.

Performance: cap DPR at 1.5, throttle to 30fps, `cancelAnimationFrame` on `visibilitychange`, single static frame under reduced-motion.

---

## 8. Assets

### 8.1 Iconography
Outlined, 1.3–1.9px stroke, 24px viewBox, `--fg-*` stroke, round caps and joins. Sizes in use: 14 (pills), 16 (CTA, check), 17 (trust), 21–22 (header, benefits). Feather/Lucide matches the drawing style — adopt one set rather than mixing.

### 8.2 Photography — **to be produced**
| Asset | Notes |
|---|---|
| Pouch hero | 3/4 angle, ~1° tilt, on dark ground, rim light from left. Currently vector. |
| Chews, loose | Coral, soft-square, ~0.86 aspect, subtle gloss. 5 scattered + 1 macro. |
| Gallery 2–6 | Chew cluster · single macro · blueberries · cream pour · botanicals |
| Add-on products | 3 shots, consistent lighting, on the same dark ground |
| Supplement facts | Flat, legible, zoomable |

Deliver at 2× minimum, AVIF/WebP with JPEG fallback, all with real `alt` text.

---

## 9. Copy slots to be written

| Slot | Comp placeholder | Status |
|---|---|---|
| H1 | URVI Brain Support Chews | ✅ keep |
| Lede | Daily focus, clarity, and mental energy. | ✅ keep |
| Announcement | FREE SHIPPING ON ALL ORDERS OVER $50 | ✅ keep |
| Trust ×3 | 30-Day… / Secure Checkout / Direct Support | ✅ keep |
| Claim pills ×3 | `Improve Focs & Comy™`, `Enhance Mental Clarity*`, `Boost Daily Energy` | ⚠️ 1–2 garbled; footnote marks unresolved |
| Supply tiers ×3 | `1 Pouch`, `3 Moeths`, `0 Ruistna` | ❌ rewrite (`1 Pouch` / `3 Months` / `6 Months`?) |
| Flavors ×4 | `Original Berry`, `Onigberry`, `Cleoo`, `Noanrartaco` | ❌ rewrite |
| Add-ons ×3 | `Divepy Targerst Bumds`, `Deers Serry`, `Ginlg Goamste` | ❌ rewrite |
| Benefit strip ×4 | all garbled, title + 2 sub-lines each | ❌ rewrite (12 strings) |
| Pouch face | `L-Tyroône`, `Coffeine` | ❌ correct to `L-Tyrosine`, `Caffeine` |

---

## 10. Non-negotiables

### 10.1 Accessibility
- **12px minimum** on all text (§1).
- Verify every foreground/background pair at **4.5:1** for body, 3:1 for ≥18.66px bold. `--fg-muted` and `--fg-faint` on `--surface` are the ones at risk — measure before shipping, don't assume.
- Selection state must never be conveyed by color alone. Supply cards have the check disc; flavor cards currently have only a dot plus border — **add a visible selected label or checkmark**.
- Full keyboard path: nav → gallery tabs → supply radios → flavor radios → add-on checkboxes → quantity → CTA.
- `focus-visible` on every interactive element, 2px `--brand`, offset 2–3px. The comp shows none; it must exist.
- Price changes announced `aria-live="polite"`.
- Canvas is `aria-hidden="true"` — it is decoration.

### 10.2 Performance budget
LCP < 2.5s · CLS < 0.1 · INP < 200ms. The pouch hero is the LCP element: preload it, dimension it explicitly. Canvas must never block first paint.

### 10.3 Compliance — supplement retail
- FDA disclaimer (*"These statements have not been evaluated…"*) wherever a structure/function claim appears — that includes the three claim pills.
- Supplement Facts panel reachable from the PDP.
- Allergen and caffeine-content statements (the formula contains caffeine).
- Subscription terms: billing cadence, cancellation, first-charge timing — required before any "Subscribe to Save" control ships.
- Resolve the `™` on `Improve Focs & Comy™` and `®` on the wordmark and `Brain Support®` — only use them for marks actually held.

---

## 11. Site map beyond this page

The comp covers one screen. A working storefront needs:

**Commerce** — Home · Shop (PLP) · **PDP (comped)** · Cart drawer + page · Checkout (address → shipping → payment → review) · Order confirmation
**Content** — Ingredients · Scores/Science · About · Reviews (list, filter, submit)
**Account** — Sign in / register · Orders · **Subscription management** · Addresses · Payment methods
**Support & legal** — FAQ · Contact · Shipping & returns · Privacy · Terms · Supplement disclaimers
**System** — 404 · 500 · empty cart · out of stock · search results

Nav in the comp exposes Shop · Scores · Ingredients · About · Reviews, so those five are committed. Note **Scores** is undefined — it is not standard commerce vocabulary. Define what it means before building it.

---

## 12. Build notes

Stack already available in the working repo: TanStack Start, Tailwind, Radix primitives, shadcn/ui.

| Component | Base |
|---|---|
| SupplySelector, FlavorSelector | `radio-group` |
| AddOnSelector | `checkbox` |
| Cart drawer | `sheet` |
| Save badge | `badge` |
| Dividers | `separator` |
| CTA | `button` |
| Reviews accordion | `accordion` |

Map §2 tokens to CSS custom properties in the Tailwind theme; never hard-code hex in components. Build the background field as one `<AmbientField />` mounted at layout level, not per page — it should persist across route changes rather than restart.

**Caveat on this document:** §§2–7 are precise, taken from the built artefacts rather than measured off the image. §§1, 4.3, 6.3 and 10 contain my recommendations where the comp is silent — they are marked as such and are open to your direction. §§0 and 9 are blockers requiring your input before implementation starts.
