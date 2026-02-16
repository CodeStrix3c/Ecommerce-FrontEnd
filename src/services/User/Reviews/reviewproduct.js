import axiosInstance from "@/api/client/axiosInstance";

export const addReview = async (payload) => {
  const { data } = await axiosInstance.post("/api/reviews/AddReview", payload);

  return data;
};

export const getAllReviews = async () => {
  const response = await axiosInstance.get("/api/reviews/List");
  return response;
};

export const updateReview = async () => {
  const response = await axiosInstance.put;
};
