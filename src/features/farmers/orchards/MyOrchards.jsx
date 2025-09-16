import { useState } from "react";
import Tabs from "../componets/Tabs";
import LandDemographics from "../componets/LandDemographics";
import LandHoldings from "../componets/LandHoldings";
import AddressSection from "../componets/AddressSection";
import FarmMedia from "../componets/FarmMedia";
import CustomButton from "@/components/ui/CustomButton";
import SelectField from "@/components/ui/SelectField";

export default function MyOrchards() {
  const orchards = [
    {
      id: 1,
      name: "Orchard A",
      landDemographics: {
        orchardSize: "5 Acres",
        farmSize: "25 Kanals",
        mainCrops: "Apples, Maize, Wheat",
        ownershipType: "Owned",
      },
      landHoldings: {
        soilType: "Loamy Soil",
        irrigation: "Drip Irrigation",
        environment: "Temperate (20-28°C)",
        topography: "Plain",
      },
      address: {
        village: "Rampur",
        tehsil: "Karnal Tehsil",
        district: "Karnal",
        state: "Haryana",
        pinCode: "132001",
        gps: "29.6857° N, 76.9905° E",
      },
      media: {
        images: [
          "https://images.unsplash.com/photo-1620901433789-1d2f85a93653?w=600",
          "https://plus.unsplash.com/premium_photo-1686269460898-740cc9281b0f?w=600",
          "https://images.unsplash.com/photo-1527847263472-aa5338d178b8?w=600",
          "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=600",
        ],
        videos: ["https://www.w3schools.com/html/mov_bbb.mp4"],
      },
    },
    {
      id: 2,
      name: "Orchard B",
      landDemographics: {
        orchardSize: "3 Acres",
        farmSize: "15 Kanals",
        mainCrops: "Pears, Rice",
        ownershipType: "Leased",
      },
      landHoldings: {
        soilType: "Clay Soil",
        irrigation: "Canal Irrigation",
        environment: "Subtropical",
        topography: "Hilly",
      },
   address: {
  village: "Anantnag",
  district: "Anantnag",
  state: "Jammu & Kashmir",
  pinCode: "192101",
  gps: "33.7312, 75.1487" // 👉 Anantnag coordinates
},
      media: {
        images: [
          "https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?w=600",
          "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=600",
          "https://images.unsplash.com/photo-1620901433789-1d2f85a93653?w=600",
          "https://plus.unsplash.com/premium_photo-1686269460898-740cc9281b0f?w=600"
        ],
        videos: ["https://samplelib.com/lib/preview/mp4/sample-10s.mp4"],
      },
    },
  ];

  const [selectedOrchardId, setSelectedOrchardId] = useState(orchards[0].id);
  const [activeTabs, setActiveTabs] = useState({});

  const handleTabChange = (orchardId, tab) => {
    setActiveTabs((prev) => ({ ...prev, [orchardId]: tab }));
  };

  const handleAddOrchard = () => alert("Open Add Orchard Form here!");

  const selectedOrchard = orchards.find(
    (orchard) => orchard.id === selectedOrchardId
  );
  const activeTab = activeTabs[selectedOrchard.id] || "land";

  return (
    <div className="w-full md:mt-20 lg:mt-28 px-5 sm:px-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-black)]">
          {" "}
          My Orchards
        </h1>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
          <div className="flex-1 min-w-[150px]">
            <SelectField
              name="orchardSelect"
              label="Select Orchard"
              options={orchards.map((o) => ({ label: o.name, value: o.id }))}
              value={selectedOrchardId}
              onChange={(e) => setSelectedOrchardId(Number(e.target.value))}
              optional={null}
            />
          </div>

          <CustomButton
            varient="contained"
            text="Add Orchard"
            onClick={handleAddOrchard}
            className="
              mt-2 sm:mt-0
              px-3 py-1.5
              rounded-md
              text-sm
              font-medium
              text-[var(--color-white)]
              bg-[var(--color-primary)]
              hover:bg-[var(--color-primary-hover)]
              transition-colors duration-200
              flex-shrink-0
            "
          />
        </div>
      </div>

      {selectedOrchard && (
        <div className="rounded-xl shadow-lg bg-[var(--color-white)] transition-all duration-300 hover:shadow-2xl">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl md:text-2xl font-semibold text-[var(--color-black)]">
              {selectedOrchard.name}
            </h2>
            <p className="text-sm md:text-base text-gray-600 mt-1">
              {selectedOrchard.landDemographics.mainCrops}
            </p>
          </div>

          <div className="px-4 sm:px-6 pt-4">
            <Tabs
              activeTab={activeTab}
              setActiveTab={(tab) => handleTabChange(selectedOrchard.id, tab)}
            />
          </div>

          <div className="px-4 sm:px-6 py-6 mb-5">
            {activeTab === "land" && (
              <LandDemographics land={selectedOrchard.landDemographics} />
            )}
            {activeTab === "holdings" && (
              <LandHoldings holdings={selectedOrchard.landHoldings} />
            )}
            {activeTab === "address" && (
              <AddressSection address={selectedOrchard.address} />
            )}
            {activeTab === "media" && (
              <FarmMedia media={selectedOrchard.media} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}
