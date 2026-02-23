import { getStates } from "@/services/addressServices/stateservice";
import { useQuery } from "@tanstack/react-query";

export const useStates = (countryId) => {
  return useQuery({
    queryKey: ["states", countryId],
    queryFn: () => getStates(countryId),
    enabled: !!countryId, // only run when country selected
  });
};
