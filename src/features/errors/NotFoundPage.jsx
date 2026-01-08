import { useEffect } from "react";
import { NavLink } from "react-router-dom";

const NotFoundPage = () => {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[var(--color-white)] text-center px-4 gap-6">
      {/* Kashmir-themed Handicraft Image */}
      <img
        src="/assets/images/logo6.png"
        alt="Kashmir Handicraft"
        className="w-64 md:w-80 lg:w-96 object-contain"
      />

      <h1 className="text-3xl md:text-4xl font-bold text-[var(--color-primary)]">
        Oops! Page Not Found
      </h1>

      <p className="text-base md:text-lg text-[var(--color-neutral-dark)] max-w-lg">
        The page you are looking for does not exist. Explore our collection of
        authentic Kashmir handicrafts and discover beautiful art pieces.
      </p>

      <NavLink
        to="/"
        className="px-6 py-3 bg-[var(--color-secondary)] text-[var(--color-white)] rounded-lg shadow-lg transition hover:bg-[var(--color-secondary-dark)]"
      >
        Browse Crafts
      </NavLink>
    </div>
  );
};

export default NotFoundPage;
