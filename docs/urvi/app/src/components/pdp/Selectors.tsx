import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import { cn, money } from "@/lib/utils";
import { RadioGroup, RadioGroupCard } from "@/components/ui/radio-group";
import { addOns, flavors, supplyTiers } from "@/data/product";

const cardBase =
  "outline-none transition-colors duration-140 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-40";

/* ------------------------------- supply -------------------------------- */

const SUPPLY_X = [0, 145, 290];

export function SupplySelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <>
      <RadioGroup value={value} onValueChange={onChange} aria-label="Choose your supply">
        {supplyTiers.map((tier, i) => {
          const selected = tier.id === value;
          return (
            <RadioGroupCard
              key={tier.id}
              value={tier.id}
              className={cn(
                cardBase, "rounded-[10px]",
                selected ? "border-2 border-brand bg-surface-sel" : "border border-line bg-surface hover:border-line-hover",
              )}
              style={{ left: SUPPLY_X[i], top: 131, width: 132, height: 98 }}
            >
              <span className="t absolute font-semibold text-fg" style={{ left: 12, top: 12, fontSize: 12.5 }}>{tier.label}</span>
              <span className="t absolute text-fg-muted" style={{ left: 12, top: 31, fontSize: 8.5 }}>{tier.servings}</span>
              <span className="t absolute font-bold tabular-nums text-fg" style={{ left: 12, top: 56, fontSize: 15 }}>{money(tier.price)}</span>
              <span className="t absolute text-fg-muted" style={{ left: 12, top: 78, fontSize: 8.5 }}>{tier.note}</span>
              {selected && (
                <span className="absolute grid place-content-center rounded-full bg-brand" style={{ left: 104, top: 11, width: 16, height: 16 }}>
                  <Check className="text-white" style={{ width: 10, height: 10 }} strokeWidth={3} />
                </span>
              )}
            </RadioGroupCard>
          );
        })}
      </RadioGroup>

      {supplyTiers[2].badge && (
        <span
          className="absolute grid place-content-center rounded-full bg-brand font-semibold text-white"
          style={{ left: 290 + (132 - 54) / 2, top: 123, width: 54, height: 14, fontSize: 8 }}
        >
          {supplyTiers[2].badge}
        </span>
      )}
    </>
  );
}

/* ------------------------------- flavor -------------------------------- */

const FLAVOR_X = [0, 107.5, 215, 322.5];

export function FlavorSelector({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <RadioGroup value={value} onValueChange={onChange} aria-label="Choose your flavor">
      {flavors.map((f, i) => {
        const selected = f.id === value;
        return (
          <RadioGroupCard
            key={f.id}
            value={f.id}
            disabled={!f.inStock}
            className={cn(
              cardBase, "rounded-[10px]",
              selected ? "border-2 border-brand bg-surface-sel" : "border border-line bg-surface hover:border-line-hover",
            )}
            style={{ left: FLAVOR_X[i], top: 273, width: 99, height: 70 }}
          >
            <span
              aria-hidden="true"
              className="absolute"
              style={{ left: 26.5, top: 11, width: 46, height: 34, borderRadius: 11, background: `linear-gradient(135deg, ${f.swatch[0]}, ${f.swatch[1]})` }}
            />
            <span className="absolute text-center text-fg-2" style={{ left: 0, top: 51, width: 99, fontSize: 8.5, lineHeight: 1.21 }}>
              {f.name}
            </span>
            {selected && <span className="absolute rounded-full bg-brand" style={{ left: 83, top: 5, width: 9, height: 9 }} />}
          </RadioGroupCard>
        );
      })}
    </RadioGroup>
  );
}

/* ------------------------------- add-ons ------------------------------- */

const ADDON_X = [0, 144, 288];

const artPart = (l: number, t: number, w: number, h: number, r: number, a: string, b: string) => (
  <span key={`${l}-${t}`} className="absolute" style={{ left: l, top: t, width: w, height: h, borderRadius: r, background: `linear-gradient(135deg, ${a}, ${b})` }} />
);

function AddOnArt({ kind }: { kind: "box" | "bottle" | "tube" }) {
  if (kind === "box")
    return (<>
      {artPart(0, 6, 26, 46, 2, "#5C8FE0", "#1E3E86")}
      {artPart(4, 14, 17, 3, 1.5, "#EAF1FF", "#C7D9F7")}
      {artPart(4, 21, 13, 2, 1, "#B9CDEE", "#8FA9D6")}
      {artPart(23, 16, 20, 40, 3, "#39424E", "#12161D")}
      {artPart(27, 23, 12, 2.5, 1.2, "#98A6B8", "#6C7A8C")}
    </>);
  if (kind === "bottle")
    return (<>
      {artPart(17, 0, 9, 9, 1.5, "#4A5462", "#232A33")}
      {artPart(13, 8, 17, 48, 3, "#3B4450", "#0F1319")}
      {artPart(16, 22, 11, 13, 1.5, "#B9C4D2", "#7C8898")}
    </>);
  return (<>
    {artPart(13, 2, 21, 54, 5, "#414B58", "#13181F")}
    {artPart(13, 2, 21, 8, 4, "#5A6674", "#39424E")}
    {artPart(17, 24, 13, 3, 1.5, "#C3CDDA", "#8E9AAA")}
  </>);
}

export function AddOnSelector({ value, onToggle }: { value: string[]; onToggle: (id: string, on: boolean) => void }) {
  return (
    <div role="group" aria-label="Add more to your order">
      {addOns.map((a, i) => {
        const checked = value.includes(a.id);
        return (
          <CheckboxPrimitive.Root
            key={a.id}
            checked={checked}
            onCheckedChange={(c) => onToggle(a.id, c === true)}
            disabled={false}
            className={cn(
              cardBase, "absolute overflow-hidden rounded-[10px] text-left",
              checked ? "border-2 border-brand bg-surface-sel" : "border border-line bg-surface hover:border-line-hover",
            )}
            style={{ left: ADDON_X[i], top: 393, width: 134, height: 100 }}
          >
            <span className="absolute font-semibold text-fg" style={{ left: 11, top: 10, width: 74, fontSize: 9.5, lineHeight: "13px", display: "block", textAlign: "left" }}>
              {a.name}
            </span>
            <span className="absolute text-fg-muted" style={{ left: 11, top: 36, width: 74, fontSize: 7.5, lineHeight: "10px", display: "block", textAlign: "left" }}>
              {a.sub}
            </span>
            <span className="t absolute font-bold tabular-nums text-fg" style={{ left: 11, top: 62, fontSize: 11.5 }}>{money(a.price)}</span>
            <span className="t absolute text-fg-muted" style={{ left: 11, top: 79, fontSize: 7.5 }}>{a.note}</span>

            <span
              className={cn(
                "absolute grid place-content-center rounded-[2.5px] transition-colors",
                checked ? "border-[1.2px] border-brand bg-brand" : "border-[1.2px] border-fg-disabled",
              )}
              style={{ left: 112, top: 10, width: 11, height: 11 }}
            >
              {checked && <Check className="text-white" style={{ width: 8, height: 8 }} strokeWidth={3.5} />}
            </span>

            <span className="absolute" style={{ left: 80, top: 34, width: 48, height: 58 }}>
              <AddOnArt kind={a.art} />
            </span>
          </CheckboxPrimitive.Root>
        );
      })}
    </div>
  );
}
