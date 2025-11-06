
import React from "react";
import HeroSection from "../components/HeroSection";
import WhoWeAre from "../components/WhoWeAre";
import WhyChooseUs from "../components/WhyChooseUs";
import OurMission from "../components/OurMission";
import FAQCard from "../components/FaqCard";
import ImageHeaderSection from "@/components/shared/ImageHeaderSection";




const AboutUs = () => {

  const aboutUsFaqs = [
    {
      question: "What is Ziraat and what does it stand for?",
      answer:
        "Ziraat is an agri-tech brand dedicated to empowering farmers through sustainable and innovative crop protection solutions. Our name reflects our mission — to nurture the land and support those who cultivate it.",
    },
    {
      question: "How long has Ziraat been in operation?",
      answer:
        "Ziraat was founded with a vision to modernize Indian agriculture. Over the years, we’ve grown into a trusted partner for farmers, focusing on eco-safe pest management and sustainable crop care.",
    },
    {
      question: "Where is Ziraat headquartered?",
      answer:
        "Our main office is based in India, with regional field teams and distributors operating across multiple agricultural zones to assist farmers locally.",
    },
    {
      question: "What makes Ziraat different from other agricultural companies?",
      answer:
        "We combine technology, sustainability, and field expertise. Unlike conventional suppliers, Ziraat focuses on long-term soil health, eco-friendly products, and personalized agronomy support.",
    },
    {
      question: "Do you collaborate with research institutions or universities?",
      answer:
        "Yes. Ziraat actively partners with agricultural universities and research labs to continuously innovate and validate our eco-friendly solutions.",
    },
    {
      question: "Can I visit your facilities or meet your experts?",
      answer:
        "Absolutely! Farmers and partners are welcome to schedule a visit or consultation with our agronomy experts. Simply reach out through our contact page to arrange an appointment.",
    },
  ];

  return (
    <div>
      <ImageHeaderSection
        title={"About Ziraat"}
        image="/assets/images/aboutusss.jpg"
        description={
          "Ziraat is dedicated to empowering orchard farmers with safe, effective, and sustainable crop protection solutions. We blend scientific innovation with agricultural wisdom to create eco-friendly pesticides that nurture healthier orchards."
        }
      />
      <WhoWeAre />
      <WhyChooseUs />
      <OurMission />
      <FAQCard faqs={aboutUsFaqs} />
    </div>
  );
};

export default AboutUs;
