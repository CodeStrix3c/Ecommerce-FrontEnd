// src/components/shared/SortControl.jsx
import React from "react";

const SortControl = ({
  sortBy,
  sortReverse,
  onSortChange,
  onOrderChange,
  sortOptions,
}) => {
  return (
    <div className="flex items-center gap-4">
      <select
        className="px-4 py-2 border border-[var(--color-gray)] rounded-lg bg-[var(--color-white)] text-[var(--color-black)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)]"
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
      >
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <button
        onClick={onOrderChange}
        className="px-4 py-2 border border-[var(--color-gray)] rounded-lg bg-[var(--color-white)] text-[var(--color-black)] hover:bg-[var(--color-gray)]"
      >
        {sortReverse ? "↓ Desc" : "↑ Asc"}
      </button>
    </div>
  );
};

export default SortControl;
