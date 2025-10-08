export default function OrderHeader({ order }) {
  return (
    <div className="flex sm:flex-row justify-between sm:justify-between sm:items-center gap-1 mb-2 text-sm">
      <div className="flex items-center gap-2">
        <p className={`font-medium ${order.statusColor}`}>{order.status}</p>
      <p className="text-gray-500">{order.date}</p>
      </div>
      <p className="text-gray-700">Amount: {order.amount}</p>
    </div>
  );
}
