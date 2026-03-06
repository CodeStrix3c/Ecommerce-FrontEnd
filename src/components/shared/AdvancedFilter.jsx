import React, { useEffect, useState, useRef } from "react";
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
            className={`transition-all duration-500 ${
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
            className="text-[10px] font-medium text-gray-400 hover:text-black uppercase tracking-[0.18em]"
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
            transition={{ duration: 0.45 }}
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

  const [searchParams, setSearchParams] = useSearchParams();

  const [localPriceRange, setLocalPriceRange] = useState({
    minPrice: priceLimits.min,
    maxPrice: priceLimits.max,
  });

  const [filters, setFilters] = useState({
    category: "",
    brand: "",
    minPrice: priceLimits.min,
    maxPrice: priceLimits.max,
  });

  const debounceRef = useRef(null);

  /* -------- CATEGORY HELPERS -------- */

  const parentCategories = availableCategories.filter(
    (c) => c.parentId === null
  );

  const getSubCategories = (parentId) =>
    availableCategories.filter((c) => c.parentId === parentId);

  const isParentActive = (parent) => {
    if (filters.category === parent.slug) return true;

    const children = getSubCategories(parent.id);
    return children.some((child) => child.slug === filters.category);
  };

  /* -------- SYNC WITH URL -------- */

  useEffect(() => {
    const category = searchParams.get("category") || "";
    const brand = searchParams.get("brand") || "";

    const minPrice =
      Number(searchParams.get("minPrice")) || priceLimits.min;
    const maxPrice =
      Number(searchParams.get("maxPrice")) || priceLimits.max;

    const updated = {
      category,
      brand,
      minPrice,
      maxPrice,
    };

    setFilters(updated);
    setLocalPriceRange({
      minPrice,
      maxPrice,
    });

  }, [searchParams, priceLimits.min, priceLimits.max]);

  /* ---------------------------------- */

  const getPercentage = (value, min, max) => {
    if (max === min) return 0;
    return ((value - min) / (max - min)) * 100;
  };

  const updateFilter = (key, value) => {
    const updated = { ...filters, [key]: value };
    setFilters(updated);

    const params = new URLSearchParams(searchParams);

    if (value) params.set(key, value);
    else params.delete(key);

    setSearchParams(params);

    onChange?.(updated);
  };

  const handlePriceChange = (type, value) => {
    const num = Number(value);

    setLocalPriceRange((prev) => {
      const updated = {
        ...prev,
        [type === "min" ? "minPrice" : "maxPrice"]: num,
      };

      const newFilters = {
        ...filters,
        minPrice: updated.minPrice,
        maxPrice: updated.maxPrice,
      };

      setFilters(newFilters);

      if (debounceRef.current) clearTimeout(debounceRef.current);

      debounceRef.current = setTimeout(() => {
        onChange?.(newFilters);
      }, 400);

      return updated;
    });
  };

  const clearAll = () => {
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

    setSearchParams({});

    onChange?.(cleared);
  };

  return (
    <>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 bg-black/40 z-[70] lg:hidden"
          />
        )}
      </AnimatePresence>

      <div
        className={`fixed lg:relative h-full w-[260px] bg-white transition-all ${
          mobileOpen
            ? "translate-x-0 z-[80]"
            : "-translate-x-full lg:translate-x-0"
        } top-0 left-0 flex flex-col border-r border-gray-100`}
      >
        {/* HEADER */}

        <div className="flex justify-between items-end px-8 pt-4 pb-6 border-b border-gray-100">
          <h3 className="text-sm font-bold uppercase tracking-[0.35em] text-black">
            Filter
          </h3>

          <div className="flex items-center gap-4">
            <button
              onClick={clearAll}
              className="flex items-center gap-2 text-[10px] font-semibold text-gray-600 hover:text-black uppercase tracking-[0.2em]"
            >
              <RotateCcw size={12} />
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

        <div className="flex-1 overflow-y-auto px-8">

          {/* CATEGORY */}

          <FilterSection title="Collection">
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
                className="w-full bg-transparent border-b border-gray-200 text-[13px] py-2.5 pl-6 outline-none"
              />
            </div>

            <ul className="max-h-60 overflow-y-auto pr-2 space-y-3">
              {parentCategories
                .filter((c) =>
                  c.name.toLowerCase().includes(catSearch.toLowerCase())
                )
                .map((parent) => {
                  const sub = getSubCategories(parent.id);

                  return (
                    <li key={parent.id}>
                      <div
                        onClick={() =>
                          updateFilter("category", parent.slug)
                        }
                        className={`text-[13px] cursor-pointer py-2 flex justify-between ${
                          isParentActive(parent)
                            ? "text-black font-semibold"
                            : "text-gray-600 hover:text-black"
                        }`}
                      >
                        <span>{parent.name}</span>
                        <span className="text-[11px] opacity-40">
                          ({parent.count})
                        </span>
                      </div>

                      {sub.length > 0 && (
                        <ul className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-3">
                          {sub.map((child) => (
                            <li
                              key={child.id}
                              onClick={() =>
                                updateFilter("category", child.slug)
                              }
                              className={`text-[12px] cursor-pointer py-1 flex justify-between ${
                                filters.category === child.slug
                                  ? "text-black font-semibold"
                                  : "text-gray-500 hover:text-black"
                              }`}
                            >
                              <span>{child.name}</span>
                              <span className="text-[10px] opacity-40">
                                ({child.count})
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
            </ul>
          </FilterSection>

          {/* BRANDS */}

          <FilterSection title="Brands">
            <ul className="max-h-60 overflow-y-auto pr-2 space-y-2">
              {availableBrands
                .filter((b) =>
                  b.name.toLowerCase().includes(brandSearch.toLowerCase())
                )
                .map((b) => (
                  <li
                    key={b.id}
                    onClick={() =>
                      updateFilter(
                        "brand",
                        filters.brand === b.slug ? "" : b.slug
                      )
                    }
                    className="text-[13px] cursor-pointer py-2 flex justify-between text-gray-500 hover:text-black"
                  >
                    <span>{b.name}</span>
                    <span className="text-[11px] opacity-40">
                      ({b.count})
                    </span>
                  </li>
                ))}
            </ul>
          </FilterSection>

          {/* PRICE RANGE */}

          <FilterSection title="Price Range">
            <div className="pt-3 pb-3 px-2">

              <div className="relative h-[3px] w-full bg-gray-200 rounded-full">

                <div
                  className="absolute h-[6px] bg-black rounded-full"
                  style={{
                    left: `${getPercentage(
                      localPriceRange.minPrice,
                      priceLimits.min,
                      priceLimits.max
                    )}%`,
                    right: `${
                      100 -
                      getPercentage(
                        localPriceRange.maxPrice,
                        priceLimits.min,
                        priceLimits.max
                      )
                    }%`,
                  }}
                />

                <input
                  type="range"
                  min={priceLimits.min}
                  max={priceLimits.max}
                  step="500"
                  value={localPriceRange.minPrice}
                  onChange={(e) =>
                    handlePriceChange("min", e.target.value)
                  }
                  className="absolute w-full -top-[7px] h-5 appearance-none bg-transparent z-20"
                />

                <input
                  type="range"
                  min={priceLimits.min}
                  max={priceLimits.max}
                  step="500"
                  value={localPriceRange.maxPrice}
                  onChange={(e) =>
                    handlePriceChange("max", e.target.value)
                  }
                  className="absolute w-full -top-[7px] h-5 appearance-none bg-transparent z-30"
                />
              </div>

              <div className="flex justify-between items-center mt-4">
                <span className="text-[13px] font-semibold">
                  ₹{localPriceRange.minPrice}
                </span>
                <span className="text-[13px] font-semibold">
                  ₹{localPriceRange.maxPrice}
                </span>
              </div>
            </div>
          </FilterSection>

        </div>
      </div>
    </>
  );
};

export default AdvancedFilter;