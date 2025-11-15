import { useState, useMemo } from "react";
import PaymentOptions from "@/features/places/components/PaymentOptions";

const CartSummary = ({
  cart,
  onCheckout,
  onClear,
  onPaymentChange,
}) => {
  const [selectedPayment, setSelectedPayment] = useState("");
    const { subtotal, taxes, total } = useMemo(() => {
    const subtotalCalc = cart.reduce(
      (acc, item) => acc + item.price * (item.quantity || 1),
      0
    );
    const taxesCalc = subtotalCalc * 0.1; // 10% tax
    const totalCalc = subtotalCalc + taxesCalc;
    return { subtotal: subtotalCalc, taxes: taxesCalc, total: totalCalc };
  }, [cart]);

  return (
    <div className="sticky top-36 border rounded-sm p-6 bg-[var(--color-white)] flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-[var(--color-black)]">
        Order Summary
      </h2>

      <p className="text-sm text-[var(--color-black)]">
        {cart.length} {cart.length === 1 ? "item" : "items"}
      </p>

      {/* Subtotal */}
      <div className="flex justify-between text-sm text-[var(--color-black)]">
        <span>Subtotal</span>
        <span>₹{subtotal.toFixed(2)}</span>
      </div>

      {/* Taxes */}
      <div className="flex justify-between text-sm text-[var(--color-black)]">
        <span>Taxes (10%)</span>
        <span>₹{taxes.toFixed(2)}</span>
      </div>

      {/* Optional discount section */}
      {/*
      <div className="flex justify-between text-sm text-[var(--color-black)]">
        <span>Discount</span>
        <span>- ₹{discount.toFixed(2)}</span>
      </div>
      */}

      {/* Total */}
      <div className="flex justify-between text-base font-semibold text-[var(--color-black)] border-t pt-3">
        <span>Total</span>
        <span className="text-[var(--color-primary)]">₹{total.toFixed(2)}</span>
      </div>

      {/* Payment Options */}
      <div className="rounded-lg border-[var(--color-black)] py-2">
        <PaymentOptions
          selected={selectedPayment}
          onChange={(method) => {
            onPaymentChange(method);
            setSelectedPayment(method);
          }}
        />
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
