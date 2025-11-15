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
import { Link } from "react-router-dom";

const FarmerProfilePage = () => {
  return (
    <div className="lg:pt-36 lg:p-8 flex items-center justify-center font-sans">
      {/* Main Card Container */}
      <div className="lg:rounded-sm lg:shadow-sm w-full  max-w-6xl overflow-hidden bg-[var(--color-white)]">
        <div className="w-full border-b border-[var(--color-gray)] px-1 py-4 flex justify-between items-center bg-[var(--color-white)]">
          <SectionTitle
            title="Supplier Profile"
            className="lg:font-bold lg:text-2xl "
          />
          <div className="flex items-center space-x-4">
            <Link to="/supplier-profile-completion" className="px-2 py-2 text-sm font-medium text-[var(--color-white)] bg-[var(--color-secondary)] rounded-sm hover:bg-[var(--color-secondary-hover)] transition-colors">
              Complete Your Profile
            </Link>
            <div className="relative group">
              <div
                className="p-2 border rounded-full cursor-pointer hover:bg-[var(--color-gray)]"
                title="Settings"
              >
                <Settings className="w-5 h-5 text-[var(--color-black)]" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[280px_1fr]">
          <div className="flex flex-col mt-0 lg:mt-8 md:mt-2">
            <ImageBanner
              imageSrc="assets/images/supplierPro.png"
              altText="Farmer field background"
              logoSrc="https://placehold.co/24x24/ffffff/000000?text=I"
              height="h-[310px]"
            />
            <ProfileSidebar userData={supplierInfo} icon={BadgeCheckIcon} />
          </div>

          <div className="p-2 lg:p-8 space-y-10">
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
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
      </div>
    </div>
  );
};

export default FarmerProfilePage;
