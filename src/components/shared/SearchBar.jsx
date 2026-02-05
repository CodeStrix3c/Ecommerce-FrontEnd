import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";
import useIsMobile from "@/hooks/useInMobile";
import ContentWrapper from "./ContentWrapper";

const CATEGORIES = [
  "Metal Craft",
  "Woodcraft",
  "Textiles",
  "Hand Embroidery",
  "Home Decor",
  "Basketry",
  "Pottery",
  "Carpets & Rugs",
  "Accessories",
];

const SearchBar = ({ onChange }) => {
  const isMobile = useIsMobile(900);

  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // ✅ Debounced value
  const [debouncedSearch, setDebouncedSearch] = useState(searchText);

  /* ===================== DEBOUNCE LOGIC ===================== */
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
    }, 400); // ⏱ 400ms debounce

    return () => clearTimeout(timer);
  }, [searchText]);

  /* ===================== EMIT ONLY DEBOUNCED VALUE ===================== */
  useEffect(() => {
    onChange?.({
      query: debouncedSearch.trim(),
      category: selectedCategory,
    });
  }, [debouncedSearch, selectedCategory, onChange]);

  /* ===================== MOBILE ===================== */
  if (isMobile) {
    return (
      <ContentWrapper>
        <div className="w-full flex justify-center">
          <div className="flex w-full max-w-md items-center rounded-full border-2 border-[var(--color-black-hover)] px-3 py-2">
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
        </div>
      </ContentWrapper>
    );
  }

  /* ===================== DESKTOP ===================== */
  return (
    <div
      className="flex items-center justify-between rounded-full border border-[var(--color-black-hover)]
      bg-[var(--color-white)] px-4 py-3 pt-1 shadow-[0_2px_4px_rgba(0,0,0,0.08)]
      hover:shadow-md transition-shadow duration-200 w-[35vw]"
    >
      {/* Search Input */}
      <div className="flex-1 border-r border-[var(--color-black-hover)] px-3 relative">
        <input
          type="text"
          placeholder="Search products"
          className="w-full mt-2 py-2 rounded-full text-sm text-[var(--color-black)]
          placeholder-[var(--color-black)] focus:outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />

        <div
          className="absolute top-2 right-2 flex h-10 w-10 items-center justify-center
          rounded-full bg-[var(--color-secondary)] text-[var(--color-white)]"
        >
          <Search className="h-4 w-4" />
        </div>
      </div>

      {/* Category Filter (NO debounce needed) */}
      {/* <div className="flex-1 px-6">
        <p className="text-xs font-medium text-[var(--color-black)]">
          Category
        </p>
        <select
          className="w-full bg-transparent text-sm text-[var(--color-black)]
          focus:outline-none cursor-pointer"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Select category</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div> */}
    </div>
  );
};

export default SearchBar; 