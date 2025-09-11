import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Mail, Lock } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/FormInput";
import SupplierLoginModal from "../components/SupplierLoginModal";
import useIsMobile from "@/hooks/useInMobile";
import { supplierLoginSchema } from "@/schemas/authSchemas";
import CustomButton from "@/components/ui/CustomButton";
import FarmerLoginModal from "../components/FarmerLoginModal";

export default function FarmerLogin() {
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

  if (isMobile)
    return <FarmerLoginModal isOpen={true} onClose={() => setRedirect(true)} />;

  return (
    <main className="flex items-center justify-center min-h-screen  p-4">
      <section className="w-full max-w-md bg-[var(--color-white)] rounded-2xl border border-[var(--color-neutral-medium)] p-8 shadow-lg">
        {/* Header */}
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[var(--color-neutral-dark)] mb-2">
            Farmer Login
          </h1>
          <p className="text-sm text-[var(--color-neutral-dark)]">
            Enter your credentials to access your farmer account.
          </p>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <FormInput
            name="email"
            label="Email"
            type="email"
            icon={<Mail size={18} />}
            register={register}
            errors={errors}
          />
          <FormInput
            name="password"
            label="Password"
            type="password"
            icon={<Lock size={18} />}
            register={register}
            errors={errors}
          />
          <CustomButton
            fullWidth
            type="submit"
            text="Login"
            loading={loading}
            className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-[var(--color-white)] font-semibold py-3 rounded-xl"
          />
        </form>

        {/* Footer */}
        <footer className="mt-6 text-center text-sm text-[var(--color-neutral-dark)]">
          Don't have an account?{" "}
          <Link
            to="/supplier-register"
            className="text-[var(--color-primary)] font-medium underline"
          >
            Register here
          </Link>
        </footer>
      </section>
    </main>
  );
}
