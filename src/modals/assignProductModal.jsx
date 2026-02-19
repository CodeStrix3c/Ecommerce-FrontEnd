import { FormProvider, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Switch } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  useVendorProductAssign,
  useUpdateVendorProduct,
} from "@/hooks/Vendor/useVedorProducts";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import { assignProductSchema } from "@/features/farmer-registration/schemas/assignProductSchema";

/* ---------- Animations ---------- */
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.25, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.96,
    transition: { duration: 0.18 },
  },
};

const AssignProductModal = ({
  isOpen,
  onClose,
  productId,
  assignmentId,
  vendorId,
  onSuccess,
  mode = "assign",
  initialData = null,
}) => {
  const isSubmittingRef = useRef(false);

  /* ---------- Form ---------- */
  const methods = useForm({
    resolver: zodResolver(assignProductSchema),
    defaultValues: {
      price: "",
      discountPrice: "",
      quantity: "",
      isActive: true,
    },
  });

  const {
    reset,
    handleSubmit,
    control,
    watch,
    formState: { errors },
  } = methods;

  const isActiveValue = watch("isActive") ?? false;

  /* ---------- Reset Form ---------- */
  useEffect(() => {
    if (!isOpen) return;

    isSubmittingRef.current = false;

    if (mode === "update" && initialData) {
      reset({
        price: initialData.assignedPrice ?? "",
        discountPrice: initialData.discountPrice ?? "",
        quantity: initialData.stockQuantity ?? "",
        isActive: initialData.isActive ?? true,
      });
    } else {
      reset({
        price: "",
        discountPrice: "",
        quantity: "",
        isActive: true,
      });
    }
  }, [isOpen, mode, initialData, reset]);

  /* ---------- Mutations ---------- */
  const assignMutation = useMutation({
    ...useVendorProductAssign(),
    onSuccess: () => {
      isSubmittingRef.current = false;
      onSuccess?.("assign");
      onClose();
    },
    onError: () => {
      isSubmittingRef.current = false;
    },
  });

  const updateMutation = useMutation({
    ...useUpdateVendorProduct(),
    onSuccess: () => {
      isSubmittingRef.current = false;
      onSuccess?.("update");
      onClose();
    },
    onError: () => {
      isSubmittingRef.current = false;
    },
  });

  const isLoading = assignMutation.isLoading || updateMutation.isLoading;

  /* ---------- Submit ---------- */
  const onSubmit = (data) => {
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;

    const payload = {
      assignedPrice: data.price,
      discountPrice: data.discountPrice || 0,
      stockQuantity: data.quantity,
      isActive: data.isActive,
    };

    if (mode === "assign") {
      assignMutation.mutate({
        payload: { ...payload, productId },
      });
    } else {
      updateMutation.mutate({
        vendorId,
        assignmentId,
        payload,
      });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-[92%] md:w-[420px] bg-white rounded-2xl shadow-2xl border border-gray-100"
          >
            {/* Header */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                {mode === "assign" ? "Assign Product" : "Update Product"}
              </h2>

              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-700 transition text-lg"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <FormProvider {...methods}>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="px-6 py-5 space-y-5"
              >
                <FormInput
                  name="price"
                  label="Price"
                  errors={errors.price}
                  placeholder="Enter The Price"
                />

                <FormInput
                  name="discountPrice"
                  label="Discount Price"
                  placeholder="Enter The Discount Price "
                  required={false}
                  errors={errors.discountPrice}
                />

                <FormInput
                  name="quantity"
                  label="Quantity"
                  placeholder="Enter The quantity"
                  errors={errors.quantity}
                />

                {/* Toggle */}
                <div className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3">
                  <span
                    className={`text-sm font-semibold transition-all duration-300 ${
                      isActiveValue
                        ? "text-[var(--color-primary)]"
                        : "text-[var(--color-error)]"
                    }`}
                  >
                    {isActiveValue ? "Product Active" : "Product Inactive"}
                  </span>

                  <Controller
                    name="isActive"
                    control={control}
                    render={({ field }) => (
                      <Switch
                        checked={!!field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "var(--color-secondary)",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: "var(--color-secondary)",
                            },
                        }}
                      />
                    )}
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isLoading}
                  className="w-full bg-[var(--color-secondary)] text-white py-2.5 rounded-xl font-medium shadow-md hover:shadow-lg transition disabled:opacity-60"
                >
                  {isLoading ? (
                    <span className="flex justify-center items-center gap-2">
                      <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Saving...
                    </span>
                  ) : mode === "assign" ? (
                    "Assign Product"
                  ) : (
                    "Update Product"
                  )}
                </motion.button>
              </form>
            </FormProvider>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AssignProductModal;
