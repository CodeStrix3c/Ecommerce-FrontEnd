import { Search } from "lucide-react";

export default function OrdersFilters({ search, setSearch, status, setStatus }) {
    return (
        <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">



            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--color-secondary)]" />

                <input
                    type="text"
                    placeholder="Search Products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-10 pr-8 py-2.5 rounded-xl border border-[var(--color-gray)] bg-[var(--color-white)] focus:outline-none focus:ring-2 focus:ring-[var(--color-secondary)] text-sm"
                />

                {search && (
                    <button
                        onClick={() => setSearch("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-error)] text-sm"
                    >
                        ✕
                    </button>
                )}
            </div>


            <div className="flex gap-3">

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="border rounded-lg px-3 py-2"
                >
                    <option value="all">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                </select>

                <input
                    type="date"
                    className="border rounded-lg px-3 py-2"
                />

            </div>
        </div>


    );
}