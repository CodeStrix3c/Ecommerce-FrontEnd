import { addReview } from "@/services/User/Reviews/reviewproduct";
import { useMutation } from "@tanstack/react-query";

export const useAddReview = () => {
  return useMutation({
    mutationFn: (payload) => addReview(payload),
  });
};
