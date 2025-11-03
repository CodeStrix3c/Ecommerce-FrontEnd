import { useState } from "react";
import {
  ShieldCheck,
  Bug,
  Droplet,
  Leaf,
  Sprout,
  ChevronDown,
  ChevronUp


} from "lucide-react";
import PestDisease from "../component/PestDisease";
import GuidesResources from "../component/GuidesResources";
import ImageHeaderSection from "@/components/shared/ImageHeaderSection";


export default function CropProtectionPage() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      q: "What are the best pest control methods for organic farming?",
      a: "Use biological control agents like ladybugs and Trichogramma, neem-based sprays, and crop rotation. Avoid synthetic pesticides to maintain soil and ecosystem health.",
    },
    {
      q: "How can farmers improve soil fertility naturally?",
      a: "Incorporate organic compost, green manure, and vermicompost. Practice crop rotation and intercropping to restore essential nutrients like nitrogen and phosphorus.",
    },
    {
      q: "When is the best time to spray pesticides?",
      a: "Spray during early morning or late evening when temperatures are cooler, and pollinators are less active. Avoid spraying before rainfall to ensure effectiveness.",
    },
    {
      q: "What government subsidies are available for small-scale farmers?",
      a: "Farmers can apply for PM-Kisan, Soil Health Card Scheme, and agricultural machinery subsidies through the MyScheme portal or local Krishi Vigyan Kendra (KVK).",
    },
    {
      q: "How do I prevent fungal diseases like powdery mildew?",
      a: "Ensure proper air circulation, avoid overwatering, and use sulfur-based or potassium bicarbonate sprays. Resistant crop varieties can also reduce infection risks.",
    },
    {
      q: "How can I store harvested grains safely?",
      a: "Keep grains dry, use moisture-proof containers, and ensure storage areas are well-ventilated. Treat containers with neem oil or natural repellents to prevent pest attacks.",
    },
  ];
  return (
    <div className="w-full min-h-screen bg-[var(--color-white)]">
      <ImageHeaderSection
        image={
          "https://images.pexels.com/photos/15610774/pexels-photo-15610774.jpeg"
        }
        title={"Crop Protection Guide"}
        description={
          "Protect your crops with sustainable methods, smart practices, and modern tools Empowering farmers with knowledge to fight pests, diseases, and climate challenges"
        }
      />



      <section className="py-7 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">Methods of Crop Protection</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <ShieldCheck />, title: "Chemical Control", desc: "Use pesticides and fungicides responsibly to control pests and diseases." },
            { icon: <Leaf />, title: "Cultural Practices", desc: "Crop rotation, mixed cropping, and timely sowing prevent pest spread." },
            { icon: <Sprout />, title: "Biological Control", desc: "Use beneficial insects, bacteria, and fungi to control harmful pests." },
            { icon: <Droplet />, title: "Mechanical Methods", desc: "Manual weeding, traps, and barriers protect crops effectively." },
          ].map((m, i) => (
            <div key={i} className="border border-lg p-6 rounded-xl  transition">
              <div className="text-[var(--color-secondary)] text-3xl mb-4">{m.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{m.title}</h3>
              <p className="text-sm text-[var(--color-black)]">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>
      <PestDisease />
      <GuidesResources />


      <section className="py-7 px-6">
        <h2 className="text-3xl font-bold text-center mb-8">
          Frequently Asked Questions
        </h2>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((f, i) => (
            <div
              key={i}
              className="border border-gray-200 rounded-xl bg-[var(--color-white)]  hover:shadow-sm transition-all duration-200"
            >
              <button
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                className="w-full flex justify-between items-center p-5 font-medium text-[var(--color-black)]"
              >
                <span>{f.q}</span>
                {openFAQ === i ? (
                  <ChevronUp className="text-[var(--color-secondary)]" />
                ) : (
                  <ChevronDown className="text-[var(--color-secondary)]" />
                )}
              </button>

              {openFAQ === i && (
                <p className="p-5 pt-0 text-sm text-[var(--color-black)] leading-relaxed">
                  {f.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
