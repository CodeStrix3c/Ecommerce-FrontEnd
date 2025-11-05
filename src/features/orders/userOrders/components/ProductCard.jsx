import { ArrowRight, Eye, FileText } from "lucide-react";
import ReviewSection from "./UserOrdersReviewSection";
import { ChevronRightTwoTone } from "@mui/icons-material";

export default function ProductCard({ product, order, navigate }) {
  return (
    <div className="border-b pb-4 mb-4 flex flex-col gap-4 w-full">

      <div className="flex justify-between sm:flex-row sm:items-center gap-4 w-full hover:bg-[var(--color-black-hover)] cursor-pointer"
                  onClick={() => navigate(`/order-details/${order.orderId}`)}

      >

        <div className="flex items-center gap-4">
          <img
            src={`/${product.image}`}
            alt={product.name}
            className="w-24 h-24 object-contain border rounded-md"
          />
          <div className="flex flex-col">
            <p className="font-semibold text-sm">{product.brand}</p>
            <p className="text-sm text-[var(--color-black)] mt-1">{product.name}</p>
            <p className="text-xs text-gray-500 mt-1" >Quantity: {product.quantity}</p>
          </div>
        </div>

        <div className="flex justify-end mt-2 sm:mt-0">
          <button
            className="p-2 text-[var(--color-black)] "
            onClick={() => navigate(`/order-details/${order.orderId}`)}
          >
            <ChevronRightTwoTone  size={20} />
          </button>
        </div>

      </div>

      <div className="mt-2">
        <ReviewSection order={order} />
      </div>

    </div>
  );
}
