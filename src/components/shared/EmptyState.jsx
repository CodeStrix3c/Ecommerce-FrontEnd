import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmptyState = ({ title, subTitle, btnText, icon }) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-[70vh] px-4 lg:mt-28 md:mt-28 gap-10 md:gap-16 text-center md:text-left">
      <div className="bg-[var(--color-white-hover)] rounded-full shadow-lg w-28 h-28 md:w-32 md:h-32 flex items-center justify-center mb-6 md:mb-0">
        {icon}
      </div>

      <div>
        <h2 className="text-2xl md:text-4xl font-bold mb-3 text-[var(--color-black)]">
          {title}
        </h2>
        <p className="mb-4 text-sm md:text-base">{subTitle}</p>

        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-white)] rounded-lg shadow-lg transition"
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
