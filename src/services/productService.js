import axiosInstance from "@/api/client/axiosInstance";

export const getProducts = async (params) => {
  const response = await axiosInstance.get("/search", {
    params,
  });

  return response.data; // ✅ IMPORTANT
};

export const getProductDetails = async (id) => {
  const response = await axiosInstance.get(
    `/api/catalog/ProductsApi/detail/${id}`,
  );
  return response.data;
};
