import { Pencil, Trash2 } from "lucide-react";

export default function ProductTable({ products = [] }) {
  return (
    <div className="overflow-x-auto bg-white rounded-md shadow-sm">
      <table className="min-w-full border-collapse">
        {/* TABLE HEADER */}
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              ID
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Product Name
            </th>

            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Assigned Price
            </th>

            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Stock Quantity
            </th>

            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Active
            </th>

            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Actions
            </th>
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {products.map((product) => (
            <tr
              key={product.id}
              className="border-b last:border-b-0 hover:bg-gray-50"
            >
              {/* ID */}
              <td className="px-4 py-3 text-sm text-gray-800">{product.id}</td>

              {/* PRODUCT NAME (MANDATORY) */}
              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {product.productName || "-"}
              </td>

              {/* ASSIGNED PRICE */}
              <td className="px-4 py-3 text-sm text-gray-800">
                ₹{Number(product.assignedPrice).toFixed(2)}
              </td>

              {/* STOCK QUANTITY */}
              <td className="px-4 py-3 text-sm text-center text-gray-800">
                {product.stockQuantity}
              </td>

              {/* ACTIVE */}
              <td className="px-4 py-3 text-sm text-center">
                {product.isActive ? (
                  <span className="text-green-600 font-medium">Active</span>
                ) : (
                  <span className="text-red-500 font-medium">Inactive</span>
                )}
              </td>

              {/* ACTIONS */}
              <td className="px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-3">
                  {/* EDIT */}
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit Product"
                    onClick={() => console.log("Edit", product.id)}
                  >
                    <Pencil size={18} />
                  </button>

                  {/* DELETE */}
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800"
                    title="Delete Product"
                    onClick={() => console.log("Delete", product.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}

          {/* EMPTY STATE */}
          {products.length === 0 && (
            <tr>
              <td
                colSpan={6}
                className="px-4 py-6 text-center text-sm text-gray-500"
              >
                No products found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
