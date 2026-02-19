import { useState } from "react";
import { ShoppingCart, X, Check } from "lucide-react";
import ImageGalleryModal from "@/components/shared/ImageGalleryModal";
import QuantitySelector from "@/components/shared/QuantitySelector";

const WishlistItem = ({ product, onRemove, onAddToCart, isAddedToCart }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
  };

  return (
    <>
      <div
        className="
        group
        border border-gray-200
        bg-white
        transition-all duration-300
        relative overflow-hidden
        w-full
        rounded-sm
        hover:shadow-md hover:-translate-y-1
        flex flex-col
        "
      >
        {/* IMAGE */}
        <div
          className="
          relative
          w-full
          cursor-pointer
          overflow-hidden
          bg-gray-100
          "
          onClick={() => setShowGallery(true)}
        >
          <img
            src={product.image || "/placeholder.jpg"}
            alt={product.title}
            loading="lazy"
            onError={(e) => (e.currentTarget.src = "/placeholder.jpg")}
            className="
              w-full
              aspect-square
              object-cover
              transition-transform duration-500
              group-hover:scale-105
            "
          />

          {/* More photos */}
          {product.photos?.length > 1 && (
            <div
              className="
              absolute bottom-2 right-2
              bg-white/90
              text-black
              text-xs
              px-2 py-1
              rounded shadow-sm
            "
            >
              +{product.photos.length - 1}
            </div>
          )}

          {/* In Cart badge */}
          {isAddedToCart && (
            <div
              className="
              absolute top-2 left-2
              flex items-center gap-1
              px-2 py-1
              bg-green-600
              text-white
              text-xs
              rounded
              shadow
            "
            >
              <Check size={12} />
              In Cart
            </div>
          )}


          <button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(product.wishlistItemId);
            }}
            className="
              absolute top-2 right-2
              w-8 h-8
              flex items-center justify-center
              bg-white
              border border-gray-200
              rounded-full
              shadow-sm
              transition-all duration-300
              hover:bg-red-50
              hover:border-red-400
              hover:scale-110
            "
          >
            <X
              size={18}
              className="text-gray-600 hover:text-red-500"
            />
          </button>
        </div>


        <div
          className="
          p-3 sm:p-4
          flex flex-col
          gap-2
          flex-grow
          "
        >
          <h3
            className="
            text-sm sm:text-base
            font-semibold
            text-gray-800
            line-clamp-2
            group-hover:text-[var(--color-secondary)]
            min-h-[40px]
            "
          >
            {product.title}
          </h3>

          <div
            className="
            flex items-center
            justify-between
            mt-1
            "
          >
            <span className="text-xs sm:text-sm text-black/70">
              Qty: {quantity}
            </span>

            <QuantitySelector
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>
        </div>


        <div className="border-t border-gray-100 p-3 mt-auto">
          {product.inStock ? (
            <button
              onClick={handleAddToCart}
              disabled={isAddedToCart}
              className={`
                w-full
                flex items-center justify-center gap-2
                py-2.5
                text-sm font-medium
                rounded-sm
                transition-all duration-300
                ${isAddedToCart
                  ? "bg-green-50 text-green-600"
                  : `
                      bg-[var(--color-secondary)]/10
                      text-[var(--color-secondary)]
                      hover:bg-[var(--color-secondary)]
                      hover:text-white
                      hover:shadow-md
                      active:scale-[0.98]
                    `
                }
              `}
            >
              {isAddedToCart ? (
                <>
                  <Check size={18} />
                  Added to Cart
                </>
              ) : (
                <>
                  <ShoppingCart size={18} />
                  Add to Cart
                </>
              )}
            </button>
          ) : (
            <div className="text-center text-sm text-gray-400 py-2">
              Not Available
            </div>
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
