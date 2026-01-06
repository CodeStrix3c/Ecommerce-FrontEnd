import { getExpertCardsData } from "@/services/talkwithExpertServices";
import { useQuery } from "@tanstack/react-query";

export const useExpertCardsDataQuery = () => {
  return useQuery({
    queryKey: ["expertCardsData"],
    queryFn: getExpertCardsData,
  });
};

