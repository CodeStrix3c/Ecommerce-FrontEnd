import {
  Home,
  Shirt,
  Hammer,
  HardHat,
  Wheat,
  Droplets,
  Trees,
} from "lucide-react";

export const NAVBAR_TABS = [
  {
    name: "Home",
    path: "/home",
    icon: Home,
    activeColor: "text-[var(--color-secondary)]",
  },
  {
    name: "Textiles",
    path: "/textitles",
    icon: Shirt,
    activeColor: "text-[var(--color-secondary)]",
  },
  {
    name: "WoodCraft",
    path: "/wood-craft",
    icon: Hammer,
    activeColor: "text-[var(--color-secondary)]",
   
  },
  {
    name: "Metals",
    path: "/metal-craft",
    icon: HardHat,
    activeColor: "text-[var(--color-secondary)]",
  

  },
];

export const SIDEBAR_TABS = [
  {
    name: "Orchards",
    path: "/orchards",
    icon: Trees,
  },
  {
    name: "Harvest",
    path: "/harvest",
    icon: Wheat,
  },
  {
    name: "Spray",
    path: "/spray",
    icon: Droplets,
  },
];
