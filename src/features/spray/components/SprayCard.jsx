import React from "react";
import { Droplet, Edit2, Trash2, TreeDeciduous } from "lucide-react";

const sprayHistoryData = [
  {
    id: 1,
    type: "Herbicide",
    name: "Cap",
    quantity: "1 kg",
    waterUsed: "10 L",
    totalTrees: 25,
    date: "25 Sep 2025",
    cost: 5000,
  },
  {
    id: 2,
    type: "Fertilizer",
    name: "GrowFast",
    quantity: "2 kg",
    waterUsed: "15 L",
    totalTrees: 40,
    date: "26 Sep 2025",
    cost: 7000,
  },
  {
    id: 3,
    type: "Pesticide",
    name: "BugAway",
    quantity: "500 g",
    waterUsed: "5 L",
    totalTrees: 15,
    date: "27 Sep 2025",
    cost: 3000,
  },
];

export default function SprayHistory() {
  return (
    <div className="bg-[var(--color-white)] border border-[var(--color-gray)] rounded-xl overflow-hidden mx-auto">
      <h2 className="text-[var(--color-black)] font-bold text-xl sm:text-2xl p-4 border-b">
        Spray History
      </h2>

      <div className="divide-y divide-[var(--color-gray)]">
        {sprayHistoryData.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 sm:gap-4"
          >
            {/* Info Left */}
            <div className="flex items-center gap-3 flex-1 min-w-[120px]">
              <Droplet
                size={20}
                className="text-[var(--color-secondary)] flex-shrink-0"
              />
              <div>
                <p className="font-semibold text-sm sm:text-base">
                  {item.name}
                </p>
                <span className="bg-[var(--color-black-hover)] text-[var(--color-primary)] text-xs sm:text-sm px-2 py-0.5 rounded-full">
                  {item.type}
                </span>
              </div>
            </div>

            {/* Spray Details Center */}
            <div className="flex-1 text-sm sm:text-base mt-2 sm:mt-0 flex flex-col sm:flex-row sm:gap-6">
              <p>Qty: {item.quantity}</p>
              <p>Water: {item.waterUsed}</p>
              <p className="flex items-center gap-1">
                <TreeDeciduous size={14} /> {item.totalTrees} Trees
              </p>
            </div>

            {/* Date & Cost Right */}
            <div className="flex-1 text-sm sm:text-base mt-2 sm:mt-0 flex flex-col sm:items-end">
              <p>{item.date}</p>
              <p className="font-semibold text-[var(--color-primary)]">
                ₹{item.cost}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-3 mt-2 sm:mt-0 sm:ml-4">
              <Edit2
                size={20}
                className="text-[var(--color-primary)] cursor-pointer hover:text-[var(--color-black)]"
              />
              <Trash2
                size={20}
                className="text-[var(--color-secondary)] cursor-pointer hover:text-[var(--color-black)]"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
