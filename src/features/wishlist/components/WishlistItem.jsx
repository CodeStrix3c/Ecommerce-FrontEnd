import { useState } from "react";
import { ShoppingCart, X } from "lucide-react";
import ImageGalleryModal from "@/components/shared/ImageGalleryModal";

const WishlistItem = ({ product, onRemove, onAddToCart }) => {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <>
      <div className="group rounded-lg border border-[var(--color-black-hover)] bg-[var(--color-white)] shadow-md hover:shadow-xl transition relative overflow-hidden">
        <div
          className="relative w-full cursor-pointer overflow-hidden rounded-t-lg bg-[var(--color-black-hover)]"
          onClick={() => setShowGallery(true)}
        >
          <img
            src={product.photos?.[0] || "/placeholder.jpg"}
            alt={product.title || "Product image"}
            loading="lazy"
            onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
            className="w-full aspect-[3/4] max-h-60 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {product.photos?.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-[var(--color-black)] bg-opacity-70 text-[var(--color-white)] text-xs px-2 py-0.5 rounded-md shadow-sm">
              +{product.photos.length - 1} more
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(product._id);
            }}
            className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center 
              bg-[var(--color-white)] border border-[var(--color-black-hover)] rounded-full shadow-sm 
              hover:border-[var(--color-black)] hover:shadow-md transition"
          >
            <X
              size={16}
              className="text-[var(--color-black)] hover:text-[var(--color-secondary-hover)]"
            />
          </button>
        </div>

        <div className="p-4 flex flex-col gap-1">
          <h3 className="text-sm font-semibold text-[var(--color-black)] line-clamp-1 group-hover:text-[var(--color-secondary)] transition">
            {product.title}
          </h3>
          <p className="text-xs text-[var(--color-black-hover)]">
            {product.category || "Agriculture Product"}
          </p>

          <div className="flex items-center gap-2 mt-1">
            <p className="text-base font-semibold text-[var(--color-black)]">
              ₹{product.price}
            </p>
            <p
              className={`text-xs font-medium ${
                product.inStock
                  ? "text-[var(--color-primary)]"
                  : "text-[var(--color-secondary-hover)]"
              }`}
            >
              {product.inStock ? "In Stock" : "Out of Stock"}
            </p>
          </div>
        </div>
        <div className="border-t border-[var(--color-black)]">
          {product.inStock ? (
            <button
              onClick={() => onAddToCart(product)}
              className="w-full flex justify-center items-center gap-2 py-2.5 
        text-[var(--color-secondary)] text-sm font-medium 
        hover:text-[var(--color-secondary-hover)] hover:bg-[var(--color-black-hover)] transition"
            >
              <ShoppingCart size={16} /> Add to Cart
            </button>
          ) : (
            <span className="block text-center text-[var(--color-black)] text-sm py-2">
              Not Available
            </span>
          )}
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
