import React from "react";

const ImageGalleryModal = ({ photos = [], isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-[var(--color-white)] text-[var(--color-black)] overflow-auto">
      <div className="px-2 py-20 md:p-8">
        {/* Close button */}
        <button
          className="fixed right-2 top-8 flex gap-1 rounded-2xl bg-[var(--color-white)] py-2 px-4 text-[var(--color-black)] shadow-md hover:shadow-lg md:right-12"
          onClick={onClose}
        >
          ✕ Close
        </button>

        {/* Masonry grid */}
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="mb-4 break-inside-avoid overflow-hidden rounded-md"
            >
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-auto object-cover cursor-pointer"
                onClick={onClose}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGalleryModal;
