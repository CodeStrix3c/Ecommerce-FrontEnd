import { privacyData } from "@/services/privacyServices";
import { useQuery } from "@tanstack/react-query";

export const usePrivacyDataQuery = () => {
  return useQuery({
    queryKey: ["privacyData"],
    queryFn: privacyData,
  });
};