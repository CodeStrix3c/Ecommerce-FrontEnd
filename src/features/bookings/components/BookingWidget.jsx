import React, { useState } from "react";
import { toast } from "react-toastify";
import { Tag } from "lucide-react";
import { useCartList } from "@/providers/CartListProvider";
import QuantitySelector from "@/components/shared/QuantitySelector"; 

const BookingWidget = ({ place }) => {
  const [quantity, setQuantity] = useState(1);

  const { cartList, toggleCartList } = useCartList();
  const isCartListed = cartList.some((item) => item._id === place._id);

  const handleAddToCart = () => {
    toggleCartList(place);
    toast.info(
      isCartListed
        ? `${place.title} removed from your cart`
        : `${place.title} added to your cart`
    );
  };

  const handleBuyNow = () => {
    toast.success(`Proceeding to checkout for ${quantity} × ${place.title}`);
  };

  const totalPrice = quantity * place.price;

  return (
    <div className="mx-auto max-w-2xl w-full">
      {/* Price notice */}
      <div className="hidden md:flex border rounded-lg mb-4 p-4 items-center">
        <Tag color="red" />
        <p className="ms-4 font-semibold">Prices include all fees</p>
      </div>

      {/* Desktop widget */}
      <div className="hidden md:flex flex-col border rounded-xl p-5 bg-[var(--color-white)] shadow-lg max-w-xl mx-auto">
        <div className="flex px-2 items-center">
          <span className="font-bold text-[var(--color-black)] text-xl">
            ₹{place.price}
          </span>
          <span className="px-1 text-[var(--color-black)] text-sm font-semibold">
            per unit
          </span>
        </div>

        <div className="items-center justify-between px-2 text-sm text-[var(--color-black)] mt-3">
          <div className="flex items-center mb-4">
            <p className="text-[var(--color-black)] text-[14px] font-semibold">
              Quantity :
            </p>
            <div className="flex ms-3 items-center">
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            </div>
          </div>

          <div className="text-[14px] font-semibold">
            Total price:{" "}
            <span className="text-[14px] font-semibold">₹{totalPrice}</span>
          </div>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <button
            onClick={handleBuyNow}
            className="w-full rounded-md bg-[var(--color-primary)] py-2 md:py-3 mb-2 text-sm md:text-base font-semibold text-[var(--color-white)] transition hover:bg-[var(--color-primary-hover)]"
          >
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            className="w-full rounded-md py-2 md:py-3 text-sm md:text-base font-medium text-[var(--color-black)] transition bg-[var(--color-black-hover)]"
          >
            {isCartListed ? "Remove from your cart" : "Add to your cart"}
          </button>
        </div>
      </div>

      {/* Mobile bottom bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-[var(--color-white)] p-4 shadow-lg max-h-[80vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-lg font-bold text-[var(--color-black)]">
              ₹{totalPrice}
            </p>
            <p className="text-xs text-[var(--color-black)]">
              {quantity} × ₹{place.price} per unit
            </p>
          </div>
          <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
        </div>

        <div className="flex gap-2 mt-3">
          <button
            onClick={handleBuyNow}
            className="flex-1 rounded-md bg-[var(--color-primary)] py-2 text-sm font-semibold text-[var(--color-white)] transition hover:bg-[var(--color-primary-hover)]"
          >
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            className="flex-1 rounded-md py-2 text-sm font-medium text-[var(--color-black)] transition bg-[var(--color-black-hover)]"
          >
            {isCartListed ? "Remove from your cart" : "Add to your cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
