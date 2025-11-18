import React from "react";
import { Leaf, FlaskRound, Bug, Droplet } from "lucide-react";
import { useSprayCardQuery, } from "@/hooks/useSprayQuery";

// const sprayHistoryData = [
//   {
//     id: 1,
//     type: "Herbicide",
//     name: "Cap",
//     quantity: "1 kg",
//     waterUsed: "10 L",
//     totalTrees: 25,
//     date: "May - Sep 2025",
//     cost: "5000 per 1kg",
//   },
//   {
//     id: 2,
//     type: "Fertilizer",
//     name: "GrowFast",
//     quantity: "2 kg",
//     waterUsed: "15 L",
//     totalTrees: 40,
//     date: "Aug - Oct 2025",
//     cost: "6000 per 2kg",
//   },
//   {
//     id: 3,
//     type: "Pesticide",
//     name: "BugAway",
//     quantity: "500 g",
//     waterUsed: "5 L",
//     totalTrees: 15,
//     date: "Jun - Sep 2025",
//     cost: "3000 per 500g",
//   },
//   {
//     id: 3,
//     type: "Pesticide",
//     name: "BugAway",
//     quantity: "500 g",
//     waterUsed: "5 L",
//     totalTrees: 15,
//     date: "Jun - Sep 2025",
//     cost: "3000 per 500g",
//   },
//   {
//     id: 3,
//     type: "Pesticide",
//     name: "BugAway",
//     quantity: "500 g",
//     waterUsed: "5 L",
//     totalTrees: 15,
//     date: "Jun - Sep 2025",
//     cost: "3000 per 500g",
//   },
//   {
//     id: 3,
//     type: "Pesticide",
//     name: "BugAway",
//     quantity: "500 g",
//     waterUsed: "5 L",
//     totalTrees: 15,
//     date: "Jun - Sep 2025",
//     cost: "3000 per 500g",
//   },
//    {
//     id: 3,
//     type: "Pesticide",
//     name: "BugAway",
//     quantity: "500 g",
//     waterUsed: "5 L",
//     totalTrees: 15,
//     date: "Jun - Sep 2025",
//     cost: "3000 per 500g",
//   },
//    {
//     id: 3,
//     type: "Pesticide",
//     name: "BugAway",
//     quantity: "500 g",
//     waterUsed: "5 L",
//     totalTrees: 15,
//     date: "Jun - Sep 2025",
//     cost: "3000 per 500g",
//   },
// ];

export default function SprayHistory() {
  
   const {data}= useSprayCardQuery();

  
  const totalCost = data?.reduce((sum, item) => {
    const num = parseFloat(item.cost.replace(/[^\d.]/g, ""));
    return sum + num;
  }, 0);

  const typeIcons = {
    Herbicide: <Leaf className="text-[var(--color-secondary)]" size={22} />,
    Fertilizer: <FlaskRound className="text-[var(--color-secondary)]" size={22} />,
    Pesticide: <Bug className="text-[var(--color-secondary)]" size={22} />,
  };

  return (
    <div className="max-w-5xl mx-auto  ">
      <h2 className="text-2xl font-bold text-[var(--color-black)] mb-6">
        Spray History
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((item) => (
          <div
            key={item.id + item.date}
            className="p-5 rounded-2xl bg-[var(--color-white)] shadow-sm border border-gray-200"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {typeIcons[item.type]}
                <span className="font-semibold text-lg text-[var(--color-black)]">
                  {item.name}
                </span>
              </div>
              <span className="text-xs font-medium bg-[var(--color-secondary)] text-[var(--color-white)] px-2 py-1 rounded-md">
                {item.type}
              </span>
            </div>

            <div className="space-y-1 text-[var(--color-black)] text-sm">
              <p>
                <strong>Quantity:</strong> {item.quantity}
              </p>
              <p>
                <strong>Water Used:</strong> {item.waterUsed}
              </p>
              <p>
                <strong>Total Trees:</strong> {item.totalTrees}
              </p>
              <p>
                <strong>Duration:</strong> {item.date}
              </p>
            </div>

            <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-200">
              <span className="text-sm text-[var(--color-gray)]font-medium">
                Spray Cost
              </span>
              <span className="font-semibold text-[var(--color-primary)]">
                ₹{item.cost}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 p-5 rounded-2xl bg-[var(--color-black-hover)] flex justify-between items-center ">
        <span className="text-lg font-semibold text-[var(--color-black)]">
          Total Cost
        </span>
        <span className="text-xl font-bold text-[var(--color-secondary)]">
          ₹{totalCost}
        </span>
      </div>
    </div>
  );
}
