import { Link } from "react-router-dom";

const ExploreNearby = ({ title, options }) => {
  return (
    <div className="w-full">
      <div className="py-10">
        <h2 className="mb-10 text-[25px] font-semibold">{title}</h2>

        <ul className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {options.map((option, index) => (
            <li key={index}>
              <Link
                to={option.href}
                className="cursor-pointer text-[var(--color-neutral-dark)]"
              >
                <div className="flex flex-col leading-tight">
                  <span className="font-semibold text-[var(--color-black)]">
                    {option.name}
                  </span>
                  <span className="text-[15px] font-[500] text-[var(--color-neutral-dark)] hover:text-[var(--color-neutral-dark-hover)]">
                    Holiday rentals
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExploreNearby;
