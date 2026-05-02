import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import Spinner from "@/components/ui/Spinner";
import BookingWidget from "@/features/bookings/components/BookingWidget";
import PlaceGallery from "@/features/places/components/PlaceGallery";
import ListingHeader from "@/components/shared/ListingHeader";
import ContentWrapper from "@/components/shared/ContentWrapper";

import {
  useProductDetailsQuery,
  useProductsQuery,
} from "@/hooks/useProductsQuery";

import ProductInfoPanel from "../components/ProductInfoPanel";
import Testimonials from "@/features/reviews/pages/Testimonials";
import YouMayAlsoLike from "../components/YouMayAlsoLike";
import CrossSellProducts from "../components/CrossSellProducts";
import GiftPackagingModal from "../models/GiftPackagingModal";
import VirtualTryOnModal from "./VirtualTryOn/Try-onModal";

const PlacePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading } = useProductDetailsQuery(id);
  const { data: productsData } = useProductsQuery({ page: 1 });

  const [place, setPlace] = useState(null);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [giftModalOpen, setGiftModalOpen] = useState(false);

  const [tryOnOpen, setTryOnOpen] = useState(false);

  const [openSections, setOpenSections] = useState({
    shortDesc: false,
    description: false,
    attributes: false,
    brand: false,
    stock: false,
  });

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const [popularRef, popularInstanceRef] = useKeenSlider({
    mode: "free",
    rubberband: false,
    slides: {
      perView: 2.2,
      spacing: 10,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 3.2, spacing: 12 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4.2, spacing: 14 },
      },
    },
  });

  useEffect(() => {
    popularInstanceRef.current?.update();
  }, [productsData]);

  useEffect(() => {
    if (!product) return;

    const images =
      product.images
        ?.map((img) => img.url || img.thumbnailUrl)
        .filter(Boolean) ?? [];

    setPlace({
      _id: product.id,
      title: product.name,
      description: product.description,
      shortDescription: product.shortDescription,
      specification: product.specification ?? null,
      weight: product.weight ?? null,
      dimensions: product.dimensions ?? null,
      price: product.calculatedProductPrice?.price ?? 0,
      oldPrice: product.calculatedProductPrice?.oldPrice ?? null,
      discount: product.calculatedProductPrice?.percentOfSaving ?? 0,
      rating: product.ratingAverage ?? 0,
      reviewsCount: product.reviewsCount ?? 0,
      stock: product.stockQuantity ?? 0,
      inStock: product.stockQuantity > 0,
      stockQuantity: product.stockQuantity,
      brand: product.brand?.name || null,
      attributes: product.attributes ?? [],
      photos: images,
      images: product.images ?? [],
    });
  }, [product]);

  if (isLoading || !place) return <Spinner />;

  const productsList = productsData?.products || [];

  const popularItems = productsList
    .filter((p) => String(p.id) !== String(id))
    .slice(0, 10)
    .map((p) => {
      const imgPath =
        p.thumbnailUrl || p.images?.[0]?.thumbnailUrl || p.images?.[0]?.url;

      if (!imgPath) return null;

      return {
        id: p.id,
        title: p.name,
        image: imgPath,
      };
    })
    .filter(Boolean);

  return (
    <ContentWrapper>
      <div className="pt-6 lg:pt-10 pb-6 lg:pb-8">
        <ListingHeader place={place} />

        <div className="mt-10 flex flex-col gap-8 lg:flex-row">
          {/* LEFT SIDE */}
          <div className="lg:w-4/7 w-full">
            <PlaceGallery place={place} />
          </div>

          {/* RIGHT SIDE */}
<<<<<<< HEAD
          <div className="lg:w-2/7 w-full space-y-4">
            <ProductInfoPanel
              place={place}
              openSections={openSections}
              toggleSection={toggleSection}
            />
=======
          <div
            ref={rightColRef}
            className="lg:w-2/7 w-full relative z-10"
          >

            <div
              ref={rightPanelRef}
              className="space-y-4 transition-opacity duration-200"
            >

              <ProductInfoPanel
                place={place}
                openSections={openSections}
                toggleSection={toggleSection}
              />
              <div className="relative">
                <button
                  onClick={() => setGiftModalOpen(true)}
                  className="group flex items-center justify-between w-full p-4 text-sm border rounded-xl bg-gray-50/50 border-gray-100 hover:border-black hover:bg-white transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${selectedPackage ? "bg-black text-white" : "bg-white text-gray-400 border border-dashed border-gray-300"}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 12v10H4V12" />
                        <path d="M2 7h20v5H2z" />
                        <path d="M12 22V7" />
                        <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
                        <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
                      </svg>
                    </div>

                    <div className="text-left">
                      <p className="font-bold text-gray-900">
                        {selectedPackage
                          ? selectedPackage.name
                          : "Add Gift Packaging"}
                      </p>
                      <p className="text-xs text-gray-500">
                        {selectedPackage
                          ? `${selectedPackage.occasion} • +₹${selectedPackage.price}`
                          : "Make it special with premium wrapping"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* THE REMOVE BUTTON */}
                    {selectedPackage && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevents opening the modal
                          setSelectedPackage(null);
                        }}
                        className="px-3 py-1 text-[10px] font-bold uppercase tracking-tighter text-red-500 hover:bg-red-50 rounded-md transition-colors"
                      >
                        Remove
                      </button>
                    )}

                    <span className="text-xs font-bold uppercase tracking-widest text-gray-400 group-hover:text-black transition-colors">
                      {selectedPackage ? "Edit" : "Add"}
                    </span>
                  </div>
                </button>
              </div>
              <BookingWidget place={place} selectedPackage={selectedPackage} />
            </div>
          </div>

              {/* ========================= */}
              {/* VIRTUAL TRY ON BUTTON */}
              {/* ========================= */}
