import { toast } from "sonner";
import { IconCart, IconUser } from "./icons";
import { navLinks, product } from "@/data/product";
import { useCart } from "@/store/cart";

export function AnnouncementBar() {
  return (
    <div className="absolute left-0 flex items-center justify-center bg-brand-bar"
         style={{ top: 88, width: 1242, height: 25 }}>
      <span className="font-bold text-white" style={{ fontSize: 10.5, letterSpacing: 0.7 }}>
        {product.announcement}
      </span>
    </div>
  );
}

export function SiteHeader() {
  const cart = useCart();

  return (
    <>
      <div className="t absolute font-display font-bold text-white"
           style={{ left: 88, top: 12, fontSize: 30, letterSpacing: -0.5, lineHeight: 1.2 }}>
        URVI
      </div>
      <div className="t absolute font-medium text-white" style={{ left: 146, top: 13, fontSize: 8 }}>®</div>

      <nav className="absolute flex items-center" style={{ left: 443, top: 27, transform: "translateY(-50%)", gap: 30 }}>
        {navLinks.map((label) => (
          <a
            key={label}
            href={`#${label.toLowerCase()}`}
            onClick={(e) => {
              e.preventDefault();
              toast(`${label} is not part of this comp`, {
                description: "Only the product page was designed. See design.md §11 for the full site map.",
              });
            }}
            className="font-medium text-fg-nav underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-[3px] focus-visible:rounded-sm"
            style={{ fontSize: 12.5 }}
          >
            {label}
          </a>
        ))}
      </nav>

      <button
        type="button"
        aria-label="Account"
        onClick={() => toast("Account isn't part of this comp")}
        className="absolute rounded-md transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
        style={{ left: 1072, top: 17 }}
      >
        <IconUser size={21} />
      </button>

      <button
        type="button"
        aria-label={cart.count > 0 ? `Cart, ${cart.count} item${cart.count === 1 ? "" : "s"}` : "Cart, empty"}
        onClick={() => cart.setOpen(true)}
        className="absolute rounded-md transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
        style={{ left: 1117, top: 15, width: 24, height: 24 }}
      >
        <span className="absolute" style={{ left: 1, top: 1 }}>
          <IconCart size={22} />
        </span>
        {cart.count > 0 ? (
          <span
            className="absolute grid place-content-center rounded-full bg-brand font-bold text-white tabular-nums"
            style={{ left: 12, top: -3, minWidth: 13, height: 13, fontSize: 8, padding: "0 3px" }}
          >
            {cart.count > 99 ? "99+" : cart.count}
          </span>
        ) : (
          <span className="absolute rounded-full bg-brand" style={{ left: 15, top: 0, width: 7, height: 7 }} />
        )}
      </button>
    </>
  );
}
