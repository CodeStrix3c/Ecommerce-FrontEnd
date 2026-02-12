import React from "react";
import { X } from "lucide-react";

const ImageGalleryModal = ({ photos = [], isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[var(--color-white)] text-[var(--color-black-hover)] overflow-auto flex flex-col no-scrollbar"
      role="dialog"
      aria-modal="true"
    >
      <div className="sticky top-0 z-50 flex items-center justify-between bg-[var(--color-white)] shadow-sm px-4 py-4 md:px-12 md:py-5 border-b border-[var(--color-neutral-light)]">
        <h2 className="text-lg font-semibold text-[var(--color-black)]">
          Product Images
        </h2>
        <button
          onClick={onClose}
          className="flex items-center justify-center rounded-full p-2 hover:bg-[var(--color-white-hover)] transition-all"
          aria-label="Close"
        >
          <X className="h-5 w-5 text-[var(--color-secondary)]" />
        </button>
      </div>

      <div className="px-4 py-8 md:px-12">
        <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="mb-6 break-inside-avoid overflow-hidden rounded-lg shadow-sm"
            >
              <img
                src={photo}
                alt={`Photo ${index + 1}`}
                className="w-full h-auto object-contain cursor-pointer transform transition-transform duration-300 hover:scale-105"
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
