import * as React from "react";

const W = 1242;
const H = 735;
const TAU = Math.PI * 2;

type Ribbon = {
  cy: number; a1: number; k1: number; w1: number;
  a2: number; k2: number; w2: number; ph: number;
  th: number; tk: number; tw: number;
  top: string; bot: string; al: number; mesh: boolean; crest: number;
};

const RIBBONS: Ribbon[] = [
  { cy: 300, a1: 96,  k1: 0.0052, w1: 0.00042, a2: 34, k2: 0.0113, w2: 0.00071, ph: 0.0, th: 150, tk: 0.0043, tw: 0.00033, top: "150,215,255", bot: "30,90,190", al: 0.16, mesh: true,  crest: 0.95 },
  { cy: 250, a1: 78,  k1: 0.0061, w1: 0.00055, a2: 26, k2: 0.0139, w2: 0.00048, ph: 1.9, th: 90,  tk: 0.0051, tw: 0.00041, top: "120,195,255", bot: "24,72,165", al: 0.13, mesh: false, crest: 0.85 },
  { cy: 395, a1: 112, k1: 0.0044, w1: 0.00036, a2: 40, k2: 0.0097, w2: 0.00062, ph: 3.4, th: 120, tk: 0.0038, tw: 0.00029, top: "96,175,245",  bot: "18,58,140", al: 0.12, mesh: false, crest: 0.70 },
  { cy: 200, a1: 64,  k1: 0.0072, w1: 0.00049, a2: 22, k2: 0.0158, w2: 0.00080, ph: 5.1, th: 60,  tk: 0.0064, tw: 0.00052, top: "140,205,255", bot: "26,80,175", al: 0.09, mesh: false, crest: 0.55 },
  { cy: 470, a1: 88,  k1: 0.0057, w1: 0.00031, a2: 30, k2: 0.0121, w2: 0.00044, ph: 2.4, th: 80,  tk: 0.0046, tw: 0.00037, top: "80,160,235",  bot: "14,46,120", al: 0.10, mesh: false, crest: 0.45 },
];

const BOKEH = [
  { x: 1090, y: 330, r: 52, a: 0.07,  fx: 0.00011, fy: 0.00017, ax: 26, ay: 20 },
  { x: 760,  y: 250, r: 30, a: 0.055, fx: 0.00016, fy: 0.00012, ax: 22, ay: 26 },
  { x: 300,  y: 560, r: 66, a: 0.045, fx: 0.00009, fy: 0.00014, ax: 30, ay: 18 },
];

/** Ribbons hold full strength over the product, then decay so the purchase
 *  panel keeps a calm ground for small type (design.md §7). */
function fade(x: number): number {
  if (x < 620) return 1;
  if (x > 1160) return 0.1;
  const u = (x - 620) / 540;
  return 1 - 0.9 * u * u;
}

const waveY = (r: Ribbon, x: number, t: number) =>
  r.cy + r.a1 * Math.sin(x * r.k1 + t * r.w1 + r.ph) + r.a2 * Math.sin(x * r.k2 - t * r.w2 + r.ph * 1.7);

const band = (r: Ribbon, x: number, t: number) =>
  r.th * (0.4 + 0.6 * Math.abs(Math.sin(x * r.tk + t * r.tw + r.ph)));

const STEP = 6;

