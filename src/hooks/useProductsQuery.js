import { getProductById, getProducts } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useProductQuery = (id) => {
  return useQuery({
    queryKey: ["products", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};
