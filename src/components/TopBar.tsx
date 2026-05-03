import { Link, useLocation } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Search, Bell } from "lucide-react";

export function TopBar() {
  const { pathname } = useLocation();
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 px-6 py-4 glass border-b border-border/40">
      <div className="flex items-center gap-3">
        <button className="h-8 w-8 grid place-items-center rounded-full bg-black/40 hover:bg-black/60 transition" aria-label="Back">
          <ChevronLeft size={18} />
        </button>
        <button className="h-8 w-8 grid place-items-center rounded-full bg-black/40 hover:bg-black/60 transition" aria-label="Forward">
          <ChevronRight size={18} />
        </button>
        {pathname === "/" && (
          <div className="hidden md:flex items-center gap-2 ml-2 bg-surface-elevated rounded-full pl-4 pr-2 py-2 w-80 ring-1 ring-transparent focus-within:ring-primary/60 transition">
            <Search size={16} className="text-muted-foreground" />
            <input
              placeholder="Search tours, beaches, parks…"
              className="bg-transparent flex-1 text-sm outline-none placeholder:text-muted-foreground"
            />
          </div>
        )}
      </div>
      <div className="flex items-center gap-3">
        <Link to="/tours" className="hidden sm:inline px-4 py-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition">
          Explore
        </Link>
        <Link
          to="/contact"
          className="px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-bold hover:scale-105 active:scale-95 transition"
        >
          Book a trip
        </Link>
        <button className="h-9 w-9 grid place-items-center rounded-full bg-black/40 hover:bg-black/60 transition" aria-label="Notifications">
          <Bell size={16} />
        </button>
        <div className="h-9 w-9 rounded-full grid place-items-center font-bold text-sm" style={{ background: "var(--gradient-sunset)" }}>
          ZS
        </div>
      </div>
    </header>
  );
}
