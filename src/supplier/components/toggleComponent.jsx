// src/components/shared/ViewToggle.jsx
import React from "react";
import { Grid, List } from "lucide-react";

const ViewToggle = ({ viewMode, onViewModeChange }) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onViewModeChange("grid")}
        className={`p-2 rounded ${
          viewMode === "grid"
            ? "bg-[var(--color-secondary)] text-[var(--color-white)]"
            : "bg-[var(--color-white)] text-[var(--color-black)] border border-[var(--color-gray)]"
        }`}
        aria-label="Grid view"
      >
        <Grid size={20} />
      </button>
      <button
        onClick={() => onViewModeChange("list")}
        className={`p-2 rounded ${
          viewMode === "list"
            ? "bg-[var(--color-secondary)] text-[var(--color-white)]"
            : "bg-[var(--color-white)] text-[var(--color-black)] border border-[var(--color-gray)]"
        }`}
        aria-label="List view"
      >
        <List size={20} />
      </button>
    </div>
  );
};

export default ViewToggle;
