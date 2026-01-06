import { supplierData } from "@/services/supplierProfilePageServices";
import { useQuery } from "@tanstack/react-query";

export const useSupplierDataQuery = () => {
  return useQuery({
    queryKey: ["harvest"],
    queryFn: supplierData,
  });
};