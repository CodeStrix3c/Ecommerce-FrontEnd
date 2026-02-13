import React, { useEffect, useState, useCallback, useRef } from "react";
import { ChevronDown, Search, RotateCcw, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FilterSection = ({ title, onClear, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-gray-100 py-6">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 group"
        >
          <ChevronDown
            size={14}
            className={`transition-transform duration-500 text-black ${isOpen ? "" : "-rotate-90 text-gray-400"}`}
          />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-black">
            {title}
          </span>
        </button>
        {onClear && (
          <button
            onClick={onClear}
            className="text-[10px] font-medium text-gray-400 hover:text-black uppercase tracking-widest transition-colors underline underline-offset-4"
          >
            Reset
          </button>
        )}
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
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
  selectedCategory = "",
}) => {
  const [catSearch, setCatSearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");

  const userHasSetPriceRef = useRef(false);
  const isInitialMountRef = useRef(true);
  const debounceTimer = useRef(null);

  const [localPriceRange, setLocalPriceRange] = useState({
    minPrice: priceLimits?.min || 0,
    maxPrice: priceLimits?.max || 50000,
  });

  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: priceLimits?.min || 0,
    maxPrice: priceLimits?.max || 50000,
  });

  const latestFiltersRef = useRef(filters);

  useEffect(() => {
    latestFiltersRef.current = filters;
  }, [filters]);

  useEffect(() => {
    if (selectedCategory) {
      setFilters((prev) => ({ ...prev, category: selectedCategory }));
    }
  }, [selectedCategory]);

  useEffect(() => {
    if (priceLimits) {
      if (isInitialMountRef.current || !userHasSetPriceRef.current) {
        setLocalPriceRange({
          minPrice: priceLimits.min,
          maxPrice: priceLimits.max,
        });
        setFilters((prev) => ({
          ...prev,
          minPrice: priceLimits.min,
          maxPrice: priceLimits.max,
        }));
        if (isInitialMountRef.current) isInitialMountRef.current = false;
      }
    }
  }, [priceLimits?.min, priceLimits?.max]);

  const debouncedPriceUpdate = useCallback(
    (minPrice, maxPrice) => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
      debounceTimer.current = setTimeout(() => {
        const updated = { ...latestFiltersRef.current, minPrice, maxPrice };
        setFilters(updated);
        onChange?.(updated);
      }, 1000);
    },
    [onChange],
  );

  const updateFilter = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);
    onChange?.(updated);
  };

  const handlePriceChange = useCallback(
    (type, value) => {
      const numValue = Number(value);
      userHasSetPriceRef.current = true;
      setLocalPriceRange((prev) => {
        if (type === "min" && numValue >= prev.maxPrice - 500) return prev;
        if (type === "max" && numValue <= prev.minPrice + 500) return prev;
        const newRange = {
          ...prev,
          [type === "min" ? "minPrice" : "maxPrice"]: numValue,
        };
        debouncedPriceUpdate(newRange.minPrice, newRange.maxPrice);
        return newRange;
      });
    },
    [debouncedPriceUpdate],
  );

  const clearAll = () => {
    userHasSetPriceRef.current = false;
    const cleared = {
      category: "",
      brand: "",
      minPrice: priceLimits.min,
      maxPrice: priceLimits.max,
    };
    setFilters(cleared);
    setLocalPriceRange({
      minPrice: priceLimits.min,
      maxPrice: priceLimits.max,
    });
    setCatSearch("");
    setBrandSearch("");
    onChange?.(cleared);
  };

  const getPercentage = (value, min, max) => {
    if (max === min) return 0;
    return ((value - min) / (max - min)) * 100;
  };

  const isPriceFiltered =
    localPriceRange.minPrice !== priceLimits.min ||
    localPriceRange.maxPrice !== priceLimits.max;

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-md z-[70] lg:hidden"
          />
        )}
      </AnimatePresence>

      <div
        className={`
          fixed lg:relative
          h-full lg:h-[calc(100vh-4rem)]
          w-[250px] lg:w-full
          bg-white
          transition-all duration-700 cubic-bezier(0.4, 0, 0.2, 1)
          ${mobileOpen ? "translate-x-0 z-[80] shadow-[40px_0_80px_-20px_rgba(0,0,0,0.1)]" : "-translate-x-full lg:translate-x-0"}
          top-0 left-0 lg:left-auto
          flex flex-col border-r border-gray-50
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-end p-8 pb-6 shrink-0">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-black ">
              Filter
            </h3>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={clearAll}
              className="group flex items-center gap-2 text-[10px] font-bold text-gray-400 hover:text-black transition-all uppercase tracking-widest"
            >
              <RotateCcw
                size={12}
                className="group-hover:rotate-[-180deg] transition-transform duration-500"
              />
              Reset All
            </button>
            <button
              onClick={() => setMobileOpen(false)}
              className="lg:hidden text-black"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Content - Scroll Width None */}
        <div className="flex-1 overflow-y-auto px-8 no-scrollbar scroll-smooth">
          <div className="space-y-2">
            {/* Categories */}
            <FilterSection
              title="Collection"
              onClear={
                filters.category ? () => updateFilter("category", "") : null
              }
            >
              <div className="relative mb-4">
                <Search
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300"
                  size={14}
                />
                <input
                  type="text"
                  placeholder="Search collections..."
                  value={catSearch}
                  onChange={(e) => setCatSearch(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-100 focus:border-black text-[12px] py-2 pl-6 outline-none transition-all placeholder:text-gray-300 placeholder:italic"
                />
              </div>
              <ul className="max-h-60 overflow-y-auto pr-2 space-y-1 no-scrollbar">
                {availableCategories
                  .filter((c) =>
                    c.name.toLowerCase().includes(catSearch.toLowerCase()),
                  )
                  .map((c) => (
                    <li
                      key={c.id}
                      onClick={() => updateFilter("category", c.slug)}
                      className={`text-[12px] cursor-pointer py-2 px-1 transition-all flex justify-between items-center group ${
                        filters.category === c.slug
                          ? "text-black font-bold"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      <span className="relative">
                        {c.name}
                        {filters.category === c.slug && (
                          <motion.span
                            layoutId="activeCat"
                            className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-black rounded-full"
                          />
                        )}
                      </span>
                      <span className="text-[10px] opacity-40 group-hover:opacity-100 transition-opacity">
                        ({c.count})
                      </span>
                    </li>
                  ))}
              </ul>
            </FilterSection>

            {/* Brands */}
            <FilterSection
              title="Brands"
              onClear={filters.brand ? () => updateFilter("brand", "") : null}
            >
              <div className="relative mb-4">
                <Search
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300"
                  size={14}
                />
                <input
                  type="text"
                  placeholder="Find designer..."
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-100 focus:border-black text-[12px] py-2 pl-6 outline-none transition-all placeholder:text-gray-300 placeholder:italic"
                />
              </div>
              <ul className="max-h-60 overflow-y-auto pr-2 space-y-1 no-scrollbar">
                {availableBrands
                  .filter((b) =>
                    b.name.toLowerCase().includes(brandSearch.toLowerCase()),
                  )
                  .map((b) => (
                    <li
                      key={b.id}
                      onClick={() => updateFilter("brand", b.slug)}
                      className={`text-[12px] cursor-pointer py-2 px-1 transition-all flex justify-between items-center group ${
                        filters.brand === b.slug
                          ? "text-black font-bold"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      <span>{b.name}</span>
                      <span className="text-[10px] opacity-40">
                        ({b.count})
                      </span>
                    </li>
                  ))}
              </ul>
            </FilterSection>

            {/* Price */}
            <FilterSection
              title="Price Range"
              onClear={
                isPriceFiltered
                  ? () => handlePriceChange("min", priceLimits.min)
                  : null
              }
            >
              <div className="pt-2 pb-2 px-2">
                <div className="relative h-[2px] w-full bg-gray-100">
                  <div
                    className="absolute h-[8px] bg-black transition-all duration-300"
                    style={{
                      left: `${getPercentage(localPriceRange.minPrice, priceLimits.min, priceLimits.max)}%`,
                      right: `${100 - getPercentage(localPriceRange.maxPrice, priceLimits.min, priceLimits.max)}%`,
                    }}
                  />
                  <input
                    type="range"
                    min={priceLimits.min}
                    max={priceLimits.max}
                    step="500"
                    value={localPriceRange.minPrice}
                    onChange={(e) => handlePriceChange("min", e.target.value)}
                    className="absolute w-full -top-[7px] h-5 appearance-none bg-transparent pointer-events-none z-20 range-thumb-premium"
                  />
                  <input
                    type="range"
                    min={priceLimits.min}
                    max={priceLimits.max}
                    step="500"
                    value={localPriceRange.maxPrice}
                    onChange={(e) => handlePriceChange("max", e.target.value)}
                    className="absolute w-full -top-[7px] h-5 appearance-none  bg-transparent pointer-events-none z-30 range-thumb-premium"
                  />
                </div>
                <div className="flex justify-between items-center mt-3">
                  <div className="flex flex-col">
                    <span className="text-xs  text-black">
                      ₹{localPriceRange.minPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-xs  text-black">
                      ₹{localPriceRange.maxPrice.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            </FilterSection>
          </div>
        </div>
      </div>

      <style>{`
        /* Hide scrollbars for all browsers */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        /* Premium Range Slider Styling */
        .range-thumb-premium {
          -webkit-appearance: none;
          pointer-events: none;
        }

        .range-thumb-premium::-webkit-slider-thumb {
          -webkit-appearance: none;
          pointer-events: auto;
          height: 18px;
          width: 18px;
          border-radius: 50%; /* Square for premium look */
          background: #000;
          border: 2px solid #fff;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          cursor: pointer;
        }

        .range-thumb-premium::-moz-range-thumb {
          pointer-events: auto;
          height: 18px;
          width: 18px;
          border-radius: 0;
          background: #000;
          border: 2px solid #fff;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          cursor: pointer;
        }
      `}</style>
    </>
  );
};

export default AdvancedFilter;
