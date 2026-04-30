import React, { useState, useEffect } from "react";
import { Tag, Heart, ShoppingCart, Package } from "lucide-react";
import { useCartList } from "@/providers/CartListProvider";
import { useWishlist } from "@/providers/WishlistProvider";
import QuantitySelector from "@/components/shared/QuantitySelector";

const formatINR = (value) => Number(value).toLocaleString("en-IN");

const Spinner = () => (
  <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
);


const BookingWidgetInner = ({ place, selectedPackage }) => {
  const [quantity, setQuantity] = useState(1);
  const [isCartProcessing, setIsCartProcessing] = useState(false);
  const [isWishlistProcessing, setIsWishlistProcessing] = useState(false);

  const { cartList, addToCartList, removeFromCart, updateQuantity } = useCartList();
  const { wishlist, toggleWishlist } = useWishlist();

  
  const price         = Number(place?.price || 0);
  const packagingPrice = Number(selectedPackage?.price || 0);
  const qty            = Number(quantity);
  const itemSubtotal   = price * qty;
  const totalPrice     = itemSubtotal + packagingPrice;

  
  const cartItem    = cartList?.find((item) => item.productId === place._id);
  const isCartListed = !!cartItem;

  const handleCartAction = async () => {
    if (isCartProcessing) return;
    setIsCartProcessing(true);
    try {
      if (!isCartListed) {
        await addToCartList({ productId: place._id, quantity, packaging: selectedPackage });
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
    if (cartItem) updateQuantity(cartItem.id, newQty);
  };

  useEffect(() => {
    if (cartItem) setQuantity(cartItem.quantity);
    else setQuantity(1);
  }, [cartItem]);

  
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
      <div className="flex flex-col border rounded-xl p-6 bg-white shadow-lg gap-4">

        {/* Banner */}
        <div className="flex items-center border rounded-lg p-3 bg-gray-50">
          <Tag className="text-[var(--color-secondary)] shrink-0" size={18} />
          <p className="ms-3 text-sm font-semibold">Prices include all fees</p>
        </div>

        {/* Base price */}
        <div className="flex items-baseline gap-2">
          <span className="font-bold text-2xl">₹{formatINR(price)}</span>
          <span className="text-sm font-medium text-gray-500">per item</span>
        </div>

      
        {selectedPackage && (
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-3 py-2">
            <Package size={15} className="text-green-600 shrink-0" />
            <p className="text-sm text-green-800 font-medium">
              {selectedPackage.name}
              <span className="font-normal text-green-600 ms-1">
                — +₹{formatINR(packagingPrice)} (one-time packaging fee)
              </span>
            </p>
          </div>
        )}

        {/* Quantity + breakdown */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold">Quantity:</p>
            <QuantitySelector quantity={quantity} setQuantity={handleQuantityChange} />
          </div>

          <div className="text-sm text-right space-y-1">
            <p className="text-gray-600">
              ₹{formatINR(price)} &times; {qty}{" = "}
              <span className="font-semibold text-gray-900">₹{formatINR(itemSubtotal)}</span>
            </p>

            {selectedPackage ? (
              <p className="text-green-700">Packaging: +₹{formatINR(packagingPrice)}</p>
            ) : (
              <p className="text-gray-400 text-xs italic">No packaging selected</p>
            )}

            <div className="border-t border-gray-200 pt-1">
              <p className="font-bold text-base text-gray-900">Total: ₹{formatINR(totalPrice)}</p>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            onClick={handleWishlist}
            disabled={isWishlistProcessing}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-800 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {isWishlistProcessing ? <Spinner /> : (
              <>
                <Heart size={18} className={`transition-colors ${isWishlisted ? "fill-red-500 text-red-500" : "text-gray-700"}`} />
                {isWishlisted ? "Wishlisted" : "Add to wishlist"}
              </>
            )}
          </button>

          <button
            onClick={handleCartAction}
            disabled={isCartProcessing}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 border border-gray-800 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors disabled:opacity-50"
          >
            {isCartProcessing ? <Spinner /> : (
              <>
                <ShoppingCart size={18} className="text-gray-700" />
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