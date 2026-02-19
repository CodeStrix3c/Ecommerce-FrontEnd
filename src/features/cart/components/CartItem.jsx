import { useState, useEffect } from "react";
import { Trash2 } from "lucide-react";
import ImageGalleryModal from "@/components/shared/ImageGalleryModal";
import QuantitySelector from "@/components/shared/QuantitySelector";

const CartItem = ({ product, onRemove, onQuantityChange }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [quantity, setQuantity] = useState(product.quantity || 1);

  useEffect(() => {
    setQuantity(product.quantity || 1);
  }, [product.quantity]);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;

    setQuantity(newQuantity);
    onQuantityChange(product.cartItemId, newQuantity);
  };

  return (
    <>
      <div
        className="
        border border-gray-200
        rounded-sm
        bg-[var(--color-white)]
        p-3 sm:p-4
        transition hover:shadow-sm
      "
      >
        {/* MAIN CONTAINER */}
        <div
          className="
          flex 
          flex-col sm:flex-row 
          gap-4 sm:gap-6
        "
        >
          {/* IMAGE */}
          <div
            className="
            w-full sm:w-32 md:w-40
            flex-shrink-0
          "
          >
            <div
              className="
              h-28 sm:h-32 md:h-28
              overflow-hidden
              cursor-pointer
              rounded-sm
              bg-gray-100
            "
              onClick={() => setShowGallery(true)}
            >
              <img
                src={product.photos?.[0] || "/placeholder.jpg"}
                alt={product.title}
                className="
                  w-full h-full object-cover
                  transition hover:scale-105 duration-300
                "
              />
            </div>
          </div>

          {/* CONTENT */}
          <div className="flex flex-col flex-grow justify-between">

            {/* TOP */}
            <div
              className="
              flex 
              flex-col sm:flex-row 
              sm:items-start 
              sm:justify-between
              gap-2 sm:gap-4
            "
            >
              {/* TITLE */}
              <h3
                className="
                text-base sm:text-lg md:text-xl
                font-semibold
                text-[var(--color-black)]
                line-clamp-2
              "
              >
                {product.title}
              </h3>

              {/* QUANTITY */}
              <div className="self-start sm:self-auto">
                <QuantitySelector
                  quantity={quantity}
                  setQuantity={handleQuantityChange}
                />
              </div>
            </div>

            {/* BOTTOM */}
            <div
              className="
              flex 
              flex-col sm:flex-row 
              sm:items-center 
              sm:justify-between
              gap-2 sm:gap-4
              mt-2
            "
            >
              {/* PRICE SECTION */}
              <div
                className="
                flex 
                flex-wrap 
                items-center 
                gap-2 sm:gap-3
              "
              >
                <span
                  className="
                  text-base sm:text-lg
                  font-semibold
                  text-[var(--color-primary)]
                "
                >
                  ₹{(product.price * quantity).toFixed(2)}
                </span>

                {product.oldPrice > 0 && (
                  <span
                    className="
                    text-sm sm:text-base
                    line-through
                    text-gray-400
                  "
                  >
                    ₹{product.oldPrice}
                  </span>
                )}

                {product.savings > 0 && (
                  <span
                    className="
                    text-xs sm:text-sm
                    text-green-600
                    font-medium
                  "
                  >
                    Save {product.savings}%
                  </span>
                )}
              </div>

              {/* REMOVE BUTTON */}
              <button
                onClick={() => onRemove(product.cartItemId)}
                className="
                flex items-center gap-1
                text-sm
                text-[var(--color-secondary)]
                hover:text-red-600
                transition
                self-start sm:self-auto
              "
              >
                <Trash2 size={16} />
                Remove
              </button>

            </div>

          </div>
        </div>
      </div>

      {/* IMAGE MODAL */}
      <ImageGalleryModal
        photos={product.photos || []}
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
      />
    </>
  );
};

export default CartItem;
