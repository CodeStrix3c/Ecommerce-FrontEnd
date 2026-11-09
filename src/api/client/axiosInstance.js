import axios from "axios";
import { USE_MOCK_API } from "@/api/config/apiMode";
import { getItemFromLocalStorage } from "@/utils/localStorage";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // no ending slash in env
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000, // ✅ prevent forever pending
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (USE_MOCK_API) {
      return Promise.reject(
        new Error(`Mock API Enabled: ${config?.url || ""}`),
      );
    }

    if (config.auth !== false) {
      const token = getItemFromLocalStorage("token");
      const roles = getItemFromLocalStorage("roles");
      if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);

export default axiosInstance;
