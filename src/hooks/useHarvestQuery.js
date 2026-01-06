import { harvestData } from "@/services/harvestServices";
import { useQuery } from "@tanstack/react-query";

export const useHarvestQuery = () => {
  return useQuery({
    queryKey: ["harvest"],
    queryFn: harvestData,
  });
};