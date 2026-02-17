import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addReview,
  getAllReviews,
} from "@/services/User/Reviews/reviewproduct";
import { toast } from "react-toastify";

// ---------- ADD REVIEW ----------
export const useAddReview = () => {
  return useMutation({
    mutationFn: addReview,

    onSuccess: () => {
      toast.success("Review submitted successfully ");
    },

    onError: (error) => {
      toast.error(error?.response?.data?.message || "Failed to submit review ");
    },
  });
};

// ---------- GET REVIEWS ----------
export const useGetAllReviews = (params) => {
  return useQuery({
    queryKey: ["reviews", params],
    queryFn: () => getAllReviews(params),
    enabled: !!params?.entityId,
  });
};
