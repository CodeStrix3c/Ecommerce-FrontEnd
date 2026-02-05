import React from "react";
import { useWishlist } from "@/providers/WishListProvider";
import { useCartList } from "@/providers/CartListProvider";
import WishlistItem from "../components/WishlistItem";
import EmptyState from "@/components/shared/EmptyState";
import ContentWrapper from "@/components/shared/ContentWrapper";
import SectionTitle from "@/components/shared/SectionTitle";

const WishlistPage = () => {
  const { cartList, addToCartList } = useCartList();
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

  const handleAddToCart = (product) => {
    addToCartList(product);
    removeFromWishlist(product._id);
  };

  if (wishlist.length === 0) {
    return (
     <>
      <EmptyState
        title=" Empty Wishlist "
        subTitle=" Looks like you haven't added anything to your wishlist yet."
        btnText="Browse Products"
        redirectTo="/"
        type="wishlist"
        img={"/assets/images/empty-wishlist.png"}
      />

      {/* <img src={img}alt="" /> */}
     </>
      
    );
  }

  return (
    <ContentWrapper compactScreen>
      <div className="py-10 lg:mt-24 md:mt-24">
        <div className="flex justify-between items-center mb-6">
          <SectionTitle title="My Wishlist" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
