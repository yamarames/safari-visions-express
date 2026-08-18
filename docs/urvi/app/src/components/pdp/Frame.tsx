import * as React from "react";

const W = 1242;
const H = 848;

/**
 * The comp is a fixed 1242x848 artboard. Rather than reflowing (which would
 * break the pixel match the design was signed off on), the frame keeps exact
 * geometry and scales to fit the viewport.
 */
export function Frame({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = React.useState(1);

  React.useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerWidth - 32) / W));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div className="flex justify-center overflow-hidden" style={{ height: Math.ceil(H * scale) }}>
      <div
        className="flex-none"
        style={{ width: W, height: H, transformOrigin: "top center", transform: `scale(${scale})` }}
      >
        <div className="relative overflow-hidden bg-letterbox" style={{ width: W, height: H }}>
          {children}
        </div>
      </div>
    </div>
  );
}
