import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin } from "lucide-react";
import { Box, Divider, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/ui/FormInput";
import SelectField from "@/components/ui/SelectField";
import FileUploadField from "@/components/ui/FileUploadField";
import CustomButton from "@/components/ui/CustomButton";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks";
import { farmerRegisterSchema } from "@/schemas/authSchemas";

const FarmerRegistrationModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [useManualLocation, setUseManualLocation] = useState(true);
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(farmerRegisterSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const response = (await auth.registerFarmer)
      ? await auth.registerFarmer(data)
      : { success: true, message: "Registered successfully" }; // fallback for testing
    setLoading(false);

    if (response.success) {
      toast.success(response.message);
      onClose();
    } else {
      toast.error(response.message);
    }
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-[var(--color-overlay)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 flex h-[90%] flex-col bg-white rounded-t-2xl shadow-xl overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between border-b px-4 py-3 shadow-sm">
              <h2 className="flex-1 text-center text-lg font-semibold text-[var(--color-neutral-dark)]">
                Farmer Registration
              </h2>
              <button
                onClick={onClose}
                className="absolute right-4 rounded-full p-1 hover:bg-[var(--color-white-hover)]"
              >
                <X className="h-6 w-6 text-[var(--color-black)]" />
              </button>
            </div>

            <Box className="px-5 pt-4 pb-24">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {/* Personal Details */}
                <h3 className="text-lg font-semibold mt-2">Personal Details</h3>
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

                {/* Farm Details */}
                <h3 className="text-lg font-semibold mt-4">Farm Details</h3>
                <FormInput
                  name="farmName"
                  label="Farm / Orchard Name"
                  register={register}
                  errors={errors}
                />
                <FormInput
                  name="farmSize"
                  label="Farm Size (acres/hectares)"
                  register={register}
                  errors={errors}
                />
                <FormInput
                  name="mainCrops"
                  label="Main Crops"
                  register={register}
                  errors={errors}
                />

                {/* Soil & Irrigation */}
                <h3 className="text-lg font-semibold mt-4">
                  Soil & Irrigation
                </h3>
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
                />

                {/* Environmental Conditions */}
                <h3 className="text-lg font-semibold mt-4">
                  Environmental Conditions
                </h3>
                <FormInput
                  name="environmentalConditions"
                  label="Conditions (e.g. drought, pests, floods)"
                  register={register}
                  errors={errors}
                />

                {/* Media Upload */}
                <h3 className="text-lg font-semibold mt-4">Farm Media</h3>
                <FileUploadField
                  name="farmMedia"
                  label="Upload Farm Media"
                  register={register}
                  errors={errors}
                  multiple
                />

                {/* Location */}
                <h3 className="text-lg font-semibold mt-4">Farm Location</h3>
                {useManualLocation ? (
                  <FormInput
                    name="farmLocation"
                    label="Farm Location (Lat, Long)"
                    icon={<MapPin size={18} />}
                    register={register}
                    errors={errors}
                  />
                ) : (
                  <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleUseLocation}
                    disabled={loadingLocation}
                  >
                    {loadingLocation
                      ? "Detecting..."
                      : "Detect Current Location"}
                  </Button>
                )}

                <CustomButton
                  fullWidth
                  variant="text"
                  onClick={() => setUseManualLocation(!useManualLocation)}
                  text={
                    useManualLocation
                      ? "Use Current Location"
                      : "Use Manual Address"
                  }
                  sx={{ mt: 1 }}
                />

                <CustomButton
                  fullWidth
                  type="submit"
                  loading={loading}
                  text="Register Farmer"
                />
              </form>

              <Divider
                sx={{
                  my: 4,
                  "&::before, &::after": {
                    borderColor: "var(--color-neutral-dark-hover)",
                  },
                }}
              >
                Already have an account?
              </Divider>

              <div className="flex justify-center">
                <a
                  href="/login"
                  className="font-medium text-[var(--color-primary)] hover:underline"
                >
                  Log in
                </a>
              </div>
            </Box>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default FarmerRegistrationModal;
