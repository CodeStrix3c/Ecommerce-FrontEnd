import React, { useState, useEffect } from "react";
import { Tag, Heart, ShoppingCart, Package } from "lucide-react";
import { useCartList } from "@/providers/CartListProvider";
import { useWishlist } from "@/providers/WishlistProvider";
import QuantitySelector from "@/components/shared/QuantitySelector";

// ✅ USE HOOKS (NOT DIRECT API)
import {
  useAddToCart,
  useAddToCartWithPackaging,
} from "@/hooks/User/Cart/usecartitems";
import { toast } from "react-toastify";

const formatINR = (value) => Number(value).toLocaleString("en-IN");

const Spinner = () => (
  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
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
      d="M4 12a8 8 0 018-8V0C5.3 0 0 5.3 0 12h4z"
    />
  </svg>
);

const BookingWidgetInner = ({ place, selectedPackage }) => {
  const [quantity, setQuantity] = useState(1);
  const [isCartProcessing, setIsCartProcessing] = useState(false);
  const [isWishlistProcessing, setIsWishlistProcessing] = useState(false);

  const { cartList, removeFromCart, updateQuantity } = useCartList();
  const { wishlist, toggleWishlist } = useWishlist();

  const { mutateAsync: addToCartMutate } = useAddToCart();
  const { mutateAsync: addToCartPackagingMutate } = useAddToCartWithPackaging();

  const price = Number(place?.price || 0);
  const packagingPrice = Number(selectedPackage?.price || 0);
  const qty = Number(quantity);

  const itemSubtotal = price * qty;
  const totalPrice = itemSubtotal + packagingPrice;

  const safePackagingId = selectedPackage?.packagingId || null;

  const cartItem = cartList?.find(
    (item) =>
      item.productId === place._id &&
      (item.packagingId || null) === (safePackagingId || null),
  );

  const isCartListed = !!cartItem;

  const handleCartAction = async () => {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login");
    if (isCartProcessing) return;
    setIsCartProcessing(true);

    try {
      if (!cartItem) {
        if (safePackagingId) {
          await addToCartPackagingMutate({
            productId: place._id,
            quantity,
            variationName: place?.variationName || "",
            packagingId: safePackagingId,
          });
        } else {
          await addToCartMutate({
            productId: place._id,
            quantity,
          });
        }
      } else {
        await removeFromCart(cartItem.id);
        setQuantity(1);
      }
    } finally {
      setIsCartProcessing(false);
    }
  };

  const handleQuantityChange = (newQty) => {
    setQuantity(newQty);
    if (cartItem) {
      updateQuantity(cartItem.id, newQty);
    }
  };

  useEffect(() => {
    if (cartItem) {
      updateQuantity(cartItem.id, quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItem]);

  useEffect(() => {
    if (cartItem) {
      updateQuantity(cartItem.id, quantity);
    }
  }, [selectedPackage]);

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
          <span className="font-bold text-2xl">₹{formatINR(price)}</span>
          <span className="px-2 text-sm font-medium text-gray-600">
            per item
          </span>
        </div>

        {/* Packaging */}
        {selectedPackage && (
          <div className="flex items-center border rounded-lg p-2 mb-3 bg-gray-50">
            <Package size={15} />
            <p className="ms-2 text-sm font-medium">
              {selectedPackage.name} (+₹{formatINR(packagingPrice)})
            </p>
          </div>
        )}

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

          <div className="text-sm font-semibold text-right space-y-1">
            <p>
              ₹{formatINR(price)} × {qty} = ₹{formatINR(itemSubtotal)}
            </p>

            {selectedPackage ? (
              <p>Packaging: +₹{formatINR(packagingPrice)}</p>
            ) : (
              <p className="text-xs italic">No packaging selected</p>
            )}

            <div className="border-t pt-1">
              <p className="font-bold">Total: ₹{formatINR(totalPrice)}</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            disabled={isWishlistProcessing}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-800 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
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

          {/* Cart */}
          <button
            onClick={handleCartAction}
            disabled={isCartProcessing}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-800 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {isCartProcessing ? (
              <Spinner />
            ) : (
              <>
                <ShoppingCart size={18} />
                {isCartListed ? "Remove from cart" : "Add to cart"}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

const BookingWidget = ({ place, selectedPackage }) => {
  if (!place) return null;
  return <BookingWidgetInner place={place} selectedPackage={selectedPackage} />;
};

export default BookingWidget;
