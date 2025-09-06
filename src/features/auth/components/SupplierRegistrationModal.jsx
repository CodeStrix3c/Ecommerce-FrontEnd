import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Building2,
  Mail,
  Lock,
  Phone,
  MapPin,
  User,
  Landmark,
} from "lucide-react";
import { Button, Divider, Box } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../components/ui/FormInput";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks";
import { Link } from "react-router-dom";
import { supplierRegisterSchema } from "@/schemas/authSchemas";
import CustomButton from "@/components/ui/CustomButton";

const SupplierRegistrationModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
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
    const response = await auth.registerSupplier(data);
    setLoading(false);

    if (response.success) {
      toast.success(response.message);
      onClose();
    } else {
      toast.error(response.message);
    }
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        toast.info(`Got coordinates: ${latitude}, ${longitude}`);
      },
      () => toast.error("Unable to fetch location")
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 z-40 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 flex h-[90%] flex-col bg-white rounded-t-2xl shadow-xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <div className="flex items-center justify-between border-b px-4 py-3 shadow-sm">
              <h2 className="flex-1 text-center text-lg font-semibold text-[var(--color-neutral-dark)]">
                Supplier Registration
              </h2>
              <button
                onClick={onClose}
                className="absolute right-4 rounded-full p-1 hover:bg-[var(--color-white-hover)]"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 pt-4 pb-24">
              <Box className="mt-2">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                >
                  <FormInput
                    name="companyName"
                    label="Company Name"
                    icon={<Building2 size={18} />}
                    register={register}
                    errors={errors}
                    size="small"
                  />
                  <FormInput
                    name="contactPerson"
                    label="Contact Person"
                    icon={<User size={18} />}
                    register={register}
                    errors={errors}
                    size="small"
                  />
                  <FormInput
                    name="email"
                    label="Email"
                    type="email"
                    icon={<Mail size={18} />}
                    register={register}
                    errors={errors}
                    size="small"
                  />
                  <FormInput
                    name="phone"
                    label="Phone"
                    type="tel"
                    icon={<Phone size={18} />}
                    register={register}
                    errors={errors}
                    size="small"
                  />
                  <FormInput
                    name="password"
                    label="Password"
                    type="password"
                    icon={<Lock size={18} />}
                    register={register}
                    errors={errors}
                    size="small"
                  />
                  <FormInput
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    icon={<Lock size={18} />}
                    register={register}
                    errors={errors}
                    size="small"
                  />
                  <FormInput
                    name="licenseNumber"
                    label="Pesticide License Number"
                    icon={<Landmark size={18} />}
                    register={register}
                    errors={errors}
                    size="small"
                  />

                  {useManualLocation ? (
                    <>
                      <FormInput
                        name="address"
                        label="Street Address"
                        icon={<MapPin size={18} />}
                        register={register}
                        errors={errors}
                        size="small"
                      />
                      <FormInput
                        name="city"
                        label="City"
                        register={register}
                        errors={errors}
                        size="small"
                      />
                      <FormInput
                        name="state"
                        label="State"
                        register={register}
                        errors={errors}
                        size="small"
                      />
                      <FormInput
                        name="country"
                        label="Country"
                        register={register}
                        errors={errors}
                        size="small"
                      />
                    </>
                  ) : (
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={handleUseLocation}
                      sx={{
                        mt: 1,
                        textTransform: "none",
                        borderRadius: "12px",
                      }}
                    >
                      Detect Current Location
                    </Button>
                  )}

                  <CustomButton
                    fullWidth
                    variant="text"
                    onClick={() => setUseManualLocation(!useManualLocation)}
                    text={"use Current Location"}
                    sx={{ mt: 1 }}
                  />

                  <CustomButton
                    fullWidth
                    type="submit"
                    loading={loading}
                    text="Register Supplier"
                  />
                </form>
              </Box>

              <Divider
                sx={{
                  my: 4,
                  fontSize: "0.85rem",
                  color: "#6b7280",
                  "&::before, &::after": {
                    borderColor: "var(--color-neutral-dark-hover)",
                  },
                }}
              >
                Already have an account?
              </Divider>

              <div className="flex justify-center">
                <Link
                  to="/supplier/login"
                  className="font-medium text-[var(--color-primary)] hover:underline"
                >
                  Log in
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SupplierRegistrationModal;
