import { Link } from "@tanstack/react-router";
import { Play, Star } from "lucide-react";

export type TourCard = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  tag?: string;
};

export function Card3D({ tour }: { tour: TourCard }) {
  return (
    <Link
      to="/tours"
      className="card-tilt group block rounded-2xl p-3 transition-colors relative"
      style={{
        background: "var(--gradient-card)",
        boxShadow: "var(--shadow-card), var(--shadow-frame)",
      }}
    >
      <div className="frame-gold relative aspect-square rounded-xl overflow-hidden mb-4 ring-glow glare">
        <img
          src={tour.image}
          alt={tour.title}
          loading="lazy"
          width={800}
          height={800}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
             style={{ background: "radial-gradient(120% 80% at 30% 0%, oklch(0.84 0.13 85 / 0.18), transparent 60%)" }} />

        {tour.tag && (
          <span
            className="lift absolute top-3 left-3 text-[10px] font-bold uppercase tracking-[0.18em] px-2.5 py-1 rounded-full glass-strong"
            style={{ boxShadow: "var(--shadow-frame)" }}
          >
            <span className="gold-text">{tour.tag}</span>
          </span>
        )}

        <div className="lift absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div className="flex items-center gap-1 text-[11px] font-medium text-text-hero-secondary">
            <Star size={12} className="fill-current" style={{ color: "oklch(0.84 0.13 85)" }} />
            <span>4.9</span>
            <span className="text-text-hero-muted">· 280+ guests</span>
          </div>
          <button
            className="h-12 w-12 rounded-full bg-primary text-primary-foreground grid place-items-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500"
            aria-label="Play preview"
            style={{ boxShadow: "var(--shadow-glow)" }}
          >
            <Play size={18} className="ml-0.5" fill="currentColor" />
          </button>
        </div>
      </div>

      <div className="px-2 pb-2">
        <h3 className="font-display text-lg font-semibold tracking-tight truncate group-hover:gradient-text transition-all">
          {tour.title}
        </h3>
        <p className="text-[13px] text-text-secondary line-clamp-2 mt-1 leading-relaxed">{tour.subtitle}</p>
      </div>
    </Link>
  );
}
