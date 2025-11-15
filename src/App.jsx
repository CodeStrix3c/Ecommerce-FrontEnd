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
import axiosInstance from "./api/axiosInstance";

function App() {
  useEffect(() => {
    axiosInstance.defaults.headers.common["Authorization"] =
      `Bearer ${getItemFromLocalStorage("token")}`;
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

// import React, { useEffect, useState } from "react";

// function App() {
//   const [data, setData] = useState(null);
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const API_URL =
//     "https://cbnnv7cz-44388.inc1.devtunnels.ms/api/core/userProfile/GetProfileByUserId?userId=605";

//   const TOKEN =
//     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJuc2lnaHRpbmJveC51bW1hcm11a2h0YXJAZ21haWwuY29tIiwianRpIjoiOTk4NWJmNDYtNjk4ZC00NTExLTk4YjctZmNmYmQyYjU3MDkwIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvbmFtZWlkZW50aWZpZXIiOiI2MDUiLCJleHAiOjE3NjMwMjc1MjksImlzcyI6IlNpbXBsQ29tbWVyY2VBUEkiLCJhdWQiOiJTaW1wbENvbW1lcmNlVXNlcnMifQ.bwBjt05v83pcwo83QO_zdHobJhYL5uLpaXbpcR0sNh0";

//   const fetchProfile = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       // ✅ Using fetch with async/await
//       const response = await fetch(API_URL, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${TOKEN}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.json();
//       setData(result);
//       console.log("✅ API Response:", result);
//     } catch (err) {
//       console.error("❌ Fetch Error:", err);
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   return (
//     <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
//       <h1>🌾 Test API Call using Fetch</h1>

//       {loading && <p>Loading...</p>}
//       {error && (
//         <p style={{ color: "red" }}>
//           Error:{" "}
//           {error.includes("Failed to fetch")
//             ? "CORS or network issue — browser blocked request"
//             : error}
//         </p>
//       )}

//       {data && (
//         <div>
//           <h3>Response:</h3>
//           <pre>{JSON.stringify(data, null, 2)}</pre>
//         </div>
//       )}

//       <button onClick={fetchProfile} disabled={loading}>
//         {loading ? "Fetching..." : "Fetch Again"}
//       </button>
//     </div>
//   );
// }

// export default App;
