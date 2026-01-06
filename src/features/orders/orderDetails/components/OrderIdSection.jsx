export default function OrderIdSection({ order }) {
  return (
    <div className="bg-[var(--color-white)] shadow-md w-full p-4 sm:p-5">
      <p className="text-gray-700 font-medium text-sm sm:text-base">
        Order ID: <span className="font-semibold">{order.orderId}</span>
      </p>
    </div>
  );
}
