import elephants from "@/assets/safari-elephants.jpg";
import lion from "@/assets/safari-lion.jpg";
import giraffe from "@/assets/safari-giraffe.jpg";
import cheetah from "@/assets/safari-cheetah.jpg";
import beach from "@/assets/zanzibar-beach.jpg";
import stoneTown from "@/assets/stone-town.jpg";
import spice from "@/assets/spice-tour.jpg";
import turtle from "@/assets/turtle-snorkel.jpg";
import type { Tour } from "@/components/TourCard";

// High-quality safari video from public CDN - shows African wildlife and landscape
export const heroVideoUrl = "https://videos.pexels.com/video-files/856356/856356-hd_1920_1080_30fps.mp4";

export const featuredSafaris: Tour[] = [
  { slug: "serengeti", title: "Serengeti Big Five", subtitle: "Track lion, leopard, elephant, buffalo and rhino across the endless plains.", image: lion, tag: "Bestseller", duration: "7 days", price: "$2,890", location: "Serengeti, TZ" },
  { slug: "ngorongoro", title: "Ngorongoro Crater", subtitle: "A self-contained ecosystem inside the world's largest intact volcanic caldera.", image: elephants, tag: "Iconic", duration: "3 days", price: "$1,290", location: "Ngorongoro, TZ" },
  { slug: "tarangire", title: "Tarangire Elephants", subtitle: "Ancient baobabs and the largest elephant herds in northern Tanzania.", image: giraffe, duration: "2 days", price: "$890", location: "Tarangire, TZ" },
  { slug: "selous", title: "Nyerere Wild River", subtitle: "Boat and walking safari through one of Africa's largest protected wildernesses.", image: cheetah, tag: "Adventure", duration: "5 days", price: "$2,150", location: "Nyerere NP, TZ" },
];

export const islandEscapes: Tour[] = [
  { slug: "nungwi", title: "Nungwi White Sands", subtitle: "Beach lounging, dhow sunset cruises and turquoise reef snorkeling.", image: beach, tag: "Bestseller", duration: "5 nights", price: "$1,180", location: "Nungwi, ZNZ" },
  { slug: "stonetown", title: "Stone Town Heritage", subtitle: "Carved doors, spice markets and Swahili-Arab architecture walking tour.", image: stoneTown, duration: "Half day", price: "$45", location: "Stone Town, ZNZ" },
  { slug: "spice", title: "Spice Farm Trail", subtitle: "Vanilla, clove and cardamom tasting on a working family-run plantation.", image: spice, duration: "Full day", price: "$60", location: "Kizimbani, ZNZ" },
  { slug: "mnemba", title: "Mnemba Atoll Snorkel", subtitle: "Swim with green turtles and reef fish on Zanzibar's most pristine reef.", image: turtle, tag: "Family", duration: "Full day", price: "$95", location: "Mnemba, ZNZ" },
];

export const editorial: Tour[] = [
  { slug: "honeymoon", title: "Honeymoon Edit", subtitle: "Private villas, candlelit beach dinners and a two-night bush escape.", image: beach, tag: "Curated", duration: "10 days", price: "$4,650", location: "TZ + ZNZ" },
  { slug: "luxury", title: "Luxury Tented Camps", subtitle: "Under-canvas glamour with private guides in the heart of the Serengeti.", image: cheetah, duration: "8 days", price: "$5,900", location: "Serengeti, TZ" },
  { slug: "family", title: "Family Adventures", subtitle: "Kid-friendly safaris paired with calm-water beaches and gentle wildlife.", image: giraffe, duration: "12 days", price: "$3,450", location: "TZ + ZNZ" },
  { slug: "photo", title: "Photographer's Cut", subtitle: "Golden-hour wildlife pursuits with custom 4x4s and expert spotters.", image: elephants, tag: "Pro", duration: "9 days", price: "$4,200", location: "Northern Circuit" },
];

export const allTours = [...featuredSafaris, ...islandEscapes, ...editorial];
