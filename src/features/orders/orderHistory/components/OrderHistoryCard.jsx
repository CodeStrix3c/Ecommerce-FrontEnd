import {
  Truck,
  CheckCircle,
  RotateCcw,
  RefreshCcw,
  Package,
  Star,
  Clock,
  XCircle,
} from "lucide-react";

export default function OrderCard({
  status,
  statusColor,
  amount,
  date,
  products = [],
  onViewDetails,
  refunded = true,
  rating = 4,
}) {
  if (!products.length) return null;

  const firstProduct = products[0];
  const remainingCount = products.length - 1;

  
  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-[var(--color-primary)]"  />;
      case "shipped":
      case "in transit":
        return <Truck className="w-4 h-4 text-[var(--color-secondary-hover)]" />;
      case "pending":
        return <Clock className="w-4 h-4 text-[var(--color-primary-hover)]" />;
      case "cancelled":
        return <XCircle className="w-4 h-4 text-[var(--color-error)]" />;
      case "returned":
        return <RotateCcw className="w-4 h-4 text-[var(--color-secondary)]" />;
      case "refunded":
        return <RefreshCcw className="w-4 h-4 text-[var(--color-black)]" />;
      default:
        return <Package className="w-4 h-4 text-[var(--color-gray)]" />;
    }
  };

  return (
    <div
      className="border p-4 bg-white cursor-pointer hover:shadow-md transition rounded-md flex flex-col"
      onClick={onViewDetails}
    >
      
      <div className="flex items-center gap-2 mb-2">
        {getStatusIcon(status)}
        <p className={`font-medium text-sm capitalize ${statusColor}`}>
          {status}
        </p>
      </div>

     
      {refunded && (
        <p className="text-sm text-gray-600 mb-3 break-words">
          Your refund of <span className="font-semibold">{amount}</span> for the
          return has been processed successfully on {date}.
        </p>
      )}

      <div className="flex items-center sm:items-start gap-3">
        <img
          src={`/${firstProduct.image}`}
          alt={firstProduct.name}
          className="w-16 h-16 sm:w-20 sm:h-20 object-contain flex-shrink-0"
        />
        <div className="flex flex-col flex-wrap sm:flex-nowrap">
          <p className="font-semibold text-sm break-words">
            {firstProduct.brand}
          </p>
          <p className="text-sm text-gray-700 break-words mt-1">
            {firstProduct.name}
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Quantity: {firstProduct.quantity}
          </p>

          {remainingCount > 0 && (
            <p className="text-xs text-gray-500 mt-1">
              +{remainingCount} more product
              {remainingCount > 1 ? "s" : ""}
            </p>
          )}

          
          <div className="flex items-center mt-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < rating ? "text-[var(--color-secondary)] fill-[var(--color-secondary)]" : "text-gray-300"
                }`}
              />
            ))}
            <span className="text-xs text-gray-600 ml-1">({rating}/5)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
