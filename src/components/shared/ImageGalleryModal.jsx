import React from "react";

const ImageGalleryModal = ({ photos = [], isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-white text-gray-900 overflow-auto flex flex-col"
      role="dialog"
      aria-modal="true"
    >
      <div className="px-4 py-16 md:px-12 md:py-20">
        {/* Close button */}
        <button
          className="fixed right-4 top-6 flex items-center gap-2 rounded-full border border-[var(--color-secondary)] bg-white px-5 py-2.5 text-sm font-medium text-[var(--color-secondary)] shadow-sm hover:shadow-md hover:bg-[var(--color-secondary)] hover:text-white transition-all duration-200 md:right-12"
          onClick={onClose}
        >
          ✕ Close
        </button>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="mb-6 break-inside-avoid overflow-hidden"
            >
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-auto object-cover cursor-pointer transform transition-transform duration-300 hover:scale-110"
                onClick={onClose}
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryModal;
