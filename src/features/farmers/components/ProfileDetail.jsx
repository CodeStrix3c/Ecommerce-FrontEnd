import React from "react";

export default function ProfileDetail({ icon, label, value }) {
  return (
    <div className="flex items-center py-2 gap-2">
      {React.cloneElement(icon, {
        className: "w-6 h-6 text-[var(--color-secondary)]",
      })}
      <div>
        <span className="font-semibold">{label}: </span>
        <span>{value}</span>
      </div>
    </div>
  );
}
