import React from "react";
import { Pencil } from "lucide-react";

export default function SupplierProfile({ imageUrl, onEdit }) {
  return (
    <div className="relative w-24 h-24 sm:w-36 sm:h-36  sm:mx-0 md:mt-28 lg:mt-8 ">
      
      <img
        src="https://plus.unsplash.com/premium_photo-1690407617686-d449aa2aad3c?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
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
