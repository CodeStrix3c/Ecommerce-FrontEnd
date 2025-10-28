import { Briefcase } from "lucide-react";
import DetailCard from "./DetailCard";
import DetailItem from "./DetailItem";

const professionDetails = [
  {
    title: "Profession / Occupation",
    subtitle: "Farmer",
    icon: Briefcase,
  },
  {
    title: "Organisation / Employer Name",
    subtitle: "Self Employed / Own Farm",
    icon: Briefcase,
  },
  {
    title: "Designation / Role",
    subtitle: "Agriculturist / Farm Owner",
    icon: Briefcase,
  },
  {
    title: "Years of Experience",
    subtitle: "15+ Years",
    icon: Briefcase,
  },
  {
    title: "Key Skills / Expertise",
    subtitle:
      "Crop Cultivation, Irrigation Management, Soil Health, Organic Farming",
    icon: Briefcase,
  },
];

const ProfessionDetails = () => (
  <DetailCard icon={Briefcase} title="Profession Details">
    {professionDetails.map((item, index) => (
      <DetailItem
        key={index}
        title={item.title}
        subtitle={item.subtitle}
        // icon={item.icon}
      />
    ))}
  </DetailCard>
);
export default ProfessionDetails;
