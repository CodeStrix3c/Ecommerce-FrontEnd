import axiosInstance from "@/api/client/axiosInstance";

// ---------- ADD REVIEW ----------
export const addReview = async (payload) => {
  const { data } = await axiosInstance.post("/api/reviews/AddReview", payload);

  return data;
};

// ---------- GET ALL REVIEWS ----------
export const getAllReviews = async ({
  entityId,
  entityTypeId,
  pageNumber = 1,
  pageSize = 20,
}) => {
  const { data } = await axiosInstance.get("/api/reviews/List", {
    params: {
      entityId,
      entityTypeId,
      pageNumber,
      pageSize,
    },
  });

  return data;
};
