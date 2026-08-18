import * as React from "react";
import { toast } from "sonner";
import { money } from "@/lib/utils";
import { AmbientField } from "./AmbientField";
import { Frame } from "./Frame";
import { AnnouncementBar, SiteHeader } from "./SiteHeader";
import { ProductGallery } from "./ProductGallery";
import { BenefitStrip, Dividers, TrustBar } from "./BenefitStrip";
import { AddOnSelector, FlavorSelector, SupplySelector } from "./Selectors";
import { AddToCartButton, QuantityStepper } from "./PurchaseBar";
import { CartDrawer } from "./CartDrawer";
import { claimIcon, IconSparkle } from "./icons";
import { addOns, claims, flavors, product, supplyTiers } from "@/data/product";
import { MAX_QTY, useCart } from "@/store/cart";

const CLAIM_X = [0, 145, 288];

export function ProductPage() {
  const cart = useCart();

  const [tierId, setTierId] = React.useState(supplyTiers[0].id);
  const [flavorId, setFlavorId] = React.useState(flavors[0].id);
  const [addOnIds, setAddOnIds] = React.useState<string[]>([]);
  const [quantity, setQuantity] = React.useState(1);
  const [galleryIndex, setGalleryIndex] = React.useState(0);
  const [status, setStatus] = React.useState<"idle" | "loading" | "added">("idle");

  const tier = supplyTiers.find((t) => t.id === tierId)!;
  const addOnTotal = addOnIds.reduce((n, id) => n + (addOns.find((a) => a.id === id)?.price ?? 0), 0);
  const total = tier.price * quantity + addOnTotal;

  const toggleAddOn = (id: string, on: boolean) =>
    setAddOnIds((prev) => (on ? [...prev, id] : prev.filter((x) => x !== id)));

  const onAdd = () => {
    setStatus("loading");
    window.setTimeout(() => {
      cart.add({ tierId, flavorId, addOnIds, quantity, unitPrice: tier.price, addOnTotal });
      setStatus("added");
      toast.success("Added to cart", { description: `${tier.label} · ${flavors.find((f) => f.id === flavorId)?.name}` });
      window.setTimeout(() => {
        setStatus("idle");
        cart.setOpen(true);
      }, 900);
    }, 450);
  };

  return (
    <>
      <Frame>
        <AnnouncementBar />

        <div className="absolute overflow-hidden" style={{ left: 0, top: 113, width: 1242, height: 735 }}>
          <AmbientField />
          <span className="absolute" style={{ left: 0, top: 0, width: 1242, height: 735, opacity: 0.32, background: "linear-gradient(180deg,#0A1E38 0%,#071527 50%,#040C18 100%)" }} />
          <span className="absolute" style={{ left: 230, top: 150, width: 320, height: 300, borderRadius: "50%", background: "#2A6BC4", filter: "blur(90px)", opacity: 0.26 }} />
          <span className="absolute" style={{ left: 0, top: 0, width: 1242, height: 735, background: "linear-gradient(90deg,rgba(3,9,15,0) 0%,rgba(3,9,15,.30) 46%,rgba(3,9,15,.66) 100%)" }} />

          <SiteHeader />
          <ProductGallery index={galleryIndex} onSelect={setGalleryIndex} />
          <Dividers />
          <BenefitStrip />
          <TrustBar />

          {/* ---------------- purchase panel ---------------- */}
          <div className="absolute" style={{ left: 667, top: 82, width: 422, height: 560 }}>
            <h1 className="t absolute font-display font-bold text-fg" style={{ left: 0, top: -8, fontSize: 38.7, letterSpacing: -0.3, lineHeight: 1.2, whiteSpace: "nowrap" }}>
              {product.name}
            </h1>
            <p className="t absolute text-fg-4" style={{ left: 1, top: 40, fontSize: 14.5, whiteSpace: "nowrap" }}>
              {product.lede}
            </p>

            <div className="absolute" style={{ left: 0, top: 71, width: 422, height: 16 }}>
              {claims.map((c, i) => {
                const Icon = claimIcon[c.icon as keyof typeof claimIcon];
                return (
                  <React.Fragment key={c.id}>
                    <span className="absolute" style={{ left: CLAIM_X[i], top: 0 }}><Icon size={14} /></span>
                    <span className="t absolute text-fg-2" style={{ left: CLAIM_X[i] + 20, top: 1.5, fontSize: 10.5, letterSpacing: 0.05, whiteSpace: "nowrap" }}>
                      {c.label}
                    </span>
                  </React.Fragment>
                );
              })}
            </div>

            <h2 className="t absolute font-semibold text-fg" style={{ left: 0, top: 109, fontSize: 13.5 }}>1. Choose Your Supply</h2>
            <SupplySelector value={tierId} onChange={setTierId} />

            <h2 className="t absolute font-semibold text-fg" style={{ left: 0, top: 245, fontSize: 13.5 }}>2. Choose Your Flavor</h2>
            <FlavorSelector value={flavorId} onChange={setFlavorId} />

            <h2 className="t absolute font-semibold text-fg" style={{ left: 0, top: 365, fontSize: 13.5 }}>3.&nbsp; And More to Your Flavor</h2>
            <AddOnSelector value={addOnIds} onToggle={toggleAddOn} />

            <AddToCartButton total={total} status={status} onClick={onAdd} />
            <QuantityStepper value={quantity} onChange={(n) => setQuantity(Math.max(1, Math.min(MAX_QTY, n)))} />

            <p className="sr-only" aria-live="polite" aria-atomic="true">
              Order total {money(total)}
            </p>
          </div>

          <span className="absolute" style={{ left: 1168, top: 661, opacity: 0.62 }}>
            <IconSparkle size={26} />
          </span>
        </div>
      </Frame>

      <CartDrawer />
    </>
  );
}
