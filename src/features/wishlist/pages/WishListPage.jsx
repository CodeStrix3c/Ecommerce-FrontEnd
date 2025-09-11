import React from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/providers/WishListProvider";
import { useCartList } from "@/providers/CartListProvider";
import WishlistItem from "../components/WishlistItem";
import WishlistActions from "../components/WishlistActions";
import EmptyState from "@/components/shared/EmptyState";

const WishlistPage = () => {
  const { cartList, addToCartList } = useCartList();
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  const handleAddToCart = (product) => {
    addToCartList(product);
    removeFromWishlist(product._id);
  };

  const addAllToCart = () => {
    wishlist
      .filter((p) => p.inStock)
      .forEach((p) => {
        addToCartList(p);
        removeFromWishlist(p._id);
      });
  };

  const removeAllFromWishlist = () => {
    clearWishlist();
  };

  if (wishlist.length === 0) {
    return (
      <EmptyState
        title="Your Wishlist is Empty"
        subTitle="Save your favorite pesticides and agriculture products here for quick access later."
        icon={<Heart className="w-14 h-14 text-[var(--color-secondary)]" />}
        btnText="Browse Products"
        redirectTo="/"
      />
    );
  }

  return (
    <div className="container  px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        {/* <h1 className="text-2xl font-semibold text-[var(--color-black)]">
          My Wishlist
        </h1> */}
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[var(--color-black)]">
  My Wishlist
</h1>
        {/* <WishlistActions
          wishlist={wishlist}
          addAllToCart={addAllToCart}
          removeAllFromWishlist={removeAllFromWishlist}
        /> */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {wishlist.map((product) => (
          <WishlistItem
            key={product._id}
            product={product}
            onRemove={removeFromWishlist}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default WishlistPage;
