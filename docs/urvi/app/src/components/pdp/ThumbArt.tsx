import type { GalleryItem } from "@/data/product";

const box = (
  l: number, t: number, w: number, h: number, r: number, a: string, b: string, rot = 0,
) => (
  <span
    className="absolute"
    style={{
      left: l, top: t, width: w, height: h, borderRadius: r,
      background: `linear-gradient(135deg, ${a}, ${b})`,
      transform: rot ? `rotate(${rot}deg)` : undefined,
    }}
  />
);

const circle = (l: number, t: number, w: number, h: number, a: string, b: string, rot = 0, vertical = false) => (
  <span
    className="absolute"
    style={{
      left: l, top: t, width: w, height: h, borderRadius: "50%",
      background: `linear-gradient(${vertical ? "180deg" : "135deg"}, ${a}, ${b})`,
      transform: rot ? `rotate(${rot}deg)` : undefined,
    }}
  />
);

/** Vector stand-ins for the photography that does not exist yet (design.md §8.2). */
export function ThumbArt({ kind }: { kind: GalleryItem["kind"] }) {
  switch (kind) {
    case "pouch":
      return (<>
        {box(23, 11, 24, 42, 3, "#7FA9EE", "#2E5AAE")}
        <span className="absolute" style={{ left: 23, top: 11, width: 24, height: 5, borderRadius: 2, background: "#9CC0F5" }} />
        <span className="absolute" style={{ left: 28, top: 21, width: 14, height: 3, borderRadius: 1.5, background: "#EAF1FF" }} />
        <span className="absolute" style={{ left: 27, top: 28, width: 16, height: 2, borderRadius: 1, background: "#DCE8FB", opacity: 0.75 }} />
        <span className="absolute" style={{ left: 39, top: 37, width: 9, height: 9, borderRadius: 2.5, background: "#E3737E", transform: "rotate(-12deg)" }} />
      </>);
    case "chews":
      return (<>
        {box(14, 22, 20, 18, 5, "#F0919A", "#C84E5C", 14)}
        {box(33, 17, 21, 19, 5, "#F49AA3", "#CE5361", -10)}
        {box(26, 36, 22, 19, 5, "#E8848E", "#B84450", 4)}
      </>);
    case "chew":
      return box(20, 20, 30, 26, 7, "#F59BA4", "#C74C5A", 6);
    case "blueberry":
      return (<>
        {circle(8, 26, 24, 24, "#5E6FA8", "#1B2242")}
        {circle(27, 12, 26, 26, "#6E7FBB", "#222A50")}
        {circle(40, 33, 23, 23, "#54649B", "#161C38")}
        {circle(20, 44, 20, 20, "#4A5A8E", "#131933")}
      </>);
    case "cream":
      return (<>
        {circle(-6, 24, 60, 50, "#F5EBDD", "#B9A48A", 0, true)}
        {circle(30, 8, 44, 40, "#FBF4E9", "#C9B79C")}
        <span className="absolute" style={{ left: 44, top: -4, width: 5, height: 34, borderRadius: 2.5, background: "#D8D3CB", transform: "rotate(-18deg)" }} />
      </>);
    case "botanical":
      return (<>
        {circle(6, 30, 20, 15, "#8FA85B", "#3C4A20", 20)}
        {circle(24, 16, 22, 16, "#A2BB68", "#455524", -15)}
        {circle(40, 36, 21, 15, "#7C9450", "#31401A", 8)}
        {circle(18, 46, 18, 13, "#93AC5F", "#3A4A1E", -6)}
      </>);
  }
}

export const THUMB_BG: Record<GalleryItem["kind"], string> = {
  pouch:     "linear-gradient(135deg,#16375F,#0A1B33)",
  chews:     "linear-gradient(135deg,#1A2A44,#0B1526)",
  chew:      "linear-gradient(135deg,#101D33,#070E1C)",
  blueberry: "linear-gradient(135deg,#16233D,#080D1A)",
  cream:     "linear-gradient(135deg,#4A423A,#171310)",
  botanical: "linear-gradient(135deg,#2A3320,#0C1108)",
};
