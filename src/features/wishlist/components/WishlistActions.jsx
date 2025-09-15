<<<<<<< HEAD
const WishlistActions = ({ wishlist, addAllToCart, removeAllFromWishlist }) => {
  if (wishlist.length === 0) return null;

  return (
    // <div className="flex gap-3">
    //   <button
    //     onClick={addAllToCart}
    //     className="px-4 py-2 rounded-lg font-medium bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)] transition"
    //   >
    //     Add All to Cart
    //   </button>
    //   <button
    //     onClick={removeAllFromWishlist}
    //     className="px-4 py-2 rounded-lg font-medium border border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] hover:text-[var(--color-white)] transition"
    //   >
    //     Clear Wishlist
    //   </button>
    // </div>



   <div className="flex flex-col sm:flex-row gap-2 w-full">
  <button
    onClick={addAllToCart}
    className="w-36 sm:w-auto px-3 py-1.5 rounded-md text-sm font-medium bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)] transition"
  >
    Add All to Cart
  </button>
  <button
    onClick={removeAllFromWishlist}
    className="w-36 sm:w-auto px-3 py-1.5 rounded-md text-sm font-medium border border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] hover:text-[var(--color-white)] transition"
  >
    Clear Wishlist
  </button>
</div>
  );
};

export default WishlistActions;
=======
const WishlistActions = ({ wishlist, addAllToCart, removeAllFromWishlist }) => {
  if (wishlist.length === 0) return null;

  return (
    // <div className="flex gap-3">
    //   <button
    //     onClick={addAllToCart}
    //     className="px-4 py-2 rounded-lg font-medium bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)] transition"
    //   >
    //     Add All to Cart
    //   </button>
    //   <button
    //     onClick={removeAllFromWishlist}
    //     className="px-4 py-2 rounded-lg font-medium border border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] hover:text-[var(--color-white)] transition"
    //   >
    //     Clear Wishlist
    //   </button>
    // </div>



   <div className="flex flex-col sm:flex-row gap-2 w-full">
  <button
    onClick={addAllToCart}
    className="w-36 sm:w-auto px-3 py-1.5 rounded-md text-sm font-medium bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)] transition"
  >
    Add All to Cart
  </button>
  <button
    onClick={removeAllFromWishlist}
    className="w-36 sm:w-auto px-3 py-1.5 rounded-md text-sm font-medium border border-[var(--color-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] hover:text-[var(--color-white)] transition"
  >
    Clear Wishlist
  </button>
</div>
  );
};

export default WishlistActions;
>>>>>>> e036b7623936146338008251bf0aab14b502b869
