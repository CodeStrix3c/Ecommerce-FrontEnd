import { getSprayCardData, getSprayPageData } from "@/services/sprayService";
import { useQuery } from "@tanstack/react-query";


export const useSprayCardQuery = () => {
  return useQuery({
    queryKey: ["spray"],
    queryFn: getSprayCardData,
  });
};

export const useSprayPageQuery = () => {
  return useQuery({
    queryKey: ["sprayPage"],
    queryFn: getSprayPageData,
  });
};



