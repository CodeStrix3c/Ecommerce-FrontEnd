import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { ChevronDown, Search, RotateCcw, X, Star } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FilterSkeleton from "./FilterSkeleton";

// ✅ FIX #11 — Hoisted default to avoid new object reference every render
const DEFAULT_PRICE_LIMITS = { min: 0, max: 50000 };

/* ─────────────────────────────────────────────
   FilterSection
───────────────────────────────────────────── */
const FilterSection = ({ title, onClear, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-100/70 py-7">
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-3 group"
          // ✅ FIX #6 — Accessibility: aria-expanded for screen readers
          aria-expanded={isOpen}
        >
          <ChevronDown
            size={14}
            className={`transition-all duration-500 ${isOpen ? "rotate-0 text-black" : "-rotate-90 text-gray-400"
              }`}
          />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-black">
            {title}
          </span>
        </button>
      </div>

      {isOpen && <div className="overflow-hidden">{children}</div>}
    </div>
  );
};

/* ─────────────────────────────────────────────
   DualRangeSlider
───────────────────────────────────────────── */
const THUMB_SIZE = 16;

const DualRangeSlider = ({
  min,
  max,
  step = 500,
  value,
  onChange,
  debounceMs = 300,
}) => {
  const trackRef = useRef(null);
  const debounceRef = useRef(null);
  const dragging = useRef(null);

  const [local, setLocal] = useState({ min: value.min, max: value.max });

  useEffect(() => {
    setLocal({ min: value.min, max: value.max });
  }, [value.min, value.max]);

  const snap = useCallback(
    (v) => Math.round(Math.min(max, Math.max(min, v)) / step) * step,
    [min, max, step],
  );

  const pct = (v) => ((v - min) / (max - min)) * 100;

  const clientXToValue = useCallback(
    (clientX) => {
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.min(
        1,
        Math.max(0, (clientX - rect.left) / rect.width),
      );
      return snap(min + ratio * (max - min));
    },
    [min, max, snap],
  );

  const fireDebounced = useCallback(
    (next) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => onChange(next), debounceMs);
    },
    [onChange, debounceMs],
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!dragging.current) return;
      const clientX = e.clientX ?? e.touches?.[0]?.clientX;
      if (clientX == null) return;
      const val = clientXToValue(clientX);

      setLocal((prev) => {
        let next;
        if (dragging.current === "min") {
          next = { min: Math.min(val, prev.max - step), max: prev.max };
        } else {
          next = { min: prev.min, max: Math.max(val, prev.min + step) };
        }
        fireDebounced(next);
        return next;
      });
    },
    [clientXToValue, step, fireDebounced],
  );

  const onPointerUp = useCallback(() => {
    dragging.current = null;
    window.removeEventListener("mousemove", onPointerMove);
    window.removeEventListener("mouseup", onPointerUp);
    window.removeEventListener("touchmove", onPointerMove);
    window.removeEventListener("touchend", onPointerUp);
  }, [onPointerMove]);

  // ✅ FIX #5 — Clean up global listeners if component unmounts mid-drag
  useEffect(() => {
    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("mouseup", onPointerUp);
      window.removeEventListener("touchmove", onPointerMove);
      window.removeEventListener("touchend", onPointerUp);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [onPointerMove, onPointerUp]);

  const startDrag = (thumb) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragging.current = thumb;
    window.addEventListener("mousemove", onPointerMove);
    window.addEventListener("mouseup", onPointerUp);
    window.addEventListener("touchmove", onPointerMove, { passive: false });
    window.addEventListener("touchend", onPointerUp);
  };

  const onTrackClick = (e) => {
    if (dragging.current) return;
    const val = clientXToValue(e.clientX);
    setLocal((prev) => {
      const distMin = Math.abs(val - prev.min);
      const distMax = Math.abs(val - prev.max);
      let next;
      if (distMin <= distMax) {
        next = { min: Math.min(val, prev.max - step), max: prev.max };
      } else {
        next = { min: prev.min, max: Math.max(val, prev.min + step) };
      }
      fireDebounced(next);
      return next;
    });
  };

  const minPct = pct(local.min);
  const maxPct = pct(local.max);

  return (
    <div className="pt-2 pb-1 px-2 select-none">
      <div
        ref={trackRef}
        className="relative w-full rounded-full cursor-pointer mt-5"
        style={{ height: 3, background: "#e5e7eb" }}
        onClick={onTrackClick}
      >
        <div
          className="absolute h-full rounded-full pointer-events-none"
          style={{
            background: "var(--color-secondary, #000)",
            left: `${minPct}%`,
            right: `${100 - maxPct}%`,
          }}
        />

        {/* ✅ FIX #7 — Added ARIA attributes to slider thumbs */}
        <div
          role="slider"
          aria-label="Minimum price"
          aria-valuemin={min}
          aria-valuemax={local.max - step}
          aria-valuenow={local.min}
          tabIndex={0}
          onMouseDown={startDrag("min")}
          onTouchStart={startDrag("min")}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              const next = Math.max(min, local.min - step);
              setLocal((prev) => ({ ...prev, min: next }));
              fireDebounced({
                min: Math.max(min, local.min - step),
                max: local.max,
              });
            }
            if (e.key === "ArrowRight") {
              const next = Math.min(local.max - step, local.min + step);
              setLocal((prev) => ({ ...prev, min: next }));
              fireDebounced({
                min: Math.min(local.max - step, local.min + step),
                max: local.max,
              });
            }
          }}
          className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-black shadow-sm cursor-grab active:cursor-grabbing active:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          style={{
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            left: `calc(${minPct}% - ${THUMB_SIZE / 2}px)`,
            zIndex: 20,
          }}
        />

        {/* ✅ FIX #7 — Added ARIA attributes to slider thumbs */}
        <div
          role="slider"
          aria-label="Maximum price"
          aria-valuemin={local.min + step}
          aria-valuemax={max}
          aria-valuenow={local.max}
          tabIndex={0}
          onMouseDown={startDrag("max")}
          onTouchStart={startDrag("max")}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") {
              const next = Math.max(local.min + step, local.max - step);
              setLocal((prev) => ({ ...prev, max: next }));
              fireDebounced({
                min: local.min,
                max: Math.max(local.min + step, local.max - step),
              });
            }
            if (e.key === "ArrowRight") {
              const next = Math.min(max, local.max + step);
              setLocal((prev) => ({ ...prev, max: next }));
              fireDebounced({
                min: local.min,
                max: Math.min(max, local.max + step),
              });
            }
          }}
          className="absolute top-1/2 -translate-y-1/2 rounded-full bg-white border-2 border-black shadow-sm cursor-grab active:cursor-grabbing active:scale-110 transition-transform focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2"
          style={{
            width: THUMB_SIZE,
            height: THUMB_SIZE,
            left: `calc(${maxPct}% - ${THUMB_SIZE / 2}px)`,
            zIndex: 20,
          }}
        />
      </div>

      <div className="flex justify-between items-center mt-5">
        <span className="text-[10px] font-semibold">
          ₹{local.min.toLocaleString("en-IN")}
        </span>
        <div className="h-px w-4 bg-gray-300" />
        <span className="text-[10px] font-semibold">
          ₹{local.max.toLocaleString("en-IN")}
        </span>
      </div>
    </div>
  );
};

