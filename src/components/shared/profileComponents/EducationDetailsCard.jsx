// EducationDetailsCard.jsx
import { GraduationCap } from "lucide-react";
import DetailCard from "./DetailCard";
import DetailItem from "./DetailItem";

const EducationDetailsCard = ({ educationData, title = "Education Details", icon: Icon}) => {
  return (
    <DetailCard
      icon={Icon}
      title={title}
      headerButton={false}
    >
      {educationData.map((item, index) => (
        <DetailItem
          key={index}
          title={item.title}
          subtitle={item.value}
          icon={item.icon} 
        />
      ))}
    </DetailCard>
  );
};

export default EducationDetailsCard;
