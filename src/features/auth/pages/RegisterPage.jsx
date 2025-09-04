import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks";
import AuthModal from "../components/AuthModal";
import { TextField, Button, Divider, Tabs, Tab, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  emailRegisterSchema,
  phoneRegisterSchema,
} from "@/schemas/authSchemas";
import RequiredLabel from "@/components/ui/RequiredLabel";

const RegisterPage = () => {
  const [redirect, setRedirect] = useState(false);
  const [tab, setTab] = useState(0);
  const auth = useAuth();

  const schema = tab === 0 ? emailRegisterSchema : phoneRegisterSchema;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = async (data) => {
    const response = await auth.register(data);
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
    <AuthModal title="Sign up" onClose={() => setRedirect(true)}>
      {/* Tabs */}
      <Tabs
        value={tab}
        onChange={(e, val) => setTab(val)}
        centered
        sx={{
          "& .MuiTab-root": { textTransform: "none", fontWeight: 500 },
          "& .Mui-selected": { color: "#ff385c" },
          "& .MuiTabs-indicator": { backgroundColor: "#ff385c" },
        }}
      >
        <Tab label="Email" />
        <Tab label="Phone" />
      </Tabs>

      {/* Form */}
      <Box className="mt-6">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {tab === 0 ? (
            <>
              <TextField
                label={<RequiredLabel label="Full Name" />}
                fullWidth
                size="small"
                variant="outlined"
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                {...register("fullName")}
              />
              <TextField
                label={<RequiredLabel label="Email" />}
                type="email"
                fullWidth
                size="small"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email?.message}
                {...register("email")}
              />
              <TextField
                label={<RequiredLabel label="Password" />}
                type="password"
                fullWidth
                size="small"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password")}
              />
            </>
          ) : (
            <>
              <TextField
                label={<RequiredLabel label="Full Name" />}
                fullWidth
                size="small"
                variant="outlined"
                error={!!errors.fullName}
                helperText={errors.fullName?.message}
                {...register("fullName")}
              />
              <TextField
                label={<RequiredLabel label="Phone number" />}
                type="tel"
                fullWidth
                size="small"
                variant="outlined"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                InputProps={{
                  startAdornment: (
                    <span className="mr-2 text-gray-500">+91</span>
                  ),
                }}
                {...register("phone")}
              />
              <TextField
                label={<RequiredLabel label="Password" />}
                type="password"
                fullWidth
                size="small"
                variant="outlined"
                error={!!errors.password}
                helperText={errors.password?.message}
                {...register("password")}
              />
            </>
          )}

          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#ff385c",
              "&:hover": { backgroundColor: "#e03352" },
              textTransform: "none",
              fontWeight: "600",
              borderRadius: "12px",
              py: 1.5,
            }}
          >
            Continue
          </Button>
        </form>
      </Box>

      {/* Divider */}
      <Divider sx={{ my: 4 }}>or</Divider>

      {/* Google signup */}
      <div className="flex flex-col gap-3">
        <GoogleLogin
          onSuccess={(cred) => handleGoogleLogin(cred.credential)}
          onError={() => console.log("Register failed")}
          text="continue_with"
          width="full"
        />
      </div>

      {/* Login link */}
      <p className="mt-6 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link to="/login" className="font-small text-black underline">
          Log in
        </Link>
      </p>
    </AuthModal>
  );
};

export default RegisterPage;
