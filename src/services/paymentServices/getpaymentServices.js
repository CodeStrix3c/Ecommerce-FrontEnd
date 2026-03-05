import axiosInstance from "@/api/client/axiosInstance";

export const getPaymentProviders = async () => {
  const { data } = await axiosInstance.get(
    "/api/payments-providers/GetPaymentProviders",
  );
  return data;
};
