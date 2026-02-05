import { RemoveCircle } from "@mui/icons-material";
import { ArrowUpDown, ArrowUp, ArrowDown, Pencil } from "lucide-react";

/* ================= DATE FORMAT ================= */
const formatDateTime = (date) =>
  date
    ? new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    })
    : "-";

const SortHeader = ({ label, column, sortBy, sortReverse, onSort }) => {
  const active = sortBy === column;

  return (
    <button
      type="button"
      onClick={() => onSort(column)}
      className="flex items-center gap-2 text-xs font-semibold whitespace-nowrap"
    >
      <span>{label}</span>

      {/* Fixed width icon wrapper so alignment never shifts */}
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


const ProductTable = ({
  products = [],
  sortBy,
  sortReverse,
  onSort,
  onEdit,
  onDelete,
}) => {
  if (!products || products.length === 0) {
    return (
      <div className="text-center py-10 text-sm text-gray-500">
        No products found
      </div>
    );
  }

  return (
    /* ================= SCROLL WRAPPER ================= */
    <div className="w-full overflow-x-auto">
      {/* ================= TABLE ================= */}
      <div className="min-w-[1000px] bg-[var(--color-white)] border rounded-xl overflow-hidden">

        {/* ================= HEADER ================= */}
        <div
          className="grid grid-cols-[2fr_1fr_1fr_1fr_1.5fr_1fr_120px]
          gap-4 px-4 py-3 text-xs uppercase font-semibold
          bg-gray-200 border-b"
        >

          <div className="flex items-center justify-start">
            <SortHeader
              label="Product Name"
              column="ProductName"
              {...{ sortBy, sortReverse, onSort }}
            />
          </div>

          {/* Price */}
          <div className="flex items-center justify-end">
            <SortHeader
              label="Price"
              column="AssignedPrice"
              {...{ sortBy, sortReverse, onSort }}
            />
          </div>


          <div className="flex items-center justify-end">
            <SortHeader
              label="Our Price"
              column="DiscountPrice"
              {...{ sortBy, sortReverse, onSort }}
            />
          </div>


          <div className="flex items-center justify-end">
            <SortHeader
              label="Qty"
              column="StockQuantity"
              {...{ sortBy, sortReverse, onSort }}
            />
          </div>


          <div className="flex items-center justify-center">
            <SortHeader
              label="Date"
              column="CreatedAt"
              {...{ sortBy, sortReverse, onSort }}
            />
          </div>


          <div className="flex items-center justify-center whitespace-nowrap">
            Status
          </div>


          <div className="flex items-center justify-end whitespace-nowrap">
            Actions
          </div>
        </div>


        {products.map((p) => (
          <div
            key={item.id} // ✅ assignment id
            className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_80px]
            items-center rounded-lg border bg-white px-4 py-3 mt-1
            shadow-sm hover:shadow-md transition"
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
              className={`text-xs font-semibold px-2 py-1 rounded-full text-center whitespace-nowrap
                ${p.isActive
                  ? " text-[var(--color-success)] bg-green-50  w-20"
                  : "bg-red-100 text-[var(--color-error)] w-20"
                }`}
            >
              {p.isActive ? "Active" : "Inactive"}
            </span>

            <div className="flex justify-end gap-3">
              {/* EDIT → full item (already correct) */}
              <button
                onClick={() => onEdit(item)}
                className="text-blue-600 hover:text-blue-800"
                title="Edit"
              >
                <Pencil size={18} />
              </button>

              {/* DELETE → ✅ assignment ID (FIXED) */}
              <button
                onClick={() => onDelete(item.id)}
                className="text-red-600 hover:text-red-800"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ================= MOBILE CARDS ================= */}
      <div className="sm:hidden space-y-3">
        {products.map((item) => (
          <div
            key={item.id} // ✅ assignment id
            className="rounded-xl border bg-white p-4
            shadow-sm hover:shadow-md transition"
          >
            {/* TOP */}
            <div className="flex justify-between items-start">
              <h3 className="text-sm font-semibold truncate">
                {item.productName}
              </h3>

              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  item.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.isActive ? "Active" : "Inactive"}
              </span>
            </div>

            {/* PRICE + DISCOUNT */}
            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-xs text-gray-500">Price</p>
                <p className="font-medium">₹{item.assignedPrice}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Discount</p>
                <p>₹{item.discountPrice || 0}</p>
              </div>
            </div>

            {/* QUANTITY + ACTIONS */}
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Quantity</p>
                <p className="text-sm font-medium">{item.stockQuantity}</p>
              </div>

              <div className="flex gap-4">
                {/* EDIT */}
                <button
                  onClick={() => onEdit(item)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <Pencil size={18} />
                </button>

                {/* DELETE → ✅ assignment ID */}
                <button
                  onClick={() => onDelete(item.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductTable;
