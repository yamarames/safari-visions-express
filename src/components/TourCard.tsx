import { Link } from "@tanstack/react-router";
import { ArrowUpRight, MapPin } from "lucide-react";

export type Tour = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  tag?: string;
  duration?: string;
  price?: string;
  location?: string;
};

export function TourCard({ tour }: { tour: Tour }) {
  return (
    <Link to="/tours" className="group block hover-lift">
      <div className="img-zoom corner-ticks relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
        <img
          src={tour.image}
          alt={tour.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {tour.tag && (
          <span className="absolute top-4 left-4 bg-background/90 backdrop-blur text-foreground text-[10px] font-mono uppercase tracking-[0.18em] px-2.5 py-1 rounded-full">
            {tour.tag}
          </span>
        )}
        {tour.price && (
          <span className="absolute bottom-4 right-4 bg-foreground text-background text-[11px] font-medium px-3 py-1.5 rounded-full tnum">
            from {tour.price}
          </span>
        )}
      </div>

      <div className="pt-5">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.2em] text-text-tertiary mb-2">
          {tour.location ? (
            <span className="flex items-center gap-1.5"><MapPin size={10} /> {tour.location}</span>
          ) : <span />}
          {tour.duration && <span className="tnum">{tour.duration}</span>}
        </div>

        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-[1.35rem] leading-snug group-hover:text-primary transition-colors">
            {tour.title}
          </h3>
          <ArrowUpRight
            size={18}
            className="shrink-0 mt-1.5 text-foreground/40 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
          />
        </div>
        <p className="text-[13px] text-text-secondary mt-2 line-clamp-2 leading-relaxed">
          {tour.subtitle}
        </p>
      </div>
    </Link>
  );
}
