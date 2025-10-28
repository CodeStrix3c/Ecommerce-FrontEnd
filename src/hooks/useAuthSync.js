import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const useAuthSync = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "userLoginToken" && !e.newValue) {
        navigate("/login");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [navigate]);
};
