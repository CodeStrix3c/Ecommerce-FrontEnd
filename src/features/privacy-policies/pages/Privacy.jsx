
import ContentWrapper from "@/components/shared/ContentWrapper";
import React from "react";
import { Link } from "react-router-dom";


export default function PrivacyPolicy() {
  return (
    <ContentWrapper>
      <div className=" min-h-screen py-12 sm:px-10 px-6 ">
        <div className=" space-y-8 justify-start">

          <div className="lg:mt-24">
            <Link
              to="/privacy"
              className="text-4xl font-semibold text-black hover:underline"

            >

              Art&Craft Privacy
            </Link>
          </div>



          <div className="space-y-6 text-black text-[15px] leading-relaxed justify-start ">

            <p>
              We firmly believe in your privacy and the security of your personal
              information. We do not rent, sell, or distribute our customer base or
              newsletter emails to anyone. Your privacy is important to us.:contentReference
            </p>

            <div>
              <h2 className="font-semibold text-lg text-black mb-2 inline-block border-b border-black">
                Personal Information We Collect
              </h2>
              <p>
                We collect your personal information when you provide it to us as you
                place your order, including your name, shipping and billing address,
                email address, and any other details you submit. We use this
                information to process your order, provide support, and update you
                about your order. We do not sell your personal information to other
                parties.:contentReference
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-lg text-black mb-2 inline-block border-b border-black ">
                Anonymous Information
              </h2>
              <p>
                We also collect non-personal information from you, including your
                browser type, the URL of the previous site you visited, your ISP,
                operating system, etc. This information is anonymous and is used to
                analyze trends, administer the site, track user movements, and gather
                demographic data about our user base.:contentReference
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-lg text-black mb-2 inline-block border-b border-black">
                Cookies
              </h2>
              <p>
                Like almost all e-commerce sites, we use cookies. Our cookies do not
                store your personal information, but they help us keep items in your
                cart during your visit and personalize your experience. We may also
                use selected third-party tools for marketing and analytics.:contentReference
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-lg text-black mb-2 inline-block border-b border-black ">
                Security
              </h2>
              <p>
                We follow best practices to protect your information, including
                physical and electronic security measures. We use SSL technology to
                encrypt your private data during order placement so it cannot be
                read by others.:contentReference
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-lg text-black mb-2 inline-block border-b border-black ">
                Information We Don’t Collect
              </h2>
              <p>
                We do not retain your credit/debit card information on our servers —
                that data goes directly to a secure third-party payment gateway and
                is not stored with us.:contentReference
              </p>
            </div>

            <div>
              <h2 className="font-semibold text-lg text-black mb-2 inline-block border-b border-black ">
                Final Disclaimer
              </h2>
              <p>
                Although we use security measures to protect your personal
                information, we cannot guarantee complete protection. Any data you
                provide is at your own risk.:contentReference
              </p>
            </div>

          </div>


          <div className="border-t pt-4 text-black text-[15px] space-y-2">
            <p className="font-semibold">Get in Touch</p>
            <p>Artcraft Decor Pvt Ltd</p>
            <p>381 Pace City 2, Sector 37, Gurgaon, India, 122001</p>
            <p>Email: <span className="text-[var(--color-secondary)]">info@artcraftdecor.com</span></p>
            <p>Phone: +91 9990737679</p>
          </div>


        </div>

      </div>
    </ContentWrapper>


  );
}