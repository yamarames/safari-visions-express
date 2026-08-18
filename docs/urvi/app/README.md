# URVI storefront — React app

Working PDP built to `../design.md`. Vite + React 19 + TypeScript + Tailwind v4 + shadcn/ui.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # tsc -b && vite build
```

Verified: `tsc -b` passes with `strict` and `noUnusedLocals`. Price math checked end to end —
tier 3 x qty 3 + a $29 add-on = $718.70, with add-ons priced one-per-order (`design.md` §6.3).

Self-contained, no backend. Cart state lives in `src/store/cart.tsx`.
