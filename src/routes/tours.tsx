import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { TourCard } from "@/components/TourCard";
import { allTours, islandEscapes } from "@/data/tours";
import beach from "@/assets/zanzibar-beach.jpg";

export const Route = createFileRoute("/tours")({
  head: () => ({
    meta: [
      { title: "Zanzibar Tours — Zanzafari" },
      { name: "description", content: "Beach escapes, spice farms, Stone Town walks and reef snorkeling — every Zanzibar experience we run." },
      { property: "og:title", content: "Zanzibar Tours — Zanzafari" },
      { property: "og:description", content: "Beach escapes, spice farms, reef snorkeling and Stone Town walks." },
      { property: "og:image", content: beach },
    ],
  }),
  component: Tours,
});

function Tours() {
  return (
    <SiteShell>
      <section className="relative h-[60vh] min-h-[420px] flex items-end overflow-hidden">
        <img src={beach} alt="Zanzibar beach" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/30" />
        <div className="relative container-pro pb-16 pt-28 text-text-hero">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-hero-muted mb-5">Zanzibar Archipelago</div>
          <h1 className="font-display text-5xl md:text-7xl max-w-3xl leading-[1.05]">Slow days, turquoise water, real Swahili food.</h1>
        </div>
      </section>

      <section className="container-pro py-20 md:py-28">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow mb-3">Island highlights</div>
          <h2 className="font-display text-4xl md:text-5xl">Most-loved island experiences.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {islandEscapes.map((t) => <TourCard key={t.slug} tour={t} />)}
        </div>
      </section>

      <div className="hairline container-pro" />

      <section className="container-pro py-20 md:py-28">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow mb-3">Full catalogue</div>
          <h2 className="font-display text-4xl md:text-5xl">{allTours.length} curated experiences.</h2>
          <p className="mt-4 text-text-secondary">Mix and match into a single multi-region itinerary — we handle every connection.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {allTours.map((t) => <TourCard key={t.slug} tour={t} />)}
        </div>
      </section>
    </SiteShell>
  );
}
