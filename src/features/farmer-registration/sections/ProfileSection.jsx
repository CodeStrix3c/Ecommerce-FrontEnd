import { Divider, Stack } from "@mui/material";
import FileUploadField from "@/components/shared/custom-inputs/FileUploadField";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import FormSection from "@/features/auth/components/FormSection";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import FormLayout from "@/components/shared/FormLayout";
import { Controller } from "react-hook-form";
import SelectField from "@/components/shared/custom-inputs/SelectField";

export default function ProfileSection({ register, errors, control }) {
  const iconStyle = { color: "var(--color-secondary)", fontSize: 20 };
  console.log(errors);

  return (
    <FormSection title="Profile Information">
      <FormLayout>
        <FormInput
          name="fullName"
          label="Full Name"
          register={register}
          errors={errors.fullName}
          icon={<AccountCircleIcon sx={iconStyle} />}
        />
        <FormInput
          name="email"
          label="Email"
          type="email"
          register={register}
          errors={errors.email}
          icon={<EmailIcon sx={iconStyle} />}
        />
        <FormInput
          name="phone"
          label="Mobile Number"
          type="tel"
          register={register}
          errors={errors.phone}
          icon={<PhoneIcon sx={iconStyle} />}
        />
        <FormInput
          name="age"
          label="Age"
          type="number"
          register={register}
          errors={errors.age}
        />

        {/* ✅ Gender dropdown */}
        <Controller
          name="gender"
          control={control}
          render={({ field, fieldState }) => (
            <SelectField
              {...field}
              label="Gender"
              errors={
                fieldState.error ? { [field.name]: fieldState.error } : {}
              }
              options={[
                { value: "", label: "Select Gender" },
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
            />
          )}
        />
        <FileUploadField
          name="profilePic"
          label="Upload Profile"
          register={register}
          variant="profile"
          errors={errors}
          showPreview={false}
          optional
        />

        <FormInput
          name="password"
          label="Password"
          type="password"
          register={register}
          errors={errors.password}
          icon={<LockIcon sx={iconStyle} />}
        />
        <FormInput
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          register={register}
          errors={errors.confirmPassword}
          icon={<LockIcon sx={iconStyle} />}
        />
      </FormLayout>
    </FormSection>
  );
}
