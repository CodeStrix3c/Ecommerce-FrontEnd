import Inputs from "@/components/shared/Inputs";
import FileUploadField from "@/components/shared/custom-inputs/FileUploadField";
import FormLayout from "@/components/shared/FormLayout";
import { Controller, useFormContext } from "react-hook-form";
import SelectField from "@/components/shared/custom-inputs/SelectField";

export default function ProfileSection() {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormLayout>
      {/* Full Name */}
      <Inputs
        required
        name="fullName"
        label="Full Name :"
        type="name"
        errors={errors.fullName}
      />

      {/* Email */}
      <Inputs
        name="email"
        label="Email :"
        type="email"
        errors={errors.email}
      />

      {/* Phone */}
      <Inputs
        required
        name="phone"
        label="Mobile Number :"
        type="phone"
        countryCode="+91"
        errors={errors.phone}
      />

      {/* Age */}
      <Inputs
        required
        name="age"
        label="Age :"
        type="number"
        errors={errors.age}
      />

      {/* Gender */}
      <Controller
        name="gender"
        control={control}
        defaultValue="" // IMPORTANT for placeholder
        rules={{ required: "Gender is required" }}
        render={({ field, fieldState }) => (
         <SelectField
  name="gender"
  label="Gender :"
  control={control}
  errors={errors.gender}
  placeholder="Select Gender"
  options={[
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ]}
/>

        )}
      />

      {/* Profile Picture */}
      {/*
      <Controller
        name="profilePic"
        control={control}
        rules={{ required: "Profile picture is required" }}
        render={({ field, fieldState }) => (
          <FileUploadField
            {...field}
            label="Upload Profile :"
            errors={fieldState.error}
            onFilesChange={(files) => field.onChange(files)}
            optional
          />
        )}
      />
      */}

      {/* Password */}
      <Inputs
        required
        name="password"
        label="Password :"
        type="password"
        errors={errors.password}
      />

      {/* Confirm Password */}
      <Inputs
        required
        name="confirmPassword"
        label="Confirm Password :"
        type="password"
        errors={errors.confirmPassword}
      />
    </FormLayout>
  );
}
