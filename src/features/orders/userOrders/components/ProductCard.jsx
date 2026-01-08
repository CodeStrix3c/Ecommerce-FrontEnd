import {
  Truck,
  CheckCircle,
  Clock,
  XCircle,
  RotateCcw,
  RefreshCcw,
  Star,
  StarHalf,
} from "lucide-react";
import ReviewSection from "./UserOrdersReviewSection";
import { ChevronRightTwoTone } from "@mui/icons-material";

export default function ProductCard({ product, order, navigate }) {
  // Pick icon based on product.status
  const getProductStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-4 h-4 text-[var(--color-primary)]" />;
      case "in transit":
        return (
          <Truck className="w-4 h-4 text-[var(--color-secondary-hover)]" />
        );
      case "cancelled":
        return <XCircle className="w-4 h-4 text-[var(--color-error)]" />;
      case "returned":
        return <RotateCcw className="w-4 h-4 text-[var(--color-secondary)]" />;
      case "refunded":
        return <RefreshCcw className="w-4 h-4 text-[var(--color-black)]" />;
      default:
        return <Clock className="w-4 h-4 text-[var(--color-primary-hover)]" />;
    }
  };

  // Rating UI
  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const isHalf = rating % 1 !== 0;

    return (
      <div className="flex items-center mt-3">
        {[...Array(5)].map((_, i) => {
          const fullStars = Math.floor(rating);
          const isHalfStar =
            rating - i > 0 && rating - i < 1 && i < Math.ceil(rating);

          if (i < fullStars) {
            return (
              <Star
                key={i}
                className="w-4 h-4 text-[var(--color-secondary)]"
                fill="currentColor"
              />
            );
          } else if (isHalfStar) {
            return (
              <StarHalf
                key={i}
                className="w-4 h-4 text-[var(--color-secondary)]"
                fill="currentColor"
              />
            );
          } else {
            return <Star key={i} className="w-4 h-4 text-gray-300" />;
          }
        })}

        <span className="text-xs text-gray-600 ml-1">
          ({rating.toFixed(1)}/5)
        </span>
      </div>
    );
  };

  return (
    <div className="border-b pb-4 mb-4 flex flex-col gap-3 w-full">
      <div className="flex items-center gap-2">
        {getProductStatusIcon(product.status)}
        <p className="font-medium text-sm capitalize">{product.status}</p>
      </div>

      {product.message && (
        <p className="text-xs text-[var(--color-black)] ">{product.message}</p>
      )}

      {/* PRODUCT MAIN CARD */}
      <div
        className="flex justify-between sm:flex-row sm:items-center gap-4 w-full hover:bg-[var(--color-black-hover)] cursor-pointer"
        onClick={() =>
          navigate(`/order-details/${order.orderId}`, {
            state: { order, product },
          })
        }
      >
        <div className="flex items-center gap-4">
          <img
            src={`/${product.image}`}
            alt={product.name}
            className="w-24 h-24 object-contain border rounded-md"
          />

          <div className="flex flex-col">
            <p className="font-semibold text-sm">{product.brand}</p>
            <p className="text-sm text-[var(--color-black)] mt-1">
              {product.name}
            </p>
            <p className="text-xs text-[var(--color-black)] mt-1">
              Quantity: {product.quantity}
            </p>

            <div className="mt-2">{renderRatingStars(product.rating)}</div>
          </div>
        </div>

        <button
          className="p-2 text-[var(--color-black)]"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/order-details/${order.orderId}`, {
              state: { order, product },
            });
          }}
        >
          <ChevronRightTwoTone size={20} />
        </button>
      </div>

      <div className="mt-2">
        <ReviewSection order={order} />
      </div>
    </div>
  );
}
