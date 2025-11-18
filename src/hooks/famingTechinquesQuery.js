import { cardsData, farmingTechniquesData, movingSectionData } from "@/services/farmingTechniquesServices";
import { useQuery } from "@tanstack/react-query";

export const usefarmingTechniquesQuery = () => {
  return useQuery({
    queryKey: ["farmingTechniquesData"],
    queryFn: farmingTechniquesData,
  });
};
export const usemethodsDataQuery = () => {
  return useQuery({
    queryKey: ["methodsData"],
    queryFn: movingSectionData,
  });
};
export const usecardsDataQuery = () => {
  return useQuery({
    queryKey: ["cardsData"],
    queryFn: cardsData,
  });
};