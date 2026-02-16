import React from "react";
import { Trees, Apple, Sprout, CalendarCheck2, Layers } from "lucide-react";
import { Landscape } from "@mui/icons-material";

function OrchardsSummary({ orchards }) {
  const totalOrchards = orchards?.length;
  const totalAcres = orchards?.reduce((acc, o) => acc + o.totalLand, 0);
  const totalTrees = orchards?.reduce((acc, o) => acc + (o.totalTrees || 0), 0);
  const fruitTypes = Array.from(new Set(orchards?.map((o) => o.type))).length;

  const statusCounts = orchards?.reduce(
    (acc, o) => {
      if (
        o.status === "Active" ||
        o.status === "Sowing" ||
        o.status === "Harvesting"
      )
        acc.active += 1;
      if (o.status === "Planned" || o.status === "Idle") acc.planned += 1;
      return acc;
    },
    { active: 0, planned: 0 }
  );

  const summaryDetails = [
    { icon: <Layers size={20} />, label: "Orchards", value: totalOrchards },
    { icon: <Landscape fontSize="small" />, label: "Acres", value: totalAcres },
    { icon: <Trees size={20} />, label: "Trees", value: totalTrees },
    { icon: <Apple size={20} />, label: "Fruit Types", value: `${fruitTypes}` },
    {
      icon: <Sprout size={20} />,
      label: "Active",
      value: statusCounts?.active,
    },
    {
      icon: <CalendarCheck2 size={20} />,
      label: "Planned",
      value: statusCounts?.planned,
    },
  ];

  return (
    <div className="px-4 sm:px-6 py-4 border rounded-lg my-6 bg-[var(--color-white)] ">
      <h2 className="text-base sm:text-lg font-semibold text-[var(--color-black)] mb-4">
        Orchards Summary
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
        {summaryDetails.map((item, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 bg-[var(--color-white)] rounded-lg px-3 py-2 text-sm sm:text-base text-[var(--color-black)] "
          >
            <div className="text-[var(--color-secondary)]">{item.icon}</div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-0.5 sm:gap-1">
              <span className="font-medium">{item.label}:</span>
              <span className="text-[var(--color-secondary)] font-semibold">
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrchardsSummary;
