<<<<<<< HEAD
// import { useState } from "react";
// import { ShoppingCart } from "lucide-react";
// import ImageGalleryModal from "@/components/shared/ImageGalleryModal";

// const WishlistItem = ({ product, onRemove, onAddToCart }) => {
//   const [showGallery, setShowGallery] = useState(false);
//   //  ihavetochangethis
//   return (
//     <>
//       <div className="rounded-1xl border border-[var(--color-neutral-light)] bg-[var(--color-white)] shadow-sm p-4 flex flex-col gap-4 hover:shadow-md transition">
//         <div
//           className="relative cursor-pointer"
//           onClick={() => setShowGallery(true)}
//         >
//           <img
//             src={product.photos?.[0] || "/placeholder.jpg"}
//             alt={product.title}
//             className="w-full h-60 object-cover rounded-1xl border border-[var(--color-neutral-light)]"
//           />
//           {product.photos?.length > 1 && (
//             <div className="absolute bottom-2 right-2 bg-[var(--color-black)] bg-opacity-70 text-[var(--color-white)] text-xs px-2 py-1 rounded-md">
//               +{product.photos.length - 1} more
//             </div>
//           )}
//         </div>

//         <div className="flex flex-col gap-1">
//           <h3 className="text-base font-semibold text-[var(--color-black)] line-clamp-1">
//             {product.title}
//           </h3>
//           <p className="text-xs text-[var(--color-neutral-dark)]">
//             {product.category || "Agriculture Product"}
//           </p>
//           <p className="text-sm font-medium text-[var(--color-primary)]">
//             ₹{product.price}
//           </p>
//           <p
//             className={`text-xs ${
//               product.inStock
//                 ? "text-[var(--color-primary)]"
//                 : "text-[var(--color-neutral-dark)]"
//             }`}
//           >
//             {product.inStock ? "In Stock" : "Out of Stock"}
//           </p>
//         </div>

//         <div className="flex justify-between items-center mt-3">
//           {product.inStock ? (
//             <button
//               onClick={() => onAddToCart(product)}
//               className="flex items-center gap-1 px-3 py-1 rounded-lg bg-[var(--color-primary)] text-[var(--color-white)] hover:bg-[var(--color-primary-hover)] transition"
//             >
//               <ShoppingCart size={16} /> Add to Cart
//             </button>
//           ) : (
//             <span className="text-[var(--color-neutral-dark)] text-sm">
//               Not Available
//             </span>
//           )}

//           <button
//             onClick={() => onRemove(product._id)}
//             className="text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] text-sm transition"
//           >
//             Remove
//           </button>
//         </div>
//       </div>

//       <ImageGalleryModal
//         photos={product.photos || []}
//         isOpen={showGallery}
//         onClose={() => setShowGallery(false)}
//       />
//     </>
//   );
// };

// export default WishlistItem;




import { useState } from "react";
import { ShoppingCart } from "lucide-react";
import ImageGalleryModal from "@/components/shared/ImageGalleryModal";

const WishlistItem = ({ product, onRemove, onAddToCart }) => {
  const [showGallery, setShowGallery] = useState(false);
  //  ihavetochangethis
  return (
    <>
    <div className="group rounded-lg  border-gray-200 bg-[var(--color-white)] shadow-md hover:shadow-xl transition relative overflow-hidden">
  <div
    className="relative cursor-pointer"
    onClick={() => setShowGallery(true)}
  >
    <img
      src={product.photos?.[0] || "/placeholder.jpg"}
      alt={product.title}
      className="w-full h-64 object-cover rounded-t-lg"
    />

    
    {product.photos?.length > 1 && (
      <div className="absolute bottom-2 right-2 bg-[var(--color-black)] bg-opacity-70 text-[var(--color-white)] text-xs px-2 py-0.5 rounded-md shadow-sm">
        +{product.photos.length - 1} more
      </div>
    )}

    <button
      onClick={() => onRemove(product._id)}
      className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center 
                 bg-white border border-gray-300 rounded-full shadow-sm 
                 hover:border-gray-500 hover:shadow-md transition"
    >
      <span className="text-[var(--color-black)] hover:text-[var(--color-secondary-hover)] text-base">✕</span>
    </button>
  </div>

  <div className="p-4 flex flex-col gap-1">
    <h3 className="text-sm font-semibold text-[var(--color-black)] line-clamp-1 group-hover:text-[var(--color-secondary)] transition">
      {product.title}
    </h3>
    <p className="text-xs text-gray-500">
      {product.category || "Agriculture Product"}
    </p>

    <div className="flex items-center gap-2 mt-1">
      <p className="text-base font-semibold">₹{product.price}</p>
      <p
        className={`text-xs font-medium ${
          product.inStock 
          ? "text-[var(--color-primary)]"
          : "text-[var(--color-neutral-dark)]"
        }`}
      >
        {product.inStock ? "In Stock" : "Out of Stock"}
      </p>
    </div>
  </div>

  
  <div className="px-4 pb-4 pt-0">
    {product.inStock ? (
      <button
        onClick={() => onAddToCart(product)}
        className="w-full flex justify-center items-center gap-2 py-2.5 
                   text-[var(--color-secondary)] text-sm font-medium 
                   border-t border-gray-200 hover:text-[var(--color-secondary-hover)] 
                   hover:bg-gray-50 transition"
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
=======
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
>>>>>>> e036b7623936146338008251bf0aab14b502b869
