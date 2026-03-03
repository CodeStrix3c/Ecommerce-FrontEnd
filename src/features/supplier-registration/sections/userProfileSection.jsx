import SelectField from "@/components/shared/custom-inputs/SelectField";
import Inputs from "@/components/shared/Inputs";
import { useFormContext, Controller } from "react-hook-form";

export default function UserProfileSection({ disabled = false }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

      <Inputs
        required
        name="fullName"
        label="Full Name :"
        type="text"
        errors={errors?.fullName}
        disabled={disabled}
      />

      <Inputs
        name="email"
        label="Email :"
        type="email"
        errors={errors?.email}
        disabled={disabled}
      />

      <Inputs
        required
        name="age"
        label="Age :"
        type="number"
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