import { GraduationCap } from "lucide-react";
import DetailCard from "./DetailCard";
import DetailItem from "./DetailItem";

const educationDetails = [
  {
    title: "Highest Qualification",
    value: "Diploma in Agriculture",
    icon: GraduationCap,
  },
  {
    title: "Institute / University Name",
    value: "Sher-e-Kashmir University of Agricultural Sciences and Technology",
    icon: GraduationCap,
  },
  {
    title: "Year of Passing",
    value: "2010",
    icon: GraduationCap,
  },
  {
    title: "Specialization / Major",
    value: "Crop Production and Soil Management",
    icon: GraduationCap,
  },
];

const EducationDetails = () => (
  <DetailCard
    icon={GraduationCap}
    title="Education Details"
    headerButton={
        false
    //   <button className="px-5 py-1 text-sm font-medium text-[var(--color-white)] bg-[var(--color-secondary)] rounded-lg hover:bg-[var(--color-secondary-hover)] transition-colors">
    //     View
    //   </button>
    }
  >
    {educationDetails.map((item, index) => (
      <DetailItem
        key={index}
        title={item.title}
        subtitle={item.value}
        // icon={item.icon}
      />
    ))}
  </DetailCard>
);
export default EducationDetails;
