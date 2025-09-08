import React, { useState } from "react";
import { dummyData } from "@/data/dummyData";
import WishlistItem from "../components/WishlistItem";
import WishlistActions from "../components/WishlistActions";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState(dummyData);
  const [cart, setCart] = useState([]);

  const removeFromWishlist = (id) =>
    setWishlist((prev) => prev.filter((item) => item._id !== id));

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
    removeFromWishlist(product._id);
  };

  const addAllToCart = () => {
    setCart((prev) => [...prev, ...wishlist.filter((p) => p.inStock)]);
    setWishlist((prev) => prev.filter((p) => !p.inStock));
  };

  const removeAllFromWishlist = () => setWishlist([]);

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

      {wishlist.length === 0 ? (
        <p className="text-center text-[var(--color-neutral-dark)]">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="flex flex-col gap-6">
          {wishlist.map((product) => (
            <WishlistItem
              key={product._id}
              product={product}
              onRemove={removeFromWishlist}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
