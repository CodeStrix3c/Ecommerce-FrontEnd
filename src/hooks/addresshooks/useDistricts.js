import { getDistricts } from "@/services/addressServices/districtservice";
import { useQuery } from "@tanstack/react-query";

export const useDistricts = (stateId) => {
  return useQuery({
    queryKey: ["districts", stateId],
    queryFn: () => getDistricts(stateId),
    enabled: !!stateId,
  });
};
