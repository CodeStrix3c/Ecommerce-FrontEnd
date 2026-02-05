// import { getProducts } from "@/services/productService";
// import { useQuery } from "@tanstack/react-query";
// import { useQueryClient } from "@tanstack/react-query";

// export const useProductsQuery = (params) => {
//   return useQuery({
//     queryKey: ["products", params], // Added queryKey
//     queryFn: () => getProducts(params), // Pass params to the function
//   });
// };

// export const useProductFromCache = (id) => {
//   const queryClient = useQueryClient();

//   const queries = queryClient.getQueriesData({
//     queryKey: ["products"],
//   });

//   for (const [, data] of queries) {
//     const product = data?.products?.find(
//       (item) => String(item.id) === String(id),
//     );
//     if (product) return product;
//   }

//   return null;
// };

import { getProductDetails, getProducts } from "@/services/productService";
import { useQuery } from "@tanstack/react-query";

export const useProductsQuery = (params) => {
  return useQuery({
    queryKey: ["products", params], // Added queryKey
    queryFn: () => getProducts(params), // Pass params to the function
  });
};

export const useProductDetailsQuery = (id) => {
  return useQuery({
    queryKey: ["product-details", id],
    queryFn: () => getProductDetails(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });
};

// export const useProductFromCache = (id) => {
//   const queryClient = useQueryClient();

//   const queries = queryClient.getQueriesData({
//     queryKey: ["products"],
//   });

//   for (const [, data] of queries) {
//     const product = data?.products?.find(
//       (item) => String(item.id) === String(id),
//     );
//     if (product) return product;
//   }

//   return null;
// };
