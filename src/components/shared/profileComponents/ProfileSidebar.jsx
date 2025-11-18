
import SidebarDetails from "./SidebarDetails";
import UserHeaderCard from "./InfoCard";
import { User, Phone, Mail, MapPin, Map, Calendar, CircleDot,  } from "lucide-react";

const ProfileSidebar = ({ userData, }) => {


  // console.log(userData?.details,"userDAta");
  const iconMap = {
  person: User,
  phone: Phone,
  email: Mail,
  location: MapPin,
  gps: Map,
  dob: Calendar,    
  gender: CircleDot
};



  return (
    <div className="flex flex-col rounded-sm border border-[var(--color-gray)]  pb-5 mt-4">
      {/* Profile Info Header */}
      <UserHeaderCard 
      image={userData?.profileImage}
       name={userData?.name} 
       icon={userData?.icon} 
       title={userData?.title}
       />

      {/* Sidebar Details */}
      <div className="space-y-1">
      {userData?.details?.map((item, index) => {
  const IconComponent = iconMap[item.icon]; // convert string → icon component

  return (
    <SidebarDetails
      key={index}
      title={item.title}
      subtitle={item.subtitle}
      icon={IconComponent}  // pass actual component
    />
  );
})}
      </div>
    </div>
  );
};

export default ProfileSidebar;
