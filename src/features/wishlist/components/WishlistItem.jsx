import { Heart, ShoppingCart, Star } from "lucide-react";
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
          className="flex items-center gap-1 px-3 py-2 rounded font-medium bg-[var(--color-accent)] text-[var(--color-black)] hover:bg-[var(--color-accent-hover)] transition-colors"
        >
          <Heart size={16} /> Remove
        </button>
      </div>
    </div>
  </div>
);

export default WishlistItem;
