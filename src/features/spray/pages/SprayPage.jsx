import ContentWrapper from "@/components/shared/ContentWrapper";
import SprayHistory from "../components/SprayCard";
import useIsMobile from "@/hooks/useInMobile";
import ImageHeaderSection from "../../../components/shared/ImageHeaderSection";

const SprayPage = () => {
  const isMobile = useIsMobile();

  return (
   
      <div className="w-full min-h-screen bg-[var(--color-white)]">


<ImageHeaderSection image={"https://images.pexels.com/photos/21711158/pexels-photo-21711158.jpeg"}
title={"Spray Record Information"}
description={" Maintain accurate  spray data — including pesticide type, quantity, period, and cost.Keeping proper records ensures effective management and legal compliance."}
/>
  

   
    
       


      <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 py-10">
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

      <ContentWrapper compactScreen topSpacing isMobile={isMobile} >
        <div className="sm:mt-[-8rem] md:mt-10 lg:mt-[-6rem]  px-4 sm:px-6 md:px-8 lg:px-12 pb-10">
          <SprayHistory />
        </div>
      </ContentWrapper>
      </div>
    
     
  );
};

export default SprayPage;




