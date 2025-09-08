const CartBottomBar = ({ cart, total, onCheckout }) => (
  <div className="fixed bottom-0 left-0 right-0 border-t bg-[var(--color-white)] shadow-lg px-4 py-3 flex items-center justify-between">
    <div className="flex flex-col">
      <span className="text-base font-semibold text-[var(--color-neutral-dark)]">
        ₹{total.toFixed(2)}
      </span>
      <span className="text-xs text-[var(--color-neutral-dark-hover)]">
        {cart.length} {cart.length === 1 ? "item" : "items"}
      </span>
    </div>

    <button
      onClick={onCheckout}
      className="px-6 py-3 bg-[var(--color-primary)] text-[var(--color-white)] rounded-full font-medium shadow-md hover:bg-[var(--color-primary-hover)] transition"
    >
      Checkout
    </button>
  </div>
);

export default CartBottomBar;
