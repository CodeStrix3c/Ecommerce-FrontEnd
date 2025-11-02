import React, { useState } from "react";
import { Bug, X } from "lucide-react";

export default function PestDisease() {
    const [selectedPest, setSelectedPest] = useState(null);

    const pests = [
        {
            name: "Locusts",
            desc: "Destroy crops rapidly. Use bio-pesticides and timely monitoring.",
            details:
                "Locusts are migratory pests that can devastate crops quickly. Control involves early monitoring, mechanical control, and eco-friendly bio-pesticides such as Metarhizium anisopliae. Avoid over-irrigation which encourages breeding.",
        },
        {
            name: "Rice Blast",
            desc: "Fungal disease reducing yield. Resistant varieties help.",
            details:
                "Rice blast, caused by the fungus Magnaporthe oryzae, affects leaves, nodes, and panicles. Use resistant rice varieties, ensure proper spacing for ventilation, and apply tricyclazole if necessary.",
        },
        {
            name: "Aphids",
            desc: "Suck sap and spread viruses. Neem spray helps control.",
            details:
                "Aphids cluster on the underside of leaves, sucking plant sap. They transmit viruses. Regular neem oil or soap sprays and encouraging natural predators like ladybugs can help reduce infestation.",
        },
        {
            name: "Powdery Mildew",
            desc: "White fungal growth. Sulfur-based sprays are effective.",
            details:
                "Powdery mildew appears as white powdery spots on leaves and stems. It thrives in dry, warm conditions. Ensure proper air circulation and use sulfur-based or potassium bicarbonate sprays.",
        },
        {
            name: "Stem Borers",
            desc: "Damage maize & rice stems. Use pheromone traps & resistant seeds.",
            details:
                "Stem borers bore into plant stems, weakening the structure and reducing yield. Prevent using pheromone traps, timely irrigation, and resistant hybrids. Remove infested stems after harvest.",
        },
        {
            name: "Leaf Rust",
            desc: "Affects wheat leaves. Apply fungicides as per guidelines.",
            details:
                "Leaf rust is caused by Puccinia triticina fungus, forming orange pustules on leaves. Use resistant varieties and apply fungicides like propiconazole as per agricultural recommendations.",
        },
    ];

    return (
        <section className="py-12 px-6">
            <h2 className="text-3xl font-bold text-center mb-8">
                Common Pests & Diseases
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pests.map((p, i) => (
                    <div
                        key={i}
                        className="border border-gray-200  transition-all duration-200 p-6 rounded-xl bg-[var(--color-white)]"
                    >
                        <div className="flex items-center mb-3">
                            <Bug className="mr-2 text-[var(--color-secondary)]" />
                            <h3 className="font-semibold text-[var(--color-black)]">
                                {p.name}
                            </h3>
                        </div>
                        <p className="text-sm text-[var(--color-black)]">{p.desc}</p>
                        <button
                            onClick={() => setSelectedPest(p)}
                            className="mt-4 text-sm font-medium text-[var(--color-secondary)] hover:underline"
                        >
                            Read More
                        </button>
                    </div>
                ))}
            </div>


            {selectedPest && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[var(--color-white)] border border-gray-200 shadow-sm rounded-2xl p-6 w-[90%] max-w-md z-50 animate-fadeIn">
                    <button
                        onClick={() => setSelectedPest(null)}
                        className="absolute top-3 right-3 text-[var(--color-black)] hover:text-[var(--color-black)]"
                    >
                        <X size={20} />
                    </button>
                    <div className="flex items-center mb-4">
                        <Bug className="mr-2 text-[var(--color-secondary)]" />
                        <h3 className="text-xl font-bold text-[var(--color-black)]">
                            {selectedPest.name}
                        </h3>
                    </div>
                    <p className="text-[var(--color-black)] text-sm leading-relaxed">
                        {selectedPest.details}
                    </p>
                </div>
            )}
        </section>
    );
}
