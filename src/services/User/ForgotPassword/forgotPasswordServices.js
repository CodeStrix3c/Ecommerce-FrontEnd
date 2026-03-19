import axiosInstance from "@/api/client/axiosInstance";

export const forgotPassword = async (payload) => {
  const { data } = await axiosInstance.post("/ForgotPassword", payload);
  return data;
};

export const verifyOtpResetPassword = async (payload) => {
  const { data } = await axiosInstance.post(
    "/VerifyOtpAndResetPassword",
    payload,
  );
  return data;
};
