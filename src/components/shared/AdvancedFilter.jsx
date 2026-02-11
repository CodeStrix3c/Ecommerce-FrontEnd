import React, { useEffect, useState } from "react";
import { ChevronDown, Search, RotateCcw, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FilterSection = ({ title, onClear, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-4">
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 group"
        >
          <ChevronDown
            size={14}
            className={`transition-transform duration-300 ${isOpen ? "" : "-rotate-90 text-gray-400"}`}
          />
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-800">
            {title}
          </span>
        </button>
        {onClear && (
          <button
            onClick={onClear}
            className="text-[9px] font-bold text-orange-600 hover:text-orange-700 uppercase tracking-tighter"
          >
            Clear
          </button>
        )}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const AdvancedFilter = ({
  availableBrands = [],
  availableCategories = [],
  priceLimits = { min: 0, max: 50000 },
  onChange,
  mobileOpen = false,
  setMobileOpen,
}) => {
  const [catSearch, setCatSearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");

  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: priceLimits?.min || 0,
    maxPrice: priceLimits?.max || 50000,
  });

  useEffect(() => {
    if (priceLimits) {
      setFilters((prev) => ({
        ...prev,
        minPrice: priceLimits.min,
        maxPrice: priceLimits.max,
      }));
    }
  }, [priceLimits?.min, priceLimits?.max]);

  const updateFilter = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onChange?.(updated);
  };

  const clearAll = () => {
    const cleared = {
      category: "",
      brand: "",
      minPrice: priceLimits.min,
      maxPrice: priceLimits.max,
    };
    setFilters(cleared);
    setCatSearch("");
    setBrandSearch("");
    onChange?.(cleared);
  };

  const getPercentage = (value, min, max) => {
    return ((value - min) / (max - min)) * 100;
  };

  return (
    <>
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[70] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Main Filter Sidebar */}
      <div
        className={`
          fixed lg:relative
          h-full lg:h-[calc(100vh-6rem)]
          w-[280px] lg:w-full
          bg-white
          transition-transform duration-500 ease-in-out
          ${mobileOpen ? "translate-x-0 z-[80] shadow-2xl" : "-translate-x-full lg:translate-x-0"}
          top-0 left-0 lg:-top-6 lg:left-auto
          flex flex-col
        `}
      >
        {/* Header - Fixed */}
        <div className="flex justify-between items-center p-6 border-b border-gray-100 shrink-0">
          <h3 className="text-sm font-black uppercase tracking-widest text-black">
            Filters
          </h3>
          <div className="flex items-center gap-3">
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 text-[10px] font-black text-gray-400 hover:text-black transition-colors"
            >
              <RotateCcw size={12} /> CLEAR ALL
            </button>
            {/* Close button for mobile */}
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden p-1 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-6 custom-scrollbar">
          <div className="space-y-2 py-2">
            {/* Categories */}
            <FilterSection
              title="Categories"
              onClear={() => updateFilter("category", "")}
            >
              <div className="relative my-3">
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={14}
                />
                <input
                  type="text"
                  placeholder="Find category..."
                  value={catSearch}
                  onChange={(e) => setCatSearch(e.target.value)}
                  className="w-full bg-gray-100/50 border border-transparent focus:border-gray-200 text-[12px] p-2.5 pl-9 rounded-lg outline-none transition-all"
                />
              </div>
              <ul className="max-h-40 overflow-y-auto pr-2 space-y-1 custom-scrollbar">
                {availableCategories
                  .filter((c) =>
                    c.name.toLowerCase().includes(catSearch.toLowerCase()),
                  )
                  .map((c) => (
                    <li
                      key={c.id}
                      onClick={() => updateFilter("category", c.slug)}
                      className={`text-[12px] cursor-pointer px-3 py-2 rounded-lg transition-all flex justify-between items-center ${
                        filters.category === c.slug
                          ? "bg-black text-white font-bold"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span>{c.name}</span>
                      <span
                        className={`text-[10px] ${filters.category === c.slug ? "text-white/60" : "text-gray-400"}`}
                      >
                        {c.count}
                      </span>
                    </li>
                  ))}
              </ul>
            </FilterSection>

            {/* Brands */}
            <FilterSection
              title="Brands"
              onClear={() => updateFilter("brand", "")}
            >
              <div className="relative my-3">
                <Search
                  className="absolute left-3 top-2.5 text-gray-400"
                  size={14}
                />
                <input
                  type="text"
                  placeholder="Find brand..."
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full bg-gray-100/50 border border-transparent focus:border-gray-200 text-[12px] p-2.5 pl-9 rounded-lg outline-none transition-all"
                />
              </div>
              <ul className="max-h-40 overflow-y-auto pr-2 space-y-1 custom-scrollbar">
                {availableBrands
                  .filter((b) =>
                    b.name.toLowerCase().includes(brandSearch.toLowerCase()),
                  )
                  .map((b) => (
                    <li
                      key={b.id}
                      onClick={() => updateFilter("brand", b.slug)}
                      className={`text-[12px] cursor-pointer px-3 py-2 rounded-lg transition-all flex justify-between items-center ${
                        filters.brand === b.slug
                          ? "bg-black text-white font-bold"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <span>{b.name}</span>
                      <span
                        className={`text-[10px] ${filters.brand === b.slug ? "text-white/60" : "text-gray-400"}`}
                      >
                        {b.count}
                      </span>
                    </li>
                  ))}
              </ul>
            </FilterSection>

            {/* Price Range Slider */}
            <FilterSection title="Price Range">
              <div className="pt-8 pb-4 px-2">
                <div className="relative h-1.5 w-full bg-gray-200 rounded-full">
                  {/* Active Range Track */}
                  <div
                    className="absolute h-1.5 bg-black rounded-full transition-all duration-150"
                    style={{
                      left: `${getPercentage(filters.minPrice, priceLimits.min, priceLimits.max)}%`,
                      right: `${100 - getPercentage(filters.maxPrice, priceLimits.min, priceLimits.max)}%`,
                    }}
                  />

                  {/* Min Range Input */}
                  <input
                    type="range"
                    min={priceLimits.min}
                    max={priceLimits.max}
                    step="100"
                    value={filters.minPrice}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value < filters.maxPrice - 500) {
                        updateFilter("minPrice", value);
                      }
                    }}
                    className="absolute w-full top-0 h-1.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto z-20 range-thumb"
                  />

                  {/* Max Range Input */}
                  <input
                    type="range"
                    min={priceLimits.min}
                    max={priceLimits.max}
                    step="100"
                    value={filters.maxPrice}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      if (value > filters.minPrice + 500) {
                        updateFilter("maxPrice", value);
                      }
                    }}
                    className="absolute w-full top-0 h-1.5 appearance-none bg-transparent pointer-events-none [&::-webkit-slider-thumb]:pointer-events-auto [&::-moz-range-thumb]:pointer-events-auto z-30 range-thumb"
                  />
                </div>

                <div className="flex justify-between mt-1 gap-2">
                  <div className="">
                    {/* <span className="block text-[8px] text-gray-400 font-black uppercase mb-0.5">
                      From
                    </span> */}
                    <span className="text-[12px] font-black text-black">
                      ₹{filters.minPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="">
                    {/* <span className="block text-[8px] text-gray-400 font-black uppercase mb-0.5">
                      To
                    </span> */}
                    <span className="text-[12px] font-black text-black">
                      ₹{filters.maxPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </FilterSection>
          </div>
        </div>
      </div>

      <style jsx>{`
        .range-thumb::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
          transition: all 0.15s ease;
        }

        .range-thumb::-webkit-slider-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.35);
        }

        .range-thumb::-webkit-slider-thumb:active {
          transform: scale(1.05);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .range-thumb::-moz-range-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #000;
          cursor: pointer;
          border: 3px solid #fff;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.25);
          transition: all 0.15s ease;
        }

        .range-thumb::-moz-range-thumb:hover {
          transform: scale(1.15);
          box-shadow: 0 3px 12px rgba(0, 0, 0, 0.35);
        }

        .range-thumb::-moz-range-thumb:active {
          transform: scale(1.05);
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e5e5e5;
          border-radius: 10px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #d4d4d4;
        }
      `}</style>
    </>
  );
};

export default AdvancedFilter;
