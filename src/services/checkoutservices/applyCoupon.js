import axiosInstance from "@/api/client/axiosInstance";

export const applyCoupon = async (couponCode) => {
  const response = await axiosInstance.post("/cart/apply-coupon", {
    couponCode,
  });
  return response.data;
};
