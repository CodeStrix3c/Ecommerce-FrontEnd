import { ArrowUpDown, ArrowUp, ArrowDown, Pencil, Trash2 } from "lucide-react";

/* ================= DATE FORMAT ================= */
const formatDate = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

/* ================= SORTABLE HEADER ================= */
const SortHeader = ({
  label,
  column,
  sortBy,
  sortReverse,
  onSort,
  align = "left",
}) => {
  const active = sortBy === column;

  const alignClass =
    align === "right"
      ? "justify-end text-right"
      : align === "center"
        ? "justify-center text-center"
        : "justify-start text-left";

  return (
    <button
      type="button"
      onClick={() => onSort(column)}
      className={`flex items-center gap-1 text-xs font-semibold uppercase ${alignClass}`}
    >
      <span>{label}</span>

      <span className="w-4 flex justify-center">
        {!active && <ArrowUpDown size={14} />}
        {active &&
          (sortReverse ? <ArrowDown size={14} /> : <ArrowUp size={14} />)}
      </span>
    </button>
  );
};

/* ================= PRODUCT TABLE ================= */
const ProductTable = ({
  products = [],
  sortBy,
  sortReverse,
  onSort,
  onEdit,
  onDelete,
}) => {
  if (!products.length) {
    return (
      <div className="text-center text-sm text-gray-500 py-8">
        No products found
      </div>
    );
  }

  return (
    <div className="relative overflow-x-auto scrollbar-none">
      <div className="min-w-[1100px] rounded-xl border bg-white shadow-sm">
        {/* ================= HEADER ================= */}
        <div
          className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr_90px]
          bg-gray-50 px-5 py-3 text-xs font-semibold text-gray-600
          rounded-t-xl border-b"
        >
          <SortHeader
            label="Name"
            column="ProductName"
            sortBy={sortBy}
            sortReverse={sortReverse}
            onSort={onSort}
          />

          <SortHeader
            label="Price"
            column="AssignedPrice"
            align="right"
            sortBy={sortBy}
            sortReverse={sortReverse}
            onSort={onSort}
          />

          <SortHeader
            label="Discount"
            column="DiscountPrice"
            align="right"
            sortBy={sortBy}
            sortReverse={sortReverse}
            onSort={onSort}
          />

          <SortHeader
            label="Qty"
            column="StockQuantity"
            align="right"
            sortBy={sortBy}
            sortReverse={sortReverse}
            onSort={onSort}
          />

          <SortHeader
            label="Created"
            column="CreatedOn"
            align="right"
            sortBy={sortBy}
            sortReverse={sortReverse}
            onSort={onSort}
          />

          <SortHeader
            label="Status"
            column="IsActive"
            align="center"
            sortBy={sortBy}
            sortReverse={sortReverse}
            onSort={onSort}
          />

          <span className="text-right">Actions</span>
        </div>

        {/* ================= ROWS ================= */}
        <div className="divide-y">
          {products.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_1fr_90px]
              items-center px-5 py-4 text-sm hover:bg-gray-50 transition"
            >
              {/* NAME */}
              <span className="font-medium truncate">{item.productName}</span>

              {/* PRICE */}
              <span className="text-right font-medium">
                ₹{item.assignedPrice}
              </span>

              {/* DISCOUNT */}
              <span className="text-right text-gray-600">
                ₹{item.discountPrice || 0}
              </span>

              {/* QTY */}
              <span className="text-right">{item.stockQuantity}</span>

              {/* CREATED */}
              <span className="text-right">{formatDate(item.createdOn)}</span>

              {/* STATUS */}
              <span className="flex justify-center">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.isActive ? "Active" : "Inactive"}
                </span>
              </span>

              {/* ACTIONS */}
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => onEdit(item)}
                  className="p-2 rounded-md text-blue-600 hover:bg-blue-50"
                >
                  <Pencil size={16} />
                </button>

                <button
                  onClick={() => onDelete(item.id)}
                  className="p-2 rounded-md text-red-600 hover:bg-red-50"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
