import { Star } from "lucide-react";

export default function OrderCard({
  status,
  statusColor,
  amount,
  date,
  refundDetailsLabel,
  products = [],
  onViewDetails,
  refunded = true,
}) {
  if (!products.length) return null;

  const firstProduct = products[0];
  const remainingCount = products.length - 1;

  return (
    <div
      className="border p-4  bg-white shadow-sm cursor-pointer hover:shadow-md transition rounded-sm"
      onClick={onViewDetails}
    >
      <p className={`${statusColor} font-medium`}>{status}</p>
     {refunded && (
         
        <p className="text-sm text-gray-600 mb-2">
        Your refund of {amount} for the return has been processed successfully on {date}.{" "}
        <span className="text-blue-600 cursor-pointer">{refundDetailsLabel}</span>
      </p>
     
     )}


      <div className="flex items-center space-x-3 mb-2">
        <img
          src={`/${firstProduct.image}`}
          alt={firstProduct.name}
          className="w-20 h-20 object-contain "
        />
        <div>
          <p className="font-semibold text-sm">{firstProduct.brand}</p>
          <p className="text-sm text-gray-700">{firstProduct.name}</p>
          <p className="text-xs text-gray-500">Quantity: {firstProduct.quantity}</p>

          {remainingCount > 0 && (
            <p className="text-xs text-gray-500 mt-1">+{remainingCount} more product{remainingCount > 1 ? "s" : ""}</p>
          )}
        </div>
      </div>

      
    </div>
  );
}
