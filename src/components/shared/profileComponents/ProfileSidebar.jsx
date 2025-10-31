
import SidebarDetails from "./SidebarDetails";
import UserHeaderCard from "./InfoCard";

const ProfileSidebar = ({ userData, icon,title }) => {

  const { name, profileImage, details } = userData;

  return (
    <div className="flex flex-col border-r border-[var(--color-gray)] pb-5">
      {/* Profile Info Header */}
      <UserHeaderCard 
      image={profileImage}
       name={name} 
       icon={icon} 
       title={title}/>

      {/* Sidebar Details */}
      <div className="space-y-1">
        {details.map((item, index) => (
          <SidebarDetails
            key={index}
            title={item.title}
            subtitle={item.subtitle}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};

export default ProfileSidebar;
