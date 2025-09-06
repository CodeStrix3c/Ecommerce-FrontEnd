import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Link, Navigate } from "react-router-dom";
import useIsMobile from "@/hooks/useInMobile";
import SupplierRegistrationModal from "../components/SupplierRegistrationModal";
import FormInput from "../../../components/ui/FormInput";
import CustomButton from "@/components/ui/CustomButton";
import { supplierLoginSchema } from "@/schemas/authSchemas";
import { loginCardStyle } from "@/utils/supplierLoginStyles";

export default function SupplierLogin() {
  const isMobile = useIsMobile();
  const [redirect, setRedirect] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setIsLoggedIn(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(supplierLoginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log("Login Data:", data);
      // Replace with real login API call
      await new Promise((res) => setTimeout(res, 1000));
      toast.success("Logged in successfully!");
      localStorage.setItem("authToken", "dummyToken"); // replace with real token
      setRedirect(true);
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  if (redirect || isLoggedIn) return <Navigate to="/" />;

  const containerStyle = {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    px: 2,
    py: 10,
  };

  const cardStyle = {
    width: "100%",
    maxWidth: 400,
    borderRadius: 3,
    border: "1px solid",
    borderColor: "grey.400",
    bgcolor: "background.paper",
    px: 4,
    py: 6,
  };

  const headerStyle = {
    textAlign: "center",
    color: "primary.main",
    fontWeight: "bold",
    mb: 1,
  };
  const subHeaderStyle = {
    textAlign: "center",
    color: "text.secondary",
    mb: 3,
  };
  const footerTextStyle = {
    textAlign: "center",
    color: "text.secondary",
    mt: 3,
  };

  return (
    <>
      {isMobile ? (
        <SupplierRegistrationModal
          isOpen={true}
          onClose={() => setRedirect(true)}
        />
      ) : (
        <Box sx={containerStyle}>
          <Box sx={loginCardStyle}>
            <Typography variant="h4" sx={headerStyle}>
              Supplier Login
            </Typography>
            <Typography variant="body2" sx={subHeaderStyle}>
              Enter your credentials to access your supplier account.
            </Typography>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Box mb={2}>
                <FormInput
                  name="email"
                  label="Email"
                  type="email"
                  icon={<Mail size={18} />}
                  register={register}
                  errors={errors}
                />
              </Box>
              <Box mb={2}>
                <FormInput
                  name="password"
                  label="Password"
                  type="password"
                  icon={<Lock size={18} />}
                  register={register}
                  errors={errors}
                />
              </Box>

              <CustomButton
                fullWidth
                type="submit"
                text="Login"
                loading={loading}
              />
            </form>

            <Typography variant="body2" sx={footerTextStyle}>
              Don't have an account?{" "}
              <Link
                to="/supplier-register"
                style={{ color: "#1976d2", fontWeight: 500 }}
              >
                Register here
              </Link>
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
}
