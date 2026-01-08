import React from "react";
import { Globe } from "lucide-react";
import ContentWrapper from "./shared/ContentWrapper";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="flex w-full justify-center bg-[var(--color-black-hover)] pb-8 mt-10">
      <ContentWrapper>
        <div className="flex w-full flex-col items-end">
          <div className="grid w-full grid-cols-2 gap-10 py-8 text-sm md:grid-cols-3">
            {/* About Kashmir Art */}
            <div className="flex flex-col gap-4">
              <strong className="font-medium text-[var(--color-black)]">
                About Kashmir Art
              </strong>
              {[
                "Our Heritage",
                "Artisan Communities",
                "Craft Preservation",
                "Sustainable Practices",
                "Cultural Legacy",
              ].map((item, idx) => (
                <p
                  key={idx}
                  className="font-normal text-[var(--color-black)] cursor-default"
                >
                  {item}
                </p>
              ))}
            </div>

            {/* Handicrafts */}
            <div className="flex flex-col gap-4">
              <strong className="font-medium text-[var(--color-black)]">
                Handicrafts
              </strong>
              {[
                "Pashmina Shawls",
                "Handwoven Carpets",
                "Papier Mâché",
                "Walnut Wood Carving",
                "Sozni Embroidery",
              ].map((item, idx) => (
                <p
                  key={idx}
                  className="font-normal text-[var(--color-black)] cursor-default"
                >
                  {item}
                </p>
              ))}
            </div>

            {/* Artisan Support */}
            <div className="flex flex-col gap-4">
              <strong className="font-medium text-[var(--color-black)]">
                Artisan Support
              </strong>
              {[
                "Fair Trade Commitment",
                "Skill Development",
                "Women Artisans",
                "Rural Empowerment",
                "Authenticity Assurance",
              ].map((item, idx) => (
                <p
                  key={idx}
                  className="font-normal text-[var(--color-black)] cursor-default"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          <div className="my-4 w-full border-t border-[var(--color-black)]"></div>

          <div className="flex w-full flex-col items-center justify-between gap-4 md:gap-0 lg:flex-row">
            {/* Language & Social */}
            <div className="mt-4 flex w-full justify-between gap-10 md:order-last md:w-auto">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-black)]">
                <Globe className="h-6 w-6" />
                English(IN) <span className="mx-4">₹ INR</span>
              </div>

              <div className="flex gap-3 text-[var(--color-black)]">
                <FaFacebook className="w-6 h-6 text-[#1877F2]" />
                <FaLinkedin className="w-6 h-6 text-[#0A66C2]" />
                <FaInstagram className="w-6 h-6 text-[#E4405F]" />
                <FaXTwitter className="w-6 h-6 text-black" />
              </div>
            </div>

            {/* Footer Bottom */}
            <div className="flex w-full flex-col gap-2 px-1 font-normal text-[var(--color-black)] md:w-auto md:flex-row md:items-center md:gap-8">
              <p className="text-sm">
                &copy; {new Date().getFullYear()} Kashmir Art & Handicraft
                Collective
              </p>

              <ul className="flex gap-6 text-sm">
                {["Privacy", "Terms", "Sitemap", "Company Details"].map(
                  (item, idx) => (
                    <li
                      key={idx}
                      className="cursor-default text-[var(--color-black)] md:list-disc"
                    >
                      {item}
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </ContentWrapper>
    </div>
  );
};

export default Footer;
