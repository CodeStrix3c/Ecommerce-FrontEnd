import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";

export default function ProductSearchBar({
    placeholder = "Search products...",
    onSearch,
}) {
    const [value, setValue] = useState("");


    useEffect(() => {
        const timer = setTimeout(() => {
            onSearch?.(value);
        }, 400);

        return () => clearTimeout(timer);
    }, [value]);


    const handleClear = () => {
        setValue("");
        onSearch?.("");
    };

    return (
        <div className="relative w-full sm:w-72 md:w-80">


            <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-black)]"
            />


            <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder={placeholder}
                className="
          w-full pl-10 pr-10 py-2.5
          rounded-xl border border-[var(--color-gray)] bg-[var(--color-white)]
          focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]
          text-sm
        "
            />


            {value && (
                <button
                    onClick={handleClear}
                    className="
            absolute right-3 top-1/2 -translate-y-1/2
            text-[var(--color-black)] hover:text-[var(--color-primary)]
            transition
          "
                >
                    <X size={18} />
                </button>
            )}
        </div>
    );
}
