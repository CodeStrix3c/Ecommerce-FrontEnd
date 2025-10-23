
import { AccountCircle, Menu } from "@mui/icons-material";
import { Globe, LeafIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";

function Subheader() {
  const [showText, setShowText] = useState(false);
  const [searchText, setSearchText] = useState("");

  return (
    <div className="pt-36 px-4 w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-2">
          <LeafIcon size={28} />
          <p className="font-medium text-xl">Help Center</p>
        </div>

        <div className="flex items-center space-x-3">
          <Globe size={20} />
          <div className="border rounded-2xl px-4 py-2 flex items-center space-x-3">
            <Menu />
            <AccountCircle />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center text-5xl font-semibold pt-4">
        Hi, how can we help?
      </div>

      {/* Search Bar */}
      <div className="flex bg-[var-(--color--white)] border rounded-full w-4/12 py-3 mt-6 text-center font-medium mx-auto items-center justify-between px-4">
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search how-tos and more"
          className="flex-1 bg-transparent outline-none ms-4"
        />

        <div
        className={`flex items-center bg-[-var(--color-secondary)] text-[var-(--color--white)] p-3 rounded-3xl cursor-pointer transition-all duration-300 {
            showText ? "w-28 justify-around" : "w-10 justify-center"
          }`}
          onClick={() => setShowText(!showText)}
        >
          <SearchIcon size={16} />
          {showText && <span className="ml-1">Search</span>}
        </div>
      </div>
    </div>
  );
}

export default Subheader;
