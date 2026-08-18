import * as React from "react";
import { cn } from "@/lib/utils";
import { gallery } from "@/data/product";
import { PouchArt } from "./PouchArt";
import { THUMB_BG, ThumbArt } from "./ThumbArt";

export function ProductGallery({
  index,
  onSelect,
}: {
  index: number;
  onSelect: (i: number) => void;
}) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const last = gallery.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = index === last ? 0 : index + 1;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = index === 0 ? last : index - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    onSelect(next);
    refs.current[next]?.focus();
  };

  const active = gallery[index];

  return (
    <>
      <div
        role="tablist"
        aria-label="Product images"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="absolute flex flex-col"
        style={{ left: 89, top: 74, gap: 9 }}
      >
        {gallery.map((item, i) => {
          const selected = i === index;
          return (
            <button
              key={item.id}
              ref={(el) => { refs.current[i] = el; }}
              role="tab"
              type="button"
              id={`thumb-${item.id}`}
              aria-selected={selected}
              aria-controls="gallery-stage"
              aria-label={item.alt}
              tabIndex={selected ? 0 : -1}
              onClick={() => onSelect(i)}
              className={cn(
                "relative overflow-hidden rounded-lg outline-none transition-colors duration-140",
                "focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2",
                selected ? "border-2 border-brand-ring" : "border border-line-thumb hover:border-line-hover",
              )}
              style={{ width: 70, height: 66, background: THUMB_BG[item.kind] }}
            >
              <ThumbArt kind={item.kind} />
            </button>
          );
        })}
      </div>

      <div id="gallery-stage" role="tabpanel" aria-labelledby={`thumb-${active.id}`} tabIndex={-1} className="outline-none">
        {active.kind === "pouch" ? (
          <PouchArt />
        ) : (
          <div className="absolute grid place-content-center" style={{ left: 180, top: 62, width: 450, height: 480 }}>
            <div
              className="relative overflow-hidden rounded-3xl"
              style={{ width: 340, height: 320, background: THUMB_BG[active.kind], boxShadow: "0 24px 60px rgba(2,10,24,.6)" }}
            >
              <div
                className="absolute left-1/2 top-1/2"
                style={{ width: 70, height: 66, transform: "translate(-50%,-50%) scale(4.4)" }}
              >
                <ThumbArt kind={active.kind} />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
