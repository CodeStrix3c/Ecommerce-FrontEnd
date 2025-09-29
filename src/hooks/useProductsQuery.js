import { getProducts } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

export const useProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

// export const useUserQuery = (id) => {
//   return useQuery({
//     queryKey: ["user", id],
//     queryFn: () => getUserById(id),
//     enabled: !!id, // prevents fetching when id is null
//   });
// };
