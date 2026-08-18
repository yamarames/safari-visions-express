import * as React from "react";

type P = { size?: number; className?: string };
const S = "#C6D4E6";

const wrap = (size: number, className: string | undefined, children: React.ReactNode) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
    {children}
  </svg>
);

export const IconTarget = ({ size = 22, className }: P) =>
  wrap(size, className, <>
    <circle cx="12" cy="12" r="9.2" stroke={S} strokeWidth="1.3" />
    <circle cx="12" cy="12" r="4.4" stroke={S} strokeWidth="1.3" />
    <circle cx="12" cy="12" r="1.5" fill={S} />
  </>);

export const IconDroplet = ({ size = 22, className }: P) =>
  wrap(size, className, <>
    <circle cx="12" cy="12" r="9.2" stroke={S} strokeWidth="1.3" />
    <path d="M12 6.4c2.4 2.7 3.7 4.6 3.7 6.3a3.7 3.7 0 1 1-7.4 0c0-1.7 1.3-3.6 3.7-6.3Z" stroke={S} strokeWidth="1.3" strokeLinejoin="round" />
  </>);

export const IconLink = ({ size = 22, className }: P) =>
  wrap(size, className, <>
    <circle cx="12" cy="12" r="9.2" stroke={S} strokeWidth="1.3" />
    <circle cx="8.6" cy="12" r="2.7" stroke={S} strokeWidth="1.3" />
    <circle cx="15.4" cy="12" r="2.7" stroke={S} strokeWidth="1.3" />
    <path d="M11.3 12h1.4" stroke={S} strokeWidth="1.3" />
  </>);

export const IconShield = ({ size = 22, className }: P) =>
  wrap(size, className, <>
    <circle cx="12" cy="12" r="9.2" stroke={S} strokeWidth="1.3" />
    <path d="M12 6.6c2.9 1.9 4.6 3.6 4.6 6a4.6 4.6 0 0 1-9.2 0c0-2.4 1.7-4.1 4.6-6Z" stroke={S} strokeWidth="1.3" strokeLinejoin="round" />
    <path d="M12 10v5" stroke={S} strokeWidth="1.3" strokeLinecap="round" />
  </>);

export const IconClock = ({ size = 17, className }: P) =>
  wrap(size, className, <>
    <circle cx="12" cy="12" r="9.2" stroke={S} strokeWidth="1.5" />
    <path d="M12 7v5.2l3.4 2" stroke={S} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </>);

export const IconLock = ({ size = 17, className }: P) =>
  wrap(size, className, <>
    <rect x="4.6" y="10.4" width="14.8" height="10" rx="2.2" stroke={S} strokeWidth="1.5" />
    <path d="M8.2 10.2V7.8a3.8 3.8 0 0 1 7.6 0v2.4" stroke={S} strokeWidth="1.5" strokeLinecap="round" />
  </>);

export const IconChat = ({ size = 17, className }: P) =>
  wrap(size, className,
    <path d="M20.4 14.2a2.6 2.6 0 0 1-2.6 2.6H8.4L4.2 20V6.6A2.6 2.6 0 0 1 6.8 4h11a2.6 2.6 0 0 1 2.6 2.6v7.6Z" stroke={S} strokeWidth="1.5" strokeLinejoin="round" />);

const C = "#BCCBDF";
export const IconClaimTarget = ({ size = 14, className }: P) =>
  wrap(size, className, <>
    <circle cx="12" cy="12" r="9.4" stroke={C} strokeWidth="1.7" />
    <circle cx="12" cy="12" r="4" stroke={C} strokeWidth="1.7" />
    <path d="M12 2.6v3.4M12 18v3.4" stroke={C} strokeWidth="1.7" strokeLinecap="round" />
  </>);

export const IconClaimBolt = ({ size = 14, className }: P) =>
  wrap(size, className,
    <path d="M13.6 2.4 4.5 13.7h6.2l-1.3 8 9.1-11.3h-6.2l1.3-8Z" stroke={C} strokeWidth="1.7" strokeLinejoin="round" />);

export const IconClaimMinus = ({ size = 14, className }: P) =>
  wrap(size, className, <>
    <circle cx="12" cy="12" r="9.4" stroke={C} strokeWidth="1.7" />
    <path d="M7.6 12h8.8" stroke={C} strokeWidth="1.7" strokeLinecap="round" />
  </>);

export const IconUser = ({ size = 21, className }: P) =>
  wrap(size, className, <>
    <path d="M20 21v-1.8a4.2 4.2 0 0 0-4.2-4.2H8.2A4.2 4.2 0 0 0 4 19.2V21" stroke="#DCE6F4" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="7.2" r="4.2" stroke="#DCE6F4" strokeWidth="1.7" />
  </>);

export const IconCart = ({ size = 22, className, color = "#DCE6F4" }: P & { color?: string }) =>
  wrap(size, className, <>
    <circle cx="9.5" cy="20" r="1.7" fill={color} />
    <circle cx="18.5" cy="20" r="1.7" fill={color} />
    <path d="M2.5 3.2h2.3l2.5 11.6a1.9 1.9 0 0 0 1.9 1.5h9a1.9 1.9 0 0 0 1.9-1.5L21.5 7.4H6" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
  </>);

export const IconSparkle = ({ size = 26, className }: P) =>
  wrap(size, className,
    <path d="M12 1.6c.9 5.6 3.9 8.6 9.5 9.5-5.6.9-8.6 3.9-9.5 9.5-.9-5.6-3.9-8.6-9.5-9.5 5.6-.9 8.6-3.9 9.5-9.5Z" fill="#94A6BE" />);

export const benefitIcon = { target: IconTarget, droplet: IconDroplet, link: IconLink, shield: IconShield } as const;
export const trustIcon = { clock: IconClock, lock: IconLock, chat: IconChat } as const;
export const claimIcon = { target: IconClaimTarget, bolt: IconClaimBolt, minus: IconClaimMinus } as const;
