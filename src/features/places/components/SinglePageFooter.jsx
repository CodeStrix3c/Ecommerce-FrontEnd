// src/components/SinglePageFooter.jsx
import { Link } from "react-router-dom";

const SinglePageFooter = () => {
  const options = [
    { name: "New Delhi", href: "/new-delhi-india/stays" },
    { name: "Delhi", href: "/delhi-india/stays" },
    { name: "Lahore", href: "/lahore-pakistan/stays" },
    { name: "Jaipur", href: "/jaipur-india/stays" },
    { name: "Noida", href: "/noida-india/stays" },
    { name: "Rishikesh", href: "/rishikesh-india/stays" },
    { name: "Dehradun", href: "/dehradun-india/stays" },
    { name: "Kullu", href: "/kullu-india/stays" },
    { name: "Tehri Garhwal", href: "/tehri-garhwal-india/stays" },
  ];

  return (
    <div className="w-full bg-[#f7f7f7]">
      <div className="max-w-screen-xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold mb-10 text-[25px]">
          Explore other options in and around Gurugram
        </h2>

        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
  {options.map((option, index) => (
    <li key={index}>
      <Link to={option.href} className="text-gray-700 cursor-pointer">
        <div className="flex flex-col leading-tight">
          <span className="font-semibold text-black">{option.name}</span>
          <span className="text-sm font-[500] text-gray-600 hover:text-gray-800 text-[15px]">
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

export default SinglePageFooter;
