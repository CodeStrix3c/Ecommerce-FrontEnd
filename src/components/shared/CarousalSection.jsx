import React, { useEffect } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";

import PlaceCard from "@/features/places/components/PlaceCard";
import SectionTitle from "./SectionTitle";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useIsMobile from "@/hooks/useInMobile";
import { carouselBreakpoints } from "@/lib/  carouselConfig";

const CarouselSection = ({ title, places = [], loading = false }) => {
  const isMobile = useIsMobile();

  const [sliderRef, instanceRef] = useKeenSlider({
    mode: "free",
    rubberband: false,
    slides: {
      perView: 2.1,
      spacing: 8,
    },
    breakpoints: carouselBreakpoints,
  });

  // ✅ Recalculate when data changes
  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [places, instanceRef]);

  return (
    <div className="mt-0">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle title={title} />

        {!isMobile && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => instanceRef.current?.prev()}
              className="rounded-full p-2 bg-white shadow hover:bg-gray-50 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => instanceRef.current?.next()}
              className="rounded-full p-2 bg-white shadow hover:bg-gray-50 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {(loading ? Array.from({ length: 6 }) : places).map((place, i) => (
          <div
            key={place?._id ?? i}
            className="keen-slider__slide"
          >
            <PlaceCard place={place} loading={loading} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselSection;
