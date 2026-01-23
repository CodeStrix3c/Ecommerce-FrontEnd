import { getProducts } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

export const useProductsQuery = (params) => {
  return useQuery({
    queryKey: ["products", params],
    queryFn: () => getProducts(params),
  });
};
