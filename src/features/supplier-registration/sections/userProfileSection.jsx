import SelectField from "@/components/shared/custom-inputs/SelectField";
import Inputs from "@/components/shared/Inputs";
import { useFormContext, Controller } from "react-hook-form";
import { useEffect } from "react";

const generatePlaceholderEmail = () => {
  const key = "placeholder_email_counter";
  const current = parseInt(localStorage.getItem(key) || "0", 10);
  const next = current + 1;
  localStorage.setItem(key, String(next));
  return `nomail_${next}@placeholder.internal`;
};

export { generatePlaceholderEmail };

export const isPlaceholderEmail = (email) =>
  typeof email === "string" && email.endsWith("@placeholder.internal");

export default function UserProfileSection({ disabled = false }) {
  const {
    control,
    formState: { errors },
    setValue,
    watch,
  } = useFormContext();

  const emailValue = watch("email");

  // On mount: if email is a placeholder or empty, clear it so user sees blank
  useEffect(() => {
    if (!emailValue || isPlaceholderEmail(emailValue)) {
      setValue("email", "", { shouldDirty: false });
    }
  }, []); // runs only on mount

  const handleEmailBlur = () => {
    const current = watch("email");
    if (!current || current.trim() === "") {
      setValue("email", "", { shouldDirty: false }); // keep blank in UI — resolved at submit
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Inputs
        required
        name="fullName"
        label="Full Name :"
        placeholder="e.g john doe"
        type="text"
        errors={errors?.fullName}
        disabled={disabled}
      />

      <div onBlur={handleEmailBlur}>
        <Inputs
          name="email"
          label="Email Address (optional)"
          type="email"
          placeholder="e.g john.doe@example.com"
          errors={errors?.email}
          disabled={disabled}
        />
      </div>

      <Inputs
        required
        name="age"
        label="Age :"
        placeholder="Enter Age (18-120)"
        type="age"
        errors={errors?.age}
        disabled={disabled}
      />

      <Controller
        name="gender"
        control={control}
        rules={!disabled ? { required: "Gender is required" } : {}}
        render={({ field }) => (
          <SelectField
            {...field}
            name="gender"
            label="Gender :"
            control={control}
            errors={errors?.gender}
            placeholder="Select Gender"
            disabled={disabled}
            options={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
              { value: "other", label: "Other" },
            ]}
          />
        )}
      />
    </div>
  );
}
