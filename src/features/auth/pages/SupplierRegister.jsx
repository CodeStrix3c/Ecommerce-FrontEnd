import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import useIsMobile from "@/hooks/useInMobile";
import FormInput from "@/components/ui/FormInput";
import CustomButton from "@/components/ui/CustomButton";
import FileUploadField from "@/components/ui/FileUploadField";
import { supplierRegisterSchema } from "@/schemas/authSchemas";
import SupplierRegistrationModal from "../components/SupplierRegistrationModal";

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
    <main className="flex justify-center items-start min-h-screen p-6 md:p-10 lg:mt-20">
      <section className="w-full max-w-5xl bg-[var(--color-white)] rounded-xl p-8 shadow-md">
        {/* Header */}
        <header className="mb-8 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--color-black)]">
            Supplier Registration
          </h1>
          <p className="text-sm text-[var(--color-black)] opacity-70">
            Fill in the details below to create your supplier account.
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Company Details */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-[var(--color-black)]">
              Company Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                name="licenseNumber"
                label="Pesticide License Number"
                register={register}
                errors={errors}
              />
            </div>
          </section>

          {/* Contact Details */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-[var(--color-black)]">
              Contact Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
            </div>
          </section>

          {/* Security */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-[var(--color-black)]">
              Security
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            </div>
          </section>

          {/* Address & Location */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-[var(--color-black)]">
              Business Location
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <FormInput
                name="address"
                label="Shop / Business Address"
                register={register}
                errors={errors}
              />
              <FormInput
                name="city"
                label="Town / City"
                register={register}
                errors={errors}
              />
              <FormInput
                name="state"
                label="State / Province"
                register={register}
                errors={errors}
              />
              <FormInput
                name="country"
                label="Country"
                register={register}
                errors={errors}
              />
            </div>

            <div className="mt-3">
              <CustomButton
                text={loadingLocation ? "Detecting..." : "Use Current Location"}
                variant="outlined"
                onClick={handleUseLocation}
                disabled={loadingLocation}
                sx={{ border: "none", minWidth: "200px" }}
              />
            </div>
          </section>

          {/* Upload Documents */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-[var(--color-black)]">
              Upload Documents & Media
            </h2>
            <div className="space-y-6">
              <FileUploadField
                name="shopPhotos"
                label="Shop / Store Photos"
                register={register}
                errors={errors}
                multiple={true}
              />
              <FileUploadField
                name="companyDocuments"
                label="Company Documents (License, Certificates, etc.)"
                register={register}
                errors={errors}
                multiple={true}
              />
            </div>
          </section>

          {/* Submit */}
          <CustomButton fullWidth type="submit" text="Register Supplier" />
        </form>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-[var(--color-black)] opacity-70">
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
