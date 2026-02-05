import { RemoveCircle } from "@mui/icons-material";
import { ArrowUpDown, ArrowUp, ArrowDown, Pencil, Trash2 } from "lucide-react";

/* ================= DATE FORMAT ================= */
const formatDateTime = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    : "-";

/* ================= SORT HEADER ================= */
const SortHeader = ({ label, column, sortBy, sortReverse, onSort }) => {
  const active = sortBy === column;

  return (
    <button
      type="button"
      onClick={() => onSort(column)}
      className="flex items-center gap-2 text-xs font-semibold whitespace-nowrap"
    >
      <span>{label}</span>

      <span className="w-4 flex items-center justify-center">
        {!active && (
          <ArrowUpDown size={14} className="text-[var(--color-black)]" />
        )}
        {active &&
          (sortReverse ? (
            <ArrowDown size={14} className="text-[var(--color-black)]" />
          ) : (
            <ArrowUp size={14} className="text-[var(--color-black)]" />
          ))}
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
  if (!Array.isArray(products) || products.length === 0) {
    return (
      <div className="text-center py-10 text-sm text-gray-500">
        No products found
      </div>
    );
  }

  return (
    /* ===== Scroll wrapper makes desktop table work on mobile ===== */
    <div className="w-full overflow-x-auto">
      <div className="min-w-[1000px] bg-[var(--color-white)] border rounded-xl overflow-hidden">

        {/* ================= HEADER ================= */}
        <div
          className="grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr_1fr_120px]
          gap-4 px-4 py-3 text-xs uppercase font-semibold
          bg-gray-200 border-b"
        >
          <SortHeader
            label="Product Name"
            column="ProductName"
            {...{ sortBy, sortReverse, onSort }}
          />

          <div className="flex justify-end">
            <SortHeader
              label="Price"
              column="AssignedPrice"
              {...{ sortBy, sortReverse, onSort }}
            />
          </div>

          <div className="flex justify-end">
            <SortHeader
              label="Our Price"
              column="DiscountPrice"
              {...{ sortBy, sortReverse, onSort }}
            />
          </div>

          <div className="flex justify-end">
            <SortHeader
              label="Qty"
              column="StockQuantity"
              {...{ sortBy, sortReverse, onSort }}
            />
          </div>

          <div className="flex justify-center">
            <SortHeader
              label="Date"
              column="CreatedAt"
              {...{ sortBy, sortReverse, onSort }}
            />
          </div>

          <div className="flex justify-center">Status</div>
          <div className="flex justify-end">Actions</div>
        </div>

        {/* ================= ROWS ================= */}
        {products.map((p) => (
          <div
            key={p.id || p.productId}
            className="grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr_1fr_120px]
            gap-4 items-center px-4 py-4 border-b hover:bg-gray-50"
          >
            {/* Product */}
            <span className="font-medium truncate max-w-[240px]">
              {p.productName}
            </span>

            {/* Price */}
            <span className="text-right whitespace-nowrap">
              ₹{p.assignedPrice}
            </span>

            {/* Our Price */}
            <span className="text-right whitespace-nowrap">
              ₹{p.discountPrice || 0}
            </span>

            {/* Qty */}
            <span className="text-right whitespace-nowrap">
              {p.stockQuantity}
            </span>

            {/* Date */}
            <span className="text-center whitespace-nowrap">
              {formatDateTime(p.createdAt)}
            </span>

            {/* Status */}
            <span
              className={`text-xs font-semibold px-2 py-1 rounded-full
              text-center whitespace-nowrap w-20 mx-auto
              ${p.isActive
                  ? "bg-green-50 text-[var(--color-success)]"
                  : "bg-red-100 text-[var(--color-error)]"
                }`}
            >
              {p.isActive ? "Active" : "Inactive"}
            </span>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <button onClick={() => onEdit(p)} title="Edit">
                <Pencil size={18} />
              </button>

              <button
                onClick={() => onDelete(p.id || p.productId)}
                title="Delete"
              >
                <RemoveCircle size={18} className="text-red-600" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTable;
