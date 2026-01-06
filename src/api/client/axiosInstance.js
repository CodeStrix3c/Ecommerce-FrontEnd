import axios from "axios";
import { USE_MOCK_API } from "@/api/config/apiMode";
import { getItemFromLocalStorage } from "@/utils/localStorage";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ZIRAAT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // ⛔ BLOCK real calls in mock mode
    if (USE_MOCK_API) {
      return Promise.reject({ mock: true, url: config.url });
    }

    // Auth logic (except when disabled)
    if (config.auth !== false) {
      const token = getItemFromLocalStorage("token");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
