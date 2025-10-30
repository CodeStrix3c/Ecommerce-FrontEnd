import React from "react";
import { Heart, Globe2,  HeartHandshake, Target } from "lucide-react";

const OurMission = () => (
  <section className=" py-6 md:px-24 text-center ">
<h2 className="text-lg sm:text-2xl md:text-3xl font-bold text-[var(--color-black)] mb-10 flex items-center justify-center gap-2 ">
  <Target className="w-6 h-6 text-[var(--color-secondary)]" />
  Our Mission & Values
</h2>
    <div className="grid sm:grid-cols-3 gap-8 max-w-6xl mx-auto ">
      <div className="p-6 rounded-sm border ">
        <Heart className="mx-auto text-[var(--color-secondary)] w-8 h-8 mb-3" />
        <h3 className="font-semibold text-lg mb-2">Sustainability</h3>
        <p className="ext-[var(--color-black)]">We protect nature by creating eco-safe pesticide solutions.</p>
      </div>
      <div className="p-6 rounded-sm border">
        <Globe2 className="mx-auto text-[var(--color-secondary)] w-8 h-8 mb-3" />
        <h3 className="font-semibold text-lg mb-2">Innovation</h3>
        <p className="ext-[var(--color-black)]">We constantly research and innovate to improve farming outcomes.</p>
      </div>
      <div className="p-6 rounded-sm border">
        <HeartHandshake className="mx-auto text-[var(--color-secondary)] w-8 h-8 mb-3" />
        <h3 className="font-semibold text-lg mb-2">Community</h3>
        <p className="text-[var(--color-black)]">We empower farmers and support rural livelihoods across India.</p>
      </div>
    </div>
  </section>
);

export default OurMission;
