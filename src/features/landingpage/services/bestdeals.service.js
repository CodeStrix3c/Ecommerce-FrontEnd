import axiosInstance from "@/api/client/axiosInstance";

export const fetchBestDeals = async (limit = 20) => {
  const response = await axiosInstance.get(
    `/api/products/discover/best-deals`,
    {
      params: { limit }, // Using params object is cleaner for query strings
    },
  );
  return response.data;
};
