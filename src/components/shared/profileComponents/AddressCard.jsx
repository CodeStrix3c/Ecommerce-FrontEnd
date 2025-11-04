// AddressDetails.jsx
import { MapPin } from "lucide-react";
import DetailCard from "./DetailCard";
import DetailItem from "./DetailItem";
import { icon } from "leaflet";

const AddressDetails = ({ addressData, title = "Address Details", icon: Icon}) => {
  return (
    <DetailCard
      icon={Icon}
      title={title}
      headerButton={false}
    >
      {addressData.map((item, index) => (
        <DetailItem
          key={index}
          title={item.title}
          value={item.value}
          icon={item.icon } 
        />
      ))}
    </DetailCard>
  );
};

export default AddressDetails;
