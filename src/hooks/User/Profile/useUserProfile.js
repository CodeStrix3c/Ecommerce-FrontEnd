// import { useMutation, useQuery } from "@tanstack/react-query";
// import { getProfileApi, updateUserProfileApi } from "@/services/userProfileService";

// export const useUserProfile = (userId) => {
//     return useQuery({
//         queryKey: ["getUserProfile", userId],
//         queryFn: () => getProfileApi(userId),
//         enabled: !!userId,
//     });
// };

// export const useUpdateUserProfile = () => {
//     return useMutation({
//         mutationFn: ({ id, payload }) => updateUserProfileApi(id, payload),
//     });
// };

import {
  getProfileApi,
  updateUserProfileApi,
} from "@/services/Profile/userProfileService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useUserProfile = (userId) => {
  return useQuery({
    queryKey: ["getUserProfile", userId],
    queryFn: () => getProfileApi(userId),
    enabled: !!userId,
  });
};

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }) => updateUserProfileApi(id, payload),

    onSuccess: (data, variables) => {
      console.log("Update Success:", data);

      // refetch profile
      queryClient.invalidateQueries(["getUserProfile", variables.id]);
    },

    onError: (error) => {
      console.error("Update Failed:", error);
    },
  });
};
