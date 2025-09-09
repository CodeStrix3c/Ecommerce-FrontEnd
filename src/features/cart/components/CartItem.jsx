import { Trash2, Star } from "lucide-react";
import PlaceGallery from "@/features/places/components/PlaceGallery";

const CartItem = ({ product, onRemove }) => (
  <div className="flex gap-4 border rounded-2xl p-4 transition bg-[var(--color-white)]">
    <div className="w-40 h-28 flex-shrink-0 overflow-hidden rounded-xl">
      <PlaceGallery place={product} />
    </div>

    <div className="flex flex-col justify-between flex-grow">
      <div>
        <h3 className="text-lg font-semibold text-[var(--color-neutral-dark)] line-clamp-1">
          {product.title}
        </h3>
        <p className="text-sm text-[var(--color-neutral-dark)] line-clamp-1">
          {product.address}
        </p>

        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center gap-1 text-[var(--color-accent)] font-semibold">
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
          className="text-sm text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] flex items-center gap-1"
        >
          <Trash2 size={14} /> Remove
        </button>
      </div>
    </div>
  </div>
);

export default CartItem;
