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

    onSuccess: (response) => {
      const message =
        response?.data?.message ||
        response?.message ||
        "Review submitted successfully";

      toast.success(message);
    },

    onError: (error) => {
      let message = "Something went wrong";

      const data = error?.response?.data;

      if (typeof data === "string") {
        message = data;
      } else if (data?.message) {
        message = data.message;
      } else if (data?.title) {
        message = data.title;
      } else if (Array.isArray(data?.errors)) {
        message = data.errors[0];
      }

      toast.error(message);
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
