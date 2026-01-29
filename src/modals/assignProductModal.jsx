import FormInput from "@/components/shared/custom-inputs/FormInput";
import { Checkbox } from "@mui/material";
import {
  useForm,
  FormProvider,
  Controller,
  useFormContext,
} from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useVendorProductAssign } from "@/hooks/Vendor/useVedorProducts";

const AssignProductForm = ({ productId, vendorId, onClose }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useFormContext();

  const { mutate, isLoading } = useMutation({
    ...useVendorProductAssign(),
    onSuccess: () => {
      onClose();
    },
  });

  const onSubmit = (data) => {
    const payload = {
      productId,
      assignedPrice: Number(data.price),
      discountPrice: Number(data.discountPrice) || 0,
      stockQuantity: Number(data.quantity),
      isActive: data.isActive,
    };

    mutate({
      vendorId,
      payload,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4 space-y-4">
      <div className="flex gap-4">
        <FormInput
          name="price"
          label="Price"
          register={register}
          errors={errors?.price}
        />

        <FormInput
          name="discountPrice"
          label="Discount Price"
          register={register}
          errors={errors?.discountPrice}
          required={false}
        />
      </div>

      <FormInput
        name="quantity"
        label="Total Quantity"
        register={register}
        errors={errors?.quantity}
      />

      <div className="flex items-center gap-2">
        <Controller
          name="isActive"
          control={control}
          render={({ field }) => <Checkbox {...field} checked={field.value} />}
        />
        <span className="text-sm">Active</span>
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-black text-white py-2 rounded disabled:opacity-60"
      >
        {isLoading ? "Assigning..." : "Assign Product"}
      </button>

      {/* <p className="text-xs text-gray-400">Selected Product ID: {productId}</p> */}
    </form>
  );
};

const AssignProductModal = ({ isOpen, onClose, productId, vendorId }) => {
  if (!isOpen) return null;

  const methods = useForm({
    defaultValues: {
      price: "",
      discountPrice: "",
      quantity: "",
      isActive: true,
    },
  });

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-[90%] md:w-[60%] lg:w-[50%]">
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <h2 className="text-lg font-semibold">Assign the products</h2>
          <button
            onClick={onClose}
            className="text-xl font-bold hover:opacity-70"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <FormProvider {...methods}>
          <AssignProductForm
            productId={productId}
            vendorId={vendorId}
            onClose={onClose}
          />
        </FormProvider>
      </div>
    </div>
  );
};

export default AssignProductModal;
