// ProfessionDetailsCard.jsx
import { Briefcase } from "lucide-react";
import DetailCard from "./DetailCard";
import DetailItem from "./DetailItem";

const ProfessionDetailsCard = ({ professionData, title = "Profession Details",icon: Icon}) => {
  return (
    <DetailCard
      icon={Icon}
      title={title}
      headerButton={false}
    >
      {professionData.map((item, index) => (
        <DetailItem
          key={index}
          title={item.title}
          subtitle={item.subtitle}
          icon={item.icon } // fallback icon
        />
      ))}
    </DetailCard>
  );
};

export default ProfessionDetailsCard;