export function AmbientField() {
  const ref = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const cv = ref.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(1.5, window.devicePixelRatio || 1);
    cv.width = Math.round(W * dpr);
    cv.height = Math.round(H * dpr);
    ctx.scale(dpr, dpr);

    const draw = (t: number) => {
      ctx.globalCompositeOperation = "source-over";
      const g = ctx.createLinearGradient(0, 0, W * 0.55, H);
      g.addColorStop(0, "#071A33");
      g.addColorStop(0.5, "#040F21");
      g.addColorStop(1, "#02070F");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      ctx.globalCompositeOperation = "lighter";

      BOKEH.forEach((b, i) => {
        const bx = b.x + Math.sin(t * b.fx + i) * b.ax;
        const by = b.y + Math.cos(t * b.fy + i) * b.ay;
        const bf = b.a * fade(bx);
        const bg = ctx.createRadialGradient(bx, by, 0, bx, by, b.r);
        bg.addColorStop(0, `rgba(120,185,255,${bf.toFixed(3)})`);
        bg.addColorStop(0.7, `rgba(90,150,230,${(bf * 0.5).toFixed(3)})`);
        bg.addColorStop(1, "rgba(90,150,230,0)");
        ctx.fillStyle = bg;
        ctx.beginPath();
        ctx.arc(bx, by, b.r, 0, TAU);
        ctx.fill();
      });

      for (let ri = RIBBONS.length - 1; ri >= 0; ri--) {
        const r = RIBBONS[ri];

        ctx.beginPath();
        for (let x = 0; x <= W; x += STEP) {
          const y = waveY(r, x, t);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        for (let x = W; x >= 0; x -= STEP) ctx.lineTo(x, waveY(r, x, t) + band(r, x, t));
        ctx.closePath();
        const lg = ctx.createLinearGradient(0, r.cy - r.a1 - 40, 0, r.cy + r.a1 + r.th + 40);
        lg.addColorStop(0, `rgba(${r.top},${r.al.toFixed(3)})`);
        lg.addColorStop(1, `rgba(${r.bot},0)`);
        ctx.fillStyle = lg;
        ctx.fill();

        if (r.mesh) {
          const ROWS = 16;
          for (let mx = 0; mx <= W; mx += 5) {
            const f = fade(mx);
            if (f < 0.04) continue;
            const y0 = waveY(r, mx, t);
            const h = band(r, mx, t);
            for (let q = 0; q < ROWS; q++) {
              const v = q / (ROWS - 1);
              const a = 0.3 * Math.pow(1 - v, 1.5) * f;
              if (a < 0.012) continue;
              ctx.fillStyle = `rgba(130,200,255,${a.toFixed(3)})`;
              ctx.fillRect(mx + (q & 1 ? 2.5 : 0), y0 + v * h, 1.15, 1.15);
            }
          }
        }

        // three passes fake a bloom far more cheaply than shadowBlur
        const passes: [number, number][] = [[10, 0.05], [4.5, 0.1], [1.35, 0.8]];
        for (const [lw, alpha] of passes) {
          ctx.lineWidth = lw;
          ctx.strokeStyle = `rgba(175,225,255,${(alpha * r.crest).toFixed(3)})`;
          ctx.beginPath();
          let started = false;
          for (let cx = 0; cx <= W; cx += STEP) {
            if (fade(cx) < 0.06) { started = false; continue; }
            const cyv = waveY(r, cx, t);
            if (!started) { ctx.moveTo(cx, cyv); started = true; }
            else ctx.lineTo(cx, cyv);
          }
          ctx.stroke();
        }
      }

      const lead = RIBBONS[0];
      for (let s = 0; s < 3; s++) {
        const hx = ((t * 0.028 + s * 430) % (W + 240)) - 120;
        if (hx < -20 || hx > W + 20) continue;
        const hy = waveY(lead, hx, t);
        const hf = fade(hx);
        const hg = ctx.createRadialGradient(hx, hy, 0, hx, hy, 26);
        hg.addColorStop(0, `rgba(225,245,255,${(0.55 * hf).toFixed(3)})`);
        hg.addColorStop(0.35, `rgba(140,205,255,${(0.18 * hf).toFixed(3)})`);
        hg.addColorStop(1, "rgba(140,205,255,0)");
        ctx.fillStyle = hg;
        ctx.beginPath();
        ctx.arc(hx, hy, 26, 0, TAU);
        ctx.fill();
        ctx.fillStyle = `rgba(255,255,255,${(0.85 * hf).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(hx, hy, 1.7, 0, TAU);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
    };

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      draw(0);
      return;
    }

    let raf = 0;
    let last = 0;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 33) return; // ~30fps
      last = now;
      draw(now);
    };
    raf = requestAnimationFrame(loop);

    const onVisibility = () => {
      if (document.hidden) cancelAnimationFrame(raf);
      else { last = 0; raf = requestAnimationFrame(loop); }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="absolute left-0 top-0 block" style={{ width: W, height: H }} />;
}
