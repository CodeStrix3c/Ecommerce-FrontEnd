export default function InventoryStatus({ item, data }) {
  // Determine color based on status string (CRITICAL, LOW, OPTIMAL)
  const color =
    data.status === "CRITICAL"
      ? "var(--color-error)"
      : data.status === "LOW"
        ? "var(--color-secondary)"
        : "var(--color-primary)";

  return (
    <div className="p-3 border border-gray-200 rounded-lg mb-2 bg-white shadow-sm transition duration-150 hover:shadow-md">
      {/* Product Title and SKU */}
      <div className="flex justify-between items-center mb-1">
        <div className="text-sm font-bold text-gray-800">{item}</div>
        <span
          className="font-bold text-[10px] px-2 py-0.5 rounded-full text-white tracking-wider uppercase"
          style={{ backgroundColor: color }}
        >
          {data.status}
        </span>
      </div>

      {/* Key Metrics */}
      <div className="text-xs text-gray-700 grid grid-cols-2 gap-x-4 mt-2">
        {/* On Hand */}
        <div className="flex justify-between border-r border-gray-100 pr-4">
          <span className="text-gray-500">Stock:</span>
          <span className="font-bold text-gray-900">
            {data.onHand.toLocaleString()}
          </span>
        </div>

        {/* 4wk Demand */}
        <div className="flex justify-between pl-4">
          <span className="text-gray-500">4wk Demand:</span>
          <span className="font-bold text-gray-900">
            {data.demand4Wk.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}
