import React from "react";

export default function FeatureCard({ Icon, title, description }) {
  return (
   <div className="p-6 rounded-2xl bg-[var(--color-light)] transition text-center">
  <Icon className="mx-auto mb-4 text-[var(--color-secondary)]" size={36} />
  <h3 className="font-bold text-lg md:text-xl mb-2">{title}</h3>
  <p className="text-sm sm:text-base">{description}</p>
</div>

  );
}
