import { createFileRoute } from "@tanstack/react-router";
import { AppShell } from "@/components/AppShell";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a Trip — Zanzafari" },
      { name: "description", content: "Reach out to plan your custom Zanzibar tour or Tanzania safari." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <AppShell>
      <div className="px-6 md:px-12 pt-14 pb-8" style={{ background: "var(--gradient-sunset)" }}>
        <span className="text-xs font-bold uppercase tracking-widest opacity-90 text-background">Let's plan</span>
        <h1 className="text-5xl md:text-7xl font-display font-black mt-2 text-background">Book your trip.</h1>
      </div>

      <section className="px-6 md:px-12 py-12 grid md:grid-cols-5 gap-10">
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); }}
          className="md:col-span-3 grid gap-4 p-8 rounded-2xl bg-surface"
          style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input required placeholder="Your name" className="bg-input/50 px-4 py-3 rounded-lg outline-none focus:ring-2 ring-primary" />
            <input required type="email" placeholder="Email" className="bg-input/50 px-4 py-3 rounded-lg outline-none focus:ring-2 ring-primary" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <input placeholder="Travel dates" className="bg-input/50 px-4 py-3 rounded-lg outline-none focus:ring-2 ring-primary" />
            <input placeholder="Group size" className="bg-input/50 px-4 py-3 rounded-lg outline-none focus:ring-2 ring-primary" />
          </div>
          <textarea rows={5} placeholder="Tell us about your dream trip…" className="bg-input/50 px-4 py-3 rounded-lg outline-none focus:ring-2 ring-primary" />
          <button
            type="submit"
            className="self-start flex items-center gap-2 bg-primary text-primary-foreground font-bold px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition pulse-glow"
          >
            <Send size={16} /> {sent ? "Sent — asante!" : "Send inquiry"}
          </button>
        </form>

        <aside className="md:col-span-2 grid gap-4">
          {[
            { icon: MapPin, k: "Visit us", v: "Shangani St, Stone Town, Zanzibar" },
            { icon: Phone, k: "WhatsApp", v: "+255 777 000 111" },
            { icon: Mail, k: "Email", v: "hello@zanzafari.co" },
          ].map(({ icon: Icon, k, v }) => (
            <div key={k} className="card-tilt p-6 rounded-xl flex gap-4 items-start" style={{ background: "var(--gradient-card)" }}>
              <div className="h-11 w-11 grid place-items-center rounded-full bg-primary/15 text-primary shrink-0"><Icon size={20} /></div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">{k}</div>
                <div className="font-semibold mt-1">{v}</div>
              </div>
            </div>
          ))}
        </aside>
      </section>
      <div className="h-20" />
    </AppShell>
  );
}
