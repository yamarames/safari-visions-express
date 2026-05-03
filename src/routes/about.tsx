import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import stoneTown from "@/assets/stone-town.jpg";
import { Award, Users, Leaf, Globe2 } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Zanzafari" },
      { name: "description", content: "Locally owned and operated. 20 years guiding travelers across Zanzibar and Tanzania." },
    ],
  }),
  component: About,
});

const stats = [
  { icon: Users, k: "12,400+", v: "Happy travelers" },
  { icon: Award, k: "20 yrs", v: "On the ground" },
  { icon: Leaf, k: "100%", v: "Eco-certified camps" },
  { icon: Globe2, k: "30+", v: "Destinations" },
];

function About() {
  return (
    <AppShell>
      <div className="relative h-[55vh] -mt-[72px] overflow-hidden">
        <img src={stoneTown} alt="Stone Town" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/30" />
        <div className="relative h-full flex flex-col justify-end px-6 md:px-12 pb-10 max-w-3xl">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Our Story</span>
          <h1 className="text-5xl md:text-7xl font-display font-black mt-2">Born in Stone Town. Built on trust.</h1>
        </div>
      </div>

      <section className="px-6 md:px-12 py-12 grid md:grid-cols-2 gap-12 items-start">
        <div className="prose prose-invert">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Zanzafari started in 2005 as a single dhow boat captained by our founder Hassan. Two decades later we are a family of 40+ guides, drivers and curators dedicated to giving every traveler the most honest, immersive view of East Africa.
          </p>
          <p className="text-muted-foreground mt-6 leading-relaxed">
            We work directly with local communities, source from village spice farms, and partner only with eco-certified camps. Every booking plants ten mangrove seedlings on Zanzibar's coast.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map(({ icon: Icon, k, v }) => (
            <div key={v} className="card-tilt p-6 rounded-xl bg-surface" style={{ background: "var(--gradient-card)" }}>
              <Icon className="text-primary mb-3" />
              <div className="font-display text-3xl font-bold">{k}</div>
              <div className="text-sm text-muted-foreground mt-1">{v}</div>
            </div>
          ))}
        </div>
      </section>
      <div className="h-20" />
    </AppShell>
  );
}
