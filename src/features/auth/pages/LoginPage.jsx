import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks";
import {
  Button,
  Divider,
  Tabs,
  Tab,
  Box,
  CircularProgress,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  phoneLoginSchema,
  emailLoginSchema,
} from "@/features/farmer-registration/schemas/authSchemas";
import FormInput from "../../../components/shared/custom-inputs/FormInput";
import { useLoginMutation } from "@/hooks/useAuthMutation";
import { setItemsInLocalStorage } from "@/utils/localStorage";

const LoginPage = () => {
  const navigate = useNavigate();
  const [redirect, setRedirect] = useState(false);
  const [tab, setTab] = useState(0);
  const auth = useAuth();

  const { mutate: loginMutate, isPending } = useLoginMutation();

  const schema = tab === 0 ? phoneLoginSchema : emailLoginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    const payload =
      tab === 0
        ? { phone: data.phone, password: data.password }
        : { email: data.email, password: data.password };

    loginMutate(payload, {
      onSuccess: (res) => {
        console.log(res, "res from login");
        setItemsInLocalStorage("userLoginToken", res.token);
        toast.success("Login successful!");
        setRedirect(true);
      },
      onError: (err) => {
        toast.error(
          err?.response?.data?.error || "Invalid credentials. Please try again."
        );
      },
    });
  };

  const handleGoogleLogin = async (credential) => {
    const response = { success: true, message: "Google login successful!" };
    if (response.success) {
      localStorage.setItem("token", "fake-google-token-12345");
      toast.success(response.message);
      navigate("/home");
      setRedirect(true);
    } else {
      toast.error(response.message);
    }
  };

  if (redirect) return <Navigate to="/home" replace />;

  return (
    <div className="flex justify-center min-h-screen">
      <div className="w-full max-w-md bg-var(--color-white) rounded-xl mt-20 lg:mt10 p-6">
        <h1
          className="text-2xl font-semibold mb-6 text-center"
          style={{ color: "var(--color-black)" }}
        >
          Log in or sign up
        </h1>

        <Tabs
          value={tab}
          onChange={(e, val) => setTab(val)}
          textColor="primary"
          indicatorColor="primary"
          centered
        >
          <Tab label="Phone" />
          <Tab label="Email" />
        </Tabs>

        <Box className="mt-6">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {tab === 0 ? (
              <>
                <FormInput
                  name="phone"
                  label="Phone number"
                  type="tel"
                  register={register}
                  errors={errors.phone}
                />
                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  register={register}
                  errors={errors.password}
                />
              </>
            ) : (
              <>
                <FormInput
                  name="email"
                  label="Email"
                  type="email"
                  register={register}
                  errors={errors.email}
                />
                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  register={register}
                  errors={errors.password}
                />
              </>
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={isPending}
              sx={{
                backgroundColor: "var(--color-primary)",
                "&:hover": { backgroundColor: "var(--color-primary-hover)" },
                textTransform: "none",
                fontWeight: "600",
                borderRadius: "12px",
                py: 1.5,
                color: "var(--color-white)",
              }}
            >
              {isPending ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Continue"
              )}
            </Button>
          </form>
        </Box>

        <Divider
          sx={{
            my: 4,
            color: "var(--color-black)",
            "&::before, &::after": { borderColor: "var(--color-black)" },
          }}
        >
          or
        </Divider>

        <div className="flex flex-col gap-3">
          <GoogleLogin
            onSuccess={(cred) => handleGoogleLogin(cred.credential)}
            onError={() => console.log("Login failed")}
            text="continue_with"
            width="100%"
          />
        </div>

        <p
          className="mt-6 text-center text-sm"
          style={{ color: "var(--color-black)" }}
        >
          Don’t have an account?{" "}
          <Link
            to="/sign-up"
            style={{
              fontWeight: "500",
              textDecoration: "underline",
              color: "var(--color-black)",
            }}
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
