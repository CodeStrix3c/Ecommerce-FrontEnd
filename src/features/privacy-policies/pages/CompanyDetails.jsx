import ContentWrapper from "@/components/shared/ContentWrapper";
import { useCompanyDetailsData } from "@/hooks/companyDetailsQuery";
// import { socialIconMap } from "@/utils/socialIcons";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const socialIconMap = {
  FaFacebook: FaFacebook,
  FaLinkedin: FaLinkedin,
  FaInstagram: FaInstagram,
  FaXTwitter: FaXTwitter,
};

function CompanyDetails() {
  const { data } = useCompanyDetailsData();

  if (!data) return <p>Loading...</p>;

  return (
    <ContentWrapper compactScreen>
      <div className="py-8 text-[var(--color-black)] lg:mt-32">
        {/* TITLE */}
        <h1 className="pb-6 text-2xl font-bold sm:text-3xl md:text-4xl">
          {data.title}
        </h1>

        {/* ABOUT US */}
        <div className="mb-8 text-base sm:text-lg md:text-xl">
          <p className="pb-2 text-lg font-semibold sm:text-xl">
            {data.about.heading}:
          </p>
          <p>{data.about.text}</p>
        </div>

        {/* OFFICE DETAILS */}
        <div className="mb-8 text-base leading-relaxed sm:text-lg md:text-xl">
          <p className="pb-2 text-lg font-semibold sm:text-xl">
            {data.office.heading}:
          </p>

          <p>
            {data.office.companyName} <br />
            {data.office.address}
          </p>

          <p className="pt-4">
            <b>Directors:</b> {data.office.directors} <br />
            <b>VAT/GST ID:</b> {data.office.gst} <br />
            <b>Company Registration Number:</b> {data.office.registrationNumber}
          </p>
        </div>

        {/* SUPPORT */}
        <div className="mb-8 text-base sm:text-lg md:text-xl">
          <p className="font-semibold">{data.support.heading}:</p>
          <p>For assistance with the platform, contact us at:</p>

          <a
            href={`mailto:${data.support.email}`}
            className="underline text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)]"
          >
            {data.support.email}
          </a>

          <p className="pt-2">Phone: {data.support.phone}</p>
        </div>

        {/* GRIEVANCE */}
        <div className="mb-8 text-base sm:text-lg md:text-xl">
          <p>{data.grievance.heading}:</p>

          <p className="pt-3 font-medium">
            Attn: {data.grievance.officer}, Grievance Officer
          </p>

          <p className="pt-2">
            email:{" "}
            <a
              href={`mailto:${data.grievance.email}`}
              className="underline text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)]"
            >
              {data.grievance.email}
            </a>
          </p>

          <p className="pt-2">Phone: {data.grievance.phone}</p>
        </div>

        {/* BUSINESS HOURS */}
        <div className="mb-8 text-base sm:text-lg md:text-xl">
          <p className="font-semibold">{data.businessHours.heading}:</p>
          <ul className="list-disc list-inside">
            {data.businessHours.hours.map((h, index) => (
              <li key={index}>{h}</li>
            ))}
          </ul>
        </div>

        {/* SOCIAL MEDIA */}
        <div className="text-base sm:text-lg md:text-xl">
          <p className="font-semibold pb-2">Follow Us:</p>

          <ul className="list-none flex gap-4">
            {data.socialMedia.map((item, index) => {
              const Icon = socialIconMap[item.icon];

              return (
                <li key={index} className="flex items-center gap-1">
                  <Icon
                    className="w-6 h-6 hover:opacity-80 cursor-pointer"
                    style={{ color: item.color }}
                  />
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline"
                  ></a>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </ContentWrapper>
  );
}

export default CompanyDetails;
