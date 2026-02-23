import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import useIsMobile from "@/hooks/useInMobile";
import ContentWrapper from "./ContentWrapper";

const CATEGORIES = ["handicraft", "textiles", "woodCraft", "carpets"];

const SearchBar = ({ onChange, showCategory = false }) => {
  const isMobile = useIsMobile(640); // phones
  const isTablet = useIsMobile(1024); // tablets

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchText);

  /* ===================== DEBOUNCE ===================== */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchText]);

  /* ===================== EMIT ===================== */
  useEffect(() => {
    onChange?.({
      query: debouncedSearch.trim(),
      category: showCategory ? selectedCategory : "",
    });
  }, [debouncedSearch, selectedCategory, showCategory, onChange]);

  /* ===================== MOBILE ===================== */
  if (isMobile) {
    return (
      <ContentWrapper>
        {/* <div className="w-full flex justify-center">
          <div className="w-full max-w-md space-y-3">
            <div className="flex items-center rounded-full border-2 border-[var(--color-black-hover)] px-3 py-2">
              <Search className="h-5 w-5 text-[var(--color-black)]/70" />
              <input
                type="text"
                placeholder="Search products"
                className="ml-2 w-full border-none text-sm text-[var(--color-black)]
                placeholder-[var(--color-black)] focus:outline-none"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>

           
            {showCategory && (
              <div className="rounded-xl border border-[var(--color-black-hover)] px-4 py-2 bg-white">
                <p className="text-xs font-medium text-[var(--color-black)] mb-1">
                  Category
                </p>
                <select
                  className="w-full bg-transparent text-sm text-[var(--color-black)]
                  focus:outline-none cursor-pointer"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">All</option>
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div> */}
        <div
          className={`flex items-center rounded-full border border-[var(--color-black-hover)]
      bg-[var(--color-white)] px-4 py-3 pt-1 shadow-[0_2px_4px_rgba(0,0,0,0.08)]
      hover:shadow-md transition-shadow duration-200
      ${showCategory ? "w-[90vw]" : "w-[60vw]"}`}
        >
          <div
            className={`flex-[7] px-3 relative ${
              showCategory ? " border-[var(--color-black-hover)]" : ""
            }`}
          >
            <div className="absolute top-2 left-2 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-secondary)] text-[var(--color-white)]">
              <Search className="h-4 w-4" />
            </div>

            <input
              type="text"
              placeholder="Search products"
              className="w-full mt-2 px-12 py-2 rounded-full text-sm text-[var(--color-black)]
          placeholder-[var(--color-black)] focus:outline-none"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />
          </div>
        </div>
      </ContentWrapper>
    );
  }

  /* ===================== DESKTOP + TABLET ===================== */
  return (
    <div
      className={`flex items-center rounded-full border border-[var(--color-black-hover)]
      bg-[var(--color-white)] px-4 py-1 pt-1 shadow-[0_2px_4px_rgba(0,0,0,0.08)]
      hover:shadow-md transition-shadow duration-200
      ${showCategory ? "w-[35vw]" : "w-[20vw]"}`}
    >
      {/* Search */}
      <div
        className={`flex-[7] px-3 relative ${
          showCategory ? " border-[var(--color-black-hover)]" : ""
        }`}
      >
        <div className="absolute top-1 left-2 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-secondary)] text-[var(--color-white)]">
          <Search className="h-4 w-4" />
        </div>

        <input
          type="text"
          placeholder="Search products"
          className="w-full mt-1 px-12 py-2 rounded-full text-sm text-[var(--color-black)]
          placeholder-[var(--color-black)] focus:outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      {/* Category */}
      {/* {showCategory && (
        <div className="flex-[5] px-4">
          <p className="text-xs font-medium text-[var(--color-black)]">
            Category
          </p>
          <select
            className="w-full bg-transparent text-sm text-[var(--color-black)]
            focus:outline-none cursor-pointer"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All</option>
            {CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      )} */}
    </div>
  );
};

export default SearchBar;
