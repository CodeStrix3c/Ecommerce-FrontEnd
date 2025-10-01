import { useState } from "react";
import SecondarySearchBar from "@/components/shared/SecondarySearchBar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import OrchardBottom from "@/components/shared/OrchardBottom";
import OrchardCards from "@/components/shared/OrchardCards";

const DropdownMenus = () => {
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

  const [menuOpen, setMenuOpen] = useState(cardsData.map(() => false));

  const toggleMenu = (index) => {
    const newMenuOpen = [...menuOpen];
    newMenuOpen[index] = !newMenuOpen[index];
    setMenuOpen(newMenuOpen);
  };

  // Labels for OrchardBottom
  const orchardStats = [
    { label: "Total Trees", value: "500" },
    { label: "Total Acres", value: "30" },  
  ];

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

      {/* Orchard Cards */}
      <OrchardCards cardsData={cardsData} />

      {/* Summary Box */}
      <div className="mt-8">
        <OrchardBottom title="Orchard Summary" details={orchardStats} />
      </div>
    </div>
  );
};

export default DropdownMenus;
