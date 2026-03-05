import axiosInstance from "@/api/client/axiosInstance";

export const createOrder = async ({ checkoutId, payload }) => {
  const { data } = await axiosInstance.post(
    `/api/checkout/checkoutId=${checkoutId}/order`,
    payload,
  );

  return data;
};
