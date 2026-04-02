import axiosInstance from "@/api/client/axiosInstance";

export const applyCoupon = async (couponCode) => {
  const response = await axiosInstance.post("/cart/apply-coupon", {
    couponCode,
  });
  return response.data;
};

export const getCoupons = async () => {
  const response = await axiosInstance.get("/api/coupons/available");
  return response.data; // ✅ was: return response
};
