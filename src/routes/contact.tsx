import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/SiteShell";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Plan a Trip — Zanzafari" },
      { name: "description", content: "Tell us your dates and dream trip. A real planner replies within one business day with a custom proposal." },
      { property: "og:title", content: "Plan a Trip — Zanzafari" },
      { property: "og:description", content: "Tell us your dates. We'll design the trip." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <SiteShell>
      <section className="container-pro pt-36 md:pt-44 pb-16">
        <div className="max-w-3xl">
          <div className="eyebrow mb-5">Plan a trip</div>
          <h1 className="font-display text-5xl md:text-7xl leading-[1.05]">
            Tell us your dates. <em className="italic font-light">We'll design the trip.</em>
          </h1>
          <p className="mt-7 text-lg text-text-secondary max-w-2xl">
            A real Tanzanian planner replies within one business day with a custom proposal — no call center, no upsell, no obligation.
          </p>
        </div>
      </section>

      <section className="container-pro pb-32 grid md:grid-cols-12 gap-12">
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="md:col-span-7 grid gap-5"
        >
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Your name" required><input required className={inputCls} placeholder="Jane Doe" /></Field>
            <Field label="Email" required><input required type="email" className={inputCls} placeholder="you@email.com" /></Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-5">
            <Field label="Travel dates"><input className={inputCls} placeholder="Sep 12 – Sep 24" /></Field>
            <Field label="Group size"><input className={inputCls} placeholder="2 adults" /></Field>
          </div>
          <Field label="Tell us about your dream trip">
            <textarea rows={6} className={inputCls} placeholder="A week of safari followed by quiet beach time, mid-range lodges, no early starts…" />
          </Field>
          <button
            type="submit"
            className="self-start inline-flex items-center gap-2 bg-foreground text-background font-medium px-7 py-3.5 rounded-full hover:bg-primary transition-colors"
          >
            {sent ? "Sent — asante!" : (<>Send inquiry <ArrowRight size={16} /></>)}
          </button>
        </form>

        <aside className="md:col-span-5 space-y-px bg-border">
          {[
            { icon: MapPin, k: "Visit us", v: "Shangani Street, Stone Town, Zanzibar", href: undefined },
            { icon: Phone, k: "WhatsApp", v: "+255 777 000 111", href: "https://wa.me/255777000111" },
            { icon: Mail, k: "Email", v: "hello@zanzafari.co", href: "mailto:hello@zanzafari.co" },
          ].map(({ icon: Icon, k, v, href }) => {
            const Inner = (
              <>
                <Icon size={18} className="text-primary mb-4" strokeWidth={1.5} />
                <div className="text-xs uppercase tracking-wider text-text-tertiary">{k}</div>
                <div className="font-display text-xl mt-1">{v}</div>
              </>
            );
            return href ? (
              <a key={k} href={href} className="block bg-background p-6 hover:bg-surface transition-colors">{Inner}</a>
            ) : (
              <div key={k} className="bg-background p-6">{Inner}</div>
            );
          })}
        </aside>
      </section>
    </SiteShell>
  );
}

const inputCls = "w-full bg-transparent border-b border-border px-0 py-3 outline-none focus:border-primary placeholder:text-text-tertiary transition-colors";

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow block mb-2">{label}{required && " *"}</span>
      {children}
    </label>
  );
}
