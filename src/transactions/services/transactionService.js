import axiosInstance from "@/api/client/axiosInstance";

// Create Razorpay order
export const createOrderApi = async (amount) => {
  const { data } = await axiosInstance.post("/create-order", { amount });
  return data;
};

// Verify payment + HOLD transfer
export const verifyPaymentApi = async (payload) => {
  const { data } = await axiosInstance.post("/verify-payment", payload);
  return data;
};

// Release payment
export const releasePaymentApi = async (transferId) => {
  const { data } = await axiosInstance.post("/release-payment", {
    transferId,
  });
  return data;
};

// Fetch all transactions
export const getTransactionsApi = async (userId) => {
  const { data } = await axiosInstance.get(`/transactions/${userId}`);
  return data;
};

// Fetch single transaction
export const getTransactionByIdApi = async (id) => {
  const { data } = await axiosInstance.get(`/transactions/detail/${id}`);
  return data;
};
