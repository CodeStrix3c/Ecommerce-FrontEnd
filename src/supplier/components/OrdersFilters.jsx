import DatePickerWithRange from "@/components/ui/DatePickerWithRange";
import { Search } from "lucide-react";


export default function OrdersFilters({
    search,
    setSearch,
    status,
    setStatus,
    dateRange,
    setDateRange,
}) {
    return (
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between mb-4">


            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-secondary)]" />

                <input
                    type="text"
                    placeholder="Search Orders or Products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-[var(--color-gray)] bg-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] text-sm"
                />

                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-red-500 text-sm"
                    >
                        ✕
                    </button>
                )}
            </div>
            <div className="flex flex-wrap gap-3 items-center">


                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 text-sm "
                >
                    <option value="all">All Status</option>
                    <option value="1">Pending</option>
                    <option value="2">Processed</option>
                    <option value="3">Shipped</option>
                    <option value="4">Delivered</option>
                </select>


                <div className="w-full md:w-auto border border-gray-300 rounded-lg px-3 py-2 text-sm ">
                    <DatePickerWithRange setDateRange={setDateRange} />
                </div>

            </div>
        </div>
    );
}