import axiosInstance from "@/api/axiosInstance";

export const getProducts = async () => {
  const { data } = await axiosInstance.get("/todos/");
  console.log(data, "data from product service");

  return data;
};

export const getProductById = async (id) => {
  const { data } = await axiosInstance.get(`/products/${id}`);
  return data;
};
