import { Loader2 } from "lucide-react";

export default function OrdersTable({
  orders,
  search,
  status,
  dateRange,
  isLoading,
}) {

  const startDate = dateRange?.from;
  const endDate = dateRange?.to;

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      status === "all" || order.orderStatus.toString() === status;

    const searchLower = search.toLowerCase();

    const matchesSearch =
      order.id.toString().includes(searchLower) ||
      order.orderItems.some((item) =>
        item.productName.toLowerCase().includes(searchLower)
      );

    const orderDate = new Date(order.createdOn);

    const matchesDate =
      (!startDate || orderDate >= new Date(startDate)) &&
      (!endDate || orderDate <= new Date(endDate));

    return matchesStatus && matchesSearch && matchesDate;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin text-[var(--color-secondary)] w-7 h-7" />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-x-auto">
      <table className="w-full table-fixed text-sm">
        <thead className="bg-gray-100 border-b">
          <tr className="text-black">
            <th className="p-4 text-left w-[120px]">Order ID</th>
            <th className="p-4 text-left w-[350px]">Products</th>
            <th className="p-4 text-center w-[120px]">Quantity</th>
            <th className="p-4 text-center w-[140px]">Date</th>
            <th className="p-4 text-center w-[140px]">Amount</th>
            <th className="p-4 text-center w-[140px]">Status</th>
          </tr>
        </thead>

        <tbody>
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <tr key={order.id} className="border-b hover:bg-gray-50">

                <td className="p-4 font-medium text-gray-800 align-top">
                  ORD-{order.id}
                </td>

                <td className="p-4 align-top">
                  <div className="space-y-3">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-6">
                        <img
                          src={item.thumbnailImage}
                          alt={item.productName}
                          className="w-10 h-10 rounded-md object-cover border"
                        />

                        <span className="text-sm text-gray-700">
                          {item.productName}
                        </span>
                      </div>
                    ))}
                  </div>
                </td>

                <td className="p-4 text-center align-top">
                  <div className="space-y-10 font-medium text-gray-700">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx}>{item.quantity}</div>
                    ))}
                  </div>
                </td>

                <td className="p-4 text-center text-gray-600 align-top">
                  {new Date(order.createdOn).toLocaleDateString("en-IN")}
                </td>

                <td className="p-4 text-center font-semibold text-gray-900 align-top">
                  ₹ {order.subTotalString.replace("$", "")}
                </td>

                <td className="p-4 text-center align-top">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium
                    ${order.orderStatus === 1
                        ? "bg-yellow-100 text-[var(--color-secondary)]"
                        : order.orderStatus === 2
                          ? "bg-blue-100 text-[var(--color-secondary)]"
                          : order.orderStatus === 3
                            ? "bg-purple-100 text-[var(--color-secondary)]"
                            : "bg-green-100 text-[var(--color-secondary)]"
                      }`}
                  >
                    {order.orderStatus === 1
                      ? "Pending"
                      : order.orderStatus === 2
                        ? "Processed"
                        : order.orderStatus === 3
                          ? "Shipped"
                          : "Delivered"}
                  </span>
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