import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

const links = [
  { to: "/", label: "Home", idx: "01" },
  { to: "/safaris", label: "Safaris", idx: "02" },
  { to: "/tours", label: "Zanzibar Tours", idx: "03" },
  { to: "/about", label: "About", idx: "04" },
  { to: "/contact", label: "Contact", idx: "05" },
] as const;

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [time, setTime] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const update = () => {
      const now = new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Africa/Dar_es_Salaam",
      });
      setTime(`EAT ${now}`);
    };
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      {/* Macro detail: ultra-thin top status bar — only when not scrolled */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ${
          scrolled ? "max-h-0 opacity-0" : "max-h-10 opacity-100"
        }`}
      >
        <div className="container-pro h-8 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.24em] text-text-hero-muted border-b border-text-hero-muted/20">
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
            On the ground · Stone Town, ZNZ
          </span>
          <span className="hidden md:flex items-center gap-5">
            <span className="tnum">{time}</span>
            <span className="hidden lg:inline">+255 777 000 111</span>
            <span className="tnum hidden lg:inline">06°09'S · 39°11'E</span>
          </span>
        </div>
      </div>

      <div
        className={`relative container-pro flex items-center justify-between transition-[height] duration-300 ${
          scrolled ? "h-16" : "h-20"
        }`}
      >
        {/* Corner ticks on the header itself */}
        <span
          className={`pointer-events-none absolute top-2 left-1 h-2.5 w-2.5 border-l border-t transition-colors ${
            scrolled ? "border-foreground/30" : "border-text-hero-muted/40"
          }`}
        />
        <span
          className={`pointer-events-none absolute top-2 right-1 h-2.5 w-2.5 border-r border-t transition-colors ${
            scrolled ? "border-foreground/30" : "border-text-hero-muted/40"
          }`}
        />

        {/* Logo */}
        <Link
          to="/"
          className={`group flex items-center gap-2.5 transition-colors ${
            scrolled ? "text-foreground" : "text-text-hero"
          }`}
        >
          <span className="relative h-9 w-9 rounded-full bg-primary grid place-items-center text-primary-foreground font-display text-[15px] shadow-sm transition-transform duration-500 group-hover:rotate-[18deg]">
            Z
            <span className="absolute inset-0 rounded-full ring-1 ring-primary/40 group-hover:ring-primary/80 group-hover:scale-110 transition-all duration-500" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="font-display text-[1.35rem] tracking-[-0.02em]">Zanzafari</span>
            <span className="font-mono text-[9px] uppercase tracking-[0.28em] opacity-70 -mt-0.5">
              Tours · Safaris
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className={`hidden md:flex items-center gap-1 transition-colors ${
            scrolled ? "text-foreground/85" : "text-text-hero-secondary"
          }`}
        >
          {links.slice(1, -1).map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="group relative px-4 py-2 text-sm font-medium hover:text-primary transition-colors"
              activeProps={{ className: "text-primary" }}
            >
              <span className="relative inline-flex items-center gap-1.5">
                <span className="font-mono text-[9px] tracking-[0.22em] opacity-50 group-hover:opacity-100 transition-opacity tnum">
                  {l.idx}
                </span>
                {l.label}
              </span>
              <span className="pointer-events-none absolute left-4 right-4 -bottom-0.5 h-px bg-current scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />
            </Link>
          ))}
        </nav>

        {/* Right CTA cluster */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="tel:+255777000111"
            className={`text-sm font-mono tracking-wider tnum hidden lg:inline-flex items-center gap-2 transition-colors ${
              scrolled ? "text-foreground/70 hover:text-primary" : "text-text-hero-muted hover:text-text-hero"
            }`}
          >
            <span className="h-1 w-1 rounded-full bg-primary" />
            +255 777 000 111
          </a>
          <Link
            to="/contact"
            className={`group relative inline-flex items-center gap-2 text-sm font-medium pl-5 pr-4 py-2.5 rounded-full overflow-hidden transition-all ${
              scrolled
                ? "bg-foreground text-background hover:bg-primary"
                : "bg-text-hero text-foreground hover:bg-primary hover:text-primary-foreground"
            }`}
          >
            <span>Plan my trip</span>
            <span className="relative w-4 h-4 overflow-hidden">
              <ArrowUpRight
                size={16}
                className="absolute inset-0 transition-transform duration-400 group-hover:-translate-y-4 group-hover:translate-x-4"
              />
              <ArrowUpRight
                size={16}
                className="absolute inset-0 translate-y-4 -translate-x-4 transition-transform duration-400 group-hover:translate-y-0 group-hover:translate-x-0"
              />
            </span>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen((o) => !o)}
          className={`md:hidden p-2 -mr-2 transition-colors ${
            scrolled ? "text-foreground" : "text-text-hero"
          }`}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-border bg-background animate-fade-up">
          <nav className="container-pro py-6 flex flex-col">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="group flex items-center justify-between py-4 border-b border-border last:border-b-0"
              >
                <span className="flex items-center gap-4">
                  <span className="font-mono text-[10px] tracking-[0.22em] text-text-tertiary tnum">
                    {l.idx}
                  </span>
                  <span className="font-display text-2xl">{l.label}</span>
                </span>
                <ArrowUpRight size={18} className="text-text-tertiary group-hover:text-primary transition-colors" />
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-6 text-center text-sm font-medium px-5 py-3.5 rounded-full bg-foreground text-background"
            >
              Plan my trip
            </Link>
            <div className="mt-6 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-text-tertiary">
              <span>{time}</span>
              <span>+255 777 000 111</span>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
