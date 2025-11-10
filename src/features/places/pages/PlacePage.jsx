import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import Spinner from "@/components/ui/Spinner";
import AddressLink from "@/components/shared/AddressLink";
import BookingWidget from "@/features/bookings/components/BookingWidget";
import PlaceGallery from "@/features/places/components/PlaceGallery";
import PerksWidget from "@/features/perks/components/PerksWidget";
import { dummyData } from "@/data/dummyData";
import MapBox from "@/components/ui/MapBox";
import ListingHeader from "@/components/shared/ListingHeader";
import RatingSummary from "@/features/reviews/components/Ratings";
import OverallRating from "@/features/reviews/components/OverallRating";
import Testimonials from "@/features/reviews/pages/Testimonials";
import HighlightBanner from "@/features/reviews/components/HighlightBanner";
import ExploreNearby from "../components/ExploreNearby";
import SharePopUp from "@/components/ui/SharePopUp";
import ContentWrapper from "@/components/shared/ContentWrapper";

const PlacePage = () => {
  const { id } = useParams();

  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sharePopUp, setSharePopUp] = useState(false);

  const agricultureOptions = [
  {
    name: "Wheat",
    href: "/products/wheat",
    subHeading: "A staple grain used in bread, flour, and countless food products worldwide.",
  },
  {
    name: "Rice",
    href: "/products/rice",
    subHeading: "India’s most consumed crop, grown in paddy fields and exported globally.",
  },
  {
    name: "Maize (Corn)",
    href: "/products/maize",
    subHeading: "A versatile cereal used for food, feed, and industrial products.",
  },
  {
    name: "Sugarcane",
    href: "/products/sugarcane",
    subHeading: "A tropical crop used to produce sugar, jaggery, and ethanol.",
  },
  {
    name: "Cotton",
    href: "/products/cotton",
    subHeading: "A key fiber crop used in textiles and cottonseed oil production.",
  },
  {
    name: "Soybean",
    href: "/products/soybean",
    subHeading: "Rich in protein and oil, used in animal feed and food industries.",
  },
  {
    name: "Pulses (Lentils)",
    href: "/products/pulses",
    subHeading: "Protein-packed legumes including lentils, chickpeas, and beans.",
  },
  {
    name: "Vegetables",
    href: "/products/vegetables",
    subHeading: "Fresh, seasonal produce rich in vitamins and essential nutrients.",
  },
  {
    name: "Fruits",
    href: "/products/fruits",
    subHeading: "Delicious and healthy produce ranging from apples to mangoes.",
  },
  {
    name: "Oilseeds",
    href: "/products/oilseeds",
    subHeading: "Includes mustard, sunflower, and groundnut used for edible oils.",
  },
  {
    name: "Spices",
    href: "/products/spices",
    subHeading: "Aromatic spices like turmeric, cardamom, and pepper grown across India.",
  },
  {
    name: "Tea",
    href: "/products/tea",
    subHeading: "Premium tea leaves from Assam and Darjeeling, known worldwide.",
  },
  {
    name: "Coffee",
    href: "/products/coffee",
    subHeading: "Aromatic beans cultivated in Karnataka, Kerala, and Tamil Nadu.",
  },
  {
    name: "Organic Produce",
    href: "/products/organic",
    subHeading: "Chemical-free, eco-friendly crops promoting healthy living.",
  },
  {
    name: "Dairy Products",
    href: "/products/dairy",
    subHeading: "Fresh milk, butter, ghee, and cheese from local Indian dairies.",
  },
];


  useEffect(() => {
    if (!id) return;

    setLoading(true);
    const foundPlace = dummyData.find((p) => p._id === id);

    setTimeout(() => {
      setPlace(foundPlace);
      setLoading(false);
    }, 500);
  }, [id]);

  const handleShare = () => setSharePopUp(true);
  if (loading) return <Spinner />;

  if (!place) {
    return <div className="p-8 text-[var(--color-black)]">Place not found</div>;
  }

  return (
    <ContentWrapper compactScreen topSpacing>
      <motion.div
        initial={false}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="overflow-x-hidden"
      >
        <ListingHeader place={place} onShare={handleShare} />

        <AddressLink placeAddress={place.address} />

        <PlaceGallery place={place} />

        <div className="mt-10 flex flex-col gap-8 md:flex-col lg:flex-row lg:items-start lg:justify-between lg:w-full">
          <div className="flex-1 space-y-8">
            <HighlightBanner />

            <section>
              <h2 className="text-2xl font-semibold text-[var(--color-black)]">
                Description
              </h2>
              <p className="mt-2 text-[var(--color-black)]/70 text-justify">
                {place.description}
              </p>

              <div className="mt-3">
                {place.inStock ? (
                  <span className="inline-block rounded-md bg-[var(--color-primary)] px-3 py-1 text-sm font-medium text-[var(--color-white)]">
                    In Stock
                  </span>
                ) : (
                  <span className="inline-block rounded-md bg-[var(--color-secondary)] px-3 py-1 text-sm font-medium text-[var(--color-white)]">
                    Out of Stock
                  </span>
                )}
              </div>
            </section>

            <PerksWidget perks={place?.perks} />
          </div>

          <aside className="block w-full lg:w-1/3">
            <div className="sticky top-28">
              <BookingWidget place={place} />
            </div>
          </aside>
        </div>

        <div className="my-8 md:hidden z-40 absolute left-0 w-full ">
          <BookingWidget place={place} />
        </div>

        <RatingSummary />
        <OverallRating />
        <Testimonials />

        <MapBox address={place.address} />

        <ExploreNearby
  title="Explore other popular crops and products"
  options={agricultureOptions}
/>
        {sharePopUp && (
          <SharePopUp onClose={() => setSharePopUp(false)} placeData={place} />
        )}
      </motion.div>
    </ContentWrapper>
  );
};

export default PlacePage;
