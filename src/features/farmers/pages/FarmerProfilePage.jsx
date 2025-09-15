import { useState } from "react";
import InfoCard from "../componets/InfoCard";
import Tabs from "../componets/Tabs";
import FarmerDetails from "../componets/FarmerDetails";
import LandDemographics from "../componets/LandDemographics";
import LandHoldings from "../componets/LandHoldings";
import AddressSection from "../componets/AddressSection";
import FarmMedia from "../componets/FarmMedia";

export default function FarmerProfilePage() {
  const [activeTab, setActiveTab] = useState("profile");

  const farmer = {
    fullName: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91 9876543210",
    photo: "/assets/images/farmer.jpeg",
    status: "Active",

     media: {
    images: [
      "https://images.unsplash.com/photo-1527847263472-aa5338d178b8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZmFybWVyfGVufDB8fDB8fHww", 
      "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZhcm1lcnxlbnwwfHwwfHx8MA%3D%3D", 
      "https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFybWVyfGVufDB8fDB8fHww", 
    ],
    videos: [
      "https://www.w3schools.com/html/mov_bbb.mp4", 
      "https://samplelib.com/lib/preview/mp4/sample-5s.mp4" 
    ]
  },

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
  };

  return (
    <div className="w-full px-4 sm:px-6 md:mt-20 lg:mt-28">
      <InfoCard farmer={farmer} />

      <div className="pt-8">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

        <div className="mt-6">
          {activeTab === "profile" && (
            <div className="bg-[var(--color-white)] rounded-2xl p-6 shadow-md">
              <FarmerDetails farmer={farmer} />
            </div>
          )}

          {activeTab === "land" && (
            <div className="bg-[var(--color-white)] rounded-2xl p-6 shadow-md">
              <LandDemographics land={farmer.landDemographics} />
            </div>
          )}

          {activeTab === "holdings" && (
            <div className="bg-[var(--color-white)] rounded-2xl p-6 shadow-md">
              <LandHoldings holdings={farmer.landHoldings} />
            </div>
          )}

          {activeTab === "address" && (
            <div className="bg-[var(--color-white)] rounded-2xl p-6 shadow-md mb-5">
              <AddressSection address={farmer.address} />
            </div>
          )}

           {activeTab === "media" && (
            <div className="bg-[var(--color-white)] rounded-2xl p-6 shadow-md">
              <FarmMedia media={farmer.media} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
