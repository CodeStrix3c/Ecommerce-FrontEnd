import { NavLink } from "react-router-dom";

export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen flex flex-col max-w-[73vw] mx-auto">
      <NavLink to="/" className="flex items-center gap-2 pt-6">
        <img
          src="assets/images/ziraat.jpeg"
          alt="ziraat"
          width={80}
          height={80}
        />
      </NavLink>

      <div>{children}</div>
    </div>
  );
}
