import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { Button, Divider, CircularProgress, Paper, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneLoginSchema } from "@/features/farmer-registration/schemas/authSchemas";
import FormInput from "../../../components/shared/custom-inputs/FormInput";
import { useLoginMutation } from "@/hooks/useFarmerProfileMutations";
import { setItemsInLocalStorage } from "@/utils/localStorage";
import { useUser } from "@/providers/UserProvider";

const LoginPage = () => {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [tab, setTab] = useState(0);
  const { setUserId, setToken, setRoles, setVendorId } = useUser();

  const { mutate: loginMutate, isPending } = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(phoneLoginSchema),
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    const payload = {
      mobileNumber: data.mobileNumber,
      password: data.password,
    };

    loginMutate(payload, {
      onSuccess: (res) => {
        console.log("Login response:", res);

        // Store token from backend
        // setItemsInLocalStorage("token", res.token);
        // setItemsInLocalStorage("userId", res.user);
        // setItemsInLocalStorage("roles", res.roles);
        // setItemsInLocalStorage("vendorId", res.vendorId);
        setToken(res.token);
        setUserId(res.user);
        setRoles(res.roles);
        setVendorId(res.vendorId);

        toast.success("Login successful!");
        setRedirect(true);
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.error ||
            err?.response?.data?.message ||
            "Invalid credentials or network error",
        );
      },
    });
  };

  const handleGoogleLogin = async () => {
    toast.success("Google login successful!");
    navigate("/home");
    setRedirect(true);
  };

  if (redirect) return <Navigate to="/home" replace />;

  return (
    <Box
      className="
        flex 
        items-center 
        justify-center 
        min-h-screen 
        bg-[var(--color-background)]
        px-4 
        sm:px-6 
        md:px-8
        py-6
      "
    >
      <Paper
        elevation={0}
        className="
          w-full 
          max-w-sm 
          sm:max-w-md
          md:max-w-md
          rounded-2xl
        "
        sx={{
          backgroundColor: "var(--color-white)",
          boxShadow: "none",
          padding: {
            xs: "20px",
            sm: "28px",
            md: "32px",
          },
        }}
      >
        <div className="flex flex-col items-center mb-5 sm:mb-6">
          <img
            src="/assets/images/logo6.png"
            alt="App Logo"
            className="
              object-contain
              mb-2
              h-14
              sm:h-16
              md:h-20
            "
          />

          <h1
            className="
              font-semibold 
              text-center
              text-xl
              sm:text-2xl
              md:text-2xl
            "
            style={{ color: "var(--color-black)" }}
          >
            Log in to your account
          </h1>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 sm:gap-4"
        >
          <FormInput
            name="mobileNumber"
            label="Phone number"
            placeholder="Enter phone number"
            type="tel"
            prefix="+91"
            register={register}
            errors={errors.mobileNumber}
          />

          <FormInput
            name="password"
            label="Password"
            placeholder="Enter password"
            type="password"
            register={register}
            errors={errors.password}
          />

          <Button
            fullWidth
            type="submit"
            variant="contained"
            disabled={isPending}
            sx={{
              backgroundColor: "var(--color-primary)",
              "&:hover": {
                backgroundColor: "var(--color-primary-hover)",
              },
              textTransform: "none",
              fontWeight: 600,
              borderRadius: "12px",
              py: {
                xs: 1.3,
                sm: 1.5,
              },
              fontSize: {
                xs: "14px",
                sm: "15px",
              },
              color: "var(--color-white)",
            }}
          >
            {isPending ? (
              <CircularProgress size={22} sx={{ color: "white" }} />
            ) : (
              "Continue"
            )}
          </Button>
        </form>

        {/* Divider */}
        <Divider
          sx={{
            my: {
              xs: 3,
              sm: 4,
            },
          }}
        >
          or
        </Divider>

        {/* Google Login */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleLogin}
            onError={() => toast.error("Google login failed")}
            text="continue_with"
            width="100%"
          />
        </div>

        {/* Sign Up Link */}
        <p className="mt-5 sm:mt-6 text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/sign-up" className="font-medium underline">
            Sign up
          </Link>
        </p>
      </Paper>
    </Box>
  );
};

export default LoginPage;
