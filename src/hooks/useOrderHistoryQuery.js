import { getorderHistoryData } from "@/services/orderHistoryServices";
import { useQuery } from "@tanstack/react-query";

export const useOrderHistoryDataQuery = () => {
  return useQuery({
    queryKey: ["expertCardsData"],
    queryFn: getorderHistoryData,
  });
};