import React, { useState } from "react";
import { dummyData } from "@/data/dummyData";
import WishlistItem from "../components/WishlistItem";
import WishlistActions from "../components/WishlistActions";
import { useWishlist } from "@/providers/WishListProvider";
import EmptyState from "@/components/shared/EmptyState";
import { Heart } from "lucide-react";
import { useCartList } from "@/providers/CartListProvider";

const WishlistPage = () => {
const { cartList, addToCartList } = useCartList();
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();

 const handleAddToCart = (product) => {
  addToCartList(product);
  removeFromWishlist(product._id);
};


const addAllToCart = () => {
  const inStockItems = wishlist.filter((p) => p.inStock);

  inStockItems.forEach((p) => {
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
        title="Empty Wishlist"
        subTitle="Looks like you haven’t saved anything yet. Start exploring and add items to your wishlist!"
        icon={<Heart className="w-16 h-16 text-[var(--color-secondary)]" />}
        btnText="Browse Products"
        redirectTo="/"
      />
    );
  }
  return (
    <div className="py-8 flex flex-col gap-6">
      <div className="flex justify-between items-center lg:mt-28 md:mt-28">
        <h1 className="text-2xl font-semibold text-[var(--color-neutral-dark)]">
          My Wishlist
        </h1>
        <WishlistActions
          wishlist={wishlist}
          addAllToCart={addAllToCart}
          removeAllFromWishlist={removeAllFromWishlist}
        />
      </div>
      <div className="flex flex-col gap-6">
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
