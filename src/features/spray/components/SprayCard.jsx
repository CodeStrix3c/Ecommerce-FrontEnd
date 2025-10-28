import React from "react";


const sprayHistoryData = [
  {
    id: 1,
    type: "Herbicide",
    name: "Cap",
    quantity: "1 kg",
    waterUsed: "10 L",
    totalTrees: 25,
    date: "May - Sep 2025",
    cost: "5000 per 1kg",
  },
  {
    id: 2,
    type: "Fertilizer",
    name: "GrowFast",
    quantity: "2 kg",
    waterUsed: "15 L",
    totalTrees: 40,
    date: "Aug - Oct 2025",
    cost: "6000 per 2kg",
  },
  {
    id: 2,
    type: "Fertilizer",
    name: "GrowFast",
    quantity: "2 kg",
    waterUsed: "15 L",
    totalTrees: 40,
    date: "Jul - Sep 2025",
    cost: "5000 per 2kg",
  },
  {
    id: 2,
    type: "Fertilizer",
    name: "GrowFast",
    quantity: "2 kg",
    waterUsed: "15 L",
    totalTrees: 40,
    date: "Apr - Jun 2025",
    cost: "8000 per 2kg",
   
  },
  {
    id: 2,
    type: "Fertilizer",
    name: "GrowFast",
    quantity: "2 kg",
    waterUsed: "15 L",
    totalTrees: 40,
    date: "Mar - Aug 2025",
    cost: "7000 per 2kg",
  },
  {
    id: 3,
    type: "Pesticide",
    name: "BugAway",
    quantity: "500 g",
    waterUsed: "5 L",
    totalTrees: 15,
    date: "Jun - Sep 2025",
    cost: "3000 per 500g",
  },
   {
    id: 3,
    type: "Pesticide",
    name: "BugAway",
    quantity: "500 g",
    waterUsed: "5 L",
    totalTrees: 15,
    date: "Jun - Sep 2025",
    cost: "3000 per 500g",
  },
   {
    id: 3,
    type: "Pesticide",
    name: "BugAway",
    quantity: "500 g",
    waterUsed: "5 L",
    totalTrees: 15,
    date: "Jun - Sep 2025",
    cost: "3000 per 500g",
  },
   {
    id: 3,
    type: "Pesticide",
    name: "BugAway",
    quantity: "500 g",
    waterUsed: "5 L",
    totalTrees: 15,
    date: "Jun - Sep 2025",
    cost: "3000 per 500g",
  },
   {
    id: 3,
    type: "Pesticide",
    name: "BugAway",
    quantity: "500 g",
    waterUsed: "5 L",
    totalTrees: 15,
    date: "Jun - Sep 2025",
    cost: "3000 per 500g",
  },
];

export default function SprayHistory() {
  const totalCost = sprayHistoryData.reduce((sum, item) => sum + parseFloat(item.cost), 0);

  return (
    <div className="">
      <ul
        className="divide-y"
        style={{ borderColor: "var(--color-black-hover)" }}
      >
        {sprayHistoryData.map((item) => (
          <li
            key={item.id}
            className="py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
          >
          
            <div className="flex flex-col ">
              <span className="font-bold mb-3 text-[var(--color-black)] text-xl sm:text-l">
                {item.name}
                <span className="ml-2 text-[var(--color-secondary)] text-sm sm:text-l">
                  {item.type}
                </span>
              </span>
              <span className="text-[var(--color-black)] text-l sm:text-l">
                Qty: {item.quantity} | Water: {item.waterUsed} | Trees:{" "}
                {item.totalTrees}
              </span>
              <span className="text-[var(--color-black)] text-l sm:text-l">
                {item.date}
              </span>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4">
              <span
                className="font-semibold text-sm lg:text-xs sm:text-xs px-4 py-1 rounded-lg"
                style={{
                  backgroundColor: "var(--color-black-hover)",
                  color: "var(--color-black)",
                  opacity: 0.8,
                }}
              >
                Spray Cost ₹{item.cost.toLocaleString()}
              </span>

            
              {/* <div className="flex gap-2">
                <Edit2
                  size={18}
                  className="cursor-pointer text-[var(--color-primary)] hover:text-[var(--color-primary-hover)]"
                />
                <Trash2
                  size={18}
                  className="cursor-pointer text-[var(--color-error)]  hover:text-[var(--color-error-hover)]"
                />
              </div> */}
            </div>
          </li>
        ))}
      </ul>

   
      <div
        className="flex justify-between items-center mt-4 py-8 border-t"
        style={{ borderColor: "var(--color-black-hover)" }}
      >
        <span className="font-bold text-[var(--color-black)] text-base sm:text-xl">
          Total Cost
        </span>
        <span className="font-bold text-[var(--color-primary)] text-base sm:text-lg">
          ₹{totalCost.toLocaleString()}
        </span>
      </div>
    </div>
  );
} 