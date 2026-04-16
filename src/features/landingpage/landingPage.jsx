import React from "react";
import ContentWrapper from "@/components/shared/ContentWrapper";
import PashminaCarousel from "./components/topcarousal";
import TrendingProducts from "./components/trending";
import BestDeals from "./components/bestdeals";
import { useBestDeals } from "./hooks/usebestdeals";
import { useTrendingProducts } from "./hooks/usetrendingproduct";
import KashmirArts from "./components/kashmirarts";

const LandingPage = () => {
  // 1. Fetch Best Deals (Structure: data.deals)
  const { data: bestDealsData, isLoading: isBestDealsLoading } =
    useBestDeals(20);

  // 2. Fetch Trending Products (Structure: data.products)
  const { data: trendingData, isLoading: isTrendingLoading } =
    useTrendingProducts(20);

  return (
    <div className="text-[var(--color-primary)] bg-white min-h-screen">
      {/* 1. Hero / Carousel Section */}
      <div className="mt-28">
        <PashminaCarousel />
      </div>

      {/* 2. Best Deals Section */}
      <ContentWrapper>
        <BestDeals data={bestDealsData} isLoading={isBestDealsLoading} />
      </ContentWrapper>

      {/* 3. Trending Products Section */}
      <ContentWrapper>
        <TrendingProducts data={trendingData} isLoading={isTrendingLoading} />
      </ContentWrapper>
      <KashmirArts />
    </div>
  );
};

export default LandingPage;
