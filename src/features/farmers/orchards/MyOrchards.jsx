// import { useState } from "react";
// import Tabs from "../componets/Tabs";
// import LandDemographics from "../componets/LandDemographics";
// import LandHoldings from "../componets/LandHoldings";
// import AddressSection from "../componets/AddressSection";
// import FarmMedia from "../componets/FarmMedia";
// import CustomButton from "@/components/ui/CustomButton";
// import { Navigate, useNavigate } from "react-router-dom";
// import SelectField from "@/components/shared/custom-inputs/SelectField";
// import { set } from "zod";
// import Popup from "@/components/shared/Popup";
// import OrchardRegistration from "@/features/orchard-registration/OrchardRegistration";

// export default function MyOrchards() {
//   const [orchardPopupOpen, setOrchardPopupOpen] = useState(false);
//   const orchards = [
//     {
//       id: 1,
//       name: "Orchard A",
//       landDemographics: {
//         orchardSize: "5 Acres",
//         farmSize: "25 Kanals",
//         mainCrops: "Apples, Maize, Wheat",
//         ownershipType: "Owned",
//       },
//       landHoldings: {
//         soilType: "Loamy Soil",
//         irrigation: "Drip Irrigation",
//         environment: "Temperate (20-28°C)",
//         topography: "Plain",
//       },
//       address: {
//         village: "Rampur",
//         tehsil: "Karnal Tehsil",
//         district: "Karnal",
//         state: "Haryana",
//         pinCode: "132001",
//         gps: "29.6857° N, 76.9905° E",
//       },
//       media: {
//         images: [
//           "https://images.unsplash.com/photo-1620901433789-1d2f85a93653?w=600",
//           "https://plus.unsplash.com/premium_photo-1686269460898-740cc9281b0f?w=600",
//           "https://images.unsplash.com/photo-1527847263472-aa5338d178b8?w=600",
//           "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=600",
//         ],
//         videos: ["https://www.w3schools.com/html/mov_bbb.mp4"],
//       },
//     },
//     {
//       id: 2,
//       name: "Orchard B",
//       landDemographics: {
//         orchardSize: "3 Acres",
//         farmSize: "15 Kanals",
//         mainCrops: "Pears, Rice",
//         ownershipType: "Leased",
//       },
//       landHoldings: {
//         soilType: "Clay Soil",
//         irrigation: "Canal Irrigation",
//         environment: "Subtropical",
//         topography: "Hilly",
//       },
//       address: {
//         village: "Anantnag",
//         district: "Anantnag",
//         state: "Jammu & Kashmir",
//         pinCode: "192101",
//         gps: "33.7312, 75.1487", // 👉 Anantnag coordinates
//       },
//       media: {
//         images: [
//           "https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?w=600",
//           "https://images.unsplash.com/photo-1590682680695-43b964a3ae17?w=600",
//           "https://images.unsplash.com/photo-1620901433789-1d2f85a93653?w=600",
//           "https://plus.unsplash.com/premium_photo-1686269460898-740cc9281b0f?w=600",
//         ],
//         videos: ["https://samplelib.com/lib/preview/mp4/sample-10s.mp4"],
//       },
//     },
//   ];

//   const [selectedOrchardId, setSelectedOrchardId] = useState(orchards[0].id);
//   const [activeTabs, setActiveTabs] = useState({});
//   const navigate = useNavigate();

//   const handleTabChange = (orchardId, tab) => {
//     setActiveTabs((prev) => ({ ...prev, [orchardId]: tab }));
//   };

//   const selectedOrchard = orchards.find(
//     (orchard) => orchard.id === selectedOrchardId
//   );
//   const activeTab = activeTabs[selectedOrchard.id] || "land";

//   return (
//     <>
//       <div className="w-full md:mt-20 lg:mt-28 px-5 sm:px-6">
//         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
//           <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-black)]">
//             {" "}
//             My Orchards
//           </h1>

//           <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
//             <div className="flex-1 min-w-[150px]">
//               <SelectField
//                 name="orchardSelect"
//                 label="Select Orchard"
//                 options={orchards.map((o) => ({ label: o.name, value: o.id }))}
//                 value={selectedOrchardId}
//                 onChange={(e) => setSelectedOrchardId(Number(e.target.value))}
//                 optional={null}
//               />
//             </div>

