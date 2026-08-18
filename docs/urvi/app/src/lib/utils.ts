import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Cents → "$49.90". Always two decimals; prices must not reflow. */
export function money(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`;
}
