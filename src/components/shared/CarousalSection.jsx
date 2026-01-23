import React, { useEffect } from "react";
import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import SectionTitle from "./SectionTitle";
import useIsMobile from "@/hooks/useInMobile";

const CarouselSection = ({ title, places = [], loading = false }) => {
  const isMobile = useIsMobile();

  const [sliderRef, instanceRef] = useKeenSlider({
    mode: "free",
    rubberband: false,
    slides: {
      perView: 1.2,
      spacing: 8,
    },
    breakpoints: {
      "(min-width: 640px)": {
        slides: { perView: 2.5, spacing: 12 },
      },
      "(min-width: 768px)": {
        slides: { perView: 3.5, spacing: 14 },
      },
      "(min-width: 1024px)": {
        slides: { perView: 4.5, spacing: 16 },
      },
      "(min-width: 1280px)": {
        slides: { perView: 5.5, spacing: 20 },
      },
    },
  });

  // Update slider when data changes
  useEffect(() => {
    if (instanceRef.current) {
      instanceRef.current.update();
    }
  }, [places, instanceRef]);

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <SectionTitle title={title} />

        {!isMobile && (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => instanceRef.current?.prev()}
              className="rounded-full bg-white p-2 shadow hover:bg-gray-50 transition"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => instanceRef.current?.next()}
              className="rounded-full bg-white p-2 shadow hover:bg-gray-50 transition"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>

      {/* Slider */}
      <div ref={sliderRef} className="keen-slider">
        {(loading ? Array.from({ length: 6 }) : places).map((item, i) => (
          <div key={item?.id ?? i} className="keen-slider__slide max-w-[280px]">
            {/* Card */}
            <div className="overflow-hidden rounded-xl bg-white shadow-sm">
              {/* Image */}
              <div className="h-40 w-full bg-gray-100">
                {loading ? (
                  <div className="h-full w-full animate-pulse bg-gray-200" />
                ) : (
                  <img
                    src={item?.thumbnailIamge?.fileName || "/placeholder.png"}
                    alt={item?.name || "item"}
                    className="h-full w-full object-cover"
                  />
                )}
              </div>

              {/* Content */}
              <div className="p-3">
                {loading ? (
                  <>
                    <div className="mb-2 h-4 w-3/4 animate-pulse rounded bg-gray-200" />
                    <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
                  </>
                ) : (
                  <>
                    <h3 className="truncate text-sm font-semibold text-gray-800">
                      {item?.name}
                    </h3>

                    <p className="mt-1 truncate text-xs text-gray-500">
                      {item?.location || "Location not available"}
                    </p>

                    <div className="mt-2 flex items-center justify-between">
                      <span className="text-sm font-bold text-primary">
                        ₹{item?.price ?? "--"}
                      </span>

                      <button className="rounded-md bg-primary px-3 py-1 text-xs text-white transition hover:opacity-90">
                        View
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselSection;
