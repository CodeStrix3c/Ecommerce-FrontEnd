import { Search } from "lucide-react";
import React from "react";

function SecondarySearchBar({ className = "" }) {
  return (
    <div className={`w-full flex justify-end ${className}`}>
      <div className="flex items-center bg-[var(--color-white)] backdrop-blur-md border border-[var(--color-black)] rounded-full shadow-sm overflow-hidden w-96 max-w-md sm:max-w-lg transition-all duration-300">
        <input
          type="text"
          placeholder="Search..........."
          className="flex-1 px-4 py-2.5 sm:py-3 text-sm sm:text-base outline-none bg-transparent text-[var(--color-black)] placeholder-gray"
        />
        <button
          className="bg-[var(--color-secondary)] text-[var(--color-white)] me-1 p-2 sm:p-2.5 hover:bg-[var(--color-secondary-hover)] transition-all duration-300 rounded-full flex items-center justify-center"
          aria-label="Search....."
        >
          <Search size={18} className="sm:w-5 sm:h-5" />
        </button>
      </div>
    </div>
  );
}

export default SecondarySearchBar;
