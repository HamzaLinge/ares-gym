import { twMerge } from "tailwind-merge";
import { clsx } from "clsx";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function getGridColumnValue(hour) {
  if (typeof hour !== "number") return "auto";
  const base = 7; // Means 07h00, time the gym opens
  if (hour < base) return "auto";
  return String((hour - base) * 2 + 1);
}
