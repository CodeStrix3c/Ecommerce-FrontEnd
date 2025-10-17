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
    const runtimeToken =
      localStorage.getItem("token") || sessionStorage.getItem("token");
    const envToken = import.meta.env.VITE_API_TOKEN;
    const token = runtimeToken || envToken;

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${envToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
