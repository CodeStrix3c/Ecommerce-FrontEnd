import { MapPin } from "lucide-react";
import DetailCard from "./DetailCard";
import DetailItem from "./DetailItem";

const addressDetails = [
  {
    title: "Village/Town",
    value: "Ari Gutan",
    icon: MapPin,
  },
  {
    title: "Tehsil",
    value: "Kulgam",
    icon: MapPin,
  },
  {
    title: "District",
    value: "Kulgam",
    icon: MapPin,
  },
  {
    title: "State",
    value: "Jammu and Kashmir",
    icon: MapPin,
  },
  {
    title: "Pincode",
    value: "235423",
    icon: MapPin,
  },
  {
    title: "Orchard Location",
    value: "32.6579112, 75.5043761",
    icon: MapPin,
  },
];

const AddressDetails = () => (
  <DetailCard
  icon={MapPin}
    title="Address Details"
    headerButton={
        false
    //   <button className="text-sm font-medium text-[var(--color-secondary)] hover:text-[var(--color-secondary-hover)] transition-colors">
    //     Edit Address
    //   </button>
    }
  >
    {addressDetails.map((item, index) => (
      <DetailItem
        key={index}
        title={item.title}
        value={item.value}
        // icon={item.icon}
      />
    ))}

  </DetailCard>
);
export default AddressDetails;
