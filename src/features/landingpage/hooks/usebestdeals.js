import { useQuery } from "@tanstack/react-query";
import { fetchBestDeals } from "../services/bestdeals.service";

/**
 * Hook for fetching best deals.
 * @param {number} limit - Number of deals to fetch.
 */
export const useBestDeals = (limit = 20) => {
  return useQuery({
    queryKey: ["best-deals", limit],
    queryFn: () => fetchBestDeals(limit),
  });
};
