import axiosInstance from "@/api/client/axiosInstance";

export const checkout = async (couponCode) => {
  const response = await axiosInstance.post("/checkout", {
    couponCode,
  });
  return response.data;
};
