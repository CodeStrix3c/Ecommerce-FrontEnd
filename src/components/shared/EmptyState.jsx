import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import CustomButton from "../ui/CustomButton";

const EmptyState = ({ icon, title, subTitle, btnText }) => {
    const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4 lg:mt-28 md:mt-28">
      <div className="p-6 bg-[var(--color-white-hover)] rounded-full shadow-md mb-6">
        {icon}
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-neutral-dark)]">
        {title}
      </h1>

      <p className="mt-3 text-gray-600 max-w-7xl mb-7">{subTitle}</p>

 <CustomButton
      onClick={() => navigate("/")}text={btnText}  />   
       </div>
  );
};

export default EmptyState;
