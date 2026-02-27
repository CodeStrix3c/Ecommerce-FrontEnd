import React from "react";
import { Globe } from "lucide-react";
import { Link } from "react-router-dom";
import ContentWrapper from "./shared/ContentWrapper";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="flex w-full justify-center bg-[var(--color-black-hover)] pb-8 mt-10">
      <ContentWrapper>
        <div className="flex w-full flex-col items-end">

          {/* Top Grid Section */}
          <div className="grid w-full grid-cols-2 gap-10 py-8 text-sm md:grid-cols-3">

            {/* About */}
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
                  className="font-normal text-[var(--color-black)]"
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
                  className="font-normal text-[var(--color-black)]"
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
                  className="font-normal text-[var(--color-black)]"
                >
                  {item}
                </p>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="my-4 w-full border-t border-[var(--color-black)]"></div>

          {/* Bottom Section */}
          <div className="flex w-full flex-col items-center justify-between gap-4 md:gap-0 lg:flex-row">

            {/* Language & Social */}
            <div className="mt-4 flex w-full justify-between gap-10 md:order-last md:w-auto">
              <div className="flex items-center gap-2 text-sm font-semibold text-[var(--color-black)]">
                <Globe className="h-6 w-6" />
                English(IN) <span className="mx-4">₹ INR</span>
              </div>

              <div className="flex gap-3 text-[var(--color-black)]">
                <FaFacebook className="w-6 h-6 text-[#1877F2] cursor-pointer hover:scale-110 transition" />
                <FaLinkedin className="w-6 h-6 text-[#0A66C2] cursor-pointer hover:scale-110 transition" />
                <FaInstagram className="w-6 h-6 text-[#E4405F] cursor-pointer hover:scale-110 transition" />
                <FaXTwitter className="w-6 h-6 text-black cursor-pointer hover:scale-110 transition" />
              </div>
            </div>

            {/* Copyright + Links */}
            <div className="flex w-full flex-col gap-2 px-1 font-normal text-[var(--color-black)] md:w-auto md:flex-row md:items-center md:gap-8">

              <p className="text-sm">
                &copy; {new Date().getFullYear()} Kashmir Art & Handicraft Collective
              </p>

              <ul className="flex gap-6 text-sm">

                <li>
                  <Link
                    to="/privacy"
                    className="hover:underline hover:text-black transition"
                  >
                    Privacy
                  </Link>
                </li>

                <li>
                  <Link
                    to="/terms"
                    className="hover:underline hover:text-black transition"
                  >
                    Terms
                  </Link>
                </li>

                <li>
                  <Link
                    to="/sitemap"
                    className="hover:underline hover:text-black transition"
                  >
                    Sitemap
                  </Link>
                </li>

                <li>
                  <Link
                    to="/company-details"
                    className="hover:underline hover:text-black transition"
                  >
                    Company Details
                  </Link>
                </li>

              </ul>
            </div>

          </div>

        </div>
      </ContentWrapper>
    </div>
  );
};

export default Footer;