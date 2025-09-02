import React from 'react';
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
} from 'lucide-react';

const perkIcons = {
  'Free delivery': <Truck className="h-6 w-6 text-green-600" />,
  'Organic certified': <Leaf className="h-6 w-6 text-green-600" />,
  'COD available': <Wallet className="h-6 w-6 text-yellow-600" />,
  'Farm fresh': <Carrot className="h-6 w-6 text-orange-600" />,
  'No chemicals': <Droplet className="h-6 w-6 text-blue-600" />,
  'Protein-rich': <Nut className="text-brown-600 h-6 w-6" />,
  'Vacuum packed': <Package className="h-6 w-6 text-gray-600" />,
  'Zero cholesterol': <Heart className="h-6 w-6 text-red-600" />,
  'Rich in Vitamin C': <Apple className="h-6 w-6 text-red-500" />,
  'Vitamin rich': <Apple className="h-6 w-6 text-red-500" />,
  'Good for heart': <Heart className="h-6 w-6 text-red-500" />,
  'Good for brain': <ShieldCheck className="h-6 w-6 text-indigo-600" />,
  'Rich in antioxidants': <Grape className="h-6 w-6 text-purple-600" />,
  'Fast shipping': <Truck className="h-6 w-6 text-green-600" />,
  'Ready to eat': <ShoppingCart className="h-6 w-6 text-pink-600" />,
};

const PerksWidget = ({ perks }) => {
  if (!perks || perks.length === 0) return null;

  return (
    <div className="mt-4">
      <hr className="mb-5 border" />
      <p className="text-2xl font-semibold">Product Benefits</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {perks.map((perk) => (
          <div key={perk} className="flex items-center gap-4">
            {perkIcons[perk] || (
              <ShieldCheck className="h-6 w-6 text-gray-600" />
            )}
            <span className="capitalize">{perk}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PerksWidget;
