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

  // ✅ Mobile
  if (isMobile) {
    return (
      <div className="flex w-full max-w-md items-center rounded-full border-2 border-black bg-[var(--color-white)] px-3 py-2 shadow-md hover:shadow-lg">
        <Search className="h-5 w-5 text-[var(--color-black)]/70" />
        <input
          type="text"
          placeholder="Search pesticides"
          className="ml-2 w-full border-none text-sm text-[var(--color-black)] placeholder-[var(--color-black)] focus:outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
      </div>
    );
  }

  return (
    <div
      className="flex w-11/12 max-w-4xl items-center justify-between rounded-full border border-gray-300 bg-[var(--color-white)] px-4 pt-1 
    shadow-[0_2px_4px_rgba(0,0,0,0.08)] hover:shadow-md transition-shadow duration-200"
    >
      <div className="flex-1 border-r border-[var(--color-black-hover)] px-3">
        <p className="text-xs font-semibold text-[var(--color-black)]">What</p>
        <input
          type="text"
          placeholder="Search pesticides"
          className="w-full border-none text-sm text-[var(--color-black)] placeholder-[var(--color-black)] focus:outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="flex-1 border-r border-[var(--color-black-hover)] px-3">
        <p className="text-xs font-semibold text-[var(--color-black)]">Crop</p>
        <select
          className="w-full bg-transparent text-sm text-[var(--color-black)] focus:outline-none"
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

      <div className="flex-1 border-r border-[var(--color-black-hover)] px-3">
        <p className="text-xs font-semibold text-[var(--color-black)]">
          Region
        </p>
        <select
          className="w-full bg-transparent text-sm text-[var(--color-black)] focus:outline-none"
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

      <div className="flex-1 px-3 max-h-fit py-3">
        <p className="text-xs font-semibold text-[var(--color-black)] mb-1">When</p>
        <span className="text-sm text-[var(--color-black)] ">
          <DatePickerWithRange setDateRange={setDateRange} />
        </span>
      </div>

      <button
        onClick={handleSubmit}
        className="ml-3 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-secondary)] text-[var(--color-white)] shadow-md transition hover:bg-[var(--color-secondary-hover)]"
      >
        <Search className="h-4 w-4" />
      </button>
    </div>
  );
};

export default SearchBar;
