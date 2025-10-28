import React from "react";
import HeroSection from "../components/HeroSection";
import WhoWeAre from "../components/WhoWeAre";
import WhyChooseUs from "../components/WhyChooseUs";
import OurMission from "../components/OurMission";
import FAQCard from "../components/FaqCard";



const AboutUs = () => {
  return (
    <div className="p-4 ">
      <HeroSection />
      <WhoWeAre />
      <WhyChooseUs />
      <OurMission />
      <FAQCard />
    </div>
  );
};

export default AboutUs;

