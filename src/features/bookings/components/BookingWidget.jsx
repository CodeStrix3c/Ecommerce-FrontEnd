import React, { useState, useEffect } from "react";
import { Tag, Heart } from "lucide-react";
import { useCartList } from "@/providers/CartListProvider";
import { useWishlist } from "@/providers/WishlistProvider";
import QuantitySelector from "@/components/shared/QuantitySelector";

const formatINR = (value) => Number(value).toLocaleString("en-IN");

const Spinner = () => (
  <svg
    className="animate-spin h-4 w-4"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
    />
  </svg>
);

const BookingWidget = ({ place }) => {
  const [quantity, setQuantity] = useState(1);
  const [isCartProcessing, setIsCartProcessing] = useState(false);
  const [isWishlistProcessing, setIsWishlistProcessing] = useState(false);

  const { cartList, addToCartList, removeFromCart, updateQuantity } =
    useCartList();
  const { wishlist, toggleWishlist } = useWishlist();

  if (!place) return null;

  const price = place?.price || 0;

  /* ======= CART LOGIC ======= */
  const cartItem = cartList?.find((item) => item.productId === place._id);
  const isCartListed = !!cartItem;
  const totalPrice = quantity * price;

  const handleCartAction = async () => {
    if (isCartProcessing) return;
    setIsCartProcessing(true);
    try {
      if (!isCartListed) {
        await addToCartList({ productId: place._id, quantity });
      } else {
        await removeFromCart(cartItem.id);
        setQuantity(1);
      }
    } finally {
      setIsCartProcessing(false);
    }
  };

  /* ======= QUANTITY ======= */
  const handleQuantityChange = (newQty) => {
    setQuantity(newQty);
    if (cartItem) updateQuantity(cartItem.id, newQty);
  };

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItem]);

  /* ======= WISHLIST ======= */
  const isWishlisted = wishlist?.some((item) => item.productId === place._id);

  const handleWishlist = async () => {
    if (isWishlistProcessing) return;
    setIsWishlistProcessing(true);
    try {
      await toggleWishlist({ id: place._id });
    } finally {
      setIsWishlistProcessing(false);
    }
  };

  return (
    <div className="w-full md:mx-auto md:max-w-3xl">
      <div className="hidden md:flex flex-col border rounded-xl p-6 bg-white shadow-lg">
        {/* Banner */}
        <div className="flex items-center border rounded-lg p-3 mb-4 bg-gray-50">
          <Tag className="text-[var(--color-secondary)]" size={18} />
          <p className="ms-3 text-sm font-semibold">Prices include all fees</p>
        </div>

        {/* Price */}
        <div className="flex items-center mb-4">
          <span className="font-bold text-2xl">₹{formatINR(price)}</span>{" "}
          {/* ← formatted */}
          <span className="px-2 text-sm font-medium text-gray-600">
            per item
          </span>
        </div>

        {/* Quantity */}
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

          <div className="text-sm font-semibold">
            Total: ₹{formatINR(totalPrice)} {/* ← formatted */}
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {/* ❤️ Wishlist */}
          <button
            onClick={handleWishlist}
            disabled={isWishlistProcessing}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-800 rounded-lg text-sm font-medium hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isWishlistProcessing ? (
              <Spinner />
            ) : (
              <>
                <Heart
                  size={18}
                  className={`transition ${
                    isWishlisted ? "fill-red-500 text-red-500" : "text-gray-700"
                  }`}
                />
                {isWishlisted ? "Wishlisted" : "Add to wishlist"}
              </>
            )}
          </button>

          {/* 🛒 Cart */}
          <button
            onClick={handleCartAction}
            disabled={isCartProcessing}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-800 rounded-lg text-sm font-medium hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCartProcessing ? (
              <Spinner />
            ) : isCartListed ? (
              "Remove from cart"
            ) : (
              "Add to cart"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
