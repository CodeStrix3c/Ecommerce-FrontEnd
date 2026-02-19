// hooks/useFileUploadMutation.js
import {
  deleteUploadedFile,
  uploadFile,
} from "@/services/Profile/fleUploadService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Upload File Mutation
 */
export const useFileUploadMutation = () => {
  return useMutation({
    mutationFn: uploadFile,
  });
};

/**
 * Delete File Mutation
 */
export const useFileDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUploadedFile,

    onSuccess: (_, variables) => {
      const userId = variables?.userId;

      if (userId) {
        queryClient.invalidateQueries({
          queryKey: ["getUserProfile", userId],
        });

        queryClient.invalidateQueries({
          queryKey: ["vendorProfile", userId],
        });
      }
    },
  });
};
