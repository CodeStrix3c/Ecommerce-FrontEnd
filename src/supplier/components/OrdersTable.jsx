import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const STATUS_COLOR = {
  1: "bg-yellow-100 text-yellow-700",
  10: "bg-gray-200 text-gray-700",
  20: "bg-orange-100 text-orange-700",
  30: "bg-green-100 text-green-700",
  35: "bg-red-100 text-red-700",
  40: "bg-blue-100 text-blue-700",
  50: "bg-purple-100 text-purple-700",
  60: "bg-indigo-100 text-indigo-700",
  70: "bg-green-100 text-green-700",
  80: "bg-red-100 text-red-700",
  90: "bg-pink-100 text-pink-700",
  100: "bg-gray-300 text-gray-800",
};

export default function OrdersTable({
  orders,
  search,
  status,
  dateRange,
  isLoading,
}) {
  const navigate = useNavigate();

  const filteredOrders = orders.filter((order) => {
    const matchesStatus =
      status === "all" || order.orderStatus.toString() === status;

    const searchLower = search.toLowerCase();

    const matchesSearch =
      order.id.toString().includes(searchLower) ||
      order.orderItems.some((item) =>
        item.productName.toLowerCase().includes(searchLower),
      );

    let matchesDate = true;

    if (dateRange?.from && dateRange?.to) {
      const orderDate = new Date(order.createdOn);

      const from = new Date(dateRange.from);
      const to = new Date(dateRange.to);
      to.setHours(23, 59, 59, 999);

      matchesDate = orderDate >= from && orderDate <= to;
    }

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
            filteredOrders.map((order) => {
              const statusColor =
                STATUS_COLOR[order.orderStatus] || "bg-gray-100 text-gray-700";

              return (
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
                    {order.subTotalString}
                  </td>

                  <td className="p-4 text-center align-top">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${statusColor}`}
                    >
                      {order.orderStatusString}
                    </span>

                    <button
                      onClick={() => navigate(`/orderdetails/${order.id}`)}
                      className="text-blue-600 text-xs pl-5"
                    >
                      View
                    </button>
                  </td>
                </tr>
              );
            })
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
