import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MapPin } from "lucide-react";
import { Box, Divider, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks";

import FormInput from "@/components/ui/FormInput";
import FileUploadField from "@/components/ui/FileUploadField";
import CustomButton from "@/components/ui/CustomButton";
import { supplierRegisterSchema } from "@/schemas/authSchemas";

const SupplierRegistrationModal = ({ isOpen, onClose }) => {
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
    resolver: zodResolver(supplierRegisterSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const response = (await auth.registerSupplier)
      ? await auth.registerSupplier(data)
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

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40 bg-[var(--color-overlay)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 flex h-[90%] flex-col bg-white rounded-t-2xl shadow-xl overflow-y-auto"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-3 shadow-sm">
              <h2 className="flex-1 text-center text-lg font-semibold text-[var(--color-neutral-dark)]">
                Supplier Registration
              </h2>
              <button
                onClick={onClose}
                className="absolute right-4 rounded-full p-1 hover:bg-[var(--color-white-hover)]"
              >
                <X className="h-6 w-6 text-[var(--color-black)]" />
              </button>
            </div>

            {/* Body */}
            <Box className="px-5 pt-4 pb-24">
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
              >
                {/* Company Details */}
                <h3 className="text-lg font-semibold mt-2">Company Details</h3>
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

                {/* Contact Info */}
                <h3 className="text-lg font-semibold mt-4">
                  Contact Information
                </h3>
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

                {/* Security */}
                <h3 className="text-lg font-semibold mt-4">Security</h3>
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

                {/* Location */}
                <h3 className="text-lg font-semibold mt-4">
                  Business Location
                </h3>
                {useManualLocation ? (
                  <>
                    <FormInput
                      name="address"
                      label="Street Address"
                      register={register}
                      errors={errors}
                    />
                    <FormInput
                      name="city"
                      label="City"
                      register={register}
                      errors={errors}
                    />
                    <FormInput
                      name="state"
                      label="State"
                      register={register}
                      errors={errors}
                    />
                    <FormInput
                      name="country"
                      label="Country"
                      register={register}
                      errors={errors}
                    />
                  </>
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
                  text={
                    loadingLocation ? "Detecting..." : "Use Current Location"
                  }
                  variant="outlined"
                  onClick={handleUseLocation}
                  disabled={loadingLocation}
                  sx={{ border: "none", minWidth: "200px" }}
                />

                {/* Media Upload */}
                <h3 className="text-lg font-semibold mt-4">
                  Upload Documents & Media
                </h3>
                <FileUploadField
                  name="shopPhotos"
                  label="Shop / Store Photos"
                  register={register}
                  errors={errors}
                  multiple
                />

                {/* Submit */}
                <CustomButton
                  fullWidth
                  type="submit"
                  loading={loading}
                  text="Register Supplier"
                />
              </form>

              {/* Footer */}
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
                  href="/supplier-login"
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

export default SupplierRegistrationModal;
