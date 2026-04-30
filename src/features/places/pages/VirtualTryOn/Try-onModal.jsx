import React, { useState, useEffect, useRef } from "react";
import { X, Loader2, Download } from "lucide-react";
import { useTryOn } from "./hooks/useTryOn";


const VirtualTryOnModal = ({
  isOpen,
  onClose,
  garmentImageUrl
}) => {

  const [humanImage, setHumanImage] = useState(null);
  const [category, setCategory] = useState("");

  const modalRef = useRef(null);

  /* ============================= */
  /* TRY-ON HOOK */
  /* ============================= */

  const {
    loading,
    resultImage,
    error,
    generate,
    reset
  } = useTryOn();

  /* ============================= */
  /* STOP BACKGROUND SCROLL */
  /* ============================= */

  useEffect(() => {

    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };

  }, [isOpen]);

  /* ============================= */
  /* ESC CLOSE */
  /* ============================= */

  useEffect(() => {

    const handleEsc = (e) => {

      if (e.key === "Escape") {
        handleClose();
      }

    };

    if (isOpen) {
      window.addEventListener(
        "keydown",
        handleEsc
      );
    }

    return () => {

      window.removeEventListener(
        "keydown",
        handleEsc
      );

    };

  }, [isOpen]);

  /* ============================= */
  /* CLOSE HANDLER */
  /* ============================= */

  const handleClose = () => {

    reset();

    setHumanImage(null);
    setCategory("");

    onClose();

  };

  /* ============================= */
  /* CLICK OUTSIDE CLOSE */
  /* ============================= */

  const handleOutsideClick = (e) => {

    if (
      modalRef.current &&
      !modalRef.current.contains(e.target)
    ) {
      handleClose();
    }

  };

  /* ============================= */
  /* FILE UPLOAD */
  /* ============================= */

  const handleHumanUpload = (e) => {

    const file =
      e.target.files[0];

    if (file) {
      setHumanImage(file);
    }

  };

  /* ============================= */
  /* GENERATE TRY-ON */
  /* ============================= */

  const handleGenerate = async () => {

    try {

      await generate({

        humanImage,
        garmentImageUrl,
        category

      });

    }
    catch (err) {

      alert(
        "Try-on failed. Please try again."
      );

    }

  };

  /* ============================= */
  /* DOWNLOAD RESULT */
  /* ============================= */

  const handleDownload = () => {

    if (!resultImage) return;

    const link =
      document.createElement("a");

    link.href = resultImage;
    link.download =
      "virtual-try-on.png";

    link.click();

  };

  /* ============================= */

  if (!isOpen) return null;

  return (

    <div
      onMouseDown={handleOutsideClick}
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-black/50 backdrop-blur-sm px-4"
    >

      <div
        ref={modalRef}
        className="bg-white rounded-2xl shadow-2xl 
                   w-full max-w-lg 
                   p-6 relative
                   max-h-[90vh] overflow-y-auto"
      >

        {/* CLOSE BUTTON */}

        <button
          onClick={handleClose}
          className="absolute right-4 top-4 
                     text-gray-500 hover:text-black"
        >
          <X size={22} />
        </button>

        {/* ============================= */}
        {/* LOADER */}
        {/* ============================= */}

        {loading && (

          <div className="flex flex-col items-center justify-center py-16">

            <Loader2
              size={40}
              className="animate-spin mb-4"
            />

            <h3 className="font-semibold text-lg">
              AI is generating your try-on...
            </h3>

            <p className="text-sm text-gray-500 mt-2 text-center">
              Please wait while we process your image.
            </p>

          </div>

        )}

        {/* ============================= */}
        {/* RESULT SCREEN */}
        {/* ============================= */}

        {!loading && resultImage && (

          <div className="text-center">

            <h2 className="text-xl font-bold mb-4">
              Your Try-On Result
            </h2>

            <img
              src={resultImage}
              alt="Try-On Result"
              className="rounded-xl mx-auto mb-6 max-h-[400px]"
            />

            <div className="flex gap-3">

              <button
                onClick={reset}
                className="flex-1 border rounded-xl py-2 hover:bg-gray-100"
              >
                Try Again
              </button>

              <button
                onClick={handleDownload}
                className="flex-1 bg-black text-white rounded-xl py-2 
                           flex items-center justify-center gap-2"
              >
                <Download size={16} />
                Download
              </button>

            </div>

          </div>

        )}

        {/* ============================= */}
        {/* MAIN INPUT SCREEN */}
        {/* ============================= */}

        {!loading && !resultImage && (

          <>

            <h2 className="text-xl font-bold text-center mb-6">
              Virtual Try-On
            </h2>

            {/* HUMAN IMAGE */}

            <div className="mb-5">

              <label className="block text-sm font-medium mb-2">
                Upload Your Photo
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleHumanUpload}
                className="w-full border rounded-xl p-2"
              />

              {humanImage && (

                <img
                  src={
                    URL.createObjectURL(
                      humanImage
                    )
                  }
                  alt="Human Preview"
                  className="mt-3 h-32 mx-auto rounded-lg object-cover"
                />

              )}

            </div>

            {/* PRODUCT GARMENT */}

            <div className="mb-5">

              <label className="block text-sm font-medium mb-2">
                Selected Product Garment
              </label>

              <div className="border rounded-xl p-4 text-center bg-gray-50">

                {garmentImageUrl && (

                  <img
                    src={garmentImageUrl}
                    alt="Product Garment"
                    className="h-32 mx-auto rounded-lg object-cover"
                  />

                )}

                <p className="text-xs text-gray-500 mt-2">
                  This garment is automatically selected from the product.
                </p>

              </div>

            </div>

            {/* CATEGORY */}

            <div className="mb-6">

              <label className="block text-sm font-medium mb-2">
                Category
              </label>

              <select
                value={category}
                onChange={(e) =>
                  setCategory(
                    e.target.value
                  )
                }
                className="w-full border rounded-xl p-2"
              >

                <option value="">
                  Select Category
                </option>

                <option value="shirt">
                  Shirt
                </option>

                <option value="pant">
                  Pant
                </option>

                <option value="jacket">
                  Jacket
                </option>

                <option value="kurta">
                  Kurta
                </option>

              </select>

            </div>

            {/* ERROR MESSAGE */}

            {error && (

              <p className="text-red-500 text-sm mb-4 text-center">
                {error}
              </p>

            )}

            {/* BUTTONS */}

            <div className="flex gap-3">

              <button
                onClick={handleClose}
                className="flex-1 border rounded-xl py-2 hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                onClick={handleGenerate}
                disabled={
                  !humanImage ||
                  !category
                }
                className="flex-1 bg-black text-white 
                           rounded-xl py-2 
                           hover:bg-gray-800 
                           disabled:bg-gray-400"
              >
                Generate Try-On
              </button>

            </div>

          </>

        )}

      </div>

    </div>

  );

};

export default VirtualTryOnModal;