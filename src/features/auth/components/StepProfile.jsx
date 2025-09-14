import { User, Phone, Calendar } from "lucide-react";
import FormInput from "@/components/ui/FormInput";
import FileUploadField from "@/components/ui/FileUploadField";
import FormSection from "@/components/FormSection";

export default function StepProfile({ register, errors }) {
  return (
    <FormSection title="Profile Information">
      <div className="space-y-4">
        <FormInput
          name="name"
          label="Full Name"
          register={register}
          errors={errors}
          icon={<User size={16} className="text-[var(--color-primary)]" />}
        />
        <FormInput
          name="phone"
          label="Mobile Number (OTP Linked)"
          type="tel"
          register={register}
          errors={errors}
          icon={<Phone size={16} className="text-[var(--color-primary)]" />}
        />
        <FormInput
          name="age"
          label="Age"
          type="number"
          register={register}
          errors={errors}
          icon={<Calendar size={16} className="text-[var(--color-primary)]" />}
        />
        <FileUploadField
          name="profilePic"
          label="Upload Profile Photo"
          register={register}
          errors={errors}
          multiple={false}
          variant="profile"
          optional
        />
      </div>
    </FormSection>
  );
}
