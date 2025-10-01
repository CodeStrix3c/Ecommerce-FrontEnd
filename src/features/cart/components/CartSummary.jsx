import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import PaymentOptions from "@/features/places/components/PaymentOptions";

const CartSummary = ({ cart, subtotal, taxes, total, onCheckout, onClear }) => {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState("");

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
    <div className="sticky top-36 border rounded-2xl p-6 shadow-md bg-[var(--color-white)] flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-black)]">
        Order Summary
      </h2>

      <p className="text-sm text-[var(--color-black)]">
        {cart.length} {cart.length === 1 ? "item" : "items"}
      </p>

      <div className="flex justify-between text-sm text-[var(--color-black)]">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-sm text-[var(--color-black)]">
        <span>Taxes (10%)</span>
        <span>₹{taxes.toFixed(2)}</span>
      </div>

      <div className="flex justify-between text-base font-semibold text-[var(--color-black)] border-t pt-3">
        <span>Total</span>
        <span className="text-[var(--color-primary)]">₹{total.toFixed(2)}</span>
      </div>

      {/* Payment Method Dropdown */}
      <div className="mt-4">
        <button
          onClick={() => setShowPayment(!showPayment)}
          className="flex w-full items-center justify-between rounded-md border border-[var(--color-black)] bg-[var(--color-white)] px-3 py-2 text-sm font-medium text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition"
        >
          <span>{getPaymentLabel(selectedPayment)}</span>
          {showPayment ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {showPayment && (
          <div className="mt-3 rounded-lg border-[var(--color-black)] p-2">
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

      {/* Checkout Button */}
      <button
        onClick={onCheckout}
        className="w-full px-4 py-3 bg-[var(--color-primary)] text-[var(--color-white)] rounded-full font-medium shadow-md hover:bg-[var(--color-primary-hover)] transition"
      >
        Checkout
      </button>

      {/* Clear Cart Button */}
      <button
        onClick={onClear}
        className="w-full px-4 py-2 text-sm text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] transition"
      >
        Clear Cart
      </button>
    </div>
  );
};

export default CartSummary;
