import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock } from "lucide-react";
import { Box, Divider } from "@mui/material";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "../../../components/ui/FormInput";
import CustomButton from "@/components/ui/CustomButton";
import { toast } from "react-toastify";
import { useAuth } from "@/hooks";
import { Link } from "react-router-dom";
import { supplierLoginSchema } from "@/schemas/authSchemas";

const SupplierLoginModal = ({ isOpen, onClose }) => {
  const [loading, setLoading] = useState(false);
  const auth = useAuth();

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
      const response = await auth.loginSupplier(data); // Make sure this exists in your auth hook

      if (response.success) {
        toast.success(response.message);
        onClose();
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-x-0 bottom-0 z-50 flex h-fit flex-col bg-white rounded-t-2xl shadow-xl"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-3 shadow-sm relative">
              <h2 className="flex-1 text-center text-lg font-semibold text-[var(--color-neutral-dark)]">
                Supplier Login
              </h2>
              <button
                onClick={onClose}
                className="absolute right-4 rounded-full p-1 hover:bg-[var(--color-white-hover)]"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 pt-4 pb-24">
              <Box className="mt-2">
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="flex flex-col gap-4"
                  noValidate
                >
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
                    name="password"
                    label="Password"
                    type="password"
                    icon={<Lock size={18} />}
                    register={register}
                    errors={errors}
                    size="small"
                  />

                  <CustomButton
                    fullWidth
                    type="submit"
                    loading={loading}
                    text="Login"
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
                Don't have an account?
              </Divider>

              <div className="flex justify-center">
                <Link
                  to="/supplier-register"
                  className="font-medium text-[var(--color-primary)] hover:underline"
                >
                  Register
                </Link>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SupplierLoginModal;
