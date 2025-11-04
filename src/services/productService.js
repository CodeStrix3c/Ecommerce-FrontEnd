import axiosInstance from "@/api/axiosInstance";

export const getProducts = async (requestBody) => {
  const { data } = await axiosInstance.post("/api/products/grid", requestBody);
  return data;
};

export const getProductById = async (id) => {
  const { data } = await axiosInstance.get(`/api/products/${id}`);
  return data;
};
