// src/components/shared/EmptyState.jsx
import React from "react";

const EmptyState = ({ title = "No results found", message }) => {
  return (
    <div className="text-center py-20">
      <p className="text-[var(--color-black)]/60 text-lg">{title}</p>
      {message && (
        <p className="text-[var(--color-black)]/40 text-sm mt-2">{message}</p>
      )}
    </div>
  );
};

export default EmptyState;
