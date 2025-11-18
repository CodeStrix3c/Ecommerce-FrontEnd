import { getBottomCardData, getCardsData, getFaqData, getGuidesAndResourcesData, getTopArticlesData } from "@/services/helpCenterServices";
import { useQuery } from "@tanstack/react-query";

export const useFaqDataQuery = () => {
  return useQuery({
    queryKey: ["FaqsData"],
    queryFn: getFaqData,
  });
};

export const useCardsDataQuery = () => {
  return useQuery({
    queryKey: ["CardData"],
    queryFn: getCardsData,
  });
};

export const useTopArticlesDataQuery = () => {
  return useQuery({
    queryKey: ["TopArticlesData"],
    queryFn: getTopArticlesData,
  });
};

export const useGuidesAndResourcesDataQuery = () => {
  return useQuery({
    queryKey: ["GuidesAndResourcesData"],
    queryFn: getGuidesAndResourcesData,
  });
};

export const useBottomCardDataQuery = () => {
  return useQuery({
    queryKey: ["BottomCardData"],
    queryFn: getBottomCardData,
  });
};
