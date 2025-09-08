import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const UnderConstruction = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-white)] text-center">
      <NavLink to="/" className="mb-6">
        <img
          src="assets/images/ziraat.jpeg"
          alt="Ziraat Logo"
          width={80}
          height={80}
          className="mx-auto filter grayscale"
        />
      </NavLink>

      <h1 className="text-2xl md:text-3xl font-semibold mb-2 text-[var(--color-primary)]">
        We're Working on It
      </h1>

      <p className="text-base md:text-lg text-[var(--color-neutral-dark)]">
        This page is under construction. Check back soon!
      </p>
    </div>
  );
};

export default UnderConstruction;
