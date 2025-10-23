import { getItemFromLocalStorage } from "@/utils/localStorage";
import axios from "axios";
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_ZIRAAT_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.auth === false) return config;

    const token = getItemFromLocalStorage("userLoginToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
