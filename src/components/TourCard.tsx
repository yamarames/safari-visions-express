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
    <Link
      to="/tours"
      className="group block hover-lift"
    >
      <div className="img-zoom relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
        <img
          src={tour.image}
          alt={tour.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {tour.tag && (
          <span className="absolute top-4 left-4 bg-background/90 backdrop-blur text-foreground text-[10px] font-mono uppercase tracking-[0.18em] px-3 py-1.5 rounded-full">
            {tour.tag}
          </span>
        )}
        {tour.price && (
          <span className="absolute bottom-4 right-4 bg-foreground text-background text-xs font-medium px-3 py-1.5 rounded-full">
            from {tour.price}
          </span>
        )}
      </div>

      <div className="pt-5 flex items-start justify-between gap-4">
        <div className="min-w-0">
          {tour.location && (
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-1.5">
              <MapPin size={12} /> {tour.location}
            </div>
          )}
          <h3 className="font-display text-xl leading-snug group-hover:text-primary transition-colors">
            {tour.title}
          </h3>
          <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 leading-relaxed">
            {tour.subtitle}
          </p>
          {tour.duration && (
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground mt-3">
              {tour.duration}
            </div>
          )}
        </div>
        <ArrowUpRight
          size={20}
          className="shrink-0 text-foreground/60 group-hover:text-primary group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
        />
      </div>
    </Link>
  );
}
