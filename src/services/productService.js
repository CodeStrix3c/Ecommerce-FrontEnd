import axiosInstance from "@/api/axiosInstance";

export const getProducts = async () => {
  const { data } = await axiosInstance.get("/products.json", {
    auth: false,
  });

  return data;
};

export const getProductById = async (id) => {
  const { data } = await axiosInstance.get(`/api/products/${id}`);
  return data;
};
