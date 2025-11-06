import { useState } from "react";
import { Trash2, Star } from "lucide-react";
import ImageGalleryModal from "@/components/shared/ImageGalleryModal";

const CartItem = ({ product, onRemove }) => {
  const [showGallery, setShowGallery] = useState(false);

  return (
    <>
      <div className=" md:border rounded-sm transition bg-[var(--color-white)] pr-3">
        <div className="flex gap-6">
          <div className="w-40 flex-shrink-0 relative">
            
            <div
              className="bg-red-50 h-28 overflow-hidden cursor-pointer"
              onClick={() => setShowGallery(e)}
            >
              <img
                src={product.photos?.[0] || "/placeholder.jpg"}
                alt={product.title}
                className="w-full h-full object-cover rounded-sm "
              />
            </div>

            {product.photos?.length > 1 && (
              <div
                className="absolute bottom-2 right-2 bg-[var(--color-black)] bg-opacity-70 text-[var(--color-white)] text-xs px-2 py-1 rounded-sm"
                onClick={() => setShowGallery(true)}
              >
                +{product.photos.length - 1} more
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center flex-grow">
            <div>
              <h3 className="text-lg font-semibold text-[var(--color-neutral-dark)] ">
                {product.title}
              </h3>
              <p className="text-sm text-[var(--color-neutral-dark)] line-clamp-1">
                {product.address}
              </p>

              <div className="flex items-center gap-2 p">
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
                ₹{product.price}
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

      <ImageGalleryModal
        photos={product.photos || []}
        isOpen={showGallery}
        onClose={() => setShowGallery(false)}
      />
    </>
  );
};

export default CartItem;
