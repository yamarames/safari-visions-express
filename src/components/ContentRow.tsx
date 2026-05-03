import { Card3D, type TourCard } from "./Card3D";
import { ChevronRight } from "lucide-react";

export function ContentRow({ title, subtitle, items }: { title: string; subtitle?: string; items: TourCard[] }) {
  return (
    <section className="px-6 md:px-8 mt-14 animate-fade-up">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground mt-1.5 font-medium">{subtitle}</p>}
        </div>
        <button className="text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground hover:gold-text flex items-center gap-1 transition group">
          Show all <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {items.map((t) => <Card3D key={t.slug} tour={t} />)}
      </div>
    </section>
  );
}
