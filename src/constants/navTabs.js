import { Home, Shirt, Hammer, HardHat } from "lucide-react";

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
    children: [
      { name: "Cotton", path: "/textiles/cotton" },
      { name: "Silk", path: "/textiles/silk" },
      { name: "Handloom", path: "/textiles/handloom" },
    ],
  },
  {
    name: "WoodCraft",
    path: "/wood-craft",
    icon: Hammer,
    activeColor: "text-[var(--color-secondary)]",
    children: [
      { name: "Furniture", path: "/wood-craft/furniture" },
      { name: "Decor", path: "/wood-craft/decor" },
      { name: "Hand Carving", path: "/wood-craft/carving" },
    ],
  },
  {
    name: "Metals",
    path: "/metal-craft",
    icon: HardHat,
    activeColor: "text-[var(--color-secondary)]",
    children: [
      { name: "Brass", path: "/metal-craft/brass" },
      { name: "Copper", path: "/metal-craft/copper" },
      { name: "Iron Art", path: "/metal-craft/iron" },
    ],
  },
];
