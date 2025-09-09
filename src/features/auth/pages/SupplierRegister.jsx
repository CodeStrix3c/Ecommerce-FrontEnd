import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SupplierRegistrationModal from "../components/SupplierRegistrationModal";
import { toast } from "react-toastify";
import FormInput from "@/components/ui/FormInput";
import CustomButton from "@/components/ui/CustomButton";
import { supplierRegisterSchema } from "@/schemas/authSchemas";
import useIsMobile from "@/hooks/useInMobile";

export default function SupplierRegister() {
  const isMobile = useIsMobile();
  const [redirect, setRedirect] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("authToken")) setIsLoggedIn(true);
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(supplierRegisterSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Supplier registered successfully!");
    setRedirect(true);
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) return toast.error("Geolocation not supported");
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setValue("address", `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        setLoadingLocation(false);
        toast.info("Location detected");
      },
      () => {
        setLoadingLocation(false);
        toast.error("Unable to fetch location");
      }
    );
  };

  if (redirect || isLoggedIn) return <Navigate to="/" />;

  if (isMobile)
    return (
      <SupplierRegistrationModal
        isOpen={true}
        onClose={() => setRedirect(true)}
      />
    );

  return (
    <main className="flex justify-center items-start min-h-screen p-8 lg:mt-24 md:mt28">
      <section
        aria-labelledby="supplier-registration-heading"
        className="w-full max-w-4xl bg-[var(--color-white)] rounded-2xl p-8 shadow-lg"
      >
        <header className="mb-6 text-center">
          <h1
            id="supplier-registration-heading"
            className="text-3xl font-bold text-[var(--color-neutral-dark)] mb-2"
          >
            Supplier Registration
          </h1>
          <p className="text-sm text-[var(--color-neutral-dark)]">
            Fill in the details to create your supplier account.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset className="grid grid-cols-1 md:grid-cols-2 gap-6 border-0 p-0 m-0">
            <legend className="sr-only">Supplier Details</legend>

            <FormInput
              name="companyName"
              label="Company Name"
              register={register}
              errors={errors}
            />
            <FormInput
              name="contactPerson"
              label="Contact Person"
              register={register}
              errors={errors}
            />
            <FormInput
              name="email"
              label="Email"
              type="email"
              register={register}
              errors={errors}
            />
            <FormInput
              name="phone"
              label="Phone"
              type="tel"
              register={register}
              errors={errors}
            />
            <FormInput
              name="password"
              label="Password"
              type="password"
              register={register}
              errors={errors}
            />
            <FormInput
              name="confirmPassword"
              label="Confirm Password"
              type="password"
              register={register}
              errors={errors}
            />
            <FormInput
              name="licenseNumber"
              label="Pesticide License Number"
              register={register}
              errors={errors}
              className="md:col-span-2"
            />
            <FormInput
              name="address"
              label="Street Address"
              register={register}
              errors={errors}
              className="md:col-span-2"
            />

            <div className="md:col-span-1">
              <CustomButton
                fullWidth
                text={loadingLocation ? "Detecting..." : "Use Current Location"}
                variant="text"
                onClick={handleUseLocation}
                disabled={loadingLocation}
              />
            </div>
            <div className="md:col-span-1">
              <CustomButton fullWidth type="submit" text="Register Supplier" />
            </div>
          </fieldset>
        </form>

        {/* Footer */}
        <footer className="mt-6 text-center">
          <p className="text-sm text-[var(--color-neutral-dark)]">
            Already have an account?{" "}
            <Link
              to="/supplier-login"
              className="text-[var(--color-primary)] font-medium hover:underline"
            >
              Login here
            </Link>
          </p>
        </footer>
      </section>
    </main>
  );
}
