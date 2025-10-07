import AuthPageWrapper from "@/components/shared/AuthPageWrapper";
import { Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <AuthPageWrapper>
        <Outlet />
      </AuthPageWrapper>
    </>
  );
};

export default PublicLayout;
