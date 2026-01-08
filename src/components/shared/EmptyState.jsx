import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EmptyState = ({
  title = "No Crafts Found",
  subTitle = "We couldn't find any Kashmir handicrafts matching your search. Explore our curated collection for authentic art pieces.",
  btnText = "Browse Crafts",
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 lg:mt-28 md:mt-28 gap-6 text-center">
      <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-black)]">
        {title}
      </h2>
      <p className="text-sm md:text-base max-w-xl">{subTitle}</p>

      <button
        onClick={() => navigate("/")}
        className="mt-4 px-6 py-3 bg-[var(--color-secondary)] text-[var(--color-white)] rounded-lg shadow-lg transition hover:bg-[var(--color-secondary-dark)]"
      >
        {btnText}
      </button>
    </div>
  );
};

export default EmptyState;
