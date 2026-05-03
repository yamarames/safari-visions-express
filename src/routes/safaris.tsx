import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ContentRow } from "@/components/ContentRow";
import { featuredSafaris, editorial } from "@/data/tours";
import lion from "@/assets/safari-lion.jpg";

export const Route = createFileRoute("/safaris")({
  head: () => ({
    meta: [
      { title: "Tanzania Safaris — Zanzafari" },
      { name: "description", content: "Big Five safaris in Serengeti, Ngorongoro, Tarangire and beyond." },
    ],
  }),
  component: Safaris,
});

function Safaris() {
  return (
    <AppShell>
      <div className="relative h-[50vh] -mt-[72px] overflow-hidden">
        <img src={lion} alt="Lion" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-background/30" />
        <div className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Wild Tanzania</span>
          <h1 className="text-5xl md:text-7xl font-display font-black mt-2">Roar with the Big Five</h1>
        </div>
      </div>
      <ContentRow title="Signature Safaris" items={featuredSafaris} />
      <ContentRow title="Themed Journeys" items={editorial} />
      <div className="h-20" />
    </AppShell>
  );
}
