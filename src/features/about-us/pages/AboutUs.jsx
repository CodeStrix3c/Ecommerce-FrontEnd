import React from "react";
import WhoWeAre from "../components/WhoWeAre";
import WhyChooseUs from "../components/WhyChooseUs";
import OurMission from "../components/OurMission";
import FAQCard from "../components/FaqCard";
import ImageHeaderSection from "@/components/shared/ImageHeaderSection";
import { useAboutUsQuery } from "@/hooks/useAboutUsQuery";

const AboutUs = () => {

  const { data, isLoading, isError } = useAboutUsQuery();

  // Handle different API formats safely
  const faqs =
    data?.data ||    // most common React Query format
    data?.faqs ||    // custom backend format
    data ||          // direct array
    [];

  return (
    <div>

      {/* Hero Section */}
      <ImageHeaderSection
        title="About Art & Craft"
        image="/assets/images/aboutus-home.jpg"
        description="Art & Craft is dedicated to celebrating creativity through handmade artistry. We bring together passion, tradition, and modern design to create unique craft pieces that inspire creativity and add beauty to everyday life."
      />

      {/* Sections */}
      <WhoWeAre />

      <WhyChooseUs />

      <OurMission />

      {/* FAQ Section */}

      <FAQCard faqs={data?.data} />


    </div>
  );
};

export default AboutUs;
