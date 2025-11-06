import { useState } from "react";
import {
  ShieldCheck,
  Bug,
  Droplet,
  Leaf,
  Sprout,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import PestDisease from "../component/PestDisease";
import GuidesResources from "../component/GuidesResources";
import ImageHeaderSection from "@/components/shared/ImageHeaderSection";
import ContentWrapper from "@/components/shared/ContentWrapper";
import Faq from "@/features/FAQ/Faq";
import FAQCard from "@/features/about-us/components/FaqCard";

export default function CropProtectionPage() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const cropProtectionFaqs = [
    {
      question: "What are the best pest control methods for organic farming?",
      answer:
        "For organic farming, focus on creating a balanced ecosystem. Use biological control agents like ladybugs, lacewings, and Trichogramma to manage common pests naturally. Apply neem-based sprays or botanical extracts that deter insects without harming beneficial organisms. Regularly monitor pest populations, rotate crops, and introduce trap crops to reduce pest buildup. Avoid synthetic pesticides to maintain soil biodiversity and long-term sustainability.",
    },
    {
      question: "How can farmers improve soil fertility naturally?",
      answer:
        "To enrich soil fertility naturally, add well-decomposed organic compost, green manure, and vermicompost to enhance microbial activity. Practice crop rotation with legumes to restore essential nutrients like nitrogen and phosphorus. Incorporate cover crops such as clover or alfalfa to prevent erosion and improve soil texture. Regular soil testing helps you understand nutrient gaps and apply organic amendments effectively, leading to healthier, more resilient crops.",
    },
    {
      question: "When is the best time to spray pesticides?",
      answer:
        "The ideal time to spray pesticides is early morning or late evening when temperatures are cooler, humidity is higher, and pollinators are less active. Spraying during these times improves absorption and reduces evaporation losses. Always avoid spraying before rainfall or during strong winds, as it can wash away or spread chemicals unevenly. For maximum effectiveness, follow the recommended dosage and spray intervals mentioned on the product label.",
    },
    {
      question:
        "What government subsidies are available for small-scale farmers?",
      answer:
        "Small-scale farmers in India can benefit from various government schemes. Programs like PM-Kisan provide direct income support, while the Soil Health Card Scheme offers soil nutrient analysis and guidance. The Pradhan Mantri Fasal Bima Yojana (PMFBY) gives crop insurance coverage, and agricultural machinery subsidies make modern equipment more affordable. Farmers can explore and apply for these schemes via the MyScheme portal or visit their nearest Krishi Vigyan Kendra (KVK) for personalized assistance.",
    },
    {
      question: "How do I prevent fungal diseases like powdery mildew?",
      answer:
        "To prevent fungal infections such as powdery mildew, ensure proper spacing between plants for good air circulation and sunlight penetration. Avoid overwatering and excess humidity around the plant base. Use sulfur-based or potassium bicarbonate sprays as preventive treatments. For long-term protection, choose disease-resistant varieties and rotate crops every season. Regular pruning and removing infected leaves can also keep fungal spread under control.",
    },
    {
      question: "How can I store harvested grains safely?",
      answer:
        "Proper grain storage starts with thorough drying to reduce moisture content below 12%. Store grains in clean, airtight, and moisture-proof containers such as metal bins or HDPE drums. Keep the storage area dry, well-ventilated, and elevated from the floor to prevent dampness. You can also mix neem leaves or apply neem oil as a natural insect repellent. Regularly inspect for any signs of pest activity or mold and ensure fumigation if needed before the next storage cycle.",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-[var(--color-white)]">
      <ImageHeaderSection
        image={"/assets/images/cropprotection.jpg"}
        title={"Crop Protection Guide"}
        description={
          "Protect your crops with sustainable methods, smart practices, and modern tools Empowering farmers with knowledge to fight pests, diseases, and climate challenges"
        }
      />

      <section className="py-7 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Methods of Crop Protection
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <ShieldCheck />,
              title: "Chemical Control",
              desc: "Use pesticides and fungicides responsibly to control pests and diseases.",
            },
            {
              icon: <Leaf />,
              title: "Cultural Practices",
              desc: "Crop rotation, mixed cropping, and timely sowing prevent pest spread.",
            },
            {
              icon: <Sprout />,
              title: "Biological Control",
              desc: "Use beneficial insects, bacteria, and fungi to control harmful pests.",
            },
            {
              icon: <Droplet />,
              title: "Mechanical Methods",
              desc: "Manual weeding, traps, and barriers protect crops effectively.",
            },
          ].map((m, i) => (
            <div
              key={i}
              className="border border-lg p-6 rounded-xl  transition"
            >
              <div className="text-[var(--color-secondary)] text-3xl mb-4">
                {m.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{m.title}</h3>
              <p className="text-sm text-[var(--color-black)]">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <PestDisease />
      <GuidesResources />
      <FAQCard faqs={cropProtectionFaqs} />
    </div>
  );
}
