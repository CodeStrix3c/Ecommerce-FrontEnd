import { FormProvider, useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef } from "react";

import {
  useVendorProductAssign,
  useUpdateVendorProduct,
} from "@/hooks/Vendor/useVedorProducts";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import { assignProductSchema } from "@/features/farmer-registration/schemas/assignProductSchema";

const AssignProductModal = ({
  isOpen,
  onClose,
  productId,
  assignmentId,
  vendorId,
  onSuccess, // ⬅️ callback to parent
  mode = "assign",
  initialData = null,
}) => {
  const isSubmittingRef = useRef(false);

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
    formState: { errors },
  } = methods;

  /* ---------- RESET FORM ---------- */
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

  /* ---------- MUTATIONS ---------- */
  const assignMutation = useMutation({
    ...useVendorProductAssign(),
    onSuccess: () => {
      isSubmittingRef.current = false;
      onSuccess?.("assign"); // 🔥 notify parent
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
      onSuccess?.("update"); // 🔥 notify parent
      onClose();
    },
    onError: () => {
      isSubmittingRef.current = false;
    },
  });

  const isLoading = assignMutation.isLoading || updateMutation.isLoading;

  /* ---------- SUBMIT ---------- */
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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] md:w-[30%]">
        <div className="flex justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">
            {mode === "assign" ? "Assign Product" : "Update Product"}
          </h2>
          <button onClick={onClose}>✕</button>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
            <FormInput name="price" label="Price" errors={errors.price} />

            <FormInput
              name="discountPrice"
              label="Discount Price"
              required={false}
              errors={errors.discountPrice}
            />

            <FormInput
              name="quantity"
              label="Quantity"
              errors={errors.quantity}
            />

            <div className="flex items-center gap-2">
              <Controller
                name="isActive"
                control={control}
                render={({ field }) => (
                  <Checkbox {...field} checked={!!field.value} />
                )}
              />
              <span className="text-sm">Active</span>
            </div>

            <button
              disabled={isLoading}
              className="w-full bg-black text-white py-2 rounded"
            >
              {isLoading
                ? "Saving..."
                : mode === "assign"
                  ? "Assign Product"
                  : "Update Product"}
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default AssignProductModal;
