import React, { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { dummyData } from "@/data/dummyData";
import PlaceGallery from "@/features/places/components/PlaceGallery";

const WishlistItem = ({ product, onRemove, onAddToCart }) => (
  <div className="flex flex-col gap-3 py-4 border-b border-[var(--color-neutral-dark)] last:border-b-0">
    <PlaceGallery place={product} />

    <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center gap-3">
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-semibold text-[var(--color-neutral-dark)]">
          {product.title}
        </h3>
        <p className="text-sm text-[var(--color-neutral-dark)]">
          {product.address}
        </p>
        <p className="text-sm font-medium text-[var(--color-primary)]">
          ₹{product.price}
        </p>

        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1 text-[var(--color-accent)] font-semibold">
            <Star size={16} />
            <span>{product.rating}</span>
          </div>
          <span
            className={`text-sm font-medium ${
              product.inStock
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-neutral-dark)]"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </span>
        </div>

        {product.description && (
          <p className="text-sm text-[var(--color-neutral-dark)] mt-1">
            {product.description}
          </p>
        )}

        {product.perks.length > 0 && (
          <ul className="flex gap-2 mt-2 flex-wrap">
            {product.perks.map((perk, idx) => (
              <li
                key={idx}
                className="text-xs px-2 py-1 rounded bg-[var(--color-primary)] text-[var(--color-white)]"
              >
                {perk}
              </li>
            ))}
          </ul>
        )}

        {product.extraInfo && (
          <p className="text-xs text-[var(--color-neutral-dark)] mt-1">
            {product.extraInfo}
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2 mt-3 md:mt-0">
        {product.inStock ? (
          <button
            onClick={() => onAddToCart(product)}
            className="flex items-center gap-1 px-3 py-2 rounded font-medium bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)] transition-colors"
          >
            <ShoppingCart size={16} /> Add
          </button>
        ) : (
          <button
            disabled
            className="flex items-center gap-1 px-3 py-2 rounded font-medium bg-[var(--color-neutral-dark)] text-[var(--color-white)] cursor-not-allowed"
          >
            Out of Stock
          </button>
        )}

        <button
          onClick={() => onRemove(product._id)}
          className="flex items-center gap-1 px-3 py-2 rounded font-medium bg-[var(--color-accent)] text-[var(--color-white)] hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          <Heart size={16} /> Remove
        </button>
      </div>
    </div>
  </div>
);

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
        {wishlist.length > 0 && (
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
        )}
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
