import React, { useState } from "react";
import { Tag } from "lucide-react";
import { useCartList } from "@/providers/CartListProvider";
import QuantitySelector from "@/components/shared/QuantitySelector";

const BookingWidget = ({ place, onBuyNow, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const { cartList } = useCartList();

  if (!place) return null;

  const price = place?.price || 0;
  const isCartListed = cartList?.some((item) => item._id === place._id);
  const totalPrice = quantity * price;

  return (
    <div className="w-full md:mx-auto md:max-w-2xl md:pb-0">

      {/* Desktop Card */}
      <div className="hidden md:flex flex-col border rounded-xl p-4 bg-[var(--color-white)] shadow-lg mx-auto">

        {/* Price include notice INSIDE card */}
        <div className="flex items-center border rounded-lg p-3 mb-3 bg-gray-50">
          <Tag className="text-[var(--color-secondary)]" size={18} />
          <p className="ms-3 text-sm font-semibold">
            Prices include all fees
          </p>
        </div>

        {/* Price */}
        <div className="flex px-1 items-center">
          <span className="font-bold text-xl">₹{price}</span>
          <span className="px-1 text-sm font-semibold">per item</span>
        </div>

        {/* Quantity + Total in SAME ROW */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center">
            <p className="text-sm font-semibold">Quantity :</p>
            <div className="ms-3">
              <QuantitySelector
                quantity={quantity}
                setQuantity={setQuantity}
              />
            </div>
          </div>

          <div className="text-sm font-semibold">
            Total: ₹{totalPrice}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={() => onBuyNow(quantity)}
            className="w-full rounded-md bg-[var(--color-primary)] py-3 text-sm font-semibold text-[var(--color-white)] hover:bg-[var(--color-primary-hover)]"
          >
            Buy Now
          </button>

          <button
            onClick={onAddToCart}
            className="w-full rounded-md py-3 text-sm font-medium bg-[var(--color-black-hover)]"
          >
            {isCartListed ? "Remove from your cart" : "Add to your cart"}
          </button>
        </div>
      </div>

      {/* Mobile Bottom Bar (unchanged) */}
      <div className="md:hidden fixed bottom-16 left-0 right-0 z-50 border-t bg-[var(--color-white)] p-4 shadow-lg pb-[calc(env(safe-area-inset-bottom)+14px)]">
        
        <div className="flex justify-between mb-3">
          <div>
            <p className="text-lg font-bold">₹{totalPrice}</p>
            <p className="text-xs">
              {quantity} × ₹{price}
            </p>
          </div>
          <QuantitySelector
            quantity={quantity}
            setQuantity={setQuantity}
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => onBuyNow(quantity)}
            className="flex-1 rounded-md bg-[var(--color-primary)] py-2 text-sm font-semibold text-[var(--color-white)]"
          >
            Buy Now
          </button>

          <button
            onClick={onAddToCart}
            className="flex-1 rounded-md py-2 text-sm font-medium bg-[var(--color-black-hover)]"
          >
            {isCartListed ? "Remove" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
