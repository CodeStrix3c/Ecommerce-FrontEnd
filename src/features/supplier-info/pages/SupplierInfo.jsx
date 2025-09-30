import React from "react";
import SupplierProfile from "../components/SupplierProfile";
import SupplierDetails from "../components/SupplierDetails";

export default function SupplierInfo({}) {
  return (
    <div className="flex flex-col lg:mt-32 sm:flex-row items-center sm:items-start gap-6 bg-[var(--color-white)] rounded-2xl p-6 sm:p-8 w-full max-w-5xl mx-auto">
     
      <SupplierProfile/>

      
      <div className="flex-1 w-full">
        <SupplierDetails/>
      </div>
    </div>
  );
}
