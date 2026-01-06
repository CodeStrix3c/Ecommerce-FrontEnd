import { termsData } from "@/services/termsServices";
import { useQuery } from "@tanstack/react-query";

export const useTermsDataQuery = () => {
  return useQuery({
    queryKey: ["termsData"],
    queryFn: termsData,
  });
};