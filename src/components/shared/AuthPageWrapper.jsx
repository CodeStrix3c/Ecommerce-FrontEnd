import { NavLink } from "react-router-dom";
import ContentWrapper from "./ContentWrapper";

export default function AuthPageWrapper({ children }) {
  return (
    <ContentWrapper>
      <div className="min-h-screen flex flex-col lg:px-60 md:px-40">
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
    </ContentWrapper>
  );
}
