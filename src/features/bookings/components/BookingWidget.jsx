import React, { useState } from "react";
import { toast } from "react-toastify";
import { Tag } from "lucide-react";
import { useCartList } from "@/providers/CartListProvider";
import QuantitySelector from "@/components/shared/QuantitySelector";

const BookingWidget = ({ place, onBuyNow, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const { cartList } = useCartList();
  const isCartListed = cartList.some((item) => item._id === place._id);

  const totalPrice = quantity * place.price;

  return (
    <div className="mx-auto max-w-2xl w-full">
      {/* Price notice */}
      <div className="hidden md:flex border rounded-lg mb-4 p-4 items-center">
        <Tag color="red" />
        <p className="ms-4 font-semibold">Prices include all fees</p>
      </div>

      {/* Desktop */}
      <div className="hidden md:flex flex-col border rounded-xl p-5 bg-[var(--color-white)] shadow-lg max-w-xl mx-auto">
        <div className="flex px-2 items-center">
          <span className="font-bold text-xl">₹{place.price}</span>
          <span className="px-1 text-sm font-semibold">per unit</span>
        </div>

        <div className="mt-4">
          <div className="flex items-center mb-4">
            <p className="text-sm font-semibold">Quantity :</p>
            <div className="ms-3">
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            </div>
          </div>

          <div className="text-sm font-semibold">
            Total price: ₹{totalPrice}
          </div>
        </div>

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

      {/* Mobile Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-[var(--color-white)] p-4 shadow-lg">
        <div className="flex justify-between mb-3">
          <div>
            <p className="text-lg font-bold">₹{totalPrice}</p>
            <p className="text-xs">
              {quantity} × ₹{place.price}
            </p>
          </div>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
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
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
