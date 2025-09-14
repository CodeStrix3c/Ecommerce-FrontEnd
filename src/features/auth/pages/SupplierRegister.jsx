// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { toast } from "react-toastify";

// import FormInput from "@/features/auth/components/FormInput";
// import FileUploadField from "@/features/auth/components/FileUploadField";
// import CustomButton from "@/components/ui/CustomButton";
// import { supplierRegisterSchema } from "@/schemas/authSchemas";
// import SupplierRegistrationModal from "../components/SupplierRegistrationModal";
// import RegistrationLayout from "../RegistrationLayout";
// import FormSection from "../components/FormSection";
// import LocationInput from "../components/LocationInput";

// export default function SupplierRegister() {
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm({
//     resolver: zodResolver(supplierRegisterSchema),
//   });

//   const onSubmit = (data) => {
//     console.log(data);
//     toast.success("Supplier registered successfully!");
//   };

//   return (
//     <RegistrationLayout
//       title="Supplier Registration"
//       subtitle="Fill in the details below to create your supplier account"
//       loginLink="/supplier-login"
//       loginText="Login here"
//       modalComponent={SupplierRegistrationModal}
//       onSubmit={handleSubmit(onSubmit)}
//     >
//       {/* Company Details */}
//       <FormSection title="Company Details">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
//           <FormInput
//             name="companyName"
//             label="Company Name"
//             register={register}
//             errors={errors}
//           />
//           <FormInput
//             name="contactPerson"
//             label="Contact Person"
//             register={register}
//             errors={errors}
//           />
//         </div>
//       </FormSection>

//       <FormSection title="Contact Information">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <FormInput
//             name="email"
//             label="Email"
//             type="email"
//             register={register}
//             errors={errors}
//           />
//           <FormInput
//             name="phone"
//             label="Phone"
//             type="tel"
//             register={register}
//             errors={errors}
//           />
//         </div>
//       </FormSection>

//       <FormSection title="Security">
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <FormInput
//             name="password"
//             label="Password"
//             type="password"
//             register={register}
//             errors={errors}
//           />
//           <FormInput
//             name="confirmPassword"
//             label="Confirm Password"
//             type="password"
//             register={register}
//             errors={errors}
//           />
//         </div>
//       </FormSection>

//       <FormSection
//         title="Business Location"
//         actionText="Use Live Location"
//         onActionClick={""} // function to detect location
//       >
//         <LocationInput
//           register={register}
//           errors={errors}
//           setValue={setValue}
//           variant="icon" // normal inputs with icon inside last input
//         />
//       </FormSection>

//       <FormSection title="Upload Documents & Media">
//         <FileUploadField
//           name="shopPhotos"
//           label="Shop / Store Photos"
//           register={register}
//           errors={errors}
//           multiple
//         />
//       </FormSection>

//       <CustomButton fullWidth type="submit" text="Register Supplier" />
//     </RegistrationLayout>
//   );
// }
import React from "react";

function SupplierRegister() {
  return <div>SupplierRegister</div>;
}

export default SupplierRegister;
