import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import useIsMobile from "@/hooks/useInMobile";

const VendorSearchBar = ({ onChange }) => {
    const isMobile = useIsMobile(900);

    const [searchText, setSearchText] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");

    /* ===================== DEBOUNCE ===================== */
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchText);
        }, 400);

        return () => clearTimeout(timer);
    }, [searchText]);

    useEffect(() => {
        onChange?.({ query: debouncedSearch.trim() });
    }, [debouncedSearch, onChange]);

    const clearSearch = () => {
        setSearchText("");
        onChange?.({ query: "" });
    };

    /* ===================== INPUT ===================== */
    const Input = (
        <div className="relative w-full">
            {/* Search icon */}
            <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
                type="text"
                placeholder="Search products"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="
          w-full
          h-9 sm:h-10
          pl-9
          pr-10
          text-sm
          rounded-lg
          border
          border-gray-300
          focus:outline-none
          focus:ring-1
          focus:ring-black
        "
            />

            {/* Clear icon */}
            {searchText && (
                <button
                    onClick={clearSearch}
                    className="
            absolute
            right-2
            top-1/2
            -translate-y-1/2
            h-7
            w-7
            flex
            items-center
            justify-center
          "
                >
                    <X size={16} className="text-gray-400 hover:text-black" />
                </button>
            )}
        </div>
    );

    /* ===================== MOBILE ===================== */
    if (isMobile) {
        return (
            <div className="w-full max-w-full px-2">
                {Input}
            </div>
        );
    }

    /* ===================== DESKTOP ===================== */
    return (
        <div className="w-56">
            {Input}
        </div>
    );
};

export default VendorSearchBar;
