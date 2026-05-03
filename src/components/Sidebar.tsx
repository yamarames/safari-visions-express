import { Link, useLocation } from "@tanstack/react-router";
import { Home, Search, Library, Compass, Heart, Plus, MapPin } from "lucide-react";

const nav = [
  { to: "/", label: "Home", icon: Home },
  { to: "/tours", label: "Tours", icon: Compass },
  { to: "/safaris", label: "Safaris", icon: Search },
  { to: "/about", label: "About", icon: Library },
  { to: "/contact", label: "Contact", icon: MapPin },
] as const;

const playlists = [
  "Big Five Safari",
  "Beach Escapes",
  "Stone Town Walks",
  "Spice Island Tours",
  "Sunset Dhow Cruises",
  "Snorkel & Dive",
  "Kilimanjaro Add-on",
  "Honeymoon Specials",
];

export function Sidebar() {
  const { pathname } = useLocation();
  return (
    <aside className="hidden lg:flex flex-col w-72 shrink-0 gap-2 p-2 h-[calc(100vh-96px)] sticky top-2">
      <div className="bg-sidebar rounded-xl p-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-9 w-9 rounded-full bg-primary grid place-items-center pulse-glow">
            <span className="text-primary-foreground font-bold">Z</span>
          </div>
          <span className="font-display font-bold text-lg">Zanzafari</span>
        </div>
        <nav className="flex flex-col gap-1 mt-4">
          {nav.map((n) => {
            const Icon = n.icon;
            const active = pathname === n.to;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center gap-4 px-3 py-2.5 rounded-md text-sm font-semibold transition-colors ${
                  active ? "text-foreground bg-surface-elevated" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon size={20} />
                {n.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="bg-sidebar rounded-xl p-5 flex-1 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3 text-muted-foreground font-semibold text-sm">
            <Library size={20} />
            Your Wishlist
          </div>
          <button className="h-8 w-8 grid place-items-center rounded-full hover:bg-surface-elevated text-muted-foreground hover:text-foreground transition">
            <Plus size={18} />
          </button>
        </div>
        <div className="flex gap-2 flex-wrap mb-4">
          <span className="px-3 py-1.5 bg-surface-elevated rounded-full text-xs font-semibold">Tours</span>
          <span className="px-3 py-1.5 bg-surface-elevated/60 rounded-full text-xs font-semibold text-muted-foreground">Beaches</span>
        </div>
        <div className="overflow-y-auto scrollbar-hide flex flex-col gap-1 -mx-2 px-2">
          {playlists.map((p, i) => (
            <button
              key={p}
              className="flex items-center gap-3 p-2 rounded-md hover:bg-surface-elevated text-left transition group"
            >
              <div
                className="h-12 w-12 rounded-md shrink-0 shimmer"
                style={{
                  background: i % 3 === 0 ? "var(--gradient-sunset)" : i % 3 === 1 ? "var(--gradient-jungle)" : "var(--gradient-ocean)",
                }}
              />
              <div className="min-w-0">
                <div className="font-semibold text-sm truncate group-hover:text-primary transition">{p}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <Heart size={10} /> Curated · Zanzibar
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
