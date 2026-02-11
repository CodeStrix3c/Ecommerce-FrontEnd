import { getAboutUsData } from "@/services/aboutUsServices";
import { useQuery } from "@tanstack/react-query";

export const useAboutUsQuery = () => {
  return useQuery({
    queryKey: ["aboutUS"],
    queryFn: getAboutUsData,
  });
};
