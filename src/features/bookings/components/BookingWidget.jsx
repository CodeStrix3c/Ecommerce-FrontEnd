import PaymentOptions from "@/features/places/components/PaymentOptions";
import { useCartList } from "@/providers/CartListProvider";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ChevronDown, ChevronUp, Tag } from "lucide-react";

const BookingWidget = ({ place }) => {
  const [quantity, setQuantity] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");
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
    if (!selectedPayment) {
      toast.error("Please select a payment method before proceeding!");
      return;
    }
    toast.success(
      `Proceeding to checkout for ${quantity} × ${place.title} via ${getPaymentLabel(
        selectedPayment
      )}`
    );
  };

  const getPaymentLabel = (method) => {
    switch (method) {
      case "cod":
        return "Cash on Delivery";
      case "upi":
        return "UPI";
      case "netbanking":
        return "Net Banking";
      case "card":
        return "Credit/Debit Card";
      case "wallet":
        return "Wallet";
      default:
        return "Choose Payment Method";
    }
  };

  const totalPrice = quantity * place.price;

  return (
    <div className="mx-auto max-w-2xl w-full">
      {/* Info box */}
      <div className="hidden md:flex border rounded-lg mb-4 p-4">
        <Tag color="red" />
        <p className="ms-4 font-semibold">Prices include all fees</p>
      </div>

      {/* Desktop widget */}
      <div className="hidden md:block border rounded-xl p-5 bg-white shadow-lg">
        {/* Price */}
        <div className="flex px-2 items-center">
          <span className="font-bold text-[var(--color-black)] text-xl">
            ₹{place.price}
          </span>
          <span className="px-1 text-black text-sm font-bold">per unit</span>
        </div>

        {/* Quantity + Total */}
        <div className="items-center justify-between px-2 text-sm text-[var(--color-black)]">
          <div className="flex items-center mb-4 mt-3">
            <p className="text-black text-[14px] font-semibold">Quantity :</p>
            <div className="flex ms-3 items-center rounded-lg border border-black shadow-sm bg-white text-[var(--color-black)]">
              <button
                className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-l-full font-bold hover:bg-[var(--color-black-hover)]"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                −
              </button>
              <span className="px-2 font-semibold text-black text-sm md:text-base">
                {quantity}
              </span>
              <button
                className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-r-full font-bold hover:bg-[var(--color-black-hover)]"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
          </div>

          <div className="text-[14px] font-semibold">
            Total price :{" "}
            <span className="text-[14px] font-semibold">₹{totalPrice}</span>
          </div>
        </div>

        {/* Payment */}
        <div className="mt-4">
          <button
            onClick={() => setShowPayment(!showPayment)}
            className="flex w-full items-center justify-between rounded-md border border-[var(--color-black)] bg-[var(--color-white)] px-3 py-2 text-sm md:text-base font-medium text-[var(--color-black)] hover:bg-[var(--color-black-hover)]"
          >
            <span>{getPaymentLabel(selectedPayment)}</span>
            {showPayment ? (
              <ChevronUp size={18} className="text-black" />
            ) : (
              <ChevronDown size={18} className="text-black" />
            )}
          </button>

          {showPayment && (
            <div className="mt-3">
              <PaymentOptions
                selected={selectedPayment}
                onChange={(method) => {
                  setSelectedPayment(method);
                  setShowPayment(false);
                }}
              />
            </div>
          )}
        </div>

        {/* Action buttons */}
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

      {/* Mobile view - Sticky Bottom Sheet */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-white p-4 shadow-lg">
        {/* Price & Qty */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-lg font-bold text-black">₹{totalPrice}</p>
            <p className="text-xs text-gray-600">
              {quantity} × ₹{place.price} per unit
            </p>
          </div>
          {/* Responsive qty buttons */}
          <div className="flex items-center rounded-lg border border-black bg-white text-[var(--color-black)]">
            <button
              className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-l-full font-bold hover:bg-[var(--color-black-hover)]"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              −
            </button>
            <span className="px-2 font-semibold text-black text-sm md:text-base">
              {quantity}
            </span>
            <button
              className="flex h-7 w-7 md:h-8 md:w-8 items-center justify-center rounded-r-full font-bold hover:bg-[var(--color-black-hover)]"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Responsive buttons */}
        <div className="flex flex-col gap-2">
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
    </div>
  );
};

export default BookingWidget;
