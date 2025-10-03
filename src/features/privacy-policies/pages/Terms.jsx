import ContentWrapper from "@/components/shared/ContentWrapper";

function Terms() {
  return (
    <ContentWrapper compactScreen>
      <div className="py-8 lg:mt-32">
        <div className="text-[var(--color-black)]">
          <h6 className="pb-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-black)] sm:text-sm">
            Legal Terms
          </h6>

          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">
            Terms of Service
          </h1>

          <p className="pt-5 text-base leading-relaxed sm:text-lg md:text-xl">
            As a consumer who resides in the EEA you can access the European
            Commission’s online dispute resolution platform here:{" "}
            <a
              className="font-semibold underline text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)]"
              href="https://ec.europa.eu/consumers/odr"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://ec.europa.eu/consumers/odr
            </a>
            . Please note that Airbnb is not committed nor obliged to use an
            alternative dispute resolution entity within the meaning of
            Directive 2013/11 EU to resolve disputes with consumers. The
            European Commission’s online dispute resolution platform is not
            available for residents of Switzerland or the United Kingdom.
          </p>

          <p className="pt-6 text-base leading-relaxed sm:text-lg md:text-xl">
            <b>
              Section 25 of these Terms contains an arbitration agreement and
              class action waiver that applies to all claims brought against
              Airbnb in the United States. Please read them carefully.
            </b>
          </p>

          <p className="pt-6 text-sm sm:text-base md:text-lg">
            Last Updated: <b>May 13, 2025</b>
            <br />
            Thank you for using Airbnb!
          </p>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default Terms;
