import React from "react";
import HeroSection from "../components/HeroSection";
import WhoWeAre from "../components/WhoWeAre";
import WhyChooseUs from "../components/WhyChooseUs";
import OurMission from "../components/OurMission";
import FAQCard from "../components/FaqCard";
import ImageHeaderSection from "@/components/shared/ImageHeaderSection";
import ContentWrapper from "@/components/shared/ContentWrapper";



const AboutUs = () => {
  return (
    <div className=" ">
      {/* <HeroSection /> */}
      <ImageHeaderSection  title={"About Ziraat"} image={"/assets/images/about-us-img.avif"} description={" Ziraat is dedicated to empowering orchard farmers with safe, effective,and sustainable crop protection solutions. We blend scientific innovation with agricultural wisdom to create eco-friendly pesticides that nurturehealthier orchards."

      }/>
      <WhoWeAre />
      <WhyChooseUs />
      <OurMission />
     <ContentWrapper>
       <FAQCard />
     </ContentWrapper>
    </div>
  );
};

export default AboutUs;

