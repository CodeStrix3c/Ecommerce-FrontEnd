import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import Spinner from "@/components/ui/Spinner";
import BookingWidget from "@/features/bookings/components/BookingWidget";
import PlaceGallery from "@/features/places/components/PlaceGallery";
import ListingHeader from "@/components/shared/ListingHeader";
import HighlightBanner from "@/features/reviews/components/HighlightBanner";
import ContentWrapper from "@/components/shared/ContentWrapper";
import { useCartList } from "@/providers/CartListProvider";
import { requireLogin } from "@/utils/auth";
import {
  useProductDetailsQuery,
  useProductsQuery,
} from "@/hooks/useProductsQuery";
import ProductInfoPanel from "../components/ProductInfoPanel";
import Testimonials from "@/features/reviews/pages/Testimonials";
import YouMayAlsoLike from "../components/YouMayAlsoLike";

const IMAGE_BASE_URL =
  "https://zirat-adminapp-gfd0hmfwefc3gmgc.centralindia-01.azurewebsites.net";

const ZOOM_LEVEL = 3;
const ZOOM_PANEL_SIZE = 500;
const ZOOM_GAP = 20;

const PlacePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading } = useProductDetailsQuery(id);
  const { data: productsData } = useProductsQuery({ page: 1 });

  const [place, setPlace] = useState(null);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const { toggleCartList } = useCartList();

  const [openSections, setOpenSections] = useState({
    shortDesc: false,
    description: false,
    attributes: false,
    brand: false,
    stock: false,
  });

  /* ===========================
     MAGNIFIER STATES
  ============================ */

  const imageRef = useRef(null);

  const [showZoom, setShowZoom] = useState(false);
  const [zoomImage, setZoomImage] = useState(null);
  const [zoomPos, setZoomPos] = useState("0px 0px");
  const [zoomPanelPos, setZoomPanelPos] = useState({ top: 0, left: 0, size: ZOOM_PANEL_SIZE });
  const [zoomImageSize, setZoomImageSize] = useState({ width: 0, height: 0 });
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleMouseEnter = () => {
    if (!place?.photos?.length) return;
    if (window.innerWidth < 1024) return;

    const rect = imageRef.current?.getBoundingClientRect();
    if (!rect) return;

    setZoomImageSize({ width: rect.width, height: rect.height });

    // Use visualViewport width to exclude scrollbar from available space
    const viewportWidth = window.visualViewport?.width ?? window.innerWidth;
    const viewportHeight = window.visualViewport?.height ?? window.innerHeight;

    const spaceOnRight = viewportWidth - rect.right - ZOOM_GAP;
    const spaceOnLeft = rect.left - ZOOM_GAP;

    let panelSize, left;

    if (spaceOnRight >= spaceOnLeft) {
      panelSize = Math.floor(Math.min(ZOOM_PANEL_SIZE, spaceOnRight - 4));
      left = rect.right + ZOOM_GAP;
    } else {
      panelSize = Math.floor(Math.min(ZOOM_PANEL_SIZE, spaceOnLeft - 4));
      left = rect.left - panelSize - ZOOM_GAP;
    }

    // rect.top is already viewport-relative (correct for position:fixed)
    // Clamp so panel never goes above viewport top or below viewport bottom
    const clampedTop = Math.max(
      0,
      Math.min(rect.top, viewportHeight - panelSize)
    );

    setZoomPanelPos({ top: clampedTop, left, size: panelSize });
    setZoomImage(selectedPhoto || place.photos[0]);
    setShowZoom(true);
  };

  const handleMouseLeave = () => {
    setShowZoom(false);
  };

  const handleMouseMove = (e) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();

    if (
      e.clientX < rect.left ||
      e.clientX > rect.right ||
      e.clientY < rect.top ||
      e.clientY > rect.bottom
    ) {
      setShowZoom(false);
      return;
    }

    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    const y = Math.max(0, Math.min(e.clientY - rect.top, rect.height));

    const bgX = (x / rect.width) * rect.width * ZOOM_LEVEL;
    const bgY = (y / rect.height) * rect.height * ZOOM_LEVEL;

    setZoomPos(
      `-${bgX - zoomPanelPos.size / 2}px -${bgY - zoomPanelPos.size / 2}px`
    );
  };

  /* ===========================
     SECTION TOGGLE
  ============================ */

  const toggleSection = (key) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  /* ===========================
     SLIDER
  ============================ */

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

  /* ===========================
     BUILD PLACE OBJECT
  ============================ */

  useEffect(() => {
    if (!product) return;

    const images =
      product.images
        ?.flatMap((img) => [img.url, img.thumbnailUrl])
        .filter(Boolean)
        .map((path) =>
          path.startsWith("http") ? path : `${IMAGE_BASE_URL}${path}`,
        ) ?? [];

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

  /* ===========================
     POPULAR PRODUCTS
  ============================ */

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
        image: imgPath.startsWith("http")
          ? imgPath
          : `${IMAGE_BASE_URL}${imgPath}`,
      };
    })
    .filter(Boolean);

  /* ===========================
     RENDER
  ============================ */

  return (
    <ContentWrapper>
      <div className="pt-6 lg:pt-10 pb-6 lg:pb-8 relative">
        <ListingHeader place={place} />

        {/* ===========================
           GALLERY + INFO
        ============================ */}

        <div className="mt-10 flex flex-col gap-8 lg:flex-row relative">
          {/* IMAGE */}
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

          {/* INFO PANEL */}
          <div
            className={`lg:w-2/7 w-full space-y-4 relative z-10 transition-opacity duration-200 ${showZoom ? "opacity-0 pointer-events-none" : "opacity-100"
              }`}
          >
            <ProductInfoPanel
              place={place}
              openSections={openSections}
              toggleSection={toggleSection}
            />

            <BookingWidget place={place} />
          </div>

          {/* ===========================
             AMAZON STYLE ZOOM PANEL
          ============================ */}

          {showZoom && zoomImage && (
            <div
              className="hidden lg:block fixed z-[9999] bg-white border shadow-2xl rounded-lg overflow-hidden pointer-events-none"
              style={{
                top: zoomPanelPos.top,
                left: zoomPanelPos.left,
                width: `${zoomPanelPos.size}px`,
                height: `${zoomPanelPos.size}px`,
                backgroundImage: `url(${zoomImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: `${zoomImageSize.width * ZOOM_LEVEL}px ${zoomImageSize.height * ZOOM_LEVEL}px`,
                backgroundPosition: zoomPos,
              }}
            />
          )}
        </div>

        {/* ===========================
           BANNER
        ============================ */}

        <div className="mt-6">
          <HighlightBanner
            rating={place.rating}
            reviewCount={place.reviewsCount}
          />
        </div>

        {/* ===========================
           POPULAR PRODUCTS
        ============================ */}

        {/* {popularItems.length > 0 && (
          <div className="mt-10">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-semibold">
                Explore other popular Art & Craft products
              </h2>

              <div className="flex gap-2">
                <button
                  onClick={() => popularInstanceRef.current?.prev()}
                  className="p-2 shadow bg-white rounded-full"
                >
                  <ChevronLeft />
                </button>

                <button
                  onClick={() => popularInstanceRef.current?.next()}
                  className="p-2 shadow bg-white rounded-full"
                >
                  <ChevronRight />
                </button>
              </div>
            </div>

            <div ref={popularRef} className="keen-slider">
              {popularItems.map((item) => (
                <div
                  key={item.id}
                  className="keen-slider__slide cursor-pointer"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <div className="h-52 rounded-xl overflow-hidden">
                    <img
                      src={item.image}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <p className="mt-2 text-sm">{item.title}</p>
                </div>
              ))}
            </div>
          </div>
        )} */}

        <YouMayAlsoLike
          products={product.relatedProducts?.filter((p) => p.id !== product.id)}
        />

        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recently Viewed Products</h2>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth">
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