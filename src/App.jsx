import { useEffect, Suspense } from "react";
import { Routes } from "react-router-dom";
import { Slide, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "leaflet/dist/leaflet.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { getItemFromLocalStorage } from "./utils/localStorage";
import ScrollToTop from "./components/shared/ScrollToTop";
import Spinner from "./components/ui/Spinner";
import publicRoutes from "./routes/PublicRoutes";
import protectedRoutes from "./routes/ProtectedRoutes";
import axiosInstance from "./api/client/axiosInstance";

function App() {
  useEffect(() => {
    axiosInstance.defaults.headers.common["Authorization"] =
      `Bearer ${getItemFromLocalStorage("userLoginToken")}`;
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <ScrollToTop />
      <Suspense fallback={<Spinner />}>
        <Routes>
          {publicRoutes}
          {protectedRoutes}
        </Routes>
      </Suspense>
      <ToastContainer autoClose={2000} transition={Slide} />
    </GoogleOAuthProvider>
  );
}

export default App;
