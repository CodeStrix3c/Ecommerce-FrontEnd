const WishlistActions = ({ wishlist, addAllToCart, removeAllFromWishlist }) => {
  if (wishlist.length === 0) return null;

  return (
    <div className="flex gap-3">
      <button
        onClick={addAllToCart}
        className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-white)] rounded hover:bg-[var(--color-primary-hover)]"
      >
        Add All
      </button>
      <button
        onClick={removeAllFromWishlist}
        className="px-4 py-2 bg-[var(--color-accent)] text-[var(--color-white)] rounded hover:bg-[var(--color-accent-hover)]"
      >
        Remove All
      </button>
    </div>
  );
};

export default WishlistActions;
