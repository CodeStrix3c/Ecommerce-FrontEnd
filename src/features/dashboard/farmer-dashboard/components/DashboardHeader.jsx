import React from "react";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-2xl font-semibold text-[var(--color-black)]">
          Farmer Dashboard
        </h1>
        <p className="text-sm text-[var(--color-black)]">
          Overview of your orchards, productivity, and alerts
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-[var(--color-white)] rounded shadow border border-[var(--color-gray)] text-[var(--color-black)]">
          Export
        </button>
        <button className="px-4 py-2 bg-[var(--color-secondary)] rounded shadow text-[var(--color-white)]">
          New Listing
        </button>
      </div>
    </header>
  );
}
