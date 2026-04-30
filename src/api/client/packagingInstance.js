import axios from "axios";
import { USE_MOCK_API } from "@/api/config/apiMode";

const PackInstance = axios.create({
  baseURL: "https://handicraftkashmirapi-gharascaengxdhg8.centralindia-01.azurewebsites.net/",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

PackInstance.interceptors.request.use(
  (config) => {
    if (USE_MOCK_API) {
      return Promise.reject(
        new Error(`Mock API Enabled: ${config?.url || ""}`)
      );
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default PackInstance;