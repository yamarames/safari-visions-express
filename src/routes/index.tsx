import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { ContentRow } from "@/components/ContentRow";
import { featuredSafaris, islandEscapes, editorial, heroVideoUrl } from "@/data/tours";
import { Play, Sparkles, MapPin } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zanzafari — Zanzibar Tours & Tanzania Safaris" },
      { name: "description", content: "Stream-worthy safaris and Zanzibar island escapes. Curated Big Five tours, beach getaways, and Stone Town adventures." },
      { property: "og:title", content: "Zanzafari — Zanzibar Tours & Tanzania Safaris" },
      { property: "og:description", content: "Curated safaris and Zanzibar island escapes." },
    ],
  }),
  component: Home,
});

function Hero() {
  return (
    <section className="relative h-[82vh] min-h-[600px] -mt-[72px] overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover animate-slow-zoom"
        poster=""
      >
        <source src={heroVideoUrl} type="video/mp4" />
      </video>
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 bg-gradient-to-r from-background/85 via-background/30 to-transparent" />
      <div className="absolute inset-0 grain" />
      <div
        className="absolute -bottom-40 -left-40 h-[500px] w-[500px] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: "var(--gradient-emerald-gold)" }}
      />

      <div className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-20 max-w-3xl">
        <div className="flex items-center gap-2 mb-5 text-[11px] font-bold uppercase tracking-[0.28em] gold-text animate-float">
          <Sparkles size={14} style={{ color: "oklch(0.84 0.13 85)" }} /> Featured Journey
        </div>
        <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] mb-6 animate-fade-up">
          Tanzania,<br />
          <span className="gradient-text italic font-medium">unscripted.</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed animate-fade-up" style={{ animationDelay: "0.15s" }}>
          From the Serengeti's roaring sunrise to Zanzibar's turquoise dusk — press play on the trip of a lifetime.
        </p>
        <div className="flex items-center gap-3 flex-wrap animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <button className="flex items-center gap-2 bg-primary text-primary-foreground font-bold px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition pulse-glow">
            <Play size={18} fill="currentColor" /> Play Highlights
          </button>
          <button className="frame-gold flex items-center gap-2 glass-strong text-foreground font-semibold px-7 py-4 rounded-full hover:bg-background/60 transition">
            <MapPin size={16} /> Plan my safari
          </button>
        </div>

        <div className="flex gap-8 md:gap-10 mt-12 text-xs animate-fade-up" style={{ animationDelay: "0.45s" }}>
          {[
            { k: "12k+", v: "Travelers hosted" },
            { k: "4.97", v: "Guest rating" },
            { k: "20yr", v: "On the ground" },
          ].map((s) => (
            <div key={s.v}>
              <div className="text-3xl font-display font-bold gold-text">{s.k}</div>
              <div className="text-muted-foreground uppercase tracking-[0.2em] mt-1">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GreetingChips() {
  const chips = ["Big Five", "Beach Stays", "Stone Town", "Spice Tours", "Diving", "Honeymoon", "Family"];
  return (
    <div className="px-6 mt-8">
      <div className="flex items-end justify-between mb-4">
        <h2 className="text-2xl font-bold">Karibu — pick a vibe</h2>
      </div>
      <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2">
        {chips.map((c, i) => (
          <button
            key={c}
            className="shrink-0 px-5 py-2.5 rounded-full text-sm font-semibold border border-border hover:border-primary hover:text-primary transition card-tilt"
            style={{
              background: i === 0 ? "var(--gradient-jungle)" : "transparent",
              color: i === 0 ? "white" : undefined,
            }}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}

function Home() {
  return (
    <AppShell>
      <Hero />
      <GreetingChips />
      <ContentRow title="Top Safaris this season" subtitle="Hand-picked by our local guides" items={featuredSafaris} />
      <ContentRow title="Zanzibar Island Escapes" subtitle="From spice farms to turquoise reefs" items={islandEscapes} />
      <ContentRow title="Editor's Picks" subtitle="Curated journeys for every traveler" items={editorial} />

      <footer className="mt-20 px-6 pb-10 text-xs text-muted-foreground">
        <div className="border-t border-border pt-6 flex flex-wrap justify-between gap-4">
          <span>© {new Date().getFullYear()} Zanzafari Tours & Safaris. Stone Town, Zanzibar.</span>
          <span>Crafted with 🦁 in East Africa</span>
        </div>
      </footer>
    </AppShell>
  );
}
