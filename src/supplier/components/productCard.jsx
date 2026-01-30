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
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100 text-left text-sm">
            <th className="p-3">Product</th>
            <th className="p-3">Price</th>
            <th className="p-3">Discount</th>
            <th className="p-3">Quantity</th>
            <th className="p-3">Status</th>
            <th className="p-3 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item) => (
            <tr
              key={item.productId}
              className="border-b hover:bg-gray-50 text-sm"
            >
              <td className="p-3 font-medium">{item.productName}</td>

              <td className="p-3">₹{item.assignedPrice}</td>

              <td className="p-3">₹{item.discountPrice || 0}</td>

              <td className="p-3">{item.stockQuantity}</td>

              <td className="p-3">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
                    item.isActive
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.isActive ? "Active" : "Inactive"}
                </span>
              </td>

              <td className="p-3">
                <div className="flex justify-end gap-3">
                  {/* ✅ EDIT */}
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => onEdit(item)}
                    title="Edit"
                  >
                    <Pencil size={18} />
                  </button>

                  {/* ✅ DELETE */}
                  <button
                    className="text-red-600 hover:text-red-800"
                    onClick={() => onDelete(item.productId)}
                    title="Delete"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
