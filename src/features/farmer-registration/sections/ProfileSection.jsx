import { Divider, Stack } from "@mui/material";
import FileUploadField from "@/components/shared/custom-inputs/FileUploadField";
import FormInput from "@/components/shared/custom-inputs/FormInput";
import FormSection from "@/features/auth/components/FormSection";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import FormLayout from "@/components/shared/FormLayout";

export default function ProfileSection({ register, errors }) {
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

        <FileUploadField
          name="profilePic"
          label="Upload Profile"
          register={register}
          variant="profile"
          errors={errors}
          showPreview={false}
          optional
        />
      </FormLayout>
    </FormSection>
  );
}
