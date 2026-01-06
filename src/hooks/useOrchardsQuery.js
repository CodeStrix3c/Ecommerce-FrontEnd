import { getOrchardsPageData } from "@/services/orchardsPageServices";
import { useQuery } from "@tanstack/react-query";

export const useOrchardsPageQuery = () => {
  return useQuery({
    queryKey: ["orchardsPage"],
    queryFn: getOrchardsPageData,
  });
};