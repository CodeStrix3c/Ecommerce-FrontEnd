import { apiGet } from "@/api/client/request";

export const getProducts = () => {
  return apiGet("/api/products");
};

export const getProductById = (id) => {
  return apiGet(`/api/products/${id}`);
};
