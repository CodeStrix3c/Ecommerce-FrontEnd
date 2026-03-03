import { login, logout, signup } from "@/services/authService";
import { KeyboardReturnTwoTone } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";

export const useSignupMutation = () => {
  return useMutation({
    mutationFn: signup,
    onSuccess: (data) => {
      console.log("Signed up:", data.user);
    },
    onError: (error) => {
      console.error("Signup error:", error);
    },
  });
};

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      console.log("Logged in:", data.user);
    },
    onError: (error) => {
      console.error("Login error:", error);
    },
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationFn: logout,
  });
};
