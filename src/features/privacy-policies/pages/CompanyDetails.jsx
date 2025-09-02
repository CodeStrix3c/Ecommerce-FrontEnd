function CompanyDetails() {
  return (
    <div className=" py-8 text-[#222222] lg:mt-32">
      <h1 className="pb-6 text-2xl font-bold sm:text-3xl md:text-4xl">
        Company Details
      </h1>

      {/* First Provider */}
      <div className="mb-8 text-base leading-relaxed sm:text-lg md:text-xl">
        <p className="pb-2 text-lg font-semibold sm:text-xl">
          Provider of platform for accommodation:
        </p>
        <p>
          Airbnb Ireland UC <br />
          25-28 North Wall Quay, Dublin 1, D01 H104
        </p>

        <p className="pt-4">
          <b>Directors:</b> Killian Pattwell, Andrea Finnegan, Richard Lombard
          <br />
          <b>VAT-ID:</b> IE9827384L
          <br />
          <b>Trade Register Number:</b> (Irish Companies Registration Office) IE
          511825
        </p>
      </div>

      {/* Second Provider */}
      <div className="mb-8 text-base leading-relaxed sm:text-lg md:text-xl">
        <p className="pb-2 text-lg font-semibold sm:text-xl">
          Provider of platform for accommodation:
        </p>
        <p>
          Airbnb Beyond Limited <br />
          25-28 North Wall Quay, Dublin 1, D01 H104
        </p>

        <p className="pt-4">
          <b>Directors:</b> Killian Pattwell, Andrea Finnegan, Richard Lombard
          <br />
          <b>VAT-ID:</b> IE4371587WH
          <br />
          <b>Company Register Number:</b> 777139 IE 511825
        </p>
      </div>

      {/* Support */}
      <div className="mb-8 text-base sm:text-lg md:text-xl">
        <p className="font-semibold">Airbnb Support:</p>
        <a
          href="https://www.airbnb.co.in/help/contact_us"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-[#FF5A5F]"
        >
          https://www.airbnb.co.in/help/contact_us
        </a>
      </div>

      {/* Grievance Officer */}
      <div className="text-base leading-relaxed sm:text-lg md:text-xl">
        <p>
          If you have a complaint or concern about Airbnb’s platform or
          violations of Airbnb’s Terms of Service, you may contact the India
          grievance officer:
        </p>
        <p className="pt-3 font-medium">
          Attn: Andrea Finnegan, Grievance Officer
        </p>
        <p className="pt-2">
          Email:{' '}
          <a
            href="mailto:grievance-officer-india@airbnb.com"
            className="underline hover:text-[#FF5A5F]"
          >
            grievance-officer-india@airbnb.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default CompanyDetails;
