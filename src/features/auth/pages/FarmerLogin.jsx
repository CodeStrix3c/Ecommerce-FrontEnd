import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Email, Lock } from "@mui/icons-material";
import { loginSchema } from "@/features/farmer-registration/schemas/authSchemas";
import CustomButton from "@/components/ui/CustomButton";
import FormInput from "@/components/shared/custom-inputs/FormInput";

export default function FarmerLogin() {
  const [redirect, setRedirect] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const iconStyle = { color: "var(--color-secondary)", fontSize: 20 };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) setIsLoggedIn(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      console.log("Login Data:", data);
      await new Promise((res) => setTimeout(res, 1000));
      toast.success("Logged in successfully!");
      localStorage.setItem("authToken", "dummyToken");
      setRedirect(true);
    } catch (err) {
      toast.error("Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  if (redirect || isLoggedIn) return <Navigate to="/" />;

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: "1rem",
        backgroundColor: "var(--color-white)",
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "2rem",
          borderRadius: "12px",
          border: "1px solid var(--color-black)",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <header style={{ textAlign: "center", marginBottom: "1.5rem" }}>
          <h1 style={{ fontSize: "1.75rem", fontWeight: "bold" }}>
            Farmer Login
          </h1>
          <p style={{ fontSize: "0.875rem", color: "var(--color-black)" }}>
            Enter your credentials to access your farmer account.
          </p>
        </header>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <FormInput
            name="email"
            label="Email"
            type="email"
            icon={<Email sx={iconStyle} />}
            register={register}
            errors={errors}
          />
          <FormInput
            name="password"
            label="Password"
            type="password"
            icon={<Lock sx={iconStyle} />}
            register={register}
            errors={errors}
          />
          <CustomButton
            fullWidth
            type="submit"
            text="Login"
            loading={loading}
            style={{
              backgroundColor: "var(--color-primary)",
              color: "var(--color-white)",
              padding: "0.75rem",
              borderRadius: "12px",
              fontWeight: "600",
            }}
          />
        </form>

        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            marginTop: "1.5rem",
            fontSize: "0.875rem",
          }}
        >
          Don't have an account?{" "}
          <Link
            to="/farmer-register"
            style={{
              color: "var(--color-primary)",
              fontWeight: "500",
              textDecoration: "underline",
            }}
          >
            Register here
          </Link>
        </footer>
      </section>
    </main>
  );
}
