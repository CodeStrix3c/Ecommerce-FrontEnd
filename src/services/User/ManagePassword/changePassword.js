import axiosInstance from "@/api/client/axiosInstance";

export const changePassword = async (data) => {
  const response = await axiosInstance.post("/user/change-password", null, {
    params: {
      OldPassword: data.currentPassword,
      NewPassword: data.newPassword,
      ConfirmPassword: data.confirmPassword,
    },
  });

  return response.data;
};