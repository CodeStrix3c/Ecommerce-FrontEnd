import React from "react";
import { BookOpen, Video, HelpCircle } from "lucide-react";

export default function GuidesResources() {
  const resources = [
    {
      icon: <BookOpen />,
      text: "Download Crop Protection Handbook",
      link: "/assets/Agriculture_Guide.pdf", // ✅ local file in public/files
      isDownload: true,
    },
    {
      icon: <Video />,
      text: "Watch Training Videos",
      link: "https://www.youtube.com/results?search_query=indian+agriculture+training+videos",
    },
    {
      icon: <HelpCircle />,
      text: "Government Schemes & Subsidies",
      link: "https://agriwelfare.gov.in/en/Major",
    },
  ];

  return (
    <section className="py-12 px-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        Guides & Resources
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {resources.map((r, i) => (
          <a
            key={i}
            href={r.link}
            {...(r.isDownload
              ? { download: "Crop_Protection_Handbook.pdf" } 
              : { target: "_blank", rel: "noopener noreferrer" })}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-[var(--color-black)] px-6 py-4 rounded-xl border hover:border-[var(--color-secondary)] hover:shadow-md transition-all duration-200 w-full justify-center bg-white"
          >
            <span className="mr-3 text-[var(--color-secondary)]">{r.icon}</span>
            {r.text}
          </a>
        ))}
      </div>
    </section>
  );
}
