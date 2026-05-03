import { Play, Pause, SkipBack, SkipForward, Volume2, Heart } from "lucide-react";
import { useState } from "react";

export function PlayerBar() {
  const [playing, setPlaying] = useState(true);
  return (
    <div className="fixed bottom-0 inset-x-0 z-40 h-24 glass border-t border-border/40 px-4 flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 w-72 shrink-0">
        <div
          className="h-14 w-14 rounded-md shrink-0"
          style={{ background: "var(--gradient-sunset)", boxShadow: "var(--shadow-card)" }}
        />
        <div className="min-w-0">
          <div className="text-sm font-semibold truncate">Serengeti — Golden Hour</div>
          <div className="text-xs text-text-tertiary truncate">Now playing · Zanzafari Originals</div>
        </div>
        <button className="ml-2 text-text-tertiary hover:text-primary transition" aria-label="Like">
          <Heart size={18} />
        </button>
      </div>

      <div className="flex-1 max-w-2xl flex flex-col items-center gap-2">
        <div className="flex items-center gap-5">
          <button className="text-text-tertiary hover:text-foreground transition" aria-label="Prev"><SkipBack size={18} /></button>
          <button
            onClick={() => setPlaying((p) => !p)}
            className="h-9 w-9 grid place-items-center rounded-full bg-foreground text-background hover:scale-105 active:scale-95 transition"
            aria-label={playing ? "Pause" : "Play"}
          >
            {playing ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
          </button>
          <button className="text-text-tertiary hover:text-foreground transition" aria-label="Next"><SkipForward size={18} /></button>
        </div>
        <div className="flex items-center gap-3 w-full">
          <span className="text-[10px] text-text-tertiary tabular-nums">1:24</span>
          <div className="flex-1 h-1 bg-surface-elevated rounded-full overflow-hidden group cursor-pointer">
            <div className="h-full w-1/3 bg-foreground group-hover:bg-primary transition-colors" />
          </div>
          <span className="text-[10px] text-text-tertiary tabular-nums">4:58</span>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-2 w-72 justify-end">
        <Volume2 size={16} className="text-text-tertiary" />
        <div className="h-1 w-24 bg-surface-elevated rounded-full overflow-hidden">
          <div className="h-full w-2/3 bg-foreground" />
        </div>
      </div>
    </div>
  );
}
