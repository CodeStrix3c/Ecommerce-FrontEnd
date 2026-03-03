import React, { useState, useEffect } from "react";
import { Tag } from "lucide-react";
import { useCartList } from "@/providers/CartListProvider";
import QuantitySelector from "@/components/shared/QuantitySelector";

const BookingWidget = ({ place, onBuyNow }) => {
  const [quantity, setQuantity] = useState(1);

  const { cartList, addToCartList, removeFromCart, updateQuantity } =
    useCartList();

  if (!place) return null;

  const price = place?.price || 0;

  // 🔎 Check if product exists in cart
  const cartItem = cartList?.find((item) => item.productId === place._id);

  const isCartListed = !!cartItem;

  const totalPrice = quantity * price;

  /* ===============================
     HANDLE ADD / REMOVE
  ================================= */

  const handleCartAction = () => {
    if (!isCartListed) {
      addToCartList({
        productId: place._id,
        quantity,
      });
    } else {
      removeFromCart(cartItem.id);
    }
  };

  /* ===============================
     HANDLE QUANTITY CHANGE
  ================================= */

  const handleQuantityChange = (newQty) => {
    setQuantity(newQty);

    // If item already in cart → update API
    if (cartItem) {
      updateQuantity(cartItem.id, newQty);
    }
  };

  // Sync local quantity when cart already has item
  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    }
  }, [cartItem]);

  return (
    <div className="w-full md:mx-auto md:max-w-2xl">
      <div className="hidden md:flex flex-col border rounded-xl p-6 bg-white shadow-lg">
        {/* Info Banner */}
        <div className="flex items-center border rounded-lg p-3 mb-4 bg-gray-50">
          <Tag className="text-[var(--color-secondary)]" size={18} />
          <p className="ms-3 text-sm font-semibold">Prices include all fees</p>
        </div>

        {/* Price */}
        <div className="flex items-center mb-4">
          <span className="font-bold text-2xl">₹{price}</span>
          <span className="px-2 text-sm font-medium text-gray-600">
            per item
          </span>
        </div>

        {/* Quantity + Total */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center">
            <p className="text-sm font-semibold">Quantity :</p>
            <div className="ms-3">
              <QuantitySelector
                quantity={quantity}
                setQuantity={handleQuantityChange}
              />
            </div>
          </div>

          <div className="text-sm font-semibold">Total: ₹{totalPrice}</div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={() => onBuyNow?.(quantity)}
            className="w-full px-6 py-3 rounded-lg text-sm font-semibold text-white bg-[var(--color-primary)] hover:opacity-90 transition"
          >
            Buy Now
          </button>

          <button
            onClick={handleCartAction}
            className="w-full px-6 py-3 border border-gray-800 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
          >
            {isCartListed ? "Remove from cart" : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
