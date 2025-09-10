import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import ImageGalleryModal from "@/components/shared/ImageGalleryModal";

const WishlistItem = ({ product, onRemove, onAddToCart }) => {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <>
      <div className="rounded-2xl border border-[var(--color-neutral-light)] bg-[var(--color-white)] shadow-sm p-4 flex flex-col gap-4 hover:shadow-md transition">
        <div
          className="relative cursor-pointer"
          onClick={() => setShowGallery(true)}
        >
          <img
            src={product.photos?.[0] || "/placeholder.jpg"}
            alt={product.title}
            className="w-full h-40 object-cover rounded-xl border border-[var(--color-neutral-light)]"
          />
          {product.photos?.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-[var(--color-black)] bg-opacity-70 text-[var(--color-white)] text-xs px-2 py-1 rounded-md">
              +{product.photos.length - 1} more
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-[var(--color-black)] line-clamp-1">
            {product.title}
          </h3>
          <p className="text-xs text-[var(--color-neutral-dark)]">
            {product.category || "Agriculture Product"}
          </p>
          <p className="text-sm font-medium text-[var(--color-primary)]">
            ₹{product.price}
          </p>
          <p
            className={`text-xs ${
              product.inStock
                ? "text-[var(--color-primary)]"
                : "text-[var(--color-neutral-dark)]"
            }`}
          >
            {product.inStock ? "In Stock" : "Out of Stock"}
          </p>
        </div>

        <div className="flex justify-between items-center mt-3">
          {product.inStock ? (
            <button
              onClick={() => onAddToCart(product)}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)] transition"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
          ) : (
            <span className="text-[var(--color-neutral-dark)] text-sm">
              Not Available
            </span>
          )}

          <button
            onClick={() => onRemove(product._id)}
            className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] text-sm transition"
          >
            Remove
          </button>
        </div>
      </div>

      <ImageGalleryModal
        photos={product.photos || []}
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
      />
    </>
  );
};

export default WishlistItem;
