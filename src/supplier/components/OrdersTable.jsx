import { Check, XCircle, Loader2 } from "lucide-react";

export default function OrdersTable({ orders, search, status, isLoading }) {
  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      status === "all" || order.orderStatus.toString() === status;

    // Search by Order ID or Product Name within orderItems
    const searchLower = search.toLowerCase();
    const matchesSearch =
      order.id.toString().includes(searchLower) ||
      order.orderItems.some((item) =>
        item.productName.toLowerCase().includes(searchLower),
      );

    return matchesStatus && matchesSearch;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin text-[var(--color-secondary)]" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full table-fixed text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 text-left w-1/6">Order ID</th>
            <th className="p-3 text-left w-1/4">Products</th>
            <th className="p-3 text-left w-1/6">Date</th>
            <th className="p-3 text-left w-1/6">Amount</th>
            <th className="p-3 text-left w-1/6">Status</th>
            <th className="p-3 text-left w-1/6">Manage</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id} className="border-t hover:bg-gray-50">
                <td className="p-3 font-medium">#ORD-{order.id}</td>
                <td className="p-3">
                  <div className="flex flex-col">
                    {order.orderItems.map((item, idx) => (
                      <span
                        key={idx}
                        className="truncate text-xs text-gray-600"
                      >
                        {item.quantity}x {item.productName}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="p-3">
                  {new Date(order.createdOn).toLocaleDateString()}
                </td>
                <td className="p-3 font-semibold">{order.subTotalString}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium
                                        ${order.orderStatus === 1 ? "bg-yellow-100 text-yellow-700" : "bg-gray-100 text-gray-700"}
                                    `}
                  >
                    {order.orderStatus === 1 ? "Pending" : "Processed"}
                  </span>
                </td>
                <td className="p-3 flex gap-3">
                  <button className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600 transition-colors">
                    <Check size={16} />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-100 text-red-600 transition-colors">
                    <XCircle size={16} />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-10 text-center text-gray-500">
                No orders found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
