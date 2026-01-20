import axiosInstance from "@/api/client/axiosInstance";

export const vendorBusinessReg = async (payload) => {
  const response = await axiosInstance.post("/api/vendors", payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return response.data;
};
