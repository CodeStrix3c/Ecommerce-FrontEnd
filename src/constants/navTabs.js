import { Home, Wheat, Droplets, Trees } from "lucide-react";

export const BASE_TABS = [
  {
    name: "Home",
    path: "/home",
    icon: Home,
    activeColor: "text-[var(--color-secondary)]",
  },
  {
    name: "Orchards",
    path: "/orchards",
    icon: Trees,
    activeColor: "text-[var(--color-secondary)]",
  },
  {
    name: "Harvest",
    path: "/harvest",
    icon: Wheat,
    activeColor: "text-[var(--color-secondary)]",
    badge: "NEW",
  },
  {
    name: "Spray",
    path: "/spray",
    icon: Droplets,
    activeColor: "text-[var(--color-secondary)]",
  },
];
