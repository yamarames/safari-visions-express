import { benefits, trust } from "@/data/product";
import { benefitIcon, trustIcon } from "./icons";

export function Dividers() {
  return (
    <>
      <div className="absolute bg-rule opacity-90" style={{ left: 70, top: 532, width: 558, height: 1 }} role="separator" />
      <div className="absolute bg-rule opacity-90" style={{ left: 70, top: 614, width: 558, height: 1 }} role="separator" />
    </>
  );
}

export function BenefitStrip() {
  return (
    <div className="absolute" style={{ left: 70, top: 545, width: 558, height: 60 }}>
      {benefits.map((b) => {
        const Icon = benefitIcon[b.icon as keyof typeof benefitIcon];
        return (
          <div key={b.id}>
            <span className="absolute" style={{ left: b.x, top: 3 }}>
              <Icon size={22} />
            </span>
            <span className="t absolute font-bold text-fg-strong" style={{ left: b.x + 29, top: 2, fontSize: 8, letterSpacing: 0.1, whiteSpace: "nowrap" }}>
              {b.title}
            </span>
            {b.lines.map((line, i) => (
              <span key={i} className="t absolute text-fg-faint" style={{ left: b.x + 29, top: i === 0 ? 14.5 : 23.5, fontSize: 6.5, letterSpacing: 0.1, whiteSpace: "nowrap" }}>
                {line}
              </span>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export function TrustBar() {
  return (
    <div className="absolute" style={{ left: 70, top: 630, width: 558, height: 22 }}>
      {trust.map((t) => {
        const Icon = trustIcon[t.icon as keyof typeof trustIcon];
        return (
          <div key={t.id}>
            <span className="absolute" style={{ left: t.x, top: 2 }}>
              <Icon size={17} />
            </span>
            <span className="t absolute text-fg-3" style={{ left: t.x + 24, top: 4.5, fontSize: 9, letterSpacing: 0.05, whiteSpace: "nowrap" }}>
              {t.label}
            </span>
          </div>
        );
      })}
      <span className="absolute bg-sep" style={{ left: 192, top: 3, width: 1, height: 14 }} />
      <span className="absolute bg-sep" style={{ left: 386, top: 3, width: 1, height: 14 }} />
    </div>
  );
}
