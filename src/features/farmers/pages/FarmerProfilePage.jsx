import React from "react";
import {
  Briefcase,
  Calendar,
  Circle,
  GraduationCap,
  MapPin,
  Phone,
  Settings,
} from "lucide-react";
import ProfileSidebar from "@/components/shared/profileComponents/ProfileSidebar";
import AddressDetails from "@/components/shared/profileComponents/AddressCard";
import ProfessionDetails from "@/components/shared/profileComponents/ProfessionalDetailsCard";
import SectionTitle from "@/components/shared/SectionTitle";
import EducationDetailsCard from "@/components/shared/profileComponents/EducationDetailsCard";
import ImageBanner from "@/components/shared/profileComponents/ImageComponent";
import { Email } from "@mui/icons-material";
import {
  farmerAddress,
  farmerData,
  farmerEducation,
  farmerProfession,
} from "@/features/suppliers/pages/DummyData";
import { Link } from "react-router-dom";

const FarmerProfilePage = () => {
  return (
    <div className="lg:pt-36 lg:p-8 flex items-center justify-center font-sans">
      {/* Main Card Container */}
      <div className="lg:rounded-sm lg:shadow-sm w-full max-w-6xl overflow-hidden bg-[var(--color-white)]">
        {/* ✅ Full-width Header */}
        <div className="w-full border-b border-[var(--color-gray)] px-1 py-4 flex justify-between items-center bg-[var(--color-white)]">
          <SectionTitle
            title="Farmer Profile"
            className="lg:font-bold lg:text-2xl"
          />
        <div className="flex items-center space-x-4">
               <Link to="/farmer-profile-completion" className="px-2 py-2 text-sm font-medium text-[var(--color-white)] bg-[var(--color-secondary)] rounded-sm hover:bg-[var(--color-secondary-hover)] transition-colors">
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

        {/* ✅ Main Grid Layout */}
        <div className="grid md:grid-cols-[280px_1fr]">
          {/* LEFT COLUMN */}
          <div className="flex flex-col mt-0 lg:mt-8 md:mt-2">
            {/* Reusable Banner on Top */}
            <ImageBanner
              imageSrc="assets/images/farmerPro.png"
              altText="Farmer field background"
              logoSrc="https://placehold.co/24x24/ffffff/000000?text=I"
              height="h-[310px]"
            />

            {/* Sidebar Details Below */}
            <ProfileSidebar userData={farmerData} />
          </div>

          {/* RIGHT COLUMN */}
          <div className="p-2 lg:p-8 space-y-10">
            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
              {/* Left Side */}
              <div className="space-y-8">
                <AddressDetails addressData={farmerAddress} />
                <EducationDetailsCard educationData={farmerEducation} />
              </div>

              {/* Right Side */}
              <div className="space-y-8 lg:space-y-8 md:space-y-0">
                <ProfessionDetails professionData={farmerProfession} />
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
