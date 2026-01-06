import { apiGet } from "@/api/client/request";

export const getProducts = () => {
  return apiGet("/products.json");
};

export const getProductById = (id) => {
  return apiGet(`/api/products/${id}`);
};