//             <CustomButton
//               varient="contained"
//               text="Add Orchard"
//               onClick={() => setOrchardPopupOpen(true)}
//               className="
//               mt-2 sm:mt-0
//               px-3 py-1.5
//               rounded-md
//               text-sm
//               font-medium
//               text-[var(--color-white)]
//               bg-[var(--color-primary)]
//               hover:bg-[var(--color-primary-hover)]
//               transition-colors duration-200
//               flex-shrink-0
//             "
//             />
//           </div>
//         </div>

//         {selectedOrchard && (
//           <div className="rounded-xl shadow-lg bg-[var(--color-white)] transition-all duration-300 hover:shadow-2xl">
//             <div className="p-6 border-b border-gray-200">
//               <h2 className="text-xl md:text-2xl font-semibold text-[var(--color-black)]">
//                 {selectedOrchard.name}
//               </h2>
//               <p className="text-sm md:text-base text-gray-600 mt-1">
//                 {selectedOrchard.landDemographics.mainCrops}
//               </p>
//             </div>

//             <div className="px-4 sm:px-6 pt-4">
//               <Tabs
//                 activeTab={activeTab}
//                 setActiveTab={(tab) => handleTabChange(selectedOrchard.id, tab)}
//               />
//             </div>

//             <div className="px-4 sm:px-6 py-6 mb-5">
//               {activeTab === "land" && (
//                 <LandDemographics land={selectedOrchard.landDemographics} />
//               )}
//               {activeTab === "holdings" && (
//                 <LandHoldings holdings={selectedOrchard.landHoldings} />
//               )}
//               {activeTab === "address" && (
//                 <AddressSection address={selectedOrchard.address} />
//               )}
//               {activeTab === "media" && (
//                 <FarmMedia media={selectedOrchard.media} />
//               )}
//             </div>
//           </div>
//         )}
//       </div>
//       <Popup open={orchardPopupOpen} onClose={() => setOrchardPopupOpen(false)}>
//         <OrchardRegistration />
//       </Popup>
//       ;
//     </>

//   );
// }

import { useState } from "react";
import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { MoreVertical, Edit, Trash2, X } from "lucide-react";
import OrchardBottom from "@/components/shared/OrchardBottom";

const cardsData = [
  {
    Title: "Apple",
    variety: "kullu",
    Location: "pulwama",
    Acres: "10 acres",
    Trees: "100 Trees",
    Details: "View Details",
    image:
      "https://media.istockphoto.com/id/2183999220/photo/rolling-soybean-field-with-red-barn-central-wisconsin.webp?a=1&b=1&s=612x612&w=0&k=20&c=PRrck7ACz14UT20RfBTD5Coyb6W7zdKd_7zc1JLfceI=",
  },
  {
    Title: "Walnuts",
    variety: "california",
    Location: "pulwama",
    Acres: "10 acres",
    Trees: "200 Trees",
    Details: "View Details",
    image:
      "https://t3.ftcdn.net/jpg/05/06/30/80/360_F_506308027_CDz21VQ7ed6seYBiFElgoTnWdc5I2plg.jpg",
  },
  {
    Title: "Apricot",
    variety: "ladakh",
    Location: "pulwama",
    Acres: "10 acres",
    Trees: "200 Trees",
    Details: "View Details",
    image:
      "https://images.pexels.com/photos/1574547/pexels-photo-1574547.jpeg?cs=srgb&dl=pexels-jplenio-1574547.jpg&fm=jpg",
  },
];

