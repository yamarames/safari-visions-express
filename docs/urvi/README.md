# URVI Storefront — design specification

> **Scope note.** URVI is a separate product from the safari application in this
> repository. These files live here for convenience and share no code with `src/`.
> Nothing under `docs/urvi/` is imported by the app or included in its build.

Design specification and reference implementation for the URVI supplement storefront.

## What's here

| Path | What it is |
|---|---|
| [`design.md`](./design.md) | **Start here.** Full design specification — tokens, type scale, layout grid, every component's anatomy and states, data model, behaviour, accessibility and compliance requirements. |
| [`reference/urvi-pdp.html`](./reference/urvi-pdp.html) | Self-contained, pixel-faithful HTML reproduction of the approved PDP comp, including the animated ribbon-field background. Open it directly in a browser — no build step, no dependencies. |

## Design sources

- **Figma comp** — `figma.com/design/tizF7we68WT8auv9IfvbgS`, frame `URVI Brain Support Chews — PDP`
- **Live reference** — the HTML above, also published as a private artifact

## Before implementation starts

Three items in `design.md` §0 block a production build and need decisions:

1. **Placeholder copy.** The comp's strings are corrupted, not lorem (`3 Moeths`,
   `Onigberry`, `Divepy Targerst Bumds`). Roughly 25 strings need writing — see §9.
   The pouch also misspells its own actives: `L-Tyroône` → **L-Tyrosine**,
   `Coffeine` → **Caffeine**.
2. **No product photography.** All product imagery in both the Figma file and the
   HTML reference is vector reconstruction. Required asset list in §8.2.
3. **`Subscribe to Save` has no control.** Tier 1 advertises subscription pricing
   with no one-time/subscription toggle anywhere in the comp. See §6.3.

## Scale note

The comp is 1242px wide, but it is a **1440px design captured and scaled by 1.159**.
Build at 1440 and convert every comp value through that factor — see `design.md` §1.
A 12px type floor applies, which forces layout changes to the benefit strip and
add-on cards.

## Intended stack

TanStack Start · Tailwind · Radix primitives · shadcn/ui — the same stack this
repository already uses. Component mapping in `design.md` §12.
