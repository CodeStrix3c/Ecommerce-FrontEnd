import React, { useEffect, useState, useCallback, useRef } from "react";
import { ChevronDown, Search, RotateCcw, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";

const FilterSection = ({ title, onClear, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100/70 py-7">
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 group"
        >
          <ChevronDown
            size={14}
            className={`transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              isOpen ? "rotate-0 text-black" : "-rotate-90 text-gray-400"
            }`}
          />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-black">
            {title}
          </span>
        </button>

        {onClear && (
          <button
            onClick={onClear}
            className="text-[10px] font-medium text-gray-400 hover:text-black uppercase tracking-[0.18em] transition-colors underline underline-offset-4 decoration-gray-300 hover:decoration-black"
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
            transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
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
  const [params] = useSearchParams();
  const categoryFromURL = params.get("category");

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

  /* ✅ Sync category with Navbar / URL */
  useEffect(() => {
    const category = categoryFromURL || selectedCategory;

    if (!category) return;

    const exists = availableCategories.some(
      (c) => c.slug.toLowerCase() === category.toLowerCase()
    );

    if (exists) {
      setFilters((prev) => ({
        ...prev,
        category: category.toLowerCase(),
      }));
    } else {
      setFilters((prev) => ({
        ...prev,
        category: "",
      }));
    }
  }, [categoryFromURL, selectedCategory, availableCategories]);

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
    [onChange]
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
    [debouncedPriceUpdate]
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
        className={`fixed lg:relative
        h-full lg:h-[calc(100vh-4rem)]
        w-[260px] lg:w-full
        bg-white
        transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]
        ${
          mobileOpen
            ? "translate-x-0 z-[80] shadow-[40px_0_80px_-20px_rgba(0,0,0,0.12)]"
            : "-translate-x-full lg:translate-x-0"
        }
        top-0 left-0 lg:left-auto
        flex flex-col border-r border-gray-100`}
      >
        {/* HEADER */}
        <div className="px-8 mt-[-6px] pb-2">
          <h2 className="text-lg font-semibold text-black">
            Advanced Filter
          </h2>
          <p className="text-xs text-gray-400">
            Refine your search results
          </p>
        </div>

        {/* CONTROLS */}
        <div className="flex justify-between items-end px-8 pt-4 pb-6 shrink-0 border-b border-gray-100">
          <h3 className="text-sm font-bold uppercase tracking-[0.35em] text-black">
            Filter
          </h3>

          <div className="flex items-center gap-4">
            <button
              onClick={clearAll}
              className="group flex items-center gap-2 text-[10px] font-semibold text-gray-600 hover:text-black transition-all uppercase tracking-[0.2em]"
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

        {/* FILTER BODY */}
        <div className="flex-1 overflow-y-auto px-8 no-scrollbar scroll-smooth">
          <div className="space-y-3">

            {/* CATEGORY */}
            <FilterSection
              title="Collection"
              onClear={
                filters.category ? () => updateFilter("category", "") : null
              }
            >
              <div className="relative mb-5">
                <Search
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300"
                  size={14}
                />
                <input
                  type="text"
                  placeholder="Search collections..."
                  value={catSearch}
                  onChange={(e) => setCatSearch(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-200 focus:border-black text-[13px] font-medium py-2.5 pl-6 outline-none"
                />
              </div>

              <ul className="max-h-60 overflow-y-auto pr-2 space-y-2 no-scrollbar">
                {availableCategories
                  .filter((c) =>
                    c.name.toLowerCase().includes(catSearch.toLowerCase())
                  )
                  .map((c) => (
                    <li
                      key={c.id}
                      onClick={() => updateFilter("category", c.slug)}
                      className={`text-[13px] cursor-pointer py-2 flex justify-between ${
                        filters.category.toLowerCase() ===
                        c.slug.toLowerCase()
                          ? "text-black font-semibold"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      <span>{c.name}</span>
                      <span className="text-[11px] opacity-40">
                        ({c.count})
                      </span>
                    </li>
                  ))}
              </ul>
            </FilterSection>

            {/* BRAND */}
            <FilterSection
              title="Brands"
              onClear={filters.brand ? () => updateFilter("brand", "") : null}
            >
              <div className="relative mb-5">
                <Search
                  className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300"
                  size={14}
                />
                <input
                  type="text"
                  placeholder="Find designer..."
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  className="w-full bg-transparent border-b border-gray-200 focus:border-black text-[13px] font-medium py-2.5 pl-6 outline-none"
                />
              </div>

              <ul className="max-h-60 overflow-y-auto pr-2 space-y-2 no-scrollbar">
                {availableBrands
                  .filter((b) =>
                    b.name.toLowerCase().includes(brandSearch.toLowerCase())
                  )
                  .map((b) => (
                    <li
                      key={b.id}
                      onClick={() => updateFilter("brand", b.slug)}
                      className={`text-[13px] cursor-pointer py-2 flex justify-between ${
                        filters.brand === b.slug
                          ? "text-black font-semibold"
                          : "text-gray-500 hover:text-black"
                      }`}
                    >
                      <span>{b.name}</span>
                      <span className="text-[11px] opacity-40">
                        ({b.count})
                      </span>
                    </li>
                  ))}
              </ul>
            </FilterSection>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdvancedFilter;