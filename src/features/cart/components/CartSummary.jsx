const CartSummary = ({ cart, subtotal, taxes, total, onCheckout, onClear }) => (
  <div className="sticky top-48 border rounded-2xl p-6 shadow-md bg-[var(--color-white)] flex flex-col gap-4">
    <h2 className="text-lg font-semibold text-[var(--color-neutral-dark)]">
      Order Summary
    </h2>

    <p className="text-sm text-[var(--color-neutral-dark-hover)]">
      {cart.length} {cart.length === 1 ? "item" : "items"}
    </p>

    <div className="flex justify-between text-sm text-[var(--color-neutral-dark)]">
      <span>Subtotal</span>
      <span>₹{subtotal.toFixed(2)}</span>
    </div>

    <div className="flex justify-between text-sm text-[var(--color-neutral-dark)]">
      <span>Taxes (10%)</span>
      <span>₹{taxes.toFixed(2)}</span>
    </div>

    <div className="flex justify-between text-base font-semibold text-[var(--color-neutral-dark)] border-t pt-3">
      <span>Total</span>
      <span className="text-[var(--color-primary)]">₹{total.toFixed(2)}</span>
    </div>

    <button
      onClick={onCheckout}
      className="w-full px-4 py-3 bg-[var(--color-primary)] text-[var(--color-white)] rounded-full font-medium shadow-md hover:bg-[var(--color-primary-hover)] transition"
    >
      Checkout
    </button>

    <button
      onClick={onClear}
      className="w-full px-4 py-2 text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)]"
    >
      Clear Cart
    </button>
  </div>
);

export default CartSummary;
