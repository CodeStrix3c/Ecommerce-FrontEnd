// import React, { useState } from "react";
// import { useForm, FormProvider } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Box } from "@mui/material";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// import SectionTitle from "@/components/shared/SectionTitle";
// import ContentWrapper from "@/components/shared/ContentWrapper";
// import FormStepper from "@/components/shared/FormStepper";
// import FormNavigation from "@/features/farmer-registration/components/FormNavigation";
// import StepHeader from "@/features/auth/components/StepHeader";

// import ProfileSection from "@/features/farmer-registration/sections/ProfileSection";
// import AddressSection from "@/features/farmer-registration/sections/AddressSection";
// import EducationSection from "@/features/farmer-registration/sections/EducationSection";
// import ProfessionSection from "@/features/farmer-registration/sections/ProfessionSection";

// import {
//   PROFILE_FIELDS,
//   ADDRESS_FIELDS,
//   EDUCATION_FIELDS,
//   PROFESSION_FIELDS,
// } from "@/constants/profileFields";

// import { PROFILE_COMPLETION_STEPS } from "@/constants/stepperData";

// import { profileSchema } from "@/features/farmer-registration/schemas/profileSchema";
// import { addressSchema } from "@/features/farmer-registration/schemas/addressSchema";
// import { educationSchema } from "@/features/farmer-registration/schemas/educationSchema";
// import { professionSchema } from "@/features/farmer-registration/schemas/professionSchema";

// import {
//   useProfileMutation,
//   useAddressMutation,
//   useEducationMutation,
//   useProfessionMutation,
//   useProfileQuery,
// } from "@/hooks/useFarmerProfileMutations";

// const stepSchemas = [
//   profileSchema,
//   addressSchema,
//   educationSchema,
//   professionSchema,
// ];
// const stepFieldsMap = [
//   PROFILE_FIELDS,
//   ADDRESS_FIELDS,
//   EDUCATION_FIELDS,
//   PROFESSION_FIELDS,
// ];

// export default function FarmerProfileCompletion({ onComplete }) {
//   const [step, setStep] = useState(1);
//   const navigate = useNavigate();
//   // const { userId, setProfileId } = useUser();
//   const userId = localStorage.getItem("userID");

//   const { data: userProfile, isLoading: isFetching } = useProfileQuery(userId);
//   console.log(userProfile, "userprofiledata");

//   const profileMutation = useProfileMutation();
//   const addressMutation = useAddressMutation();
//   const educationMutation = useEducationMutation();
//   const professionMutation = useProfessionMutation();

//   const methods = useForm({
//     resolver: zodResolver(stepSchemas[step]),
//     mode: "onChange",
//   });

//   const {
//     handleSubmit,
//     trigger,
//     watch,
//     register,
//     formState: { errors },
//   } = methods;

//   const { labels, descriptions } = PROFILE_COMPLETION_STEPS;
//   const values = watch();

//   const nextStep = async () => {
//     const valid = await trigger(stepFieldsMap[step]);
//     if (!valid) return;

//     const sectionData = watch(stepFieldsMap[step]);

//     try {
//       // if (step === 0) {
//       //   await profileMutation.mutateAsync(sectionData);
//       //   toast.success("Profile section saved successfully!");
//       // }
//       if (step === 1) {
//         await addressMutation.mutateAsync(sectionData);
//         toast.success("Address section saved successfully!");
//       }
//       if (step === 2) {
//         await educationMutation.mutateAsync(sectionData);
//         toast.success("Education section saved successfully!");
//       }

//       setStep((s) => Math.min(stepSchemas.length - 1, s + 1));
//     } catch (error) {
//       console.error("❌ Error saving section:", error);
//       toast.error(error?.response?.data?.message || "Failed to save section");
//     }
//   };

//   const prevStep = () => setStep((s) => Math.max(0, s - 1));

//   const onSubmitForm = async () => {
//     if (step < stepSchemas.length - 1) return nextStep();

//     const valid = await trigger();
//     if (!valid) return;

//     const sectionData = watch(stepFieldsMap[step]);

//     try {
//       await professionMutation.mutateAsync(sectionData);
//       toast.success("Profile completed successfully!");

//       const data = watch();
//       const completedSections = [
//         "profile",
//         "address",
//         "education",
//         "profession",
//       ];
//       onComplete?.({ ...data, completedSections });
//       navigate("/farmer-profile");
//     } catch (error) {
//       console.error("❌ Final submission failed:", error);
//       toast.error(error?.response?.data?.message || "Submission failed");
//     }
//   };

//   const isLoading =
//     profileMutation.isPending ||
//     addressMutation.isPending ||
//     educationMutation.isPending ||
//     professionMutation.isPending;

//   return (
//     <ContentWrapper compactScreen topSpacing>
//       <div className="lg:mt-44 md:mt-36">
//         <FormProvider {...methods}>
//           <Box
//             component="form"
//             onSubmit={handleSubmit(onSubmitForm)}
//             sx={{
//               borderRadius: 2,
//               bgcolor: "var(--color-white)",
//               display: "flex",
//               flexDirection: "column",
//               gap: 2,
//               opacity: isLoading ? 0.6 : 1,
//               pointerEvents: isLoading ? "none" : "auto",
//             }}
//           >
//             <SectionTitle
//               title="Farmer Profile Completion"
//               centered
//               className="text-2xl sm:text-2xl md:text-2xl lg:text-3xl"
//             />

//             <FormStepper activeStep={step} steps={labels} />
//             <StepHeader
//               activeStep={step}
//               labels={labels}
//               descriptions={descriptions}
//             />

//             <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
//               {step === 0 && (
//                 <ProfileSection
//                   register={register}
//                   errors={errors}
//                   control={methods.control}
//                 />
//               )}
//               {step === 1 && (
//                 <AddressSection register={register} errors={errors} />
//               )}
//               {step === 2 && (
//                 <EducationSection register={register} errors={errors} />
//               )}
//               {step === 3 && (
//                 <ProfessionSection register={register} errors={errors} />
//               )}
//             </Box>

//             <FormNavigation
//               step={step}
//               totalSteps={stepSchemas.length}
//               nextStep={nextStep}
//               prevStep={prevStep}
//               handleSubmit={onSubmitForm}
//               isPending={isLoading}
//             />
//           </Box>
//         </FormProvider>
//       </div>
//     </ContentWrapper>
//   );
// }
