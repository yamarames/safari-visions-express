import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";

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
      className="card-tilt group block bg-surface hover:bg-surface-elevated rounded-xl p-4 transition-colors"
      style={{ boxShadow: "var(--shadow-card)" }}
    >
      <div className="relative aspect-square rounded-lg overflow-hidden mb-4">
        <img
          src={tour.image}
          alt={tour.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        {tour.tag && (
          <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded bg-background/70 backdrop-blur">
            {tour.tag}
          </span>
        )}
        <button
          className="absolute bottom-3 right-3 h-12 w-12 rounded-full bg-primary text-primary-foreground grid place-items-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-2xl"
          aria-label="Play preview"
          style={{ boxShadow: "var(--shadow-glow)" }}
        >
          <Play size={18} className="ml-0.5" fill="currentColor" />
        </button>
      </div>
      <h3 className="font-semibold truncate group-hover:text-primary transition-colors">{tour.title}</h3>
      <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{tour.subtitle}</p>
    </Link>
  );
}
