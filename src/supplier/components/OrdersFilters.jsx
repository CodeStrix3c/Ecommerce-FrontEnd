import DatePickerWithRange from "@/components/ui/DatePickerWithRange";
import { Search, X } from "lucide-react";

export default function OrdersFilters({
  search,
  setSearch,
  status,
  setStatus,
  dateRange,
  setDateRange,
}) {
  const clearFilters = () => {
    setSearch("");
    setStatus("all");
    setDateRange(null);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 md:items-center mb-4">
      
      {/* Search */}
      <div className="relative w-full max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-secondary)]" />

        <input
          type="text"
          placeholder="Search Orders or Products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-[var(--color-gray)] bg-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] text-sm"
        />

        <button
          onClick={() => setSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Status Dropdown */}
      <div className="relative border border-gray-300 rounded-lg px-3 py-2 pr-8">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="text-sm outline-none bg-transparent appearance-none"
        >
          <option value="all">All Status</option>
          <option value="1">New</option>
          <option value="10">On Hold</option>
          <option value="20">Pending Payment</option>
          <option value="30">Payment Received</option>
          <option value="50">Shipping</option>
          <option value="60">Shipped</option>
          <option value="70">Complete</option>
          <option value="80">Cancel</option>
          <option value="90">Canceled</option>
        </select>

        {/* Always Visible Clear Button */}
        <button
          onClick={() => setStatus("all")}
          className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-600"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Date Range */}
      <div className="ml-auto border border-gray-300 rounded-lg px-3 py-2 flex items-center gap-2">
        <DatePickerWithRange
          dateRange={dateRange}
          setDateRange={setDateRange}
        />

        <button
          onClick={clearFilters}
          className="p-1 rounded hover:bg-red-50"
        >
          <X className="w-4 h-4 text-red-500" />
        </button>
      </div>
    </div>
  );
}