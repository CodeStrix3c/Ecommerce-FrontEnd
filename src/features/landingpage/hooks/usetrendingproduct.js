import { useQuery } from "@tanstack/react-query";
import { fetchTrendingProducts } from "../services/trendingproducts.service";

export const useTrendingProducts = (limit = 20) => {
  return useQuery({
    queryKey: ["trending-products", limit],
    queryFn: () => fetchTrendingProducts(limit),
  });
};
