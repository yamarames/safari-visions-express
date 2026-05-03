import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { TourCard } from "@/components/TourCard";
import { featuredSafaris, islandEscapes, editorial, heroVideoUrl } from "@/data/tours";
import { ArrowRight, Award, Compass, Leaf, ShieldCheck, Star } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zanzafari — Tanzania Safaris & Zanzibar Tours" },
      { name: "description", content: "Locally owned tour operator. Tailor-made Tanzania safaris and Zanzibar island experiences crafted by guides who live here." },
      { property: "og:title", content: "Zanzafari — Tanzania Safaris & Zanzibar Tours" },
      { property: "og:description", content: "Tailor-made safaris and island escapes, crafted by guides who live here." },
    ],
  }),
  component: Home,
});

function Hero() {
  return (
    <section className="relative min-h-[100svh] flex items-end overflow-hidden">
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 h-full w-full object-cover scale-[1.02]"
      >
        <source src={heroVideoUrl} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />

      <div className="absolute top-20 md:top-24 inset-x-0 z-10">
        <div className="container-pro flex items-center justify-between text-white/70 font-mono text-[10px] uppercase tracking-[0.28em]">
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" /> Live · 06°09'S 39°11'E</span>
          <span className="hidden md:block tnum">N° 001 / Featured Itinerary</span>
        </div>
      </div>

      <div className="relative container-pro pb-20 pt-32 text-white">
        <div className="max-w-3xl animate-fade-up">
          <div className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/80 mb-6 flex items-center gap-3">
            <span className="h-px w-8 bg-white/60" />
            Est. 2005 · Stone Town, Zanzibar
          </div>
          <h1 className="font-display text-5xl md:text-7xl lg:text-[8.5rem] leading-[0.98] tracking-[-0.03em]">
            Tanzania, told<br />by the people who <em className="italic font-light text-white/90">live</em> it.
          </h1>
          <p className="mt-8 text-base md:text-lg text-white/85 max-w-xl leading-relaxed">
            Tailor-made safaris in the Serengeti and slow-travel escapes across Zanzibar — designed and guided by a local team of forty.
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-5">
            <Link to="/contact" className="group inline-flex items-center gap-2 bg-white text-foreground font-medium px-7 py-3.5 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
              Plan my trip
              <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link to="/safaris" className="inline-flex items-center gap-2 text-white/90 font-medium quiet-link">
              Browse safaris →
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-8 max-w-lg pt-8 border-t border-white/15">
            {[
              { k: "12.4k", v: "Travelers" },
              { k: "4.97", v: "Rating" },
              { k: "20", v: "Years" },
            ].map((s) => (
              <div key={s.v}>
                <div className="font-display text-2xl md:text-3xl tnum">{s.k}</div>
                <div className="text-[10px] uppercase tracking-[0.22em] text-white/60 mt-1 font-mono">{s.v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustStrip() {
  const items = ["Safari Bookings", "Lonely Planet", "Travel + Leisure", "National Geographic", "Condé Nast", "Tripadvisor"];
  return (
    <div className="border-y border-border bg-surface overflow-hidden">
      <div className="container-pro py-6 flex items-center gap-3 md:gap-6 text-xs md:text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground overflow-x-auto scrollbar-hide whitespace-nowrap">
        <span className="shrink-0 text-foreground/70">As seen in</span>
        {items.map((i) => (
          <span key={i} className="shrink-0">· {i}</span>
        ))}
      </div>
    </div>
  );
}

function ValueProps() {
  const props = [
    { icon: Compass, title: "Locally crafted", text: "Every itinerary is built from scratch by guides who grew up on these routes." },
    { icon: ShieldCheck, title: "Fully bonded", text: "Licensed Tanzanian operator with full traveler protection and 24/7 support on the ground." },
    { icon: Leaf, title: "Low-impact", text: "We work only with eco-certified camps and reinvest 5% of every booking into community projects." },
    { icon: Award, title: "20 years on safari", text: "From a single dhow in 2005 to 12,000+ travelers hosted across East Africa." },
  ];
  return (
    <section className="container-pro py-24 md:py-32">
      <div className="max-w-2xl mb-14">
        <div className="eyebrow mb-4">Why Zanzafari</div>
        <h2 className="font-display text-4xl md:text-5xl">Not a booking platform. A small team that knows every road.</h2>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {props.map(({ icon: Icon, title, text }) => (
          <div key={title}>
            <Icon size={26} className="text-primary mb-5" strokeWidth={1.5} />
            <h3 className="font-display text-xl mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function Section({ eyebrow, title, link, children }: { eyebrow: string; title: string; link?: { to: string; label: string }; children: React.ReactNode }) {
  return (
    <section className="container-pro py-20 md:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
        <div>
          <div className="eyebrow mb-3">{eyebrow}</div>
          <h2 className="font-display text-4xl md:text-5xl max-w-2xl">{title}</h2>
        </div>
        {link && (
          <Link to={link.to} className="inline-flex items-center gap-2 text-sm font-medium underline-link">
            {link.label} <ArrowRight size={15} />
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}

function Testimonial() {
  return (
    <section className="bg-surface border-y border-border">
      <div className="container-pro py-24 md:py-32 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <div className="flex gap-1 mb-6 text-primary">
            {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
          </div>
          <blockquote className="font-display text-3xl md:text-4xl leading-snug">
            "Hassan and his team turned a vague idea into the trip of our lives. We slept under canvas in the Serengeti, drifted on a dhow at sunset, and never once felt like tourists."
          </blockquote>
          <div className="mt-8 text-sm">
            <div className="font-medium">Marta & Jens — Copenhagen</div>
            <div className="text-muted-foreground">12-day Tanzania + Zanzibar honeymoon · March 2026</div>
          </div>
        </div>
        <div className="md:col-span-5 grid grid-cols-3 gap-6 text-center">
          {[
            { k: "12,400+", v: "travelers hosted" },
            { k: "4.97", v: "guest rating" },
            { k: "20", v: "years guiding" },
          ].map((s) => (
            <div key={s.v}>
              <div className="font-display text-4xl md:text-5xl">{s.k}</div>
              <div className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="container-pro py-24 md:py-32 text-center">
      <div className="eyebrow mb-5">Start planning</div>
      <h2 className="font-display text-5xl md:text-6xl max-w-3xl mx-auto leading-tight">
        Tell us your dates. We'll design the trip.
      </h2>
      <p className="mt-6 text-muted-foreground max-w-xl mx-auto">
        No call centers, no upsells. A real planner replies within one business day with a custom proposal.
      </p>
      <Link to="/contact" className="mt-10 inline-flex items-center gap-2 bg-foreground text-background font-medium px-8 py-4 rounded-full hover:bg-primary transition-colors">
        Request a proposal <ArrowRight size={16} />
      </Link>
    </section>
  );
}

function Grid({ items }: { items: typeof featuredSafaris }) {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
      {items.map((t) => <TourCard key={t.slug} tour={t} />)}
    </div>
  );
}

function Home() {
  return (
    <SiteShell>
      <Hero />
      <TrustStrip />
      <ValueProps />

      <Section eyebrow="Featured · Tanzania" title="Signature safaris this season." link={{ to: "/safaris", label: "All safaris" }}>
        <Grid items={featuredSafaris} />
      </Section>

      <div className="hairline container-pro" />

      <Section eyebrow="Featured · Zanzibar" title="Slow-travel island escapes." link={{ to: "/tours", label: "All tours" }}>
        <Grid items={islandEscapes} />
      </Section>

      <Testimonial />

      <Section eyebrow="Editor's picks" title="Curated journeys for every kind of traveler.">
        <Grid items={editorial} />
      </Section>

      <CTA />
    </SiteShell>
  );
}
