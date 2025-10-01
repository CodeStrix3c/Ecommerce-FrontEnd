import ContentWrapper from "@/components/shared/ContentWrapper";
import SprayHistory from "../components/SprayCard";
import useIsMobile from "@/hooks/useInMobile";

export const SprayPage = () => {
  const isMobile = useIsMobile();
  return (
    <ContentWrapper variant={isMobile ? "default" : "place"}>
      <div className="w-full mt-8 lg:mt-28 md:mt-12 min-h-screen bg-[var(--color-white)] md:py-20 lg:py-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-[var(--color-black)] sm:mb-4 lg:mb-8">
          Spray Records
        </h1>
        <SprayHistory />
      </div>
    </ContentWrapper>
  );
};
