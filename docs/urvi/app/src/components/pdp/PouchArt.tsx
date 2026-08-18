const CHEWS = [
  { x: 248, y: 163, s: 31, rot: 12 },
  { x: 280, y: 224, s: 44, rot: -8 },
  { x: 324, y: 292, s: 46, rot: 6 },
  { x: 312, y: 372, s: 45, rot: -14 },
  { x: 355, y: 381, s: 39, rot: 9 },
];

/** Vector reconstruction of the pouch. Replace with photography (design.md §8.2). */
export function PouchArt() {
  return (
    <div className="absolute" style={{ left: 180, top: 62, width: 450, height: 480 }}>
      <span className="absolute" style={{ left: 62, top: 398, width: 300, height: 60, borderRadius: "50%", background: "#020914", filter: "blur(40px)", opacity: 0.7 }} />

      <div
        className="absolute overflow-hidden"
        style={{
          left: 85, top: 10, width: 250, height: 405,
          borderRadius: "6px 6px 14px 14px",
          transform: "rotate(-0.8deg)",
          background: "linear-gradient(90deg,#6293E4 0%,#3866C6 42%,#1D3C8A 100%)",
          boxShadow: "6px 22px 38px rgba(2,10,24,.55)",
        }}
      >
        <span className="absolute" style={{ left: 0, top: 0, width: 26, height: 405, background: "linear-gradient(90deg,rgba(207,224,250,.55),rgba(207,224,250,0))" }} />
        <span className="absolute" style={{ left: 206, top: 0, width: 44, height: 405, background: "linear-gradient(90deg,rgba(11,30,69,0),rgba(11,30,69,.6))" }} />
        <span className="absolute" style={{ left: 0, top: 0, width: 250, height: 30, background: "linear-gradient(90deg,#8FB4F0,#4B78D4)" }} />
        <span className="absolute" style={{ left: 0, top: 30, width: 250, height: 1.5, background: "#12305F", opacity: 0.5 }} />
        <span className="absolute" style={{ left: 0, top: 353, width: 250, height: 52, background: "linear-gradient(180deg,rgba(16,39,92,0),rgba(11,28,70,.85))" }} />

        <span className="t absolute" style={{ left: 28, top: 11, fontSize: 5, letterSpacing: 0.4, color: "#0E2A5E", opacity: 0.75 }}>Origin Nord</span>
        <span className="t absolute" style={{ left: 168, top: 11, fontSize: 5, letterSpacing: 0.4, color: "#0E2A5E", opacity: 0.75 }}>Enodrt 090</span>

        <span className="t absolute font-display font-bold text-white" style={{ left: 34, top: 58, fontSize: 83.2, letterSpacing: -2, lineHeight: 1.2 }}>URVI</span>
        <span className="t absolute italic text-white" style={{ left: 32, top: 186, fontSize: 31.1, fontWeight: 300 }}>Brain Support</span>
        <span className="t absolute text-white" style={{ left: 234, top: 188, fontSize: 11, fontWeight: 300, opacity: 0.9 }}>®</span>

        <span className="t absolute text-white" style={{ left: 90, top: 264, fontSize: 16.5, fontWeight: 300, opacity: 0.95 }}>L-Tyroône</span>
        <span className="t absolute text-white" style={{ left: 70, top: 299, fontSize: 16.5, fontWeight: 300, opacity: 0.85 }}>+</span>
        <span className="t absolute text-white" style={{ left: 90, top: 299, fontSize: 16.5, fontWeight: 300, opacity: 0.95 }}>Acetyl-L-Carnitine</span>
        <span className="t absolute text-white" style={{ left: 90, top: 334, fontSize: 16.5, fontWeight: 300, opacity: 0.95 }}>Coffeine</span>

        <span className="t absolute font-medium" style={{ left: 58, top: 366, fontSize: 5.5, letterSpacing: 0.9, color: "#CBDCF8", opacity: 0.55 }}>DIETITIAN MADE SUPPLEMENT CERTIFIED</span>
        <span className="t absolute font-medium" style={{ left: 44, top: 388, fontSize: 5.5, letterSpacing: 0.9, color: "#CBDCF8", opacity: 0.45 }}>SUPPLEMENT</span>
        <span className="t absolute font-medium" style={{ left: 150, top: 388, fontSize: 5.5, letterSpacing: 0.9, color: "#CBDCF8", opacity: 0.45 }}>BRAIN ASSIST</span>

        <span className="absolute rounded-full" style={{ left: 218, top: 358, width: 15, height: 15, border: "1px solid #CBDCF8", opacity: 0.55 }} />
      </div>

      {CHEWS.map((c, i) => (
        <span
          key={i}
          className="absolute"
          style={{
            left: c.x, top: c.y, width: c.s, height: c.s * 0.86,
            borderRadius: c.s * 0.26,
            transform: `rotate(${c.rot}deg)`,
            background: "linear-gradient(135deg,#F7A2AB 0%,#E4707D 50%,#B23B49 100%)",
            boxShadow: "2px 6px 10px rgba(18,6,10,.45)",
          }}
        />
      ))}
    </div>
  );
}
