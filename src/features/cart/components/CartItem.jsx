import { useState, useEffect } from "react";
import { Trash2, Star } from "lucide-react";
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
    onQuantityChange(product.cartItemId, newQuantity); // ✅ cart item id
  };

  return (
    <>
      <div className="md:border rounded-sm transition bg-[var(--color-white)] pr-3">
        <div className="flex gap-6">
          {/* Image */}
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
          </div>

          <div className="flex flex-col justify-center flex-grow">
            <div className="flex items-start justify-between">
              <h3 className="text-xl font-semibold text-[var(--color-black)]">
                {product.title}
              </h3>

              <QuantitySelector
                quantity={quantity}
                setQuantity={handleQuantityChange}
              />
            </div>

            <div className="flex justify-between items-center mt-3">
              <p className="text-base font-medium text-[var(--color-primary)]">
                ₹{(product.price * quantity).toFixed(2)}
              </p>
              <p className="text-base font-medium text-[var(--color-primary)]">
                ₹{product.oldPrice}
              </p>
              <p className="text-base font-medium text-[var(--color-primary)]">
                savings:{product.savings}
              </p>

              <button
                onClick={() => onRemove(product.cartItemId)}
                className="text-sm text-[var(--color-secondary)] flex items-center gap-1"
              >
                <Trash2 size={14} /> Remove
              </button>
            </div>
          </div>
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

export default CartItem;
