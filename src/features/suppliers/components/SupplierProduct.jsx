import React, { useState } from "react";
import { Edit2, Trash2, Plus } from "lucide-react";
import ImageGalleryModal from "@/components/shared/ImageGalleryModal";

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
    <div className="max-w-6xl px-4 mt-20 sm:mt-32 mx-auto">
      <h2 className="text-xl sm:text-2xl font-bold mb-6 text-[var(--color-black)]">
        Supplier Products
      </h2>

      {/* Grid Layout with equal height cards */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
        {products.map((product, idx) => (
          <li
            key={idx}
            className="flex flex-col bg-[var(--color-white)] border shadow-lg rounded-xl hover:shadow-xl transition p-4 relative h-full"
          >
            {/* Top Row → Edit/Delete */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-[var(--color-black)]">
                  {product.name}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--color-gray-hover)]">
                  {product.region}
                </p>
              </div>
              <div className="flex space-x-2">
                <Edit2
                  size={18}
                  className="text-blue-500 cursor-pointer hover:text-blue-600"
                  onClick={() => handleEdit(product)}
                />
                <Trash2
                  size={18}
                  className="text-red-500 cursor-pointer hover:text-red-600"
                  onClick={() => handleDelete(product)}
                />
              </div>
            </div>

            {/* Image Section */}
            <div className="relative w-full h-40 sm:h-48 mb-4">
              <img
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover rounded-lg"
              />
              {product.images.length > 1 && (
                <div
                  className="absolute bottom-2 right-2 flex items-center justify-center px-2 py-1 bg-[var(--color-white)] bg-opacity-90 text-[var(--color-black) text-xs rounded-full shadow-md cursor-pointer"
                  onClick={() => handleOpenGallery(product.images)}
                >
                  <Plus size={14} className="mr-1" /> {product.images.length}
                </div>
              )}
            </div>

            {/* Prices Row (always aligned) */}
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs sm:text-sm text-[var(--color-gray) line-through">
                ₹{product.price}
              </span>
              <span className="text-sm sm:text-base font-bold text-[var(--color-primary)]">
                ₹{product.discountPrice}
              </span>
              <span className="text-xs text-[var(--color-primary)">
                {getDiscountPercent(product.price, product.discountPrice)}% OFF
              </span>
            </div>

            {/* Description + Benefits fill the rest */}
            <div className="flex flex-col flex-1">
              <p className="text-xs sm:text-sm  text-[var(--color-gray) flex-1">
                <span className="font-semibold">Description:</span>{" "}
                {product.description}
              </p>

              <div className="mt-2">
                <span className="font-semibold  text-[var(--color-gray) text-xs sm:text-sm">
                  Benefits:
                </span>
                <ul className="flex flex-wrap gap-2 mt-1">
                  {product.benefits.map((benefit, i) => (
                    <li
                      key={i}
                      className="text-[10px] sm:text-xs bg-green-100 text-[var(--color-primary) px-2 py-1 rounded-full"
                    >
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Image Gallery Modal */}
      <ImageGalleryModal
        photos={selectedPhotos}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
