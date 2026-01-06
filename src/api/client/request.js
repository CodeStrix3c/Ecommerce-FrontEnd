import axiosInstance from "./axiosInstance";
import { mockAxios } from "./mockAxios";
import { USE_MOCK_API } from "@/api/config/apiMode";

export async function apiGet(url, options = {}) {
  try {
    const response = await axiosInstance.get(url, options);
    return response.data;
  } catch (error) {
    if (error.mock && USE_MOCK_API) {
      const jsonName = url.replace("/api/", "").replace("/", "");
      const res = await mockAxios.get(`/mocks/${jsonName}.json`);
      return res.data;
    }

    throw error;
  }
}
