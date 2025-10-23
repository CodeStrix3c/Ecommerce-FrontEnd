import { useState } from "react";
import {
  ShieldCheck,
  Bug,
  Droplet,
  Leaf,
  Sprout,
  BookOpen,
  Video,
  HelpCircle,
} from "lucide-react";

export default function CropProtectionPage() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      q: "What is crop protection?",
      a: "Crop protection involves practices and products that safeguard crops from pests, weeds, and diseases to improve yield and quality."
    },
    {
      q: "Are organic methods effective?",
      a: "Yes, organic methods like neem extracts, crop rotation, and biological control are sustainable and effective against many threats."
    },
    {
      q: "How do I choose pesticides?",
      a: "Always identify the pest first, then select pesticides approved for that crop. Follow government guidelines to avoid misuse."
    },
    {
      q:"How can farmers ensure safe pesticide usage?",
      a : "Wear protective clothing, Store chemicals safely away from food and children, Avoid over-spraying"
    }
  ];

  return (
    <div className=" lg: mt-28  min-h-screen text-[var(--color-black)]">
      <section className="text-center py-12 px-6 text-[var(--color-black)]">
        <h1 className="text-4xl font-bold mb-4">Crop Protection Guide</h1>
        <p className="max-w-2xl mx-auto mb-6">
          Protect your crops with sustainable methods, smart practices, and modern tools. 
          Empowering farmers with knowledge to fight pests, diseases, and climate challenges.
        </p>
        <div className="space-x-4">
          <button className=" text-[var(--color-black)] px-6 py-2 rounded-lg border border-lg  hover:bg-[var(--color-black-hover)]">
            Ask an Expert
          </button>
          <button className=" text-[var(--color-black)] px-6 py-2 rounded-lg border border-lg   hover:bg-[var(--color-black-hover)]">
            Buy Products
          </button>
        </div>
      </section>

      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Methods of Crop Protection</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <ShieldCheck />, title: "Chemical Control", desc: "Use pesticides and fungicides responsibly to control pests and diseases." },
            { icon: <Leaf />, title: "Cultural Practices", desc: "Crop rotation, mixed cropping, and timely sowing prevent pest spread." },
            { icon: <Sprout />, title: "Biological Control", desc: "Use beneficial insects, bacteria, and fungi to control harmful pests." },
            { icon: <Droplet />, title: "Mechanical Methods", desc: "Manual weeding, traps, and barriers protect crops effectively." },
          ].map((m, i) => (
            <div key={i} className="border border-lg p-6 rounded-xl  transition hover:bg-[var(--color-black-hover)]">
              <div className="text-[var(--color-secondary)] text-3xl mb-4">{m.icon}</div>
              <h3 className="font-semibold text-lg mb-2">{m.title}</h3>
              <p className="text-sm text-[var(--color-black)]">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      
      <section className="py-12 px-6 ">
        <h2 className=" text-2xl font-bold text-center mb-8">Common Pests & Diseases</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { name: "Locusts", desc: "Destroy crops rapidly. Use bio-pesticides and timely monitoring." },
            { name: "Rice Blast", desc: "Fungal disease reducing yield. Resistant varieties help." },
            { name: "Aphids", desc: "Suck sap and spread viruses. Neem spray helps control." },
            { name: "Powdery Mildew", desc: "White fungal growth. Sulfur-based sprays are effective." },
            { name: "Stem Borers", desc: "Damage maize & rice stems. Use pheromone traps & resistant seeds." },
            { name: "Leaf Rust", desc: "Affects wheat leaves. Apply fungicides as per guidelines." },
          ].map((p, i) => (
            <div key={i} className=" border border-lg text-[var(--color-secondary)] p-6 rounded-xl">
              <div className="flex items-center mb-3">
                <Bug className="mr-2" /> <h3 className="font-semibold text-[var(--color-black)]">{p.name}</h3>
              </div>
              <p className="text-sm text-[var(--color-black)]">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Guides & Resources</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: <BookOpen />, text: "Download Crop Protection Handbook" },
            { icon: <Video />, text: "Watch Training Videos" },
            { icon: <HelpCircle />, text: "Government Schemes & Subsidies" },
          ].map((r, i) => (
            <button key={i} className="flex items-center text-[var(--color-black)] px-6 py-4 rounded-xl border border-lg  w-full justify-center">
              <span className="mr-3 text-[var(--color-secondary)] ">{r.icon}</span>
              {r.text}
            </button>
          ))}
        </div>
      </section>

    
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Frequently Asked Questions</h2>
        <div className="max-w-3xl mx-auto">
          {faqs.map((f, i) => (
            <div key={i} className="mb-4 border rounded-lg ">
              <button
                onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                className="w-full text-left p-4 font-medium flex justify-between items-center"
              >
                {f.q}
                <span>{openFAQ === i ? "−" : "+"}</span>
              </button>
              {openFAQ === i && <p className="p-4 text-sm text-[var(--color-black)]">{f.a}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