/* ─────────────────────────────────────────────
   RatingFilter — inline, Amazon-style
───────────────────────────────────────────── */
const RatingFilterSection = ({ selectedRating, onChange }) => {
  const rows = [4, 3, 2, 1];

  return (
    <div className="flex flex-col gap-1">
      {rows.map((star) => (
        <button
          key={star}
          onClick={() => onChange(star === selectedRating ? 0 : star)}
          className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm transition-all w-full text-left
            ${selectedRating === star
              ? "bg-yellow-50 border border-yellow-300"
              : "hover:bg-gray-50 border border-transparent"
            }`}
        >
          <div className="flex items-center gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                size={13}
                className={
                  s <= star
                    ? "fill-yellow-400 text-yellow-400"
                    : "fill-gray-200 text-gray-200"
                }
              />
            ))}
          </div>

          <span className="text-[12px] text-gray-600 whitespace-nowrap">
            & Up
          </span>

          {selectedRating === star && (
            <span className="ml-auto text-[11px] text-yellow-600 font-semibold">
              ✓
            </span>
          )}
        </button>
      ))}

      {selectedRating > 0 && (
        <button
          onClick={() => onChange(0)}
          className="mt-1 text-[11px] text-blue-600 hover:underline text-left px-2"
        >
          Clear
        </button>
      )}
    </div>
  );
};

/* ─────────────────────────────────────────────
   AdvancedFilter
───────────────────────────────────────────── */
const AdvancedFilter = ({
  availableBrands = [],
  availableCategories = [],
  // ✅ FIX #11 — Use hoisted default to avoid new object ref every render
  priceLimits = DEFAULT_PRICE_LIMITS,
  // ✅ FIX #9 — Accept explicit isLoading prop instead of inferring from data
  isLoading = false,
  onChange,
  mobileOpen = false,
  setMobileOpen,
  selectedRating = 0,
  onRatingChange,
}) => {
  const navigate = useNavigate();
  const [catSearch, setCatSearch] = useState("");
  const [brandSearch, setBrandSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [openCategory, setOpenCategory] = useState(null);
  const debounceFilterRef = useRef(null);

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

  // ✅ FIX #3 — Clear debounce timeout on unmount to prevent setState on unmounted component
  useEffect(() => {
    return () => {
      if (debounceFilterRef.current) clearTimeout(debounceFilterRef.current);
    };
  }, []);

  const parentCategories = useMemo(
    () => availableCategories.filter((c) => c.parentId === null),
    [availableCategories],
  );

  // ✅ FIX #2 — Stabilize getSubCategories with useCallback
  const getSubCategories = useCallback(
    (parentId) => availableCategories.filter((c) => c.parentId === parentId),
    [availableCategories],
  );

  const isParentActive = useCallback(
    (parent) => {
      if (filters.category === parent.slug) return true;
      const children = getSubCategories(parent.id);
      return children.some((child) => child.slug === filters.category);
    },
    [filters.category, getSubCategories],
  );

  useEffect(() => {
    const category = searchParams.get("category") || "";
    const brand = searchParams.get("brand") || "";
    const minPrice = Number(searchParams.get("minPrice")) || priceLimits.min;
    const maxPrice = Number(searchParams.get("maxPrice")) || priceLimits.max;
    const updated = { category, brand, minPrice, maxPrice };

    setFilters((prev) => {
      if (
        prev.category === updated.category &&
        prev.brand === updated.brand &&
        prev.minPrice === updated.minPrice &&
        prev.maxPrice === updated.maxPrice
      )
        return prev;
      return updated;
    });

    setLocalPriceRange((prev) => {
      if (
        prev.minPrice === updated.minPrice &&
        prev.maxPrice === updated.maxPrice
      )
        return prev;
      return { minPrice: updated.minPrice, maxPrice: updated.maxPrice };
    });
  }, [searchParams, priceLimits.min, priceLimits.max]);

  useEffect(() => {
    if (!filters.category) return;
    const parent = parentCategories.find((p) => {
      if (p.slug === filters.category) return true;
      const children = getSubCategories(p.id);
      return children.some((c) => c.slug === filters.category);
    });
    if (parent) setOpenCategory(parent.id);
  }, [filters.category, parentCategories, getSubCategories]);

  const updateFilter = (key, value) => {
    // ✅ FIX #10 — Use functional state update to avoid stale closure
    setFilters((prev) => {
      let updated = { ...prev, [key]: value };
      if (key === "brand" && value) updated.category = "";

      if (debounceFilterRef.current) clearTimeout(debounceFilterRef.current);
      debounceFilterRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams);
        if (key === "brand") {
          value ? params.set("brand", value) : params.delete("brand");
          params.delete("category");
        } else if (key === "category") {
          value ? params.set("category", value) : params.delete("category");
          params.delete("brand");
        }
        setSearchParams(params);
        onChange?.(updated);
      }, 200);

      return updated;
    });
  };

  // ✅ FIX #1 — Use functional update to avoid stale `filters` closure
  const handlePriceChange = useCallback(
    ({ min: newMin, max: newMax }) => {
      setLocalPriceRange({ minPrice: newMin, maxPrice: newMax });
      setFilters((prev) => {
        const newFilters = { ...prev, minPrice: newMin, maxPrice: newMax };
        const params = new URLSearchParams(searchParams);
        params.set("minPrice", newMin);
        params.set("maxPrice", newMax);
        setSearchParams(params);
        onChange?.(newFilters);
        return newFilters;
      });
    },
    [searchParams, setSearchParams, onChange],
  );

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
    onRatingChange?.(0);

    navigate("/home"); // ✅ Now it will redirect
  };

  // ✅ FIX #4 — getSubCategories is now stable, safe to use in useMemo deps
  const filteredCategoryTree = useMemo(() => {
    if (!catSearch.trim()) return parentCategories;
    const query = catSearch.toLowerCase();
    return parentCategories.filter((parent) => {
      const parentMatches = parent.name.toLowerCase().includes(query);
      const children = getSubCategories(parent.id);
      const childMatches = children.some((c) =>
        c.name.toLowerCase().includes(query),
      );
      return parentMatches || childMatches;
    });
  }, [catSearch, parentCategories, getSubCategories]);

  const getFilteredSubCategories = useCallback(
    (parentId) => {
      const all = getSubCategories(parentId);
      if (!catSearch.trim()) return all;
      const query = catSearch.toLowerCase();
      return all.filter((c) => c.name.toLowerCase().includes(query));
    },
    [getSubCategories, catSearch],
  );

  return (
    <>
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/40 z-[70] lg:hidden"
        />
      )}

      <div
        className={`fixed lg:relative h-full w-[260px] bg-white transition-all ${mobileOpen
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
              aria-label="Close filters"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-8">
          {/* ✅ FIX #9 — Use explicit isLoading prop */}
          {isLoading ? (
            <FilterSkeleton />
          ) : (
            <>
              {/* 1. CATEGORIES */}
              <FilterSection title="Categories">
                <div className="relative mb-5">
                  <Search
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300"
                    size={14}
                  />
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={catSearch}
                    onChange={(e) => setCatSearch(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-200 text-[13px] py-2.5 pl-6 outline-none"
                  />
                </div>

                {/* ✅ FIX #6 — Use role="listbox" + role="option" for accessibility */}
                <ul
                  role="listbox"
                  aria-label="Categories"
                  className="max-h-60 overflow-y-auto pr-2 space-y-3"
                >
                  {filteredCategoryTree.map((parent) => {
                    const sub = getFilteredSubCategories(parent.id);
                    const forceOpen = catSearch.trim() !== "" && sub.length > 0;
                    const isOpen = forceOpen || openCategory === parent.id;

                    return (
                      <li
                        key={parent.id}
                        role="option"
                        aria-selected={isParentActive(parent)}
                      >
                        {/* ✅ FIX #6 — Replaced div with button for keyboard accessibility */}
                        <button
                          onClick={() => {
                            setOpenCategory(
                              openCategory === parent.id ? null : parent.id,
                            );
                            updateFilter("category", parent.slug);
                          }}
                          className={`text-[13px] cursor-pointer py-2 flex justify-between items-center w-full text-left ${isParentActive(parent)
                              ? "text-black font-semibold"
                              : "text-gray-600 hover:text-black"
                            }`}
                        >
                          <span>{parent.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] opacity-40">
                              ({parent.count})
                            </span>
                            {getSubCategories(parent.id).length > 0 && (
                              <ChevronDown
                                size={12}
                                className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                              />
                            )}
                          </div>
                        </button>

                        {sub.length > 0 && isOpen && (
                          <ul className="ml-4 mt-1 space-y-1 border-l border-gray-200 pl-3">
                            {sub.map((child) => (
                              // ✅ FIX #6 — Replaced li onClick with button
                              <li key={child.id}>
                                <button
                                  onClick={() =>
                                    updateFilter("category", child.slug)
                                  }
                                  className={`text-[12px] cursor-pointer py-1 flex justify-between w-full text-left ${filters.category === child.slug
                                      ? "text-black font-semibold"
                                      : "text-gray-500 hover:text-black"
                                    }`}
                                >
                                  <span>{child.name}</span>
                                  <span className="text-[10px] opacity-40">
                                    ({child.count})
                                  </span>
                                </button>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </FilterSection>

              {/* 2. BRANDS */}
              <FilterSection title="Brands">
                <div className="relative mb-5">
                  <Search
                    className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-300"
                    size={14}
                  />
                  <input
                    type="text"
                    placeholder="Search brands..."
                    value={brandSearch}
                    onChange={(e) => setBrandSearch(e.target.value)}
                    className="w-full bg-transparent border-b border-gray-200 text-[13px] py-2.5 pl-6 outline-none"
                  />
                </div>

                {/* ✅ FIX #6 — Use role="listbox" for accessibility */}
                <ul
                  role="listbox"
                  aria-label="Brands"
                  className="max-h-60 overflow-y-auto pr-2 space-y-2"
                >
                  {availableBrands
                    .filter((b) =>
                      b.name.toLowerCase().includes(brandSearch.toLowerCase()),
                    )
                    .map((b) => (
                      // ✅ FIX #6 — Replaced li onClick with button
                      <li
                        key={b.id}
                        role="option"
                        aria-selected={filters.brand === b.slug}
                      >
                        <button
                          onClick={() =>
                            updateFilter(
                              "brand",
                              filters.brand === b.slug ? "" : b.slug,
                            )
                          }
                          className={`text-[13px] cursor-pointer py-2 flex justify-between w-full text-left ${filters.brand === b.slug
                              ? "text-black font-semibold"
                              : "text-gray-500 hover:text-black"
                            }`}
                        >
                          <span>{b.name}</span>
                          <span className="text-[11px] opacity-40">
                            ({b.count})
                          </span>
                        </button>
                      </li>
                    ))}
                </ul>
              </FilterSection>

              {/* 3. PRICE RANGE */}
              <FilterSection title="Price Range">
                <DualRangeSlider
                  min={priceLimits.min}
                  max={priceLimits.max}
                  step={500}
                  value={{
                    min: localPriceRange.minPrice,
                    max: localPriceRange.maxPrice,
                  }}
                  onChange={handlePriceChange}
                  debounceMs={300}
                />
              </FilterSection>

              {/* 4. RATING */}
              <FilterSection
                title="Customer Reviews"
                onClear={selectedRating > 0 ? () => onRatingChange?.(0) : null}
              >
                <RatingFilterSection
                  selectedRating={selectedRating}
                  onChange={(val) => onRatingChange?.(val)}
                />
              </FilterSection>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default AdvancedFilter;
