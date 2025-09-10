import React from "react";
import {
  Truck,
  Leaf,
  Wallet,
  ShieldCheck,
  Package,
  ShoppingCart,
  Apple,
  Grape,
  Nut,
  Carrot,
  Heart,
  Droplet,
} from "lucide-react";

const perkIcons = {
  "Free delivery": <Truck className="h-6 w-6 text-[var(--color-success)]" />,
  "Organic certified": <Leaf className="h-6 w-6 text-[var(--color-success)]" />,
  "COD available": <Wallet className="h-6 w-6 text-[var(--color-warning)]" />,
  "Farm fresh": (
    <Carrot className="h-6 w-6 text-[var(--color-accent-orange)]" />
  ),
  "No chemicals": <Droplet className="h-6 w-6 text-[var(--color-info)]" />,
  "Protein-rich": <Nut className="h-6 w-6 text-[var(--color-brown)]" />,
  "Vacuum packed": <Package className="h-6 w-6 text-[var(--color-neutral)]" />,
  "Zero cholesterol": <Heart className="h-6 w-6 text-[var(--color-danger)]" />,
  "Rich in Vitamin C": <Apple className="h-6 w-6 text-[var(--color-danger)]" />,
  "Vitamin rich": <Apple className="h-6 w-6 text-[var(--color-danger)]" />,
  "Good for heart": <Heart className="h-6 w-6 text-[var(--color-danger)]" />,
  "Good for brain": (
    <ShieldCheck className="h-6 w-6 text-[var(--color-indigo)]" />
  ),
  "Rich in antioxidants": (
    <Grape className="h-6 w-6 text-[var(--color-purple)]" />
  ),
  "Fast shipping": <Truck className="h-6 w-6 text-[var(--color-success)]" />,
  "Ready to eat": <ShoppingCart className="h-6 w-6 text-[var(--color-pink)]" />,
};

const PerksWidget = ({ perks }) => {
  if (!perks || perks.length === 0) return null;

  return (
    <div className="mt-4">
      <hr className="mb-5 border-[var(--color-border)]" />
      <p className="text-2xl font-semibold text-[var(--color-neutral-dark)]">
        Product Benefits
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {perks.map((perk) => (
          <div key={perk} className="flex items-center gap-4">
            {perkIcons[perk] || (
              <ShieldCheck className="h-6 w-6 text-[var(--color-neutral)]" />
            )}
            <span className="capitalize text-[var(--color-neutral-dark)]">
              {perk}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerksWidget;
