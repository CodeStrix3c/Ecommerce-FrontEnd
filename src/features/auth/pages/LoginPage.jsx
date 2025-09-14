import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks";
import { Button, Divider, Tabs, Tab, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { phoneLoginSchema, emailLoginSchema } from "@/schemas/authSchemas";
import useIsMobile from "@/hooks/useInMobile";
import FormInput from "../components/FormInput";

const LoginPage = () => {
  const [redirect, setRedirect] = useState(false);
  const [tab, setTab] = useState(0);
  const auth = useAuth();
  const isMobile = useIsMobile();

  const schema = tab === 0 ? phoneLoginSchema : emailLoginSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const response = await auth.login(data);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message);
    }
  };

  const handleGoogleLogin = async (credential) => {
    const response = await auth.googleLogin(credential);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message);
    }
  };

  if (redirect) return <Navigate to="/" />;

  return (
    <>
      <div className="flex lg:my-[85px] md:my-10 flex-col sm:flex-row">
        {/* Image visible on sm+ screens, hidden on xs */}
        <div className="hidden sm:flex md:w-1/2 items-center">
          <img
            src="/assets/images/login.jpg"
            alt="Travel inspiration"
            className="object-cover max-h-[90%] w-full"
          />
        </div>

        {/* Login form */}
        <div className="flex w-full md:w-1/2 items-center justify-center">
          <div className="max-w-md w-full px-4 sm:px-0">
            <h1
              className="text-3xl font-semibold mb-6 text-center sm:text-left"
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
                  sx={{
                    backgroundColor: "var(--color-primary)",
                    "&:hover": {
                      backgroundColor: "var(--color-primary-hover)",
                    },
                    textTransform: "none",
                    fontWeight: "600",
                    borderRadius: "12px",
                    py: 1.5,
                    color: "var(--color-white)",
                  }}
                >
                  Continue
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
                to="/farmer-register"
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
      </div>
    </>
  );
};

export default LoginPage;