const DropdownMenus = () => {
  const [menuOpen, setMenuOpen] = useState(cardsData.map(() => false));

  const toggleMenu = (index) => {
    const newMenuOpen = [...menuOpen];
    newMenuOpen[index] = !newMenuOpen[index];
    setMenuOpen(newMenuOpen);
  };

  return (
    <div className="pt-20 md:pt-40 px-4">
      {/* Top Row with Dropdowns + Search */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center w-full gap-4">
        {/* Left side: Dropdowns */}
        <div className="flex gap-4 flex-wrap md:flex-nowrap flex-1">
          {/* Fruits Dropdown */}
          <div className="relative w-full sm:w-auto">
            <input type="checkbox" id="fruits" className="peer hidden" />
            <label
              htmlFor="fruits"
              className="flex items-center justify-between px-4 py-2 bg-[var(--color-black-hover)] text-[var(--color-black)] rounded-md cursor-pointer w-full"
            >
              <span>All Fruits</span>
              <ArrowDropDownIcon />
            </label>
            <div className="absolute left-0 mt-2 min-w-[150px] bg-[var(--color-white)] shadow-md rounded-md hidden peer-checked:block z-10">
              <ul className="p-2">
                <li className="px-2 py-1 hover:bg-[var(--color-black-hover)] hover:text-white cursor-pointer rounded">
                  Apple
                </li>
                <li className="px-2 py-1 hover:bg-[var(--color-black-hover)] hover:text-white cursor-pointer rounded">
                  Walnut
                </li>
                <li className="px-2 py-1 hover:bg-[var(--color-black-hover)] hover:text-white cursor-pointer rounded">
                  Apricot
                </li>
              </ul>
            </div>
          </div>

          {/* Status Dropdown */}
          <div className="relative w-full sm:w-auto">
            <input type="checkbox" id="status" className="peer hidden" />
            <label
              htmlFor="status"
              className="flex items-center justify-between px-4 py-2 bg-[var(--color-black-hover)] text-[var(--color-black)] rounded-md cursor-pointer w-full"
            >
              <span>All Status</span>
              <ArrowDropDownIcon />
            </label>
            <div className="absolute right-0 mt-2 min-w-[150px] bg-[var(--color-white)] shadow-md rounded-md hidden peer-checked:block z-10">
              <ul className="p-2">
                <li className="px-2 py-1 hover:bg-[var(--color-black-hover)] hover:text-white cursor-pointer rounded">
                  Harvesting
                </li>
                <li className="px-2 py-1 hover:bg-[var(--color-black-hover)] hover:text-white cursor-pointer rounded">
                  Flowering
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Right side: Search bar */}
        <div className="w-full md:w-auto">
          <SecondarySearchBar />
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 pt-4">
        {cardsData.map((card, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden relative"
          >
            <img
              className="w-full h-48 sm:h-60 object-cover"
              src={card.image}
              alt={card.Title}
            />
            <div className="absolute top-3 left-3">
              <p className="px-3 py-1 text-xs sm:text-sm font-semibold bg-[var(--color-black-hover)] text-[var(--color-primary)] rounded-lg shadow-md">
                Growing Button
              </p>
            </div>
            <div className="absolute top-3 right-3">
              <button
                onClick={() => toggleMenu(index)}
                className="p-2 rounded-full bg-[var(--color-black-hover)] text-black shadow"
              >
                <MoreVertical size={20} />
              </button>

              {menuOpen[index] && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg border z-10">
                  <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <Edit size={18} /> Edit
                  </button>
                  <button className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-gray-100">
                    <Trash2 size={18} /> Delete
                  </button>
                  <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                    <X size={18} /> Cancel
                  </button>
                </div>
              )}
            </div>

            <div className="p-4">
              {/* Title and variety */}
              <div className="flex flex-col">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-semibold text-[var(--color-black)]">
                    {card.Title}
                  </h3>
                  <p className="text-xs text-[var(--color-secondary)] bg-[var(--color-black-hover)] border rounded-lg px-2 py-1">
                    {card.variety}
                  </p>
                </div>
                <p className="text-sm text-[var(--color-black)] mt-1">
                  {card.Location}
                </p>
              </div>

              {/* Acres and details */}
              <div className="flex justify-between items-center mt-2">
                <p className="text-sm text-[var(--color-black)]">
                  {card.Acres}
                </p>
                <button className="text-sm text-[var(--color-primary)]">
                  {card.Details}
                </button>
              </div>

              {/* Trees */}
              <div className="flex justify-center mt-2">
                <p className="text-sm text-gray-600">{card.Trees}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <OrchardBottom />
      </div>
    </div>
  );
};

export default DropdownMenus;

