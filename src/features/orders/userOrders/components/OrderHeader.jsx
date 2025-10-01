export default function OrderHeader({ order }) {
  return (
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2">
      <p className={`font-medium ${order.statusColor}`}>{order.status}</p>
      <p className="text-sm text-gray-500">{order.date}</p>
      <p className="text-sm text-gray-700">Amount: {order.amount}</p>
    </div>
  );
}
