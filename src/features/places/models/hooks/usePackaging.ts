import { useQuery } from "@tanstack/react-query";
import { getPackagingOptions } from "../../services/packaging.service";

export const usePackagingOptions = () => {
  return useQuery({
    queryKey: ["packagingOptions"],
     queryFn: getPackagingOptions,
  });
};