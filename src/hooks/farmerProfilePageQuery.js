import { getFarmerData } from "@/services/farmerProfilePageServices";
import { useQuery } from "@tanstack/react-query";

export const useFarmerDataQuery = () => {
  return useQuery({
    queryKey: ["harvest"],
    queryFn: getFarmerData,
  });
};