import React from "react";
import { Pencil } from "lucide-react";

export default function SupplierProfile({ imageUrl, onEdit }) {
  return (
    <div className="relative w-24 h-24 sm:w-36 sm:h-36  sm:mx-0 md:mt-28 lg:mt-8 ">
      
      <img
        src="https://images.unsplash.com/photo-1718900109613-457f76a456b2?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODd8fHByb2ZpbGV8ZW58MHx8MHx8fDA%3D"
        alt="Profile"
        className="w-full h-full object-cover rounded-full border-2 border-[var(--color-gray)] shadow-md"
      />

     
      <button
        onClick={onEdit}
        className="
          absolute bottom-1 right-1 
          bg-[var(--color-secondary)] 
          text-[var(--color-white)] 
          w-8 h-8 
          flex items-center justify-center 
          rounded-full 
          shadow-md 
          hover:bg-[var(--color-secondary)] 
          transition
        "
      >
        <Pencil size={16} />
      </button>
    </div>
  );
}
