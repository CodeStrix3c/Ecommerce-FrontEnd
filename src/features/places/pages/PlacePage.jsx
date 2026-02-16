import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

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

const IMAGE_BASE_URL =
  "https://zirat-adminapp-gfd0hmfwefc3gmgc.centralindia-01.azurewebsites.net";

const PlacePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data: product, isLoading } = useProductDetailsQuery(id);

  console.log("Product details:", product);

  const { data: productsData } = useProductsQuery({
    page: 1,
  });

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
      raw: product,
      specification: product.specification,
      isAllowToOrder: product.isAllowToOrder,
    });
  }, [product]);

  if (isLoading || !place) return <Spinner />;

  const productsList = productsData?.products || [];

  const popularItems = productsList
    .filter((p) => String(p.id) !== String(id))
    .slice(0, 10)
    .map((p) => {
      const imgPath =
        p.thumbnailUrl ||
        p.images?.[0]?.thumbnailUrl ||
        p.images?.[0]?.url ||
        null;

      if (!imgPath) return null;

      const fullUrl = imgPath.startsWith("http")
        ? imgPath
        : `${IMAGE_BASE_URL}${imgPath}`;

      return {
        id: p.id,
        title: p.name,
        image: fullUrl,
      };
    })
    .filter(Boolean);

  const handleAddToCart = () => {
    toggleCartList(place);
    toast.success("Cart updated");
  };

  const handleBuyNow = (quantity) => {
    requireLogin(
      () =>
        toast.success(
          `Proceeding to checkout for ${quantity} × ${place.title}`,
        ),
      () => setShowLoginPopup(true),
    );
  };

  return (
    <ContentWrapper>
      <div className="pt-6 lg:pt-10 pb-6 lg:pb-8">
        {/* Header */}
        <ListingHeader place={place} />

        {/* Gallery + Info */}
        <div className="mt-10 flex flex-col gap-8 lg:flex-row">
          <div className="lg:w-4/7 w-full ps-2">
            <PlaceGallery place={place} />
          </div>

          <div className="lg:w-2/7 w-full space-y-4">
            <ProductInfoPanel
              place={place}
              openSections={openSections}
              toggleSection={toggleSection}
            />
            <BookingWidget place={place} />
          </div>
        </div>

        {/* Banner */}
        <div className="mt-4 sm:mt-6 px-3 sm:px-0">
          <HighlightBanner />
        </div>

        {/* -------------------------
            Most Popular Items
        ------------------------- */}
        {/* {popularItems.length > 0 && (
          <div className="mt-10">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl sm:text-xl font-semibold">
                Recently Viewed Products
              </h2>

              <div className="flex gap-2">
                <button
                  onClick={() => popularInstanceRef.current?.prev()}
                  className="rounded-full bg-white p-2 shadow hover:bg-gray-50"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={() => popularInstanceRef.current?.next()}
                  className="rounded-full bg-white p-2 shadow hover:bg-gray-50"
                >
                  <ChevronRight className="h-5 w-5" />
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
                  <div className="w-full h-44 sm:h-48 lg:h-52 rounded-xl overflow-hidden bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
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
        )} */}
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">Recently Viewed Products</h2>
          </div>

          <div className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth">
            {popularItems.map((item) => (
              <div
                key={item.id}
                /* FIX: Use fixed width classes instead of just min-width */
                className="w-[160px] sm:w-[180px] lg:w-[200px] flex-shrink-0 cursor-pointer"
                onClick={() => navigate(`/place/${item.id}`)}
              >
                <div className="w-full h-56 sm:h-64 lg:h-72 rounded-xl overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    /* FIX: Change object-contain to object-cover to fill the box uniformly */
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
