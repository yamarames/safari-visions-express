import { Minus, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { money } from "@/lib/utils";
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import { describeLine, lineTotal, MAX_QTY, useCart } from "@/store/cart";

export function CartDrawer() {
  const cart = useCart();

  return (
    <Sheet open={cart.open} onOpenChange={cart.setOpen}>
      <SheetContent aria-describedby="cart-desc">
        <header className="border-b border-line px-5 py-4">
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription id="cart-desc">
            {cart.count === 0
              ? "Nothing here yet."
              : `${cart.count} item${cart.count === 1 ? "" : "s"}`}
          </SheetDescription>
        </header>

        <div className="flex-1 overflow-y-auto px-5">
          {cart.lines.length === 0 ? (
            <p className="py-10 text-center text-[13px] text-fg-muted">
              Choose a supply and flavor, then add it to your cart.
            </p>
          ) : (
            <ul className="divide-y divide-line">
              {cart.lines.map((line) => {
                const { tier, flavor, addOnNames } = describeLine(line);
                return (
                  <li key={line.key} className="py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-[13px] font-semibold text-fg">{tier?.label}</p>
                        <p className="mt-0.5 text-[11px] text-fg-muted">
                          {tier?.servings} · {flavor?.name}
                        </p>
                        {addOnNames.length > 0 && (
                          <p className="mt-1 text-[11px] text-fg-faint">+ {addOnNames.join(", ")}</p>
                        )}
                      </div>
                      <p className="shrink-0 text-[13px] font-bold tabular-nums text-fg">
                        {money(lineTotal(line))}
                      </p>
                    </div>

                    <div className="mt-3 flex items-center gap-2">
                      <div className="flex items-center rounded-md border border-line">
                        <button
                          type="button" aria-label="Decrease quantity"
                          disabled={line.quantity <= 1}
                          onClick={() => cart.setQuantity(line.key, line.quantity - 1)}
                          className="grid h-7 w-7 place-content-center text-fg-nav outline-none hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-brand disabled:opacity-30"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-7 text-center text-[12px] tabular-nums text-fg-nav">{line.quantity}</span>
                        <button
                          type="button" aria-label="Increase quantity"
                          disabled={line.quantity >= MAX_QTY}
                          onClick={() => cart.setQuantity(line.key, line.quantity + 1)}
                          className="grid h-7 w-7 place-content-center text-fg-nav outline-none hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-brand disabled:opacity-30"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => cart.remove(line.key)}
                        className="ml-auto inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] text-fg-muted outline-none transition-colors hover:text-danger focus-visible:outline-2 focus-visible:outline-brand"
                      >
                        <Trash2 className="h-3 w-3" /> Remove
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <footer className="border-t border-line px-5 py-4">
          <div className="flex items-baseline justify-between">
            <span className="text-[13px] text-fg-muted">Subtotal</span>
            <span className="text-[17px] font-bold tabular-nums text-fg" aria-live="polite">
              {money(cart.subtotal)}
            </span>
          </div>
          <p className="mt-1 text-[11px] text-fg-faint">
            Shipping and taxes calculated at checkout.
          </p>
          <Separator className="my-3" />
          <button
            type="button"
            disabled={cart.lines.length === 0}
            onClick={() =>
              toast("Checkout isn't part of this comp", {
                description: "The flow is specified in design.md §11 but not designed yet.",
              })
            }
            className="h-[42px] w-full rounded-lg bg-brand text-[14px] font-semibold text-white outline-none transition-colors hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 disabled:opacity-40 disabled:hover:bg-brand"
          >
            Checkout
          </button>
        </footer>
      </SheetContent>
    </Sheet>
  );
}
