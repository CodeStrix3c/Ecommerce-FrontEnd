import { Calendar, Phone, Circle } from "lucide-react";
import { Email, Person } from "@mui/icons-material";
import SidebarDetails from "./SidebarDetails";
import UserHeaderCard from "./InfoCard";

const profileDetails = [
  {
    title: "Phone",
    subtitle: "+9199999999999",
    icon: Phone,
  },
  {
    title: "Email",
    subtitle: "demo@gmail.com",
    icon: Email,
  },
  {
    title: "DOB",
    subtitle: "17-10-1955",
    icon: Calendar,
  },
  {
    title: "Gender",
    subtitle: "Male",
    icon: Circle,
  },
];

const ProfileSidebar = () => {
  return (
    <div className="flex flex-col bg-white border-r border-gray-100 pb-5">
      {/* Profile Header Image */}
      <div className="relative h-[310px]">
        <img
          src="assets/images/farmer.png"
          alt="Field background"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 p-2 bg-white/70 backdrop-blur-sm rounded-full">
          <img
            src="https://placehold.co/24x24/ffffff/000000?text=I"
            alt="Logo"
            className="w-6 h-6 rounded-full"
          />
        </div>
      </div>

      <div >
        <UserHeaderCard
        //   title="Farmer Details"
          image="https://placehold.co/24x24/ffffff/000000?text=A"
          name="Abdul Gaffar"
        />

        {/* Sidebar Links */}
        <div className="space-y-1">
          {profileDetails.map((item, index) => (
            <SidebarDetails
              key={index}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
            />
          ))}
        </div>

        {/* Save Button */}
        {/* <button className="pt-5 w-full mt-8 py-3 bg-[var(--color-secondary)] text-white font-semibold rounded-xl hover:bg-green-600 transition-colors shadow-lg shadow-green-200">
          Save Profile
      </button> */}
      </div>
    </div>
  );
};
export default ProfileSidebar;
