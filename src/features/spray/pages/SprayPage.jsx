import ContentWrapper from "@/components/shared/ContentWrapper";
import SprayHistory from "../components/SprayCard";
import useIsMobile from "@/hooks/useInMobile";

const SprayPage = () => {
  const isMobile = useIsMobile();

  return (
          <ContentWrapper compactScreen topSpacing>
    <div className="w-full min-h-screen bg-[var(--color-white)]">
     
      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 py-7">
        <div className="mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--color-black)] mb-8 text-center lg:text-left">
          Spray Record Information
        </h2>

        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Herbicide Use",
              desc: "Record details about herbicide type, application rate, and affected area.",
            },
            {
              title: "Insecticide Schedule",
              desc: "Track insecticide usage, intervals, and effectiveness for pest control.",
            },
            {
              title: "Fungicide Records",
              desc: "Maintain proper logs for fungicide applications and seasonal coverage.",
            },
            {
              title: "Nutrient Application",
              desc: "Track fertilizer use, nutrient type, and soil condition improvements.",
            },
            {
              title: "Equipment Maintenance",
              desc: "Keep records of sprayer calibration, cleaning, and repair schedules.",
            },
            {
              title: "Safety Precautions",
              desc: "Note PPE use, safety measures, and any incidents during spraying.",
            },
            {
              title: "Weather Records",
              desc: "Log wind speed, temperature, and humidity before spraying.",
            },
            {
              title: "Operator Details",
              desc: "Record who applied the spray and any certifications they hold.",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="bg-[var(--color-white)] border border-[var(--color-gray)] rounded-2xl p-6 shadow-sm "
            >
              <h3 className="text-lg font-semibold text-[var(--color-black)] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--color-black)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

       
        <div className="max-w-5xl mx-auto mt-12 sm:mt-16 md:mt-20 lg:mt-16 text-center">
          <h4 className="text-sm sm:text-base md:text-lg font-semibold text-[var(--color-black)] leading-relaxed">
            Good record keeping is not only a sound management discipline,
            especially with regard to the use of pesticides, it is a legal
            requirement. These pages, compiled by Bayer CropScience, are
            designed to facilitate the recording of a range of field data with
            special emphasis on pesticide usage.
          </h4>
        </div>
      </div>

     
        <div className="mt-12 md:mt-14 lg:mt-16 px-4 sm:px-8">
          <SprayHistory />
        </div>
    </div>
      </ContentWrapper>
  );
};

export default SprayPage;
