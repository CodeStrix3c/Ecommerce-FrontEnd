import { Search } from "lucide-react";
import React, { useState } from "react";

function SecondarySearchBar({
  className = "",
  placeholder = "Search...",
  onSearch, // callback function prop
  defaultValue = "",
}) {
  const [query, setQuery] = useState(defaultValue);

  const handleSearch = () => {
    if (onSearch && query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className={`w-full flex justify-center ${className}`}>
      <div className="flex items-center bg-[var(--color-white)] backdrop-blur-md border border-[var(--color-gray)] rounded-full  overflow-hidden w-96 max-w-md sm:max-w-lg transition-all duration-300">
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyPress}
          className="flex-1 px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none bg-transparent text-[var(--color-black)] placeholder-gray"
        />
        <button
          onClick={handleSearch}
          className="bg-[var(--color-secondary)] text-[var(--color-white)] p-2 sm:p-2.5 hover:bg-[var(--color-secondary-hover)] mr-1 transition-all duration-300 rounded-full flex items-center justify-center"
          aria-label="search"
        >
          <Search size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}

export default SecondarySearchBar;
