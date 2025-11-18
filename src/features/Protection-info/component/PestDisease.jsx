import React, { useState } from "react";
import { Bug, Droplet, Leaf, Sprout } from "lucide-react";
import { usePestDiseaseDataQuery } from "@/hooks/ProtectionInfoQuery";

export default function PestDisease() {
  const { data } = usePestDiseaseDataQuery();

  const pestIconMap = {
    Locusts: <Bug />,
    RiceBlast: <Sprout />,
    Aphids: <Bug />,
    PowderyMildew: <Leaf />,
    StemBorers: <Droplet />,
    LeafRust: <Leaf />,
  };
  // const pests = [
  //     {
  //         name: "Locusts",
  //         desc: "Destroy crops rapidly. Use bio-pesticides and timely monitoring.",
  //         details:
  //             "Locusts are migratory pests that can devastate crops quickly. Control involves early monitoring, mechanical control, and eco-friendly bio-pesticides such as Metarhizium anisopliae. Avoid over-irrigation which encourages breeding.",
  //     },
  //     {
  //         name: "Rice Blast",
  //         desc: "Fungal disease reducing yield. Resistant varieties help.",
  //         details:
  //             "Rice blast, caused by the fungus Magnaporthe oryzae, affects leaves, nodes, and panicles. Use resistant rice varieties, ensure proper spacing for ventilation, and apply tricyclazole if necessary.",
  //     },
  //     {
  //         name: "Aphids",
  //         desc: "Suck sap and spread viruses. Neem spray helps control.",
  //         details:
  //             "Aphids cluster on the underside of leaves, sucking plant sap. They transmit viruses. Regular neem oil or soap sprays and encouraging natural predators like ladybugs can help reduce infestation.",
  //     },
  //     {
  //         name: "Powdery Mildew",
  //         desc: "White fungal growth. Sulfur-based sprays are effective.",
  //         details:
  //             "Powdery mildew appears as white powdery spots on leaves and stems. It thrives in dry, warm conditions. Ensure proper air circulation and use sulfur-based or potassium bicarbonate sprays.",
  //     },
  //     {
  //         name: "Stem Borers",
  //         desc: "Damage maize & rice stems. Use pheromone traps & resistant seeds.",
  //         details:
  //             "Stem borers bore into plant stems, weakening the structure and reducing yield. Prevent using pheromone traps, timely irrigation, and resistant hybrids. Remove infested stems after harvest.",
  //     },
  //     {
  //         name: "Leaf Rust",
  //         desc: "Affects wheat leaves. Apply fungicides as per guidelines.",
  //         details:
  //             "Leaf rust is caused by Puccinia triticina fungus, forming orange pustules on leaves. Use resistant varieties and apply fungicides like propiconazole as per agricultural recommendations.",
  //     },
  // ];

  const [expanded, setExpanded] = useState(Array(data?.length).fill(false));

  const handleToggle = (index) => {
    setExpanded((prev) => prev.map((val, i) => (i === index ? !val : val)));
  };

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        Common Pests & Diseases
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((p, i) => {
          const isOpen = expanded[i];
          return (
            <div
              key={i}
              className="border border-gray-200 rounded-xl p-6 bg-[var(--color-white)]  transition-all duration-300 "
            >
              <div className="flex items-center mb-3">
                <span className="text-[var(--color-secondary)] text-xl mr-2">
                  {pestIconMap[p.icon]}
                </span>
                <h3 className="font-semibold text-[var(--color-black)]">
                  {p.name}
                </h3>
              </div>

              <p className="text-sm text-[var(--color-black)]">{p.desc}</p>

              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr] mt-3" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-sm text-[var(--color-black)] leading-relaxed">
                    {p.details}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleToggle(i)}
                className="mt-4 text-sm font-medium text-[var(--color-black)] hover:underline focus:outline-none"
              >
                {isOpen ? "Read Less" : "Read More"}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
