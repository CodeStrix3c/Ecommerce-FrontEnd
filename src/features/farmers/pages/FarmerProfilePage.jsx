import React from 'react';
import { User, MapPin, Briefcase, GraduationCap, Key, ChevronDown, Settings } from 'lucide-react';
import ProfileSidebar from '@/components/shared/profileComponents/ProfileSidebar';
import AddressDetails from '@/components/shared/profileComponents/AddressCard';
import EducationDetails from '@/components/shared/profileComponents/educationDetailsCard';
import ProfessionDetails from '@/components/shared/profileComponents/ProfessionalDetailsCard';
import SectionTitle from '@/components/shared/SectionTitle';


const FarmerProfilePage = () => {
  return (
    <div className="lg:pt-36 lg:p-8 flex items-center justify-center font-sans">
      
      {/* Main Card Container */}
      <div className=" lg:rounded-sm lg:shadow-md w-full max-w-6xl overflow-hidden grid md:grid-cols-[280px_1fr]">
        
        {/* LEFT SIDEBAR: Fully encapsulated component */}
       <ProfileSidebar/>

        {/* RIGHT MAIN CONTENT AREA */}
        <div className="p-2 lg:p-8 bg-white space-y-10">
          
          {/* Main Header */}
          <header className="flex justify-between items-center pb-4 border-b border-gray-100">
            {/* <h2 className="text-xl font-bold text-gray-800">Farmer Profile</h2> */}
            <SectionTitle
            title={"Farmer Profile"}
            className='lg:font-bold lg:text-2xl ' 
            />
            <div className="flex items-center space-x-4">
              <button className="px-4 py-2 text-sm font-medium text-white bg-[var(--color-secondary)] rounded-sm hover:bg-[var(--color-secondary-hover)] transition-colors">
                Complete Your Profile
              </button>
              <div className="p-2 border rounded-full">
                <Settings className="w-5 h-5 text-gray-600" />
              </div>
            </div>
          </header>

          {/* Body Content: Two main columns for better responsiveness */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-8">
            
            {/* Left/Top Content Column */}
            <div className="space-y-8">
              <AddressDetails />
              <EducationDetails />
            </div>
            
            {/* Right/Bottom Content Column */}
            <div className="space-y-8 lg:space-y-8 md:space-y-0">
              
              {/* Image Card */}
              <div className="rounded-sm overflow-hidden shadow-lg md:hidden lg:block ">
                <img
                  src="assets/images/farmer3.png"
                  alt="Rural scene"
                  className="w-full object-cover h-[210px]"
                />
              </div>

              <ProfessionDetails />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmerProfilePage;
