// hooks/Vendor/useVendorProfile.js
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateVendorProfile,
  vendorProfile,
} from "@/services/Vendor/vendorProfile";

export const useVendorProfile = (vendorId) => {
  return useQuery({
    queryKey: ["vendor-profile", vendorId],
    queryFn: () => vendorProfile(vendorId),
    enabled: !!vendorId,
  });
};

export const useVendorProfileUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateVendorProfile,
    onSuccess: (_, variables) => {
      // Refresh the data after update
      queryClient.invalidateQueries(["vendor-profile", variables.vendorId]);
    },
  });
};
