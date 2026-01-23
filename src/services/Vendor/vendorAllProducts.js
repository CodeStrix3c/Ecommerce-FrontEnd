import axiosInstance from "@/api/client/axiosInstance";

export const vendorAllProducts = async (payload) => {
  const response = await axiosInstance.post(
    "/api/catalog/ProductsApi/grid",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response;
};
