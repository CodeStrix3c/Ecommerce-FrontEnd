import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Smartphone } from "lucide-react";
import QRCode from "react-qr-code";

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

const ZOOM_LEVEL = 3;

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

  /* ========================= */
  /* ZOOM */
  /* ========================= */
  const imageRef = useRef(null);
  const rightColRef = useRef(null);
  const zoomPanelRef = useRef(null);
  const hasMovedRef = useRef(false);

  const [showZoom, setShowZoom] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleMouseEnter = () => {
    if (!place?.photos?.length || window.innerWidth < 1024) return;
    hasMovedRef.current = false;
    setZoomImage(selectedPhoto || place.photos[0]);
  };

  const handleMouseLeave = () => {
    hasMovedRef.current = false;
    setShowZoom(false);
  };

  const handleMouseMove = (e) => {
    if (!imageRef.current || !rightColRef.current) return;

    const imgRect = imageRef.current.getBoundingClientRect();

    const x = e.clientX - imgRect.left;
    const y = e.clientY - imgRect.top;

    if (x < 0 || y < 0 || x > imgRect.width || y > imgRect.height) {
      setShowZoom(false);
      return;
    }

    const rightRect = rightColRef.current.getBoundingClientRect();

    const bgX =
      (x / imgRect.width) * (imgRect.width * ZOOM_LEVEL - rightRect.width);
    const bgY =
      (y / imgRect.height) * (imgRect.height * ZOOM_LEVEL - imgRect.height);

    if (!hasMovedRef.current) {
      hasMovedRef.current = true;
      setShowZoom(true);
    }

    if (zoomPanelRef.current) {
      zoomPanelRef.current.style.top = `${imgRect.top}px`;
      zoomPanelRef.current.style.left = `${rightRect.left}px`;
      zoomPanelRef.current.style.width = `${rightRect.width}px`;
      zoomPanelRef.current.style.height = `${imgRect.height}px`;
      zoomPanelRef.current.style.backgroundSize = `${imgRect.width * ZOOM_LEVEL}px ${imgRect.height * ZOOM_LEVEL}px`;
      zoomPanelRef.current.style.backgroundPosition = `-${bgX}px -${bgY}px`;
    }
  };
  // ✅ Close zoom on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (showZoom) {
        setShowZoom(false);
        hasMovedRef.current = false;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showZoom]);
  /* ========================= */
  /* SCROLL */
  /* ========================= */
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    scrollRef.current?.scrollBy({
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

  useEffect(() => {
    if (!product) return;

    const images =
      product.images?.map((img) => img.url || img.thumbnailUrl) || [];

    // 🔥 normalize attributes → perks
    const normalizedAttributes =
      product.attributes?.map((attr) => ({
        name: attr.name || attr.key,
        value: attr.value || attr.option || attr.label,
      })) || [];

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

      // ✅ keep both (safe)
      attributes: normalizedAttributes,
      perks: normalizedAttributes, // 🔥 THIS FIXES YOUR UI

      photos: images,
      images: product.images ?? [],
    });
  }, [product]);

  if (isLoading || !place) return <Spinner />;

  const productsList = productsData?.products || [];

  const popularItems = productsList
    .filter((p) => String(p.id) !== String(id))
    .slice(0, 10)
    .map((p) => ({
      id: p.id,
      title: p.name,
      image:
        p.thumbnailUrl || p.images?.[0]?.thumbnailUrl || p.images?.[0]?.url,
    }))
    .filter((p) => p.image);

  /* ========================= */
  /* UI */
  /* ========================= */
  return (
    <ContentWrapper>
      <div className="pt-6 lg:pt-10 pb-6 lg:pb-8 relative">
        <ListingHeader place={place} />

        <div className="mt-10 flex flex-col gap-8 lg:flex-row">
          {/* LEFT */}
          <div className="lg:w-4/7 w-full relative">
            <PlaceGallery
              place={place}
              zoomRef={imageRef}
              onZoomEnter={handleMouseEnter}
              onZoomLeave={handleMouseLeave}
              onZoomMove={handleMouseMove}
              onPhotoChange={(photo) => {
                setSelectedPhoto(photo);
                setZoomImage(photo);
              }}
            />
          </div>

          {/* RIGHT */}
          <div ref={rightColRef} className="lg:w-2/7 w-full space-y-4">
            <ProductInfoPanel
              place={place}
              openSections={openSections}
              toggleSection={toggleSection}
            />

            <div className="w-full border border-slate-200 rounded-lg bg-white overflow-hidden transition-all hover:border-slate-300">
              <div
                onClick={() => setGiftModalOpen(true)}
                className="flex items-center gap-5 p-5 cursor-pointer"
              >
                {/* SERVICE ICON: SIMPLE LINEWORK */}
                <div
                  className={`flex-shrink-0 w-5 h-5 ${selectedPackage ? "text-blue-600" : "text-slate-400"}`}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                </div>

                {/* CONTENT: DATA-DRIVEN TYPOGRAPHY */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-0.5">
                    <p className="text-[11px] font-bold text-slate-900 uppercase tracking-wider">
                      {selectedPackage
                        ? selectedPackage.name
                        : "Packaging Service"}
                    </p>
                  </div>

                  <p className="text-[12px] text-slate-500 leading-none">
                    {selectedPackage
                      ? `${selectedPackage.occasion} • +₹${selectedPackage.price}`
                      : "Professional finishing and 3D preview available"}
                  </p>
                </div>

                {/* ACTIONS */}
                <div className="flex items-center gap-6">
                  <span className="text-[11px] font-bold text-blue-600 uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                    {selectedPackage ? "Edit" : "Configure"}
                  </span>

                  {selectedPackage && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPackage(null);
                      }}
                      className="text-[11px] font-bold text-slate-400 hover:text-red-600 uppercase tracking-widest transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/* QR + Try-On card */}
            {(() => {
              const tryOnParams = new URLSearchParams({
                productId: String(place._id),
                name: place.title || "",
              });
              const tryOnPath = `/virtual-try-on?${tryOnParams.toString()}`;
              return (
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <Link
                    to={tryOnPath}
                    className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary)] py-3 font-semibold text-white transition hover:opacity-90"
                  >
                    Virtual Try-On
                  </Link>
                </div>
              );
            })()}

            <BookingWidget place={place} selectedPackage={selectedPackage} />
          </div>
        </div>

        {/* ZOOM PANEL */}
        {showZoom && zoomImage && (
          <div
            ref={zoomPanelRef}
            className="hidden lg:block fixed z-30 bg-white border shadow-2xl rounded-lg pointer-events-none"
            style={{
              backgroundImage: `url(${zoomImage})`,
              backgroundRepeat: "no-repeat",
            }}
          />
        )}

        <YouMayAlsoLike
          products={product.relatedProducts?.filter((p) => p.id !== product.id)}
        />
        <CrossSellProducts products={product.crossSellProducts} />
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recently Viewed Products</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-2 rounded-full border border-[var(--color-gray)] hover:bg-[var(--color-black-hover)] transition"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-2 rounded-full border border-[var(--color-gray)] hover:bg-[var(--color-black-hover)] transition"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth"
          >
            {popularItems.map((item) => (
              <div
                key={item.id}
                className="w-[160px] sm:w-[180px] lg:w-[200px] flex-shrink-0 cursor-pointer"
                onClick={() => navigate(`/place/${item.id}`)}
              >
                <div className="w-full h-56 sm:h-64 lg:h-72 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="mt-2 text-sm font-medium line-clamp-1">
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        <Testimonials />
      </div>

      {/* MODALS */}
      <VirtualTryOnModal
        isOpen={tryOnOpen}
        onClose={() => setTryOnOpen(false)}
        garmentImageUrl={place?.photos?.[0]}
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
