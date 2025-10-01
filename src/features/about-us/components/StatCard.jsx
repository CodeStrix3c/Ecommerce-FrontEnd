import React from "react";

export default function StatCard({ value, label }) {
  return (
    <div className="bg-[var(--color-white)] p-6 rounded-2xl transition text-center">
      <h3 className="text-3xl font-bold text-[var(--color-primary)]">
        {value}
      </h3>
      <p className="mt-2 text-[var(--color-black)]">{label}</p>
    </div>
  );
}
