import * as React from "react";
import { addOns as ALL_ADDONS, flavors as ALL_FLAVORS, supplyTiers as ALL_TIERS } from "@/data/product";

export type CartLine = {
  key: string;
  tierId: string;
  flavorId: string;
  addOnIds: string[];
  quantity: number;
  unitPrice: number; // tier price only
  addOnTotal: number; // add-ons are one-per-order, not per unit (design.md §6.3)
};

type CartState = {
  lines: CartLine[];
  open: boolean;
};

type CartApi = CartState & {
  count: number;
  subtotal: number;
  add: (line: Omit<CartLine, "key">) => void;
  remove: (key: string) => void;
  setQuantity: (key: string, quantity: number) => void;
  setOpen: (open: boolean) => void;
};

const CartContext = React.createContext<CartApi | null>(null);

export const MAX_QTY = 10;

export function lineTotal(line: CartLine): number {
  return line.unitPrice * line.quantity + line.addOnTotal;
}

export function describeLine(line: CartLine) {
  const tier = ALL_TIERS.find((t) => t.id === line.tierId);
  const flavor = ALL_FLAVORS.find((f) => f.id === line.flavorId);
  const addOnNames = line.addOnIds
    .map((id) => ALL_ADDONS.find((a) => a.id === id)?.name)
    .filter(Boolean) as string[];
  return { tier, flavor, addOnNames };
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = React.useState<CartLine[]>([]);
  const [open, setOpen] = React.useState(false);

  const add = React.useCallback((line: Omit<CartLine, "key">) => {
    setLines((prev) => {
      // same configuration collapses into one line
      const key = `${line.tierId}|${line.flavorId}|${[...line.addOnIds].sort().join(",")}`;
      const existing = prev.find((l) => l.key === key);
      if (existing) {
        return prev.map((l) =>
          l.key === key ? { ...l, quantity: Math.min(MAX_QTY, l.quantity + line.quantity) } : l,
        );
      }
      return [...prev, { ...line, key }];
    });
  }, []);

  const remove = React.useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key));
  }, []);

  const setQuantity = React.useCallback((key: string, quantity: number) => {
    const q = Math.max(1, Math.min(MAX_QTY, quantity));
    setLines((prev) => prev.map((l) => (l.key === key ? { ...l, quantity: q } : l)));
  }, []);

  const count = lines.reduce((n, l) => n + l.quantity, 0);
  const subtotal = lines.reduce((n, l) => n + lineTotal(l), 0);

  const value: CartApi = { lines, open, count, subtotal, add, remove, setQuantity, setOpen };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartApi {
  const ctx = React.useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
