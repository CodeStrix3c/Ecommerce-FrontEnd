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
import { useCartList } from "@/providers/CartListProvider";
import {
  useProductDetailsQuery,
  useProductsQuery,
} from "@/hooks/useProductsQuery";
import ProductInfoPanel from "../components/ProductInfoPanel";
import Testimonials from "@/features/reviews/pages/Testimonials";
import YouMayAlsoLike from "../components/YouMayAlsoLike";
import CrossSellProducts from "../components/CrossSellProducts";

const ZOOM_LEVEL = 3;

const PlacePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading } = useProductDetailsQuery(id);
  const { data: productsData } = useProductsQuery({ page: 1 });

  const [place, setPlace] = useState(null);

  const { toggleCartList } = useCartList();

  const [openSections, setOpenSections] = useState({
    shortDesc: false,
    description: false,
    attributes: false,
    brand: false,
    stock: false,
  });

  const imageRef = useRef(null);
  const rightColRef = useRef(null);

  const [showZoom, setShowZoom] = useState(false);
  const [zoomReady, setZoomReady] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const [zoomPos, setZoomPos] = useState("0px 0px");
  const [zoomImageSize, setZoomImageSize] = useState({ width: 0, height: 0 });
  const [zoomPanelRect, setZoomPanelRect] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setShowZoom(false);
      setZoomReady(false);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;
    container.scrollBy({
      left: direction === "left" ? -300 : 300,
      behavior: "smooth",
    });
  };

  const handleMouseEnter = () => {
    if (!place?.photos?.length) return;
    if (window.innerWidth < 1024) return;
    setZoomImage(selectedPhoto || place.photos[0]);
    setShowZoom(true);
    setZoomReady(false);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
    setZoomReady(false);
  };

  const handleMouseMove = (e) => {
    if (!imageRef.current || !rightColRef.current) return;

    const imgRect = imageRef.current.getBoundingClientRect();

    if (
      e.clientX < imgRect.left ||
      e.clientX > imgRect.right ||
      e.clientY < imgRect.top ||
      e.clientY > imgRect.bottom
    ) {
      setShowZoom(false);
      return;
    }

    const rightRect = rightColRef.current.getBoundingClientRect();

    const panelTop = imgRect.top;
    const panelLeft = rightRect.left;
    const panelWidth = rightRect.width;
    const panelHeight = imgRect.height;

    setZoomPanelRect({
      top: panelTop,
      left: panelLeft,
      width: panelWidth,
      height: panelHeight,
    });

    setZoomImageSize({ width: imgRect.width, height: imgRect.height });

    const x = Math.max(0, Math.min(e.clientX - imgRect.left, imgRect.width));
    const y = Math.max(0, Math.min(e.clientY - imgRect.top, imgRect.height));

    const bgX = (x / imgRect.width) * imgRect.width * ZOOM_LEVEL;
    const bgY = (y / imgRect.height) * imgRect.height * ZOOM_LEVEL;

    setZoomPos(`-${bgX - panelWidth / 2}px -${bgY - panelHeight / 2}px`);
    setZoomReady(true);
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

    // Use image URLs exactly as they come from the backend
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
      inStock: product.stockTrackingIsEnabled
        ? product.stockQuantity > 0
        : true,
      brand: product.brand?.name || null,
      perks: product.attributes ?? [],
      photos: images,
    });

    setSelectedPhoto(null);
  }, [product]);

  if (isLoading || !place) return <Spinner />;

  const productsList = productsData?.products || [];

  // Use thumbnail URLs exactly as they come from the backend
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
      <div className="pt-6 lg:pt-10 pb-6 lg:pb-8 relative">
        <ListingHeader place={place} />

        <div className="mt-10 flex flex-col gap-8 lg:flex-row relative">
          {/* LEFT — gallery */}
          <div className="lg:w-4/7 w-full ps-2 relative">
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

          {/* RIGHT — always rendered so rightColRef has real dimensions */}
          <div ref={rightColRef} className="lg:w-2/7 w-full relative z-10">
            <div
              className={`space-y-4 transition-opacity duration-200 ${
                showZoom && zoomReady
                  ? "opacity-0 pointer-events-none"
                  : "opacity-100"
              }`}
            >
              <ProductInfoPanel
                place={place}
                openSections={openSections}
                toggleSection={toggleSection}
              />
              <BookingWidget place={place} />
            </div>
          </div>

          {/* ZOOM PANEL */}
          {showZoom && zoomImage && zoomReady && (
            <div
              className="hidden lg:block fixed z-3 bg-white border shadow-2xl rounded-lg overflow-hidden pointer-events-none"
              style={{
                top: zoomPanelRect.top,
                left: zoomPanelRect.left,
                width: zoomPanelRect.width,
                height: zoomPanelRect.height,
                backgroundImage: `url(${zoomImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `${zoomImageSize.width * ZOOM_LEVEL}px ${zoomImageSize.height * ZOOM_LEVEL}px`,
                backgroundPosition: zoomPos,
              }}
            />
          )}
        </div>

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
    </ContentWrapper>
  );
};

export default PlacePage;
