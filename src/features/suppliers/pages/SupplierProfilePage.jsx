import React from "react";
import {
  MapPin,
  Settings,
  BadgeCheck,
  Boxes,
  FileText,
  HelpCircle,
  BadgeCheckIcon,
} from "lucide-react";
import ProfileSidebar from "@/components/shared/profileComponents/ProfileSidebar";
import AddressDetails from "@/components/shared/profileComponents/AddressCard";
import ProfessionDetails from "@/components/shared/profileComponents/ProfessionalDetailsCard";
import SectionTitle from "@/components/shared/SectionTitle";
import EducationDetailsCard from "@/components/shared/profileComponents/EducationDetailsCard";
import ImageBanner from "@/components/shared/profileComponents/ImageComponent";
import {
  farmerLicenceDetails,
  operationalDetails,
  productPortfolio,
  supplierAddress,
  supplierInfo,
  supportAndServices,
} from "./DummyData";

const FarmerProfilePage = () => {
  return (
    <div className="lg:pt-36 lg:p-8 flex items-center justify-center font-sans">
      {/* Main Card Container */}
      <div className="lg:rounded-sm lg:shadow-sm w-full  max-w-6xl overflow-hidden bg-white">
        <div className="w-full border-b border-gray-100 px-6 py-4 flex justify-between items-center bg-white">
          <SectionTitle
            title="Supplier Profile"
            className="lg:font-bold lg:text-2xl"
          />
          <div className="flex items-center space-x-4">
            <button className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-secondary)] rounded-sm hover:bg-[var(--color-secondary-hover)] transition-colors">
              Complete Your Profile
            </button>
            <div className="relative group">
              <div className="p-2 border rounded-full cursor-pointer hover:bg-[var(--color-gray)]">
                <Settings className="w-5 h-5 text-[var(--color-black)]" />
              </div>
              <span className="absolute left-1/2 -translate-x-1/2  hidden group-hover:block text-[var(--color-black)] text-sm py-1 px-2">
                Settings
              </span>
            </div>
          </div>
        </div>

        {/* Main Grid Layout */}
        <div className="grid md:grid-cols-[280px_1fr]">
          {/* LEFT COLUMN */}
          <div className="flex flex-col mt-0 lg:mt-8 md:mt-2">
            <ImageBanner
              imageSrc="assets/images/supplierPro.png"
              altText="Farmer field background"
              logoSrc="https://placehold.co/24x24/ffffff/000000?text=I"
              height="h-[310px]"
            />
            <ProfileSidebar userData={supplierInfo} icon={BadgeCheckIcon} />
          </div>

          {/* RIGHT COLUMN */}
          <div className="p-2 lg:p-8 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
              {/* Left Side */}
              <div className="space-y-8">
                <AddressDetails
                  title="Address Details"
                  icon={MapPin}
                  addressData={supplierAddress}
                />

                <AddressDetails
                  title="Licence Details"
                  icon={BadgeCheck}
                  addressData={farmerLicenceDetails}
                />

                <EducationDetailsCard
                  icon={Boxes}
                  title="Product Portfolio"
                  educationData={productPortfolio}
                />
              </div>

              {/* Right Side */}
              <div className="space-y-8 lg:space-y-8 md:space-y-0">
                <ProfessionDetails
                  icon={FileText}
                  title="Operational Details"
                  professionData={operationalDetails}
                />

                <ProfessionDetails
                  icon={HelpCircle}
                  title="Support & Services"
                  professionData={supportAndServices}
                />
              </div>
            </div>
          </div>
        </div>
        {/* End Grid */}
      </div>
    </div>
  );
};

export default FarmerProfilePage;
