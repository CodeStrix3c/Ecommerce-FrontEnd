import { Pencil, Trash2 } from "lucide-react";

export default function ProductTable({ products }) {
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
              Name
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Stock
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Options
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Visible Individually
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Published
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Featured
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Call For Pricing
            </th>
            <th className="px-4 py-3 text-center text-sm font-semibold text-gray-700">
              Allow To Order
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700">
              Created On
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
              <td className="px-4 py-3 text-sm text-gray-800">{product.id}</td>

              <td className="px-4 py-3 text-sm font-medium text-gray-900">
                {product.name}
              </td>

              <td className="px-4 py-3 text-sm text-center text-gray-800">
                {product.stockQuantity}
              </td>

              <td className="px-4 py-3 text-sm text-center">
                {product.hasOptions ? "Yes" : "No"}
              </td>

              <td className="px-4 py-3 text-sm text-center">
                {product.isVisibleIndividually ? "Yes" : "No"}
              </td>

              <td className="px-4 py-3 text-sm text-center">
                {product.isPublished ? (
                  <span className="text-green-600 font-medium">Yes</span>
                ) : (
                  <span className="text-red-500 font-medium">No</span>
                )}
              </td>

              <td className="px-4 py-3 text-sm text-center">
                {product.isFeatured ? "Yes" : "No"}
              </td>

              <td className="px-4 py-3 text-sm text-center">
                {product.isCallForPricing ? "Yes" : "No"}
              </td>

              <td className="px-4 py-3 text-sm text-center">
                {product.isAllowToOrder ? "Yes" : "No"}
              </td>

              <td className="px-4 py-3 text-sm text-gray-600">
                {new Date(product.createdOn).toLocaleDateString()}
              </td>

              {/* ACTIONS */}
              <td className="px-4 py-3 text-center">
                <div className="flex items-center justify-center gap-3">
                  {/* EDIT */}
                  <button
                    type="button"
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit Product"
                  >
                    <Pencil size={18} />
                  </button>

                  {/* DELETE */}
                  <button
                    type="button"
                    className="text-red-600 hover:text-red-800"
                    title="Delete Product"
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
}
