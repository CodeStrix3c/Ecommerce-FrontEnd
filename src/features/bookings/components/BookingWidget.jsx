import { useCartList } from "@/providers/CartListProvider";
import React, { useState } from "react";
import { toast } from "react-toastify";

const BookingWidget = ({ place }) => {
  const [quantity, setQuantity] = useState(1);
  const { cartList, toggleCartList } = useCartList();
  const isCartListed = cartList.some((item) => item._id === place._id);

  const handleAddToCart = () => {
    toggleCartList(place);
    // toast.success(`${place.title} added to cart! (${quantity})`);
  };

  const handleBuyNow = () => {
    toast.success(`Proceeding to checkout for ${quantity} × ${place.title}`);
  };

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-50 border-t
        border-[var(--color-neutral-dark-hover)] bg-[var(--color-white)] p-3
        md:static md:rounded-2xl md:border md:border-[var(--color-neutral-dark-hover)] md:p-5 md:shadow-md
      "
    >
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex items-center justify-between text-sm sm:text-base">
          <div className="font-semibold text-[var(--color-neutral-dark)]">
            ₹{place.price}{" "}
            <span className="font-normal text-[var(--color-neutral-dark-hover)]">
              / unit
            </span>
          </div>
          <div className="font-semibold text-[var(--color-neutral-dark)]">
            Total: ₹{quantity * place.price}
          </div>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-[var(--color-neutral-dark-hover)] px-3 py-2">
          <label className="text-sm font-medium text-[var(--color-neutral-dark-hover)]">
            Qty
          </label>
          <div className="flex items-center gap-2">
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-white-hover)] text-base font-bold text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-dark-hover)] hover:text-[var(--color-white)]"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              −
            </button>
            <span className="text-base font-semibold text-[var(--color-neutral-dark)]">
              {quantity}
            </span>
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-white-hover)] text-base font-bold text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-dark-hover)] hover:text-[var(--color-white)]"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="flex-1 rounded-md bg-[var(--color-secondary)] py-2 text-sm font-semibold text-[var(--color-white)] transition hover:bg-[var(--color-secondary-hover)] sm:text-base"
          >
            {isCartListed ? "Remove From Cart" : "Add to Cart"}
          </button>
          <button
            onClick={handleBuyNow}
            className="flex-1 rounded-md bg-[var(--color-accent)] py-2 text-sm font-semibold text-[var(--color-white)] transition hover:bg-[var(--color-accent-hover)] sm:text-base"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
