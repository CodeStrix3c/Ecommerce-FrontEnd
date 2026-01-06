import React from "react";
import { usePrivacyDataQuery } from "@/hooks/privacyQuery";

function PrivacyPolicy() {
  const {data} = usePrivacyDataQuery();

  return (
    <div className="py-8 lg:mt-32">
      <div className="grid gap-8 lg:grid-cols-12">
        <div className="text-[var(--color-black)] lg:col-span-8">

          {/* TOP SECTION */}
          <h6 className="pb-2 text-xs font-semibold uppercase text-[var(--color-black)] sm:text-sm">
            {data.subtitle}
          </h6>

          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
            {data.title}
          </h1>

          <p className="pt-6 text-base sm:text-lg md:text-xl">
            {data.description}
          </p>

          {/* SECTIONS */}
          {data?.sections?.map((section, index) => (
            <div key={index}>
              <h3 className="pb-4 pt-8 text-xl font-semibold underline sm:text-2xl">
                {section.heading}
              </h3>

              {/* Paragraph */}
              {section.text && (
                <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                  {section.text}
                </p>
              )}

              {/* List */}
              {section.list && (
                <ul className="ms-6 list-disc space-y-2 text-base sm:text-lg md:text-xl text-[var(--color-black)]">
                  {section?.list?.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* FOOTER */}
          <p className="pt-6 text-sm sm:text-base md:text-lg">
            Last Updated: <b>{data?.footer?.lastUpdated}</b>
            <br />
            {data?.footer?.note}
          </p>

        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
