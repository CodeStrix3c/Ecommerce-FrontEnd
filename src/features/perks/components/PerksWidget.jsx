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
  if (!Array.isArray(perks) || perks.length === 0) return null;

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">GI Tagging</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {perks.map((perk, index) => (
          <div
            key={index}
            className="flex justify-between rounded-lg border p-3"
          >
            <span className="font-medium text-[var(--color-black)]">{perk.name}</span>

            <span className="text-[var(--color-black)]">{perk.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PerksWidget;
