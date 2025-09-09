import React, { useState } from "react";
import { Search } from "lucide-react";
import useIsMobile from "@/hooks/useInMobile";
import DatePickerWithRange from "../ui/DatePickerWithRange"; // ✅ use your range picker

const crops = ["Wheat", "Rice", "Cotton", "Maize", "Sugarcane"];
const regions = ["Punjab", "Bihar", "Maharashtra", "Haryana", "UP"];

const SearchBar = ({ onSubmit }) => {
  const isMobile = useIsMobile();

  const [searchText, setSearchText] = useState("");
  const [selectedCrop, setSelectedCrop] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [dateRange, setDateRange] = useState(null);

  const handleSubmit = () => {
    if (!searchText && !selectedCrop) {
      alert("Please enter a pesticide or select a crop");
      return;
    }

    onSubmit({
      pesticide: searchText,
      crop: selectedCrop,
      region: selectedRegion,
      when: dateRange,
    });
  };

  if (isMobile) {
    return (
      <div className="flex w-full max-w-md items-center rounded-full border border-gray-200 bg-white px-3 py-2 shadow-md hover:shadow-lg">
        <Search className="h-5 w-5 text-gray-500" />
        <input
          type="text"
          placeholder="Search pesticides"
          className="ml-2 w-full border-none text-sm text-gray-500 placeholder-gray-400 focus:outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
      </div>
    );
  }

  return (
    <div className="flex w-11/12 max-w-4xl items-center justify-between rounded-full border border-gray-200 bg-white px-4 pt-1 shadow-md hover:shadow-lg">
      <div className="flex-1 border-r border-gray-200 px-3">
        <p className="text-xs font-semibold text-[#222222]">What</p>
        <input
          type="text"
          placeholder="Search pesticides"
          className="w-full border-none text-sm text-gray-500 placeholder-gray-400 focus:outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="flex-1 border-r border-gray-200 px-3">
        <p className="text-xs font-semibold text-[#222222]">Crop</p>
        <select
          className="w-full bg-transparent text-sm text-gray-500 focus:outline-none"
          value={selectedCrop}
          onChange={(e) => setSelectedCrop(e.target.value)}
        >
          <option value="">Select crop</option>
          {crops.map((crop) => (
            <option key={crop} value={crop}>
              {crop}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 border-r border-gray-200 px-3">
        <p className="text-xs font-semibold text-[#222222]">Region</p>
        <select
          className="w-full bg-transparent text-sm text-gray-500 focus:outline-none"
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
        >
          <option value="">Select region</option>
          {regions.map((region) => (
            <option key={region} value={region}>
              {region}
            </option>
          ))}
        </select>
      </div>

      <div className="flex-1 px-3">
        <p className="text-xs font-semibold text-[#222222]">When</p>
        <DatePickerWithRange setDateRange={setDateRange} />
      </div>

      <button
        onClick={handleSubmit}
        className="ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#FF5A5F] text-white shadow-md transition hover:bg-[#e14b50]"
      >
        <Search className="h-4 w-4" />
      </button>
    </div>
  );
};

export default SearchBar;
