import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { TourCard } from "@/components/TourCard";
import { featuredSafaris, editorial } from "@/data/tours";
import lion from "@/assets/safari-lion.jpg";

export const Route = createFileRoute("/safaris")({
  head: () => ({
    meta: [
      { title: "Tanzania Safaris — Zanzafari" },
      { name: "description", content: "Big Five safaris across the Serengeti, Ngorongoro, Tarangire and Nyerere — designed by local guides." },
      { property: "og:title", content: "Tanzania Safaris — Zanzafari" },
      { property: "og:description", content: "Big Five safaris designed by local guides." },
      { property: "og:image", content: lion },
    ],
  }),
  component: Safaris,
});

function Safaris() {
  return (
    <SiteShell>
      <section className="relative h-[70vh] min-h-[480px] flex items-end overflow-hidden">
        <img src={lion} alt="Lion in Serengeti" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/30" />
        <div className="relative container-pro pb-16 pt-28 text-text-hero">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-text-hero-muted mb-5">Tanzania · Northern & Southern Circuits</div>
          <h1 className="font-display text-5xl md:text-7xl max-w-3xl leading-[1.05]">Safaris built around the wildlife — not the schedule.</h1>
        </div>
      </section>

      <section className="container-pro py-20 md:py-28">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow mb-3">Signature safaris</div>
          <h2 className="font-display text-4xl md:text-5xl">Hand-picked itineraries.</h2>
          <p className="mt-4 text-text-secondary">Each route is fully customizable — durations, lodges and pace adjusted to your group.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {featuredSafaris.map((t) => <TourCard key={t.slug} tour={t} />)}
        </div>
      </section>

      <div className="hairline container-pro" />

      <section className="container-pro py-20 md:py-28">
        <div className="max-w-2xl mb-14">
          <div className="eyebrow mb-3">Themed journeys</div>
          <h2 className="font-display text-4xl md:text-5xl">Pick the experience, we'll build the rest.</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
          {editorial.map((t) => <TourCard key={t.slug} tour={t} />)}
        </div>
      </section>
    </SiteShell>
  );
}
