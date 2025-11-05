// import React from "react";
// import HeroSection from "../components/HeroSection";
// import WhoWeAre from "../components/WhoWeAre";
// import WhyChooseUs from "../components/WhyChooseUs";
// import OurMission from "../components/OurMission";
// import FAQCard from "../components/FaqCard";
// import ImageHeaderSection from "@/components/shared/ImageHeaderSection";



// const AboutUs = () => {
//   return (
//     <div className=" ">
//       {/* <HeroSection /> */}
//       <ImageHeaderSection  title={"About Ziraat"} image={"https://plus.unsplash.com/premium_photo-1661956119902-2603fdf751ac?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1243"} description={" Ziraat is dedicated to empowering orchard farmers with safe, effective,and sustainable crop protection solutions. We blend scientific innovation with agricultural wisdom to create eco-friendly pesticides that nurturehealthier orchards."

//       }/>
//       <WhoWeAre />
//       <WhyChooseUs />
//       <OurMission />
//       <FAQCard />
//     </div>
//   );
// };

// export default AboutUs;



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
