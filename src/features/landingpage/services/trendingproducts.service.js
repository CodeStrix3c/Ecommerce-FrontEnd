import axiosInstance from "@/api/client/axiosInstance";

export const fetchTrendingProducts = async (limit = 20) => {
  const response = await axiosInstance.get(`/api/products/discover/trending`, {
    params: { limit }, // Using params object is cleaner for query strings
  });
  return response.data;
};
