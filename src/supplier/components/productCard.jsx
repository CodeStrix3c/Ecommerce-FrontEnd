import { Pencil, Trash2 } from "lucide-react";

const ProductTable = ({ products = [], onDelete, onEdit }) => {
  if (!products.length) {
    return (
      <div className="text-center text-sm text-gray-500 py-6">
        No products found
      </div>
    );
  }

  return (
    <div className="w-full space-y-3">
      {/* ================= DESKTOP TABLE ================= */}
      <div className="hidden sm:block">
        {/* HEADER */}
        <div
          className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_80px]
          px-5 py-2 text-xs font-semibold text-gray-500 uppercase"
        >
          <span>Name</span>
          <span className="text-right">Price</span>
          <span className="text-right">Discount</span>
          <span className="text-right">Qty</span>
          <span className="text-center">Status</span>
          <span className="text-right">Actions</span>
        </div>

        {/* ROWS */}
        {products.map((item) => (
          <div
            key={item.id} // ✅ assignment id
            className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_80px]
            items-center rounded-lg border bg-white px-4 py-3 mt-1
            shadow-sm hover:shadow-md transition"
          >
            <span className="text-sm font-medium truncate">
              {item.productName}
            </span>

            <span className="text-sm text-right font-medium">
              ₹{item.assignedPrice}
            </span>

            <span className="text-sm text-right text-gray-600">
              ₹{item.discountPrice || 0}
            </span>

            <span className="text-sm text-right">{item.stockQuantity}</span>

            <span className="flex justify-center">
              <span
                className={`px-2 py-1 rounded-full text-xs ${
                  item.isActive
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {item.isActive ? "Active" : "Inactive"}
              </span>
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
