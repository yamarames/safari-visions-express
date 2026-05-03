import { Card3D, type TourCard } from "./Card3D";
import { ChevronRight } from "lucide-react";

export function ContentRow({ title, subtitle, items }: { title: string; subtitle?: string; items: TourCard[] }) {
  return (
    <section className="px-6 mt-10">
      <div className="flex items-end justify-between mb-5">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
        </div>
        <button className="text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground flex items-center gap-1 transition">
          Show all <ChevronRight size={14} />
        </button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((t) => <Card3D key={t.slug} tour={t} />)}
      </div>
    </section>
  );
}
