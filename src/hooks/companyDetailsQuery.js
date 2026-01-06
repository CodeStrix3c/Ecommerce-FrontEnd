import { useQuery } from "@tanstack/react-query";
import { companyDetailsData } from "./companyDetailsServices";

export const useCompanyDetailsDataQuery = () => {
  return useQuery({
    queryKey: ["companyDetailsData"],
    queryFn: companyDetailsData,
  });
};