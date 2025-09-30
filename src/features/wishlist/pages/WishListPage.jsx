import React from "react";
import { Heart } from "lucide-react";
import { useWishlist } from "@/providers/WishListProvider";
import { useCartList } from "@/providers/CartListProvider";
import WishlistItem from "../components/WishlistItem";
import WishlistActions from "../components/WishlistActions";
import EmptyState from "@/components/shared/EmptyState";
import ContentWrapper from "@/components/shared/ContentWrapper";
// lorem

const WishlistPage = () => {
  const { cartList, addToCartList } = useCartList();
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  const handleAddToCart = (product) => {
    addToCartList(product);
    removeFromWishlist(product._id);
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
    <ContentWrapper variant="place">
      <div className="py-10 lg:mt-24 md:mt-24">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-black)] mb-4 sm:mb-0">
            My Wishlist
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
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
    </ContentWrapper>
  );
};

export default WishlistPage;
