import React from "react";
import {
  ShoppingBag,
  Truck,
  RefreshCcw,
  Package,
  Palette,
  Phone,
} from "lucide-react";
import SearchBar from "@/components/shared/SearchBar";

const helpCategories = [
  {
    title: "Orders & Payments",
    desc: "Track orders, payment issues, and order changes.",
    icon: <ShoppingBag size={28} />,
  },
  {
    title: "Shipping & Delivery",
    desc: "Delivery time, international shipping, and charges.",
    icon: <Truck size={28} />,
  },
  {
    title: "Returns & Refunds",
    desc: "Easy return process and refund policies.",
    icon: <RefreshCcw size={28} />,
  },
  {
    title: "Product Information",
    desc: "Materials, sizes, and handcrafted details.",
    icon: <Package size={28} />,
  },
  {
    title: "Custom Orders",
    desc: "Personalized handicrafts and bulk orders.",
    icon: <Palette size={28} />,
  },
  {
    title: "Contact Support",
    desc: "Reach our support team for any help.",
    icon: <Phone size={28} />,
  },
];

const HelpCenter = () => {
  return (
    <div className="min-h-screen border border-[var(--color-gray)] rounded-lg bg-[var(--color-white)]">
      
      {/* Header Section */}
      <div className="py-4 px-4 text-center text-[var(--color-black)]">
        <h1 className="text-3xl font-bold mb-4">Help Center</h1>
        <p className="mb-6 text-lg text-[var(--color-black)]">
          How can we help you with your handcrafted products?
        </p>

        {/* Search Bar */}
        <div className="flex justify-center max-w-xl mx-auto">
          <SearchBar />
        </div>
      </div>

      {/* Categories Section */}
      <div className="max-w-6xl mx-auto px-4 pb-10">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {helpCategories.map((item, index) => (
            <div
              key={index}
              className="bg-[var(--color-white)] p-6 rounded-xl border border-[var(--color-gray)]
              hover:shadow-md transition cursor-pointer"
            >
              <div className="text-[var(--color-secondary)] mb-4">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold mb-2 text-[var(--color-black)]">
                {item.title}
              </h3>

              <p className="text-sm text-[var(--color-black)]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      
      <div className="bg-[var(--color-white)] py-4 text-center border-t border-[var(--color-gray)]">
        <h3 className="text-xl font-semibold mb-2 text-[var(--color-black)]">
          Still need help?
        </h3>

        <p className="text-[var(--color-black)] mb-4">
          Our support team is here for you.
        </p>

        <button
          className="bg-[var(--color-secondary)] text-[var(--color-white)]
          px-6 py-3 rounded-lg transition
          hover:bg-[var(--color-secondary-hover)]"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default HelpCenter;