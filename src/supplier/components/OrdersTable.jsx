import { Check, XCircle } from "lucide-react";

const orders = [
    {
        id: "#ORD-001",
        customer: "John Doe",
        date: "2026-03-01",
        amount: "120",
        status: "pending"
    },
    {
        id: "#ORD-002",
        customer: "Sarah Lee",
        date: "2026-03-02",
        amount: "80",
        status: "shipped"
    }
];

export default function OrdersTable({ search, status }) {

    const filteredOrders = orders.filter(order =>
        (status === "all" || order.status === status) &&
        order.customer.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="bg-white rounded-xl shadow overflow-x-auto">

            <table className="w-full table-fixed text-sm">

                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 text-left w-1/6">Order ID</th>
                        <th className="p-3 text-left w-1/5">Customer</th>
                        <th className="p-3 text-left w-1/6">Date</th>
                        <th className="p-3 text-left w-1/6">Amount</th>
                        <th className="p-3 text-left w-1/6">Status</th>
                        <th className="p-3 text-left w-1/6">Manage</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredOrders.map(order => (
                        <tr key={order.id} className="border-t hover:bg-gray-50">

                            <td className="p-3">{order.id}</td>
                            <td className="p-3">{order.customer}</td>
                            <td className="p-3">{order.date}</td>
                            <td className="p-3">${order.amount}</td>

                            <td className="p-3">
                                <span className={`px-2 py-1 rounded text-xs
                  ${order.status === "pending" && "bg-yellow-100 text-yellow-700"}
                  ${order.status === "shipped" && "bg-blue-100 text-blue-700"}
                  ${order.status === "delivered" && "bg-green-100 text-green-700"}
                `}>
                                    {order.status}
                                </span>
                            </td>

                            <td className="p-3 flex gap-3">
                                <button className="p-1.5 rounded-lg hover:bg-blue-100 text-blue-600">
                                    <Check size={16} />
                                </button>

                                <button className="p-1.5 rounded-lg hover:bg-red-100 text-red-600">
                                    <XCircle size={16} />
                                </button>
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>

        </div>
    );
}