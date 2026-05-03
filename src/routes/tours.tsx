import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ContentRow } from "@/components/ContentRow";
import { allTours, islandEscapes } from "@/data/tours";

export const Route = createFileRoute("/tours")({
  head: () => ({
    meta: [
      { title: "All Tours — Zanzafari" },
      { name: "description", content: "Browse every Zanzibar tour and Tanzania safari we offer." },
    ],
  }),
  component: Tours,
});

function Tours() {
  return (
    <AppShell>
      <div className="px-6 md:px-12 pt-14 pb-6" style={{ background: "var(--gradient-jungle)" }}>
        <span className="text-xs font-bold uppercase tracking-widest opacity-80">Collection</span>
        <h1 className="text-5xl md:text-7xl font-display font-black mt-2 mb-4">All Tours</h1>
        <p className="max-w-2xl opacity-90">{allTours.length} curated experiences across Tanzania and Zanzibar — from one-day dhow cruises to ten-day expedition safaris.</p>
      </div>
      <ContentRow title="Island Escapes" items={islandEscapes} />
      <ContentRow title="Every Tour" items={allTours} />
      <div className="h-20" />
    </AppShell>
  );
}
