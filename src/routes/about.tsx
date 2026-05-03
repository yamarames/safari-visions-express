import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import stoneTown from "@/assets/stone-town.jpg";
import spice from "@/assets/spice-tour.jpg";
import { Award, Globe2, Leaf, Users } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Zanzafari" },
      { name: "description", content: "Locally owned and operated since 2005. Forty guides, drivers and curators across Tanzania and Zanzibar." },
      { property: "og:title", content: "About Zanzafari" },
      { property: "og:description", content: "Locally owned. Twenty years on the ground." },
      { property: "og:image", content: stoneTown },
    ],
  }),
  component: About,
});

const stats = [
  { icon: Users, k: "12,400+", v: "Travelers hosted" },
  { icon: Award, k: "20 yrs", v: "On the ground" },
  { icon: Leaf, k: "100%", v: "Eco-certified camps" },
  { icon: Globe2, k: "30+", v: "Destinations" },
];

function About() {
  return (
    <SiteShell>
      <section className="container-pro pt-36 md:pt-44 pb-16">
        <div className="max-w-3xl">
          <div className="eyebrow mb-5">Our story</div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05]">
            Born in Stone Town. <em className="italic font-light">Built on trust.</em>
          </h1>
          <p className="mt-8 text-lg text-muted-foreground leading-relaxed max-w-2xl">
            Zanzafari started in 2005 as a single wooden dhow captained by our founder Hassan. Two decades on, we are a family of forty — guides, drivers, curators and chefs — dedicated to giving every traveler the most honest, immersive view of East Africa.
          </p>
        </div>
      </section>

      <section className="container-pro pb-20">
        <div className="aspect-[16/9] overflow-hidden rounded-sm bg-muted">
          <img src={stoneTown} alt="Stone Town" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="container-pro pb-24 grid md:grid-cols-12 gap-12">
        <div className="md:col-span-7 space-y-6 text-base text-foreground/85 leading-relaxed">
          <p>
            We work directly with local communities, source from village spice farms, and partner only with eco-certified camps. Every booking plants ten mangrove seedlings on Zanzibar's eastern coast.
          </p>
          <p>
            Our planners are not salespeople. They are Tanzanians who have walked the routes, slept in the camps, and know which guide tells the best stories around a campfire.
          </p>
        </div>
        <div className="md:col-span-5 grid grid-cols-2 gap-px bg-border">
          {stats.map(({ icon: Icon, k, v }) => (
            <div key={v} className="bg-background p-6">
              <Icon size={20} className="text-primary mb-4" strokeWidth={1.5} />
              <div className="font-display text-3xl">{k}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-pro pb-32 grid md:grid-cols-2 gap-10 items-center">
        <div className="aspect-[4/5] overflow-hidden rounded-sm bg-muted img-zoom">
          <img src={spice} alt="Spice farm" className="h-full w-full object-cover" />
        </div>
        <div>
          <div className="eyebrow mb-4">What we believe</div>
          <h2 className="font-display text-4xl md:text-5xl leading-tight">Travel should leave a place better than it found it.</h2>
          <p className="mt-6 text-muted-foreground leading-relaxed">
            Five percent of every booking goes directly to community projects: school fees in Paje, a women-run weaving cooperative in Jambiani, and reef restoration off Mnemba. We publish our impact report every year.
          </p>
        </div>
      </section>
    </SiteShell>
  );
}
