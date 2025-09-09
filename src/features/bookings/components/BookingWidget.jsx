import PaymentOptions from "@/features/places/components/PaymentOptions";
import { useCartList } from "@/providers/CartListProvider";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { ChevronDown, ChevronUp } from "lucide-react";

const BookingWidget = ({ place }) => {
  const [quantity, setQuantity] = useState(1);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("cod"); // lifted state
  const { cartList, toggleCartList } = useCartList();
  const isCartListed = cartList.some((item) => item._id === place._id);

  const handleAddToCart = () => {
    toggleCartList(place);
  };

  const handleBuyNow = () => {
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

  return (
    <div
      className="
        fixed bottom-0 left-0 right-0 z-50 bg-[var(--color-white)] p-4
        md:static md:rounded-xl md:border md:border-[var(--color-neutral-dark-hover)] md:p-5
      "
    >
      <div className="flex flex-col gap-4">
        {/* Price and total */}
        <div className="flex items-center justify-between text-base">
          <div className="font-semibold text-[var(--color-neutral-dark)]">
            ₹{place.price}{" "}
            <span className="font-normal text-[var(--color-neutral-dark-hover)]">
              / unit
            </span>
          </div>
          <div className="text-sm text-[var(--color-neutral-dark-hover)]">
            Total:{" "}
            <span className="font-semibold text-[var(--color-neutral-dark)]">
              ₹{quantity * place.price}
            </span>
          </div>
        </div>

        {/* Quantity selector */}
        <div className="flex items-center justify-between px-1">
          <span className="text-sm text-[var(--color-neutral-dark-hover)]">
            Quantity
          </span>
          <div className="flex items-center gap-3">
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full text-base font-bold text-[var(--color-neutral-dark)] hover:bg-[var(--color-white-hover)]"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              −
            </button>
            <span className="text-base font-medium text-[var(--color-neutral-dark)]">
              {quantity}
            </span>
            <button
              className="flex h-7 w-7 items-center justify-center rounded-full text-base font-bold text-[var(--color-neutral-dark)] hover:bg-[var(--color-white-hover)]"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>

        {/* Payment Options dropdown */}
        <div>
          <button
            onClick={() => setShowPayment(!showPayment)}
            className="flex w-full items-center justify-between rounded-md border border-[var(--color-neutral-dark-hover)] bg-[var(--color-white)] px-3 py-2 text-sm font-medium text-[var(--color-neutral-dark)] hover:bg-[var(--color-white-hover)]"
          >
            <span>{getPaymentLabel(selectedPayment)}</span>
            {showPayment ? (
              <ChevronUp
                size={18}
                className="text-[var(--color-neutral-dark-hover)]"
              />
            ) : (
              <ChevronDown
                size={18}
                className="text-[var(--color-neutral-dark-hover)]"
              />
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

        <div className="flex flex-col gap-2">
          <button
            onClick={handleBuyNow}
            className="w-full rounded-md bg-[var(--color-accent)] py-3 text-sm font-semibold text-[var(--color-white)] transition hover:bg-[var(--color-accent-hover)]"
          >
            Buy Now
          </button>
          <button
            onClick={handleAddToCart}
            className="w-full rounded-md py-3 text-sm font-medium text-[var(--color-neutral-dark)] transition hover:bg-[var(--color-white-hover)]"
          >
            {isCartListed ? "Remove From Cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
