import { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import useIsMobile from "@/hooks/useInMobile";
import SelectField from "@/components/ui/SelectField";
import FileUploadField from "@/components/ui/FileUploadField";
import FormInput from "@/components/ui/FormInput";
import CustomButton from "@/components/ui/CustomButton";
import { farmerRegisterSchema } from "@/schemas/authSchemas";

export default function FarmerRegister() {
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
    resolver: zodResolver(farmerRegisterSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Farmer registered successfully!");
    setRedirect(true);
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) return toast.error("Geolocation not supported");
    setLoadingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setValue(
          "farmLocation",
          `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
        );
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
      <FarmerRegistrationModal
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
            Farmer Registration
          </h1>
          <p className="text-sm text-[var(--color-black)] opacity-70">
            Fill in the details below to create your account
          </p>
        </header>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Personal Details */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-[var(--color-black)]">
              Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormInput
                name="fullName"
                label="Full Name"
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
                name="email"
                label="Email"
                type="email"
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
            </div>
          </section>

          {/* Farm Details */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-[var(--color-black)]">
              Farm Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <FormInput
                name="farmName"
                label="Farm / Orchard Name"
                register={register}
                errors={errors}
              />
              <FormInput
                name="farmSize"
                label="Farm Size (in acres/hectares)"
                register={register}
                errors={errors}
              />
              <FormInput
                name="mainCrops"
                label="Main Crops (e.g. Wheat, Mango, Rice)"
                register={register}
                errors={errors}
                className="col-span-1 md:col-span-2 lg:col-span-3"
              />
            </div>
          </section>

          {/* Soil & Irrigation */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-[var(--color-black)]">
              Soil & Irrigation
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <SelectField
                name="soilType"
                label="Soil Type"
                register={register}
                errors={errors}
                options={[
                  { value: "sandy", label: "Sandy" },
                  { value: "clay", label: "Clay" },
                  { value: "silty", label: "Silty" },
                  { value: "loamy", label: "Loamy" },
                  { value: "peaty", label: "Peaty" },
                  { value: "chalky", label: "Chalky" },
                ]}
                required
              />
              <SelectField
                name="irrigationMethod"
                label="Irrigation Method"
                register={register}
                errors={errors}
                options={[
                  { value: "drip", label: "Drip" },
                  { value: "sprinkler", label: "Sprinkler" },
                  { value: "surface", label: "Surface" },
                  { value: "manual", label: "Manual" },
                ]}
                required
              />
            </div>
          </section>

          {/* Environmental Conditions */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-[var(--color-black)]">
              Environmental Conditions
            </h2>
            <FormInput
              name="environmentalConditions"
              label="Conditions (e.g. drought, pests, floods)"
              register={register}
              errors={errors}
            />
          </section>

          {/* Media Upload */}
          <FileUploadField
            name="farmMedia"
            label="Upload Farm Media"
            register={register}
            errors={errors}
            multiple={true}
          />

          {/* Location */}
          <section>
            <h2 className="text-lg font-semibold mb-4 text-[var(--color-black)]">
              Farm Location
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput
                name="farmLocation"
                label="Farm Location (Lat, Long)"
                register={register}
                errors={errors}
              />
              <CustomButton
                fullWidth
                text={loadingLocation ? "Detecting..." : "Use Current Location"}
                variant="outlined"
                onClick={handleUseLocation}
                disabled={loadingLocation}
              />
            </div>
          </section>

          {/* Submit */}
          <CustomButton fullWidth type="submit" text="Register Farmer" />
        </form>

        {/* Footer//// */}
        <footer className="mt-8 text-center">
          <p className="text-sm text-[var(--color-black)] opacity-70">
            Already have an account?{" "}
            <Link
              to="/login"
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
