import { getProductById, getProducts } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

export const useProductsQuery = (requestBody) => {
  return useQuery({
    queryKey: ["products", requestBody],
    queryFn: getProducts(requestBody),
  });
};

export const useProductQuery = (id) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};
