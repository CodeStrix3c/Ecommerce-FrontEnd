import { useState } from "react";
import PaymentOptions from "@/features/places/components/PaymentOptions";

const CartBottomBar = ({ cart, total, onCheckout, onPaymentChange }) => {
  const [selectedPayment, setSelectedPayment] = useState("");

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-[var(--color-black)] bg-[var(--color-white)] shadow-md px-4 py-2 flex flex-col gap-2 z-50">
      <div className="relative">
        {/* <div className="mt-1 rounded-lg border-[var(--color-black)] py-2 bg-[var(--color-white)]">
          <PaymentOptions
            selected={selectedPayment}
            onChange={(method) => {
              onPaymentChange(method);
              setSelectedPayment(method);
            }}
          />
        </div> */}
      </div>
      <div className="flex items-center justify-between">
        <div>
          <span className="text-lg font-semibold text-[var(--color-primary)]">
            ₹{total}
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
