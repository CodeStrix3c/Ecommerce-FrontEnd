import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import PaymentOptions from "@/features/places/components/PaymentOptions";

const CartBottomBar = ({ cart, total, onCheckout }) => {
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
    <div className="fixed bottom-0 left-0 right-0 border-t border-[var(--color-black)] bg-[var(--color-white)] shadow-md px-4 py-2 flex flex-col gap-2 z-50">
      <div className="relative">
        <button
          onClick={() => setShowPayment(!showPayment)}
          className="flex w-full items-center justify-between rounded-md border border-[var(--color-black)] bg-[var(--color-white)] px-3 py-2 text-sm font-medium text-[var(--color-black)] hover:bg-[var(--color-black-hover)] transition"
        >
          <span>{getPaymentLabel(selectedPayment)}</span>
          {showPayment ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {showPayment && (
          <div className="mt-1 rounded-lg border-[var(--color-black)] p-2 bg-[var(--color-white)] shadow-sm">
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
      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg font-semibold text-[var(--color-primary)]">
            ₹{total.toFixed(2)}
          </span>
          <span className="block text-xs text-[var(--color-black)]">
            {cart.length} {cart.length === 1 ? "item" : "items"}
          </span>
        </div>

        <button
          onClick={onCheckout}
          className="px-5 py-2 bg-[var(--color-primary)] text-[var(--color-white)] rounded-full font-medium hover:bg-[var(--color-primary-hover)] transition text-sm"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartBottomBar;
