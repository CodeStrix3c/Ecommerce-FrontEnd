import { FAQs, MethodSectionData, PestDiseaseData } from "@/services/ProtectionInfoServices";
import { useQuery } from "@tanstack/react-query";

export const useProtectionInfoQuery = () => {
  return useQuery({
    queryKey: ["FAQs"],
    queryFn: FAQs,
  });
};

export const useMethodsDataQuery = () => {
  return useQuery({
    queryKey: ["MethodsData"],
    queryFn: MethodSectionData,
  });
};

export const usePestDiseaseDataQuery = () => {
  return useQuery({
    queryKey: ["PestDiseaseData"],
    queryFn: PestDiseaseData,
  });
};