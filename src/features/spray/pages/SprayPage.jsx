import ContentWrapper from "@/components/shared/ContentWrapper";
import SprayHistory from "../components/SprayCard";
import useIsMobile from "@/hooks/useInMobile";
import ImageHeaderSection from "../../../components/shared/ImageHeaderSection";
import AssignmentIcon from "@mui/icons-material/Science";

import {
  Leaf,
  Bug,
  CloudRain,
  Droplets,
  Wrench,
  Shield,
  Sun,
  User,
  ClipboardList,
  FlaskRound,
  Sprout,
  SprayCan,
  BugOff,
  SprayCanIcon,
} from "lucide-react";

const SprayPage = () => {
  const isMobile = useIsMobile();

  const data = [
    {
      title: "Herbicide Use",
      desc: "Record details about herbicide type, application rate, and affected area.",
      icon: <Leaf className="w-8 h-8 text-[var(--color-secondary)]" />,
    },
    {
      title: "Insecticide Schedule",
      desc: "Track insecticide usage, intervals, and effectiveness for pest control.",
      icon: <Bug className="w-8 h-8 text-[var(--color-secondary)]" />,
    },
    {
      title: "Fungicide Records",
      desc: "Maintain proper logs for fungicide applications and seasonal coverage.",
      icon: <SprayCanIcon className="w-8 h-8 text-[var(--color-secondary)]" />,
    },
    {
      title: "Nutrient Application",
      desc: "Track fertilizer use, nutrient type, and soil condition improvements.",
      icon: <Sprout className="w-8 h-8 text-[var(--color-secondary)]" />,
    },
    {
      title: "Equipment Maintenance",
      desc: "Keep records of sprayer calibration, cleaning, and repair schedules.",
      icon: <Wrench className="w-8 h-8 text-[var(--color-secondary)]" />,
    },
    {
      title: "Safety Precautions",
      desc: "Note PPE use, safety measures, and any incidents during spraying.",
      icon: <Shield className="w-8 h-8 text-[var(--color-secondary)]" />,
    },
    {
      title: "Weather Records",
      desc: "Log wind speed, temperature, and humidity before spraying.",
      icon: <Sun className="w-8 h-8 text-[var(--color-secondary)]" />,
    },
    {
      title: "Operator Details",
      desc: "Record who applied the spray and any certifications they hold.",
      icon: <User className="w-8 h-8 text-[var(--color-secondary)]" />,
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[var(--color-white)]">
      <ImageHeaderSection
        image={"/assets/images/sprayrecords.jpg"}
        title={"Spray Record Information"}
        description={
          "Maintain accurate spray data — including pesticide type, quantity, period, and cost. Keeping proper records ensures effective management and legal compliance."
        }
      />

      <div className=" mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-12 py-10">
        <h3 className="text-xl lg:text-3xl md:text-xl font-semibold text-[var(--color-black)] mb-4 mt-4 text-center">
          Spray Management Overview
        </h3>

        <p className="mx-auto max-w-5xl  text-center text-[var(--color-black)] leading-relaxed mb-6">
          Good record keeping is not only a sound management discipline,
          especially with regard to the use of pesticides, it is a legal
          requirement. These pages, compiled by Bayer CropScience, are designed
          to facilitate the recording of a range of field data with special
          emphasis on pesticide usage.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.map((item, index) => (
            <div
              key={index}
              className="bg-[var(--color-white)] border border-[var(--color-gray)] rounded-2xl p-6 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-4">
                {item.icon}
                <h3 className="text-lg font-semibold text-[var(--color-black)]">
                  {item.title}
                </h3>
              </div>
              <p className="text-sm text-[var(--color-black)] leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ContentWrapper {...(!isMobile && { topSpacing: true })}>
        <div className="sm:mt-[-8rem] md:mt-[-6rem] lg:mt-[-6rem] pb-10">
          <SprayHistory />
        </div>
      </ContentWrapper>
    </div>
  );
};

export default SprayPage;
