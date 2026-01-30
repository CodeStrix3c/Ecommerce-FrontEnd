import { FormProvider, useForm, Controller } from "react-hook-form";
import { Checkbox } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import {
  useVendorProductAssign,
  useUpdateVendorProduct,
} from "@/hooks/Vendor/useVedorProducts";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import { toast } from "react-toastify";
import { useEffect } from "react";

const AssignProductModal = ({
  isOpen,
  onClose,
  productId, // used ONLY for assign
  assignmentId, // used ONLY for update (id: 30)
  vendorId,
  onSuccess,
  mode = "assign",
  initialData = null,
}) => {
  const methods = useForm({
    defaultValues: {
      price: "",
      discountPrice: "",
      quantity: "",
      isActive: true,
    },
  });

  const { reset, handleSubmit, control } = methods;

  /* ---------- RESET FORM ---------- */
  useEffect(() => {
    if (!isOpen) return;

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
      toast.success("Product assigned successfully");
      reset();
      onSuccess?.();
      onClose();
    },
    onError: () => toast.error("Failed to assign product"),
  });

  const updateMutation = useMutation({
    ...useUpdateVendorProduct(),
    onSuccess: () => {
      toast.success("Product updated successfully");
      reset();
      onSuccess?.();
      onClose();
    },
    onError: () => toast.error("Failed to update product"),
  });

  if (!isOpen) return null;

  /* ---------- SUBMIT ---------- */
  const onSubmit = (data) => {
    const payload = {
      assignedPrice: +data.price,
      discountPrice: +data.discountPrice || 0,
      stockQuantity: +data.quantity,
      isActive: data.isActive,
    };

    if (mode === "assign") {
      if (!productId) {
        toast.error("Product not selected");
        return;
      }

      assignMutation.mutate({
        payload: {
          ...payload,
          productId,
        },
      });
    } else {
      if (!assignmentId) {
        toast.error("Assignment ID missing");
        return;
      }

      updateMutation.mutate({
        vendorId,
        assignmentId, // ✅ CORRECT KEY
        payload,
      });
    }
  };

  const isLoading = assignMutation.isLoading || updateMutation.isLoading;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] md:w-[30%]">
        <div className="flex justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">
            {mode === "assign" ? "Assign Product" : "Update Product"}
          </h2>
          <button
            onClick={() => {
              reset();
              onClose();
            }}
          >
            ✕
          </button>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
            <FormInput name="price" label="Price" />
            <FormInput
              name="discountPrice"
              label="Discount Price"
              required={false}
            />
            <FormInput name="quantity" label="Quantity" />

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
