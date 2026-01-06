import ContentWrapper from "@/components/shared/ContentWrapper";
import { useTermsDataQuery } from "@/hooks/termsQuery";

function Terms() {
  const { data } = useTermsDataQuery();

  if (!data) return <p>Loading...</p>;

  return (
    <ContentWrapper compactScreen>
      <div className="py-8 lg:mt-32">
        <div className="text-[var(--color-black)]">

          {/* SUBTITLE */}
          <h6 className="pb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-black)] sm:text-sm">
            {data?.subtitle}
          </h6>

          {/* TITLE */}
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
            {data?.title}
          </h1>

          {/* INTRO */}
          <p className="pt-5 text-base sm:text-lg md:text-xl">
            {data?.intro}
          </p>

          {/* DESCRIPTION */}
          <p className="pt-5 text-base sm:text-lg md:text-xl">
            {data?.description}
          </p>

          {/* CONDITIONS LIST */}
          <p className="pt-5 text-base sm:text-lg md:text-xl">
            When using our Services, you agree to:
            <br /><br />

            {data?.conditions?.map((item, i) => (
              <div key={i}>• {item}</div>
            ))}

            <br />
            <b>{data?.conditionsNotice}</b>
          </p>

          {/* OWNERSHIP NOTICE */}
          <p className="pt-6 text-base sm:text-lg md:text-xl">
            <b>{data?.ownershipNotice}</b>
          </p>

          {/* SECTIONS */}
          {data?.sections?.map((section, index) => (
            <div key={index}>
              <h2 className="pt-8 text-xl font-semibold sm:text-2xl md:text-3xl">
                {section.heading}
              </h2>

              <p className="pt-4 text-base sm:text-lg md:text-xl">
                {section.text}
              </p>
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
    </ContentWrapper>
  );
}

export default Terms;
