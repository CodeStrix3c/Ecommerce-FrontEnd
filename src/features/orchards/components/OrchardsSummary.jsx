import React from "react";
import { Trees, Apple, Sprout, CalendarCheck2, Layers } from "lucide-react";
import { Landscape } from "@mui/icons-material";

function OrchardsSummary() {
  const summaryDetails = [
    { icon: <Layers size={20} />, label: "Orchards", value: "3" },
    { icon: <Landscape size={20} />, label: "Acres", value: "30" },
    { icon: <Trees size={20} />, label: "Trees", value: "500" },
    { icon: <Apple size={20} />, label: "Fruits", value: "3 Types" },
    { icon: <Sprout size={20} />, label: "Active", value: "2" },
    { icon: <CalendarCheck2 size={20} />, label: "Planned", value: "1" },
  ];

  return (
    <div className="px-4 py-3 border rounded-lg my-6 bg-[var(--color-white)]">
      <h2 className="text-lg font-semibold text-[var(--color-black)] mb-3">
        Summary
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {summaryDetails.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-[var(--color-white)] rounded-lg px-3 py-2 text-sm text-[var(--color-black)]"
          >
            {item.icon}
            <span className="font-medium">{item.label}:</span>
            <span className="text-[var(--color-secondary)]">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrchardsSummary;
