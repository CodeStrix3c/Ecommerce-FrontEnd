import axiosInstance from "@/api/client/axiosInstance";
import axios from "axios";

export const createOrder = async ({ checkoutId }) => {
  const { data } = await axiosInstance.post(
    `/api/CoD/CoDCheckout?checkoutId=${checkoutId}`,
  );

  return data;
};

export const getOrders = async () => {
  const { data } = await axiosInstance.get("/user/orders");
  return data;
};

export const getOrderDetails = async () => {
  const { data } = await axiosInstance.get(`/user/orders/${orderId}`);
  return data;
};