>>>>>>> 8782e65ed87cd9110efd0890782389145be879c1

            {/* ===== ACTION BLOCK ===== */}
            <div className="space-y-3">
              {/* 🎁 GIFT PACKAGING */}
              <button
                onClick={() => setGiftModalOpen(true)}
                className="w-full flex items-center justify-between p-4 text-sm border rounded-xl 
                           bg-gray-50 hover:bg-white hover:border-black transition"
              >
                <div className="flex items-center gap-3">
                  <span>🎁</span>
                  <div className="text-left">
                    <p className="font-semibold">
                      {selectedPackage
                        ? selectedPackage.name
                        : "Add Gift Packaging"}
                    </p>
                    <p className="text-xs text-gray-500">
                      {selectedPackage
                        ? `${selectedPackage.occasion} • +₹${selectedPackage.price}`
                        : "Make it special with premium wrapping"}
                    </p>
                  </div>
                </div>

                {selectedPackage && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPackage(null);
                    }}
                    className="text-xs text-red-500"
                  >
                    Remove
                  </button>
                )}
              </button>

              {/* 👕 VIRTUAL TRY ON */}
              <button
                onClick={() => setTryOnOpen(true)}
                className="w-full flex items-center justify-center gap-2 
                           bg-[var(--color-primary)] text-white font-semibold 
                           py-3 rounded-xl hover:opacity-90 transition"
              >
                👕 Virtual Try-On
              </button>
            </div>

            <BookingWidget place={place} selectedPackage={selectedPackage} />
          </div>
        </div>

        {/* RELATED */}
        <YouMayAlsoLike
          products={product.relatedProducts?.filter((p) => p.id !== product.id)}
        />

        <CrossSellProducts products={product.crossSellProducts} />

        {/* RECENTLY VIEWED */}
        <div className="mt-10">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recently Viewed Products</h2>

            <div className="flex gap-2">
              <button onClick={() => scroll("left")}>
                <ChevronLeft />
              </button>
              <button onClick={() => scroll("right")}>
                <ChevronRight />
              </button>
            </div>
          </div>

          <div ref={scrollRef} className="flex gap-4 overflow-x-auto">
            {popularItems.map((item) => (
              <div
                key={item.id}
                className="w-[180px] cursor-pointer"
                onClick={() => navigate(`/place/${item.id}`)}
              >
                <img src={item.image} alt={item.title} className="rounded-xl" />
                <p className="text-sm mt-2">{item.title}</p>
              </div>
            ))}
          </div>
        </div>

        <Testimonials />
      </div>

      <VirtualTryOnModal
        isOpen={tryOnOpen}
        onClose={() => setTryOnOpen(false)}
        garmentImageUrl={place?.photos?.[0]}
   <GiftPackagingModal
  isOpen={giftModalOpen}
  onClose={() => setGiftModalOpen(false)}
  place={product}
  currentSelection={selectedPackage}
  onSelectPackage={setSelectedPackage}
/>
      {/* ========================= */}
      {/* VIRTUAL TRY ON MODAL */}
      {/* ========================= */}

<VirtualTryOnModal
  isOpen={tryOnOpen}
  onClose={() => setTryOnOpen(false)}
  garmentImageUrl={
    place?.photos?.[0]
  }
/>
      {/* EXISTING MODAL */}
      <GiftPackagingModal
        isOpen={giftModalOpen}
        onClose={() =>
          setGiftModalOpen(false)
        }
        place={place}
        onSelectPackage={
          setSelectedPackage
        }
        currentSelection={
          selectedPackage
        }
      />

      <GiftPackagingModal
        isOpen={giftModalOpen}
        onClose={() => setGiftModalOpen(false)}
        place={place}
        onSelectPackage={setSelectedPackage}
        currentSelection={selectedPackage}
      />
    </ContentWrapper>
  );
};

export default PlacePage;
