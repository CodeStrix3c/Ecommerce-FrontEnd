import { getItemFromLocalStorage } from "@/utils/localStorage";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ZIRAAT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  // withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.auth === false) return config;

    const token = getItemFromLocalStorage("token");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${envToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
