import React, { useEffect } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import PlaceCard from "@/features/places/components/PlaceCard";
import SectionTitle from "./SectionTitle";
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

  useEffect(() => {
    instanceRef.current?.update();
  }, [places]);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle title={title} />

        {!isMobile && (
          <div className="flex gap-2">
            <button
              onClick={() => instanceRef.current?.prev()}
              className="rounded-full bg-white p-2 shadow hover:bg-gray-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              onClick={() => instanceRef.current?.next()}
              className="rounded-full bg-white p-2 shadow hover:bg-gray-50"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      <div ref={sliderRef} className="keen-slider">
        {(loading ? Array.from({ length: 6 }) : places).map((item, i) => (
          <div key={item?._id ?? i} className="keen-slider__slide">
            <PlaceCard place={item} loading={loading} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselSection;
