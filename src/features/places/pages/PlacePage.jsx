import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Spinner from "@/components/ui/Spinner";
import AddressLink from "@/components/shared/AddressLink";
import BookingWidget from "@/features/bookings/components/BookingWidget";
import PlaceGallery from "@/features/places/components/PlaceGallery";
import PerksWidget from "@/features/perks/components/PerksWidget";
import MapBox from "@/components/ui/MapBox";
import ListingHeader from "@/components/shared/ListingHeader";
import RatingSummary from "@/features/reviews/components/Ratings";
import Testimonials from "@/features/reviews/pages/Testimonials";
import HighlightBanner from "@/features/reviews/components/HighlightBanner";
import ExploreNearby from "../components/ExploreNearby";
import SharePopUp from "@/components/ui/SharePopUp";
import ContentWrapper from "@/components/shared/ContentWrapper";
import LoginPromptModal from "@/components/shared/LoginPromptModal";
import agriculturalOptions from "@/data/agriculturalOptions";

import { useProductFromCache } from "@/hooks/useProductsQuery";
import { useCartList } from "@/providers/CartListProvider";
import { requireLogin } from "@/utils/auth";

const PlacePage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const cachedProduct = useProductFromCache(id);

  const [place, setPlace] = useState(location.state?.place || null);
  const [sharePopUp, setSharePopUp] = useState(false);
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  const { toggleCartList, cartList } = useCartList();

  useEffect(() => {
    if (place || !cachedProduct) return;

    setPlace({
      _id: cachedProduct.id,
      title: cachedProduct.name,
      description: cachedProduct.description,
      price: cachedProduct.price,
      oldPrice: cachedProduct.oldPrice,
      rating: cachedProduct.ratingAverage,
      stock: cachedProduct.stockQuantity,
      inStock: cachedProduct.stockQuantity > 0,
      address: cachedProduct.brandName,
      perks: cachedProduct.perks ?? [],
      images: cachedProduct.productImages ?? [],
      raw: cachedProduct,
    });
  }, [cachedProduct, place]);

  if (!place && !cachedProduct) {
    return (
      <ContentWrapper>
        <div className="py-20 text-center">
          <h2 className="text-xl font-semibold">Product not found</h2>
          <p className="mt-2 text-gray-500">
            Please go back and select a product again.
          </p>
          <button className="mt-4 underline" onClick={() => navigate(-1)}>
            Go back
          </button>
        </div>
      </ContentWrapper>
    );
  }

  const isCartListed = cartList.some((item) => item._id === place?._id);

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

  if (!place) return <Spinner />;

  return (
    <ContentWrapper compactScreen topSpacing>
      <LoginPromptModal
        open={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
      />

      <motion.div className="overflow-x-hidden">
        <ListingHeader place={place} onShare={() => setSharePopUp(true)} />
        <AddressLink placeAddress={place.address} />
        <PlaceGallery place={place} />

        <div className="mt-10 flex flex-col gap-8 lg:flex-row">
          <div className="flex-1 space-y-8">
            <HighlightBanner />

            <section>
              <h2 className="text-2xl font-semibold">Description</h2>
              <p className="mt-2 text-justify">{place.description}</p>
            </section>

            <PerksWidget perks={place.perks} />
          </div>

          <aside className="w-full lg:w-1/3">
            <div className="sticky top-28">
              <BookingWidget
                place={place}
                onBuyNow={handleBuyNow}
                onAddToCart={handleAddToCart}
                isCartListed={isCartListed}
              />
            </div>
          </aside>
        </div>

        <RatingSummary />
        <Testimonials />

        <MapBox address={place.address} />

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
