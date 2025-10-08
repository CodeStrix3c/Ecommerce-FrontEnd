import React from "react";

export default function ChartCard({ title, children }) {
  return (
    <div className="bg-[var(--color-white)] p-4 rounded-2xl shadow flex flex-col gap-3">
      <h3 className="text-sm font-semibold text-[var(--color-black)]">
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}
