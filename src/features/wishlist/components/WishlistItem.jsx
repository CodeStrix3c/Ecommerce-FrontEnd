import { useState } from "react";
import { ShoppingCart, X, Check } from "lucide-react";
import ImageGalleryModal from "@/components/shared/ImageGalleryModal";
import QuantitySelector from "@/components/shared/QuantitySelector";

const WishlistItem = ({ product, onRemove, onAddToCart, isAddedToCart }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    // Pass both product and quantity to parent
    onAddToCart(product, quantity);
  };

  return (
    <>
      <div
        className="group border border-[var(--color-gray)] bg-[var(--color-white)] transition relative overflow-hidden
   w-full mx-auto sm:max-w-none rounded-sm"
      >
        <div
          className="relative w-full cursor-pointer overflow-hidden bg-[var(--color-black-hover)]"
          onClick={() => setShowGallery(true)}
        >
          <img
            src={product.image || "/placeholder.jpg"}
            alt={product.title || "Product image"}
            loading="lazy"
            onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
            className="w-full aspect-[3/3] sm:max-h-60 object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {product.photos?.length > 1 && (
            <div className="absolute bottom-1 right-1 sm:bottom-2 sm:right-2 bg-[var(--color-white)] bg-opacity-70 text-[var(--color-black)] text-[10px] sm:text-sm px-1.5 sm:px-2 py-0.5 shadow-sm rounded">
              +{product.photos.length - 1} more
            </div>
          )}

          {/* Added to Cart Badge */}
          {isAddedToCart && (
            <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 flex items-center gap-1 px-2 py-1 bg-[var(--color-primary)] text-[var(--color-white)] text-[10px] sm:text-xs font-bold rounded shadow-md">
              <Check size={12} />
              <span>In Cart</span>
            </div>
          )}

          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(product.wishlistItemId);
            }}
            className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center 
        bg-[var(--color-white)] border border-[var(--color-black-hover)] rounded-full shadow-sm 
        hover:border-[var(--color-black)] hover:shadow-md transition"
          >
            <X
              size={14}
              className="text-[var(--color-black)] hover:text-[var(--color-secondary-hover)]"
            />
          </button>
        </div>

        <div className="p-3 sm:p-4 flex flex-col gap-1">
          <h3 className="text-sm sm:text-base font-semibold text-[var(--color-black)] line-clamp-1 group-hover:text-[var(--color-secondary)] transition">
            {product.title}
          </h3>

          <div className="flex justify-end mt-1">
            {/* <p className="text-base sm:text-lg font-semibold text-[var(--color-black)]">
              ₹{product.price}
            </p> */}
            <div className="flex items-center gap-2">
              {/* <p className="text-[10px] sm:text-xs font-semibold text-[var(--color-black)] uppercase tracking-wide">
                Quantity
              </p> */}
              <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
            </div>
          </div>
        </div>

        <div className="border-t border-[var(--color-gray)]">
          {product.inStock ? (
            <button
              onClick={handleAddToCart}
              disabled={isAddedToCart}
              className={`w-full flex justify-center items-center gap-1.5 sm:gap-2 py-2.5 
          text-xs sm:text-sm font-medium transition ${
            isAddedToCart
              ? "text-[var(--color-primary)] bg-[var(--color-primary)]/5 cursor-default"
              : "text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] hover:bg-[var(--color-black-hover)]"
          }`}
            >
              {isAddedToCart ? (
                <>
                  <Check size={18} /> Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={18} /> Add to Cart
                </>
              )}
            </button>
          ) : (
            <span className="block text-center text-[var(--color-black)] text-xs sm:text-sm py-2">
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
