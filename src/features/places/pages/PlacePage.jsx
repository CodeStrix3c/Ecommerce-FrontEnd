import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import QRCode from "react-qr-code";

import Spinner from "@/components/ui/Spinner";
import BookingWidget from "@/features/bookings/components/BookingWidget";
import PlaceGallery from "@/features/places/components/PlaceGallery";
import PerksWidget from "@/features/perks/components/PerksWidget";
import ListingHeader from "@/components/shared/ListingHeader";
import RatingSummary from "@/features/reviews/components/Ratings";
import Testimonials from "@/features/reviews/pages/Testimonials";
import HighlightBanner from "@/features/reviews/components/HighlightBanner";
import ExploreNearby from "../components/ExploreNearby";
import SharePopUp from "@/components/ui/SharePopUp";
import ContentWrapper from "@/components/shared/ContentWrapper";
import LoginPromptModal from "@/components/shared/LoginPromptModal";
import agriculturalOptions from "@/data/agriculturalOptions";

import { useCartList } from "@/providers/CartListProvider";
import { requireLogin } from "@/utils/auth";
import { useProductDetailsQuery } from "@/hooks/useProductsQuery";

const PlacePage = () => {
  const { id } = useParams();
  const { data: product, isLoading } = useProductDetailsQuery(id);
  console.log(product, "these are the product details");

  const [place, setPlace] = useState(null);
  const [sharePopUp, setSharePopUp] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const { toggleCartList, cartList } = useCartList();

  useEffect(() => {
    if (!product) return;

    const images = product.images?.map((img) => img.url).filter(Boolean) ?? [];

    const giAttribute = product.attributes?.find(
      (attr) => attr.name === "GI Tag",
    );

    setPlace({
      _id: product.id,
      title: product.name,
      description: product.description,
      price: product.calculatedProductPrice?.price ?? 0,
      oldPrice: product.calculatedProductPrice?.oldPrice ?? null,
      rating: product.ratingAverage,
      stock: product.stockQuantity,
      inStock: product.stockQuantity > 0,
      perks: product.attributes ?? [],
      photos: images,
      giTag: giAttribute?.value || null,
      raw: product,
    });
  }, [product]);

  if (isLoading || !place) return <Spinner />;

  const isCartListed = cartList.some((item) => item._id === place._id);

  const handleBuyNow = (quantity) => {
    requireLogin(
      () =>
        toast.success(
          `Proceeding to checkout for ${quantity} × ${place.title}`,
        ),
      () => setShowLoginPopup(true),
    );
  };

  const handleAddToCart = () => {
    toggleCartList(place);
    toast.success("Cart updated");
  };

  return (
    <ContentWrapper compactScreen topSpacing>
      <LoginPromptModal
        open={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      />

      <motion.div className="overflow-x-hidden">
        <ListingHeader place={place} onShare={() => setSharePopUp(true)} />
        <PlaceGallery place={place} />

        <div className="mt-10 flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 space-y-8">
            <HighlightBanner />

            <section>
              <h2 className="text-2xl font-semibold">Description</h2>
              <div
                className="mt-2 prose max-w-none"
                dangerouslySetInnerHTML={{ __html: place.description }}
              />
            </section>

            <PerksWidget perks={place.perks} />
          </div>

          <aside className="w-full lg:w-1/3">
            <div className="sticky top-28">
              <BookingWidget
                place={place}
                onBuyNow={handleBuyNow}
                onAddToCart={handleAddToCart}
              />
            </div>
          </aside>
        </div>

        <RatingSummary />
        <Testimonials />

        <ExploreNearby
          title="Explore other popular Art & Craft products"
          options={agriculturalOptions}
        />

        {sharePopUp && (
          <SharePopUp onClose={() => setSharePopUp(false)} placeData={place} />
        )}
      </motion.div>
    </ContentWrapper>
  );
};

export default PlacePage;
