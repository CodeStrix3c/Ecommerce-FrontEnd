import React from "react";
import HeroSection from "../components/HeroSection";
import WhoWeAre from "../components/WhoWeAre";
import WhyChooseUs from "../components/WhyChooseUs";
import OurMission from "../components/OurMission";
import FAQCard from "../components/FaqCard";
import ImageHeaderSection from "@/components/shared/ImageHeaderSection";



const AboutUs = () => {
  return (
    <div className=" ">
      {/* <HeroSection /> */}
      <ImageHeaderSection  title={"About Ziraat"} image={"https://images.unsplash.com/photo-1745138470256-42cb9fa3c052?ixlib=rb-4.1.0"} description={" Ziraat is dedicated to empowering orchard farmers with safe, effective,and sustainable crop protection solutions. We blend scientific innovation with agricultural wisdom to create eco-friendly pesticides that nurturehealthier orchards."

      }/>
      <WhoWeAre />
      <WhyChooseUs />
      <OurMission />
      <FAQCard />
    </div>
  );
};

export default AboutUs;

