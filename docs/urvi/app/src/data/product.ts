/**
 * Product data for the URVI PDP.
 *
 * Copy is reproduced verbatim from the approved comp, including its corrupted
 * placeholder strings ("3 Moeths", "Onigberry", "Divepy Targerst Bumds"). See
 * design.md §9 for the full list of slots awaiting real copy. Prices are in
 * cents so arithmetic stays exact.
 */

export type Money = number; // cents

export type SupplyTier = {
  id: string;
  label: string;
  servings: string;
  price: Money;
  note: string;
  badge?: string;
};

export type Flavor = {
  id: string;
  name: string;
  swatch: [string, string];
  inStock: boolean;
};

export type AddOn = {
  id: string;
  name: string;
  sub: string;
  price: Money;
  note: string;
  art: "box" | "bottle" | "tube";
};

export type GalleryItem = {
  id: string;
  kind: "pouch" | "chews" | "chew" | "blueberry" | "cream" | "botanical";
  alt: string;
};

export const supplyTiers: SupplyTier[] = [
  { id: "t1", label: "1 Pouch",   servings: "1 Pouch / 30 Servings",    price: 4990,  note: "Subscribe to Save" },
  { id: "t2", label: "3 Moeths",  servings: "3 Pouches / 90 Servings",  price: 12020, note: "Save 10%" },
  { id: "t3", label: "0 Ruistna", servings: "6 Pouches / 180 Servings", price: 22990, note: "Save 18%", badge: "Save 18%" },
];

export const flavors: Flavor[] = [
  { id: "f1", name: "Original Berry", swatch: ["#F49AA3", "#C74C5A"], inStock: true },
  { id: "f2", name: "Onigberry",      swatch: ["#DAD5E8", "#A9A2C4"], inStock: true },
  { id: "f3", name: "Cleoo",          swatch: ["#F8D57C", "#E0A32F"], inStock: true },
  { id: "f4", name: "Noanrartaco",    swatch: ["#EE8272", "#C13F31"], inStock: true },
];

export const addOns: AddOn[] = [
  { id: "a1", name: "Divepy Targerst Bumds", sub: "",           price: 2900, note: "Excto Oithe", art: "box" },
  { id: "a2", name: "Deers Serry",           sub: "7 bems",     price: 1000, note: "Save",        art: "bottle" },
  { id: "a3", name: "Ginlg Goamste",         sub: "☐  Bukitts", price: 2400, note: "Sova",        art: "tube" },
];

export const gallery: GalleryItem[] = [
  { id: "g1", kind: "pouch",     alt: "URVI Brain Support Chews pouch, front" },
  { id: "g2", kind: "chews",     alt: "Loose berry chews, grouped" },
  { id: "g3", kind: "chew",      alt: "Single berry chew, close up" },
  { id: "g4", kind: "blueberry", alt: "Blueberries" },
  { id: "g5", kind: "cream",     alt: "Cream pour" },
  { id: "g6", kind: "botanical", alt: "Botanical ingredients" },
];

export const claims = [
  { id: "c1", icon: "target", label: "Improve Focs & Comy™" },
  { id: "c2", icon: "bolt",   label: "Enhance Mental Clarity*" },
  { id: "c3", icon: "minus",  label: "Boost Daily Energy" },
];

export const benefits = [
  { id: "b1", x: 9,   icon: "target",  title: "Support Feerth Wards",   lines: ["Ounteror losoen't asocen Ploo", "Gen Bnnring Gyotemin"] },
  { id: "b2", x: 154, icon: "droplet", title: "Cenxina Favers Enssj",   lines: ["Coumeoentiruoise Fur an its", "Cerine Enve Fael"] },
  { id: "b3", x: 287, icon: "link",    title: "Dusartamental Bagreci",  lines: ["Cirefousemt inaognnan", "Enved Dart povoaerinon"] },
  { id: "b4", x: 424, icon: "shield",  title: "Toms & L4ts Canoidy",    lines: ["Copuprilgun gulla ternners olen", "Glorea Bnm aordpri gracittpsm"] },
];

export const trust = [
  { id: "u1", x: 0,   icon: "clock",  label: "30-Day Money Back Guarantee" },
  { id: "u2", x: 232, icon: "lock",   label: "Secure Checkout" },
  { id: "u3", x: 426, icon: "chat",   label: "Direct Support" },
];

export const navLinks = ["Shop", "Scores", "Ingredients", "About", "Reviews"];

export const product = {
  name: "URVI Brain Support Chews",
  lede: "Daily focus, clarity, and mental energy.",
  announcement: "FREE SHIPPING ON ALL ORDERS OVER $50",
};
