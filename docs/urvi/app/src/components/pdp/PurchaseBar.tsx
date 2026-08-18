import { Minus, Plus } from "lucide-react";
import { cn, money } from "@/lib/utils";
import { IconCart } from "./icons";
import { MAX_QTY } from "@/store/cart";

export function QuantityStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (n: number) => void;
}) {
  const btn =
    "absolute grid place-content-center rounded-md text-fg-nav outline-none transition-colors hover:bg-white/8 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 disabled:opacity-30 disabled:hover:bg-transparent";

  return (
    <div
      className="absolute rounded-lg border border-line bg-surface"
      style={{ left: 322, top: 510, width: 100, height: 38 }}
    >
      <button
        type="button" aria-label="Decrease quantity" disabled={value <= 1}
        onClick={() => onChange(value - 1)}
        className={btn} style={{ left: 8, top: 7, width: 24, height: 24 }}
      >
        <Minus style={{ width: 13, height: 13 }} strokeWidth={2} />
      </button>

      <span
        aria-live="polite" aria-atomic="true"
        className="absolute grid place-content-center tabular-nums text-fg-nav"
        style={{ left: 38, top: 0, width: 24, height: 38, fontSize: 13 }}
      >
        <span className="sr-only">Quantity: </span>{value}
      </span>

      <button
        type="button" aria-label="Increase quantity" disabled={value >= MAX_QTY}
        onClick={() => onChange(value + 1)}
        className={btn} style={{ left: 68, top: 7, width: 24, height: 24 }}
      >
        <Plus style={{ width: 13, height: 13 }} strokeWidth={2} />
      </button>
    </div>
  );
}

export function AddToCartButton({
  total,
  status,
  onClick,
}: {
  total: number;
  status: "idle" | "loading" | "added";
  onClick: () => void;
}) {
  const label =
    status === "loading" ? "Adding…" : status === "added" ? "Added to cart" : `Add to Cart - ${money(total)}`;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={status !== "idle"}
      className={cn(
        "absolute flex items-center justify-center rounded-lg font-semibold text-white outline-none",
        "transition-colors duration-120 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2",
        status === "added" ? "bg-success" : "bg-brand hover:bg-brand-hover active:bg-brand-active",
        status === "loading" && "opacity-80",
      )}
      style={{
        left: 0, top: 510, width: 313, height: 38, gap: 9, fontSize: 14,
        boxShadow: status === "added" ? "none" : "0 4px 12px rgba(23,92,191,.35)",
      }}
    >
      {status === "idle" && <IconCart size={16} color="#fff" />}
      {status === "loading" && (
        <span
          aria-hidden="true"
          className="animate-spin rounded-full border-2 border-white/30 border-t-white"
          style={{ width: 14, height: 14 }}
        />
      )}
      <span>{label}</span>
    </button>
  );
}
