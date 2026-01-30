
import { useMutation, useQuery } from "@tanstack/react-query";
import { getProfileApi, updateUserProfileApi } from "@/services/userProfileService";




export const useUserProfile = (userId) => {
    return useQuery({
        queryKey: ["getUserProfile", userId],
        queryFn: () => getProfileApi(userId),
        enabled: !!userId,
    });
};



export const useUpdateUserProfile = () => {
    return useMutation({
        mutationFn: ({ id, payload }) => updateUserProfileApi(id, payload),
    });
};



