import React, { useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import ImageGalleryModal from "@/components/shared/ImageGalleryModal";
import ContentWrapper from "@/components/shared/ContentWrapper";

export function SupplierProduct() {
  const products = [
    {
      name: "Agricultural Insecticides",
      
      price: 500,
      discountPrice: 450,
      images: [
        "https://images.unsplash.com/photo-1658980356578-e969254c2e02?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
        "https://images.unsplash.com/photo-1606788075761-6b9a5a7c1d73?auto=format&fit=crop&w=400&q=60",
      ],
      description:
        "Designed to kill or inhibit the growth of unwanted plants (weeds). Helps farmers protect crops by reducing weed competition for nutrients, water, and sunlight. Bright yellow packaging for easy identification.",
      benefits: ["Weed Control", "Easy Identification", "Crop Protection"],
    },
    {
      name: "Organic Fertilizer",
      
      price: 600,
      discountPrice: 500,
      images: [
        "https://plus.unsplash.com/premium_photo-1661490237999-683317e04531?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlc3RpY2lkZSUyMG1lZGljaW5lfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1606788075761-6b9a5a7c1d73?auto=format&fit=crop&w=400&q=60",
      ],
      description:
        "Designed to kill or inhibit the growth of unwanted plants (weeds). Helps farmers protect crops by reducing weed competition for nutrients, water, and sunlight. Bright yellow packaging for easy identification.",
      benefits: ["Eco-Friendly", "High Yield", "Soil Health"],
    },
      {
      name: "Agricultural Insecticides",
      
      price: 500,
      discountPrice: 450,
      images: [
        "https://images.unsplash.com/photo-1658980356578-e969254c2e02?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
        "https://images.unsplash.com/photo-1606788075761-6b9a5a7c1d73?auto=format&fit=crop&w=400&q=60",
      ],
      description:
        "Designed to kill or inhibit the growth of unwanted plants (weeds). Helps farmers protect crops by reducing weed competition for nutrients, water, and sunlight. Bright yellow packaging for easy identification.",
        
      benefits: ["Weed Control", "Easy Identification", "Crop Protection"],
    },
    {
      name: "Organic Fertilizer",
      
      price: 600,
      discountPrice: 500,
      images: [
        "https://plus.unsplash.com/premium_photo-1661490237999-683317e04531?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlc3RpY2lkZSUyMG1lZGljaW5lfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1606788075761-6b9a5a7c1d73?auto=format&fit=crop&w=400&q=60",
        
      ],
      description:
        "Designed to kill or inhibit the growth of unwanted plants (weeds). Helps farmers protect crops by reducing weed competition for nutrients, water, and sunlight. Bright yellow packaging for easy identification.",
      benefits: ["Eco-Friendly", "High Yield", "Soil Health"],
    },
      {
      name: "Agricultural Insecticides",
      
      price: 500,
      discountPrice: 450,
      images: [
        "https://images.unsplash.com/photo-1658980356578-e969254c2e02?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0",
        "https://images.unsplash.com/photo-1606788075761-6b9a5a7c1d73?auto=format&fit=crop&w=400&q=60",
      ],
      description:
        "Designed to kill or inhibit the growth of unwanted plants (weeds). Helps farmers protect crops by reducing weed competition for nutrients, water, and sunlight. Bright yellow packaging for easy identification.",
      benefits: ["Weed Control", "Easy Identification", "Crop Protection"],
    },
    {
      name: "Organic Fertilizer",
      
      price: 600,
      discountPrice: 500,
      images: [
        "https://plus.unsplash.com/premium_photo-1661490237999-683317e04531?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBlc3RpY2lkZSUyMG1lZGljaW5lfGVufDB8fDB8fHww",
        "https://images.unsplash.com/photo-1606788075761-6b9a5a7c1d73?auto=format&fit=crop&w=400&q=60",
      ],
      description:
        "This organic fertilizer improves soil fertility and enhances crop yield naturally.",
      benefits: ["Eco-Friendly", "High Yield", "Soil Health"],
    },
  ];

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const handleEdit = (product) => alert(`Edit ${product.name}`);
  const handleDelete = (product) => alert(`Delete ${product.name}`);
  const handleOpenGallery = (images) => {
    setSelectedPhotos(images);
    setModalOpen(true);
  };

  const getDiscountPercent = (price, discountPrice) =>
    Math.round(((price - discountPrice) / price) * 100);

  return (
   
    <ContentWrapper>
  <div className="mt-4 md:mt-32 lg:mt-32 mx-auto  sm:px-4 lg:px-8 lg:mb-6 ">
    <h2 className="text-xl sm:text-2xl font-bold mb-6 text-[var(--color-black)]">
      Supplier Products
    </h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 auto-rows-fr">
      {products.map((product, idx) => (
        <div
          key={idx}
          className="flex flex-col bg-[var(--color-white)] border transition relative h-full"
        >
          {/* Header */}
          <div className="flex justify-between items-start px-4 pt-4">
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-[var(--color-black)]">
                {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--color-gray-hover)]">
                {product.region || "Pan-India"}
              </p>
            </div>
            <div className="flex space-x-2">
              <Edit2
                size={18}
                className="text-[var(--color-primary)] cursor-pointer hover:text-[var(--color-black)]"
                onClick={() => handleEdit(product)}
              />
              <Trash2
                size={18}
                className="text-[var(--color-secondary)] cursor-pointer hover:text-[var(--color-black)]"
                onClick={() => handleDelete(product)}
              />
            </div>
          </div>

          {/* Product Image */}
          <div className="relative w-full h-40 sm:h-48 mt-2 px-4">
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg"
            />
            {product.images.length > 1 && (
              <div
                className="absolute bottom-2 right-2 flex items-center justify-center px-2 py-1 bg-[var(--color-white)] bg-opacity-90 text-[var(--color-black)] text-xs rounded-full cursor-pointer mr-4"
                onClick={() => handleOpenGallery(product.images)}
              >
                <Plus size={14} className="mr-1" /> {product.images.length}
              </div>
            )}
          </div>

          {/* Price & Discount */}
          <div className="flex items-center gap-2 mt-2 px-4">
            <span className="text-xs sm:text-sm text-[var(--color-black)] line-through">
              ₹{product.price}
            </span>
            <span className="text-sm sm:text-base font-bold text-[var(--color-primary)]">
              ₹{product.discountPrice}
            </span>
            <span className="text-xs text-[var(--color-secondary)]">
              {getDiscountPercent(product.price, product.discountPrice)}% OFF
            </span>
          </div>

          {/* Description & Benefits */}
          <div className="flex flex-col flex-1 px-4 py-2">
            <p className="text-xs sm:text-sm text-[var(--color-black)]">
              <span className="font-semibold">Description:</span> {product.description}
            </p>

            <div className="mt-2">
              <span className="font-semibold text-[var(--color-black)] text-xs sm:text-sm">
                Benefits:
              </span>
              <ul className="flex flex-wrap gap-2 mt-1">
                {product.benefits.map((benefit, i) => (
                  <li
                    key={i}
                    className="text-[10px] sm:text-xs bg-[var(--color-gray)] text-[var(--color-primary)] px-2 py-1 rounded-full"
                  >
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Image Gallery Modal */}
    <ImageGalleryModal
      photos={selectedPhotos}
      isOpen={modalOpen}
      onClose={() => setModalOpen(false)}
    />
  </div>
</ContentWrapper>

  );
}
