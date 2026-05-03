import elephants from "@/assets/safari-elephants.jpg";
import lion from "@/assets/safari-lion.jpg";
import giraffe from "@/assets/safari-giraffe.jpg";
import cheetah from "@/assets/safari-cheetah.jpg";
import beach from "@/assets/zanzibar-beach.jpg";
import stoneTown from "@/assets/stone-town.jpg";
import spice from "@/assets/spice-tour.jpg";
import turtle from "@/assets/turtle-snorkel.jpg";
import heroVideo from "@/assets/safari-hero.mp4.asset.json";
import type { TourCard } from "@/components/Card3D";

export const heroVideoUrl = heroVideo.url;

export const featuredSafaris: TourCard[] = [
  { slug: "serengeti", title: "Serengeti Big Five", subtitle: "7 days · Lion, Leopard, Elephant, Buffalo, Rhino", image: lion, tag: "Top pick" },
  { slug: "ngorongoro", title: "Ngorongoro Crater", subtitle: "3 days · World heritage caldera safari", image: elephants, tag: "Iconic" },
  { slug: "tarangire", title: "Tarangire Elephants", subtitle: "2 days · Baobab valleys & herds", image: giraffe },
  { slug: "selous", title: "Nyerere Wild River", subtitle: "5 days · Boat & walking safari", image: cheetah, tag: "Adventure" },
  { slug: "manyara", title: "Lake Manyara", subtitle: "1 day · Tree-climbing lions", image: lion },
];

export const islandEscapes: TourCard[] = [
  { slug: "nungwi", title: "Nungwi White Sands", subtitle: "Beach lounging & dhow sunsets", image: beach, tag: "Bestseller" },
  { slug: "stonetown", title: "Stone Town Heritage", subtitle: "Spice market & carved doors walk", image: stoneTown },
  { slug: "spice", title: "Spice Farm Trail", subtitle: "Vanilla, clove & cardamom tasting", image: spice },
  { slug: "mnemba", title: "Mnemba Snorkel", subtitle: "Swim with turtles & reef fish", image: turtle, tag: "Family" },
  { slug: "prison", title: "Prison Island Tortoises", subtitle: "Half-day boat & island tour", image: beach },
];

export const editorial: TourCard[] = [
  { slug: "honeymoon", title: "Honeymoon Edit", subtitle: "Private villas, candlelit beaches", image: beach, tag: "Curated" },
  { slug: "luxury", title: "Luxury Tented Camps", subtitle: "Under-canvas glamour in the bush", image: cheetah },
  { slug: "family", title: "Family Adventures", subtitle: "Kid-friendly safaris & beaches", image: giraffe },
  { slug: "photo", title: "Photographer's Cut", subtitle: "Golden hour wildlife pursuits", image: elephants, tag: "Pro" },
  { slug: "budget", title: "Backpacker Routes", subtitle: "Smart budget itineraries", image: stoneTown },
];

export const allTours = [...featuredSafaris, ...islandEscapes, ...editorial];
