import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-32 border-t border-border bg-surface">
      <div className="container-pro py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-full bg-primary grid place-items-center text-primary-foreground font-display text-sm">Z</span>
            <span className="font-display text-2xl">Zanzafari</span>
          </Link>
          <p className="mt-5 max-w-md text-sm text-muted-foreground leading-relaxed">
            Locally owned tour operator crafting honest, immersive Tanzania safaris and Zanzibar island experiences since 2005.
          </p>
          <div className="mt-6 flex items-center gap-5 text-sm text-muted-foreground">
            <a href="mailto:hello@zanzafari.co" className="flex items-center gap-2 hover:text-foreground"><Mail size={15} /> hello@zanzafari.co</a>
            <a href="tel:+255777000111" className="flex items-center gap-2 hover:text-foreground"><Phone size={15} /> +255 777 000 111</a>
          </div>
        </div>

        <div>
          <div className="eyebrow mb-4">Explore</div>
          <ul className="space-y-3 text-sm">
            <li><Link to="/safaris" className="hover:text-primary">Tanzania Safaris</Link></li>
            <li><Link to="/tours" className="hover:text-primary">Zanzibar Tours</Link></li>
            <li><Link to="/about" className="hover:text-primary">About us</Link></li>
            <li><Link to="/contact" className="hover:text-primary">Plan a trip</Link></li>
          </ul>
        </div>

        <div>
          <div className="eyebrow mb-4">Visit</div>
          <p className="text-sm text-muted-foreground flex items-start gap-2">
            <MapPin size={15} className="mt-0.5 shrink-0" />
            Shangani Street, Stone Town, Zanzibar, Tanzania
          </p>
          <a href="https://instagram.com" className="mt-5 inline-flex items-center gap-2 text-sm hover:text-primary">
            <Instagram size={16} /> @zanzafari
          </a>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="container-pro py-6 flex flex-col md:flex-row gap-2 items-start md:items-center justify-between text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Zanzafari Tours & Safaris. All rights reserved.</span>
          <span className="font-mono">EAST AFRICA · LICENSED OPERATOR</span>
        </div>
      </div>
    </footer>
  );
}
