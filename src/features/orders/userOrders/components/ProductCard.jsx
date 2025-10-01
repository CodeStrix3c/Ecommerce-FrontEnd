import ReviewSection from "./ReviewSection";

export default function ProductCard({ product, order, navigate }) {
  return (
    <div className="border-b pb-4 mb-4 flex flex-col sm:flex-row sm:items-center gap-4">
      {/* Product Info */}
      <img
        src={`/${product.image}`}
        alt={product.name}
        className="w-24 h-24 object-contain border rounded-md"
      />
      <div className="flex-1">
        <p className="font-semibold text-sm">{product.brand}</p>
        <p className="text-sm text-[var(--color-black)]">{product.name}</p>
        <p className="text-xs text-gray-500">Quantity: {product.quantity}</p>

        {/* Review + Actions */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mt-2">
          <ReviewSection order={order} />
          <button
            className="mt-5 sm:mt-2 px-3 py-1 text-[var(--color-black)] rounded hover:bg-gray-300 transition underline"
            onClick={() => navigate(`/order-details/${order.orderId}`)}
          >
            View Order Details
          </button>
        </div>
      </div>
    </div>
  );
}
