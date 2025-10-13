import React from "react";

export default function ChartCard({ title, children }) {
  return (
    <div className="bg-[var(--color-hover)]  rounded-2xl flex flex-col gap-3">
      <h3 className="py-5 text-xl font-semibold text-[var(--color-black)] ">
        {title}
      </h3>
      <div>{children}</div>
    </div>
  );
}
