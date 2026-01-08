import AuthPageWrapper from "@/components/shared/AuthPageWrapper";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <AuthPageWrapper>
      <Outlet />
    </AuthPageWrapper>
  );
};

export default AuthLayout;
