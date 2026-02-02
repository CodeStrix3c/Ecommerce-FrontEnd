import { useState } from "react";
import { Trash2, Star } from "lucide-react";
import ImageGalleryModal from "@/components/shared/ImageGalleryModal";
import QuantitySelector from "@/components/shared/QuantitySelector";

const CartItem = ({ product, onRemove, onQuantityChange }) => {
  const [showGallery, setShowGallery] = useState(false);
  const [quantity, setQuantity] = useState(product.quantity || 1);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    onQuantityChange(product._id, newQuantity);
  };

  return (
    <>
      <div className="md:border rounded-sm transition bg-[var(--color-white)] pr-3">
        <div className="flex gap-6">
          {/* Product image */}
          <div className="w-40 flex-shrink-0 relative">
            <div
              className="bg-red-50 h-28 overflow-hidden cursor-pointer"
              onClick={() => setShowGallery(true)}
            >
              <img
                src={product.photos?.[0] || "/placeholder.jpg"}
                alt={product.title}
                className="w-full h-full object-cover rounded-sm"
              />
            </div>

            {product.photos?.length > 1 && (
              <div
                className="absolute bottom-2 right-2 bg-[var(--color-black)] bg-opacity-70 text-[var(--color-white)] text-xs px-2 py-1 rounded-sm cursor-pointer"
                onClick={() => setShowGallery(true)}
              >
                +{product.photos.length - 1} more
              </div>
            )}
          </div>


          <div className="flex flex-col justify-center flex-grow">
            <div>
              <div className="flex items-start justify-between">
                <h3 className="text-xl font-semibold text-[var(--color-black)]">
                  {product.title}
                </h3>


                <div className="mt-2">
                  <QuantitySelector
                    quantity={quantity}
                    setQuantity={(newQuantity) =>
                      handleQuantityChange(newQuantity)
                    }
                  />
                </div>
              </div>

              <p className="text-sm text-[var(--color-neutral-dark)] line-clamp-1">
                {product.address}
              </p>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 text-[var(--color-secondary)] font-semibold">
                  <Star size={16} />
                  <span>{product.rating}</span>
                </div>
                <span className="text-sm text-[var(--color-neutral-dark)]">
                  {product.inStock ? "In Stock" : "Out of Stock"}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3">
              <p className="text-base font-medium text-[var(--color-primary)]">
                ₹{(product.price * quantity).toFixed(2)}
              </p>
              <button
                onClick={() => onRemove(product._id)}
                className="text-sm text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] flex items-center gap-1"
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery modal */}
      <ImageGalleryModal
        photos={product.photos || []}
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
      />
    </>
  );
};

export default CartItem;
