import { Pencil, Trash2 } from "lucide-react";

const ProductTable = ({ products = [], onDelete, onEdit }) => {
  if (!products.length) {
    return (
      <div className="text-center text-sm text-gray-500 py-8">
        No products found
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* ================= TABLE WITH HORIZONTAL SCROLL ================= */}
      <div
        className="relative overflow-x-auto
        scrollbar-none"
      >
        <div className="min-w-[900px] rounded-xl border bg-white shadow-sm">
          {/* HEADER */}
          <div
            className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_90px]
  bg-gray-50 px-5 py-3 text-xs font-semibold text-gray-600 uppercase
  rounded-t-xl border-b border-gray-200"
          >
            <span>Name</span>
            <span className="text-right">Price</span>
            <span className="text-right">Discount</span>
            <span className="text-right">Qty</span>
            <span className="text-center">Status</span>
            <span className="text-right">Actions</span>
          </div>

          {/* ROWS */}
          <div className="divide-y">
            {products.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-[1.5fr_1fr_1fr_1fr_1fr_90px]
                items-center px-5 py-4 text-sm
                hover:bg-gray-50 transition"
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

                {/* QUANTITY */}
                <span className="text-right">{item.stockQuantity}</span>

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
                    title="Edit"
                    className="p-2 rounded-md
                    text-blue-600 hover:bg-blue-50 hover:text-blue-700 transition"
                  >
                    <Pencil size={16} />
                  </button>

                  <button
                    onClick={() => onDelete(item.id)}
                    title="Delete"
                    className="p-2 rounded-md
                    text-red-600 hover:bg-red-50 hover:text-red-700 transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
